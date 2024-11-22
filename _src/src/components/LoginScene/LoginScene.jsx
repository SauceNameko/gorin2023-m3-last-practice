import { useRef } from "react"

export const LoginScene = ({ login }) => {
    const userRef = useRef(null);
    const passRef = useRef(null);
    return (
        <>
            username: <input type="text" ref={userRef} />
            password: <input type="text" ref={passRef} />
            <button onClick={() => login(userRef.current.value, passRef.current.value)}>ログイン</button>
        </>
    )
}