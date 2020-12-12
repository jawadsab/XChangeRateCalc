const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("desc");
const swap = document.getElementById("swap-btn")

const fetchSymbolsURL = `https://api.exchangerate-api.com/v4/latest/USD`;
// fetch symbols
const fetchSymbols = async () => {
    try {
        const response = await fetch(fetchSymbolsURL);
        const data = await response.json();
        const {rates} = data;
        // create options of symbols
       for(const symbol in rates) {
           const option1 = document.createElement("OPTION");
           const option2 = document.createElement("OPTION");
           option1.setAttribute("value",symbol);
           option2.setAttribute("value",symbol);
            var t1 = document.createTextNode(symbol);
            option1.appendChild(t1);
            if(symbol === "USD") {
                option1.setAttribute("selected","selected");
            }
            currencyEl_one.appendChild(option1);
            var t2 = document.createTextNode(symbol);
            option2.appendChild(t2);
            if(symbol === "EUR") {
                option2.setAttribute("selected","selected");
            }
            currencyEl_two.appendChild(option2);
       }
      
       calculate();
    } catch (error) {
        console.log("Error");
    }
}
// calculate xchange rate
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    const fetchRateURL = `https://api.exchangerate-api.com/v4/latest/${currency_one}`;
    fetch(fetchRateURL)
    .then(res => res.json())
    .then(data => {
       const rate = data.rates[currency_two];
       rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
       amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

// Event Listener
currencyEl_one.addEventListener("change",calculate);
amount_one.addEventListener("input",calculate);
currencyEl_two.addEventListener("change",calculate);
amount_two.addEventListener("input",calculate);

// swap btn event
swap.addEventListener("click",() => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    caclulate();
})


fetchSymbols();