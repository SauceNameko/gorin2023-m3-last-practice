import { useEffect, useRef, useState } from "react"
import { fieldApi } from "../apis/FieldApi";
import { postResultApi } from "../apis/ResultApi";

export const useField = (level, setLevel) => {
    //フィールドの管理
    const [field, setField] = useState([]);
    //プレイヤー座標管理
    const [playerPos, setPlayerPos] = useState({ y: 0, x: 0 });
    //クリアフラグ
    const [isClear, setIsClear] = useState(false);
    //時間管理
    const [time, setTime] = useState(0);
    const timeRef = useRef(0);
    //レベルに応じてフィールドの状態を変化
    useEffect(() => {
        if (level != 0) {
            const check = async () => {
                const data = await fieldApi(level);
                setField(data.objects);
                //プレイヤースタート座標
                if (level == 1) {
                    setPlayerPos({ y: 1, x: 1 });
                } else {
                    setPlayerPos({ y: 3, x: 1 });
                }
                //時間計測スタート
                timeRef.current = setInterval(() => {
                    setTime(prev => prev + 1);
                }, 1000);
                return () => {
                    clearInterval(timeRef.current);
                }
            }
            check();
        }
    }, [level]);

    //プレイヤー移動処理
    const move = (e) => {
        if (field.length === 0) return;
        setPlayerPos(prev => {
            let newY = prev.y;
            let newX = prev.x;
            let direction = "";
            switch (e.key) {
                case "ArrowLeft":
                    direction = "left";
                    newX = newX - 1;
                    break;
                case "ArrowRight":
                    direction = "right";
                    newX = newX + 1;
                    break;
                case "ArrowUp":
                    direction = "up";
                    newY = newY - 1;
                    break;
                case "ArrowDown":
                    direction = "down";
                    newY = newY + 1;
                    break;
                default:
                    break;
            }
            //フィールドの配列のコピーを作成
            const newField = [...field];
            if (newField[newY][newX] == 0) {
                newField[newY][newX] = 2;
                newField[prev.y][prev.x] = 0;
                setField(newField);
                return { y: newY, x: newX };
            }
            //壁衝突
            if (newField[newY][newX] == 1) {
                return { y: prev.y, x: prev.x };
            }
            //ブロック衝突
            else if (newField[newY][newX] == 3) {
                //移動方向を確認
                if (direction == "left") {
                    if (newField[newY][newX - 1] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY][newX - 1] = 3;
                    }
                }
                if (direction == "right") {
                    if (newField[newY][newX + 1] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY][newX + 1] = 3;
                    }
                }
                if (direction == "up") {
                    if (newField[newY - 1][newX] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY - 1][newX] = 3;
                    }
                }
                if (direction == "down") {
                    if (newField[newY + 1][newX] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY + 1][newX] = 3;
                    }
                }
                //プレイヤーの座標は変えない
                setField(newField);
                return { y: prev.y, x: prev.x };
            } else if (newField[newY][newX] == 4) {
                setIsClear(true);
            }
            setField(newField);
            return { y: newY, x: newX };
        })
    }
    //キー入力受付
    useEffect(() => {
        if (field.length === 0) return;
        document.addEventListener("keydown", move);
        return () => {
            document.removeEventListener("keydown", move);
        }
    }, [field]);

    //ゲームクリア処理
    useEffect(() => {
        if (isClear) {
            clearInterval(timeRef.current);
            const check = async () => {
                const data = await postResultApi(level, time);
                if (data.success) {
                    return alert("投稿が完了しました");
                }
            }
            check();
        }
    }, [isClear]);

    //リプレイボタンでフィールド状態リセット
    const replay = () => {
        setTime(0);
        setPlayerPos({ y: 0, x: 0 });
        setField([]);
        setLevel(0);
        setIsClear(false);
    }
    return { field, isClear, time, replay }
}