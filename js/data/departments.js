// Data file (plain script). Edit the values here; the pages read them through window.FT.data.
(function () {
// One entry per department. Text (name, tagline, head's word) is in the i18n files under depts.<key>.
// Numbers and specialities come from the faculty website (ft.univ-boumerdes.dz).
const img = (n) => `images/${n}`

const DEPARTMENTS = [
  {
    id: 'mechanical', key: 'mech', icon: img('icon-mech.png'), banner: img('banner-mech.png'),
    head: 'Pr. Ahmed Chellil',
    stats: { specialities: 4, students: 324, foreign: 5, teachers: 22, doctorants: 26 },
    specs: {
      licence: ['electromech', 'indmaint', 'energetic', 'mechconst', 'materials', 'indeng'],
      master: ['indmaint', 'mechatronics', 'electromech', 'energetic', 'energyinst', 'mechconst', 'mechprod', 'materials', 'indeng', 'renewable']
    }
  },
  {
    id: 'civil', key: 'civil', icon: img('icon-civil.png'), banner: img('banner-civil.png'),
    head: 'Pr. Rachid Labdaoui',
    stats: { specialities: 6, students: 582, foreign: 15, teachers: 50, doctorants: 2 },
    specs: { licence: ['civil'], master: ['structure', 'civilmaterials', 'geotech', 'structbuild'] }
  },
  {
    id: 'process', key: 'proc', icon: img('icon-proc.png'), banner: img('banner-proc.png'),
    head: 'Pr. Hamouche Akssas',
    stats: { specialities: 9, students: 915, foreign: 14, teachers: 100, doctorants: 8 },
    specs: { licence: ['process', 'hygiene'], master: ['chemical', 'food', 'polymer', 'environmental', 'hygiene'] }
  },
  {
    id: 'electrical', key: 'elec', icon: img('icon-elec.png'), banner: img('banner-elec.png'),
    head: 'Pr. Norddine Messaoudi',
    stats: { specialities: 12, students: 1903, foreign: 16, teachers: 100, doctorants: 33 },
    specs: {
      licence: ['electronics', 'electrical', 'automatic', 'telecom', 'biomedical'],
      master: ['embedded', 'electricmachine', 'indautomation', 'networks', 'biomedinstr']
    }
  }
]

const FACULTY_STATS = { specialities: 51, students: 5200, foreign: 74, ats: 198, teachers: 266, doctorants: 345 }
const getDepartment = (id) => DEPARTMENTS.find((d) => d.id === id)

  FT.data.DEPARTMENTS = DEPARTMENTS;
  FT.data.FACULTY_STATS = FACULTY_STATS;
  FT.data.getDepartment = getDepartment;
})();
