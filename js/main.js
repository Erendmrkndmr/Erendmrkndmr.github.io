// Theme toggle
const toggle = document.getElementById('toggle-theme');
toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  toggle.innerText = next === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Search filter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  const cards = document.querySelectorAll(".blog-card");
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword) ? "block" : "none";
  });
});
