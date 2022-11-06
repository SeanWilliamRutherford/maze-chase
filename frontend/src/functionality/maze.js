
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

function euclidianDistance(xStart,yStart,xEnd,yEnd){
    return Math.sqrt( (xEnd - xStart)*(xEnd - xStart) + (yEnd - yStart)*(yEnd -yStart) );
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
  
export function mySearch(goalX, goalY, currX, currY, maze){
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
            if(maze[xPos][yPos].pathUp == 0 || myNodes[xPos][yPos-1].visited == 1){
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
            if(maze[xPos][yPos].pathDown == 0 || myNodes[xPos][yPos+1].visited == 1){
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
            if(maze[xPos][yPos].pathRight == 0 || myNodes[xPos+1][yPos].visited == 1){
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
            if(maze[xPos][yPos].pathLeft == 0 || myNodes[xPos-1][yPos].visited == 1){
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
  
  
export function isPath(node, direction){
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

//Realize maze algorithm by drawing walls
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


//Create a new random maze
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
    console.log("Message!")
    console.log(nodes);

    //Draw Maze
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "black";
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            setTimeout(function() {
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