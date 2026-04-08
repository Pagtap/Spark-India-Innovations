document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("projectSwitch");
  const tabs = document.querySelectorAll(".project-switch-btn");
  const lists = document.querySelectorAll(".project-list");
  const mainImg = document.getElementById("projectMainImage");

  // if (!wrap || !tabs.length || !lists.length || !mainImg) return;

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
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });

    lists.forEach(list => {
      list.classList.toggle("is-visible", list.id === targetId);
    });

    // slider position
    if (targetId === "panelProjects") {
      wrap.classList.add("is-panel");
    } else {
      wrap.classList.remove("is-panel");
    }

    switchImage(imgSrc);
  }

  tabs.forEach(btn => btn.addEventListener("click", () => activate(btn)));

  // initial
  activate(document.querySelector(".project-switch-btn.is-active") || tabs[0]);
});


//hero image

document.addEventListener("DOMContentLoaded", () => {
  const herobg = document.getElementById("herobg");
  if (!herobg) return;

  const heroimages = [
    "assets/heroimage.jpg",
    "assets/hero2.jpg",
    "assets/hero3.webp",
    "assets/hero4.jpg",
  ];

  let current = 0;

  function showImage(index) {
    herobg.classList.remove("is-zooming");
    herobg.style.opacity = "0";

    setTimeout(() => {
      herobg.style.backgroundImage = `url('${heroimages[index]}')`;
      herobg.style.opacity = "1";

      setTimeout(() => {
        herobg.classList.add("is-zooming");
      }, 50);
    }, 800);
  }

  herobg.style.backgroundImage = `url('${heroimages[current]}')`;
  herobg.style.opacity = "1";

  setTimeout(() => {
    herobg.classList.add("is-zooming");
  }, 50);

  setInterval(() => {
    current = (current + 1) % heroimages.length;
    showImage(current);
  }, 5000);
});



const navbar = document.querySelector(".navglass");
window.addEventListener("scroll", function (){
  if(window.scrollY > 80){
  navbar.classList.add("scrolled");
}
  else {
  navbar.classList.remove("scrolled");
  }
})

const ctx = document.getElementById('turnoverChart');

if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022-23', '2023-24', '2024-25', '2025-26'],
      datasets: [{
        label: 'Turnover (INR)',
        data: [4423375.96, 2590532.66, 12870702.61, 19695861.43],
        borderColor: '#E53935',
        backgroundColor: 'rgba(229,57,53,0.2)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;
              return 'Turnover: ₹ ' + new Intl.NumberFormat('en-IN', {
                maximumFractionDigits: 2
              }).format(value);
            }
          }
        },
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₹ ' + new Intl.NumberFormat('en-IN', {
                maximumFractionDigits: 0
              }).format(value);
            }
          }
        }
      }
    }
  });
}