import { useState } from "react"
import { MouseEventHandler } from "react"

type ButtonProps = {
    value?: string 
    onClick?: MouseEventHandler<HTMLButtonElement>
} 

const Button: React.FC<ButtonProps> = (buttonProps) => {
    const [hover, setHover] = useState(false)

    return (
        <button 
            style={{
                fontFamily: "var(--main-font)",
                backgroundColor: hover ? "var(--secondary-background-color)" : "var(--main-background-color)",
                color: hover ? "var(--main-background-color)" : "var(--main-color)",
                border: "solid 2.5px",
                borderColor: hover ? "var(--main-background-color)" : "transparent",
                borderRadius: "2px",
                padding: "5px",
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out"
            }}
            onClick={buttonProps.onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {buttonProps.value ?? "Aceptar"}
        </button>
    )
}

export default Button