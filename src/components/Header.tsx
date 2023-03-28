import { useEffect, useState } from "react"

export default function Header() {
    const [showSelectModal, setShowSelectModal] = useState<boolean>(false)
    const [currentSelection, setCurrentSelection] =
        useState<string>("sans-serif")

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            console.log("test")
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
                <input type="checkbox" id="darkmode" />
                <label htmlFor="darkmode"></label>
            </div>
        </header>
    )
}
