const sqr1 = document.getElementById('preto');
const sqr2 = document.getElementById('color-1');
const sqr3 = document.getElementById('color-2');
const sqr4 = document.getElementById('color-3');
const colors = [sqr1, sqr2, sqr3, sqr4];

for (let index = 0; index < colors.length; index += 1) {
  const divColor = document.getElementsByClassName('color');

  if (index === 0) divColor[index].classList.add('selected');
}
const bkgf = 'colorPalette';
const board = 'pixelBoard';
const boardSize = 'boardSize';

const SaveBGR = () => {
  const backgrounds = {
    sqr1_1: sqr1.style.backgroundColor,
    sqr2_2: sqr2.style.backgroundColor,
    sqr3_3: sqr3.style.backgroundColor,
    sqr4_4: sqr4.style.backgroundColor,
  };

  localStorage.setItem(bkgf, JSON.stringify(backgrounds));
};
const recoveryPallete = () => {
  const dadosLocalStorage = JSON.parse(localStorage.getItem(bkgf));
  sqr2.style.backgroundColor = dadosLocalStorage.sqr2_2;
  sqr3.style.backgroundColor = dadosLocalStorage.sqr3_3;
  sqr4.style.backgroundColor = dadosLocalStorage.sqr4_4;
};
const saveBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  const memoryPixels = [];

  pixels.forEach((pixelDiv) => {
    const color = pixelDiv.style.backgroundColor;
    if (!color) {
      memoryPixels.push('white');
      return;
    }
    memoryPixels.push(color);
  });

  localStorage.setItem(board, JSON.stringify(memoryPixels));
};
const recoveryBoard = () => {
  const pixelsColors = JSON.parse(localStorage.getItem(board));
  if (!pixelsColors) return;

  return pixelsColors;
};

const saveBoardSize = (newSize) => {
  localStorage.setItem(boardSize, newSize);
};

const deleteSaveBoard = () => {
  localStorage.removeItem(board);
};
const createGrid = (pixels, color) => {
  const boardG = document.querySelector('#pixel-board');
  let size = pixels;
  if (size < 5) size = 5;
  if (size > 50) size = 50;
  boardG.innerHTML = '';
  boardG.style.gridTemplateColumns = `repeat(${size}, auto)`;
  for (let index = 0; index < (size * size); index += 1) {
    const pixelDiv = document.createElement('div');
    pixelDiv.id = index;
    pixelDiv.classList.add('pixel');

    if (color) pixelDiv.style.backgroundColor = color[index];
    boardG.appendChild(pixelDiv);
  }
};

const generateColor = () => {
  const characters = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += characters[Math.floor(Math.random() * characters.length)];
  }

  return color;
};
const colorSelect = () => {
  const divOfColors = document.querySelectorAll('.color');

  divOfColors.forEach((divColor) => {
    divColor.addEventListener('click', (event) => {
      const selected = document.querySelector('.selected');

      if (selected.classList.contains('selected')) selected.classList.remove('selected');

      event.target.classList.add('selected');
    });
  });
};
const paint = () => {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((pixelDiv) => {
    pixelDiv.addEventListener('click', ({ target }) => {
      const pixel = target;
      const selected = document.querySelector('.selected');

      if (!selected) return;
      pixel.style.backgroundColor = selected.style.backgroundColor;
      saveBoard();
    });
  });
};
const clear = () => {
  const clearBoardBtn = document.querySelector('#clear-board');

  clearBoardBtn.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach((pixelDiv) => {
      const pixel = pixelDiv;
      pixel.style.backgroundColor = 'white';
    });
    saveBoard();
  });
};
const aleatoryColors = () => {
  const btn = document.getElementById('button-random-color');
  btn.addEventListener('click', () => {
    sqr2.style.backgroundColor = generateColor();
    sqr3.style.backgroundColor = generateColor();
    sqr4.style.backgroundColor = generateColor();
    SaveBGR();
  });
  if (localStorage.getItem(bkgf)) {
    recoveryPallete();
  }
  if (localStorage.getItem(board)) recoveryBoard();
};

const recoveryBoardSize = () => {
  const boardSizeA = JSON.parse(localStorage.getItem('boardSize'));
  if (!boardSizeA) return 5;
  return boardSizeA;
};

const changeSizeBoard = () => {
  const generateBoardBtn = document.querySelector('#generate-board');

  generateBoardBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const boardSizeInput = document.querySelector('#board-size');

    if (boardSizeInput.value === '') {
      alert('Board inválido!');
      return;
    }
    deleteSaveBoard();
    createGrid(parseInt(boardSizeInput.value, 10));
    paint();
    saveBoard();
    saveBoardSize(parseInt(boardSizeInput.value, 10));
  });
};

window.onload = () => {
  sqr1.style.backgroundColor = 'black';
  sqr2.style.backgroundColor = 'green';
  sqr3.style.backgroundColor = 'grey';
  sqr4.style.backgroundColor = 'burlywood';
  aleatoryColors();
  createGrid(recoveryBoardSize(), recoveryBoard());
  colorSelect();
  paint();
  clear();
  changeSizeBoard();
};
