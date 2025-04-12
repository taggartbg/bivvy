# Bivvy

A Zero-Dependency Stateful PRD Framework for AI-Driven Development

## Quickstart

```bash
npx bivvy init --cursor
```

Then ask your AI agent to create a new `climb` and you're ready to go!

**(NOTE: We suggest you commit the created Bivvy files before making additional changes)

## Supported Clients

Currently, Bivvy supports:
- [Cursor](https://cursor.sh) (✅ Available now)
- Windsurf (🚧 Coming soon)

Want to see Bivvy support another client? [Open an issue](https://github.com/taggartbg/bivvy/issues)!

## How it Works

Bivvy provides a structured framework for AI-driven development through a combination of Product Requirements Documents (PRDs) and task management. Here's how it works:

### Initialization

When you run `bivvy init --cursor`, Bivvy:
1. Creates a `.cursor/rules/bivvy.mdc` file with the AI interaction rules
2. Sets up a `.bivvy` directory with example files
3. Creates a `.bivvy/complete` directory for finished work

### The Climb Concept

A "Climb" is Bivvy's term for a development project, which can be a feature, bug fix, task, or exploration. Each Climb consists of two key components:

1. **PRD (`.bivvy/[id]-climb.md`)**
   - Contains the project requirements and specifications
   - Includes metadata like ID, type, and description
   - Documents dependencies, prerequisites, and relevant files
   - Structured as a markdown file with YAML frontmatter

2. **Moves (`.bivvy/[id]-moves.json`)**
   - A JSON file containing the task list
   - Each move has a status: `todo`, `climbing`, `skip`, or `complete`
   - Moves can be marked with `rest: true` for mandatory checkpoints
   - Tasks are executed in strict order

### File Structure

```
.bivvy/
├── [id]-climb.md      # Active PRD
├── [id]-moves.json    # Active task list
└── complete/          # Completed climbs
    ├── [id]-climb.md
    └── [id]-moves.json
```

### Interacting with the Agent

1. **Starting a Climb**
   - Ask your AI agent to create a new climb
   - The agent will help you draft the PRD
   - You must approve the initial PRD before proceeding

2. **During Development**
   - The agent works through moves one at a time
   - Stops for approval at `rest: true` checkpoints
   - Skips tasks marked as `skip` (can return to them later)
   - Updates move statuses in real-time

3. **Completing a Climb**
   - When all moves are done, the agent will:
     - Ask to mark the climb as complete
     - Move files to `.bivvy/complete/`
     - Stop tracking the climb

### Example Workflow

1. Initialize Bivvy: `npx bivvy init --cursor`
2. Start a new climb: "Create a new feature climb for adding user authentication"
3. Review and approve the PRD
4. Review and approve the moves list
5. Let the agent work through the moves
6. Review and approve each significant change
7. Complete the climb when done

### Best Practices

- Always review PRDs and moves lists before approval
- Use `rest: true` for important checkpoints
- Mark non-critical tasks as `skip` to focus on core functionality
- Keep moves small and focused (2-3 code changes)
- Trust the process and follow moves in order

### Running Locally

Want to try out changes or contribute? Clone the repo and copy the files manually:

```bash
git clone https://github.com/taggartbg/bivvy.git
mkdir your-project/.bivvy
cp -r bivvy/src/example/* your-project/.bivvy
cp bivvy/src/rules/.cursor.mdc your-project/.cursor/rules/bivvy.mdc
```

## Contributing

While Bivvy is a small project, I'd love to see it grow! Contributions are welcome through:
- Pull Requests for new features or improvements
- Issues for bug reports or feature requests
- Discussions in the Issues section

Let's make AI-driven development more structured and efficient together!

## License

MIT 