let display = document.getElementById('display');

let buttons = Array.from(document.getElementsByClassName('btn'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        switch(e.target.innerText){
            case 'C':
                document.getElementById("amount-one").value = 0;
                break;
            case '=':
                try{
                    calculate();
                } catch {
                    display.innerText = "Error"
                }
                break;
            case '':
                if (document.getElementById("amount-one").value){
                    document.getElementById("amount-one").value = document.getElementById("amount-one").value.slice(0, -1);
                }
                break;
            case '.':
                if (document.getElementById("amount-one").value){
                   document.getElementById("amount-one").value = document.getElementById("amount-one") + '.';
                }
                break;
            default:
                document.getElementById("amount-one").value = document.getElementById("amount-one").value + e.target.innerText;
        }
        calculate();
    });
});

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the dome
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/defe0c436ea55683ecb70476/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.conversion_rates[currency_two];

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();