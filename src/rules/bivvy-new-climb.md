[bivvy-base.mdc](mdc:.cursor/rules/bivvy-base.mdc)

REQUIRED_CONTEXT: bivvy-base.mdc

## Creating the PRD
- THIS NEEDS TO BE ITERATIVE!
- If you need to, ask the user for clarifying questions before starting
- CRITICAL: YOU MUST STOP after your first draft of the PRD and wait for user approval
- CRITICAL: YOU MUST STOP after any significant changes to the PRD
- The PRD must be approved before moving on to creating the moves list

## Creating Moves List
Once the Climb is generated and approved by the user, generate the Moves list.
You should carefully consider the ORDER in which these tasks need to be completed.
The size of every move should be something an AI agent can carry out in 2-3 code changes.
Make sure to add reasonable {rest: true} along the way.

After PRD approval:
- Create the moves list
- CRITICAL: YOU MUST STOP after creating the initial moves list for user approval
- Moves marked as "skip" MUST NOT be worked on unless explicitly requested by the user
- NEVER work ahead or complete tasks out of order
- Each move should be completed and approved before moving to the next one
- If a move depends on a skipped move, YOU MUST ASK the user if they want to return to the skipped move first