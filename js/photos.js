/*
 * Add your photos or videos to assets/images/. Edit the paths, captions and alt
 * text here. For videos, path points to the preview still and video to the MP4.
 */
window.Journey = window.Journey || {};

Journey.photos = {
  1: { path: './assets/images/video1-poster.jpg', video: './assets/images/video1.mp4', caption: 'Basketball · My first leap', alt: 'Me in basketball jersey number 64 holding a ball', art: 'basketball' },
  2: { path: './assets/images/photo2.jpg', caption: 'LIUC · Learning to live independently', alt: 'Me standing outside a campus building near Milan', art: 'milan' },
  3: { path: './assets/images/video3-poster.jpg', video: './assets/images/video3.mp4', caption: 'Sweden · My first exchange', alt: 'A campus courtyard during my exchange in Sweden', art: 'sweden' },
  4: { path: './assets/images/photo4.jpg', caption: 'Waterloo · Going further', alt: 'The Laurier sign outside the university buildings', art: 'canada' },
  5: { path: './assets/images/photo5.jpg', caption: 'A memory from home', alt: 'My family together around a cake', art: 'home' },
  6: { path: './assets/images/photo6.jpg', caption: 'Kobe · A familiar face', alt: 'Kobe standing on a beach beside the sea', art: 'kobe' },
  7: { path: './assets/images/photo7.jpg', caption: 'Giacomini · Work I felt proud of', alt: 'A collage of photos from my Giacomini internship', art: 'factory' },
  8: { path: './assets/images/photo8.jpg', caption: 'Caleffi · A gap I began to notice', alt: 'A collage of photos from my Caleffi internship', art: 'workbench' },
  9: { path: './assets/images/photo9_new.jpeg', caption: 'Where I worked through the idea', alt: 'My room and study desk in Waterloo', art: 'bridge' },
  10: { path: './assets/images/photo10.jpg', caption: 'Learning with others', alt: 'Two people on a waterfront path', art: 'crossroads' },
  11: { path: './assets/images/video11-poster.jpg', video: './assets/images/video11_new.mp4', caption: 'My last internship presentation', alt: 'Me presenting my internship project in front of an audience', art: 'canada' },
  12: { path: './assets/images/photo12_new.png', caption: 'Canada · The journey continues', alt: 'An illustrated map of my journey from Venice through Milan and Jönköping to Waterloo', art: 'horizon' },
  13: { path: './assets/images/jesolo.jpeg', caption: 'Jesolo, Italy', alt: 'The sun on the horizon above the sea and piers in Jesolo', art: 'beach', portrait: true },
  14: { path: './assets/images/last_picture.jpeg', caption: 'Niagara Falls, Canada', alt: 'Me by the railing overlooking Niagara Falls', art: 'horizon', portrait: true }
};

/*
 * Optional character images. These are separate from the numbered memories.
 * For portraits, zoom in with zoom > 1. Positive offsets move right or down.
 * A character's transparent PNG takes priority over its JPG portrait.
 */
Journey.avatarPhotos = {
  gianluca: { path: './assets/images/avatar-gianluca.jpg', zoom: 1, offsetX: 0, offsetY: 0 },
  gianlucaCutout: { path: './assets/images/avatar-gianluca.png' },
  kobePortrait: { path: './assets/images/avatar-kobe.jpg', zoom: 1, offsetX: 0, offsetY: 0 },
  kobeCutout: { path: './assets/images/avatar-kobe.png' }
};
