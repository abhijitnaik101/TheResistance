import React, { useEffect, useMemo, useState } from "react";
import { MissionVote } from "../components/MissionVote";
import Operatives from "../components/Operatives";
import Leader from "../components/Leader";
import MissionResModal from "../components/MissionResModal";
import WinnerModal from "../components/WinnerModal";
import { socket } from "./GamePage";
import { useRecoilValue } from "recoil";
import { atom_missionInfo, atom_users } from "../App";
import VoteTrack from "./VoteTrack";
import MissionTrack from "./MissionTrack";

const Board = ({ leaderID, missionNo, missionInfo }) => {

    const users = useRecoilValue(atom_users);
    const missionInfoDefault = [missionInfo[1].strength, missionInfo[2].strength,missionInfo[3].strength, missionInfo[4].strength,missionInfo[5].strength];
    const [sabotageIDs, setSabotageIDs] = useState([]);
    const [winner, setWinner] = useState('');
    const [noOfSuccess, setnoOfSuccess] = useState(null);
    const [missionTrack, setMissionTrack] = useState([...missionInfoDefault]);
    

    useEffect(
        () => {
            setWinner('');
            setSabotageIDs([]);
            setnoOfSuccess(null);
            //finding username of this instance of client
            socket.username = users.filter((user) => user.id == socket.id)[0].username;
        }, [leaderID, missionNo]
    );

    socket.on('doMission', (memsID) => {
        setSabotageIDs([...memsID]);
    })

    socket.on('missionRes', (noOfSuccess, res, missionTrack) => {
        setMissionTrack([...missionTrack]);
        setnoOfSuccess(noOfSuccess);
    })

    socket.on('winner', (winner) => {
        setWinner(winner);
        setnoOfSuccess(null);
    })


    return (

        <div className="h-max md:h-[420px] w-full p-5 bg-indigo-600 text-white rounded-md flex flex-col items-center justify-evenly relative">
            <p className="font-mono text-sm md:text-xl font-semibold">Mission no: {missionNo}</p>
            {(noOfSuccess != null) && <MissionResModal noOfSuccess={noOfSuccess} noOfFailure={users.length - noOfSuccess} />}
            {(winner) && <WinnerModal winner={winner}/>}

            {(socket.id == leaderID) ?
                
                <Leader leaderID={leaderID} missionNo={missionNo} />
                :
                <Operatives leaderID={leaderID} />
            }
            <MissionVote sabotageIDs={sabotageIDs} socket={socket} />
            <p className="font-mono text-sm md:text-lg font-semibold">Mission Track: The team scoring 3 points wins</p>
            <MissionTrack missionTrack={missionTrack}/>
            <p className="font-mono text-sm md:text-lg font-semibold">Vote Track: spies wins if reached 5 </p>
            <VoteTrack/>
        </div>

    )
}
export default Board;