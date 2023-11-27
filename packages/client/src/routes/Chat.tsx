import { useNavigate, useParams } from "react-router";
import { proposition } from "../databaseInMem/controllers/proposition.controller";
import { message } from "../databaseInMem/controllers/message.controller";
import auth from "../services/auth.service";
import { useState } from "react";

import '../styles/chat.style.css';
import { historic } from "../databaseInMem/controllers/historic.controller";
import { user } from "../databaseInMem/controllers/user.controller";

const Chat = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ newMessage , setNewMessage ] = useState('');

    const thisProp = proposition.itens.find((data) => {
        return id && data.propositionId === parseInt(id)
    })

    const thisMessages = message.itens.filter( (data) => {
        return id && data.propositionId === parseInt(id)
    })

    const submitHandle = () =>
    {
        if(id && auth.loggedId)
        message.inMemCreateMessage({
            message: newMessage,
            senderId: auth.loggedId,
            propositionId: parseInt(id),
            situation: true,
            messageId: -999
        })
    }

    const changeHandle = ( e: any ) =>
    {
        setNewMessage(e.currentTarget.value);
    }    

    return (
        <div className='body'>
            <div className="chat">
                <h3>Conversa com {
                    ((thisProp && thisProp.receiverId === auth.loggedId) &&
                    user.itens.find((data) => {return thisProp.senderId === data.userId})?.username) ||
                    ((thisProp && thisProp.senderId === auth.loggedId) &&
                    user.itens.find((data) => {return thisProp.receiverId === data.userId})?.username)             
                }</h3>
                <div className="chat-container">
                    { 
                    thisMessages.map( (data) => {
                        if(document.getElementsByClassName('chat-container')[0])
                            document.getElementsByClassName('chat-container')[0].scrollTop = document.getElementsByClassName('chat-container')[0].scrollHeight;

                        if(auth.loggedId === data.senderId)
                        {                            
                            return <div className="receiver">{data.message}</div>
                        }
                        else
                        {
                            return <div className="sender">{data.message}</div>
                        }
                            
                    })
                   }
                </div>
                <label className="chat-input-field" onKeyDown={(e) => {
                    if(e.key === 'Enter')
                    {
                        setNewMessage('');
                        submitHandle();
                        navigate('');
                    }
                }}>
                    <input type="text" id="message" onChange={(e) => {changeHandle(e)}} value={newMessage}></input>
                    <button onClick={() => {
                        setNewMessage('');
                        submitHandle();
                        navigate('');
                    }}>Enviar</button>
                </label>
            </div>
            <div className="buttons-container">
                <button onClick={() => {
                    if(thisProp)
                    if(window.confirm('Tem certeza que deseja cancelar a troca ?'))
                    proposition.inMemUpdateProposition({
                        ...thisProp,
                        situation: false
                    }, thisProp.propositionId)

                    navigate('');
                }}>Cancelar a troca</button>
                <button onClick={() => {
                    if(thisProp)
                    {
                        if(window.confirm('Tem certeza que deseja confirmar a troca ?'))
                        proposition.inMemUpdateProposition({
                            ...thisProp,
                            situation: false
                        }, thisProp.propositionId)              

                        historic.inMemCreateHistoric({
                            historicId: -9999,
                            propositionId: thisProp.propositionId,
                            situation: true,
                            data: undefined
                        })
                        
                        alert('Troca adicionada ao histórico!');
                        navigate('/');

                    }
                }}>Confirmar Troca</button>
            </div>
        </div>
    )
}

export default Chat;