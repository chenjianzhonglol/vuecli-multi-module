const execa = require('execa');
const path = require('path');
const fs = require('fs-extra');

const { generatePagesOption, pluginApplyInVue } = require('./utils');

const externalJsList = [
    {
        quote: {
            vue: 'Vue'
        },
        cdn: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.runtime.min.js',
        match() {
            return true;
        }
    },
    {
        quote: {
            'vue-router': 'VueRouter'
        },
        cdn: 'https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.8/vue-router.min.js',
        match(entry) {
            return pluginApplyInVue(entry, 'router');
        }
    },
    {
        quote: {
            vuex: 'Vuex'
        },
        cdn: 'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
        match(entry) {
            return pluginApplyInVue(entry, 'store');
        }
    }
];

module.exports = (api, options) => {
    if (process.env.BUILD_PAGES) {
        const { filename, entry, name } = JSON.parse(process.env.BUILD_PAGES);
        options.pages = {
            app: {
                entry,
                filename,
                externalJsList: externalJsList.filter(({ match }) => match(entry)).map(({ cdn }) => cdn)
            }
        };
        options.assetsDir = name;
    }

    api.configureWebpack(() => {
        return {
            externals: externalJsList.reduce((res, item) => {
                return Object.assign({}, res, item.quote);
            }, {})
        };
    });

    api.registerCommand('module-build', async (args) => {
        if (!args._.length) {
            console.log('请选择打包模块！');
        } else {
            const pages = generatePagesOption(args._);
            await fs.remove(path.resolve(__dirname, options.outputDir));
            // 分别打包每个模块
            Object.keys(pages).map((key) => {
                execa('vue-cli-service', ['build'], {
                    stdio: 'inherit',
                    env: {
                        BUILD_PAGES: JSON.stringify(pages[key])
                    }
                });
            });
        }
    });
};

module.exports.defaultModes = {
    'module-build': 'production'
};
