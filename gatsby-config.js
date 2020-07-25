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
                    "@components": path.resolve(__dirname, "src/components"),
                    "@helpers": path.resolve(__dirname, "src/helpers"),
                    "@images": path.resolve(__dirname, "src/images"),
                    "@layouts": path.resolve(__dirname, "src/layouts"),
                    "@markdown": path.resolve(__dirname, "src/markdown-pages"),
                    "@pages": path.resolve(__dirname, "src/page-source"),
                    "@providers": path.resolve(__dirname, "src/providers"),
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