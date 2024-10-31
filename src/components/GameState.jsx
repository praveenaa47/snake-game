import React, { useEffect, useState } from 'react'
import GamePieces from './GamePieces';

function GameState() {
    const [score, setScore] = useState(0);
    const [highScore,setHighScore] = useState(parseInt(localStorage.getItem("highScore")) || 0)
    const [gameOver,setGameOver] =  useState(false);
    const [collision,setCollisionType] = useState("");


    const handleGameOver = (type) =>{
        setGameOver(true);

        if (score>highScore){
            setHighScore(score);
            localStorage.setItem("highScore", score.toString())
        }
        setCollisionType(type)
    }

    // to restart the game

    const handleResetGame = () =>{
        setScore(0);
        setGameOver(false);
    }

    useEffect(()=>{
        const handleKeyPress = (e) => {
            if(gameOver && e.key === "Enter "){
                 handleResetGame()
            }
        }
        window.addEventListener("keydown",handleKeyPress)

    },[gameOver])


  return (
    <div className='game-container'>
      <p className='score' style={{color:"#C0EBA6",marginTop:"30px"}}>Score:{score}</p>
      <br />
      <p className='high-score'>High Score:{highScore}</p>
      <br />
      {
        gameOver &&(
            <div className='game-over'>
              <p >Game Over! {collision === "wall" ? "you Hit the wall" : "you ate yourself"}!</p>  
              <p className='game'>please press enter to reset the game <i class="fa-solid fa-apple-whole"></i></p>
            </div>
        )  
      }{
        !gameOver && (
            <GamePieces
           score={score}
           setScore={setScore}
           onGameOver={(type)=> handleGameOver(type)}
            
            
            />
        )
      }
    </div>
  )
}

export default GameState;
