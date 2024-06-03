import React, { useMemo } from "react";
import User from "../components/User";
import { useRecoilState, useRecoilValue } from "recoil";
import { atom_users, atom_userCount, atom_user } from "../App";
import { socket } from "./GamePage";

export default function UserSection() {

    const [users, setUsers] = useRecoilState(atom_users);
    const [userCount, setUserCount] = useRecoilState(atom_userCount);

    socket.on('users', (userCount, users) => {
        setUserCount(userCount);
        setUsers([...users]);
    })

    let this_user ;
    if(Array.isArray(users)){
        this_user = users.filter((user) => user.id == socket.id)[0];
    }
    
    if(Array.isArray(users))
    return (
        
        <div className="flex flex-col items-center">
            {console.log("userSection render")}
            <p className="font-mono font-bold text-white">Users Joined :  {userCount}</p>
                <div className="md:my-5 w-full flex justify-start overflow-x-scroll bg-blue-300">
                {
                    users.map((user, index) => 
                        <div key={index} className="m-1">
                            <User socketrole={this_user.role} name={user.username} role={user.role} />
                        </div>
                    )
                }
                </div>
        </div>
    )
    else return(<></>)
}