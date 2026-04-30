document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PROJECT SWITCH
  ========================= */
  const wrap = document.getElementById("projectSwitch");
  const tabs = document.querySelectorAll(".project-switch-btn");
  const lists = document.querySelectorAll(".project-list");
  const mainImg = document.getElementById("projectMainImage");

  function switchImage(newSrc) {
    if (!newSrc || mainImg.getAttribute("src") === newSrc) return;

    mainImg.style.opacity = "0";
    mainImg.style.transform = "scale(1.02)";

    setTimeout(() => {
      mainImg.src = newSrc;
      mainImg.onload = () => {
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1)";
      };
    }, 140);
  }

  function activate(btn) {
    const targetId = btn.dataset.target;
    const imgSrc = btn.dataset.image;

    tabs.forEach(b => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active);
    });

    lists.forEach(list => {
      list.classList.toggle("is-visible", list.id === targetId);
    });

    wrap.classList.toggle("is-panel", targetId === "panelProjects");

    switchImage(imgSrc);
  }

  tabs.forEach(btn => btn.addEventListener("click", () => activate(btn)));
  if (tabs.length) activate(document.querySelector(".project-switch-btn.is-active") || tabs[0]);


 
  /* =========================
     NAVBAR SCROLL
  ========================= */
  const navbar = document.querySelector(".navglass");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 80);
    });
  }


  /* =========================
     CHART (FIXED PROPERLY)
  ========================= */

const canvas = document.getElementById('turnoverChart');

if (canvas) {

const growthData = [
4423375.96,
2590532.66,
12870702.61,
19695861.43
];

let progress = 0;


/* =========================
   CUSTOM ARROW + LABEL PLUGIN
========================= */

const movingArrowPlugin = {

id:'movingArrow',

afterDatasetsDraw(chart){

const { ctx } = chart;

const meta = chart.getDatasetMeta(1);

if(!meta.data.length) return;

ctx.save();

ctx.strokeStyle='#24c24a';
ctx.lineWidth=5;
ctx.lineCap='round';

ctx.beginPath();


for(let i=0;i<meta.data.length-1;i++){

const p1 = meta.data[i];
const p2 = meta.data[i+1];

if(progress > i){

ctx.moveTo(p1.x,p1.y);

let percent = Math.min(progress-i,1);

let x = p1.x + (p2.x-p1.x)*percent;
let y = p1.y + (p2.y-p1.y)*percent;

ctx.lineTo(x,y);


/* MOVING ARROW WHILE DRAWING */
if(percent < 1){

ctx.stroke();

ctx.beginPath();

let angle=Math.atan2(
p2.y-p1.y,
p2.x-p1.x
);

ctx.translate(x,y);
ctx.rotate(angle);

ctx.moveTo(0,0);
ctx.lineTo(-15,-8);

ctx.moveTo(0,0);
ctx.lineTo(-15,8);

ctx.stroke();

ctx.setTransform(1,0,0,1,0,0);

break;

}

}

}

ctx.stroke();



/* FINAL DOT MORPHS INTO ARROW */
if(progress >= 3.99){

const last = meta.data[meta.data.length-1];
const prev = meta.data[meta.data.length-2];

let angle=Math.atan2(
last.y-prev.y,
last.x-prev.x
);

ctx.save();

ctx.translate(last.x,last.y);
ctx.rotate(angle);

/* cover last dot visually by drawing arrow over it */
ctx.beginPath();

ctx.moveTo(-24,0);
ctx.lineTo(0,0);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(0,0);
ctx.lineTo(-14,-11);

ctx.moveTo(0,0);
ctx.lineTo(-14,11);

ctx.stroke();

ctx.restore();

}


/* PROGRESSIVE VALUE LABELS */
ctx.save();

ctx.fillStyle='#111';
ctx.font='bold 13px Arial';
ctx.textAlign='center';

meta.data.forEach((point,index)=>{

/* show label only after arrow reaches point */
if(progress < index){
return;
}

const value = growthData[index];

const label =
'₹'+(value/1000000).toFixed(1)+'M';

let x = point.x;
let y = point.y - 18;


/* special position for final label */
if(index === meta.data.length-1){

x = point.x - 8;

/* move DOWN, not up, so it doesn't clip */
y = point.y + 26;

}

ctx.fillText(
label,
x,
y
);

});

ctx.restore();
ctx.restore();

}

};



/* =========================
   CHART
========================= */

const chart = new Chart(canvas,{

type:'bar',

data:{

labels:[
'2022-23',
'2023-24',
'2024-25',
'2025-26'
],

datasets:[

/* TEMP BARS */
{
type:'bar',
data:growthData,
backgroundColor:'rgba(229,57,53,.35)',
borderRadius:10,
borderSkipped:false,
barThickness:55
},

/* LINE COORDINATES */
{
type:'line',
data:growthData,
borderColor:'transparent',

pointRadius:function(context){

const index = context.dataIndex;
const lastIndex = context.dataset.data.length-1;

/* hide last dot when arrow replaces it */
if(index===lastIndex && progress>=3.99){
return 0;
}

return 6;

},

pointBackgroundColor:'#24c24a',
tension:.35
}

]

},

options:{

responsive:true,
maintainAspectRatio:false,

plugins:{
legend:{
display:false
}
},

scales:{

x:{
grid:{
display:false
}
},

y:{
grid:{
color:'rgba(0,0,0,.05)'
},
ticks:{
callback:function(v){
return '₹'+(v/1000000)+'M';
}
}
}

},

animation:false

},

plugins:[
movingArrowPlugin
]

});



/* =========================
   START ANIMATION
========================= */

let interval=setInterval(()=>{

progress += 0.03;

chart.draw();

if(progress>=3.99){

clearInterval(interval);

/* remove bars */
chart.data.datasets[0].backgroundColor='rgba(229,57,53,0)';

chart.update();

}

},30);

}
  /* =========================
     GALLERY MODAL
  ========================= */
  const items = document.querySelectorAll(".gallery-item, .featured-media");
  const modalEl = document.getElementById("galleryModal");
  const content = document.getElementById("galleryContent");

  if (items.length && modalEl && content) {
    const modal = new bootstrap.Modal(modalEl);

    items.forEach(item => {
      item.addEventListener("click", () => {
        const type = item.getAttribute("data-type");
        const src = item.getAttribute("data-src");

        content.innerHTML = type === "image"
          ? `<img src="${src}" style="max-height:90vh; max-width:100%; object-fit:contain;">`
          : `<video controls autoplay playsinline style="max-height:90vh; max-width:100%; object-fit:contain;">
               <source src="${src}" type="video/mp4">
             </video>`;

        modal.show();
      });
    });

    modalEl.addEventListener("hidden.bs.modal", () => {
      content.innerHTML = "";
    });
  }

});


