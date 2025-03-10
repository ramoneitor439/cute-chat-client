import { useEffect, useState } from "react"
import { CustomStyles } from "../../core/types/CustomStyles"
import ContactCard from "../../components/ContactCard/ContactCard"
import FormInput from "../../components/FormInput/FormInput"
import FormContainer from "../../components/FormContainer/FormContainer"
import FormButton from "../../components/FormButton/FormButton"
import { Notifications } from "../../core/services/Notifications"
import "./ChatLobby.css"
import FormContainerSplited from "../../components/FormContainerSplited/FormContainerSplited"
import CircularButton from "../../components/CircularButton/CircularButton"
import IconSend from "../../assets/icons/send-icon.png"
import Message, { MessageProps } from "../../components/Message/Message"
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from "./ChatMessage"
import { Contact } from "./Contact"
import { ApiClient } from "../../core/services/ApiClient"
import { FetchError } from "../../core/errors/FetchError"
import { useNavigate } from "react-router-dom"
import { NewContact } from "./NewContact"
import { CreatedEntity } from "../../core/types/CreatedEntity"
import { UserInfo } from "./UserInfo"

const ChatLobby: React.FC = () => {
    const [connection, setConnection] = useState<signalR.HubConnection>();
    const [user, setUser] = useState<UserInfo|null>(null)
    const [currentContact, setCurrentContact] = useState<Contact|null>(null)

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<MessageProps[]>([])

    const [messagesLoading, setmessagesLoading] = useState(false)

    const [contacts, setContacts] = useState<Contact[]>([])

    const [sideButtonHover, setSideButtonHover] = useState(false)
    const [contactsLoading, setContactsLoading] = useState(false)

    const [newContact, setNewContact] = useState<NewContact>({ email: '' })
    const [newContactLoading, setNewContactLoading] = useState(false)

    const [contactsOpen, setContactsOpen] = useState(true)
    const apiClient = new ApiClient()
    const navigate = useNavigate()

    useEffect(() => {
        if(!currentContact)
            return;

        loadMessages()
    }, [currentContact])

    useEffect(() => {
        apiClient.get<UserInfo>("account/me")
            .then((response: UserInfo|null) => {
                if(!response)
                    navigate("/login")
                else {
                    setUser(response)
                }
            })

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_HUB_URL}`, {
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (!connection || !user) {
           return 
        }

        connection.start()
            .then(() => {
                console.log('Conectado al Hub');
                connection.invoke("RegisterUser", user?.id);

                connection.on('Registration', () => {
                    Notifications.success("Te has unido al lobby de chat exitosamente!")
                })

                connection.on('ReceiveMessage', (userId, message) => {
                    let data = JSON.parse(message) as ChatMessage
                    setMessages((messages) => [
                        ...messages,
                        { name: data.name, content: data.content, from: userId, incoming: user.id != userId, hours: data.hours, minutes: data.minutes },
                    ]);
                });
            })
            .catch((err) => console.error('Error al conectar al Hub:', err));
    }, [connection, user]);

    useEffect(() => {
        loadContacts()
    }, [])

    let styles: CustomStyles = {
        main: {
            height: '100vh',
            display: 'flex'
        },
        sideBar: {
            backgroundColor: "white",
            height: '100vh',
            width: contactsOpen ? '300px' : "0px",
            transition: 'width 0.3s ease-in-out',
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column"
        },
        contacts: {
            backgroundColor: "white",
            overflowX: 'hidden',
            overflowY: "scroll",
            scrollbarWidth: 'none',
            flex: "1"
        },
        addContact: {
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: '1px solid #ccc',
            padding: "10px",
            fontFamily: "var(--main-font)",
            width: "100%",
            textAlign: "left",
            backgroundColor: "white"
        },
        sideButton: {
            borderRight: "2.5px solid",
            borderTop: "none",
            borderBottom: "none",
            borderLeft: "2.5px solid",
            borderLeftColor: sideButtonHover ? "var(--main-background-color)" : "transparent",
            borderRightColor: sideButtonHover ? "var(--main-background-color)" : "transparent",
            backgroundColor: sideButtonHover ? "white" : "var(--main-background-color)",
            color: sideButtonHover ? "var(--main-background-color)" : "white",
            fontWeight: "900",
            transition: "background-color 0.2s ease-in-out",
            cursor: "pointer"
        },
        loader: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        chat: {
            flex: "1",
            backgroundColor: "#ececec",
            display: "flex",
            flexDirection: "column"
        },
        header: {
            fontFamily: "var(--main-font)",
            padding: "10px",
            borderBottom: "2.5px solid #ccc",

        },
        messages: {
            flex: "1",
            backgroundColor: "#ececec",
            overflowY: "scroll"
        },
        input: {
            padding: "10px",
            borderTop: "2.5px solid #ccc",
            backgroundColor: "white"
        }
    }

    const loadContacts = () => {
        setContactsLoading(true)
        apiClient.get<Contact[]>("contact")
            .then(response => {
                if (response !== null && response.length !== 0)
                    setContacts(response)
            })
            .catch(error => {
                let fetchError = error as FetchError
                console.error(fetchError)

                if (fetchError.status == 401) {
                    Notifications.error("Necesita autenticarse nuevamente para acceder al lobby")
                    navigate("/login")
                }

                else
                    Notifications.error("Ha ocurrido un error al cargar los contactos")
            })
            .finally(() => setContactsLoading(false))
    }

    const createNewContact = async () => {
        if(newContact.email === '')
            return;

        setNewContactLoading(true)
        try{
            await apiClient.post<CreatedEntity<number>>("contact", newContact)
            loadContacts()
        } catch(error) {
            let fetchError = error as FetchError
            console.error(fetchError)
            if(fetchError.status === 401) {
                Notifications.error("Necesita autenticarse nuevamente para acceder al lobby")
                navigate("/login")
            }
            else
                Notifications.error("Ha ocurrido un error al crear el contacto")

        } finally {
            setNewContactLoading(false)
        }
    }

    const loadMessages = async () => {
        setmessagesLoading(true)
        try {
            let messages = await apiClient.get<MessageProps[]>(`message/${currentContact?.contactUserId}`)
            setMessages(messages ?? [])
        } catch(error) {
            let fetchError = error as FetchError
            console.error(fetchError)
            Notifications.error("Ha ocurrido un error al tratar de cargar los mensajes")
        } finally {
            setmessagesLoading(false)
        }
    }
    
    return (
        <>
        <main style={styles.main}>
            <aside style={styles.sideBar}>
                    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                        <FormContainer>
                            <FormInput error="" value={newContact.email} name="newContact" type="text" label="Adicionar contacto" key={-1} placeholder="corre@ejemplo.com" onChange={(e) => setNewContact({ email: e.target.value })} />
                        </FormContainer>
                        <FormContainer>
                            <FormButton loading={newContactLoading} onClick={createNewContact} value="Adicionar" />
                        </FormContainer>
                    </div>
                { !contactsLoading ?
                    (<>
                    <div style={styles.contacts}>
                        {contacts.map((contact, index) => (
                            <ContactCard onClick={() => {
                                if(currentContact == contact)
                                    return;
                                setCurrentContact(contact)
                            }} {...contact } time={new Date()} key={index} />
                        ))}
                    </div>
                    </>) : 
                    (<>
                    <div style={styles.loader}>
                        <span className="loader"></span>
                    </div>
                    </>) }
            </aside>
            <button 
                style={styles.sideButton}
                onMouseEnter={() => setSideButtonHover(true)}
                onMouseLeave={() => setSideButtonHover(false)}
                onClick={() => setContactsOpen(!contactsOpen)}>
                { contactsOpen ? "<<" : ">>" }
            </button>
            <section style={styles.chat}>
                { messagesLoading && (
                            <div style={styles.loader}>
                                <span className="loader"></span>
                            </div>) }
                { (!messagesLoading && currentContact) && (
                        <>
                            <div style={styles.header}>
                                <h3>{currentContact.name}</h3>
                            </div>
                            <div style={styles.messages}>
                                {messages.map((message, index) => (
                                    <Message key={index} {...message} />
                                ))}
                            </div>
                            <div style={styles.input}>
                                <FormContainerSplited>
                                    <FormContainer>
                                        <FormInput onChange={(e) => setMessage(e.target.value)} value={message} error="" name="message" placeholder="Escribe tu mensaje aqui..." type="text" />
                                    </FormContainer>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <CircularButton icon={IconSend} onClick={async () => {
                                            if(connection && message.trim())
                                            {
                                                try {
                                                    if(!user)
                                                        return;

                                                    let time = new Date()
                                                    let chatMessage: ChatMessage = {
                                                        content: message,
                                                        hours: time.getHours().toString(),
                                                        minutes: time.getMinutes().toString(),
                                                        name: user.fullName
                                                    }
                                                    await connection.invoke('SendMessage', user.id, currentContact.contactUserId.toString(), JSON.stringify(chatMessage));
                                                    setMessage(''); 
                                                } catch (err) {
                                                    Notifications.error("Error al enviar su mensaje")
                                                }
                                            }
                                        }} />
                                    </div>
                                </FormContainerSplited>
                            </div>
                        </>
                ) }
            </section>
        </main>
        </>
    )
}

export default ChatLobby