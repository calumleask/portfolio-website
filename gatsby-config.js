const path = require('path')

module.exports = {
    plugins: [
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                src: path.join(__dirname, "src/js"),
                pages: path.join(__dirname, "src/pages")
            }
        }
    ]
  }
  