// Data file (plain script). Edit the values here; the pages read them through window.FT.data.
(function () {
// Speciality names in the three languages. Departments reference them by id.
const S = (en, fr, ar) => ({ en, fr, ar })

const SPECIALITIES = {
  commoncore: S('Common core', 'Tronc commun', 'جذع مشترك'),
  electromech: S('Electromechanical', 'Électromécanique', 'كهروميكانيك'),
  indmaint: S('Industrial maintenance', 'Maintenance industrielle', 'الصيانة الصناعية'),
  energetic: S('Energetic', 'Énergétique', 'الطاقوية'),
  mechconst: S('Mechanical construction', 'Construction mécanique', 'البناء الميكانيكي'),
  materials: S('Materials engineering', 'Génie des matériaux', 'هندسة المواد'),
  indeng: S('Industrial engineering', 'Génie industriel', 'الهندسة الصناعية'),
  mechatronics: S('Mechatronics', 'Mécatronique', 'الميكاترونيك'),
  energyinst: S('Energy installations and turbomachinery', 'Installations énergétiques et turbomachines', 'المنشآت الطاقوية والآلات التوربينية'),
  mechprod: S('Mechanical and production', 'Mécanique et productique', 'الميكانيك والإنتاجية'),
  renewable: S('Renewable energies in mechanics', 'Énergies renouvelables en mécanique', 'الطاقات المتجددة في الميكانيك'),
  civil: S('Civil engineering', 'Génie civil', 'الهندسة المدنية'),
  structure: S('Structures', 'Structures', 'الهياكل'),
  civilmaterials: S('Materials in civil engineering', 'Matériaux en génie civil', 'المواد في الهندسة المدنية'),
  geotech: S('Geotechnics', 'Géotechnique', 'الجيوتقنية'),
  structbuild: S('Structures and buildings', 'Structures et bâtiments', 'الهياكل والمباني'),
  process: S('Process engineering', 'Génie des procédés', 'هندسة الطرائق'),
  hygiene: S('Industrial hygiene and safety', 'Hygiène et sécurité industrielle', 'الصحة والأمن الصناعي'),
  chemical: S('Chemical engineering', 'Génie chimique', 'الهندسة الكيميائية'),
  food: S('Food engineering', 'Génie alimentaire', 'الهندسة الغذائية'),
  polymer: S('Polymer engineering', 'Génie des polymères', 'هندسة البوليمرات'),
  environmental: S('Environmental engineering', "Génie de l'environnement", 'هندسة البيئة'),
  electronics: S('Electronics', 'Électronique', 'الإلكترونيك'),
  electrical: S('Electrical engineering', 'Électrotechnique', 'الكهروتقني'),
  automatic: S('Automatic', 'Automatique', 'الآلية'),
  telecom: S('Telecommunications', 'Télécommunications', 'الاتصالات'),
  biomedical: S('Biomedical engineering', 'Génie biomédical', 'الهندسة الطبية الحيوية'),
  embedded: S('Embedded systems electronics', 'Électronique des systèmes embarqués', 'إلكترونيك الأنظمة المدمجة'),
  electricmachine: S('Electric machines', 'Machines électriques', 'الآلات الكهربائية'),
  indautomation: S('Industrial automation and computing', 'Automatique et informatique industrielle', 'الآلية والإعلام الآلي الصناعي'),
  networks: S('Networks and telecommunications', 'Réseaux et télécommunications', 'الشبكات والاتصالات'),
  biomedinstr: S('Biomedical instrumentation', 'Instrumentation biomédicale', 'الأجهزة الطبية الحيوية')
}

  FT.data.SPECIALITIES = SPECIALITIES;
})();
