import { ChatMessage } from "../../views/ChatLobby/ChatMessage"

export type MessageProps = {
    name: string
    content: string
    from: string
    hours: string,
    minutes: string,
    incoming: boolean
}

const Message: React.FC<MessageProps> = ({content, name, hours, minutes, incoming}) => {
    let messageContent = ""
    try{
        let message = JSON.parse(content) as ChatMessage
        messageContent = message.content
    } catch(error) {
        messageContent = content
    }
    
    return (
        <div style={{
            height: "fit-content",
            width: "100%",
            display: "flex",
            justifyContent: incoming ? "flex-start" : "flex-end"
        }}>
            <div style={{
                padding: "10px",
                backgroundColor: incoming ? "#cecece" : "#bdf7b6",
                margin: "2px",
                borderRadius: "8px",
                fontFamily: "var(--main-font)",
                border: incoming ? "2.5px solid #c6c6c6" : "2.5px solid #9aff8e",
                width: "fit-content",
                maxWidth: "40vw",
                display: "flex",
                flexDirection: "column"
            }}>
                <h4 style={{
                    margin: "2px"
                }}>{name}</h4>
                <p style={{
                    padding: "5px",
                    margin: "0",
                    textWrap: "wrap",
                    flex: '1',
                    backgroundColor: incoming ? "#e4e4e4" : "#dbf3d8",
                    borderRadius: "5px",
                    fontWeight: "600"
                }}>{messageContent}</p>
                <p style={{
                    margin: "0",
                    textAlign: "end",
                    paddingTop: "5px"
                }}>{`${hours}:${minutes}`}</p>
            </div>
        </div>
    )
}

export default Message