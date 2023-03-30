import React, { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import { useFetch } from "./hooks/useFetch"

import { IWord, IError } from "./interfaces/interface"
import { TData } from "./hooks/useFetch"

const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

function App() {
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { data, setData, err, setErr, loading, fetchUrl } = useFetch()
    const errorText = isInvalid
        ? "Please enter a word or remove invalid characters."
        : "The word you've searched could not be found. Please try another one!"
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsInvalid(false)
        setErr(null)
        setSearchTerm(e.target.value)
    }

    function inputValidation(input: string): boolean {
        // returns true if input is not empty and only contains english letters (a-z, A-Z)
        const regExp = new RegExp(/^[a-zA-Z]+$/)
        return regExp.test(input)
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (inputValidation(searchTerm.trim())) {
            fetchUrl(API_BASE_URL + searchTerm.trim())
            setSearchTerm("")
        } else {
            setIsInvalid(true)
        }
    }

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
                    className={isInvalid || err ? "invalid" : ""}
                    onChange={handleInputChange}
                    value={searchTerm}
                    type="text"
                    placeholder="Search for any word..."
                />
                <p className={`error-text ${isInvalid || err ? "active" : ""}`}>
                    {errorText}
                </p>

                <button type="submit">
                    <img src="/images/icon-search.svg" alt="" />
                </button>
            </form>
            {(data as Array<IWord>)?.[0]?.word && (
                <Main data={data as Array<IWord>} />
            )}
        </>
    )
}

export default App
