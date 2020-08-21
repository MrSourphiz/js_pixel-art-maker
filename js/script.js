'use strict';
(function () {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');

  let sidebarMenu = document.querySelector('.sidebar-menu');
  let openSidebarBtn = document.querySelector('.open-btn');
  let closeSidebarBtn = document.querySelector('.close-btn');

  let widthRangeValue = document.querySelector('.shape-width__range-value');
  let quantityRangeValue = document.querySelector('.shape-quantity__range-value');

  let pixelWidth = document.querySelector('.shape-width__range');
  let pixelQuantityInLine = document.querySelector('.shape-quantity__range');
  let pixelTotalQuantity = Math.pow(Number(pixelQuantityInLine.value), 2);

  let backgroundColor = document.querySelector('.background-color__input');
  // let shapeColor = document.querySelector('.shape-color__input');

  // ширина границ
  let border = 1;
  // цвет границ
  let borderColor = 'rgba(0,0,0,.4)';
  // по умолчанию номера фигур не отображаются
  let isShown = false;
  let isSelected = false;

  /* let generateCanvas = document.querySelector('.generate-canvas');
  let showNumbers = document.querySelector('.show-numbers');
  let saveResult = document.querySelector('.save-result');
  let deleteResult = document.querySelector('.delete-result');
  let clearCanvas = document.querySelector('.clear-canvas');
  let deleteCanvas = document.querySelector('.delete-canvass');*/

  let openSidebar = function () {
    sidebarMenu.style.marginLeft = 0;
    openSidebarBtn.classList.add('visually-hidden');
  };

  let closeSidebar = function () {
    sidebarMenu.style.marginLeft = '-280px';
    openSidebarBtn.classList.remove('visually-hidden');
  };

  let getDimensionOfShape = function () {
    let width = Number(pixelWidth.value) * Number(pixelQuantityInLine.value);
    let height = width;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
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

  let generateSquares = function (x, y, width, height) {
    let arrOfSquares = [];
    for (let i = 0; i < pixelTotalQuantity; i++) {
      let square = new Square(x, y);
      x += width;
      if (x === width) {
        y += height;
        x = 0;
      }
      arrOfSquares.push(square);
    }

    drawSquares(arrOfSquares, width, height);
  };

  let squares = function () {
    let x = 0;
    let y = 0;

    let width = Number(pixelWidth.value);
    let height = Number(pixelWidth.value);

    generateSquares(x, y, width, height);
  };

  getDimensionOfShape();
  squares();

  openSidebarBtn.addEventListener('click', openSidebar);
  closeSidebarBtn.addEventListener('click', closeSidebar);

  pixelWidth.addEventListener('input', function () {
    widthRangeValue.textContent = pixelWidth.value;
  });

  pixelQuantityInLine.addEventListener('input', function () {
    quantityRangeValue.textContent = pixelQuantityInLine.value;
  });
})();
