import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates && fileData.slug !== "index") {
        segments.push(
          <>
            Created: <Date date={getDate(cfg, fileData, "created")!} locale={cfg.locale} />
          </>,
        )

        // Only show the modified date if it's NOT equal to the created date
        // Extract the actual date values for comparison
        const datecreatedValue = getDate(cfg, fileData, "created")
        const datemodifiedValue = getDate(cfg, fileData, "modified")
        // Compare the actual date values (ignoring the JSX components)
        const areDatesNotEqual = datecreatedValue?.getTime() !== datemodifiedValue?.getTime()
        if (areDatesNotEqual) {
          segments.push(
            <>
              Modified: <Date date={getDate(cfg, fileData, "modified")!} locale={cfg.locale} />
            </>,
          )
        }
      }
      // Display reading time if enabled
      if (options.showReadingTime && fileData.slug !== "index") {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
