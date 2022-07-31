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
import deleteSvg from '../../assets/icon/remove.svg';
import passwordSvg from '../../assets/icon/password.svg';
import helpSvg from '../../assets/icon/help.svg';
import {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import navProps from '../../assets/navigationProps.json';

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
        {imgSource:dahboardSvg, classModifier:'--one', ...navProps.dashboardNav},
        {imgSource:cashflowSvg, classModifier:'--two', ...navProps.cashflowNav},
        {imgSource:actionSvg, classModifier:'--three', ...navProps.actionsNav},
        {imgSource:tranHisSvg, classModifier:'--four', ...navProps.historyNav},
        {imgSource:accListSvg, classModifier:'--five', ...navProps.accListNav},
        {imgSource:passwordSvg, classModifier:'--six', ...navProps.passwordNav},
        {imgSource:deleteSvg, classModifier:'--seven', ...navProps.deleteUserNav},
        {imgSource:helpSvg, classModifier:'--eight', ...navProps.helpNav},
        {imgSource:aboutSvg, classModifier:'--eight', ...navProps.aboutUsNav},
        {imgSource:creditsSvg, classModifier:'--nine', ...navProps.creditsNav}
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
                        <img src={logOutSvg} alt='logout icon' className='single-link__icon single-link__icon--ten' />
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