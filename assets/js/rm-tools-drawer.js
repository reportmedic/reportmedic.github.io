/* ReportMedic — All Tools drawer (v2)
   Injected on every tool page. Grouped by category, searchable, 56 tools.
   Auto-marks the current page as active in the list. */
(function(){

  /* ─────────────────────────────────────────
     TOOL REGISTRY  (56 tools, matches index.html)
  ───────────────────────────────────────── */
  const tools = [
    // ── Compare
    { id:"compare-two-files-find-differences",       name:"Report Compare",               icon:"≋",  cat:["Compare","Analyze"],   desc:"Compare two reports and pinpoint exactly what changed row by row." },
    { id:"compare-two-spreadsheets",                 name:"Spreadsheet Compare",           icon:"▦",  cat:["Compare"],             desc:"Compare two spreadsheets (XLSX/CSV) to spot changed cells, added/removed rows and columns." },
    { id:"compare-two-texts-side-by-side",           name:"Text Compare",                 icon:"↔",  cat:["Compare"],             desc:"Compare two texts side-by-side and spot exactly what changed." },
    { id:"reconcile-two-datasets-totals-dont-match", name:"Reconciliation",               icon:"✓",  cat:["Compare","Validate"],  desc:"Match totals, quantify variance, and explain gaps between two datasets." },

    // ── Clean
    { id:"clean-dirty-data-file-online",             name:"Data Cleaner",                 icon:"✦",  cat:["Clean"],               desc:"Trim, normalize, dedupe, fix dates, and standardize formats automatically." },
    { id:"mask-sensitive-data-before-sharing",       name:"PII Masker",                   icon:"◎",  cat:["Clean","Export"],      desc:"Detect and mask sensitive fields (emails, phones, IDs) for safe sharing." },
    { id:"fix-export-formatting-errors",             name:"Export Fixer",                 icon:"⇣",  cat:["Clean","Export"],      desc:"Repair export formatting issues and generate clean, consistent outputs." },

    // ── Validate
    { id:"validate-data-schema-and-columns",         name:"Schema Validator",             icon:"⊢",  cat:["Validate"],            desc:"Validate required fields, data types, ranges, and null rules against a schema." },
    { id:"find-data-outliers-and-anomalies",         name:"Outlier Finder",               icon:"⚡", cat:["Analyze","Validate"],  desc:"Detect spikes, anomalies, and suspicious rows instantly." },
    { id:"check-date-timezone-drift",                name:"Date & Timezone Drift Checker",icon:"🕒", cat:["Validate"],            desc:"Detect day/hour shifts and timezone drift between two exports by comparing date distributions." },
    { id:"schedule-data-validation-checks",          name:"Run Scheduler",                icon:"⏱", cat:["Export","Validate"],   desc:"Save a run config and repeat validation checks on fresh files." },

    // ── Analyze
    { id:"summarize-data-by-group-pivot-online",     name:"Quick Pivot",                  icon:"▦",  cat:["Analyze"],             desc:"Instant pivot tables & group summaries — counts, sums, and averages." },
    { id:"null-missingness-heatmap",                 name:"Null & Missingness Heatmap",   icon:"▧",  cat:["Analyze"],             desc:"Visualize missingness per column and by segment so you spot broken fields before reporting." },
    { id:"auto-map-and-rename-columns",              name:"Column Mapping Helper",         icon:"⇄",  cat:["Analyze"],             desc:"Auto-suggest column mappings between two files and generate a renamed copy + mapping JSON." },
    { id:"data-profiler-column-stats-groupby-charts",name:"Data Profiler",                icon:"📊", cat:["Analyze"],             desc:"Profile any CSV/XLSX: column stats, groupby summaries, and distribution charts in one view." },
    { id:"phrase-occurrence-counter",                name:"Phrase Occurrence Counter",     icon:"🔢", cat:["Analyze"],             desc:"Count how often specific words or phrases appear in any text or data file." },
    { id:"query-csv-with-sql-online",                name:"SQL Query on CSV",             icon:"⌗",  cat:["Analyze"],             desc:"Run SQL SELECT queries directly on CSV/XLSX files in your browser — no database needed." },
    { id:"python-code-runner",                       name:"Python Code Runner",           icon:"🐍", cat:["Analyze"],             desc:"Run Python code locally in your browser with a fast editor, optional stdin, and shareable links." },
    { id:"ipynb-viewer",                             name:"Jupyter Notebook Viewer",      icon:"📓", cat:["Analyze","Export"],    desc:"Open and render Jupyter Notebook (.ipynb) files — view code cells, outputs, Markdown, and plots." },
    { id:"disk-analyzer",                            name:"Disk Space Analyzer",          icon:"💾", cat:["Analyze"],             desc:"Analyze any local folder and see exactly what's using disk space — tree, treemap, and file type breakdown." },
    { id:"eu-datasets",                              name:"EU Datasets",                  icon:"🇪🇺", cat:["Analyze"],             desc:"Browse 100 ready-to-use EU datasets across demographics, economy, health, housing, energy and more." },
    { id:"india-datasets",                           name:"India Datasets",               icon:"🇮🇳", cat:["Analyze"],             desc:"Browse 100 ready-to-use India datasets across demographics, economy, health, housing, energy and more." },
    { id:"usa-datasets",                             name:"USA Datasets",                 icon:"🇺🇸", cat:["Analyze"],             desc:"Browse 100 ready-to-use USA datasets across demographics, economy, health, housing, energy and more." },

    // ── Convert
    { id:"markdown-to-html",                         name:"Markdown → HTML",              icon:"⌁",  cat:["Convert"],             desc:"Convert Markdown into clean, preview-ready HTML." },
    { id:"html-to-markdown",                         name:"HTML → Markdown",              icon:"⌁",  cat:["Convert"],             desc:"Convert any HTML into plain Markdown." },
    { id:"markdown-to-pdf",                          name:"Markdown → PDF",               icon:"⎙",  cat:["Convert"],             desc:"Turn a Markdown document into a printable PDF." },
    { id:"markdown-to-word-docx",                    name:"Markdown → Word",              icon:"W",  cat:["Convert"],             desc:"Convert Markdown into a fully formatted .docx Word file." },
    { id:"word-docx-to-markdown",                    name:"Word → Markdown",              icon:"W",  cat:["Convert"],             desc:"Convert a .docx file into clean, portable Markdown." },
    { id:"pdf-to-word-docx",                         name:"PDF to Word (DOCX)",           icon:"W",  cat:["Convert","Export"],    desc:"Convert a PDF into an editable Word .docx by extracting text locally." },
    { id:"pdf-to-markdown",                          name:"PDF → Markdown",               icon:"⌁",  cat:["Convert","Export"],    desc:"Convert a PDF into editable Markdown. Extracts selectable text locally." },
    { id:"heic-heif-to-jpg-png",                     name:"HEIC → JPG/PNG",               icon:"⧉",  cat:["Convert","Export"],    desc:"Convert iPhone HEIC photos to JPG/PNG in batch with ZIP download." },

    // ── Export / PDF
    { id:"compress-pdf-reduce-file-size",            name:"Compress PDF",                 icon:"🗜", cat:["Export"],              desc:"Compress a PDF to reduce file size for email and upload portals." },
    { id:"pdf-organizer-merge-split-reorder",        name:"PDF Organizer",                icon:"🗂", cat:["Export"],              desc:"Merge PDFs, split/extract page ranges, and reorder pages — fully local." },
    { id:"pdf-password-protect-unlock",              name:"PDF Password Protect / Unlock",icon:"🔒", cat:["Export"],              desc:"Add or remove password protection on any PDF (qpdf-wasm)." },
    { id:"pdf-redact-blackout-sensitive-info",       name:"PDF Redactor",                 icon:"█",  cat:["Export"],              desc:"Black out sensitive areas and export a permanently redacted PDF." },
    { id:"pdf-to-excel-csv-extract-tables",          name:"PDF → Excel/CSV",              icon:"▦",  cat:["Export"],              desc:"Extract tables from PDF pages to Excel or CSV with inline preview." },
    { id:"pdf-to-jpg-and-jpg-to-pdf",                name:"PDF ⇄ Images",                 icon:"🖼", cat:["Export"],              desc:"Convert PDF pages to JPG/PNG, or combine images into a single PDF." },
    { id:"sign-pdf-add-signature",                   name:"Sign PDF",                     icon:"✍",  cat:["Export"],              desc:"Draw or upload a signature and stamp it onto any PDF locally." },
    { id:"csv-to-pdf",                               name:"CSV to PDF",                   icon:"⎙",  cat:["Export"],              desc:"Convert CSV/TSV exports to a clean, shareable PDF snapshot." },
    { id:"excel-to-pdf",                             name:"Excel to PDF",                 icon:"X",  cat:["Export"],              desc:"Convert Excel (XLSX/XLS) to a clean PDF snapshot you can share." },
    { id:"ocr-image-pdf-to-text",                    name:"OCR (Image/PDF → Text)",       icon:"⌁",  cat:["Export"],              desc:"Extract text from scanned PDFs and images entirely in your browser." },
    { id:"office-file-viewer-excel-docx-pptx",       name:"Office File Viewer",           icon:"👁", cat:["Export"],              desc:"View Excel, Word, and PowerPoint files directly in your browser." },

    // ── Export / Image
    { id:"remove-image-background",                  name:"Background Remover",           icon:"✂",  cat:["Export"],              desc:"Remove image backgrounds and download transparent PNGs locally." },
    { id:"image-resize-compress",                    name:"Image Resize / Compress",      icon:"🖼", cat:["Export"],              desc:"Resize and compress JPG/PNG/WebP images — choose dimensions, format, and quality." },
    { id:"image-metadata-remover-exif-stripper",     name:"Image Metadata Remover",       icon:"⛭",  cat:["Export"],              desc:"Strip EXIF/GPS metadata from photos before sharing." },
    { id:"id-photo-maker-passport-photo",            name:"ID Photo Maker",               icon:"🪪", cat:["Export"],              desc:"Make passport-style ID photos and generate a standard 4×6 print sheet." },

    // ── Export / Misc
    { id:"link-shortener-with-qr",                   name:"Link Shortener + QR",          icon:"🔗", cat:["Export"],              desc:"Shorten a URL (optional) and instantly generate a QR code for it." },
    { id:"qr-code-generator-and-scanner",            name:"QR Code Generator & Scanner",  icon:"▣",  cat:["Export"],              desc:"Generate QR codes for any text/URL, or scan QR codes from camera or image." },
    { id:"upi-qr-generator",                        name:"UPI QR Generator + Scanner",   icon:"₹",  cat:["Export"],              desc:"Generate a UPI payment QR code from a UPI ID and optional amount, or decode a QR from an image." },
    { id:"strong-password-generator",                name:"Password Generator",            icon:"🔑", cat:["Export"],              desc:"Generate cryptographically strong random passwords with one click." },
    { id:"online-notepad-rich-text-editor",          name:"Online Notepad",               icon:"🗒", cat:["Export"],              desc:"Rich-text notes with find/replace, formatting, and local saving." },

    // ── Video
    { id:"video-resize-reduce-size",                 name:"Video Resize / Compress",      icon:"🎬", cat:["Video"],               desc:"Reduce video file size and resize resolution — runs entirely in your browser." },
    { id:"split-video-into-clips",                   name:"Split Video into Clips",        icon:"✂",  cat:["Video"],               desc:"Split a video into multiple clips by time range or intervals, locally." },
    { id:"merge-videos-join-clips",                  name:"Merge Videos",                 icon:"⧉",  cat:["Video"],               desc:"Join multiple video clips into a single file — no upload, no server." },
    { id:"gopro-video-compressor",                   name:"GoPro Video Compressor",       icon:"📷", cat:["Video"],               desc:"Compress, resize, rotate, trim and strip GPS metadata from GoPro Hero, Max & Fusion footage." },
    { id:"dji-video-compressor",                     name:"DJI Video Compressor",         icon:"🛸", cat:["Video"],               desc:"Compress, resize, rotate, trim and strip GPS metadata from DJI Mavic, Mini, Air, Osmo and FPV footage." },
  ];

  const CAT_ORDER = ["Compare","Clean","Validate","Analyze","Convert","Export","Video"];
  const routes    = Object.fromEntries(tools.map(t => [t.id, `/tools/${t.id}.html`]));

  /* ─────────────────────────────────────────
     INJECT DRAWER STYLES
  ───────────────────────────────────────── */
  function injectStyles(){
    if(document.getElementById("rmDrawerStyles")) return;
    const s = document.createElement("style");
    s.id = "rmDrawerStyles";
    s.textContent = `
      body.rmNoScroll{overflow:hidden;}

      #rmOverlay{
        position:fixed;inset:0;background:rgba(0,0,0,.55);
        display:none;z-index:400;
      }
      #rmDrawer{
        position:fixed;right:0;top:0;width:440px;max-width:92vw;height:100vh;
        background:rgba(8,12,22,.97);
        border-left:1px solid var(--border,rgba(255,255,255,.1));
        box-shadow:-18px 0 40px rgba(0,0,0,.55);
        display:flex;flex-direction:column;
        transform:translateX(102%);transition:transform .18s ease;z-index:500;
      }
      #rmDrawer.open{transform:translateX(0);}

      #rmDrawerHeader{
        display:flex;align-items:center;gap:10px;
        padding:12px 14px;
        border-bottom:1px solid var(--border,rgba(255,255,255,.1));
        flex-shrink:0;
      }
      #rmDrawerHeader strong{font-size:14px;white-space:nowrap;}
      #rmDrawerHeader .spacer{flex:1;}
      #rmCloseDrawerBtn{
        font-size:13px;padding:6px 12px;border-radius:8px;cursor:pointer;
        background:rgba(255,255,255,.06);border:1px solid var(--border,rgba(255,255,255,.1));
        color:var(--text,#e8edf4);white-space:nowrap;
      }
      #rmCloseDrawerBtn:hover{background:rgba(255,255,255,.12);}

      #rmDrawerSearchWrap{
        padding:10px 14px;
        border-bottom:1px solid rgba(255,255,255,.06);
        flex-shrink:0;
      }
      #rmDrawerSearch{
        width:100%;box-sizing:border-box;
        padding:9px 12px;border-radius:10px;
        border:1px solid var(--border,rgba(255,255,255,.1));
        background:rgba(255,255,255,.04);
        color:var(--text,#e8edf4);font-size:13px;outline:none;
        transition:border-color .15s;
      }
      #rmDrawerSearch:focus{border-color:rgba(124,247,212,.45);}
      #rmDrawerSearch::placeholder{color:var(--muted,rgba(255,255,255,.4));}

      #rmDrawerList{
        flex:1;overflow-y:auto;padding:10px 14px 16px;
        display:flex;flex-direction:column;gap:6px;
      }

      .rmSectionLabel{
        font-size:10px;font-weight:700;letter-spacing:.08em;
        text-transform:uppercase;
        color:var(--muted,rgba(255,255,255,.4));
        padding:10px 0 4px;
        border-top:1px solid rgba(255,255,255,.06);
        margin-top:4px;
      }
      .rmSectionLabel:first-child{border-top:none;margin-top:0;padding-top:0;}

      .rmRow{
        display:flex;gap:10px;align-items:flex-start;
        padding:10px;border-radius:12px;
        border:1px solid var(--border,rgba(255,255,255,.1));
        background:rgba(255,255,255,.03);
        text-decoration:none;color:inherit;
        transition:border-color .12s,background .12s;
      }
      .rmRow:hover{
        border-color:rgba(124,247,212,.45);
        background:rgba(124,247,212,.04);
      }
      .rmRow.active{
        border-color:rgba(124,247,212,.6);
        background:rgba(124,247,212,.07);
      }

      .rmRowIcon{
        width:32px;height:32px;border-radius:10px;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;
        font-size:15px;background:rgba(255,255,255,.06);
      }
      .rmRowBody{min-width:0;flex:1;}
      .rmRowTitle{
        font-weight:800;font-size:13px;
        color:var(--text,#e8edf4);line-height:1.3;
      }
      .rmRow.active .rmRowTitle{color:rgba(124,247,212,.95);}
      .rmRowDesc{
        color:var(--muted,rgba(255,255,255,.45));
        font-size:12px;margin-top:3px;line-height:1.4;
      }
      .rmRowCats{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap;}
      .rmRowCat{
        font-size:10px;padding:2px 7px;border-radius:999px;
        background:rgba(110,168,255,.1);
        color:rgba(110,168,255,.8);
        border:1px solid rgba(110,168,255,.2);
      }

      .rmDrawerEmpty{
        color:var(--muted,rgba(255,255,255,.4));
        font-size:13px;text-align:center;padding:32px 0;
      }
    `;
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────
     BUILD DRAWER DOM  (once)
  ───────────────────────────────────────── */
  function buildDrawer(){
    if(document.getElementById("rmDrawer")) return;

    injectStyles();

    /* Overlay */
    const overlay = document.createElement("div");
    overlay.id = "rmOverlay";
    overlay.setAttribute("aria-hidden","true");

    /* Aside */
    const drawer = document.createElement("aside");
    drawer.id = "rmDrawer";
    drawer.setAttribute("aria-label","All Tools");

    /* Header */
    const header = document.createElement("div");
    header.id = "rmDrawerHeader";
    header.innerHTML = `
      <button id="rmCloseDrawerBtn" type="button">✕ Close</button>
      <strong id="rmDrawerTitle">All Tools (${tools.length})</strong>
      <div class="spacer"></div>
    `;

    /* Search */
    const searchWrap = document.createElement("div");
    searchWrap.id = "rmDrawerSearchWrap";
    searchWrap.innerHTML = `<input id="rmDrawerSearch" type="search" placeholder="Filter tools…" autocomplete="off"/>`;

    /* List */
    const list = document.createElement("div");
    list.id = "rmDrawerList";

    drawer.appendChild(header);
    drawer.appendChild(searchWrap);
    drawer.appendChild(list);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  /* ─────────────────────────────────────────
     RENDER LIST  (called on open + search)
  ───────────────────────────────────────── */
  function renderList(filterQ){
    const list  = document.getElementById("rmDrawerList");
    const title = document.getElementById("rmDrawerTitle");
    if(!list) return;

    const q      = (filterQ || "").trim().toLowerCase();
    const active = currentToolId();
    list.innerHTML = "";

    /* Group into categories */
    const groups = {};
    CAT_ORDER.forEach(c => groups[c] = []);

    tools.forEach(t => {
      if(q){
        const text = (t.name+" "+t.desc+" "+t.cat.join(" ")).toLowerCase();
        if(!text.includes(q)) return;
      }
      const primary = t.cat[0];
      if(!groups[primary]) groups[primary] = [];
      groups[primary].push(t);
    });

    let total = 0;
    let firstGroup = true;

    CAT_ORDER.forEach(cat => {
      const group = groups[cat];
      if(!group || !group.length) return;
      total += group.length;

      /* Section label */
      const label = document.createElement("div");
      label.className = "rmSectionLabel" + (firstGroup ? " first" : "");
      label.textContent = cat;
      list.appendChild(label);
      firstGroup = false;

      /* Rows */
      group.forEach(t => {
        const a = document.createElement("a");
        a.className = "rmRow" + (active === t.id ? " active" : "");
        a.href = routes[t.id] || "#";
        if(active === t.id) a.setAttribute("aria-current","page");

        const cats = t.cat.map(c => `<span class="rmRowCat">${c}</span>`).join("");
        a.innerHTML = `
          <div class="rmRowIcon" aria-hidden="true">${t.icon || ""}</div>
          <div class="rmRowBody">
            <div class="rmRowTitle">${t.name}</div>
            <div class="rmRowDesc">${t.desc}</div>
            <div class="rmRowCats">${cats}</div>
          </div>`;
        list.appendChild(a);
      });
    });

    /* Empty state */
    if(!total){
      const empty = document.createElement("div");
      empty.className = "rmDrawerEmpty";
      empty.textContent = "No tools match — try a different keyword.";
      list.appendChild(empty);
    }

    if(title){
      title.textContent = q ? `Tools (${total} match)` : `All Tools (${tools.length})`;
    }
  }

  /* ─────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────── */
  function currentToolId(){
    const m = (window.location.pathname || "").toLowerCase().match(/\/tools\/(.+?)\.html$/);
    return m ? m[1] : null;
  }

  function openDrawer(){
    buildDrawer();
    const overlay = document.getElementById("rmOverlay");
    const drawer  = document.getElementById("rmDrawer");
    const input   = document.getElementById("rmDrawerSearch");
    if(!overlay || !drawer) return;

    /* Wire up search if not already done */
    if(input && !input._rmBound){
      input._rmBound = true;
      input.addEventListener("input", () => renderList(input.value));
    }

    /* Reset & render */
    if(input) input.value = "";
    renderList("");

    overlay.style.display = "block";
    drawer.classList.add("open");
    document.body.classList.add("rmNoScroll");

    /* Focus search after transition */
    setTimeout(() => input && input.focus(), 200);
  }

  function closeDrawer(){
    const overlay = document.getElementById("rmOverlay");
    const drawer  = document.getElementById("rmDrawer");
    if(!overlay || !drawer) return;
    overlay.style.display = "none";
    drawer.classList.remove("open");
    document.body.classList.remove("rmNoScroll");
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init(){
    buildDrawer();

    /* Open button (any element with id="openDrawerBtn") */
    const openBtn = document.getElementById("openDrawerBtn");
    if(openBtn) openBtn.addEventListener("click", e => { e.preventDefault(); openDrawer(); });

    /* Close button */
    document.addEventListener("click", e => {
      if(e.target && e.target.id === "rmCloseDrawerBtn") closeDrawer();
    });

    /* Overlay click */
    const overlay = document.getElementById("rmOverlay");
    if(overlay) overlay.addEventListener("click", closeDrawer);

    /* Escape key */
    document.addEventListener("keydown", e => { if(e.key === "Escape") closeDrawer(); });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
