const select = document.querySelector('select');
const number_keys = document.querySelector('div.number.keys');
const form = document.querySelector('form');
const input = document.querySelector('input');
const output = document.querySelector('output');
generateNumberKeys();
const calc_keys = document.querySelectorAll('.keygroup button[type=button]');
const [ce, clr] = document.querySelectorAll('.clear button');

// generate base selection options
for (let i = 2; i <= 16; i++) {
    const option = document.createElement('option');
    option.innerHTML = `Base-${i}`
    option.value = i;
    select.append(option);
}

select.value = 10; showNumberKeys(10);
clearCalculation();

select.addEventListener('change', () => {
    showNumberKeys(select.value);
    // todo - convert result to new base
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateNow();
})

calc_keys.forEach(button => {
    button.addEventListener('click', appendToInput);
})

clr.addEventListener('click', clearCalculation);
ce.addEventListener('click', clearEntry);

function showNumberKeys(base) {
    number_keys.childNodes.forEach(button => button.style.display = 'block');
    for (let i = 0; i < 16 - base; i++) {
        number_keys.childNodes[i].style.display = 'none';
    }
}

/**Generate 16 number keys in reverse (15,14,13,...,0) */
function generateNumberKeys() {
    for (let i = 15; i >= 0; i--) {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = i.toString(16).toUpperCase();
        number_keys.append(button);
        button.style.display = 'none';
    }
}

function clearCalculation() {
    input.value = '';
    output.value = 0;
}

function clearEntry() {
    const text = input.value;
    input.value = text.slice(0, text.length - 1);
}

function calculateNow() {
    try {
        output.textContent = eval(input.value);
    } catch (error) {
        output.textContent = 'Error';
    }
}

function appendToInput() {
    input.value += this.innerHTML;
}