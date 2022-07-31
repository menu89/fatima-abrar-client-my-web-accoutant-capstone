import './BankDetails.scss';
import { useEffect, useState } from 'react';
import SingleTransaction from '../SingleTransaction/SingleTransaction';
import Button from '../Button/Button';
import DeleteBank from './DeleteBank';
import SingleTransactionHeading from '../SingleTransaction/SingleTransactionHeading';
import deleteSvg from '../../assets/icon/remove.svg';
import axios from 'axios';

const axiosURL = process.env.REACT_APP_AXIOSURL

function BankDetails ({searchData, listFunc}) {
    const {id} = searchData
    const currentDate = new Date(Date.now()).toDateString()
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    const [bankInfo, setBankInfo] = useState(null)
    const [showDelete, setShowDelete] = useState(null)
    const [doWeDelete, setDoWeDelete] = useState(null)

    useEffect(() => {
        axios.get(`${axiosURL}/banks/account-details-by-date?bankid=${id}&balance_timestamp='${currentDate}`, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            const {recent_five_actuals, recent_five_transfers, recent_five_budget_records} = response.data
            
            if ((recent_five_actuals.length === 0) && (recent_five_budget_records.length === 0) && (recent_five_transfers.length === 0)) {
                setBankInfo(response.data)
                setShowDelete(true)
            } else {
                setBankInfo(response.data)
                setShowDelete(false)
            }
            
        })
        //eslint-disable-next-line
    },[])
    

    return(<>
        {!!bankInfo && 
        <div className='bank-details'>
            <aside className='bank-details__container'>
                <h2>Account Details</h2>
                <div><p>Bank Info: {bankInfo.acc_des}</p></div>
                <div><p>Account Type: {bankInfo.acc_type}</p></div>
                <details className='bank-details--amount-container'>
                    <summary>Display cash movement in account</summary>
                    <div className='bank-details__content'>
                        <p>Starting Balance: <span>{ Intl.NumberFormat().format(bankInfo.amount)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Expenses Paid: <span>{Intl.NumberFormat().format(bankInfo.money_paid)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Income and Other Cash: <span>{Intl.NumberFormat().format(bankInfo.money_received)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Money transferred into account: <span>{Intl.NumberFormat().format(bankInfo.transfer_in)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Money transferred out of account: <span>{Intl.NumberFormat().format(bankInfo.transfer_out)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Balance as at {currentDate}: <span>{Intl.NumberFormat().format(bankInfo.amount + bankInfo.money_paid + bankInfo.money_received + bankInfo.transfer_in + bankInfo.transfer_out)}</span></p>
                    </div>
                </details>
                
                <details>
                    <summary>Show the most recent transactions for actuals made from this account.</summary>
                    <h2>Recent Actuals</h2>
                    {(bankInfo.recent_five_actuals.length > 0) ? <SingleTransactionHeading /> :''}
                    {bankInfo.recent_five_actuals.map((oneRow,rowIndex) => {
                        return <SingleTransaction key={rowIndex} tranData={oneRow} tranType='Actual' />
                    })}
                </details>
                <details>
                    <summary>Show the most recent transfers for actuals made from this account.</summary>
                    <h2>Recent Transfers</h2>
                    {(bankInfo.recent_five_transfers.length > 0) ? <SingleTransactionHeading /> : ''}
                    {bankInfo.recent_five_transfers.map((oneRow,rowIndex) => {
                        return <SingleTransaction key={rowIndex} tranData={oneRow} tranType='Actual' />
                    })}
                </details>
                {/* display delete button only if there are no budget, actual, or transfer records. */}
                {showDelete && <img src={deleteSvg} alt='delete icon' className='bank-details__icon' onClick={() => {setDoWeDelete(true)}} />}
                <div className='button-container'>
                    <Button 
                        content='Back to Account List'
                        clickFunc={()=> {listFunc(false)}}
                        buttonEnabled={false}
                    />
                </div>
                {doWeDelete && <DeleteBank bankId={id} listFunc={listFunc} />}
            </aside>
        </div>}
    </>)
}

export default BankDetails;