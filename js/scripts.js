var MAX_POINTS = 10;

// new game button
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// player selection
var pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//initial values
var player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

// display game elements
var newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements(gameState) {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Play again';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

setGameElements('notStarted');

// begining of the game
var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
	player.name = prompt('Please enter your name', 'player name');
	
	if (player.name) {
		player.score = computer.score = 0;
		setGamePoints();
		setGameElements('started');

		playerNameElem.innerHTML = player.name;
	}
}

//player choice
function playerPick(playerPick) {
	console.log(playerPick);
}

//computer random choice
function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

//The game logic
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // draw
	} else if (
		(computerPick == 'rock' &&  playerPick == 'scissors') ||
		(computerPick == 'scissors' &&  playerPick == 'paper') ||
		(computerPick == 'paper' &&  playerPick == 'rock')) {

		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
	}
	setGamePoints(); 
	endGame();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    console.log('function setGamePoints\n' + 'player: ' + playerPointsElem.innerHTML + 'computer: ' + computerPointsElem.innerHTML); //test
}

function endGame() {
	if (player.score == MAX_POINTS || computer.score == MAX_POINTS) {
		setGameElements('ended');
		if (player.score == MAX_POINTS) {
			alert('The winner is ' + player.name.toUpperCase() + '\nYou get ' + player.score + ' points!');
		} else if (computer.score == MAX_POINTS) {
			alert('The winner is COMPUTER!' + '\nNot this time :-( \nComputer colected ' + computer.score + ' points first.');
		}
	}
}
