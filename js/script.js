'use strict';
(function () {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');

  let sidebarMenu = document.querySelector('.sidebar-menu');
  let sidebarBtn = document.querySelector('.sidebar-button');
  let sidebarBtnDescription = sidebarBtn.querySelector('span');
  let sidebarIsOpen = false;

  let widthRangeValue = document.querySelector('.shape-width__range-value');
  let quantityRangeValue = document.querySelector('.shape-quantity__range-value');

  let pixelWidth = document.querySelector('.shape-width__range');
  let pixelQuantityInLine = document.querySelector('.shape-quantity__range');
  let pixelTotalQuantity = Math.pow(Number(pixelQuantityInLine.value), 2);

  let widthOfCanvas = Number(pixelWidth.value) * Number(pixelQuantityInLine.value);
  let heightOfCanvas = Number(pixelWidth.value) * Number(pixelQuantityInLine.value);

  let backgroundColor = document.querySelector('.background-color__input');
  // let shapeColor = document.querySelector('.shape-color__input');

  // ширина границ
  let border = 1;
  // цвет границ
  let borderColor = 'rgba(0,0,0,.4)';
  // по умолчанию номера фигур не отображаются
  let isShown = false;
  let isSelected = false;

  /*
  let generateCanvas = document.querySelector('.generate-canvas');
  let showNumbers = document.querySelector('.show-numbers');
  let saveResult = document.querySelector('.save-result');
  let deleteResult = document.querySelector('.delete-result');
  let clearCanvas = document.querySelector('.clear-canvas');
  let deleteCanvas = document.querySelector('.delete-canvass');*/

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

  class Square {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = backgroundColor.value;
      this.isSelected = isSelected;
    }
  }

  let generateSquares = function () {
    let coordXofPixel = 0;
    let coordYofPixel = 0;

    let widthOfPixel = Number(pixelWidth.value);
    let heightOfPixel = Number(pixelWidth.value);

    canvas.setAttribute('width', widthOfCanvas);
    canvas.setAttribute('height', heightOfCanvas);

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
  };

  generateSquares();

  sidebarBtn.addEventListener('click', toggleSidebar);

  pixelWidth.addEventListener('input', function () {
    widthRangeValue.textContent = pixelWidth.value;
  });

  pixelQuantityInLine.addEventListener('input', function () {
    quantityRangeValue.textContent = pixelQuantityInLine.value;
  });
})();
