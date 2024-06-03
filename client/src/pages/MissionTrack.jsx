import React from "react";
import Mission from "../components/Mission";

const MissionTrack = ({missionTrack}) => {
    
    return (
        <div className="w-max px-2 h-20 md:h-32 bg-blue-500 rounded-full flex justify-between items-center">
            {missionTrack.map((mission, index) => <Mission key={index} team={mission}/>)}
        </div>
    )
}
export default MissionTrack;