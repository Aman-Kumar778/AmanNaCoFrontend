document.addEventListener("DOMContentLoaded", () => {
  // Select the contact-info div
  const contactInfo = document.querySelector(".contact-info");
  if (!contactInfo) {
    console.error("Contact info div not found!");
    return;
  }

  // Expanded data to be rendered
  const data = {
    Address: `<bold>Chandigarh University</bold> <br>NH-05, Ludhiana, Highway.<br>
    Chandigarh State, Punjab 140413`,

    Phone: `+1 (555) 123-4567<br>
  +1 (604) 987-6543<br>
  +1 (778) 111-2222`,

    Email: `contact@example.com<br>
  support@example.com<br>
  info@example.com`,

    Website: `<a href='https://example.com' target='_blank'>https://example.com</a><br>
  <a href='https://example2.com' target='_blank'>https://example2.com</a><br>
  <a href='https://example3.com' target='_blank'>https://example3.com</a>`,
  };

  // Select all icons
  const icons = document.querySelectorAll(".icon");
  if (icons.length === 0) {
    console.error("No icons found!");
    return;
  }

  // Add click event listeners to icons
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const key = icon.querySelector("span").textContent.trim();
      console.log(`Clicked on: ${key}`); // Debug log
      if (data[key]) {
        contactInfo.innerHTML = data[key];
        console.log(`Updated contact info: ${data[key]}`); // Debug log
      } else {
        console.error(`No data found for key: ${key}`);
      }
    });
  });

  console.log("Event listeners added successfully!");
});
