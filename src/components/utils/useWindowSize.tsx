import { useState, useEffect } from 'react'

function getWindowSize() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

export function useWindowSize() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowSize())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowSize())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}
