import { useState } from "react"

export function useFetch() {
    const [data, setData] = useState<any>(null)
    const [err, setErr] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    async function fetchUrl(url: string) {
        setLoading(true)
        try {
            const res = await fetch(url)
            if (!res.ok) setErr(res.status)
            const json = await res.json()
            setData(json)
        } catch (error) {
            setErr(err)
        } finally {
            setLoading(false)
        }
    }
    return { data, err, loading, fetchUrl }
}
