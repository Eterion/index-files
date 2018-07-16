import { Options } from 'yargs';

export default <{ [index: string]: Options }>{
  fileExtension: {
    alias: 'e',
    default: 'js',
    describe: 'File extension of generated index file.',
    type: 'string',
  },
  fileName: {
    alias: 'n',
    default: 'index',
    describe: 'File name of generated index file.',
    type: 'string',
  },
  ignoreFiles: {
    alias: 'i',
    default: [],
    describe: 'List of ignored file names.',
    type: 'array',
  },
  moduleExtension: {
    alias: 'me',
    default: 'js',
    describe: 'File extension of modules.',
    type: 'string',
  },
  moduleExtensionInPath: {
    alias: 'mei',
    default: false,
    describe: 'Adds module extension to path.',
    type: 'boolean',
  },
  moduleTemplate: {
    alias: 'mt',
    default: "export { default as {name} } from '{path}';",
    describe: 'Template for module export.',
    type: 'string',
  },
  recursion: {
    alias: 'r',
    default: true,
    describe: 'Enable recursion.',
    type: 'boolean',
  },
  recursionTemplate: {
    alias: 'rt',
    default: "import * as {name} from '{path}';",
    describe: 'Template for recursion.',
    type: 'string',
  },
  recursionTemplateExport: {
    alias: 'rte',
    default: 'export { {moduleList} };',
    describe: 'Template for recursion export.',
    type: 'string',
  },
};