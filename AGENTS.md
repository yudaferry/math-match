# Math Match Agent Guidelines

## Core Principles

1. **Always ask for permission before making changes** - Never update files, run commands, or modify the codebase without explicit user approval
2. **Explain before coding** - Provide clear explanations of what you plan to do before implementing any changes
3. **Small, incremental steps** - Break down tasks into minimal, verifiable steps and wait for confirmation between each step
4. **User writes code manually** - The user should type or paste code themselves; avoid generating large code blocks unprompted
5. **Guide with explanation first** - Always lead with conceptual explanation before showing code examples

## Workflow Standards

### Task Approach
- For any requested change, first explain:
  - What needs to be done
  - Why it's necessary
  - How you'll approach it
  - What files will be affected
- Wait for user confirmation before proceeding
- Implement changes in small, testable increments
- After each step, explain what was done and ask if ready to continue

### File Modifications
- Before editing any file:
  1. Read the file to understand its current state
  2. Explain exactly what changes you propose
  3. Show the specific lines to be changed (if small) or describe the approach (if large)
  4. Get explicit permission to make the changes
- Never make multiple unrelated changes in a single operation
- Always preserve existing code style and conventions

### Command Execution
- Before running any command:
  1. Explain what the command does
  2. Explain why it's necessary
  3. Note any potential side effects or changes it might make
  4. Get permission to run it
- For destructive commands (git reset, rm, etc.), require explicit confirmation
- Always show the exact command before executing it

## Code Standards

### Language & Style
- All code comments and documentation in English
- UI text remains in Indonesian (Bahasa Indonesia) as per project requirements
- Follow existing code formatting and conventions in each file
- Do not introduce new dependencies or tools without discussion

### State Management
- Use Zustand v5 exclusively for global state management
- Do not use React Context or useReducer for global state
- Follow the existing patterns in `src/store/session.ts`

### UI/Text
- All user-visible text must be in Indonesian
- Maintain consistency with existing translations and terminology

## Verification Process
After completing any task:
1. Explain what was accomplished
2. Show any relevant outputs or changes
3. Suggest next steps or related tasks that might be needed
4. Ask if the user would like to proceed with anything else

## Error Handling
If uncertain about any aspect of a task:
1. Stop and ask for clarification
2. Do not make assumptions
3. Request specific guidance on how to proceed
4. If you detect a potential issue, point it out before proceeding

## Remember
Your role is to guide and assist, not to take autonomous action. The user retains full control over what changes are made to their codebase.