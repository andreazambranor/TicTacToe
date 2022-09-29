//KEEP TRACK OF TURNS HERE
let activePlayer='X';
//ARRAY THAT STORES ARRAY OF MOVES
let selectedSquares=[];

//PLACE X OR O IN A SQUARE
function placeXorO(squareNumber) {//ENSURE SQUARE HASNT BEEN SELECTED ALREADY
    if (!selectedSquares.some(element=>element.includes(squareNumber))) {//.SOME METHOD CHECK EACH ELEMENT OF THE SELECTEDSQUARE ARRAY TO SEE IF COLNTAINS SQUARE NUMBER CLICKED ON.
        let select=document.getElementById(squareNumber);//RETRIVING THE HTML ELEMENT ID THAT WAS CLICKED
        if (activePlayer==='X') { //CHECK WHOS TURN IS IT
            select.style.backgroundImage='url("images/x.png")'; //IF ACTIVE PLAYER IS EQUAL TO 'X'PLACE X.PNG.
        } else {
            select.style.backgroundImage='url("images/o.png")'; //IF ACTIVE IS O PLACE O.PNG
        }
        selectedSquares.push(squareNumber+activePlayer);//CONCETENATE SQUARE NUMBER AND ACTIVEPLAYER AND ADDED TO AN ARRAY
        checkWinConditions();//CALL FUNCTION TO CHECK FOR ANY WIN CONDITIONS.
        if (activePlayer==='X') { //CONDITION FOR CHEQUING ACTIVE PLAYER
            activePlayer='O'; //IF ACTIVE PLAYER X, CHANGE TO O
        } else { 
            activePlayer='X';//IF ACTIVEPLAYER ANYTHING OTHER THAN X, CHANGE TO X
        }
        audio('media/place.mp3');//FUNCTION PLAY PLACEMENT SOUND
        if(activePlayer==='O') {//CONDITION CHECK IF COMPUTER TURN
            disableCick();//DISABLE CLICK FOR COMPUTER TURN
            setTimeout(function (){ computersTurn() ; }, 1000);//FUNCTION WAIT 1 SEC, PLACE BACKGOTUND IMAGE AND ENABLE CLICK
        }
        return true; //NEEDED FOR COMPUTERSTURN FUNCTION
    }
    function computersTurn() {//SELECT RANDOM SQUARE
        let success=false; //BOOLEAN NEEDED FOR WHILE LOOP
        let pickASquare; //SLELECT RANDOM NUMBER 0-8
        while(!success) {//ALLOW WHILE LOOPTO KEEPTRYING IF A SQUARE IS SELECTED
            pickASquare= String(Math.floor(Math.random() *9));//RANDOM NUMBER 0-8 IS SELECTED
            if (placeXorO(pickASquare)) { //IF RETURN TRUE THE SQUARE HASNT BEEN SELECTED
                placeXorO(pickASquare); //LINE CALL FUNCTION
                success = true;//CHANGE BOOLEAN CND END LOOP
            };
        }
    }
}

//PARSE SELECTED SQUARES ARRAY TO SEARCH FOR WIN CONDITIONS
//DRAWWINLINE FUNCTION IS CALLED TO DRAW LINEIF CONDITION IS MET
function checkWinConditions() {
    if (arrayIncludes('0X', '1X', '2X')){drawWinLine(50, 100, 558, 100);}//X 0,1,2 CONDITION
    else if (arrayIncludes('3X', '4X', '5X')){drawWinLine(50, 304, 588, 304);}//X 3, 4, 5 CONDITION
    else if (arrayIncludes('6X', '7X', '8X')){drawWinLine(50, 508, 558, 508);}
    else if (arrayIncludes('0X', '3X', '6X')){drawWinLine(100, 50, 100, 558);}
    else if (arrayIncludes('1X', '4X', '7X')){drawWinLine(304, 50, 304, 558);}
    else if (arrayIncludes('2X', '5X', '8X')){drawWinLine(508, 50, 508, 558);}
    else if (arrayIncludes('6X', '4X', '2X')){drawWinLine(100, 508, 510, 90);}
    else if (arrayIncludes('0X', '4X', '8X')){drawWinLine(100, 100, 520, 520);}
    else if (arrayIncludes('0O', '1O', '2O')){drawWinLine(50, 100, 558, 100);}
    else if (arrayIncludes('3O', '4O', '5O')){drawWinLine(50, 304, 558, 304);}
    else if (arrayIncludes('6O', '7O', '8O')){drawWinLine(50, 508, 558, 508);}
    else if (arrayIncludes('0O', '3O', '6O')){drawWinLine(100, 50, 100, 558);}
    else if (arrayIncludes('1O', '4O', '7O')){drawWinLine(304, 50, 304, 558);}
    else if (arrayIncludes('2O', '5O', '8O')){drawWinLine(508, 50, 508, 558);}
    else if (arrayIncludes('6O', '4O', '2O')){drawWinLine(100, 508, 510, 90);}
    else if (arrayIncludes('0O', '4O', '8O')){drawWinLine(100, 100, 520, 520);}
    //CONDITION CHECKS FOR TIES, IF 9 SQUARES SELECTED
    else if (selectedSquares.length >=9) {
        audio('media/tie.mp3'); //FUNCTION PLAY TIE SOUND
        setTimeout(function (){resetGame();},1000);
    }
    function arrayIncludes(squareA,squareB,squareC) {//CHECK IF INCLUDE 3 STRINGS FOR WIN CONDITION
    //CHECK 3 IN A ROW
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    if (a===true && b===true && c===true) {return true; }
    }
}

//THIS MAKES BODY ELEMENT TEMPORARILY UNCLICKABLE
function disableCick() {
    body.style.pointerEvents='none';
    setTimeout(function() {body.style.pointerEvents='auto';}, 1000);
}

function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1=coordX1,
        y1=coordY1,
        x2=coordX2,
        y2=coordY2,
        x=x1,
        y=y1;

    function animateLineDrawing() {
        const animationLoop=requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth=10;
        c.strokeStyle='rgba(90, 255, 33, .8)';
        c.stroke();
        if (x1<=x2 && y1<=y2) {
            if(x<x2) {x+=10;}
            if(y<y2) {y+=10;}
            if (x>=x2 && y>=y2) {cancelAnimationFrame(animationLoop);}
        }
        if (x1<=x2 && y1>=y2) {
            if(x<x2) {x+=10;}
            if(y>y2) {y-=10;}
            if(x>=x2 && y<=y2) {cancelAnimationFrame(animationLoop);}
        }
    }


    function clear() {
        const animationLoop=requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    disableCick();
    audio('media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function() {clear();resetGame(); } , 1000);
}

function resetGame() {
    for(let i=0; i<9; i++) {
        let square=document.getElementById(String(i));
        square.style.backgroundImage='';
        }
        selectedSquares=[];
}