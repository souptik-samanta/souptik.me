function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

function updateTimeAndGreeting() {
  const timeElement = document.getElementById("time-display");
  const greetingElement = document.getElementById("greeting");
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeElement.textContent = `Time: ${hours}:${minutes}`;
  if (hours < 12) {
    greetingElement.textContent = "Good Morning";
  } else if (hours < 18) {
    greetingElement.textContent = "Good Afternoon";
  } else {
    greetingElement.textContent = "Good Evening";
  }
}
setInterval(updateTimeAndGreeting, 1000);
updateTimeAndGreeting();
