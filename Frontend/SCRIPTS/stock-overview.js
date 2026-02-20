document.addEventListener("DOMContentLoaded", function () {

  const stock = JSON.parse(localStorage.getItem("stock")) || [];

  const maganjoBody = document.querySelector("#maganjoTable tbody");
  const matuggaBody = document.querySelector("#matuggaTable tbody");

  // Clear tables first
  maganjoBody.innerHTML = "";
  matuggaBody.innerHTML = "";

  if (stock.length === 0) {
    const emptyRow = `
      <tr>
        <td colspan="7" style="text-align:center;">
          No stock available yet.
        </td>
      </tr>
    `;

    maganjoBody.innerHTML = emptyRow;
    matuggaBody.innerHTML = emptyRow;
    return;
  }

  stock.forEach(item => {

    let status = item.tonnage > 0 ? "Available" : "Out of Stock";
    let color = item.tonnage > 0 ? "green" : "red";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.produceName}</td>
      <td>${item.produceType}</td>
      <td>${item.tonnage}</td>
      <td>${item.cost}</td>
      <td>${item.price}</td>
      <td style="color:${color}; font-weight:bold;">
        ${status}
      </td>
    `;

    // FILTER BY BRANCH
    if (item.branch === "Maganjo") {
      maganjoBody.appendChild(row);
    }

    if (item.branch === "Matugga") {
      matuggaBody.appendChild(row);
    }

  });

});