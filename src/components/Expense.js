import React from 'react'
import { useCategories } from '../contexts/CategoriesContext'

import { Stack } from 'react-bootstrap'

export const Expense = ({ expense, handleShowDelete, handleShowEdit }) => {
    console.log('expense', expense.date)
    return (
        <>
            <div className='categ-spent'>
                <Stack direction="vertical" gap="2">
                    <div>
                        <p>{expense.description}</p>
                        <h5>${expense.amount}</h5>
                    </div>
                    <div>
                        <p>{expense.date}</p>
                        <p>{expense.time}</p>
                    </div>
                </Stack>
                <div className='spent-edit-tools'>
                    <i onClick={handleShowEdit}>🖋</i>
                    <i onClick={handleShowDelete}>🗑</i>
                </div>
            </div>
        </>
    )
}
