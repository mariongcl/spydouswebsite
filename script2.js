

// --- CONTACT (3D FLIP) ---
 const card = document.querySelector('.card-inner');
 const container = document.querySelector('.card-container');

 if (card && container) {
     let flipped = false;

     container.addEventListener('mouseenter', () => {
         flipped = true;
     });

     container.addEventListener('mousemove', (e) => {
         const { width, height, left, top } = container.getBoundingClientRect();
         const x = e.clientX - left;
         const y = e.clientY - top;

         const rotateX = ((y / height) - 0.5) * -60;
         const rotateY = ((x / width) - 0.5) * -60;

         const flipAngle = flipped ? 180 : 0;

         card.style.transform = `rotateY(${rotateY + flipAngle}deg) rotateX(${rotateX}deg)`;
     });

     container.addEventListener('mouseleave', () => {
         flipped = false;
         card.style.transform = 'rotateY(0deg) rotateX(0deg)';
     });
 }


 
// --- CONTACT (3D FLIP) ---
const card2 = document.querySelector('.card-inner2');
const container2 = document.querySelector('.card-container2');

if (card2 && container2) {
    let flipped = false;

    container2.addEventListener('mouseenter', () => {
        flipped = true;
    });

    container2.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = container2.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateX = ((y / height) - 0.5) * -60;
        const rotateY = ((x / width) - 0.5) * -60;

        const flipAngle = flipped ? 180 : 0;

        card2.style.transform = `rotateY(${rotateY + flipAngle}deg) rotateX(${rotateX}deg)`;
    });

    container2.addEventListener('mouseleave', () => {
        flipped = false;
        card2.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}



 
// --- CONTACT (3D FLIP) ---
const card3 = document.querySelector('.card-inner3');
const container3 = document.querySelector('.card-container3');

if (card3 && container3) {
    let flipped = false;

    container3.addEventListener('mouseenter', () => {
        flipped = true;
    });

    container3.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = container3.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateX = ((y / height) - 0.5) * -60;
        const rotateY = ((x / width) - 0.5) * -60;

        const flipAngle = flipped ? 180 : 0;

        card3.style.transform = `rotateY(${rotateY + flipAngle}deg) rotateX(${rotateX}deg)`;
    });

    container3.addEventListener('mouseleave', () => {
        flipped = false;
        card3.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}
