// Scroll to specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Dynamic Greeting Example
  const now = new Date();
  const hour = now.getHours();
  const heroSubtitle = document.querySelector('.subtitle');
  
  if (hour < 12) {
    heroSubtitle.textContent = "Good Morning! Engineer | Coder | Maker";
  } else if (hour < 18) {
    heroSubtitle.textContent = "Good Afternoon! Engineer | Coder | Maker";
  } else {
    heroSubtitle.textContent = "Good Evening! Engineer | Coder | Maker";
  }
  