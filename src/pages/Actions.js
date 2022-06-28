import { Redirect } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Button from "../components/Button/Button";


function Actions () {
    //remove edit information from session storage
    sessionStorage.removeItem('edit-transaction-info') 

    const [redirectAdd, setRedirectAdd] = useState("")

    return (
        <>
            <NavBar />
            <main>
                <h1 className="main-heading">My Web Accountant</h1>
                <section className="section-container">
                    <h2>Actions</h2>
                    <div className="button-container">
                        <Button content='Add a purchase' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-exp-transaction')}} />
                        <Button content='Add Incoming Cash' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-inc-transaction')}} />

                        <Button content='Budget a purchase' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-exp-budget')}} />
                        <Button content='Budget for income' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-inc-budget')}} />
                        
                        <Button content='Add a Payment Account' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-account')}} />
                    </div>
                </section>
                
            </main>

            {redirectAdd && <Redirect to={redirectAdd} />}
        </>

        
    )
}

export default Actions;