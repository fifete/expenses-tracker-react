import React from 'react'
import { useCategories } from '../contexts/CategoriesContext'

import { Stack } from 'react-bootstrap'

export const Expense = ({ expense, handleShowDelete, handleShowEdit }) => {
    return (
        <>
            <div className='categ-spent'>
                <Stack direction="vertical" gap="2" className='card-custom'>
                    <div>
                        <p className='ff-remark fs-smallest fw-500'>{expense.description}</p>
                        <span className='ff-price'>${expense.amount}</span>
                    </div>
                    <div>
                        <p className='ff-price fs-smallest fw-300'>{expense.date}</p>
                        <p className='ff-price fs-smallest fw-300'>{expense.time}</p>
                    </div>
                </Stack>
                <div className='spent-edit-tools'>
                    <i 
                    className='uil uil-edit'
                    onClick={handleShowEdit}></i>
                    <i 
                    className='uil uil-trash'
                    onClick={handleShowDelete}></i>
                </div>
            </div>
        </>
    )
}
