/**
 * Portfolio Content Data — Single Source of Truth
 * Sourced directly from developer identity.txt & user-verified details for Amitabh Sharma
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  tags: string[];
  metrics: string[];
  accentColor: string;
  githubUrl: string;
  liveUrl?: string;
  roleNotes?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Amitabh Sharma",
    initials: "AS",
    role: "Computer Science Engineering Student & Software Developer",
    tagline: "Building practical software with AI, data, and code.",
    institution: "BML Munjal University",
    degree: "B.Tech in Computer Science and Engineering",
    academicTimeline: "2025 – 2029",
    location: "Haryana / New Delhi, India",
    statusBadge: "Open to Opportunities & Collaborations",
    bioShort:
      "I am a Computer Science student at BML Munjal University building practical applications across machine learning, computer vision, and full-stack software. I focus on understanding systems thoroughly—from data pipelines and model training to responsive interfaces and system-level troubleshooting.",
  },

  hero: {
    badge: "CS Student & Software Developer // BML Munjal University",
    title: "AMITABH SHARMA",
    subtitle: "Software Developer // Applied AI/ML & Full-Stack Systems",
    scrollPrompt: "Scroll to explore journey",
  },

  overlaySections: {
    about: {
      tag: "01 / ABOUT ME",
      headline: "I build software to solve practical problems.",
      body: "From training machine learning models and computer vision pipelines to building full-stack web applications and exploring desktop system architectures, I focus on building reliable software with clean engineering fundamentals.",
      badges: ["Applied AI & ML", "Computer Vision", "Full-Stack Development"],
    },
    approach: {
      tag: "02 / ENGINEERING APPROACH",
      headline: "Understanding systems from data to deployment.",
      body: "My work spans the entire development lifecycle: exploratory data analysis, algorithmic experimentation, interface design, and systematic debugging. I prioritize honest evaluation metrics and pragmatic problem solving.",
      badges: ["End-to-End Pipelines", "Rigorous Model Evaluation", "Pragmatic Architecture"],
    },
  },

  skills: {
    sectionTag: "Technical Competencies",
    sectionTitle: "Skills & technical foundations.",
    sectionSubtitle:
      "Tools, languages, and frameworks I have worked with across projects, coursework, and systems exploration.",
    categories: [
      {
        title: "Programming Languages",
        description: "Core languages used for algorithms, modeling, and system experiments.",
        skills: ["Python", "Java", "JavaScript", "C", "C++"],
      },
      {
        title: "Machine Learning & Data Science",
        description: "Pipelines for data analysis, modeling, and hyperparameter tuning.",
        skills: [
          "scikit-learn",
          "Exploratory Data Analysis (EDA)",
          "XGBoost",
          "Hyperparameter Tuning",
          "Model Evaluation (MAE, R²)",
        ],
      },
      {
        title: "Computer Vision",
        description: "Convolutional architectures and object detection tooling.",
        skills: ["TensorFlow", "EfficientNetB0", "Ultralytics YOLO", "cvzone", "OpenCV"],
      },
      {
        title: "Web & Backend Development",
        description: "Building responsive interfaces and backend application servers.",
        skills: ["Node.js", "Express", "HTML5", "CSS3", "JavaScript (ES6+)", "Vite"],
      },
      {
        title: "Developer Tools & Workflows",
        description: "Environment tooling, version control, and collaborative workflows.",
        skills: ["Git", "GitHub", "Google Colab", "PyCharm"],
      },
      {
        title: "Systems Exploration",
        description: "Areas of ongoing technical investigation and architecture research.",
        skills: ["Windows Audio Architecture", "Virtual Audio Routing", "DSP Concepts"],
      },
    ] as SkillCategory[],
    telemetry: [
      { label: "Academic Timeline", value: "2025–2029", detail: "BML Munjal University" },
      { label: "Hackathon Track", value: "SIH26102", detail: "Smart India Hackathon" },
      { label: "Vision Models", value: "YOLO & CNN", detail: "Real-time hazard detection" },
      { label: "Engineering Scope", value: "Full Stack", detail: "AI, Web, & Desktop Tools" },
    ],
  },

  projects: [
    {
      id: "01",
      title: "StockSense",
      category: "Inventory & Financial Intelligence",
      status: "Odoo Hackathon Entry",
      description:
        "An intelligent stock management and predictive inventory platform engineered for the Odoo Hackathon, featuring automated tracking, predictive inventory insights, and streamlined workflow optimization.",
      tags: ["Python", "Full-Stack", "Data Analytics", "Hackathon", "Odoo"],
      metrics: ["Odoo Hackathon Entry", "Inventory Intelligence", "Workflow Automation"],
      accentColor: "from-emerald-500/20 to-teal-500/5",
      githubUrl: "https://github.com/amitabhexe/StockSense-hackathon-odoo",
      roleNotes: "Hackathon project: backend logic, data models, and inventory analytics pipeline.",
    },
    {
      id: "02",
      title: "MPLADS Watch",
      category: "Public Expenditure Anomaly Detection",
      status: "Smart India Hackathon 2026",
      description:
        "An AI-powered anomaly detection and investigation prioritization platform engineered for Smart India Hackathon (Problem SIH26102, MoSPI) to identify irregular public expenditure patterns for human audit.",
      tags: ["Python", "AI / ML", "Anomaly Detection", "Data Analytics", "SIH 2026"],
      metrics: ["SIH26102 Track", "MoSPI Domain", "Audit Prioritization"],
      accentColor: "from-cyan-500/20 to-blue-500/5",
      githubUrl: "https://github.com/amitabhexe/Smart-India-Hackathon--2026",
      roleNotes: "Smart India Hackathon team entry: anomaly detection methodology and data pipelines.",
    },
    {
      id: "03",
      title: "flameX",
      category: "Computer Vision & Hazard Detection",
      status: "Active Vision System",
      description:
        "Real-time fire and hazard detection system utilizing YOLO convolutional vision models and cvzone over network video streams (CCTV/LAN) for low-latency incident alerting.",
      tags: ["Python", "Computer Vision", "Ultralytics YOLO", "cvzone", "OpenCV"],
      metrics: ["Real-Time Video Stream", "YOLO Object Detection", "Rapid Hazard Alerting"],
      accentColor: "from-amber-500/20 to-orange-500/5",
      githubUrl: "https://github.com/amitabhexe/flame-x",
      roleNotes: "Vision pipeline setup, bounding box detection, and camera stream integration.",
    },
    {
      id: "04",
      title: "Resume Portfolio Generator",
      category: "Full-Stack & Developer Tooling",
      status: "Full-Stack Platform",
      description:
        "An automated resume and portfolio generation platform featuring document parsing, structured content extraction, LLM API integration, and dynamic portfolio scaffolding.",
      tags: ["Node.js", "Express", "JavaScript", "LLM APIs", "PDF Parsing"],
      metrics: ["Automated PDF Parsing", "LLM Integration", "Dynamic Scaffolding"],
      accentColor: "from-purple-500/20 to-pink-500/5",
      githubUrl: "https://github.com/amitabhexe/resume-portfolio-generator",
      roleNotes: "Backend architecture, document parsing pipeline, and AI-assisted generation workflows.",
    },
    {
      id: "05",
      title: "flingGUI",
      category: "Desktop Utility & Automation GUI",
      status: "Open Source Tool",
      description:
        "A responsive desktop graphical user interface providing an intuitive control dashboard and configuration wrapper for flingscript automation and desktop system utilities.",
      tags: ["Python", "Desktop GUI", "Automation", "System Tools"],
      metrics: ["Desktop Control Panel", "System Automation", "Clean UI Interface"],
      accentColor: "from-blue-500/20 to-indigo-500/5",
      githubUrl: "https://github.com/amitabhexe/flingscriptGUI",
      roleNotes: "GUI design, scripting backend hooks, and parameter management.",
    },
    {
      id: "06",
      title: "Independent Windows Audio Engine",
      category: "Systems & Audio DSP Research",
      status: "Work in Progress",
      description:
        "An experimental systems engineering research initiative exploring Windows audio architecture, endpoint discovery, virtual audio routing, and digital signal processing to develop an independent desktop audio controller.",
      tags: ["Windows Audio", "Audio Engineering", "DSP Research", "Systems Architecture"],
      metrics: ["Virtual Audio Routing", "Endpoint Discovery", "Work in Progress"],
      accentColor: "from-rose-500/20 to-amber-500/5",
      githubUrl: "Work in Progress",
      roleNotes: "Independent research into Windows Core Audio APIs, signal routing, and audio driver interaction.",
    },
  ] as ProjectItem[],

  education: {
    institution: "BML Munjal University",
    degree: "B.Tech in Computer Science and Engineering",
    timeline: "2025 – 2029",
    location: "Gurugram / Haryana, India",
    relevantCoursework: [
      "Data Structures and Algorithms",
      "Dynamic Programming, Backtracking & Greedy Algorithms",
      "Object-Oriented Programming with Java",
      "Linear Algebra & Discrete Mathematics",
      "Digital Electronics",
      "Applied Machine Learning & Data Science",
    ],
    milestones: [
      {
        title: "Smart India Hackathon (SIH26102)",
        organization: "Ministry of Statistics & Programme Implementation (MoSPI)",
        description:
          "Collaborated on an automated anomaly-detection pipeline and prioritization dashboard for public expenditure data.",
      },
      {
        title: "Odoo Hackathon Entry — StockSense",
        organization: "Inventory Intelligence Hackathon",
        description:
          "Developed an intelligent stock monitoring, prediction, and replenishment platform.",
      },
      {
        title: "Computer Vision & Hazard Detection — flameX",
        organization: "Real-time Vision Pipeline",
        description:
          "Engineered YOLO-based fire and hazard detection system capable of monitoring live CCTV/LAN video streams.",
      },
    ],
  },

  contact: {
    headline: "Let's connect.",
    subtext:
      "I am currently looking for software engineering internships, collaborative AI/ML projects, and opportunities to build impactful tools. Feel free to reach out directly.",
    email: "amitabh.sharma1310@gmail.com",
    github: "https://github.com/amitabhexe",
    linkedin: "https://www.linkedin.com/in/sharma-amitabh/",
    leetcode: "https://leetcode.com/u/amitabhsharma/",
    locationDisplay: "BML Munjal University, India",
  },
};
