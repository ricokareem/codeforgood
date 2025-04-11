import { render } from "@testing-library/react"
import Header from "@/components/header"
import { TestI18nProvider } from "../../test-utils/i18n-test-utils"

// Mock Cookies
jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

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
}

describe("Header Component", () => {
  it("renders correctly in English", () => {
    const { container } = render(
      <TestI18nProvider language="en" resources={translations}>
        <Header />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in German", () => {
    const { container } = render(
      <TestI18nProvider language="de" resources={translations}>
        <Header />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in Spanish", () => {
    const { container } = render(
      <TestI18nProvider language="es" resources={translations}>
        <Header />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
