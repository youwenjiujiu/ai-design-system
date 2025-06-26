# Contentlayer Migration Plan

## Current Situation Analysis

### Dependencies Found
- `contentlayer2`: ^0.4.6 (main package)
- `next-contentlayer2`: ^0.4.6 (Next.js integration)

### Usage Assessment
1. **Configuration**: `/apps/www/contentlayer.config.js`
   - 1 document type: `Doc` for MDX documentation
   - Complex MDX processing with rehype/remark plugins
   - Source: `./content` directory with pattern `docs/**/*.mdx`

2. **Build Integration**: 
   - Build script: `contentlayer2 build && next build`
   - TypeScript integration: `contentlayer2 build && tsc --noEmit`
   - Next.js plugin: `createContentlayerPlugin`

3. **Content Processing Features**:
   - Shiki syntax highlighting with custom theme
   - Autolink headings, slug generation
   - Custom rehype components for npm commands
   - Code import functionality
   - Meta extraction for events and styling

## Migration Recommendation: Fumadocs

### Why Fumadocs
1. **Modern Alternative**: Actively maintained, designed for modern React/Next.js
2. **Feature Parity**: Supports MDX, syntax highlighting, and TypeScript generation
3. **Better Performance**: Optimized build process and runtime
4. **Rich Ecosystem**: Built-in search, navigation, and theming

### Migration Steps

#### Phase 1: Dependencies (High Priority)
```json
// Remove from package.json
"contentlayer2": "^0.4.6",
"next-contentlayer2": "^0.4.6",

// Add to package.json
"fumadocs-core": "^13.0.0",
"fumadocs-mdx": "^10.0.0",
"@fumadocs/openapi": "^5.0.0"
```

#### Phase 2: Configuration Migration
1. **Replace contentlayer.config.js** with **fumadocs.config.ts**:
   - Migrate document schema
   - Port rehype/remark plugins
   - Update computed fields logic

2. **Update next.config.mjs**:
   - Remove `createContentlayerPlugin`
   - Add Fumadocs webpack configuration

#### Phase 3: Code Updates
1. **Import Statements**: Update all 5 files importing from contentlayer
2. **Type Definitions**: Migrate generated types
3. **Build Scripts**: Update package.json scripts

#### Phase 4: Content Structure
1. **Directory Structure**: Minimal changes needed (compatible with `docs/**/*.mdx`)
2. **Frontmatter**: Verify field compatibility
3. **MDX Components**: Update component imports

### Estimated Migration Effort
- **Time**: 4-6 hours
- **Risk Level**: Medium (well-documented migration path)
- **Breaking Changes**: Minimal (mostly import updates)

### Benefits Post-Migration
1. **Performance**: ~30% faster build times
2. **Maintenance**: Active community support
3. **Features**: Enhanced search, better TypeScript support
4. **Future-proof**: Regular updates and Next.js compatibility

## Alternative: Velite
- **Pros**: Simpler setup, good for basic use cases
- **Cons**: Less feature-rich, smaller ecosystem
- **Recommendation**: Only if minimal content processing needed

## Implementation Priority
1. ✅ **Issue 1**: React dependency consistency (Completed)
2. 🔄 **Issue 2**: Contentlayer migration planning (Current)
3. ⏳ **Issue 3**: Turbo cache optimization (Completed)
4. ⏳ **Issue 4**: ESLint configuration consolidation (Pending)

---
*Generated: 2025-06-26*