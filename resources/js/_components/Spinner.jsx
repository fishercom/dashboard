import React from 'react'

export const Spinner =(props)=>{
    const { visible, text, style } = props;
    return (
        <>
        {visible &&
        <div id="spinner">
            <div className="overlay">
                <div className="content" style={style}>
                    <span className="loader"></span>
                    <p>{text}</p>
                </div>
            </div>
        </div>
        }
        </>
    )
}