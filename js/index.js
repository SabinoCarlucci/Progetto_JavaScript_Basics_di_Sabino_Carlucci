
let count = 0;
let units = document.getElementById("units").getElementsByClassName("digit")[0];
let tens = document.getElementById("tens").getElementsByClassName("digit")[0];
let hundreds = document.getElementById("hundreds").getElementsByClassName("digit")[0];
let thousands = document.getElementById("thousands").getElementsByClassName("digit")[0];

function increase() {
    count++;
    showCount(count);
}

function decrease() {
    if (count > 0) {
        count--;
        showCount(count);
    }
}

function reset() {
    count = 0;
    units.innerText = "0";
    tens.innerText = "0";
    hundreds.innerText = "0";
    thousands.innerText = "0";
}

function showCount(count) {
    let myFunc = num => Number(num);
    let intArr = Array.from(count.toString(), myFunc)
    units.innerText = intArr[intArr.length - 1].toString();
    tens.innerText = intArr[intArr.length - 2] ? intArr[intArr.length - 2] : "0";
    hundreds.innerText = intArr[intArr.length - 3] ? intArr[intArr.length - 3] : "0";
    thousands.innerText = intArr[intArr.length - 4] ? intArr[intArr.length - 4] : "0";
}