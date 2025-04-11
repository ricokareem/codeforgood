import { render } from "@testing-library/react"
import Hero from "@/components/hero"
import { TestI18nProvider } from "../../test-utils/i18n-test-utils"

// Mock the framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

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
}

describe("Hero Component", () => {
  it("renders correctly in English", () => {
    const { container } = render(
      <TestI18nProvider language="en" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in German", () => {
    const { container } = render(
      <TestI18nProvider language="de" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in Spanish", () => {
    const { container } = render(
      <TestI18nProvider language="es" resources={translations}>
        <Hero />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
