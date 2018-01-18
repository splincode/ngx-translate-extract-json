"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var argv = require("command-line-args");
var path = require("path");
var root = require("app-root-path");
var mkdirp = require("mkdirp");
var logger = require("winston-color");
var config_1 = require("./config");
var NgxTranslateExtractJson = (function () {
    function NgxTranslateExtractJson() {
        this.options = __assign({}, config_1.moduleConfigDefault, argv(config_1.argvDefinitions));
        this.locales = {};
        this.createFiles();
    }
    NgxTranslateExtractJson.prototype.createFiles = function () {
        var _this = this;
        glob(this.options.input, { root: root.path }, function (error, files) {
            if (files.length) {
                files.map(function (file) {
                    if (!/.*\/assets\/.*/.test(file)) {
                        logger.info(file);
                        if (!_this.locales[path.basename(file, '.json')]) {
                            _this.locales[path.basename(file, '.json')] = {};
                        }
                        _this.locales[path.basename(file, '.json')] = __assign({}, _this.locales[path.basename(file, '.json')], JSON.parse(fs.readFileSync(file, 'utf8')));
                    }
                });
            }
            else {
                logger.error('ERROR: json file not found.');
            }
            mkdirp(_this.options.output, function () { return logger.error; });
            for (var key in _this.locales) {
                if (_this.locales.hasOwnProperty(key)) {
                    fs.writeFileSync(_this.options.output + "/" + key + ".json", JSON.stringify(_this.locales[key]), 'utf8');
                }
            }
        });
    };
    return NgxTranslateExtractJson;
}());
exports.extractor = new NgxTranslateExtractJson();
