import { Company, CompanyData, JobCompany, JobListResponse } from "./Api";

// For local development with npm start
const MockApi = {
  listJobs: async (): Promise<JobListResponse> => {
    return {
      "totalCount": 782,
      "jobs": [
        {
          "jobkey": "05bd10b8d9548b2b",
          "title": "Senior Software Engineer, Trucking",
          "company": "Flexport",
          "companyIdEncrypted": "1a3fcede5c6e7bd1",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=05bd10b8d9548b2b&from=vjs&tk=1gkeplhm0k62s800&continueUrl=%2Fjobs%3Fpp%3DgQD_AAAAAAAAAAAAAAAB8fqGOgDyAQUBMGILdAa2AQYiBlUKB2kjC1KYOvGkzLU0MvEFozx7q2WqZqOqIL3E4Vf9SfdRXxs_B80nGVUfgk-PvoHWMd_ymGljc2Zmceykfa-hokJXPUPR1uewJBtcbQrC--rBjBa3AkH8qHnPPSiZGPIxOP8Bw0LVeroEfTkgjDZLKNeU9M18f_kU7hNyUsHythrQeLVyXD4aAHH1lJjZFZsq92AUSF-AC0oU3XS-3St0eYHXzfWNKcMQ5DfDs2E1V6BAPlGWf7_O8JcHgHVcxtLTIuRmJp16j4wKe4rUNsqZEIOC3vt3ndeNSoW5sxmMQCXXb5sAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D170%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2021-02-10T06:00:00Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": null,
          "jobLocationExtras": null,
          "formattedLocation": "Chicago, IL",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li style=\"margin-bottom:0px;\">Demonstrated ability to mentor junior <b>software</b> <b>engineers</b> in all aspects of their engineering skill-sets.</li>\n <li>5+ years of experience writing <b>software</b> and strong…</li>\n</ul>"
        },
        {
          "jobkey": "05e6e3c611dd7a85",
          "title": "Senior Backend Engineer (Remote)",
          "company": "Mode Mobile",
          "companyIdEncrypted": "00c7e1dbcaebe8d5",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=05e6e3c611dd7a85&from=vjs&tk=1gkepj455gai1801&continueUrl=%2Fjobs%3Fpp%3DgQBLAAAAAAAAAAAAAAAB8fqGOgB5AQIBEjAGC-PQ07H43fpo_nm8x1wyYOHaTNOutztQy7nGDn8rqKEYskjbp5TAm9Ti6HEYdMtdpSMIxzt0HG6EwUNVjeF3Ws2vnm9VFZWc6h2yoGtZPZLDV_U_fBYu3ySHmM6b3CujifjGFn0m_aSlu32Pv67cMga1vAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D50%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-02-14T06:00:00Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": null,
          "jobLocationExtras": null,
          "formattedLocation": "Chicago, IL",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li>You'll own projects from start to finish, working closely with our product and design team, applying scalable development patterns, maintainable code practices,…</li>\n</ul>"
        },
        {
          "jobkey": "06059cb6d2eb4560",
          "title": "Senior Software Engineer",
          "company": "StoneX Group",
          "companyIdEncrypted": "659838350f843377",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=06059cb6d2eb4560&from=vjs&tk=1gkepinelk60r800&continueUrl=%2Fjobs%3Fpp%3DgQAtAAAAAAAAAAAAAAAB8fqGOgBZAQMBCxgGEAk1y0aSSVh0VRUpGUOdNAG2BBVj44jhRQ2LL30kSPmcJEqQqX3c6nsoqwfUTA2EdlMI6D3GKCSYIb3A2SQr5W114hWcDb3LfSrWNNJ8GXKG7CwAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D30%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-10-07T05:00:00Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": "60604",
          "jobLocationExtras": "Loop",
          "formattedLocation": "Chicago, IL 60604",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li>Proven experience on <b>software</b> development of financial systems, at banks, prop firms, broker dealers.asset management firms.</li>\n</ul>"
        },
        {
          "jobkey": "061769c037d1e362",
          "title": "Senior Software Engineer US Remote",
          "company": "Motorola Solutions",
          "companyIdEncrypted": "22ec6ef3cc441ac2",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=061769c037d1e362&from=vjs&tk=1gkepmboegrgk801&continueUrl=%2Fjobs%3Fpp%3DgQE7AAAAAAAAAAAAAAAB8fqGOgD_AQUBQqwBCSwGxAEIHAhN5CvYUP-nISst9SY7x5OwxJ1szk7RPkL32CXzvE27Vunyav4wrferRHjl8d3cyW32PzpICvg-xtscyrIXaR6pHsVcMxkWIdXEUO5TCgnjw6dQvLkabnLtoEd3JQWV3YYMOinlrEmRdyi4D6ThuqIj5kwt79Sla3f5IWdiY5rHF5X1BSz5Dh9_0BN7CHYtPe46Dc6sRVpI5ESLuxXwhKmIeMiqLvQFoYrYosi9qNpEiQk6z9MqHFhKalNHhyvfllB3Vs0AxEgePDDxRrEWqB-tXKkQlibIqdbLk0c53-b16rnTk3xdzbkwTh-7sunEXU7hAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D210%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-08-10T19:20:04Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": "60661",
          "jobLocationExtras": "West Loop Gate",
          "formattedLocation": "Chicago, IL 60661",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li style=\"margin-bottom:0px;\">Department Overview Seeking talented professionals to join our team of <b>software</b> engineers.</li>\n <li>Senior <b>Software</b> <b>engineer</b> engaged in an engineering scrum team,…</li>\n</ul>"
        },
        {
          "jobkey": "06180d39042d9d9c",
          "title": "Senior Salesforce Developer - Remote",
          "company": "Eagle Creek Software Services",
          "companyIdEncrypted": "9519b78d91690a4e",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=06180d39042d9d9c&from=vjs&tk=1gkeptpjtklso800&continueUrl=%2Fjobs%3Fpp%3DgQLQAAAAAAAAAAAAAAAB8fqGOgCMAQIBESwLXbBmfsI-Ctrt0Cu7GIHaNNbiYEV_DYDIWSHK9RaO4HMmszK8HtekqSHpgB6tn8XQpCVvz5pL2ahZm3E1o5VgP_3CMeB9OGeNHfYCFy76l-DYI57ILn5isEdckZSjXyG0vNM_b0QzjVxyMtVHXb-2Ij7UFfjjuKxq-nMkRJkH_JKoPH83k2gAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D480%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2021-05-28T19:20:04Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": null,
          "jobLocationExtras": null,
          "formattedLocation": "Chicago, IL",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li style=\"margin-bottom:0px;\">3+ years’ experience with Salesforce.</li>\n <li style=\"margin-bottom:0px;\">2+ years APEX and Visualforce.</li>\n <li>Experience using web services, SOAP, XML, REST, MSMQ, workflow, XML, HTML, UML and…</li>\n</ul>"
        },
        {
          "jobkey": "06426563179f2100",
          "title": "React Developer Senior Solution Specialist - Location Open",
          "company": "Deloitte",
          "companyIdEncrypted": "9e215d88a6b33622",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=06426563179f2100&from=vjs&tk=1gkepk4dck62e800&continueUrl=%2Fjobs%3Fpp%3DgQCWAAAAAAAAAAAAAAAB8fqGOgC_AQMBJk4JGggOT7F4LAscTj7s2-s3ldkPxwx6fhPabtV6LdmlnSPisBfC165qi226CBYn2VD-0Mew7RTZLOZyIXkat_kUHe3hbSLxUfoevPV8XmB06ZK0P_YpPDEvjZqbpR3DNSuNDguJm-0NYeprpNaLRXvAld5SOsR7TKBDClge5cIDKGuX-vND1muUEMCbN-ssWugXmrk2IVvG65dgxAbB_Nvqjh4yfGadwcGp8HVwBPe7f_WJv0q9y79gaBMAAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D100%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-12-06T19:20:04Z",
          "jobLocationCity": "Chicago",
          "jobLocationState": "IL",
          "jobLocationPostal": "60606",
          "jobLocationExtras": "The Loop",
          "formattedLocation": "Chicago, IL 60606",
          "formattedRelativeTime": "9 days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li style=\"margin-bottom:0px;\">Developing new user-facing features using React.js.</li>\n <li style=\"margin-bottom:0px;\">Building reusable components and front-end libraries for future use.</li>\n <li>Familiar with responsive web design.</li>\n</ul>"
        },
        {
          "jobkey": "06c827d3826cb2f3",
          "title": "Senior Full Stack Developer - Typescript/NodeJS/VueJS/ReactJS...",
          "company": "Egen Solutions",
          "companyIdEncrypted": "27fdd91862765d39",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=06c827d3826cb2f3&from=vjs&tk=1gkeps6rfk619800&continueUrl=%2Fjobs%3Fpp%3DgQJYAAAAAAAAAAAAAAAB8fqGOgDWAQMBQrYBBzwGALn0e-8jigHYJWJGkwrDJPnt-IhWJQVj5uv0EzmgUfeGK4FtB_qg_fOA9_RjN6Ysig2UXHYXAtb9eNRo_Zt1XePYZFo2uyFqaUV37EZW2GZT9IVnLhnC15jjKjv9vdZuH2sqZ5KKnXAHAfavlQAafXbZzCkC-twwdRKB9SRg56PQtxRSNbV0jSCGli49V0_BlYvGmwoUjwJKxDH72JUGpsogysFb95nYuZ9XZJx8ixAdrXNS-Dei7s3A1KmISOT0lUNOnTLpYdmvVKnO3wAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D400%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-10-18T19:20:04Z",
          "jobLocationCity": "Naperville",
          "jobLocationState": "IL",
          "jobLocationPostal": "60563",
          "jobLocationExtras": null,
          "formattedLocation": "Naperville, IL 60563",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li style=\"margin-bottom:0px;\">Troubleshoot, debug and upgrade software.</li>\n <li style=\"margin-bottom:0px;\">Test <b>software</b> to ensure responsiveness and efficiency.</li>\n <li>Work with development teams and product managers to ideate…</li>\n</ul>"
        },
        {
          "jobkey": "06ce5d3ca9990e4e",
          "title": "Senior Cloud Test Automation Engineer (Hybrid)",
          "company": "WALGREENS",
          "companyIdEncrypted": "fefd75f5326e1589",
          "viewJobLink": "https://www.indeed.com/viewjob?viewtype=embedded&jk=06ce5d3ca9990e4e&from=vjs&tk=1gkepqgr7jrq4800&continueUrl=%2Fjobs%3Fpp%3DgQHgAAAAAAAAAAAAAAAB8fqGOgD3AQYBQpwBBg4MRgcQB3oIBbGqiKnIU6wXejpnrYfQgB4Q5ei69jpp4xiDn0CLN7NjcbHScMDfVajnmEuh8IYPBCcmjHuw4ldxGkILfY01RUR3A3R1LwqaXCscERN0n8aRzLjSkx4oc7wKBH_gI5QM71Ftch-5ow8l5xL-pG59tPc36zlWKjQSIV2WpTMZ35izGDZfsrRSmP47rzGr7rQWR4smfuv3RbIC8xloDyHnghlKucwQxUMIKNMjiTBTpSmOG4aAae0NwueNDabR--8n1WSXx3m3KJfcuOIQD74f-yXfCiBci-r9HLGh-8btNIyVSKQ3wmcydgAA%26q%3Dsenior%2Bsoftware%2Bengineer%26start%3D320%26l%3DChicago%252C%2BIL%26radius%3D50",
          "expired": false,
          "pubDate": "2022-06-07T19:20:04Z",
          "jobLocationCity": "Deerfield",
          "jobLocationState": "IL",
          "jobLocationPostal": "60015",
          "jobLocationExtras": null,
          "formattedLocation": "Deerfield, IL 60015",
          "formattedRelativeTime": "30+ days ago",
          "snippet": "<ul style=\"list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;\"> \n <li>Knowledge of various enterprise applications and IT services, as well as <b>software</b> development, compliance and security, and IT operations disciplines.</li>\n</ul>"
        }
      ]
    };
  },
  listJobCompanies: async (): Promise<JobCompany[]> => {
    return [
      { "name": "Google", "jobCount": 22, "id": null, "notes": null, "hidden": false },
      { "name": "Amazon", "jobCount": 14, "id": 155, "notes": "seattle is rainy", "hidden": true },
      { "name": "Deloitte", "jobCount": 9, "id": 73, "notes": "what happened to touche?", "hidden": false }
    ];
  },
  listCompanies: async (): Promise<Company[]> => {
    return [
      { "id": 14, "name": "Citadel", "notes": null, "hidden": true },
      { "id": 5, "name": "Palantir", "notes": "eww", "hidden": true },
      { "id": 8, "name": "Twitter", "notes": "nope", "hidden": false }
    ];
  },
  createCompany: async (company: CompanyData): Promise<Company> => {
    alert(`Created record for company ${company.name} \n  Hidden: ${company.hidden} \n  Notes: ${company.notes}`);
    return { "id": 23, "name": company.name!, "notes": company.notes ?? null, "hidden": company.hidden ?? false };
  },
  updateCompany: async (id: number, company: CompanyData): Promise<Company> => {
    alert(`Updated record for company ${id} with ${JSON.stringify(company)}`);
    // This won't behave like production because we can't return the name of the company
    return { "id": id, "name": "(Updated company)", "notes": company.notes ?? null, "hidden": company.hidden ?? false };
  },
  deleteCompany: async (id: number): Promise<void> => {
    alert(`Deleted record for company ${id}`);
  }
};

export default MockApi;
