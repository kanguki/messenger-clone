import React, { useRef } from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
    
    const idRef = useRef()
    const nameRef = useRef() //somewhat means this:const nameRef = document.getElementByRef(nameRef)
    const {createContact} = useContacts()   //extract createContact out from useContacts

    const handleSubmit = (e) => {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create contact</Modal.Header>
            <Modal.Body >
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

