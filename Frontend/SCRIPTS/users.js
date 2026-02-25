
// ===============================
// USERS DATA AND PAGINATION
// ===============================
const usersTableBody = document.getElementById('usersTableBody');
const paginationContainer = document.getElementById('paginationContainer');
const saveUserBtn = document.getElementById('saveUserBtn');

let users = [
  { name: "John Doe", email: "john@example.com", role: "Admin", departement: "Produce", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", departement: "Sales", status: "Active" },
  { name: "Alice Brown", email: "alice@example.com", role: "User", departement: "Sales", status: "Inactive" },
  { name: "Bob Green", email: "bob@example.com", role: "Admin", departement: "Produce", status: "Active" },
  { name: "Charlie White", email: "charlie@example.com", role: "User", departement: "Sales", status: "Active" },
  { name: "Diana Black", email: "diana@example.com", role: "Admin", departement: "Produce", status: "Inactive" },
  { name: "Eve Grey", email: "eve@example.com", role: "User", departement: "Sales", status: "Active" }
  // Add more users if needed
];

const rowsPerPage = 5;
let currentPage = 1;

function renderTable() {
  usersTableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.departement}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2 editBtn">Edit</button>
          <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
        </td>
      `;
    usersTableBody.appendChild(tr);
  });

  renderPagination();
  attachRowActions();
}

function renderPagination() {
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(users.length / rowsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");

    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderTable();
    });

    paginationContainer.appendChild(li);
  }
}

// ===============================
// ADD USER MODAL LOGIC
// ===============================
saveUserBtn.addEventListener("click", () => {
  const userName = document.getElementById("userName").value.trim();
  const userEmail = document.getElementById("userEmail").value.trim();
  const userRole = document.getElementById("userRole").value;
  const departement = document.getElementById("departement").value;
  const userStatus = document.getElementById("userStatus").value;

  if (!userName || !userEmail || !userRole || !departement || !userStatus) {
    alert("Please fill all fields!");
    return;
  }

  users.push({
    name: userName,
    email: userEmail,
    role: userRole,
    departement: departement,
    status: userStatus
  });

  // Reset form
  document.getElementById("addUserForm").reset();

  // Close modal
  const modalEl = document.getElementById("addUserModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  // Show the last page (where the new user is)
  currentPage = Math.ceil(users.length / rowsPerPage);
  renderTable();
});

// ===============================
// EDIT / DELETE BUTTONS
// ===============================
function attachRowActions() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const globalIndex = (currentPage - 1) * rowsPerPage + idx;
      if (confirm("Are you sure you want to delete this user?")) {
        users.splice(globalIndex, 1);
        if ((currentPage - 1) * rowsPerPage >= users.length && currentPage > 1) {
          currentPage--;
        }
        renderTable();
      }
    });
  });

  // Edit button logic can be added similarly
}

// Initial render
renderTable();
