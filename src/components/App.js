import React  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import { ContactsProvider } from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider'
import { SocketProvider } from './contexts/SocketProvider'


const App = () => {
    
    const [id,setId] = useLocalStorage('id')
    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                <Dashboard id={id}/> 
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )

    return (
        <>
            {id
                ? dashboard
                : <Login onIdSubmit={setId} />
            }
        
        </>
    )
}
export default App;