import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversation() {
    const {conversations, selectConversationIndex} = useConversations()
    return (
        <ListGroup variant="flush">
            {
                conversations.map((conversation, index )=> (
                    <ListGroup.Item
                        key={index}
                        action
                        onClick={()=>selectConversationIndex(index)}
                        active={conversation.selected}>
                        {conversation.members.map(member=>member.name).join(', ')}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}
