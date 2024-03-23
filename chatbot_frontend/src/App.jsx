
import './App.css'
import Chatbot from "./components/chatbot/Chatbot"
import ayur from "./assets/ayur.jpg"
function App() {

  return (
    <>
        <img src={ayur} alt="" className='bgimg'/>
      <Chatbot/>    
      
    </>
  )
}

export default App
