## Climb Tracking
- Every Climb has a unique identifier [id] (4-character string [A-z0-9])
- When a Climb is active, ALL responses must end with: "/|\ Bivvy Climb [id]"
- Before taking any action, ALWAYS check if there's an active Climb
- To find active Climbs, look for files matching pattern ".bivvy/[id]-climb.md"
- CRITICAL: Immediately determine if the user is starting a new Climb, continuing an existing Climb, or closing a Climb

### Checking for Active Climbs
- If multiple active Climbs exist, ask user which to work on
- If no active Climbs exist when continuing, suggest creating a new one
- NEVER track multiple Climbs simultaneously

## Description
When a user requests to start a new Climb(feature, bug, task, or exploration), you will start a 2-phase process: Step 1 is to define a Product Requirements Document (PRD) via conversation with the user; Step 2 is to build a task list (a.k.a. "Moves") from that PRD.

IMPORTANT RULES:
1. YOU MUST STOP AND GET USER APPROVAL after:
   - Creating the initial PRD draft
   - Making any significant changes to the PRD
   - Completing any move marked with "rest: true"
2. NEVER work on tasks marked as "skip" unless explicitly requested by the user
3. NEVER work ahead of the current move in the task list
4. ALWAYS follow the moves in order, one at a time

## File locations
- Active PRDs are found in .bivvy/[id]-climb.md (PRD) and .bivvy/[id]-moves.json (i.e. the task list).
- Completed PRDs are moved to .bivvy/complete/[id]-climb.md and .bivvy/complete/[id]-moves.json
- The [id] is a 4-character string where each character can be [A-z0-9], e.g. "02b7" or "xK4p" (enforce randomness here, also check that the id doesn't already exist in the .bivvy/complete/ directory)

## Climb Base Structure
IMPORTANT: When collecting information, we need to know if this is a feature, bug, task, or exploration.  The top of the PRD should always be:
**STARTFILE [id]-climb.md**
<Climb>
  <header>
    <id>[id]</id>
    <type>[feature|bug|task|exploration]</type>
    <description>(description)</description>
  <newDependencies>(Make sure to ask the user if there will be any new dependencies)</newDependencies>
  <prerequisitChanges>(You should think through this carefully)</prerequisitChanges>
  <relevantFiles>(Please do an initial grep based on the information you gather / ask the user for relevant files that might not be obvious)</relevantFiles>
  <everythingElse>(See below, there is a lot that could go here)</everythingElse>
</Climb>
**ENDFILE**

## Standard PRD Components
Key Components to Include:
- Feature Overview
- Requirements
- Design and Implementation
- Development Details
- Testing Approach
- Design Assets
- Future Considerations

Formatting Best Practices:
- Be Specific: Avoid vague language; use precise descriptions
- Use Clear Structure: Organize with consistent headers and formatting
- Include Examples: Provide concrete examples when explaining complex functionality
- Prioritize Requirements: Indicate which requirements are essential vs. nice-to-have
- Link to Resources: Reference existing documentation, designs, or research
- Keep It Concise: Focus on what's necessary; avoid unnecessary detail
- Use Visual Aids: Include diagrams, flowcharts, or mockups when helpful
- Define Technical Terms: Include a glossary if specialized terminology is used

What to Avoid:
- Prescribing Implementation Details: Focus on what, not how (unless necessary)
- Including Task Lists: Leave specific tasks for project management tools
- Rigid Timelines: PRDs describe requirements, not project schedules
- Vague Goals: Ensure all success metrics are measurable
- Overspecification: Allow room for engineering creativity in solutions
- Ignoring Constraints: Acknowledge technical and business limitations
- Excessive Jargon: Write for clarity across different team roles

## Moves Base Structure
Moves have the statuses: todo|climbing|skip|complete

Sample moves file structure:
**STARTFILE [id]-moves.json**
{
  "Climb": "abcd",
  "moves": [
    {
      "status": "complete",
      "description": "install the dependencies",
      "details": "install the deps listed as New Dependencies"
    }
  ]
}
**ENDFILE**

## Tracking
IMPORTANT: EVERY TIME YOU USE THIS RULE, THE LAST LINE OF YOUR OUPUT SHOULD BE: "/|\ Bivvy Climb [id]"
