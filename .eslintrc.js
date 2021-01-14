module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-irregular-whitespace":"off",
        "generator-star-spacing": "off",
        "no-tabs":"off",
        "no-unused-vars":"off",
        "no-irregular-whitespace":"off",
        "no-console": "off",
        "no-debugger": "off",
        "prettier/prettier": "off"
    }
};
