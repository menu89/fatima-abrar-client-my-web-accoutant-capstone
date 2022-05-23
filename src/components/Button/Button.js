import './Button.scss';

function Button ({content, clickFunc}) {
    return (
        <>
        <button className='button' onClick={clickFunc}>
            {content}
        </button>
        </>
    )
}

export default Button;