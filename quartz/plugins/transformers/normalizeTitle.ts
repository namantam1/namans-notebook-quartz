import { QuartzTransformerPlugin } from "../types"

/**
 * NormalizeTitle transformer
 * If a file has no frontmatter title, derive one from the filename by
 * replacing underscores with spaces. This is implemented as a transformer so
 * it can be enabled/disabled from `quartz.config.ts` without touching core
 * transformer code.
 */
export const NormalizeTitle: QuartzTransformerPlugin = () => ({
  name: "NormalizeTitle",
  markdownPlugins() {
    return [() => {
      return (_, file) => {
        try {
          const frontmatter = file.data?.frontmatter
          const hasTitle = frontmatter && typeof frontmatter.title === "string" && frontmatter.title.trim() !== ""

          if (!hasTitle) {
            const rawTitle = file.stem?.toString() ?? ""
            // replace one or more underscores with a single space
            const normalized = rawTitle.replace(/_+/g, " ")
            // ensure vfile frontmatter object exists
            file.data = file.data || {}
            // create a frontmatter object that satisfies the declared vfile.DataMap
            file.data.frontmatter = {
              ...(file.data.frontmatter ?? {}),
              title: normalized,
            }
          }
        } catch (e) {
          // swallow errors to avoid breaking the pipeline for one file
        }
      }
    }]
  },
})
