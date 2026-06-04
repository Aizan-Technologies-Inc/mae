# Aizan MAE Documentation

Static GitHub Pages documentation for Aizan MAE messaging APIs.

This site recreates the public Theneo MAE documentation experience in a lightweight static format that can be hosted directly from GitHub Pages.

## Live Site

```text
https://aizan-technologies-inc.github.io/mae/
```

The repository is owned by the `Aizan-Technologies-Inc` GitHub organization, so the default GitHub Pages URL uses that organization name.

## Contents

The documentation covers:

- Overview
- Authorization
- SMS Outbound Request
- MMS Outbound Request
- Media Creation Request
- Delivery Callback
- Inbound Message Callback

The page includes the Aizan logo, section navigation, request examples, language selectors, response-code tabs, and Theneo-style request/response panels.

## Project Structure

```text
docs/
  index.html
  styles.css
  app.js
  assets/
    aizan-logo.svg
```

GitHub Pages serves the site from the `docs/` folder.

## Preview Locally

From the repo root:

```bash
python3 -m http.server 8000 -d docs
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Setup

In the repository settings:

```text
Settings > Pages > Build and deployment
```

Use:

```text
Source: Deploy from a branch
Branch: main
Folder: /docs
```

After saving, GitHub Pages will publish the site from `docs/index.html`.

## Notes

This repo is documentation-only. It does not require a build step, package installation, or backend server.
