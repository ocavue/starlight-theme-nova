import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'

const repoRoot = path.resolve(import.meta.filename, '../..')
const target = path.resolve(
  process.argv[2] ?? path.join(tmpdir(), 'starlight-theme-nova-e2e-website'),
)

const EXCLUDES = new Set(['node_modules', 'dist', '.astro'])

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })
cpSync(path.join(repoRoot, 'website'), target, {
  recursive: true,
  filter: (src) => !EXCLUDES.has(path.basename(src)),
})

const pkgPath = path.join(target, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
pkg.dependencies['starlight-theme-nova'] = 'file:./starlight-theme-nova.tgz'
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

const tsconfigPath = path.join(target, 'tsconfig.json')
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'))
delete tsconfig.references
writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n')

console.log(`prepared standalone website at ${target}`)
