let ball = document.getElementById('ball');
let rod1 = document.getElementById('rod1');
let rod2 = document.getElementById('rod2');

let rod1Score=0,
    rod2Score=0,
    pointsToWin=3,
    ballSpeedX = 4,
    ballSpeedY = 4,
    gameOn = false,
    rodSpeed=10;

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;

let keysPressed={};


function resetBoard() {
    rod1.style.left = (window.innerWidth -rod1.offsetWidth ) / 2 + 'px';
    rod2.style.left = (window.innerWidth -rod2.offsetWidth ) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';
    ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
    rod1Score = 0;
    rod2Score = 0;
    ballSpeedX = 4;
    ballSpeedY = 4;
    keysPressed={};
    gameOn = false;
    rod1.innerText=`Rod 1 : ${rod1Score} / ${pointsToWin}`;
    rod2.innerText=`Rod 2 : ${rod2Score} / ${pointsToWin}`;
}
resetBoard();


window.addEventListener('keydown',e=>{
keysPressed[e.code]=true;
});

window.addEventListener('keyup',e=>{
keysPressed[e.code]=false;
});


window.addEventListener('keypress', function (e) {
    if (e.code === "Enter" || e.code==='Space') 
        if (!gameOn) {
            gameOn = true;  
        }   
});

function setScore(lastPointBy){
    gameOn=false;
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';
    rod1.style.left = (window.innerWidth -rod1.offsetWidth ) / 2 + 'px';
    rod2.style.left = (window.innerWidth -rod2.offsetWidth ) / 2 + 'px';
    if(lastPointBy==='rod1'){
        ball.style.top=(rod2.offsetTop-rod2.offsetHeight)+'px';
        ballSpeedY=-4;
    }
    else{
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY=4;
    }
    rod1.innerText=`Rod 1 : ${rod1Score} / ${pointsToWin}`;
    rod2.innerText=`Rod 2 : ${rod2Score} / ${pointsToWin}`;
    if(rod1Score===pointsToWin){
        alert('Rod 1 Won!');
        resetBoard();
    }
    if(rod2Score===pointsToWin){
        alert('Rod 2 Won!');
        resetBoard();
    }
}

setInterval(()=>{
    if(gameOn){
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;
            let rod1X = rod1.getBoundingClientRect().x;
            let rod2X = rod2.getBoundingClientRect().x;     

            if(keysPressed['KeyA'])
                rod1.style.left=Math.max(rod1X-rodSpeed,0)+'px';
            else if(keysPressed['KeyD'])
                rod1.style.left=Math.min(rod1X+rodSpeed,windowWidth-rod1.offsetWidth)+'px';
            if(keysPressed['ArrowLeft'])
                rod2.style.left=Math.max(0,rod2X-rodSpeed)+'px';
            else if(keysPressed['ArrowRight'])
                rod2.style.left=Math.min(rod2X+rodSpeed,windowWidth-rod2.offsetWidth)+'px';

            // Move ball 
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';


            if ((ballX + ballDia) > windowWidth || ballX < 0) {
                ballSpeedX = -ballSpeedX; // Reverses the direction
            }

            // It specifies the center of the ball on the viewport
            let ballPos = ballX + ballDia / 2;

            // Check for Rod 1
            if (ballY <= rod1Height) {
                ballSpeedY = -ballSpeedY; // Reverses the direction
                if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                    rod2Score++;
                    setScore('rod2');
                }
            }

            // Check for Rod 2
            else if ((ballY + ballDia) >= (windowHeight - rod2Height)) {
                ballSpeedY = -ballSpeedY; // Reverses the direction
                if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                    rod1Score++;
                    setScore('rod1');
                }
            }
        }
},1000/60);