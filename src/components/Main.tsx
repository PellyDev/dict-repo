import { useEffect, useState } from "react"
import { IWord, IMeanings } from "../interfaces/interface"

/* this component is only gonna be rendered if api call has been successful, therefore we don't need to check prop type for IWord or null  */
type TProps = {
    data: Array<IWord>
}

export default function Main(props: TProps) {
    const data = props.data[0]
    const headWord = data.word
    const pronounciation = data.phonetics[0]?.text
    const source = data.sourceUrls[0]

    const [playingAudio, setPlayingAudio] = useState<boolean>(false)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    // new audio element is created every time the data prop changes
    useEffect(() => {
        setAudio(
            data.phonetics[0]?.audio ? new Audio(data.phonetics[0].audio) : null
        )
    }, [data])
    // a new event listener is added to the audio element every time the audio element changes
    // new audio useEffect fires -> rerender -> event listener useEffect fires -> rerender
    useEffect(() => {
        if (!audio) return
        audio.addEventListener("ended", handleAudioEnded)
        return () => {
            audio.removeEventListener("ended", handleAudioEnded)
        }
    }, [audio])

    function generateMeanings(
        meanings: Array<IMeanings>,
        partOfSpeech: "noun" | "verb"
    ): Array<JSX.Element> | null {
        // filter the meanings array to only include the array that matches the partOfSpeech
        let flag = false
        const temp = meanings.filter((meaning) => {
            if (flag) return false
            if (meaning.partOfSpeech === partOfSpeech) {
                flag = true
                return meaning
            }
        })
        // if no meaning for verb or noun has been found, return null
        if (temp.length === 0) return null
        // destructure the meaningsList array from the temp array
        const { definitions: meaningsList } = temp[0]
        // map over the meaningsList array and return a new array that contains a list item for each meaning
        return meaningsList.map((meaning, idx) => {
            return (
                <li key={idx} className="meaning">
                    {meaning.definition}
                </li>
            )
        })
    }

    function generateSynonyms(
        meanings: Array<IMeanings>
    ): Array<JSX.Element> | null {
        let flag = false
        const temp = meanings.filter((meaning) => {
            if (flag) return false
            if (meaning.partOfSpeech === "noun") {
                flag = true
                return meaning
            }
        })
        if (temp.length === 0) return null
        const { synonyms: synonymsList } = temp[0]
        if (synonymsList.length === 0) return null

        // return an array with at most 5 synonyms
        return synonymsList.slice(0, 5).map((synonym, idx) => (
            <li key={idx}>
                <p>{synonym}</p>
            </li>
        ))
    }

    function handleAudio(): void {
        if (!audio || playingAudio) return
        audio.play()
        setPlayingAudio(true)
    }

    function handleAudioEnded(): void {
        setPlayingAudio(false)
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
                            <button
                                onClick={handleAudio}
                                className="play-button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="75"
                                    height="75"
                                    viewBox="0 0 75 75"
                                >
                                    <g
                                        className={
                                            !audio || playingAudio
                                                ? "disabled"
                                                : ""
                                        }
                                        fill="#A445ED"
                                        fillRule="evenodd"
                                    >
                                        <circle
                                            cx="37.5"
                                            cy="37.5"
                                            r="37.5"
                                            opacity=".25"
                                        />
                                        <path d="M29 27v21l21-10.5z" />
                                    </g>
                                </svg>
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
                        {generateMeanings(data.meanings, "noun") === null ? (
                            <h3>No noun found</h3>
                        ) : (
                            <>
                                <h3>Meanings</h3>
                                <ul className="meanings">
                                    {generateMeanings(data.meanings, "noun")}
                                </ul>
                            </>
                        )}
                        <div className="synonyms-container">
                            {generateSynonyms(data.meanings) === null ? (
                                <h3>No synonyms found</h3>
                            ) : (
                                <>
                                    <h3>Synonyms</h3>
                                    <ul className="synonyms">
                                        {generateSynonyms(data.meanings)}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="body-verb-container">
                        <div className="verb-divider">
                            <h2>verb</h2>
                            <hr className="divider" />
                        </div>
                        {generateMeanings(data.meanings, "verb") === null ? (
                            <h3>No verbs found</h3>
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
