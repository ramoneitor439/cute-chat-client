import { MouseEventHandler, useState } from "react"
import { CustomStyles } from "../../core/types/CustomStyles"
import { ChatMessage } from "../../views/ChatLobby/ChatMessage"

type ContactCardProps = {
    name: string,
    time: Date,
    lastMessage: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const ContactCard: React.FC<ContactCardProps> = ({name, time, lastMessage, onClick}) => {
    const [hover, setHover] = useState(false)
    
    let message = JSON.parse(lastMessage) as ChatMessage

    const styles: CustomStyles = {
        card: {
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: '1px solid #ccc',
            padding: "10px",
            fontFamily: "var(--main-font)",
            width: "100%",
            textAlign: "left",
            backgroundColor: hover ? "#eae6e5" : "white",
            
            cursor: "pointer"
        },
        header: {
            margin: "0",
            padding: "0",
            display: "flex",
            alignContent: "space-between",
            gap: "1em"
        },
        lastMessage: {
            fontSize: '0.8rem',
            color: '#555'
        },
        name: {
            margin: "0",
            flex: "1",

        },
        time: {
            margin: "0"
        }
    }
    
    return (
        <button onClick={onClick} style={styles.card} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div style={styles.header}>
                <h3 style={styles.name}>{name}</h3>
                <p style={styles.time} >{`${time.getHours()}:${time.getMinutes()}`}</p>
            </div>
            <p style={styles.lastMessage}>{lastMessage}</p>
        </button>
    )
}

export default ContactCard

