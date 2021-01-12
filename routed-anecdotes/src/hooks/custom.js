import { useState } from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    const onClick = () => {
        setValue('')
    }
    return { type, value, onChange, onClick}
}

export default useField