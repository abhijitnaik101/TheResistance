import React from "react";
const Vote = ({number, color}) => {

    if(color == 0)
    return(
        <div className="mx-1 h-12 w-12 md:h-20 md:w-20 p-2 border-2 border-white bg-blue-500 rounded-full text-2xl font-bold flex items-center justify-center"><span>{number}</span></div>
    )
    else
    return(
        <div className="mx-1 h-12 w-12 md:h-20 md:w-20 p-2 border-2 border-white bg-red-500 rounded-full text-2xl font-bold flex items-center justify-center"><span>X</span></div>
    )
}

export default Vote;