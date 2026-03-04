'use client'

import { PageHomeBreedList } from './components'
import css from './home.module.scss'
import Lenis from 'lenis'
import { useEffect } from 'react'

function PageHome() {
    const name = `PageHome`

    useEffect(() => {
        const lenis = new Lenis({
            infinite: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div className={css[name]}>
            <PageHomeBreedList />
        </div>
    )
}

export { PageHome }
