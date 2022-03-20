const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FF704F',
              '@layout-header-background': '#454545',
              '@menu-dark-item-active-bg': '@sinapse-primary',
              '@sinapse-primary': '#FF704F',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
