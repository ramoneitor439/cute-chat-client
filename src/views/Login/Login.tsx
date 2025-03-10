import { useState } from "react"
import CustomForm from "../../components/CustomForm/CustomForm"
import FormButton from "../../components/FormButton/FormButton"
import FormContainer from "../../components/FormContainer/FormContainer"
import FormInput from "../../components/FormInput/FormInput"
import BaseLink from "../../components/BaseLink/BaseLink"
import Footer from "../../components/Footer/Footer"
import { ApiClient } from "../../core/services/ApiClient"
import { Notifications } from "../../core/services/Notifications"
import { LoginResponse } from "./LoginResponse"
import { FetchError } from "../../core/errors/FetchError"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: ""
        }
    
        newErrors.email = !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
            ? "El email está en un formato incorrecto..."
            : ""
    
        newErrors.password = formData.password.length <= 0
            ? "La contraseña es obligatoria..."
            : ""
    
        setFormErrors(newErrors)
        return Object.values(newErrors).every(error => error === "")
    }

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!validateForm()) {
            Notifications.error("Los datos del formulario no son válidos, por favor revise los campos resaltados en rojo.")
            return
        }

        let client = new ApiClient()
        try{
            setLoading(true)
            let response = await client.post<LoginResponse>("account/login", formData)
            if(!response) {
                Notifications.error("Error al iniciar sesión, por favor intente de nuevo.")
                return
            }
            
            sessionStorage.setItem("accessToken", response?.accessToken ?? "")
            Notifications.success("Bienvenido de nuevo!")
            navigate("/lobby")
        } catch(error) {
            let fetchError = error as FetchError
            if(fetchError.status === 401) {
                Notifications.error("Email o contraseña incorrectos.")
            } else {
                Notifications.error("Error al iniciar sesión, por favor intente de nuevo.")
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
        <main style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <CustomForm onSubmit={onFormSubmit} header="Bienvenido">
                <FormContainer>
                    <FormInput error={formErrors.email} label={"Email"} name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={onInputChange} />
                </FormContainer>
                <FormContainer>
                    <FormInput error={formErrors.password} label={"Contraseña"} name="password" type="password" placeholder="Contraseña..." value={formData.password} onChange={onInputChange} />
                </FormContainer>
                <FormContainer>
                    <FormButton loading={loading} value="Entrar" />
                </FormContainer>
                <BaseLink text="No tiene cuenta? Cree una aqui" href="/register" />
            </CustomForm>
        </main>
        <Footer />
        </>
    )
}

export default Login