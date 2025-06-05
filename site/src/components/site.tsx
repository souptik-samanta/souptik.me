import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Twitter, Mail, ExternalLink, Code, Coffee, Zap, Terminal, Cpu, Palette, Database, Globe } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Neural Network Playground",
      desc: "Interactive ML visualization tool",
      tech: ["Python", "TensorFlow", "React"],
      github: "#",
      live: "#",
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Discord Bot Army",
      desc: "Multi-purpose bot with 50K+ users",
      tech: ["Node.js", "Discord.js", "MongoDB"],
      github: "#",
      live: "#",
      color: "from-blue-400 to-cyan-400"
    },
    {
      title: "Crypto Price Tracker",
      desc: "Real-time crypto dashboard",
      tech: ["React", "WebSocket", "Chart.js"],
      github: "#",
      live: "#",
      color: "from-green-400 to-emerald-400"
    },
    {
      title: "Habit Tracker PWA",
      desc: "Gamified habit building app",
      tech: ["Vue.js", "PWA", "Firebase"],
      github: "#",
      live: "#",
      color: "from-orange-400 to-red-400"
    }
  ];

  const skills = [
    { name: "JavaScript", icon: Code, level: 95, color: "text-yellow-400" },
    { name: "TypeScript", icon: Terminal, level: 90, color: "text-blue-400" },
    { name: "React", icon: Cpu, level: 92, color: "text-cyan-400" },
    { name: "Node.js", icon: Zap, level: 88, color: "text-green-400" },
    { name: "Python", icon: Database, level: 85, color: "text-purple-400" },
    { name: "UI/UX", icon: Palette, level: 80, color: "text-pink-400" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior Dev @ TechCorp",
      text: "Souptik's code is clean, innovative, and always ahead of the curve. A true prodigy!",
      avatar: "AC"
    },
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      text: "Working with Souptik was amazing. He delivered beyond expectations every time.",
      avatar: "SJ"
    },
    {
      name: "Mike Rodriguez",
      role: "CTO @ StartupXYZ",
      text: "Rare to find someone so young with such mature coding skills. Highly recommend!",
      avatar: "MR"
    }
  ];

  const blogPosts = [
    {
      title: "Why I Switched from VS Code to Neovim",
      date: "2 days ago",
      readTime: "5 min read",
      tags: ["Tools", "Productivity"]
    },
    {
      title: "Building a REST API in 10 Minutes",
      date: "1 week ago",
      readTime: "8 min read",
      tags: ["Tutorial", "Backend"]
    },
    {
      title: "The Art of Clean Code (Teen Edition)",
      date: "2 weeks ago",
      readTime: "12 min read",
      tags: ["Best Practices", "Learning"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">

      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-green-400 font-bold text-xl">
              &lt;/Souptik&gt;
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'testimonials', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-green-400 transition-colors ${
                    currentSection === item ? 'text-green-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

  
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>


        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'testimonials', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-green-400 capitalize w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-green-400 text-sm mb-2">~/welcome-to-my-portfolio $</div>
            <div className="text-2xl md:text-4xl font-bold mb-4 min-h-[3rem]">
              {typedText}<span className="animate-pulse">|</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Teen Developer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            16 years old • Coding since 12 • Building the future one commit at a time
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-green-500 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </button>
          
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        </div>
      </section>


      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-green-400">About</span> Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-green-400">The Journey</h3>
                <p className="text-gray-300 leading-relaxed">
                  Started coding at 12 with Python because I wanted to make my own games. 
                  Now I'm 16 and obsessed with clean code, system design, and building 
                  things that matter. Currently exploring AI/ML and contributing to open source.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Current Focus</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building full-stack applications, learning cloud architecture, 
                  and preparing for computer science studies. Always down for hackathons 
                  and collaborative projects!
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                <Coffee className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="font-semibold mb-2">Fueled by Coffee & Curiosity</h4>
                <p className="text-sm text-gray-400">Average 4 cups/day during hackathons</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-lg border border-green-500/20">
                <Terminal className="w-8 h-8 text-green-400 mb-4" />
                <h4 className="font-semibold mb-2">Terminal Enthusiast</h4>
                <p className="text-sm text-gray-400">Vim keybindings everywhere</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-lg border border-blue-500/20">
                <Globe className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="font-semibold mb-2">Open Source Contributor</h4>
                <p className="text-sm text-gray-400">15+ PRs merged this year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="text-green-400">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-green-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href={project.github} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    <a href={project.live} className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Technical <span className="text-green-400">Skills</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <skill.icon className={`w-8 h-8 ${skill.color} mr-3`} />
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{skill.level}% proficiency</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section id="testimonials" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            What People <span className="text-green-400">Say</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-black font-semibold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Latest <span className="text-green-400">Blog Posts</span>
          </h2>
          
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-700 rounded text-xs text-green-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <button className="text-green-400 hover:text-green-300 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-gray-700 hover:bg-green-500 px-6 py-3 rounded-lg transition-colors">
              View All Posts
            </button>
          </div>
        </div>
      </section>


      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-green-400 font-bold text-2xl mb-2">&lt;/Souptik&gt;</div>
            <p className="text-gray-400">Building the future, one line of code at a time.</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2025 Souptik Samanta. Crafted with ❤️ and lots of ☕
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;