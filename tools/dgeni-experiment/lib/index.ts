import path from 'canonical-path'
import { Dgeni, Package } from 'dgeni'
import places from '@tools/places'

export function main () {
  const config = new Package('tsfun', [
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks'),
    require('dgeni-packages/typescript')
  ])
    .config((log: any, readFilesProcessor: any, templateFinder: any, writeFilesProcessor: any) => {
      log.level = 'info'

      readFilesProcessor.basePath = places.packages
      readFilesProcessor.sourceFiles = [
        { include: '**/*.ts', basePath: '.' }
      ]

      templateFinder.templateFolders.unshift(path.resolve(__dirname, '../templates'))
      templateFinder.templatePatterns.unshift('common.template.html')

      writeFilesProcessor.outputFolder = path.join(places.project, 'dgeni.tmp')
    })

  const dgeni = new Dgeni([config])
  return dgeni.generate()
}

export default main
