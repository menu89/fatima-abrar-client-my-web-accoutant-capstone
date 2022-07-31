import './SingleTransaction.scss';
import DeleteTransaction from './DeleteTransaction';
import editSvg from '../../assets/icon/edit.svg';
import deleteSvg from '../../assets/icon/remove.svg';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';

function SingleTransaction ({tranData, tranType}) {
    const [loadDelete, setLoadDelete] = useState(false)
    const [redirectStatus, setRedirectStatus] = useState(false)

    //convert timestamp to string
    const adjustTimestamp = (timeData) => {
        const convertDate = new Date(timeData).toDateString()
        return convertDate
    }

    const {Credit, Debit, Description,amount,Transaction_timestamp,Bank_type} = tranData
    const convertTimestamp = adjustTimestamp(Transaction_timestamp)
    let paymentAcc = ''
    let accType = ''
    let accTypeHeadingText = ''

    if (Bank_type === 'd') {
        paymentAcc = Debit
        accType = Credit
        accTypeHeadingText = 'Income Account'
    } else if (Bank_type === 'c') {
        paymentAcc = Credit
        accType = Debit
        accTypeHeadingText = 'Expense Account'
    } else {
        paymentAcc = Credit
        accType = Debit
        accTypeHeadingText = 'Paid Into'
    }

    //put together the props object to store into session stroage for edit and feeding into deletedtransaction props for axios calls etc.
    const propObj = {
        ...tranData,
        paymentAcc: paymentAcc,
        accType: accType,
        dateString: convertTimestamp,
        tranType: tranType,
        typeHeadingText:accTypeHeadingText
    }

    let redirectAddress = ''
    if (tranType === 'Actual') {
        redirectAddress = 'edit-transaction'
    } else if (tranType === "Budget") {
        redirectAddress = 'edit-budget'
    } else if (tranType === 'Transfer') {
        redirectAddress = 'edit-transfer'
    }

    const clickEdit = (event) => {
        event.preventDefault()
        if (tranType === 'Transfer') {
            sessionStorage.setItem('edit-transfer-info', JSON.stringify(propObj))
        } else {
            sessionStorage.setItem('edit-transaction-info', JSON.stringify(propObj))
        }
        setTimeout(() => {
            setRedirectStatus(true)
        },500)
    }

    return (
        <>
        {loadDelete && <DeleteTransaction propObj={propObj} noButton={() => {setLoadDelete(false)}} />}
        <article className='transaction-list'>
            <p className='transaction-list__text'> 
                <span className='transaction-list__heading'>Date:</span> 
                <span>{convertTimestamp}</span> 
            </p>
            <p className='transaction-list__text'>
                <span className='transaction-list__heading' >Amount: </span>
                <span className='transaction-list--amount'>$ {amount}</span>
            </p>
            <p className='transaction-list__text'>
                <span className='transaction-list__heading' >Paid from/to:</span>
                <span> {paymentAcc}</span>
            </p>
            <p className='transaction-list__text'>
                <span  className='transaction-list__heading' >{accTypeHeadingText}: </span>
                <span> {accType}</span>
            </p>
            <p className='transaction-list__text transaction-list__text--description'>
                <span className='transaction-list__heading' >Description:</span>
                <span> {Description}</span>
            </p>
            <div className='transaction-actions'>
                <ul className='transaction-actions__list'>
                    <li>
                        <img src={editSvg} alt='edit icon' className='transaction-actions__icon' onClick={(event) => {clickEdit(event)}} />
                    </li>
                    <li>
                        <img src={deleteSvg} alt='delete icon' className='transaction-actions__icon' onClick={() => {setLoadDelete(true)}} />
                    </li>
                </ul>
            </div>
        </article>
        {redirectStatus && <Redirect to={redirectAddress} />}
        </>
    )
}

export default SingleTransaction