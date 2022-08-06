const data = {
    abroad: require("./src/data/abroad.json"),
    jobs: require("./src/data/jobs.json"),
    projects: require("./src/data/projects.json"),
    featured: require("./src/data/featured.js")
}

module.exports = {
    root: "src/views",
    input: ["*.html", "projects/*.html"],
    output: "dist",
    allInOutput: true,
    plugins: {
        "posthtml-modules": {
            root: "./src/views",
            attributeAsLocals: true,
            locals: data,
        },

        "posthtml-expressions": {
            locals: data
        },

        htmlnano: {}
    }
}