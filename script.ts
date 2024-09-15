let computerChoice:string;
      let resultMsg:string;
      let scoreStr:string|null=localStorage.getItem('score');
      let score:{
        tie:number,
        lost:number,
        won:number,
        displayScore:()=>unknown;
      };
      function generateComputerChoice():string {
        /* Math.random()*3 to generate random number between 0 to 3 math.random generates random number between 0 to 1*/
        let randomNumber = Math.random() * 3;
        if (randomNumber > 0 && randomNumber <= 1) {
          return "Rock";
        } else if (randomNumber <= 2) {
          return "Paper";
        } else {
          return "Scissors";
        }
      }

      function getResult(userMove:string, computerMove:string):string {
        if (userMove === computerMove ) {
          score.tie++
          return `It's a Tie`;
        } else if ((userMove === "Paper" && computerMove === "Rock") || (userMove === "Scissors" && computerMove === "Paper") || (userMove === "Rock" && computerMove === "Scissors") ) {
          score.won++
          return "You have won";}
          else {
            score.lost++
            return "Computer has won";
          }
      }
      function showResult(userMove:string | false, computerMove:string | false, result:string | false) {
        localStorage.setItem('score',JSON.stringify(score));
        (document.querySelector('#user-choice') as HTMLHeadingElement).innerText=userMove?`You have chosen ${userMove}`:'';
        (document.querySelector('#computer-choice') as HTMLHeadingElement).innerText=computerMove?`Computer has chosen ${computerMove}`:'';
        (document.querySelector('#result') as HTMLHeadingElement).innerText=result||'';
        (document.querySelector('#score') as HTMLHeadingElement).innerText
        =score.displayScore() as string;
      }
      resetScore(scoreStr);
      function resetScore (scoreStrData:string | null) {
        localStorage.clear()
        score =scoreStrData?JSON.parse(scoreStrData): {
        won:0,
        lost:0,
        tie:0,}
      score.displayScore=function(){
          return `Won : ${score.won} , Lost : ${score.lost} , Tie : ${score.tie}`
        }
        showResult(false , false , false)
      };
      showResult(false , false , false);
// -----------------------
(document.querySelector('.rock-button') as HTMLButtonElement).addEventListener('click',()=>{
  computerChoice=generateComputerChoice();
  resultMsg=getResult('Rock',computerChoice);
   showResult('Rock',computerChoice,resultMsg);
});
(document.querySelector('.paper-button') as HTMLButtonElement).addEventListener('click', ()=>{
  computerChoice= generateComputerChoice();
     resultMsg = getResult('Paper',computerChoice);
      showResult('Paper',computerChoice,resultMsg);
});
(document.querySelector('.scissors-button') as HTMLButtonElement).addEventListener('click', ()=>{
  computerChoice= generateComputerChoice();
      resultMsg=getResult('Scissors',computerChoice);
      showResult('Scissors',computerChoice,resultMsg);
});
(document.querySelector('#reset-button') as HTMLButtonElement).addEventListener('click',()=>{
        resetScore(null);
})

