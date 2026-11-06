export type Category = 'PCB' | '3D / Mechanical' | 'Firmware' | 'Software' | 'AI';

export interface Project {
  title: string;
  desc: string;
  category: Category;
  tech: string[];
  repo: string;
  link?: { label: string; href: string };
  stars?: number;
  year: string;
}

const gh = (name: string) => `https://github.com/souptik-samanta/${name}`;

export const featured: Project[] = [
  {
    title: 'HackDucky',
    desc: 'A pocket-sized USB keystroke-injection tool for automation and authorized security testing. Custom RP2040 board, custom firmware, and a payload scripting language.',
    category: 'PCB',
    tech: ['RP2040', 'KiCad', 'Firmware', 'Python'],
    repo: gh('Hackducky'),
    link: { label: 'hackducky.com', href: 'https://www.hackducky.com' },
    stars: 13,
    year: '2025',
  },
  {
    title: 'Chaos Compiler',
    desc: 'A from-scratch CoreXY / Cartesian hybrid 3D printer: 310×310×380 build volume, Klipper on a Pi 4, multicolor printing, auto bed leveling and a servo that kicks finished prints off the bed. Funded by the Hack Club Infill grant.',
    category: '3D / Mechanical',
    tech: ['Fusion 360', 'Klipper', 'KiCad', 'Raspberry Pi'],
    repo: gh('ChaosCompiler'),
    link: { label: 'Build notes', href: gh('ChaosCompiler') + '/blob/main/notes.md' },
    stars: 10,
    year: '2025',
  },
  {
    title: 'Sensor Node',
    desc: 'A low-power outdoor environmental node on an STM32L052: temperature and humidity sensing, onboard storage and a header for an external SX1262 LoRa module. Designed so one custom board replaces a pile of dev boards.',
    category: 'PCB',
    tech: ['STM32L0', 'LoRa', 'KiCad', 'C'],
    repo: gh('Sensor-Node'),
    year: '2026',
  },
  {
    title: 'Infrared Gun',
    desc: 'A non-contact thermometer with a very wide range. STM32F103 with USB-C, RTC, broken-out GPIO and a custom 3D-printed case.',
    category: 'PCB',
    tech: ['STM32F103', 'USB-C', 'KiCad', 'CAD'],
    repo: gh('Infrared-gun'),
    stars: 6,
    year: '2025',
  },
];

export const projects: Project[] = [
  {
    title: 'µBeat',
    desc: '16-LED PWM heart module on an STM32G031, powered straight from a CR2032. High-frequency multiplexing and controlled duty cycling give a realistic heartbeat on a coin cell.',
    category: 'PCB',
    tech: ['STM32G0', 'KiCad'],
    repo: gh('uBeat'),
    link: { label: 'Blueprint', href: 'https://blueprint.hackclub.com/projects/11916' },
    year: '2026',
  },
  {
    title: 'Filament Dryer',
    desc: 'Custom PCB plus a self-centering spool holder. Controls fans, monitors temperature and drives modular PTC heaters, so the heater is easy to swap or upgrade.',
    category: 'PCB',
    tech: ['KiCad', 'CAD', 'C++'],
    repo: gh('dryer'),
    year: '2026',
  },
  {
    title: 'LazyController',
    desc: 'A WiFi relay board so I never have to walk up to a switch again. Toggle lights, fans or pumps from a phone or browser.',
    category: 'PCB',
    tech: ['ESP', 'Relays', 'C++'],
    repo: gh('LazyController'),
    year: '2026',
  },
  {
    title: 'Fume Extractor',
    desc: 'Desk solder-fume extractor: a 12025 fan pulling air through a carbon filter, USB-C PD or DC jack in, simple control. No overthinking.',
    category: '3D / Mechanical',
    tech: ['CAD', '3D printing', 'Power'],
    repo: gh('Fume-extractor'),
    year: '2026',
  },
  {
    title: 'N20 Motor Mount',
    desc: 'Gear motor mount with a Pinecil holder, designed around N20 datasheets after a lot of trial and error on hole spacing and tolerances.',
    category: '3D / Mechanical',
    tech: ['CAD', '3D printing'],
    repo: gh('n20-mount'),
    year: '2026',
  },
  {
    title: 'ESP32-C3 Dev Board',
    desc: 'A compact custom ESP32-C3 board: USB-C, BOOT and EN buttons, PCB trace antenna and a UART header, with 0402/0603 passives.',
    category: 'PCB',
    tech: ['ESP32-C3', 'KiCad'],
    repo: gh('esp32c3'),
    year: '2026',
  },
  {
    title: 'ZephyrStation',
    desc: 'DIY weather station on a custom PCB with a Wemos C3 and a 1.8" TFT, pulling live data from the OpenWeatherMap API.',
    category: 'Firmware',
    tech: ['ESP32-C3', 'TFT', 'C++'],
    repo: gh('Weather_station'),
    year: '2025',
  },
  {
    title: 'Hydroponics Node',
    desc: 'Node.js API that polls an ESP32 every 10 seconds, backs readings up to JSON, serves them over HTTP and can switch the water pump.',
    category: 'Software',
    tech: ['Node.js', 'ESP32', 'REST'],
    repo: gh('Hydroponics'),
    year: '2025',
  },
  {
    title: 'Soup Pad / 88-key Keyboard',
    desc: 'Custom macropad and a full 88-key mechanical keyboard with its own PCB, case and BOM.',
    category: 'PCB',
    tech: ['KiCad', 'Python', 'CAD'],
    repo: gh('Kommie-keeb'),
    link: { label: 'keyboard.souptik.me', href: 'https://keyboard.souptik.me/' },
    year: '2025',
  },
  {
    title: 'Walkie Talkie',
    desc: 'A handheld two-way radio, documented in a build journal.',
    category: 'PCB',
    tech: ['RF', 'KiCad'],
    repo: gh('WalkieTalkie'),
    link: { label: 'Journal', href: gh('WalkieTalkie') + '/blob/main/JOURNAL.md' },
    stars: 5,
    year: '2025',
  },
  {
    title: 'Off-grid CCTV',
    desc: 'A cheap, off-grid camera. Several can join one router over WiFi and be monitored together.',
    category: 'Firmware',
    tech: ['ESP32', 'WiFi'],
    repo: gh('CCTV'),
    year: '2025',
  },
  {
    title: 'SU-57 PCB',
    desc: 'A PCB shaped like an SU-57 that blinks and glows when it gets dark.',
    category: 'PCB',
    tech: ['KiCad', 'Art PCB'],
    repo: gh('SU-57_PCB'),
    link: { label: 'View in KiCanvas', href: 'https://kicanvas.org/?github=https%3A%2F%2Fgithub.com%2Fsouptik-samanta%2FSU-57_PCB' },
    stars: 3,
    year: '2025',
  },
  {
    title: 'Julius: a small LLM',
    desc: 'A GPT-style model I trained from scratch on Colab. It took six Google accounts and 18 hours of 3-hour GPU slots. Published on Hugging Face.',
    category: 'AI',
    tech: ['PyTorch', 'Python', 'Hugging Face'],
    repo: gh('llm'),
    link: { label: 'Try it', href: 'https://huggingface.co/spaces/souptik1/Julius_souptik' },
    stars: 3,
    year: '2024',
  },
  {
    title: 'BillGen',
    desc: 'Multi-theme bill and business card generator with three themes and smooth animations.',
    category: 'Software',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: gh('BillGen'),
    link: { label: 'Live', href: 'https://bill-gen-eight.vercel.app' },
    stars: 2,
    year: '2025',
  },
  {
    title: 'Hack Club Reviewer Tools',
    desc: 'Small tools I built for reviewing Hack Club Arcade projects.',
    category: 'Software',
    tech: ['HTML', 'JavaScript'],
    repo: gh('for-reviewers'),
    link: { label: 'Live', href: 'https://souptik-samanta.github.io/Arcade-reviewers/' },
    stars: 6,
    year: '2024',
  },
];

export const categories: ('All' | Category)[] = ['All', 'PCB', '3D / Mechanical', 'Firmware', 'Software', 'AI'];

export const skillGroups = [
  { name: 'Hardware', items: ['KiCad', 'PCB design', 'STM32', 'ESP32', 'RP2040', 'LoRa', 'Soldering'] },
  { name: 'Mechanical', items: ['Fusion 360', '3D printing', 'CoreXY', 'Klipper', 'Enclosure design'] },
  { name: 'Software', items: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'Express', 'Python', 'C / C++'] },
  { name: 'Learning', items: ['AI / ML', 'Cybersecurity', 'Low-level / embedded'] },
];

export const testimonials = [
  {
    name: 'Dr. Sebastian Rachska',
    role: 'AI/ML Professor',
    text: 'Delivered a complex payment integration ahead of schedule. His attention to detail and problem-solving skills are remarkable.',
  },
  {
    name: 'Manan Sharma',
    role: 'Developer',
    text: "Souptik's PCB skills are exceptional, great innovator.",
  },
];
