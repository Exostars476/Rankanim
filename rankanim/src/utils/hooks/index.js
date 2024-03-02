import { useEffect, useState } from 'react'

export function useFetch(url) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return

        setIsLoading(true)

        async function fetchData() {
            try {
                console.log('Fetching data from : ' + url)
                const response = await fetch(url)
                const data = await response.json()

                console.log('DATA : ' + data)
                setData(data)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, isLoading, error }
}
