'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const gulBeautify = require('gulp-beautify');
const gulpFilter = require('gulp-filter');

module.exports = class extends Generator{
  constructor(args, opts) {
    super(args, opts);
  }

  getUserInputs() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'app name',
      default: 'taskify-app'
    },
    {
      type: 'input',
      name: 'description',
      message: 'app description'
    },
    {
      type: 'input',
      name: 'email',
      message: 'author email'
    },
    {
      type: 'input',
      name: 'repository',
      message: 'app repository'
    },
    {
      type: 'input',
      name: 'mountPath',
      message: 'app mount-path, if you provide mount-path \'foo\'. You will be accessing your app @ http://localhost:<PORT>/foo'
    }]).then(answers => {
      this.name = answers.name;
      this.description = answers.description || 'Taskify app';
      this.email = answers.email || '';
      this.repository = answers.repository || '';
      this.mountPath = (answers.mountPath && (answers.mountPath[0] === '/' ? answers.mountPath : '/' + answers.mountPath )) || '/';
    });
  }

  gulpSetup() {
    const filter = gulpFilter(['**/*.json'], { restore: true })
    this.registerTransformStream(filter);
    this.registerTransformStream(gulBeautify({
      identSize: 2
    }));
    this.registerTransformStream(filter.restore);
  }

  copyTemplatesToApp() {
    this.fs.copy([path.join(this.templatePath(), '/**/*.*')], this.destinationPath(`${this.name}`));
     this.fs.copy(this.templatePath('Procfile'), this.destinationPath(`${this.name}/Procfile`));
    this.fs.copy(this.templatePath('npmrc'), this.destinationPath(`${this.name}/.npmrc`));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath(`${this.name}/.gitignore`));
    this.fs.copy(this.templatePath('eslintrc'), this.destinationPath(`${this.name}/.eslintrc`));
  }

  personalizeApp() {
    const packageJson = this.fs.readJSON(this.templatePath('package.json'));
    packageJson.name = this.name;
    packageJson.description = this.description;
    packageJson.author.email = this.email;
    packageJson.repository.url = this.repository;
    this.fs.write(this.destinationPath(`${this.name}/package.json`), JSON.stringify(packageJson));

    const configJson = this.fs.readJSON(this.templatePath('config/config.json'));
    configJson.requestURI = this.mountPath;
    this.fs.write(this.destinationPath(`${this.name}/config/config.json`), JSON.stringify(configJson));
  }

  finalMessage() {
    this.log(`\`cd ${this.name} && npm run dev\` to start development`);
  }
}
