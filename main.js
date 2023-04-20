const select = document.querySelector('select');
const divKeys = document.querySelector('div.number.keys');
const form = document.querySelector('form');
const input = document.querySelector('input');
for (let i = 2; i <= 16; i++) {
    const option = document.createElement('option');
    option.innerHTML = `Base-${i}`
    option.value = i;
    select.append(option);
}

input.value = '';

select.value = 10; populateKeys(select.value);
select.addEventListener('change', () => populateKeys(select.value));

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

document.querySelectorAll('.operator button').forEach(button => {
    button.addEventListener('click', (e)=>{
        input.value += e.target.innerHTML;
    })
})

function populateKeys(base) {
    divKeys.innerHTML = '';
    for (let i = base - 1; i >= 0; i--) {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = i.toString(base).toUpperCase();
        divKeys.append(button);
        button.addEventListener('click', (e)=>{
            input.value += e.target.innerHTML;
        })
    }
}
