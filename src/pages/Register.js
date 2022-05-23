import '../styles/Register.scss';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import useForm from '../util/useForm';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

function Register () {
    const [values, handleOnChange] = useForm({username:""})
    const [redirectState, setRedirectState] = useState(false)

    const propsArray = [
        { name:'username', labelText: 'User Name', changeFunc:handleOnChange, values:values['username']},
        { name:'email', labelText: "Email", changeFunc:handleOnChange, values:values['email']},
        { name:'password', labelText: "Password", changeFunc:handleOnChange, values:values['password']},
        { name:'confirmPassword', labelText: "Confirm Password", changeFunc:handleOnChange, values:values['confirmPassword']}
    ]

    const register = () => {
        console.log('in fucntion')
    }

    return (
        <main>
            <h1 class="register__main-heading">My Web Accountant</h1>
            <form>
                {propsArray.map( 
                    oneItem => <InputField fieldData={oneItem} />
                )}
                            
                <div className='register__button-container'>
                    <Button content="Register" clickFunc={register}/>
                    <Button content="Back to Log In" clickFunc={
                        () => setRedirectState(true)
                    } />
                </div>
            </form>
            
            {redirectState && <Redirect to='/' />}
            <p>.</p>
        </main>
    )
}

export default Register;