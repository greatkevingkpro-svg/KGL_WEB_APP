document.getElementById("saleForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const produceName = document.getElementById("produceName").value;
  const tonnage = Number(document.getElementById("saleTonnage").value);
  const amountPaid = document.getElementById("amountPaid").value.trim();
  const buyerName = document.getElementById("buyerName").value.trim();
  const agentName = document.getElementById("agentName").value.trim();
  const date = document.getElementById("saleDate").value;
  const time = document.getElementById("saleTime").value;
  const branch = document.getElementById("saleBranch").value;


  const alphaNumeric = /^[a-zA-Z0-9 ]+$/;

  // VALIDATION
  if (!produceName) return alert("Select produce.");

  if (tonnage <= 0) return alert("Tonnage must be greater than 0.");

  if (amountPaid.length < 5 || isNaN(amountPaid))
    return alert("Amount paid must be numeric and at least 5 digits.");

  if (!alphaNumeric.test(buyerName) || buyerName.length < 2)
    return alert("Buyer name must be alphanumeric and at least 2 characters.");

  if (!alphaNumeric.test(agentName) || agentName.length < 2)
    return alert("Agent name must be alphanumeric and at least 2 characters.");

  if (!date || !time) return alert("Date and time required.");

  if (!branch) return alert("Select branch.");

  // GET STOCK
  let stock = JSON.parse(localStorage.getItem("stock")) || [];

  const index = stock.findIndex(item =>
    item.produceName === produceName && item.branch === branch
  );

  if (index === -1) return alert("Produce not found in this branch.");

  if (stock[index].tonnage < tonnage)
    return alert("Not enough stock! Manager should be notified.");

  // REDUCE STOCK
  stock[index].tonnage -= tonnage;
  localStorage.setItem("stock", JSON.stringify(stock));

  // GET produceType from stock
  const produceType = stock[index].produceType;  // <-- add this line

  // SAVE SALE
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  sales.push({
    produceName,
    produceType,
    tonnage,
    amountPaid: Number(amountPaid),
    buyerName,
    agentName,
    date,
    time,
    branch
  });

  localStorage.setItem("sales", JSON.stringify(sales));

  alert("Sale recorded successfully!");

  document.getElementById("saleForm").reset();
});