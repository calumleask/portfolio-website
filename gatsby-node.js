const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
        const value = createFilePath({ node, getNode, trailingSlash: false });
        createNodeField({
            name: "slug",
            node,
            value,
        });
    }
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const projectTemplate = path.resolve("src/templates/project-template.tsx");
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    // Variables can be added as the second function parameter
    return graphql(`
        query loadPagesQuery {
            allMdx {
                edges {
                    node {
                        fields {
                            slug
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
            const slug = edge.node.fields.slug;
            createPage({
                // Path for this page — required
                path: slug,
                component: projectTemplate,
                context: {
                    slug: slug
                },
            })
        })
    })
};

exports.onCreateWebpackConfig = ({ actions }) => {
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
