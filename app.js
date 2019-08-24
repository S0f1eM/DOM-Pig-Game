/*
GAME RULES:

- The game has 2 players, playing in rounds. In each turn, a player rolls a dice 
as many times as he whishes. Each result get added to his ROUND score. But, if the 
player rolls a 1, all his ROUND score gets lost. After that, it's the next player's 
turn. The player can choose to 'Hold', which means that his ROUND score gets added 
to his GLBAL score. After that, it's the next player's turn. The first player to
reach 100 points on GLOBAL score wins the game.
challenge 
*/


let scores, roundScore, activePlayer, gamePlaying, prevDice, scoreToWin, initScore, diceScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gamePlaying){
	//random number
	let dice = Math.floor(Math.random() * 6) + 1;
	let dice2 = Math.floor(Math.random() * 6) + 1;

	//display the result
	let diceDOM = document.querySelector('.dice');
	let dice2DOM = document.querySelector('.dice2');
	diceDOM.style.display = 'block';
	dice2DOM.style.display = 'block';
	diceDOM.src = 'img/dice-' + dice + '.png';
	dice2DOM.src = 'img/dice-' + dice2 + '.png';

	if (dice !== 1 || dice2 !== 1) {
		diceScore = dice + dice2;
		roundScore += diceScore; 
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		//next player
		nextPlayer();
	}
	diceScore = 0;
  	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gamePlaying) {
	//add score to global score
	scores[activePlayer] += roundScore;
	//update l'UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	//check if the player win the game
	

		if (scores[activePlayer] >= initScore ) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
		}  else {
			//else next palyer
			nextPlayer();
	}
}
});


function nextPlayer() {
	//change player 
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		prevDice = 0;
		diceScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
};



function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	prevDice = 0;
	diceScore = 0;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	gamePlaying = true;

	scoreToWin = document.querySelector('.input-score').value;
		if (scoreToWin) {
			initScore = scoreToWin;
			console.log("the score to win is " + scoreToWin);
		} else {
			initScore = 100;
			console.log("the score to win is " + initScore);
		}

};

document.querySelector('.btn-new').addEventListener('click', init);
