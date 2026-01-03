import { describe, it, expect, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import { TestI18nProvider } from "../../test-utils/i18n-test-utils";

// Mock js-cookie
mock.module("js-cookie", () => ({
  default: {
    get: () => undefined,
    set: () => {},
  },
}));

// Mock translations
const translations = {
  en: {
    translation: {
      menu: {
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        education: "Education",
        selectLanguage: "Select language",
        community: "Community",
      },
    },
  },
  de: {
    translation: {
      menu: {
        about: "Über mich",
        experience: "Erfahrung",
        skills: "Fähigkeiten",
        projects: "Projekte",
        education: "Ausbildung",
        selectLanguage: "Sprache auswählen",
        community: "Gemeinschaft",
      },
    },
  },
  es: {
    translation: {
      menu: {
        about: "Acerca de",
        experience: "Experiencia",
        skills: "Habilidades",
        projects: "Proyectos",
        education: "Educación",
        community: "Comunidad",
      },
    },
  },
};

describe("Header Component", () => {
  it("renders correctly in English", () => {
    render(
      <TestI18nProvider language="en" resources={translations}>
        <Header />
      </TestI18nProvider>,
    );

    // Verify brand (appears in both mobile and desktop nav)
    expect(screen.getAllByText("CodeForGood").length).toBeGreaterThan(0);

    // Verify menu items
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Experience")).toBeDefined();
    expect(screen.getByText("Skills")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Education")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });

  it("renders correctly in German", () => {
    render(
      <TestI18nProvider language="de" resources={translations}>
        <Header />
      </TestI18nProvider>,
    );

    expect(screen.getAllByText("CodeForGood").length).toBeGreaterThan(0);
    expect(screen.getByText("Über mich")).toBeDefined();
    expect(screen.getByText("Erfahrung")).toBeDefined();
    expect(screen.getByText("Fähigkeiten")).toBeDefined();
    expect(screen.getByText("Projekte")).toBeDefined();
    expect(screen.getByText("Ausbildung")).toBeDefined();
    expect(screen.getByText("Gemeinschaft")).toBeDefined();
  });

  it("renders correctly in Spanish", () => {
    render(
      <TestI18nProvider language="es" resources={translations}>
        <Header />
      </TestI18nProvider>,
    );

    expect(screen.getAllByText("CodeForGood").length).toBeGreaterThan(0);
    expect(screen.getByText("Acerca de")).toBeDefined();
    expect(screen.getByText("Experiencia")).toBeDefined();
    expect(screen.getByText("Habilidades")).toBeDefined();
    expect(screen.getByText("Proyectos")).toBeDefined();
    expect(screen.getByText("Educación")).toBeDefined();
    expect(screen.getByText("Comunidad")).toBeDefined();
  });
});
