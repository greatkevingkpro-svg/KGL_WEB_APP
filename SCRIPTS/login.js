const usersDefaultPassword = [
  {userName: "manager", password: "manager1234"},
  {userName: "sales agent", password: "agent1234"},
  {userName: "director", password: "director1234"}
]
// console.log(usersDefaultPassword);


// console.log(userNameInput);

function loginProcess() {
  let userNameInput = document.querySelector(".js-input-username");

  console.log(userNameInput.textContent);
}