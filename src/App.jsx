import { Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import StartScreen from "./pages/StartScreen";
import GameOver from "./pages/GameOver";
import Test from "./pages/Test";

function App() {
  
  

  return (
    <>
      <Routes>
       <Route  path="/" element={<StartScreen />}/>
       <Route  path="/game-over" element={<GameOver />}/>

        <Route  path="/game" element={<MainScreen />}/>
        <Route  path="test" element={<Test />}/>

      </Routes>
    </>
  )
}

export default App
