import { useEffect, useState } from "react"

type TProps = {
    darkMode: {
        isDarkMode: boolean
        setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export default function Header(props: TProps) {
    const { isDarkMode, setIsDarkMode } = props.darkMode

    const [showSelectModal, setShowSelectModal] = useState<boolean>(false),
        [currentSelection, setCurrentSelection] = useState<string>("sans-serif")

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            const target = e.target as HTMLDivElement
            if (
                target.classList.contains(".select-container") ||
                target.closest(".select-container")
            )
                return
            setShowSelectModal(false)
        }
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    function handleModalSelection(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        setCurrentSelection(target.id)
    }

    function displayCurrentSelection(sel: string): string {
        switch (sel) {
            case "sans-serif":
                return "Sans Serif"
            case "serif":
                return "Serif"
            case "mono":
                return "Mono"
            default:
                return "Sans Serif"
        }
    }

    const bodyStyle = document.body.style
    switch (currentSelection) {
        case "sans-serif":
            bodyStyle.setProperty("font-family", "var(--ff-sans-serif)")
            break
        case "serif":
            bodyStyle.setProperty("font-family", "var(--ff-serif)")
            break
        case "mono":
            bodyStyle.setProperty("font-family", "var(--ff-mono)")
            break
    }

    return (
        <header className="header">
            <div className="nav-left">
                <img src="images/logo.svg" alt="" />
            </div>
            <div className="nav-right">
                <div
                    onClick={() => setShowSelectModal((prev) => !prev)}
                    className="select-container"
                >
                    <div className="select-current">
                        {displayCurrentSelection(currentSelection)}
                    </div>
                    <div
                        style={isDarkMode ? { backgroundColor: "#323232" } : {}}
                        className={`select-modal ${
                            showSelectModal ? "active" : ""
                        }`}
                    >
                        <div
                            id="sans-serif"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleModalSelection(e)
                            }}
                            className={`select-modal-item ${
                                currentSelection === "sans-serif"
                                    ? "selected"
                                    : ""
                            }`}
                        >
                            Sans Serif
                        </div>
                        <div
                            id="serif"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleModalSelection(e)
                            }}
                            className={`select-modal-item ${
                                currentSelection === "serif" ? "selected" : ""
                            }`}
                        >
                            Serif
                        </div>
                        <div
                            id="mono"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleModalSelection(e)
                            }}
                            className={`select-modal-item ${
                                currentSelection === "mono" ? "selected" : ""
                            }`}
                        >
                            Mono
                        </div>
                    </div>
                    <img src="images/icon-arrow-down.svg" alt="" />
                </div>
                <img src="images/divider.svg" alt="" />
                <div
                    className="dark-mode"
                    onClick={() => {
                        setIsDarkMode((prev) => !prev)
                    }}
                >
                    <svg
                        className={`${isDarkMode ? "active" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                    >
                        <path
                            stroke="#838383"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                        />
                    </svg>
                    <p className={`${isDarkMode ? "active" : ""}`}>
                        {isDarkMode ? "On" : "Off"}
                    </p>
                </div>
            </div>
        </header>
    )
}
