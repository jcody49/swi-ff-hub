document.addEventListener("DOMContentLoaded", () => {
  // --- Nav toggle ---
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // --- Accordion panels ---
  const headers = document.querySelectorAll("#league-info-panel h3");
  headers.forEach((header) => {
    let panelContent = [];
    let sibling = header.nextElementSibling;
    while (sibling && sibling.tagName !== "H3") {
      panelContent.push(sibling);
      sibling = sibling.nextElementSibling;
    }
    const wrapper = document.createElement("div");
    wrapper.classList.add("accordion-panel");
    panelContent.forEach(el => wrapper.appendChild(el));
    header.parentNode.insertBefore(wrapper, sibling);

    header.addEventListener("click", () => {
      const openPanel = document.querySelector(".accordion-panel.open");
      if (openPanel && openPanel !== wrapper) {
        openPanel.classList.remove("open");
        openPanel.previousElementSibling.classList.remove("active");
      }
      wrapper.classList.toggle("open");
      header.classList.toggle("active");
    });
  });

  // --- Table search filter ---
  const searchInput = document.getElementById('table-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const filter = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#stats-table tbody tr');
      rows.forEach(row => {
        const text = row.children[0].textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }

  // --- Table sorting ---
  document.querySelectorAll('.display th.sortable').forEach((header, index) => {
    header.addEventListener('click', () => {
      const table = header.closest('table');
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const asc = !header.classList.contains('sorted-asc');

      rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();
        if (!isNaN(aText) && !isNaN(bText)) return asc ? aText - bText : bText - aText;
        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });

      tbody.innerHTML = '';
      rows.forEach(row => tbody.appendChild(row));

      table.querySelectorAll('th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
      header.classList.add(asc ? 'sorted-asc' : 'sorted-desc');
    });
  });

  // --- Optional: DataTables init if you keep jQuery ---
  if (window.jQuery) {
    $('#stats-table').DataTable({
      pageLength: 5,
      lengthChange: false,
      searching: true,
      ordering: true
    });
  }
});
