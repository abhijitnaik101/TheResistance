import React from "react";
const Message = ({ message }) => {
    if (message.type == 'message')
        return (
            <div className="pb-3 m-1 w-11/12 rounded-r-lg rounded-bl-lg text-white bg-violet-600 font-semibold">
                <p className="text-xs px-2 font-mono opacity-55">{message.author}</p>
                <p className="px-5">{message.content}</p>
            </div>
        )
    else
        if(message.vote == true)
        return (
            <div className="pt-1 pb-2 px-3 m-1 w-full border-l-4 border-blue-500 text-black bg-slate-200 font-semibold">
                <p className="text-xs font-mono opacity-55">{message.username}</p>
                <p>approve</p>
            </div>
        )
        else
        return (
            <div className="pt-1 pb-2 px-3 m-1 w-full border-l-4 border-rose-500 text-black bg-slate-200 font-semibold">
                <p className="text-xs font-mono opacity-55">{message.username}</p>
                <p>reject</p>
            </div>
        )
    // return (
    //     <>
    //         {
    //             (message.type == 'message') ?
    //                 <div className="pb-3 m-1 w-11/12 rounded-r-lg rounded-bl-lg text-white bg-violet-600 font-semibold">
    //                     <p className="text-xs px-2 font-mono opacity-55">{message.author}</p>
    //                     <p className="px-5">{message.content}</p>
    //                 </div>
    //                 :
    //                 <div className="pt-1 pb-2 px-3 m-1 w-full border-l-4 border-rose-500 text-black bg-slate-200 font-semibold">
    //                     <p className="text-xs font-mono opacity-55">{message.username}</p>
    //                     <p>{(message.vote == true) ? 'approve' : 'reject'}</p>
    //                 </div>
    //         }
    //     </>


    // )
}

export default Message;