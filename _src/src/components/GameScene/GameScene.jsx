import "./GameScene.css";
export const GameScene = ({ field, level, time }) => {

    return (
        <>
            <h1>{Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</h1>
            <div className={`field-${level}`}>
                {field.map((y, yIndex) => {
                    return y.map((x, xIndex) => {
                        return (
                            <>
                                {x == 0 && <div className="none"></div>}
                                {x == 1 && <div className="wall"></div>}
                                {x == 2 && <div className="player"></div>}
                                {x == 3 && <div className="block"></div>}
                                {x == 4 && <div className="flag"></div>}
                            </>
                        )
                    })
                })}
            </div>
        </>
    )
}