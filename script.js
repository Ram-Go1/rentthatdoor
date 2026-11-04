// DEMONSTRATION DATA ONLY. Replace each listing with verified property data before launch.
// The city-level map is intentionally approximate; no actual street addresses have been provided.
const listings=[
{id:1,title:"Modern Nashville Townhome",type:"Townhome",city:"Nashville, TN",address:"Street address not yet published",beds:3,baths:2.5,sqft:1750,rent:2950,status:"Available",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",description:"An illustrative townhome listing showcasing the information renters can expect to see."},
{id:2,title:"Bright Brentwood Home",type:"Single-family",city:"Brentwood, TN",address:"Street address not yet published",beds:3,baths:2,sqft:1900,rent:2800,status:"Rented",image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=85",description:"An illustrative single-family rental listing. This example is marked rented to demonstrate availability labels."},
{id:3,title:"Contemporary Nashville Townhome",type:"Townhome",city:"Nashville, TN",address:"Street address not yet published",beds:3,baths:2.5,sqft:1650,rent:2950,status:"Coming soon",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85",description:"An illustrative coming-soon townhome listing with a sample monthly rent."}
];
const cards=document.getElementById("cards"),count=document.getElementById("count"),empty=document.getElementById("empty"),dlg=document.getElementById("detail");
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const mapUrl=p=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.city);
const mapEmbed=p=>"https://maps.google.com/maps?q="+encodeURIComponent(p.city)+"&z=11&output=embed";
function render(){
 const term=document.getElementById("search").value.toLowerCase().trim(),type=document.getElementById("type").value,status=document.getElementById("status").value;
 const found=listings.filter(p=>(!term||[p.title,p.city,p.address,p.type].join(" ").toLowerCase().includes(term))&&(type==="all"||p.type===type)&&(status==="all"||p.status===status));
 count.textContent=found.length+" example listing"+(found.length===1?"":"s");empty.hidden=found.length!==0;
 cards.innerHTML=found.map(p=>`<article class="property"><div class="property-photo" style="background-image:url('${p.image}')"><span class="tag status-${p.status.toLowerCase().replace(/\s+/g,"-")}">${p.status} · Demo</span></div><div class="property-info"><span class="property-type">${p.type} · ${p.city}</span><h3>${p.title}</h3><div class="address">⌖ ${p.address}</div><div class="facts"><span>⌂ ${p.beds} beds</span><span>◈ ${p.baths} baths</span><span>▤ ${p.sqft.toLocaleString()} sq ft</span></div><div class="property-bottom"><span class="price">${money(p.rent)}<small>/month*</small></span></div><div class="listing-actions"><button class="view" data-id="${p.id}">View property ↗</button><a class="map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">⌖ Map ↗</a></div><small class="listing-disclaimer">*Illustrative price and status, not a rental offer.</small></div></article>`).join("");
 cards.querySelectorAll("[data-id]").forEach(b=>b.addEventListener("click",()=>details(Number(b.dataset.id))));
}
function details(id){
 const p=listings.find(x=>x.id===id);
 document.getElementById("detailBody").innerHTML=`<div class="detail-image" style="background-image:url('${p.image}')"></div><div class="detail-copy"><span class="overline">DEMONSTRATION PROPERTY · NOT A LIVE OFFER</span><h2>${p.title}</h2><div class="detail-status status-${p.status.toLowerCase().replace(/\s+/g,"-")}">${p.status} (example)</div><p>${p.city} · ${p.beds} beds · ${p.baths} baths · ${p.sqft.toLocaleString()} sq ft</p><p class="detail-price">${money(p.rent)} / month <small>(sample price)</small></p><p>${p.description}</p><h3>Location overview</h3><p class="map-caveat">Approximate city map only. A precise property pin will appear after its address is verified.</p><iframe class="property-map" loading="lazy" title="Approximate map of ${p.city}" src="${mapEmbed(p)}" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="map-link detail-map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">Open larger map ↗</a><a class="btn btn-dark" href="#contact" id="detailContact">Ask about rentals ↗</a></div>`;
 dlg.showModal();document.getElementById("detailContact").addEventListener("click",()=>dlg.close());
}
document.getElementById("close").onclick=()=>dlg.close();
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
["search","type","status"].forEach(id=>document.getElementById(id).addEventListener(id==="search"?"input":"change",render));
document.getElementById("filter").onclick=render;
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menu").onclick=()=>document.querySelector(".header nav").classList.toggle("open");
document.querySelectorAll(".header nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".header nav").classList.remove("open")));
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.target);const body="Name: "+d.get("name")+"\nEmail: "+d.get("email")+"\nTopic: "+d.get("topic")+"\n\n"+d.get("message");window.location.href="mailto:?subject="+encodeURIComponent("RentThatDoor: "+d.get("topic"))+"&body="+encodeURIComponent(body);alert("Your email app will open with a prepared message. Add the RentThatDoor contact email as the recipient before sending.")});
render();