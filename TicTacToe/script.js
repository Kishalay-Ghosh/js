let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let endMatchBtn = document.querySelector("#endMatchBtn");
let pl1 = document.querySelector("#pl1");
let pl2 = document.querySelector("#pl2");

let turnO = true;
let count = 0;
var player1Score = 0;
var player2Score = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [9,10,11],
    [0,3,6],
    [3,6,9],
    [1,4,7],
    [4,7,10],
    [2,5,8],
    [5,8,11],
    [0,4,8],
    [3,7,11],
    [2,4,6],
    [5,7,9]
    
  ];


  const enableBoxes = ()=>{
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
  };

  const disableBoxes = ()=>{
    for(let box of boxes)
    {
        box.disabled = true;
    }
  };
  const resetGame = ()=>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

  };
  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const gameDraw = ()=>{
    msg.innerText = "Game draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const checkWinner = ()=>{
    for(let pattern of winPatterns){
      let pos1 = boxes[pattern[0]].innerText;
      let pos2 = boxes[pattern[1]].innerText;
      let pos3 = boxes[pattern[2]].innerText;

      if(pos1 !="" && pos2 !="" && pos3 !=""){
        if(pos1===pos2 && pos2===pos3){
          showWinner(pos1);
          if(pos1==="O"){
            player1Score++;
            pl1.innerHTML= `Player1 ->${player1Score}`
          }
          else{
            player2Score++;
            pl2.innerHTML= `Player2 ->${player2Score}`
          }
          return true;
        }
      }
    }
  };

  boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();//
        if(count ==12 && !isWinner)
            gameDraw();//
    })
  }
  );

  const endGame = ()=>{
    if(player1Score > player2Score){
      msg.innerText = `Player1 is Winner. Thanks! for playing..`;
      
    }
    else if(player2Score> player1Score){
      msg.innerText = `Player2 is Winner. Thanks! for playing.`;
     
    }
    else{
      msg.innerText = `The Match is draw. Thanks! for playing.`;
      
    }
   
    msgContainer.classList.remove("hide");
    disableBoxes();
   // resetGame();
    player1Score = 0;
    player2Score = 0;
  };

  newGameBtn.addEventListener("click",resetGame);
  resetBtn.addEventListener("click",resetGame);
  endMatchBtn.addEventListener("click",endGame);
