
export class Node {
    pathUp;
    pathDown;
    pathRight;
    pathLeft;
    nodeVisited;
    constructor() {
        this.pathUp = 0;
        this.pathDown = 0;
        this.pathRight = 0;
        this.pathLeft = 0;
        this.nodeVisited = 0;
    }
    


}

export class Position{
    x;
    y;
    constructor(x,y) {
        this.x = x;
        this.y = y;
      }

}

function drawBarrierUp(x,y){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.moveTo(x*50, y*50);
    ctx.lineTo((x+1)*50, y*50);
    ctx.stroke();
  }
  
  function drawBarrierDown(x,y){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.moveTo(x*50, (y+1)*50);
    ctx.lineTo((x+1)*50, (y+1)*50);
    ctx.stroke();
  }
  
  function drawBarrierRight(x,y){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.moveTo((x+1)*50, y*50);
    ctx.lineTo((x+1)*50, (y+1)*50);
    ctx.stroke();
  }
  
  function drawBarrierLeft(x,y){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x*50, y*50);
    ctx.lineTo(x*50, (y+1)*50);
    ctx.stroke();
  }



export function createMaze() {
    let nodes = new Array();
    for (let i = 0; i < 20; i++) {
            nodes.push(new Array(10));
        
    }
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            nodes[i][j] = new Node;
            
        }
        
    }
    let startX = Math.floor(Math.random() * 20);
    let startY = Math.floor(Math.random() * 10);

    let nodeStack = new Array();
    console.log(nodeStack);///
    nodeStack.push(new Position(startX,startY));
    nodes[startX][startY].nodeVisited = 1;
    console.log(nodeStack);///
    let nodeVisitedCount = 1;


    while(nodeVisitedCount < 200){
        let paths = new Array();
        let top = nodeStack.length - 1;
        
        if(nodeStack[top].y > 0 && nodes[nodeStack[top].x][nodeStack[top].y - 1].nodeVisited == 0){
            paths.push("Up")
        }
        //Down
        if(nodeStack[top].y < 9 && nodes[nodeStack[top].x][nodeStack[top].y + 1].nodeVisited == 0){
            paths.push("Down")
        }
        //Right
        if(nodeStack[top].x < 19 && nodes[nodeStack[top].x + 1][nodeStack[top].y].nodeVisited == 0){
            paths.push("Right")
        }
        //Left
        if(nodeStack[top].x > 0 && nodes[nodeStack[top].x - 1][nodeStack[top].y].nodeVisited == 0){
            paths.push("Left")
        }

        if(paths.length > 0){
            let selectedPath = Math.floor(Math.random() * paths.length);

            if(paths[selectedPath] == "Up"){
                nodes[nodeStack[top].x][nodeStack[top].y - 1].nodeVisited = 1;
                nodes[nodeStack[top].x][nodeStack[top].y - 1].pathDown = 1;
                nodes[nodeStack[top].x][nodeStack[top].y].pathUp = 1;
                nodeStack.push( new Position(nodeStack[top].x , nodeStack[top].y - 1) );
            }

            else if(paths[selectedPath] == "Down"){
                nodes[nodeStack[top].x][nodeStack[top].y + 1].nodeVisited = 1;
                nodes[nodeStack[top].x][nodeStack[top].y + 1].pathUp = 1;
                nodes[nodeStack[top].x][nodeStack[top].y].pathDown = 1;
                nodeStack.push( new Position(nodeStack[top].x , nodeStack[top].y + 1) );
            }

            else if(paths[selectedPath] == "Right"){
                nodes[nodeStack[top].x + 1][nodeStack[top].y].nodeVisited = 1;
                nodes[nodeStack[top].x + 1][nodeStack[top].y].pathLeft = 1;
                nodes[nodeStack[top].x][nodeStack[top].y].pathRight = 1;
                nodeStack.push( new Position(nodeStack[top].x + 1 , nodeStack[top].y) );
            }

            else if(paths[selectedPath] == "Left"){
                nodes[nodeStack[top].x - 1][nodeStack[top].y].nodeVisited = 1;
                nodes[nodeStack[top].x - 1][nodeStack[top].y].pathRight = 1;
                nodes[nodeStack[top].x][nodeStack[top].y].pathLeft = 1;
                nodeStack.push( new Position(nodeStack[top].x - 1 , nodeStack[top].y) );
            }

            nodeVisitedCount++;


        }
        else{

            nodeStack.pop();

        }
        
    }
    //draw
    console.log("Message!")
    console.log(nodes);

    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "black";
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            setTimeout(function() {
                //your code to be executed after 1 second
                if(nodes[i][j].pathUp == 0){
                    drawBarrierUp(i,j);
                }
                if(nodes[i][j].pathDown == 0){
                    drawBarrierDown(i,j);
                }
                if(nodes[i][j].pathRight == 0){
                    drawBarrierRight(i,j);
                }
                if(nodes[i][j].pathLeft == 0){
                    drawBarrierLeft(i,j);
                }
              }, 1)    
        }
    }

    return nodes; 
}   