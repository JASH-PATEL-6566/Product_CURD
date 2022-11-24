import React from 'react'

function Message({ text }) {
    return (
        <div className="massage-container display_none">
            <span>{text}</span>
        </div>
    )
}

export default Message;