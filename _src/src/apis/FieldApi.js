import { path } from "./path"

export const fieldApi = async (level) => {
    const res = await fetch(`${path}/fields?level=${level}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    const data = await res.json();
    return data;
}