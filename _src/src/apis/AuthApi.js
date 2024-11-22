import { path } from "./path"

export const loginApi = async (username, password) => {
    const res = await fetch(`${path}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
}

export const logoutApi = async () => {
    const res = await fetch(`${path}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    const data = await res.json();
    return data;
}