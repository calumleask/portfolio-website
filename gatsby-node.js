const path = require("path");

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const projectTemplate = path.resolve("src/templates/project-template.js");
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    // Variables can be added as the second function parameter
    return graphql(`
        query loadPagesQuery {
            allMdx {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `, { limit: 1000 }).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog post pages.
        result.data.allMdx.edges.forEach(edge => {
            createPage({
                // Path for this page — required
                path: `${edge.node.frontmatter.path}`,
                component: projectTemplate,
                context: {
                    // Add optional context data to be inserted
                    // as props into the page component..
                    //
                    // The context data can also be used as
                    // arguments to the page GraphQL query.
                    //
                    // The page "path" is always available as a GraphQL
                    // argument.
                },
            })
        })
    })
}

exports.onCreateWebpackConfig = ({
    actions,
}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: ["html-loader", "markdown-loader"]
                }
            ]
        }
    })
};