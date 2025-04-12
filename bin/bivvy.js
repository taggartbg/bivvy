#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

program
  .command('init')
  .description('Initialize project files')
  .action(async () => {
    try {
      console.log(chalk.blue('Initializing project files...'));
      
      // Get the current working directory
      const cwd = process.cwd();
      
      // Create a README.md
      await fs.writeFile(
        path.join(cwd, 'README.md'),
        `# My Project

This project was initialized with bivvy.

## Getting Started

1. Install dependencies
2. Run the project
`
      );

      // Create a basic .gitignore
      await fs.writeFile(
        path.join(cwd, '.gitignore'),
        `node_modules/
.env
.DS_Store
`
      );

      console.log(chalk.green('✓ Project files created successfully!'));
    } catch (error) {
      console.error(chalk.red('Error creating project files:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv); 