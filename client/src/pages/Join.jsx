import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const atom_username = atom({key:'username', default:'name'});
const atom_room = atom({key:'room_id', default: "1"});



const Join = ({callback}) => {

    useEffect(()=>{
        callback("user1", "room1");
    })
    function fetchForm(){
        console.log("fetch form ");
        const form = document.getElementById('form');   
        const name = document.getElementById('name');
        const room = document.getElementById('room');
        callback(name.value, room.value);
    }

    function sendRoom(){
        // fetch('http://localhost:5000/')
    }
    return (
        <>
        {console.log('join render')}
            <div className="h-screen w-full flex justify-center items-center">
                <div className="p-10 border-[1px] border-black rounded-lg">
                <form id='form' action="" className="flex flex-col">
                    <input id="name" className="m-2 py-2 px-5 border-2 border-slate-400 rounded-lg" type="text" placeholder="Enter name"></input>
                    <input id="room" className="m-2 py-2 px-5 border-2 border-slate-400 rounded-lg" type="text" placeholder="Enter room id"></input>
                    <div className="flex">
                        <button className="w-1/2 py-2 px-5 mx-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={fetchForm}>join</button>
                        <Link onClick={fetchForm} to={"/game"}>click</Link>
                        
                    </div>
                    
                </form>
                </div>
            </div>
        </>
    )
}

export {atom_username, atom_room};
export default Join;