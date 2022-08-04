const data = {
    abroad: require("./src/data/abroad.json"),
    jobs: require("./src/data/jobs.json"),
    projects: require("./src/data/projects.json")
}

module.exports = {
    input: "src/views/*.html",
    output: "dist",
    plugins: {
        "posthtml-modules": {
            root: "./src/views",
            initial: true,
            locals: data,
        },

        htmlnano: {}
    }
}