# Adam J. Dugan Website

This repository contains a multi-page Quarto website for Adam J. Dugan, PhD.

## Project Structure

- `_quarto.yml`
  Main Quarto project configuration, including navigation and output settings.
- `index.qmd`
  Homepage.
- `experience.qmd`
  Career timeline and professional background.
- `projects.qmd`
  Projects, tools, and interactive easter eggs.
- `publications.qmd`
  Selected publications and Google Scholar link.
- `rwe-focus.qmd`
  Perspective on real-world evidence and evidence-generation principles.
- `contact.qmd`
  Contact options and resume download.
- `includes/`
  Shared HTML includes for fonts, canvas background, and shared scripts.
- `assets/css/`
  Shared site styles.
- `assets/js/`
  Shared JavaScript for animations and interactive elements.
- `assets/images/`
  Images used by the site.
- `assets/docs/`
  Downloadable documents such as the resume.
- `docs/`
  Rendered site output for GitHub Pages.

## Local Development

1. Install the Quarto CLI, not just the R package.
2. Open a terminal in this repository.
3. Verify Quarto is available:

   ```powershell
   quarto --version
   ```

4. Render the site:

   ```powershell
   quarto render
   ```

5. Preview locally if desired:

   ```powershell
   quarto preview
   ```

## GitHub Pages Deployment

This project is configured to render into `docs/`.

1. Run `quarto render`.
2. Commit the source changes and the generated `docs/` output.
3. Push to GitHub.
4. In GitHub, open `Settings > Pages`.
5. Set the source to `Deploy from a branch`.
6. Choose the default branch and `/docs` folder.

If the repository is named `adamdugan.github.io`, the site will publish at:

- `https://adamdugan.github.io/`

## Notes

- The current site preserves custom CSS and JavaScript rather than relying on a default Quarto theme.
- Interactive features currently live on the `Projects/Tools` page.
- The older single-page static site entrypoint has been superseded by the Quarto source files.
