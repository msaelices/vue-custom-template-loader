const templateLoader = require('vue-loader/lib/loaders/templateLoader')

module.exports = function (source, map) {

  // hack to be able to call templateLoader function
  // which expect a resourceQuery data
  const loaderContext = {
    resourceQuery: '',
    emitError: console.error,
    query: {
      compilerOptions: {
        outputSourceRange: false
      }
    }
  }
  const loader = templateLoader.bind(loaderContext)

  // hack to avoid the export code
  // TODO: new option in vue-loader to do not create the export code
  const renderFunc = loader(source).replace('export { render, staticRenderFns }', '')

  this.callback(
    null,
    `${renderFunc}
    export default function (Component) {
      Component.options.render = render;
    }`,
    map
  )
}
