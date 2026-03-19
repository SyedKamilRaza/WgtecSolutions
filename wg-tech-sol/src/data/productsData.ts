export type Product = {
  id: number;
  slug: string;
  title: string;
  image: string;
  brand: string;
  description: string;
  content: string;
  images: string[];
  videos: string[];
  price: string;
  category: string;
  features: string[];  
  date: string; 
};

const productsData: Product[] = [
  {
    id: 1,
    slug: "ecommerce-website-template",
    title: "E-Commerce Website Template",
    price: "PKR 25,000",
    category: "Web Templates",
    date: "2025-01-01",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo1",
      "https://www.youtube.com/watch?v=demo2"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Complete e-commerce solution with modern design, payment integration, and admin panel.",
    features: [
      "Responsive design for all devices",
      "Payment gateway integration (JazzCash, EasyPaisa, Stripe)",
      "Admin dashboard for product management",
      "Inventory tracking system",
      "Order management system",
      "Customer reviews and ratings",
      "SEO optimized",
      "Mobile app ready"
    ],
    content: `
E-Commerce Website Template: Complete Online Store Solution

Transform your business with our comprehensive e-commerce website template designed specifically for Pakistani businesses. This fully customizable solution provides everything you need to launch and manage your online store successfully.

Key Features:

🏪 Complete Store Management
Our e-commerce template includes a powerful admin dashboard that allows you to manage products, track inventory, process orders, and analyze sales data. The intuitive interface makes it easy for non-technical users to maintain their online store.

💳 Payment Integration
We've integrated multiple payment gateways popular in Pakistan, including JazzCash, EasyPaisa, and international options like Stripe and PayPal. This ensures your customers can pay using their preferred method.

📱 Mobile-First Design
With over 70% of internet users accessing websites through mobile devices, our template is built with a mobile-first approach. The responsive design ensures your store looks perfect on smartphones, tablets, and desktop computers.

🔍 SEO Optimization
Our template is built with SEO best practices in mind, helping your store rank higher in search engine results. This includes optimized page loading speeds, structured data markup, and clean URL structures.

🛒 Advanced Shopping Features
- Product variants and options
- Shopping cart and wishlist functionality
- Customer account management
- Order tracking system
- Email notifications
- Inventory management
- Discount and coupon system

🎨 Customization Options
The template comes with multiple pre-designed themes and color schemes. You can easily customize the appearance to match your brand identity without any coding knowledge.

🚀 Performance Optimized
Built with modern web technologies, our template ensures fast loading times and smooth user experience. This is crucial for reducing cart abandonment and improving customer satisfaction.

Technical Specifications:
- Built with React.js and Next.js
- MongoDB database integration
- Node.js backend
- RESTful API architecture
- Cloud-ready deployment
- SSL certificate included

Support and Updates:
- 6 months of free technical support
- Regular updates and security patches
- Documentation and video tutorials
- Community forum access

Perfect for:
- Fashion and clothing stores
- Electronics retailers
- Food and beverage businesses
- Home and garden stores
- Beauty and cosmetics brands
- Books and educational materials

Get started today and take your business online with our professional e-commerce solution!
    `
  },
  {
    id: 2,
    slug: "business-website-package",
    title: "Business Website Package",
    price: "PKR 15,000",
    category: "Web Development",
    date: "2025-01-01",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo3",
      "https://www.youtube.com/watch?v=demo4"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Professional business website with modern design, contact forms, and SEO optimization.",
    features: [
      "Professional design and layout",
      "Contact form with email integration",
      "About us and services pages",
      "Blog section for content marketing",
      "Social media integration",
      "Google Analytics integration",
      "SEO optimization",
      "Mobile responsive design"
    ],
    content: `
Business Website Package: Your Digital Presence Solution

Establish a strong online presence for your business with our comprehensive website package. Designed for small to medium-sized businesses, this solution provides everything you need to attract customers and showcase your services professionally.

Package Includes:

🏢 Professional Website Design
- Custom-designed homepage with your branding
- About us page to tell your story
- Services/products showcase pages
- Contact page with integrated contact form
- Blog section for content marketing

📞 Contact Management
- Professional contact form with spam protection
- Email integration for instant notifications
- Google Maps integration for location display
- Social media links and integration
- Phone number and WhatsApp integration

📈 SEO and Analytics
- Search engine optimization setup
- Google Analytics integration
- Google Search Console setup
- Meta tags and descriptions
- Sitemap generation
- Local SEO optimization

📱 Mobile Optimization
- Fully responsive design
- Fast loading times
- Touch-friendly navigation
- Mobile-optimized images
- Cross-browser compatibility

🎨 Design Features
- Modern and professional layout
- Custom color scheme matching your brand
- High-quality image optimization
- Interactive elements and animations
- Professional typography
- Clean and user-friendly navigation

📊 Content Management
- Easy-to-use content management system
- Image gallery management
- Blog post creation and editing
- Page updates without coding knowledge
- Backup and security features

Technical Features:
- Built with modern web technologies
- Fast and secure hosting
- SSL certificate included
- Regular backups
- Security monitoring
- 99.9% uptime guarantee

Perfect for:
- Professional services (lawyers, doctors, consultants)
- Local businesses and restaurants
- Real estate agencies
- Educational institutions
- Non-profit organizations
- Creative agencies

What You Get:
- Complete website design and development
- 3 months of free maintenance
- Training on content management
- SEO setup and optimization
- Social media integration
- Analytics and reporting setup

Launch your professional online presence today with our Business Website Package!
    `
  },
  {
    id: 3,
    slug: "mobile-app-development",
    title: "Mobile App Development Service",
    price: "PKR 50,000+",
    category: "Mobile Development",
    date: "2025-01-01",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo5",
      "https://www.youtube.com/watch?v=demo6"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Custom mobile app development for iOS and Android using React Native and Flutter.",
    features: [
      "Cross-platform development (iOS & Android)",
      "Custom UI/UX design",
      "Backend API integration",
      "Push notifications",
      "Offline functionality",
      "App store submission",
      "3 months free support",
      "Source code ownership"
    ],
    content: `
Mobile App Development Service: Bring Your Ideas to Life

Transform your business idea into a powerful mobile application with our comprehensive development service. We specialize in creating custom mobile apps that deliver exceptional user experiences and drive business growth.

Our Development Process:

📱 Discovery and Planning
- Requirements analysis and documentation
- User experience research and planning
- Technical architecture design
- Project timeline and milestone planning
- Cost estimation and proposal

🎨 Design and Prototyping
- User interface (UI) design
- User experience (UX) optimization
- Interactive prototypes
- Design system creation
- Brand integration and customization

⚡ Development and Testing
- Cross-platform development using React Native/Flutter
- Backend API development and integration
- Database design and implementation
- Quality assurance and testing
- Performance optimization

🚀 Deployment and Launch
- App store optimization (ASO)
- iOS App Store submission
- Google Play Store submission
- Launch strategy and marketing support
- User onboarding and training

🔧 Post-Launch Support
- Bug fixes and updates
- Feature enhancements
- Performance monitoring
- User feedback integration
- Ongoing maintenance and support

Technologies We Use:
- React Native for cross-platform development
- Flutter for high-performance apps
- Node.js for backend development
- MongoDB/PostgreSQL for databases
- AWS/Google Cloud for hosting
- Firebase for real-time features

App Types We Develop:
- E-commerce and marketplace apps
- Social networking applications
- Business and productivity tools
- Educational and learning apps
- Healthcare and fitness applications
- Entertainment and gaming apps
- Banking and fintech solutions

Key Features We Implement:
- User authentication and profiles
- Push notifications
- In-app messaging
- Payment integration
- Location-based services
- Offline functionality
- Analytics and reporting
- Multi-language support

Why Choose Us:
- 5+ years of mobile development experience
- Portfolio of 50+ successful apps
- Agile development methodology
- Transparent communication
- Competitive pricing
- Post-launch support included

Pricing Structure:
- Basic App: PKR 50,000 - 80,000
- Standard App: PKR 80,000 - 150,000
- Premium App: PKR 150,000 - 300,000
- Enterprise App: Custom pricing

Timeline:
- Simple App: 4-6 weeks
- Standard App: 8-12 weeks
- Complex App: 12-20 weeks
- Enterprise App: 20+ weeks

Get started with a free consultation and let's discuss your mobile app vision!
    `
  },
  {
    id: 4,
    slug: "ui-ux-design-service",
    title: "UI/UX Design Service",
    price: "PKR 20,000+",
    category: "Design Services",
    date: "2025-01-01",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo7",
      "https://www.youtube.com/watch?v=demo8"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Professional UI/UX design services for websites, mobile apps, and digital products.",
    features: [
      "User research and analysis",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Interactive prototypes",
      "Design system creation",
      "Usability testing",
      "Responsive design",
      "Design handoff to developers"
    ],
    content: `
UI/UX Design Service: Creating Exceptional User Experiences

Elevate your digital products with our comprehensive UI/UX design service. We combine creativity with user-centered design principles to create interfaces that not only look beautiful but also provide intuitive and engaging user experiences.

Our Design Process:

🔍 Research and Discovery
- User research and persona development
- Competitive analysis and benchmarking
- Business goals and requirements analysis
- User journey mapping
- Information architecture planning

📐 Wireframing and Prototyping
- Low-fidelity wireframes
- User flow diagrams
- Interactive prototypes
- Usability testing and iteration
- Stakeholder feedback integration

🎨 Visual Design
- Brand identity integration
- Color palette and typography selection
- Icon and illustration design
- High-fidelity mockups
- Responsive design layouts

🧪 Testing and Validation
- Usability testing sessions
- A/B testing setup
- User feedback collection
- Performance optimization
- Accessibility compliance

📱 Deliverables
- Complete design system
- Interactive prototypes
- Design specifications
- Asset libraries
- Style guides and documentation

Design Services We Offer:

Web Design
- Landing pages and marketing sites
- E-commerce platforms
- Corporate websites
- Portfolio and personal sites
- Web applications and dashboards

Mobile App Design
- iOS and Android app design
- Cross-platform design systems
- Mobile-first responsive design
- App store optimization graphics
- Icon and logo design

Digital Product Design
- SaaS platform interfaces
- Admin dashboards and panels
- Data visualization design
- Complex form and workflow design
- Enterprise application interfaces

Specializations:
- E-commerce and marketplace design
- Fintech and banking interfaces
- Healthcare and medical apps
- Educational platforms
- Social media and community apps
- Productivity and business tools

Design Tools We Use:
- Figma for design and prototyping
- Adobe Creative Suite
- Sketch for Mac users
- Principle for advanced animations
- InVision for collaboration
- Zeplin for developer handoff

Why Choose Our Design Service:
- User-centered design approach
- Modern and trendy design styles
- Accessibility and inclusive design
- Mobile-first methodology
- Cross-platform consistency
- Developer-friendly handoffs

Our Design Philosophy:
- Simplicity over complexity
- Functionality drives aesthetics
- User needs come first
- Data-informed design decisions
- Continuous improvement mindset

Pricing Packages:
- Basic Design: PKR 20,000 - 35,000
- Standard Design: PKR 35,000 - 60,000
- Premium Design: PKR 60,000 - 100,000
- Enterprise Design: Custom pricing

Timeline:
- Website Design: 2-4 weeks
- Mobile App Design: 4-8 weeks
- Complex Platform Design: 8-16 weeks

Let's create something amazing together! Contact us for a free design consultation.
    `
  },
  {
    id: 5,
    slug: "digital-marketing-package",
    title: "Digital Marketing Package",
    price: "PKR 30,000/month",
    category: "Digital Marketing",
    date: "2025-01-01",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo9",
      "https://www.youtube.com/watch?v=demo10"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Comprehensive digital marketing solution including SEO, social media, and content marketing.",
    features: [
      "Search Engine Optimization (SEO)",
      "Social media marketing and management",
      "Content creation and marketing",
      "Google Ads and Facebook Ads",
      "Email marketing campaigns",
      "Analytics and reporting",
      "Brand reputation management",
      "Monthly strategy reviews"
    ],
    content: `
Digital Marketing Package: Grow Your Business Online

Boost your online presence and drive more customers to your business with our comprehensive digital marketing package. We combine proven strategies with cutting-edge tools to deliver measurable results for your business.

Package Components:

🔍 Search Engine Optimization (SEO)
- Keyword research and analysis
- On-page and technical SEO optimization
- Local SEO for Pakistani businesses
- Link building and authority development
- Monthly SEO audits and reporting
- Google My Business optimization

📱 Social Media Marketing
- Facebook, Instagram, and LinkedIn management
- Content creation and posting
- Community engagement and customer service
- Social media advertising campaigns
- Influencer outreach and partnerships
- Social media analytics and insights

📝 Content Marketing
- Blog post creation and optimization
- Video content production
- Infographic and visual content design
- Email newsletter campaigns
- Content calendar planning
- Content performance tracking

💰 Paid Advertising
- Google Ads campaign management
- Facebook and Instagram advertising
- Display and remarketing campaigns
- Ad copy creation and optimization
- Landing page optimization
- ROI tracking and optimization

📊 Analytics and Reporting
- Google Analytics setup and monitoring
- Custom dashboard creation
- Monthly performance reports
- Conversion tracking setup
- ROI analysis and recommendations
- Competitive analysis

🎯 Target Audience Development
- Customer persona development
- Market research and analysis
- Competitor analysis
- Audience segmentation
- Behavioral analysis
- Customer journey mapping

Monthly Deliverables:
- 8-12 blog posts optimized for SEO
- 20-30 social media posts across platforms
- 2-4 email marketing campaigns
- Paid advertising campaign management
- Monthly performance report
- Strategy review and optimization

Industries We Serve:
- E-commerce and retail
- Healthcare and medical
- Professional services
- Real estate
- Food and restaurant
- Technology and software
- Education and training
- Non-profit organizations

Our Approach:
- Data-driven decision making
- Continuous testing and optimization
- Transparent reporting and communication
- ROI-focused strategies
- Local market expertise
- Mobile-first approach

Success Metrics We Track:
- Website traffic and engagement
- Search engine rankings
- Social media growth and engagement
- Lead generation and conversions
- Brand awareness and recognition
- Customer acquisition cost
- Return on advertising spend

Why Choose Our Digital Marketing Package:
- Experienced team of marketing professionals
- Proven track record with Pakistani businesses
- Custom strategies tailored to your industry
- Regular communication and updates
- Transparent reporting and analytics
- Competitive pricing and flexible packages

Get Started Today:
- Free initial consultation and audit
- Custom strategy development
- Competitive analysis report
- Implementation timeline
- Monthly performance reviews

Transform your online presence and grow your business with our digital marketing expertise!
    `
  },
  {
    id: 6,
    slug: "custom-web-application",
    title: "Custom Web Application Development",
    price: "PKR 100,000+",
    category: "Web Development",
    date: "2025-01-01",
          images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    ],
    videos: [
      "https://www.youtube.com/watch?v=demo11",
      "https://www.youtube.com/watch?v=demo12"
    ],
    image: "/images/w2.png",
    brand: "WGTechSol",
    description: "Tailored web applications built to meet your specific business requirements and workflows.",
    features: [
      "Custom functionality development",
      "Database design and implementation",
      "User authentication and authorization",
      "API development and integration",
      "Real-time features and notifications",
      "Admin dashboard and management",
      "Scalable architecture",
      "6 months free maintenance"
    ],
    content: `
Custom Web Application Development: Tailored Solutions for Your Business

Transform your business processes with our custom web application development service. We build sophisticated, scalable applications that are specifically designed to meet your unique business requirements and workflows.

Development Process:

🔍 Discovery and Planning
- Requirements gathering and analysis
- Technical architecture design
- Database schema planning
- User experience mapping
- Project timeline and milestone definition

🏗️ Architecture and Design
- System architecture design
- Database design and optimization
- API architecture planning
- Security framework implementation
- Scalability and performance planning

💻 Development and Implementation
- Frontend development with modern frameworks
- Backend API development
- Database implementation and optimization
- Third-party integrations
- Quality assurance and testing

🚀 Deployment and Launch
- Production environment setup
- Performance optimization
- Security hardening
- User training and documentation
- Go-live support and monitoring

🔧 Maintenance and Support
- Bug fixes and updates
- Feature enhancements
- Performance monitoring
- Security updates
- Ongoing technical support

Types of Applications We Build:

Business Management Systems
- Customer Relationship Management (CRM)
- Enterprise Resource Planning (ERP)
- Inventory Management Systems
- Project Management Platforms
- Human Resources Management
- Financial Management Systems

E-Commerce Solutions
- Multi-vendor marketplaces
- B2B e-commerce platforms
- Subscription-based services
- Digital product delivery
- Custom shopping experiences
- Integration with existing systems

Data Management Applications
- Business intelligence dashboards
- Data visualization tools
- Reporting and analytics platforms
- Document management systems
- Workflow automation tools
- Data integration platforms

Industry-Specific Solutions
- Healthcare management systems
- Educational platforms
- Real estate management
- Restaurant and hospitality
- Manufacturing and logistics
- Financial services applications

Technologies We Use:

Frontend Technologies
- React.js and Next.js
- Vue.js and Nuxt.js
- Angular and TypeScript
- Modern CSS frameworks
- Progressive Web Apps (PWA)

Backend Technologies
- Node.js and Express
- Python and Django
- PHP and Laravel
- Java and Spring Boot
- .NET and C#

Databases and Storage
- MongoDB and PostgreSQL
- MySQL and SQL Server
- Redis for caching
- AWS S3 and CloudFront
- Elasticsearch for search

Cloud and DevOps
- AWS and Google Cloud
- Docker containerization
- CI/CD pipelines
- Kubernetes orchestration
- Monitoring and logging

Key Features We Implement:
- User authentication and role-based access
- Real-time notifications and updates
- File upload and management
- Advanced search and filtering
- Reporting and analytics
- API integrations
- Mobile responsiveness
- Security and compliance

Why Choose Our Custom Development:
- 7+ years of development experience
- Agile development methodology
- Transparent communication
- Code quality and documentation
- Scalable and maintainable solutions
- Post-launch support included

Pricing Structure:
- Simple Application: PKR 100,000 - 200,000
- Standard Application: PKR 200,000 - 500,000
- Complex Application: PKR 500,000 - 1,000,000
- Enterprise Application: Custom pricing

Timeline:
- Simple App: 6-12 weeks
- Standard App: 12-24 weeks
- Complex App: 24-48 weeks
- Enterprise App: 48+ weeks

Let's discuss your requirements and build the perfect solution for your business!
    `
  }
];

export default productsData;
