import React, { useEffect, useState } from "react";
import User from "./User";
import { socket } from "../pages/GamePage";
const Operatives = ({ kingID }) => {


    const [showVoteButton, setShowVoteButton] = useState(false);
    const [missionMems, setMissionMems] = useState([]);

    useEffect(() => {
        setMissionMems([]);
    }, [kingID]);

    socket.on('sendMemsServer', (missionMems) => {
        setMissionMems([...missionMems]);
        setShowVoteButton(true);
    })

    function voting(vote, username) {
        socket.emit('votingClient', { username: username, vote: vote, type: 'vote' });
        setShowVoteButton(false);
        setMissionMems([]);
    }

    if (showVoteButton)
        return (
            <div>
                <div className="absolute top-0 left-0 p-2 w-full h-full backdrop-blur-sm bg-black bg-opacity-25 flex flex-col justify-evenly items-center font-mono font-semibold">

                    <p className="font-mono font-semibold">Leader Choose: </p>
                    <div className="w-1/2 h-max flex justify-center flex-wrap">
                        <div className="flex flex-row">{missionMems.map((user, index) => <p key={index} className="py-1 px-4 mx-1 border-2 backdrop-blur-lg border-white rounded-md bg-white bg-opacity-15">{user.username}</p>)}</div>
                    </div>
                    <div>
                        <button id='approve' className="px-4 py-2 mx-2 rounded-sm border-2 border-white bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => voting(true, socket.username)}>approve</button>
                        <button id='reject' className="px-4 py-2 mx-2 rounded-sm border-2 border-white bg-red-400 hover:bg-red-500 text-black" onClick={() => voting(false, socket.username)}>reject</button>
                    </div>

                </div>
            </div>
        )
    else return (
        <div>
            <p className="bg-indigo-700 font-mono font-bold">Waiting for the Leader to choose members...</p>
        </div>
    )
}

export default Operatives;