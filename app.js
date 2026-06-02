document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tool-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');

  // Search filter function
  function filterTools() {
    const query = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

    toolCards.forEach(card => {
      const title = card.querySelector('.tool-title').textContent.toLowerCase();
      const desc = card.querySelector('.tool-desc').textContent.toLowerCase();
      const categories = card.dataset.categories.split(' ');

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease-out forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Handle Search Input
  searchInput.addEventListener('input', filterTools);

  // Handle Category Filters
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterTools();
    });
  });
});
