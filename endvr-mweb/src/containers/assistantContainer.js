import React from 'react';
import '../styles/assistant.css';
import { Input } from 'reactstrap';
import ShowMessages from '../models/chat/showMessages';
import Configs from '../configs/configs';

class AssistantContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.defaultChatMessage = [
            {
                "traceId": "",
                "chatMessageId": "",
                "chatId": "",
                "conversationId": "",
                "messages": [ "Welcome, is there anything I can help you find?" ],
                "senderType": "bot",
            }
        ]

        this.state = {
            chatId : "", 
            avatar : "agent",
            chatMessages : this.defaultChatMessage,
            metaData : null
        }

        this.send = this.send.bind(this);
    }

    componentDidMount(){
        fetch(Configs.endvrApiUrl + 'chat/idt-1-1/private', {
            method: 'GET',
            headers: {
                'Authorization': 'auth' 
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                chatId : response.payload.chatMessages[0].chatId,
                chatMessages : response.payload.chatMessages,
                metaData: response.metadata
            },()=>{
                this.forceUpdate();
            });   
        });
    }

    send(pressed) {
        if (pressed.key === 'Enter') {
            var chatMessage = document.getElementById("chatSubmit");
            var message = chatMessage.value;
            var tempMessageId =  'temp-';
            var newMessage = {
                "chatMessageId" : tempMessageId,
                "chatId" : this.state.chatId,
                "messages" : [ message ],
                "senderType" : "client"
            };
            
            this.state.chatMessages.push(newMessage);  
            this.forceUpdate();          
            chatMessage.value = "";

            fetch(Configs.endvrApiUrl + 'chat/idt-1-1/private', {
                method: 'POST',
                headers: {
                    'Authorization': 'auth',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newMessage)
            })
            .then(response => response.json())
            .then(response => {
                var tempMessageId = response.payload.tempChatMessageId;
                var messages = response.payload.chatMessages;
                var sentChatMessage = messages[0];
                var responseChatMessage = messages[1];
                
                //need to update message details for original chat
                this.state.chatMessages.push(responseChatMessage);  
                this.forceUpdate();          
            });
                

            //this needs to send the new message to the service to get watson response
            //+ this also need to get back the chatMessageId assigned during storage
            //also need to set a loading icon and clear after in chat client
            //we also need user preferences at some point for avatar + identity for name
        }
    }

    render() {
        return (
        <div className = "assistant-window">
            <div className = "assistant-show">
                <ShowMessages chatMessages={this.state.chatMessages} avatar = {"agent"} userName = {"aj"} />
            </div>
            <div className = "assistant-chat">
                <Input autoFocus placeholder = "Message Eileen" id="chatSubmit" onKeyUp={this.send} />
            </div>
        </div>
        )
    }

}

export default AssistantContainer;