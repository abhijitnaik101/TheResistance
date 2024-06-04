import React, { useEffect, useMemo, useState } from "react";
import ChatBox from "./Chatbox";
import { io } from 'socket.io-client';
import Join, { atom_room, atom_username } from "./Join";
import Board from "./Board";
import UserSection from "./UserSection";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { atom_leaderID, atom_missionInfo, atom_user, atom_users } from "../App";
import { useLocation } from "react-router-dom";


const socket = io('https://theresistanceserver-1.onrender.com', { autoConnect: false });



const GamePage = () => {

    const [formSubmited, setFormSubmited] = useState(false);
    const [start, setStart] = useState(false);
    const [leaderID, setLeaderID] = useState(null);
    const [missionNo, setMissionNo] = useState(null);
    //const [missionInfo, setMissionInfo] = useState({});
    const [isPlayPressed, setIsPlayPressed] = useState(false);
    const [showPlayDiv, setShowPlayDiv] = useState(true);

    const [missionInfo, setMissionInfo] = useRecoilState(atom_missionInfo);

    
    const location = useLocation();
    const username = location.state.name;
    const roomid = location.state.room;
    //if(!username && !roomid){username = "user1"; roomid = "room1"}
    //console.log(`GamePage : name : ${username}, room : ${roomid}`);


    console.log(`strat: ${start}, missionNo: ${missionNo}, missionInfo: ${missionInfo}`);
    console.log("missionInfo :", missionInfo);

    // useEffect(()=>{
    //     console.log(checkSessionStorge());
    //     if(checkSessionStorge()) {
    //         retrieveSessionStorage();
    //     }
    // }, [socket.id]);

    // useEffect(()=>{
    //     storeSessionStorge(showPlayDiv, start, leaderID, missionNo, JSON.stringify(missionInfo));
    // }, [start, showPlayDiv, leaderID, missionInfo, missionNo]);
    
    function retrieveSessionStorage(){
        
        setStart(Boolean(sessionStorage.getItem('start')));
        setShowPlayDiv(Boolean(sessionStorage.getItem('showPlayDiv')));
        setLeaderID(sessionStorage.getItem('leaderID'));
        setMissionNo(Number(sessionStorage.getItem('missionNo')));
        setMissionInfo(JSON.parse(sessionStorage.getItem('missionInfo')));

    }
    
    function checkSessionStorge(){
        if(sessionStorage.getItem('start') === null)
        return false;
        else
        return true;
    }
    function storeSessionStorge(showPlayDiv, start, leaderID, missionNo, missionInfo){
        sessionStorage.setItem('showPlayDiv', showPlayDiv);
        sessionStorage.setItem('start', start);
        sessionStorage.setItem('leaderID', leaderID);
        sessionStorage.setItem('missionNo', missionNo);
        sessionStorage.setItem('missionInfo', missionInfo)
    }

    socket.on('start', (leaderID, missionNo, missionInfo) => {
        setShowPlayDiv(false);
        setStart(true);
        setLeaderID(leaderID);
        setMissionNo(missionNo);
        setMissionInfo(missionInfo);
    })

    socket.on('newGame', (leaderID, missionNo, missionInfo) => {
        setLeaderID(leaderID);
        setMissionNo(missionNo);
        setMissionInfo(missionInfo);
    })

    socket.on('nextTurn', (leaderID, missionNo) => {
        setLeaderID(leaderID);
        setMissionNo(missionNo);
    })


    function clickPlay() {
        socket.emit('play');
        if (!start) setIsPlayPressed(true);
    }

    

    function fetchInput() {
       
        socket.auth = { username, roomid };
        socket.connect();

        setFormSubmited(true);
    }

    if (!formSubmited)
        //return (<Join callback={submitForm} />)
        return(
            <div className="h-screen w-full flex justify-center items-center">
                <p className="text-3xl font-mono font-semibold">Loading...</p>
                {fetchInput()}
            </div>
            
        )
    else
        return (
            <>
                {console.log('GamePage render')}
                <div className="h-screen w-full border-1 lg:p-6 sm:p-2 rounded-md md:flex md:flex-row justify-between flex flex-col bg-blue-900">
                    <div className="bg-blue-600 h-max w-full md:w-2/3">
                        <UserSection />
                        {
                            (showPlayDiv) &&
                            <div className="w-full flex justify-center font-mono font-bold">
                                {
                                    (isPlayPressed) ?
                                    <p className="text-white">Waiting for another players...</p> :
                                    <button onClick={clickPlay} className="py-2 px-5 m-2 rounded-lg border-2 border-white bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">play</button>
                                }
                            </div>
                        }

                        {   
                            start && <Board leaderID={leaderID} missionNo={missionNo} missionInfo={missionInfo} />
                        }
                    </div>

                    <div className="md:h-full md:w-1/3 h-1/2 w-full">
                        <ChatBox />
                    </div>
                </div>
            </>
        )
}

export default GamePage;
export { socket };