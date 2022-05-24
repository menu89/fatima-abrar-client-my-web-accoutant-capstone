import './NavBar.scss';
import {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

function NavBar () {
    const [logout, setLogout] = useState(false)
    const [checkLogIn, setCheckLogIn] = useState(true)

    const removeToken = (event) => {
        event.preventDefault()
        sessionStorage.removeItem('JWT-Token')
        setLogout(true)
    }

    useEffect(() => {
        setCheckLogIn(sessionStorage.getItem('JWT-Token'))
    },[])

    return (
        <nav>
            <ul>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/account-list'>Account List</Link></li>
                <li><Link>Actions</Link></li>
                <li><Link>Transactions by Period</Link></li>
                <li onClick={(event) => removeToken(event)}>Log Out</li>
            </ul>

            {!checkLogIn && <Redirect to='/' />}
            {logout && <Redirect to='/' />}
        </nav>
    )
}

export default NavBar;