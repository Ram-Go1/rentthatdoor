// Property listings and confirmed availability.
const listings=[
  {
    "id": 6,
    "title": "496 W Trinity Ln, Unit 5",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 5, Nashville, TN",
    "beds": 4,
    "baths": 4,
    "sqft": 1900,
    "rent": 2800,
    "status": "Available",
    "image": null,
    "description": "4 bedrooms, 4 bathrooms, approximately 1,900 sq ft and a 2-car garage. Approximately 15 minutes to downtown Nashville depending on traffic. Available November 15, 2026. $2,800/month, minimum 12-month lease.",
    "availableDate": "2026-11-15",
    "leaseTerm": "Minimum 12-month lease",
    "garage": "2-car garage",
    "driveTime": "Approximately 15 minutes to downtown Nashville, depending on traffic",
    "photos": [
      "images/trinity-townhomes/01.webp",
      "images/trinity-townhomes/02.webp",
      "images/trinity-townhomes/03.webp",
      "images/trinity-townhomes/04.webp",
      "images/trinity-townhomes/05.webp",
      "images/trinity-townhomes/06.webp",
      "images/trinity-townhomes/07.webp",
      "images/trinity-townhomes/08.webp",
      "images/trinity-townhomes/09.webp",
      "images/trinity-townhomes/10.webp",
      "images/trinity-townhomes/11.webp",
      "images/trinity-townhomes/12.webp",
      "images/trinity-townhomes/13.webp",
      "images/trinity-townhomes/14.webp",
      "images/trinity-townhomes/15.webp",
      "images/trinity-townhomes/16.webp",
      "images/trinity-townhomes/17.webp",
      "images/trinity-townhomes/18.webp",
      "images/trinity-townhomes/19.webp",
      "images/trinity-townhomes/20.webp"
    ]
  },
  {
    "id": 8,
    "title": "496 W Trinity Ln, Unit 7",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 7, Nashville, TN",
    "beds": 4,
    "baths": 4,
    "sqft": 1900,
    "rent": 2800,
    "status": "Available",
    "image": null,
    "description": "4 bedrooms, 4 bathrooms, approximately 1,900 sq ft and a 2-car garage. Approximately 15 minutes to downtown Nashville depending on traffic. Available November 15, 2026. $2,800/month, minimum 12-month lease.",
    "availableDate": "2026-11-15",
    "leaseTerm": "Minimum 12-month lease",
    "garage": "2-car garage",
    "driveTime": "Approximately 15 minutes to downtown Nashville, depending on traffic",
    "photos": [
      "images/trinity-townhomes/01.webp",
      "images/trinity-townhomes/02.webp",
      "images/trinity-townhomes/03.webp",
      "images/trinity-townhomes/04.webp",
      "images/trinity-townhomes/05.webp",
      "images/trinity-townhomes/06.webp",
      "images/trinity-townhomes/07.webp",
      "images/trinity-townhomes/08.webp",
      "images/trinity-townhomes/09.webp",
      "images/trinity-townhomes/10.webp",
      "images/trinity-townhomes/11.webp",
      "images/trinity-townhomes/12.webp",
      "images/trinity-townhomes/13.webp",
      "images/trinity-townhomes/14.webp",
      "images/trinity-townhomes/15.webp",
      "images/trinity-townhomes/16.webp",
      "images/trinity-townhomes/17.webp",
      "images/trinity-townhomes/18.webp",
      "images/trinity-townhomes/19.webp",
      "images/trinity-townhomes/20.webp"
    ]
  }
];
const cards=document.getElementById("cards"),count=document.getElementById("count"),empty=document.getElementById("empty"),dlg=document.getElementById("detail");
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const mapUrl=p=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.address);
const mapEmbed=p=>"https://maps.google.com/maps?q="+encodeURIComponent(p.address)+"&z=15&output=embed";
function photo(p){return p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:'<div class="photo-pending">Property photos being added</div>'}
function gallery(p){
 const photos=p.photos||[];
 if(!photos.length)return photo(p);
 return `<div class="photo-slider" data-gallery="${p.id}" tabindex="0" aria-label="Photo gallery for ${p.title}"><img class="slide-image" src="${photos[0]}" alt="${p.title} photo 1" onerror="this.closest('.photo-slider').classList.add('gallery-missing')"><div class="gallery-fallback">Property photos being added</div><button type="button" class="slide-prev" aria-label="Previous photo">‹</button><button type="button" class="slide-next" aria-label="Next photo">›</button><span class="slide-count">1 / ${photos.length}</span></div>`;
}
function activateGalleries(root=document){
 root.querySelectorAll(".photo-slider").forEach(el=>{
  const p=listings.find(x=>x.id===Number(el.dataset.gallery));if(!p)return;
  let index=0;const photos=p.photos||[],img=el.querySelector(".slide-image"),counter=el.querySelector(".slide-count");
  const show=i=>{index=(i+photos.length)%photos.length;img.src=photos[index];img.alt=p.title+" photo "+(index+1);counter.textContent=(index+1)+" / "+photos.length;el.classList.remove("gallery-missing")};
  el.querySelector(".slide-prev").onclick=e=>{e.stopPropagation();show(index-1)};
  el.querySelector(".slide-next").onclick=e=>{e.stopPropagation();show(index+1)};
  let x=null;el.addEventListener("touchstart",e=>{x=e.changedTouches[0].screenX},{passive:true});el.addEventListener("touchend",e=>{if(x===null)return;const d=e.changedTouches[0].screenX-x;if(Math.abs(d)>40)show(index+(d<0?1:-1));x=null},{passive:true});
  el.addEventListener("keydown",e=>{if(e.key==="ArrowRight")show(index+1);if(e.key==="ArrowLeft")show(index-1)});
 });
}
let rentalMap=null,rentalMarkers=[];
function updatePriceMap(found){
 const node=document.getElementById("resultsMap");if(!node||!window.L)return;
 if(!rentalMap){
  rentalMap=L.map(node,{scrollWheelZoom:false}).setView([36.18,-86.79],12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(rentalMap);
 }
 rentalMarkers.forEach(marker=>rentalMap.removeLayer(marker));rentalMarkers=[];
 const grouped=new Map();
 found.forEach(p=>{const key=p.address.replace(/, Unit \d+/i,"");if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(p)});
 grouped.forEach((homes,address)=>{
  fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(address))
   .then(r=>r.ok?r.json():[]).then(loc=>{
    if(!loc.length)return;
    const point=[Number(loc[0].lat),Number(loc[0].lon)];
    const label=homes.length>1?money(homes[0].rent)+" · "+homes.length+" homes":money(homes[0].rent);
    const marker=L.marker(point,{icon:L.divIcon({className:"rental-price-icon",html:'<span>'+label+'</span>',iconSize:[130,42],iconAnchor:[65,42]})}).addTo(rentalMap);
    marker.bindPopup('<strong>'+homes.map(p=>p.title).join(" & ")+'</strong><p>'+label+'/mo</p><a href="#cards">View listings</a>');
    marker.on("click",()=>{const card=document.querySelector('[data-id="'+homes[0].id+'"]');if(card)card.closest(".property").classList.add("map-selected")});
    rentalMarkers.push(marker);rentalMap.setView(point,15);
   }).catch(()=>{});
 });
}
function render(){
 const term=document.getElementById("search").value.toLowerCase().trim(),type=document.getElementById("type").value,status=document.getElementById("status").value;
 const found=listings.filter(p=>(!term||[p.title,p.city,p.address,p.type].join(" ").toLowerCase().includes(term))&&(type==="all"||p.type===type)&&(status==="all"||p.status===status));
 count.textContent=found.length+" propert"+(found.length===1?"y":"ies");empty.hidden=found.length!==0;
 cards.innerHTML=found.map(p=>`<article class="property"><div class="property-photo">${gallery(p)}<span class="tag">${p.status}</span></div><div class="property-info"><span class="property-type">${p.type} · ${p.city}</span><h3>${p.title}</h3><div class="address">⌖ ${p.address}</div><div class="facts"><span>${p.beds} beds · ${p.baths} baths · ${p.sqft.toLocaleString()} sq ft</span><span>${p.garage}</span></div><div class="property-bottom"><span class="price">${p.rent?money(p.rent)+"/mo":p.status==="Rented"?"Rented":"Rent on request"}</span></div><div class="listing-actions"><button class="view" data-id="${p.id}">View property ↗</button><a class="map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">⌖ Map ↗</a></div></div></article>`).join("");
 activateGalleries(cards);
 updatePriceMap(found);
 cards.querySelectorAll("[data-id]").forEach(b=>b.addEventListener("click",()=>details(Number(b.dataset.id))));
}
function details(id){
 const p=listings.find(x=>x.id===id);
 document.getElementById("detailBody").innerHTML=`<div class="detail-image">${gallery(p)}</div><div class="detail-copy"><span class="overline">RENTTHATDOOR · PROPERTY DETAILS</span><h2>${p.title}</h2><div class="detail-status">${p.availableDate?"Available November 15, 2026":p.status}</div><p>${p.address}</p><p class="detail-price">${p.rent?money(p.rent)+"/month":p.status==="Rented"?"Currently rented":"Contact for pricing"}</p><p>${p.description}</p><p><strong>Features:</strong> ${p.beds} bedrooms · ${p.baths} bathrooms · ${p.sqft.toLocaleString()} sq ft · ${p.garage}</p>${p.leaseTerm?`<p><strong>Lease term:</strong> ${p.leaseTerm}</p>`:""}<h3>Location</h3><iframe class="property-map" loading="lazy" title="Map of ${p.address}" src="${mapEmbed(p)}" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="map-link detail-map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">Open larger map ↗</a><a class="btn btn-dark" href="#contact" id="detailContact">Ask about this home ↗</a></div>`;
 dlg.showModal();activateGalleries(document.getElementById("detailBody"));document.getElementById("detailContact").addEventListener("click",()=>{dlg.close();document.querySelector('[name="message"]').value="I would like more information about "+p.address+"."});
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