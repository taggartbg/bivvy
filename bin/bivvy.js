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
        // Copy cursor.mdc to .bivvy/bivvy.mdc
        const rulesSourceFile = path.join(packageRoot, 'src', 'rules', 'cursor.mdc');
        const bivvyMdcTarget = path.join(bivvyDir, 'bivvy.mdc');
        
        console.log(chalk.blue('Copying rules file to .bivvy/bivvy.mdc'));
        if (!fs.existsSync(rulesSourceFile)) {
          throw new Error(`Rules source file not found: ${rulesSourceFile}`);
        }
        await fs.copyFile(rulesSourceFile, bivvyMdcTarget);
        console.log(chalk.green('✓ Copied rules to .bivvy/bivvy.mdc'));

        // Handle .windsurfrules file
        const windsurfRulesPath = path.join(cwd, '.windsurfrules');
        const overviewSourcePath = path.join(packageRoot, 'src', 'example', 'bivvy-agent-overview.md');
        
        if (!fs.existsSync(overviewSourcePath)) {
          throw new Error(`Overview source file not found: ${overviewSourcePath}`);
        }

        const overviewContent = await fs.readFile(overviewSourcePath, 'utf8');
        
        if (fs.existsSync(windsurfRulesPath)) {
          // Append to existing file
          console.log(chalk.blue('Appending to existing .windsurfrules file'));
          await fs.appendFile(windsurfRulesPath, `\n${overviewContent}`);
          console.log(chalk.green('✓ Appended content to .windsurfrules'));
        } else {
          // Create new file
          console.log(chalk.blue('Creating new .windsurfrules file'));
          await fs.writeFile(windsurfRulesPath, overviewContent);
          console.log(chalk.green('✓ Created .windsurfrules file'));
        }
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