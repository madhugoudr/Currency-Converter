let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultbutton = document.querySelector(".result");
let selects = document.querySelectorAll(".options select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let input1 = inputs[0];
let input2 = inputs[1];

let rates = {};

let requestURL = "https://api.exchangerate.host/latest?base=USD";

fetchRates();

async function fetchRates(){
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populateOptions();
}

function populateOptions(){
    let val =  "" ;
    Object.keys(rates).forEach(code=>{
        let str = `<Option value ="${code}" >${code}</Option>`
        val += str;
    })
    selects.forEach((s) => (s.innerHTML= val));
}

function convert(val , fromcurr , tocuur){
    let v = (val/rates[fromcurr])* rates[tocuur];
    let v1 = v.toFixed(3);
    return v1 == 0.0? v.toFixed(5) :v1;
}

function displayRate(){
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1 , v1 , v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML  = `${val} ${v2}`;
}

resultbutton.addEventListener("click",()=>{
    let fromcurr = sel1.value;
    let fromval = parseFloat(input1.value);
    let tocuur =sel2.value;

    if(isNaN(fromval)){
        alert("Please enter a number");
    } else{
        let cVal = convert(fromval,fromcurr,tocuur);
        input2.value = cVal;
    }
});

selects.forEach(s=>s.addEventListener("change" , displayRate));

document.querySelector(".swap").addEventListener("click",()=>{
    let in1 = input1.value;
    let in2 = input2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    input2.value = in1;
    input1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate();
})



























