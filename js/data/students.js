// Data file (plain script). Edit the values here; the pages read them through window.FT.data.
(function () {
// SAMPLE DATA. Each row describes one downloadable list. The CSV content is generated in the browser
// (see utils/csv.js) from the names below, so no backend is needed.
// [level, speciality id, number of groups, number of students, last update]
const STUDENT_LISTS = {
  mechanical: [['L1', 'commoncore', 6, 168, '2026-11-14'], ['L2', 'electromech', 4, 96, '2026-11-14'], ['L2', 'mechprod', 4, 88, '2026-11-14'], ['L3', 'indmaint', 2, 48, '2026-11-12'], ['L3', 'energetic', 2, 42, '2026-11-12'], ['M1', 'mechatronics', 1, 24, '2026-11-10'], ['M2', 'mechconst', 1, 22, '2026-11-10']],
  civil: [['L1', 'commoncore', 8, 224, '2026-11-14'], ['L2', 'civil', 6, 150, '2026-11-13'], ['L3', 'civil', 5, 120, '2026-11-12'], ['M1', 'structure', 2, 46, '2026-11-10'], ['M1', 'geotech', 1, 28, '2026-11-10'], ['M2', 'civilmaterials', 1, 26, '2026-11-09'], ['M2', 'structbuild', 1, 24, '2026-11-09']],
  process: [['L1', 'commoncore', 10, 270, '2026-11-14'], ['L2', 'process', 6, 160, '2026-11-13'], ['L3', 'process', 5, 128, '2026-11-12'], ['L3', 'hygiene', 2, 44, '2026-11-12'], ['M1', 'chemical', 2, 50, '2026-11-10'], ['M1', 'food', 1, 26, '2026-11-10'], ['M2', 'environmental', 1, 28, '2026-11-09']],
  electrical: [['L1', 'commoncore', 14, 380, '2026-11-14'], ['L2', 'electronics', 6, 150, '2026-11-13'], ['L2', 'automatic', 6, 144, '2026-11-13'], ['L3', 'telecom', 4, 98, '2026-11-12'], ['L3', 'biomedical', 3, 70, '2026-11-12'], ['M1', 'networks', 2, 52, '2026-11-10'], ['M2', 'embedded', 1, 30, '2026-11-09']]
}

const LAST_NAMES = ['Benali', 'Haddad', 'Merabet', 'Cherif', 'Bouzid', 'Hamidi', 'Ferhat', 'Mansouri', 'Kaci', 'Rahmani', 'Slimani', 'Belkacem', 'Zerrouki', 'Ouali', 'Boudjema', 'Medjber', 'Tebbal', 'Aouadi', 'Khelifi', 'Benmoussa', 'Bensaid', 'Kerroum', 'Mekki', 'Ziane', 'Aliouche', 'Boudiaf', 'Bakir', 'Touati', 'Chaoui', 'Brahimi', 'Guerroudj', 'Lakhal', 'Taleb', 'Amrani', 'Larbi', 'Saadi']
const FIRST_NAMES = ['Yasmine', 'Amine', 'Lina', 'Rayan', 'Ikram', 'Anis', 'Sara', 'Walid', 'Meriem', 'Zakaria', 'Nour', 'Ilyes', 'Hiba', 'Sofiane', 'Chaima', 'Mehdi', 'Amira', 'Oussama', 'Rania', 'Fares', 'Selma', 'Younes', 'Dounia', 'Bilal', 'Khadija', 'Nassim', 'Imane', 'Sami', 'Aya', 'Ramzi']

  FT.data.STUDENT_LISTS = STUDENT_LISTS;
  FT.data.LAST_NAMES = LAST_NAMES;
  FT.data.FIRST_NAMES = FIRST_NAMES;
})();
