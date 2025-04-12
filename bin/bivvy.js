#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

program
  .command('init')
  .description('Initialize project files')
  .option('--cursor', 'Initialize Cursor rules')
  .option('--windsurf', 'Initialize Windsurf configuration (placeholder)')
  .action(async (options) => {
    try {
      console.log(chalk.blue('Initializing project files...'));
      
      // Get the current working directory (user's project)
      const cwd = process.cwd();
      
      // Initialize .bivvy directory and copy example files
      const bivvyDir = path.join(cwd, '.bivvy');
      const packageRoot = path.join(__dirname, '..');
      const exampleDir = path.join(packageRoot, 'src', 'example');
      await fs.copy(exampleDir, bivvyDir, { overwrite: true });
      console.log(chalk.green('✓ Copied example files to .bivvy directory'));
      
      // Handle cursor initialization if --cursor flag is set
      if (options.cursor) {
        // Create .cursor/rules directory if it doesn't exist
        const rulesDir = path.join(cwd, '.cursor', 'rules');
        await fs.ensureDir(rulesDir);
        
        // Copy cursor.mdc to .cursor/rules/bivvy.mdc
        const sourceFile = path.join(packageRoot, 'src', 'rules', 'cursor.mdc');
        const targetFile = path.join(rulesDir, 'bivvy.mdc');
        
        await fs.copyFile(sourceFile, targetFile);
        console.log(chalk.green('✓ Copied cursor rules to .cursor/rules/bivvy.mdc'));
      }

      // Handle windsurf initialization if --windsurf flag is set
      if (options.windsurf) {
        console.log(chalk.yellow('⚠️ Windsurf configuration is a placeholder for future functionality'));
      }

      console.log(chalk.green('✓ Project files created successfully!'));
    } catch (error) {
      console.error(chalk.red('Error creating project files:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv); 