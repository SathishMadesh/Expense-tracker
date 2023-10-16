const balance = document.querySelector("#balance"); 
const income = document.querySelector("#inc-amt");     //income box
const expense = document.querySelector("#exp-amt");    //expense box
const description = document.querySelector("#desc"); 
const amount = document.querySelector("#amount"); 
const form = document.querySelector("#form");       //for button
const trans = document.querySelector("#trans");     //list

/*
const dummyData = [
     { id: 1, description: "Salary", amount: 35000},
     { id: 2, description: "Food", amount: -250},
     { id: 3, description: "Petrol", amount: -1000},
     { id: 4, description: "Rent", amount: -7000},
];

let transaction = dummyData;   //creating variable for list as transaction insted dummydata
*/
const localStorageTrans = JSON.parse(localStorage.getItem("trans"));

let transaction = localStorage.getItem("trans") !== null ?
 localStorageTrans : [] ;

function loadTransactionDetails(transaction){
    const sign = transaction.amount > 0 ? "+" : "-" ;
    const item = document.createElement("li");
    item.classList.add(transaction.amount > 0 ? "inc" : "exp");
    item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="del-btn" onclick="removeTrans(${transaction.id})">X</button> </li>
     `;

    trans.appendChild(item);
}

function removeTrans(id) {
    if(confirm("Are you shure to delete Transaction?")) {
        transaction = transaction.filter((transaction)=>
        transaction.id != id);
        updateAmount();
        config();
        updateLocalStorage ();
    } else {
        return;
    }
}

function updateAmount(){
    const amounts = transaction.map((transaction)=>
    transaction.amount);
    const total = amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
    balance.innerHTML = `₹ ${total}`;

    const totalIncome = amounts.filter((item) => item > 0 ).reduce
    ((acc,item) =>(acc += item),0).toFixed(2);
    income.innerHTML = `₹ ${totalIncome}`;

    const totalExpense = amounts.filter((item) => item < 0 ).reduce
    ((acc,item) =>(acc += item),0).toFixed(2);
    expense.innerHTML = `₹ ${-totalExpense}`;
}

function config() {
    trans.innerHTML= "";
    transaction.forEach(loadTransactionDetails);
    updateAmount();
}

function addTransaction(e) {
    e.preventDefault();
    if (description.value.trim()=="" || amount.value.trim() == "") {
        alert("Please enter the Amount and Discription")
    } else {
        const transactions= {
            id: uniqueId(),
            description: description.value,
            amount: +amount.value,
        };
        transaction.push(transactions);
        loadTransactionDetails(transactions);
        description.value = "";
        amount.value = "";
        updateAmount();
        updateLocalStorage ();
    }

}

function updateLocalStorage () {
    localStorage.setItem("trans", JSON.stringify(transaction));
}

function uniqueId () {
    return Math.floor(Math.random() * 10000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load",function (){
    config();
});