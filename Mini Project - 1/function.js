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

  let undoStack = []; // Stack to hold removed items for undo

  // Function to show toast notification with optional undo
  const showToast = (message, undoCallback = null) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    if (undoCallback) {
      const undoButton = document.createElement("button");
      undoButton.textContent = "UNDO";
      undoButton.className = "undo-button";
      undoButton.addEventListener("click", () => {
        undoCallback();
        toast.remove();
      });
      toast.appendChild(undoButton);

      // Progress bar for undo
      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      toast.appendChild(progressBar);

      let width = 100;
      const interval = setInterval(() => {
        width -= 1;
        progressBar.style.width = width + "%";
        if (width <= 0) {
          clearInterval(interval);
          toast.remove();
        }
      }, 50); // 5 seconds total (100 * 50ms)
    }

    document.body.appendChild(toast);

    // Auto-remove toast after 5 seconds if undo is not clicked
    if (!undoCallback) {
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  };

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
    if (!itemText) {
      return; // Ignore empty input
    }

    const checkDuplicate = Array.from(
      document.querySelectorAll(".list-item")
    ).some((item) => item.textContent === itemText);

    if (checkDuplicate) {
      showToast("Item already exists. You cannot add it again.");
      return;
    }

    const newItem = document.createElement("div");
    newItem.className = "list-item";
    newItem.textContent = itemText;

    newItem.addEventListener("click", toggleSelection);
    todoList.appendChild(newItem);
    itemInput.value = "";
    saveToLocalStorage();
    showToast("Item is added to the To-Do List.");
  });

  // Function to move items between lists
  moveButtons[0].addEventListener("click", () => {
    const selectedItems = Array.from(
      todoList.querySelectorAll(".list-item.selected")
    );
    selectedItems.forEach((item) => {
      todoList.removeChild(item);
      completeList.appendChild(item);
      item.classList.remove("selected");
    });
    saveToLocalStorage();
    showToast("Item(s) moved to the Complete List!");
  });

  moveButtons[1].addEventListener("click", () => {
    const selectedItems = Array.from(
      completeList.querySelectorAll(".list-item.selected")
    );
    selectedItems.forEach((item) => {
      completeList.removeChild(item);
      todoList.appendChild(item);
      item.classList.remove("selected");
    });
    saveToLocalStorage();
    showToast("Item(s) moved to the To-Do List!");
  });

  // Function to remove selected items
  removeButton.addEventListener("click", () => {
    const selectedItems = Array.from(
      document.querySelectorAll(".list-item.selected")
    );

    if (selectedItems.length === 0) {
      showToast("No items selected to remove.");
      return;
    }

    undoStack = selectedItems.map((item) => {
      return {
        element: item,
        parent: item.parentElement,
      };
    });

    selectedItems.forEach((item) => item.remove());
    saveToLocalStorage();

    showToast("Item(s) removed successfully!", () => {
      // Undo action
      undoStack.forEach(({ element, parent }) => {
        parent.appendChild(element);
        element.classList.remove("selected");
      });
      undoStack = [];
      saveToLocalStorage();
    });
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
