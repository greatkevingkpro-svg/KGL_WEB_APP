// Stock Overview Script
// This script loads stock data from localStorage and displays it in tables for different branches.
// It runs after the DOM is fully loaded to ensure elements are available.

document.addEventListener("DOMContentLoaded", function () {
  /** 
   * Retrieve stock data from localStorage, 
   * default is empty array if there is no existing stck
   */
  const stock = JSON.parse(localStorage.getItem("stock")) || [];

  // Select the table body elements for Maganjo and Matugga branches
  const maganjoBody = document.querySelector("#maganjoTable tbody");
  const matuggaBody = document.querySelector("#matuggaTable tbody");

  if (!maganjoBody || !matuggaBody) return;

  // Clear existing table content to prepare for new data
  maganjoBody.innerHTML = "";
  matuggaBody.innerHTML = "";

  // If there is no stock data available, display a message in both tables
  if (stock.length === 0) {
    const emptyRow = `
      <tr>
        <td colspan="6" style="text-align:center;">
          No stock available yet.
        </td>
      </tr>
    `;

    maganjoBody.innerHTML = emptyRow;
    matuggaBody.innerHTML = emptyRow;
    return; // Exit the function early because there is no data
  }

  /**
   * Loop through each stock item and create table rows
   * when there is existing data or when adding new data
   */
  stock.forEach(item => {
    // Determine status and color based on tonnage
    let status = item.tonnage > 0 ? "Available" : "Out of Stock";
    let color = item.tonnage > 0 ? "green" : "red";

    // Create a new table row element
    const row = document.createElement("tr");

    // Set the row's HTML content with stock item details
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

    // Append the row to the appropriate table based on the branch
    if (item.branch === "Maganjo") {
      maganjoBody.appendChild(row);
    } else if (item.branch === "Matugga") {
      matuggaBody.appendChild(row);
    }
  });
});