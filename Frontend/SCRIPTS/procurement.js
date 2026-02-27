document.getElementById("procForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const produceName = document.getElementById("produceName").value.trim();
  const produceType = document.getElementById("produceType").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const tonnage = document.getElementById("tonnage").value.trim();
  const cost = document.getElementById("cost").value.trim();
  const price = document.getElementById("price").value.trim();
  const dealer = document.getElementById("dealer").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const branch = document.getElementById("branch").value;

  // REGEX PATTERNS
  const alphaNumeric = /^[a-zA-Z0-9 ]+$/;
  const lettersOnly = /^[A-Za-z ]{2,}$/;
  const phoneRegex = /^(07|01)\d{8}$/; // Uganda format

  // VALIDATIONS

  // Produce Name (alphanumeric)
  if (!alphaNumeric.test(produceName)) {
    alert("Produce name must be alphanumeric.");
    return;
  }

  // Produce Type (letters only, min 2 chars)
  if (!lettersOnly.test(produceType)) {
    alert("Produce type must contain only letters and be at least 2 characters.");
    return;
  }

  // Date
  if (!date) {
    alert("Date is required.");
    return;
  }

  // Time
  if (!time) {
    alert("Time is required.");
    return;
  }

  // Tonnage (numeric, not empty, not less than 3 characters)
  if (isNaN(tonnage) || tonnage.length < 3) {
    alert("Tonnage must be numeric and at least 3 characters.");
    return;
  }

  // Cost (numeric, not empty, not less than 5 digits)
  if (isNaN(cost) || cost.length < 5) {
    alert("Cost must be numeric and at least 5 digits.");
    return;
  }

  // Selling Price
  if (isNaN(price) || !price) {
    alert("Please fill in the selling price field.");
    return;
  }

  // Dealer (alphanumeric, min 2)
  if (!alphaNumeric.test(dealer) || dealer.length < 2) {
    alert("Dealer name must be alphanumeric and at least 2 characters.");
    return;
  }

  // Contact (valid Ugandan phone)
  if (!phoneRegex.test(contact)) {
    alert("Enter a valid Ugandan phone number.");
    return;
  }

  // Branch
  if (!branch) {
    alert("Please select a branch.");
    return;
  }

  // If All Valid
  const procurement = {
    produceName,
    produceType,
    date,
    time,
    tonnage: Number(tonnage),
    cost: Number(cost),
    price: Number(price),
    dealer,
    contact,
    branch
  };

  let stock = JSON.parse(localStorage.getItem("stock")) || [];
  stock.push(procurement);
  localStorage.setItem("stock", JSON.stringify(stock));

  alert("Procurement saved successfully!");
  document.getElementById("procForm").reset();
});