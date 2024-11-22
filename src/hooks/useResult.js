import { useEffect, useState } from "react"
import { getResultApi } from "../apis/ResultApi";

export const useResult = (isClear, level) => {
    const [ranks, setRanks] = useState([]);

    //クリアしたならランキング取得
    useEffect(() => {
        if (isClear) {
            const check = async () => {
                const data = await getResultApi(level);
                const sortData = data.sort((a, b) => a.time - b.time);
                const sliceData = sortData.slice(0, 3);
                setRanks(sliceData);
            }
            check();
        }
    }, [isClear]);

    return { ranks };
}