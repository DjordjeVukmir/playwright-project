const { allure } = require('allure-playwright');
const fs = require('fs');
const path = require('path');

function wrapWithStepScreenshots(page, pageObject) {
    const wrapped = Object.create(Object.getPrototypeOf(pageObject));

    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(pageObject))
        .filter(name => typeof pageObject[name] === 'function' && name !== 'constructor');

    for (const name of methodNames) {
        wrapped[name] = async (...args) => {
            const result = await pageObject[name](...args);


            const screenshot = await page.screenshot();


            const fileName = `step-${name}-${Date.now()}.png`;
            const filePath = path.join('allure-results', fileName);
            fs.writeFileSync(filePath, screenshot);


            allure.attachment(`Step - ${name}`, screenshot, 'image/png');

            return result;
        };
    }

    Object.assign(wrapped, pageObject);
    return wrapped;
}

module.exports = {
    wrapWithStepScreenshots,
};