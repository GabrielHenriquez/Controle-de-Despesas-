const balance = document.getElementById('balance')
const income = document.getElementById('money-plus')
const expense = document.getElementById('money-minus')
const inputName = document.getElementById('text')
const inputAmount = document.getElementById('amount')
const btnAdd = document.getElementById('btn-add')
const transactionsUl = document.getElementById('transactions')


// BANCO DE DADOS

let dataBases = JSON.parse(localStorage.getItem('transaction')) || [] 

// FUNÇÕES

const generateLi = transaction => {
    const li = document.createElement('li')
    const operator = transaction.amount < 0 ? '-' : '+'
    const classe = transaction.amount < 0 ? 'minus' : 'plus'

    li.className = classe
    li.innerHTML = `${transaction.name} <span>${operator}$${Math.abs(transaction.amount)}</span> <button onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button>`
    transactionsUl.appendChild(li)
}

const addTransictionsInToDom = () => {
    dataBases.forEach(transaction => {generateLi(transaction)})
    updateBalance()
}

const removeTransaction = ID => {
    dataBases = dataBases.filter(transaction => transaction.id != ID)
    console.log(dataBases)
    transactionsUl.innerHTML = ''
    localStorage.clear()
    localStorage.setItem('transaction', JSON.stringify(dataBases))
    dataBases.forEach((transaction) => {
        generateLi(transaction)
    }) 
    updateBalance()
    clearInputs()
}

const addTransictionsDataBase = transaction => {
    dataBases.push(transaction)
    localStorage.setItem('transaction', JSON.stringify(dataBases))
    generateLi(transaction)
    updateBalance()
}

const updateBalance = () => {
    let transactions = dataBases.map(transiction => transiction.amount)
    let balanceTotal = transactions.reduce((acc, transiction) => acc + transiction, 0).toFixed(2)
    let incomeTotal = transactions.filter(transaction => transaction > 0).reduce((acc, transiction) => acc + transiction, 0).toFixed(2)
    let expenseTotal = Math.abs(transactions.filter(transaction => transaction < 0).reduce((acc, transiction) => acc + transiction, 0)).toFixed(2)

    balance.textContent = `R$ ${balanceTotal}`
    income.textContent = `R$ ${incomeTotal}`
    expense.textContent = `R$ ${expenseTotal}`
}

const generateId = () => {
    let idRandom = Math.floor(Math.random() * 1000) 
    return idRandom
}

const clearInputs = () => {
    inputName.value = ''
    inputName.focus()
    inputAmount.value = ''
}

// EVENT HANDLER

btnAdd.addEventListener('click', element =>{
    element.preventDefault()

    if(!inputName.value || !inputAmount.value) {
        alert('PREENCHA OS VALORES CORRETOS PARA ADICIONAR')
        return
    }
    
    const transaction = {id: generateId(), name: inputName.value, amount: +inputAmount.value} 

    addTransictionsDataBase(transaction)
    clearInputs()
})

addTransictionsInToDom()
clearInputs()