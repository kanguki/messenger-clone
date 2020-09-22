import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import OpenConversation from '../OpenConversation.js/OpenConversation'
import Sidebar from '../Sidebar/Sidebar'

export default function Dashboard({ id }) {
    
    const {selectedConversation} = useConversations()

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={id} />
            {/* shortcut for if(selectedConversationIndex) render <OpenConversation /> */}
            {selectedConversation && <OpenConversation />} 
        </div>
    )
}
