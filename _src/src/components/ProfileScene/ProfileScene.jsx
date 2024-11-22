import { useRef } from "react"

export const ProfileScene = ({ isSetting, profile,updateProfile }) => {
    const userRef = useRef(null);
    const nickRef = useRef(null);
    return (
        <>
            <h1>Profile Settings</h1>
            username <input type="text" ref={userRef} defaultValue={profile.username} />
            nickname <input type="text" ref={nickRef} defaultValue={profile.nickname} />
            <button onClick={()=>updateProfile(userRef.current.value,nickRef.current.value)}>Update</button>
        </>
    )
}