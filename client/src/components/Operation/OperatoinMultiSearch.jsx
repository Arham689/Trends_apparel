import useFetch from '@/hooks/useFetch'
import Pill from './Pill'
import React, { useEffect, useRef, useState } from 'react'

const base_url = import.meta.env.VITE_BASE_API_URL

const OperatoinMultiSearch = ({setFormValues , initialValues}) => {
    const [operationList, setOperationList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedUserSet, setSelectedUserSet] = useState(new Set())
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [isFocused, setIsFocused] = useState(false);
    const { data, isLoading, error } = useFetch(`${base_url}/api/v1/operation`)
    const inputRef = useRef(null)

    console.log("initail values" , initialValues )
    useEffect(() => {
        if (initialValues.operations) {
            setSelectedUsers(initialValues.operations);
    
            const operationIdSet = initialValues.operations.map(i => i._id);
    
            const temp = new Set(operationIdSet); // ✅ this creates a Set of operation IDs
    
            setSelectedUserSet(temp); // if you want to save it to state
        }
    }, []);

    useEffect(() => {
        if (data) {
        setOperationList(data)
        setSuggestions(data)
        }
    }, [isLoading])

    useEffect(() => {
        if (searchTerm.trim() === "") {
        setSuggestions(operationList)
        } else {
        const filtered = operationList.filter(op =>
            op.operationName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSuggestions(filtered)
        setActiveSuggestion(0)
        }
    }, [searchTerm])

    const handleSelectUser = (user) => {
        if (selectedUserSet.has(user._id)) return;
    
        const updatedUsers = [...selectedUsers, user];
    
        setSelectedUsers(updatedUsers);
        setSelectedUserSet(new Set([...selectedUserSet, user._id]));
        setSearchTerm("");
        setSuggestions(operationList);
    
        setFormValues((prev) => ({
            ...prev,
            operations: updatedUsers,
        }));
    
        inputRef.current.focus();
        setTimeout(() => {
            setIsFocused(true);
        }, 100);
    };
    

    const handleRemoveUser = (user) => {
        const updatedUsers = selectedUsers.filter(u => u._id !== user._id)
        setSelectedUsers(updatedUsers)

        setFormValues((prev)=>{
            return { ...prev 
                , "operations" : updatedUsers
            }
        })

        const updatedSet = new Set(selectedUserSet)
        updatedSet.delete(user._id)
        setSelectedUserSet(updatedSet)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Backspace" && searchTerm === "" && selectedUsers.length > 0) {
        const lastUser = selectedUsers[selectedUsers.length - 1]
        handleRemoveUser(lastUser)
        } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveSuggestion(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : 0))
        } else if (e.key === "Enter") {
        if (suggestions.length > 0 && activeSuggestion >= 0) {
            handleSelectUser(suggestions[activeSuggestion])
        }
        }
    }

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="w-full">
        <div className="flex items-center flex-wrap gap-2 p-2 border border-gray-300 rounded-md">
            {selectedUsers.map((item , i ) => (
            <Pill
                i = {i}
                key={item._id}
                text={item.operationName}
                onClick={() => handleRemoveUser(item)}
            />
            ))}
            <input
            type="text"
            ref={inputRef}
            className="outline-none flex-1 min-w-[150px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search operation..."
            onBlur={() => setTimeout(() => setIsFocused(false), 100)} 
            onFocus={() => setIsFocused(true)}
            />
        </div>

        { isFocused && suggestions.length > 0 && (
            <ul className="border absolute bg-white w-full border-gray-300 mt-2 rounded-md max-h-60 overflow-y-auto">
            {suggestions.map((item, idx) => (
                <li
                key={item._id}
                className={`p-2 cursor-pointer gap-3 m-2 rounded-md 
                    ${idx === activeSuggestion ? 'bg-gray-300' : ''} 
                    ${selectedUserSet.has(item._id) && 'bg-indigo-100  text-primary' }
                    ${idx === activeSuggestion  && selectedUserSet.has(item._id) && 'bg-indigo-200'}
                    `}
                onClick={() => handleSelectUser(item)}
                >
                {item.operationName}
                </li>
            ))}
            </ul>
        )}
        </div>
    )
}

export default OperatoinMultiSearch
