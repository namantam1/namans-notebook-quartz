# Quartz - Digital Garden Framework

This repository contains Quartz v4, a digital garden framework built with TypeScript that transforms Markdown notes into a static website.

## Core Architecture

- **Build Pipeline**: 
  - Entry point is `quartz/bootstrap-cli.mjs` which handles CLI args and transpilation
  - Content processing happens in `quartz/build.ts` using a worker-based architecture for parallel processing
  - Uses unified/remark/rehype for Markdown-to-HTML transformation with plugin system
  - Final output is static HTML with Preact-based components

- **Key Directories**:
  - `/content`: All user content (Markdown files)
  - `/quartz`: Core framework code
  - `/public`: Build output
  - `/docs`: Framework documentation

## Development Workflows

### Content Development
1. Add Markdown files to `/content`
2. Run local preview: `npx quartz build --serve`
3. View at http://localhost:8080
4. Sync to GitHub: `npx quartz sync`

### Framework Development
1. TypeScript code in `/quartz` directory
2. Uses esbuild for transpilation/bundling
3. Worker-based processing for performance
4. Tests run with: `npm test`
5. Format code: `npm run format`

### Critical Files
- `quartz.config.ts`: Main configuration (themes, plugins, etc)
- `quartz.layout.ts`: Page layout structure
- `package.json`: Scripts and dependencies

## Conventions

### Content Files
- Use frontmatter for metadata:
  ```md
  ---
  title: Example Title
  tags: [tag1, tag2]
  aliases: [alt-name]
  draft: false
  date: YYYY-MM-DD
  ---
  ```
- Wikilinks supported: `[[page-name]]`
- Images/attachments go in `/content`

### Component Development
- Components use Preact
- Must handle both static SSR and client hydration
- Static assets emitted to `/public`
- Plugin system for content transformation

### Configuration
- Override defaults in `quartz.config.ts`
- Plugin configuration done through options object
- Theme customization via `configuration.theme`
- Ignore patterns set in `configuration.ignorePatterns`

### Performance
- Uses worker threads for parallel processing
- Caches transpiled code in `.quartz-cache`
- SPA routing optional via `enableSPA` config
- CDN caching configurable via `cdnCaching` option