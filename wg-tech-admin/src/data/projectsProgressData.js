import { getAllProposals } from "./proposalsData";

// Get proposal details helper
const getProposalDetails = (proposalId) => {
  const proposals = getAllProposals();
  return proposals.find((proposal) => proposal.proposalId === proposalId);
};

// Projects Progress Data
export const projectsProgressData = [
  {
    id: 1,
    date: "2024-01-15",
    title: "Project Phase 1 Completion",
    description:
      "Successfully completed the initial phase of the project with all milestones achieved and exceeded expectations. The team delivered exceptional results and met all the predefined objectives while maintaining the highest quality standards throughout the development process. This comprehensive phase included extensive planning sessions, detailed requirement analysis, stakeholder consultations, initial development setup, database architecture design, API endpoint planning, and establishing the core infrastructure foundation. Our development team worked collaboratively across multiple time zones to ensure timely delivery while implementing cutting-edge technologies and best practices. The phase encompassed user experience research, wireframe creation, prototype development, security protocol implementation, performance optimization strategies, and comprehensive documentation. All team members demonstrated exceptional technical expertise and problem-solving capabilities, addressing complex challenges with innovative solutions. The client feedback has been overwhelmingly positive, with particular appreciation for our attention to detail, proactive communication, and ability to anticipate future requirements. Quality assurance testing was conducted at every stage, ensuring bug-free delivery and optimal performance. We have successfully established a robust foundation that will support scalable growth and future enhancements. The project timeline was maintained despite various challenges, and we are now fully prepared to proceed with the next phase of development with enhanced confidence and momentum.",
    proposalId: "12345678",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    ],
  },
  {
    id: 2,
    date: "2024-01-20",
    title: "Client Meeting & Review",
    description:
      "Conducted an extensive and comprehensive client review meeting where all stakeholders, including C-level executives, project managers, technical leads, and end-users, provided overwhelmingly positive feedback and expressed complete satisfaction with our progress. The project timeline and budget are not only on track but actually ahead of schedule with significant cost savings achieved through efficient resource management and innovative problem-solving approaches. During this detailed three-hour presentation meeting, we showcased all completed deliverables including interactive prototypes, comprehensive documentation, performance metrics, security audit reports, and user acceptance testing results. We thoroughly discussed the strategic roadmap for upcoming phases, including advanced feature implementations, scalability considerations, integration possibilities with third-party systems, and long-term maintenance strategies. The client was particularly impressed with our innovative user interface design that combines aesthetic appeal with exceptional functionality, the seamless integration of various complex modules, our proactive approach to identifying potential issues, and our commitment to continuous improvement. We conducted live demonstrations of key features, addressed all technical concerns with detailed explanations, incorporated their valuable suggestions for future enhancements, and provided comprehensive training materials for their internal teams. The meeting included detailed Q&A sessions, technical deep-dives, performance benchmarking discussions, and strategic planning for future collaborations. All stakeholders expressed confidence in our technical capabilities and project management expertise. The meeting concluded with unanimous approval to proceed with the next development cycle, along with requests for additional features and expanded scope based on our demonstrated excellence and reliability.",
    proposalId: "87654321",
    images: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop",
    ],
  },
  {
    id: 3,
    date: "2024-01-25",
    title: "Technical Implementation",
    description:
      "Advanced technical features have been implemented successfully with exceptional attention to detail and comprehensive testing protocols. The system architecture has been completely redesigned and optimized, making it significantly more robust, scalable, and future-ready for extensive enhancements and feature additions. We have successfully integrated cutting-edge technologies including artificial intelligence-powered analytics with machine learning algorithms, real-time data processing capabilities with sub-second response times, advanced security protocols with multi-layer encryption, blockchain integration for data integrity, cloud-native microservices architecture, containerization with Docker and Kubernetes, automated CI/CD pipelines, and comprehensive monitoring systems. The backend infrastructure has been completely overhauled and optimized for superior performance, reliability, and scalability, implementing load balancing, database sharding, caching strategies, and distributed computing principles. All RESTful APIs and GraphQL endpoints have been thoroughly tested using automated testing suites, performance benchmarking tools, and security vulnerability assessments, with comprehensive documentation including interactive API documentation, code examples, and integration guides. The system can now handle massive user loads with horizontal scaling capabilities, providing lightning-fast response times even under peak traffic conditions. Our development team has implemented comprehensive automated testing procedures including unit tests, integration tests, end-to-end tests, performance tests, security tests, and accessibility tests to ensure exceptional code quality, system stability, and maintainability. Additional features include real-time notifications, advanced search capabilities, data analytics dashboards, user behavior tracking, A/B testing frameworks, and comprehensive audit logging systems.",
    proposalId: "12345678",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bb8c0?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    ],
  },
  {
    id: 4,
    date: "2024-01-30",
    title: "Final Testing & Deployment",
    description:
      "Comprehensive testing completed across all modules. The application is now ready for production deployment with all quality checks passed. Our QA team conducted extensive testing including unit tests, integration tests, performance tests, and security audits. All identified issues have been resolved and the application meets all specified requirements. The deployment process has been automated and the system is now live in the production environment. User acceptance testing has been completed successfully with 100% approval rate. The project has been delivered on time and within budget, exceeding client expectations.",
    proposalId: "11223344",
    images: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop",
    ],
  },
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projectsProgressData.find((project) => project.id === parseInt(id));
};

// Helper function to get proposal details
export { getProposalDetails };
