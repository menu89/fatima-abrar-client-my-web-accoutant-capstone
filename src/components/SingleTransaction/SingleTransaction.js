import './SingleTransaction.scss';
import DeleteTransaction from './DeleteTransaction';
import editSvg from '../../assets/icon/edit.svg';
import deleteSvg from '../../assets/icon/remove.svg';
import {useState} from 'react';

function SingleTransaction ({tranData, tranType}) {
    const [loadDelete, setLoadDelete] = useState(false)

    //convert timestamp to string
    const adjustTimestamp = (timeData) => {
        const convertDate = new Date(timeData).toDateString()
        return convertDate
    }

    const {Credit, Debit, Description,amount,Transaction_timestamp,Bank_type} = tranData
    const convertTimestamp = adjustTimestamp(Transaction_timestamp)
    let paymentAcc = ''
    let accType = ''

    if (Bank_type === 'd') {
        paymentAcc = Debit
        accType = Credit
    } else {
        paymentAcc = Credit
        accType = Debit
    }

    //put together the props object to store into session stroage for edit and feeding into deletedtransaction props for axios calls etc.
    const propObj = {
        ...tranData,
        paymentAcc: paymentAcc,
        accType: accType,
        dateString: convertTimestamp,
        tranType: tranType
    }

    return (
        <>
        {loadDelete && <DeleteTransaction propObj={propObj} noButton={() => {setLoadDelete(false)}} />}
        <article className='transaction-list'>
            <p> 
                <span className='transaction-list__heading'>Date:</span> 
                <span>{convertTimestamp}</span> 
            </p>
            <p>
                <span className='transaction-list__heading' >Amount: </span>
                <span className='transaction-list--amount'>$ {amount}</span>
            </p>
            <p>
                <span className='transaction-list__heading' >Paid from/to:</span>
                <span> {paymentAcc}</span>
            </p>
            <p>
                <span  className='transaction-list__heading' >Type: </span>
                <span> {accType}</span>
            </p>
            <p>
                <span className='transaction-list__heading' >Description:</span>
                <span> {Description}</span>
            </p>
            <div className='transaction-actions'>
                <ul className='transaction-actions__list'>
                    <li>
                        <img src={editSvg} alt='edit icon' className='transaction-actions__icon' />
                    </li>
                    <li>
                        <img src={deleteSvg} alt='delete icon' className='transaction-actions__icon' onClick={() => {setLoadDelete(true)}} />
                    </li>
                </ul>
            </div>
        </article>
        </>
    )
}

export default SingleTransaction