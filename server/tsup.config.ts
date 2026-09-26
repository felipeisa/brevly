import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'], // onde estao os arquivos que eu quero fazer build
  clean: true, // limpar o diretorio de build quando roda o camando de build
  format: 'esm', // formato da build, type module no package.json
  outDir: 'dist',
})
