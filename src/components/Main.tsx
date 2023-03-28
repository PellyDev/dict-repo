export default function Main() {
    return (
        <>
            <main className="main">
                <div className="main-head">
                    <div className="head-left">
                        <h1 className="head-word">zeword</h1>
                        <div className="head-pronounciation">
                            <p className="pronounciation">/ˈkiːbɔːd/</p>
                        </div>
                    </div>
                    <div className="head-right">
                        <div className="head-play">
                            <button className="play-button">
                                <img src="/images/icon-play.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="main-body">
                    <div className="body-noun-container">
                        <div className="noun-divider">
                            <h2>
                                noun
                                <span className="divider">
                                    <hr />
                                </span>
                            </h2>
                        </div>
                        <h3>Meaning</h3>
                        <ul className="meanings">
                            <li className="meaning"></li>
                        </ul>
                        <h3>Synonyms</h3>
                    </div>
                    <div className="body-verb-container">
                        <div className="verb-divider">
                            <h2>verb</h2>
                            <span className="divider">
                                <hr />
                            </span>
                        </div>
                        <h3>Meaning</h3>
                        <ul className="meanings">
                            <li className="meaning"></li>
                        </ul>
                    </div>
                </div>
                <div className="main-footer">
                    <h4>Source</h4>
                    <span>
                        <p></p>
                    </span>
                </div>
            </main>
        </>
    )
}
