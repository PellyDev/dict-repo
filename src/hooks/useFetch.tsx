import React, { useState } from "react"
import { IWord, IError } from "../interfaces/interface"

export type TData = Array<IWord> | IError | null

export function useFetch() {
    const [data, setData] = useState<TData>(null)
    const [err, setErr] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    async function fetchUrl(url: string) {
        setLoading(true)
        setData(null)
        try {
            const res = await fetch(url)
            if (!res.ok) setErr(res.status)
            const json = await res.json()
            setData(json)
        } catch (e) {
            console.log
            setErr(e)
        } finally {
            setLoading(false)
        }
    }
    return { data, err, loading, fetchUrl }
}
