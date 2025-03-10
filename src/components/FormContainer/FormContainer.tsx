import { ReactNode } from "react"

type FormContainerProps = {
    children?: ReactNode
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
    return (
        <div style={{
            position: "relative",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
            margin: "5px 0"
        }}>
            {props.children}
        </div>
    )
}

export default FormContainer