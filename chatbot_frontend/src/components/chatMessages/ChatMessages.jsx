import React from "react";
import logo from '../../assets/chatbot.png'
import user from '../../assets/user.png'
import chat from '../../assets/chat.png'
import "./ChatMessages.css"
export default function ChatMessages(props) {
    return (
        <div className="msgBox">
            {
                props.user ? (
                        <div className="msg right">
                            <div className="msg-right">
                            {
                                props.message.map((e)=> <p>{e}</p> )
                            }
                            </div>
                            <img className="icon" src={user} alt="user" height="25" width="25" />
                        </div>
                ):(
                <div className="msg left">
                    <img className="icon" src={chat} alt="chatbot" height="25" width="25" />
                    <div className="msg-left">
                        {
                            props.message.map((e)=> <p>{e}</p>
                             )
                        }

                    </div>
                </div>
                )

            }
            
        </div>
    )
}