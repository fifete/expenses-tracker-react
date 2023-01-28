import React from 'react'

export const ComingSoon = () => {
    return (
        <div className='flex'
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "black",
                position: 'absolute',
                height: '100%'
            }}>
            <img
                alt='coming-soon'
                src="/coming-soon.jpg"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: "center"
                }}
            />
        </div>
    )
}
