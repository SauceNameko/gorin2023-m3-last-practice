import { path } from "./path"

export const getProfileApi = async () => {
    const res = await fetch(`${path}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    const data = await res.json();
    return data;
}

export const putProfileApi = async (username, nickname) => {
    const res = await fetch(`${path}/users/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ username, nickname })
    });
    const data = await res.json();
    return data;
}