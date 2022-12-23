import React from 'react'

export const CategoryView = () => {
    return (
        <div>
            <div>
                <div>
                    <i>⬅</i>
                    <i>🔘</i>
                </div>
                <div>
                    <i>🍔</i>
                    <h2>Food</h2>
                    <div>
                        <div>
                            <h5>$14.5</h5>
                            <h5> / $20</h5>
                        </div>
                        <div className='categ-percent-bar'></div>
                    </div>
                </div>
            </div>
            <div>
            <button>Add Expense</button>
                <div className='categ-expenses'>
                    <div className='categ-spent'>
                        <div className='spent-info'>
                            <div>
                                <p>Hamburguer</p>
                                <h5>$5.3</h5>
                            </div>
                            <div>
                                <p>8:21 pm</p>
                                <p>12/21/2022</p>
                            </div>
                        </div>
                        <div className='spent-edit-tools'>
                            <i>🖋</i>
                            <i>🗑</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
