import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import { useFetch } from "./hooks/useFetch"

import { IWord } from "./interfaces/interface"

const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

function App() {
    function detectDarkMode(): boolean {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    const [isDarkMode, setIsDarkMode] = useState<boolean>(detectDarkMode())
    const [initialDarkMode, setInitialDarkMode] = useState<boolean>(true)
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { data, setData, err, setErr, loading, fetchUrl } = useFetch()

    const errorText = isInvalid
        ? "Please enter a word or remove invalid characters."
        : "The word you've searched for could not be found. Please try another one!"

    // detect dark mode by checking the user's system preference
    useEffect(() => {
        const root = document.querySelector(":root") as HTMLElement
        if (isDarkMode) {
            root.style.setProperty("--color-bg", "var(--color-dark-bg)")
            root.style.setProperty(
                "--color-primary",
                "var(--color-dark-primary)"
            )
            root.style.setProperty(
                "--color-primary-light",
                "var(--color-dark-primary-light)"
            )
        } else {
            root.style.setProperty("--color-bg", "var(--color-light-bg)")
            root.style.setProperty(
                "--color-primary",
                "var(--color-light-primary)"
            )
            root.style.setProperty(
                "--color-primary-light",
                "var(--color-light-primary-light)"
            )
        }
        // set the transition for bg color after the initial dark mode setup so that the bg color doesn't change when the page is first loaded
        if (initialDarkMode) {
            const bodyStyle = document.body.style
            // timeout so the transition doesn't immediately apply after rerender
            setTimeout(() => {
                bodyStyle.transition = "background-color 400ms ease-in-out"
            }, 50)
            setInitialDarkMode(false)
        }
    }, [isDarkMode])

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
