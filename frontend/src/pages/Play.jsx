import '../stylesheets/App.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import {logout, updateMyStats} from '../features/auth/authSlice'

import {createMaze, mySearch, isPath} from '../functionality/maze';
import styles from '../stylesheets/Play.module.css';


const Play = () => {
  
  const [restart, setRestart] = React.useState(0);
  const [score, setScore] = React.useState(0);
  let user = useSelector((state) => state.auth.user)
  
  let maze;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if(score > user.stats.hiscore){
      const stats = {
        stats:{hiscore: score}
      }
      dispatch(updateMyStats(stats))
    }
  }, [score])

  React.useEffect(() => {
    console.log("YO",restart);
    console.log(user);
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    
    ctx.beginPath();
    ctx.clearRect(0, 0, 1000, 500);
    /*ctx.rect(0,0,48,48);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.fill();*/

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.rect(19*50,9*50,50,50);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "black";

    maze = createMaze();

  }, [restart]);


  function startGame(){
    let x = 0;
    let y = 0;

    let chaserX = 0;
    let chaserY = 0;

    let intervalId = null;

    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(0,0,48,48);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.fill();

    function handlePlayerMove(e) {
      console.log(e.keyCode);
      let goalNode = [19,9];
      if(isPath(maze[x][y], e.keyCode)){
        ctx.beginPath();
        ctx.clearRect(50*x + 1, 50*y + 1, 48, 48);    
        ctx.stroke();
        switch (e.keyCode) {
          //Up
          case 38:
            y--;
            break;
          //Down  
          case 40:
            y++;
            break;
          //Right
          case 39:
            x++;
            break;
          //Left  
          case 37:
            x--;
            break;          
        
          default:
            break;
        }

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(50*x+1,50*y+1,48,48);
        ctx.fill(); 
      }
      
      if(x == goalNode[0] && y == goalNode[1]){
        console.log("Before",restart);
        setScore(score + 1)
        setRestart(restart + 1);
        console.log("After",restart);
        clearInterval(intervalId);
        clearInterval(searchIntervalID);
        document.removeEventListener("keydown",handlePlayerMove);

      }
    }


    let searchIntervalID = setInterval(() => {
      let route = mySearch(x,y,chaserX,chaserY,maze);

        if(intervalId != null){
          clearInterval(intervalId);
        }
        
        let i = 0;
        intervalId = setInterval(() => {
          ctx.beginPath();
          if(i != route.length-1){
          ctx.clearRect(route[i].xPos*50+1,route[i].yPos*50+1,48,48);
          ctx.fillStyle = "yellow";
          ctx.rect(route[i+1].xPos*50+1,route[i+1].yPos*50+1,48,48);
          ctx.fill();
          chaserX = route[i+1].xPos;
          chaserY = route[i+1].yPos;
          i++;
          }
          if( chaserX == x && chaserY == y/*i == route.length-1*/){
            setScore(0)
            clearInterval(intervalId);
            clearInterval(searchIntervalID);
            setRestart(restart+1);
            document.removeEventListener("keydown",handlePlayerMove);

          }
        }, 300);
    },1000);    

    document.addEventListener("keydown",handlePlayerMove);
  }

  const logOut = () => {
    localStorage.clear()
    dispatch(logout())
    navigate('/')
  }



  return (
    <div className={styles.page}>

      <div className={styles.head}>

        <h1>Maze Chase</h1>

        

      </div>

      <div className={styles.body}>
        <div className={styles.info}>
            <button
              className={styles.button}
              onClick={startGame}>
              Start  
            </button>
            <h2>{user.name}</h2>
            <h3>Score: {score}</h3>
            <h4>Hi-Score: {user.stats.hiscore}</h4>
            <button className={styles.button}
              onClick={logOut}>
              Logout
            </button>
        </div>
        
        <div className={styles.canvascontainer}>
        <canvas className={styles.canvas}
          id="myCanvas"
          width="1000"
          height="500"
          style={{ border: "1px solid #d3d3d3" }}
          //onKeyDown={handleKeyDown}
        >
        </canvas>
        </div>
      </div>  

      
    </div>
  );
}


export default Play;
