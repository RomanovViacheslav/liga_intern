// Задача 1
// Сделать функцию, которая будет позволять вызывать себя последовательно для
// суммирования и/или при выводе и/или математической операции вернет конечный
// результат fucn(2)(3)(5) = 10

function sum(x) {
  let result = x;

  function add(y) {
    result += y;
    return add;
  }

  add.valueOf = function () {
    return result;
  };

  return add;
}

console.log(sum(2)(3)(5).valueOf()); // 10

// Вариант 2

const calc = function (a) {
  return function (b) {
    return b ? calc(a + b) : a;
  };
};

console.log(calc(2)(3)(5)()); // 10

// Задача 2
// *Написать функцию которая выполнит быструю сортировку массива чисел

function sort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    const centre = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < centre) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...sort(left), centre, ...sort(right)];
  }
}

console.log(sort([1, 39, 2, 6, 3, 7, 8]));

// Задача 3
// Написать функцию которая создаст очереди в следующем порядке:
// 1. Задача
// 1. микрозадача
// 2. Рендер задача (например изменение стилей)
// 2. Задача
// 1. микрозадача
// 2. микрозадача
// 3. Задача
// 1. микрозадача
// 2. Рендер задача (например изменение содержание элемента)

function createButton() {
  const button = document.createElement("button");
  button.textContent = "Click me";
  document.body.appendChild(button);
  console.log("Рендер задача 1");
}

function changeButtonColor() {
  const button = document.querySelector("button");
  button.style.backgroundColor = "red";
  console.log("Рендер задача 2");
}

function getQueue() {
  setTimeout(function () {
    console.log("Задача 1");

    Promise.resolve().then(function () {
      console.log("Микрозадача 1");

      requestAnimationFrame(function () {
        createButton();
        task2();
        task3();
      });
    });
  });

  function task2() {
    setTimeout(function () {
      console.log("Задача 2");

      Promise.resolve().then(function () {
        console.log("Микрозадача 2");
      });

      Promise.resolve().then(function () {
        console.log("Микрозадача 3");
      });
    });
  }

  function task3() {
    setTimeout(function () {
      console.log("Задача 3");

      Promise.resolve().then(function () {
        console.log("Микрозадача 4");
        requestAnimationFrame(function () {
          changeButtonColor();
        });
      });
    });
  }
}

getQueue();
