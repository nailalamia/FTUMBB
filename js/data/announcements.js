// Data file (plain script). Edit the values here; the pages read them through window.FT.data.
(function () {
// SAMPLE ANNOUNCEMENTS inspired by the faculty website. Replace with real notices.
const L = (en, fr, ar) => ({ en, fr, ar })

const ANNOUNCEMENTS = [
  { id: 1, date: '2026-11-21', cat: 'doctorate', img: 'images/banner-proc.png',
    title: L('Doctoral contest 2026: registration is open', 'Concours de doctorat 2026 : inscriptions ouvertes', 'مسابقة الدكتوراه 2026: التسجيل مفتوح'),
    text: L('Applications are accepted until the closing date announced by the vice-deanship. Read the list of open positions and required documents.', "Les candidatures sont acceptées jusqu'à la date de clôture annoncée par le vice-décanat. Consultez la liste des postes ouverts et des pièces à fournir.", 'تُقبل الترشيحات إلى غاية تاريخ الإغلاق الذي تعلنه نيابة العمادة. اطلع على قائمة المناصب المفتوحة والوثائق المطلوبة.') },
  { id: 2, date: '2026-10-12', cat: 'administration', img: 'images/banner-elec.png',
    title: L('Access to the Faculty by RFID card', "Accès à la Faculté par carte RFID", 'الدخول إلى الكلية عبر بطاقة RFID'),
    text: L('New access rules for students and staff, with the list of required documents.', "Nouvelles règles d'accès pour les étudiants et le personnel, avec la liste des documents requis.", 'قواعد دخول جديدة للطلبة والموظفين مع قائمة الوثائق المطلوبة.') },
  { id: 3, date: '2026-07-29', cat: 'orientation', img: 'images/banner-civil.png',
    title: L('Orientation of ST students 2026/2027', 'Orientation des étudiants ST 2026/2027', 'توجيه طلبة الجذع المشترك 2026/2027'),
    text: L('Orientation results and next steps for the new academic year.', "Résultats de l'orientation et prochaines étapes pour la nouvelle année universitaire.", 'نتائج التوجيه والخطوات المقبلة للسنة الجامعية الجديدة.') },
  { id: 4, date: '2026-09-14', cat: 'events', img: 'images/banner-mech.png',
    title: L('Virtual visit of the Faculty is online', 'La visite virtuelle de la Faculté est en ligne', 'الزيارة الافتراضية للكلية متاحة الآن'),
    text: L('Discover classrooms, laboratories and the library from your phone or computer.', 'Découvrez les salles, les laboratoires et la bibliothèque depuis votre téléphone ou votre ordinateur.', 'اكتشف القاعات والمخابر والمكتبة من هاتفك أو حاسوبك.') },
  { id: 5, date: '2026-09-01', cat: 'administration', img: 'images/banner-mech.png',
    title: L('Council elections: candidate lists', 'Élections des conseils : listes de candidats', 'انتخابات المجالس: قوائم المترشحين'),
    text: L('The final lists of candidates are published. Voting takes place at the Faculty.', 'Les listes définitives des candidats sont publiées. Le vote a lieu à la Faculté.', 'نُشرت القوائم النهائية للمترشحين. يجري التصويت بالكلية.') },
  { id: 6, date: '2026-11-10', cat: 'exams', img: 'images/banner-elec.png',
    title: L('Exam timetable for the first semester', 'Calendrier des examens du premier semestre', 'رزنامة امتحانات السداسي الأول'),
    text: L('Dates, rooms and supervision for all levels. Check your department page for details.', 'Dates, salles et surveillance pour tous les niveaux. Consultez la page de votre département.', 'التواريخ والقاعات والحراسة لكل المستويات. راجع صفحة قسمك للتفاصيل.') },
  { id: 7, date: '2026-11-05', cat: 'doctorate', img: 'images/banner-proc.png',
    title: L('Thesis defense schedule, 2026/2027', 'Programme des soutenances de thèses 2026/2027', 'برنامج مناقشات الدكتوراه 2026/2027'),
    text: L('The defenses are public. Dates, rooms and posters are available for download.', 'Les soutenances sont publiques. Dates, salles et affiches sont téléchargeables.', 'المناقشات علنية. التواريخ والقاعات والملصقات متاحة للتحميل.') },
  { id: 8, date: '2026-10-25', cat: 'events', img: 'images/banner-civil.png',
    title: L('Scientific day on renewable energies', 'Journée scientifique sur les énergies renouvelables', 'يوم علمي حول الطاقات المتجددة'),
    text: L('Talks and posters from our research laboratories, open to all students.', 'Conférences et posters de nos laboratoires de recherche, ouverts à tous les étudiants.', 'محاضرات وملصقات من مخابر البحث لدينا، مفتوحة لجميع الطلبة.') }
]
const ANN_CATS = ['exams', 'doctorate', 'events', 'administration', 'orientation']

  FT.data.ANNOUNCEMENTS = ANNOUNCEMENTS;
  FT.data.ANN_CATS = ANN_CATS;
})();
