import React, { useEffect } from "react";

const Message = ({type,msg,removealert,list}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removealert()
        },3000)
        return () => clearTimeout(timeout)

    },[list])
    console.log(type,msg)
    return <p className={`alert alert-${type}`}>{msg}</p>
}
export default Message