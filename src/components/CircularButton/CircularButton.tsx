import { MouseEventHandler, useState } from "react"

type CircularButtonProps = {
    icon?: string
    onClick: MouseEventHandler<HTMLElement>
}

const CircularButton: React.FC<CircularButtonProps> = (buttonProps) => {
    const [hover, setHover] = useState(false)

    const styles = {
        button: {
            maxWidth: "100px",
            maxHeight: "100px",
            width: "3em",
            height: "3em",
            backgroundColor: hover ? "var(--secondary-background-color)" : "var(--main-background-color)",
            color: hover ? "var(--main-background-color)" : "var(--main-color)",
            border: "solid 2.5px",
            borderColor: hover ? "var(--main-background-color)" : "transparent",
            borderRadius: "100%",
            padding: "5px",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out"
        },
        icon: {
            width: "100%",
            height: "100%",
            borderRadius: "100%",
            backgroundImage: `url(${buttonProps.icon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }
    }

    return (
        <button 
            style={styles.button}
            onClick={buttonProps.onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
                <span>
                    <div style={styles.icon}></div>
                </span>
        </button>
    )
}

export default CircularButton