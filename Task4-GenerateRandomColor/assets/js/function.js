document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    console.log("Hamburger clicked"); 
  });

  const contactInfo = document.querySelector(".contact-info");

  const data = {
    Address: "9889 University Crescent<br>Burnaby, V5A 4Z2<br>BC, Canada",
    Phone: "+1 (555) 123-4567",
    Email: "contact@example.com",
    Website:
      "<a href='https://example.com' target='_blank'>https://example.com</a>",
  };

  document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const key = icon.querySelector("span").textContent.trim();
      if (data[key]) {
        contactInfo.innerHTML = data[key]; // Replace content dynamically
      } else {
        console.error(`No data found for key: ${key}`);
      }
    });
  });
});
