import React from 'react'
import { Stack } from 'react-bootstrap'

export const Expense = ({ expense }) => {
    return (
        <div className='categ-spent'>
            <Stack direction="vertical" gap="2">
                <div>
                    <p>{expense.description}</p>
                    <h5>${expense.amount}</h5>
                </div>
                <div>
                    <p>{expense.date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>{expense.date.toLocaleString().split(',')[0]}</p>
                </div>
            </Stack>
            <div className='spent-edit-tools'>
                <i>🖋</i>
                <i>🗑</i>
            </div>
        </div>
    )
}
