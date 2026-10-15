/* ============================================
   DataSantriMIPS — Main Application JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initSidebar();
  initNavbarScroll();
  initTooltips();
  initDeleteConfirm();
  initFormValidation();
  // populateStatusFilter(); // Disabled: Conflicts with dynamic DB data
  initSearchFilter();
  initPasswordToggle();
  initGlobalLoader();
});

/* ---- Global Loader ---- */
function initGlobalLoader() {
  // Show global loader on form submit if valid
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.classList.contains('no-loader') && this.checkValidity()) {
        const loader = document.getElementById('globalLoader');
        if (loader) loader.classList.remove('d-none');
        
        // Disable submit buttons to prevent double click
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
           btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Memproses...';
           btn.classList.add('disabled');
        }
      }
    });
  });

  // Show global loader on delete / action links that require confirmation
  document.querySelectorAll('a[onclick*="return confirm"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      setTimeout(() => {
        if (!e.defaultPrevented) {
          const loader = document.getElementById('globalLoader');
          if (loader) loader.classList.remove('d-none');
        }
      }, 50);
    });
  });
}

/* ---- Populate Status Filter from Master Data ---- */
function populateStatusFilter() {
  const filterStatus = document.getElementById('filterStatus');
  if (!filterStatus || typeof MOCK_DATA === 'undefined' || !MOCK_DATA.statusSantri) return;

  // Preserve only the "Semua Status" default option
  filterStatus.innerHTML = '<option value="">Semua Status</option>';

  MOCK_DATA.statusSantri.forEach(status => {
    const option = document.createElement('option');
    option.value = status.kode;
    option.textContent = status.nama;
    filterStatus.appendChild(option);
  });
}

/* ---- Sidebar Toggle ---- */
function initSidebar() {
  const toggle = document.querySelector('.topbar-toggle') || document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

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

  // Submenu toggles
  document.querySelectorAll('.sidebar-link[data-bs-toggle="collapse"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const isOpen = target.classList.contains('show');
        target.classList.toggle('show');
        this.setAttribute('aria-expanded', !isOpen);
      }
    });
  });
}

/* ---- Navbar scroll effect ---- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-public');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Tooltips ---- */
function initTooltips() {
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  }
}

/* ---- Delete confirmation ---- */
function initDeleteConfirm() {
  document.querySelectorAll('[data-confirm]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const msg = this.getAttribute('data-confirm') || 'Apakah Anda yakin ingin menghapus data ini?';
      if (!confirm(msg)) {
        e.preventDefault();
      }
    });
  });
}

/* ---- Form Validation ---- */
function initFormValidation() {
  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });

  // NIK format (16 digits)
  document.querySelectorAll('.nik-input').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').substring(0, 16);
      if (this.value.length === 16) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      } else if (this.value.length > 0) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
      }
    });
  });

  // NISN format (10 digits)
  document.querySelectorAll('.nisn-input').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').substring(0, 10);
    });
  });

  // Phone format
  document.querySelectorAll('.phone-input').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d+\-\s]/g, '');
    });
  });

  // Name format (Title Case, allow letters, spaces, hyphens, and single quotes)
  document.querySelectorAll('.name-input').forEach(input => {
    input.addEventListener('input', function() {
      // Allow only letters, spaces, hyphens, and single quotes
      let val = this.value.replace(/[^A-Za-z\s'\-]/g, '');
      
      // Auto Title Case
      val = val.split(/([\s\-])/).map(word => {
         if(word.match(/[\s\-]/)) return word; // keep separators
         if(word.startsWith("'") && word.length > 1) {
             return "'" + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
         }
         if(word.length > 0) {
             return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
         }
         return word;
      }).join('');
      
      this.value = val;
    });
  });
}

/* ---- Search & Filter ---- */
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const filterTA = document.getElementById('filterTA');
  const filterProgram = document.getElementById('filterProgram');
  const filterKelas = document.getElementById('filterKelas');
  const filterStatus = document.getElementById('filterStatus');

  function applyFilters() {
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const ta = filterTA ? filterTA.value : '';
    const program = filterProgram ? filterProgram.value : '';
    const kelas = filterKelas ? filterKelas.value : '';
    const status = filterStatus ? filterStatus.value : '';

    const rows = document.querySelectorAll('.data-table-body tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowTA = row.dataset.ta || '';
      const rowProgram = row.dataset.program || '';
      const rowKelas = row.dataset.kelas || '';
      const rowStatus = row.dataset.status || '';

      let show = true;
      if (search && !text.includes(search)) show = false;
      if (ta && rowTA !== ta) show = false;
      if (program && rowProgram !== program) show = false;
      if (kelas && rowKelas !== kelas) show = false;
      if (status && rowStatus !== status) show = false;

      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Update count
    const countEl = document.getElementById('dataCount');
    if (countEl) {
      countEl.textContent = visibleCount;
    }
  }

  [searchInput, filterTA, filterProgram, filterKelas, filterStatus].forEach(el => {
    if (el) {
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', applyFilters);
    }
  });

  // Dynamic kelas filter based on program
  // Disabled: Conflicting with dynamic DB data in laporan.php
  /*
  if (filterProgram && filterKelas) {
    filterProgram.addEventListener('change', function() {
      const progId = parseInt(this.value);
      filterKelas.innerHTML = '<option value="">Semua Kelas</option>';
      if (progId && typeof MOCK_DATA !== 'undefined') {
        MOCK_DATA.kelas
          .filter(k => k.program_id === progId)
          .forEach(k => {
            filterKelas.innerHTML += `<option value="${k.nama}">${k.nama}</option>`;
          });
      }
    });
  }
  */
}

/* ---- Password Toggle ---- */
function initPasswordToggle() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.closest('.input-icon-wrapper').querySelector('input');
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      }
    });
  });
}

/* ---- Drag & Drop Import ---- */
function initImportZone() {
  const zone = document.querySelector('.import-zone');
  if (!zone) return;

  ['dragenter', 'dragover'].forEach(evt => {
    zone.addEventListener(evt, e => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    zone.addEventListener(evt, e => {
      e.preventDefault();
      zone.classList.remove('dragover');
    });
  });

  zone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImportFile(files[0]);
    }
  });

  zone.addEventListener('click', () => {
    const input = document.getElementById('importFileInput');
    if (input) input.click();
  });
}

function handleImportFile(file) {
  const preview = document.getElementById('importPreview');
  const fileName = document.getElementById('importFileName');
  if (fileName) fileName.textContent = file.name;
  if (preview) {
    preview.style.display = 'block';
    preview.classList.add('animate-fade-in-up');
  }
}

/* ---- Utility Functions ---- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.innerHTML = `
    <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-x-circle-fill' : 'bi-info-circle-fill'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;';
  document.body.appendChild(container);
  return container;
}

// Prevent form submission on demo pages
document.addEventListener('submit', function(e) {
  if (e.target.closest('[data-demo]')) {
    e.preventDefault();
    showToast('Demo mode — data tidak disimpan ke database', 'info');
  }
});
