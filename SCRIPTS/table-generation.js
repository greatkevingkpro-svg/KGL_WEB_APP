// const submitBtn = document.querySelector('.submit-button');

// submitBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   addToTable();
// })
const tabledata = [
  {
    dateOfProduction:'rice',
    produceName:'Rice',
    tonnageInKgs:700,
    totalSolgKgs:300,
    availableStockKgs:700,
    sellingPricePerKg:2000,
    status: 'in stock'
  }
];

function renderTableBody() {
  let tableBodyHTML = "";

  for (let i = 0; i < tabledata.length; i++) {
    const tableObject = tabledata[i];
    const {
      dateOfProduction, 
      produceName, 
      tonnageInKgs, 
      totalSolgKgs, 
      availableStockKgs, 
      sellingPricePerKg, 
      status} = tableObject;
    // const dueDate = todoObject.dueDate;
    const html = `
      <tr>
        <td>${dateOfProduction}</td>
        <td>${produceName}</td>
        <td>${tonnageInKgs}</td>
        <td>${totalSolgKgs}</td>
        <td>1${availableStockKgs}500</td>
        <td>${sellingPricePerKg}</td>
        <td>${status}</td>
      </tr>
    `;
    tableBodyHTML += html;
  }

  document.querySelector(".js-table-body")
    .innerHTML = todoListHTML;
}

function addToTable() {
  const produceNameELement = document.querySelector('#produceName');
  const produceNameInput = produceNameELement.value;

  const produceTypeELement = document.querySelector('#ProduceType');
  const produceTypeSelect = produceTypeELement.value;

  const dateELement = document.querySelector('#date');
  const dateInput = dateELement.value;

  const tonnageELement = document.querySelector('#tonnage');
  const tonnageInput = tonnageELement.value;

  const priceELement = document.querySelector('#price');
  const priceInput = priceELement.value;

  const branchElement = document.querySelector('#branch');
  const branchSelect = branchElement.value;
  
  tabledata.push({
    dateInput: dateOfProduction, 
    produceNameInput: produceName, 
    tonnageInput: tonnageInKgs, 
    totalSolgKgs, 
    availableStockKgs, 
    sellingPricePerKg
  });

  produceNameELement.value = "";
  tonnageELement.value = "";
  priceELement.value = "";

  renderTableBody();
  // console.log(produceNameInput);
}