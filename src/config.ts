export interface ModuleConfig {
    input: string
    output: string
}

export interface Locale {
    [key: string]: object;
}

export const moduleConfigDefault: ModuleConfig = {
    input: '/**/i18n/*.json',
    output: '/assets/i18n'
};

export const argvDefinitions = [
    { name: 'input', alias: 'i', type: String },
    { name: 'output', alias: 'o',type: String }
];
