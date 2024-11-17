function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const now = new Date();
const hour = now.getHours();
const overlaySubtitle = document.querySelector('.subtitle');

if (hour < 12) {
  overlaySubtitle.textContent = "Good Morning! Hobbyist | Coder | Maker";
} else if (hour < 18) {
  overlaySubtitle.textContent = "Good Afternoon! Hobbyist | Coder | Maker";
} else {
  overlaySubtitle.textContent = "Good Evening! Hobbyist | Coder | Maker";
}


const mountainImage = document.querySelector('.mountain-image');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxBlur = 10; 
  const maxOpacity = 1; 
  const blurValue = Math.min(scrollY / 50, maxBlur); 
  const opacityValue = Math.min(scrollY / 300, maxOpacity); 

  mountainImage.style.filter = `blur(${blurValue}px)`;
});
