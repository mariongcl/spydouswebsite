document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tabs input[type='radio']");
    const glider = document.querySelector(".glider");

    // Désactive temporairement l'animation pour éviter le flash au chargement
    glider.style.transition = "none";

    // Vérifie si une valeur est stockée et applique-la sans animation
    const savedTab = localStorage.getItem("selectedTab") || "radio-1";
    document.getElementById(savedTab).checked = true;
    moveGlider(savedTab);

    // Réactive l'animation après un court délai pour qu'elle fonctionne normalement
    setTimeout(() => {
        glider.style.transition = "transform 0.3s ease-out, width 0.3s ease-out";
    }, 100);

    // Écoute le changement de sélection et stocke la valeur
    tabs.forEach(tab => {
        tab.addEventListener("change", function () {
            localStorage.setItem("selectedTab", this.id);
            moveGlider(this.id); // Anime le glider lors du changement

            // Attendre la fin de l'animation avant de rediriger
            setTimeout(() => redirectToPage(this.id), 300);
        });
    });

    function moveGlider(selectedId) {
        const selectedLabel = document.querySelector(`label[for='${selectedId}']`);
        if (selectedLabel) {
            glider.style.transform = `translateX(${selectedLabel.offsetLeft}px)`;
            glider.style.width = `${selectedLabel.offsetWidth}px`;
        }
    }

    function redirectToPage(selectedId) {
        const pages = {
            "radio-1": "index.html",
            "radio-2": "page2.html",
            "radio-3": "formation.html",
            "radio-4": "experience.html"
        };
        if (pages[selectedId]) {
            window.location.href = pages[selectedId];
        }
    }
});


function showResponsiveMenu() {
    var menu = document.getElementById("topnav_responsive_menu");
    var icon = document.getElementById("topnav_hamburger_icon");
    var root = document.getElementById("root");
    if (menu.className === "") {
      menu.className = "open";
      icon.className = "open";
      root.style.overflowY = "hidden";
    } else {
      menu.className = "";                    
      icon.className = "";
      root.style.overflowY = "";
    }
  }
