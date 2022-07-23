import './NavBar.scss';
import './SingleLink.scss';
import SingleLink from './SingleLink';
import dahboardSvg from '../../assets/icon/dashboard.svg';
import listSvg from '../../assets/icon/list.svg';
import accListSvg from '../../assets/icon/accounting.svg';
import actionSvg from '../../assets/icon/action-camera.svg';
import tranHisSvg from '../../assets/icon/history-paper.svg';
import logOutSvg from '../../assets/icon/logout.svg';
import aboutSvg from '../../assets/icon/about.svg';
import creditsSvg from '../../assets/icon/clipboard.svg';
import cashflowSvg from '../../assets/icon/cash-flow.svg';
import {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

function NavBar () {
    const [logout, setLogout] = useState(false)
    const [checkLogIn, setCheckLogIn] = useState(true)

    const username = JSON.parse(sessionStorage.getItem('username')) 

    //remove token on logout
    const removeToken = (event) => {
        event.preventDefault()
        sessionStorage.removeItem('JWT-Token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('edit-transaction-info')
        sessionStorage.removeItem('edit-transfer-info') 
        setLogout(true)
    }

    //check to see if the user is logged in
    useEffect(() => {
        setCheckLogIn(sessionStorage.getItem('JWT-Token'))
    },[])

    const propsArray =[
        {imgSource:dahboardSvg, altText:'dashboard icon', linkAdd:'/dashboard', linkText:'Dashboard', classModifier:'--one'},
        {imgSource:cashflowSvg, altText:'cashflow icon', linkAdd:'/cashflow', linkText:'Cashflow', classModifier:'--two'},
        {imgSource:actionSvg, altText:'action icon', linkAdd:'/actions', linkText:'Actions', classModifier:'--three'},
        {imgSource:tranHisSvg, altText:'transaction history icon', linkAdd:'/history', linkText:'Transactions History', classModifier:'--four'},
        {imgSource:accListSvg, altText:'account list icon', linkAdd:'/account-list', linkText:'Account List', classModifier:'--five'},
        {imgSource:aboutSvg, altText:'about icon', linkAdd:'/', linkText:'About Us', classModifier:'--six'},
        {imgSource:creditsSvg, altText:'credits icon', linkAdd:'/credits', linkText:'Credits', classModifier:'--seven'}
    ]

    return (
        <>
        <header className='heading'>
            <img src={listSvg} alt='list icon' className='heading__icon' />
            <nav className='navigation'>  
                <ul className='navigation__list'>
                    {propsArray.map((oneLink, linkIndex) => {
                        return <SingleLink linkdata={oneLink} key={linkIndex} />
                    })}
                    <li className='single-link__list-item' >
                        <img src={logOutSvg} alt='logout icon' className='single-link__icon single-link__icon--seven' />
                        <p className='single-link__link' onClick={(event) => removeToken(event)}>Log Out</p>
                    </li>
                </ul>
            </nav>
            <p className="heading__right-text">Welcome {username}</p>
        </header>
        {!checkLogIn && <Redirect to='/' />}
        {logout && <Redirect to='/' />}        
        </>
    )
}

export default NavBar;