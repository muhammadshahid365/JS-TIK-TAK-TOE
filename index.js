const allBoxes = document.querySelectorAll('.box')
const rows = document.querySelectorAll('.row')
const columns = []
const player1 = 1
const player2 = 2
const marker1 = 'X'
const marker2 = 'O'
let result = 0
let currentPlayer = player1

const populateColumnsArray = () => {
  rows.forEach((row, i) => {
    if(i === 0){
      for(let j = 0; j < 3; j++){
        columns.push([row.querySelectorAll('.box')[j]])
      }
    }else {
      for(let j = 0; j < 3; j++){
        columns[j].push(row.querySelectorAll('.box')[j])
      }
    }
  })
}

populateColumnsArray()

const handleBoxClick = e => {
  if(result !== 0 || e.target.innerText !== '') return;

  markBox(e)
  checkWin()
  switchPlayer()
}

allBoxes.forEach(box => {
  box.addEventListener('click', handleBoxClick)
})

const markBox = e => {
  const marker = currentPlayer == player1 ? marker1 : marker2
  e.target.innerText = marker
}

const checkWin = () => {
  verticalCheck()
  horizontalCheck()
  diagonalCheck()
}

const horizontalCheck = () => {
  if(result !== 0) return;

  rows.forEach(row => {
    const boxes = row.querySelectorAll('.box')
    checkSingleWinCase(boxes)
  })
}

const verticalCheck = () => {
  if(result !== 0) return;

  columns.forEach(column => {
    checkSingleWinCase(column)
  })
}

const diagonalCheck = () => {
  if(result !== 0) return;

  const indexes = [[0, 4, 8], [2, 4, 6]]

  indexes.forEach((index) => {
    boxes = []
    index.forEach((i) => {
      boxes.push(allBoxes[i])
    })
    checkSingleWinCase(boxes)
  })
}

const switchPlayer = () => {
  if(currentPlayer === player1)
    currentPlayer = player2
  else
    currentPlayer = player1

  setCurrentPlayerText()
}

const checkSingleWinCase = boxes => {
  boxes = Array.from(boxes)
  if(boxes.every(box => box.innerText == marker1)){
    result = player1;
    highlightBoxes(boxes)
  }else if(boxes.every(box => box.innerText == marker2)){
    result = player2;
    highlightBoxes(boxes)
  }

  if(result !== 0){
    declareWinner()
  }
}

const highlightBoxes = boxes => {
  boxes.forEach(box => box.classList.add('winning-box'))
}

const declareWinner = () => {
  setWinner()
}

const setWinner = () => {
  if(result === 0){
    document.querySelector('.winner')
    .innerText = ''
  }else {
    document.querySelector('.winner')
    .innerText = 'player ' + result
  }
}

const setCurrentPlayerText = () => {
  document.querySelector('.current-player')
    .innerText = currentPlayer
}

const resetBoxes = () =>{
  allBoxes.forEach(box => {
    box.innerText = ''
    box.classList.remove('winning-box')
  })

}

const resetGame = e => {
  result = 0
  currentPlayer = player1
  resetBoxes()
  setWinner()
  setCurrentPlayerText()
  
}

document.querySelector('button.reset-btn')
  .addEventListener('click', resetGame)