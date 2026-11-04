// Confirm property-level specifications and availability before publishing them.\nconst listings=[
  {
    "id": 1,
    "title": "500 W Trinity Ln",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "500 W Trinity Ln, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 2,
    "title": "502 W Trinity Ln",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "502 W Trinity Ln, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 3,
    "title": "504 W Trinity Ln",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "504 W Trinity Ln, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 4,
    "title": "496 W Trinity Ln, Unit 3",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 3, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 5,
    "title": "496 W Trinity Ln, Unit 4",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 4, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 6,
    "title": "496 W Trinity Ln, Unit 5",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 5, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 7,
    "title": "496 W Trinity Ln, Unit 6",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 6, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  },
  {
    "id": 8,
    "title": "496 W Trinity Ln, Unit 7",
    "type": "Townhome",
    "city": "Nashville, TN",
    "address": "496 W Trinity Ln, Unit 7, Nashville, TN",
    "beds": null,
    "baths": null,
    "sqft": null,
    "rent": null,
    "status": "Contact for availability",
    "image": null,
    "description": "West Trinity Lane townhome. Contact us to confirm the floor plan, rental terms, and availability. Photos are being prepared for this individual listing."
  }
];
const cards=document.getElementById("cards"),count=document.getElementById("count"),empty=document.getElementById("empty"),dlg=document.getElementById("detail");
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const mapUrl=p=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.address);
const mapEmbed=p=>"https://maps.google.com/maps?q="+encodeURIComponent(p.address)+"&z=15&output=embed";
function photo(p){return p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:'<div class="photo-pending">Property photos being added</div>'}
function render(){
 const term=document.getElementById("search").value.toLowerCase().trim(),type=document.getElementById("type").value,status=document.getElementById("status").value;
 const found=listings.filter(p=>(!term||[p.title,p.city,p.address,p.type].join(" ").toLowerCase().includes(term))&&(type==="all"||p.type===type)&&(status==="all"||p.status===status));
 count.textContent=found.length+" townhome"+(found.length===1?"":"s");empty.hidden=found.length!==0;
 cards.innerHTML=found.map(p=>`<article class="property"><div class="property-photo">${photo(p)}<span class="tag">Details on request</span></div><div class="property-info"><span class="property-type">Townhome · Nashville, TN</span><h3>${p.title}</h3><div class="address">⌖ ${p.address}</div><div class="facts"><span>Floor plan: inquire</span><span>Availability: inquire</span></div><div class="property-bottom"><span class="price">Rent on request</span></div><div class="listing-actions"><button class="view" data-id="${p.id}">View property ↗</button><a class="map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">⌖ Map ↗</a></div></div></article>`).join("");
 cards.querySelectorAll("[data-id]").forEach(b=>b.addEventListener("click",()=>details(Number(b.dataset.id))));
}
function details(id){
 const p=listings.find(x=>x.id===id);
 document.getElementById("detailBody").innerHTML=`<div class="detail-image">${photo(p)}</div><div class="detail-copy"><span class="overline">WEST TRINITY LANE · NASHVILLE</span><h2>${p.title}</h2><div class="detail-status">Availability to be confirmed</div><p>${p.address}</p><p class="detail-price">Contact for pricing</p><p>${p.description}</p><h3>Location</h3><iframe class="property-map" loading="lazy" title="Map of ${p.address}" src="${mapEmbed(p)}" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="map-link detail-map-link" href="${mapUrl(p)}" target="_blank" rel="noopener noreferrer">Open larger map ↗</a><a class="btn btn-dark" href="#contact" id="detailContact">Ask about this home ↗</a></div>`;
 dlg.showModal();document.getElementById("detailContact").addEventListener("click",()=>{dlg.close();document.querySelector('[name="message"]').value="I would like more information about "+p.address+"."});
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