/**
 * ===INITIAL USERS SETUP====
 * Initializes default user accounts on first application load.
 * Checks if user data exists in localStorage, if not creates default accounts.
 * This runs when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve existing user data from browser storage
  const existingUser = localStorage.getItem("kglUser");

  // If no users exist or data is corrupted, create default user accounts
  if (!existingUser || !Array.isArray(JSON.parse(existingUser))) {
    // Define three default user accounts with different roles
    const defaultUser = [
      { username: "manager", password: "manager1234", role: "Manager" },
      { username: "sales agent", password: "agent1234", role: "Sales Agent" },
      { username: "Orban", password: "director1234", role: "Director" }
    ];

    // Store default users in browser's localStorage
    localStorage.setItem("kglUser", JSON.stringify(defaultUser));
    console.log("Default KGL user created");
  };
});

/**
 * ====LOGIN HANDLER====
 * Validates user credentials and creates a session upon successful login.
 * Handles form submission, credential verification, and navigation.
 */
document.getElementById("loginBtn").addEventListener("click", (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Get username and password from form inputs and remove whitespace
  const usernameInput = document.getElementById("floatingInput").value.trim();
  const passwordInput = document.getElementById("floatingPassword").value.trim();

  // Retrieve all user accounts from localStorage
  const users = JSON.parse(localStorage.getItem("kglUser")) || [];

  // Validate that user data exists and is properly formatted
  if (!Array.isArray(users)) {
    localStorage.clear();
    showToast("System reset. Try again.", "error");
    return;
  }

  // Check if both username and password fields were filled
  if (!usernameInput || !passwordInput) {
    showToast("Please enter both username and password.", "error");
    return;
  }

  // Search for a user account that matches both username and password
  const foundUser = users.find(
    u => u.username === usernameInput && u.password === passwordInput
  );

  // If no matching user found, show error message
  if (!foundUser) {
    showToast("Invalid username or password.", "error");
    return;
  }

  // LOGIN SUCCESS: Create a session object with user information
  const sessionUser = {
    username: foundUser.username,
    role: foundUser.role,
    loginTime: new Date().toISOString()
  };

  // Store the session data in localStorage for use across the application
  localStorage.setItem("kglSession", JSON.stringify(sessionUser));

  // Display welcome message to the user
  showToast(`Welcome ${foundUser.role}`, "success");

  // Redirect to dashboard after a brief delay to show the success message
  setTimeout(() => {
    window.location.href = "stock-overview.html";
  }, 1200);

})

/**
 * =======TOAST NOTIFICATION FUNCTION========
 * Displays temporary notification messages to the user.
 * @param {string} message - The text to display in the toast notification
 * @param {string} type - CSS class for styling (e.g., 'success', 'error')
 */
function showToast(message, type) {
  // Get the toast element from the DOM
  const toast = document.getElementById("toast");

  // Set the notification message
  toast.textContent = message;
  
  // Apply styling based on message type and show the toast
  toast.className = `toast show ${type}`;

  // Auto-hide the toast notification after 3 seconds
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}