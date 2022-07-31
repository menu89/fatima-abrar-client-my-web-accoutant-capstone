import './DeleteTransaction.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function DeleteTransaction ({propObj, noButton}) {
    const {Description,amount, paymentAcc, accType,dateString, tranType,id,typeHeadingText} = propObj

    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)

    //axois call to delete the highlighted transaction
    const callAxiosToDelete = (event) => {
        event.preventDefault()
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        axios.delete(`${axiosURL}/${tranType}/single?tranid=${id}`,{
            headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then((response) => {
            setValidationStatus(false);
            setValidationMsg("Transaction successfully deleted.")
        })
        .catch(err => {
            setValidationStatus(false)
            setValidationMsg("Failed to delete transaction")
        })
    }

    return (
        <>
        <div className='background'></div>
        <article className="delete-section">
            <section>
                <p>
                    <span>Date:</span> {dateString}
                </p>
                <p>
                    <span>Amount:</span> {amount} 
                </p>
                <p>
                    <span>Paid to/from:</span> {paymentAcc} 
                </p>
                <p>
                    <span>{typeHeadingText}:</span> {accType}
                </p>
                <p>
                    <span>Description:</span> {Description}
                </p>
            </section>
            {validationStatus &&
            <div className='button-container'>
                <p>Are you sure you want to delete this transaction? </p>
                <Button 
                    content='Yes'
                    clickFunc={
                        (event) => {callAxiosToDelete(event)}
                    }
                    buttonEnabled={false}
                />
                <Button 
                    content='No'
                    clickFunc={noButton}
                    buttonEnabled={false}
                />
            </div>}

            {/* populates the error message */}
            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
            {!validationStatus && <p className='validation-message' onClick={noButton}>Ok</p>}
        </article>
        </>
    )
}

export default DeleteTransaction;