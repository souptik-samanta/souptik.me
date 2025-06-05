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
      desc: "Interactive ML visualization tool with real-time parameter adjustment and model training visualization",
      tech: ["Python", "TensorFlow", "React", "D3.js"],
      github: "#",
      live: "#",
      color: "from-[#042B44] to-[#096B90]"
    },
    {
      title: "Discord Bot Army",
      desc: "Multi-purpose bot ecosystem serving 50K+ users with advanced moderation and automation",
      tech: ["Node.js", "Discord.js", "MongoDB", "Redis"],
      github: "#",
      live: "#",
      color: "from-[#096B90] to-[#A1CCDC]"
    },
    {
      title: "Crypto Trading Dashboard",
      desc: "Real-time cryptocurrency tracking with advanced charting and portfolio management",
      tech: ["React", "WebSocket", "Chart.js", "Node.js"],
      github: "#",
      live: "#",
      color: "from-[#A1CCDC] to-[#71B7D5]"
    },
    {
      title: "AI Code Assistant",
      desc: "VSCode extension with intelligent code completion and bug detection",
      tech: ["TypeScript", "OpenAI API", "VSCode API"],
      github: "#",
      live: "#",
      color: "from-[#71B7D5] to-[#096B90]"
    }
  ];

  const skills = [
    { name: "JavaScript", icon: Code, level: 95, color: "text-[#71B7D5]" },
    { name: "TypeScript", icon: Terminal, level: 92, color: "text-[#A1CCDC]" },
    { name: "React", icon: Cpu, level: 94, color: "text-[#096B90]" },
    { name: "Node.js", icon: Zap, level: 89, color: "text-[#71B7D5]" },
    { name: "Python", icon: Database, level: 87, color: "text-[#A1CCDC]" },
    { name: "UI/UX Design", icon: Palette, level: 83, color: "text-[#096B90]" },
  ];

  const testimonials = [
    {
      name: "Alexandra Chen",
      role: "Senior Developer @ Microsoft",
      text: "Souptik's code quality and architectural thinking rival developers with years more experience. Exceptional talent.",
      avatar: "AC"
    },
    {
      name: "James Rodriguez",
      role: "Tech Lead @ Stripe",
      text: "Delivered a complex payment integration ahead of schedule. His attention to detail and problem-solving skills are remarkable.",
      avatar: "JR"
    },
    {
      name: "Emily Watson",
      role: "CTO @ TechFlow",
      text: "Rare to find someone so young with such mature coding practices. Souptik is the future of software development.",
      avatar: "EW"
    }
  ];

  const blogPosts = [
    {
      title: "Building Scalable APIs: Lessons from Production",
      date: "3 days ago",
      readTime: "12 min read",
      tags: ["Backend", "Architecture", "Performance"],
      excerpt: "Deep dive into API design patterns that actually work in production environments."
    },
    {
      title: "The Psychology of Code Reviews",
      date: "1 week ago",
      readTime: "8 min read",
      tags: ["Team", "Culture", "Best Practices"],
      excerpt: "How to give and receive code reviews that actually improve team dynamics."
    },
    {
      title: "TypeScript: Beyond the Basics",
      date: "2 weeks ago",
      readTime: "15 min read",
      tags: ["TypeScript", "Advanced", "Tutorial"],
      excerpt: "Advanced TypeScript patterns for building robust, maintainable applications."
    }
  ];

  return (
    <div className="min-h-screen bg-[#08171E] text-white font-mono">
      <nav className="fixed top-0 w-full bg-[#08171E]/95 backdrop-blur-xl border-b border-[#096B90]/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-[#71B7D5] font-bold text-xl tracking-wide">
              &lt;/Souptik&gt;
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'testimonials', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-[#71B7D5] transition-all duration-300 relative ${
                    currentSection === item ? 'text-[#71B7D5]' : 'text-gray-300'
                  }`}
                >
                  {item}
                  {currentSection === item && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#71B7D5] to-[#A1CCDC]"></div>
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
          <div className="md:hidden bg-[#042B44] border-t border-[#096B90]/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'testimonials', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-[#71B7D5] capitalize w-full text-left transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#08171E] via-[#042B44] to-[#08171E]">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="text-[#71B7D5] text-sm mb-2 tracking-wide">~/souptik-samanta $</div>
            <div className="text-2xl md:text-4xl font-bold mb-4 min-h-[3rem] text-[#A1CCDC]">
              {typedText}<span className="animate-pulse">|</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#71B7D5] via-[#A1CCDC] to-[#096B90] bg-clip-text text-transparent leading-tight">
            Full Stack Developer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            16 years old • 4+ years of experience • Crafting digital experiences with precision and passion
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-[#096B90] to-[#71B7D5] px-10 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#71B7D5]/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Explore My Work
          </button>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-[#A1CCDC]" />
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            About <span className="text-[#71B7D5]">Me</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-[#71B7D5]">The Journey</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  My coding journey began at 12 when I discovered Python while trying to automate my homework. 
                  Four years later, I've built production applications, contributed to open source projects, 
                  and mentored other young developers. I believe in writing code that's not just functional, but elegant.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-[#A1CCDC]">Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm passionate about creating technology that makes a difference. Whether it's optimizing 
                  algorithms for better performance or designing intuitive user interfaces, I focus on 
                  solutions that are both technically sound and user-centered.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#096B90]/20 to-[#71B7D5]/20 p-8 rounded-2xl border border-[#71B7D5]/30 hover:scale-105 transition-all duration-300">
                <Coffee className="w-10 h-10 text-[#71B7D5] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Coffee-Driven Development</h4>
                <p className="text-gray-400">Averaging 5 cups during intensive coding sessions</p>
              </div>
              
              <div className="bg-gradient-to-r from-[#A1CCDC]/20 to-[#096B90]/20 p-8 rounded-2xl border border-[#A1CCDC]/30 hover:scale-105 transition-all duration-300">
                <Terminal className="w-10 h-10 text-[#A1CCDC] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Terminal Native</h4>
                <p className="text-gray-400">Vim enthusiast with custom dotfiles</p>
              </div>
              
              <div className="bg-gradient-to-r from-[#71B7D5]/20 to-[#A1CCDC]/20 p-8 rounded-2xl border border-[#096B90]/30 hover:scale-105 transition-all duration-300">
                <Globe className="w-10 h-10 text-[#096B90] mb-4" />
                <h4 className="font-semibold mb-3 text-xl">Open Source Advocate</h4>
                <p className="text-gray-400">25+ merged PRs across various projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-[#08171E] to-[#042B44]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Featured <span className="text-[#71B7D5]">Projects</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-[#042B44] to-[#08171E] rounded-2xl overflow-hidden border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className={`h-1 bg-gradient-to-r ${project.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#71B7D5] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-4 py-2 bg-[#096B90]/30 rounded-lg text-sm text-[#A1CCDC] border border-[#096B90]/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-6">
                    <a href={project.github} className="flex items-center space-x-2 text-gray-400 hover:text-[#71B7D5] transition-colors duration-300 group/link">
                      <Github className="w-5 h-5 group-hover/link:scale-110 transition-transform duration-300" />
                      <span>Source Code</span>
                    </a>
                    <a href={project.live} className="flex items-center space-x-2 text-gray-400 hover:text-[#A1CCDC] transition-colors duration-300 group/link">
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
            Technical <span className="text-[#71B7D5]">Expertise</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-500 group hover:transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <skill.icon className={`w-10 h-10 ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-[#08171E] rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-[#096B90] to-[#71B7D5] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[#A1CCDC] font-medium">{skill.level}% proficiency</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-[#042B44] to-[#08171E]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Client <span className="text-[#71B7D5]">Testimonials</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="mb-6">
                  <div className="flex text-[#71B7D5] mb-4 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#096B90] to-[#71B7D5] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-[#A1CCDC]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Latest <span className="text-[#71B7D5]">Articles</span>
          </h2>
          
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-gradient-to-br from-[#042B44] to-[#08171E] p-8 rounded-2xl border border-[#096B90]/30 hover:border-[#71B7D5]/50 transition-all duration-500 group hover:transform hover:scale-[1.01]">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#71B7D5] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center space-x-6 text-sm text-[#A1CCDC] mb-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-[#096B90]/30 rounded-lg text-xs text-[#71B7D5] border border-[#096B90]/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="bg-gradient-to-r from-[#096B90] to-[#71B7D5] px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#71B7D5]/25 transition-all duration-300 transform hover:scale-105">
                      Read Article →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-[#042B44] to-[#096B90] hover:from-[#096B90] hover:to-[#71B7D5] px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-[#096B90]/50">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 bg-gradient-to-t from-[#042B44] to-[#08171E] border-t border-[#096B90]/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-[#71B7D5] font-bold text-3xl mb-4">&lt;/Souptik&gt;</div>
            <p className="text-gray-300 text-lg">Crafting digital experiences with passion and precision.</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 bg-[#042B44] rounded-xl hover:bg-[#096B90] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#71B7D5]/25">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-[#A1CCDC] text-sm">
            © 2025 Souptik Samanta. Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;