# Contributing to Prayer Times Lite

Thank you for your interest in contributing to Prayer Times Lite! We welcome contributions from the community and are grateful for your help in improving this application.

## 📋 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to maintain a respectful and welcoming environment for everyone.

## 🚀 How to Contribute

### Reporting Bugs

- Check the existing issues to see if the bug has already been reported
- Open a new issue with a clear title and description
- Include steps to reproduce the issue
- Mention your environment (browser, OS, device)
- Add appropriate labels to your issue

### Suggesting Features

- Check if the feature has already been suggested in the issues
- Open a new issue with a detailed description of the feature
- Explain why this feature would be useful
- Consider the app's minimalist philosophy when suggesting features

### Code Contributions

1. Fork the repository
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   ```
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Add or update documentation as needed
6. Commit your changes with a clear, descriptive commit message
7. Push to your fork
8. Create a pull request to the main repository

## 🛠 Development Setup

1. Clone your fork:

   ```bash
   git clone https://github.com/your-username/prayer-times-lite.git
   cd prayer-times-lite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Make your changes and test them in the browser

## 📝 Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices and performance guidelines
- Use TypeScript for new files when possible
- Keep components focused and reusable
- Write descriptive comments for complex logic
- Use meaningful variable and function names

### Styling

- Use TailwindCSS utility classes
- Follow the design system established in index.css
- Maintain consistent spacing and typography
- Ensure responsive design on all screen sizes
- Support both light and dark modes

### File Structure

- Place components in the `src/components/` directory
- Place custom hooks in the `src/hooks/` directory
- Place utility functions in the `src/utils/` directory
- Place constants in the `src/constants/` directory

## 📦 Pull Request Guidelines

- Keep pull requests focused on a single feature or bug fix
- Provide a clear description of the changes
- Include screenshots or GIFs if UI changes are involved
- Ensure all tests pass (if any exist)
- Update documentation if needed
- Follow the pull request template if provided

## 🏗 Architecture Considerations

When adding new features, consider the following architecture principles:

- Maintain the minimalist philosophy
- Keep performance in mind (minimize bundle size)
- Ensure offline capability where possible
- Respect the existing component structure
- Maintain accessibility standards
- Preserve multilingual support

## 🌍 Translation Contributions

If you'd like to contribute translations:

1. Update the `translations` object in `src/constants/translations.js`
2. Add the new language code to the language selector component
3. Ensure RTL languages are properly supported (for Arabic)
4. Test your translations in the UI

## 🧪 Testing

Though we don't have a formal testing suite currently, please test your changes manually:

- Test across different browsers (Chrome, Firefox, Safari)
- Test on different screen sizes
- Test both light and dark modes
- Verify all prayer time calculations
- Test both GPS and manual location selection

## ❓ Questions?

If you have questions about contributing, feel free to open an issue and tag it with 'question'.

Thank you for contributing to Prayer Times Lite!
