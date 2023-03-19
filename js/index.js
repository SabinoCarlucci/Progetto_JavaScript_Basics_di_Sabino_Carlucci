let count = 0;
let unitsDigit = document.getElementById("units").getElementsByClassName("digit")[0];
let tensDigit = document.getElementById("tens").getElementsByClassName("digit")[0];
let hundredsDigit = document.getElementById("hundreds").getElementsByClassName("digit")[0];
let thousandsDigit = document.getElementById("thousands").getElementsByClassName("digit")[0];

let units = true;
let tens = false;
let hundreds = false;
let thousands = false;

let buttons = document.getElementsByClassName("digitBtn");
for (let i of buttons) {
    i.addEventListener('click', function() {
        this.classList.toggle("on");
        let id = this.parentElement.id;
        switch (id) {
            case "units":
                units = !units;
                return units;
            case "tens":
                tens = !tens;
                return tens;
            case "hundreds":
                hundreds = !hundreds;
                return hundreds;
            case "thousands":
                thousands = !thousands;
                return thousands;
            default:
                console.log("error: switch digitBtn")
                break;
        }
    })
}

function increase() {
    //fare controllo per evitare di andare oltre 9999 e mettere easter egg come per il meno
    if(units){count++}
    if(tens){count=count+10}
    if(hundreds){count=count+100}
    if(thousands){count=count+1000}
    showCount(count);
}

function decrease() {
    if (count > 0) {
        if(thousands){if (count > 1000) {count = count-1000} else {count = 0; showCount(count); return;}}
        if(hundreds){if (count > 100) {count = count-100} else {count = 0; showCount(count); return;}}
        if(tens){if (count > 10) {count = count-10} else {count = 0; showCount(count); return;}}
        if(units){count--}
        showCount(count)
    } //mettere else con messaggio di errore
}

function reset() {
    count = 0;
    unitsDigit.innerText = "0";
    tensDigit.innerText = "0";
    hundredsDigit.innerText = "0";
    thousandsDigit.innerText = "0";
}

function showCount(count) {
    let myFunc = num => Number(num);
    let intArr = Array.from(count.toString(), myFunc)
    unitsDigit.innerText = intArr[intArr.length - 1].toString();
    tensDigit.innerText = intArr[intArr.length - 2] ? intArr[intArr.length - 2] : "0";
    hundredsDigit.innerText = intArr[intArr.length - 3] ? intArr[intArr.length - 3] : "0";
    thousandsDigit.innerText = intArr[intArr.length - 4] ? intArr[intArr.length - 4] : "0";
}