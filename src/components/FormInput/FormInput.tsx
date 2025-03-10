import { useState } from "react"
import FormLabel from "../FormLabel/FormLabel"

type InputType = "button" | "text" | "number" | "email" | "password"

type FormInputProps =  {
    label?: string,
    placeholder?: string
    type: InputType
    value?: string | number | string[]
    name: string,
    error: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type, value, name, error, onChange }) => {
    const [hover, setHover] = useState(false)

    return (
        <>
        {label && <FormLabel error={error !== ""} hover={hover} content={label ?? ""} for={name} />}
            <input
                style={{
                    fontFamily: "var(--main-font)",
                    border: "solid 1.5px",
                    borderColor: error ? "#ff4444" : (hover ? "black" : "#666"),
                    padding: "10px",
                    borderRadius: "2.5px",
                    marginTop: "8px",
                    transition: "border-color 0.3s ease",
                    outline: "none",
                    boxShadow: error ? "0 0 0 2px rgba(255, 68, 68, 0.2)" : "none"
                }}
                value={value}
                placeholder={placeholder}
                name={name}
                type={type}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onChange={onChange}
                aria-describedby={`${name}-error`}
            />
            
            {(error && (hover)) && (
                <div
                    id={`${name}-error`}
                    style={{
                        fontFamily: "var(--main-font)",
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '4px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        zIndex: 100,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none',
                        animation: 'fadeIn 0.2s ease-in-out',
                        maxWidth: '300px',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {error}
                    {/* Triángulo indicador */}
                    <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '10px',
                        width: 0,
                        height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderBottom: '5px solid #ff4444'
                    }} />
                </div>
            )}
        </>
    )
}

export default FormInput