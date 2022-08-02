const main=document.querySelector(".main");


const Player=(name,sign)=>{
    return{name,sign};
}
const p1=Player("player1", "X");
const p2=Player("Player2","O");
let activePlayer=p1;
const gameBoard=(()=>{
    let boardArr=[]
    const showBoard=()=>{
        console.log(boardArr);
    }
    const checkTie=()=>{
        let empty=false;
        for(i=0;i<3;i++){
            for(k=0;k<3;k++){
                if(boardArr[i][k]=="")empty=true;
            }
        }
        return empty
    }
    const checkWin=()=>{
        let win=false;
        for(i=0;i<3;i++){
            if(boardArr[i][0]==boardArr[i][1] && boardArr[i][0]==boardArr[i][2] &&boardArr[i][0]!="") win=true;
            if(boardArr[0][i]==boardArr[1][i] &&boardArr[0][i]==boardArr[2][i] &&boardArr[0][i]!="") win=true;
        }
        if(boardArr[0][0]==boardArr[1][1] &&boardArr[0][0]==boardArr[2][2]&&boardArr[0][0]!="") win=true;
        if(boardArr[2][0]==boardArr[1][1] &&boardArr[2][0]==boardArr[0][2]&&boardArr[2][0]!="") win=true;

        return win;
    }

    const switchPlayer=()=>{
        if(activePlayer==p1) activePlayer=p2;
        else activePlayer=p1;
    }
    const reset=()=>{
        main.innerHTML="";
        let boardArr=[]
        initialize();
    }

    const change=(btn,row,cell)=>{
        if(boardArr[row][cell]==""){
            btn.innerHTML=activePlayer.sign;
            boardArr[row][cell]=activePlayer.sign;
            if(checkWin()){
                console.log(activePlayer.name+" wins")
                reset();
            }
            else if(!checkTie()){
                console.log("Tie")
                reset();
            }
            else switchPlayer();
        }
        else console.log("spot taken");
    }
    const display=()=>{
        boardArr.forEach((row,i_row) => {
            const div=document.createElement("div");
            row.forEach((cell,i_cell) =>{
                const btn=document.createElement("button");
                btn.onclick=function(){change(btn,i_row,i_cell)};
                div.appendChild(btn);
            });
            main.appendChild(div);
        });
    }

    const initialize=()=>{
        for(i=0;i<3;i++){
            boardArr[i]=[];
            for(k=0;k<3;k++){
                boardArr[i].push("");
            }
        }
        display();
    }

    return {initialize,showBoard};
})();

gameBoard.initialize();
