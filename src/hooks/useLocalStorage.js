import {useEffect, useState} from 'react'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    
    const [value, setValue] = useState(() => {
        //check if key already exists
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)
        
        //if not, setValue as innitialValue, save it to localstorage
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [value, prefixedKey])
    
    return [value,setValue]
}
