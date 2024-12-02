let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        document.querySelector('.auto-play-button').innerHTML = 'Stop Playing'
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
})

document.querySelector('.auto-play-button').addEventListener('click', () => {
    autoPlay();
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        resetScore();
    }
})

document.querySelector('.reset-button').addEventListener('click', () => {
    let result = document.querySelector('.confirmation');
    const html = `
    <p style="display: inline-block">Are you sure you want to reset score?</p>
    <button class="confirmation-button yes-button">Yes</button>
    <button class="confirmation-button no-button">No</button>
    `;
    result.innerHTML += html;
    document.querySelector('.yes-button').addEventListener('click', () => {
        result.innerHTML = '';
        resetScore();
    })
    document.querySelector('.no-button').addEventListener('click', () => {
        result.innerHTML = '';
    })
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
})

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }


    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You 
    <img class="move-image" src="rock-paper-scissors-icons/${playerMove}-emoji.png">
    <img class="move-image" src="rock-paper-scissors-icons/${computerMove}-emoji.png"> 
    Computer`;

    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}
