import React from "react";
import { socket } from "../pages/GamePage";
const WinnerModal = ({ winner }) => {
    function playAgain() {
        socket.emit('playAgain');
    }
    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-75 backdrop-blur-sm h-full w-full flex flex-col justify-center items-center">
            {console.log('winner render')}
            <div className="m-4 font-bold text-3xl text-white">
                {
                    (winner == 'blue' || winner == 'operative') ?
                        <div><span className="text-blue-400">{winner}</span> won</div> :
                        <div><span className="text-rose-400">{winner}</span> won</div>
                }
            </div>
            <button onClick={playAgain} className="py-2 px-4 font-mono font-semibold rounded-md border-2 border-white bg-yellow-500 hover:bg-yellow-600 text-black">play again</button>
        </div>
    )
}

export default WinnerModal;