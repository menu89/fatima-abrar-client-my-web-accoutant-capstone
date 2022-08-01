import '../styles/Help.scss';
import ShortNavBar from "../components/NavBar/ShortNavBar";
import NavBar from "../components/NavBar/NavBar";
import ReactPlayer from 'react-player';

function Help () {
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
    return (<>
        {!token ? <ShortNavBar />: <NavBar />}
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container">
                <h2>Help</h2>
                <article>
                    <p>Please check out the videos below to see how you can navigate the website. If you still have additional questions, you can reach out to us at <a className="aboutus-page__links" href="mailto:info@my-web-accountant.com"> info@my-web-accountant.com</a></p>
                </article>
                <article className='help-section__article'>
                    <h3 className='help-section__sub-heading'>Register your user</h3>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/TyylTkeq8vA' />
                    </div>
                </article>
                <article className='help-section__article'>
                    <h3 className='help-section__sub-heading'>Forgotten password reset</h3>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/ZwiNYop3V8Q' />
                    </div>
                </article>
                <article className='help-section__article'>
                    <h3 className='help-section__sub-heading'>Navigate Site</h3>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/b1vxzKHxHOM' />
                    </div>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/xK606P5F0lY' />
                    </div>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/axe0NRGSnYU' />
                    </div>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/oqrF4yxY9-U' />
                    </div>
                    <div className='video-display'>
                        <ReactPlayer width='100%' height='100%' controls url='https://youtu.be/BdwSOALCNYM' />
                    </div>
                </article>
            </section>
        </main>
    </>)
}

export default Help;