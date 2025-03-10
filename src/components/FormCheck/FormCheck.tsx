type FormCheckProps = {
    checked: boolean
    text?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const FormCheck: React.FC<FormCheckProps> = (props) => {
    return (
        <div style={{
            display: "flex",
            gap: "0.3em"
        }}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange} />

            { props.text && 
            <p
                style={{
                    fontFamily: "var(--main-font)",
                    fontSize: "0.9em"
                }}
            >{props.text}</p> }
        </div>
    )  
} 

export default FormCheck