import './Button.scss';

function Button ({content, clickFunc, buttonEnabled}) {
    return (
        <>
        <button 
            className={`button ${buttonEnabled && 'button--disabled'}`} 
            onClick={clickFunc}
            disabled={buttonEnabled}
        >
            {content}
        </button>
        </>
    )
}

export default Button;