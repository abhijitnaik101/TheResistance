import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";


const Input = () => {

    const navigate = useNavigate();
    sessionStorage.clear();
    
    function fetchForm(){
        console.log("fetch form ");
        const form = document.getElementById('form'); 
        form.addEventListener('submit' , (e) => {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const roomField = document.getElementById('room');
            let name = nameField.value;
            let room = roomField.value;

            navigate("/game", {state : {name: name, room : room}})
            roomField.value = "";
            nameField.value = "";

        })  
        
        
    }

    function sendRoom(){
        // fetch('http://localhost:5000/')
    }
    return (
        <>
        {console.log('Input render')}
            <div className="h-screen w-full flex justify-center items-center">
                <div className="p-10 border-[1px] border-black rounded-lg">
                <form id='form' action="" className="flex flex-col">
                    <input id="name" className="m-2 py-2 px-5 border-2 border-slate-400 rounded-lg" type="text" placeholder="Enter name"></input>
                    <input id="room" className="m-2 py-2 px-5 border-2 border-slate-400 rounded-lg" type="text" placeholder="Enter room id"></input>
                    <div className="flex">
                        <button className="w-1/2 py-2 px-5 mx-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={fetchForm}>Input</button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Input;