# The Map of My Journey

*Beyond My Comfort Zone · From Curiosity to Action*

Gianluca Valentini’s interactive submission for **BU301 — The Entrepreneurial Method**, Wilfrid Laurier University, Fall 2026. The five checkpoints follow the personal transformations in **Personal Entrepreneurial Journey, Part 3: Map Your Journey**.

## Play locally

1. Extract the ZIP and open the `the-map-of-my-journey` folder.
2. Open `index.html` in a modern browser. Keep the HTML, `css/`, `js/`, and `assets/` in the same folder.
3. Select **Start the adventure**. Use the map’s **Enter checkpoint** button or select the highlighted territory. Sound effects are off on the first visit.
4. Complete the interaction, select **Read my reflection**, and use **Stamp passport & continue**. Each stamp unlocks the next checkpoint. Completed territories can be revisited from the map.
5. Use **Restart journey** in the footer to clear progress on this browser. Progress and the current task are saved when browser storage is available.

The game is built with HTML, CSS, JavaScript, and original SVG artwork. It runs directly from the files. All actions that support dragging also have button controls.

## Publish on GitHub Pages

1. In GitHub, create a repository called `the-map-of-my-journey`. Choose **Public** for the professor’s public submission link. Initialize it with a README so that the `main` branch exists.
2. Open the repository’s **Code** tab. Use **Add file → Upload files** to upload the **contents** of the extracted project folder, preserving the `css/`, `js/`, and `assets/` directories. The repository’s first level must contain `index.html` and `summary.html`. Replace the starter README with this one. If uploading through GitHub Desktop or Git, include `.nojekyll` as well.
3. Commit the files to `main`. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/(root)`, then select **Save**.
4. When the deployment finishes, return to **Settings → Pages** and use **Visit site**. A project URL typically looks like `https://YOUR-USERNAME.github.io/the-map-of-my-journey/`.
5. Open that URL in a private browser window to check the opening, the first checkpoint, the photo fallbacks, and the journey summary. Play through once before sharing the link. Use **Actions** to inspect a failed Pages deployment.

[GitHub Docs — Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [GitHub Docs — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Update your media and edit the story

- The personalized avatars use `avatar-gianluca.png` and `avatar-kobe.png` in `assets/images/`. See the [avatar photo guide](PHOTO_GUIDE.md#avatar-photos) to replace them or use JPG portraits.
- The numbered photos and the basketball, Sweden, and internship presentation videos are included in `assets/images/`. The [photo guide](PHOTO_GUIDE.md) shows where each one appears.
- Edit media paths, captions, and alt text in `js/photos.js`. Save and refresh. To update the published game, commit the edited config and new media to `main`.
- Edit level narration, memories, the WHY, Before/After insights, and finale narration in `js/story.js`. The opening text and cinematic title are in `js/main.js`.
- If you change any of the five Before/After insights, update the matching text in `summary.html` as well. The summary is a standalone page.

## Print the academic summary

Open **View journey summary** from the site footer or finale. Select **Print or save as PDF**, choose **Save as PDF**, and turn off the browser’s headers and footers for a clean page. The print layout is designed for one A4 portrait page. The exported summary can be included in the cumulative assignment.

## Project files

| Path | Purpose |
|---|---|
| `index.html`, `summary.html` | Playable adventure and standalone printable reflection |
| `css/styles.css`, `css/world.css`, `css/animations.css` | Interface, responsive world, and motion |
| `css/print.css` | Summary layout and print rules |
| `js/story.js`, `js/photos.js` | Editable narrative and media configuration |
| `js/illustrations.js`, `js/world.js` | Original scenery, avatar, Kobe, stamps, and route animation |
| `js/interactions.js`, `js/game.js`, `js/main.js`, `js/audio.js` | Checkpoint mechanics, saved progress, navigation, and optional sound |
| `assets/images/`, `assets/illustrations/` | Personal media and site emblem |
