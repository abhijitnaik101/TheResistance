import React from "react";

const User = ({ socketrole, name, role }) => {
    if (socketrole == 'spy') {
        if (role == 'operative')
            return (
                <div className="h-16 w-16 md:h-20 md:w-20 bg-blue-500 rounded-lg flex items-end">
                    <p className="pb-2 rounded-b-md w-full text-center bg-blue-800 text-white font-semibold overflow-x-clip md:text-base text-xs">{name}</p>
                </div>
            )
            else return (
            <div className="h-16 w-16 md:h-20 md:w-20 bg-red-500 rounded-lg flex items-end">
                <p className="pb-2 rounded-b-md w-full text-center bg-red-800 text-white font-semibold overflow-x-clip md:text-base text-xs">{name}</p>
            </div>
        )
    }
    else
    {
        return (
            <div className="h-16 w-16 md:m-1 md:h-20 md:w-20 bg-blue-500 rounded-lg flex items-end">
                <p className="pb-2 rounded-b-md w-full text-center bg-blue-800 text-white font-semibold overflow-x-clip md:text-base text-xs">{name}</p>
            </div>
        )
    }

}

export default User;