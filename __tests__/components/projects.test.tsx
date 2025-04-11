import { render } from "@testing-library/react"
import Projects from "@/components/projects"
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
      projects: "PAST PROJECTS",
      viewProject: "View Project",
      project1: {
        title: "Fender : Fender Play",
        description: "Forget 'Mary Had A Little Lamb'. Pick any guitar, and learn how to play your favorite song.",
        altText: "Animated demonstration of Fender Play app interface, showing guitar lessons and interactive features",
      },
      project2: {
        title: "Slingshot Aerospace : Slingshot Laboratory",
        description: "Learn the fundamentals of astrodynamics and experiment.",
        altText:
          "Animated visualization of Slingshot Laboratory's 3D space environment, displaying orbital mechanics and satellite trajectories",
      },
      project3: {
        title: "Team Coco : Conan Classic",
        description: "The best clips from over 25 years of cutting-edge television.",
        altText:
          "Animated showcase of Conan Classic website, featuring clips and highlights from Conan O'Brien's shows",
      },
    },
  },
  de: {
    translation: {
      projects: "VERGANGENE PROJEKTE",
      viewProject: "Projekt ansehen",
      project1: {
        title: "Fender : Fender Play",
        description:
          "Vergessen Sie 'Mary Had A Little Lamb'. Wählen Sie eine beliebige Gitarre und lernen Sie, Ihren Lieblingssong zu spielen.",
        altText:
          "Animierte Demonstration der Fender Play App-Oberfläche, die Gitarrenunterricht und interaktive Funktionen zeigt",
      },
      project2: {
        title: "Slingshot Aerospace : Slingshot Laboratory",
        description: "Lernen Sie die Grundlagen der Astrodynamik und experimentieren Sie.",
        altText:
          "Animierte Visualisierung der 3D-Weltraumumgebung von Slingshot Laboratory, die Orbitalmechanik und Satellitenbahnen zeigt",
      },
      project3: {
        title: "Team Coco : Conan Classic",
        description: "Die besten Clips aus über 25 Jahren bahnbrechendem Fernsehen.",
        altText: "Animierte Präsentation der Conan Classic Website mit Clips und Highlights aus Conan O'Briens Shows",
      },
    },
  },
  es: {
    translation: {
      projects: "PROYECTOS ANTERIORES",
      viewProject: "Ver Proyecto",
      project1: {
        title: "Fender : Fender Play",
        description:
          "Olvídate de 'Mary Had A Little Lamb'. Elige cualquier guitarra y aprende a tocar tu canción favorita.",
        altText:
          "Demostración animada de la interfaz de la aplicación Fender Play, mostrando lecciones de guitarra y características interactivas",
      },
      project2: {
        title: "Slingshot Aerospace : Slingshot Laboratory",
        description: "Aprende los fundamentos de la astrodinámica y experimenta.",
        altText:
          "Visualización animada del entorno espacial 3D de Slingshot Laboratory, mostrando mecánica orbital y trayectorias de satélites",
      },
      project3: {
        title: "Team Coco : Conan Classic",
        description: "Los mejores clips de más de 25 años de televisión innovadora.",
        altText:
          "Presentación animada del sitio web Conan Classic, con clips y momentos destacados de los programas de Conan O'Brien",
      },
    },
  },
}

describe("Projects Component", () => {
  it("renders correctly in English", () => {
    const { container } = render(
      <TestI18nProvider language="en" resources={translations}>
        <Projects isSoundOn={false} />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in German", () => {
    const { container } = render(
      <TestI18nProvider language="de" resources={translations}>
        <Projects isSoundOn={false} />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly in Spanish", () => {
    const { container } = render(
      <TestI18nProvider language="es" resources={translations}>
        <Projects isSoundOn={false} />
      </TestI18nProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
