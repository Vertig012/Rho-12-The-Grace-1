const records = [
  {id:"R12-LORE-001",googleDocUrl:"https://docs.google.com/document/d/1_GDYvCn1-rZWYzztStsKfNkZeBKejLqP283FJnx_Sms/edit?tab=t.0",category:"Lore",title:"Rho-12: The Grace",status:"FOUNDATION FILE",summary:"Overview of the faction's origins, doctrine, and long-term objectives.",body:"Rho-12, known as The Grace, is a Group of Interest for SCP:RP. Its public archive records faction history, leadership, operational doctrine, and the strategic goals that guide its roleplay campaigns.\n\nReplace this starter text with your approved faction canon. Keep major dates, ranks, and events consistent across the archive."},
  {id:"R12-EQP-001",googleDocUrl:"https://docs.google.com/document/d/1FB-DQ6jWeF3v-08OwD_CqL364yPSPCdJpRLbS4rhKhU/edit?tab=t.ioiboju6bkp1",category:"Equipment",title:"GRACE-IS",status:"EQUIPMENT DOSSIER",summary:"An Intercom Malware made to disrupt all Public Address System's within the Facility for around 10 minutes."},
  {id:"R12-EQP-002",googleDocUrl:"https://docs.google.com/document/d/1bC96JM3QyxqZFJSVHg_XCCot1KokaKxrCc7E2OCD6_I/edit?tab=t.e4gerhltektd",category:"Equipment",title:"GRACE-G",status:"EQUIPMENT DOSSIER",summary:"A Custom Made Explosive Device made by Rho-12 Engineer's specifically made to target large infrastructure's such as Facility Generators."},
  {id:"R12-LORE-002",googleDocUrl:"https://docs.google.com/document/d/1ycZVEiyPGAnT8gca0e3g_-TnJoh_vlRbRoXWo9IhVMc/edit?tab=t.mm83qzxjq4iq",category:"Lore",title:"PROJECT: DEADMAN",status:"LORE DOSSIER",summary:"Juggernaut programme involving the re-deployment of deceased operatives as juggernaut units within faction roleplay."},
];

const grid = document.getElementById("archive-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty-state");
const filters = [...document.querySelectorAll(".filter")];
let activeCategory = "All";

function renderRecords() {
  const term = search.value.trim().toLowerCase();
  const visible = records.filter(record => {
    const matchesCategory = activeCategory === "All" || record.category === activeCategory;
    const searchable = `${record.id} ${record.category} ${record.title} ${record.status} ${record.summary}`.toLowerCase();
    return matchesCategory && searchable.includes(term);
  });
  grid.replaceChildren();
  visible.forEach(record => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "archive-card";
    const meta = document.createElement("div");
    meta.className = "record-meta";
    const id = document.createElement("span");
    id.textContent = record.id;
    const category = document.createElement("span");
    category.textContent = record.category.toUpperCase();
    meta.append(id, category);
    const cover = document.createElement("div");
    cover.className = "archive-cover";
    cover.setAttribute("aria-hidden", "true");
    const folder = document.createElement("div");
    folder.className = "folder-emblem";
    folder.innerHTML = '<span class="folder-tab"></span><span class="folder-mark">R<span>12</span></span>';
    const clearance = document.createElement("span");
    clearance.className = "clearance-stamp";
    const clearanceByCategory = {
      Lore: "CLEARANCE 01 · PUBLIC",
      Operations: "CLEARANCE 03 · RESTRICTED",
      Equipment: "CLEARANCE 03 · RESTRICTED",
      Resources: "CLEARANCE 02 · INTERNAL",
      Personnel: "CLEARANCE 02 · INTERNAL"
    };
    clearance.textContent = clearanceByCategory[record.category] || "CLEARANCE 01 · PUBLIC";
    cover.append(folder, clearance);
    const title = document.createElement("h3");
    title.textContent = record.title;
    const summary = document.createElement("p");
    summary.textContent = record.summary;
    const open = document.createElement("span");
    open.className = "open-record";
    open.textContent = "OPEN DOSSIER ↗";
    button.append(meta, cover, title, summary, open);
    button.addEventListener("click", () => { if (record.googleDocUrl) { window.open(record.googleDocUrl, "_blank", "noopener,noreferrer"); } else { openRecord(record); } });
    grid.append(button);
  });
  empty.hidden = visible.length !== 0;
}

function openRecord(record) {
  document.getElementById("dialog-code").textContent = `${record.id} // ${record.category.toUpperCase()}`;
  document.getElementById("dialog-title").textContent = record.title;
  document.getElementById("dialog-meta").textContent = record.status;
  document.getElementById("dialog-body").textContent = record.body;
  document.getElementById("record-dialog").showModal();
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    activeCategory = filter.dataset.category;
    filters.forEach(item => item.classList.toggle("active", item === filter));
    renderRecords();
  });
});
search.addEventListener("input", renderRecords);

document.querySelectorAll("[data-filter]").forEach(link => {
  link.addEventListener("click", () => {
    const category = link.dataset.filter;
    if (category === "Lore") activeCategory = "Lore";
    else if (category === "Operations") activeCategory = "Operations";
    else if (category === "Equipment") activeCategory = "Equipment";
    else if (category === "Resources") activeCategory = "Resources";
    else if (category === "Personnel") activeCategory = "Personnel";
    else activeCategory = "All";
    filters.forEach(item => item.classList.toggle("active", item.dataset.category === activeCategory));
    renderRecords();
  });
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("record-dialog").addEventListener("click", event => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

renderRecords();
