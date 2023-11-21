import '../../styles/alert-box.style.css'

type alertBoxPos = {
    children: React.ReactNode
}

const AlertBox = ( {children}: alertBoxPos ) => {
    return (
        <div className="alert-box-container">{children}</div>
    )
}

export default AlertBox;