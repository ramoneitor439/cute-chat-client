import './App.css'
import Footer from './components/Footer/Footer'
import Chat from './views/Chat/Chat'

function App() {
  return (
    <>
      <Chat sender="user1" receiver='user2' />
      <Chat sender="user2" receiver='user1' />
      <Footer />
    </>
  )
}
export default App
