import React, { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import { useFetch } from "./hooks/useFetch"

const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

function App() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { data, err, loading, fetchUrl } = useFetch()
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value)
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        fetchUrl(API_BASE_URL + searchTerm)
        setSearchTerm("")
    }

    console.log(data)
    if (err) console.log(err)

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
            {loading ? (
                <div style={{ fontSize: "100px" }}>Loading...</div>
            ) : (
                <Main />
            )}
        </>
    )
}

export default App
