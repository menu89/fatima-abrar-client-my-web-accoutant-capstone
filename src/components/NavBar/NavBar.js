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
        <nav className='navigation'>
            <ul className='navigation__list'>
                <li className='navigation__list-item'>
                    <Link className='navigation__list-link' to='/dashboard'>
                        Dashboard
                    </Link>
                </li>
                <li className='navigation__list-item'>
                    <Link className='navigation__list-link' to='/account-list'>
                        Account List
                    </Link>
                </li>
                <li className='navigation__list-item'>
                    <Link className='navigation__list-link' to='/actions'>
                        Actions
                    </Link>
                </li>
                <li className='navigation__list-item'>
                    <Link className='navigation__list-link' to=''>
                        Transactions by Period
                    </Link>
                </li>
                <li className='navigation__list-item' onClick={(event) => removeToken(event)}>
                    Log Out
                </li>
            </ul>

            {!checkLogIn && <Redirect to='/' />}
            {logout && <Redirect to='/' />}
        </nav>
    )
}

export default NavBar;