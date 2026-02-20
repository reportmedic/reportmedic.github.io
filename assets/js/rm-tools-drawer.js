/* ReportMedic — All Tools drawer for tool pages.
   Keep this list in sync with /tools/*.html so every tool stays in the menu. */
(function(){
  const tools = [
    { id:'compare-two-files-find-differences', name:'Report Compare', icon:'≋', desc:'Compare two files or report extracts to find row/column differences, missing values, an…' },
    { id:'compare-two-spreadsheets', name:'Spreadsheet Compare', icon:'≋', desc:'Compare two spreadsheets (XLSX/CSV) to spot changed cells, added/removed rows and colum…' },
    { id:'compare-two-texts-side-by-side', name:'Text Compare', icon:'↔', desc:'Compare two blocks of text side-by-side with Notepad++-style highlights for added, remo…' },
    { id:'reconcile-two-datasets-totals-dont-match', name:'Reconciliation', icon:'✓', desc:'Reconcile two report outputs: match keys, compare totals, quantify variances, and isola…' },
    { id:'validate-data-schema-and-columns', name:'Schema Validator', icon:'⊢', desc:'Validate files against basic rules: required columns, formats, dates, numeric ranges, a…' },
    { id:'null-missingness-heatmap', name:'Null Heatmap', icon:'▥', desc:'See missingness per column and by segment with a quick heatmap, so you can spot broken…' },
    { id:'find-data-outliers-and-anomalies', name:'Outlier Finder', icon:'⚡', desc:'Detect unusual values, spikes, and anomalies that cause report swings—great for QA on m…' },
    { id:'summarize-data-by-group-pivot-online', name:'Quick Pivot', icon:'▦', desc:'Create quick summaries and pivots to sanity-check totals by category/date/store/etc.' },
    { id:'clean-dirty-data-file-online', name:'Clean Data for Reporting', icon:'✦', desc:'Clean CSV/Excel-style data for reporting: trim whitespace, normalize formats, remove bl…' },
    { id:'auto-map-and-rename-columns', name:'Column Mapper', icon:'⤧', desc:'Auto-suggest column mappings between two files and generate a renamed copy + mapping JS…' },
    { id:'check-date-timezone-drift', name:'Timezone Drift Checker', icon:'🕒', desc:'Detect day/hour shifts and timezone drift between two exports by comparing date distrib…' },
    { id:'schedule-data-validation-checks', name:'Run Scheduler', icon:'⏱', desc:'Run repeat checks on your report process: reminders, recurring validation runs, and a s…' },
    { id:'why-two-reports-dont-match', name:'Why Reports Don’t Match', icon:'✎', desc:'Keep an audit trail while diagnosing report mismatches—capture findings, evidence, acti…' },
    { id:'mask-sensitive-data-before-sharing', name:'PII Masker', icon:'◎', desc:'Redact or mask sensitive fields (PII/PHI/financial) before sending files for review.' },
    { id:'fix-export-formatting-errors', name:'Export Fixer', icon:'⇣', desc:'Package your inputs, outputs, and findings into a shareable bundle for review—useful wh…' },
    { id:'online-notepad-rich-text-editor', name:'Online Notepad', icon:'🗒', desc:'Online notepad with rich-text formatting.' },
    { id:'markdown-to-html', name:'Markdown → HTML', icon:'⌁', desc:'Convert Markdown to clean HTML for emails, docs, or web pages.' },
    { id:'html-to-markdown', name:'HTML → Markdown', icon:'⌁', desc:'Convert HTML into readable Markdown you can version, edit, and reuse.' },
    { id:'markdown-to-pdf', name:'Markdown → PDF', icon:'⎙', desc:'Convert Markdown to a polished PDF you can send with confidence.' },
    { id:'markdown-to-word-docx', name:'Markdown → Word', icon:'W', desc:'Convert Markdown into a Word document (.docx) for sharing with teams.' },
    { id:'word-docx-to-markdown', name:'Word → Markdown', icon:'W', desc:'Convert a Word document (.docx) into clean Markdown for editing and version control.' },
    { id:'pdf-organizer-merge-split-reorder', name:'PDF Organizer', icon:'📄', desc:'Merge PDFs, split/extract page ranges, and reorder pages.' },
    { id:'compress-pdf-reduce-file-size', name:'Compress PDF', icon:'📄', desc:'Compress a PDF to reduce file size for email and upload portals.' },
    { id:'pdf-to-jpg-and-jpg-to-pdf', name:'PDF ↔ JPG', icon:'📄', desc:'Convert PDF pages to images (JPG/PNG) and convert images to a single PDF.' },
    { id:'image-resize-compress', name:'Resize / Compress Image', icon:'🖼', desc:'Resize and compress images (JPG/PNG/WebP) locally in your browser.' },
    { id:'pdf-to-word-docx', name:'PDF → Word', icon:'📄', desc:'Convert a PDF into an editable Word (.docx) by extracting text locally in your browser.' },
    { id:'pdf-to-markdown', name:'PDF → Markdown', icon:'📄', desc:'Convert a PDF into editable Markdown.' },
    { id:'csv-to-pdf', name:'CSV → PDF', icon:'📄', desc:'Convert CSV/TSV exports to a clean, shareable PDF snapshot.' },
    { id:'excel-to-pdf', name:'Excel → PDF', icon:'📄', desc:'Convert Excel (XLSX/XLS) to a clean PDF snapshot you can share.' },
  ];

  const routes = Object.fromEntries(tools.map(t => [t.id, `/tools/${t.id}.html`]));

  function el(tag, attrs={}, html){
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k,v])=>{
      if(k === "class") n.className = v;
      else if(k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    });
    if(html != null) n.innerHTML = html;
    return n;
  }

  function currentToolId(){
    const path = (window.location.pathname || "").toLowerCase();
    const m = path.match(/\/tools\/(.+?)\.html$/);
    return m ? m[1] : null;
  }

  function ensureDrawer(){
    let overlay = document.getElementById("rmOverlay");
    let drawer  = document.getElementById("rmDrawer");
    if(overlay && drawer) return { overlay, drawer };

    overlay = el("div", { id:"rmOverlay", class:"drawerOverlay", "aria-hidden":"true" });
    drawer = el("aside", { id:"rmDrawer", class:"drawer", "aria-label":"All Tools Drawer" });

    const header = el("div", { class:"drawerHeader" });
    const closeBtn = el("button", { id:"rmCloseDrawerBtn", class:"btn", type:"button", text:"Close" });
    const title = el("strong", { text:`All Tools (${tools.length})` });
    const spacer = el("div", { class:"spacer" });

    header.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(spacer);

    const list = el("div", { class:"drawerList", id:"rmDrawerList" });

    drawer.appendChild(header);
    drawer.appendChild(list);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    const active = currentToolId();
    list.innerHTML = "";
    tools.forEach(t=>{
      const a = el("a", { class:"drawerRow", href: routes[t.id] || "#", "data-tool": t.id });
      a.innerHTML = `
        <div class="drawerIcon" aria-hidden="true">${t.icon || ""}</div>
        <div style="min-width:0">
          <div class="rTitle">${t.name}</div>
          <div class="rDesc">${t.desc}</div>
        </div>
      `;
      if(active && active === t.id){
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      list.appendChild(a);
    });

    return { overlay, drawer };
  }

  function openDrawer(){
    const { overlay, drawer } = ensureDrawer();
    overlay.style.display = "block";
    drawer.classList.add("open");
    document.body.classList.add("rmNoScroll");
  }

  function closeDrawer(){
    const overlay = document.getElementById("rmOverlay");
    const drawer  = document.getElementById("rmDrawer");
    if(!overlay || !drawer) return;
    overlay.style.display = "none";
    drawer.classList.remove("open");
    document.body.classList.remove("rmNoScroll");
  }

  function init(){
    const btn = document.getElementById("openDrawerBtn");
    if(btn){
      btn.addEventListener("click", (e)=>{ e.preventDefault(); openDrawer(); });
    }

    const { overlay } = ensureDrawer();
    overlay.addEventListener("click", closeDrawer);

    const closeBtn = document.getElementById("rmCloseDrawerBtn");
    if(closeBtn) closeBtn.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") closeDrawer();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
