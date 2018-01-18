import * as glob from 'glob';
import * as fs from 'fs';
import * as argv from 'command-line-args';
import * as path from 'path';
import * as root from 'app-root-path';
import * as mkdirp from 'mkdirp';
import * as logger from 'winston-color';

import { ModuleConfig, Locale, moduleConfigDefault, argvDefinitions } from './config';

class NgxTranslateExtractJson {

    /**
     * Options array.
     * Default or params from cli flags
     *
     * @type {ModuleConfig}
     * @returns {void}
     */
    private options: ModuleConfig;


    /**
     * Locales object for make files
     *
     * @type {Locale}
     * @returns {void}
     */
    private locales: Locale;

    constructor() {

        /**
         * Initialization
         */

        this.options = { ...moduleConfigDefault, ...argv(argvDefinitions) }; // get cli flags
        this.locales = {};

        this.createFiles();
    }

    /**
     * Merge translate files
     *
     * @method {public}
     * @returns {void}
     */
    public createFiles(): void {

        /**
         * Get files
         */
        glob(this.options.input, { root: root.path }, (error, files) => {
            if (files.length) {

                /**
                 * Add locales
                 */
                files.map(file => {
                    if (!/.*\/assets\/.*/.test(file)) { // path contains /assets/
                        logger.info(file);

                        if (!this.locales[path.basename(file, '.json')]) {
                            this.locales[path.basename(file, '.json')] = {};
                        }

                        this.locales[path.basename(file, '.json')] = {
                            ...this.locales[path.basename(file, '.json')],
                            ...JSON.parse(fs.readFileSync(file, 'utf8'))
                        };
                    }
                });
            } else {
                logger.error('ERROR: json file not found.');
            }


            /**
             * Add directories if not found
             */
            mkdirp(this.options.output, () => logger.error);


            /**
             * Set locale files
             */
            for (const key in this.locales) {
                if (this.locales.hasOwnProperty(key)) {
                    fs.writeFileSync(`${this.options.output}/${key}.json`, JSON.stringify(this.locales[key]), 'utf8');
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object
                }
            }
        });
    }
}

export const extractor = new NgxTranslateExtractJson();
