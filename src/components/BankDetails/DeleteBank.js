import { useState } from "react";
import Button from "../Button/Button";
import axios from 'axios';
import { useEffect } from "react";

const axiosURL = process.env.REACT_APP_AXIOSURL

function DeleteBank ({bankId, listFunc}) {

    const [deleteMessage, setDeleteMsg] = useState(null)

    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    const clickYes = () => {
        axios.delete(`${axiosURL}/banks/single-account?bankid=${bankId}`, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setDeleteMsg(response.data)
        })
        .catch(() => {
            setDeleteMsg('Failed to Delete Record')
        })
    }

    useEffect(() => {
        if (deleteMessage) {
            setTimeout(() => {
                listFunc(false)
            },500)
        }
        
        //eslint-disable-next-line
    },[deleteMessage])

    return(<>
        <div>
            <p>Are you sure you want to delete this bank record?</p>
            <Button 
                content="Yes, Delete this bank account."
                clickFunc={()=>{clickYes()}}
                buttonEnabled={false}
            />
            {deleteMessage && <p>{deleteMessage}</p>}
        </div>
    </>)
}

export default DeleteBank