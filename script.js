// alert("Bonour");

// --- SUMMARY --- //
// const summaryU1Total = document.getElementById("summaryU1Total");
const summaryU1Owed = document.getElementById("summaryU1Owed");
// const summaryU2Total = document.getElementById("summaryU2Total");
const summaryU2Owed = document.getElementById("summaryU2Owed");

// --- ADD EXPENSE --- //
// user select input
const expenseNameInput = document.getElementById("expenseNameInput");
const expenseAmountInput = document.getElementById("expenseAmountInput");
const costShareInput = document.getElementById("costShareInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");

// --- EDIT USERS --- ///
const editUser1Input = document.getElementById("editUser1Input");
const editUser2Input = document.getElementById("editUser2Input");
const saveUsersBtn = document.getElementById("saveUsersBtn")

// --- CURRENCY CONVERTER --- //


// --- HISTORY --- //
const historyList = document.getElementById("historyList");




// --- FUNCTIONS --- //
function editUser() {
    // takes inputs and replaces them as the value for each user
    // if a field is empty, dont replace existing value
    // refresh all dislays to show updated name
}

function addExpense() {
    // take user select input
    // take expense name and save as string
    // take total expense amount and save as number
    // take cost split %, change to decimal, and save as number
    // 
}

function currencyConvert() {
    // take base currency 
    // take currency to convert to 
    // pass base currency to API
    // request converted currency response from API 
}

function displayHistory() {
    // forEach expense, display date, expense name, 
    // total expense amt, user1's amount paid, and user2's amount paid
}

function displaySummary() {
    // 
}