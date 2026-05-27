/* ============================================================
   EL ÚLTIMO BAILE - MUNDIAL 2026 | script.js
   Serverless Web Quiniela - Full Logic Engine
   v2.1 - Fix: no-cors save, Recursos paths | 2026-05-20
   ============================================================ */

// ─── CONFIG ───────────────────────────────────────────────────
const CONFIG = {
  API_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' || !window.location.hostname
    ? 'http://localhost:5000/api'
    : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(window.location.hostname)
      ? `http://${window.location.hostname}:5000/api`
      : '/api',
  DEADLINE: new Date('2026-06-11T15:00:00-04:00'), // June 11, 2026 15:00 EST (UTC-4 in summer)
  COOLDOWN_SECONDS: 60,
  POLLING_INTERVAL: 6000
};

// ─── TRANSLATIONS ──────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    'login-title': 'MySportPrediction',
    'login-subtitle': 'Copa Mundial de la FIFA 2026™',
    'label-name': 'Nombre Completo',
    'label-email': 'Correo Electrónico',
    'label-key': 'Key de Acceso',
    'btn-enter': 'Ingresar a la Quiniela',
    'login-info': 'Para obtener una clave de acceso, contacta al administrador.',
    'hero-title': 'MySportPrediction',
    'hero-tagline': 'Nueva generación y análisis con agentes de IA en tiempo real',
    'greeting': '¡Hola, jugador!',
    'tab-label-predictions': 'Mis Pronósticos',
    'tab-label-leaderboard': 'Tabla General',
    'tab-label-tribute': 'El Último Baile',
    'deadline-label': 'Límite de Envío:',
    'save-panel-title': 'Guarda tus pronósticos en caliente',
    'save-panel-subtitle': 'Puedes modificar tus marcadores antes del inicio del torneo.',
    'btn-save-predictions': 'Guardar Pronósticos',
    'btn-export-pdf': 'Exportar PDF',
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
    'tab-label-rules': 'Reglas',
    'rules-subtitle': 'Nueva generación y análisis con agentes de IA en tiempo real — Sistema de Puntuación Oficial',
    'half1': '1er Tiempo',
    'half2': '2º Tiempo',
    'btts': 'Ambos Anotan (BTTS)',
    'cards-yellow': 'Amarillas',
    'cards-red': 'Rojas',
    'cards-label': 'Tarjetas',
    'btn-more': 'más',
    'btn-less': 'menos',
  },
  en: {
    'login-title': 'MySportPrediction',
    'login-subtitle': 'FIFA World Cup 2026™',
    'label-name': 'Full Name',
    'label-email': 'Email Address',
    'label-key': 'Access Key',
    'btn-enter': 'Enter the Pool',
    'login-info': 'Contact the admin to obtain your access key.',
    'hero-title': 'MySportPrediction',
    'hero-tagline': 'New generation and analysis with AI agents in real time',
    'greeting': 'Welcome, player!',
    'tab-label-predictions': 'My Predictions',
    'tab-label-leaderboard': 'Leaderboard',
    'tab-label-tribute': 'The Last Dance',
    'deadline-label': 'Submission Deadline:',
    'save-panel-title': 'Save your predictions live',
    'save-panel-subtitle': 'You can update your scores before the tournament starts.',
    'btn-save-predictions': 'Save Predictions',
    'btn-export-pdf': 'Export PDF',
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
    'tab-label-rules': 'Rules',
    'rules-subtitle': 'New Generation and Analysis with AI Agents in Real Time — Official Scoring System',
    'half1': '1st Half',
    'half2': '2nd Half',
    'btts': 'Both Teams Score (BTTS)',
    'cards-yellow': 'Yellows',
    'cards-red': 'Reds',
    'cards-label': 'Cards',
    'btn-more': 'more',
    'btn-less': 'less',
  },
  pt: {
    'login-title': 'MySportPrediction',
    'login-subtitle': 'Copa do Mundo da FIFA 2026™',
    'label-name': 'Nome Completo',
    'label-email': 'E-mail',
    'label-key': 'Chave de Acesso',
    'btn-enter': 'Entrar no Bolão',
    'login-info': 'Para obter uma chave de acesso, entre em contato com o administrador.',
    'hero-title': 'MySportPrediction',
    'hero-tagline': 'Nova geração e análise com agentes de IA em tempo real',
    'greeting': 'Olá, jogador!',
    'tab-label-predictions': 'Meus Palpites',
    'tab-label-leaderboard': 'Classificação Geral',
    'tab-label-tribute': 'A Última Dança',
    'deadline-label': 'Prazo de Envio:',
    'save-panel-title': 'Salve seus palpites em tempo real',
    'save-panel-subtitle': 'Você pode alterar seus placares antes do início do torneio.',
    'btn-save-predictions': 'Salvar Palpites',
    'btn-export-pdf': 'Exportar PDF',
    'filter-groups': 'Fase de Grupos',
    'filter-playoffs': 'Fase Eliminatória',
    'th-team': 'Equipe',
    'th-team-group': 'Equipe (Gr.)',
    'thirds-table-title': 'Supertabela de Terceiros',
    'thirds-table-desc': 'Os 8 melhores qualificam-se para os Dezesseis-avos.',
    'leaderboard-title': 'Classificação Geral',
    'leaderboard-desc': 'Consulte a pontuação ao vivo e o ranking de todos os participantes.',
    'stat-label-players': 'Jogadores Ativos',
    'stat-label-predictions': 'Palpites Totais',
    'stat-label-played': 'Partidas Jogadas',
    'leaderboard-table-header': 'Participantes',
    'th-rank': 'Posição', 'th-name': 'Jogador', 'th-points': 'Pontos', 'th-actions': 'Detalhes',
    'tribute-title': 'A Última Dança',
    'tribute-desc': 'Uma homenagem ao legado de três gigantes em sua provável última Copa do Mundo.',
    'messi-status': 'A Lenda Eterna',
    'cr7-status': 'O Comandante',
    'neymar-status': 'O Mago do Jogo Bonito',
    'tribute-label-cups': 'Copas do Mundo',
    'tribute-label-titles': 'Títulos',
    'tribute-timeline-label': 'Progresso na Copa do Mundo de 2026',
    'tribute-timeline-messi': 'Pronto para estrear contra a África do Sul',
    'tribute-timeline-cr7': 'Preparado para a estreia no Grupo K',
    'tribute-timeline-neymar': 'Pronto para brilhar no Grupo C',
    'detail-label-points': 'Pontos Totais',
    'detail-label-perfect': 'Placar Exato (+5)',
    'detail-label-winner': 'Resultado Simples (+3)',
    'th-match': 'Partida', 'th-prediction': 'Palpite', 'th-real': 'Real', 'th-pts-short': 'Pts',
    'login-loading': 'Verificando acesso...',
    'login-error-fields': 'Por favor, preencha todos os campos.',
    'login-error-key': 'E-mail ou Chave de Acesso inválidos. Tente novamente.',
    'login-error-network': 'Erro de rede. Verifique sua conexão com a Internet.',
    'save-success': '✅ Palpites salvos com sucesso!',
    'save-error': '❌ Erro ao salvar. Tente novamente em alguns segundos.',
    'deadline-expired': '🔒 O prazo para inserir palpites terminou.',
    'cooldown-msg': 'Você poderá salvar novamente em',
    'stage-r32': 'Dezesseis-avos de Final',
    'stage-r16': 'Oitavas de Final',
    'stage-qf': 'Quartas de Final',
    'stage-sf': 'Semifinais',
    'stage-3rd': 'Terceiro Lugar',
    'stage-final': '🏆 Grande Final',
    'tbd': 'A definir',
    'tab-label-rules': 'Regras',
    'rules-subtitle': 'Nova geração e análise com agentes de IA em tempo real — Sistema de Pontuação Oficial',
    'half1': '1º Tempo',
    'half2': '2º Tempo',
    'btts': 'Ambas Marcam (BTTS)',
    'cards-yellow': 'Amarelos',
    'cards-red': 'Vermelhos',
    'cards-label': 'Cartões',
    'btn-more': 'mais',
    'btn-less': 'menos',
  }
};;

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
const GROUP_TEAMS_PT = {
  A: ['México','África do Sul','Coreia do Sul','República Tcheca'],
  B: ['Canadá','Bósnia e Herzegovina','Catar','Suíça'],
  C: ['Brasil','Marrocos','Haiti','Escócia'],
  D: ['Estados Unidos','Paraguai','Austrália','Turquia'],
  E: ['Alemanha','Curaçao','Costa do Marfim','Equador'],
  F: ['Países Baixos','Japão','Suécia','Tunísia'],
  G: ['Bélgica','Egito','Irã','Nova Zelândia'],
  H: ['Espanha','Cabo Verde','Arábia Saudita','Uruguai'],
  I: ['França','Senegal','Iraque','Noruega'],
  J: ['Argentina','Argélia','Áustria','Jordânia'],
  K: ['Portugal','RD Congo','Uzbequistão','Colômbia'],
  L: ['Inglaterra','Croácia','Gana','Panamá'],
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
let tempRegData = null; // Stored registration fields during VIP checkout
let currentLang = 'es';
let currentTheme = 'dark';
let activeGroup = 'A';
let activeStage = 'groups';
let predictions = {}; // { matchId: { h: 0, a: 0 } }
let leaderboardData = [];
let matchResultsData = [];
let lastPrizePool = 0;
let lastActiveParticipants = 0;
let lastCostPerParticipant = 10;
let cooldownTimer = null;
let cooldownRemaining = 0;
let countdownInterval = null;
let currentSpreadsheetId = null;
let activeSpreadsheetId = 'GLOBAL_LIGA_2026';
let currentQuinielaType = 'Completa';
let allGroupMatchesPlayed = false;
let dailyTimerInterval = null;function getPredictionsKey() {
  if (!currentUser) return 'quinielaPreds_guest';
  return `quinielaPreds_${currentSpreadsheetId || 'GLOBAL_LIGA_2026'}_${currentUser.email}`;
}

async function syncPredictionsWithServer() {
  if (!currentUser) return;
  try {
    const email = currentUser.email;
    const leagueId = currentSpreadsheetId || 'GLOBAL_LIGA_2026';
    const url = `${CONFIG.API_URL}?action=playerDetail&name=${encodeURIComponent(email)}&spreadsheetId=${encodeURIComponent(leagueId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.status === 'ok' && data.predictions) {
      const serverPreds = {};
      data.predictions.forEach(p => {
        if (p.id) {
          serverPreds[p.id] = {
            h: p.predH !== undefined ? p.predH : 0,
            a: p.predA !== undefined ? p.predA : 0,
            ht1h: 0,
            ht1a: 0,
            ht2h: 0,
            ht2a: 0,
            btts: false,
            yc: 0,
            rc: 0
          };
        }
      });
      predictions = serverPreds;
      localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
      
      const activeSec = document.querySelector('.content-section.active');
      if (activeSec && activeSec.id === 'sec-pronosticos') {
        if (activeStage === 'groups') {
          renderGroupMatches(activeGroup);
        } else {
          renderPlayoffMatches();
        }
        if (activeStage === 'groups') {
          updateStandingsPanel(activeGroup);
          updateBestThirdsPanel();
        }
      }
    }
  } catch (err) {
    console.error('[Sync] Error syncing predictions:', err);
  }
}

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
    activeSpreadsheetId = localStorage.getItem('activeSpreadsheetId') || currentUser.spreadsheetId || 'GLOBAL_LIGA_2026';
    currentSpreadsheetId = activeSpreadsheetId;
    currentQuinielaType = currentUser.type || 'Completa';
    
    // Direct load layout (no transitions for session restore)
    const appEl = document.getElementById('app-content');
    const logoutBtn = document.getElementById('logout-btn');
    document.getElementById('landing-screen').classList.add('hidden');
    appEl.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');

    // Set welcome header
    updateUserHeaderUI();
    
    // Check and apply pending invites on session restore
    checkAndApplyPendingInvite().then(() => {
      loadUserPrivateLeagues();
    });
    
    // Load predictions
    const saved = localStorage.getItem(getPredictionsKey());
    if (saved) {
      predictions = JSON.parse(saved);
    } else {
      predictions = {};
    }
    syncPredictionsWithServer();

    switchFixtureStage('groups');
    updateStandingsPanel('A');
    updateBestThirdsPanel();
    initCountdown();
    checkDeadline();
    initDeadlineWarning();
    loadLeaderboard();
    updatePaywalls();
    loadAndApplyBranding();
    setTimeout(initMatchAnimations, 200);
  } else {
    // Open directly in Guest mode!
    initGuestSession();
  }

  // Group wheel scroll binding
  const matchesContainer = document.getElementById('matches-container');
  if (matchesContainer) {
    matchesContainer.addEventListener('wheel', (e) => {
      if (activeStage === 'groups') {
        const idx = GROUPS.indexOf(activeGroup);
        const delta = e.deltaY;
        
        const atBottom = matchesContainer.scrollTop + matchesContainer.clientHeight >= matchesContainer.scrollHeight - 5;
        const atTop = matchesContainer.scrollTop <= 5;
        
        if (delta > 0 && atBottom && idx < GROUPS.length - 1) {
          e.preventDefault();
          handleGroupWheelScroll(e);
        } else if (delta < 0 && atTop && idx > 0) {
          e.preventDefault();
          handleGroupWheelScroll(e);
        }
      }
    }, { passive: false });
  }

  // Start 3D Engine
  initThreeJS();
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
  currentLang = currentLang === 'es' ? 'en' : (currentLang === 'en' ? 'pt' : 'es');
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.getElementById('lang-btn-text').textContent = lang === 'es' ? 'EN' : (lang === 'en' ? 'PT' : 'ES');
  document.documentElement.lang = lang;
  // Update group/stage labels if matches already rendered
  if (activeStage === 'groups') renderGroupMatches(activeGroup);
  else renderPlayoffMatches();
  updateStandingsPanel(activeGroup);
  
  if (typeof lastPrizePool !== 'undefined') {
    updatePrizePool(lastPrizePool, lastActiveParticipants, lastCostPerParticipant);
  }
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

// ─── SCREEN TRANSITIONS & ROLE FLOWS ────────────────────────────
function animateScreenTransition(fromId, toId, direction = 'next') {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  if (!fromEl || !toEl) return;

  const xOffset = direction === 'next' ? 40 : -40;

  gsap.to(fromEl, {
    opacity: 0,
    x: -xOffset,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => {
      fromEl.classList.add('hidden');
      gsap.set(fromEl, { x: 0 }); // reset

      toEl.classList.remove('hidden');
      gsap.set(toEl, { opacity: 0, x: xOffset });

      gsap.to(toEl, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });
}

function showLandingScreen() {
  const activeGate = !document.getElementById('login-gate').classList.contains('hidden') 
    ? 'login-gate' 
    : 'organizer-gate';
  animateScreenTransition(activeGate, 'landing-screen', 'prev');
}

function showParticipantLogin() {
  animateScreenTransition('landing-screen', 'login-gate', 'next');
}

function showOrganizerLogin() {
  animateScreenTransition('landing-screen', 'organizer-gate', 'next');
  switchOrgAction('create');
}

function switchOrgAction(action) {
  const tabCreate = document.getElementById('org-tab-create');
  const tabLogin = document.getElementById('org-tab-login');
  const formCreate = document.getElementById('org-create-form');
  const formLogin = document.getElementById('org-login-form');
  
  if (action === 'create') {
    tabCreate.classList.add('active');
    tabLogin.classList.remove('active');
    formCreate.classList.remove('hidden');
    formLogin.classList.add('hidden');
  } else {
    tabCreate.classList.remove('active');
    tabLogin.classList.add('active');
    formCreate.classList.add('hidden');
    formLogin.classList.remove('hidden');
  }
  document.getElementById('org-error').classList.add('hidden');
}

function toggleOrgMontoField(checkbox) {
  const container = document.getElementById('org-monto-container');
  const input = document.getElementById('org-monto-inscripcion');
  if (container) {
    if (checkbox.checked) {
      container.classList.remove('hidden');
      if (input) input.required = true;
    } else {
      container.classList.add('hidden');
      if (input) {
        input.required = false;
        input.value = '';
      }
    }
  }
}

function toggleModalMontoField(checkbox) {
  const container = document.getElementById('modal-monto-container');
  const input = document.getElementById('modal-monto-inscripcion');
  if (container) {
    if (checkbox.checked) {
      container.classList.remove('hidden');
      if (input) input.required = true;
    } else {
      container.classList.add('hidden');
      if (input) {
        input.required = false;
        input.value = '';
      }
    }
  }
}

function selectBillingLevel(level) {
  const freeCard = document.getElementById('billing-free');
  const premCard = document.getElementById('billing-premium');
  const privCard = document.getElementById('billing-private');
  const levelInput = document.getElementById('org-level');
  
  freeCard.classList.remove('active');
  premCard.classList.remove('active');
  if (privCard) privCard.classList.remove('active');
  
  if (level === 'Gratuita') {
    freeCard.classList.add('active');
    levelInput.value = 'Gratuita';
  } else if (level === 'Premium') {
    premCard.classList.add('active');
    levelInput.value = 'Premium';
  } else if (level === 'Privada') {
    if (privCard) privCard.classList.add('active');
    levelInput.value = 'Privada';
  }

  // Toggle private options container in main form
  const privateOptions = document.getElementById('org-private-options');
  const contractCheckbox = document.getElementById('org-acepta-contrato');
  const tienePozo = document.getElementById('org-tiene-pozo');
  const montoContainer = document.getElementById('org-monto-container');
  const montoVal = document.getElementById('org-monto-inscripcion');
  
  if (level === 'Privada') {
    if (privateOptions) privateOptions.classList.remove('hidden');
    if (contractCheckbox) contractCheckbox.required = true;
  } else {
    if (privateOptions) privateOptions.classList.add('hidden');
    if (contractCheckbox) {
      contractCheckbox.required = false;
      contractCheckbox.checked = false;
    }
    if (tienePozo) tienePozo.checked = false;
    if (montoContainer) montoContainer.classList.add('hidden');
    if (montoVal) {
      montoVal.required = false;
      montoVal.value = '';
    }
  }
}

let createdQuinielaData = null;

async function handleCreateQuiniela(e) {
  e.preventDefault();
  const email = document.getElementById('org-create-email').value.trim().toLowerCase();
  const type = document.querySelector('input[name="org-type"]:checked').value;
  const level = document.getElementById('org-level').value;
  const btn = document.getElementById('org-create-submit');
  const errEl = document.getElementById('org-error');

  if (!email) {
    errEl.textContent = 'Ingresa un correo electrónico.';
    errEl.classList.remove('hidden');
    return;
  }

  let tienePozo = 'false';
  let montoInscripcion = '0';
  let aceptaContrato = 'false';

  if (level === 'Privada') {
    const pozoEl = document.getElementById('org-tiene-pozo');
    const montoEl = document.getElementById('org-monto-inscripcion');
    const contratoEl = document.getElementById('org-acepta-contrato');

    tienePozo = (pozoEl && pozoEl.checked) ? 'true' : 'false';
    montoInscripcion = (montoEl && pozoEl.checked) ? montoEl.value.trim() : '0';
    aceptaContrato = (contratoEl && contratoEl.checked) ? 'true' : 'false';

    if (!contratoEl || !contratoEl.checked) {
      errEl.textContent = 'Debe aceptar los términos de responsabilidad de la quiniela privada.';
      errEl.classList.remove('hidden');
      return;
    }
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creando Quiniela...`;
  errEl.classList.add('hidden');

  try {
    const url = `${CONFIG.API_URL}?action=createQuiniela&email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}&nivel=${encodeURIComponent(level)}&tiene_pozo=${tienePozo}&monto_inscripcion=${encodeURIComponent(montoInscripcion)}&acepta_contrato=${aceptaContrato}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'ok') {
      createdQuinielaData = {
        name: 'Administrador',
        email: email,
        key: data.key,
        spreadsheetId: data.spreadsheetId,
        type: data.type,
        role: 'Organizador',
        rango: (data.nivel === 'Premium' || data.nivel === 'Privada') ? 'VIP' : 'F2P',
        nivel: data.nivel
      };

      document.getElementById('success-org-key').textContent = data.key;
      document.getElementById('success-quiniela-type').textContent = data.type === 'Por fase' ? 'Por fase' : 'Completa';
      
      // Hide Google Sheet url container as we are completely database/SQLite now
      const urlContainer = document.getElementById('success-sheet-url');
      if (urlContainer && urlContainer.parentNode) {
        urlContainer.parentNode.style.display = 'none';
      }

      document.getElementById('organizer-gate').classList.add('hidden');
      document.getElementById('success-overlay').classList.remove('hidden');
    } else {
      if (data.code === 'VIP_REQUIRED') {
        errEl.innerHTML = `${data.message} <br><button class="btn btn-xs btn-gold mt-2" onclick="openCheckoutModal(); event.preventDefault();"><i class="fa-solid fa-gem"></i> Adquirir Pase VIP</button>`;
      } else {
        errEl.textContent = data.message || 'Error al crear la quiniela.';
      }
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = `<span>Crear Quiniela</span> <i class="fa-solid fa-plus"></i>`;
    }
  } catch (err) {
    errEl.textContent = 'Error de red: ' + err.message;
    errEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = `<span>Crear Quiniela</span> <i class="fa-solid fa-plus"></i>`;
  }
}

async function handleOrganizerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('org-login-email').value.trim().toLowerCase();
  const key = document.getElementById('org-login-key').value.trim();
  const btn = document.getElementById('org-login-submit');
  const errEl = document.getElementById('org-error');

  if (!email || !key) {
    errEl.textContent = 'Completa todos los campos.';
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Iniciando sesión...`;
  errEl.classList.add('hidden');

  try {
    const url = `${CONFIG.API_URL}?action=validate&email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.valid && data.role === 'Organizador') {
      currentUser = {
        name: data.nombre,
        email: email,
        key: key,
        spreadsheetId: data.spreadsheetId,
        type: data.type,
        role: data.role,
        rango: data.rango || 'F2P',
        nivel: data.nivel || 'Gratuita'
      };
      activeSpreadsheetId = data.spreadsheetId || 'GLOBAL_LIGA_2026';
      currentSpreadsheetId = activeSpreadsheetId;
      localStorage.setItem('activeSpreadsheetId', activeSpreadsheetId);
      currentQuinielaType = data.type;

      sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
      document.getElementById('organizer-gate').classList.add('hidden');
      showApp();
    } else {
      errEl.textContent = data.message || 'Credenciales de organizador inválidas o no eres administrador de esta quiniela.';
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = `<span>Acceder al Panel</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
  } catch (err) {
    errEl.textContent = 'Error de red: ' + err.message;
    errEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = `<span>Acceder al Panel</span> <i class="fa-solid fa-arrow-right"></i>`;
  }
}

function enterCreatedQuiniela() {
  if (createdQuinielaData) {
    currentUser = createdQuinielaData;
    activeSpreadsheetId = createdQuinielaData.spreadsheetId || 'GLOBAL_LIGA_2026';
    currentSpreadsheetId = activeSpreadsheetId;
    localStorage.setItem('activeSpreadsheetId', activeSpreadsheetId);
    currentQuinielaType = createdQuinielaData.type;
    sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
    document.getElementById('success-overlay').classList.add('hidden');
    showApp();
  }
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
    const url = `${CONFIG.API_URL}?action=validate&email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&nombre=${encodeURIComponent(name)}`;
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
    currentUser = {
      name: data.nombre || name,
      email: email,
      key: key,
      spreadsheetId: data.spreadsheetId,
      type: data.type,
      role: data.role || 'Participante',
      rango: data.rango || 'F2P',
      nivel: data.nivel || 'Gratuita'
    };
    activeSpreadsheetId = data.spreadsheetId || 'GLOBAL_LIGA_2026';
    currentSpreadsheetId = activeSpreadsheetId;
    localStorage.setItem('activeSpreadsheetId', activeSpreadsheetId);
    currentQuinielaType = data.type || 'Completa';

    sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));

    // Hide login gate
    document.getElementById('login-gate').classList.add('hidden');
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
  currentSpreadsheetId = null;
  currentQuinielaType = 'Completa';
  allGroupMatchesPlayed = false;
  
  // Return directly to guest session on the dashboard
  initGuestSession();

  if (document.getElementById('login-form')) document.getElementById('login-form').reset();
  updateAvatarUI(null);
  const adminTab = document.getElementById('tab-admin');
  if (adminTab) adminTab.style.display = 'none';
}

let chatPollInterval = null;

function updateUserHeaderUI() {
  if (!currentUser) {
    document.getElementById('header-user-name').textContent = 'Invitado (Sin Registrar)';
    document.getElementById('header-avatar').textContent = 'G';
    const tierBadge = document.getElementById('user-tier-badge');
    if (tierBadge) {
      tierBadge.textContent = 'GUEST';
      tierBadge.className = 'badge-tier F2P';
      tierBadge.style.background = '#4b5563';
    }
    const bannerBtn = document.getElementById('upgrade-vip-banner-btn');
    if (bannerBtn) {
      bannerBtn.style.display = 'inline-flex';
      bannerBtn.className = 'btn btn-xs btn-primary mt-1';
      bannerBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Registrarse / Ingresar';
      bannerBtn.onclick = () => openAuthModal('register');
    }
    const createBtn = document.getElementById('create-quiniela-banner-btn');
    if (createBtn) {
      createBtn.style.display = 'inline-flex';
      createBtn.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Crear Quiniela <span style="color: var(--accent-gold); font-weight: 800; margin-left: 0.25rem;">VIP</span>';
      createBtn.onclick = () => openCheckoutModal();
    }

    // Update floating header controls
    const loginIconBtn = document.getElementById('header-login-btn');
    if (loginIconBtn) loginIconBtn.style.display = 'inline-flex';
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.classList.add('hidden');

    // Update context toggle
    updateContextToggleBtn();
    const joinBtn = document.getElementById('join-quiniela-btn');
    if (joinBtn) joinBtn.style.display = 'none';
    return;
  }

  // Logged in user
  document.getElementById('header-user-name').textContent = currentUser.name;
  
  const savedAvatar = localStorage.getItem(`quinielaAvatar_${currentUser.email}`);
  updateAvatarUI(savedAvatar);

  const isVip = currentUser.rango === 'VIP';
  const tierBadge = document.getElementById('user-tier-badge');
  if (tierBadge) {
    tierBadge.textContent = isVip ? 'VIP' : 'F2P';
    tierBadge.className = `badge-tier ${isVip ? 'VIP' : 'F2P'}`;
    tierBadge.style.background = ''; // reset guest background
  }

  const upgradeBtn = document.getElementById('upgrade-vip-banner-btn');
  if (upgradeBtn) {
    upgradeBtn.style.display = isVip ? 'none' : 'inline-flex';
    upgradeBtn.className = 'btn btn-xs btn-gold';
    upgradeBtn.innerHTML = '<i class="fa-solid fa-gem"></i> Obtener Pase VIP';
    upgradeBtn.onclick = () => openCheckoutModal();
  }

  const createBtn = document.getElementById('create-quiniela-banner-btn');
  if (createBtn) {
    if (isVip) {
      createBtn.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Crear Quiniela';
      createBtn.onclick = () => openCreateQuinielaModal();
      createBtn.style.display = 'inline-flex';
    } else {
      createBtn.style.display = 'inline-flex';
      createBtn.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Crear Quiniela <span style="color: var(--accent-gold); font-weight: 800; margin-left: 0.25rem;">VIP</span>';
      createBtn.onclick = () => openCheckoutModal();
    }
  }
  updateAdminTabVisibility();

  // Update floating header controls
  const loginIconBtn = document.getElementById('header-login-btn');
  if (loginIconBtn) loginIconBtn.style.display = 'none';
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.classList.remove('hidden');

  // Update context toggle
  updateContextToggleBtn();
  
  // Show join quiniela button for logged-in users
  const joinBtn = document.getElementById('join-quiniela-btn');
  if (joinBtn) {
    joinBtn.style.display = 'inline-flex';
  }
}

function showApp() {
  const appEl = document.getElementById('app-content');
  if (appEl) appEl.classList.remove('hidden');

  // Show rules FAB
  const rulesFab = document.getElementById('rules-fab');
  if (rulesFab) rulesFab.style.display = '';

  // Hide login gates entirely
  const loginGate = document.getElementById('login-gate');
  if (loginGate) loginGate.classList.add('hidden');
  const orgGate = document.getElementById('organizer-gate');
  if (orgGate) orgGate.classList.add('hidden');
  const landingScreen = document.getElementById('landing-screen');
  if (landingScreen) landingScreen.classList.add('hidden');

  // ── Admin tab: visible for Organizador role or the hardcoded admin ─────
  // This runs on fresh login AND on session restore from sessionStorage
  const adminTab = document.getElementById('tab-admin');
  if (adminTab) {
    const isAdmin = currentUser.email === '2026quiniela2026@gmail.com' ||
                    currentUser.role === 'Organizador';
    adminTab.style.display = isAdmin ? '' : 'none';
  }

  // Set welcome header and update tier / options
  updateUserHeaderUI();

  // Apply pending invite and load private leagues
  checkAndApplyPendingInvite().then(() => {
    loadUserPrivateLeagues();
  });

  // Load predictions from localStorage (autosave)
  const saved = localStorage.getItem(getPredictionsKey());
  if (saved) {
    predictions = JSON.parse(saved);
  } else {
    predictions = {};
  }
  syncPredictionsWithServer();

  // Render initial view
  switchFixtureStage('groups');
  updateStandingsPanel('A');
  updateBestThirdsPanel();
  initCountdown();
  checkDeadline();
  initDeadlineWarning();   // ← pre-close blinking alert
  loadLeaderboard();
  
  // Apply premium paywalls and custom branding
  updatePaywalls();
  loadAndApplyBranding();
  
  setTimeout(initMatchAnimations, 200);
}

// ─── TAB NAVIGATION ────────────────────────────────────────────
function switchTab(tab) {
  const VIP_TABS = ['chat', 'analytics', 'tribute'];
  const isVip = currentUser && currentUser.rango === 'VIP';

  // Block unauthenticated users
  if (!currentUser) {
    if (tab === 'chat' || tab === 'analytics' || tab === 'tribute' || tab === 'admin') {
      openAuthModal('register', 'Regístrate o inicia sesión para acceder a las secciones premium.');
      return;
    }
  }

  // Block F2P users from VIP sections — redirect to upgrade modal
  if (currentUser && !isVip && VIP_TABS.includes(tab)) {
    openCheckoutModal();
    return;
  }

  const prevActiveSec = document.querySelector('.content-section.active');
  const targetSec = document.getElementById(`sec-${tab}`);
  if (!prevActiveSec || !targetSec || prevActiveSec === targetSec) {
    toggleTabClasses(tab);
    return;
  }

  const tabsNav = document.querySelector('.tab-navigation');
  if (tabsNav) tabsNav.style.pointerEvents = 'none';

  gsap.to(prevActiveSec, {
    opacity: 0,
    x: -15,
    duration: 0.22,
    ease: 'power2.in',
    onComplete: () => {
      prevActiveSec.classList.remove('active');
      gsap.set(prevActiveSec, { x: 0 }); // reset position

      toggleTabClasses(tab);

      targetSec.classList.add('active');
      gsap.set(targetSec, { opacity: 0, x: 15 });

      gsap.to(targetSec, {
        opacity: 1,
        x: 0,
        duration: 0.38,
        ease: 'power2.out',
        onComplete: () => {
          if (tabsNav) tabsNav.style.pointerEvents = 'auto';
        }
      });
    }
  });

  // Clear any active chat polling
  if (chatPollInterval) {
    clearInterval(chatPollInterval);
    chatPollInterval = null;
  }
  
  if (tab !== 'leaderboard' && tab !== 'admin-quiniela') {
    currentSpreadsheetId = activeSpreadsheetId;
  }

  if (tab === 'leaderboard') {
    loadLeaderboard();
  } else if (tab === 'admin-quiniela') {
    loadPrivateAdminPanel();
  } else if (tab === 'admin') {
    refreshAdminStats();
  } else if (tab === 'chat') {
    updatePaywalls();
    loadChatMessages();
    // Start chat message polling every 6s for VIPs
    if (currentUser && currentUser.rango === 'VIP') {
      chatPollInterval = setInterval(loadChatMessages, CONFIG.POLLING_INTERVAL);
    }
  } else if (tab === 'analytics') {
    updatePaywalls();
    if (currentUser && currentUser.rango === 'VIP') {
      loadSocialTrends();
    }
  } else if (tab === 'tribute') {
    updatePaywalls();
  }
}

function toggleTabClasses(tab) {
  const ALL_TABS = ['predictions','leaderboard','tribute','admin','chat','analytics','admin-quiniela','rules'];
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
      if (g !== activeGroup) {
        switchGroupWithGSAP(g);
      }
    };
    container.appendChild(btn);
  });
}

let lastWheelTime = 0;
const wheelCooldown = 700;

function handleGroupWheelScroll(e) {
  if (activeStage !== 'groups') return;
  const now = Date.now();
  if (now - lastWheelTime < wheelCooldown) return;

  const delta = e.deltaY;
  const idx = GROUPS.indexOf(activeGroup);

  if (delta > 0) {
    // Scroll down -> next group
    if (idx < GROUPS.length - 1) {
      lastWheelTime = now;
      const nextGroup = GROUPS[idx + 1];
      switchGroupWithGSAP(nextGroup);
    }
  } else if (delta < 0) {
    // Scroll up -> prev group
    if (idx > 0) {
      lastWheelTime = now;
      const prevGroup = GROUPS[idx - 1];
      switchGroupWithGSAP(prevGroup);
    }
  }
}

function switchGroupWithGSAP(nextGroup) {
  const cards = document.querySelectorAll('#matches-container .match-card');
  
  // De-activate current group buttons
  document.querySelectorAll('.group-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === nextGroup);
  });
  
  if (cards.length > 0) {
    gsap.to(cards, {
      opacity: 0,
      x: -30,
      stagger: 0.04,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        activeGroup = nextGroup;
        renderGroupMatches(nextGroup);
        updateStandingsPanel(nextGroup);
        
        // Target new cards
        const newCards = document.querySelectorAll('#matches-container .match-card');
        gsap.fromTo(newCards, 
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out' }
        );
      }
    });
  } else {
    activeGroup = nextGroup;
    renderGroupMatches(nextGroup);
    updateStandingsPanel(nextGroup);
  }
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
  updatePlayoffLockState();
}

// ─── RENDER GROUP MATCHES ───────────────────────────────────────
function renderGroupMatches(group) {
  activeGroup = group;
  const matches = GROUP_MATCHES.filter(m => m.g === group);
  const container = document.getElementById('matches-container');
  const titleEl = document.getElementById('current-stage-title');
  titleEl.textContent = (currentLang === 'es' || currentLang === 'pt') ? `Fase de Grupos - Grupo ${group}` : `Group Stage - Group ${group}`;

  container.innerHTML = '';
  matches.forEach((m, idx) => {
    const pred = predictions[m.id] || { h: 0, a: 0, ht1h: 0, ht1a: 0, ht2h: 0, ht2a: 0, btts: false, yc: 0, rc: 0 };
    const hName = currentLang === 'es' ? m.h : (currentLang === 'pt' ? (GROUP_TEAMS_PT[m.g][GROUP_TEAMS[m.g].indexOf(m.h)] || m.h) : (GROUP_TEAMS_EN[m.g][GROUP_TEAMS[m.g].indexOf(m.h)] || m.h));
    const aName = currentLang === 'es' ? m.a : (currentLang === 'pt' ? (GROUP_TEAMS_PT[m.g][GROUP_TEAMS[m.g].indexOf(m.a)] || m.a) : (GROUP_TEAMS_EN[m.g][GROUP_TEAMS[m.g].indexOf(m.a)] || m.a));
    const sta = (currentLang === 'es' || currentLang === 'pt') ? m.sta : m.sta_en;

    const card = document.createElement('div');
    card.className = 'match-card card';
    card.dataset.matchId = m.id;
    card.innerHTML = `
      <div class="match-card-header">
        <div class="match-meta">
          <span class="match-date-tag"><i class="fa-regular fa-calendar"></i> ${m.d}</span>
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
        <span class="stadium-info"><i class="fa-solid fa-location-dot"></i> ${sta} — ${m.t} EST</span>
        ${activeSpreadsheetId === 'GLOBAL_LIGA_2026' ? `
        <button class="msp-toggle-btn" onclick="toggleMspExtended('${m.id}')" id="msp-toggle-${m.id}">
          <span class="toggle-text">${t('btn-more')}</span> <i class="fa-solid fa-chevron-right"></i>
        </button>
        ` : ''}
      </div>
      ${activeSpreadsheetId === 'GLOBAL_LIGA_2026' ? `
      <div class="msp-extended-fields">
        <div class="msp-row">
          <span class="msp-label"><i class="fa-solid fa-hourglass-half" style="color:#60a5fa;"></i> ${t('half1')}</span>
          <div class="msp-score-pair">
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1h',-1)">−</button>
              <span class="msp-goal-display" id="msp-ht1h-${m.id}">${pred.ht1h||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1h',+1)">+</button>
            </div>
            <span class="msp-vs">-</span>
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1a',-1)">−</button>
              <span class="msp-goal-display" id="msp-ht1a-${m.id}">${pred.ht1a||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1a',+1)">+</button>
            </div>
          </div>
        </div>
        <div class="msp-row">
          <span class="msp-label"><i class="fa-solid fa-hourglass-end" style="color:#a78bfa;"></i> ${t('half2')}</span>
          <div class="msp-score-pair">
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2h',-1)">−</button>
              <span class="msp-goal-display" id="msp-ht2h-${m.id}">${pred.ht2h||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2h',+1)">+</button>
            </div>
            <span class="msp-vs">-</span>
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2a',-1)">−</button>
              <span class="msp-goal-display" id="msp-ht2a-${m.id}">${pred.ht2a||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2a',+1)">+</button>
            </div>
          </div>
        </div>
        <div class="msp-row">
          <span class="msp-label"><i class="fa-solid fa-toggle-on" style="color:#34d399;"></i> ${t('btts')}</span>
          <button class="msp-btts-btn ${pred.btts ? 'active' : ''}" id="msp-btts-${m.id}" onclick="toggleBtts('${m.id}')">${pred.btts ? 'Sí / Yes' : 'No'}</button>
        </div>
        <div class="msp-row">
          <span class="msp-label"><i class="fa-solid fa-square" style="color:#ecd06f;"></i> ${t('cards-yellow')}</span>
          <div class="msp-goal-control">
            <button class="msp-goal-btn" onclick="changeMspField('${m.id}','yc',-1)">−</button>
            <span class="msp-goal-display" id="msp-yc-${m.id}">${pred.yc||0}</span>
            <button class="msp-goal-btn" onclick="changeMspField('${m.id}','yc',+1)">+</button>
          </div>
        </div>
        <div class="msp-row">
          <span class="msp-label"><i class="fa-solid fa-square" style="color:#ef4444;"></i> ${t('cards-red')}</span>
          <div class="msp-goal-control">
            <button class="msp-goal-btn" onclick="changeMspField('${m.id}','rc',-1)">−</button>
            <span class="msp-goal-display" id="msp-rc-${m.id}">${pred.rc||0}</span>
            <button class="msp-goal-btn" onclick="changeMspField('${m.id}','rc',+1)">+</button>
          </div>
        </div>
      </div>
      ` : ''}`, 
    container.appendChild(card);
  });

  setTimeout(initMatchAnimations, 50);
  updateStandingsPanel(group);

  // ── Auto-advance to next group when last card scrolls into view ──
  setTimeout(() => {
    const cards = container.querySelectorAll('.match-card');
    if (!cards.length || activeStage !== 'groups') return;
    const lastCard = cards[cards.length - 1];

    const advanceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        advanceObserver.disconnect();
        const idx = GROUPS.indexOf(activeGroup);
        const nextGroup = GROUPS[(idx + 1) % GROUPS.length];
        // Small delay so user sees the last card before switching
        setTimeout(() => {
          activeGroup = nextGroup;
          document.querySelectorAll('.group-btn').forEach(b => {
            b.classList.toggle('active', b.textContent.trim() === nextGroup);
          });
          renderGroupMatches(nextGroup);
          updateStandingsPanel(nextGroup);
        }, 600);
      });
    }, { root: container, threshold: 1.0 });

    advanceObserver.observe(lastCard);
  }, 200);
}

// ─── RENDER PLAYOFF MATCHES ─────────────────────────────────────
function renderPlayoffMatches() {
  const container = document.getElementById('matches-container');
  const titleEl = document.getElementById('current-stage-title');
  titleEl.textContent = currentLang === 'es' ? 'Fase Eliminatoria' : (currentLang === 'pt' ? 'Fase Eliminatória' : 'Knockout Stage');
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
      const pred = predictions[m.id] || { h: 0, a: 0, ht1h: 0, ht1a: 0, ht2h: 0, ht2a: 0, btts: false, yc: 0, rc: 0 };
      const sta = (currentLang === 'es' || currentLang === 'pt') ? m.sta : m.sta_en;

      const card = document.createElement('div');
      card.className = 'match-card playoff card';
      card.dataset.matchId = m.id;
      card.innerHTML = `
        <div class="match-card-header">
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
          <span class="stadium-info"><i class="fa-solid fa-location-dot"></i> ${sta}${m.t ? ' — ' + m.t + ' EST' : ''}</span>
          ${activeSpreadsheetId === 'GLOBAL_LIGA_2026' ? `
          <button class="msp-toggle-btn" onclick="toggleMspExtended('${m.id}')" id="msp-toggle-${m.id}">
            <span class="toggle-text">${t('btn-more')}</span> <i class="fa-solid fa-chevron-right"></i>
          </button>
          ` : ''}
        </div>
        ${activeSpreadsheetId === 'GLOBAL_LIGA_2026' ? `
        <div class="msp-extended-fields">
          <div class="msp-row">
            <span class="msp-label"><i class="fa-solid fa-hourglass-half" style="color:#60a5fa;"></i> ${t('half1')}</span>
            <div class="msp-score-pair">
              <div class="msp-goal-control">
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1h',-1)">−</button>
                <span class="msp-goal-display" id="msp-ht1h-${m.id}">${pred.ht1h||0}</span>
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1h',+1)">+</button>
              </div>
              <span class="msp-vs">-</span>
              <div class="msp-goal-control">
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1a',-1)">−</button>
                <span class="msp-goal-display" id="msp-ht1a-${m.id}">${pred.ht1a||0}</span>
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht1a',+1)">+</button>
              </div>
            </div>
          </div>
          <div class="msp-row">
            <span class="msp-label"><i class="fa-solid fa-hourglass-end" style="color:#a78bfa;"></i> ${t('half2')}</span>
            <div class="msp-score-pair">
              <div class="msp-goal-control">
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2h',-1)">−</button>
                <span class="msp-goal-display" id="msp-ht2h-${m.id}">${pred.ht2h||0}</span>
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2h',+1)">+</button>
              </div>
              <span class="msp-vs">-</span>
              <div class="msp-goal-control">
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2a',-1)">−</button>
                <span class="msp-goal-display" id="msp-ht2a-${m.id}">${pred.ht2a||0}</span>
                <button class="msp-goal-btn" onclick="changeMspField('${m.id}','ht2a',+1)">+</button>
              </div>
            </div>
          </div>
          <div class="msp-row">
            <span class="msp-label"><i class="fa-solid fa-toggle-on" style="color:#34d399;"></i> ${t('btts')}</span>
            <button class="msp-btts-btn ${pred.btts ? 'active' : ''}" id="msp-btts-${m.id}" onclick="toggleBtts('${m.id}')">${pred.btts ? 'Sí / Yes' : 'No'}</button>
          </div>
          <div class="msp-row">
            <span class="msp-label"><i class="fa-solid fa-square" style="color:#ecd06f;"></i> ${t('cards-yellow')}</span>
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','yc',-1)">−</button>
              <span class="msp-goal-display" id="msp-yc-${m.id}">${pred.yc||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','yc',+1)">+</button>
            </div>
          </div>
          <div class="msp-row">
            <span class="msp-label"><i class="fa-solid fa-square" style="color:#ef4444;"></i> ${t('cards-red')}</span>
            <div class="msp-goal-control">
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','rc',-1)">−</button>
              <span class="msp-goal-display" id="msp-rc-${m.id}">${pred.rc||0}</span>
              <button class="msp-goal-btn" onclick="changeMspField('${m.id}','rc',+1)">+</button>
            </div>
          </div>
        </div>
        ` : ''}`;
      container.appendChild(card);
    });
  });
  setTimeout(initMatchAnimations, 50);
  updatePlayoffLockState();
}

function updatePlayoffLockState() {
  const container = document.getElementById('matches-container');
  if (!container) return;

  const existingBanner = document.getElementById('playoff-lock-banner');
  if (existingBanner) existingBanner.remove();

  if (activeStage === 'playoffs' && currentQuinielaType === 'Por fase' && !allGroupMatchesPlayed) {
    container.classList.add('playoff-locked');
    container.querySelectorAll('.goal-btn').forEach(btn => {
      btn.disabled = true;
    });

    const banner = document.createElement('div');
    banner.id = 'playoff-lock-banner';
    banner.className = 'lock-banner';
    
    const msgEs = `🔒 Los Playoffs se desbloquearán una vez que concluyan todos los 72 partidos de la Fase de Grupos.`;
    const msgEn = `🔒 Knockout Stage will unlock once all 72 Group Stage matches are completed.`;
    
    const bannerMsg = currentLang === 'es' ? msgEs : (currentLang === 'pt' ? `🔒 A Fase Eliminatória será desbloqueada assim que todas as 72 partidas da Fase de Grupos forem concluídas.` : msgEn);
    banner.innerHTML = `<i class="fa-solid fa-lock" style="margin-right: 8px;"></i> <span>${bannerMsg}</span>`;
    
    container.parentNode.insertBefore(banner, container);
  } else {
    container.classList.remove('playoff-locked');
    const expired = checkDeadline();
    if (!expired) {
      container.querySelectorAll('.goal-btn').forEach(btn => {
        btn.disabled = false;
      });
    }
  }
}

// ─── GOAL CONTROLS ──────────────────────────────────────────────
function changeGoal(matchId, side, delta) {
  if (!predictions[matchId]) predictions[matchId] = { h: 0, a: 0, ht1h: 0, ht1a: 0, ht2h: 0, ht2a: 0, btts: false, yc: 0, rc: 0 };
  predictions[matchId][side] = Math.max(0, (predictions[matchId][side] || 0) + delta);
  const el = document.getElementById(`goal-${side}-${matchId}`);
  if (el) el.textContent = predictions[matchId][side];
  // Autosave locally
  localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
  // Recalculate standings if in group mode
  if (activeStage === 'groups') {
    const match = GROUP_MATCHES.find(m => m.id === matchId);
    if (match) { updateStandingsPanel(match.g); updateBestThirdsPanel(); }
  }
}

function toggleMspExtended(matchId) {
  const card = document.querySelector(`.match-card[data-match-id="${matchId}"]`);
  if (!card) return;
  const fields = card.querySelector('.msp-extended-fields');
  const btn = card.querySelector('.msp-toggle-btn');
  if (!fields || !btn) return;
  
  const isExpanded = fields.classList.toggle('expanded');
  const textEl = btn.querySelector('.toggle-text');
  const iconEl = btn.querySelector('i');
  
  if (textEl) {
    textEl.textContent = isExpanded ? t('btn-less') : t('btn-more');
  }
  if (iconEl) {
    iconEl.className = isExpanded ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
  }
}

function changeMspField(matchId, field, delta) {
  if (!predictions[matchId]) predictions[matchId] = { h: 0, a: 0, ht1h: 0, ht1a: 0, ht2h: 0, ht2a: 0, btts: false, yc: 0, rc: 0 };
  predictions[matchId][field] = Math.max(0, (predictions[matchId][field] || 0) + delta);
  const el = document.getElementById(`msp-${field}-${matchId}`);
  if (el) el.textContent = predictions[matchId][field];
  localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
}

function toggleBtts(matchId) {
  if (!predictions[matchId]) predictions[matchId] = { h: 0, a: 0, ht1h: 0, ht1a: 0, ht2h: 0, ht2a: 0, btts: false, yc: 0, rc: 0 };
  predictions[matchId].btts = !predictions[matchId].btts;
  const btn = document.getElementById(`msp-btts-${matchId}`);
  if (btn) {
    btn.textContent = predictions[matchId].btts ? 'Sí / Yes' : 'No';
    btn.classList.toggle('active', predictions[matchId].btts);
  }
  localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
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
  document.getElementById('standings-table-title').textContent = currentLang === 'es' ? `Posiciones Grupo ${group}` : (currentLang === 'pt' ? `Classificação Grupo ${group}` : `Group ${group} Standings`);
  document.getElementById('standings-group-badge').textContent = group;
  tbody.innerHTML = '';
  standings.forEach((team, idx) => {
    const pos = idx + 1;
    const posClass = pos <= 2 ? 'top' : (pos === 3 ? 'third' : 'out');
    const trClass = pos <= 2 ? 'q-auto' : (pos === 3 ? 'q-third' : '');
    const teamName = currentLang === 'es' ? team.name : (currentLang === 'pt' ? (GROUP_TEAMS_PT[group][GROUP_TEAMS[group].indexOf(team.name)] || team.name) : (GROUP_TEAMS_EN[group][GROUP_TEAMS[group].indexOf(team.name)] || team.name));
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
    const teamName = currentLang === 'es' ? team.name : (currentLang === 'pt' ? (GROUP_TEAMS_PT[team.group][GROUP_TEAMS[team.group].indexOf(team.name)] || team.name) : (GROUP_TEAMS_EN[team.group][GROUP_TEAMS[team.group].indexOf(team.name)] || team.name));
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
  if (!currentUser) {
    const authMsg = currentLang === 'es' ? 'Para guardar tus pronósticos en la base de datos en línea, por favor crea tu cuenta.' : 
                    (currentLang === 'pt' ? 'Para salvar seus palpites no banco de dados online, por favor crie sua conta.' : 
                    'To save your predictions in the online database, please create your account.');
    openAuthModal('register', authMsg);
    return;
  }
  if (checkDeadline()) return;
  if (cooldownRemaining > 0) return;

  const saveBtn = document.getElementById('save-predictions-btn');
  const saveBtnText = document.getElementById('save-btn-text');
  const saveBtnIcon = document.getElementById('save-btn-icon');

  saveBtn.disabled = true;
  saveBtnIcon.className = 'fa-solid fa-spinner fa-spin';
  saveBtnText.textContent = currentLang === 'es' ? 'Guardando...' : (currentLang === 'pt' ? 'Salvando...' : 'Saving...');
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
    if (currentSpreadsheetId) {
      params.set('spreadsheetId', currentSpreadsheetId);
    }

    const res = await fetch(`${CONFIG.API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === 'ok' || data.result === 'success') {
      showSaveAlert(t('save-success'), 'success');
      localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
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
  // Remove any existing toast
  const existing = document.getElementById('save-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'save-toast';
  const icon = type === 'success'
    ? '<i class="fa-solid fa-circle-check"></i>'
    : '<i class="fa-solid fa-triangle-exclamation"></i>';
  toast.innerHTML = `${icon} <span>${msg}</span>`;
  toast.className = `save-toast save-toast-${type}`;
  document.body.appendChild(toast);

  // Trigger slide-in
  requestAnimationFrame(() => toast.classList.add('save-toast-visible'));

  // Auto-dismiss after 10 seconds
  const timer = setTimeout(() => {
    toast.classList.remove('save-toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 10000);

  // Click to dismiss early
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    toast.classList.remove('save-toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  });
}

// ─── LEADERBOARD (via GAS endpoint — no public sheet required) ──────
async function loadLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">
    <i class="fa-solid fa-spinner fa-spin"></i> Cargando clasificación...
  </td></tr>`;
  try {
    let url = `${CONFIG.API_URL}?action=leaderboard`;
    if (currentSpreadsheetId) {
      url += `&spreadsheetId=${currentSpreadsheetId}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 'ok') throw new Error(json.message || 'Error GAS');

    leaderboardData = (json.data || []).map(r => ({
      'Nombre': r['Nombre'] || r['nombre'] || '—',
      'Puntos Eliminatoria': Number(r['Puntos Eliminatoria'] != null ? r['Puntos Eliminatoria'] : 0),
      'Puntos Segunda Fase': Number(r['Puntos Segunda Fase'] != null ? r['Puntos Segunda Fase'] : 0),
      'Puntos Totales': Number(r['Puntos Totales'] != null ? r['Puntos Totales'] : 0),
      'Total Pronosticos': Number(r['Total Pronosticos'] || 0)
    }));
    matchResultsData = [];

    allGroupMatchesPlayed = (json.playedGroupMatches === 72);
    updatePlayoffLockState();

    renderLeaderboard(leaderboardData);

    lastActiveParticipants = json.activeParticipants !== undefined ? json.activeParticipants : leaderboardData.length;
    lastCostPerParticipant = json.costPerParticipant !== undefined ? json.costPerParticipant : 10;
    lastPrizePool = json.prizePool !== undefined ? json.prizePool : (lastActiveParticipants * lastCostPerParticipant);

    updateStats(json.played || 0, lastActiveParticipants, json.totalPredictions);
    updatePrizePool(lastPrizePool, lastActiveParticipants, lastCostPerParticipant);
  } catch (err) {
    tbody.innerHTML =
      `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">
        <i class="fa-solid fa-cloud-xmark"></i> ${t('login-error-network')}
      </td></tr>`;
    console.error('loadLeaderboard error:', err);
  }
}

function renderLeaderboard(data) {
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '';
  
  const isVip = currentUser && currentUser.rango === 'VIP';
  const showPoints = isVip || activeLeaderboardSubtab !== 'GLOBAL_LIGA_2026';
  
  updatePodium(data);
  
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">Sin registros disponibles.</td></tr>`;
    return;
  }
  
  let currentRank = 1;
  let prevPoints = -1;

  data.forEach((row, idx) => {
    const name = row['Nombre'] || '—';
    const isSelf = currentUser && (currentUser.name === name || currentUser.email === name);
    const canSeeRowPoints = showPoints || isSelf;
    
    const ptsElim = row['Puntos Eliminatoria'] !== undefined ? row['Puntos Eliminatoria'] : '0';
    const ptsSeg = row['Puntos Segunda Fase'] !== undefined ? row['Puntos Segunda Fase'] : '0';
    const ptsTot = row['Puntos Totales'] !== undefined ? Number(row['Puntos Totales']) : 0;

    if (idx > 0) {
      if (ptsTot < prevPoints) {
        currentRank = idx + 1;
      }
    }
    prevPoints = ptsTot;

    let rankDisplay = currentRank;
    let rankClass = '';

    if (ptsTot > 0) {
      rankClass = currentRank === 1 ? 'first' : currentRank === 2 ? 'second' : currentRank === 3 ? 'third' : '';
    } else {
      rankDisplay = '—';
      rankClass = 'unranked';
    }

    const init = name.charAt(0).toUpperCase();
    const tr = document.createElement('tr');
    
    if (canSeeRowPoints) {
      tr.style.cursor = 'pointer';
      tr.title = currentLang === 'es' ? 'Ver pronósticos detallados' : (currentLang === 'pt' ? 'Ver palpites detalhados' : 'View detailed predictions');
      tr.onclick = () => showPlayerDetails(name);
    } else {
      tr.style.cursor = 'not-allowed';
      tr.title = currentLang === 'es' ? '🔒 Requiere Pase VIP' : (currentLang === 'pt' ? '🔒 Requer Passe VIP' : '🔒 VIP Pass required');
      tr.onclick = () => {
        if (currentUser) {
          openCheckoutModal();
        } else {
          const vipMsg = currentLang === 'es' ? 'Adquiere tu Pase VIP para ver las predicciones de otros jugadores.' : 
                         (currentLang === 'pt' ? 'Adquira seu Passe VIP para ver os palpites de outros jogadores.' : 
                         "Acquire your VIP Pass to view other players' predictions.");
          openAuthModal('register', vipMsg);
        }
      };
    }

    let ptsElimShow = canSeeRowPoints ? ptsElim : '<span class="locked-cell-text"><i class="fa-solid fa-lock"></i> VIP</span>';
    let ptsSegShow = canSeeRowPoints ? ptsSeg : '<span class="locked-cell-text"><i class="fa-solid fa-lock"></i> VIP</span>';
    let ptsTotShow = canSeeRowPoints ? `${ptsTot} pts` : '<span class="locked-cell-text"><i class="fa-solid fa-lock"></i> VIP</span>';

    tr.innerHTML = `
      <td style="text-align:center"><span class="rank-num ${rankClass}">${rankDisplay}</span></td>
      <td><div class="player-info-cell"><div class="player-avatar-mini">${init}</div><span>${name}</span></div></td>
      <td style="text-align:center">${ptsElimShow}</td>
      <td style="text-align:center">${ptsSegShow}</td>
      <td class="points-cell" style="text-align:center;font-weight:bold;color:var(--accent-gold);">${ptsTotShow}</td>`;
    tbody.appendChild(tr);
  });

  if (!isVip && activeLeaderboardSubtab === 'GLOBAL_LIGA_2026') {
    const tr = document.createElement('tr');
    tr.style.background = 'rgba(236, 208, 111, 0.05)';
    tr.style.borderTop = '2px solid var(--accent-gold)';
    tr.style.borderBottom = '2px solid var(--accent-gold)';
    tr.style.cursor = 'pointer';
    tr.onclick = () => openCheckoutModal();
    
    const myName = currentUser ? (currentUser.alias || currentUser.name) : 'Tú (Invitado)';
    const myInit = myName.charAt(0).toUpperCase();
    
    tr.innerHTML = `
      <td style="text-align:center"><span class="rank-num unranked">?</span></td>
      <td><div class="player-info-cell"><div class="player-avatar-mini" style="background:var(--gradient-gold); color:#1a1000; font-weight:800;">${myInit}</div><strong>${myName}</strong></div></td>
      <td style="text-align:center; color:var(--text-muted);">🔒 VIP</td>
      <td style="text-align:center; color:var(--text-muted);">🔒 VIP</td>
      <td style="text-align:center; padding: 0.5rem 0;">
        <button class="btn-gold-link" onclick="openCheckoutModal(); event.stopPropagation();">
          <i class="fa-solid fa-gem"></i> Accede a VIP
        </button>
      </td>`;
      
    const N = tbody.children.length;
    const midIdx = Math.floor(N / 2);
    if (N > 0) {
      tbody.insertBefore(tr, tbody.children[midIdx]);
    } else {
      tbody.appendChild(tr);
    }
  }
}

function updatePodium(data) {
  const isVip = currentUser && currentUser.rango === 'VIP';
  const podiumEl = document.querySelector('.podium-wrapper');
  
  if (podiumEl) {
    if (!isVip) {
      podiumEl.classList.add('podium-blur');
      let overlay = document.getElementById('podium-lock-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'podium-lock-overlay';
        overlay.className = 'podium-lock-overlay';
        overlay.innerHTML = `
          <h4 class="outfit" style="color:var(--accent-gold); margin-bottom:0.25rem;"><i class="fa-solid fa-lock"></i> Podio VIP Cerrado</h4>
          <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.5rem;">Registra tu Pase VIP para ver quién lidera el torneo.</p>
          <button class="btn btn-xs btn-gold" onclick="openCheckoutModal()"><i class="fa-solid fa-gem"></i> Accede a VIP</button>
        `;
        const parent = podiumEl.parentNode;
        const container = document.createElement('div');
        container.className = 'podium-locked-container';
        parent.insertBefore(container, podiumEl);
        container.appendChild(podiumEl);
        container.appendChild(overlay);
      }
    } else {
      podiumEl.classList.remove('podium-blur');
      const overlay = document.getElementById('podium-lock-overlay');
      if (overlay) {
        overlay.remove();
        const container = podiumEl.parentNode;
        if (container && container.className === 'podium-locked-container') {
          container.parentNode.insertBefore(podiumEl, container);
          container.remove();
        }
      }
    }
  }

  [1,2,3].forEach(i => {
    const el = document.getElementById(`podium-${i}`);
    if (!el) return;
    const row = data[i-1];
    if (row && Number(row['Puntos Totales'] || 0) > 0) {
      const name = isVip ? (row['Nombre'] || row['nombre'] || '—') : 'Usuario VIP';
      const pts = isVip ? (row['Puntos Totales'] || row['Puntos'] || '0') : '—';
      const init = isVip ? name.charAt(0).toUpperCase() : '🔒';
      el.querySelector('.avatar-holder').textContent = init;
      el.querySelector('.user-email').textContent = name;
      el.querySelector('.user-points').textContent = isVip ? `${pts} pts` : '🔒 VIP';
    } else {
      el.querySelector('.avatar-holder').textContent = '--';
      el.querySelector('.user-email').textContent = '—';
      el.querySelector('.user-points').textContent = '0 pts';
    }
  });
}

function updateStats(played, activeParticipants, totalPredictions) {
  const activeCount = activeParticipants !== undefined ? activeParticipants : leaderboardData.length;
  const predictionsCount = totalPredictions !== undefined ? totalPredictions : 
    (leaderboardData.reduce((sum, r) => sum + (Number(r['Total Pronosticos'] || 0)), 0) || '—');

  document.getElementById('stat-total-users').textContent = activeCount;
  document.getElementById('stat-played-matches').textContent = played != null ? played : 0;
  const predEl = document.getElementById('stat-total-predictions'); if (predEl) predEl.textContent = predictionsCount;
}

function updatePrizePool(prizePool, activeParticipants, costPerParticipant) {
  const amountEl = document.getElementById('prize-pool-amount');
  const detailsEl = document.getElementById('prize-pool-participants');
  const imgEl = document.getElementById('prize-pool-img');
  if (!amountEl || !detailsEl || !imgEl) return;

  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(prizePool);
  amountEl.textContent = formatted;

  const cost = costPerParticipant !== undefined ? costPerParticipant : 10;
  detailsEl.textContent = currentLang === 'es' 
    ? `${activeParticipants} participantes registrados ($${cost} c/u)` 
    : `${activeParticipants} registered participants ($${cost} each)`;

  let imgSrc = './Recursos/PocoDinero.png';
  if (activeParticipants > 15) {
    imgSrc = './Recursos/MuchisimoDinero.png';
  } else if (activeParticipants > 10) {
    imgSrc = './Recursos/MuchoDinero.png';
  } else if (activeParticipants > 5) {
    imgSrc = './Recursos/DineroMedio.png';
  }
  imgEl.src = imgSrc;
}

function filterLeaderboard() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const filtered = leaderboardData.filter(r => (r['Nombre'] || '').toLowerCase().includes(q));
  renderLeaderboard(filtered);
}

async function showPlayerDetails(name) {
  document.getElementById('modal-user-email').textContent = name;
  document.getElementById('detail-total-points').textContent = '—';
  document.getElementById('detail-perfect-hits').textContent = '—';
  document.getElementById('detail-winner-hits').textContent = '—';
  document.getElementById('detail-table-body').innerHTML = `
    <tr>
      <td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary);">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Cargando detalles del jugador...
      </td>
    </tr>
  `;
  openModal('modal-details');

  try {
    let url = `${CONFIG.API_URL}?action=playerDetail&name=${encodeURIComponent(name)}`;
    if (currentSpreadsheetId) {
      url += `&spreadsheetId=${currentSpreadsheetId}`;
    }
    const res = await fetch(url).then(r => r.json());
    if (res.status === 'ok') {
      document.getElementById('detail-total-points').textContent = res.totalPoints;
      document.getElementById('detail-perfect-hits').textContent = res.perfectHits;
      document.getElementById('detail-winner-hits').textContent = res.winnerHits;

      const tbody = document.getElementById('detail-table-body');
      tbody.innerHTML = '';

      if (!res.predictions || !res.predictions.length) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center;padding:1.5rem;color:var(--text-secondary);">
              El jugador no ha guardado pronósticos.
            </td>
          </tr>
        `;
        return;
      }

      // Sort predictions by match ID numerical order
      const sortedPreds = [...res.predictions].sort((a, b) => {
        const idA = parseInt(a.id.replace('M_', '')) || 0;
        const idB = parseInt(b.id.replace('M_', '')) || 0;
        return idA - idB;
      });

      sortedPreds.forEach(pred => {
        let matchText = pred.id;
        const m = GROUP_MATCHES.find(x => x.id === pred.id) || PLAYOFF_MATCHES.find(x => x.id === pred.id);
        if (m) {
          if (m.h && m.a) {
            matchText = `${m.h} vs ${m.a}`;
          } else if (m.label) {
            matchText = m.label;
          }
        }

        const predScore = (pred.predH !== '' && pred.predH !== null && pred.predA !== '' && pred.predA !== null) 
          ? `${pred.predH} - ${pred.predA}` 
          : '—';
        const realScore = (pred.realH !== '' && pred.realH !== null && pred.realA !== '' && pred.realA !== null) 
          ? `${pred.realH} - ${pred.realA}` 
          : '—';

        let badgeClass = 'pts-badge zero';
        if (pred.pts === 5) {
          badgeClass = 'pts-badge perfect';
        } else if (pred.pts === 3) {
          badgeClass = 'pts-badge winner';
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="text-align: left; font-weight: 500;">${matchText}</td>
          <td style="text-align: center;">${predScore}</td>
          <td style="text-align: center; color: var(--accent-gold); font-weight: bold;">${realScore}</td>
          <td style="text-align: center;"><span class="${badgeClass}">${pred.pts}</span></td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      document.getElementById('detail-table-body').innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center;padding:1.5rem;color:var(--text-secondary);">
            Error al cargar: ${res.message || 'Error desconocido'}
          </td>
        </tr>
      `;
    }
  } catch (err) {
    document.getElementById('detail-table-body').innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;padding:1.5rem;color:var(--text-secondary);">
          Error de red al cargar los detalles.
        </td>
      </tr>
    `;
    console.error('Error fetching player details:', err);
  }
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

  // Start at 3% volume (comfortable ambient level)
  audio.volume = 0.03;
  updateVolumeSliderGradient(3);

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
document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initVideoBackground();

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
    let url = `${CONFIG.API_URL}?action=getKey` +
      `&adminEmail=${encodeURIComponent(currentUser.email)}` +
      `&adminKey=${encodeURIComponent(currentUser.key)}` +
      `&targetEmail=${encodeURIComponent(targetEmail)}`;
    if (currentSpreadsheetId) {
      url += `&spreadsheetId=${currentSpreadsheetId}`;
    }

    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === 'ok' && data.key) {
      const labelEl = resultBox.querySelector('.admin-result-label');
      if (data.exists) {
        labelEl.innerHTML = '<i class="fa-solid fa-key" style="color:var(--gold);"></i> Key de Acceso (Existente):';
        resultBox.style.borderColor = 'rgba(236,208,111,0.35)';
      } else {
        labelEl.innerHTML = '<i class="fa-solid fa-user-plus" style="color:#22c55e;"></i> ¡Nuevo Participante Registrado! Key de Acceso:';
        resultBox.style.borderColor = '#22c55e';
      }
      
      resultKey.textContent = data.key.toUpperCase();
      resultBox.classList.remove('hidden');
      // Neon glow pulse animation
      resultKey.style.animation = 'none';
      requestAnimationFrame(() => { resultKey.style.animation = ''; });
      
      // Refresh admin stats to reflect the new user count immediately if registered
      if (!data.exists) {
        refreshAdminStats();
      }
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
    let url = `${CONFIG.API_URL}?action=debug`;
    if (currentSpreadsheetId) {
      url += `&spreadsheetId=${currentSpreadsheetId}`;
    }
    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === 'ok') {
      if (typeof data.real_participants !== 'undefined') {
        statPart.textContent = data.real_participants;
      } else {
        const accSheet = (data.sheets || []).find(s => s.name === 'Accesos');
        statPart.textContent = accSheet ? Math.max(0, accSheet.rows - 1) : '--';
      }

      if (typeof data.real_predictions !== 'undefined') {
        statPreds.textContent = data.real_predictions;
      } else {
        const prnSheet = (data.sheets || []).find(s => s.name === 'Pronósticos (IA)');
        statPreds.textContent = prnSheet ? Math.max(0, prnSheet.rows - 1) : '--';
      }
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

/* ==========================================================================
   SAAS PREMIUM FEATURES (BINANCE CHECKOUT, MURO DE DEBATE, ANALYTICS VIP, PDF)
   ========================================================================== */

function updatePaywalls() {
  const isVip = currentUser && currentUser.rango === 'VIP';

  // Apply body class so CSS can adapt VIP tab badges
  document.body.classList.toggle('vip-user', isVip);
  const chatPaywall = document.getElementById('chat-paywall');
  const analyticsPaywall = document.getElementById('analytics-paywall');
  const tributePaywall = document.getElementById('tribute-paywall');
  const tributeContent = document.getElementById('tribute-portal-content');
  // Analytics content grid (visible below paywall for F2P - should be hidden too)
  const analyticsGrid = document.querySelector('#sec-analytics .analytics-grid');
  // Chat messages and input
  const chatMessagesBox = document.getElementById('chat-messages');
  const chatInputBar = document.querySelector('#sec-chat .chat-input-bar');

  if (chatPaywall) {
    chatPaywall.classList.toggle('hidden', isVip);
  }
  // Hide chat content for F2P
  if (chatMessagesBox) chatMessagesBox.style.visibility = isVip ? 'visible' : 'hidden';
  if (chatInputBar) chatInputBar.style.display = isVip ? 'flex' : 'none';

  if (analyticsPaywall) {
    analyticsPaywall.classList.toggle('hidden', isVip);
  }
  // Hide analytics content for F2P
  if (analyticsGrid) analyticsGrid.style.visibility = isVip ? 'visible' : 'hidden';

  if (tributePaywall) {
    tributePaywall.classList.toggle('hidden', isVip);
  }
  if (tributeContent) {
    tributeContent.classList.toggle('hidden', !isVip);
    if (isVip) {
      renderCyborgAlbum();
      updateDailyRewardTimer();
      if (!dailyTimerInterval) {
        dailyTimerInterval = setInterval(updateDailyRewardTimer, 1000);
      }
    } else {
      if (dailyTimerInterval) {
        clearInterval(dailyTimerInterval);
        dailyTimerInterval = null;
      }
    }
  }
}

// ─── CYBORG PLAYERS ALBUM DATA & RENDERING ──────────────────────
const CYBORG_PLAYERS = [
  {
    "NOMBRE_JUGADOR": "Guillermo Ochoa",
    "TEXTO_BANNER": "G. OCHOA",
    "NACIONALIDAD": "MEXICANO",
    "PAÍS": "México",
    "POSICION": "Portero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Brazos y manos completamente biónicos de cromo pulido con propulsores en las palmas",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "haciendo una atajada acrobática (flying save) estirando sus brazos mecánicos para desviar un balón luminoso"
  },
  {
    "NOMBRE_JUGADOR": "Lyle Foster",
    "TEXTO_BANNER": "L. FOSTER",
    "NACIONALIDAD": "SOUTH AFRICAN",
    "PAÍS": "Sudáfrica",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas piernas completamente mecánicas de oro texturizado y fibra de carbono con pistones hidráulicos",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Son Heung-min",
    "TEXTO_BANNER": "SON H.M.",
    "NACIONALIDAD": "SOUTH KOREAN",
    "PAÍS": "Corea del Sur",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Costados del torso blindados con placas de titanio oscuro, luces LED integradas y pantorrilla izquierda robótica",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "haciendo una Bicicleta veloz sobre el balón, rompiendo la barrera del sonido con ondas de choque"
  },
  {
    "NOMBRE_JUGADOR": "Patrik Schick",
    "TEXTO_BANNER": "P. SCHICK",
    "NACIONALIDAD": "CZECH",
    "PAÍS": "República Checa",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Columna vertebral mecánica expuesta que se conecta a su hombro y brazo izquierdo de metal azul metalizado",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "ganando la posición aérea para conectar un Cabezazo brutal, generando un destello al impactar el balón"
  },
  {
    "NOMBRE_JUGADOR": "Alphonso Davies",
    "TEXTO_BANNER": "A. DAVIES",
    "NACIONALIDAD": "CANADIAN",
    "PAÍS": "Canadá",
    "POSICION": "Defensa / Lateral",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambos brazos y manos completamente robóticos, masivos, de acero industrial gris con garras de sujeción magnética",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "barriéndose a Full Speed para cortar un avance, dejando un surco de chispas en el césped"
  },
  {
    "NOMBRE_JUGADOR": "Edin Džeko",
    "TEXTO_BANNER": "E. DŽEKO",
    "NACIONALIDAD": "BOSNIAN",
    "PAÍS": "Bosnia y Herzegovina",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Placa cranial blindada en la frente de color platino brillante y mandíbula biónica con circuitos grabados",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "ganando la posición aérea para conectar un Cabezazo brutal, generando un destello al impactar el balón"
  },
  {
    "NOMBRE_JUGADOR": "Akram Afif",
    "TEXTO_BANNER": "A. AFIF",
    "NACIONALIDAD": "QATARI",
    "PAÍS": "Catar",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Muslo derecho biónico con disipadores de calor expuestos y líneas de fibra óptica azul",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Granit Xhaka",
    "TEXTO_BANNER": "G. XHAKA",
    "NACIONALIDAD": "SWISS",
    "PAÍS": "Suiza",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Exoesqueleto completo integrado en el brazo izquierdo de bronce industrial cepillado",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Neymar Jr.",
    "TEXTO_BANNER": "NEYMAR JR.",
    "NACIONALIDAD": "BRASILEIRO",
    "PAÍS": "Brasil",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Piernas cibernéticas de metal dorado brillante con fibra de carbono y emisores de hologramas",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "ejecutando una finta o regate de fantasía (dribbling), dejando un haz de luz multicolor a su paso"
  },
  {
    "NOMBRE_JUGADOR": "Achraf Hakimi",
    "TEXTO_BANNER": "A. HAKIMI",
    "NACIONALIDAD": "MOROCCAN",
    "PAÍS": "Marruecos",
    "POSICION": "Defensa / Lateral",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Hombro derecho blindado y ojo biónico con retícula de escaneo digital verde",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "conducción a Full Speed por la banda lateral, dejando una estela electromagnética"
  },
  {
    "NOMBRE_JUGADOR": "Frantzdy Pierrot",
    "TEXTO_BANNER": "F. PIERROT",
    "NACIONALIDAD": "HAITIAN",
    "PAÍS": "Haití",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Torso reforzado con placas de fibra de carbono mate and antebrazo derecho mecánico cromado",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "protegiendo el balón de espaldas con su torso blindado mientras activa sus propulsores para girar"
  },
  {
    "NOMBRE_JUGADOR": "Scott McTominay",
    "TEXTO_BANNER": "S. MCTOMINAY",
    "NACIONALIDAD": "SCOTTISH",
    "PAÍS": "Escocia",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Rodilla y espinilla derechas biónicas de metal reforzado estilo industrial pesado",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "lanzándose con potencia en una tacleada deslizante limpia, levantando un rastro de partículas cibernéticas"
  },
  {
    "NOMBRE_JUGADOR": "Christian Pulisic",
    "TEXTO_BANNER": "C. PULISIC",
    "NACIONALIDAD": "AMERICAN",
    "PAÍS": "Estados Unidos",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Brazo derecho biónico de cromo pulido y ojo izquierdo con visor cibernético rojo",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "haciendo una Bicicleta veloz sobre el balón, rompiendo la barrera del sonido con ondas de choque"
  },
  {
    "NOMBRE_JUGADOR": "Julio Enciso",
    "TEXTO_BANNER": "J. ENCISO",
    "NACIONALIDAD": "PARAGUAYO",
    "PAÍS": "Paraguay",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas piernas completamente mecánicas de oro texturizado y fibra de carbono con pistones hidráulicos",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Nestory Irankunda",
    "TEXTO_BANNER": "N. IRANKUNDA",
    "NACIONALIDAD": "AUSTRALIAN",
    "PAÍS": "Australia",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Costados del torso blindados con placas de titanio oscuro, luces LED integradas y pantorrilla izquierda robótica",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Arda Güler",
    "TEXTO_BANNER": "ARDA GÜLER",
    "NACIONALIDAD": "TURKISH",
    "PAÍS": "Turquía",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Columna vertebral mecánica expuesta que se conecta a su hombro y brazo izquierdo de metal azul metalizado",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Florian Wirtz",
    "TEXTO_BANNER": "F. WIRTZ",
    "NACIONALIDAD": "Centrocampista",
    "PAÍS": "Alemania",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambos brazos y manos completamente robóticos, masivos, de acero industrial gris con garras de sujeción magnética",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "filtrando un pase de precisión quirúrgica con líneas de trayectoria holográficas en el suelo"
  },
  {
    "NOMBRE_JUGADOR": "Juninho Bacuna",
    "TEXTO_BANNER": "J. BACUNA",
    "NACIONALIDAD": "CURAÇAOAN",
    "PAÍS": "Curaçao",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Placa cranial blindada en la frente de color platino brillante y mandíbula biónica con circuitos grabados",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "orquestando el juego desde el centro, su ojo visor proyectando un mapa táctico digital"
  },
  {
    "NOMBRE_JUGADOR": "Franck Kessié",
    "TEXTO_BANNER": "F. KESSIÉ",
    "NACIONALIDAD": "IVORIAN",
    "PAÍS": "Costa de Marfil",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Muslo derecho biónico con disipadores de calor expuestos y líneas de fibra óptica azul",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "recuperando un balón con fuerza física desmedida, con un choque de energía estática"
  },
  {
    "NOMBRE_JUGADOR": "Moises Caicedo",
    "TEXTO_BANNER": "M. CAICEDO",
    "NACIONALIDAD": "ECUATORIANO",
    "PAÍS": "Ecuador",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Exoesqueleto completo integrado en el brazo izquierdo de bronce industrial cepillado",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "bloqueando con éxito un disparo potente, creando un escudo defensivo de energía hexagonal"
  },
  {
    "NOMBRE_JUGADOR": "Virgil van Dijk",
    "TEXTO_BANNER": "V. VAN DIJK",
    "NACIONALIDAD": "DUTCH",
    "PAÍS": "Países Bajos",
    "POSICION": "Defensa",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Pechera y hombreras blindadas de titanio reforzado y exoesqueleto en su brazo izquierdo",
    "COLOR_ENERGÍA": "naranja brillante",
    "POSE_ASIGNADA": "bloqueando con firmeza un remate rival con un escudo holográfico generado desde su torso"
  },
  {
    "NOMBRE_JUGADOR": "Takefusa Kubo",
    "TEXTO_BANNER": "T. KUBO",
    "NACIONALIDAD": "JAPANESE",
    "PAÍS": "Japón",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Hombro derecho blindado y ojo biónico con retícula de escaneo digital verde",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Alexander Isak",
    "TEXTO_BANNER": "A. ISAK",
    "NACIONALIDAD": "SWEDISH",
    "PAÍS": "Suecia",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Torso reforzado con placas de fibra de carbono mate y antebrazo derecho mecánico cromado",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Elyes Skhiri",
    "TEXTO_BANNER": "E. SKHIRI",
    "NACIONALIDAD": "TUNISIAN",
    "PAÍS": "Túnez",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Rodilla y espinilla derechas biónicas de metal reinforced estilo industrial pesado",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Kevin De Bruyne",
    "TEXTO_BANNER": "K. DE BRUYNE",
    "NACIONALIDAD": "BELGIAN",
    "PAÍS": "Bélgica",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Brazo derecho biónico de cromo pulido and ojo izquierdo con visor cibernético rojo",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Mohamed Salah",
    "TEXTO_BANNER": "M. SALAH",
    "NACIONALIDAD": "EGYPTIAN",
    "PAÍS": "Egipto",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas piernas completamente mecánicas de oro texturizado y fibra de carbono con pistones hidráulicos",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Mehdi Taremi",
    "TEXTO_BANNER": "M. TAREMI",
    "NACIONALIDAD": "IRANIAN",
    "PAÍS": "Irán",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Costados del torso blindados con placas de titanio oscuro, luces LED integradas y pantorrilla izquierda robótica",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "ganando la posición aérea para conectar un Cabezazo brutal, generando un destello al impactar el balón"
  },
  {
    "NOMBRE_JUGADOR": "Chris Wood",
    "TEXTO_BANNER": "C. WOOD",
    "NACIONALIDAD": "NEW ZEALANDER",
    "PAÍS": "Nueva Zelanda",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Columna vertebral mecánica expuesta que se conecta a su hombro y brazo izquierdo de metal azul metalizado",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "ganando la posición aérea para conectar un Cabezazo brutal, generando un destello al impactar el balón"
  },
  {
    "NOMBRE_JUGADOR": "Lamine Yamal",
    "TEXTO_BANNER": "L. YAMAL",
    "NACIONALIDAD": "ESPAÑOL",
    "PAÍS": "España",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambos brazos y manos completamente robóticos, masivos, de acero industrial gris con garras de sujeción magnética",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "haciendo una Bicicleta veloz sobre el balón, rompiendo la barrera del sonido con ondas de choque"
  },
  {
    "NOMBRE_JUGADOR": "Ryan Mendes",
    "TEXTO_BANNER": "R. MENDES",
    "NACIONALIDAD": "CAPE VERDEAN",
    "PAÍS": "Cabo Verde",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Placa cranial blindada en la frente de color platino brillante y mandíbula biónica con circuitos grabados",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Salem Al-Dawsari",
    "TEXTO_BANNER": "S. AL-DAWSARI",
    "NACIONALIDAD": "SAUDI",
    "PAÍS": "Arabia Saudita",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Muslo derecho biónico con disipadores de calor expuestos y líneas de fibra óptica azul",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Federico Valverde",
    "TEXTO_BANNER": "F. VALVERDE",
    "NACIONALIDAD": "URUGUAYO",
    "PAÍS": "Uruguay",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Exoesqueleto completo integrado en el brazo izquierdo de bronce industrial cepillado",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Kylian Mbappé",
    "TEXTO_BANNER": "K. MBAPPÉ",
    "NACIONALIDAD": "FRANÇAIS",
    "PAÍS": "Francia",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas pantorrillas y pies mecánicos de policarbonato blanco futurista con propulsores de energía traseros",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Sadio Mané",
    "TEXTO_BANNER": "S. MANÉ",
    "NACIONALIDAD": "SENEGALESE",
    "PAÍS": "Senegal",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Hombro derecho blindado y ojo biónico con retícula de escaneo digital verde",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "haciendo una Bicicleta veloz sobre el balón, rompiendo la barrera del sonido con ondas de choque"
  },
  {
    "NOMBRE_JUGADOR": "Aymen Hussein",
    "TEXTO_BANNER": "A. HUSSEIN",
    "NACIONALIDAD": "IRAQI",
    "PAÍS": "Irak",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Torso reforzado con placas de fibra de carbono mate y antebrazo derecho mecánico cromado",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "ganando la posición aérea para conectar un Cabezazo brutal, generando un destello al impactar el balón"
  },
  {
    "NOMBRE_JUGADOR": "Erling Haaland",
    "TEXTO_BANNER": "E. HAALAND",
    "NACIONALIDAD": "NORWEGIAN",
    "PAÍS": "Noruega",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Rodilla y espinilla derechas biónicas de metal reforzado estilo industrial pesado",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Lionel Messi",
    "TEXTO_BANNER": "L. MESSI",
    "NACIONALIDAD": "ARGENTINO",
    "PAÍS": "Argentina",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Brazo derecho biónico de cromo pulido y ojo izquierdo con visor cibernético rojo",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "conducción a Full Speed esquivando rivales, dejando un rastro de velocidad"
  },
  {
    "NOMBRE_JUGADOR": "Riyad Mahrez",
    "TEXTO_BANNER": "R. MAHREZ",
    "NACIONALIDAD": "ALGERIAN",
    "PAÍS": "Argelia",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas piernas completamente mecánicas de oro texturizado y fibra de carbono con pistones hidráulicos",
    "COLOR_ENERGÍA": "verde neón",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "David Alaba",
    "TEXTO_BANNER": "D. ALABA",
    "NACIONALIDAD": "AUSTRIAN",
    "PAÍS": "Austria",
    "POSICION": "Defensa",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Costados del torso blindados con placas de titanio oscuro, luces LED integradas y pantorrilla izquierda robótica",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "interceptando con precisión quirúrgica un pase aéreo rival, proyectando líneas holográficas"
  },
  {
    "NOMBRE_JUGADOR": "Musa Al-Taamari",
    "TEXTO_BANNER": "M. AL-TAAMARI",
    "NACIONALIDAD": "JORDANIAN",
    "PAÍS": "Jordania",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Columna vertebral mecánica expuesta que se conecta a su hombro y brazo izquierdo de metal azul metalizado",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "haciendo una Bicicleta veloz sobre el balón, rompiendo la barrera del sonido con ondas de choque"
  },
  {
    "NOMBRE_JUGADOR": "Cristiano Ronaldo",
    "TEXTO_BANNER": "C. RONALDO",
    "NACIONALIDAD": "PORTUGUÊS",
    "PAÍS": "Portugal",
    "POSICION": "Delantero Centro",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambos brazos y manos completamente robóticos, masivos, de acero industrial gris con garras de sujeción magnética",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "Chancel Mbemba",
    "TEXTO_BANNER": "C. MBEMBA",
    "NACIONALIDAD": "CONGOLESE",
    "PAÍS": "República Democrática del Congo",
    "POSICION": "Defensa",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Placa cranial blindada en la frente de color platino brillante y mandíbula biónica con circuitos grabados",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "bloqueando con solidez un cañonazo rival en el área chica con su pecho reforzado"
  },
  {
    "NOMBRE_JUGADOR": "Eldor Shomurodov",
    "TEXTO_BANNER": "E. SHOMURODOV",
    "NACIONALIDAD": "UZBEK",
    "PAÍS": "Uzbekistán",
    "POSICION": "Delantero",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Muslo derecho biónico con disipadores de calor expuestos y líneas de fibra óptica azul",
    "COLOR_ENERGÍA": "rojo brillante",
    "POSE_ASIGNADA": "ejecutando su icónica celebración del \"SIUUU\" tras anotar, con la portería de fondo con el balón adentro de ella y gritos holográficos de \"SIUUUU\" en las gradas"
  },
  {
    "NOMBRE_JUGADOR": "James Rodríguez",
    "TEXTO_BANNER": "J. RODRÍGUEZ",
    "NACIONALIDAD": "COLOMBIANO",
    "PAÍS": "Colombia",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Muslo y pantorrilla izquierdos robóticos de acero pulido y visor digital en su ojo derecho",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "preparando un pase milimétrico de volea con un destello cibernético en su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Jude Bellingham",
    "TEXTO_BANNER": "J. BELLINGHAM",
    "NACIONALIDAD": "ENGLISH",
    "PAÍS": "Inglaterra",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Ambas pantorrillas y pies mecánicos de policarbonato blanco futurista con propulsores de energía traseros",
    "COLOR_ENERGÍA": "azul eléctrico",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Luka Modrić",
    "TEXTO_BANNER": "L. MODRIĆ",
    "NACIONALIDAD": "CROATIAN",
    "PAÍS": "Croacia",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Hombro derecho blindado y ojo biónico con retícula de escaneo digital verde",
    "COLOR_ENERGÍA": "amarillo radiante",
    "POSE_ASIGNADA": "preparando un Tiro Libre con un aura de energía girando alrededor de su pie de apoyo"
  },
  {
    "NOMBRE_JUGADOR": "Mohammed Kudus",
    "TEXTO_BANNER": "M. KUDUS",
    "NACIONALIDAD": "GHANAIAN",
    "PAÍS": "Ghana",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Torso reforzado con placas de fibra de carbono mate y antebrazo derecho mecánico cromado",
    "COLOR_ENERGÍA": "blanco brillante",
    "POSE_ASIGNADA": "recuperando el juego y desatando un contraataque veloz con cálculo de rutas en tiempo real"
  },
  {
    "NOMBRE_JUGADOR": "Adalberto Carrasquilla",
    "TEXTO_BANNER": "A. CARRASQUILLA",
    "NACIONALIDAD": "PANAMENIAN",
    "PAÍS": "Panamá",
    "POSICION": "Centrocampista",
    "ASIGNAR_PARTE_ROBÓTICA_ÚNICA": "Rodilla y espinilla derechas biónicas de metal reforzado estilo industrial pesado",
    "COLOR_ENERGÍA": "púrpura de plasma",
    "POSE_ASIGNADA": "orquestando una jugada desde el círculo central con chispas de energía saliendo de sus botas biónicas"
  }
];

let currentAlbumCategory = 'all';
let currentAlbumSearch = '';

function renderCyborgAlbum() {
  const container = document.getElementById('album-cards-container');
  if (!container) return;
  
  container.innerHTML = '';
  
    const filtered = CYBORG_PLAYERS.filter(player => {
    // Only display card if it's unlocked by the user
    const isUnlocked = isCardUnlocked(player.NOMBRE_JUGADOR);
    if (!isUnlocked) return false;

    if (currentAlbumCategory !== 'all') {
      const pose = player.POSE_ASIGNADA.toLowerCase();
      if (currentAlbumCategory === 'Speed' && !pose.includes('speed') && !pose.includes('velocidad')) return false;
      if (currentAlbumCategory === 'Chilena' && !pose.includes('chilena')) return false;
      if (currentAlbumCategory === 'Bicicleta' && !pose.includes('bicicleta')) return false;
      if (currentAlbumCategory === 'Tiro Libre' && !pose.includes('tiro libre')) return false;
      if (currentAlbumCategory === 'Portero' && !pose.includes('portero') && !pose.includes('tapar')) return false;
      if (currentAlbumCategory === 'Cabezazo' && !pose.includes('cabezazo')) return false;
    }
    
    if (currentAlbumSearch) {
      const query = currentAlbumSearch.toLowerCase();
      const name = player.NOMBRE_JUGADOR.toLowerCase();
      const country = player.PAÍS.toLowerCase();
      if (!name.includes(query) && !country.includes(query)) return false;
    }
    
    return true;
  });
  
  // Calculate total unlocked cards globally
  const totalUnlocked = CYBORG_PLAYERS.filter(p => isCardUnlocked(p.NOMBRE_JUGADOR)).length;
  
  const counterEl = document.getElementById('album-collected-count');
  if (counterEl) {
    counterEl.textContent = `${totalUnlocked} / ${CYBORG_PLAYERS.length} Cartas`;
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center text-muted" style="grid-column: 1/-1; padding: 3rem;">No tienes cromos coleccionados en esta categoría todavía.</p>`;
    return;
  }
  
  filtered.forEach(player => {
    const sanitizedName = player.NOMBRE_JUGADOR.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
      
    const imgFilename = `${sanitizedName}.png`;
    const imgPath = `./Recursos/cards/${imgFilename}?v=lastdance`;
    
    let dotColor = '#00f2fe';
    if (player.COLOR_ENERGÍA.includes('rojo')) dotColor = '#ff2a2a';
    else if (player.COLOR_ENERGÍA.includes('verde')) dotColor = '#39ff14';
    else if (player.COLOR_ENERGÍA.includes('azul')) dotColor = '#00f2fe';
    else if (player.COLOR_ENERGÍA.includes('amarillo')) dotColor = '#ffd700';
    else if (player.COLOR_ENERGÍA.includes('púrpura') || player.COLOR_ENERGÍA.includes('plasma')) dotColor = '#b500ff';
    else if (player.COLOR_ENERGÍA.includes('blanco')) dotColor = '#ffffff';

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'trading-card-wrapper';
    
    cardWrapper.innerHTML = `
      <div class="trading-card" onclick="openCardZoom('${player.NOMBRE_JUGADOR.replace(/'/g, "\\'")}')" style="border-color: ${dotColor}44; box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 0 15px ${dotColor}11;">
        <div class="card-shimmer"></div>
        <div class="trading-card-header">
          <div class="trading-card-banner">
            <span class="trading-card-name">${player.TEXTO_BANNER}</span>
            <span class="trading-card-sub">CYBORG ${player.NACIONALIDAD}</span>
          </div>
          <div class="trading-card-badge" style="border-color:${dotColor}33;">
            <i class="fa-solid fa-earth-americas" style="color:${dotColor}; font-size:0.7rem;"></i>
          </div>
        </div>
        
        <div class="trading-card-image-wrapper">
          <img class="trading-card-img" src="${imgPath}" alt="${player.NOMBRE_JUGADOR}" onerror="handleCardImgError(this, '${player.TEXTO_BANNER}', '${dotColor}')">
        </div>
        
        <div class="trading-card-footer">
          <div class="trading-card-energy-badge">
            <span class="trading-card-energy-dot" style="background-color:${dotColor}; color:${dotColor};"></span>
            <span style="font-size: 0.5rem; text-transform: uppercase; color: var(--text-secondary);">${player.COLOR_ENERGÍA.split(' ')[0]}</span>
          </div>
          <div class="trading-card-action-badge">
            ${player.POSE_ASIGNADA.includes('Chilena') ? 'Chilena' : 
              player.POSE_ASIGNADA.includes('Bicicleta') ? 'Bicicleta' : 
              player.POSE_ASIGNADA.includes('Portero') || player.POSE_ASIGNADA.includes('tapar') ? 'Portero' : 
              player.POSE_ASIGNADA.includes('Tiro Libre') ? 'Tiro Libre' : 
              player.POSE_ASIGNADA.includes('Cabezazo') ? 'Cabezazo' : 'Full Speed'}
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(cardWrapper);
  });
  
  initCard3DEffect();
}

function handleCardImgError(imgEl, bannerText, dotColor) {
  const wrapper = imgEl.closest('.trading-card-image-wrapper');
  if (wrapper) {
    wrapper.style.display = 'none';
    const card = wrapper.closest('.trading-card');
    
    const hologram = document.createElement('div');
    hologram.className = 'trading-card-hologram';
    hologram.style.background = `radial-gradient(circle, ${dotColor}15 0%, rgba(9, 15, 23, 1) 90%)`;
    
    hologram.innerHTML = `
      <div class="trading-card-hologram-avatar" style="color: ${dotColor}55; text-shadow: 0 0 15px ${dotColor}88;">
        <i class="fa-solid fa-robot"></i>
      </div>
      <span style="font-size:0.6rem; color:${dotColor}; opacity:0.7; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Holograma Cyborg</span>
      <span class="trading-card-hologram-sparkles" style="color:${dotColor}aa; top: 30%; left: 20%; font-size:0.5rem;"><i class="fa-solid fa-star"></i></span>
      <span class="trading-card-hologram-sparkles" style="color:${dotColor}aa; top: 60%; right: 25%; font-size:0.4rem; animation-delay:1s;"><i class="fa-solid fa-star"></i></span>
    `;
    card.appendChild(hologram);
  }
}

function filterAlbum() {
  currentAlbumSearch = document.getElementById('album-search-input').value.trim();
  renderCyborgAlbum();
}

function filterAlbumCategory(category) {
  currentAlbumCategory = category;
  
  const categories = ['all', 'speed', 'chilena', 'bicicleta', 'libre', 'portero', 'cabezazo'];
  categories.forEach(cat => {
    const btn = document.getElementById(`btn-album-${cat}`);
    if (btn) btn.classList.toggle('active', cat === category.toLowerCase() || (cat === 'speed' && category === 'Speed') || (cat === 'libre' && category === 'Tiro Libre'));
  });
  
  renderCyborgAlbum();
}

function openCardZoom(playerName) {
  const player = CYBORG_PLAYERS.find(p => p.NOMBRE_JUGADOR === playerName);
  if (!player) return;
  
  document.getElementById('zoom-player-name').textContent = player.NOMBRE_JUGADOR;
  document.getElementById('zoom-player-national').textContent = `CYBORG ${player.NACIONALIDAD}${player.POSICION ? ' | ' + player.POSICION.toUpperCase() : ''}`;
  document.getElementById('zoom-player-flag-badge').innerHTML = `<i class="fa-solid fa-earth-americas"></i> ${player.PAÍS}`;
  document.getElementById('zoom-player-cyber').textContent = player.ASIGNAR_PARTE_ROBÓTICA_ÚNICA;
  document.getElementById('zoom-player-energy').textContent = player.COLOR_ENERGÍA;
  document.getElementById('zoom-player-pose').textContent = player.POSE_ASIGNADA;
  
  const container = document.getElementById('zoom-card-container');
  container.innerHTML = '';
  
  const sanitizedName = player.NOMBRE_JUGADOR.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
    
  const imgFilename = `${sanitizedName}.png`;
  const imgPath = `./Recursos/cards/${imgFilename}?v=lastdance`;
  
  let dotColor = '#00f2fe';
  if (player.COLOR_ENERGÍA.includes('rojo')) dotColor = '#ff2a2a';
  else if (player.COLOR_ENERGÍA.includes('verde')) dotColor = '#39ff14';
  else if (player.COLOR_ENERGÍA.includes('azul')) dotColor = '#00f2fe';
  else if (player.COLOR_ENERGÍA.includes('amarillo')) dotColor = '#ffd700';
  else if (player.COLOR_ENERGÍA.includes('púrpura') || player.COLOR_ENERGÍA.includes('plasma')) dotColor = '#b500ff';
  else if (player.COLOR_ENERGÍA.includes('blanco')) dotColor = '#ffffff';

  const zoomCard = document.createElement('div');
  zoomCard.className = 'trading-card';
  zoomCard.style.width = '240px';
  zoomCard.style.height = '336px';
  zoomCard.style.borderColor = dotColor;
  zoomCard.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px ${dotColor}33`;
  
  zoomCard.innerHTML = `
    <div class="card-shimmer"></div>
    <div class="trading-card-header">
      <div class="trading-card-banner">
        <span class="trading-card-name" style="font-size:0.9rem;">${player.TEXTO_BANNER}</span>
        <span class="trading-card-sub" style="font-size:0.6rem;">CYBORG ${player.NACIONALIDAD}</span>
      </div>
      <div class="trading-card-badge" style="width:28px; height:28px;">
        <i class="fa-solid fa-earth-americas" style="color:${dotColor}; font-size:0.85rem;"></i>
      </div>
    </div>
    
    <div class="trading-card-image-wrapper">
      <img class="trading-card-img" src="${imgPath}" alt="${player.NOMBRE_JUGADOR}" onerror="handleCardImgError(this, '${player.TEXTO_BANNER}', '${dotColor}')" style="transform:none;">
    </div>
    
    <div class="trading-card-footer">
      <div class="trading-card-energy-badge" style="padding:4px 10px;">
        <span class="trading-card-energy-dot" style="background-color:${dotColor}; width:8px; height:8px;"></span>
        <span style="font-size: 0.6rem; color: var(--text-secondary);">${player.COLOR_ENERGÍA.split(' ')[0]}</span>
      </div>
      <div class="trading-card-action-badge" style="padding:4px 8px; font-size: 0.6rem;">
        ${player.POSE_ASIGNADA.includes('Chilena') ? 'Chilena' : 
          player.POSE_ASIGNADA.includes('Bicicleta') ? 'Bicicleta' : 
          player.POSE_ASIGNADA.includes('Portero') || player.POSE_ASIGNADA.includes('tapar') ? 'Portero' : 
          player.POSE_ASIGNADA.includes('Tiro Libre') ? 'Tiro Libre' : 
          player.POSE_ASIGNADA.includes('Cabezazo') ? 'Cabezazo' : 'Full Speed'}
      </div>
    </div>
  `;
  
  container.appendChild(zoomCard);
  document.getElementById('modal-card-detail').style.display = 'flex';
  
  zoomCard.addEventListener('mousemove', (e) => {
    const rect = zoomCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    
    zoomCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    
    const shimmer = zoomCard.querySelector('.card-shimmer');
    if (shimmer) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      shimmer.style.backgroundPosition = `${px}% ${py}%`;
    }
  });
  
  zoomCard.addEventListener('mouseleave', () => {
    zoomCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

function closeCardDetailModal() {
  document.getElementById('modal-card-detail').style.display = 'none';
}

function initCard3DEffect() {
  document.querySelectorAll('.trading-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 12;
      const angleY = (x - xc) / 12;
      
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
      
      const shimmer = card.querySelector('.card-shimmer');
      if (shimmer) {
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        shimmer.style.backgroundPosition = `${px}% ${py}%`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}



async function loadAndApplyBranding() {
  if (!currentSpreadsheetId) return;
  try {
    const res = await fetch(`${CONFIG.API_URL}?action=getBranding&spreadsheetId=${encodeURIComponent(currentSpreadsheetId)}`);
    const data = await res.json();
    if (data.status === 'ok') {
      applyBranding(data.logoUrl, data.nombreLiga);
      const brandNameInput = document.getElementById('admin-brand-name');
      const brandLogoInput = document.getElementById('admin-brand-logo');
      if (brandNameInput) brandNameInput.value = data.nombreLiga || '';
      if (brandLogoInput) brandLogoInput.value = data.logoUrl || '';
    }
  } catch (err) {
    console.error('Error loading branding:', err);
  }
}

function applyBranding(logoUrl, nombreLiga) {
  const titleEl = document.querySelector('.hero-main-title');
  if (nombreLiga) {
    if (titleEl) titleEl.textContent = nombreLiga;
  } else {
    if (titleEl) titleEl.textContent = t('hero-title');
  }
  
  const logoContainer = document.querySelector('.hero-left');
  let logoImg = document.getElementById('custom-hero-logo');
  if (logoUrl) {
    if (!logoImg) {
      logoImg = document.createElement('img');
      logoImg.id = 'custom-hero-logo';
      logoImg.style.cssText = 'max-height: 80px; margin-bottom: 1rem; display: block;';
      if (logoContainer) logoContainer.insertBefore(logoImg, logoContainer.firstChild);
    }
    logoImg.src = logoUrl;
    logoImg.style.display = 'block';
  } else {
    if (logoImg) logoImg.style.display = 'none';
  }
}

const WALLETS = {
  bsc: '0x71C7656EC7ab88b098defB751B7401B5f6d1476B',
  tron: 'TYsn8JzZ8QW1a7B72G2fD8V1d9S6x6F5cR'
};

function openCheckoutModal() {
  openVipTermsModal();
}

function openVipTermsModal() {
  const modal = document.getElementById('vip-terms-modal');
  if (modal) {
    modal.style.display = 'flex';
    const checkbox = document.getElementById('accept-vip-terms-checkbox');
    if (checkbox) checkbox.checked = false;
    const proceedBtn = document.getElementById('vip-terms-proceed-btn');
    if (proceedBtn) proceedBtn.disabled = true;
  }
}

function closeVipTermsModal() {
  const modal = document.getElementById('vip-terms-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function toggleVipTermsAccept() {
  const checkbox = document.getElementById('accept-vip-terms-checkbox');
  const proceedBtn = document.getElementById('vip-terms-proceed-btn');
  if (checkbox && proceedBtn) {
    proceedBtn.disabled = !checkbox.checked;
  }
}

function proceedToCheckoutPayment() {
  closeVipTermsModal();
  openActualCheckoutModal();
}

function openActualCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.style.display = 'flex';
    const methodSelect = document.getElementById('checkout-method');
    if (methodSelect) methodSelect.value = 'binance';
    updateCheckoutMethod();
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function updateCheckoutMethod() {
  const method = document.getElementById('checkout-method').value;
  const binanceSection = document.getElementById('checkout-binance-section');
  const telegramSection = document.getElementById('checkout-telegram-section');
  if (method === 'binance') {
    if (binanceSection) binanceSection.style.display = 'block';
    if (telegramSection) telegramSection.style.display = 'none';
    updateCheckoutQR();
  } else {
    if (binanceSection) binanceSection.style.display = 'none';
    if (telegramSection) telegramSection.style.display = 'block';
  }
}

function updateCheckoutQR() {
  const network = document.getElementById('checkout-network').value;
  const address = WALLETS[network];
  document.getElementById('wallet-address').textContent = address;
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(address)}`;
  document.getElementById('checkout-qr').src = qrUrl;
}

function copyWalletAddress() {
  const address = document.getElementById('wallet-address').textContent;
  navigator.clipboard.writeText(address).then(() => {
    showSaveAlert('📋 ¡Dirección de billetera copiada!', 'success');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

async function simulatePaymentSuccess() {
  const btn = document.getElementById('checkout-simulate-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando Pago...`;
  
  try {
    if (tempRegData) {
      // Completing a registration as VIP
      const res = await fetch(`${CONFIG.API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'registerUser',
          nombre: tempRegData.name,
          alias: tempRegData.alias,
          pais: '',
          ciudad: '',
          email: tempRegData.email,
          rango: 'VIP'
        })
      });
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message || 'Error en registro');

      currentUser = {
        name: data.nombre,
        alias: data.alias || tempRegData.alias,
        pais: data.pais || '',
        ciudad: data.ciudad || '',
        email: tempRegData.email,
        key: data.key,
        spreadsheetId: data.quinielaId,
        type: 'Completa',
        role: 'Participante',
        rango: data.rango,
        nivel: 'Premium'
      };

      sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
      currentSpreadsheetId = activeSpreadsheetId;
      currentQuinielaType = currentUser.type;

      // Push predictions if guest predictions saved
      if (Object.keys(predictions).length > 0) {
        localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
        await fetch(`${CONFIG.API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save',
            nombre: currentUser.name,
            correo: currentUser.email,
            key: currentUser.key,
            spreadsheetId: currentUser.spreadsheetId,
            pronosticos: predictions
          })
        });
      }

      // Open success modal
      document.getElementById('reg-success-key').textContent = data.key;
      document.getElementById('reg-success-rango').textContent = data.rango;

      const successModal = document.getElementById('reg-success-modal');
      if (successModal) {
        closeCheckoutModal();
        successModal.style.display = 'flex';
        triggerVipEffects();
      }
      tempRegData = null; // clear
      return;
    }

    // Upgrading existing logged in F2P user to VIP
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'upgradeToVip',
        spreadsheetId: currentSpreadsheetId,
        correo: currentUser.email,
        key: currentUser.key
      })
    });
    
    const data = await res.json();
    if (data.status === 'ok') {
      showSaveAlert('🎉 ¡Pase VIP Activado con éxito!', 'success');
      
      currentUser.rango = 'VIP';
      sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
      
      const tierBadge = document.getElementById('user-tier-badge');
      if (tierBadge) {
        tierBadge.textContent = 'VIP';
        tierBadge.className = 'badge-tier VIP';
      }
      const upgradeBtn = document.getElementById('upgrade-vip-banner-btn');
      if (upgradeBtn) upgradeBtn.style.display = 'none';
      
      updatePaywalls();
      closeCheckoutModal();
      
      // Reload current tab if it was chat or analytics to unlock immediately
      const activeTab = document.querySelector('.tab-btn.active').id.replace('tab-', '');
      if (activeTab === 'chat') {
        loadChatMessages();
        if (!chatPollInterval) {
          chatPollInterval = setInterval(loadChatMessages, CONFIG.POLLING_INTERVAL);
        }
      } else if (activeTab === 'analytics') {
        loadSocialTrends();
      }
    } else {
      throw new Error(data.message || 'Error al procesar el pago.');
    }
  } catch (err) {
    showSaveAlert('❌ Error en simulación: ' + err.message, 'danger');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Simular Pago Exitoso <i class="fa-solid fa-circle-check"></i>`;
  }
}

async function loadChatMessages() {
  const chatBox = document.getElementById('chat-messages');
  if (!chatBox) return;
  
  try {
    const res = await fetch(`${CONFIG.API_URL}?action=getChatMessages&spreadsheetId=${encodeURIComponent(currentSpreadsheetId)}`);
    const data = await res.json();
    
    if (data.status === 'ok') {
      const isAtBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 40;
      
      chatBox.innerHTML = '';
      if (!data.messages || data.messages.length === 0) {
        chatBox.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding-top:2rem;">El muro está vacío. ¡Sé el primero en debatir!</div>`;
        return;
      }
      
      data.messages.forEach(msg => {
        const isMe = msg.correo === currentUser.email;
        const bubble = document.createElement('div');
        bubble.className = `chat-msg ${isMe ? 'sent' : 'received'}`;
        
        const time = msg.fecha_envio ? msg.fecha_envio.split(' ')[1] || msg.fecha_envio : '';
        
        bubble.innerHTML = `
          <div class="chat-msg-meta">
            <span class="chat-msg-sender">${isMe ? 'Tú' : msg.nombre || msg.correo.split('@')[0]}</span>
            <span class="chat-msg-time">${time}</span>
          </div>
          <div class="chat-msg-text">${escapeHTML(msg.mensaje)}</div>
        `;
        chatBox.appendChild(bubble);
      });
      
      if (isAtBottom) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }
  } catch (err) {
    console.error('Error loading chat messages:', err);
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

async function sendChatMessage() {
  // VIP guard — F2P cannot post messages
  if (!currentUser || currentUser.rango !== 'VIP') {
    openCheckoutModal();
    return;
  }
  const input = document.getElementById('chat-input');
  if (!input) return;
  const msgText = input.value.trim();
  if (!msgText) return;
  
  input.disabled = true;
  
  try {
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'postChatMessage',
        spreadsheetId: currentSpreadsheetId,
        nombre: currentUser.name,
        correo: currentUser.email,
        key: currentUser.key,
        mensaje: msgText
      })
    });
    
    const data = await res.json();
    if (data.status === 'ok') {
      input.value = '';
      await loadChatMessages();
    } else {
      showSaveAlert('❌ ' + (data.message || 'Error al enviar mensaje.'), 'danger');
    }
  } catch (err) {
    showSaveAlert('❌ Error de red al enviar mensaje.', 'danger');
  } finally {
    input.disabled = false;
    input.focus();
  }
}

async function loadSocialTrends() {
  const container = document.getElementById('trends-container');
  if (!container) return;
  
  container.innerHTML = `<p class="text-center text-muted"><i class="fa-solid fa-spinner fa-spin"></i> Cargando tendencias...</p>`;
  
  try {
    const res = await fetch(`${CONFIG.API_URL}?action=getSocialTrends&spreadsheetId=${encodeURIComponent(currentSpreadsheetId)}&correo=${encodeURIComponent(currentUser.email)}&key=${encodeURIComponent(currentUser.key)}`);
    const data = await res.json();
    
    if (data.status === 'ok') {
      container.innerHTML = '';
      const trends = data.trends || {};
      
      const matchIds = Object.keys(trends);
      if (matchIds.length === 0) {
        container.innerHTML = `<p class="text-center text-muted">Aún no hay predicciones en esta liga para generar tendencias.</p>`;
        return;
      }
      
      matchIds.slice(0, 6).forEach(pid => {
        const trend = trends[pid];
        const m = GROUP_MATCHES.find(x => x.id === pid) || PLAYOFF_MATCHES.find(x => x.id === pid);
        if (!m) return;
        
        const hName = currentLang === 'es' ? m.h || m.label.split(':')[1]?.split(' vs ')[0]?.trim() || t('tbd') : m.h || m.label.split(':')[1]?.split(' vs ')[0]?.trim() || t('tbd');
        const aName = currentLang === 'es' ? m.a || m.label.split(' vs ')[1]?.trim() || t('tbd') : m.a || m.label.split(' vs ')[1]?.trim() || t('tbd');
        
        const item = document.createElement('div');
        item.className = 'trend-item';
        
        const lp = trend.local_pct || 0;
        const dp = trend.draw_pct || 0;
        const vp = trend.visit_pct || 0;
        
        item.innerHTML = `
          <div class="trend-match-title">${hName} vs ${aName}</div>
          <div class="trend-bar-row">
            <div class="trend-segment local" style="width: ${lp}%" title="Local: ${lp}%">${lp > 10 ? lp + '%' : ''}</div>
            <div class="trend-segment draw" style="width: ${dp}%" title="Empate: ${dp}%">${dp > 10 ? dp + '%' : ''}</div>
            <div class="trend-segment visitor" style="width: ${vp}%" title="Visitante: ${vp}%">${vp > 10 ? vp + '%' : ''}</div>
          </div>
          <div class="trend-legend-row">
            <span>Local (${lp}%)</span>
            <span>Empate (${dp}%)</span>
            <span>Vis. (${vp}%)</span>
          </div>
        `;
        container.appendChild(item);
      });
    } else {
      container.innerHTML = `<p class="text-center text-danger">${data.message || 'Error al cargar tendencias.'}</p>`;
    }
  } catch (err) {
    container.innerHTML = `<p class="text-center text-danger">Error de red al cargar tendencias.</p>`;
  }
}

async function adminSaveBranding() {
  const nameInput = document.getElementById('admin-brand-name');
  const logoInput = document.getElementById('admin-brand-logo');
  const btn = document.getElementById('admin-branding-btn');
  
  if (!nameInput || !logoInput || !btn) return;
  
  const nombreLiga = nameInput.value.trim();
  const logoUrl = logoInput.value.trim();
  
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Guardando...`;
  
  try {
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'updateBranding',
        spreadsheetId: currentSpreadsheetId,
        adminEmail: currentUser.email,
        adminKey: currentUser.key,
        logoUrl: logoUrl,
        nombreLiga: nombreLiga
      })
    });
    
    const data = await res.json();
    if (data.status === 'ok') {
      showSaveAlert('🎨 ¡Personalización de marca guardada con éxito!', 'success');
      applyBranding(logoUrl, nombreLiga);
    } else {
      showSaveAlert('❌ ' + (data.message || 'Error al guardar personalización.'), 'danger');
    }
  } catch (err) {
    showSaveAlert('❌ Error de red al guardar personalización.', 'danger');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Guardar Personalización`;
  }
}

function exportPredictionsToPDF() {
  if (!currentUser) {
    openAuthModal('register', 'Para descargar tu formato de quiniela en PDF debes registrarte primero.');
    return;
  }
  const originalTitle = document.title;
  const userName = currentUser ? currentUser.name.replace(/\s+/g, '_') : 'Participante';
  document.title = `Quiniela_MySportPrediction_${userName}`;
  
  // Inject user info to print-header
  const printMeta = document.getElementById('print-user-meta-info');
  if (printMeta) {
    const aliasText = currentUser.alias ? ` (${currentUser.alias})` : '';
    printMeta.innerHTML = `<strong>Participante:</strong> ${currentUser.name}${aliasText}<br><strong>Correo:</strong> ${currentUser.email}<br><strong>Clave de Acceso:</strong> ${currentUser.key}`;
  }

  // --- PRINT ALL GROUPS ---
  // We temporarily manipulate the DOM to show ALL match cards for print
  const container = document.getElementById('matches-container');
  const originalHTML = container ? container.innerHTML : '';
  const originalStage = activeStage;
  const originalGroup = activeGroup;

  // Build all matches HTML (groups + playoffs) for printing
  if (container) {
    let allMatchesHTML = '';

    // Add all group matches
    GROUPS.forEach(group => {
      const groupMatches = GROUP_MATCHES.filter(m => m.g === group);
      allMatchesHTML += `<div style="page-break-inside:avoid; margin-bottom:0.5rem;"><h4 style="font-size:0.9rem; font-weight:700; color:#555; margin:0.5rem 0 0.25rem; border-bottom:1px solid #ddd; padding-bottom:0.25rem;">GRUPO ${group}</h4>`;
      groupMatches.forEach(m => {
        const pred = predictions[m.id] || { h: 0, a: 0 };
        allMatchesHTML += `
          <div class="match-card card visible" style="margin-bottom:0.4rem; break-inside:avoid;">
            <div class="match-card-header">
              <span class="match-id-badge">${m.id}</span>
              <div class="match-meta"><span class="match-date-tag">${m.d}</span><span>${m.t} EST</span></div>
            </div>
            <div class="match-teams-row">
              <div class="team-side"><span class="team-name">${m.h}</span></div>
              <div class="score-inputs">
                <div class="goal-control"><span class="goal-display" id="pdf-goal-h-${m.id}">${pred.h}</span></div>
                <span class="vs-sep">–</span>
                <div class="goal-control"><span class="goal-display" id="pdf-goal-a-${m.id}">${pred.a}</span></div>
              </div>
              <div class="team-side visitor"><span class="team-name">${m.a}</span></div>
            </div>
          </div>`;
      });
      allMatchesHTML += `</div>`;
    });

    // Add playoff matches
    if (PLAYOFF_MATCHES && PLAYOFF_MATCHES.length > 0) {
      allMatchesHTML += `<div style="page-break-before:always;"><h4 style="font-size:0.9rem; font-weight:700; color:#555; margin:0.5rem 0 0.25rem; border-bottom:1px solid #ddd; padding-bottom:0.25rem;">FASE ELIMINATORIA</h4>`;
      PLAYOFF_MATCHES.forEach(m => {
        const pred = predictions[m.id] || { h: 0, a: 0 };
        allMatchesHTML += `
          <div class="match-card card visible" style="margin-bottom:0.4rem; break-inside:avoid;">
            <div class="match-card-header">
              <span class="match-id-badge">${m.id}</span>
              <div class="match-meta"><span class="match-date-tag">${m.d || ''}</span><span>${m.label || m.id}</span></div>
            </div>
            <div class="match-teams-row">
              <div class="team-side"><span class="team-name">${m.h || '?'}</span></div>
              <div class="score-inputs">
                <div class="goal-control"><span class="goal-display">${pred.h}</span></div>
                <span class="vs-sep">–</span>
                <div class="goal-control"><span class="goal-display">${pred.a}</span></div>
              </div>
              <div class="team-side visitor"><span class="team-name">${m.a || '?'}</span></div>
            </div>
          </div>`;
      });
      allMatchesHTML += `</div>`;
    }

    container.innerHTML = allMatchesHTML;
  }

  // Force matches-list to not clip during print
  const matchesList = document.querySelector('.matches-list');
  const origMaxHeight = matchesList ? matchesList.style.maxHeight : null;
  const origOverflow = matchesList ? matchesList.style.overflow : null;
  if (matchesList) {
    matchesList.style.maxHeight = 'none';
    matchesList.style.overflow = 'visible';
  }

  window.print();

  // Restore everything
  document.title = originalTitle;
  if (container) container.innerHTML = originalHTML;
  if (matchesList) {
    matchesList.style.maxHeight = origMaxHeight;
    matchesList.style.overflow = origOverflow;
  }
  // Re-render correct stage
  switchFixtureStage(originalStage);
  if (originalStage === 'groups') renderGroupMatches(originalGroup);
}

/* ==========================================================================
   🎬 GSAP LANDING PAGE TIMELINE
   ========================================================================== */
function triggerLandingAnimations() {
  const landingCard = document.querySelector('.select-role-card');
  const roleCards = document.querySelectorAll('.role-option-card');
  const title = document.querySelector('.logo-title');
  const subtitle = document.querySelector('.logo-subtitle');
  const avatars = document.querySelectorAll('.legend-avatar');
  const ballHolder = document.getElementById('ball-3d-container');

  if (!landingCard) return;

  // Initial values for transition
  gsap.set(landingCard, { opacity: 0, y: 40, scale: 0.96 });
  gsap.set(avatars, { opacity: 0, scale: 0, y: -20 });
  gsap.set(ballHolder, { opacity: 0, scale: 0.1 });
  gsap.set(title, { opacity: 0, y: 15 });
  gsap.set(subtitle, { opacity: 0, y: 10 });
  gsap.set(roleCards, { opacity: 0, rotationY: -35, y: 30 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

  tl.to(landingCard, { opacity: 1, y: 0, scale: 1, duration: 1.1 })
    .to(avatars, { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.6 }, '-=0.6')
    .to(ballHolder, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.5')
    .to(title, { opacity: 1, y: 0 }, '-=0.4')
    .to(subtitle, { opacity: 1, y: 0 }, '-=0.5')
    .to(roleCards, { opacity: 1, rotationY: 0, y: 0, stagger: 0.18, duration: 0.95 }, '-=0.4');
}

/* ==========================================================================
   🌀 INTERACTIVE 3D ENGINE (THREE.JS)
   ========================================================================== */
function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  const ballContainer = document.getElementById('ball-3d-container');
  if (!canvas || !ballContainer) return;

  // ─── 1. SETUP MAIN SCENE (Background Plexus Stars/Particles) ───
  const bgScene = new THREE.Scene();
  const bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  bgCamera.position.z = 5;

  const bgRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle System Parameters for Plexus
  const particleCount = 135;
  const maxConnections = 240;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const x = (Math.random() - 0.5) * 16;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 8 - 2; // slightly pushed back

    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;

    originalPositions[i] = x;
    originalPositions[i + 1] = y;
    originalPositions[i + 2] = z;

    velocities[i] = (Math.random() - 0.5) * 0.005;
    velocities[i + 1] = (Math.random() - 0.5) * 0.005;
    velocities[i + 2] = (Math.random() - 0.5) * 0.002;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Custom circular glowing texture drawn via canvas
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 16;
  pCanvas.height = 16;
  const pCtx = pCanvas.getContext('2d');
  const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(236, 208, 111, 1)'); // gold core
  grad.addColorStop(0.3, 'rgba(42, 159, 214, 0.85)'); // teal glow
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  pCtx.fillStyle = grad;
  pCtx.fillRect(0, 0, 16, 16);
  const particleTexture = new THREE.CanvasTexture(pCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.22,
    map: particleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  bgScene.add(particleSystem);

  // Plexus Lines Setup
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxConnections * 2 * 3);
  const lineColors = new Float32Array(maxConnections * 2 * 3);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  bgScene.add(lineSegments);

  const bgAmbient = new THREE.AmbientLight(0xffffff, 0.6);
  bgScene.add(bgAmbient);

  // ─── 2. SETUP BALL SCENE (Floating VIP Geodesic Ball + Orbital Rings) ───
  const ballScene = new THREE.Scene();
  const ballCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  ballCamera.position.z = 6.4;

  const ballRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  ballRenderer.setSize(130, 130);
  ballRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  ballContainer.appendChild(ballRenderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ballScene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xecd06f, 2.0); // shiny gold light
  dirLight1.position.set(5, 5, 5);
  ballScene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x2a9fd6, 1.6); // electric teal light
  dirLight2.position.set(-5, -3, 2);
  ballScene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xffffff, 1.4, 10);
  pointLight.position.set(0, 0, 4);
  ballScene.add(pointLight);

  const ballGroup = new THREE.Group();

  // Core (Faceted high-tech carbon gold-blue core)
  const coreGeo = new THREE.IcosahedronGeometry(1.82, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0d111d,
    emissive: 0x111e33, // deep blue emissive base
    roughness: 0.15,
    metalness: 0.95,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  ballGroup.add(coreMesh);

  // Geodesic Wireframe (gold shiny cages)
  const wireGeo = new THREE.IcosahedronGeometry(2.0, 1);
  const wireframeMat = new THREE.MeshStandardMaterial({
    color: 0xecd06f,
    metalness: 0.95,
    roughness: 0.05,
    wireframe: true
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireframeMat);
  ballGroup.add(wireMesh);

  // Intersection Nodes (gold metallic sphere nodes)
  const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0xf5d76e,
    metalness: 0.95,
    roughness: 0.05
  });

  const posAttr = wireGeo.attributes.position;
  const uniqueNodes = [];

  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);

    let exists = false;
    for (let u of uniqueNodes) {
      if (Math.abs(u.x - vx) < 0.01 && Math.abs(u.y - vy) < 0.01 && Math.abs(u.z - vz) < 0.01) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      uniqueNodes.push({ x: vx, y: vy, z: vz });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(vx, vy, vz);
      ballGroup.add(nodeMesh);
    }
  }

  // ─── Orbital Rings (Futuristic VIP HUD elements) ───
  const ringGroup = new THREE.Group();

  // Ring 1 (Gold)
  const ringGeo1 = new THREE.RingGeometry(2.35, 2.38, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0xecd06f,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  ringGroup.add(ring1);

  // Ring 2 (Teal)
  const ringGeo2 = new THREE.RingGeometry(2.52, 2.55, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x2a9fd6,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 4;
  ringGroup.add(ring2);

  // Satellites (Orbiting nodes)
  const satGeo = new THREE.SphereGeometry(0.065, 12, 12);
  const satMat1 = new THREE.MeshBasicMaterial({ color: 0xffe484 });
  const satMesh1 = new THREE.Mesh(satGeo, satMat1);
  ring1.add(satMesh1);

  const satMat2 = new THREE.MeshBasicMaterial({ color: 0x55bde8 });
  const satMesh2 = new THREE.Mesh(satGeo, satMat2);
  ring2.add(satMesh2);

  ballGroup.add(ringGroup);
  ballScene.add(ballGroup);

  // ─── 3. SETUP TROPHY SCENE (Golden Faceted Trophy + Gold dust particles) ───
  const trophyCanvas = document.getElementById('prize-3d-canvas');
  let trophyScene, trophyCamera, trophyRenderer, trophyGroup;
  let tParticleGeo, tParticleCount = 40, tVelocities;
  let tIsDragging = false, tPreviousMouseX = 0, tDragVelocityX = 0;

  if (trophyCanvas) {
    trophyScene = new THREE.Scene();
    trophyCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    trophyCamera.position.set(0, 0, 4.8);

    trophyRenderer = new THREE.WebGLRenderer({ canvas: trophyCanvas, alpha: true, antialias: true });
    trophyRenderer.setSize(120, 120);
    trophyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const trophyAmbient = new THREE.AmbientLight(0xffffff, 0.55);
    trophyScene.add(trophyAmbient);

    const trophyDirLight1 = new THREE.DirectionalLight(0xfff0b3, 2.5); // gold glow
    trophyDirLight1.position.set(3, 4, 3);
    trophyScene.add(trophyDirLight1);

    const trophyDirLight2 = new THREE.DirectionalLight(0xffd700, 1.5);
    trophyDirLight2.position.set(-3, -2, 2);
    trophyScene.add(trophyDirLight2);

    trophyGroup = new THREE.Group();

    // Gold Material (Faceted low-poly aesthetic)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xecd06f,
      emissive: 0x2b1c00,
      metalness: 0.98,
      roughness: 0.12,
      flatShading: true
    });

    // Dark base connector
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.8,
      flatShading: true
    });

    // 1. Trophy Base
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.7, 0.35, 10);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.1;
    trophyGroup.add(baseMesh);

    // 2. Base Ring Accent
    const ringGeo = new THREE.TorusGeometry(0.38, 0.06, 6, 12);
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.9;
    trophyGroup.add(ringMesh);

    // 3. Stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.55, 8);
    const stemMesh = new THREE.Mesh(stemGeo, goldMat);
    stemMesh.position.y = -0.6;
    trophyGroup.add(stemMesh);

    // 4. Pedestal Cup connector
    const connGeo = new THREE.SphereGeometry(0.24, 8, 8);
    const connMesh = new THREE.Mesh(connGeo, goldMat);
    connMesh.position.y = -0.3;
    trophyGroup.add(connMesh);

    // 5. Cup Bowl (faceted cone)
    const bowlGeo = new THREE.CylinderGeometry(0.7, 0.18, 0.95, 10, 1, true); // open ended
    const bowlMesh = new THREE.Mesh(bowlGeo, goldMat);
    bowlMesh.position.y = 0.25;
    trophyGroup.add(bowlMesh);

    // 6. Rim
    const rimGeo = new THREE.TorusGeometry(0.7, 0.045, 6, 20);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.725;
    trophyGroup.add(rimMesh);

    // 7. Inner lid
    const lidGeo = new THREE.ConeGeometry(0.68, 0.22, 10);
    const lidMesh = new THREE.Mesh(lidGeo, goldMat);
    lidMesh.position.y = 0.725;
    trophyGroup.add(lidMesh);

    // 8. Crown on top
    const crownGeo = new THREE.SphereGeometry(0.08, 6, 6);
    const crownMesh = new THREE.Mesh(crownGeo, goldMat);
    crownMesh.position.y = 0.9;
    trophyGroup.add(crownMesh);

    // 9. Handles (Left / Right torus curves)
    const handleGeoL = new THREE.TorusGeometry(0.3, 0.055, 6, 12, Math.PI * 1.2);
    const handleMeshL = new THREE.Mesh(handleGeoL, goldMat);
    handleMeshL.position.set(-0.55, 0.35, 0);
    handleMeshL.rotation.z = Math.PI * 0.4;
    trophyGroup.add(handleMeshL);

    const handleGeoR = new THREE.TorusGeometry(0.3, 0.055, 6, 12, Math.PI * 1.2);
    const handleMeshR = new THREE.Mesh(handleGeoR, goldMat);
    handleMeshR.position.set(0.55, 0.35, 0);
    handleMeshR.rotation.z = -Math.PI * 0.4;
    trophyGroup.add(handleMeshR);

    trophyScene.add(trophyGroup);

    // 10. Gold Dust Particles floating upwards
    tParticleGeo = new THREE.BufferGeometry();
    const tPositions = new Float32Array(tParticleCount * 3);
    tVelocities = new Float32Array(tParticleCount * 3);

    for (let i = 0; i < tParticleCount * 3; i += 3) {
      tPositions[i] = (Math.random() - 0.5) * 1.8;      // x
      tPositions[i + 1] = (Math.random() - 0.5) * 2.2;  // y
      tPositions[i + 2] = (Math.random() - 0.5) * 1.8;  // z

      tVelocities[i] = (Math.random() - 0.5) * 0.002;
      tVelocities[i + 1] = Math.random() * 0.006 + 0.002; // floating up
      tVelocities[i + 2] = (Math.random() - 0.5) * 0.002;
    }

    tParticleGeo.setAttribute('position', new THREE.BufferAttribute(tPositions, 3));

    // Glow texture for particles
    const tpCanvas = document.createElement('canvas');
    tpCanvas.width = 16;
    tpCanvas.height = 16;
    const tpCtx = tpCanvas.getContext('2d');
    const tGrad = tpCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    tGrad.addColorStop(0, 'rgba(255, 220, 100, 1)');
    tGrad.addColorStop(0.4, 'rgba(236, 208, 111, 0.8)');
    tGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    tpCtx.fillStyle = tGrad;
    tpCtx.fillRect(0, 0, 16, 16);
    const tParticleTexture = new THREE.CanvasTexture(tpCanvas);

    const tParticleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: tParticleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const tParticleSystem = new THREE.Points(tParticleGeo, tParticleMat);
    trophyScene.add(tParticleSystem);

    // Handle drag for trophy
    trophyCanvas.addEventListener('mousedown', (e) => {
      tIsDragging = true;
      tPreviousMouseX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (tIsDragging) {
        const deltaX = e.clientX - tPreviousMouseX;
        trophyGroup.rotation.y += deltaX * 0.015;
        tDragVelocityX = deltaX * 0.015;
        tPreviousMouseX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      tIsDragging = false;
    });

    // Touch Support for trophy
    trophyCanvas.addEventListener('touchstart', (e) => {
      tIsDragging = true;
      if (e.touches[0]) tPreviousMouseX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (tIsDragging && e.touches[0]) {
        const deltaX = e.touches[0].clientX - tPreviousMouseX;
        trophyGroup.rotation.y += deltaX * 0.018;
        tDragVelocityX = deltaX * 0.018;
        tPreviousMouseX = e.touches[0].clientX;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      tIsDragging = false;
    });
  }

  // Drag controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let dragVelocity = { x: 0, y: 0 };

  ballContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      ballGroup.rotation.y += deltaMove.x * 0.01;
      ballGroup.rotation.x += deltaMove.y * 0.01;

      dragVelocity = {
        x: deltaMove.x * 0.01,
        y: deltaMove.y * 0.01
      };

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Mobile Touch Support
  ballContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) {
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) {
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      ballGroup.rotation.y += deltaMove.x * 0.012;
      ballGroup.rotation.x += deltaMove.y * 0.012;

      dragVelocity = {
        x: deltaMove.x * 0.012,
        y: deltaMove.y * 0.012
      };

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mouse Tracking for Particle repelling
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smooth Mouse coordinates Easing
    mouse.x += (mouse.targetX - mouse.x) * 0.07;
    mouse.y += (mouse.targetY - mouse.y) * 0.07;

    // --- Interactive Plexus Starfield Physics ---
    const bgPosAttr = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      let px = bgPosAttr.getX(i);
      let py = bgPosAttr.getY(i);
      let pz = bgPosAttr.getZ(i);

      // 1. Gentle continuous float
      px += velocities[i * 3];
      py += velocities[i * 3 + 1];
      pz += velocities[i * 3 + 2];

      // Bounce back in range
      if (Math.abs(px) > 9) velocities[i * 3] *= -1;
      if (Math.abs(py) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pz) > 6) velocities[i * 3 + 2] *= -1;

      // 2. Mouse Repelling Force
      const mouse3D = new THREE.Vector3(mouse.x * 7, mouse.y * 4, 0);
      const dist = Math.hypot(px - mouse3D.x, py - mouse3D.y);

      if (dist < 1.9) {
        const force = (1.9 - dist) * 0.045;
        const angle = Math.atan2(py - mouse3D.y, px - mouse3D.x);
        px += Math.cos(angle) * force;
        py += Math.sin(angle) * force;
      } else {
        // Return back to natural orbit
        const origX = originalPositions[i * 3];
        const origY = originalPositions[i * 3 + 1];
        px += (origX - px) * 0.007;
        py += (origY - py) * 0.007;
      }

      bgPosAttr.setXYZ(i, px, py, pz);
    }
    bgPosAttr.needsUpdate = true;
    particleSystem.rotation.y = time * 0.012;

    // --- Connect Lines for Plexus Network ---
    let lineIdx = 0;
    const linePosAttr = lineGeometry.attributes.position;
    const lineColAttr = lineGeometry.attributes.color;

    for (let i = 0; i < particleCount; i++) {
      const ix = bgPosAttr.getX(i);
      const iy = bgPosAttr.getY(i);
      const iz = bgPosAttr.getZ(i);

      for (let j = i + 1; j < particleCount; j++) {
        if (lineIdx >= maxConnections) break;

        const jx = bgPosAttr.getX(j);
        const jy = bgPosAttr.getY(j);
        const jz = bgPosAttr.getZ(j);

        const dx = ix - jx;
        const dy = iy - jy;
        const dz = iz - jz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.95) {
          const alpha = 1.0 - (dist / 1.95);

          // Vertex 1
          linePosAttr.setXYZ(lineIdx * 2, ix, iy, iz);
          // Vertex 2
          linePosAttr.setXYZ(lineIdx * 2 + 1, jx, jy, jz);

          // Interpolated gold-teal glowing colors
          const r = 0.16 + 0.84 * alpha;
          const g = 0.62 + 0.22 * alpha;
          const b = 0.84 - 0.35 * alpha;

          lineColAttr.setXYZ(lineIdx * 2, r * alpha * 0.4, g * alpha * 0.4, b * alpha * 0.4);
          lineColAttr.setXYZ(lineIdx * 2 + 1, r * alpha * 0.4, g * alpha * 0.4, b * alpha * 0.4);

          lineIdx++;
        }
      }
    }
    // Zero out unused connections
    for (let i = lineIdx; i < maxConnections; i++) {
      linePosAttr.setXYZ(i * 2, 0, 0, 0);
      linePosAttr.setXYZ(i * 2 + 1, 0, 0, 0);
      lineColAttr.setXYZ(i * 2, 0, 0, 0);
      lineColAttr.setXYZ(i * 2 + 1, 0, 0, 0);
    }
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    // --- VIP Geodesic Soccer Ball rotation & float ---
    if (!isDragging) {
      ballGroup.rotation.y += 0.004 + dragVelocity.x;
      ballGroup.rotation.x += 0.0015 + dragVelocity.y;

      dragVelocity.x *= 0.94;
      dragVelocity.y *= 0.94;
    }

    // Inner core heart-beat emissive pulsing
    const pulseIntensity = 0.2 + Math.sin(time * 2.2) * 0.15;
    coreMat.emissive.setHex(0x111e33).multiplyScalar(1 + pulseIntensity * 3);

    // Orbiting satellites on HUD rings
    const satAngle1 = time * 1.3;
    satMesh1.position.set(Math.cos(satAngle1) * 2.365, Math.sin(satAngle1) * 2.365, 0);

    const satAngle2 = -time * 1.8;
    satMesh2.position.set(Math.cos(satAngle2) * 2.535, Math.sin(satAngle2) * 2.535, 0);

    // Rotate the HUD rings in opposite directions
    ring1.rotation.z = time * 0.2;
    ring2.rotation.z = -time * 0.3;

    // Hover floating
    ballGroup.position.y = Math.sin(time * 1.2) * 0.12;

    // --- Golden Trophy rotation, floating & gold dust particles ---
    if (trophyCanvas) {
      if (!tIsDragging) {
        trophyGroup.rotation.y += 0.0085 + tDragVelocityX;
        tDragVelocityX *= 0.94;
      }
      trophyGroup.position.y = Math.sin(time * 1.6) * 0.07; // floating

      // Update trophy particles
      const tPosAttr = tParticleGeo.attributes.position;
      for (let i = 0; i < tParticleCount; i++) {
        let tx = tPosAttr.getX(i);
        let ty = tPosAttr.getY(i);
        let tz = tPosAttr.getZ(i);

        tx += tVelocities[i * 3];
        ty += tVelocities[i * 3 + 1];
        tz += tVelocities[i * 3 + 2];

        // Reset particle if it floats past top boundary
        if (ty > 1.2) {
          tx = (Math.random() - 0.5) * 1.8;
          ty = -1.2;
          tz = (Math.random() - 0.5) * 1.8;
        }

        tPosAttr.setXYZ(i, tx, ty, tz);
      }
      tPosAttr.needsUpdate = true;

      trophyRenderer.render(trophyScene, trophyCamera);
    }

    bgRenderer.render(bgScene, bgCamera);
    ballRenderer.render(ballScene, ballCamera);
  }

  animate();
}


/* ==========================================================================
   👥 GUEST MODE & AUTH REGISTRATION MODULE (MYSPORTPREDICTION)
   ========================================================================== */
function initGuestSession() {
  currentUser = null;
  activeSpreadsheetId = 'GLOBAL_LIGA_2026';
  currentSpreadsheetId = 'GLOBAL_LIGA_2026';
  currentQuinielaType = 'Completa';
  predictions = {};
  userPrivateLeagues = [];

  const subtabsContainer = document.getElementById('leaderboard-subtabs-container');
  if (subtabsContainer) subtabsContainer.style.display = 'none';
  const adminQuinielaTab = document.getElementById('tab-admin-quiniela');
  if (adminQuinielaTab) adminQuinielaTab.style.display = 'none';

  // Load guest predictions if saved locally
  const saved = localStorage.getItem('quinielaPreds_guest');
  if (saved) predictions = JSON.parse(saved);

  // Directly show main app dashboard, hide any overlays
  const landingScreen = document.getElementById('landing-screen');
  if (landingScreen) landingScreen.classList.add('hidden');
  const appEl = document.getElementById('app-content');
  if (appEl) appEl.classList.remove('hidden');

  // Show rules FAB for guest too
  const rulesFab = document.getElementById('rules-fab');
  if (rulesFab) rulesFab.style.display = '';

  // Welcome Header Guest customization
  updateUserHeaderUI();
  updateAvatarUI(null);

  switchFixtureStage('groups');
  updateStandingsPanel('A');
  updateBestThirdsPanel();
  initCountdown();
  checkDeadline();
  initDeadlineWarning();
  loadLeaderboard();
  updatePaywalls();
  
  // Set active tab to predictions
  switchTab('predictions');

  setTimeout(initMatchAnimations, 200);
}

function openAuthModal(mode = 'register', msg = '') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  
  const alertEl = document.getElementById('auth-alert');
  const infoEl = document.getElementById('auth-info-alert');
  
  if (alertEl) alertEl.classList.add('hidden');
  
  if (msg) {
    if (infoEl) {
      infoEl.textContent = msg;
      infoEl.classList.remove('hidden');
    }
  } else {
    if (infoEl) infoEl.classList.add('hidden');
  }

  toggleAuthForm(mode);
  
  modal.style.display = 'flex';
  gsap.fromTo('.auth-card', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.4)' });
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  gsap.to('.auth-card', { scale: 0.85, opacity: 0, duration: 0.25, onComplete: () => { modal.style.display = 'none'; } });
}

function toggleAuthForm(mode) {
  const title = document.getElementById('auth-modal-title');
  const regForm = document.getElementById('auth-register-form');
  const loginForm = document.getElementById('auth-login-form');
  
  if (mode === 'register') {
    if (title) title.innerHTML = '<i class="fa-solid fa-user-plus text-gold"></i> Registrarse en MySportPrediction';
    if (regForm) regForm.classList.remove('hidden');
    if (loginForm) loginForm.classList.add('hidden');
  } else {
    if (title) title.innerHTML = '<i class="fa-solid fa-right-to-bracket text-gold"></i> Iniciar Sesión';
    if (regForm) regForm.classList.add('hidden');
    if (loginForm) loginForm.classList.remove('hidden');
  }
}

async function handleRegistration(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const alias = document.getElementById('reg-alias').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  
  const activeBtnId = document.activeElement ? document.activeElement.id : '';
  const rango = (activeBtnId === 'btn-reg-vip') ? 'VIP' : 'F2P';

  const alertEl = document.getElementById('auth-alert');
  const infoEl = document.getElementById('auth-info-alert');
  
  if (alertEl) alertEl.classList.add('hidden');
  if (infoEl) infoEl.classList.add('hidden');

  if (rango === 'VIP') {
    if (!name || !email) {
      if (alertEl) {
        alertEl.textContent = 'Por favor, completa Nombre y Correo.';
        alertEl.classList.remove('hidden');
      }
      return;
    }
    tempRegData = { name, alias, email, rango: 'VIP' };
    closeAuthModal();
    openCheckoutModal();
    return;
  }

  const btn = document.getElementById(activeBtnId || 'btn-reg-f2p');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';

  try {
    const url = `${CONFIG.API_URL}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'registerUser',
        nombre: name,
        alias: alias,
        pais: '',
        ciudad: '',
        email: email,
        rango: rango
      })
    });

    if (!res.ok) throw new Error('network');
    const data = await res.json();

    if (data.status !== 'ok') {
      if (alertEl) {
        alertEl.textContent = data.message || 'Error en el registro.';
        alertEl.classList.remove('hidden');
      }
      btn.disabled = false;
      btn.innerHTML = originalHtml;
      return;
    }

    // Set active user session
    currentUser = {
      name: data.nombre,
      alias: data.alias || alias,
      pais: data.pais || "",
      ciudad: data.ciudad || "",
      email: email,
      key: data.key,
      spreadsheetId: data.quinielaId,
      type: 'Completa',
      role: 'Participante',
      rango: data.rango,
      nivel: data.rango === 'VIP' ? 'Premium' : 'Free'
    };

    activeSpreadsheetId = currentUser.spreadsheetId || 'GLOBAL_LIGA_2026';
    currentSpreadsheetId = activeSpreadsheetId;
    localStorage.setItem('activeSpreadsheetId', activeSpreadsheetId);
    sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
    currentQuinielaType = currentUser.type;

    // Push guest predictions to DB
    if (Object.keys(predictions).length > 0) {
      localStorage.setItem(getPredictionsKey(), JSON.stringify(predictions));
      try {
        await fetch(`${CONFIG.API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save',
            nombre: currentUser.name,
            correo: currentUser.email,
            key: currentUser.key,
            spreadsheetId: currentUser.spreadsheetId,
            preds: JSON.stringify(predictions)
          })
        });
      } catch (saveErr) {
        console.error('Failed to sync guest predictions on signup:', saveErr);
      }
    }

    // Open success modal
    document.getElementById('reg-success-key').textContent = data.key;
    document.getElementById('reg-success-rango').textContent = data.rango;
    
    const successModal = document.getElementById('reg-success-modal');
    if (successModal) {
      closeAuthModal();
      successModal.style.display = 'flex';
      gsap.fromTo('.success-card', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.4)' });
      
      if (data.rango === 'VIP') {
        triggerVipEffects();
      }
    }
  } catch (err) {
    console.error(err);
    if (alertEl) {
      alertEl.textContent = 'Error de red. Verifica tu conexión.';
      alertEl.classList.remove('hidden');
    }
    btn.disabled = false;
    btn.innerHTML = originalHtml;
  }
}

function closeRegSuccessModal() {
  const successModal = document.getElementById('reg-success-modal');
  if (successModal) {
    gsap.to('.success-card', { scale: 0.85, opacity: 0, duration: 0.25, onComplete: () => { 
      successModal.style.display = 'none'; 
      window.location.reload(); 
    } });
  }
}

async function handleAuthLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-auth-email').value.trim().toLowerCase();
  const key = document.getElementById('login-auth-key').value.trim();
  const alertEl = document.getElementById('auth-alert');
  const btn = document.getElementById('auth-login-submit-btn');

  if (!email || !key) {
    if (alertEl) {
      alertEl.textContent = 'Por favor, rellena todos los campos.';
      alertEl.classList.remove('hidden');
    }
    return;
  }

  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Validando...';
  if (alertEl) alertEl.classList.add('hidden');

  try {
    const url = `${CONFIG.API_URL}?action=validate&email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.valid) {
      if (alertEl) {
        alertEl.textContent = 'Credenciales incorrectas.';
        alertEl.classList.remove('hidden');
      }
      btn.disabled = false;
      btn.innerHTML = originalText;
      return;
    }

    currentUser = {
      name: data.nombre,
      alias: data.alias || '',
      pais: data.pais || '',
      ciudad: data.ciudad || '',
      email: email,
      key: key,
      spreadsheetId: data.spreadsheetId,
      type: data.type,
      role: data.role || 'Participante',
      rango: data.rango || 'F2P',
      nivel: data.nivel || (data.rango === 'VIP' ? 'Premium' : 'Free')
    };

    activeSpreadsheetId = data.spreadsheetId || 'GLOBAL_LIGA_2026';
    localStorage.setItem('activeSpreadsheetId', activeSpreadsheetId);
    sessionStorage.setItem('quinielaUser', JSON.stringify(currentUser));
    closeAuthModal();
    window.location.reload();
  } catch (err) {
    console.error(err);
    if (alertEl) {
      alertEl.textContent = 'Error de conexión. Inténtalo de nuevo.';
      alertEl.classList.remove('hidden');
    }
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

function triggerVipEffects() {
  gsap.fromTo('.success-icon-wrapper i', { scale: 1, rotation: 0 }, { scale: 1.4, rotation: 360, duration: 0.8, yoyo: true, repeat: 1 });
  gsap.to('.success-card', { boxShadow: '0 0 40px rgba(42, 159, 214, 0.6), 0 0 20px rgba(236, 208, 111, 0.6)', duration: 0.5, repeat: 5, yoyo: true });
}

// ─── NEW FUNCTIONS FOR PARTICIPANT PROFILE & CREATING QUINIELAS ─────
function triggerAvatarUpload() {
  if (!currentUser) return;
  document.getElementById('avatar-file-input').click();
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona una imagen válida.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 184;
      canvas.width = size;
      canvas.height = size;
      
      let srcX = 0;
      let srcY = 0;
      let srcWidth = img.width;
      let srcHeight = img.height;
      
      if (img.width > img.height) {
        srcWidth = img.height;
        srcX = (img.width - img.height) / 2;
      } else {
        srcHeight = img.width;
        srcY = (img.height - img.width) / 2;
      }
      
      ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, size, size);
      const dataUrl = canvas.toDataURL('image/png');
      localStorage.setItem(`quinielaAvatar_${currentUser.email}`, dataUrl);
      updateAvatarUI(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function updateAvatarUI(dataUrl) {
  const avatarEl = document.getElementById('header-avatar');
  if (!avatarEl) return;
  
  if (dataUrl) {
    avatarEl.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    avatarEl.style.background = 'transparent';
  } else {
    if (currentUser) {
      avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
      avatarEl.style.background = 'var(--gradient-gold)';
    } else {
      avatarEl.textContent = 'G';
      avatarEl.style.background = '#4b5563';
    }
  }
}

function openCreateQuinielaModal() {
  const modal = document.getElementById('create-quiniela-modal');
  if (!modal) return;
  
  const emailInput = document.getElementById('modal-create-email');
  if (emailInput && currentUser && currentUser.email) {
    emailInput.value = currentUser.email;
  }
  
  const errEl = document.getElementById('modal-create-error');
  if (errEl) errEl.classList.add('hidden');
  
  modal.style.display = 'flex';
}

function closeCreateQuinielaModal() {
  const modal = document.getElementById('create-quiniela-modal');
  if (modal) modal.style.display = 'none';
}

function selectModalBillingLevel(level) {
  const freeCard = document.getElementById('modal-billing-free');
  const premCard = document.getElementById('modal-billing-premium');
  const privCard = document.getElementById('modal-billing-private');
  const levelInput = document.getElementById('modal-org-level');
  
  freeCard.classList.remove('active');
  premCard.classList.remove('active');
  if (privCard) privCard.classList.remove('active');
  
  if (level === 'Gratuita') {
    freeCard.classList.add('active');
    levelInput.value = 'Gratuita';
  } else if (level === 'Premium') {
    premCard.classList.add('active');
    levelInput.value = 'Premium';
  } else if (level === 'Privada') {
    if (privCard) privCard.classList.add('active');
    levelInput.value = 'Privada';
  }
}

async function handleModalCreateQuiniela(e) {
  e.preventDefault();
  const email = document.getElementById('modal-create-email').value.trim().toLowerCase();
  const type = document.querySelector('input[name="modal-create-type"]:checked').value;
  const level = 'Privada';
  const btn = document.getElementById('modal-create-submit');
  const errEl = document.getElementById('modal-create-error');
  
  if (!email) {
    errEl.textContent = 'Ingresa un correo electrónico.';
    errEl.classList.remove('hidden');
    return;
  }
  
  const pozoEl = document.getElementById('modal-tiene-pozo');
  const montoEl = document.getElementById('modal-monto-inscripcion');
  const contratoEl = document.getElementById('modal-acepta-contrato');
  
  const tienePozo = (pozoEl && pozoEl.checked) ? 'true' : 'false';
  const montoInscripcion = (montoEl && pozoEl.checked) ? montoEl.value.trim() : '0';
  const aceptaContrato = (contratoEl && contratoEl.checked) ? 'true' : 'false';
  
  if (!contratoEl || !contratoEl.checked) {
    errEl.textContent = 'Debe aceptar los términos de responsabilidad de la quiniela privada.';
    errEl.classList.remove('hidden');
    return;
  }
  
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creando Quiniela...`;
  errEl.classList.add('hidden');
  
  try {
    const url = `${CONFIG.API_URL}?action=createQuiniela&email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}&nivel=${encodeURIComponent(level)}&tiene_pozo=${tienePozo}&monto_inscripcion=${encodeURIComponent(montoInscripcion)}&acepta_contrato=${aceptaContrato}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.status === 'ok') {
      createdQuinielaData = {
        name: 'Administrador',
        email: email,
        key: data.key,
        spreadsheetId: data.spreadsheetId,
        type: data.type,
        role: 'Organizador',
        rango: (data.nivel === 'Premium' || data.nivel === 'Privada') ? 'VIP' : 'F2P',
        nivel: data.nivel
      };
      
      document.getElementById('success-org-key').textContent = data.key;
      document.getElementById('success-quiniela-type').textContent = data.type === 'Por fase' ? 'Por fase' : 'Completa';
      
      const urlContainer = document.getElementById('success-sheet-url');
      if (urlContainer && urlContainer.parentNode) {
        urlContainer.parentNode.style.display = 'none';
      }
      
      closeCreateQuinielaModal();
      document.getElementById('success-overlay').classList.remove('hidden');
    } else {
      if (data.code === 'VIP_REQUIRED') {
        errEl.innerHTML = `${data.message} <br><button class="btn btn-xs btn-gold mt-2" onclick="openCheckoutModal(); event.preventDefault();"><i class="fa-solid fa-gem"></i> Adquirir Pase VIP</button>`;
      } else {
        errEl.textContent = data.message || 'Error al crear la quiniela.';
      }
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = `<span>Crear Quiniela</span> <i class="fa-solid fa-plus"></i>`;
    }
  } catch (err) {
    errEl.textContent = 'Error de red: ' + err.message;
    errEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = `<span>Crear Quiniela</span> <i class="fa-solid fa-plus"></i>`;
  }
}

// ─── DAILY REWARDS & CYBORG CARD PACK OPENING REVEAL ENGINE ─────────
let revealedCardData = null;
let packOpeningParticles = [];
let packOpeningCanvasId = null;

function isCardUnlocked(cardName) {
  if (!currentUser) return false;
  // Admin automatically gets all unlocked
  if (currentUser.email === '2026quiniela2026@gmail.com') {
    return true;
  }
  const unlocked = localStorage.getItem(`unlockedCards_${currentUser.email}`);
  if (!unlocked) {
    // Freebie initial unlock for Messi on first load to make it feel alive!
    if (cardName === 'Lionel Messi') {
      const initList = ['Lionel Messi'];
      localStorage.setItem(`unlockedCards_${currentUser.email}`, JSON.stringify(initList));
      return true;
    }
    return false;
  }
  return JSON.parse(unlocked).includes(cardName);
}

function unlockCard(cardName) {
  if (!currentUser) return;
  const unlocked = localStorage.getItem(`unlockedCards_${currentUser.email}`);
  const list = unlocked ? JSON.parse(unlocked) : ['Lionel Messi'];
  if (!list.includes(cardName)) {
    list.push(cardName);
    localStorage.setItem(`unlockedCards_${currentUser.email}`, JSON.stringify(list));
  }
}

function updateDailyRewardTimer() {
  const timerEl = document.getElementById('daily-claim-timer');
  const btnEl = document.getElementById('btn-claim-daily');
  if (!timerEl || !btnEl || !currentUser) return;

  const nextClaimTimeStr = localStorage.getItem(`nextDailyClaim_${currentUser.email}`);
  if (!nextClaimTimeStr) {
    timerEl.textContent = '¡Disponible ya!';
    btnEl.disabled = false;
    btnEl.classList.remove('btn-secondary');
    btnEl.classList.add('btn-gold');
    return;
  }

  const now = Date.now();
  const nextClaim = parseInt(nextClaimTimeStr);

  if (now >= nextClaim) {
    timerEl.textContent = '¡Disponible ya!';
    btnEl.disabled = false;
    btnEl.classList.remove('btn-secondary');
    btnEl.classList.add('btn-gold');
  } else {
    const diff = nextClaim - now;
    const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    
    timerEl.textContent = `${hrs}:${mins}:${secs}`;
    btnEl.disabled = true;
    btnEl.classList.remove('btn-gold');
    btnEl.classList.add('btn-secondary');
  }
}

function claimDailyCard() {
  if (!currentUser) return;
  // VIP guard — F2P cannot claim daily cards
  if (currentUser.rango !== 'VIP') {
    openCheckoutModal();
    return;
  }
  
  // 1. Double check cooldown
  const nextClaimTimeStr = localStorage.getItem(`nextDailyClaim_${currentUser.email}`);
  if (nextClaimTimeStr) {
    const now = Date.now();
    if (now < parseInt(nextClaimTimeStr)) {
      alert('Tu recompensa diaria todavía no está lista.');
      return;
    }
  }

  // 2. Select a random locked card (using weighted drop rates: 5% Neymar/CR7/Messi, 10% other Golden, 85% others)
  const lockedCards = CYBORG_PLAYERS.filter(p => !isCardUnlocked(p.NOMBRE_JUGADOR));
  let selectedCard = null;

  function pickWeightedCard(pool) {
    if (pool.length === 0) return null;
    const ultraRareNames = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr.'];
    const otherGoldenNames = [
      'Luka Modrić', 'Guillermo Ochoa', 'James Rodríguez', 
      'Kevin De Bruyne', 'Mohamed Salah', 'Sadio Mané', 
      'Son Heung-min', 'Virgil van Dijk'
    ];
    const items = pool.map(p => {
      let w = 0;
      if (ultraRareNames.includes(p.NOMBRE_JUGADOR)) {
        w = 5.0 / 3.0; // 5% split among 3 players
      } else if (otherGoldenNames.includes(p.NOMBRE_JUGADOR)) {
        w = 10.0 / 8.0; // 10% split among 8 players
      } else {
        w = 85.0 / 37.0; // 85% split among 37 players
      }
      return { player: p, weight: w };
    });
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let r = Math.random() * totalWeight;
    for (const item of items) {
      r -= item.weight;
      if (r <= 0) return item.player;
    }
    return items[items.length - 1].player;
  }

  if (lockedCards.length > 0) {
    selectedCard = pickWeightedCard(lockedCards);
  } else {
    // All cards unlocked! Re-roll an existing one for duplicate fun
    selectedCard = pickWeightedCard(CYBORG_PLAYERS);
  }

  revealedCardData = selectedCard;

  // 3. Reset pack reveal modal UI state
  const modal = document.getElementById('modal-pack-reveal');
  const pleft = modal.querySelector('.pack-left');
  const pright = modal.querySelector('.pack-right');
  const innerHolder = modal.querySelector('.pack-inner-card-holder');
  const label = document.getElementById('pack-instruction-label');
  const continueBtn = document.getElementById('btn-pack-continue');
  const container = document.getElementById('pack-3d-container');

  pleft.classList.remove('open');
  pright.classList.remove('open');
  innerHolder.classList.remove('reveal');
  innerHolder.innerHTML = '';
  label.style.display = 'block';
  label.textContent = '¡Haz clic para abrir el sobre!';
  continueBtn.style.display = 'none';
  container.classList.remove('shaking-pack');
  container.style.pointerEvents = 'auto';

  // Injected 3D card layout inside the pack reveal
  const sanitizedName = selectedCard.NOMBRE_JUGADOR.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const imgFilename = `${sanitizedName}.png`;
  const imgPath = `./Recursos/cards/${imgFilename}?v=lastdance`;

  let dotColor = '#00f2fe';
  if (selectedCard.COLOR_ENERGÍA.includes('rojo')) dotColor = '#ff2a2a';
  else if (selectedCard.COLOR_ENERGÍA.includes('verde')) dotColor = '#39ff14';
  else if (selectedCard.COLOR_ENERGÍA.includes('azul')) dotColor = '#00f2fe';
  else if (selectedCard.COLOR_ENERGÍA.includes('amarillo')) dotColor = '#ffd700';
  else if (selectedCard.COLOR_ENERGÍA.includes('púrpura') || selectedCard.COLOR_ENERGÍA.includes('plasma')) dotColor = '#b500ff';
  else if (selectedCard.COLOR_ENERGÍA.includes('blanco')) dotColor = '#ffffff';

  innerHolder.innerHTML = `
    <div class="trading-card" style="width: 240px; height: 336px; border-color: ${dotColor}; box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 25px ${dotColor}33; transform: rotateY(180deg);">
      <div class="card-shimmer"></div>
      <div class="trading-card-header">
        <div class="trading-card-banner">
          <span class="trading-card-name" style="font-size:0.9rem;">${selectedCard.TEXTO_BANNER}</span>
          <span class="trading-card-sub" style="font-size:0.6rem;">CYBORG ${selectedCard.NACIONALIDAD}</span>
        </div>
        <div class="trading-card-badge" style="width:28px; height:28px;">
          <i class="fa-solid fa-earth-americas" style="color:${dotColor}; font-size:0.85rem;"></i>
        </div>
      </div>
      <div class="trading-card-image-wrapper">
        <img class="trading-card-img" src="${imgPath}" alt="${selectedCard.NOMBRE_JUGADOR}" onerror="handleCardImgError(this, '${selectedCard.TEXTO_BANNER}', '${dotColor}')" style="transform:none;">
      </div>
      <div class="trading-card-footer">
        <div class="trading-card-energy-badge" style="padding:4px 10px;">
          <span class="trading-card-energy-dot" style="background-color:${dotColor}; width:8px; height:8px;"></span>
          <span style="font-size: 0.6rem; color: var(--text-secondary);">${selectedCard.COLOR_ENERGÍA.split(' ')[0]}</span>
        </div>
        <div class="trading-card-action-badge" style="padding:4px 8px; font-size: 0.6rem;">
          ${selectedCard.POSE_ASIGNADA.includes('Chilena') ? 'Chilena' :
            selectedCard.POSE_ASIGNADA.includes('Bicicleta') ? 'Bicicleta' :
            selectedCard.POSE_ASIGNADA.includes('Portero') || selectedCard.POSE_ASIGNADA.includes('tapar') ? 'Portero' :
            selectedCard.POSE_ASIGNADA.includes('Tiro Libre') ? 'Tiro Libre' :
            selectedCard.POSE_ASIGNADA.includes('Cabezazo') ? 'Cabezazo' : 'Full Speed'}
        </div>
      </div>
    </div>
  `;

  // Start shake animation
  container.classList.add('shaking-pack');
  
  // Show Modal
  modal.style.display = 'flex';
  initPackCanvas();
}

function openDailyPack() {
  const container = document.getElementById('pack-3d-container');
  if (!container.classList.contains('shaking-pack')) return; // already opened or opening

  container.style.pointerEvents = 'none';
  container.classList.remove('shaking-pack');

  // Trigger split layers
  const modal = document.getElementById('modal-pack-reveal');
  const pleft = modal.querySelector('.pack-left');
  const pright = modal.querySelector('.pack-right');
  const glow = modal.querySelector('.pack-reveal-glow');
  const innerHolder = modal.querySelector('.pack-inner-card-holder');
  const label = document.getElementById('pack-instruction-label');

  // Play digital opening audio if not muted
  const sound = document.getElementById('bg-music');
  if (sound && !audioMuted) {
    // short audio feedback can be simulated or we just pulse the background
  }

  pleft.classList.add('open');
  pright.classList.add('open');
  glow.style.opacity = '1';

  // Burst particles
  triggerBurstParticles();

  // Scale up and flip card
  setTimeout(() => {
    innerHolder.classList.add('reveal');
    label.style.display = 'none';
    
    // Unlock card in local storage
    if (revealedCardData) {
      unlockCard(revealedCardData.NOMBRE_JUGADOR);
    }

    // Save claim cooldown (24 hours)
    const claimCooldown = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(`nextDailyClaim_${currentUser.email}`, claimCooldown.toString());
    updateDailyRewardTimer();

    // Show continue CTA
    setTimeout(() => {
      document.getElementById('btn-pack-continue').style.display = 'inline-flex';
      renderCyborgAlbum(); // Refresh card album lists
    }, 800);

  }, 400);
}

function closePackRevealModal() {
  document.getElementById('modal-pack-reveal').style.display = 'none';
  // stop canvas animation
  if (packOpeningCanvasId) {
    cancelAnimationFrame(packOpeningCanvasId);
    packOpeningCanvasId = null;
  }
}

// ─── PARTICLE EXPLOSION SYSTEM (CANVAS) ─────────────────────────────
function initPackCanvas() {
  const canvas = document.getElementById('pack-reveal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Resize to match container bounding box
  const rect = canvas.parentNode.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  packOpeningParticles = [];
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = packOpeningParticles.length - 1; i >= 0; i--) {
      const p = packOpeningParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      p.rotation += p.vRotation;
      
      if (p.alpha <= 0) {
        packOpeningParticles.splice(i, 1);
        continue;
      }
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = p.glow ? 12 : 0;
      ctx.shadowColor = p.color;
      
      if (p.shape === 'star') {
        // draw a small star
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(Math.cos((18 + j * 72) * Math.PI / 180) * p.size, Math.sin((18 + j * 72) * Math.PI / 180) * p.size);
          ctx.lineTo(Math.cos((54 + j * 72) * Math.PI / 180) * (p.size / 2), Math.sin((54 + j * 72) * Math.PI / 180) * (p.size / 2));
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'rect') {
        // draw digital binary streams/circuits
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 2);
      } else {
        // simple circles
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
    
    packOpeningCanvasId = requestAnimationFrame(draw);
  }
  
  draw();
}

function triggerBurstParticles() {
  const canvas = document.getElementById('pack-reveal-canvas');
  if (!canvas) return;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  const colors = ['#00f2fe', '#b500ff', '#39ff14', '#ffd700', '#ff2a2a', '#ffffff'];
  
  // 150 high energy neon particles
  for (let i = 0; i < 160; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    const size = 3 + Math.random() * 6;
    const shape = Math.random() > 0.6 ? 'star' : (Math.random() > 0.5 ? 'rect' : 'circle');
    
    packOpeningParticles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      gravity: -0.02, // floaty feel
      alpha: 1.0,
      decay: 0.01 + Math.random() * 0.015,
      size: size,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRotation: -0.05 + Math.random() * 0.1,
      shape: shape,
      glow: Math.random() > 0.3
    });
  }
}

/* ==========================================================================
   🍪 COOKIE BANNER & LOGIN ICON INIT
   ========================================================================== */
function acceptCookies() {
  localStorage.setItem('mysportprediction_cookies_accepted', Date.now().toString());
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.animation = 'none';
    banner.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(() => { banner.style.display = 'none'; }, 420);
  }
}

function initCookieBanner() {
  const accepted = localStorage.getItem('mysportprediction_cookies_accepted');
  if (!accepted) {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  }
}

// Init cookie banner and login icon on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  // Show login icon if no active session
  const user = sessionStorage.getItem('quinielaUser');
  const loginBtn = document.getElementById('header-login-btn');
  if (loginBtn && !user) {
    loginBtn.style.display = 'flex';
  }
});

// ==========================================================================
// 🏆 PRIVATE QUINIELA ADMIN, INVITES & SUB-TABS MODULE
// ==========================================================================
let userPrivateLeagues = [];
let administeredQuinielaId = null;
let activeLeaderboardSubtab = 'GLOBAL_LIGA_2026';

function processInviteLink() {
  const params = new URLSearchParams(window.location.search);
  const inviteCode = params.get('invite');
  if (inviteCode && inviteCode.startsWith('Q-')) {
    localStorage.setItem('pendingInviteCode', inviteCode);
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    if (currentUser) {
      checkAndApplyPendingInvite();
    }
  }
}
processInviteLink();

async function checkAndApplyPendingInvite() {
  if (!currentUser) return;
  const inviteCode = localStorage.getItem('pendingInviteCode');
  if (inviteCode) {
    try {
      const res = await fetch(`${CONFIG.API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'joinPrivateQuiniela',
          email: currentUser.email,
          key: currentUser.key,
          spreadsheetId: inviteCode
        })
      }).then(r => r.json());
      
      localStorage.removeItem('pendingInviteCode');
      if (res.status === 'ok') {
        await loadUserPrivateLeagues();
        if (!res.alreadyJoined) {
          alert('¡Te has unido exitosamente a la quiniela privada!');
        }
      } else {
        alert('Error al unirse a la quiniela privada: ' + res.message);
      }
    } catch (err) {
      console.error('Error applying pending invite:', err);
    }
  }
}

async function loadUserPrivateLeagues() {
  if (!currentUser) return;
  
  const subtabsContainer = document.getElementById('leaderboard-subtabs-container');
  const adminQuinielaTab = document.getElementById('tab-admin-quiniela');
  
  if (adminQuinielaTab) adminQuinielaTab.style.display = 'none';
  if (subtabsContainer) {
    subtabsContainer.style.display = 'none';
    const dynButtons = subtabsContainer.querySelectorAll('.dyn-subtab');
    dynButtons.forEach(btn => btn.remove());
  }
  
  administeredQuinielaId = null;
  
  try {
    const res = await fetch(`${CONFIG.API_URL}?action=getUserPrivateLeagues&email=${encodeURIComponent(currentUser.email)}&key=${encodeURIComponent(currentUser.key)}`).then(r => r.json());
    if (res.status === 'ok') {
      userPrivateLeagues = res.leagues || [];
      
      if (userPrivateLeagues.length > 0 && subtabsContainer) {
        subtabsContainer.style.display = 'none';
        userPrivateLeagues.forEach(league => {
          const btn = document.createElement('button');
          btn.className = 'tab-btn btn-xs dyn-subtab';
          btn.id = `subtab-${league.quinielaId}`;
          btn.innerHTML = `<i class="fa-solid fa-trophy" style="margin-right:0.25rem;"></i> Tabla "${league.nombreLiga}"`;
          btn.onclick = () => switchLeaderboardSubtab(league.quinielaId);
          btn.style.padding = '0.25rem 0.75rem';
          btn.style.fontSize = '0.8rem';
          subtabsContainer.appendChild(btn);
          
          if (league.rol === 'Organizador') {
            administeredQuinielaId = league.quinielaId;
          }
        });
      }
      updateAdminTabVisibility();
    }
    // Update create/admin button in welcome card
    const createBtn = document.getElementById('create-quiniela-banner-btn');
    if (createBtn && currentUser && currentUser.rango === 'VIP') {
      createBtn.innerHTML = `<i class="fa-solid fa-plus-circle"></i> Crear Quiniela`;
      createBtn.onclick = () => openCreateQuinielaModal();
      createBtn.style.display = 'inline-flex';
    }
    // Update context toggle button
    updateContextToggleBtn();
  } catch (err) {
    console.error('Error loading user private leagues:', err);
  }
}

function switchLeaderboardSubtab(subtab) {
  activeLeaderboardSubtab = subtab;
  
  const allSubtabs = document.getElementById('leaderboard-subtabs-container').querySelectorAll('.tab-btn');
  allSubtabs.forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = subtab === 'GLOBAL_LIGA_2026' 
    ? document.getElementById('subtab-global') 
    : document.getElementById(`subtab-${subtab}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  const prizePoolCard = document.querySelector('.prize-pool-card');
  
  if (subtab === 'GLOBAL_LIGA_2026') {
    if (prizePoolCard) prizePoolCard.style.display = 'block';
    currentSpreadsheetId = activeSpreadsheetId;
  } else {
    if (prizePoolCard) prizePoolCard.style.display = 'none';
    currentSpreadsheetId = subtab;
  }
  
  loadLeaderboard();
}

async function loadPrivateAdminPanel() {
  if (!currentUser || !administeredQuinielaId) return;
  
  const titleEl = document.getElementById('admin-priv-title');
  const nameInput = document.getElementById('admin-priv-name-input');
  const inviteUrlBox = document.getElementById('admin-priv-invite-url-box');
  const alertEl = document.getElementById('admin-priv-alert');
  const tbody = document.getElementById('admin-priv-leaderboard-body');
  
  if (alertEl) alertEl.classList.add('hidden');
  if (inviteUrlBox) inviteUrlBox.classList.add('hidden');
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);"><i class="fa-solid fa-circle-notch fa-spin"></i> Cargando...</td></tr>`;
  
  try {
    const brandRes = await fetch(`${CONFIG.API_URL}?action=getBranding&spreadsheetId=${administeredQuinielaId}`).then(r => r.json());
    if (brandRes.status === 'ok') {
      const name = brandRes.nombreLiga || `Quiniela ${administeredQuinielaId}`;
      titleEl.innerHTML = `<i class="fa-solid fa-crown" style="color:var(--accent-gold);"></i> Administrar: ${name}`;
      nameInput.value = brandRes.nombreLiga || "";
    }
    
    const leadRes = await fetch(`${CONFIG.API_URL}?action=leaderboard&spreadsheetId=${administeredQuinielaId}`).then(r => r.json());
    if (leadRes.status === 'ok') {
      tbody.innerHTML = '';
      const data = leadRes.data || [];
      if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">Sin participantes registrados aún.</td></tr>`;
        return;
      }
      
      let currentRank = 1;
      let prevPoints = -1;
      data.forEach((row, idx) => {
        const name = row['Nombre'] || '—';
        const ptsElim = row['Puntos Eliminatoria'] !== undefined ? row['Puntos Eliminatoria'] : '0';
        const ptsSeg = row['Puntos Segunda Fase'] !== undefined ? row['Puntos Segunda Fase'] : '0';
        const ptsTot = Number(row['Puntos Totales'] || 0);
        
        if (idx > 0 && ptsTot < prevPoints) {
          currentRank = idx + 1;
        }
        prevPoints = ptsTot;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="text-align:center"><span class="rank-num">${currentRank}</span></td>
          <td><div class="player-info-cell"><div class="player-avatar-mini">${name.charAt(0).toUpperCase()}</div><span>${name}</span></div></td>
          <td style="text-align:center">${ptsElim}</td>
          <td style="text-align:center">${ptsSeg}</td>
          <td class="points-cell" style="text-align:center;font-weight:bold;color:var(--accent-gold);">${ptsTot} pts</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">Error: ${leadRes.message}</td></tr>`;
    }
  } catch (err) {
    console.error('Error loading private admin panel:', err);
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">Error de conexión al cargar datos.</td></tr>`;
  }
}

async function updatePrivateQuinielaName() {
  if (!currentUser || !administeredQuinielaId) return;
  const nameInput = document.getElementById('admin-priv-name-input');
  const alertEl = document.getElementById('admin-priv-alert');
  const newName = nameInput.value.trim();
  
  if (!newName) {
    alertEl.textContent = 'Por favor ingresa un nombre para la quiniela.';
    alertEl.classList.remove('hidden');
    return;
  }
  
  try {
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateBranding',
        spreadsheetId: administeredQuinielaId,
        adminEmail: currentUser.email,
        adminKey: currentUser.key,
        logoUrl: '',
        nombreLiga: newName
      })
    }).then(r => r.json());
    
    if (res.status === 'ok') {
      alert('Nombre de la quiniela actualizado exitosamente.');
      await loadPrivateAdminPanel();
      await loadUserPrivateLeagues();
    } else {
      alertEl.textContent = 'Error: ' + res.message;
      alertEl.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Error updating private quiniela name:', err);
    alertEl.textContent = 'Error de conexión al guardar cambios.';
    alertEl.classList.remove('hidden');
  }
}

function copyPrivateInviteLink() {
  if (!administeredQuinielaId) return;
  
  const inviteUrlBox = document.getElementById('admin-priv-invite-url-box');
  const inviteUrl = window.location.origin + window.location.pathname + '?invite=' + administeredQuinielaId;
  
  navigator.clipboard.writeText(inviteUrl).then(() => {
    inviteUrlBox.innerHTML = `<strong>Enlace copiado al portapapeles:</strong><br>${inviteUrl}`;
    inviteUrlBox.classList.remove('hidden');
  }).catch(err => {
    console.error('Failed to copy link:', err);
    inviteUrlBox.innerHTML = `<strong>Enlace de invitación:</strong><br>${inviteUrl}`;
    inviteUrlBox.classList.remove('hidden');
  });
}


// ─── LEAGUE SWITCH CONTEXT ──────────────────────────────────────
function switchQuinielaContext(targetId) {
  activeSpreadsheetId = targetId;
  currentSpreadsheetId = targetId;
  localStorage.setItem('activeSpreadsheetId', targetId);
  
  // Reload branding
  loadAndApplyBranding();
  
  // Update toggle button text/state
  updateContextToggleBtn();
  updateAdminTabVisibility();
  
  // Load predictions for this context
  const saved = localStorage.getItem(getPredictionsKey());
  if (saved) {
    predictions = JSON.parse(saved);
  } else {
    predictions = {};
  }
  
  // Sync predictions in background
  syncPredictionsWithServer();
  
  // Reload current active section
  const activeSec = document.querySelector('.content-section.active');
  if (activeSec) {
    const tabId = activeSec.id.replace('sec-', '');
    if (tabId === 'leaderboard') {
      switchLeaderboardSubtab(targetId);
    } else if (tabId === 'chat') {
      loadChatMessages();
    } else if (tabId === 'analytics') {
      loadSocialTrends();
    } else if (tabId === 'pronosticos') {
      if (activeStage === 'groups') {
        renderGroupMatches(activeGroup);
      } else {
        renderPlayoffMatches();
      }
    }
  }
}

function updateContextToggleBtn() {
  const toggleBtn = document.getElementById('toggle-quiniela-context-btn');
  if (!toggleBtn) return;
  
  if (!currentUser) {
    toggleBtn.style.display = 'none';
    return;
  }
  
  if (userPrivateLeagues.length === 0) {
    toggleBtn.style.display = 'none';
    return;
  }
  
  toggleBtn.style.display = 'inline-flex';
  
  if (activeSpreadsheetId === 'GLOBAL_LIGA_2026') {
    if (userPrivateLeagues.length === 1) {
      const league = userPrivateLeagues[0];
      toggleBtn.innerHTML = `<i class="fa-solid fa-shuffle"></i> Ver "${league.nombreLiga}"`;
      toggleBtn.onclick = () => switchQuinielaContext(league.quinielaId);
    } else {
      toggleBtn.innerHTML = `<i class="fa-solid fa-shuffle"></i> Cambiar Quiniela`;
      toggleBtn.onclick = () => promptSwitchQuinielaContext();
    }
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-shuffle"></i> Ver Quiniela Oficial`;
    toggleBtn.onclick = () => switchQuinielaContext('GLOBAL_LIGA_2026');
  }
}

function updateAdminTabVisibility() {
  const adminTab = document.getElementById('tab-admin-quiniela');
  if (adminTab && currentUser) {
    const isOrganizer = userPrivateLeagues.some(l => l.quinielaId === activeSpreadsheetId && l.rol === 'Organizador');
    adminTab.style.display = isOrganizer ? 'inline-flex' : 'none';
    if (!isOrganizer) {
      const activeSec = document.querySelector('.content-section.active');
      if (activeSec && activeSec.id === 'sec-admin-quiniela') {
        switchTab('predictions');
      }
    }
  } else if (adminTab) {
    adminTab.style.display = 'none';
    const activeSec = document.querySelector('.content-section.active');
    if (activeSec && activeSec.id === 'sec-admin-quiniela') {
      switchTab('predictions');
    }
  }
}


async function promptJoinPrivateQuiniela() {
  if (!currentUser) return;
  const inviteCode = prompt('Ingrese el código de invitación de la quiniela (Ej: Q-XXXX):');
  if (!inviteCode) return;
  
  const code = inviteCode.trim().toUpperCase();
  if (!code.startsWith('Q-')) {
    alert('El código de invitación debe empezar con "Q-" (Ej. Q-9HK6).');
    return;
  }
  
  const btn = document.getElementById('join-quiniela-btn');
  let originalHtml = '';
  if (btn) {
    originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uniéndose...';
  }
  
  try {
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'joinPrivateQuiniela',
        email: currentUser.email,
        key: currentUser.key,
        spreadsheetId: code
      })
    }).then(r => r.json());
    
    if (res.status === 'ok') {
      alert('¡Te has unido exitosamente a la quiniela privada!');
      await loadUserPrivateLeagues();
    } else {
      alert('Error al unirse: ' + res.message);
    }
  } catch (err) {
    console.error('Error joining private quiniela:', err);
    alert('Error de red al unirse a la quiniela.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

function promptSwitchQuinielaContext() {
  let promptMsg = 'Seleccione la quiniela que desea ver:\n0: Quiniela Oficial\n';
  userPrivateLeagues.forEach((league, idx) => {
    promptMsg += `${idx + 1}: ${league.nombreLiga}\n`;
  });
  
  const val = prompt(promptMsg);
  if (val === null) return;
  
  const num = parseInt(val.trim());
  if (isNaN(num)) return;
  
  if (num === 0) {
    switchQuinielaContext('GLOBAL_LIGA_2026');
  } else if (num > 0 && num <= userPrivateLeagues.length) {
    switchQuinielaContext(userPrivateLeagues[num - 1].quinielaId);
  } else {
    alert('Opción inválida.');
  }
}
