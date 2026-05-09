// alert("Bonour");

// --- DOM ELEMENTS --- //
// SUMMARY //
const u1CurrentlyOwed = document.getElementById("u1CurrentlyOwed");
const u2CurrentlyOwed = document.getElementById("u2CurrentlyOwed");
const clearOwedBtn = document.getElementById("clearOwedBtn");

// ADD EXPENSE //
const addExpenseUserSelect = document.getElementById("addExpenseUserSelect");
const expenseNameInput = document.getElementById("expenseNameInput");
const expenseAmountInput = document.getElementById("expenseAmountInput");
const costShareInput = document.getElementById("costShareInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");

// EDIT USERS ///
const editUser1Input = document.getElementById("editUser1Input");
const editUser2Input = document.getElementById("editUser2Input");
const saveUsersBtn = document.getElementById("saveUsersBtn");

// CURRENCY CONVERTER //
const convertBtn = document.getElementById("convertBtn")

// HISTORY //
const historyList = document.getElementById("historyList");
const convertFromSelect = document.getElementById("convertFromSelect");
const convertToSelect = document.getElementById("convertToSelect");

// --- VARIABLES --- //
let user1name = JSON.parse(localStorage.getItem("user1name")) || "User 1";
let user2name = JSON.parse(localStorage.getItem("user2name")) || "User 2";

const expenseHistory = [
    { date: "", expenseName = "", totalAmt = 0, user1 = user1name, user2 = user2name}
];

// --- ON PAGE LOAD --- //
updateUsernames();


// --- FUNCTIONS --- //
function editUser() {
    // takes inputs and replaces them as the value for each user
    // if a field is empty, dont replace existing value
    const newName1 = editUser1Input.value.trim();
    const newName2 = editUser2Input.value.trim();


    if (newName1 !== "") {
        user1name = newName1;
        localStorage.setItem("user1name", JSON.stringify(user1name));
    }

    if (newName2 !== "") {
        user2name = newName2;
        localStorage.setItem("user2name", JSON.stringify(user2name));
    }
    
    console.log(user1name, user2name)

    // refresh all dislays to show updated name
    updateUsernames();
}

function updateUsernames() {
    // update Add Expense User <option>s
    const newLabelU1 = user1name;
    const newValueU1 = user1name;

    const newLabelU2 = user2name;
    const newValueU2 = user2name;

    let addExpenseUserOption1 = document.getElementById("addExpenseUserSelect").options[0];
    addExpenseUserOption1.text = user1name;
    addExpenseUserOption1.value = user1name;

    let addExpenseUserOption2 = document.getElementById("addExpenseUserSelect").options[1];
    addExpenseUserOption2.text = newLabelU2;
    addExpenseUserOption2.value = newValueU2;

    // update Currently Owed user labels
    let owedUser1Label = document.getElementById("owedUser1Label");
    let owedUser2Label = document.getElementById("owedUser2Label");

    owedUser1Label.textContent = user1name;
    owedUser2Label.textContent = user2name;
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

saveUsersBtn.addEventListener("click", editUser)