import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import { join, basename } from 'path'

const SVG_DIR = join(import.meta.dirname, '../src/lib/components/icons/svg')
const OUT_DIR = join(import.meta.dirname, '../src/lib/components/icons')
const STYLES = ['outline', 'solid']

function kebabToPascal(str) {
	return str.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase())
}

function processSvg(svgContent) {
	return svgContent
		.replace(/#0F172A/gi, 'currentColor')
		.replace(/stroke="black"/g, 'stroke="currentColor"')
		.replace(/fill="black"/g, 'fill="currentColor"')
		.replace(/\s*width="24"\s*height="24"/, '')
		.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '')
		.replace(
			'<svg',
			'<svg\n\txmlns="http://www.w3.org/2000/svg"\n\tstyle:height={size}\n\tstyle:width={size}'
		)
		.trim()
}

function generateComponent(svgContent) {
	const processed = processSvg(svgContent)
	return `<script lang="ts">
\tlet { size = '1.5rem' }: { size?: string } = $props();
</script>

${processed}
`
}

for (const style of STYLES) {
	const svgDir = join(SVG_DIR, style)
	const outDir = join(OUT_DIR, style)

	if (existsSync(outDir)) {
		rmSync(outDir, { recursive: true })
	}
	mkdirSync(outDir, { recursive: true })

	const files = readdirSync(svgDir)
		.filter((f) => f.endsWith('.svg'))
		.sort()
	const exports = []

	for (const file of files) {
		const name = kebabToPascal(basename(file, '.svg'))
		const svgContent = readFileSync(join(svgDir, file), 'utf-8')
		const component = generateComponent(svgContent)

		writeFileSync(join(outDir, `${name}.svelte`), component)
		exports.push(`export { default as ${name} } from './${name}.svelte'`)
	}

	writeFileSync(join(outDir, 'index.ts'), exports.join('\n') + '\n')
	console.log(`Generated ${files.length} ${style} icon components`)
}

// Generate combined index that re-exports outline as default (most common usage)
// and provides named style exports
const combinedIndex = `// Outline icons (default)
export * from './outline/index.js'
// For style-specific imports:
//   import { AcademicCap } from '@joyautomation/salt/icons/outline'
//   import { AcademicCap } from '@joyautomation/salt/icons/solid'
`
writeFileSync(join(OUT_DIR, 'index.ts'), combinedIndex)

console.log('Generated combined index.ts')
