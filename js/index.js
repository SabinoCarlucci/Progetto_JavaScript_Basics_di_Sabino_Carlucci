let count = 0;
const unitsDigit = Array.from(document.getElementById('units').querySelector('.digit').querySelectorAll('span'));
const tensDigit = Array.from(document.getElementById('tens').querySelector('.digit').querySelectorAll('span'));
const hundredsDigit = Array.from(document.getElementById('hundreds').querySelector('.digit').querySelectorAll('span'));
const thousandsDigit = Array.from(document.getElementById('thousands').querySelector('.digit').querySelectorAll('span'));

let logRegistry = document.querySelector(".log_registry");

let units = true;
let tens = false;
let hundreds = false;
let thousands = false;

document.addEventListener( "click", deleteLog ); //click event for deleting single log
function deleteLog(event){
    let element = event.target;
    if(element.tagName == 'P'&& element.parentElement.classList.contains("deleteMe") && element.classList.contains("material-symbols-outlined")){
        element.parentElement.parentElement.remove();
    }
}

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
    if (count < 9999) {
        if(thousands){if (count < 8999) {count = count+1000} else {count = 9999; showCount(count, false); return;}}
        if(hundreds){if (count < 9899) {count = count+100} else {count = 9999; showCount(count, false); return;}}
        if(tens){if (count < 9989) {count = count+10} else {count = 9999; showCount(count, false); return;}}
        if(units){count++;}
        showCount(count, false);
    }//fare controllo per evitare di andare oltre 9999 e mettere easter egg come per il meno
}

function decrease() {
    if (count > 0) {
        if(thousands){if (count > 1000) {count = count-1000} else {count = 0; showCount(count, false); return;}}
        if(hundreds){if (count > 100) {count = count-100} else {count = 0; showCount(count, false); return;}}
        if(tens){if (count > 10) {count = count-10} else {count = 0; showCount(count, false); return;}}
        if(units){count--}
        showCount(count, false)
    } //mettere else con messaggio di errore
}

//era questa per i numeri colorati +1/-1? cosa ci faccio adesso?
function effect() {
    const effect = document.querySelector(".plus_one");
    effect.
    effect.classList.add('fade-in');
    setTimeout(() => {
        effect.classList.remove('fade-in');
    }, 1000);
}

function reset() {
    count = 0;
    spinNumbers(unitsDigit, 0);
    spinNumbers(tensDigit, 0);
    spinNumbers(hundredsDigit, 0);
    spinNumbers(thousandsDigit, 0);
}

//questa serve ancora? forse dovrei scrivere qui il codice per salvare, e richiamarla in showcount()
function save() {
    console.log(count);
    showCount(count, true); //riscrivi con event listener in base a quale tasto premi, se salva o no
}

// a che serve questa?
function twoDigits(number) {
    if (number < 10) {
        number = "0" + number;
        return number;
    }
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
        <div class="log">
            <div class="display_log">
                <div class="digit_small units_log">${tempUnits}</div>
                <div class="digit_small tens_log">${tempTens}</div>
                <div class="digit_small hundreds_log">${tempHundreds}</div>
                <div class="digit_small thousands_log">${tempThousands}</div>
            </div>
            <div class="date_time">
                <div class="date">
                    <!--<img src="images/calendar-small-page.png" alt="calendario">-->
                    <span>${day}</span>/<span>${month}</span>/<span>${year}</span>
                </div>
                <div class="time">
                    <!--<img src="images/clock-circular-outline.png" alt="orologio">-->
                    <span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>
                </div>
            </div>
            <div class="deleteMe">
                <p class="material-symbols-outlined">close</p>
            </div>
        </div>`;
        logRegistry.insertAdjacentHTML('afterbegin', newLog) ;
    } else {
        // show numbers on display with spin effect
        spinNumbers(unitsDigit, tempUnits);
        spinNumbers(tensDigit, tempTens);
        spinNumbers(hundredsDigit, tempHundreds);
        spinNumbers(thousandsDigit, tempThousands);
    }
}