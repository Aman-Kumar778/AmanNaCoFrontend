document.addEventListener("DOMContentLoaded", function () {
  // defining the function for the toggel option of the nav elements
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    console.log("Hamburger clicked");
  });
  //  end of nav element
  const rgbSelects = document.querySelectorAll(".rgb-select");
  const cmySelects = document.querySelectorAll(".cmy-select");
  // generating the random colors
  const generateButton = document.querySelector(".generate-container button");
  let generateWebSafeColor = document.querySelector(
    ".generate2-container button"
  );

  // Populate dropdowns with values
  const populateDropdowns = () => {
    rgbSelects.forEach((select) => {
      for (let i = 0; i <= 255; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
      }
    });
    // Populate dropdowns with values
    cmySelects.forEach((select) => {
      for (let i = 0; i <= 255; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
      }
    });
  };

  // Initialize dropdowns and events
  populateDropdowns();
  rgbSelects.forEach((select) => {
    select.addEventListener("focus", () => select.setAttribute("size", "10"));
    select.addEventListener("blur", () => select.removeAttribute("size"));
    select.addEventListener("change", () => {
      select.blur(); // Close dropdown
      updateColor(); // Update display
    });
  });
  cmySelects.forEach((select) => {
    select.addEventListener("focus", () => select.setAttribute("size", "10"));
    select.addEventListener("blur", () => select.removeAttribute("size"));
    select.addEventListener("change", () => {
      select.blur(); // Close dropdown
      updatecmyColor(); // Update display
    });
  });

  // RGB Color Display
  function rgb() {
    const rgbHeadings = document.querySelectorAll(".rgb-heading");
    const zeroElements = document.querySelectorAll(".zeroCol");
    const redWords = document.querySelectorAll(".red-word");
    const greenWords = document.querySelectorAll(".green-word");
    const blueWords = document.querySelectorAll(".blue-word");

    rgbHeadings.forEach((el) => {
      el.innerHTML = `<span style="color:red">R</span>
                      <span style="color:green">G</span>
                      <span style="color:blue">B</span>`;
    });

    zeroElements.forEach((el) => {
      el.innerHTML = `<span style="color:red">0</span>
                      <span style="color:green">0</span>
                      <span style="color:blue">0</span>`;
    });

    redWords.forEach((el) => (el.style.color = "red"));
    greenWords.forEach((el) => (el.style.color = "green"));
    blueWords.forEach((el) => (el.style.color = "blue"));
  }

  // CMYK Color Display
  function CMYK() {
    const cmykHeadings = document.querySelectorAll(".cmy-heading");
    const cyanWords = document.querySelectorAll(".cyan-word");
    const magentaWords = document.querySelectorAll(".Mag-word");
    const yellowWords = document.querySelectorAll(".yelow-word");

    cmykHeadings.forEach((el) => {
      el.innerHTML = `<span style="color:cyan">C</span>
                      <span style="color:magenta">M</span>
                      <span style="color:yellow">Y</span>`;
    });

    cyanWords.forEach((el) => (el.style.color = "cyan"));
    magentaWords.forEach((el) => (el.style.color = "magenta"));
    yellowWords.forEach((el) => (el.style.color = "yellow"));
  }

  // Update Color Values
  function updateColor() {
    const red = parseInt(document.getElementById("red").value) || 0;
    const green = parseInt(document.getElementById("green").value) || 0;
    const blue = parseInt(document.getElementById("blue").value) || 0;

    const redFloat = (red / 255).toFixed(2);
    const greenFloat = (green / 255).toFixed(2);
    const blueFloat = (blue / 255).toFixed(2);

    const hex = `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`.toUpperCase();

    document.getElementById(
      "rgb-float"
    ).textContent = `(${redFloat}, ${greenFloat}, ${blueFloat})`;
    document.getElementById("rgb-hex").textContent = ` ${hex}`;
    document.getElementById(
      "color-display"
    ).style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }

  function updatecmyColor() {
    const cyan = parseInt(document.getElementById("cyann").value) || 0;
    const magenta = parseInt(document.getElementById("Magentaa").value) || 0;
    const yellow = parseInt(document.getElementById("Yelloww").value) || 0;

    //calculating the cym colors
    const cyanfloat = ((255 - cyan) / 255).toFixed(2);
    const magentafloat = ((255 - magenta) / 255).toFixed(2);
    const yellowfloat = ((255 - yellow) / 255).toFixed(2);

    const hex = `#${cyan.toString(16).padStart(2, "0")}${magenta
      .toString(16)
      .padStart(2, "0")}${yellow.toString(16).padStart(2, "0")}`.toUpperCase();

    document.getElementById(
      "cmy-float"
    ).textContent = `(${cyanfloat},${magentafloat},${yellowfloat})`;
    document.getElementById("cmy-hex").textContent = `${hex}`;
    document.getElementById(
      "color-display"
    ).style.backgroundColor = `rgb(${cyan}, ${magenta}, ${yellow})`;
  }

  // the generate rnadom colors effect
  // Function to generate a random color
  function generateRandomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    const hex = `#${Math.round(r * 255)
      .toString(16)
      .padStart(2, "0")}${Math.round(g * 255)
      .toString(16)
      .padStart(2, "0")}${Math.round(b * 255)
      .toString(16)
      .padStart(2, "0")}`;
    return {
      r: r.toFixed(2),
      g: g.toFixed(2),
      b: b.toFixed(2),
      hex,
    };
  }

  // Function to create a new row structure
  function createColorRow({ r, g, b, hex }) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between"; // Compact layout
    row.style.marginBottom = "5px";
    row.style.borderBottom = "1px solid #ccc";
    row.style.paddingBottom = "5px";

    // RGB Float Values
    const rgbFloat = document.createElement("div");
    rgbFloat.textContent = `(${r}, ${g}, ${b})`;
    rgbFloat.style.flex = "1";

    // Hexadecimal Value
    const hexValue = document.createElement("div");
    hexValue.textContent = hex;
    hexValue.style.flex = "1";

    // Display Color
    const colorDisplay = document.createElement("div");
    colorDisplay.style.backgroundColor = hex;
    colorDisplay.style.width = "30px"; // Reduce width
    colorDisplay.style.height = "20px";
    colorDisplay.style.border = "1px solid #000";

    row.appendChild(rgbFloat);
    row.appendChild(hexValue);
    row.appendChild(colorDisplay);

    return row;
  }

  // Function to generate and render colors
  function generateAndRenderColors() {
    const container = document.querySelector(".generate-container");

    // Remove existing colors container if it exists
    let colorsContainer = document.querySelector(".colors-container");
    if (!colorsContainer) {
      colorsContainer = document.createElement("div");
      colorsContainer.classList.add("colors-container");
      colorsContainer.style.marginTop = "10px";
      container.appendChild(colorsContainer);
    }
    // Clear previous colors
    colorsContainer.innerHTML = "";
    // Generate and append 8 random colors
    for (let i = 0; i < 8; i++) {
      const color = generateRandomColor();
      const colorRow = createColorRow(color);
      colorsContainer.appendChild(colorRow);
    }
  }

  // Attach the click event to the button
  if (generateButton) {
    generateButton.addEventListener("click", generateAndRenderColors);
  } else {
    console.error("Button not found!");
  }

  // Function to convert RGB values to Hexadecimal
  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  // Function to generate and display web-safe colors
  function displaySafeColors() {
    const increments = [0, 51, 102, 153, 204, 255];
    const colors = [];

    // Generate all possible web-safe colors
    for (let r of increments) {
      for (let g of increments) {
        for (let b of increments) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
    }

    // Get the container for displaying colors
    const displayContainer = document.getElementById(
      "color2-display-container"
    );

    // Clear any existing color grid
    displayContainer.innerHTML = "";

    // Create a container for the color grid
    const colorGrid = document.createElement("div");
    colorGrid.setAttribute("id", "display_web_safe_color");
    colorGrid.style.display = "grid";
    colorGrid.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(100px, 1fr))";
    colorGrid.style.gap = "10px";
    colorGrid.style.marginTop = "20px";

    // Populate the color grid with web-safe colors
    colors.forEach((color) => {
      const [r, g, b] = color.match(/\d+/g).map(Number);
      const div = document.createElement("div");
      div.className = "box_display_web_safe_color";
      div.style.backgroundColor = color;
      div.textContent = rgbToHex(r, g, b);
      div.style.color = "#d8c5c5";
      div.style.textAlign = "center";
      div.style.fontSize = "0.8rem";
      div.style.fontWeight = "bold";
      div.style.padding = "10px";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "5px";

      colorGrid.appendChild(div);
    });

    // Append the color grid to the container
    displayContainer.appendChild(colorGrid);
  }
  if (generateWebSafeColor) {
    generateWebSafeColor.addEventListener("click", displaySafeColors);
  } else {
    console.error("Button not found!");
  }

  // Initialize colors and dropdowns
  rgb();
  CMYK();
  updateColor();
  updatecmyColor();
});
