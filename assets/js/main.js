// Main Javascript for SIM Tendik MIPS
console.log('SIM Tendik MIPS JS loaded.');

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
});

/* ---- Sidebar Toggle ---- */
function initSidebar() {
  const toggle = document.querySelector('.topbar-toggle') || document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (overlay) overlay.classList.toggle('show');
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      });
    }
  }


}
