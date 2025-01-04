document.addEventListener("DOMContentLoaded", () => {
  // Selecting elements
  const addButton = document.getElementById("addButton");
  const itemInput = document.getElementById("itemInput");
  const todoList = document.querySelector(".list-container .list:first-child");
  const completeList = document.querySelector(
    ".list-container .list:last-child"
  );
  const moveButtons = document.querySelectorAll(".move-button");
  const removeButton = document.getElementById("removeButton");

  // Function to save items to localStorage
  const saveToLocalStorage = () => {
    const getItems = (list) =>
      Array.from(list.querySelectorAll(".list-item")).map((item) => ({
        text: item.textContent,
        selected: item.classList.contains("selected"),
      }));

    const data = {
      todo: getItems(todoList),
      complete: getItems(completeList),
    };
    localStorage.setItem("todoData", JSON.stringify(data));
  };

  // Function to load items from localStorage
  const loadFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("todoData")) || {
      todo: [],
      complete: [],
    };
    const createItem = (item, container) => {
      const newItem = document.createElement("div");
      newItem.className = "list-item";
      newItem.textContent = item.text;
      if (item.selected) newItem.classList.add("selected");

      // Attach toggleSelection event
      newItem.addEventListener("click", toggleSelection);
      container.appendChild(newItem);
    };

    // Clear current lists and populate with saved data
    todoList.innerHTML = '<div class="list-title bot">To-Do List</div>';
    completeList.innerHTML = '<div class="list-title">Complete List</div>';
    data.todo.forEach((item) => createItem(item, todoList));
    data.complete.forEach((item) => createItem(item, completeList));
  };

  // Function to toggle selection of items
  const toggleSelection = (event) => {
    if (event.target.classList.contains("list-item")) {
      event.target.classList.toggle("selected");
      saveToLocalStorage();
    }
  };

  // Function to add an item to the To-Do List
  addButton.addEventListener("click", () => {
    const itemText = itemInput.value.trim();
    if (itemText) {
      const newItem = document.createElement("div");
      newItem.className = "list-item";
      newItem.textContent = itemText;

      // Attach toggleSelection event
      newItem.addEventListener("click", toggleSelection);
      todoList.appendChild(newItem);
      itemInput.value = ""; // Clear input field
      saveToLocalStorage();
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
    saveToLocalStorage();
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
    saveToLocalStorage();
  });

  // Function to remove selected items
  removeButton.addEventListener("click", () => {
    const selectedItems = Array.from(
      document.querySelectorAll(".list-item.selected")
    );
    selectedItems.forEach((item) => item.remove());
    saveToLocalStorage();
  });

  // Update heading text based on window size
  const updateHeading = () => {
    const topele = document.querySelector(".topele h1");
    topele.textContent =
      window.innerWidth < 750
        ? "Welcome to Js"
        : "Welcome to JavaScript Project";
  };

  // Update button text based on window size
  const updateButton = () => {
    const moveBut = document.querySelector(".move-button.first");
    const moveBut2 = document.querySelector(".move-button.second");
    if (window.innerWidth < 780) {
      moveBut.textContent = "MOVE TO DOWN v";
      moveBut2.textContent = "MOVE TO UP ^";
    } else {
      moveBut.textContent = "MOVE TO RIGHT >";
      moveBut2.textContent = "< MOVE TO LEFT";
    }
  };

  // Event listeners for responsive text updates
  window.addEventListener("resize", () => {
    updateHeading();
    updateButton();
  });

  window.addEventListener("load", () => {
    updateHeading();
    updateButton();
  });

  // Load saved items from localStorage on page load
  loadFromLocalStorage();
});
