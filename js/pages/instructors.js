import { renderList } from "../common.js";
import { instructorCard } from "../render.js";
import { instructors } from "../data/instructors.js";

document.addEventListener("DOMContentLoaded", () => {
  renderList(document.getElementById("instructor-grid"), instructors, instructorCard);
});
