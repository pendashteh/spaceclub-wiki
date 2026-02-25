import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const logoPath = joinSegments(baseDir, "static/logo.png")
  return (
    <div class={classNames(displayClass, "page-title")}>
      {/*
        Logo slot — drop your logo at  quartz/static/logo.png
        Then change `.page-title-logo { display: none }` → `display: block`
        in the CSS below (or in custom.scss).
      */}
      <img class="page-title-logo" src={logoPath} alt={title} />
      <h2>
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  )
}

PageTitle.css = `
.page-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title h2 {
  font-size: 1.5rem;
  margin: 0;
  line-height: 1.2;
}

/* Logo sits to the left of the site title.
   Place your logo at quartz/static/logo.png — already active. */
.page-title-logo {
  display: block;
  height: 34px;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
