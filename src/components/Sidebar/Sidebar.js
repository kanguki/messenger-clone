import React, { useState } from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import Contacts from '../Contacts/Contacts'
import Conversation from '../Conversation/Conversation'
import NewContactModal from '../NewContactModal/NewContactModal'
import NewConversationModal from '../NewConversationModal/NewConversationModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {
    const [activeKey,setActiveKey] = useState(CONVERSATIONS_KEY)
    const conversationsIsOpen = activeKey === CONVERSATIONS_KEY
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    function closeModal(){
        setModalIsOpen(false)
    }

    return (
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={eKey => setActiveKey(eKey)}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your ID is <span className="text-muted">{id}</span>
                </div>
                <Button onClick={()=>setModalIsOpen(true)} className="rounded-0">
                    New {conversationsIsOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalIsOpen} onHide={closeModal}>
                {conversationsIsOpen
                    ? <NewConversationModal closeModal={closeModal}/>
                    : <NewContactModal closeModal={closeModal}/>
                }
            </Modal>

        </div>
    )
}
