import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { pathToRoot, joinSegments } from "../util/path"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}
    const baseDir = pathToRoot(fileData.slug!)
    const logoPath = joinSegments(baseDir, "static/logo.png")

    return (
        <footer>
          <div class="footer-row">
            {/* Quartz credit — left side */}
            <nav class="footer-links" aria-label="Footer links">
              <small>
                {i18n(cfg.locale).components.footer.createdWith}{" "}
                <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>
              </small>
            </nav>

            {/* Brand + repo links — right side */}
            <div class="footer-brand">
              <span class="footer-site-name">{cfg.pageTitle}</span>
              {Object.entries(links).map(([text, link]) => (
                <a class="footer-link-item" href={link}>{text}</a>
              ))}
            </div>

            <span class="footer-copy">© {year}</span>
          </div>
        </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
