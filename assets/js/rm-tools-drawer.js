/* ReportMedic — All Tools drawer for tool pages.
   Auto-populated routes based on /tools/<slug>.html so every tool stays in the menu. */
(function(){
  const tools = [
    { id:"reconcile-two-datasets-totals-dont-match", name:"Reconciliation", icon:"✓", desc:"Match totals, quantify variance, and explain gaps." },
    { id:"compare-two-files-find-differences", name:"Report Compare", icon:"≋", desc:"Compare two reports and pinpoint exactly what changed." },
    { id:"compare-two-spreadsheets", name:"Spreadsheet Compare", icon:"▦", desc:"Compare two spreadsheets (XLSX/CSV) to spot changed cells, added/removed rows and columns, and export a dif…" },
    { id:"compare-two-texts-side-by-side", name:"Text Compare", icon:"↔", desc:"Compare two text blocks side-by-side with highlights." },
    { id:"clean-dirty-data-file-online", name:"Data Cleaner", icon:"✦", desc:"Trim, normalize, dedupe, and standardize formats." },
    { id:"mask-sensitive-data-before-sharing", name:"PII Masker", icon:"◎", desc:"Mask sensitive fields for safe sharing." },
    { id:"check-date-timezone-drift", name:"Date & Timezone Drift Checker", icon:"🕒", desc:"Detect day/hour shifts and timezone drift between two exports by comparing date distributions and likely of…" },
    { id:"schedule-data-validation-checks", name:"Run Scheduler", icon:"⏱", desc:"Save a run setup and repeat it on new files." },
    { id:"validate-data-schema-and-columns", name:"Schema Validator", icon:"⊢", desc:"Validate required fields, types, ranges, and null rules." },
    { id:"auto-map-and-rename-columns", name:"Column Mapping Helper", icon:"⇄", desc:"Auto-suggest column mappings between two files and generate a renamed copy + mapping JSON so reports line up." },
    { id:"null-missingness-heatmap", name:"Null & Missingness Heatmap", icon:"▧", desc:"See missingness per column and by segment with a quick heatmap, so you can spot broken fields before report…" },
    { id:"find-data-outliers-and-anomalies", name:"Outlier Finder", icon:"⚡", desc:"Spot spikes, anomalies, and suspicious rows fast." },
    { id:"summarize-data-by-group-pivot-online", name:"Quick Pivot", icon:"▦", desc:"Instant group summaries and pivot-style totals." },
    { id:"why-two-reports-dont-match", name:"Why Reports Don’t Match", icon:"✎", desc:"Turn mismatches into a crisp, audit-ready explanation." },
    { id:"remove-image-background", name:"Background Remover", icon:"✂", desc:"Remove backgrounds and download transparent PNGs." },
    { id:"compress-pdf-reduce-file-size", name:"Compress PDF", icon:"🗜", desc:"Compress a PDF to reduce file size for email and upload portals. Runs locally in your browser." },
    { id:"csv-to-pdf", name:"CSV to PDF", icon:"⎙", desc:"Convert CSV/TSV exports to a clean, shareable PDF snapshot. Runs locally in your browser." },
    { id:"excel-to-pdf", name:"Excel to PDF", icon:"X", desc:"Convert Excel (XLSX/XLS) to a clean PDF snapshot you can share. Runs locally in your browser." },
    { id:"fix-export-formatting-errors", name:"Export Fixer", icon:"⇣", desc:"Repair export formatting and produce clean outputs." },
    { id:"heic-heif-to-jpg-png", name:"HEIC → JPG/PNG", icon:"⧉", desc:"Convert iPhone HEIC photos to JPG/PNG (batch + ZIP)." },
    { id:"html-to-markdown", name:"HTML → Markdown", icon:"⌁", desc:"Convert HTML into Markdown." },
    { id:"id-photo-maker-passport-photo", name:"ID Photo Maker", icon:"🪪", desc:"Make passport-style photos and a 4×6 print sheet." },
    { id:"image-metadata-remover-exif-stripper", name:"Image Metadata Remover", icon:"⛭", desc:"Strip EXIF/GPS metadata from photos." },
    { id:"image-resize-compress", name:"Image Resize / Compress", icon:"🖼", desc:"Resize and compress images (JPG/PNG/WebP) locally in your browser. Choose dimensions, format, and quality,…" },
    { id:"link-shortener-with-qr", name:"Link Shortener + QR", icon:"🔗", desc:"Shorten a link (optional) and generate a QR." },
    { id:"markdown-to-html", name:"Markdown → HTML", icon:"⌁", desc:"Convert Markdown into clean HTML." },
    { id:"markdown-to-pdf", name:"Markdown → PDF", icon:"⎙", desc:"Turn Markdown into a printable PDF." },
    { id:"markdown-to-word-docx", name:"Markdown → Word", icon:"W", desc:"Convert Markdown into a .docx file." },
    { id:"ocr-image-pdf-to-text", name:"OCR (Image/PDF → Text)", icon:"⌁", desc:"Extract text from scans and images locally." },
    { id:"office-file-viewer-excel-docx-pptx", name:"Office File Viewer", icon:"👁", desc:"View Excel (XLSX), Word (DOCX), and PowerPoint (PPTX) files directly in your browser. Runs locally." },
    { id:"online-notepad-rich-text-editor", name:"Online Notepad", icon:"🗒", desc:"Create notebooks + rich-text notes (saved locally)." },
    { id:"strong-password-generator", name:"Password Generator", icon:"🔑", desc:"Generate strong passwords with crypto randomness." },
    { id:"pdf-organizer-merge-split-reorder", name:"PDF Organizer", icon:"🗂", desc:"Merge PDFs, split/extract page ranges, and reorder pages. Fast, private, and runs locally in your browser." },
    { id:"pdf-password-protect-unlock", name:"PDF Password Protect / Unlock", icon:"🔒", desc:"Add or remove PDF passwords (qpdf‑wasm)." },
    { id:"pdf-redact-blackout-sensitive-info", name:"PDF Redactor", icon:"█", desc:"Black out sensitive areas and export a redacted PDF." },
    { id:"pdf-to-markdown", name:"PDF to Markdown", icon:"⌁", desc:"Convert a PDF into editable Markdown. Extracts selectable text locally in your browser (no upload)." },
    { id:"pdf-to-word-docx", name:"PDF to Word (DOCX)", icon:"W", desc:"Convert a PDF into an editable Word (.docx) by extracting text locally in your browser. Best for text-based…" },
    { id:"pdf-to-excel-csv-extract-tables", name:"PDF → Excel/CSV", icon:"▦", desc:"Extract text tables to Excel/CSV with preview." },
    { id:"pdf-to-jpg-and-jpg-to-pdf", name:"PDF ⇄ Images", icon:"🖼", desc:"Convert PDF pages to images (JPG/PNG) and convert images to a single PDF. Runs locally in your browser." },
    { id:"qr-code-generator-and-scanner", name:"QR Code Generator & Scanner", icon:"▣", desc:"Generate QR codes or scan them from camera/image." },
    { id:"sign-pdf-add-signature", name:"Sign PDF", icon:"✍", desc:"Draw a signature and stamp it onto a PDF." },
    { id:"word-docx-to-markdown", name:"Word → Markdown", icon:"W", desc:"Convert a .docx file into Markdown." },
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
