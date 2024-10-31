const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        timerID: null,
        enemyVelocity: 1000,
        hitPosition: 0,
        score: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)
    }
}

function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId, )
        alert(`Game over! o seu resultado foi ${state.values.score}`)
        location.reload(true)
    }
}

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a')
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy')
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.id === state.values.hitPosition) {
                state.values.score++
                state.view.score.textContent = state.values.score
                state.values.hitPosition = null
                playSound()
            }
        })
    })
}

function init() {
    addListenerHitBox()
}

init()