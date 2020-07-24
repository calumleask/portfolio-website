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
                    "~": path.resolve(__dirname, "src"),
                    "@components": path.resolve(__dirname, "src/ts/components"),
                    "@helpers": path.resolve(__dirname, "src/ts/helpers"),
                    "@markdown": path.resolve(__dirname, "src/markdown-pages"),
                    "@style": path.resolve(__dirname, "src/style")
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