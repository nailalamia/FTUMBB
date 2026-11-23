// Data file (plain script). Edit the values here; the pages read them through window.FT.data.
(function () {
// SAMPLE DATA. To use a real timetable, edit the `sessions` of an entry below and (optionally) set
// `pdf` to a file placed in public/timetables/, for example 'timetables/mech-L3-g1.pdf'.
// session = [day 0-4 (Sunday to Thursday), slot 0-4, subject id, type 'lecture' | 'td' | 'tp', room, teacher]
const S = (en, fr, ar) => ({ en, fr, ar })

const SUBJECTS = {
  math: S('Mathematics', 'Mathématiques', 'الرياضيات'), english: S('English', 'Anglais', 'الإنجليزية'), project: S('Project', 'Projet', 'مشروع'), safety: S('Industrial safety', 'Sécurité industrielle', 'الأمن الصناعي'),
  thermo: S('Thermodynamics', 'Thermodynamique', 'الترموديناميك'), fluid: S('Fluid mechanics', 'Mécanique des fluides', 'ميكانيك الموائع'), vibration: S('Vibration analysis', 'Analyse vibratoire', 'تحليل الاهتزازات'),
  control: S('Control systems', 'Systèmes asservis', 'أنظمة التحكم'), reliability: S('Reliability', 'Fiabilité', 'الموثوقية'),
  structures: S('Structural analysis', 'Analyse des structures', 'تحليل الهياكل'), soil: S('Soil mechanics', 'Mécanique des sols', 'ميكانيك التربة'), concrete: S('Reinforced concrete', 'Béton armé', 'الخرسانة المسلحة'),
  hydraulics: S('Hydraulics', 'Hydraulique', 'الهيدروليك'), surveying: S('Surveying', 'Topographie', 'الطوبوغرافيا'),
  mass: S('Mass transfer', 'Transfert de matière', 'انتقال المادة'), reactors: S('Chemical reactors', 'Réacteurs chimiques', 'المفاعلات الكيميائية'), chemthermo: S('Chemical thermodynamics', 'Thermodynamique chimique', 'الترموديناميك الكيميائي'),
  unitops: S('Unit operations', 'Opérations unitaires', 'العمليات الوحدوية'), polymers: S('Polymer science', 'Science des polymères', 'علم البوليمرات'),
  circuits: S('Circuit theory', 'Théorie des circuits', 'نظرية الدارات'), signal: S('Signal processing', 'Traitement du signal', 'معالجة الإشارة'), machines: S('Electric machines', 'Machines électriques', 'الآلات الكهربائية'),
  automatic: S('Automatic control', 'Automatique', 'التحكم الآلي'), embedded: S('Embedded systems', 'Systèmes embarqués', 'الأنظمة المدمجة')
}

const BASE = {
  mechanical: [[0, 0, 'thermo', 'lecture', 'Amphi B', 'Dr. Benali'], [0, 2, 'reliability', 'td', 'Room 12', 'Dr. Haddad'], [1, 1, 'fluid', 'lecture', 'Amphi A', 'Pr. Merabet'], [1, 3, 'reliability', 'tp', 'Lab 3', 'Dr. Cherif'],
    [2, 0, 'control', 'lecture', 'Amphi B', 'Dr. Ferhat'], [2, 1, 'control', 'td', 'Room 8', 'Dr. Ferhat'], [3, 2, 'vibration', 'tp', 'Lab 1', 'Dr. Hamidi'], [3, 4, 'english', 'td', 'Room 5', 'Ms. Amrani'], [4, 0, 'safety', 'lecture', 'Amphi A', 'Pr. Bouzid'], [4, 3, 'project', 'td', 'Room 12', 'Dr. Haddad']],
  civil: [[0, 0, 'structures', 'lecture', 'Amphi C', 'Pr. Hadjadj'], [0, 2, 'structures', 'td', 'Room 3', 'Dr. Medjber'], [1, 1, 'soil', 'lecture', 'Amphi C', 'Dr. Belkacem'], [1, 3, 'soil', 'tp', 'Lab 2', 'Dr. Aouadi'],
    [2, 0, 'concrete', 'lecture', 'Amphi B', 'Pr. Zerrouki'], [2, 2, 'concrete', 'td', 'Room 9', 'Dr. Ouali'], [3, 1, 'hydraulics', 'lecture', 'Amphi A', 'Dr. Boudjema'], [3, 3, 'surveying', 'tp', 'Field', 'Mr. Tebbal'], [4, 0, 'english', 'td', 'Room 5', 'Ms. Amrani'], [4, 2, 'project', 'td', 'Room 9', 'Dr. Ouali']],
  process: [[0, 0, 'mass', 'lecture', 'Amphi A', 'Pr. Khelifi'], [0, 2, 'mass', 'td', 'Room 4', 'Dr. Benmoussa'], [1, 1, 'reactors', 'lecture', 'Amphi A', 'Pr. Bensaid'], [1, 3, 'reactors', 'tp', 'Lab 5', 'Dr. Kerroum'],
    [2, 0, 'chemthermo', 'lecture', 'Amphi B', 'Dr. Mekki'], [2, 2, 'unitops', 'td', 'Room 4', 'Dr. Aliouche'], [3, 1, 'unitops', 'tp', 'Lab 4', 'Mr. Ziane'], [3, 3, 'safety', 'lecture', 'Amphi B', 'Dr. Boukhalfa'], [4, 0, 'english', 'td', 'Room 5', 'Ms. Amrani'], [4, 2, 'polymers', 'lecture', 'Amphi A', 'Pr. Bensaid']],
  electrical: [[0, 0, 'circuits', 'lecture', 'Amphi D', 'Pr. Touati'], [0, 2, 'circuits', 'td', 'Room 6', 'Dr. Bakir'], [1, 1, 'signal', 'lecture', 'Amphi D', 'Dr. Chaoui'], [1, 3, 'signal', 'tp', 'Lab 6', 'Dr. Lakhal'],
    [2, 0, 'machines', 'lecture', 'Amphi B', 'Pr. Touati'], [2, 2, 'automatic', 'td', 'Room 7', 'Pr. Boudiaf'], [3, 1, 'embedded', 'tp', 'Lab 7', 'Dr. Guerroudj'], [3, 3, 'automatic', 'lecture', 'Amphi D', 'Pr. Boudiaf'], [4, 0, 'english', 'td', 'Room 5', 'Ms. Amrani'], [4, 2, 'project', 'td', 'Room 6', 'Ms. Taleb']]
}

const shift = (rows, k) => rows.map(([d, s, ...r]) => [(d + k) % 5, s, ...r])
const entry = (dept, level, spec, group, semester, k) => ({
  id: `${dept}-${level}-g${group}`, level, spec, group, semester, pdf: null,
  sessions: shift(BASE[dept], k).map(([day, slot, subject, type, room, teacher]) => ({ day, slot, subject, type, room, teacher }))
})

const TIMETABLES = {
  mechanical: [entry('mechanical', 'L2', 'electromech', 1, 3, 1), entry('mechanical', 'L3', 'indmaint', 1, 5, 0), entry('mechanical', 'M1', 'mechatronics', 1, 1, 2)],
  civil: [entry('civil', 'L2', 'civil', 1, 3, 1), entry('civil', 'L3', 'civil', 1, 5, 0), entry('civil', 'M1', 'structure', 1, 1, 2)],
  process: [entry('process', 'L2', 'process', 1, 3, 1), entry('process', 'L3', 'process', 1, 5, 0), entry('process', 'M1', 'chemical', 1, 1, 2)],
  electrical: [entry('electrical', 'L2', 'electronics', 1, 3, 1), entry('electrical', 'L3', 'automatic', 1, 5, 0), entry('electrical', 'M1', 'networks', 1, 1, 2)]
}

const SLOTS = ['08:00 - 09:30', '09:40 - 11:10', '11:20 - 12:50', '13:00 - 14:30', '14:40 - 16:10']

  FT.data.SUBJECTS = SUBJECTS;
  FT.data.TIMETABLES = TIMETABLES;
  FT.data.SLOTS = SLOTS;
})();
