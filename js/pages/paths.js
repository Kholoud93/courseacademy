import { renderList } from "../common.js";
import { homeTrackCard, pathsWhyCard } from "../render.js";
import { engineeringTracks } from "../data/home.js";
import { pathsWhy } from "../data/paths.js";

document.addEventListener("DOMContentLoaded", () => {
  renderList(document.getElementById("paths-grid"), engineeringTracks, homeTrackCard);
  renderList(document.getElementById("paths-why-grid"), pathsWhy, pathsWhyCard);
});
