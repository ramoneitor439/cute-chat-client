import { ReactNode } from "react"

type FormContainerSplitedProps = {
    children?: ReactNode
}

const FormContainerSplited: React.FC<FormContainerSplitedProps> = (props) => {
    return (
        <div style={{
            padding: "5px",
            width: "100%",
            display: "flex"
        }}>
            {props.children}
        </div> 
    )
}

export default FormContainerSplited