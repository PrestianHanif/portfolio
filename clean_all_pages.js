const fs = require('fs');
const path = require('path');

const suiteDir = 'C:\\Users\\MIPS-MOBILE\\.gemini\\antigravity-ide\\scratch\\mips-academic-suite';

function getCleanSwitcher(activePage) {
  const isDs = (activePage === 'datasantri') ? 'active' : '';
  const isDg = (activePage === 'dataguru') ? 'active' : '';
  const isPmb = (activePage === 'pmb') ? 'active' : '';

  return `<!-- FLOATING DEMO NAVIGATION SWITCHER -->
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
  <a href="index.html" class="demo-pill ${isDs}">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    <span>Data Santri</span>
  </a>
  <a href="dataguru.html" class="demo-pill ${isDg}">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span>Data Guru</span>
  </a>
  <a href="pmb.html" class="demo-pill ${isPmb}">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    <span>Portal PMB</span>
  </a>
  <a href="portfolio.html" class="career-link">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    <span>Overview &amp; CV</span>
  </a>
</div>`;
}

const files = [
  { name: 'index.html', active: 'datasantri' },
  { name: 'datasantri.html', active: 'datasantri' },
  { name: 'dataguru.html', active: 'dataguru' },
  { name: 'pmb.html', active: 'pmb' }
];

files.forEach(f => {
  const filePath = path.join(suiteDir, f.name);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip anything before <!DOCTYPE html>
  const docIdx = content.indexOf('<!DOCTYPE html>');
  if (docIdx > 0) {
    content = content.substring(docIdx);
  }

  // Strip all switcher bars and styles
  content = content.replace(/<!-- FLOATING DEMO NAVIGATION SWITCHER -->[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<style>[\s\S]*?\.demo-suite-bar[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<div class="demo-suite-bar">[\s\S]*?<\/div>/gi, '');
  
  // Also strip any residual mojibake tags
  content = content.replace(/ðŸ[^\s<"]*/g, '');

  // Find </body>
  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd !== -1) {
    const switcher = getCleanSwitcher(f.active);
    content = content.substring(0, bodyEnd) + switcher + '\n' + content.substring(bodyEnd);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Pristine clean SVG switcher written to ${f.name}`);
});
