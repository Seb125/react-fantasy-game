import { Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import StartScreen from "./pages/StartScreen";
import GameOver from "./pages/GameOver";
import Test from "./pages/Test";
import IsPrivate from './components/IsPrivate';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  
  

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
       <Route  path="/" element={<IsPrivate><StartScreen /></IsPrivate>}/>
       <Route  path="/game-over" element={<IsPrivate><GameOver /></IsPrivate>}/>

        <Route  path="/game" element={<IsPrivate><MainScreen /></IsPrivate>}/>
        <Route  path="test" element={<Test />}/>

      </Routes>
    </>
  )
}

export default App
