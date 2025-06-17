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
    if (window.location.pathname.includes("formation.html")) {
        document.getElementById("caca").innerText = "xx";
}



}

  function openPopup() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("main-content").classList.add("blur");
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("main-content").classList.remove("blur");
  }

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
    
    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
    
  });
});

var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');
var cellCount = 15; // Nombre fixe de cellules
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', function() {
  selectedIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function() {
  selectedIndex++;
  rotateCarousel();
});

function changeCarousel() {
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (i < cellCount) {
      // Visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // Hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}

changeCarousel(); // Initial call to set up the carousel
 

