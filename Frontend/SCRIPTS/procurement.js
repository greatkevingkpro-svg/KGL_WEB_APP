document.getElementById("procForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const produceName = document.getElementById("produceName").value.trim();
  const produceType = document.getElementById("ProduceType").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const tonnage = document.getElementById("tonnage").value.trim();
  const cost = document.getElementById("cost").value.trim();
  const price = document.getElementById("price").value.trim();
  const dealer = document.getElementById("dealer").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const branch = document.getElementById("branch").value;

  // REGEX
  const alphaNumeric = /^[a-zA-Z0-9 ]+$/;
  const lettersOnly = /^[A-Za-z ]{2,}$/;
  const phoneRegex = /^(07|01)\d{8}$/; // Uganda format

  // VALIDATIONS
  if (!alphaNumeric.test(produceName)) {
    alert("Produce name must be alphanumeric.");
    return;
  }

  if (!lettersOnly.test(produceType)) {
    alert("Produce type must contain only letters and be at least 2 characters.");
    return;
  }

  if (!date || !time) {
    alert("Date and Time are required.");
    return;
  }

  if (tonnage.length < 3 || isNaN(tonnage)) {
    alert("Tonnage must be numeric and at least 3 digits.");
    return;
  }

  if (cost.length < 5 || isNaN(cost)) {
    alert("Cost must be numeric and at least 5 digits.");
    return;
  }

  if (!alphaNumeric.test(dealer) || dealer.length < 2) {
    alert("Dealer name must be alphanumeric and at least 2 characters.");
    return;
  }

  if (!phoneRegex.test(contact)) {
    alert("Enter a valid Ugandan phone number.");
    return;
  }

  if (!branch) {
    alert("Select branch.");
    return;
  }

  if (!price || isNaN(price)) {
    alert("Selling price is required.");
    return;
  }

  // If all validations pass
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

  // Save to LocalStorage (for now before backend)
  let stock = JSON.parse(localStorage.getItem("stock")) || [];
  stock.push(procurement);
  localStorage.setItem("stock", JSON.stringify(stock));

  alert("Procurement saved successfully!");
  document.getElementById("procForm").reset();
});