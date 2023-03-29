import { IWord, IError, IMeanings } from "../interfaces/interface"

/* this component is only gonna be rendered if api call has been successful, therefore we don't need to check prop type for IWord or null  */
type TProps = {
    data: Array<IWord>
}

export default function Main(props: TProps) {
    const data = props.data[0]

    const headWord = data.word
    const pronounciation = data.phonetics[0]?.text
    const audio = data.phonetics[0]?.audio
    const source = data.sourceUrls[0]

    function generateMeanings(
        meanings: Array<IMeanings>,
        partOfSpeech: "noun" | "verb"
    ): Array<JSX.Element> | undefined {
        // filter the meanings array to only include the array that matches the partOfSpeech
        let flag = false
        const temp = meanings.filter((meaning) => {
            if (flag) return false
            if (meaning.partOfSpeech === partOfSpeech) {
                flag = true
                return meaning
            }
        })
        // if no meaning for verb or noun has been found, return undefined
        if (temp.length === 0) return undefined
        // destructure the nounMeanings array from the temp array
        const { definitions: meaningsList } = temp[0]
        // map over the nounMeanings array and return a new array that contains a list item for each meaning
        return meaningsList.map((meaning, idx) => {
            return (
                <li key={idx} className="meaning">
                    {meaning.definition}
                </li>
            )
        })
    }

    return (
        <>
            <main className="main">
                <div className="main-head">
                    <div className="head-left">
                        <h1 className="head-word">{headWord}</h1>
                        <div className="head-pronounciation">
                            <p className="pronounciation">{pronounciation}</p>
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
                            <h2>noun</h2>
                            <hr className="divider" />
                        </div>
                        {generateMeanings(data.meanings, "noun") ===
                        undefined ? (
                            <h3>No noun found 😢</h3>
                        ) : (
                            <>
                                <h3>Meanings</h3>
                                <ul className="meanings">
                                    {generateMeanings(data.meanings, "noun")}
                                </ul>
                            </>
                        )}
                        <div className="synonyms-container">
                            <h3>Synonyms</h3>
                            <ul className="synonyms">
                                <li>
                                    <a href="">big pp</a>
                                </li>
                                <li>
                                    <a href="">big pp</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="body-verb-container">
                        <div className="verb-divider">
                            <h2>verb</h2>
                            <hr className="divider" />
                        </div>
                        {generateMeanings(data.meanings, "verb") ===
                        undefined ? (
                            <h3>No verbs found 😢</h3>
                        ) : (
                            <>
                                <h3>Meanings</h3>
                                <ul className="meanings">
                                    {generateMeanings(data.meanings, "verb")}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <hr />
                <div className="main-footer">
                    <h4>Source</h4>
                    <a href={source} target="_blank">
                        {source}
                    </a>
                    <img src="images/icon-new-window.svg" alt="" />
                </div>
            </main>
        </>
    )
}
