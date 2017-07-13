module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "stylus": {
      "type": "confirm",
      "message": "Using stylus?"
    },
    "fastclick": {
      "type": "confirm",
      "message": "Using fastclick?"
    },
    "smartui": {
      "type": "confirm",
      "message": "Using smart-ui?"
    },
    "sentry": {
      "type": "confirm",
      "message": "Using sentry?"
    },
    // "lint": {
    //   "type": "confirm",
    //   "message": "Use ESLint to lint your code?"
    // },
    // "lintConfig": {
    //   "when": "lint",
    //   "type": "list",
    //   "message": "Pick an ESLint preset",
    //   "choices": [
    //     {
    //       "name": "Standard (https://github.com/feross/standard)",
    //       "value": "standard",
    //       "short": "Standard"
    //     },
    //     {
    //       "name": "AirBNB (https://github.com/airbnb/javascript)",
    //       "value": "airbnb",
    //       "short": "AirBNB"
    //     },
    //     {
    //       "name": "none (configure it yourself)",
    //       "value": "none",
    //       "short": "none"
    //     }
    //   ]
    // },
    // "unit": {
    //   "type": "confirm",
    //   "message": "Setup unit tests with Karma + Mocha?"
    // },
    // "e2e": {
    //   "type": "confirm",
    //   "message": "Setup e2e tests with Nightwatch?"
    // }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "config/test.env.js": "unit || e2e",
    "test/unit/**/*": "unit",
    "build/webpack.test.conf.js": "unit",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router",
    "src/**/*.styl": "stylus",
    "src/**/*.css": "!stylus",
    "src/sentry.js": "sentry"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}yarn install\n  yarn run dev\n\nDocumentation can be found at https://github.com/xiaoyann/webpack-vue-template"
};
