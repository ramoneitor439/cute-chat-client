import { FormEventHandler, ReactNode } from "react"
import { CustomStyles } from "../../core/types/CustomStyles"

type CustomFormProps = {
    header?: string
    children?: ReactNode,
    onSubmit?: FormEventHandler<HTMLFormElement>
}

const CustomForm: React.FC<CustomFormProps> = (formProps) => {
    const styles: CustomStyles = {
        form: {
            borderRadius: "6px",
            height: "fit-content",
            width: "25em",
            maxWidth: "90vw",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            display: "flex",
            padding: "10px"
        }
    }
    
    return (
        <form
         style={{
            ...styles.form,
            alignContent: "space-around",
            flexDirection: "column",
            alignItems: "center"
         }}   
         onSubmit={formProps.onSubmit}>
            { formProps.header && <h1 style={{ fontFamily: "var(--main-font)", textAlign: "center" }}>{formProps.header}</h1> }
            {formProps.children}
        </form>
    )
}

export default CustomForm