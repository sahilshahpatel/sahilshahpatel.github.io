const locals = {
    abroad: require("./src/data/abroad.json"),
    jobs: require("./src/data/jobs.js"),
    projects: require("./src/data/projects.json"),
    featured: require("./src/data/featured.js"),

    // Default values for all settings for all components
    settings: {
        long: false,
    }
}

const posthtmlExpressionsOptions = {
    removeScriptLocals: true,
    locals: locals,
}

module.exports = {
    root: "src/views",
    input: ["*.html", "projects/*.html", "abroad/*.html"],
    output: "dist",
    allInOutput: true,
    plugins: {
        "posthtml-modules": {
            root: "./src/views",
            attributeAsLocals: true,
            locals: locals,
            expressions: posthtmlExpressionsOptions,
        },

        "posthtml-expressions": posthtmlExpressionsOptions,

        "posthtml-markdownit": {},

        htmlnano: {}
    }
}