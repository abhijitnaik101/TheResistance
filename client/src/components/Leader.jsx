import React, { useEffect, useState } from "react";
import User from "./User";
import { atom, useRecoilValue } from "recoil";
import { atom_missionInfo, atom_user, atom_users } from "../App";
import { socket } from "../pages/GamePage";
const Leader = ({ leaderID, missionNo}) => {
    const missionInfo = useRecoilValue(atom_missionInfo);
    const users = useRecoilValue(atom_users);
    const [missionMems, setMissionMems] = useState([]);
    const [showChoosePartyModal, setShowChoosePartyModal] = useState(true);
    
    let this_user;
    if(Array.isArray(users)){
        this_user = users.filter((user) => user.id == socket.id)[0];
    }

    useEffect(() => {
        setMissionMems([]);
    }, [leaderID]);

    function selectMems(user) {
        if (!missionMems.includes(user))
            setMissionMems([...missionMems, user]);
        // else {
        //     //to be experimented logic
        //     let index;
        //     for (let i = 0; i < missionMems.length; i++)
        //         if (missionMems[i] == user) index = i;

        //     var missM = (index > -1) ? missionMems.splice(index, 1):null;
        //     setMissionMems(missM);
        // }
    }

    function submitMems() {
        socket.emit('sendMemsClient', missionMems);
        setMissionMems([]);
        setShowChoosePartyModal(false);
    }
    
    if(showChoosePartyModal)
    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-15 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center font-mono">
            <div className="flex flex-wrap">
                {users.map((user, index) => (user.id == leaderID) ?
                    <button key={user.id} onClick={() => selectMems(user)}  className="mx-2 border-2 md:border-4 border-yellow-400 rounded-lg"><User key={index} socketrole={this_user.role} name={user.username} role={user.role}/></button>
                    :
                    <button key={user.id} onClick={() => selectMems(user)} className="mx-2"><User key={index} socketrole={this_user.role} name={user.username} role={user.role}/></button>
                )}  
            </div>
            <p className="m-2 font-mono font-bold">You Choose:</p>
            <div className="flex">
                 {
                     missionMems.map((user) => <p className="py-1 px-4 mx-1 border-2 backdrop-blur-lg border-white rounded-md bg-white bg-opacity-15" key={user.id}>{user.username}</p>)
                }
            </div>
            <div>
                {(missionMems.length == missionInfo[missionNo].strength) && 
                <button id="submitButton" className="m-3 px-4 py-2  bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg" onClick={submitMems}>
                    Form Party
                </button>}
            </div>
        </div>
    )
    else
    return(<></>)
}

export default Leader;