import React, { useEffect, useState } from "react";

const MissionVote = ({ sabotageIDs, socket }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        (Array.isArray(sabotageIDs) && sabotageIDs.length > 0) ?
            setShowButton(true) : setShowButton(false);
    }, [sabotageIDs])

    function missionVote(vote) {
        socket.emit('missionVote', vote); //string
        setShowButton(false);
        //or remove the id from sabotageIDs
    }
    if (sabotageIDs.includes(socket.id) && showButton)
        return (
            <div className="absolute top-0 left-0 p-2 w-full h-full backdrop-blur-sm bg-black bg-opacity-25 flex flex-col justify-evenly items-center font-mono font-semibold ">
                {console.log('MissionVote Render')}
                {
                    <div>
                        <button onClick={() => missionVote('success')} className="p-3 m-2 border-2 border-white rounded-md bg-blue-500 hover:bg-blue-600 font-semibold text-white">success</button>
                        <button onClick={() => missionVote('failure')} className="p-3 m-2 border-2 border-white rounded-md  bg-rose-500 hover:bg-rose-600 bg- font-semibold text-white">failure</button>
                    </div>
                }

            </div>
        )
    else
        return (<></>)
}
export { MissionVote };