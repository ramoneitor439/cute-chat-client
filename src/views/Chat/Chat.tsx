import { useEffect, useState } from "react"
import * as signalR from '@microsoft/signalr';

type ChatProps = {
    sender: string
    receiver: string
}

type Message = {
    user: any
    message: any
}

const Chat: React.FC<ChatProps> = ({ sender, receiver }) => {
    const [connection, setConnection] = useState<signalR.HubConnection>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Crear la conexión SignalR
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7023/chat', {
                withCredentials: false,
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Conectado al Hub');
                    connection.invoke("RegisterUser", sender);
                    connection.on('ReceiveMessage', (user, message) => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { user, message },
                        ]);
                    });
                })
                .catch((err) => console.error('Error al conectar al Hub:', err));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection && newMessage.trim()) {
            try {
                await connection.invoke('SendMessage', sender, receiver, newMessage);
                setNewMessage(''); 
            } catch (err) {
                console.error('Error al enviar el mensaje:', err);
            }
        }
    };

    return (
        <div>
            <h1>Chat con {receiver}</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default Chat