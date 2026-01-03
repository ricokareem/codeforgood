import { describe, it, expect, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/hero";
import { TestI18nProvider } from "../../test-utils/i18n-test-utils";

// Mock framer-motion - filter out motion-specific props
mock.module("framer-motion", () => ({
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, transition, variants, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: () => true,
}));

// Mock next/image - filter out Next.js-specific props
mock.module("next/image", () => ({
  default: ({ fill, unoptimized, priority, ...props }: any) => <img {...props} />,
}));

// Mock translations
const translations = {
  en: {
    translation: {
      name: "RICO RODRIQUEZ COLLINS",
      title: "EXPERIENCED FULL STACK & MOBILE ENGINEER",
      about:
        "Technical leader who champions sustainable engineering practices through empathy and collaboration. I excel at fostering team environments where open communication drives innovation and inclusivity enables everyone's best work.",
    },
  },
  de: {
    translation: {
      name: "RICO RODRIQUEZ COLLINS",
      title: "ERFAHRENER FULL-STACK- UND MOBILE-INGENIEUR",
      about:
        "Technischer Leiter, der nachhaltige Ingenieurpraktiken durch Empathie und Zusammenarbeit fördert. Ich bin hervorragend darin, Teamumgebungen zu schaffen, in denen offene Kommunikation Innovation vorantreibt und Inklusivität die beste Arbeit aller ermöglicht.",
    },
  },
  es: {
    translation: {
      name: "RICO RODRIQUEZ COLLINS",
      title: "INGENIERO EXPERIMENTADO EN FULL STACK Y MÓVIL",
      about:
        "Líder técnico que defiende prácticas de ingeniería sostenibles a través de la empatía y la colaboración. Sobresalgo en fomentar entornos de equipo donde la comunicación abierta impulsa la innovación y la inclusividad permite el mejor trabajo de todos.",
    },
  },
};

describe("Hero Component", () => {
  it("renders correctly in English", () => {
    render(
      <TestI18nProvider language="en" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    );

    // Verify static content
    expect(screen.getByText("RICO COLLINS")).toBeDefined();

    // Verify translated content
    expect(
      screen.getByText("EXPERIENCED FULL STACK & MOBILE ENGINEER"),
    ).toBeDefined();
    expect(screen.getByText(/Technical leader who champions/)).toBeDefined();

    // Verify contact info
    expect(screen.getByText("hello.world@codeforgood.com")).toBeDefined();
    expect(screen.getByText("www.linkedin.com/in/ricocollins")).toBeDefined();
    expect(
      screen.getByText("Los Angeles, California, United States"),
    ).toBeDefined();
  });

  it("renders correctly in German", () => {
    render(
      <TestI18nProvider language="de" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    );

    expect(screen.getByText("RICO COLLINS")).toBeDefined();
    expect(
      screen.getByText("ERFAHRENER FULL-STACK- UND MOBILE-INGENIEUR"),
    ).toBeDefined();
    expect(
      screen.getByText(/Technischer Leiter, der nachhaltige/),
    ).toBeDefined();
  });

  it("renders correctly in Spanish", () => {
    render(
      <TestI18nProvider language="es" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    );

    expect(screen.getByText("RICO COLLINS")).toBeDefined();
    expect(
      screen.getByText("INGENIERO EXPERIMENTADO EN FULL STACK Y MÓVIL"),
    ).toBeDefined();
    expect(screen.getByText(/Líder técnico que defiende/)).toBeDefined();
  });
});
