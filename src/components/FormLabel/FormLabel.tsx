type FormLabelProps = {
    content: string
    for: string | null,
    hover?: boolean
    error: boolean
}

const FormLabel: React.FC<FormLabelProps> = (props) => {
    return (
        <label 
            style={{
                fontFamily: "var(--main-font)",
                position: "absolute", 
                top: "50%", 
                left: "10px",
                transform: props.hover 
                    ? "translateY(-140%)" 
                    : "translateY(-200%)", 
                transition: "transform 0.3s ease",
                background: "white",
                padding: "0 5px",
                fontSize: "0.9em",
                color: props.error ? "red" : (props.hover ? "black" : "#666"),
                zIndex: "1",
                pointerEvents: "none"
            }}
            htmlFor={props.for ?? ""}>
                {props.content}
        </label>
    )
}

export default FormLabel