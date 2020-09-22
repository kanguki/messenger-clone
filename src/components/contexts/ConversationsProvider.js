import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}
export function ConversationsProvider({id, children}) {
    
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex]=useState(0)
    const {contacts} = useContacts()
    const socket = useSocket()

    const createConversation = (memberIds) => {
        setConversations(prevConversations => {
            return [...prevConversations, { memberIds, messages: [] }]
        })
    }
    const addMessageToConversation = useCallback(({ memberIds, text, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversation =                   
                prevConversations.map(
                    conversation => {
                        if (arrayEquality(conversation.memberIds, memberIds)) {
                            madeChange = true
                            return {...conversation, messages: [...conversation.messages, newMessage]}
                        }
                        return conversation
            })
            if (madeChange) {
                return newConversation
            } else { 
                return [...prevConversations, {memberIds, messages:[newMessage]} ]
            }
        })
    }, [setConversations])
    
    useEffect(() => {
        if (socket === null) return
        console.log(socket)
        if (socket) {     
            socket.on('receive-message', addMessageToConversation)
            return ()=>socket.off('receive-message')
        }
    },[socket, addMessageToConversation])

    function sendMessage(memberIds, text) {
        socket.emit('send-message', {memberIds, text})
        addMessageToConversation({memberIds, text, sender: id})
    }

    //array of conversations that each conversation includes id, name of each member, and status(selected or not)
    const formattedConversations = conversations.map((conversation, index) => {
        const members = conversation.memberIds.map(memberId => {   //for each recipient(id) in the conversation,
                                                                    //find its full version ( id and name)(contact)
            const member = contacts.find(contact => contact.id === memberId)
            const name = (member && member.name) || memberId //if we have the contact name, grab it, or else grab the recipient
            return {id: memberId, name}
        })

        const messages = conversation.messages.map(message => {
            const member = contacts.find(contact => contact.id === message.sender)
            const name = (member && member.name) || message.sender
            const fromMe = id === message.sender
            return {...message, senderName: name, fromMe}
        })

        const selected = index === selectedConversationIndex
        //for each conversation, return its full body and its member's name and state(selected or not)
        return {...conversation, messages, members, selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        sendMessage,
        createConversation
    }
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false
    a.sort()
    b.sort()
    return a.every((element, index) => {
        return element === b[index]
    })
}