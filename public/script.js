$(document).ready(function(){
  // Initialize Slick carousel for project-carousel elements (if any)
  $('.project-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });

  // Update time and greeting immediately, then every second.
  updateTimeAndGreeting();
  setInterval(updateTimeAndGreeting, 1000);
  
  // Add smooth scroll effect for buttons
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Extract the sectionId from the onclick attribute value.
      const match = this.getAttribute('onclick') && this.getAttribute('onclick').match(/scrollToSection\('(\w+)'\)/);
      if(match){
        scrollToSection(match[1]);
      }
    });
  });

  // Load projects from the /projects endpoint
  loadProjects();
  // Optionally refresh projects every minute.
  setInterval(loadProjects, 60000);
});

// Smooth scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if(section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Update time and greeting based on current time
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

// Apply a blur effect on the mountain image on scroll
document.addEventListener('scroll', function() {
  const mountainImage = document.getElementById('mountain-image');
  const scrollPosition = window.scrollY;
  const maxBlur = 20; // Maximum blur value
  const blurAmount = Math.min(scrollPosition / 10, maxBlur);
  mountainImage.style.filter = `brightness(0.8) blur(${blurAmount}px)`;
});

// Handle form submission for contact form (if exists)
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/send-email', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      contactForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send message.');
    });
  });
}

// --- Dynamic Projects Loading ---
// This function fetches project data from /projects (which reads from data.json)
// and injects the project cards into the #projects-container element.
function loadProjects() {
  $.getJSON('./', function(data) {
    const container = $("#projects-container");
    container.empty();
    if (data.length === 0) {
      container.append("<p>No projects added yet.</p>");
    } else {
      data.forEach(function(project) {
        const projectCard = $("<div>").addClass("project-card");
        if (project.img) {
          const img = $("<img>")
            .attr("src", project.img)
            .attr("alt", project.title)
            .css({ width: "200px", height: "auto" });
          projectCard.append(img);
        }
        const title = $("<h3>").text(project.title);
        projectCard.append(title);
        const buttonsDiv = $("<div>").addClass("project-buttons");
        if (project.repo) {
          const repoButton = $("<button>")
            .text("Repo")
            .click(function() { window.open(project.repo, "_blank"); });
          buttonsDiv.append(repoButton);
        }
        if (project.link) {
          const demoButton = $("<button>")
            .text("Demo")
            .click(function() { window.open(project.link, "_blank"); });
          buttonsDiv.append(demoButton);
        }
        projectCard.append(buttonsDiv);
        container.append(projectCard);
      });
    }
  });
}
