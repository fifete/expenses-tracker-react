import React from 'react'
import { Categories } from './Categories'
import { Welcome } from './Welcome'

export const Home = () => {
    return (
        <div className='home'>
            <Welcome />
            <Categories />
        </div>
    )
}
