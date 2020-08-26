'use strict';
(function () {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let widthOfCanvas;
  let heightOfCanvas;

  let sidebarMenu = document.querySelector('.sidebar-menu');
  let sidebarBtn = document.querySelector('.sidebar-button');
  let sidebarBtnDescription = sidebarBtn.querySelector('span');
  let sidebarIsOpen = false;

  let widthRangeValue = document.querySelector('.shape-width__range-value');
  let quantityRangeValue = document.querySelector('.shape-quantity__range-value');

  let pixelWidth = document.querySelector('.shape-width__range');
  let pixelQuantityInLine = document.querySelector('.shape-quantity__range');
  let pixelTotalQuantity = Math.pow(Number(pixelQuantityInLine.value), 2);
  let widthOfPixel;
  let heightOfPixel;

  let backgroundColor = document.querySelector('.background-color__input');
  let shapeColor = document.querySelector('.shape-color__input');

  // ширина границ
  let border = 1;
  // цвет границ
  let borderColor = 'rgba(0,0,0,.4)';
  // по умолчанию номера фигур не отображаются
  let isShown = false;
  let isSelected = false;

  let resultPopup = document.querySelector('.result-popup');
  let resultPopupBlock = resultPopup.querySelector('.result-popup__wrapper');
  let closePopupBtn = resultPopup.querySelector('.result-popup__btn');

  let generateCanvasBtn = document.querySelector('.generate-canvas');
  let saveResultBtn = document.querySelector('.save-result');
  let deleteResultBtn = document.querySelector('.delete-result');
  let clearCanvasBtn = document.querySelector('.clear-canvas');
  let deleteCanvasBtn = document.querySelector('.delete-canvas');

  let toggleSidebar = function () {
    if (!sidebarIsOpen) {
      sidebarIsOpen = !sidebarIsOpen;
      sidebarMenu.style.marginLeft = 0;
      sidebarBtn.classList.remove('open-button');
      sidebarBtn.classList.add('close-button');
      sidebarBtnDescription.textContent = 'Закрыть меню';
    } else {
      sidebarIsOpen = !sidebarIsOpen;
      sidebarMenu.style.marginLeft = '-280px';
      sidebarBtn.classList.remove('close-button');
      sidebarBtn.classList.add('open-button');
      sidebarBtnDescription.textContent = 'Открыть меню';
    }
  };

  let getDimensions = function () {
    widthOfCanvas = Number(pixelWidth.value) * Number(pixelQuantityInLine.value);
    heightOfCanvas = Number(pixelWidth.value) * Number(pixelQuantityInLine.value);
    widthOfPixel = Number(pixelWidth.value);
    heightOfPixel = Number(pixelWidth.value);

    canvas.setAttribute('width', widthOfCanvas);
    canvas.setAttribute('height', heightOfCanvas);
  };

  class Square {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = backgroundColor.value;
      this.isSelected = isSelected;
    }
  }

  let drawSquares = function (arrayOfSquares, width, height) {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < arrayOfSquares.length; i++) {
      let square = arrayOfSquares[i];

      ctx.beginPath();
      ctx.rect(square.x, square.y, width, height);
      ctx.fillStyle = square.color;
      ctx.lineWidth = border;
      ctx.strokeStyle = borderColor;
      ctx.fill();
      ctx.stroke();

      if (isShown) {
        ctx.beginPath();
        ctx.font = '8pt Calibri';
        ctx.fillStyle = 'rgba(0,0,0,.6)';
        ctx.fillText(i + 1, square.x, (square.y + 8));
      }
    }
  };

  let selectPixel = function (evt, arrOfSquares) {
    let clickX = evt.pageX - canvas.offsetLeft;
    let clickY = evt.pageY - canvas.offsetTop;

    for (let i = 0; i < arrOfSquares.length; i++) {
      let square = arrOfSquares[i];

      if (clickX > square.x && clickX < square.x + widthOfPixel && clickY > square.y && clickY < square.y + heightOfPixel) {
        if (!square.isSelected) {
          square.isSelected = !square.isSelected;
          square.color = shapeColor.value;
        } else {
          square.isSelected = !square.isSelected;
          square.color = backgroundColor.value;
        }
        drawSquares(arrOfSquares, widthOfPixel, heightOfPixel);
      }
    }
  };

  let generateSquares = function () {
    let coordXofPixel = 0;
    let coordYofPixel = 0;
    let arrOfSquares = [];
    for (let i = 0; i < pixelTotalQuantity; i++) {
      let square = new Square(coordXofPixel, coordYofPixel);
      coordXofPixel += widthOfPixel;
      if (coordXofPixel === widthOfCanvas) {
        coordYofPixel += heightOfPixel;
        coordXofPixel = 0;
      }
      arrOfSquares.push(square);
    }

    drawSquares(arrOfSquares, widthOfPixel, heightOfPixel);

    canvas.addEventListener('click', function (evt) {
      selectPixel(evt, arrOfSquares);
    });
  };

  let drawingCanvas = function () {
    getDimensions();
    generateSquares();
  };

  let createCanvas = function () {
    ctx.clearRect(0, 0, widthOfCanvas, heightOfCanvas);
    drawingCanvas();
    canvas.style.display = 'block';
  };

  let deleteCanvas = function () {
    ctx.clearRect(0, 0, widthOfCanvas, heightOfCanvas);
    canvas.style.display = 'none';
  };

  let clearCanvas = function () {
    ctx.clearRect(0, 0, widthOfCanvas, heightOfCanvas);
    generateSquares();
  };

  let saveResult = function () {
    let image = document.createElement('img');
    image.setAttribute('src', canvas.toDataURL());
    resultPopupBlock.appendChild(image);
    resultPopup.classList.remove('visually-hidden');
  };

  let deleteResult = function () {
    let resultImg = resultPopup.querySelector('img');
    resultPopupBlock.removeChild(resultImg);
    resultPopup.classList.add('visually-hidden');
  };

  drawingCanvas();

  sidebarBtn.addEventListener('click', toggleSidebar);

  pixelWidth.addEventListener('input', function () {
    widthRangeValue.textContent = pixelWidth.value;
  });

  pixelQuantityInLine.addEventListener('input', function () {
    quantityRangeValue.textContent = pixelQuantityInLine.value;
  });

  generateCanvasBtn.addEventListener('click', createCanvas);
  clearCanvasBtn.addEventListener('click', clearCanvas);
  deleteCanvasBtn.addEventListener('click', deleteCanvas);
  saveResultBtn.addEventListener('click', saveResult);
  deleteResultBtn.addEventListener('click', deleteResult);
  closePopupBtn.addEventListener('click', deleteResult);
})();
