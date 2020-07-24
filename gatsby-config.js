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
            resolve: "gatsby-plugin-alias-imports",
            options: {
                alias: {
                    "src": path.resolve(__dirname, "src"),
                    "markdown": path.resolve(__dirname, "src/markdown-pages"),
                    "css": path.resolve(__dirname, "src/css"),
                }
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "projects",
                path: path.join(__dirname, "/src/markdown-pages")
            }
        },
        "gatsby-plugin-mdx",
        "gatsby-plugin-styled-components"
    ]
}