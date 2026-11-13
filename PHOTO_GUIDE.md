# Personal photo guide

## Avatar photos

The two bundled PNGs are transparent cutouts from Gianluca’s and Kobe’s photos. To replace an avatar, save the new image under the matching filename in `assets/images/` and refresh `index.html`.

| File | What to add | How it appears |
|---|---|---|
| `avatar-gianluca.jpg` | A tight, centered portrait showing the entire head | Your head on the illustrated traveler, including on the map |
| `avatar-gianluca.png` | A transparent cutout of the head, cropped close to the hair and chin | Your head on the illustrated traveler. This file takes priority over `avatar-gianluca.jpg`. |
| `avatar-kobe.jpg` | A tight, centered portrait of Kobe’s face | Kobe’s face on the illustrated dog |
| `avatar-kobe.png` | A full-body cutout of Kobe with a transparent background | The whole dog, aligned with the ground in the scene. This file takes priority over `avatar-kobe.jpg`. |

A nearly square crop works well for both portraits. For the PNG, crop close to Kobe and keep his paws inside the image. To use a different filename or adjust a portrait, edit `Journey.avatarPhotos` in `js/photos.js`. Increase `zoom` above `1` to zoom in. Positive `offsetX` and `offsetY` move the image right and down. Small adjustments of `1` or `2` are usually enough.

You can set up either avatar independently. The illustrated artwork appears whenever its image is unavailable. `photo6.jpg` is the separate full photograph in the Kobe memory.

## Memory photos and videos

The media below is included in the game. Memory cards show an illustration if their image or video preview is unavailable.

1. Copy replacement media into `assets/images/`.
2. Keep the matching filename below, or edit the entry in `js/photos.js`. For a photo, `path` points to the image. For a video, `video` points to an MP4 and `path` points to the preview image. Paths are relative to `index.html`, and letter case matters on GitHub Pages.
3. In the same entry, edit `caption` and `alt` to describe your photo. Keep the `art` value for the illustrated fallback.
4. Save and refresh the page. Open the memory to view the full image or use the video controls. For GitHub Pages, commit the media and any configuration changes to `main`.

| File | What to add | Where it appears |
|---|---|---|
| `video1.mp4` with `video1-poster.jpg` | Basketball | Suitcase memory and photo album |
| `photo2.jpg` | LIUC or Milan | Suitcase memory and photo album |
| `video3.mp4` with `video3-poster.jpg` | Sweden exchange | Suitcase memory and photo album |
| `photo4.jpg` | Canada or Laurier | Suitcase memory and photo album |
| `photo5.jpg` | Family memory | Handwritten note about my mother |
| `photo6.jpg` | Kobe or Jesolo | Kobe memory |
| `photo7.jpg` | Giacomini | First factory door |
| `photo8.jpg` | Caleffi or another workplace memory | Second factory door |
| `photo9_new.jpeg` | My room and study desk in Waterloo | Bridge commitments |
| `photo10.jpg` | Class or group project | Crossroads album |
| `video11_new.mp4` with `video11-poster.jpg` | My last internship presentation | Crossroads album |
| `photo12_new.png` | Illustrated map of my journey | Finale |
| `jesolo.jpeg` | Jesolo shoreline | Checkpoint 1 · Jesolo postcard |
| `liuc.png` | LIUC logo | Checkpoint 4 · Sofia’s conversation |
| `etter.jpg` | ETTER logo | Checkpoint 4 · Dario’s conversation |
| `last_picture.jpeg` | Gianluca at Niagara Falls | Checkpoint 5 · Becoming a Different Thinker reflection |

Most photos and video previews fill their thumbnail frames. The finale map is shown in full. An expanded memory shows the full image or plays the video when you press Play.

Logo paths and alt text are in the conversation entries in `js/story.js`.
