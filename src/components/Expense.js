import React from 'react'
import '../styles/expenseCard.css';

export const Expense = ({ expense, handleShowDelete, handleShowEdit }) => {
    return (
        <>
            <div className='grid categ-spent'>
                <div className='categ-spent-card card-custom custom-stack-0-5'>
                    <div className='flex spent_row1'>
                        <p className='ff-remark fs-smallest fw-500'>{expense.description}</p>
                        <span className='ff-price'>${expense.amount}</span>
                    </div>
                    <div className='flex spent_row2'>
                        <p className='ff-price fs-smallest fw-300'>{expense.time}</p>
                        <p className='ff-price fs-smallest fw-300'>{expense.date}</p>
                    </div>
                </div>
                <div className='flex spent-edit-tools'>
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
