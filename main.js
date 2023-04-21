const select = document.querySelector('select');
const number_keys = document.querySelector('.number');
const input = document.querySelector('input');
const output = document.querySelector('output');

// generate base selection options
for (let i = 2; i <= 16; i++) {
    const option = document.createElement('option');
    option.innerHTML = `Base-${i}`
    option.value = i;
    select.append(option);
}

// generate number buttons
for (let i = 15; i >= 0; i--) {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = i.toString(16).toUpperCase();
    number_keys.append(button);
    button.style.display = 'none';
}

select.value = 10; showNumberKeys(10);
let operating_base = 10;
clearCalculation();

select.addEventListener('change', () => {
    showNumberKeys(select.value);
    output.textContent = baseXtoY(output.textContent, operating_base, select.value);
    operating_base = select.value;
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateNow();
})

document.querySelectorAll('.keygroup button[type=button]').forEach(button => {
    button.addEventListener('click', appendToInput);
})

document.querySelectorAll('.clear button')[1].addEventListener('click', clearCalculation);
document.querySelectorAll('.clear button')[0].addEventListener('click', clearEntry);

function showNumberKeys(base) {
    number_keys.childNodes.forEach(button => button.style.display = 'block');
    for (let i = 0; i < 16 - base; i++) {
        number_keys.childNodes[i].style.display = 'none';
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
        output.textContent = baseXtoY(eval(input.value), operating_base, select.value);
    } catch (error) {
        output.textContent = 'Error';
    }
}

function appendToInput() {
    input.value += this.innerHTML;
}

function baseXtoY(n, x, y) {
    return parseInt(n.toString(), x).toString(y);
}