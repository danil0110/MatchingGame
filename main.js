let board = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let chooses = [];
let matchCount = 0;
let restartButton = document.querySelector('.restart');

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

const render = () => {
    let result = '';
    restartButton.classList.remove('visible');
    for (let i = 0; i < board.length; i++) {
        result += `
        <div class="card closed">
            <div class="card-front closed">${board[i]}</div>
        </div>`;
    }
    document.querySelector('.board').innerHTML = result;
}

const startGame = () => {
    shuffle(board);
    render();
    matchCount = 0;
    let card = document.querySelector('.board');
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('closed')) {
            openCard(e.target);
        }
    });
}

window.onload = startGame();

const isMatched = (card1, card2) => {
    let value1 = card1.querySelector('*').innerHTML;
    let value2 = card2.querySelector('*').innerHTML;
    if (value1 === value2) {
        return true;
    }
    else {
        return false;
    }
}

const isEnd = () => {
    if (matchCount === board.length / 2) {
        return true;
    }
    else {
        return false;
    }
}

const endGame = () => {
    restartButton.classList.add('visible');
}

const openCard = (card) => {
    if (chooses.length < 2) {
        chooses.push(card);
        let front = card.querySelector('*');
        card.classList.remove('closed');
        front.classList.remove('closed');
        card.classList.add('opened');
        front.classList.add('opened');
    }

    setTimeout(() => {
        if (chooses.length === 2) {
            if (!isMatched(chooses[0], chooses[1])) {
                closeChosenCards();
                chooses = [];
            }
            else {
                matchCount++;
                if (isEnd()) {
                    endGame();
                }
            }
            chooses = [];
        }
    }, 1500)
}

const closeChosenCards = () => {
    for (let i = 0; i < chooses.length; i++) {
        let card = chooses[i];
        let front = card.querySelector('*');
        card.classList.remove('opened');
        front.classList.remove('opened');
        card.classList.add('closed');
        front.classList.add('closed');
    }
}