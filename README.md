# Faculty of Technology, Departments portal (plain HTML / CSS / JavaScript)

No framework, no build step, no SASS, no backend. Open `index.html` with a double-click.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `departments.html` | Departments list |
| `department.html?id=mechanical` | Department home with site map (`mechanical`, `civil`, `process`, `electrical`) |
| `timetables.html?id=...` | Timetables (table, day view on mobile, PDF button) |
| `teachers.html?id=...` | Teachers with email, search, rank filter, pagination |
| `students.html?id=...` | Student lists, CSV generated in the browser |
| `complaint.html?id=...` | Complaint form with validation |
| `announcements.html`, `announcement.html?id=1` | Announcements |
| `services.html`, `about.html`, `contact.html`, `search.html?q=`, `404.html` | Other pages |

## Structure

```
css/    fonts, tokens (colors, dark mode), base, buttons, forms, header, footer, hero, pages
js/
  ft.js            global namespace window.FT
  data/            departments, specialities, teachers, timetables, students, announcements
  i18n/            en.js, fr.js, ar.js (same keys in the three files)
  core.js          language + theme state, t() translation, icons, formatting, toast
  components.js    reusable HTML fragments (cards, hero, department shell) + form validation helper
  layout.js        header (menu, search, drawer) and footer
  pages/           one script per page; each page file sets window.FT.pages.<name>.render
images/  fonts/  timetables/ (put the timetable PDFs here)
```
Every HTML page loads the same CSS and scripts, then its own `js/pages/<page>.js`. Header, footer and page content are drawn by JavaScript from the data files, so one script serves all four departments.

## Replace the sample content

- Teachers: `js/data/teachers.js`. Electrical Systems Engineering uses the real list (140 teachers, from the PDF); the other three departments still use sample names. Ranks and specialities are optional.
- Timetables: `js/data/timetables.js`. Edit `sessions`; for the official PDF, copy it to `timetables/` and set `pdf: 'timetables/mech-L3-g1.pdf'`. Without a PDF, the button prints the table.
- Student lists: `js/data/students.js`. Announcements: `js/data/announcements.js`.
- Texts and translations: `js/i18n/*.js`. Colors and fonts: `css/tokens.css`.

## Notes

- English, French and Arabic (right-to-left). Light and dark mode. Choices are saved in the browser.
- Forms are validated in the browser; nothing is sent to a server.
- Works offline (fonts are in `fonts/`). Tested in Chromium from a local file.

# Français

Version en HTML, CSS et JavaScript simples (sans framework, sans SASS, sans compilation). Double-cliquez sur `index.html`. Les données d'exemple se remplacent dans `js/data/`, les textes dans `js/i18n/`, les PDF d'emplois du temps dans `timetables/`.
