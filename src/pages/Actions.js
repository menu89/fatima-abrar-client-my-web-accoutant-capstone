import { Redirect } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Button from "../components/Button/Button";


function Actions () {

    const [redirectAdd, setRedirectAdd] = useState("")

    return (
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
                <NavBar />
            </header>
            <main>
                <h2>Actions</h2>
                <div className="button-container">
                    <Button content='Add a purchase' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-transaction')}} />
                    <Button content='Add a Payment Account' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-account')}} />
                </div>
            </main>

            {redirectAdd && <Redirect to={redirectAdd} />}
        </>

        
    )
}

export default Actions;