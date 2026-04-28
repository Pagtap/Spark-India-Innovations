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
     HERO SLIDER
  ========================= */
  const herobg = document.getElementById("herobg");

  if (herobg) {
    const images = [
      "assets/heroimage.jpg",
      "assets/hero2.jpg",
      "assets/hero3.jpg",
      "assets/hero4.jpg"
    ];

    let current = 0;

    function showImage(index) {
      herobg.classList.remove("is-zooming");
      herobg.style.opacity = "0";

      setTimeout(() => {
        herobg.style.backgroundImage = `url('${images[index]}')`;
        herobg.style.opacity = "1";

        setTimeout(() => {
          herobg.classList.add("is-zooming");
        }, 50);
      }, 600);
    }

    herobg.style.backgroundImage = `url('${images[current]}')`;
    herobg.style.opacity = "1";

    setTimeout(() => herobg.classList.add("is-zooming"), 50);

    setInterval(() => {
      current = (current + 1) % images.length;
      showImage(current);
    }, 5000);
  }


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
  const ctx = document.getElementById('turnoverChart');
let chart;

if (ctx) {

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  
gradient.addColorStop(0, 'rgba(229,57,53,1)');
gradient.addColorStop(1, 'rgba(229,57,53,0.6)');

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022-23', '2023-24', '2024-25', '2025-26'],
      datasets: [{
        label: 'Turnover (INR)',
        data: [4423375.96, 2590532.66, 12870702.61, 19695861.43],
        backgroundColor: gradient,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 55
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          right: 20,
          left: 10,
          bottom: 10
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#111',
          titleColor: '#fff',
          bodyColor: '#ddd',
          borderColor: '#333',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return '₹ ' + (context.raw / 1000000).toFixed(1) + ' Million';
            }
          }
        },
        datalabels: {
          color: '#111',
          anchor: 'end',
          align: 'end',
          font: {
            weight: '700',
            size: 13
          },
          formatter: function(value) {
            return '₹' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              weight: '600'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0,0,0,0.05)',  // softer grid
            drawBorder: false
          },
          ticks: {
            color: '#9ca3af',
            callback: function(value) {
              return '₹' + (value / 1000000) + 'M';
            }
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      }
    },
   plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []
  });

  setTimeout(() => {
  chart.resize();
  }, 300);
  
  window.addEventListener('resize', () => {
    chart.resize();
  });
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



