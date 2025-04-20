#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Extract initialization logic into a separate function
async function initializeProject(options) {
  console.log(chalk.blue('Initializing project files...'));
  
  // Get the current working directory (user's project)
  const cwd = process.cwd();
  
  // Get the package root directory
  const packageRoot = path.join(__dirname, '..');
  
  // Initialize .bivvy directory
  const bivvyDir = path.join(cwd, '.bivvy');
  await fs.ensureDir(bivvyDir);
  
  // Copy quickstart guide
  const quickstartSource = path.join(packageRoot, 'src', 'bivvy-quickstart.md');
  const quickstartTarget = path.join(bivvyDir, 'quickstart.md');
  
  if (!fs.existsSync(quickstartSource)) {
    throw new Error(`Quickstart guide not found: ${quickstartSource}`);
  }
  
  await fs.copyFile(quickstartSource, quickstartTarget);
  console.log(chalk.green('✓ Copied quickstart guide to .bivvy directory'));

  const rules = [
    'bivvy-base.mdc',
    'bivvy-continue-climbing.mdc',
    'bivvy-done-climbing.mdc',
    'bivvy-new-climb.mdc'
  ];
  
  // Handle cursor initialization if --cursor flag is set
  if (options.cursor) {
    // Create .cursor/rules directory if it doesn't exist
    const rulesDir = path.join(cwd, '.cursor', 'rules');
    await fs.ensureDir(rulesDir);
    
    await Promise.all(rules.map(async (rule) => {
      // Copy rule to .cursor/rules/[rule]
      const sourceFile = path.join(packageRoot, 'src', rule);
      const targetFile = path.join(rulesDir, rule);
      
      console.log(chalk.blue(`Source rules file: ${rule}`, sourceFile));
      console.log(chalk.blue(`Target rules file: ${rule}`, targetFile));
      
      // Check if source file exists
      if (!fs.existsSync(sourceFile)) {
        throw new Error(`Source file not found: ${sourceFile}`);
      }
      
      await fs.copyFile(sourceFile, targetFile);
      console.log(chalk.green(`✓ Copied cursor rules to .cursor/rules/${rule}`));
    }));
  }

  // Handle windsurf initialization if --windsurf flag is set
  if (options.windsurf) {
    // Copy rules to .bivvy directory
    await Promise.all(rules.map(async (rule) => {
      const sourceFile = path.join(packageRoot, 'src', rule);
      const targetFile = path.join(bivvyDir, rule);
      
      console.log(chalk.blue(`Copying rules file: ${rule}`));
      if (!fs.existsSync(sourceFile)) {
        throw new Error(`Rules source file not found: ${sourceFile}`);
      }
      await fs.copyFile(sourceFile, targetFile);
      console.log(chalk.green(`✓ Copied rules to .bivvy/${rule}`));
    }));

    // Handle .windsurfrules file
    const windsurfRulesPath = path.join(cwd, '.windsurfrules');
    const agentOverviewPath = path.join(packageRoot, 'src', 'bivvy-agent-overview.md');
    
    if (!fs.existsSync(agentOverviewPath)) {
      throw new Error(`Agent overview file not found: ${agentOverviewPath}`);
    }

    const overviewContent = await fs.readFile(agentOverviewPath, 'utf8');
    
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
}

program
  .command('init')
  .description('Initialize project files')
  .option('--cursor', 'Initialize Cursor rules')
  .option('--windsurf', 'Initialize Windsurf configuration')
  .action(async (options) => {
    try {
      await initializeProject(options);
    } catch (error) {
      console.error(chalk.red('Error creating project files:'), error);
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update project files (removes old files first)')
  .option('--cursor', 'Update Cursor rules')
  .option('--windsurf', 'Update Windsurf configuration')
  .action(async (options) => {
    try {
      const cwd = process.cwd();
      
      if (options.cursor) {
        // Remove old cursor rules
        const cursorRulesDir = path.join(cwd, '.cursor', 'rules');
        const oldCursorFile = path.join(cursorRulesDir, 'bivvy.mdc');
        if (fs.existsSync(oldCursorFile)) {
          console.log(chalk.blue('Removing old cursor rules file:', oldCursorFile));
          await fs.remove(oldCursorFile);
        }
      }

      if (options.windsurf) {
        // Remove old windsurf rules
        const oldWindsurfFile = path.join(cwd, '.windsurfrules');
        if (fs.existsSync(oldWindsurfFile)) {
          console.log(chalk.blue('Removing old windsurf rules file:', oldWindsurfFile));
          await fs.remove(oldWindsurfFile);
        }
      }

      // Run normal initialization
      await initializeProject(options);
    } catch (error) {
      console.error(chalk.red('Error updating project files:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv); 