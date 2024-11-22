import { path } from "./path"

export const getResultApi = async (level) => {
    const res = await fetch(`${path}/results?level=${level}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    const data = await res.json();
    return data;
}

export const postResultApi = async (level,time) => {
    const res = await fetch(`${path}/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body:JSON.stringify({level,time})

    });
    const data = await res.json();
    return data;
}