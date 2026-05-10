// alert("Bonour");

// --- VARIABLES --- //
let user1name = JSON.parse(localStorage.getItem("user1name")) || "User 1";
let user2name = JSON.parse(localStorage.getItem("user2name")) || "User 2";

let expenseHistory = JSON.parse(localStorage.getItem("expenseHistory")) || [];

// --- DOM ELEMENTS --- //
// SUMMARY //
const u1OwedDisplay = document.getElementById("u1OwedDisplay");
const u2OwedDisplay = document.getElementById("u2OwedDisplay");
const clearOwedBtn = document.getElementById("clearOwedBtn");

// ADD EXPENSE //
const addExpenseUserSelect = document.getElementById("addExpenseUserSelect");
const expenseNameInput = document.getElementById("expenseNameInput");
const expenseAmountInput = document.getElementById("expenseAmountInput");
const costShareInput = document.getElementById("costShareInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const inputError = document.getElementById("inputError");

// EDIT USERS ///
const editUser1Input = document.getElementById("editUser1Input");
editUser1Input.placeholder = `${user1name}`;
const editUser2Input = document.getElementById("editUser2Input");
editUser2Input.placeholder = `${user2name}`;
const saveUsersBtn = document.getElementById("saveUsersBtn");

// CURRENCY CONVERTER //
const convertFromInput = document.getElementById("convertFromInput");
convertFromInput.value = 1;
const convertFromSelect = document.getElementById("convertFromSelect");
const convertToOutput = document.getElementById("convertToOutput");
const convertToSelect = document.getElementById("convertToSelect");
const convertBtn = document.getElementById("convertBtn");

// HISTORY //
const historyDisplay = document.getElementById("historyDisplay");

// --- FUNCTIONS --- //
function editUser() {
  // takes inputs and replaces them as the value for each user
  const newName1 = editUser1Input.value.trim();
  const newName2 = editUser2Input.value.trim();

  // if a field is empty, dont replace existing value
  if (newName1 !== "") {
    user1name = newName1;
    localStorage.setItem("user1name", JSON.stringify(user1name));
  }
  if (newName2 !== "") {
    user2name = newName2;
    localStorage.setItem("user2name", JSON.stringify(user2name));
  }

  console.log(user1name, user2name);

  // refresh all dislays to show updated name
  updateUsernames();
  displayHistory();
}

function updateUsernames() {
  // update Add Expense User <option>s
  const newLabelU1 = user1name;
  const newValueU1 = user1name;

  const newLabelU2 = user2name;
  const newValueU2 = user2name;

  let addExpenseUserOption1 = document.getElementById("addExpenseUserSelect")
    .options[0];
  addExpenseUserOption1.text = user1name;
  addExpenseUserOption1.value = user1name;

  let addExpenseUserOption2 = document.getElementById("addExpenseUserSelect")
    .options[1];
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
  let activeUser = addExpenseUserSelect.value;
  // take expense name and save as string
  let expenseName = expenseNameInput.value.trim();
  // take total expense amount and save as number
  let expenseAmountNum = expenseAmountInput.value.trim();
  // take cost split %, change to decimal, and save as number
  let splitPercentNum = costShareInput.value.trim();
  let splitDecimalNum = splitPercentNum / 100;

  // calculate each users' amount
  let u1Owed = 0;
  let u2Owed = 0;

  if (!expenseName || !expenseAmountNum || !splitPercentNum) {
    inputError.textContent = "*Please fill out all fields";
    return;
  } else {
    inputError.textContent = "";

    if (activeUser === user1name) {
      u1Owed = expenseAmountNum * splitDecimalNum;
      u2Owed = expenseAmountNum - u1Owed;

      u1OwedDisplay.textContent = "Owed: $0";
      u2OwedDisplay.textContent = `Owed: $${u2Owed}`;
    }
    if (activeUser === user2name) {
      u2Owed = expenseAmountNum * splitDecimalNum;
      u1Owed = expenseAmountNum - u2Owed;

      u1OwedDisplay.textContent = `Owed: $${u1Owed}`;
      u2OwedDisplay.textContent = "Owed: $0";
    }

    const today = new Date();
    const dateValue = today.toLocaleDateString("en-US");

    expenseHistory.push({
      date: dateValue,
      name: expenseName,
      total: expenseAmountNum,
      u1: u1Owed,
      u2: u2Owed,
    });

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    costShareInput.value = "";

    localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));

    displayHistory(expenseHistory);
  }

  // FOR TESTING
  console.log(activeUser, expenseName, expenseAmountNum, splitDecimalNum);
  console.log("User 1: " + u1Owed + ". User 2: " + u2Owed);
  console.log(expenseHistory);
}

function displayHistory() {
  // forEach expense, display date, expense name,
  // total expense amt, user1's amount paid, and user2's amount paid
  const saved = localStorage.getItem("expenseHistory");
  const historyList = JSON.parse(saved);

  historyDisplay.textContent = "";

  if (historyList && historyList.length > 0) {
    historyList.forEach((historyItem) => {
      console.log(`History: ${historyItem}`);

      const li = document.createElement("li");

      const labelExpenseName = document.createElement("b");
      labelExpenseName.textContent = "Expense: ";

      const labelTotal = document.createElement("b");
      labelTotal.textContent = "Total: ";

      const labelU1 = document.createElement("b");
      labelU1.textContent = `${user1name}: `;

      const labelU2 = document.createElement("b");
      labelU2.textContent = `${user2name}: `;

      li.append(
        `(${historyItem.date}) `,
        labelExpenseName,
        `${historyItem.name} — `,
        labelTotal,
        `$${historyItem.total} — `,
        labelU1,
        `$${historyItem.u1} — `,
        labelU2,
        `$${historyItem.u2}`,
      );

      historyDisplay.appendChild(li);
    });
  } else {
    historyDisplay.textContent = "No expenses yet...";
  }
}

function clearOwed() {
  u1OwedDisplay.textContent = "Owed: $0";
  u2OwedDisplay.textContent = "Owed: $0";
}

function currencyConvert() {
  // take base currency
  const baseCurrencyCode = convertFromSelect.value;
  const baseCurrencyAmount = convertFromInput.value;

  // take currency to convert to
  const targetCurrencyCode = convertToSelect.value;
  console.log(baseCurrencyAmount);

  // pass base cose, target code, and base amount to API
  const url = `https://v6.exchangerate-api.com/v6/3376a6737ec4ea929b72afc9/pair/${baseCurrencyCode}/${targetCurrencyCode}/${baseCurrencyAmount}`;

  // request converted currency response from API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Conversion rate: ${data.conversion_result}`);
      convertToOutput.textContent = `${data.conversion_result}`;
    })
    .catch((error) => console.log("Error: ", error));
}

// --- ON PAGE LOAD --- //
updateUsernames();
displayHistory();
saveUsersBtn.addEventListener("click", () => editUser());
addExpenseBtn.addEventListener("click", () => addExpense());
clearOwedBtn.addEventListener("click", () => clearOwed());
convertBtn.addEventListener("click", () => currencyConvert());
