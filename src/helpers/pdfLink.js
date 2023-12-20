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
  // let filename = componentVersion.title
  //   .replace(/[&:]/g, '')
  //   .replace(/[ ,/"']/g, '-')
  //   .replace(/--/g, '-')
  //   .toLowerCase() +
  //   '.pdf'

  const fTitle = componentVersion.title
    .replace(/&.+?;|[^ \p{Alpha}0-9_\-.]/gu, '')
    .replace(/[ _.]/g, '_')
    .replace(/--+/g, '-')
  const fVersion = version
    ? '-' + version
      .replace(/&.+?;|[^ \p{Alpha}0-9_\-.]/gu, '')
      .replace(/[ _.]/g, '_')
      .replace(/--+/g, '-')
    : ''
  const filename = `${fTitle}${fVersion}.pdf`

  const url = `${component}/${version}/${filename}`
  return url
}
