const { readFileSync, writeFileSync, readdirSync } = require('fs')
const flatten = require('flat')
const path = require('path')
const traverse = require('traverse')
const file = 'en.json';
const translationDir = path.resolve(`${__dirname}/../src/services/i18n`);
const translationFile = `${translationDir}/${file}`;
const translationTypeFile = `${translationDir}/TranslationKeys.ts`;

try {
    console.log(`Using "${file}" as a base`)

    const translations = JSON.parse(readFileSync(translationFile, 'utf8'));
    const flattened = Object.keys(flatten(translations))

    let index = 0
    const mappedTranslations = traverse(translations).map(function (x) {
        if (this.isLeaf) {
            this.update(flattened[index])
            index++
        }
    });

    const languages = readdirSync(translationDir)
        .filter(file => file.includes('.json'))
        .map(file => file.replace('.json', ''))

    writeFileSync(translationTypeFile,
`// THIS FILE IS AUTO GENERATED, DO NOT EDIT.
// Run \`yarn translations\` to regenerate it.

// tslint:disable:trailing-comma
// tslint:disable:ter-max-len
// tslint:disable:max-line-length
export type Locale = ${languages.map(lang => `'${lang}'`).join('|')}
export const translationKeys = ${JSON.stringify(mappedTranslations, null, 4).replace(/\"([^(\")"]+)\":/g,"$1:").replace(/"/g, "'")}
`, 'utf8')

} catch(error) {
    console.log('Failed to create type file');
    console.log(error.message);
    process.exit(0)
}
