let count = 0;
const unitsDigit = Array.from(document.getElementById('units').querySelector('.digit').querySelectorAll('span'));
const tensDigit = Array.from(document.getElementById('tens').querySelector('.digit').querySelectorAll('span'));
const hundredsDigit = Array.from(document.getElementById('hundreds').querySelector('.digit').querySelectorAll('span'));
const thousandsDigit = Array.from(document.getElementById('thousands').querySelector('.digit').querySelectorAll('span'));

let logRegistry = document.querySelector(".log_registry");
let container = document.querySelector(".counter-container");

let intervalId;
let isHolding = false;

let units = true;
let tens = false;
let hundreds = false;
let thousands = false;

let egg1 = 0;
let egg2 = 0;

document.addEventListener( "click", deleteLog ); //click event for deleting single log
function deleteLog(event){
    let element = event.target;
    let log = element.parentElement;
    if(element.classList.contains("deleteMe")){
        shrink(log);
        setTimeout(() => {
            log.remove();
        }, 200);
    }
}

let buttons = document.getElementsByClassName("digitBtn");
for (let i of buttons) {
    i.addEventListener('click', function() {
        this.classList.toggle("on");
        pulse(this);
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

function popUpPlus() {
    for (let n of buttons) {
        if (n.classList.contains("on")) {
            let popUp = n.parentElement.querySelector(".pop_up.plus");
            popUp.innerHTML = "+1";
            popUp.classList.toggle('fade-in');
            setTimeout(() => {
                popUp.classList.toggle('fade-in');
                popUp.innerHTML = "";
            }, 200);
        }
    }
}

function popUpMinus() {
    for (let n of buttons) {
        if (n.classList.contains("on")) {
            let popUp = n.parentElement.querySelector(".pop_up.minus");
            popUp.innerHTML = "-1";
            popUp.classList.toggle('fade-in');
            setTimeout(() => {
                popUp.classList.toggle('fade-in');
                popUp.innerHTML = "";
            }, 200);
        }
    }
}

//increase/decrease on hold
function changeCountOnHold(currentElement) {
    isHolding = true;
    if(currentElement.classList.contains("btn-plus")) {
        increase(currentElement);
        intervalId = setInterval(() => {
            increase(currentElement);
        }, 700);
    } else {
        decrease(currentElement);
        intervalId = setInterval(() => {
            decrease(currentElement);
        }, 700);
    }
}

function stopCount() {
    isHolding = false;
    clearInterval(intervalId);
}

function increase(currentElement) {
    if (isHolding) {
        if (count < 9999) {
            if(thousands){if (count < 8999) {count = count+1000} else {count = 9999; showCount(count, false); popUpPlus(); return;}}
            if(hundreds){if (count < 9899) {count = count+100} else {count = 9999; showCount(count, false); popUpPlus(); return;}}
            if(tens){if (count < 9989) {count = count+10} else {count = 9999; showCount(count, false); popUpPlus(); return;}}
            if(units){count++}
            showCount(count, false);
            pulse(currentElement);
            popUpPlus();
        } else {
            egg1++;
            if (egg1 === 10) {
                stopCount();
                let egg = `
            <div class="egg_modal">
                <div class="deleteMe">
                    <p class="material-symbols-outlined">close</p>
                </div>
                <img class="egg1" src="images/egg1.jpg" alt="the counter is over 9000">
            </div>`
                logRegistry.insertAdjacentHTML('afterbegin', egg);
            }
        }
    }
}

function decrease(currentElement) {
    if (isHolding) {
        if (count > 0) {
            if(thousands){if (count > 1000) {count = count-1000} else {count = 0; showCount(count, false); popUpMinus(); return;}}
            if(hundreds){if (count > 100) {count = count-100} else {count = 0; showCount(count, false); popUpMinus(); return;}}
            if(tens){if (count > 10) {count = count-10} else {count = 0; showCount(count, false); popUpMinus(); return;}}
            if(units){count--}
            showCount(count, false);
            pulse(currentElement);
            popUpMinus();
        } else {
            egg2++;
            if (egg2 === 10) {
                stopCount();
                let egg = `
            <div class="egg_modal">
                <div class="deleteMe">
                    <p class="material-symbols-outlined">close</p>
                </div>
                <img class="egg2" src="images/egg2.webp" alt="the counter is below 0">
            </div>`
                logRegistry.insertAdjacentHTML('afterbegin', egg);
            }
        }
    }
}

function pulse(currentElement) {
    currentElement.classList.add("pulse");
    setTimeout(() => {
        currentElement.classList.remove("pulse");
    }, 300);
}

function shrink(currentElement) {
    currentElement.classList.add("shrink");
}

function reset(currentElement) {
    count = 0;
    spinNumbers(unitsDigit, 0);
    spinNumbers(tensDigit, 0);
    spinNumbers(hundredsDigit, 0);
    spinNumbers(thousandsDigit, 0);
    pulse(currentElement);
}

function save(currentElement) {
    pulse(currentElement);
    showCount(count, true);
}

function spinNumbers(array, number) {
    array.forEach((span, index) => {
        if (index == number) {
            span.style.top = '0';
        } else {
            span.style.top = `${index - number}em`;
        }
    })
}

function showCount(count, save) {
    let myFunc = num => Number(num);
    let intArr = Array.from(count.toString(), myFunc)
    let tempUnits = intArr[intArr.length - 1].toString();
    let tempTens = intArr[intArr.length - 2] ? intArr[intArr.length - 2] : "0";
    let tempHundreds = intArr[intArr.length - 3] ? intArr[intArr.length - 3] : "0";
    let tempThousands = intArr[intArr.length - 4] ? intArr[intArr.length - 4] : "0";
    if (save) {
        let year = new Date().getFullYear();
        let month = new Date().toLocaleString('default', { month: 'long' });
        let day = new Date().getDate().toString().padStart(2, '0');
        let hours = new Date().getHours().toString().padStart(2, '0');
        let minutes = new Date().getMinutes().toString().padStart(2, '0');
        let seconds = new Date().getSeconds().toString().padStart(2, '0');
        let newLog = `
        <div class="log expand">
            <div class="display_log">
                <div class="digit_small units_log">${tempUnits}</div>
                <div class="digit_small tens_log">${tempTens}</div>
                <div class="digit_small hundreds_log">${tempHundreds}</div>
                <div class="digit_small thousands_log">${tempThousands}</div>
            </div>
            <div class="date_time">
                <div class="date">
                    <img src="images/calendar-small-page.png" alt="calendario">
                    <span>${day}</span>/<span>${month}</span>/<span>${year}</span>
                </div>
                <div class="time">
                    <img src="images/clock-circular-outline.png" alt="orologio">
                    <span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>
                </div>
            </div>
            <div class="deleteMe">
                <p class="material-symbols-outlined">close</p>
            </div>
        </div>`;
        logRegistry.insertAdjacentHTML('afterbegin', newLog);
        setTimeout(() => {
            document.querySelector(".expand").classList.remove("expand");
        }, 300);
    } else {
        // show numbers on display with spin effect
        spinNumbers(unitsDigit, tempUnits);
        spinNumbers(tensDigit, tempTens);
        spinNumbers(hundredsDigit, tempHundreds);
        spinNumbers(thousandsDigit, tempThousands);
    }
}