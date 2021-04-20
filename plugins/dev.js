const execa = require("execa");

const { generatePagesOption } = require("./utils");

module.exports = (api, options) => {
  if (process.env.DEV_PAGES) {
    console.log(process.env.DEV_PAGES);
    options.pages = JSON.parse(process.env.DEV_PAGES); //覆盖vue.config.js中的pages
  }
  api.registerCommand("module-dev", (args) => {
    if (!args._.length) {
      console.log("请选择运行模块！");
    } else {
      const pages = generatePagesOption(args._);
      execa("vue-cli-service", ["serve"], {
        stdio: "inherit",
        env: {
          DEV_PAGES: JSON.stringify(pages),
        },
      });
    }
  });
};
