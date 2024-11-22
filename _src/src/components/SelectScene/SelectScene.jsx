import { useState } from "react";
import { useProfile } from "../../hooks/useProfile"
import { ProfileScene } from "../ProfileScene/ProfileScene";
import { useField } from "../../hooks/useField";
import { GameScene } from "../GameScene/GameScene";
import { ClearScene } from "../ClearScene/ClearScene";
import { useResult } from "../../hooks/useResult";

export const SelectScene = ({ isLogin, logout }) => {
    //プロフィール管理フック
    const { profile, totalTime, setting, isSetting, updateProfile } = useProfile(isLogin);
    //レベル管理
    const [level, setLevel] = useState(0);
    //フィールド管理フック
    const { field, isClear, time, replay } = useField(level,setLevel);
    const { ranks } = useResult(isClear, level);
    return (
        <>
            {!isSetting && level == 0 && !isClear &&
                <>
                    <h1>Welcome, {profile.nickname}!</h1>
                    <div>Your total play time is {Math.floor(totalTime / 60)}min.</div>
                    <div>
                        <button onClick={setting}>Profile Settings</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                    <div>
                        <button onClick={() => setLevel(1)}>Easy</button>
                        <button onClick={() => setLevel(2)}>Normal</button>
                    </div>
                </>
            }
            {
                isSetting && level == 0 && !isClear && <ProfileScene isSetting={isSetting} profile={profile}
                    updateProfile={updateProfile} ></ProfileScene>
            }
            {!isSetting && level != 0 && !isClear && <GameScene time={time} field={field} level={level}></GameScene>}
            {isClear && <ClearScene ranks={ranks} replay={replay}></ClearScene>}
        </>
    )
}