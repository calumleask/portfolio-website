const path = require('path');

module.exports = {
    siteMetadata: {
        title: "Calum Leask",
        siteUrl: "https://calumleask.co.uk/",
        email: "me@calumleask.co.uk",
        linkedin: "calumleask"
    },
    plugins: [
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                src: path.join(__dirname, "src/js"),
                markdown: path.join(__dirname, "src/markdown-pages")
            }
        }
    ]
  }
  