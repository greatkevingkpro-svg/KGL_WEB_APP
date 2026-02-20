document.getElementById("creditSaleForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const produceName = document.getElementById("creditProduce").value;
  const tonnage = Number(document.getElementById("creditTonnage").value);
  const buyerName = document.getElementById("creditBuyerName").value.trim();
  const nin = document.getElementById("creditNIN").value.trim();
  const location = document.getElementById("creditLocation").value.trim();
  const contact = document.getElementById("creditContact").value.trim();
  const amountDue = document.getElementById("creditAmount").value.trim();
  const dispatchDate = document.getElementById("dispatchDate").value;
  const dueDate = document.getElementById("dueDate").value;
  const agent = document.getElementById("creditAgent").value.trim();
  const branch = document.getElementById("creditBranch").value;

  const alphaNumeric = /^[a-zA-Z0-9 ]+$/;
  const phoneRegex = /^(07|01)\d{8}$/;
  const ninRegex = /^[A-Z]{2}\d{12}$/; // Simple NIN pattern

  // VALIDATIONS
  if (!produceName) return alert("Select produce.");
  if (tonnage <= 0) return alert("Tonnage must be greater than 0.");

  if (!alphaNumeric.test(buyerName) || buyerName.length < 2)
    return alert("Buyer name must be at least 2 characters.");

  if (!ninRegex.test(nin))
    return alert("Enter valid NIN format (e.g CM12345678901234)");

  if (!alphaNumeric.test(location) || location.length < 2)
    return alert("Location must be at least 2 characters.");

  if (!phoneRegex.test(contact))
    return alert("Enter valid Ugandan phone number.");

  if (amountDue.length < 5 || isNaN(amountDue))
    return alert("Amount must be at least 5 digits.");

  if (!dispatchDate || !dueDate)
    return alert("Select dispatch and due date.");

  if (!alphaNumeric.test(agent) || agent.length < 2)
    return alert("Agent name invalid.");

  if (!branch)
    return alert("Select branch.");

  // CHECK STOCK
  let stock = JSON.parse(localStorage.getItem("stock")) || [];

  const index = stock.findIndex(item =>
    item.produceName === produceName && item.branch === branch
  );

  if (index === -1)
    return alert("Produce not found in this branch.");

  if (stock[index].tonnage < tonnage)
    return alert("Not enough stock available.");

  // REDUCE STOCK
  stock[index].tonnage -= tonnage;
  localStorage.setItem("stock", JSON.stringify(stock));

  // SAVE CREDIT SALE
  let creditSales = JSON.parse(localStorage.getItem("creditSales")) || [];

  creditSales.push({
    produceName,
    tonnage,
    buyerName,
    nin,
    location,
    contact,
    amountDue: Number(amountDue),
    dispatchDate,
    dueDate,
    agent,
    branch
  });

  localStorage.setItem("creditSales", JSON.stringify(creditSales));

  alert("Credit sale recorded successfully!");

  document.getElementById("creditSaleForm").reset();
});