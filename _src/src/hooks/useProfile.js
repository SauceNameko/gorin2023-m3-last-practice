import { useEffect, useState } from "react"
import { getProfileApi, putProfileApi } from "../apis/ProfileApi";

export const useProfile = (isLogin) => {
    const [isSetting, setIsSetting] = useState(false);
    const [profile, setProfile] = useState({});
    const [totalTime, setTotalTime] = useState(0);
    //プロフィール取得
    useEffect(() => {
        if (isLogin) {
            const check = async () => {
                const data = await getProfileApi();
                //合計時間取得
                data.results.map(result => {
                    setTotalTime(prev => prev + result.time);
                });
                setProfile(data);
            }
            check();
        }
    }, [isLogin]);

    //プロフィール設定画面遷移処理
    const setting = () => {
        setIsSetting(true);
    }
    //プロフィール設定更新処理
    const updateProfile = (username, nickname) => {
        const user = /^[a-zA-Z0-9]{5,}$/.test(username);
        const nick = nickname.length >= 4;
        if (user && nick) {
            if (sessionStorage.getItem("username") == username) {
                return alert("The username is already taken.");
            }
            const check = async () => {
                const data = await putProfileApi(username, nickname);
                if (data.success) {
                    // sessionStorage.setItem("username", username);
                    setIsSetting(false);
                }
            }
            check();
        }
    }
    return { profile, totalTime, setting, isSetting, updateProfile };
}