"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleConfigDefault = {
    input: '/**/i18n/*.json',
    output: '/assets/i18n'
};
exports.argvDefinitions = [
    { name: 'input', alias: 'i', type: String },
    { name: 'output', alias: 'o', type: String }
];
