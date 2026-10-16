# RHO-12 // The Grace — Starter Website

A static, in-universe SCP:RP faction archive built with HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — page structure and starter content
- `styles.css` — dark classified-database visual theme and responsive layout
- `script.js` — searchable/filterable archive and document pop-ups

## Preview locally

1. Extract the ZIP.
2. Open `index.html` in a browser.
3. Edit the files in a code editor such as Visual Studio Code.
4. Refresh the browser to view changes.

No build step or package installation is required.

## Publish with GitHub Pages

1. Create or sign in to a GitHub account.
2. Create a **public** repository, for example `rho12-grace-archive`.
3. Upload `index.html`, `styles.css`, `script.js`, and this README to the repository's root.
4. Open the repository's **Settings → Pages**.
5. Under the build/deployment section, choose **Deploy from a branch**.
6. Select the `main` branch and `/(root)`, then save.
7. Wait for GitHub Pages to publish the site. The Pages settings screen will show the public URL.

GitHub's interface may change. Consult https://docs.github.com/en/pages/quickstart if the labels differ.

## Editing the archive

The sample archive records are stored near the top of `script.js` in the `records` array. Copy an existing object and change its `id`, `category`, `title`, `status`, `summary`, and `body`.

Supported categories: `Lore`, `Operations`, `Equipment`, `Resources`, and `Personnel`.

Keep record IDs unique. The document pop-up uses `textContent` for record fields, which is safer than inserting arbitrary HTML from user-editable text.

## Public website safety

- Do not put passwords, API keys, private Discord invite tokens, or personal information in these files.
- Everything committed to a public repository should be treated as public.
- A static GitHub Pages site does not provide private member accounts or secure server-side access controls.
- Mark the project as fan-made and in-universe; do not imply official affiliation with the SCP Foundation Wiki or Roblox.

