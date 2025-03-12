import React, { useState } from 'react'

export const Alert =(props)=>{
    const [closed, setClosed] = useState(false)
    const message = props.message
    const type = props.type? props.type: 'info'

    return !closed?(
        <div className={"alert alert-dismissible alert-"+type}>
            <button type="button" className="btn-close" data-bs-dismiss="alert"
            onClick={(e)=>setClosed(true)}></button>
            {message}
        </div>
    ): null
}