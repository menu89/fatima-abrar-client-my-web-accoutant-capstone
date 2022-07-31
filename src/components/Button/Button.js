import './Button.scss';

function Button ({content, clickFunc, buttonEnabled, newClass}) {
    return (
        <>
        <button 
            className={`button ${buttonEnabled ? 'button--disabled' : ''} ${(newClass ? 'button-mini' : '')}`} 
            onClick={clickFunc}
            disabled={buttonEnabled}
        >
            {content}
        </button>
        </>
    )
}

export default Button;