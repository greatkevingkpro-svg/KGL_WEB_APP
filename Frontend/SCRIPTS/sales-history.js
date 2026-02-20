document.addEventListener("DOMContentLoaded", function () {

  const maganjoBody = document.querySelector("#maganjoSales tbody");
  const matuggaBody = document.querySelector("#matuggaSales tbody");

  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  console.log("Loaded sales:", sales);

  maganjoBody.innerHTML = "";
  matuggaBody.innerHTML = "";

  if (sales.length === 0) {
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

  // Show newest first
  sales.slice().reverse().forEach(sale => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${sale.date}</td>
      <td>${sale.produceName}</td>
      <td>${sale.produceType || "-"}</td>
      <td>${sale.tonnage}</td>
      <td>${sale.amountPaid}</td>
      <td>${sale.buyerName}</td>
      <td>${sale.agentName}</td>
    `;

    // FILTER BY BRANCH
    if (sale.branch === "Maganjo") {
      maganjoBody.appendChild(row);
    }

    if (sale.branch === "Matugga") {
      matuggaBody.appendChild(row);
    }

  });

});