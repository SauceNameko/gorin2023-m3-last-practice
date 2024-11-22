export const ClearScene = ({ ranks,replay }) => {
    return (
        <>
            <h1>Congratulations!</h1>
            <table>
                <tr>
                    <th>rank</th>
                    <th>username</th>
                    <th>time</th>
                </tr>
                {ranks.map((rank, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td style={rank.username == sessionStorage.getItem("username") ? { color: "red" } : {}} >{rank.username}</td>
                            <td>{Math.floor(rank.time / 60)}:{String(rank.time % 60).padStart(2, "0")}</td>
                        </tr>
                    )
                })}
            </table>
            <button onClick={replay}>replay</button>
        </>
    )
}