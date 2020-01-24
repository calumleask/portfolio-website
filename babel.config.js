module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      [
        "babel-plugin-root-import",
        {
            rootPathPrefix: "~",
            rootPathSuffix: "src/js",
        },
      ],
    ],
};