import { MouseEventHandler, useState } from "react"
import "./FormButton.css"

type FormButtonProps = {
    value?: string
    disabled?: boolean
    loading?: boolean,
    onClick?: MouseEventHandler<HTMLElement>
} 

const FormButton: React.FC<FormButtonProps> = (buttonProps) => {
    const [hover, setHover] = useState(false)

    return (
        <button 
            onClick={buttonProps.onClick}
            style={{
                fontFamily: "var(--main-font)",
                backgroundColor: buttonProps.disabled ? "gray" : (hover ? "var(--secondary-background-color)" : "var(--main-background-color)"),
                color: buttonProps.disabled ? "black" : hover ? "var(--main-background-color)" : "var(--main-color)",
                border: "solid 2.5px",
                borderColor: hover ? "var(--main-background-color)" : "transparent",
                borderRadius: "2px",
                padding: "5px",
                cursor: buttonProps.disabled || buttonProps.loading ? "default" : "pointer",
                transition: "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            disabled={buttonProps.disabled || buttonProps.loading}>
            { buttonProps.loading ? <span style={{
                width: "1em",
                height: "1em",
                border: "3px solid #FFF",
                borderBottomColor: "transparent",
                borderRadius: "50%",
                display: "inline-block",
                boxSizing: "border-box",
                animation: "rotation 1s linear infinite"
            }}></span> : (buttonProps.value ?? "Aceptar") }
        </button>
    )
}

export default FormButton