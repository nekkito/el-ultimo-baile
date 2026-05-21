/* ============================================================
   EL ÚLTIMO BAILE - MUNDIAL 2026 | script.js
   Serverless Web Quiniela - Full Logic Engine
   v2.1 - Fix: no-cors save, Recursos paths | 2026-05-20
   ============================================================ */

// ─── CONFIG ───────────────────────────────────────────────────
const CONFIG = {
  SPREADSHEET_ID: '1HjZ-zkAaxXIzFmL5lwyWmD7rRaMxB85tEX_wmvMFMjQ',
  GAS_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbx7r4teub7sCqVpQtVz0t9Vza5VNyB0v7V0i9sPx5c8bYlY3svz739maZ7Q-Em9oTK4ZA/exec',
  DEADLINE: new Date('2026-06-11T15:00:00-04:00'), // June 11, 2026 15:00 EST (UTC-4 in summer)
  COOLDOWN_SECONDS: 60,
};

// ─── TRANSLATIONS ──────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    'login-title': 'El Último Baile',
    'login-subtitle': 'Copa Mundial de la FIFA 2026™',
    'label-name': 'Nombre Completo',
    'label-email': 'Correo Electrónico',
    'label-key': 'Key de Acceso',
    'btn-enter': 'Ingresar a la Quiniela',
    'login-info': 'Para obtener una clave de acceso, contacta al administrador.',
    'hero-title': 'El Último Baile',
    'hero-tagline': 'Copa Mundial de la FIFA 2026™',
    'greeting': '¡Hola, jugador!',
    'tab-label-predictions': 'Mis Pronósticos',
    'tab-label-leaderboard': 'Tabla General',
    'tab-label-tribute': 'El Último Baile',
    'deadline-label': 'Límite de Envío:',
    'save-panel-title': 'Guarda tus pronósticos en caliente',
    'save-panel-subtitle': 'Puedes modificar tus marcadores antes del inicio del torneo.',
    'btn-save-predictions': 'Guardar Pronósticos',
    'filter-groups': 'Fase de Grupos',
    'filter-playoffs': 'Fase Eliminatoria',
    'th-team': 'Equipo',
    'th-team-group': 'Equipo (Gr.)',
    'thirds-table-title': 'Supertabla de Terceros',
    'thirds-table-desc': 'Los mejores 8 clasifican a Dieciseisavos.',
    'leaderboard-title': 'Clasificación General',
    'leaderboard-desc': 'Consulta el puntaje en vivo y ranking de todos los participantes.',
    'stat-label-players': 'Jugadores Activos',
    'stat-label-predictions': 'Predicciones Totales',
    'stat-label-played': 'Partidos Jugados',
    'leaderboard-table-header': 'Participantes',
    'th-rank': 'Puesto', 'th-name': 'Jugador', 'th-points': 'Puntos', 'th-actions': 'Detalles',
    'tribute-title': 'El Último Baile',
    'tribute-desc': 'Un homenaje al legado de tres colosos en su probable última copa del mundo.',
    'messi-status': 'La Leyenda Eterna',
    'cr7-status': 'El Comandante',
    'neymar-status': 'El Mago del Jogo Bonito',
    'tribute-label-cups': 'Mundiales',
    'tribute-label-titles': 'Títulos',
    'tribute-timeline-label': 'Progreso Mundial 2026',
    'tribute-timeline-messi': 'Listo para debutar vs Sudáfrica',
    'tribute-timeline-cr7': 'Preparado para el debut del Grupo K',
    'tribute-timeline-neymar': 'Listo para brillar en el Grupo C',
    'detail-label-points': 'Puntos Totales',
    'detail-label-perfect': 'Marcador Exacto (+5)',
    'detail-label-winner': 'Resultado Simple (+3)',
    'th-match': 'Partido', 'th-prediction': 'Pronóstico', 'th-real': 'Real', 'th-pts-short': 'Pts',
    'login-loading': 'Verificando acceso...',
    'login-error-fields': 'Por favor, completa todos los campos.',
    'login-error-key': 'Correo o Key de acceso no válidos. Intenta nuevamente.',
    'login-error-network': 'Error de red. Verifica tu conexión a Internet.',
    'save-success': '✅ ¡Pronósticos guardados exitosamente!',
    'save-error': '❌ Error al guardar. Intenta de nuevo en unos segundos.',
    'deadline-expired': '🔒 El plazo para ingresar pronósticos ha cerrado.',
    'cooldown-msg': 'Podrás guardar de nuevo en',
    'stage-r32': 'Dieciseisavos de Final',
    'stage-r16': 'Octavos de Final',
    'stage-qf': 'Cuartos de Final',
    'stage-sf': 'Semifinales',
    'stage-3rd': 'Tercer Puesto',
    'stage-final': '🏆 Gran Final',
    'tbd': 'Por definir',
  },
  en: {
    'login-title': 'The Last Dance',
    'login-subtitle': 'FIFA World Cup 2026™',
    'label-name': 'Full Name',
    'label-email': 'Email Address',
    'label-key': 'Access Key',
    'btn-enter': 'Enter the Pool',
    'login-info': 'Contact the admin to obtain your access key.',
    'hero-title': 'The Last Dance',
    'hero-tagline': 'FIFA World Cup 2026™',
    'greeting': 'Welcome, player!',
    'tab-label-predictions': 'My Predictions',
    'tab-label-leaderboard': 'Leaderboard',
    'tab-label-tribute': 'The Last Dance',
    'deadline-label': 'Submission Deadline:',
    'save-panel-title': 'Save your predictions live',
    'save-panel-subtitle': 'You can update your scores before the tournament starts.',
    'btn-save-predictions': 'Save Predictions',
    'filter-groups': 'Group Stage',
    'filter-playoffs': 'Knockout Stage',
    'th-team': 'Team',
    'th-team-group': 'Team (Gr.)',
    'thirds-table-title': 'Best Third-Place Table',
    'thirds-table-desc': 'Top 8 advance to Round of 32.',
    'leaderboard-title': 'General Standings',
    'leaderboard-desc': 'View live scores and rankings for all participants.',
    'stat-label-players': 'Active Players',
    'stat-label-predictions': 'Total Predictions',
    'stat-label-played': 'Matches Played',
    'leaderboard-table-header': 'Participants',
    'th-rank': 'Rank', 'th-name': 'Player', 'th-points': 'Points', 'th-actions': 'Details',
    'tribute-title': 'The Last Dance',
    'tribute-desc': 'A tribute to the legacy of three giants in their likely last World Cup.',
    'messi-status': 'The Eternal Legend',
    'cr7-status': 'The Commander',
    'neymar-status': 'The Jogo Bonito Wizard',
    'tribute-label-cups': 'World Cups',
    'tribute-label-titles': 'Titles',
    'tribute-timeline-label': 'World Cup 2026 Progress',
    'tribute-timeline-messi': 'Ready to debut vs South Africa',
    'tribute-timeline-cr7': 'Set for Group K debut',
    'tribute-timeline-neymar': 'Ready to shine in Group C',
    'detail-label-points': 'Total Points',
    'detail-label-perfect': 'Exact Score (+5)',
    'detail-label-winner': 'Correct Result (+3)',
    'th-match': 'Match', 'th-prediction': 'Prediction', 'th-real': 'Actual', 'th-pts-short': 'Pts',
    'login-loading': 'Verifying access...',
    'login-error-fields': 'Please fill in all fields.',
    'login-error-key': 'Invalid email or access key. Please try again.',
    'login-error-network': 'Network error. Check your internet connection.',
    'save-success': '✅ Predictions saved successfully!',
    'save-error': '❌ Save failed. Please try again in a moment.',
    'deadline-expired': '🔒 The prediction deadline has passed.',
    'cooldown-msg': 'You can save again in',
    'stage-r32': 'Round of 32',
    'stage-r16': 'Round of 16',
    'stage-qf': 'Quarterfinals',
    'stage-sf': 'Semifinals',
    'stage-3rd': 'Third Place',
    'stage-final': '🏆 Grand Final',
    'tbd': 'TBD',
  }
};

// ─── FIXTURE DATA (104 PARTIDOS) ────────────────────────────────
const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const GROUP_TEAMS = {
  A: ['México','Sudáfrica','República de Corea','República Checa'],
  B: ['Canadá','Bosnia y Herzegovina','Catar','Suiza'],
  C: ['Brasil','Marruecos','Haití','Escocia'],
  D: ['Estados Unidos','Paraguay','Australia','Turquía'],
  E: ['Alemania','Curazao','Costa de Marfil','Ecuador'],
  F: ['Países Bajos','Japón','Suecia','Túnez'],
  G: ['Bélgica','Egipto','RI de Irán','Nueva Zelanda'],
  H: ['España','Cabo Verde','Arabia Saudí','Uruguay'],
  I: ['Francia','Senegal','Irak','Noruega'],
  J: ['Argentina','Argelia','Austria','Jordania'],
  K: ['Portugal','RD Congo','Uzbekistán','Colombia'],
  L: ['Inglaterra','Croacia','Ghana','Panamá'],
};
const GROUP_TEAMS_EN = {
  A: ['Mexico','South Africa','South Korea','Czech Republic'],
  B: ['Canada','Bosnia & Herzegovina','Qatar','Switzerland'],
  C: ['Brazil','Morocco','Haiti','Scotland'],
  D: ['USA','Paraguay','Australia','Turkey'],
  E: ['Germany','Curaçao','Ivory Coast','Ecuador'],
  F: ['Netherlands','Japan','Sweden','Tunisia'],
  G: ['Belgium','Egypt','IR Iran','New Zealand'],
  H: ['Spain','Cape Verde','Saudi Arabia','Uruguay'],
  I: ['France','Senegal','Iraq','Norway'],
  J: ['Argentina','Algeria','Austria','Jordan'],
  K: ['Portugal','DR Congo','Uzbekistan','Colombia'],
  L: ['England','Croatia','Ghana','Panama'],
};

// Group matches – 72 fixtures
const GROUP_MATCHES = [
  {id:'M_01',g:'A',h:'México',a:'Sudáfrica',d:'11 Jun',t:'15:00',sta:'Ciudad de México',sta_en:'Mexico City Stadium'},
  {id:'M_02',g:'A',h:'República de Corea',a:'República Checa',d:'11 Jun',t:'22:00',sta:'Guadalajara',sta_en:'Guadalajara Stadium'},
  {id:'M_03',g:'B',h:'Canadá',a:'Bosnia y Herzegovina',d:'12 Jun',t:'15:00',sta:'Toronto',sta_en:'Toronto Stadium'},
  {id:'M_04',g:'D',h:'Estados Unidos',a:'Paraguay',d:'12 Jun',t:'21:00',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
  {id:'M_05',g:'B',h:'Catar',a:'Suiza',d:'13 Jun',t:'15:00',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay Stadium'},
  {id:'M_06',g:'C',h:'Brasil',a:'Marruecos',d:'13 Jun',t:'18:00',sta:'Nueva York / Nueva Jersey',sta_en:'New York New Jersey Stadium'},
  {id:'M_07',g:'C',h:'Haití',a:'Escocia',d:'13 Jun',t:'21:00',sta:'Boston',sta_en:'Boston Stadium'},
  {id:'M_08',g:'D',h:'Australia',a:'Turquía',d:'13 Jun',t:'00:00',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  {id:'M_09',g:'E',h:'Alemania',a:'Curazao',d:'14 Jun',t:'13:00',sta:'Houston',sta_en:'Houston Stadium'},
  {id:'M_10',g:'F',h:'Países Bajos',a:'Japón',d:'14 Jun',t:'16:00',sta:'Dallas',sta_en:'Dallas Stadium'},
  {id:'M_11',g:'E',h:'Costa de Marfil',a:'Ecuador',d:'14 Jun',t:'19:00',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
  {id:'M_12',g:'F',h:'Suecia',a:'Túnez',d:'14 Jun',t:'22:00',sta:'Monterrey',sta_en:'Monterrey Stadium'},
  {id:'M_13',g:'H',h:'España',a:'Cabo Verde',d:'15 Jun',t:'12:00',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  {id:'M_14',g:'G',h:'Bélgica',a:'Egipto',d:'15 Jun',t:'15:00',sta:'Seattle',sta_en:'Seattle Stadium'},
  {id:'M_15',g:'H',h:'Arabia Saudí',a:'Uruguay',d:'15 Jun',t:'18:00',sta:'Miami',sta_en:'Miami Stadium'},
  {id:'M_16',g:'G',h:'RI de Irán',a:'Nueva Zelanda',d:'15 Jun',t:'21:00',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
  {id:'M_17',g:'I',h:'Francia',a:'Senegal',d:'16 Jun',t:'15:00',sta:'Nueva York / Nueva Jersey',sta_en:'New York New Jersey Stadium'},
  {id:'M_18',g:'I',h:'Irak',a:'Noruega',d:'16 Jun',t:'18:00',sta:'Boston',sta_en:'Boston Stadium'},
  {id:'M_19',g:'J',h:'Argentina',a:'Argelia',d:'16 Jun',t:'21:00',sta:'Kansas City',sta_en:'Kansas City Stadium'},
  {id:'M_20',g:'J',h:'Austria',a:'Jordania',d:'16 Jun',t:'00:00',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay Stadium'},
  {id:'M_21',g:'K',h:'Portugal',a:'RD Congo',d:'17 Jun',t:'13:00',sta:'Houston',sta_en:'Houston Stadium'},
  {id:'M_22',g:'L',h:'Inglaterra',a:'Croacia',d:'17 Jun',t:'16:00',sta:'Dallas',sta_en:'Dallas Stadium'},
  {id:'M_23',g:'L',h:'Ghana',a:'Panamá',d:'17 Jun',t:'19:00',sta:'Toronto',sta_en:'Toronto Stadium'},
  {id:'M_24',g:'K',h:'Uzbekistán',a:'Colombia',d:'17 Jun',t:'22:00',sta:'Ciudad de México',sta_en:'Mexico City Stadium'},
  {id:'M_25',g:'A',h:'República Checa',a:'Sudáfrica',d:'18 Jun',t:'12:00',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  {id:'M_26',g:'B',h:'Suiza',a:'Bosnia y Herzegovina',d:'18 Jun',t:'15:00',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
  {id:'M_27',g:'B',h:'Canadá',a:'Catar',d:'18 Jun',t:'18:00',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  {id:'M_28',g:'A',h:'México',a:'República de Corea',d:'18 Jun',t:'21:00',sta:'Guadalajara',sta_en:'Guadalajara Stadium'},
  {id:'M_29',g:'D',h:'Estados Unidos',a:'Australia',d:'19 Jun',t:'15:00',sta:'Seattle',sta_en:'Seattle Stadium'},
  {id:'M_30',g:'C',h:'Escocia',a:'Marruecos',d:'19 Jun',t:'18:00',sta:'Boston',sta_en:'Boston Stadium'},
  {id:'M_31',g:'C',h:'Brasil',a:'Haití',d:'19 Jun',t:'21:00',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
  {id:'M_32',g:'D',h:'Turquía',a:'Paraguay',d:'19 Jun',t:'00:00',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay Stadium'},
  {id:'M_33',g:'F',h:'Países Bajos',a:'Suecia',d:'20 Jun',t:'13:00',sta:'Houston',sta_en:'Houston Stadium'},
  {id:'M_34',g:'E',h:'Alemania',a:'Costa de Marfil',d:'20 Jun',t:'16:00',sta:'Toronto',sta_en:'Toronto Stadium'},
  {id:'M_35',g:'E',h:'Ecuador',a:'Curazao',d:'20 Jun',t:'22:00',sta:'Kansas City',sta_en:'Kansas City Stadium'},
  {id:'M_36',g:'F',h:'Túnez',a:'Japón',d:'20 Jun',t:'00:00',sta:'Monterrey',sta_en:'Monterrey Stadium'},
  {id:'M_37',g:'H',h:'España',a:'Arabia Saudí',d:'21 Jun',t:'12:00',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  {id:'M_38',g:'G',h:'Bélgica',a:'RI de Irán',d:'21 Jun',t:'15:00',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
  {id:'M_39',g:'H',h:'Uruguay',a:'Cabo Verde',d:'21 Jun',t:'18:00',sta:'Miami',sta_en:'Miami Stadium'},
  {id:'M_40',g:'G',h:'Nueva Zelanda',a:'Egipto',d:'21 Jun',t:'21:00',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  {id:'M_41',g:'J',h:'Argentina',a:'Austria',d:'22 Jun',t:'13:00',sta:'Dallas',sta_en:'Dallas Stadium'},
  {id:'M_42',g:'I',h:'Francia',a:'Irak',d:'22 Jun',t:'17:00',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
  {id:'M_43',g:'I',h:'Noruega',a:'Senegal',d:'22 Jun',t:'20:00',sta:'Nueva York / Nueva Jersey',sta_en:'New York New Jersey Stadium'},
  {id:'M_44',g:'J',h:'Jordania',a:'Argelia',d:'22 Jun',t:'23:00',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay Stadium'},
  {id:'M_45',g:'K',h:'Portugal',a:'Uzbekistán',d:'23 Jun',t:'13:00',sta:'Houston',sta_en:'Houston Stadium'},
  {id:'M_46',g:'L',h:'Inglaterra',a:'Ghana',d:'23 Jun',t:'16:00',sta:'Boston',sta_en:'Boston Stadium'},
  {id:'M_47',g:'L',h:'Panamá',a:'Croacia',d:'23 Jun',t:'19:00',sta:'Toronto',sta_en:'Toronto Stadium'},
  {id:'M_48',g:'K',h:'Colombia',a:'RD Congo',d:'23 Jun',t:'22:00',sta:'Guadalajara',sta_en:'Guadalajara Stadium'},
  {id:'M_49',g:'B',h:'Suiza',a:'Canadá',d:'24 Jun',t:'15:00',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  {id:'M_50',g:'B',h:'Bosnia y Herzegovina',a:'Catar',d:'24 Jun',t:'15:00',sta:'Seattle',sta_en:'Seattle Stadium'},
  {id:'M_51',g:'C',h:'Escocia',a:'Brasil',d:'24 Jun',t:'18:00',sta:'Miami',sta_en:'Miami Stadium'},
  {id:'M_52',g:'C',h:'Marruecos',a:'Haití',d:'24 Jun',t:'18:00',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  {id:'M_53',g:'A',h:'República Checa',a:'México',d:'24 Jun',t:'21:00',sta:'Ciudad de México',sta_en:'Mexico City Stadium'},
  {id:'M_54',g:'A',h:'Sudáfrica',a:'República de Corea',d:'24 Jun',t:'21:00',sta:'Monterrey',sta_en:'Monterrey Stadium'},
  {id:'M_55',g:'E',h:'Curazao',a:'Costa de Marfil',d:'25 Jun',t:'16:00',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
  {id:'M_56',g:'E',h:'Ecuador',a:'Alemania',d:'25 Jun',t:'16:00',sta:'Nueva York / Nueva Jersey',sta_en:'New York New Jersey Stadium'},
  {id:'M_57',g:'F',h:'Japón',a:'Suecia',d:'25 Jun',t:'19:00',sta:'Dallas',sta_en:'Dallas Stadium'},
  {id:'M_58',g:'F',h:'Túnez',a:'Países Bajos',d:'25 Jun',t:'19:00',sta:'Kansas City',sta_en:'Kansas City Stadium'},
  {id:'M_59',g:'D',h:'Turquía',a:'Estados Unidos',d:'25 Jun',t:'22:00',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
  {id:'M_60',g:'D',h:'Paraguay',a:'Australia',d:'25 Jun',t:'22:00',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay Stadium'},
  {id:'M_61',g:'I',h:'Noruega',a:'Francia',d:'26 Jun',t:'15:00',sta:'Boston',sta_en:'Boston Stadium'},
  {id:'M_62',g:'I',h:'Senegal',a:'Irak',d:'26 Jun',t:'15:00',sta:'Toronto',sta_en:'Toronto Stadium'},
  {id:'M_63',g:'H',h:'Cabo Verde',a:'Arabia Saudí',d:'26 Jun',t:'20:00',sta:'Houston',sta_en:'Houston Stadium'},
  {id:'M_64',g:'H',h:'Uruguay',a:'España',d:'26 Jun',t:'20:00',sta:'Guadalajara',sta_en:'Guadalajara Stadium'},
  {id:'M_65',g:'G',h:'Egipto',a:'RI de Irán',d:'26 Jun',t:'23:00',sta:'Seattle',sta_en:'Seattle Stadium'},
  {id:'M_66',g:'G',h:'Nueva Zelanda',a:'Bélgica',d:'26 Jun',t:'23:00',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  {id:'M_67',g:'L',h:'Panamá',a:'Inglaterra',d:'27 Jun',t:'17:00',sta:'Nueva York / Nueva Jersey',sta_en:'New York New Jersey Stadium'},
  {id:'M_68',g:'L',h:'Croacia',a:'Ghana',d:'27 Jun',t:'17:00',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
  {id:'M_69',g:'K',h:'Colombia',a:'Portugal',d:'27 Jun',t:'19:30',sta:'Miami',sta_en:'Miami Stadium'},
  {id:'M_70',g:'K',h:'RD Congo',a:'Uzbekistán',d:'27 Jun',t:'19:30',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  {id:'M_71',g:'J',h:'Argelia',a:'Austria',d:'27 Jun',t:'22:00',sta:'Kansas City',sta_en:'Kansas City Stadium'},
  {id:'M_72',g:'J',h:'Jordania',a:'Argentina',d:'27 Jun',t:'22:00',sta:'Dallas',sta_en:'Dallas Stadium'},
];

// Playoff matches – 32 fixtures (P73 to P104)
function buildPlayoffMatches() {
  const r32 = [
    {id:'M_73',round:'r32',label:'P73: 2º A vs 2º B',d:'28 Jun',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
    {id:'M_74',round:'r32',label:'P74: 1º E vs Mejor 3º A/B/C/D/F',d:'29 Jun',sta:'Boston',sta_en:'Boston Stadium'},
    {id:'M_75',round:'r32',label:'P75: 1º F vs 2º C',d:'29 Jun',sta:'Monterrey',sta_en:'Monterrey Stadium'},
    {id:'M_76',round:'r32',label:'P76: 1º C vs 2º F',d:'29 Jun',sta:'Houston',sta_en:'Houston Stadium'},
    {id:'M_77',round:'r32',label:'P77: 1º I vs Mejor 3º C/D/F/G/H',d:'30 Jun',sta:'Nueva York / Nueva Jersey',sta_en:'New York NJ Stadium'},
    {id:'M_78',round:'r32',label:'P78: 2º E vs 2º I',d:'30 Jun',sta:'Dallas',sta_en:'Dallas Stadium'},
    {id:'M_79',round:'r32',label:'P79: 1º A vs Mejor 3º C/E/F/H/I',d:'30 Jun',sta:'Ciudad de México',sta_en:'Mexico City Stadium'},
    {id:'M_80',round:'r32',label:'P80: 1º L vs Mejor 3º E/H/I/J/K',d:'1 Jul',sta:'Atlanta',sta_en:'Atlanta Stadium'},
    {id:'M_81',round:'r32',label:'P81: 1º D vs Mejor 3º B/E/F/I/J',d:'1 Jul',sta:'Bahía de San Francisco',sta_en:'San Francisco Bay'},
    {id:'M_82',round:'r32',label:'P82: 1º G vs Mejor 3º A/E/H/I/J',d:'1 Jul',sta:'Seattle',sta_en:'Seattle Stadium'},
    {id:'M_83',round:'r32',label:'P83: 2º K vs 2º L',d:'2 Jul',sta:'Toronto',sta_en:'Toronto Stadium'},
    {id:'M_84',round:'r32',label:'P84: 1º H vs 2º J',d:'2 Jul',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
    {id:'M_85',round:'r32',label:'P85: 1º B vs Mejor 3º E/F/G/I/J',d:'2 Jul',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
    {id:'M_86',round:'r32',label:'P86: 1º J vs 2º H',d:'3 Jul',sta:'Miami',sta_en:'Miami Stadium'},
    {id:'M_87',round:'r32',label:'P87: 1º K vs Mejor 3º D/E/I/J/L',d:'3 Jul',sta:'Kansas City',sta_en:'Kansas City Stadium'},
    {id:'M_88',round:'r32',label:'P88: 2º D vs 2º G',d:'3 Jul',sta:'Dallas',sta_en:'Dallas Stadium'},
  ];
  const r16 = [
    {id:'M_89',round:'r16',label:'P89: G.P74 vs G.P77',d:'4 Jul',sta:'Filadelfia',sta_en:'Philadelphia Stadium'},
    {id:'M_90',round:'r16',label:'P90: G.P73 vs G.P75',d:'4 Jul',sta:'Houston',sta_en:'Houston Stadium'},
    {id:'M_91',round:'r16',label:'P91: G.P76 vs G.P78',d:'5 Jul',sta:'Nueva York / Nueva Jersey',sta_en:'New York NJ Stadium'},
    {id:'M_92',round:'r16',label:'P92: G.P79 vs G.P80',d:'5 Jul',sta:'Ciudad de México',sta_en:'Mexico City Stadium'},
    {id:'M_93',round:'r16',label:'P93: G.P83 vs G.P84',d:'6 Jul',sta:'Dallas',sta_en:'Dallas Stadium'},
    {id:'M_94',round:'r16',label:'P94: G.P81 vs G.P82',d:'6 Jul',sta:'Seattle',sta_en:'Seattle Stadium'},
    {id:'M_95',round:'r16',label:'P95: G.P86 vs G.P88',d:'7 Jul',sta:'Atlanta',sta_en:'Atlanta Stadium'},
    {id:'M_96',round:'r16',label:'P96: G.P85 vs G.P87',d:'7 Jul',sta:'BC Place Vancouver',sta_en:'BC Place Vancouver'},
  ];
  const qf = [
    {id:'M_97',round:'qf',label:'P97: G.P89 vs G.P90',d:'9 Jul',sta:'Boston',sta_en:'Boston Stadium'},
    {id:'M_98',round:'qf',label:'P98: G.P93 vs G.P94',d:'10 Jul',sta:'Los Ángeles',sta_en:'Los Angeles Stadium'},
    {id:'M_99',round:'qf',label:'P99: G.P91 vs G.P92',d:'11 Jul',sta:'Miami',sta_en:'Miami Stadium'},
    {id:'M_100',round:'qf',label:'P100: G.P95 vs G.P96',d:'11 Jul',sta:'Kansas City',sta_en:'Kansas City Stadium'},
  ];
  const sf = [
    {id:'M_101',round:'sf',label:'P101: G.P97 vs G.P98',d:'14 Jul',sta:'Dallas',sta_en:'Dallas Stadium'},
    {id:'M_102',round:'sf',label:'P102: G.P99 vs G.P100',d:'15 Jul',sta:'Atlanta',sta_en:'Atlanta Stadium'},
  ];
  const third = [{id:'M_103',round:'3rd',label:'P103: Perdedor P101 vs Perdedor P102',d:'18 Jul',sta:'Miami',sta_en:'Miami Stadium'}];
  const final_ = [{id:'M_104',round:'final',label:'★ GRAN FINAL: G.P101 vs G.P102 ★',d:'19 Jul',sta:'Nueva York / Nueva Jersey',sta_en:'New York NJ Stadium'}];
  return [...r32,...r16,...qf,...sf,...third,...final_];
}
const PLAYOFF_MATCHES = buildPlayoffMatches();

// ─── STATE ─────────────────────────────────────────────────────
let currentUser = null;
let currentLang = 'es';
let currentTheme = 'dark';
let activeGroup = 'A';
let activeStage = 'groups';
let predictions = {}; // { matchId: { h: 0, a: 0 } }
let leaderboardData = [];
let matchResultsData = [];
let cooldownTimer = null;
let cooldownRemaining = 0;
let countdownInterval = null;

// ─── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  buildGroupSelectors();
  initParallax();
  initCountdown();
  // If user is already saved in session storage, skip login
  const stored = sessionStorage.getItem('quinielaUser');
  if (stored) {
    currentUser = JSON.parse(stored);
    showApp();
  }
});

// ─── PARALLAX ──────────────────────────────────────────────────
function initParallax() {
  const bg = document.querySelector('.hero-bg-parallax');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

// ─── INTERSECTION OBSERVER (3D card entry animations) ──────────
function initMatchAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.match-card').forEach(card => observer.observe(card));
  document.querySelectorAll('.fade-in-up').forEach(el => {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs2.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs2.observe(el);
  });
}

// ─── LANGUAGE SYSTEM ───────────────────────────────────────────
function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.getElementById('lang-btn-text').textContent = lang === 'es' ? 'EN' : 'ES';
  document.documentElement.lang = lang;
  // Update group/stage labels if matches already rendered
  if (activeStage === 'groups') renderGroupMatches(activeGroup);
  else renderPlayoffMatches();
  updateStandingsPanel(activeGroup);
}

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

// ─── THEME SYSTEM ──────────────────────────────────────────────
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.className = currentTheme + '-theme';
  const icon = document.querySelector('#theme-toggle-btn i');
  icon.className = currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ─── LOGIN ─────────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById('login-name').value.trim();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const key = document.getElementById('login-key').value.trim();
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-submit-btn');

  if (!name || !email || !key) {
    showLoginError(t('login-error-fields'));
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${t('login-loading')}</span>`;
  errEl.classList.add('hidden');

  try {
    // Use the Apps Script endpoint to validate (avoids CORS from file://)
    const url = `${CONFIG.GAS_WEB_APP_URL}?action=validate&email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('network');
    const data = await res.json();

    if (!data.valid) {
      showLoginError(t('login-error-key'));
      btn.disabled = false;
      btn.innerHTML = `<span>${t('btn-enter')}</span> <i class="fa-solid fa-arrow-right"></i>`;
      return;
    }

    // Store user and show app
    currentUser = { name, email, key };
    sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));

    showApp();

  } catch (err) {
    showLoginError(t('login-error-network') + ' (' + err.message + ')');
    btn.disabled = false;
    btn.innerHTML = `<span>${t('btn-enter')}</span> <i class="fa-solid fa-arrow-right"></i>`;
  }
}

function showLoginError(msg) {
  const errEl = document.getElementById('login-error');
  errEl.textContent = msg;
  errEl.classList.remove('hidden');
}

function logout() {
  sessionStorage.removeItem('quinielaUser');
  currentUser = null;
  document.getElementById('app-content').classList.add('hidden');
  document.getElementById('login-gate').style.display = 'flex';
  document.getElementById('logout-btn').classList.add('hidden');
  document.getElementById('login-form').reset();
  // Always hide admin tab on logout
  const adminTab = document.getElementById('tab-admin');
  if (adminTab) adminTab.style.display = 'none';
}

function showApp() {
  document.getElementById('login-gate').style.display = 'none';
  document.getElementById('app-content').classList.remove('hidden');
  document.getElementById('logout-btn').classList.remove('hidden');

  // ── Admin tab: visible ONLY for the admin account ─────────────
  // This runs on fresh login AND on session restore from sessionStorage
  const adminTab = document.getElementById('tab-admin');
  if (adminTab) {
    adminTab.style.display = (currentUser.email === '2026quiniela2026@gmail.com') ? '' : 'none';
  }

  // Set welcome header
  document.getElementById('header-user-name').textContent = currentUser.name;
  document.getElementById('header-avatar').textContent = currentUser.name.charAt(0).toUpperCase();

  // Load predictions from localStorage (autosave)
  const saved = localStorage.getItem(`quinielaPreds_${currentUser.email}`);
  if (saved) predictions = JSON.parse(saved);

  // Render initial view
  switchFixtureStage('groups');
  updateStandingsPanel('A');
  updateBestThirdsPanel();
  initCountdown();
  checkDeadline();
  initDeadlineWarning();   // ← pre-close blinking alert
  loadLeaderboard();
  setTimeout(initMatchAnimations, 200);
}

// ─── TAB NAVIGATION ────────────────────────────────────────────
function switchTab(tab) {
  const ALL_TABS = ['predictions','leaderboard','tribute','admin'];
  ALL_TABS.forEach(id => {
    const sec = document.getElementById(`sec-${id}`);
    const btn = document.getElementById(`tab-${id}`);
    if (sec) sec.classList.remove('active');
    if (btn) btn.classList.remove('active');
  });
  const secEl = document.getElementById(`sec-${tab}`);
  const btnEl = document.getElementById(`tab-${tab}`);
  if (secEl) secEl.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
  if (tab === 'leaderboard') loadLeaderboard();
  if (tab === 'admin') refreshAdminStats();
}

// ─── GROUP SELECTORS ────────────────────────────────────────────
function buildGroupSelectors() {
  const container = document.getElementById('group-letter-selectors');
  container.innerHTML = '';
  GROUPS.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'group-btn' + (g === 'A' ? ' active' : '');
    btn.textContent = g;
    btn.onclick = () => {
      document.querySelectorAll('.group-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGroup = g;
      renderGroupMatches(g);
      updateStandingsPanel(g);
    };
    container.appendChild(btn);
  });
}

// ─── FIXTURE STAGE SWITCH ───────────────────────────────────────
function switchFixtureStage(stage) {
  activeStage = stage;
  document.getElementById('f-groups').classList.toggle('active', stage === 'groups');
  document.getElementById('f-playoffs').classList.toggle('active', stage === 'playoffs');
  const selectors = document.getElementById('group-letter-selectors');
  const standingsPanel = document.getElementById('standings-side-panel');
  if (stage === 'groups') {
    selectors.style.display = 'flex';
    standingsPanel.style.display = 'block';
    renderGroupMatches(activeGroup);
    updateStandingsPanel(activeGroup);
  } else {
    selectors.style.display = 'none';
    standingsPanel.style.display = 'none';
    renderPlayoffMatches();
  }
}

// ─── RENDER GROUP MATCHES ───────────────────────────────────────
function renderGroupMatches(group) {
  activeGroup = group;
  const matches = GROUP_MATCHES.filter(m => m.g === group);
  const container = document.getElementById('matches-container');
  const titleEl = document.getElementById('current-stage-title');
  titleEl.textContent = currentLang === 'es' ? `Fase de Grupos - Grupo ${group}` : `Group Stage - Group ${group}`;

  container.innerHTML = '';
  matches.forEach((m, idx) => {
    const pred = predictions[m.id] || { h: 0, a: 0 };
    const hName = currentLang === 'es' ? m.h : (GROUP_TEAMS_EN[m.g][GROUP_TEAMS[m.g].indexOf(m.h)] || m.h);
    const aName = currentLang === 'es' ? m.a : (GROUP_TEAMS_EN[m.g][GROUP_TEAMS[m.g].indexOf(m.a)] || m.a);
    const sta = currentLang === 'es' ? m.sta : m.sta_en;

    const card = document.createElement('div');
    card.className = 'match-card card';
    card.dataset.matchId = m.id;
    card.innerHTML = `
      <div class="match-card-header">
        <span class="match-id-badge">${m.id}</span>
        <div class="match-meta">
          <span class="match-date-tag"><i class="fa-regular fa-calendar"></i> ${m.d}</span>
          <span><i class="fa-regular fa-clock"></i> ${m.t} EST</span>
        </div>
      </div>
      <div class="match-teams-row">
        <div class="team-side">
          <span class="team-name">${hName}</span>
        </div>
        <div class="score-inputs">
          <div class="goal-control">
            <button class="goal-btn" onclick="changeGoal('${m.id}','h',-1)">−</button>
            <span class="goal-display" id="goal-h-${m.id}">${pred.h}</span>
            <button class="goal-btn" onclick="changeGoal('${m.id}','h',+1)">+</button>
          </div>
          <span class="vs-sep">VS</span>
          <div class="goal-control">
            <button class="goal-btn" onclick="changeGoal('${m.id}','a',-1)">−</button>
            <span class="goal-display" id="goal-a-${m.id}">${pred.a}</span>
            <button class="goal-btn" onclick="changeGoal('${m.id}','a',+1)">+</button>
          </div>
        </div>
        <div class="team-side visitor">
          <span class="team-name">${aName}</span>
        </div>
      </div>
      <div class="match-card-footer">
        <span class="stadium-info"><i class="fa-solid fa-location-dot"></i> ${sta}</span>
        <span class="badge badge-primary" style="font-size:0.7rem;">Grupo ${group}</span>
      </div>`;
    container.appendChild(card);
  });

  setTimeout(initMatchAnimations, 50);
  updateStandingsPanel(group);
}

// ─── RENDER PLAYOFF MATCHES ─────────────────────────────────────
function renderPlayoffMatches() {
  const container = document.getElementById('matches-container');
  const titleEl = document.getElementById('current-stage-title');
  titleEl.textContent = currentLang === 'es' ? 'Fase Eliminatoria' : 'Knockout Stage';
  container.innerHTML = '';

  const rounds = [
    { key: 'r32', label: t('stage-r32') },
    { key: 'r16', label: t('stage-r16') },
    { key: 'qf',  label: t('stage-qf')  },
    { key: 'sf',  label: t('stage-sf')  },
    { key: '3rd', label: t('stage-3rd') },
    { key: 'final', label: t('stage-final') },
  ];

  rounds.forEach(round => {
    const matches = PLAYOFF_MATCHES.filter(m => m.round === round.key);
    if (!matches.length) return;

    const header = document.createElement('h3');
    header.className = 'section-title outfit fade-in-up';
    header.style.cssText = 'font-size:1.1rem; margin:1.5rem 0 0.75rem; color:var(--accent-gold)';
    header.textContent = round.label;
    container.appendChild(header);

    matches.forEach(m => {
      const pred = predictions[m.id] || { h: 0, a: 0 };
      const sta = currentLang === 'es' ? m.sta : m.sta_en;

      const card = document.createElement('div');
      card.className = 'match-card playoff card';
      card.dataset.matchId = m.id;
      card.innerHTML = `
        <div class="match-card-header">
          <span class="match-id-badge">${m.id}</span>
          <span class="playoff-label">${round.label}</span>
          <span class="match-date-tag"><i class="fa-regular fa-calendar"></i> ${m.d}</span>
        </div>
        <div class="match-teams-row">
          <div class="team-side">
            <span class="team-name small">${currentLang === 'es' ? m.label.split(':')[1]?.split(' vs ')[0]?.trim() || t('tbd') : m.label.split(':')[1]?.split(' vs ')[0]?.trim() || t('tbd')}</span>
          </div>
          <div class="score-inputs">
            <div class="goal-control">
              <button class="goal-btn" onclick="changeGoal('${m.id}','h',-1)">−</button>
              <span class="goal-display" id="goal-h-${m.id}">${pred.h}</span>
              <button class="goal-btn" onclick="changeGoal('${m.id}','h',+1)">+</button>
            </div>
            <span class="vs-sep">VS</span>
            <div class="goal-control">
              <button class="goal-btn" onclick="changeGoal('${m.id}','a',-1)">−</button>
              <span class="goal-display" id="goal-a-${m.id}">${pred.a}</span>
              <button class="goal-btn" onclick="changeGoal('${m.id}','a',+1)">+</button>
            </div>
          </div>
          <div class="team-side visitor">
            <span class="team-name small">${m.label.split(' vs ')[1]?.trim() || t('tbd')}</span>
          </div>
        </div>
        <div class="match-card-footer">
          <span class="stadium-info"><i class="fa-solid fa-location-dot"></i> ${sta}</span>
        </div>`;
      container.appendChild(card);
    });
  });
  setTimeout(initMatchAnimations, 50);
}

// ─── GOAL CONTROLS ──────────────────────────────────────────────
function changeGoal(matchId, side, delta) {
  if (!predictions[matchId]) predictions[matchId] = { h: 0, a: 0 };
  predictions[matchId][side] = Math.max(0, (predictions[matchId][side] || 0) + delta);
  const el = document.getElementById(`goal-${side}-${matchId}`);
  if (el) el.textContent = predictions[matchId][side];
  // Autosave locally
  localStorage.setItem(`quinielaPreds_${currentUser?.email}`, JSON.stringify(predictions));
  // Recalculate standings if in group mode
  if (activeStage === 'groups') {
    const match = GROUP_MATCHES.find(m => m.id === matchId);
    if (match) { updateStandingsPanel(match.g); updateBestThirdsPanel(); }
  }
}

// ─── GROUP STANDINGS ────────────────────────────────────────────
function calcGroupStandings(group) {
  const teams = {};
  GROUP_TEAMS[group].forEach(name => { teams[name] = { name, pts: 0, gf: 0, gc: 0, dg: 0, played: 0 }; });
  GROUP_MATCHES.filter(m => m.g === group).forEach(m => {
    const pred = predictions[m.id];
    if (!pred) return;
    const h = pred.h, a = pred.a;
    if (teams[m.h]) { teams[m.h].gf += h; teams[m.h].gc += a; teams[m.h].dg += (h-a); teams[m.h].played++; }
    if (teams[m.a]) { teams[m.a].gf += a; teams[m.a].gc += h; teams[m.a].dg += (a-h); teams[m.a].played++; }
    if (h > a) { if(teams[m.h]) teams[m.h].pts += 3; }
    else if (h < a) { if(teams[m.a]) teams[m.a].pts += 3; }
    else { if(teams[m.h]) teams[m.h].pts += 1; if(teams[m.a]) teams[m.a].pts += 1; }
  });
  return Object.values(teams).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
}

function updateStandingsPanel(group) {
  const standings = calcGroupStandings(group);
  const tbody = document.getElementById('group-standings-body');
  document.getElementById('standings-table-title').textContent = currentLang === 'es' ? `Posiciones Grupo ${group}` : `Group ${group} Standings`;
  document.getElementById('standings-group-badge').textContent = group;
  tbody.innerHTML = '';
  standings.forEach((team, idx) => {
    const pos = idx + 1;
    const posClass = pos <= 2 ? 'top' : (pos === 3 ? 'third' : 'out');
    const trClass = pos <= 2 ? 'q-auto' : (pos === 3 ? 'q-third' : '');
    const teamName = currentLang === 'es' ? team.name : (GROUP_TEAMS_EN[group][GROUP_TEAMS[group].indexOf(team.name)] || team.name);
    tbody.innerHTML += `<tr class="${trClass}">
      <td><span class="pos-badge ${posClass}">${pos}</span></td>
      <td>${teamName}</td>
      <td class="pts-bold">${team.pts}</td>
      <td>${team.gf}</td><td>${team.gc}</td><td>${team.dg >= 0 ? '+'+team.dg : team.dg}</td>
    </tr>`;
  });
}

function updateBestThirdsPanel() {
  const thirds = [];
  GROUPS.forEach(g => {
    const standings = calcGroupStandings(g);
    if (standings.length >= 3) thirds.push({ ...standings[2], group: g });
  });
  thirds.sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
  const top8 = thirds.slice(0, 8);
  const tbody = document.getElementById('best-thirds-body');
  tbody.innerHTML = '';
  top8.forEach((team, idx) => {
    const teamName = currentLang === 'es' ? team.name : (GROUP_TEAMS_EN[team.group][GROUP_TEAMS[team.group].indexOf(team.name)] || team.name);
    tbody.innerHTML += `<tr class="q-auto">
      <td><span class="pos-badge top">${idx+1}</span></td>
      <td>${teamName} <span style="color:var(--text-muted);font-size:0.75rem;">(${team.group})</span></td>
      <td class="pts-bold">${team.pts}</td>
      <td>${team.gf}</td><td>${team.gc}</td>
      <td>${team.dg >= 0 ? '+'+team.dg : team.dg}</td>
    </tr>`;
  });
  if (!top8.length) tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:1rem;">Ingresa pronósticos para ver la tabla.</td></tr>`;
}

// ─── DEADLINE & COUNTDOWN ───────────────────────────────────────
function checkDeadline() {
  const now = new Date();
  const expired = now >= CONFIG.DEADLINE;
  const saveBtn = document.getElementById('save-predictions-btn');
  if (expired) {
    saveBtn.disabled = true;
    const bar = document.getElementById('deadline-bar');
    bar.className = 'alert alert-danger flex-between flex-wrap';
    bar.innerHTML = `<div class="flex-align"><i class="fa-solid fa-lock"></i><strong>${t('deadline-expired')}</strong></div>`;
    document.querySelectorAll('.goal-btn').forEach(b => b.disabled = true);
  }
  return expired;
}

function initCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  function update() {
    const now = new Date();
    const diff = CONFIG.DEADLINE - now;
    if (diff <= 0) {
      document.getElementById('countdown-timer').textContent = '00:00:00:00';
      clearInterval(countdownInterval);
      checkDeadline();
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown-timer').textContent =
      `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
  }
  update();
  countdownInterval = setInterval(update, 1000);
}

// ─── SAVE PREDICTIONS ───────────────────────────────────────────
async function saveAllPredictions() {
  if (checkDeadline()) return;
  if (cooldownRemaining > 0) return;

  const saveBtn = document.getElementById('save-predictions-btn');
  const saveBtnText = document.getElementById('save-btn-text');
  const saveBtnIcon = document.getElementById('save-btn-icon');

  saveBtn.disabled = true;
  saveBtnIcon.className = 'fa-solid fa-spinner fa-spin';
  saveBtnText.textContent = currentLang === 'es' ? 'Guardando...' : 'Saving...';
  saveBtn.classList.add('saving');

  try {
    // GET request: no CORS preflight, full response readable, works from GitHub Pages.
    // The predictions object is JSON-encoded as a URL parameter.
    const params = new URLSearchParams({
      action:  'save',
      nombre:  currentUser.name,
      correo:  currentUser.email,
      key:     currentUser.key,
      ts:      new Date().toISOString(),
      preds:   JSON.stringify(predictions)   // { M_01:{h:2,a:1}, ... }
    });

    const res = await fetch(`${CONFIG.GAS_WEB_APP_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === 'ok' || data.result === 'success') {
      showSaveAlert(t('save-success'), 'success');
      localStorage.setItem(`quinielaPreds_${currentUser.email}`, JSON.stringify(predictions));
    } else {
      throw new Error(data.message || 'server-error');
    }

  } catch (err) {
    showSaveAlert(t('save-error') + ' (' + err.message + ')', 'danger');
  } finally {
    startCooldown();
  }
}

function startCooldown() {
  const saveBtn = document.getElementById('save-predictions-btn');
  const saveBtnText = document.getElementById('save-btn-text');
  const saveBtnIcon = document.getElementById('save-btn-icon');
  cooldownRemaining = CONFIG.COOLDOWN_SECONDS;
  saveBtn.classList.remove('saving');

  if (cooldownTimer) clearInterval(cooldownTimer);
  cooldownTimer = setInterval(() => {
    cooldownRemaining--;
    if (cooldownRemaining <= 0) {
      clearInterval(cooldownTimer);
      saveBtn.disabled = false;
      saveBtnIcon.className = 'fa-solid fa-cloud-arrow-up';
      saveBtnText.textContent = t('btn-save-predictions');
    } else {
      saveBtnText.textContent = `${t('cooldown-msg')} ${cooldownRemaining}s`;
      saveBtnIcon.className = 'fa-solid fa-hourglass-half';
    }
  }, 1000);
}

function showSaveAlert(msg, type) {
  const existing = document.querySelector('.save-alert-banner');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = `alert alert-${type} save-alert-banner fade-in-up`;
  div.textContent = msg;
  div.style.cssText = 'margin-bottom:1rem; animation: slideUp 0.4s ease;';
  document.getElementById('sec-predictions').insertBefore(div, document.getElementById('sec-predictions').firstChild);
  setTimeout(() => div.remove(), 15000); // 15 seconds visibility
}

// ─── LEADERBOARD (from Google Sheets) ──────────────────────────
async function loadLeaderboard() {
  try {
    const baseUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:csv`;
    const [resLB, resMatches] = await Promise.all([
      fetch(`${baseUrl}&sheet=Tabla de Posiciones`).then(r => r.ok ? r.text() : ''),
      fetch(`${baseUrl}&sheet=Resultados Reales`).then(r => r.ok ? r.text() : '')
    ]);

    leaderboardData = parseCSV(resLB).filter(r => r['Nombre'] && r['Nombre'] !== 'Nombre');
    matchResultsData = parseCSV(resMatches).filter(r => r['ID Partido'] && r['ID Partido'] !== 'ID Partido');

    renderLeaderboard(leaderboardData);
    updateStats();
  } catch (err) {
    document.getElementById('leaderboard-body').innerHTML =
      `<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary);">
        <i class="fa-solid fa-cloud-xmark"></i> ${t('login-error-network')}
      </td></tr>`;
  }
}

function renderLeaderboard(data) {
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '';
  updatePodium(data);
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary);">Sin registros disponibles.</td></tr>`;
    return;
  }
  data.forEach((row, idx) => {
    const pos = idx + 1;
    const name = row['Nombre'] || row['nombre'] || '—';
    const pts = row['Puntos Totales'] || row['Puntos'] || '0';
    const rankClass = pos === 1 ? 'first' : pos === 2 ? 'second' : pos === 3 ? 'third' : '';
    const init = name.charAt(0).toUpperCase();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:center"><span class="rank-num ${rankClass}">${pos}</span></td>
      <td><div class="player-info-cell"><div class="player-avatar-mini">${init}</div><span>${name}</span></div></td>
      <td class="points-cell">${pts} pts</td>
      <td style="text-align:center"><button class="btn-ghost" onclick="showPlayerDetails('${name}')"><i class="fa-solid fa-eye"></i> Ver</button></td>`;
    tbody.appendChild(tr);
  });
}

function updatePodium(data) {
  [1,2,3].forEach(i => {
    const el = document.getElementById(`podium-${i}`);
    const row = data[i-1];
    if (row) {
      const name = row['Nombre'] || row['nombre'] || '—';
      const pts = row['Puntos Totales'] || row['Puntos'] || '0';
      const init = name.charAt(0).toUpperCase();
      el.querySelector('.avatar-holder').textContent = init;
      el.querySelector('.user-email').textContent = name;
      el.querySelector('.user-points').textContent = `${pts} pts`;
    }
  });
}

function updateStats() {
  document.getElementById('stat-total-users').textContent = leaderboardData.length;
  const played = matchResultsData.filter(m => m['Goles Local Real'] !== '' && m['Goles Local Real'] !== undefined).length;
  document.getElementById('stat-played-matches').textContent = played;
  document.getElementById('stat-total-predictions').textContent = leaderboardData.reduce((sum, r) => {
    return sum + (parseInt(r['Total Pronósticos'] || r['Predicciones'] || 0));
  }, 0) || '—';
}

function filterLeaderboard() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const filtered = leaderboardData.filter(r => (r['Nombre'] || '').toLowerCase().includes(q));
  renderLeaderboard(filtered);
}

function showPlayerDetails(name) {
  document.getElementById('modal-user-email').textContent = name;
  const matchMap = {};
  matchResultsData.forEach(m => { if (m['ID Partido']) matchMap[m['ID Partido']] = m; });
  // Retrieve all prediction data from GSheets (already loaded as leaderboard summary — detail requires separate fetch)
  document.getElementById('detail-total-points').textContent = '—';
  document.getElementById('detail-perfect-hits').textContent = '—';
  document.getElementById('detail-winner-hits').textContent = '—';
  document.getElementById('detail-table-body').innerHTML = `<tr><td colspan="4" style="text-align:center;padding:1.5rem;color:var(--text-secondary);">
    Para ver detalles completos, consulta la hoja de Google Sheets.
  </td></tr>`;
  openModal('modal-details');
}

// ─── MODAL ─────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

// ─── CSV PARSER ─────────────────────────────────────────────────
function parseCSV(text) {
  if (!text) return [];
  const lines = [];
  let row = [''], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], nx = text[i+1];
    if (c === '"') { if (inQ && nx === '"') { row[row.length-1] += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { row.push(''); }
    else if ((c === '\r' || c === '\n') && !inQ) { if (c === '\r' && nx === '\n') i++; lines.push(row); row = ['']; }
    else row[row.length-1] += c;
  }
  if (row.length > 1 || row[0]) lines.push(row);
  if (!lines.length) return [];
  const headers = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).filter(l => l.length > 1 || l[0]).map(values => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (values[i] || '').trim().replace(/^"|"$/g, ''); });
    return obj;
  });
}

/* ═══════════════════════════════════════════════════════════════
   🔊 AUDIO ENGINE — Background music with floating widget
   ═══════════════════════════════════════════════════════════════ */
let audioMuted = false;

function initAudio() {
  const audio = document.getElementById('bg-audio');
  if (!audio) return;

  // Start at 35% volume (comfortable ambient level)
  audio.volume = 0.35;
  updateVolumeSliderGradient(35);

  // Browsers require user interaction before playing audio
  // We attach a one-time handler on first user gesture
  const startAudio = () => {
    audio.play().catch(() => {
      // Autoplay blocked — widget will still function for manual control
    });
    document.removeEventListener('click', startAudio);
    document.removeEventListener('keydown', startAudio);
    document.removeEventListener('touchstart', startAudio);
  };
  document.addEventListener('click', startAudio);
  document.addEventListener('keydown', startAudio);
  document.addEventListener('touchstart', startAudio, { passive: true });
}

function toggleAudioMute() {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-mute-btn');
  const icon = document.getElementById('audio-icon');
  if (!audio) return;

  audioMuted = !audioMuted;
  audio.muted = audioMuted;

  if (audioMuted) {
    icon.className = 'fa-solid fa-volume-xmark';
    btn.classList.add('muted');
    btn.title = 'Activar sonido';
  } else {
    icon.className = 'fa-solid fa-volume-high';
    btn.classList.remove('muted');
    btn.title = 'Silenciar';
    // Attempt to play if not already (in case autoplay was blocked)
    audio.play().catch(() => {});
  }
}

function setAudioVolume(value) {
  const audio = document.getElementById('bg-audio');
  const vol = parseInt(value, 10);
  if (!audio) return;

  audio.volume = vol / 100;
  updateVolumeSliderGradient(vol);

  // Auto-unmute if user raises volume while muted
  if (vol > 0 && audioMuted) {
    audioMuted = false;
    audio.muted = false;
    const icon = document.getElementById('audio-icon');
    const btn = document.getElementById('audio-mute-btn');
    if (icon) icon.className = 'fa-solid fa-volume-high';
    if (btn) btn.classList.remove('muted');
  }
  // Auto-mute icon if volume set to 0
  if (vol === 0) {
    const icon = document.getElementById('audio-icon');
    if (icon) icon.className = 'fa-solid fa-volume-xmark';
  } else if (!audioMuted) {
    const icon = document.getElementById('audio-icon');
    if (icon) icon.className = vol < 40 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
  }
}

function updateVolumeSliderGradient(vol) {
  const slider = document.getElementById('audio-volume-slider');
  if (slider) slider.style.setProperty('--vol-pct', `${vol}%`);
}

/* ═══════════════════════════════════════════════════════════════
   🎬 VIDEO BACKGROUND ENGINE — Scroll-synchronized frame control
   ═══════════════════════════════════════════════════════════════ */
let videoScrollEnabled = false;

function initVideoBackground() {
  const video = document.getElementById('matches-video-bg');
  if (!video) return;

  // Load but pause — we'll control playback time via scroll
  video.pause();
  video.currentTime = 0;

  // Wait for metadata to know duration
  video.addEventListener('loadedmetadata', () => {
    videoScrollEnabled = true;
  });

  // Show video only when user is in the Predictions tab
  const secPredictions = document.getElementById('sec-predictions');
  if (!secPredictions) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.classList.add('visible-video');
      } else {
        video.classList.remove('visible-video');
      }
    });
  }, { threshold: 0.05 });
  io.observe(secPredictions);
}

function updateVideoOnScroll() {
  if (!videoScrollEnabled) return;
  const video = document.getElementById('matches-video-bg');
  if (!video || !video.duration) return;

  // Map current scroll position (0 → document height) to video time
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

  // Set video time proportional to scroll without triggering play/pause
  const targetTime = scrollFraction * video.duration;
  if (Math.abs(video.currentTime - targetTime) > 0.05) {
    video.currentTime = targetTime;
  }
}

/* ═══════════════════════════════════════════════════════════════
   🌀 SMOOTH INERTIA SCROLL ENGINE
   Simulates physical damping / mechanical friction for premium feel
   ═══════════════════════════════════════════════════════════════ */
const InertiaScroll = (() => {
  // Configuration
  const FRICTION      = 0.96;    // Ultra-gentle damping — silky glide
  const WHEEL_FORCE   = 35;      // Light impulse per wheel notch
  const TOUCH_SCALE   = 1.0;     // Touch gesture multiplier
  const MIN_VELOCITY  = 0.3;     // Stop threshold (pixels/frame)
  const FPS_FACTOR    = 16.67;   // ~60fps reference

  let velocity   = 0;
  let rafId      = null;
  let lastY      = 0;
  let touching   = false;
  let enabled    = true;

  function clampScroll(target) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(target, max));
  }

  function animate() {
    if (Math.abs(velocity) < MIN_VELOCITY) {
      velocity = 0;
      rafId = null;
      return;
    }
    window.scrollTo(0, clampScroll(window.scrollY + velocity));
    velocity *= FRICTION;
    rafId = requestAnimationFrame(animate);
  }

  function addVelocity(delta) {
    if (!enabled) return;
    velocity += delta;
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function onWheel(e) {
    // Only intercept when focused on the predictions section (matches list)
    const el = document.getElementById('matches-container');
    if (!el) return;

    // Allow natural scroll on scrollable sub-elements (dropdowns, tables)
    const target = e.target;
    if (target.closest('.table-responsive') || target.closest('.modal-overlay')) return;

    e.preventDefault();
    const delta = e.deltaY > 0 ? WHEEL_FORCE : -WHEEL_FORCE;
    addVelocity(delta);
  }

  function onTouchStart(e) {
    touching = true;
    lastY = e.touches[0].clientY;
    velocity = 0;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function onTouchMove(e) {
    if (!touching) return;
    const currentY = e.touches[0].clientY;
    const delta = (lastY - currentY) * TOUCH_SCALE;
    lastY = currentY;
    addVelocity(delta);
  }

  function onTouchEnd() {
    touching = false;
    // Let inertia carry on from existing velocity
    if (Math.abs(velocity) > MIN_VELOCITY && !rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }

  function init() {
    // Passive: false is required to call preventDefault on wheel
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  }

  return { init };
})();

/* ═══════════════════════════════════════════════════════════════
   🚀 MULTIMEDIA INIT — Called once DOM is ready
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initVideoBackground();
  InertiaScroll.init();

  // Unified scroll event: parallax + video sync
  window.addEventListener('scroll', () => {
    // Parallax (hero)
    const bg = document.querySelector('.hero-bg-parallax');
    if (bg) bg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    // Video frame sync
    updateVideoOnScroll();
  }, { passive: true });
});

// ─── ADMIN PANEL FUNCTIONS ──────────────────────────────────────

/**
 * Queries the Apps Script for the access key of any participant.
 * Only callable when logged in as the admin account.
 */
async function adminQueryKey() {
  const emailInput = document.getElementById('admin-email-input');
  const resultBox  = document.getElementById('admin-result-box');
  const resultKey  = document.getElementById('admin-result-key');
  const resultErr  = document.getElementById('admin-result-error');
  const queryBtn   = document.getElementById('admin-query-btn');

  const targetEmail = emailInput.value.trim().toLowerCase();
  if (!targetEmail) {
    resultErr.textContent = 'Ingresa el correo del participante.';
    resultErr.classList.remove('hidden');
    resultBox.classList.add('hidden');
    return;
  }

  resultErr.classList.add('hidden');
  resultBox.classList.add('hidden');
  queryBtn.disabled = true;
  queryBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Consultando...';

  try {
    const url = `${CONFIG.GAS_WEB_APP_URL}?action=getKey` +
      `&adminEmail=${encodeURIComponent(currentUser.email)}` +
      `&adminKey=${encodeURIComponent(currentUser.key)}` +
      `&targetEmail=${encodeURIComponent(targetEmail)}`;

    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === 'ok' && data.key) {
      resultKey.textContent = data.key.toUpperCase();
      resultBox.classList.remove('hidden');
      // Neon glow pulse animation
      resultKey.style.animation = 'none';
      requestAnimationFrame(() => { resultKey.style.animation = ''; });
    } else {
      resultErr.textContent = data.message || 'Participante no encontrado en el sistema.';
      resultErr.classList.remove('hidden');
    }
  } catch (err) {
    resultErr.textContent = 'Error de red: ' + err.message;
    resultErr.classList.remove('hidden');
  } finally {
    queryBtn.disabled = false;
    queryBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Consultar Key de Acceso';
  }
}

/**
 * Refreshes the admin stats panel with live debug data from Apps Script.
 */
async function refreshAdminStats() {
  const statPart  = document.getElementById('admin-stat-participants');
  const statPreds = document.getElementById('admin-stat-predictions');
  const statDL    = document.getElementById('admin-stat-deadline');

  // Deadline countdown
  const now  = new Date();
  const diff = CONFIG.DEADLINE - now;
  if (diff <= 0) {
    statDL.textContent = '🔒 Cerrado';
  } else {
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    statDL.textContent = `${days}d ${hours}h ${mins}m`;
  }

  try {
    const url  = `${CONFIG.GAS_WEB_APP_URL}?action=debug`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === 'ok') {
      const accSheet = (data.sheets || []).find(s => s.name === 'Accesos');
      const prnSheet = (data.sheets || []).find(s => s.name === 'Pronósticos (IA)');
      statPart.textContent  = accSheet  ? Math.max(0, accSheet.rows  - 1) : '--';
      statPreds.textContent = prnSheet  ? Math.max(0, prnSheet.rows - 1) : '--';
    }
  } catch (_) {
    statPart.textContent  = 'err';
    statPreds.textContent = 'err';
  }
}

// ─── PRE-DEADLINE WARNING (2 HOURS BEFORE CLOSE) ────────────────

/**
 * Shows a blinking warning banner when within 2 hours of the deadline.
 * Updates the text with the remaining time; hides after deadline passes.
 */
function initDeadlineWarning() {
  const WARNING_MS = 2 * 60 * 60 * 1000; // 2 hours in ms
  const banner     = document.getElementById('pre-deadline-warning');
  const textEl     = document.getElementById('pre-deadline-text');

  function checkWarning() {
    const now  = new Date();
    const diff = CONFIG.DEADLINE - now;

    if (diff <= 0) {
      banner.style.display = 'none';
      return;
    }

    if (diff <= WARNING_MS) {
      const hours = Math.floor(diff / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const secs  = Math.floor((diff % 60000) / 1000);
      const timeStr = hours > 0
        ? `${hours}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`
        : `${mins}m ${String(secs).padStart(2,'0')}s`;

      textEl.textContent = `⚠️ ¡ATENCIÓN! El cierre de la Quiniela es en ${timeStr}. ` +
        `Tu ticket final se congela a las 15:00 EST. ¡Guarda tus pronósticos ahora!`;
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

  checkWarning();
  setInterval(checkWarning, 1000);
}
