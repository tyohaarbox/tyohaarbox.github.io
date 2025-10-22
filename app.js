// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle) toggle.addEventListener('click', ()=>{
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('year').textContent = new Date().getFullYear();

// Sample product data (edit as needed)
const PRODUCTS = [
  {id:1, name:'Onboarding Welcome Kit Classic', cat:'Welcome Kits', price:1999, unit:'₹', img:'assets/img/p-welcome-1.svg', meta:'Box + Tee + Bottle + Notebook + Pen', popular: true},
  {id:2, name:'Premium Softstyle T‑Shirt (Unisex)', cat:'T-Shirts', price:349, unit:'₹', img:'assets/img/p-tee-1.svg', meta:'180–200 GSM, screen/DTF/embroidery', popular: true},
  {id:3, name:'All‑Weather Softshell Jacket', cat:'Jackets', price:1899, unit:'₹', img:'assets/img/p-jacket-1.svg', meta:'Water‑resistant, inner fleece, logo embroidery', popular: true},
  {id:4, name:'Classic Hoodie', cat:'Hoodies', price:1299, unit:'₹', img:'assets/img/p-hoodie-1.svg', meta:'320 GSM fleece, kangaroo pocket', popular: false},
  {id:5, name:'Vacuum Insulated Bottle 750ml', cat:'Drinkware', price:699, unit:'₹', img:'assets/img/p-bottle-1.svg', meta:'Laser engraving | Multiple colors', popular: true},
  {id:6, name:'Wireless Mouse + Pad Set', cat:'Tech', price:849, unit:'₹', img:'assets/img/p-tech-1.svg', meta:'Logo print | Gift boxed', popular: false},
  {id:7, name:'Eco Hamper – Bamboo Essentials', cat:'Eco‑Friendly', price:1499, unit:'₹', img:'assets/img/p-eco-1.svg', meta:'Bamboo bottle + notebook + pen', popular: false},
  {id:8, name:'Office Starter – Notebook & Metal Pen', cat:'Office', price:299, unit:'₹', img:'assets/img/p-office-1.svg', meta:'A5 ruled, 192 pages', popular: false},
  {id:9, name:'Onboarding Welcome Kit Deluxe', cat:'Welcome Kits', price:2599, unit:'₹', img:'assets/img/p-welcome-2.svg', meta:'Box + Tee + Bottle + Mug + Notebook + Sticker pack', popular: true}
];

const grid = document.getElementById('productGrid');
const search = document.getElementById('search');
const sortSel = document.getElementById('sort');

function render(list){
  grid.innerHTML = list.map(p=> `
  <article class="card product" data-cat="${p.cat}">
    <div class="thumb">${p.img}</div>
    <h4>${p.name}</h4>
    <div class="meta">${p.meta}</div>
    <div class="price">${p.unit}${p.price.toLocaleString()}</div>
    <div class="actions">
      <button class="btn btn-outline" onclick="openQuote(${p.id})">Quick Quote</button>
      <button class="btn btn-primary" onclick="viewDetails(${p.id})">Details</button>
    </div>
  </article>`).join('');
}

function sortList(list){
  const v = sortSel.value;
  if (v==='asc') return [...list].sort((a,b)=>a.price-b.price);
  if (v==='desc') return [...list].sort((a,b)=>b.price-a.price);
  return [...list].sort((a,b)=>Number(b.popular)-Number(a.popular));
}

function filterByQuery(list, q){
  if (!q) return list;
  q = q.toLowerCase();
  return list.filter(p=> [p.name,p.meta,p.cat].join(' ').toLowerCase().includes(q));
}

// Initial render
render(sortList(PRODUCTS));

// Search/sort handlers
search.addEventListener('input', ()=>{
  const list = sortList(filterByQuery(PRODUCTS, search.value));
  render(list);
});
sortSel.addEventListener('change', ()=>{
  const list = sortList(filterByQuery(PRODUCTS, search.value));
  render(list);
});

// Category click -> filter
Array.from(document.querySelectorAll('.category')).forEach(el=>{
  el.addEventListener('click', ()=>{
    const cat = el.dataset.filter;
    search.value = '';
    const list = sortList(PRODUCTS.filter(p=>p.cat===cat));
    render(list);
    document.getElementById('featured').scrollIntoView({behavior:'smooth'});
  });
});

// Quote & Details (simple demo)
function openQuote(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const msg = document.getElementById('formMsg');
  msg.textContent = `Prefilled: ${p.name} | Category: ${p.cat}`;
  document.querySelector('#contact textarea[name="details"]').value = `Interested in: ${p.name} (Category: ${p.cat}). Quantity: 100. Branding: embroidery/print.`;
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}

function viewDetails(id){
  const p = PRODUCTS.find(x=>x.id===id);
  alert(`${p.name}\n\nCategory: ${p.cat}\nIncludes: ${p.meta}\nIndicative price: ${p.unit}${p.price}`);
}

// Submit handler (mock)
function submitQuote(e){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const summary = `Thanks, ${data.name || 'there'}! We'll email ${data.email} with a custom quote.`;
  document.getElementById('formMsg').textContent = summary;
  form.reset();
  return false;
}
window.submitQuote = submitQuote;
window.openQuote = openQuote;
window.viewDetails = viewDetails;
