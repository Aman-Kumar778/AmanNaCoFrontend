// Selecting elements
const addButton = document.getElementById("addButton");
const itemInput = document.getElementById("itemInput");
const todoList = document.querySelector(".list-container .list:first-child");
const completeList = document.querySelector(".list-container .list:last-child");
const moveButtons = document.querySelectorAll(".move-button");

// Function to add an item to the To-Do List
addButton.addEventListener("click", () => {
  const itemText = itemInput.value.trim();
  if (itemText) {
    const newItem = document.createElement("div");
    newItem.className = "list-item";
    newItem.textContent = itemText;
    todoList.appendChild(newItem);
    itemInput.value = ""; // Clear input field
  }
});

// Function to move items between lists
moveButtons[0].addEventListener("click", () => {
  // Move to the right (Complete List)
  const selectedItems = Array.from(
    todoList.querySelectorAll(".list-item.selected")
  );
  selectedItems.forEach((item) => {
    todoList.removeChild(item);
    completeList.appendChild(item);
    item.classList.remove("selected"); // Deselect the item after moving
  });
});

moveButtons[1].addEventListener("click", () => {
  // Move to the left (To-Do List)
  const selectedItems = Array.from(
    completeList.querySelectorAll(".list-item.selected")
  );
  selectedItems.forEach((item) => {
    completeList.removeChild(item);
    todoList.appendChild(item);
    item.classList.remove("selected"); // Deselect the item after moving
  });
});

// Function to toggle selection of items
function toggleSelection(event) {
  if (event.target.classList.contains("list-item")) {
    event.target.classList.toggle("selected");
  }
}

// Attach toggleSelection to both lists
todoList.addEventListener("click", toggleSelection);
completeList.addEventListener("click", toggleSelection);

// for the Text changing update
function updateHeading() {
  const topele = document.querySelector(".topele h1");

  if (window.innerWidth < 750) {
    topele.textContent = "Welcome to Js";
  } else {
    topele.textContent = "Welcome to JavaScript Project";
  }
}

// Run the function on page load and whenever the window is resized
window.addEventListener("resize", updateHeading);
window.addEventListener("load", updateHeading);

// for updating the button for less pixel view

function updateButton() {
  const moveBut = document.querySelector(".move-button.first");
  const moveBut2 = document.querySelector(".move-button.second");

  if (window.innerWidth < 780) {
    moveBut.textContent = "MOVE TO DOWN v";
    moveBut2.textContent = "MOVE TO UP ^";
  } else {
    moveBut.textContent = "MOVE TO RIGHT >";
    moveBut2.textContent = "< MOVE TO LEFT";
  }
}

// Run the function on page load and whenever the window is resized
window.addEventListener("resize", updateButton);
window.addEventListener("load", updateButton);
