// app/data/Openings.ts

// API se aane wale types
export interface OpportunityItem {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface OpportunityGroup {
  _id: string;
  name: string;
  opportunity: OpportunityItem[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface OpportunitiesResponse {
  status: string;
  message: string;
  data: {
    opportunities: OpportunityGroup[];
    totalPages?: number;
    currentPage?: number;
    total?: number;
  };
}

// Component ke liye compatible types (existing structure)
export type Job = {
  title: string;
  description: string;
  image: string;
};

export type JobSection = {
  section: string;
  jobs: Job[];
};

export const jobOpenings: JobSection[] = [
  {
    section: "Design Job Openings",
    jobs: [
      {
        title: "UI Designer",
        description:
          "Bring your creativity and expertise to our team as a UI Designer. Collaborate with cross-functional teams to design visually stunning and user-friendly interfaces. Utilize your skills in layout design, typography, and color theory to create engaging digital experiences that leave a lasting impression.",
        image: "/images/op1.png",
      },
      {
        title: "UX Designer",
        description:
          "Join us as a UX Designer and help shape exceptional user experiences. Conduct user research, analyze data, and create wireframes and prototypes to design intuitive and user-centric interfaces. Collaborate closely with UI Designers, developers, and stakeholders to ensure seamless and enjoyable user journeys.",
        image: "/images/op2.png",
      },
      {
        title: "Design Head",
        description:
          "Lead our design team as a Design Head and drive the creative vision of our products. Provide strategic direction, mentorship, and guidance to UI and UX designers. Collaborate with cross-functional teams to ensure design consistency and elevate our brand identity through innovative and visually impactful designs.",
        image: "/images/op3.png",
      },
    ],
  },
  {
    section: "Development Job Openings",
    jobs: [
      {
        title: "Front-End Developer",
        description:
          "Join our team as a Front-End Developer and bring our designs to life. Transform UI/UX wireframes into interactive web interfaces using HTML, CSS, and JavaScript. Collaborate closely with designers and back-end developers to ensure seamless integration and optimal user experiences.",
        image: "/images/op4.png",
      },
      {
        title: "Back-End Developer",
        description:
          "Be part of our team as a Backend Developer and contribute to building robust and scalable web applications. Develop server-side logic, integrate databases, and optimize system performance. Collaborate with front-end developers to ensure smooth communication between the server and the user interface.",
        image: "/images/op5.png",
      },
      {
        title: "Full Stack Developer",
        description:
          "Join us as a Full Stack Developer and take on end-to-end responsibility for web application development. Combine your skills in both front-end and back-end technologies to create dynamic and responsive websites. Collaborate with designers, developers, and stakeholders to deliver comprehensive and user-friendly solutions.",
        image: "/images/op6.png",
      },
    ],
  },
  {
    section: "Management Job Openings",
    jobs: [
      {
        title: "BA Manager",
        description:
          "Lead our business analysis team as a BA Manager and drive strategic initiatives. Gather and analyze requirements, facilitate communication between stakeholders, and ensure project alignment with business objectives. Provide leadership and mentorship to a team of talented business analysts.",
        image: "/images/op7.png",
      },
      {
        title: "Project Manager",
        description:
          "Join our team as a Project Manager and oversee the successful delivery of projects from initiation to completion. Define project scope, manage timelines and resources, and ensure effective communication across cross-functional teams. Utilize your leadership and organizational skills to drive project success.",
        image: "/images/op8.png",
      },
      {
        title: "HR Manager",
        description:
          "Be part of our team as an HR Manager and play a vital role in managing our human resources. Lead talent acquisition, employee engagement, and performance management initiatives. Collaborate with leadership to develop and implement HR strategies that foster a positive and inclusive work culture.",
        image: "/images/op9.png",
      },
    ],
  },
  {
    section: "QA Job Openings",
    jobs: [
      {
        title: "QA Tester",
        description:
          "Ensure the quality of our software products as a QA Tester. Develop test plans, execute test cases, and identify and report software defects. Collaborate with developers and stakeholders to ensure that our products meet high-quality standards and deliver an exceptional user experience.",
        image: "/images/op10.png",
      },
      {
        title: "SQL Tester",
        description:
          "Join us as an SQL Tester and play a key role in testing and validating the integrity of our databases. Write complex SQL queries to perform data validation and identify any anomalies. Collaborate with developers and QA testers to ensure the accuracy and reliability of our data.",
        image: "/images/op11.png",
      },
      {
        title: "Manual Tester",
        description:
          "Be part of our team as a Manual Tester and perform comprehensive manual testing to ensure the quality and functionality of our software applications. Develop test cases, execute test scripts, and document test results. Collaborate with developers and QA testers to troubleshoot issues and enhance software performance.",
        image: "/images/op12.png",
      },
    ],
  },
];