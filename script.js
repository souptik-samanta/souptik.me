$(document).ready(function(){
  $('.project-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
});

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
    greetingElement.textContent = "Good Morning!";
  } else if (hours < 16) {
    greetingElement.textContent = "Good Afternoon!";
  } else if (hours < 19) {
    greetingElement.textContent = "Good Evening!";
  } else {
    greetingElement.textContent = "Good Night!";
  }
}

setInterval(updateTimeAndGreeting, 1000);
updateTimeAndGreeting();

// Add smooth scroll effect for buttons
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToSection(this.getAttribute('onclick').match(/scrollToSection\('(\w+)'\)/)[1]);
  });
});

// Scroll to blur effect
document.addEventListener('scroll', function() {
  const mountainImage = document.getElementById('mountain-image');
  const scrollPosition = window.scrollY;
  const maxBlur = 20; // Maximum blur value
  const blurAmount = Math.min(scrollPosition / 10, maxBlur); // Adjust the divisor to control the rate of blur
  mountainImage.style.filter = `brightness(0.8) blur(${blurAmount}px)`;
});

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch('/send-email', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    document.getElementById('contact-form').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to send message.');
  });
});