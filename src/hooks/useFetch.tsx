import React, { useState } from "react"
import { IWord, IError } from "../interfaces/interface"

export type TData = Array<IWord> | IError | null

export function useFetch() {
    const [data, setData] = useState<TData>(null)
    const [err, setErr] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    async function fetchUrl(url: string, cb?: () => void) {
        setLoading(true)
        try {
            const res = await fetch(url)
            if (!res.ok) setErr(res.status)
            const json = await res.json()
            setData(json)
        } catch (e) {
            setErr(e)
        } finally {
            setLoading(false)
            if (cb) cb()
        }
    }
    return { data, setData, err, setErr, loading, fetchUrl }
}
