const path = require('path');
const glob = require('glob');

const babelParser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const t = require('@babel/types');
const fs = require('fs');

module.exports = {
    generatePagesOption(modulesArr) {
        const pages = {};
        glob.sync(path.resolve(__dirname, '../src/modules/**/main.js')).forEach((filepath) => {
            const pageName = /src\/modules\/(.+)\/main.js/.exec(filepath)[1];
            if (modulesArr.includes('all') || modulesArr.includes(pageName)) {
                pages[pageName] = {
                    name: pageName,
                    entry: filepath,
                    filename: `${pageName}/index.html`
                };
            }
        });
        return pages;
    },
    // 判断插件是否应用于vue应用
    pluginApplyInVue(filePath, name) {
        const fileInfo = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const ast = babelParser.parse(fileInfo, {
            sourceType: 'module'
        });
        let resBol = false;
        try {
            traverse(ast, {
                NewExpression(path) {
                    if (path.node.callee.name === 'Vue') {
                        //找到 new Vue
                        const objExp = path.node.arguments[0]; //取new Vue()的第一个参数
                        if (t.isObjectExpression(objExp)) {
                            resBol = objExp.properties.some((item) => item.key.name === name); //对象的某一个属性全等于name返回true
                        }
                    }
                }
            });
        } catch (e) {
            return resBol;
        }
        return resBol;
    }
};
