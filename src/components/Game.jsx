import useStartGame from "../hooks/useStartGame";

function Game() {
  useStartGame();

  return <div id="gameContainer"></div>;
}

export default Game;
