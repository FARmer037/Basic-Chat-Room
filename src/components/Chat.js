import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, IconButton } from '@material-ui/core'
import './Chat.css'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import db from '../firebase/firebase'

const Chat = () => {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        setInput('')
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${false && "chat__reciever"}`}>
                    <span className='chat_name'>Tom Riddle</span>
                    Hey Guys
                    <span className='chat__timestamp'>2.55pm</span>
                </p>
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className='chat_name'>Mustofa Saci</span>
                    Hey Guys
                    <span className='chat__timestamp'>3.25pm</span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)} />
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
