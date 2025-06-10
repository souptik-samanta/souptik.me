import { useState, useEffect } from 'react';
import { ChevronDown, Github, Mail, ExternalLink, Code, Coffee, Zap, Terminal, Cpu, Database, Globe, Instagram, CircuitBoard, Computer, Blocks, Aperture, Music, Play, Pause, Linkedin, Send, X } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mock Spotify data - replace with real API calls
  const [spotifyData, setSpotifyData] = useState({
    isPlaying: true,
    track: {
      name: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: 355000, // 5:55 in milliseconds
      progress: 120000, // 2:00 in milliseconds
      image: "https://via.placeholder.com/64x64/FFD700/000000?text=♪"
    }
  });

  const fullText = "const developer = 'Souptik Samanta';";

  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping]);

  // Mock Spotify progress update
  useEffect(() => {
    const interval = setInterval(() => {
      if (spotifyData.isPlaying && spotifyData.track.progress < spotifyData.track.duration) {
        setSpotifyData(prev => ({
          ...prev,
          track: {
            ...prev.track,
            progress: Math.min(prev.track.progress + 1000, prev.track.duration)
          }
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [spotifyData.isPlaying, spotifyData.track.progress]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'spotify', 'testimonials'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // In a real implementation, you would send this to your backend
    const contactData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Simulate storing data (in real app, send to your backend)
    console.log('Contact form submitted:', contactData);
    
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projects = [
    {
      title: "Ceasar GPT",
      desc: "A finetuned AI model which impersonates Roman dictator Julius Caesar.",
      tech: ["Python", "TensorFlow"],
      github: "https://github.com/souptik-samanta/Caesar-Gpt",
      live: "https://585f309f9b91b590a7.gradio.live/",
      color: "from-[#FFD700] to-[#FFA500]"
    },
    {
      title: "Chaos Compiler",
      desc: "A Corexy cum cartesian 3d printer made from scratch.",
      tech: ["CAD", "Fusion", "Kicad", "PCB"],
      github: "https://github.com/souptik-samanta/ChaosCompiler",
      live: "https://github.com/souptik-samanta/ChaosCompiler/blob/main/notes.md",
      color: "from-[#40E0D0] to-[#87CEEB]"
    },
    {
      title: "HackDucky",
      desc: "A rubber ducky made made from scratch with a custom firmware.",
      tech: ["Kicad", "PCB", "Low level programming"],
      github: "https://github.com/souptik-samanta/Hackducky",
      live: "https://kicanvas.org/?github=https%3A%2F%2Fgithub.com%2Fsouptik-samanta%2FHackducky%2Ftree%2Fmain%2Fsrc",
      color: "from-[#FFE55C] to-[#FFA500]"
    },
    {
      title: "WalkieTalkie",
      desc: "A WalkieTalkie with a BIG range.",
      tech: ["Kicad", "PCB", "Communication Tech"],
      github: "https://github.com/souptik-samanta/WalkieTalkie",
      live: "https://github.com/souptik-samanta/WalkieTalkie/blob/main/JOURNAL.md",
      color: "from-[#FFE55C] to-[#FFA500]"
    }
  ];

  const skills = [
    { name: "JavaScript", icon: Code, level: 95, color: "text-[#FFD700]"},
    { name: "TypeScript", icon: Terminal, level: 95, color: "text-[#40E0D0]" },
    { name: "React", icon: Cpu, level: 85, color: "text-[#87CEEB]" },
    { name: "Node.js", icon: Zap, level: 90, color: "text-[#48CAE4]" },
    { name: "Python", icon: Database, level: 85, color: "text-[#FFA500]"},
    { name: "CAD/3D modelling", icon: Blocks, level: 90, color: "text-[#FFE55C]" },
    { name: "Kicad/PCBs", icon: CircuitBoard, level: 90, color: "text-[#FFE55C]" },
    { name: "AI/ML", icon: Computer, level: 70, color: "text-[#FFE55C]" },
    { name: "Express.js", icon: Aperture, level: 90, color: "text-[#FFE55C]" }
  ];

  const testimonials = [
    {
      name: "Zach Latta",
      role: "Founder and Executive Director @ Hack Club",
      text: "Souptik is a great team player, exceptional developer.",
      avatar: "ZRL"
    },
    {
      name: "Dr. Sebastian Rachska",
      role: "AI/ML Professor",
      text: "Delivered a complex payment integration ahead of schedule. His attention to detail and problem-solving skills are remarkable.",
      avatar: "SR"
    },
    {
      name: "Manan Sharma",
      role: "Developer",
      text: "Souptik's PCB skills are exceptional, great innovator.",
      avatar: "MS"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001122] via-[#003366] to-[#004488] text-white font-mono relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-br from-[#87CEEB] to-[#00BFFF] rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-[#FFE55C] to-[#FF6B35] rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-br from-[#40E0D0] to-[#48CAE4] rounded-full opacity-25 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-[#FFEAA7] to-[#FFD93D] rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#001122] to-[#003366] rounded-2xl p-8 max-w-lg w-full border border-[#40E0D0]/30 relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-[#FFD700]">Get In Touch</h3>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#40E0D0] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-semibold text-[#40E0D0] mb-2">Message Sent!</h4>
                <p className="text-gray-300">Thanks for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#87CEEB] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#003366]/50 border border-[#40E0D0]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#87CEEB] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#003366]/50 border border-[#40E0D0]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#87CEEB] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#003366]/50 border border-[#40E0D0]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#87CEEB] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-[#003366]/50 border border-[#40E0D0]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#FFD700] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#40E0D0] px-6 py-3 rounded-lg font-semibold text-black hover:shadow-xl hover:shadow-[#FFD700]/40 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full bg-gradient-to-r from-[#001122]/95 via-[#003366]/95 to-[#004488]/95 backdrop-blur-xl border-b border-[#40E0D0]/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-[#FFD700] font-bold text-xl tracking-wide drop-shadow-lg">
              &lt;Souptik /&gt;
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'spotify', 'testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-[#FFD700] transition-all duration-300 relative ${
                    currentSection === item ? 'text-[#FFD700]' : 'text-gray-300'
                  }`}
                >
                  {item}
                  {currentSection === item && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-[#40E0D0]"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-[#001122] to-[#003366] border-t border-[#40E0D0]/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'spotify', 'testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-[#FFD700] capitalize w-full text-left transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center px-4 relative bg-big-sur"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-[#40E0D0]/30 to-[#87CEEB]/30 rounded-full blur-2xl"></div>
        <div className="text-center max-w-5xl mx-auto relative z-10 bg-[rgba(1,1,1,0.4)] p-5 rounded-2xl">
          <div className="mb-8">
            <div className="text-[#40E0D0] text-sm mb-2 tracking-wide">~/souptik-samanta $</div>
            <div className="text-2xl md:text-4xl font-bold mb-4 min-h-[3rem] text-[#87CEEB]">
              {typedText}<span className="animate-pulse">|</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#8ff7ff] bg-clip-text leading-tight drop-shadow-2xl">
            Hey! I'm Souptik.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            16 years old | Code | PCBs | 3D printers
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/souptik-samanta" className="p-4 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl hover:from-[#40E0D0] hover:to-[#FFD700] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD700]/25 border border-[#40E0D0]/30">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/souptik.me" className="p-4 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl hover:from-[#40E0D0] hover:to-[#FFD700] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD700]/25 border border-[#40E0D0]/30">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/souptik-samanta" className="p-4 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl hover:from-[#40E0D0] hover:to-[#FFD700] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD700]/25 border border-[#40E0D0]/30">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:me@souptik.me" className="p-4 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl hover:from-[#40E0D0] hover:to-[#FFD700] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD700]/25 border border-[#40E0D0]/30">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-[#FFD700] to-[#40E0D0] px-10 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#FFD700]/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-black mr-4"
          >
            Explore My Work
          </button>
          
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-gradient-to-r from-[#40E0D0] to-[#87CEEB] px-10 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#40E0D0]/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-black"
          >
            Get In Touch
          </button>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-[#40E0D0]" />
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4 relative">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-16 w-28 h-28 bg-gradient-to-br from-[#40E0D0]/15 to-[#87CEEB]/15 rounded-full blur-lg"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">
            About <span className="text-[#FFD700]">Me</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#001122]/80 to-[#003366]/80 p-8 rounded-2xl border border-[#40E0D0]/30 hover:border-[#FFD700]/50 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6 text-[#40E0D0]">The Journey</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                My coding journey began at 11 when I came across HTML. Five years later, I've built 3d printers, contributed to open source projects, and mentored other young developers. I want to get into AI/ML and cybersecurity in future. </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#001122]/80 to-[#003366]/80 p-8 rounded-2xl border border-[#40E0D0]/30 hover:border-[#FFD700]/50 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6 text-[#FFD700]">Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                 I'm passionate about creating tech pieces which make a difference, I want to make learning available to all. I believe that "A good world is where learning is available to all, no matter what their age, gender, creed or race is." 
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#40E0D0]/20 to-[#FFD700]/20 p-8 rounded-2xl border border-[#FFD700]/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Coffee className="w-10 h-10 text-[#FFD700] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Caffeine-driven development</h4>
                <p className="text-gray-400">Averaging 5 cans during intensive coding sessions</p>
              </div>
              
              <div className="bg-gradient-to-r from-[#87CEEB]/20 to-[#40E0D0]/20 p-8 rounded-2xl border border-[#87CEEB]/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Terminal className="w-10 h-10 text-[#87CEEB] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Low level enthusiast</h4>
                <p className="text-gray-400">I'm deep into low level tech and development.</p>
              </div>
              
              <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 p-8 rounded-2xl border border-[#40E0D0]/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Globe className="w-10 h-10 text-[#40E0D0] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Volunteering enthusiast</h4>
                <p className="text-gray-400">I've volunteered as a coder, reviewer at many small organisations. Currently I'm volunteering as a reviewer and developer at <a href='https://hackclub.com'>Hack Club</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-[#08171E] to-[#042B44]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Featured <span className="text-[#FFD60A]">Projects</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-[#042B44] to-[#08171E] rounded-2xl overflow-hidden border border-[#3A86FF]/30 hover:border-[#FFD60A]/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className={`h-1 bg-gradient-to-r ${project.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#FFD60A] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-4 py-2 bg-[#3A86FF]/30 rounded-lg text-sm text-[#87CEEB] border border-[#3A86FF]/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-6">
                    <a href={project.github} className="flex items-center space-x-2 text-gray-400 hover:text-[#FFD60A] transition-colors duration-300 group/link">
                      <Github className="w-5 h-5 group-hover/link:scale-110 transition-transform duration-300" />
                      <span>Source Code</span>
                    </a>
                    <a href={project.live} className="flex items-center space-x-2 text-gray-400 hover:text-[#87CEEB] transition-colors duration-300 group/link">
                      <ExternalLink className="w-5 h-5 group-hover/link:scale-110 transition-transform duration-300" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Technical <span className="text-[#FFD60A]">Expertise</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#3A86FF]/30 hover:border-[#FFD60A]/50 transition-all duration-500 group hover:transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <skill.icon className={`w-10 h-10 ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-[#08171E] rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#FFD60A] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[#87CEEB] font-medium">{skill.level}% proficiency</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="spotify" className="py-24 px-4 bg-gradient-to-b from-[#042B44] to-[#08171E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Currently <span className="text-[#1DB954]">Listening</span>
          </h2>
          
          <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#191414]/80 p-8 rounded-2xl border border-[#1DB954]/30 hover:border-[#1DB954]/50 transition-all duration-500 backdrop-blur-sm">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src={spotifyData.track.image} 
                  alt="Album Cover" 
                  className="w-20 h-20 rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Music className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white truncate">
                    {spotifyData.track.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {spotifyData.isPlaying ? (
                      <>
                        <div className="w-1 h-4 bg-[#1DB954] animate-pulse"></div>
                        <div className="w-1 h-6 bg-[#1DB954] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-3 bg-[#1DB954] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <div className="w-1 h-5 bg-[#1DB954] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </>
                    ) : (
                      <Pause className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-[#1DB954] mb-1">{spotifyData.track.artist}</p>
                <p className="text-gray-400 text-sm mb-4">{spotifyData.track.album}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(spotifyData.track.progress)}</span>
                    <span>{formatTime(spotifyData.track.duration)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 bg-gradient-to-r from-[#1DB954] to-[#1ed760] transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: `${(spotifyData.track.progress / spotifyData.track.duration) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSpotifyData(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                  className="p-3 bg-[#1DB954] rounded-full hover:bg-[#1ed760] transition-colors duration-300 hover:scale-110"
                >
                  {spotifyData.isPlaying ? (
                    <Pause className="w-6 h-6 text-black" />
                  ) : (
                    <Play className="w-6 h-6 text-black ml-1" />
                  )}
                </button>
                <a 
                  href="https://open.spotify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#191414] rounded-full hover:bg-[#1DB954] transition-colors duration-300 hover:scale-110"
                >
                  <ExternalLink className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              🎵 Music fuels my coding sessions • Follow me on Spotify for my coding playlists
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-[#042B44] to-[#08171E]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="text-[#FFD60A]">Testimonials</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#3A86FF]/30 hover:border-[#FFD60A]/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="mb-6">
                  <div className="flex text-[#FFD60A] mb-4 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3A86FF] to-[#FFD60A] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-[#87CEEB]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 bg-gradient-to-t from-[#042B44] to-[#08171E] border-t border-[#3A86FF]/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-[#FFD60A] font-bold text-3xl mb-4">&lt;Souptik /&gt;</div>
            <p className="text-gray-300 text-lg">Crafting digital experiences with passion and precision.</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com/souptik-samanta" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#3A86FF] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD60A]/25">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/souptik.me" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#3A86FF] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD60A]/25">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/souptik-samanta" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#3A86FF] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD60A]/25">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:souptiksamanta20141188@gmail.com" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#3A86FF] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFD60A]/25">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-[#87CEEB] text-sm">
            © 2025 Souptik Samanta. I have rights, dont try to copy it or i'll be angy &lt;/3
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;