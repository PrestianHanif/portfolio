const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\MIPS-MOBILE\\.gemini\\antigravity-ide\\scratch\\mips-academic-suite\\portfolio.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the navbar tabs
const oldNavRegex = /<div class="suite-nav-pills" id="suiteTabs"[\s\S]*?<\/div>/;
const newNav = `<div class="suite-nav-pills" id="suiteTabs">
          <a href="portfolio.html" class="nav-link active">
            <i class="fas fa-layer-group"></i> <span>Overview &amp; Architecture</span>
          </a>
          <a href="index.html" class="nav-link">
            <i class="fas fa-user-graduate"></i> <span>Aplikasi: Data Santri</span>
          </a>
          <a href="dataguru.html" class="nav-link">
            <i class="fas fa-chalkboard-teacher"></i> <span>Aplikasi: Data Guru</span>
          </a>
          <a href="pmb.html" class="nav-link">
            <i class="fas fa-file-signature"></i> <span>Aplikasi: Portal PMB</span>
          </a>
          <a href="#career-kit" class="nav-link">
            <i class="fas fa-briefcase"></i> <span>LinkedIn &amp; Glints Kit</span>
          </a>
        </div>`;

content = content.replace(oldNavRegex, newNav);

// Update module card buttons
content = content.replace(
  /<button class="btn btn-outline-info w-100 rounded-pill fw-bold"[^>]*>[\s\S]*?<\/button>/,
  '<a href="dataguru.html" class="btn btn-outline-info w-100 rounded-pill fw-bold"><i class="fas fa-external-link-alt me-1"></i> Buka Aplikasi Data Guru &rarr;</a>'
);
content = content.replace(
  /<button class="btn btn-outline-success w-100 rounded-pill fw-bold"[^>]*>[\s\S]*?<\/button>/,
  '<a href="index.html" class="btn btn-outline-success w-100 rounded-pill fw-bold"><i class="fas fa-external-link-alt me-1"></i> Buka Aplikasi Data Santri &rarr;</a>'
);
content = content.replace(
  /<button class="btn btn-outline-warning w-100 rounded-pill fw-bold"[^>]*>[\s\S]*?<\/button>/,
  '<a href="pmb.html" class="btn btn-outline-warning w-100 rounded-pill fw-bold"><i class="fas fa-external-link-alt me-1"></i> Buka Aplikasi Portal PMB &rarr;</a>'
);

// Remove the mock simulation tab panes: pane-dataguru, pane-datasantri, pane-pmb
// Find where pane-dataguru starts and where pane-careerkit starts
const paneDgStart = content.indexOf('<!-- ==================== PANE 2: LIVE SIM TENDIK ==================== -->');
const paneCkStart = content.indexOf('<!-- ==================== PANE 5: LINKEDIN & GLINTS CAREER KIT ==================== -->');

if (paneDgStart !== -1 && paneCkStart !== -1) {
  content = content.substring(0, paneDgStart) + '\n<div id="career-kit">\n' + content.substring(paneCkStart) + '\n</div>\n';
}

// Add the clean SVG bottom switcher bar
const switcherHtml = `<!-- FLOATING DEMO NAVIGATION SWITCHER -->
<style>
.demo-suite-bar {
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 165, 233, 0.35);
  border-radius: 50px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.5), 0 0 25px rgba(14,165,233,0.25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: all 0.3s ease;
}
.demo-suite-bar:hover {
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 35px rgba(14,165,233,0.35);
}
.demo-suite-bar .suite-brand {
  font-size: 0.74rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-right: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.15);
}
.demo-suite-bar a.demo-pill {
  padding: 7px 15px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.demo-suite-bar a.demo-pill:hover {
  color: #ffffff;
  background: rgba(255,255,255,0.12);
  transform: translateY(-1px);
}
.demo-suite-bar a.demo-pill.active {
  background: linear-gradient(135deg, #0284c7, #0ea5e9);
  color: #ffffff !important;
  box-shadow: 0 3px 12px rgba(14, 165, 233, 0.45);
}
.demo-suite-bar .career-link {
  color: #34d399;
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
  padding-left: 12px;
  border-left: 1px solid rgba(255,255,255,0.15);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.demo-suite-bar .career-link:hover {
  color: #a7f3d0;
  transform: translateY(-1px);
}
@media (max-width: 768px) {
  .demo-suite-bar {
    bottom: 12px;
    padding: 5px 8px;
    gap: 4px;
    max-width: 96vw;
    overflow-x: auto;
  }
  .demo-suite-bar .suite-brand { display: none; }
  .demo-suite-bar a.demo-pill { font-size: 0.72rem; padding: 5px 9px; }
}
</style>
<div class="demo-suite-bar">
  <div class="suite-brand">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    <span>MIPS SUITE</span>
  </div>
  <a href="index.html" class="demo-pill">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    <span>Data Santri</span>
  </a>
  <a href="dataguru.html" class="demo-pill">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span>Data Guru</span>
  </a>
  <a href="pmb.html" class="demo-pill">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    <span>Portal PMB</span>
  </a>
  <a href="portfolio.html" class="career-link active">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    <span>Overview &amp; CV</span>
  </a>
</div>`;

// Strip any existing switcher from portfolio.html
content = content.replace(/<!-- FLOATING DEMO NAVIGATION SWITCHER -->[\s\S]*?<\/div>/gi, '');
content = content.replace(/<style>[\s\S]*?\.demo-suite-bar[\s\S]*?<\/style>/gi, '');
content = content.replace(/<div class="demo-suite-bar">[\s\S]*?<\/div>/gi, '');

content = content.replace('</body>', `${switcherHtml}\n</body>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated portfolio.html!');
