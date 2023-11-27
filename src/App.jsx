import Game from "./hooks/useStartGame";
import "./app.css";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Welcome from "./components/Welcome";
import { useEffect, useState } from "react";

function App() {
  const [currentView, setCurrentView] = useState({ Page: Game });

  useEffect(() => {
    if (currentView.Page != Game) {
      // this.sys.game.destroy(true);
      console.log("buttpoo")
    }
  }, [currentView, setCurrentView]);

  return (
    <>
      <div className="App">
        <LeftBar />
        <div className="Gamebox">
          <currentView.Page />
        </div>
        <RightBar />
      </div>
    </>
  );
}

export default App;
