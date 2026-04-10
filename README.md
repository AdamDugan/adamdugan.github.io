# Adam J. Dugan Website

This repository contains the source for the personal and professional website of Adam J. Dugan, PhD.

The site is built with [Quarto](https://quarto.org/) and published via GitHub Pages.

## Overview

The website is organized into a small set of pages:

- `Home`
- `Experience`
- `Projects/Tools`
- `Publications`
- `RWE Focus`
- `Contact`

## Tech Stack

- Quarto for site generation
- Custom CSS for styling
- Lightweight JavaScript for small UI behaviors
- GitHub Pages for hosting

## Repository Layout

- `_quarto.yml`
  Site configuration and navigation
- `*.qmd`
  Page content
- `assets/`
  Shared styles, scripts, images, and downloadable documents
- `includes/`
  Small shared HTML includes used across the site
- `docs/`
  Rendered output published by GitHub Pages

## Updating the Site

To make changes locally:

```powershell
quarto render
```

To preview the site locally:

```powershell
quarto preview
```

After rendering, commit both the source files and the updated `docs/` output before pushing.

## Publishing

GitHub Pages should be configured to publish from the repository’s default branch using the `/docs` folder.

If the repository is named `adamdugan.github.io`, the site will publish at:

- `https://adamdugan.github.io/`
