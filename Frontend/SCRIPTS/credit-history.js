document.addEventListener("DOMContentLoaded", function () {

  const maganjoBody = document.querySelector("#maganjoCreditSales tbody");
  const matuggaBody = document.querySelector("#matuggaCreditSales tbody");

  const creditSales = JSON.parse(localStorage.getItem("creditSales")) || [];

  console.log("Loaded creditSales:", creditSales);

  maganjoBody.innerHTML = "";
  matuggaBody.innerHTML = "";

  if (creditSales.length === 0) {
    const emptyRow = `
      <tr>
        <td colspan="7" style="text-align:center;">
          No sales recorded yet.
        </td>
      </tr>
    `;

    maganjoBody.innerHTML = emptyRow;
    matuggaBody.innerHTML = emptyRow;
    return;
  }

  // show newest first
  creditSales.slice().reverse().forEach(creditSale => {

    let status = creditSale.amountDue > 1000000 ? "Large amount" : "Less amount";
    let color = creditSale.amountDue > 1000000 ? "red" : "orange";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${creditSale.buyerName}</td>
      <td>${creditSale.nin}</td>
      <td>${creditSale.contact}</td>
      <td>${creditSale.dispatchDate}</td>
      <td>${creditSale.produceName}</td>
      <td>${creditSale.tonnage}</td>
      <td>${creditSale.amountDue}</td>
      <td>${creditSale.dueDate}</td>
      <td style="color:${color}; font-weight:bold;">
        ${status}
      </td>
    `;

    // filter by branch
    if (creditSale.branch === "Maganjo") {
      maganjoBody.appendChild(row);
    }

    if (creditSale.branch === "Matugga") {
      matuggaBody.appendChild(row);
    }
    
  });

});