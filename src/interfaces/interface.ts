/* interface for API response -> https://api.dictionaryapi.dev/api/v2/entries/en/ */

export interface IWord {
    license: { name: string; url: string }
    meanings: Array<IMeanings>
    phonetic: string
    phonetics: Array<IPhonetics>
    sourceUrls: Array<string>
    word: string
}

export interface IMeanings {
    antonyms: Array<string>
    definitions: Array<IDefinitions>
    partOfSpeech: string
    synonyms: Array<string>
}

export interface IDefinitions {
    definition: string
    synonyms: Array<string>
    antonyms: Array<string>
}

export interface IPhonetics {
    audio: string
    license: { name: string; url: string }
    sourceUrl: string
    text: string
}
