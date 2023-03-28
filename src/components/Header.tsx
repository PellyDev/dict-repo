import { useState } from "react"

export default function Header() {
    const [showSelectModal, setShowSelectModal] = useState<boolean>(false)
    const [currentSelection, setCurrentSelection] =
        useState<string>("sans-serif")

    function handleModalSelection(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        setCurrentSelection(target.id)
        // set the font family based on selection in the modal
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
                            onClick={handleModalSelection}
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
                            onClick={handleModalSelection}
                            className={`select-modal-item ${
                                currentSelection === "serif" ? "selected" : ""
                            }`}
                        >
                            Serif
                        </div>
                        <div
                            id="mono"
                            onClick={handleModalSelection}
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
                <label className="darkmode">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </header>
    )
}
