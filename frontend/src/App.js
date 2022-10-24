import './App.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import {
  Link,
} from "react-router-dom";

import {createMaze} from './Nodes.js';

let nodes;

function euclidianDistance(xStart,yStart,xEnd,yEnd){
  return Math.sqrt( (xEnd - xStart)*(xEnd - xStart) + (yEnd - yStart)*(yEnd -yStart) );
}

export class MyNode {
  hCost;
  gCost; 
  fCost;
  xPos;
  yPos;
  visited;
  open;
  parent;
  constructor(x,y){
    this.xPos = x;
    this.yPos = y;
    this.visited = false;
    this.open = false;
    this.gCost = 9999999; //If no gCost has been assigned, a new path will always be created
    this.hCost = 0;
    this.fCost = 0;
    this.parent = null;
  }

}

function compareMyNodes(a,b){
  if(a.fCost < b.fCost){
    return -1;
  }
  if(a.fCost > b.fCost){
    return 1;
  }
  return 0;
}

function mySearch(goalX, goalY, currX, currY){
  let myNodes = new Array();
  for (let i = 0; i < 20 ; i++) {
    myNodes.push(new Array(10));
  }

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      myNodes[i][j] = new MyNode(i,j);        
    }
  }

  let open = new Array();
  open.push(myNodes[currX][currY]);
  myNodes[currX][currY].gCost = 0;
  console.log(open); /// 

  while(true){
    open.sort(compareMyNodes).reverse();
    let current = open.pop();
    console.log(current);
    current.visited = true;
    
    if (current.xPos == goalX && current.yPos == goalY){
      let route = new Array();
      let curr = myNodes[goalX][goalY];
      route.push(curr);
      while(curr.parent != null){
        curr = curr.parent;
        route.push(curr);
      }
      route.reverse();
      return route;
    }

    let xPos = current.xPos;
    let yPos = current.yPos;
    //UP//
    if(yPos > 0){
    if(nodes[xPos][yPos].pathUp == 0 || myNodes[xPos][yPos-1].visited == 1){
      //DO NOTHING
    }
    else if(current.gCost + 1 < myNodes[xPos][yPos-1].gCost){
      myNodes[xPos][yPos-1].gCost = current.gCost + 1;
      myNodes[xPos][yPos-1].fCost =  myNodes[xPos][yPos-1].gCost + euclidianDistance(xPos,yPos-1,goalX,goalY);
      myNodes[xPos][yPos-1].parent = current;
      if(myNodes[xPos][yPos-1].open == false){
        open.push(myNodes[xPos][yPos-1]);
        myNodes[xPos][yPos-1].open = true;
      }
    }
    }

    //DOWN//
    if(yPos < 9){
    if(nodes[xPos][yPos].pathDown == 0 || myNodes[xPos][yPos+1].visited == 1){
      //DO NOTHING
    }
    else if(current.gCost + 1 < myNodes[xPos][yPos+1].gCost){
      console.log("DOWN");
      myNodes[xPos][yPos+1].gCost = current.gCost + 1;
      myNodes[xPos][yPos+1].fCost =  myNodes[xPos][yPos+1].gCost + euclidianDistance(xPos,yPos+1,goalX,goalY);
      myNodes[xPos][yPos+1].parent = current;
      if(myNodes[xPos][yPos+1].open == false){
        open.push(myNodes[xPos][yPos+1]);
        myNodes[xPos][yPos+1].open = true;
      }
    }
    }

    //RIGHT
    if(xPos < 19){
    if(nodes[xPos][yPos].pathRight == 0 || myNodes[xPos+1][yPos].visited == 1){
      //DO NOTHING
    }
    else if(current.gCost + 1 < myNodes[xPos+1][yPos].gCost){
      console.log("RIGHT")
      myNodes[xPos+1][yPos].gCost = current.gCost + 1;
      myNodes[xPos+1][yPos].fCost =  myNodes[xPos+1][yPos].gCost + euclidianDistance(xPos+1,yPos,goalX,goalY);
      myNodes[xPos+1][yPos].parent = current;
      if(myNodes[xPos+1][yPos].open == false){
        open.push(myNodes[xPos+1][yPos]);
        myNodes[xPos+1][yPos].open = true;
      }
    }
    }

    //LEFT
    if(xPos > 0){
    if(nodes[xPos][yPos].pathLeft == 0 || myNodes[xPos-1][yPos].visited == 1){
      //DO NOTHING
    }
    else if(current.gCost + 1 < myNodes[xPos-1][yPos].gCost){
      myNodes[xPos-1][yPos].gCost = current.gCost + 1;
      myNodes[xPos-1][yPos].fCost =  myNodes[xPos-1][yPos].gCost + euclidianDistance(xPos-1,yPos,goalX,goalY);
      myNodes[xPos-1][yPos].parent = current;
      if(myNodes[xPos-1][yPos].open == false){
        open.push(myNodes[xPos-1][yPos]);
        myNodes[xPos-1][yPos].open = true;
      }
    }
    }
    console.log(open);
  }
}


function isPath(node, direction){
  switch (direction) {

    //Up
    case 38:
      return node.pathUp == 1;

    //Down  
    case 40:
      return node.pathDown == 1;

    //Right   
    case 39:
      return node.pathRight == 1;

    //Left  
    case 37:
      return node.pathLeft == 1;

    default:
      return false;

  }
}


function App() {
  
  const [restart, setRestart] = React.useState(0);

  React.useEffect(() => {
    console.log("YO",restart);
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

    nodes = createMaze();

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
      if(true){//isPath(nodes[x][y], e.keyCode)){
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
        setRestart(restart + 1);
        console.log("After",restart);
        clearInterval(intervalId);
        clearInterval(searchIntervalID);
        document.removeEventListener("keydown",handlePlayerMove);

      }
    }

    let searchIntervalID = setInterval(() => {

      let route = mySearch(x,y,chaserX,chaserY);

        if(intervalId != null){
          clearInterval(intervalId);
        }
        
        let i = 0;
        intervalId = setInterval(() => {
          ctx.beginPath();
          if(i != route.length-1){
          ctx.clearRect(route[i].xPos*50,route[i].yPos*50,48,48);
          ctx.fillStyle = "yellow";
          ctx.rect(route[i+1].xPos*50,route[i+1].yPos*50,48,48);
          ctx.fill();
          chaserX = route[i+1].xPos;
          chaserY = route[i+1].yPos;
          i++;
          }
          if( chaserX == x && chaserY == y/*i == route.length-1*/){
            clearInterval(intervalId);
            clearInterval(searchIntervalID);
            setRestart(restart+1);
            document.removeEventListener("keydown",handlePlayerMove);

          }
        }, 300);
    },1000);    

    document.addEventListener("keydown",handlePlayerMove);
  }



  return (
    <div>
      <h1>Maze Runner</h1>
      
      <button
        className="button button1"
        onClick={startGame}>
        Start  
      </button>
      
      <canvas
        id="myCanvas"
        width="1000"
        height="500"
        style={{ border: "1px solid #d3d3d3" }}
        //onKeyDown={handleKeyDown}
      >
      </canvas>

      <li>
        <Link to={'/'}>Log Out</Link>
      </li>
    </div>
  );
}


export default App;
