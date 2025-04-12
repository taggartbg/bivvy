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
      
      // Get the package root directory
      const packageRoot = path.join(__dirname, '..');
      
      // Initialize .bivvy directory and copy example files
      const bivvyDir = path.join(cwd, '.bivvy');
      const exampleDir = path.join(packageRoot, 'src', 'example');
      
      console.log(chalk.blue('Source example directory:', exampleDir));
      console.log(chalk.blue('Target bivvy directory:', bivvyDir));
      
      // Check if source directory exists
      if (!fs.existsSync(exampleDir)) {
        throw new Error(`Source directory not found: ${exampleDir}`);
      }
      
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
        
        console.log(chalk.blue('Source rules file:', sourceFile));
        console.log(chalk.blue('Target rules file:', targetFile));
        
        // Check if source file exists
        if (!fs.existsSync(sourceFile)) {
          throw new Error(`Source file not found: ${sourceFile}`);
        }
        
        await fs.copyFile(sourceFile, targetFile);
        console.log(chalk.green('✓ Copied cursor rules to .cursor/rules/bivvy.mdc'));
      }

      // Handle windsurf initialization if --windsurf flag is set
      if (options.windsurf) {
        console.log(chalk.yellow('⚠️ Windsurf configuration is a placeholder for future functionality'));
      }

      console.log(chalk.green('✓ Project files created successfully!'));
      console.log(" ");
      console.log(chalk.green('/|\\ Bivvy is ready to go!  Tell your agent to start a new Climb.'));
      process.exit(0);
    } catch (error) {
      console.error(chalk.red('Error creating project files:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv); 