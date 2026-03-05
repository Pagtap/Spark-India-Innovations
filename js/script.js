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