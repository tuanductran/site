import prism from 'prismjs'
import loadLanguages from 'prismjs/components/'

loadLanguages()

export function highlightCode(code: string, prismLanguage: string) {
  const grammar = prism.languages[prismLanguage]

  if (!grammar) {
    console.warn(`Unrecognized language: ${prismLanguage}`)
    return prism.util.encode(code)
  }

  return prism.highlight(code, grammar, prismLanguage)
}
