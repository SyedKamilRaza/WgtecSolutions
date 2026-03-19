// TypeScript Interface: Ye define karta hai ke har work item mein kya properties hongi
interface WorkItem {
  title: string; // Project ka naam
  image: string; // Image ka path
  brand: string; // Client ya brand ka naam
  url: string; // Project ka URL
  description: string; // Project ki detail
}

// TypeScript Interface: Ye define karta hai ke har category mein kya hoga
interface WorkCategory {
  categoryName: string; // Category ka heading (e.g., "Web Development")
  categoryDescription: string; // Category ki short description
  projects: WorkItem[]; // Is category ke sab projects (array of WorkItem)
}

// Main data structure - Array of categories with their projects
const workCardData: WorkCategory[] = [
  {
    categoryName: "Web Development Projects",
    categoryDescription:
      "Custom websites and web applications built with modern technologies",
    projects: [
      {
        title: "E-Commerce Platform for Fashion Hub",
        image: "/images/w1.png",
        brand: "Chic Boutique",
        url: "https://www.chicboutique.com",
        description:
          "We developed a visually stunning and user-friendly e-commerce platform for Chic Boutique, a renowned fashion retailer. The platform featured seamless product browsing, secure payment integration, and personalized recommendations, resulting in increased online sales and customer satisfaction.",
      },
      {
        title: "Web Portal for Real Estate Listings",
        image: "/images/w5.png",
        brand: "Dream Homes Realty",
        url: "https://www.dreamhomesrealty.com",
        description:
          "Dream Homes Realty wanted an intuitive web portal for showcasing their property listings. We created a visually appealing platform with advanced search filters, virtual tours, and a user-friendly interface, enabling potential buyers to find their dream homes easily.",
      },
      {
        title: "Educational Platform for Online Learning",
        image: "/images/w8.png",
        brand: "EduConnect",
        url: "https://www.educonnect.com",
        description:
          "EduConnect sought an educational platform to facilitate online learning. We developed an interactive platform with virtual classrooms, multimedia content, and student progress tracking, providing a seamless and engaging learning experience for students of all ages.",
      },
      {
        title: "Web Application for Customer Relationship Management",
        image: "/images/w10.png",
        brand: "ConnectCRM",
        url: "https://www.connectcrm.com",
        description:
          "ConnectCRM needed a web application to manage their customer relationships effectively. We developed a feature-rich CRM platform with lead management, communication tracking, and data analytics, enabling businesses to nurture customer relationships and drive growth.",
      },
      {
        title: "Restaurant Management Web Portal",
        image: "/images/eng1.png",
        brand: "TastyBites Chain",
        url: "https://www.tastybites.com",
        description:
          "TastyBites restaurant chain needed a comprehensive management system. We built a web portal for inventory management, staff scheduling, order tracking, and analytics dashboard, helping them streamline operations across multiple locations.",
      },
      {
        title: "Healthcare Patient Management System",
        image: "/images/eng2.png",
        brand: "MediCare Plus",
        url: "https://www.medicareplus.com",
        description:
          "MediCare Plus required a secure patient management system. We developed a HIPAA-compliant web application with appointment scheduling, electronic health records, prescription management, and telemedicine capabilities.",
      },
    ],
  },
  {
    categoryName: "Mobile App Development",
    categoryDescription:
      "Native and cross-platform mobile applications for iOS and Android",
    projects: [
      {
        title: "Mobile App for Food Delivery Service",
        image: "/images/w2.png",
        brand: "HungryBites",
        url: "https://www.hungrybites.com",
        description:
          "HungryBites approached us to create a mobile app that streamlined their food delivery service. The app included features like real-time order tracking, easy menu customization, and secure payment options, resulting in improved customer convenience and operational efficiency.",
      },
      {
        title: "Mobile App for Fitness Tracking",
        image: "/images/w6.png",
        brand: "FitLife Tracker",
        url: "https://www.fitlifetracker.com",
        description:
          "FitLife Tracker approached us to develop a mobile app that tracked fitness activities and provided personalized workout plans. The app included features such as activity tracking, progress monitoring, and social sharing, empowering users to lead healthier lifestyles.",
      },
      {
        title: "Mobile App for Travel Planning",
        image: "/images/w9.png",
        brand: "WanderWise",
        url: "https://www.wanderwise.com",
        description:
          "WanderWise wanted a mobile app that simplified travel planning and discovery. We developed an app with features like personalized itineraries, destination guides, and integrated booking options, making it easier for travelers to explore new destinations.",
      },
      {
        title: "Banking and Finance Mobile App",
        image: "/images/eng3.png",
        brand: "SecureBank",
        url: "https://www.securebank.com",
        description:
          "SecureBank needed a modern mobile banking solution. We created a secure app with features including account management, instant transfers, bill payments, investment tracking, and biometric authentication for enhanced security.",
      },
      {
        title: "Social Networking App for Communities",
        image: "/images/eng4.png",
        brand: "ConnectHub",
        url: "https://www.connecthub.com",
        description:
          "ConnectHub wanted to build a community-focused social platform. We developed a mobile app with real-time messaging, group creation, event planning, and content sharing features to help communities stay connected.",
      },
      {
        title: "On-Demand Service Booking App",
        image: "/images/eng5.png",
        brand: "QuickFix Pro",
        url: "https://www.quickfixpro.com",
        description:
          "QuickFix Pro required an app for booking home services. We built a platform connecting customers with service providers, featuring real-time booking, GPS tracking, in-app payments, and rating systems.",
      },
    ],
  },
  {
    categoryName: "E-Commerce Solutions",
    categoryDescription:
      "Complete online shopping platforms with payment integration and inventory management",
    projects: [
      {
        title: "Multi-Vendor E-Commerce Marketplace",
        image: "/images/w1.png",
        brand: "ShopHub Marketplace",
        url: "https://www.shophub.com",
        description:
          "ShopHub needed a multi-vendor marketplace platform. We developed a comprehensive solution with vendor dashboards, product management, order processing, payment gateway integration, and customer reviews system.",
      },
      {
        title: "Online Grocery Delivery Platform",
        image: "/images/w2.png",
        brand: "FreshMart Online",
        url: "https://www.freshmartonline.com",
        description:
          "FreshMart wanted to expand into online delivery. We created an e-commerce platform with inventory management, delivery slot booking, real-time stock updates, and same-day delivery tracking.",
      },
      {
        title: "Luxury Jewelry E-Commerce Store",
        image: "/images/w3.png",
        brand: "Elegance Jewels",
        url: "https://www.elegancejewels.com",
        description:
          "Elegance Jewels required a premium online store. We designed an elegant e-commerce platform with 3D product visualization, virtual try-on features, secure checkout, and personalized recommendations.",
      },
      {
        title: "Electronics & Gadgets Online Store",
        image: "/images/w4.png",
        brand: "TechZone Shop",
        url: "https://www.techzoneshop.com",
        description:
          "TechZone needed a modern electronics e-commerce site. We built a platform with advanced product filtering, comparison tools, warranty management, and tech support integration.",
      },
    ],
  },
  {
    categoryName: "Custom Software Solutions",
    categoryDescription:
      "Tailored software development for specific business needs and workflows",
    projects: [
      {
        title: "Custom Software for Workflow Automation",
        image: "/images/w4.png",
        brand: "ProTech Solutions",
        url: "https://www.protechsolutions.com",
        description:
          "ProTech Solutions needed automated workflow management. We developed custom software that automated their business processes, reduced manual tasks, improved team collaboration, and increased overall productivity by 40%.",
      },
      {
        title: "Custom Software for Supply Chain Management",
        image: "/images/w7.png",
        brand: "Global Logistics Solutions",
        url: "https://www.globallogisticssolutions.com",
        description:
          "Global Logistics Solutions required a custom software solution to streamline their supply chain operations. We developed a scalable system that optimized inventory management, automated order processing, and enhanced logistics tracking, resulting in improved efficiency and reduced costs.",
      },
      {
        title: "HR Management & Payroll System",
        image: "/images/w8.png",
        brand: "PeopleFirst HR",
        url: "https://www.peoplefirsthr.com",
        description:
          "PeopleFirst HR needed an integrated HR solution. We developed custom software for employee management, attendance tracking, payroll processing, leave management, and performance evaluation.",
      },
      {
        title: "Project Management & Collaboration Tool",
        image: "/images/w2.png",
        brand: "TaskMaster Pro",
        url: "https://www.taskmasterpro.com",
        description:
          "TaskMaster Pro wanted a comprehensive project management solution. We built a custom platform with task tracking, team collaboration, time logging, resource allocation, and project analytics.",
      },
      {
        title: "Manufacturing Production Management System",
        image: "/images/w3.png",
        brand: "IndustrialFlow",
        url: "https://www.industrialflow.com",
        description:
          "IndustrialFlow required a production management system. We developed software for production planning, quality control, equipment maintenance tracking, and real-time production monitoring.",
      },
    ],
  },
  {
    categoryName: "Event & Booking Management",
    categoryDescription:
      "Platforms for event planning, ticketing, and reservation systems",
    projects: [
      {
        title: "Booking and Reservation System for Event Management",
        image: "/images/w3.png",
        brand: "EventMasters",
        url: "https://www.eventmasters.com",
        description:
          "EventMasters required a comprehensive booking and reservation system for their event management services. We designed a user-friendly platform that allowed seamless event registration, ticketing, and attendee management, resulting in streamlined processes and enhanced customer experiences.",
      },
      {
        title: "Hotel Booking & Management System",
        image: "/images/w4.png",
        brand: "StayComfort Hotels",
        url: "https://www.staycomfort.com",
        description:
          "StayComfort Hotels needed a complete booking system. We developed a platform with online reservations, room management, guest services, housekeeping coordination, and revenue management tools.",
      },
      {
        title: "Conference & Seminar Management Platform",
        image: "/images/w10.png",
        brand: "ConferenceHub",
        url: "https://www.conferencehub.com",
        description:
          "ConferenceHub required an event management solution. We built a platform for attendee registration, speaker management, session scheduling, virtual event support, and post-event analytics.",
      },
      {
        title: "Restaurant Table Reservation System",
        image: "/images/w7.png",
        brand: "DineEasy",
        url: "https://www.dineeasy.com",
        description:
          "DineEasy needed a table booking system. We created a solution with online reservations, table management, waitlist handling, customer preferences tracking, and automated confirmation notifications.",
      },
    ],
  },
  {
    categoryName: "AI & Machine Learning Solutions",
    categoryDescription:
      "Intelligent systems powered by artificial intelligence and machine learning",
    projects: [
      {
        title: "AI-Powered Customer Support Chatbot",
        image: "/images/w7.png",
        brand: "SmartAssist AI",
        url: "https://www.smartassistai.com",
        description:
          "SmartAssist AI wanted an intelligent customer support solution. We developed an AI-powered chatbot with natural language processing, automated responses, sentiment analysis, and seamless human handoff capabilities.",
      },
      {
        title: "Predictive Analytics Dashboard for Sales",
        image: "/images/w5.png",
        brand: "SalesInsight Pro",
        url: "https://www.salesinsightpro.com",
        description:
          "SalesInsight Pro needed predictive analytics. We built a machine learning system that analyzes historical data, predicts sales trends, identifies opportunities, and provides actionable insights for sales teams.",
      },
      {
        title: "Image Recognition System for Quality Control",
        image: "/images/w8.png",
        brand: "VisionCheck Systems",
        url: "https://www.visioncheck.com",
        description:
          "VisionCheck Systems required automated quality control. We developed an AI-powered image recognition system that detects defects in manufacturing, reduces manual inspection time, and improves product quality.",
      },
      {
        title: "Voice Command Automation for Smart Homes",
        image: "/images/w9.png",
        brand: "HomeSync AI",
        url: "https://www.homesyncai.com",
        description:
          "HomeSync AI aimed to enhance smart home automation through voice recognition. We built an AI-based voice command system that integrates with IoT devices, enabling natural conversation-based home control.",
      },
      {
        title: "Fraud Detection Engine for Financial Transactions",
        image: "/images/w10.png",
        brand: "SecurePay Analytics",
        url: "https://www.securepayanalytics.com",
        description:
          "SecurePay Analytics needed a real-time fraud detection system. We designed a machine learning model that identifies anomalies, detects fraudulent activities, and minimizes financial risks using predictive intelligence.",
      },
    ],
  },
];

export default workCardData;
