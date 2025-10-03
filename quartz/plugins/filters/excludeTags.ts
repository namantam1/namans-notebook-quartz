import { QuartzFilterPlugin } from "../types"

type Opts = {
  tags: string[]
}

/**
 * ExcludeTags filter - exclude any file that contains any of the provided tag slugs
 * Usage: plugins.filters: [Plugin.RemoveDrafts(), Plugin.ExcludeTags({ tags: ["private", "wip"] })]
 */
export const ExcludeTags: QuartzFilterPlugin<Opts> = (opts) => ({
  name: "ExcludeTags",
  shouldPublish(_ctx, [_tree, vfile]) {
    const excluded = (opts?.tags ?? []).map((t) => t.toString())
    const tags: string[] = vfile.data?.frontmatter?.tags ?? []
    // frontmatter tags are already slugged by the frontmatter transformer, but
    // support both raw and slug forms defensively
    for (const tag of tags) {
      if (excluded.includes(tag) || excluded.includes(tag.toString())) return false
    }
    return true
  },
})
