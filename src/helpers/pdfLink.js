'use strict'

const util = require('util')

let output = false

module.exports = (ctx) => {
  if (output) {
    output = false
    console.log(
      'ctx:',
      util.inspect(ctx.data.root.page, {
        showHidden: false,
        depth: null,
        maxArrayLength: null,
      })
    )
  }

  const { componentVersion } = ctx.data.root.page
  if (
    !componentVersion ||
    !componentVersion.asciidoc ||
    !componentVersion.asciidoc?.attributes ||
    !componentVersion.asciidoc?.attributes?.assemblerEnabled
  ) {
    return false
  }

  const component = componentVersion.name
  if (component === 'ROOT') return false

  const version = componentVersion.version
  const filename = componentVersion.title
    .replace(/[&:]/g, '')
    .replace(/[ ,/"']/g, '-')
    .replace(/--/g, '-')
    .toLowerCase() +
    '.pdf'

  const url = `${component}/${version}/${filename}`
  return url
}
