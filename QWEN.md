# Qwen Code Assistant Rules for Prayer Times Lite Project

## Project Context

- **Project:** Prayer Times Lite - A minimal web application showing prayer times
- **Tech Stack:** React + Vite + TailwindCSS
- **Languages:** Turkish, English, Arabic
- **Goal:** Create a distraction-free prayer time application

## Core Rules

### 1. Code Style & Conventions

- Follow React best practices and modern hooks patterns
- Use functional components with hooks (no class components)
- Implement proper TypeScript types when creating new files
- Use TailwindCSS utility classes for styling (no custom CSS unless absolutely necessary)
- Follow the existing project structure and naming conventions
- Maintain consistent indentation and formatting

### 2. Project Structure Adherence

- Place components in `src/components/`
- Place hooks in `src/hooks/`
- Place utility functions in `src/utils/`
- Place constants in `src/constants/`
- Maintain the established folder hierarchy
- Follow the component and hook architecture as defined in documentation

### 3. Multilingual Support

- Ensure all new UI elements have translations in TR/EN/AR
- Use the existing translation system in `src/constants/translations.js`
- Follow RTL (right-to-left) considerations for Arabic content
- Test language switching functionality when implementing new features

### 4. Performance & Accessibility

- Optimize components for performance using React.memo when appropriate
- Implement proper accessibility attributes (ARIA labels, roles, etc.)
- Maintain responsive design for all screen sizes
- Follow accessibility best practices for color contrast and keyboard navigation

### 5. API Integration

- Use the established API utility functions in `src/utils/api.js`
- Follow caching strategies as defined in the architecture
- Implement proper error handling and fallbacks
- Respect rate limits and implement retry logic where needed

### 6. Additional Requirements

- **Progress Tracking:** Create and maintain a `Progress.md` file to track task completion
- **Progress Updates:** Update `Progress.md` file after each task is completed
- Document the completion status of each task according to the tasks.md specification
- Record time spent on each task and update the overall project status

### 7. Testing & Verification

- Test new components with multiple languages
- Verify responsive design on different screen sizes
- Test with both light and dark modes
- Validate API interactions and error handling
- Ensure all new code integrates properly with existing architecture

### 8. Documentation

- Update relevant documentation when implementing new features
- Follow the established documentation format used in existing MD files
- Document new components and hooks according to the established patterns

## Special Instructions

- Always consider the minimalist philosophy of the application
- Prioritize user experience and clean UI design
- Ensure the application remains focused on its core functionality
- Maintain offline capability where possible
