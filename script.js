let curr_bal = 0;
let inc = 0;
let exp = 0;
let track = [];

window.onload = function(){
    if(localStorage.length > 0){
        getData()
        display()
        for(let i=0;i<track.length;i++){
            tranCreate(track[i][0],track[i][1]);
        }
    }
}

function tranCreate(text, amount){
    const parentEle = document.getElementById("list");
    const ele = document.createElement("li");
    if(amount[0] == "-"){
        ele.classList.add("track", "minus");
    }else{
        ele.classList.add("track", "plus");
    }
    ele.innerHTML = text+"&emsp;&emsp;"+amount;
    parentEle.append(ele);
}

function display(){
    let balance = document.getElementById("balance");
    let income = document.getElementById("money-plus");
    let expense = document.getElementById("money-minus");
    balance.innerHTML = "$" + curr_bal;
    income.innerHTML = "+$" + inc;
    expense.innerHTML = "-$" + exp;
}


function storeData(text,amount){
    let rdata = []
    rdata = [text, amount];
    tranCreate(text, amount);
    track.push(rdata);
    localStorage.setItem("bal", curr_bal);
    localStorage.setItem("inc", inc);
    localStorage.setItem("exp", exp);
    localStorage.setItem("Statement", JSON.stringify(track));
}

function getData(){
    track = JSON.parse(localStorage.getItem("Statement"));
    curr_bal = parseInt(localStorage.getItem("bal"));
    inc = parseInt(localStorage.getItem("inc"));
    exp = parseInt(localStorage.getItem("exp"));
}


function Transaction() {
    let text = document.getElementById("text").value;
    let amt = document.getElementById("amount").value;
    amount = parseInt(amt)
    curr_bal = curr_bal + amount
    if(amount<0){
        exp = exp - amount
        storeData(text,"-$"+ Math.abs(amount))
    }else{
        inc = inc + amount
        storeData(text,"+$"+ Math.abs(amount))
    }
    display()
    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

