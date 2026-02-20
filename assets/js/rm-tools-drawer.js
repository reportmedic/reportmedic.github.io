/* ReportMedic — All Tools drawer for tool pages.
   Keeps navigation lightweight and consistent with the home page. */
(function(){
  const tools = [
    // Icons match the home page drawer for consistency.
    { id:"compare", name:"Report Compare", icon:"≋", desc:"Compare two reports and highlight diffs by key fields." },
    { id:"reconcile", name:"Reconciliation", icon:"✓", desc:"Match totals, track variance, and explain gaps." },
    { id:"why", name:"Why Reports Don’t Match", icon:"✎", desc:"Explain the root cause of mismatches in plain English." },
    { id:"cleaner", name:"Data Cleaner", icon:"✦", desc:"Trim, normalize, dedupe, fix dates, and standardize formats." },
    { id:"validator", name:"Schema Validator", icon:"⊢", desc:"Validate required fields, types, ranges, and null rules." },
    { id:"outliers", name:"Outlier Finder", icon:"⚡", desc:"Detect spikes, anomalies, and suspicious rows fast." },
    { id:"pivot", name:"Quick Pivot", icon:"▦", desc:"Instant pivot tables & group summaries (counts/sums/avg)." },
    { id:"comparetext", name:"Text Compare", icon:"≡", desc:"Compare two text blocks side-by-side and highlight changes." },
    { id:"notepad", name:"Online Notepad", icon:"🗒", desc:"Create, search, and format notes (saved locally in your browser)." },
    { id:"mask", name:"PII Masker", icon:"◎", desc:"Mask sensitive fields for safe sharing." },
    { id:"export", name:"Export Fixer", icon:"⇣", desc:"Fix export formatting errors and produce clean outputs." },
    { id:"scheduler", name:"Run Scheduler", icon:"⏱", desc:"Save a run config and repeat it on new files." },
    { id:"md2html", name:"Markdown → HTML", icon:"⌗", desc:"Convert Markdown to clean HTML instantly." },
    { id:"html2md", name:"HTML → Markdown", icon:"⟲", desc:"Convert HTML to tidy Markdown." },
    { id:"md2pdf", name:"Markdown → PDF", icon:"⧉", desc:"Create a PDF from Markdown (client-side)." },
    { id:"md2docx", name:"Markdown → Word", icon:"W", desc:"Convert Markdown to a Word (DOCX) document." },
    { id:"docx2md", name:"Word → Markdown", icon:"W⇢", desc:"Convert Word (DOCX) to Markdown." }
  ];

  const routes = {
    compare: "/tools/compare-two-files-find-differences.html",
    reconcile: "/tools/reconcile-two-datasets-totals-dont-match.html",
    why: "/tools/why-two-reports-dont-match.html",
    cleaner: "/tools/clean-dirty-data-file-online.html",
    validator: "/tools/validate-data-schema-and-columns.html",
    outliers: "/tools/find-data-outliers-and-anomalies.html",
    pivot: "/tools/summarize-data-by-group-pivot-online.html",
    comparetext: "/tools/compare-two-texts-side-by-side.html",
    notepad: "/tools/online-notepad-rich-text-editor.html",
    mask: "/tools/mask-sensitive-data-before-sharing.html",
    export: "/tools/fix-export-formatting-errors.html",
    scheduler: "/tools/schedule-data-validation-checks.html",
    md2html: "/tools/markdown-to-html.html",
    html2md: "/tools/html-to-markdown.html",
    md2pdf: "/tools/markdown-to-pdf.html",
    md2docx: "/tools/markdown-to-word-docx.html",
    docx2md: "/tools/word-docx-to-markdown.html"
  };

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

  function currentPath(){
    return (window.location.pathname || "").toLowerCase();
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

    // populate
    const active = currentPath();
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
      if(active && (routes[t.id] || "").toLowerCase() === active){
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
