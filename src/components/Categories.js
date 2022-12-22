import React from 'react'

export const Categories = () => {
  return (
    <div className='categories'>
      <div>
        <h3>Categories</h3>
        <button>+</button>
      </div>
      <div className='categories'>
        <div>
          <div>
            <i>🍔</i>
            <p>Food</p>
            <h2>$14.5</h2>
          </div>
          <div className='categ-percent-bar'></div>
        </div>
      </div>
    </div>
  )
}
