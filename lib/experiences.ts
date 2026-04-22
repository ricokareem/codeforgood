import type { Experience } from "@/types";
import type { TFunction } from "i18next";

/**
 * Experience skill/color data - the single source of truth
 * for mapping experiences to their skills and colors.
 *
 * Used by both page.tsx (skill lookup) and experience.tsx (full display).
 */
export const EXPERIENCE_SKILLS = [
  {
    color: "#00B2FF",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Remix",
      "Enzyme",
      "React Testing Library",
      "Prisma ORM",
      "Redis",
      "Elasticsearch",
      "AWS",
      "PostgreSQL",
      "Accessibility",
      "ThreeJS",
      "React Three Fiber",
      "ReactVR",
      "Zustand",
      "Tanstack Query",
      "Swift",
      "UIKit",
      "SwiftUI",
      "Combine",
      "Core Data",
      "Ruby on Rails",
      "Hotwire",
      "Turbo",
      "Stimulus",
      "Strada",
      "ViewComponents",
      "RSpec",
      "Docker",
      "Python",
      "Django",
      "Flask",
      "Numpy",
      "Jupyter",
    ],
  },
  {
    color: "#FF647C",
    skills: [
      "JavaScript",
      "React",
      "TypeScript",
      "Redux",
      "Jest",
      "KnockoutJS",
      "Python",
      "Flask",
      "Django",
      "Ruby on Rails",
      "Redis",
      "PostgreSQL",
      "Accessibility",
      "WCAG",
      "Apollo GraphQL",
    ],
  },
  {
    color: "#FFB800",
    skills: [
      "JavaScript",
      "Node.js",
      "Ruby on Rails",
      "RSpec",
      "Sinatra",
      "MongoDB",
      "Express.js",
      "CMS Integration",
    ],
  },
  {
    color: "#4ADE80",
    skills: ["Build Automation", "Pipelines", "Version Control (CVS, SVN)"],
  },
  {
    color: "#FF647C",
    skills: [
      "Java",
      "JSP",
      "Maven",
      "Jenkins",
      "Continuous Integration",
      "Project Management",
      "ITIL",
    ],
  },
];

/**
 * Build the full experiences array with translated text.
 * Call this inside a component that has access to `t()`.
 */
export function buildExperiences(t: TFunction): Experience[] {
  const translationKeys = [
    {
      titleKey: "experience1.title",
      companyKey: "experience1.company",
      periodKey: "experience1.period",
      descriptionKeys: [
        "experience1.description1",
        "experience1.description2",
        "experience1.description3",
        "experience1.description4",
      ],
    },
    {
      titleKey: "experience2.title",
      companyKey: "experience2.company",
      periodKey: "experience2.period",
      descriptionKeys: [
        "experience2.description1",
        "experience2.description2",
        "experience2.description3",
      ],
    },
    {
      titleKey: "experience3.title",
      companyKey: "experience3.company",
      periodKey: "experience3.period",
      descriptionKeys: [
        "experience3.description1",
        "experience3.description2",
      ],
    },
    {
      titleKey: "experience4.title",
      companyKey: "experience4.company",
      periodKey: "experience4.period",
      descriptionKeys: [
        "experience4.description1",
        "experience4.description2",
      ],
    },
    {
      titleKey: "experience5.title",
      companyKey: "experience5.company",
      periodKey: "experience5.period",
      descriptionKeys: [
        "experience5.description1",
        "experience5.description2",
      ],
    },
  ];

  return translationKeys.map((keys, index) => ({
    title: t(keys.titleKey),
    company: t(keys.companyKey),
    period: t(keys.periodKey),
    description: keys.descriptionKeys.map((k) => t(k)),
    color: EXPERIENCE_SKILLS[index].color,
    skills: [...EXPERIENCE_SKILLS[index].skills],
  }));
}
