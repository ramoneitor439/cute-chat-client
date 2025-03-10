import { useState } from "react"
import CustomForm from "../../components/CustomForm/CustomForm"
import FormContainer from "../../components/FormContainer/FormContainer"
import FormInput from "../../components/FormInput/FormInput"
import FormContainerSplited from "../../components/FormContainerSplited/FormContainerSplited"
import FormButton from "../../components/FormButton/FormButton"
import FormCheck from "../../components/FormCheck/FormCheck"
import BaseLink from "../../components/BaseLink/BaseLink"
import Footer from "../../components/Footer/Footer"
import { CreateAccountForm } from "./CreateAccountForm"
import { ApiClient } from "../../core/services/ApiClient"
import { Notifications } from "../../core/services/Notifications"
import { FetchError } from "../../core/errors/FetchError"
import { useNavigate } from "react-router-dom"

const CreateAccount: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<CreateAccountForm>({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordRepeat: ""
    })

    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [terms, setTerms] = useState(false)
    const [loading, setLoading] = useState(false)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
        const newErrors = {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            passwordRepeat: ""
        };
    
        newErrors.firstName = !/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]{3,255}$/.test(formData.firstName)
            ? "El nombre está en un formato incorrecto..."
            : ""
    
        newErrors.middleName = (formData.middleName !== "" && !/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]{3,255}$/.test(formData.middleName ?? ''))
            ? "El segundo nombre está en un formato incorrecto..."
            : ""
    
        newErrors.lastName = !/^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ]{3,255}$/.test(formData.lastName)
            ? "El apellido está en un formato incorrecto..."
            : ""
    
        newErrors.email = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,255}$/.test(formData.email)
            ? "El email está en un formato incorrecto"
            : ""
    
        newErrors.phoneNumber = !/^[0-9]+$/.test(formData.phoneNumber)
            ? "El número de teléfono está en un formato incorrecto..."
            : ""

        newErrors.password = formData.password == ''
            ? "La contraseña no es obligatoria"
            : ""

        newErrors.passwordRepeat = formData.password !== passwordRepeat
            ? "La contraseña repetida debe ser igual a la original"
            : ""
    
        setFormErrors(newErrors);
        return !Object.values(newErrors).some(value => value !== "");
    }

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let isFormValid = validateForm()
        if(!isFormValid) {
            Notifications.error("Los datos del formulario no son válidos, por favor revise los campos resaltados en rojo.")
            return;
        }
        
        let client = new ApiClient()
        setLoading(true)
        try {
            await client.post("account/register", formData)
            Notifications.success("Cuenta creada exitosamente, intente autenticarse");
            navigate("/login")
        } catch(error) {
            let fetchError = error as FetchError
            if(fetchError.status == 500)
                Notifications.error("Ha ocurrido un error inesperado")
            else if(fetchError.status == 409)
                Notifications.error("El email ya está en uso")
            else
                Notifications.error("Ha ocurrido un error inesperado")
        } finally {
            setLoading(false)
        }
    } 

    return (
        <>
        <main style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CustomForm onSubmit={onFormSubmit} header="Crear cuenta" >
                <FormContainerSplited>
                    <FormContainer>
                        <FormInput error={formErrors.firstName}  label="Nombre" name="firstName" type="text" placeholder="Ramon..." value={formData.firstName} onChange={onInputChange}/>
                    </FormContainer>
                    <FormContainer>
                        <FormInput error={formErrors.middleName} label="Segundo nombre" name="middleName" type="text" placeholder="Manuel..." value={formData.middleName} onChange={onInputChange} />
                    </FormContainer>
                    <FormContainer>
                        <FormInput error={formErrors.lastName} label="Apellido" name="lastName" type="text" placeholder="Carballea..." value={formData.lastName} onChange={onInputChange} />
                    </FormContainer>
                </FormContainerSplited>
                <FormContainer>
                    <FormInput error={formErrors.email} label="Email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={onInputChange} />
                </FormContainer>
                <FormContainer>
                    <FormInput error={formErrors.phoneNumber} label="Telefono" name="phoneNumber" type="number" placeholder="(+53) 55726923" value={formData.phoneNumber} onChange={onInputChange}/>
                </FormContainer>
                
                <FormContainerSplited>
                    <FormContainer>
                        <FormInput error={formErrors.password} label="Contraseña" name="password" type="password" placeholder="secure pass 123*..." value={formData.password} onChange={onInputChange} />
                    </FormContainer>
                    
                    <FormContainer>
                        <FormInput error={formErrors.passwordRepeat} label="Contraseña(Repetir)" name="passwordRepeat" type="password" placeholder="secure pass 123*..." value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                    </FormContainer>
                </FormContainerSplited>

                <FormContainerSplited>
                    <FormContainer>
                        <FormCheck checked={terms} onChange={() => setTerms(!terms)} text="Acepto los terminos y condiciones" />
                    </FormContainer>
                </FormContainerSplited>
                <FormContainer>
                    <FormButton loading={loading} disabled={!terms} value="Crear cuenta" />
                </FormContainer>
                <BaseLink text="Ya tengo una cuenta" href="/login" />
            </CustomForm>
        </main>
        <Footer />
        </>
    )
}

export default CreateAccount