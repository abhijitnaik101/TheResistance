import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactDOM } from "react";
import GamePage from "./pages/GamePage";
import Join from "./pages/Join";
import { atom } from "recoil";
import Input from "./pages/Input";

const atom_users = atom({ key: 'users', default: [] });
const atom_userCount = atom({ key: 'userCount', default: 0 });
const atom_user = atom({key:'user', default: {}});
const atom_leaderID = atom({key:"LeaderId", default: 0});
const atom_missionNo = atom({key: "missionNo", default: 0});
const atom_missionInfo = atom({key: "missionInfo", default: {}});


export default function App() {
  return (
    <>
    {console.log('app render')}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input/>} />
          <Route path="/game" element={<GamePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export {atom_userCount, atom_users, atom_user, atom_leaderID, atom_missionNo, atom_missionInfo};