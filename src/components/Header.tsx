import { useState } from "react"

function openSelect() {}

export default function Header() {
    const [showSelectModal, setShowSelectModal] = useState<boolean>(false)
    const [currentSelection, setCurrentSelection] =
        useState<string>("Sans Serif")

    return (
        <header className="header">
            <div className="nav-left">
                <img src="images/logo.svg" alt="" />
            </div>
            <div className="nav-right">
                <div onClick={openSelect} className="select-container">
                    <div className="select-current">{currentSelection}</div>
                    {showSelectModal && (
                        <div className="select-modal">
                            <div className="select-modal-item">Sans Serif</div>
                            <div className="select-modal-item">Serif</div>
                            <div className="select-modal-item">Monospace</div>
                        </div>
                    )}
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
