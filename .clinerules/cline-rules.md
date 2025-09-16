# Cline Configuration for Investing 101 Docusaurus Book

This is a Docusaurus-based educational book about investing basics. The project is structured as a comprehensive guide to fundamental investment concepts and mathematical principles.

## Project Structure
- **Main content location**: `docs/` folder contains all the educational content
- **Framework**: Docusaurus v3 static site generator
- **Content format**: Markdown/MDX files with mathematical formulas

## Key Features
- **KaTeX enabled**: Mathematical formulas are supported throughout the documentation
- **Math formulas**: Use LaTeX syntax for mathematical expressions
- **Dollar sign escaping**: Remember to escape `$` signs when not used for math (use `\$`)

## Content Guidelines
- Most pages should be created in the `docs/` folder
- Use mathematical formulas extensively to explain investment concepts
- Escape dollar signs with backslash when referring to currency: `\$100` instead of `$100`
- If using $ sign within curly braces {} please use \text for example when using frac `\frac{\text{\$50}}{\text{\$900}}`. This is to ensure dollar sign is rendered properly without errors
- For inline math, use single dollar signs: `$formula$`
- For block math, use double dollar signs: `$$formula$$`

## Example Math Usage
- Compound interest: `$A = P(1 + r)^t$`
- Present value: `$PV = \frac{FV}{(1 + r)^n}$`
- Currency amounts: `\$1,000` (escaped dollar sign)

## File Organization
- `/docs/` - Main educational content
- `/src/pages/` - Custom pages
- `/blog/` - Blog posts (if needed)
- `/static/` - Static assets

## Development Notes
- Run `npm start` to start development server
- Build with `npm run build`
- Content is written in Markdown with MDX support for React components
