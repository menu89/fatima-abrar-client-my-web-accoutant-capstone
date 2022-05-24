import '../styles/Dashboard.scss';
//import {useState, useEffect} from 'react';
import {v4} from 'uuid';
import useForm from '../util/useForm';
//import checkFieldCompletion from '../util/formValidation';
import NavBar from '../components/NavBar/NavBar';
import DisplayFieldTwo from '../components/DisplayFieldTwo/DisplayFieldTwo';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

function Dashboard () {
    const [values, handleOnChange] = useForm({searchMonth:"05", searchYear:"2022"})

    const propsArray = [
        { name:'searchMonth', labelText: "Month", changeFunc:handleOnChange, values:values['searchMonth'], type:'text',componentClasses:'mini-input'},
        { name:'searchYear', labelText: "Year", changeFunc:handleOnChange, values:values['searchYear'],type:'text',componentClasses:'mini-input'}
    ]

    return (
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
                <NavBar />
            </header>
            <main>
                <form className='dashboard__form'>
                    {propsArray.map(oneItem => <InputField key={v4()} fieldData={oneItem} />)}
                    <Button content='Go' clickFunc={()=>{console.log('hello')}} buttonEnabled={false} newClass={true}/>
                    
                </form>
                <DisplayFieldTwo objectClass='display-four' one='Expense' two='Budget' three='Actual' four='Difference'/>
            </main>
        </>
    )
}

export default Dashboard;