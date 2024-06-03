import React from "react";

const MissionResModal = ({ noOfSuccess, noOfFailure }) => {
 console.log(noOfSuccess);
    return (
        <div className="absolute h-full w-full bg-opacity-80 bg-black flex justify-center
        items-center">
            <div className="m-3 flex flex-col items-center">
                <p className="text-sm text-white font-bold">Successes: </p>
                <p className="font-bold text-7xl text-blue-500">{noOfSuccess}</p>
            </div>
            <div className="m-3 flex flex-col items-center">
                <p className="text-sm text-white font-bold">Sabotages: </p>
                <p className="font-bold text-7xl text-red-500">{noOfFailure}</p>
            </div>

        </div>
    )
}

export default MissionResModal;