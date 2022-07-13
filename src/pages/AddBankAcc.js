import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateBankInfo} from '../util/formValidation';
import InputField from '../components/InputField/InputField';
import InputDropDown from '../components/InputField/InputDropDown';
import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import axios from 'axios';
import propsInfo from '../assets/propsinformation.json';

const axiosURL=process.env.REACT_APP_AXIOSURL

function AddBankAcc() {
    const [values, handleOnChange] = useForm({acc_des:"",amount:"",acc_type:'', trandate:''})
    const [redirectToISU, setRedirectToISU] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    //information for input fields that require options information
    const optionArray =[
        { ...propsInfo.bankAccTypeOptions, values:values['acc_type'],changeFunc:handleOnChange}
    ]

    //information for other types of input fields
    const propsArray = [
        { ...propsInfo.descriptionTwoLabel, changeFunc:handleOnChange, values:values['acc_des']},
        { ...propsInfo.amountLabel, changeFunc:handleOnChange, values:values['amount']},
        { ...propsInfo.tranDateLabel, changeFunc:handleOnChange, values:values['trandate']}
    ]

    //this hook checks the values in the input field every time they change and updates the status of the 'Add Account' button do disabled or enabled.
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //this function looks for the JWT token, organizes the data from the input fields and makes an axios call to the backend server to create the account
    const callAxios = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        const dateConvert = Date.parse(new Date(values['trandate']))

        const isuInfo = {
            accType:values['acc_type'],
            accDesc:values['acc_des'],
            amount:values['amount'],
            balance_timestamp:dateConvert
        }
        axios.post(`${axiosURL}/banks/add-bank-account`,isuInfo, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        //if the axios call it successful, then it redirects to the account-list page
        .then(response => {
            setTimeout(()=>{
                setRedirectToISU(true)
            },1000)
        })
        //if the request fails, then populates the error message at the bottom of the page
        .catch((err) => {
            let message = ""
            if (err.response.status === 404) {
                message = err.message
            } else {
                message = err.response.data
            }
            setValidationMsg(message)
            setValidationStatus(false)
        })
    }

    //this function checks the information provided to see if it matches certain conditions and if it matches, it calls the axios function to post to the server.
    const addAccFunc = (event) => {
        event.preventDefault()
        const {status, message} = validateBankInfo(values)
        setValidationStatus(status)
        setValidationMsg(message)
        if (status) {
            callAxios()
        }
    }

    return(
        <>
        <NavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className='section-container'>
                <form>
                    <InputDropDown fieldData={optionArray[0]} />
                    {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                    <div className='button-container'>
                        {/*button is only enabled once all fields are updated */}
                        <Button content="Add Account" clickFunc={(event)=>{addAccFunc(event)}} buttonEnabled={buttonStatus} />
                        <Button content="Cancel" clickFunc={()=>{setRedirectToISU(true)}} buttonEnabled={false} />
                    </div>
                </form>
            </section>
            
            {/* error message */}
            {!validationStatus && <p className='validation-message' >{validationMsg}</p>}
            {redirectToISU && <Redirect to='ISU'/>}
        </main>
        </>
    )
}

export default AddBankAcc;