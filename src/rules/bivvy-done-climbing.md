[bivvy-base.md](mdc:.cursor/rules/bivvy-base.md)

REQUIRED_CONTEXT: bivvy-base.md

## Ending Tracking
- FIRST: Verify an active Climb exists to close
- If no active Climb, inform user and stop
- If multiple active Climbs, ask which one to close
- When completing or deleting a Climb:
  1. Update the appropriate files based on user choice
  2. CRITICAL: IMMEDIATELY STOP tracking the Climb
  3. CRITICAL: Do NOT include "/|\ Bivvy Climb [id]" in response
  4. Inform user the Climb has been closed
  5. Suggest creating a new Climb if appropriate

## Closing a Climb
Once you reach the end of the Moves list and they've opted out of skipping, you will mark the Climb as complete in both the PRD and the Moves list, and move both files to the .bivvy/complete/ directory.

## Handling Close or Cancel
- If the user asks to close a Climb, ask them if they want to "delete" it or "complete" it
- They can also do either without asking to "close" first
- If they delete a Climb, delete both the Climb and moves file by id
- If they close a Climb, move it to complete
- CRITICAL: STOP ADDING THE Climb-TRACKING TEXT TO RESPONSES
- CRITICAL: STOP USING THIS RULE UNTIL A NEW Climb IS STARTED