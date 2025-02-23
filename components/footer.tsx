import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <p className="text-[#00B2FF] dark:text-[#FFB800]">
              &copy; 2024 RICO RODRIQUEZ COLLINS. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { Icon: Github, href: "https://github.com/ricokareem", color: "#FF647C", label: "GitHub Profile" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/ricocollins/",
                color: "#00B2FF",
                label: "LinkedIn Profile",
              },
              { Icon: Twitter, href: "https://x.com/ricokareem", color: "#4ADE80", label: "Twitter Profile" },
            ].map(({ Icon, href, color, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                style={{ color }}
                aria-label={label}
              >
                <Icon className="w-8 h-8" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

