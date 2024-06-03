import React, { useEffect, useState } from "react";
import Vote from "../components/Vote";
import { socket } from "./GamePage";
const VoteTrack = () => {
    const [voteTrack, setVoteTrack] = useState([0, 0, 0, 0, 0]);
    socket.on('votingServer', (voteTrack) => {
        setVoteTrack([...voteTrack]);
        
    })
    return (
        <div className="w-max pl-2 pr-2 h-16 md:h-24 bg-indigo-700 rounded-full flex justify-between items-center">
            {voteTrack.map((element, index) => <Vote key={index} number={index+1} color={element}></Vote>)}
        </div>
    )
}

export default VoteTrack;