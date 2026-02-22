// Pagination settings
const itemsPerPage = 5;
let currentPage = 1;
let allRows = [];

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', function() {
  // Store all initial rows
  allRows = Array.from(document.querySelectorAll('#usersTableBody tr')).map(row => ({
    name: row.cells[0].textContent,
    email: row.cells[1].textContent,
    role: row.cells[2].textContent,
    dateAdded: row.cells[3].textContent,
    status: row.cells[4].textContent
  }));
  displayPage(currentPage);
  updatePaginationControls();
});

// Function to display rows based on current page
function displayPage(page) {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const rowsToDisplay = allRows.slice(start, end);
  
  rowsToDisplay.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td>${row.role}</td>
      <td>${row.dateAdded}</td>
      <td>${row.status}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Function to update pagination controls only
function updatePaginationControls() {
  const totalPages = Math.ceil(allRows.length / itemsPerPage);
  const paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = '';
  
  // Previous button
  const prevLi = document.createElement('li');
  prevLi.className = 'page-item ' + (currentPage === 1 ? 'disabled' : '');
  prevLi.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + (currentPage - 1) + '); return false;">Previous</a>';
  paginationContainer.appendChild(prevLi);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = 'page-item ' + (i === currentPage ? 'active' : '');
    li.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + i + '); return false;">' + i + '</a>';
    paginationContainer.appendChild(li);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  nextLi.className = 'page-item ' + (currentPage === totalPages ? 'disabled' : '');
  nextLi.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + (currentPage + 1) + '); return false;">Next</a>';
  paginationContainer.appendChild(nextLi);
}

// Function to change page
function changePage(page) {
  const totalPages = Math.ceil(allRows.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    displayPage(currentPage);
    updatePaginationControls();
  }
}

// Event listener for Add User button to show modal
document.getElementById('addUserBtn').addEventListener('click', function() {
  const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
  modal.show();
});

// Event listener for Save User button to add new row
document.getElementById('saveUserBtn').addEventListener('click', function() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const role = document.getElementById('userRole').value;
  const status = document.getElementById('userStatus').value;
  if (name && email && role && status) {
    const today = new Date().toISOString().split('T')[0];
    // Add to allRows array (persistent data)
    allRows.push({
      name: name,
      email: email,
      role: role,
      dateAdded: today,
      status: status
    });
    // Close modal and reset form
    bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
    document.getElementById('addUserForm').reset();
    // Update pagination controls
    updatePaginationControls();
    // Display last page to show new user
    const totalPages = Math.ceil(allRows.length / itemsPerPage);
    currentPage = totalPages;
    displayPage(currentPage);
    updatePaginationControls();
  } else {
    alert('Please fill in all fields.');
  }
});