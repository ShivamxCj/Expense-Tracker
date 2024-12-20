document.addEventListener("DOMContentLoaded", ()=>{
    const expenseForm= document.getElementById("expense-form")
    const expenseName= document.getElementById("expense-name")
    const expenseAmount= document.getElementById("expense-amount")
    const addButton= document.getElementById("add-btn")
    const expenseList= document.getElementById("expense-list")
    const totalAmounDisplay= document.getElementById("total-amount")

    const list= new Array()
    let totalAmount= calculateTotal()
    
    expenseForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        const name= expenseName.value.trim()
        const amount= parseFloat(expenseAmount.value.trim())

        if(name!="" && !isNaN(amount) && amount>0){
            const newExpense= {
             id: Date.now(),
             name: name,
             amount: amount,   
            }
            list.push(newExpense)
            addToLocalStorage()
            updateTotal()

            //showing expenses
            showExpense()

            //clearing input
            expenseName.value=""
            expenseAmount.value=""
        }
        else{
            console.log("chudd gye guru")
        }
    })
    function addToLocalStorage(){
        localStorage.setItem("expense", JSON.stringify(list))
    }

    function showExpense(){
        expenseList.innerHTML=""
       list.forEach(element=>{
        const li= document.createElement("li")
        li.setAttribute("id", `${element.id}`)
        li.innerHTML= `<p>${element.name}</p>
                       <span>~Rs. ${element.amount}</span>
                       <button id="remove-btn" btn-id=${element.id}>Remove</button>`
        expenseList.appendChild(li)
       
       })
  
    }

    function calculateTotal(){
        //calculates total 
        return list.reduce((sum, expense)=>sum + expense.amount ,0)
    }
    function updateTotal(){
        totalAmount= calculateTotal()
        totalAmounDisplay.innerText= `${totalAmount}`
    }

    expenseList.addEventListener("click", (e)=>{
        if(e.target.tagName== "BUTTON"){
           console.log(e.target.getAttribute("btn-id"))
           list.forEach((element)=>{
            if(e.target.getAttribute("btn-id")== element.id){
                document.getElementById(element.id).remove()
                list.splice(list.indexOf(element), 1)
            }
           })
        }
    })
})