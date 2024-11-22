import { useEffect, useState } from "react"
import { loginApi, logoutApi } from "../apis/AuthApi";

export const useLogin = () => {
    const [isLogin, setIsLogin] = useState(false);

    //ログイン処理
    const login = (username, password) => {
        const check = async () => {
            const data = await loginApi(username, password);
            if (data.token) {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("username", username);
                setIsLogin(true);
            } else {
                return alert("The username or password is incorrect.");
            }
        }
        check();
    }
    //ログアウト処理
    const logout = () => {
        const check = async () => {
            const data = await logoutApi();
            if (data.success) {
                sessionStorage.removeItem("usename");
                sessionStorage.removeItem("token");
                setIsLogin(false);
            }
        }
        check();
    }
    //tokenをもっているなら
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLogin(true);
        }
    }, []);

    return { isLogin, login, logout };
}