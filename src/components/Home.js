import React from 'react'
import { Categories } from './Categories'

export const Home = () => {
    return (
        <div className='home'>
            <div className='home-welcome'>
                <div>
                    <h4>Hello,
                        <span>Daniela</span>
                    </h4>
                    <button>Log In</button>
                </div>
                <div>
                    <h5>Expenses Today</h5>
                    <h1>$29.4</h1>
                </div>
                <div>
                    <div>
                        <span>+</span>
                        <p>Expense</p>
                    </div>
                    <div>
                        <span>+</span>
                        <p>Stats</p>
                    </div>
                </div>
            </div>
            <Categories />
        </div>
    )
}
