import React from "react";

const Mission = ({team}) => {
    if(team == 'blue')
    return(
        <div className="mx-1 h-16 w-16 md:h-28 md:w-28 p-2 border-2 border-white bg-blue-500 rounded-full text-xl font-bold flex items-center justify-center">
            <span>{team}</span>
        </div>
    )
    else if(team == 'red')
    return(
        <div className="mx-1 h-16 w-16 md:h-28 md:w-28 p-2 border-2 border-white bg-red-500 rounded-full text-xl font-bold flex items-center justify-center">
            <span>{team}</span>
        </div>
    )
    else
    return(
        <div className="mx-1 h-16 w-16 md:h-28 md:w-28 p-2 border-2 border-white bg-white rounded-full text-xl font-bold flex items-center justify-center text-black">
            <span>{team}</span>
        </div>
    )
}

export default Mission;