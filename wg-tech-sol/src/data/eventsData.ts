export type Event = {
  id: number;
  slug: string;
  title: string;
  image: string;
  brand: string;
  description: string;
  content: string;
  images: string[];
  videos: string[];
  date: string;
  location: string;
  type: 'archived' | 'upcoming';
};

const eventsData: Event[] = [
  {
    id: 1,
    slug: "tech-conference-2024",
    title: "Tech Conference 2024",
    type: "archived",
    date: "March 15, 2024",
    location: "Karachi, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6"
    ],
    videos: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=9bZkp7q19f0"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Annual tech conference featuring latest innovations in web development, AI, and digital transformation.",
    content: `
Tech Conference 2024: A Comprehensive Review

The Tech Conference 2024 was an extraordinary gathering of technology enthusiasts, developers, and industry leaders from across Pakistan and beyond. Held on March 15, 2024, in Karachi, this event brought together over 500 participants to explore the latest trends and innovations in technology.

Key Highlights:

1. Opening Keynote: "The Future of Web Development"
   Our keynote speaker discussed emerging technologies and their impact on the development landscape, emphasizing the importance of staying current with industry trends.

2. AI and Machine Learning Workshop
   Participants had the opportunity to dive deep into practical AI applications, with hands-on sessions covering machine learning frameworks and real-world implementations.

3. Panel Discussion: "Digital Transformation in Pakistan"
   Industry experts shared insights on how Pakistani businesses can leverage technology for growth and efficiency.

4. Networking Opportunities
   The conference provided ample networking opportunities, with dedicated sessions for startups, developers, and tech entrepreneurs to connect and collaborate.

5. Startup Showcase
   Ten innovative startups presented their solutions, ranging from fintech to healthcare technology.

The event was a tremendous success, with 95% of participants rating it as excellent or very good. We're already planning for next year's conference with even more exciting content and opportunities.

Special thanks to all our sponsors, speakers, and participants for making this event possible.
    `
  },
  {
    id: 2,
    slug: "web-development-bootcamp-2024",
    title: "Web Development Bootcamp 2024",
    type: "archived",
    date: "June 10-14, 2024",
    location: "Lahore, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    ],
    videos: [
      "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      "https://www.youtube.com/watch?v=8KaJRw-rfn8"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Intensive 5-day bootcamp covering modern web development technologies and best practices.",
    content: `
Web Development Bootcamp 2024: Intensive Learning Experience

Our 5-day Web Development Bootcamp in Lahore was designed to take participants from beginner to intermediate level in modern web development. The bootcamp covered essential technologies and frameworks that are currently in high demand in the industry.

Curriculum Overview:

Day 1: HTML5 and CSS3 Fundamentals
- Semantic HTML structure
- Advanced CSS techniques including Flexbox and Grid
- Responsive design principles
- CSS animations and transitions

Day 2: JavaScript ES6+ and DOM Manipulation
- Modern JavaScript features
- Asynchronous programming with Promises and Async/Await
- DOM manipulation and event handling
- Introduction to modules

Day 3: React.js Fundamentals
- Component-based architecture
- JSX syntax and props
- State management with hooks
- Event handling and forms

Day 4: Backend Development with Node.js
- Express.js framework
- RESTful API design
- Database integration with MongoDB
- Authentication and security

Day 5: Project Development and Deployment
- Full-stack project development
- Version control with Git
- Deployment strategies
- Performance optimization

Outcomes:
- 45 participants completed the bootcamp
- 92% reported significant improvement in coding skills
- 15 participants secured internships or job opportunities within 3 months
- 8 participants started their own freelance projects

The bootcamp emphasized hands-on learning with real-world projects, ensuring participants could immediately apply their new skills in professional settings.
    `
  },
  {
    id: 3,
    slug: "ai-workshop-2024",
    title: "AI Workshop 2024",
    type: "archived",
    date: "August 20, 2024",
    location: "Islamabad, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    videos: [
      "https://www.youtube.com/watch?v=aircAruvnKk",
      "https://www.youtube.com/watch?v=3dEp6m2W2YI"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Hands-on workshop on artificial intelligence, machine learning, and their practical applications.",
    content: `
AI Workshop 2024: Exploring the Future of Technology

The AI Workshop 2024 in Islamabad was a comprehensive exploration of artificial intelligence and machine learning technologies. This intensive one-day workshop attracted 120 participants from various backgrounds, including developers, business professionals, and students.

Workshop Modules:

1. Introduction to AI and Machine Learning
   - Understanding the basics of AI
   - Different types of machine learning
   - Real-world applications and use cases

2. Python for AI Development
   - Essential Python libraries (NumPy, Pandas, Scikit-learn)
   - Data preprocessing and visualization
   - Hands-on coding exercises

3. Machine Learning Algorithms
   - Supervised learning algorithms
   - Unsupervised learning techniques
   - Model evaluation and validation

4. Deep Learning Fundamentals
   - Neural networks basics
   - Introduction to TensorFlow and PyTorch
   - Practical deep learning examples

5. AI in Business Applications
   - Chatbots and virtual assistants
   - Recommendation systems
   - Predictive analytics

6. Ethics and Future of AI
   - AI ethics and responsible development
   - Future trends and opportunities
   - Career paths in AI

Key Takeaways:
- Participants built their first machine learning models
- Hands-on experience with popular AI frameworks
- Understanding of AI implementation in business contexts
- Networking opportunities with AI professionals

The workshop concluded with a project showcase where participants presented their AI solutions, demonstrating practical applications of the concepts learned during the day.
    `
  },
  {
    id: 4,
    slug: "tech-summit-2025",
    title: "Tech Summit 2025",
    type: "upcoming",
    date: "March 20, 2025",
    location: "Karachi, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview1",
      "https://www.youtube.com/watch?v=preview2"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Join us for the most anticipated tech event of 2025, featuring cutting-edge technologies and industry leaders.",
    content: `
Tech Summit 2025: Shaping the Future of Technology

We're excited to announce Tech Summit 2025, our most ambitious technology conference yet! This premier event will bring together industry leaders, innovators, and technology enthusiasts to explore the latest trends and innovations shaping our digital future.

What to Expect:

🚀 Emerging Technologies
- Artificial Intelligence and Machine Learning
- Blockchain and Web3 technologies
- Internet of Things (IoT) innovations
- Quantum computing developments

💡 Expert Speakers
- Industry leaders from top tech companies
- Successful entrepreneurs and startup founders
- Academic researchers and professors
- Government officials and policy makers

🤝 Networking Opportunities
- Connect with like-minded professionals
- Meet potential collaborators and partners
- Explore career opportunities
- Build lasting professional relationships

🎯 Interactive Sessions
- Hands-on workshops and coding sessions
- Panel discussions on hot topics
- Startup pitch competitions
- Technology demonstrations

📱 Startup Showcase
- Discover innovative startups
- Learn about emerging business models
- Explore investment opportunities
- Connect with entrepreneurs

Early Bird Registration:
- Super Early Bird (Until Dec 31, 2024): PKR 5,000
- Early Bird (Jan 1 - Feb 28, 2025): PKR 7,500
- Regular Price (Mar 1 - Mar 20, 2025): PKR 10,000

Registration includes:
- Access to all sessions and workshops
- Networking lunch and coffee breaks
- Conference materials and swag bag
- Digital certificate of participation

Don't miss this opportunity to be part of Pakistan's premier technology event. Register now and secure your spot at Tech Summit 2025!
    `
  },
  {
    id: 5,
    slug: "mobile-app-development-workshop-2025",
    title: "Mobile App Development Workshop 2025",
    type: "upcoming",
    date: "February 15, 2025",
    location: "Lahore, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview3",
      "https://www.youtube.com/watch?v=preview4"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Learn mobile app development with React Native and Flutter in this comprehensive workshop.",
    content: `
Mobile App Development Workshop 2025: Build Apps That Matter

Join us for an intensive mobile app development workshop where you'll learn to build cross-platform mobile applications using the latest technologies and frameworks. This hands-on workshop is designed for developers who want to expand their skills into mobile development.

Workshop Agenda:

📱 Day 1: Foundation and Setup
- Introduction to mobile app development
- React Native vs Flutter comparison
- Development environment setup
- First mobile app creation

🎨 Day 2: UI/UX for Mobile
- Mobile-first design principles
- Responsive layouts and components
- Navigation patterns
- User experience optimization

⚡ Day 3: Advanced Features
- State management solutions
- API integration and data handling
- Local storage and caching
- Push notifications

🔧 Day 4: Testing and Debugging
- Unit testing for mobile apps
- Integration testing strategies
- Performance optimization
- Debugging techniques

🚀 Day 5: Deployment and Publishing
- App store submission process
- Build configuration and optimization
- Release management
- Analytics and monitoring

What You'll Build:
During the workshop, participants will build a complete mobile application from scratch, including:
- User authentication system
- Data management and API integration
- Real-time features
- Offline functionality
- Push notifications

Prerequisites:
- Basic knowledge of JavaScript
- Familiarity with React (helpful but not required)
- Laptop with development environment setup

Workshop Benefits:
- Hands-on learning with real projects
- Expert instruction from industry professionals
- Networking opportunities with fellow developers
- Certificate of completion
- Access to exclusive resources and materials

Limited seats available! Register now to secure your spot in this exclusive workshop.
    `
  },
  {
    id: 6,
    slug: "cybersecurity-conference-2025",
    title: "Cybersecurity Conference 2025",
    type: "upcoming",
    date: "April 10, 2025",
    location: "Islamabad, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview5",
      "https://www.youtube.com/watch?v=preview6"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Stay ahead of cyber threats with the latest security technologies and best practices.",
    content: `
Cybersecurity Conference 2025: Protecting the Digital Future

In an increasingly connected world, cybersecurity has become more critical than ever. Join us for the Cybersecurity Conference 2025, where industry experts will share insights on the latest threats, defense strategies, and emerging technologies in cybersecurity.

Conference Themes:

🔒 Threat Landscape Analysis
- Current cyber threats and attack vectors
- Emerging security challenges
- Threat intelligence and analysis
- Incident response strategies

🛡️ Defense Technologies
- Next-generation firewalls and security tools
- AI-powered security solutions
- Zero-trust architecture implementation
- Cloud security best practices

👥 Human Factor in Security
- Security awareness training
- Social engineering prevention
- Insider threat management
- Security culture development

🏢 Enterprise Security
- Risk assessment and management
- Compliance and regulatory requirements
- Security governance frameworks
- Business continuity planning

🔬 Emerging Technologies
- Blockchain security applications
- IoT security challenges
- Quantum cryptography
- Biometric authentication systems

Keynote Speakers:
- Dr. Sarah Ahmed - Chief Security Officer, TechCorp Pakistan
- Muhammad Hassan - Senior Security Researcher, Google
- Aisha Khan - Director of Cybersecurity, State Bank of Pakistan
- Dr. Ali Raza - Professor of Computer Science, LUMS

Interactive Sessions:
- Live penetration testing demonstrations
- Security tool showcases
- Hands-on security workshops
- Panel discussions with industry leaders

Who Should Attend:
- Cybersecurity professionals
- IT managers and administrators
- Software developers
- Compliance officers
- Business executives
- Students and researchers

Conference Benefits:
- Latest insights from industry experts
- Networking with cybersecurity professionals
- Hands-on learning opportunities
- Access to exclusive resources
- Professional development credits

Don't miss this opportunity to enhance your cybersecurity knowledge and network with industry leaders. Register now for early bird pricing!
    `
  },
  {
    id: 7,
    slug: "data-science-workshop-2024",
    title: "Data Science Workshop 2024",
    type: "archived",
    date: "September 5-7, 2024",
    location: "Karachi, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4"
    ],
    videos: [
      "https://www.youtube.com/watch?v=ua-CiDNNj30",
      "https://www.youtube.com/watch?v=zv7Fth6g5d8"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Master data analysis, visualization, and predictive modeling with Python and R in this intensive workshop.",
    content: `
Data Science Workshop 2024: Transform Data into Insights

Our comprehensive 3-day Data Science Workshop in Karachi equipped participants with essential skills to analyze and interpret complex data. With 85 attendees from diverse backgrounds including business analysts, developers, and researchers, this workshop bridged the gap between theory and practical application.

Workshop Structure:

📊 Day 1: Data Analysis Fundamentals
- Introduction to data science ecosystem
- Python for data analysis (Pandas, NumPy)
- Data cleaning and preprocessing techniques
- Exploratory data analysis (EDA)
- Statistical concepts for data science

📈 Day 2: Data Visualization and Storytelling
- Data visualization principles
- Creating compelling visualizations with Matplotlib and Seaborn
- Interactive dashboards with Plotly and Dash
- Power BI and Tableau basics
- Data storytelling techniques

🤖 Day 3: Machine Learning and Predictive Modeling
- Introduction to machine learning
- Supervised and unsupervised learning algorithms
- Model training and evaluation
- Feature engineering strategies
- Real-world case studies

Hands-on Projects:
Participants worked on three real-world projects:
1. Customer churn prediction for a telecom company
2. Sales forecasting for retail business
3. Sentiment analysis on social media data

Workshop Outcomes:
- 78% of participants successfully completed all three projects
- 85% reported immediate application of skills in their work
- 12 participants transitioned to data science roles within their organizations
- 20 participants started freelancing in data analytics

Guest Speakers:
- Dr. Fatima Malik - Lead Data Scientist at Careem
- Ahmed Nasir - Analytics Manager at Daraz
- Sara Iqbal - Data Science Consultant

The workshop emphasized practical, hands-on learning with real datasets, ensuring participants could immediately apply their knowledge to solve business problems and make data-driven decisions.
    `
  },
  {
    id: 8,
    slug: "blockchain-summit-2025",
    title: "Blockchain Summit 2025",
    type: "upcoming",
    date: "May 18-19, 2025",
    location: "Karachi, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
      "https://images.unsplash.com/photo-1644143379190-08a5f055de1d"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview7",
      "https://www.youtube.com/watch?v=preview8"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Explore the future of blockchain, cryptocurrency, and decentralized applications in Pakistan's premier blockchain event.",
    content: `
Blockchain Summit 2025: Building the Decentralized Future

Get ready for Pakistan's largest blockchain and cryptocurrency conference! The Blockchain Summit 2025 will bring together blockchain enthusiasts, developers, investors, and industry leaders to explore the transformative potential of decentralized technologies.

Summit Highlights:

⛓️ Blockchain Technology Deep Dive
- Fundamentals of blockchain architecture
- Smart contracts and their applications
- Consensus mechanisms explained
- Scalability solutions (Layer 2, sharding)
- Blockchain security best practices

💰 Cryptocurrency and DeFi
- Understanding cryptocurrencies and tokens
- Decentralized Finance (DeFi) ecosystem
- NFTs and digital asset management
- Cryptocurrency trading and investment strategies
- Regulatory landscape in Pakistan

🏗️ Building on Blockchain
- Ethereum and Solidity development
- Web3 application development
- dApp architecture and design patterns
- Integration with traditional systems
- Testing and deployment strategies

🚀 Use Cases and Implementations
- Supply chain management
- Digital identity solutions
- Healthcare data management
- Financial services transformation
- Government applications

💼 Investment and Business Opportunities
- Blockchain startup ecosystem
- Token economics and fundraising
- Venture capital in blockchain
- Building sustainable blockchain businesses
- Exit strategies and scaling

Featured Speakers:
- Hamza Sheikh - Founder, Pakistani Blockchain Association
- Maria Khan - Head of Blockchain, National Bank of Pakistan
- Dr. Usman Ali - Blockchain Researcher, MIT
- Zainab Ahmad - CEO, CryptoStartup Pakistan

Interactive Activities:
- Live blockchain demonstrations
- Smart contract coding workshops
- Crypto trading simulations
- Startup pitch competition with PKR 1M prize pool
- Networking sessions with investors

Who Should Attend:
- Blockchain developers and engineers
- Cryptocurrency enthusiasts
- Investors and venture capitalists
- Business leaders and entrepreneurs
- Government officials and regulators
- Students and researchers

Ticket Pricing:
- Student Pass: PKR 3,000
- Professional Pass: PKR 12,000
- VIP Pass (includes exclusive networking dinner): PKR 25,000

Register before March 31, 2025, to get 30% early bird discount!
    `
  },
  {
    id: 9,
    slug: "uiux-design-bootcamp-2024",
    title: "UI/UX Design Bootcamp 2024",
    type: "archived",
    date: "July 22-26, 2024",
    location: "Lahore, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb"
    ],
    videos: [
      "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
      "https://www.youtube.com/watch?v=RFv7G9QPmFE"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Learn user-centered design principles and create stunning interfaces in this comprehensive design bootcamp.",
    content: `
UI/UX Design Bootcamp 2024: Design That Delights Users

Our intensive 5-day UI/UX Design Bootcamp in Lahore transformed 50 aspiring designers into skilled professionals capable of creating user-centered, visually appealing digital experiences. This bootcamp combined theoretical knowledge with practical application.

Bootcamp Curriculum:

🎨 Day 1: Design Fundamentals
- Principles of visual design
- Color theory and typography
- Layout and composition
- Design thinking methodology
- User research fundamentals

👤 Day 2: User Experience Research
- User personas and journey mapping
- Conducting user interviews
- Usability testing methods
- Information architecture
- Wireframing techniques

🖼️ Day 3: User Interface Design
- UI design principles and patterns
- Designing for different devices
- Creating design systems
- Figma/Adobe XD mastery
- Interactive prototyping

📱 Day 4: Mobile and Responsive Design
- Mobile-first design approach
- iOS and Android design guidelines
- Responsive design techniques
- Micro-interactions and animations
- Accessibility standards

🚀 Day 5: Portfolio and Career Development
- Building a design portfolio
- Case study presentation
- Freelancing tips and strategies
- Job interview preparation
- Industry trends and tools

Real Projects Completed:
Each participant designed and prototyped three complete projects:
1. E-commerce mobile app
2. SaaS dashboard interface
3. Personal portfolio website

Industry Mentors:
- Ayesha Farooq - Senior UX Designer at Shopify
- Hassan Raza - Product Designer at Microsoft
- Nadia Khan - UX Director at Systems Limited

Tools Covered:
- Figma (primary tool)
- Adobe XD
- Sketch
- InVision
- Miro (for collaboration)
- Hotjar (for analytics)

Success Metrics:
- 50 participants completed the bootcamp
- 100% portfolio completion rate
- 28 participants secured design positions within 2 months
- 15 participants started freelancing successfully
- Average salary increase of 45% for career switchers

Special Features:
- One-on-one portfolio review sessions
- Direct connections with hiring companies
- Lifetime access to bootcamp materials
- Post-bootcamp mentorship for 3 months
- Design community access

The bootcamp emphasized real-world applications and portfolio building, ensuring every participant left with tangible work samples and the confidence to pursue a design career.
    `
  },
  {
    id: 10,
    slug: "cloud-computing-workshop-2025",
    title: "Cloud Computing Workshop 2025",
    type: "upcoming",
    date: "March 28-29, 2025",
    location: "Islamabad, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview9",
      "https://www.youtube.com/watch?v=preview10"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Master cloud platforms (AWS, Azure, Google Cloud) and learn to build scalable cloud-native applications.",
    content: `
Cloud Computing Workshop 2025: Scale Your Applications to the Cloud

Join us for an intensive 2-day workshop focused on cloud computing technologies and best practices. Whether you're looking to migrate your applications to the cloud or build cloud-native solutions from scratch, this workshop will equip you with the knowledge and hands-on experience you need.

Workshop Agenda:

☁️ Day 1: Cloud Fundamentals and Services

Morning Session:
- Introduction to cloud computing (IaaS, PaaS, SaaS)
- AWS, Azure, and Google Cloud Platform overview
- Cloud architecture patterns
- Setting up cloud accounts and basic configurations
- Cost management and optimization strategies

Afternoon Session:
- Compute services (EC2, VMs, Compute Engine)
- Storage solutions (S3, Blob Storage, Cloud Storage)
- Database services (RDS, SQL Database, Cloud SQL)
- Networking in the cloud (VPC, Load Balancers)
- Hands-on: Deploy your first cloud application

🚀 Day 2: Advanced Cloud Services and DevOps

Morning Session:
- Serverless computing (Lambda, Functions, Cloud Functions)
- Container services (ECS, AKS, GKE)
- Kubernetes fundamentals
- Microservices architecture
- API Gateway and service mesh

Afternoon Session:
- CI/CD pipelines in the cloud
- Infrastructure as Code (Terraform, CloudFormation)
- Monitoring and logging (CloudWatch, Azure Monitor)
- Security best practices
- Hands-on: Build a complete cloud-native application

Practical Projects:
Participants will build:
1. A scalable web application with auto-scaling
2. Serverless REST API with authentication
3. Containerized microservices deployment
4. Complete CI/CD pipeline

Learning Objectives:
- Understand cloud service models and providers
- Design and deploy cloud infrastructure
- Implement security and compliance measures
- Optimize costs and performance
- Build scalable, resilient applications

Prerequisites:
- Basic programming knowledge (any language)
- Familiarity with Linux command line
- Understanding of networking basics
- Laptop with modern browser

Who Should Attend:
- Software developers and architects
- DevOps engineers
- IT professionals and system administrators
- Technical managers
- Anyone looking to start a cloud career

Workshop Benefits:
- Hands-on labs with real cloud resources
- Expert instruction from certified cloud professionals
- $100 cloud credits for practice (AWS/Azure/GCP)
- Certificate of completion
- Access to exclusive learning materials
- Career guidance and job opportunities

Instructors:
- Bilal Ahmed - AWS Solutions Architect Professional
- Hira Malik - Microsoft Azure MVP
- Kamran Ali - Google Cloud Certified Architect

Certification Path:
After the workshop, participants will be prepared for:
- AWS Certified Solutions Architect
- Microsoft Azure Administrator
- Google Cloud Associate Engineer

Pricing:
- Early Bird (Until Feb 28): PKR 15,000
- Regular (Mar 1-27): PKR 20,000
- Group Discount (3+ people): 20% off

Limited spots available! Register now and take your first step into cloud computing.
    `
  },
  {
    id: 11,
    slug: "devops-conference-2025",
    title: "DevOps Conference 2025",
    type: "upcoming",
    date: "June 15-16, 2025",
    location: "Lahore, Pakistan",
    images: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9"
    ],
    videos: [
      "https://www.youtube.com/watch?v=preview11",
      "https://www.youtube.com/watch?v=preview12"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Discover the latest DevOps practices, automation tools, and continuous delivery strategies from industry experts.",
    content: `
DevOps Conference 2025: Accelerating Software Delivery

Welcome to Pakistan's premier DevOps conference! Join hundreds of DevOps practitioners, engineers, and leaders as we explore the latest trends, tools, and practices in DevOps and continuous delivery. This two-day conference will feature keynotes, technical sessions, and hands-on workshops.

Conference Themes:

🔄 CI/CD and Automation
- Modern CI/CD pipelines
- GitOps and continuous delivery
- Test automation strategies
- Release management best practices
- Pipeline optimization techniques

🏗️ Infrastructure and Configuration
- Infrastructure as Code (IaC)
- Configuration management (Ansible, Puppet, Chef)
- Terraform advanced patterns
- Immutable infrastructure
- GitOps for infrastructure

📦 Containerization and Orchestration
- Docker best practices
- Kubernetes in production
- Service mesh implementations
- Container security
- Monitoring containerized applications

🔍 Monitoring and Observability
- Logging strategies (ELK, Splunk)
- Metrics collection and analysis (Prometheus, Grafana)
- Distributed tracing
- Incident management
- SRE principles and practices

🔒 DevSecOps
- Security in CI/CD pipelines
- Vulnerability scanning and management
- Secrets management
- Compliance automation
- Security testing strategies

Conference Schedule:

Day 1: Keynotes and Technical Tracks
9:00 AM - Opening Keynote: "The Evolution of DevOps"
10:30 AM - Parallel Sessions (3 tracks)
12:30 PM - Networking Lunch
2:00 PM - Afternoon Sessions
4:00 PM - Panel: "DevOps Challenges in Pakistan"
5:30 PM - Networking Reception

Day 2: Workshops and Case Studies
9:00 AM - Hands-on Workshops (choose one):
  • Building CI/CD with GitHub Actions
  • Kubernetes for DevOps Engineers
  • Terraform Infrastructure Automation
  • Monitoring with Prometheus & Grafana

1:00 PM - Lunch & Vendor Exhibition
2:30 PM - Case Studies from Local Companies
4:00 PM - Lightning Talks
5:00 PM - Closing Keynote: "Future of DevOps"

Featured Speakers:
- Asad Malik - DevOps Lead at Netflix
- Sana Iqbal - SRE Manager at Google
- Fahad Khan - Principal Engineer at Amazon
- Dr. Rabia Shah - DevOps Consultant and Author
- Omar Hassan - CTO at Local Startup

Workshops Include:
- Building production-ready Kubernetes clusters
- Implementing GitOps with ArgoCD
- Advanced Docker techniques
- Creating observability dashboards
- Infrastructure automation with Terraform

Who Should Attend:
- DevOps engineers
- Site Reliability Engineers (SREs)
- Software developers
- System administrators
- Cloud architects
- Engineering managers

Networking Opportunities:
- Meet DevOps practitioners from leading companies
- Connect with tool vendors and consultants
- Join special interest groups
- Participate in hackathon (optional)

Conference Benefits:
- 20+ technical sessions
- 4 hands-on workshops
- Networking with 300+ professionals
- Access to speaker presentations
- Conference swag and materials
- Digital certificate of attendance

Ticket Options:
- Individual Ticket: PKR 18,000
- Workshop Add-on: PKR 8,000
- VIP Pass (reserved seating + dinner): PKR 35,000
- Student Discount: 50% off (with valid ID)

Sponsorship Opportunities Available!

Early Bird Discount: Register before April 30 and save 25%!

Join us at DevOps Conference 2025 and accelerate your journey toward DevOps excellence!
    `
  }
];

export default eventsData;
