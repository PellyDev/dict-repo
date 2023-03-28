import React, { useState } from "react"
import Header from "./components/Header"

function App() {
    const [searchTerm, setSearchTerm] = useState<string>("")

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value)
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        /* api call here */
        setSearchTerm("")
    }
    console.log(searchTerm)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    return (
        <>
            <Header
                darkMode={{
                    isDarkMode,
                    setIsDarkMode,
                }}
            />
            <form className="searchbar" onSubmit={handleFormSubmit}>
                <input
                    onChange={handleInputChange}
                    value={searchTerm}
                    type="text"
                    placeholder="Search for any word..."
                />
                <button type="submit">
                    <img src="/images/icon-search.svg" alt="" />
                </button>
            </form>
        </>
    )
}

export default App
