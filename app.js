const LOAD_STEP = 40;
const SEARCH_RENDER_DEBOUNCE_MS = 60;
const FILTER_RENDER_DEBOUNCE_MS = 70;
const URL_STATE_SYNC_DEBOUNCE_MS = 120;
const ROUTE_LOAD_STABILITY_DELAY_MS = 160;
const PLAYER_CAREER_YEAR_LOAD_BATCH_SIZE = 4;
const PLAYER_CAREER_BACKGROUND_YEAR_BATCH_SIZE = 1;
const GRASSROOTS_BACKGROUND_YEAR_BATCH_SIZE = 1;
const D1_BACKGROUND_YEAR_BATCH_SIZE = 1;
const BACKGROUND_YEAR_LOAD_DELAY_MS = 750;
const D1_SEARCH_BACKGROUND_YEAR_LOAD_DELAY_MS = 450;
const GRASSROOTS_BACKGROUND_YEAR_LOAD_DELAY_MS = 2200;
const GRASSROOTS_SEARCH_BACKGROUND_YEAR_LOAD_DELAY_MS = 320;
const GRASSROOTS_SEARCH_PREFETCH_MIN_TOKEN_LENGTH = 5;
const GRASSROOTS_SEARCH_PREFETCH_MAX_SINGLE_TOKEN_YEARS = 12;
const GRASSROOTS_SEARCH_PREFETCH_MAX_PREFIX_KEYS = 80;
const GRASSROOTS_SEARCH_PREFETCH_MAX_PREFIX_YEARS = 16;
const NBA_COMPANION_INITIAL_D1_YEARS = 4;
const HOME_ID = "home";
const PROFILE_ROUTE_ID = "profile";
const MULTI_FILTER_NONE_VALUE = "__none__";
const HOME_PAGES = [
  { id: "capitanesreference", label: "Capitanes Reference" },
];
const D1_HM_CONFS = new Set(["ACC", "SEC", "B10", "B12", "BE", "P12", "P10"]);
const D1_HMM_CONFS = new Set(["WCC", "A10", "MWC"]);
const MINUTES_DEFAULT = 200;
const TABLE_FRAME_LIMIT = 4200;
const COLOR_SCALE_MAX_ROWS = 2000;
const STATUS_REALGM_INDEX_SCRIPT = "data/vendor/status_realgm_index.js";
const STATUS_ANNOTATIONS_SCRIPT = "data/vendor/status_annotations.js";
const GRASSROOTS_PLAYER_YEAR_INDEX_SCRIPT = "data/vendor/grassroots_player_year_index.js";
const PLAYER_BIO_LOOKUP_SCRIPT = "data/vendor/player_bio_lookup.js";
const INTERNATIONAL_PROFILE_BIO_LOOKUP_SCRIPT = "data/vendor/international_profile_bio_lookup.js";
const WINGSPAN_LOOKUP_SCRIPT = "data/vendor/wingspan_lookup.js";
const COMBINE_MEASUREMENTS_LOOKUP_SCRIPT = "data/vendor/combine_measurement_lookup.js";
const PLAYER_PROFILE_YEAR_INDEX_SCRIPT = "data/vendor/player_profile_year_index.js";
const PLAYER_PROFILE_BUCKET_MANIFEST_SCRIPT = "data/vendor/player_profile_buckets_manifest.js";
const D1_FOUL_LOOKUP_SCRIPT = "data/vendor/d1_foul_lookup.js";
const D1_BART_SPLITS_MANIFEST_SCRIPT = "data/vendor/d1_bart_splits_manifest.js";
const D1_CAREER_ROWS_SCRIPT = "data/vendor/d1_career_rows.js";
const APP_BUILD_VERSION = "20260527-capitanes-v5";
const SCRIPT_CACHE_BUST = APP_BUILD_VERSION;
const DATA_ASSET_BASE = typeof window !== "undefined" && typeof window.__DATA_ASSET_BASE__ === "string"
  ? window.__DATA_ASSET_BASE__.trim().replace(/\/+$/, "")
  : "";
const LOCAL_DATA_ASSET_PREFIXES = [];
const STATIC_PERCENTILE_MINUTES = 500;
const SEARCH_INDEX_ROW_LIMIT = 120000;
const SEARCH_WARMUP_ROW_LIMIT = 80000;
const PLAYER_CAREER_LEVEL_FILTER_ORDER = ["Grassroots", "JUCO", "D2", "NAIA", "D1", "College", "FIBA", "International", "G League", "Professional", "NBA"];
const CORE_SEARCH_INDEX_COLUMNS = [
  "player_name",
  "player",
  "player_search_text",
  "player_aliases",
  "stat_search_text",
  "team_name",
  "team_full",
  "team_alias",
  "team_alias_all",
  "conference",
  "coach",
  "team_search_text",
  "coach_search_text",
  "competition_label",
  "competition_level",
  "profile_levels",
  "career_path",
  "source_dataset",
  "current_team",
  "pre_draft_team",
  "current_nba_status",
  "state",
  "event_name",
  "event_group",
  "circuit",
  "class_year",
];
const PLAYER_SEARCH_INDEX_COLUMNS = [
  "player_name",
  "player",
  "player_search_text",
  "player_aliases",
  "stat_search_text",
  "nba_name",
  "realgm_player_name",
  "name",
];
const UNIVERSAL_SEARCH_COLUMNS = [
  "player_name",
  "player",
  "player_search_text",
  "player_aliases",
  "stat_search_text",
  "team_name",
  "team_full",
  "team_alias",
  "team_alias_all",
  "conference",
  "coach",
  "team_search_text",
  "coach_search_text",
  "competition_label",
  "division",
  "level",
  "region",
  "league",
  "circuit",
  "event_name",
  "event_group",
  "event_raw_name",
  "state",
  "class_year",
  "profile_levels",
  "career_path",
  "competition_level",
  "source_dataset",
  "current_team",
  "pre_draft_team",
  "high_school",
  "hometown",
  "nationality",
];

function withUniversalSearchColumns(columns = []) {
  return Array.from(new Set([
    ...columns,
    ...UNIVERSAL_SEARCH_COLUMNS,
  ].filter(Boolean)));
}
const SHARED_SINGLE_FILTERS = [
  {
    id: "view_mode",
    label: "View",
    defaultValue: "player",
    options: [
      { value: "player", label: "Player" },
      { value: "career", label: "Career" },
    ],
  },
  {
    id: "color_mode",
    label: "Color mode",
    defaultValue: "overall",
    options: [
      { value: "none", label: "None" },
      { value: "year", label: "PCT by year" },
      { value: "year_position", label: "PCT by year+pos" },
      { value: "position", label: "PCT by pos" },
      { value: "competition", label: "PCT by comp" },
      { value: "competition_position", label: "PCT by comp+pos" },
      { value: "overall", label: "PCT overall" },
    ],
  },
  {
    id: "percentile_mode",
    label: "Switch",
    defaultValue: "off",
    options: [
      { value: "off", label: "Off" },
      { value: "year_pctile", label: "Year Pctl" },
      { value: "all_time_pctile", label: "All-time Pctl" },
      { value: "year_rank", label: "Year Rank" },
      { value: "all_time_rank", label: "All-time Rank" },
    ],
  },
];
const STATUS_EVER_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "ncaa", label: "NCAA" },
  { value: "former_d1", label: "Former D1" },
  { value: "future_d1", label: "Future D1" },
  { value: "nba", label: "NBA" },
];
const STANDARD_POSITION_SORT = ["PG", "G", "SG", "G/F", "SF", "F", "PF", "F/C", "C"];
const INTERNATIONAL_REGION_ORDER = ["Latino", "Caribbean", "Oceanic", "African", "Middle Eastern", "Asian", "European", "North American"];
const INTERNATIONAL_COUNTRY_REGION_MAP = {
  Argentina: "Latino",
  Bahamas: "Caribbean",
  Belize: "Latino",
  Bolivia: "Latino",
  Brazil: "Latino",
  Canada: "North American",
  Chile: "Latino",
  Colombia: "Latino",
  "Costa Rica": "Latino",
  Cuba: "Caribbean",
  "Dominican Republic": "Caribbean",
  Ecuador: "Latino",
  "El Salvador": "Latino",
  Guatemala: "Latino",
  Honduras: "Latino",
  Mexico: "Latino",
  Nicaragua: "Latino",
  Panama: "Latino",
  Paraguay: "Latino",
  Peru: "Latino",
  "Puerto Rico": "Caribbean",
  Uruguay: "Latino",
  Venezuela: "Latino",
  Australia: "Oceanic",
  Guam: "Oceanic",
  "New Zealand": "Oceanic",
  "American Samoa": "Oceanic",
  Angola: "African",
  Cameroon: "African",
  "Cape Verde": "African",
  "Democratic Republic of the Congo": "African",
  Egypt: "African",
  Guinea: "African",
  Mali: "African",
  Nigeria: "African",
  Rwanda: "African",
  Senegal: "African",
  "South Sudan": "African",
  Tunisia: "African",
  Turkey: "Middle Eastern",
  Israel: "Middle Eastern",
  Lebanon: "Middle Eastern",
  Qatar: "Middle Eastern",
  "Saudi Arabia": "Middle Eastern",
  "United Arab Emirates": "Middle Eastern",
  China: "Asian",
  Japan: "Asian",
  Philippines: "Asian",
  "South Korea": "Asian",
  Taiwan: "Asian",
  Uzbekistan: "Asian",
  Armenia: "European",
  Austria: "European",
  Belgium: "European",
  "Bosnia and Herzegovina": "European",
  Bulgaria: "European",
  Croatia: "European",
  Czechia: "European",
  Denmark: "European",
  Estonia: "European",
  Finland: "European",
  France: "European",
  Georgia: "European",
  Germany: "European",
  Greece: "European",
  Hungary: "European",
  Iceland: "European",
  Ireland: "European",
  Italy: "European",
  Latvia: "European",
  Lithuania: "European",
  Montenegro: "European",
  Netherlands: "European",
  Norway: "European",
  Poland: "European",
  Portugal: "European",
  Romania: "European",
  Russia: "European",
  Serbia: "European",
  Slovakia: "European",
  Slovenia: "European",
  Spain: "European",
  Sweden: "European",
  Switzerland: "European",
  Ukraine: "European",
  "United Kingdom": "European",
  "United States": "North American",
};
const INTERNATIONAL_COUNTRY_NAMES = Array.from(new Set([
  ...Object.keys(INTERNATIONAL_COUNTRY_REGION_MAP),
  "Albania", "Algeria", "Andorra", "Belarus", "Bolivia", "Costa Rica", "Cyprus", "Cote d'Ivoire",
  "Great Britain", "Haiti", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Jamaica",
  "Kosovo", "Luxembourg", "North Macedonia", "Paraguay", "Peru", "South Africa", "Syria",
  "Thailand", "Trinidad and Tobago", "Vietnam",
])).sort((left, right) => right.length - left.length);
const MASCOT_TOKENS = new Set([
  "aces", "aggies", "anteaters", "aztecs", "bears", "bearcats", "beavers", "bison", "bisons", "blazers", "blue", "bluebirds",
  "bluejays", "bobcats", "bonnies", "braves", "broncos", "bruins", "bulldogs", "bulls", "buccaneers", "buckeyes", "camels",
  "cardinal", "cardinals", "catamounts", "chargers", "chiefs", "chippewas", "colonials", "comets", "conference", "cougars",
  "cowboys", "crimson", "cyclones", "demons", "devils", "dolphins", "dons", "dragons", "dukes", "eagles", "explorers",
  "falcons", "fightin", "fighting", "firebirds", "flames", "flash", "foxes", "frogs", "gators", "gaels", "golden",
  "governors", "grif", "griffins", "grizzlies", "hawks", "huskies", "hurricane", "hurricanes", "islanders", "jacks",
  "jackrabbits", "jaguars", "jayhawks", "keydets", "knights", "lancers", "leopards", "lions", "lobos", "marauders", "matadors", "miners", "minutemen", "monarchs",
  "mountaineers", "musketeers", "mustangs", "norse", "oilers", "orange", "ospreys", "owls", "panthers", "patriots",
  "pelicans", "penguins", "pioneers", "pirates", "pride", "purple", "racers", "raiders", "rams", "ravens", "red", "redbirds",
  "redhawks", "redstorm", "rebels", "revolutionaries", "roadrunners", "rockets", "royals", "saints", "seminoles", "shockers",
  "skyhawks", "spartans", "spiders", "storm", "sun", "sycamores", "tars", "terriers", "thunderbirds", "tigers", "titans",
  "tar", "heels", "thundering", "trojans", "tribe", "tulips", "vandals", "vikings", "wildcats", "wolves", "wolfpack", "wolverines",
  "49ers", "badgers", "bearkats", "bengals", "billikens", "boilermakers", "broncs", "buffaloes", "cavaliers", "chanticleers",
  "commodores", "crusaders", "deacons", "ducks", "flyers", "friars", "gamecocks", "gauchos", "hatters", "hawkeyes", "hens",
  "hilltoppers", "hoosiers", "hokies", "hoyas", "jackets", "jaspers", "kangaroos", "leathernecks", "lumberjacks", "mastodons",
  "midshipmen", "mocs", "pack", "paladins", "peacocks", "phoenix", "pilots", "rattlers", "retrievers", "runnin", "salukis",
  "screaming", "seahawks", "seawolves", "sharks", "stags", "terrapins", "texans", "tommies", "toreros", "trailblazers", "tritons",
  "utes", "vaqueros", "volunteers", "wave", "waves", "warhawks", "warriors", "zips", "illini", "irish", "herd", "antelopes",
  "cajuns", "colonels", "cornhuskers", "coyotes", "danes", "greyhounds", "highlanders", "hornets", "lakers", "longhorns",
  "mavericks", "privateers", "quakers", "razorbacks", "ramblers", "sooners", "avengers"
]);
const MASCOT_PREFIX_TOKENS = new Set(["big", "black", "fighting", "golden", "great", "lady", "little", "mighty", "purple", "ragin", "red", "scarlet", "silver"]);
const TEAM_SUFFIX_PATTERNS = [
  /\bFightin(?:g)?\s+Blue\s+Hens?\b$/i,
  /\bBlack\s+Knights?\b$/i,
  /\bNittany\s+Lions?\b$/i,
  /\bMountain\s+Hawks?\b$/i,
  /\bHorned\s+Frogs?\b$/i,
  /\bYellow\s+Jackets?\b$/i,
  /\bBlue\s+Devils?\b$/i,
  /\bBlue\s+Hose\b$/i,
  /\bBig\s+Green\b$/i,
  /\bGreen\s+Wave\b$/i,
  /\bMean\s+Green\b$/i,
  /\bRunnin['’]?\s+Bulldogs?\b$/i,
  /\bScreaming\s+Eagles?\b$/i,
  /\bGolden\s+Gophers?\b$/i,
  /\bGolden\s+Flashes?\b$/i,
  /\bGolden\s+Eagles?\b$/i,
  /\bRed\s+Storm\b$/i,
  /\bWolf\s+Pack\b$/i,
  /\bCrimson\s+Tide\b$/i,
  /\bDemon\s+Deacons?\b$/i,
];
const ACADEMIC_SUFFIX_PATTERNS = [
  /\bCommunity\s+and\s+Technical\s+College\b$/i,
  /\bTechnical\s+and\s+Community\s+College\b$/i,
  /\bCommunity\s+and\s+Technical\b$/i,
  /\bTechnical\s+and\s+Community\b$/i,
  /\bTechnical\s*&\s*CC\b$/i,
  /\bTechnical\s+CC\b$/i,
  /\bCommunity\s+College\b$/i,
  /\bJunior\s+College\b$/i,
  /\bTechnical\s+College\b$/i,
  /\bState\s+College\b$/i,
  /\bCollege\s+of\s+Science\b$/i,
  /\bCollege\b$/i,
  /\bCC\b$/i,
];
const JUCO_TEAM_STOPWORDS = new Set(["college", "community", "technical", "tech", "institute", "institutes", "school", "jr", "junior", "and", "of", "the", "at"]);
const TEAM_DISPLAY_OVERRIDES = {
  "asa brooklyn": "ASA Brooklyn",
  "queens of charlotte": "Queens",
  "mississippi valley state delta": "Mississippi Valley State",
  "texas austin": "Texas",
  "indiana indianapolis": "Indianapolis",
  "southern methodist": "SMU",
};
const TEAM_STATE_TOKENS = new Set([
  "al", "ak", "ar", "az", "ca", "cal", "calif", "co", "colo", "ct", "de", "fl", "fla", "ga", "hi", "ia", "id", "il", "ill", "in", "ind",
  "ks", "kan", "ky", "la", "ma", "md", "me", "mi", "mich", "mn", "mo", "ms", "mt", "nc", "nd", "ne", "nev", "nh", "nj", "nm", "ny", "oh",
  "ok", "okla", "or", "ore", "pa", "ri", "sc", "sd", "tn", "tenn", "tx", "ut", "va", "vt", "wa", "wash", "wi", "wisc", "wv", "wy",
  "ark", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maryland", "michigan", "missouri", "montana", "nebraska", "ohio",
  "oklahoma", "oregon", "tennessee", "texas", "virginia", "washington", "wisconsin"
]);
const TRAILING_LOCATION_TOKENS = new Set([...TEAM_STATE_TOKENS, "california", "florida", "georgia", "illinois"]);
const NAIA_DIVISION_STOPWORDS = new Set(["university", "college", "state", "st", "saint", "mt", "mount", "fort", "ft", "of", "the", "and", "u", "at"]);
const NAIA_DIVISION_STOPWORDS_EXT = new Set([
  ...NAIA_DIVISION_STOPWORDS,
  "christian", "baptist", "international", "tech", "technical", "institute", "institutes", "agricultural", "school", "campus", "univ", "academy",
]);
const NAIA_STATE_TOKENS = new Set([
  "al", "ak", "az", "ar", "ca", "co", "ct", "dc", "de", "fl", "ga", "hi", "ia", "id", "il", "in", "ks", "ky", "la", "ma",
  "md", "me", "mi", "mn", "mo", "ms", "mt", "nc", "nd", "ne", "nh", "nj", "nm", "nv", "ny", "oh", "ok", "or", "pa", "ri",
  "sc", "sd", "tn", "tx", "ut", "va", "vt", "wa", "wi", "wv", "wy", "ala", "ariz", "calif", "colo", "conn", "del", "fla",
  "ill", "ind", "kan", "kans", "mass", "mich", "minn", "miss", "mont", "neb", "nev", "okla", "ore", "penn", "tenn", "tex",
  "wash", "wisc", "wyo",
]);
const NAIA_DIVISION_ALIASES = {
  "benedictine mesa": "benedictine az",
  "ciu": "columbia international",
  "ciu sc": "columbia international",
  "cumberlands": "cumberland ky",
  "cumberlands ky": "cumberland ky",
  "embry riddle": "embry riddle prescott",
  "embry riddle az": "embry riddle prescott",
  "haskell indian nations university": "haskell",
  "iu kokomo": "indiana kokomo",
  "iu east": "indiana east",
  "iu northwest": "indiana northwest",
  "iu southeast": "indiana southeast",
  "indiana south bend": "iu south bend",
  "indiana south bend in": "iu south bend",
  "jessup": "william jessup",
  "calumet coll of st joseph": "calumet",
  "calumet st joseph": "calumet",
  "lindenwood belleville": "NAIA I",
  "loyola la": "loyola no",
  "new college of florida": "new college fl",
  "northern": "northern new mexico",
  "ouaz": "ottawa az",
  "martin methodist": "ut southern",
  "oklahoma panhandle state": "panhandle state ok",
  "ottawa kan": "ottawa ks",
  "ottawa kansas": "ottawa ks",
  "robert morris": "robert morris chicago",
  "sagu": "NAIA I",
  "st louis pharmacy": "health sciences pharmacy mo",
  "southwestern": "southwestern college ks",
  "st andrews": "st andrews presbyterian",
  "st andrews nc": "st andrews presbyterian",
  "tennessee southern": "ut southern",
  "thomas": "thomas ga",
  "uhsp": "health sciences pharmacy mo",
  "union commonwealth": "union ky",
  "wvu tech": "west virginia tech",
  "wvu tech wv": "west virginia tech",
};
const GRASSROOTS_CIRCUIT_ORDER = [
  "EYBL",
  "Nike Scholastic",
  "Nike EYCL",
  "Nike Showcases",
  "3SSB",
  "UAA",
  "Puma",
  "Other Amateur",
  "OTE",
  "Grind Session",
  "NBPA 100",
  "Hoophall",
  "Montverde",
  "EPL",
  "General HS",
];
const GRASSROOTS_NIKE_SHOWCASE_CIRCUITS = new Set(["Nike Extravaganza", "Nike Global Challenge", "Nike Other", "Nike Showcases"].map((value) => normalizeKey(value)));
const GRASSROOTS_HS_CIRCUITS = new Set(["General HS", "Hoophall", "Grind Session", "OTE", "EPL", "Montverde", "Nike Scholastic"].map((value) => normalizeKey(value)));
const GRASSROOTS_AAU_CIRCUITS = new Set(["EYBL", "3SSB", "Nike EYCL", "Nike Showcases", "UAA", "NBPA 100", "Puma", "Other Amateur"].map((value) => normalizeKey(value)));
const GRASSROOTS_SETTING_OPTIONS = [
  { value: "all", label: "Overall" },
  { value: "single_year", label: "Single Year" },
  { value: "HS", label: "HS" },
  { value: "AAU", label: "AAU" },
];
const INTERNATIONAL_SEASON_SCOPE_OPTIONS = [
  { value: "all", label: "League Rows" },
  { value: "single_season_combined", label: "Season Combined" },
];

let naiaDivisionLookup = null;
let naiaDivisionTeamLookup = null;
let naiaDivisionHistory = null;

const D1_PLAYTYPE_DEFS = [
  { id: "iso", label: "Isolation", source: "Isolation", short: "Iso" },
  { id: "pnr_bh", label: "Pick-and-Roll Ball Handler", source: "PnR_BH", short: "PnR BH" },
  { id: "post_up", label: "Post Up", source: "Post_Up", short: "Post Up" },
  { id: "pnr_roll", label: "Pick-and-Roll Roll Man", source: "PnR_Roll", short: "PnR Roll" },
  { id: "spot_up", label: "Spot Up", source: "Spot_Up", short: "Spot Up" },
  { id: "off_screen", label: "Off Screen", source: "Off_Screen", short: "Off Screen" },
  { id: "hand_off", label: "Hand Off", source: "Hand_Off", short: "Hand Off" },
  { id: "cut", label: "Cut", source: "Cut", short: "Cut" },
  { id: "off_reb", label: "Offensive Rebounds", source: "Off_Reb", short: "OREB" },
];

const D1_PLAYTYPE_METRICS = [
  { source: "Poss", suffix: "poss", label: "Poss", defaultVisible: false },
  { source: "Pts", suffix: "points", label: "PTS", defaultVisible: false },
  { source: "", suffix: "points_pg", label: "PTS/G", defaultVisible: false },
  { source: "", suffix: "points_per40", label: "PTS/40", defaultVisible: false },
  { source: "%Time", suffix: "freq", label: "Freq", defaultVisible: true },
  { source: "PPP", suffix: "ppp", label: "PPP", defaultVisible: true },
  { source: "FG Att", suffix: "fg_att", label: "FGA", defaultVisible: false },
  { source: "FG Made", suffix: "fg_made", label: "FGM", defaultVisible: false },
  { source: "FG Miss", suffix: "fg_miss", label: "FG Miss", defaultVisible: false },
  { source: "", suffix: "fg_att_pg", label: "FGA/G", defaultVisible: false },
  { source: "", suffix: "fg_att_per40", label: "FGA/40", defaultVisible: false },
  { source: "eFG%", suffix: "efg_pct", label: "eFG%", defaultVisible: false },
  { source: "", suffix: "ts_pct", label: "TS%", defaultVisible: false },
  { source: "TO%", suffix: "tov_pct", label: "TO%", defaultVisible: true },
  { source: "FTA/FGA", suffix: "ftr", label: "FTr", defaultVisible: true },
  { source: "", suffix: "fta", label: "FTA", defaultVisible: false },
  { source: "", suffix: "fta_pg", label: "FTA/G", defaultVisible: false },
  { source: "", suffix: "fta_per40", label: "FTA/40", defaultVisible: false },
  { source: "2 FG Att", suffix: "two_fg_att", label: "2PA", defaultVisible: false },
  { source: "2 FG Made", suffix: "two_fg_made", label: "2PM", defaultVisible: false },
  { source: "2 FG Miss", suffix: "two_fg_miss", label: "2P Miss", defaultVisible: false },
  { source: "", suffix: "two_fg_att_pg", label: "2PA/G", defaultVisible: false },
  { source: "", suffix: "two_fg_att_per40", label: "2PA/40", defaultVisible: false },
  { source: "2 FG%", suffix: "two_fg_pct", label: "2P%", defaultVisible: false },
  { source: "3FG Att", suffix: "three_fg_att", label: "3PA", defaultVisible: false },
  { source: "3 FG Made", suffix: "three_fg_made", label: "3PM", defaultVisible: false },
  { source: "3 FG Miss", suffix: "three_fg_miss", label: "3P Miss", defaultVisible: false },
  { source: "", suffix: "three_fg_att_pg", label: "3PA/G", defaultVisible: false },
  { source: "", suffix: "three_fg_att_per40", label: "3PA/40", defaultVisible: false },
  { source: "3 FG%", suffix: "three_fg_pct", label: "3P%", defaultVisible: false },
  { source: "3PA/FGA", suffix: "three_pr", label: "3Pr", defaultVisible: false },
];
const D1_TRUE_PLAYTYPE_IDS = ["iso", "pnr_bh", "post_up", "pnr_roll", "spot_up", "off_screen", "hand_off", "cut", "off_reb", "transition"];
const D1_HALFCOURT_PLAYTYPE_IDS = D1_TRUE_PLAYTYPE_IDS.filter((id) => id !== "transition");
const D1_PLAYTYPE_FAMILY_PREFIXES = [...D1_TRUE_PLAYTYPE_IDS, "halfcourt", "creation", "shooting", "assisted_fin", "unassisted_fin", "transition", "runner", "drive"];
const PLAYTYPE_PERCENTILE_FREQ_FLOOR = 1;
const D1_BART_SPLIT_OPTIONS = [
  { value: "season", label: "Season" },
  { value: "t50", label: "Top 50" },
  { value: "t100", label: "Top 100" },
  { value: "t120", label: "Top 120" },
  { value: "t220", label: "Top 220" },
];
const D1_BART_SPLIT_DEFAULT = "season";
const D1_HOOP_RAPM_COLUMNS = [
  { key: "he_rapm", label: "HE RAPM", defaultVisible: true },
  { key: "he_o_rapm", label: "HE oRAPM", defaultVisible: true },
  { key: "he_d_rapm", label: "HE dRAPM", defaultVisible: true },
  { key: "he_rapm_off_efg", label: "o eFG RAPM", defaultVisible: false },
  { key: "he_rapm_off_to", label: "o TOV RAPM", defaultVisible: false },
  { key: "he_rapm_off_orb", label: "o ORB RAPM", defaultVisible: false },
  { key: "he_rapm_off_ftr", label: "o FTr RAPM", defaultVisible: false },
  { key: "he_rapm_def_efg", label: "d eFG RAPM", defaultVisible: false },
  { key: "he_rapm_def_to", label: "d TOV RAPM", defaultVisible: false },
  { key: "he_rapm_def_orb", label: "d ORB RAPM", defaultVisible: false },
  { key: "he_rapm_def_ftr", label: "d FTr RAPM", defaultVisible: false },
  { key: "he_rapm_off_adj_ppp", label: "o PPP RAPM", defaultVisible: false },
  { key: "he_rapm_def_adj_ppp", label: "d PPP RAPM", defaultVisible: false },
];

const NBA_PLAYTYPE_DEFS = [
  ...D1_PLAYTYPE_DEFS,
  { id: "transition", label: "Transition", short: "Trans" },
  { id: "misc", label: "Misc", short: "Misc" },
];

const NBA_PLAYTYPE_METRICS = [
  { suffix: "percentile", label: "Pctl", defaultVisible: false },
  { suffix: "freq", label: "Freq", defaultVisible: true },
  { suffix: "ppp", label: "PPP", defaultVisible: true },
  { suffix: "fg_pct", label: "FG%", defaultVisible: false },
  { suffix: "efg_pct", label: "eFG%", defaultVisible: false },
  { suffix: "ft_poss_pct", label: "FT Poss%", defaultVisible: true },
  { suffix: "tov_pct", label: "TO%", defaultVisible: true },
  { suffix: "sf_pct", label: "SF%", defaultVisible: false },
  { suffix: "plus1_pct", label: "+1%", defaultVisible: false },
  { suffix: "score_pct", label: "Score%", defaultVisible: false },
  { suffix: "poss", label: "Poss", defaultVisible: false },
  { suffix: "points", label: "PTS", defaultVisible: false },
  { suffix: "fg_made", label: "FGM", defaultVisible: false },
  { suffix: "fga", label: "FGA", defaultVisible: false },
  { suffix: "fg_miss", label: "FG Miss", defaultVisible: false },
  { suffix: "poss_pg", label: "Poss/G", defaultVisible: false },
  { suffix: "points_pg", label: "PTS/G", defaultVisible: false },
  { suffix: "fga_pg", label: "FGA/G", defaultVisible: false },
  { suffix: "poss_per40", label: "Poss/40", defaultVisible: false },
  { suffix: "points_per40", label: "PTS/40", defaultVisible: false },
  { suffix: "fga_per40", label: "FGA/40", defaultVisible: false },
];
const NBA_PLAYTYPE_DEFAULT_COLUMNS = NBA_PLAYTYPE_DEFS.flatMap((playtype) => (
  NBA_PLAYTYPE_METRICS
    .filter((metric) => metric.defaultVisible)
    .map((metric) => `${playtype.id}_${metric.suffix}`)
));

const GENERAL_TOTAL_COLUMNS = ["pts", "trb", "orb", "drb", "ast", "stl", "blk", "tov", "pf", "stocks"];
const GENERAL_PER_GAME_COLUMNS = GENERAL_TOTAL_COLUMNS.map((column) => `${column}_pg`);
const GENERAL_PER40_COLUMNS = GENERAL_TOTAL_COLUMNS.map((column) => `${column}_per40`);
const GENERAL_PER100_COLUMNS = GENERAL_TOTAL_COLUMNS.map((column) => `${column}_per100`);
const GENERAL_DEFAULT_TOTAL_COLUMNS = ["pts", "trb", "ast", "stl", "blk", "tov"];
const GENERAL_DEFAULT_PER_GAME_COLUMNS = ["pts_pg", "trb_pg", "ast_pg", "stl_pg", "blk_pg", "tov_pg"];
const GENERAL_DEFAULT_PER40_COLUMNS = ["pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40", "tov_per40"];
const GENERAL_LABELS = {
  pts: "PTS",
  trb: "TRB",
  orb: "ORB",
  drb: "DRB",
  ast: "AST",
  stl: "STL",
  blk: "BLK",
  tov: "TOV",
  pf: "PF",
  stocks: "Stocks",
};
GENERAL_TOTAL_COLUMNS.forEach((column) => {
  GENERAL_LABELS[`${column}_pg`] = `${GENERAL_LABELS[column]}/G`;
  GENERAL_LABELS[`${column}_per40`] = `${GENERAL_LABELS[column]}/40`;
  GENERAL_LABELS[`${column}_per100`] = `${GENERAL_LABELS[column]}/100`;
});

const D1_SUMMARY_COLUMNS = [
  { key: "halfcourt_ppp", label: "HC PPP", defaultVisible: true },
  { key: "halfcourt_two_pa", label: "HC 2PA", defaultVisible: false },
  { key: "halfcourt_two_p_pct", label: "HC 2P%", defaultVisible: false },
    { key: "transition_ppp", label: "Trans PPP", defaultVisible: true },
    { key: "transition_two_fg_att", label: "Trans 2PA", defaultVisible: false },
    { key: "transition_two_fg_pct", label: "Trans 2P%", defaultVisible: false },
];
const D1_PLAYTYPE_FREQ_POSS_COLUMNS = [
  { key: "halfcourt_poss", label: "HC Poss", defaultVisible: false },
  { key: "halfcourt_freq", label: "HC Freq", defaultVisible: false },
    { key: "transition_poss", label: "Trans Poss", defaultVisible: false },
    { key: "transition_freq", label: "Trans Freq", defaultVisible: false },
];

const D1_DRIVE_COLUMNS = [
  { key: "drive_poss", label: "Drive Poss", defaultVisible: false },
  { key: "drive_freq", label: "Drive Freq", defaultVisible: true },
  { key: "drive_plus_trans_freq", label: "Drive+Trans", defaultVisible: true },
  { key: "hc_drive_freq", label: "HC Drive Freq", defaultVisible: false },
  { key: "drive_ppp", label: "Drive PPP", defaultVisible: true },
  { key: "drive_fga", label: "Drive FGA", defaultVisible: false },
  { key: "drive_fga_pg", label: "Drive FGA/G", defaultVisible: false },
  { key: "drive_fga_per40", label: "Drive FGA/40", defaultVisible: false },
  { key: "drive_tov_pct", label: "Drive TO%", defaultVisible: true },
  { key: "drive_ftr", label: "Drive FTr", defaultVisible: true },
  { key: "drive_fta", label: "Drive FTA", defaultVisible: false },
  { key: "drive_fta_pg", label: "Drive FTA/G", defaultVisible: false },
  { key: "drive_fta_per40", label: "Drive FTA/40", defaultVisible: false },
  { key: "drive_fg_pct", label: "Drive FG%", defaultVisible: false },
  { key: "drive_ts_pct", label: "Drive TS%", defaultVisible: false },
  { key: "drive_two_pa", label: "Drive 2PA", defaultVisible: false },
  { key: "drive_two_pa_pg", label: "Drive 2PA/G", defaultVisible: false },
  { key: "drive_two_pa_per40", label: "Drive 2PA/40", defaultVisible: false },
  { key: "drive_two_p_pct", label: "Drive 2P%", defaultVisible: true },
  { key: "drive_plus1_pct", label: "Drive +1%", defaultVisible: false },
];

const D1_COMBINE_MEASUREMENT_COLUMNS = [
  { key: "combine_source_year", label: "Combine Yr" },
  { key: "combine_draft_year", label: "Draft Yr" },
  { key: "combine_draft_pick", label: "Draft Pick" },
  { key: "combine_pos", label: "Combine Pos" },
  { key: "combine_height_wo_shoes", label: "Cmb HT" },
  { key: "combine_weight_lb", label: "Cmb WT" },
  { key: "combine_bmi", label: "Cmb BMI" },
  { key: "combine_wingspan", label: "Cmb WS" },
  { key: "combine_ws_diff", label: "WS Diff" },
  { key: "combine_ws_height", label: "WS/HT" },
  { key: "combine_standing_reach", label: "Reach" },
  { key: "combine_sr_height", label: "Reach/HT" },
  { key: "combine_sr_ws", label: "Reach/WS" },
  { key: "combine_defensive_range", label: "Def Range" },
  { key: "combine_hand_length", label: "Hand Len" },
  { key: "combine_hand_width", label: "Hand Wid" },
  { key: "combine_hand_area", label: "Hand Area" },
  { key: "combine_body_fat_pct", label: "Body Fat" },
  { key: "combine_standing_vert", label: "Stand Vert" },
  { key: "combine_max_vert", label: "Max Vert" },
  { key: "combine_avg_vert", label: "Avg Vert" },
  { key: "combine_standing_vert_sr", label: "Stand Vert+R" },
  { key: "combine_max_vert_sr", label: "Max Vert+R" },
  { key: "combine_avg_vert_sr", label: "Avg Vert+R" },
  { key: "combine_height_adj_max_vert_sr", label: "Adj Vert+R" },
  { key: "combine_sprint", label: "Sprint" },
  { key: "combine_lane_agility", label: "Lane Agil" },
  { key: "combine_modified_lane_agility", label: "Mod Lane" },
  { key: "combine_shuttle", label: "Shuttle" },
  { key: "combine_bench_press", label: "Bench" },
];

const D1_RIM_SCORING_COMPONENTS = [
  { id: "iso", label: "Iso Rim", prefix: "rim_iso", sourcePrefix: "iso" },
  { id: "pnr", label: "PnR Rim", prefix: "rim_pnr", sourcePrefix: "pnr_bh" },
  { id: "spotup", label: "SU Rim", prefix: "rim_su", sourcePrefix: "spot_up" },
];
const D1_RIM_TRUE_CREATED_COMPONENTS = D1_RIM_SCORING_COMPONENTS.filter((component) => component.id === "iso" || component.id === "pnr");
const D1_RIM_SCORING_RATE_SUFFIXES = [
  "attempt_freq", "freq", "ppp", "fg_pct", "ftr", "tov_pct", "score_pct", "plus1_pct",
];
const D1_RIM_SCORING_TOTAL_SUFFIXES = [
  "poss", "points", "fga", "fgm", "fta", "ftm", "tov", "plus1",
];
const D1_RIM_SCORING_PER_MODE_SUFFIXES = [
  "poss", "points", "fga", "fgm", "fta", "ftm", "tov", "plus1",
];
const D1_RIM_SCORING_AGG_RATE_COLUMNS = D1_RIM_SCORING_RATE_SUFFIXES.map((suffix) => `rim_scoring_${suffix}`);
const D1_RIM_SCORING_AGG_TOTAL_COLUMNS = D1_RIM_SCORING_TOTAL_SUFFIXES.map((suffix) => `rim_scoring_${suffix}`);
const D1_RIM_SCORING_AGG_PER_GAME_COLUMNS = D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_scoring_${suffix}_pg`);
const D1_RIM_SCORING_AGG_PER40_COLUMNS = D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_scoring_${suffix}_per40`);
const D1_RIM_TRUE_CREATED_RATE_COLUMNS = D1_RIM_SCORING_RATE_SUFFIXES.map((suffix) => `rim_true_created_${suffix}`);
const D1_RIM_TRUE_CREATED_TOTAL_COLUMNS = D1_RIM_SCORING_TOTAL_SUFFIXES.map((suffix) => `rim_true_created_${suffix}`);
const D1_RIM_TRUE_CREATED_PER_GAME_COLUMNS = D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_true_created_${suffix}_pg`);
const D1_RIM_TRUE_CREATED_PER40_COLUMNS = D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_true_created_${suffix}_per40`);
const D1_RIM_TRUE_CREATED_COLUMNS = [
  ...D1_RIM_TRUE_CREATED_RATE_COLUMNS,
  ...D1_RIM_TRUE_CREATED_TOTAL_COLUMNS,
  ...D1_RIM_TRUE_CREATED_PER_GAME_COLUMNS,
  ...D1_RIM_TRUE_CREATED_PER40_COLUMNS,
];
const D1_RIM_SCORING_COMPONENT_RATE_COLUMNS = D1_RIM_SCORING_COMPONENTS.flatMap((component) => (
  D1_RIM_SCORING_RATE_SUFFIXES.map((suffix) => `${component.prefix}_${suffix}`)
));
const D1_RIM_SCORING_COMPONENT_TOTAL_COLUMNS = D1_RIM_SCORING_COMPONENTS.flatMap((component) => (
  D1_RIM_SCORING_TOTAL_SUFFIXES.map((suffix) => `${component.prefix}_${suffix}`)
));
const D1_RIM_SCORING_COMPONENT_PER_GAME_COLUMNS = D1_RIM_SCORING_COMPONENTS.flatMap((component) => (
  D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `${component.prefix}_${suffix}_pg`)
));
const D1_RIM_SCORING_COMPONENT_PER40_COLUMNS = D1_RIM_SCORING_COMPONENTS.flatMap((component) => (
  D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `${component.prefix}_${suffix}_per40`)
));
const D1_RIM_SCORING_AGG_COLUMNS = [
  ...D1_RIM_SCORING_AGG_RATE_COLUMNS,
  ...D1_RIM_SCORING_AGG_TOTAL_COLUMNS,
  ...D1_RIM_SCORING_AGG_PER_GAME_COLUMNS,
  ...D1_RIM_SCORING_AGG_PER40_COLUMNS,
];
const D1_RIM_SCORING_RATE_COLUMNS = [
  ...D1_RIM_SCORING_AGG_RATE_COLUMNS,
  ...D1_RIM_TRUE_CREATED_RATE_COLUMNS,
  ...D1_RIM_SCORING_COMPONENT_RATE_COLUMNS,
];
const D1_RIM_SCORING_TOTAL_COLUMNS = [
  ...D1_RIM_SCORING_AGG_TOTAL_COLUMNS,
  ...D1_RIM_TRUE_CREATED_TOTAL_COLUMNS,
  ...D1_RIM_SCORING_COMPONENT_TOTAL_COLUMNS,
];
const D1_RIM_SCORING_PER_GAME_COLUMNS = [
  ...D1_RIM_SCORING_AGG_PER_GAME_COLUMNS,
  ...D1_RIM_TRUE_CREATED_PER_GAME_COLUMNS,
  ...D1_RIM_SCORING_COMPONENT_PER_GAME_COLUMNS,
];
const D1_RIM_SCORING_PER40_COLUMNS = [
  ...D1_RIM_SCORING_AGG_PER40_COLUMNS,
  ...D1_RIM_TRUE_CREATED_PER40_COLUMNS,
  ...D1_RIM_SCORING_COMPONENT_PER40_COLUMNS,
];
const D1_RIM_SCORING_COLUMNS = [...new Set([
  ...D1_RIM_SCORING_AGG_COLUMNS,
  ...D1_RIM_TRUE_CREATED_COLUMNS,
  ...D1_RIM_SCORING_RATE_COLUMNS,
  ...D1_RIM_SCORING_TOTAL_COLUMNS,
  ...D1_RIM_SCORING_PER_GAME_COLUMNS,
  ...D1_RIM_SCORING_PER40_COLUMNS,
])];
const D1_RIM_SCORING_SUFFIX_LABELS = {
  attempt_freq: "Att Freq",
  freq: "Freq",
  ppp: "PPP",
  fg_pct: "FG%",
  ftr: "FTr",
  tov_pct: "TO%",
  sf_pct: "SF%",
  score_pct: "Score%",
  plus1_pct: "+1%",
  poss: "Poss",
  points: "PTS",
  fga: "FGA",
  fgm: "FGM",
  fta: "FTA",
  ftm: "FTM",
  tov: "TO",
  plus1: "+1",
};
const D1_RIM_SCORING_LABELS = {};
function assignRimScoringLabels(prefix, label) {
  D1_RIM_SCORING_RATE_SUFFIXES.forEach((suffix) => {
    D1_RIM_SCORING_LABELS[`${prefix}_${suffix}`] = `${label} ${D1_RIM_SCORING_SUFFIX_LABELS[suffix]}`;
  });
  D1_RIM_SCORING_TOTAL_SUFFIXES.forEach((suffix) => {
    D1_RIM_SCORING_LABELS[`${prefix}_${suffix}`] = `${label} ${D1_RIM_SCORING_SUFFIX_LABELS[suffix]}`;
  });
  D1_RIM_SCORING_PER_MODE_SUFFIXES.forEach((suffix) => {
    D1_RIM_SCORING_LABELS[`${prefix}_${suffix}_pg`] = `${label} ${D1_RIM_SCORING_SUFFIX_LABELS[suffix]}/G`;
    D1_RIM_SCORING_LABELS[`${prefix}_${suffix}_per40`] = `${label} ${D1_RIM_SCORING_SUFFIX_LABELS[suffix]}/40`;
  });
}
assignRimScoringLabels("rim_scoring", "Created Rim");
assignRimScoringLabels("rim_true_created", "True Created");
D1_RIM_SCORING_COMPONENTS.forEach((component) => {
  assignRimScoringLabels(component.prefix, component.label);
});

const D1_RUNNER_COLUMNS = [
  { key: "runner_freq", label: "Runner Freq", defaultVisible: true },
  { key: "runner_ppp", label: "Runner PPP", defaultVisible: true },
  { key: "runner_fg_att", label: "Runner FGA", defaultVisible: false },
  { key: "runner_fg_att_pg", label: "Runner FGA/G", defaultVisible: false },
  { key: "runner_fg_att_per40", label: "Runner FGA/40", defaultVisible: false },
  { key: "runner_ftr", label: "Runner FTr", defaultVisible: true },
  { key: "runner_fta", label: "Runner FTA", defaultVisible: false },
  { key: "runner_fta_pg", label: "Runner FTA/G", defaultVisible: false },
  { key: "runner_fta_per40", label: "Runner FTA/40", defaultVisible: false },
  { key: "runner_fg_pct", label: "Runner FG%", defaultVisible: false },
  { key: "runner_ts_pct", label: "Runner TS%", defaultVisible: false },
  { key: "runner_two_fg_att", label: "Runner 2PA", defaultVisible: false },
  { key: "runner_two_fg_att_pg", label: "Runner 2PA/G", defaultVisible: false },
  { key: "runner_two_fg_att_per40", label: "Runner 2PA/40", defaultVisible: false },
  { key: "runner_two_fg_pct", label: "Runner 2P%", defaultVisible: true },
  { key: "runner_plus1_pct", label: "Runner +1%", defaultVisible: false },
  { key: "runner_ssq", label: "Runner SSQ", defaultVisible: false },
  { key: "runner_ssm", label: "Runner SSM", defaultVisible: false },
];

const D1_HALFCOURT_COLUMNS = [
  { key: "halfcourt_poss", label: "HC Poss", defaultVisible: false },
  { key: "halfcourt_freq", label: "HC Freq", defaultVisible: true },
  { key: "halfcourt_ppp", label: "HC PPP", defaultVisible: true },
  { key: "halfcourt_fg_att", label: "HC FGA", defaultVisible: false },
  { key: "halfcourt_fg_att_pg", label: "HC FGA/G", defaultVisible: false },
  { key: "halfcourt_fg_att_per40", label: "HC FGA/40", defaultVisible: false },
  { key: "halfcourt_efg_pct", label: "HC eFG%", defaultVisible: true },
  { key: "halfcourt_ts_pct", label: "HC TS%", defaultVisible: false },
  { key: "halfcourt_tov_pct", label: "HC TO%", defaultVisible: true },
  { key: "halfcourt_ftr", label: "HC FTr", defaultVisible: true },
  { key: "halfcourt_fta", label: "HC FTA", defaultVisible: false },
  { key: "halfcourt_fta_pg", label: "HC FTA/G", defaultVisible: false },
  { key: "halfcourt_fta_per40", label: "HC FTA/40", defaultVisible: false },
  { key: "halfcourt_two_fg_att", label: "HC 2PA", defaultVisible: false },
  { key: "halfcourt_two_fg_att_pg", label: "HC 2PA/G", defaultVisible: false },
  { key: "halfcourt_two_fg_att_per40", label: "HC 2PA/40", defaultVisible: false },
  { key: "halfcourt_two_fg_pct", label: "HC 2P%", defaultVisible: false },
  { key: "halfcourt_three_fg_att", label: "HC 3PA", defaultVisible: false },
  { key: "halfcourt_three_fg_att_pg", label: "HC 3PA/G", defaultVisible: false },
  { key: "halfcourt_three_fg_att_per40", label: "HC 3PA/40", defaultVisible: false },
  { key: "halfcourt_three_fg_pct", label: "HC 3P%", defaultVisible: false },
  { key: "halfcourt_three_pr", label: "HC 3Pr", defaultVisible: false },
];

const D1_SHOT_PROFILE_COLUMNS = [
  { key: "dunk_made", label: "Dunk Made", defaultVisible: false, mode: "totals" },
  { key: "dunk_att", label: "Dunk FGA", defaultVisible: false, mode: "totals" },
  { key: "dunk_unast_made", label: "Dunk Unast", defaultVisible: false, mode: "totals" },
  { key: "dunk_made_pg", label: "Dunk Made/G", defaultVisible: false, mode: "per_game" },
  { key: "dunk_att_pg", label: "Dunk FGA/G", defaultVisible: false, mode: "per_game" },
  { key: "dunk_unast_made_pg", label: "Dunk Unast/G", defaultVisible: false, mode: "per_game" },
  { key: "dunk_made_per40", label: "Dunk Made/40", defaultVisible: false, mode: "per40" },
  { key: "dunk_att_per40", label: "Dunk FGA/40", defaultVisible: false, mode: "per40" },
  { key: "dunk_unast_made_per40", label: "Dunk Unast/40", defaultVisible: false, mode: "per40" },
  { key: "dunk_pct", label: "Dunk%", defaultVisible: true, mode: "always" },
  { key: "dunk_ast_pct", label: "Dunk Ast%", defaultVisible: false, mode: "always" },
  { key: "rim_made", label: "Rim Made", defaultVisible: false, mode: "totals" },
  { key: "rim_att", label: "Rim FGA", defaultVisible: false, mode: "totals" },
  { key: "rim_unast_made", label: "Rim Unast", defaultVisible: false, mode: "totals" },
  { key: "rim_made_pg", label: "Rim Made/G", defaultVisible: false, mode: "per_game" },
  { key: "rim_att_pg", label: "Rim FGA/G", defaultVisible: false, mode: "per_game" },
  { key: "rim_unast_made_pg", label: "Rim Unast/G", defaultVisible: false, mode: "per_game" },
  { key: "rim_made_per40", label: "Rim Made/40", defaultVisible: false, mode: "per40" },
  { key: "rim_att_per40", label: "Rim FGA/40", defaultVisible: false, mode: "per40" },
  { key: "rim_unast_made_per40", label: "Rim Unast/40", defaultVisible: false, mode: "per40" },
  { key: "rim_pct", label: "Rim%", defaultVisible: true, mode: "always" },
  { key: "rim_ast_pct", label: "Rim Ast%", defaultVisible: true, mode: "always" },
  { key: "mid_made", label: "Mid Made", defaultVisible: false, mode: "totals" },
  { key: "mid_att", label: "Mid FGA", defaultVisible: false, mode: "totals" },
  { key: "mid_unast_made", label: "Mid Unast", defaultVisible: false, mode: "totals" },
  { key: "mid_made_pg", label: "Mid Made/G", defaultVisible: false, mode: "per_game" },
  { key: "mid_att_pg", label: "Mid FGA/G", defaultVisible: false, mode: "per_game" },
  { key: "mid_unast_made_pg", label: "Mid Unast/G", defaultVisible: false, mode: "per_game" },
  { key: "mid_made_per40", label: "Mid Made/40", defaultVisible: false, mode: "per40" },
  { key: "mid_att_per40", label: "Mid FGA/40", defaultVisible: false, mode: "per40" },
  { key: "mid_unast_made_per40", label: "Mid Unast/40", defaultVisible: false, mode: "per40" },
  { key: "mid_pct", label: "Mid%", defaultVisible: true, mode: "always" },
  { key: "mid_ast_pct", label: "Mid Ast%", defaultVisible: true, mode: "always" },
  { key: "rim_to_mid_att_ratio", label: "R:L2", defaultVisible: true, mode: "always" },
  { key: "two_p_made", label: "2P Made", defaultVisible: false, mode: "totals" },
  { key: "two_p_att", label: "2P Att", defaultVisible: false, mode: "totals" },
  { key: "two_p_unast_made", label: "2P Unast", defaultVisible: false, mode: "totals" },
  { key: "two_p_made_pg", label: "2P Made/G", defaultVisible: false, mode: "per_game" },
  { key: "two_p_att_pg", label: "2P Att/G", defaultVisible: false, mode: "per_game" },
  { key: "two_p_unast_made_pg", label: "2P Unast/G", defaultVisible: false, mode: "per_game" },
  { key: "two_p_made_per40", label: "2P Made/40", defaultVisible: false, mode: "per40" },
  { key: "two_p_att_per40", label: "2P Att/40", defaultVisible: false, mode: "per40" },
  { key: "two_p_unast_made_per40", label: "2P Unast/40", defaultVisible: false, mode: "per40" },
  { key: "two_p_pct", label: "2P%", defaultVisible: true, mode: "always" },
  { key: "two_p_ast_pct", label: "2P Ast%", defaultVisible: true, mode: "always" },
  { key: "three_p_made", label: "3P Made", defaultVisible: false, mode: "totals" },
  { key: "three_p_att", label: "3P Att", defaultVisible: false, mode: "totals" },
  { key: "three_p_unast_made", label: "3P Unast", defaultVisible: false, mode: "totals" },
  { key: "three_p_made_pg", label: "3P Made/G", defaultVisible: false, mode: "per_game" },
  { key: "three_p_att_pg", label: "3P Att/G", defaultVisible: false, mode: "per_game" },
  { key: "three_p_unast_made_pg", label: "3P Unast/G", defaultVisible: false, mode: "per_game" },
  { key: "three_p_made_per40", label: "3P Made/40", defaultVisible: false, mode: "per40" },
  { key: "three_p_att_per40", label: "3P Att/40", defaultVisible: false, mode: "per40" },
  { key: "three_p_unast_made_per40", label: "3P Unast/40", defaultVisible: false, mode: "per40" },
  { key: "three_p_pct", label: "3P%", defaultVisible: true, mode: "always" },
  { key: "three_p_ast_pct", label: "3P Ast%", defaultVisible: true, mode: "always" },
  { key: "ftm", label: "FTM", defaultVisible: false, mode: "totals" },
  { key: "fta", label: "FTA", defaultVisible: false, mode: "totals" },
  { key: "ftm_pg", label: "FTM/G", defaultVisible: false, mode: "per_game" },
  { key: "fta_pg", label: "FTA/G", defaultVisible: false, mode: "per_game" },
  { key: "ftm_per40", label: "FTM/40", defaultVisible: false, mode: "per40" },
  { key: "fta_per40", label: "FTA/40", defaultVisible: false, mode: "per40" },
  { key: "ft_pct", label: "FT%", defaultVisible: true, mode: "always" },
  { key: "efg_pct", label: "eFG%", defaultVisible: true, mode: "always" },
  { key: "three_p_per100", label: "3PA/100", defaultVisible: true, mode: "always" },
];

const LOWER_TIER_SHOT_PROFILE_COLUMNS = [
  { key: "dunk_made", label: "Dunk Made", defaultVisible: false },
  { key: "dunk_att", label: "Dunk FGA", defaultVisible: false },
  { key: "dunk_unast_made", label: "Dunk Unast", defaultVisible: false },
  { key: "dunk_made_pg", label: "Dunk Made/G", defaultVisible: false },
  { key: "dunk_att_pg", label: "Dunk FGA/G", defaultVisible: false },
  { key: "dunk_unast_made_pg", label: "Dunk Unast/G", defaultVisible: false },
  { key: "dunk_made_per40", label: "Dunk Made/40", defaultVisible: false },
  { key: "dunk_att_per40", label: "Dunk FGA/40", defaultVisible: false },
  { key: "dunk_unast_made_per40", label: "Dunk Unast/40", defaultVisible: false },
  { key: "dunk_pct", label: "Dunk%", defaultVisible: false },
  { key: "dunk_ast_pct", label: "Dunk Ast%", defaultVisible: false },
  { key: "rim_made", label: "Rim Made", defaultVisible: false },
  { key: "rim_att", label: "Rim FGA", defaultVisible: false },
  { key: "rim_unast_made", label: "Rim Unast", defaultVisible: false },
  { key: "rim_made_pg", label: "Rim Made/G", defaultVisible: false },
  { key: "rim_att_pg", label: "Rim FGA/G", defaultVisible: false },
  { key: "rim_unast_made_pg", label: "Rim Unast/G", defaultVisible: false },
  { key: "rim_made_per40", label: "Rim Made/40", defaultVisible: false },
  { key: "rim_att_per40", label: "Rim FGA/40", defaultVisible: false },
  { key: "rim_unast_made_per40", label: "Rim Unast/40", defaultVisible: false },
  { key: "rim_pct", label: "Rim%", defaultVisible: true },
  { key: "rim_ast_pct", label: "Rim Ast%", defaultVisible: false },
  { key: "mid_made", label: "Mid Made", defaultVisible: false },
  { key: "mid_att", label: "Mid FGA", defaultVisible: false },
  { key: "mid_unast_made", label: "Mid Unast", defaultVisible: false },
  { key: "mid_made_pg", label: "Mid Made/G", defaultVisible: false },
  { key: "mid_att_pg", label: "Mid FGA/G", defaultVisible: false },
  { key: "mid_unast_made_pg", label: "Mid Unast/G", defaultVisible: false },
  { key: "mid_made_per40", label: "Mid Made/40", defaultVisible: false },
  { key: "mid_att_per40", label: "Mid FGA/40", defaultVisible: false },
  { key: "mid_unast_made_per40", label: "Mid Unast/40", defaultVisible: false },
  { key: "mid_pct", label: "Mid%", defaultVisible: true },
  { key: "mid_ast_pct", label: "Mid Ast%", defaultVisible: false },
  { key: "two_p_made", label: "2P Made", defaultVisible: false },
  { key: "two_p_att", label: "2P Att", defaultVisible: false },
  { key: "two_p_unast_made", label: "2P Unast", defaultVisible: false },
  { key: "two_p_made_pg", label: "2P Made/G", defaultVisible: false },
  { key: "two_p_att_pg", label: "2P Att/G", defaultVisible: false },
  { key: "two_p_unast_made_pg", label: "2P Unast/G", defaultVisible: false },
  { key: "two_p_made_per40", label: "2P Made/40", defaultVisible: false },
  { key: "two_p_att_per40", label: "2P Att/40", defaultVisible: false },
  { key: "two_p_unast_made_per40", label: "2P Unast/40", defaultVisible: false },
  { key: "two_p_pct", label: "2P%", defaultVisible: false },
  { key: "two_p_ast_pct", label: "2P Ast%", defaultVisible: false },
  { key: "three_p_made", label: "3P Made", defaultVisible: false },
  { key: "three_p_att", label: "3P Att", defaultVisible: false },
  { key: "three_p_unast_made", label: "3P Unast", defaultVisible: false },
  { key: "three_p_made_pg", label: "3P Made/G", defaultVisible: false },
  { key: "three_p_att_pg", label: "3P Att/G", defaultVisible: false },
  { key: "three_p_unast_made_pg", label: "3P Unast/G", defaultVisible: false },
  { key: "three_p_made_per40", label: "3P Made/40", defaultVisible: false },
  { key: "three_p_att_per40", label: "3P Att/40", defaultVisible: false },
  { key: "three_p_unast_made_per40", label: "3P Unast/40", defaultVisible: false },
  { key: "three_p_pct", label: "3P%", defaultVisible: false },
  { key: "three_p_ast_pct", label: "3P Ast%", defaultVisible: false },
];
const LOWER_TIER_SHOT_PROFILE_LABELS = LOWER_TIER_SHOT_PROFILE_COLUMNS.reduce((labels, item) => {
  labels[item.key] = item.label;
  return labels;
}, {});
const D2_PDF_NBA_OVERRIDE_ROWS = [
  { season: "2013-14", team: "UCCS", player: "Derrick White", nba_name: "Derrick White", first_nba_year: 2017 },
  { season: "2014-15", team: "UCCS", player: "Derrick White", nba_name: "Derrick White", first_nba_year: 2017 },
  { season: "2014-15", team: "Lewis", player: "Max Strus", nba_name: "Max Strus", first_nba_year: 2019 },
  { season: "2015-16", team: "Lewis", player: "Max Strus", nba_name: "Max Strus", first_nba_year: 2019 },
  { season: "2013-14", team: "UIndy", player: "Jordan Loyd", nba_name: "Jordan Loyd", first_nba_year: 2018 },
  { season: "2014-15", team: "UIndy", player: "Jordan Loyd", nba_name: "Jordan Loyd", first_nba_year: 2018 },
  { season: "2015-16", team: "UIndy", player: "Jordan Loyd", nba_name: "Jordan Loyd", first_nba_year: 2018 },
  { season: "2014-15", team: "Lincoln Memorial", player: "Emmanuel Terry", nba_name: "Emmanuel Terry", first_nba_year: 2018 },
  { season: "2015-16", team: "Lincoln Memorial", player: "Emmanuel Terry", nba_name: "Emmanuel Terry", first_nba_year: 2018 },
  { season: "2017-18", team: "Lincoln Memorial", player: "Emmanuel Terry", nba_name: "Emmanuel Terry", first_nba_year: 2018 },
  { season: "2016-17", team: "Wheeling", player: "Haywood Highsmith", nba_name: "Haywood Highsmith", first_nba_year: 2018 },
  { season: "2017-18", team: "Wheeling", player: "Haywood Highsmith", nba_name: "Haywood Highsmith", first_nba_year: 2018 },
  { season: "2018-19", team: "Northwest Mo. St.", player: "Trevor Hudgins", nba_name: "Trevor Hudgins", first_nba_year: 2022 },
  { season: "2019-20", team: "Northwest Mo. St.", player: "Trevor Hudgins", nba_name: "Trevor Hudgins", first_nba_year: 2022 },
  { season: "2020-21", team: "Northwest Mo. St.", player: "Trevor Hudgins", nba_name: "Trevor Hudgins", first_nba_year: 2022 },
  { season: "2021-22", team: "Northwest Mo. St.", player: "Trevor Hudgins", nba_name: "Trevor Hudgins", first_nba_year: 2022 },
  { season: "2018-19", team: "Truman St.", player: "Brodric Thomas", nba_name: "Brodric Thomas", first_nba_year: 2020 },
  { season: "2019-20", team: "Truman St.", player: "Brodric Thomas", nba_name: "Brodric Thomas", first_nba_year: 2020 },
  { season: "2021-22", team: "Sonoma St.", player: "Jaylen Wells", nba_name: "Jaylen Wells", first_nba_year: 2024 },
  { season: "2022-23", team: "Sonoma St.", player: "Jaylen Wells", nba_name: "Jaylen Wells", first_nba_year: 2024 },
];

const D1_ADVANCED_COLUMNS = [
  { key: "min_per", label: "Min%", defaultVisible: true },
  { key: "ortg", label: "ORtg", defaultVisible: false },
  { key: "drtg", label: "DRtg", defaultVisible: false },
  { key: "net_rating", label: "NetRtg", defaultVisible: false },
  { key: "per", label: "PER", defaultVisible: false },
  { key: "porpag", label: "PRPG", defaultVisible: true },
  { key: "dporpag", label: "dPRPG", defaultVisible: true },
  { key: "fic", label: "FIC", defaultVisible: false },
  { key: "ppr", label: "PPR", defaultVisible: false },
  { key: "bpm", label: "BPM", defaultVisible: true },
  { key: "obpm", label: "OBPM", defaultVisible: false },
  { key: "dbpm", label: "DBPM", defaultVisible: false },
  { key: "orb_pct", label: "ORB%", defaultVisible: true },
  { key: "drb_pct", label: "DRB%", defaultVisible: true },
  { key: "trb_pct", label: "TRB%", defaultVisible: false },
  { key: "usg_pct", label: "USG%", defaultVisible: true },
  { key: "ast_pct", label: "AST%", defaultVisible: true },
  { key: "tov_pct_adv", label: "TOV%", defaultVisible: true },
  { key: "ast_to", label: "A:TO", defaultVisible: true },
  { key: "ast_pct_usg_pct", label: "AST%:USG%", defaultVisible: false },
  { key: "ast_pct_tov_pct", label: "AST%:TOV%", defaultVisible: false },
  { key: "stl_pct", label: "STL%", defaultVisible: true },
  { key: "blk_pct", label: "BLK%", defaultVisible: true },
  { key: "stocks_pct", label: "STL%+BLK%", defaultVisible: false },
  { key: "bpm_diff", label: "BPMdiff", defaultVisible: false },
  { key: "bpm_frac", label: "BPMfrac", defaultVisible: false },
];

const D1_BART_CORE_COLUMNS = ["net_rating", "ortg", "drtg", "min_per", "porpag", "dporpag"];
const D1_BART_RATE_COLUMNS = ["min_per", "porpag", "dporpag", "obpm", "dbpm", "bpm"];
const D1_BART_COMBO_COLUMNS = ["per", "bpm_diff", "bpm_frac", "nba_career_epm"];

const D1_ADVANCED_GROUPS = [
  {
    id: "advanced_bart",
    label: "Bart",
    groupClass: "advanced",
    columns: [...new Set([...D1_BART_CORE_COLUMNS, ...D1_BART_RATE_COLUMNS, ...D1_BART_COMBO_COLUMNS])],
    defaultColumns: ["min_per", "obpm", "dbpm", "bpm"],
    defaultUnitMode: "rates",
    unitModes: [
      { id: "core", label: "Core", columns: D1_BART_CORE_COLUMNS, defaultColumns: ["net_rating", "ortg", "drtg", "min_per"] },
      { id: "rates", label: "Rates", columns: D1_BART_RATE_COLUMNS, defaultColumns: ["min_per", "obpm", "dbpm", "bpm"] },
      { id: "combos", label: "Combos", columns: D1_BART_COMBO_COLUMNS, defaultColumns: ["per", "bpm_diff", "bpm_frac"] },
      { id: "all", label: "All", columns: [...new Set([...D1_BART_CORE_COLUMNS, ...D1_BART_RATE_COLUMNS, ...D1_BART_COMBO_COLUMNS])] },
    ],
  },
];

const D1_ANCILLARY_MAIN_COLUMNS = ["orb_pct", "drb_pct", "usg_pct", "ast_pct", "tov_pct_adv", "ast_to", "stl_pct", "blk_pct"];
const D1_ANCILLARY_SHOOTING_COLUMNS = ["three_pr", "ftr", "ts_pct"];
const D1_ANCILLARY_CUSTOM_COLUMNS = ["ast_pct_usg_pct", "ast_pct_tov_pct", "trb_pct", "stocks_pct"];

const D1_ANCILLARY_GROUPS = [
  {
    id: "ancillaries",
    label: "Ancillaries",
    groupClass: "ancillaries",
    columns: [...new Set([...D1_ANCILLARY_MAIN_COLUMNS, ...D1_ANCILLARY_SHOOTING_COLUMNS, ...D1_ANCILLARY_CUSTOM_COLUMNS])],
    defaultColumns: [...D1_ANCILLARY_MAIN_COLUMNS, ...D1_ANCILLARY_SHOOTING_COLUMNS],
    defaultUnitMode: "main",
    unitModes: [
      { id: "main", label: "Main", columns: [...D1_ANCILLARY_MAIN_COLUMNS, ...D1_ANCILLARY_SHOOTING_COLUMNS], defaultColumns: [...D1_ANCILLARY_MAIN_COLUMNS, ...D1_ANCILLARY_SHOOTING_COLUMNS] },
      { id: "custom", label: "Custom", columns: D1_ANCILLARY_CUSTOM_COLUMNS, defaultColumns: ["ast_pct_usg_pct", "ast_pct_tov_pct"] },
      { id: "all", label: "All", columns: [...new Set([...D1_ANCILLARY_MAIN_COLUMNS, ...D1_ANCILLARY_SHOOTING_COLUMNS, ...D1_ANCILLARY_CUSTOM_COLUMNS])] },
    ],
  },
];

function getD1PlaytypeMetrics(playtypeId) {
  const omitted = {
    post_up: new Set(["three_fg_att", "three_fg_att_pg", "three_fg_pct", "three_pr"]),
    cut: new Set(["three_fg_att", "three_fg_att_pg", "three_fg_pct", "three_pr"]),
  }[playtypeId];
  if (!omitted?.size) return D1_PLAYTYPE_METRICS;
  return D1_PLAYTYPE_METRICS.filter((metric) => !omitted.has(metric.suffix));
}

function getD1DefaultPlaytypeShootSuffix(playtypeId) {
  if (["spot_up", "off_screen"].includes(playtypeId)) return "three_fg_pct";
  if (["post_up", "pnr_roll", "cut", "off_reb"].includes(playtypeId)) return "two_fg_pct";
  return "efg_pct";
}

function getD1TransitionGroup() {
  const metricColumns = [
    { key: "transition_poss", label: "Trans Poss", defaultVisible: false },
    { key: "transition_points", label: "Trans PTS", defaultVisible: false },
    { key: "transition_points_pg", label: "Trans PTS/G", defaultVisible: false },
    { key: "transition_points_per40", label: "Trans PTS/40", defaultVisible: false },
    { key: "transition_freq", label: "Trans Freq", defaultVisible: true },
    { key: "transition_ppp", label: "Trans PPP", defaultVisible: true },
    { key: "transition_fg_att", label: "Trans FGA", defaultVisible: false },
    { key: "transition_fg_made", label: "Trans FGM", defaultVisible: false },
    { key: "transition_fg_miss", label: "Trans FG Miss", defaultVisible: false },
    { key: "transition_fg_att_pg", label: "Trans FGA/G", defaultVisible: false },
    { key: "transition_fg_att_per40", label: "Trans FGA/40", defaultVisible: false },
    { key: "transition_efg_pct", label: "Trans eFG%", defaultVisible: true },
    { key: "transition_ts_pct", label: "Trans TS%", defaultVisible: false },
    { key: "transition_tov_pct", label: "Trans TO%", defaultVisible: true },
    { key: "transition_ftr", label: "Trans FTr", defaultVisible: true },
    { key: "transition_fta", label: "Trans FTA", defaultVisible: false },
    { key: "transition_fta_pg", label: "Trans FTA/G", defaultVisible: false },
    { key: "transition_fta_per40", label: "Trans FTA/40", defaultVisible: false },
    { key: "transition_two_fg_att", label: "Trans 2PA", defaultVisible: false },
    { key: "transition_two_fg_made", label: "Trans 2PM", defaultVisible: false },
    { key: "transition_two_fg_miss", label: "Trans 2P Miss", defaultVisible: false },
    { key: "transition_two_fg_att_pg", label: "Trans 2PA/G", defaultVisible: false },
    { key: "transition_two_fg_att_per40", label: "Trans 2PA/40", defaultVisible: false },
    { key: "transition_two_fg_pct", label: "Trans 2P%", defaultVisible: false },
    { key: "transition_three_fg_att", label: "Trans 3PA", defaultVisible: false },
    { key: "transition_three_fg_made", label: "Trans 3PM", defaultVisible: false },
    { key: "transition_three_fg_miss", label: "Trans 3P Miss", defaultVisible: false },
    { key: "transition_three_fg_att_pg", label: "Trans 3PA/G", defaultVisible: false },
    { key: "transition_three_fg_att_per40", label: "Trans 3PA/40", defaultVisible: false },
    { key: "transition_three_fg_pct", label: "Trans 3P%", defaultVisible: false },
    { key: "transition_three_pr", label: "Trans 3Pr", defaultVisible: false },
  ];
  return {
    group: {
      id: "transition",
      label: "Transition",
      columns: metricColumns.map((item) => item.key),
      defaultColumns: metricColumns.filter((item) => item.defaultVisible).map((item) => item.key),
      unitModeKind: "playtype",
    },
    labels: Object.fromEntries(metricColumns.map((item) => [item.key, item.label])),
  };
}

function buildCollegePlaytypeGroups() {
  const transitionGroup = getD1TransitionGroup().group;
  return D1_PLAYTYPE_DEFS.map((playtype) => {
    const metrics = getD1PlaytypeMetrics(playtype.id);
    const shootSuffix = getD1DefaultPlaytypeShootSuffix(playtype.id);
    return {
      id: playtype.id,
      label: playtype.label,
      columns: metrics.map((metric) => `${playtype.id}_${metric.suffix}`),
      defaultColumns: metrics
        .filter((metric) => metric.defaultVisible || metric.suffix === shootSuffix)
        .map((metric) => `${playtype.id}_${metric.suffix}`),
      unitModeKind: "playtype",
    };
  }).concat({ ...transitionGroup });
}

function buildCollegePlaytypeLabels() {
  const labels = {};
  D1_PLAYTYPE_DEFS.forEach((playtype) => {
    getD1PlaytypeMetrics(playtype.id).forEach((metric) => {
      labels[`${playtype.id}_${metric.suffix}`] = `${playtype.short} ${metric.label}`;
    });
  });
  Object.assign(labels, getD1TransitionGroup().labels);
  return labels;
}

function buildNbaPlaytypeGroups() {
  return NBA_PLAYTYPE_DEFS.map((playtype) => ({
    id: playtype.id,
    label: playtype.label,
    columns: NBA_PLAYTYPE_METRICS.map((metric) => `${playtype.id}_${metric.suffix}`),
    defaultColumns: NBA_PLAYTYPE_METRICS
      .filter((metric) => metric.defaultVisible)
      .map((metric) => `${playtype.id}_${metric.suffix}`),
    unitModeKind: "playtype",
  }));
}

function buildNbaPlaytypeLabels() {
  const labels = {};
  NBA_PLAYTYPE_DEFS.forEach((playtype) => {
    NBA_PLAYTYPE_METRICS.forEach((metric) => {
      labels[`${playtype.id}_${metric.suffix}`] = `${playtype.short} ${metric.label}`;
    });
  });
  return labels;
}

function buildGeneralStatGroup(options = {}) {
  const includePer100 = options.includePer100 !== false;
  const includeTotals = options.includeTotals !== false;
  const columns = [...(includeTotals ? GENERAL_TOTAL_COLUMNS : []), ...GENERAL_PER_GAME_COLUMNS, ...GENERAL_PER40_COLUMNS];
  if (includePer100) columns.push(...GENERAL_PER100_COLUMNS);
  const unitModes = [
    { id: "per_game", label: "Per G", columns: GENERAL_PER_GAME_COLUMNS, defaultColumns: GENERAL_DEFAULT_PER_GAME_COLUMNS },
    { id: "per40", label: "Per 40", columns: GENERAL_PER40_COLUMNS, defaultColumns: GENERAL_DEFAULT_PER40_COLUMNS },
  ];
  if (includePer100) {
    unitModes.push({ id: "per100", label: "Per 100", columns: GENERAL_PER100_COLUMNS, defaultColumns: ["pts_per100", "trb_per100", "ast_per100", "stl_per100", "blk_per100", "tov_per100"] });
  }
  if (includeTotals) unitModes.push({ id: "totals", label: "Totals", columns: GENERAL_TOTAL_COLUMNS, defaultColumns: GENERAL_DEFAULT_TOTAL_COLUMNS });
  unitModes.push({ id: "all", label: "All", columns });
  return {
    id: "general",
    label: "General",
    groupClass: "general",
    columns,
    defaultColumns: GENERAL_DEFAULT_PER_GAME_COLUMNS,
    defaultUnitMode: "per_game",
    unitModes,
  };
}

function cloneSingleFilter(filter, override = {}) {
  const merged = { ...filter, ...override };
  const sourceOptions = override.options || filter.options;
  if (sourceOptions) merged.options = sourceOptions.map((option) => ({ ...option }));
  return merged;
}

function withSharedSingleFilters(filters = [], overrides = {}) {
  return [
    ...SHARED_SINGLE_FILTERS.map((filter) => cloneSingleFilter(filter, overrides[filter.id] || {})),
    ...filters,
  ];
}

function withSingleFilterDefault(filters = [], filterId, defaultValue) {
  return (filters || []).map((filter) => (filter.id === filterId ? { ...filter, defaultValue } : filter));
}

function buildD1Config() {
  const demoColumns = ["conference", "coach", "pos", "class_year", "height_in", "weight_lb", "wingspan", "bmi", "age", "dob", "gp", "min", "mpg", "draft_pick"];
  const labels = {
    rank: "",
    season: "Year",
    player_name: "Player",
    team_name: "Team",
    conference: "Conf",
    coach: "Coach",
    pos: "Pos",
    class_year: "Class",
    height_in: "HT",
    weight_lb: "WT",
    wingspan: "WS",
    bmi: "BMI",
    age: "Age",
    dob: "DOB",
    gp: "GP",
    min: "Min",
    mpg: "MPG",
    total_poss: "Poss",
    draft_pick: "Pick",
    three_pr: "3Pr",
    ftr: "FTr",
    ts_pct: "TS%",
  };

  const groups = [
    {
      id: "info",
      label: "Info",
      columns: ["conference", "coach", "pos", "class_year"],
      defaultColumns: [],
      hiddenInFilters: true,
    },
    {
      id: "combine_measurements",
      label: "Combine",
      columns: D1_COMBINE_MEASUREMENT_COLUMNS.map((item) => item.key),
      defaultColumns: [],
    },
    buildGeneralStatGroup({ includePer100: false }),
    ...D1_ADVANCED_GROUPS,
    ...D1_ANCILLARY_GROUPS,
    {
      id: "shot_profile",
      label: "Shot Profile",
      groupClass: "shot_profile",
      columns: D1_SHOT_PROFILE_COLUMNS.map((item) => item.key),
      defaultColumns: D1_SHOT_PROFILE_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key),
      unitModeKind: "shot_profile",
    },
    {
      id: "halfcourt",
      label: "HC Stats",
      columns: D1_HALFCOURT_COLUMNS.map((item) => item.key),
      defaultColumns: D1_HALFCOURT_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key),
      unitModeKind: "playtype",
    },
  ];
  const playtypeGroups = [];

  D1_SUMMARY_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  D1_PLAYTYPE_FREQ_POSS_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  D1_HALFCOURT_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  D1_SHOT_PROFILE_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  D1_ADVANCED_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  Object.assign(labels, GENERAL_LABELS);
  labels.nba_career_epm = "NBA EPM";
  D1_DRIVE_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  D1_COMBINE_MEASUREMENT_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  Object.assign(labels, D1_RIM_SCORING_LABELS);
  D1_RUNNER_COLUMNS.forEach((item) => {
    labels[item.key] = item.label;
  });
  Object.assign(labels, getD1TransitionGroup().labels);

  D1_PLAYTYPE_DEFS.forEach((playtype) => {
    const metrics = getD1PlaytypeMetrics(playtype.id);
    const columns = metrics.map((metric) => `${playtype.id}_${metric.suffix}`);
    const shootSuffix = getD1DefaultPlaytypeShootSuffix(playtype.id);
    const defaultColumns = metrics
      .filter((metric) => metric.defaultVisible || metric.suffix === shootSuffix)
      .map((metric) => `${playtype.id}_${metric.suffix}`);
    playtypeGroups.push({
      id: playtype.id,
      label: playtype.label,
      columns,
      defaultColumns,
      unitModeKind: "playtype",
    });
    metrics.forEach((metric) => {
      labels[`${playtype.id}_${metric.suffix}`] = `${playtype.short} ${metric.label}`;
    });
  });

  const transitionGroup = getD1TransitionGroup();
  playtypeGroups.push(transitionGroup.group);
  groups.push(...playtypeGroups);
  groups.push(
    {
      id: "drive",
      label: "Drive",
      columns: D1_DRIVE_COLUMNS.map((item) => item.key),
      defaultColumns: D1_DRIVE_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key),
      unitModeKind: "playtype",
    },
    {
      id: "rim_scoring",
      label: "Created Rim Scoring",
      groupClass: "rim_scoring",
      columns: D1_RIM_SCORING_COLUMNS,
      defaultColumns: ["rim_scoring_attempt_freq", "rim_scoring_ppp", "rim_scoring_fg_pct", "rim_scoring_ftr", "rim_scoring_plus1_pct", "rim_iso_fg_pct", "rim_pnr_fg_pct", "rim_su_fg_pct"],
      defaultUnitMode: "rates",
      unitModes: [
        { id: "rates", label: "Rates", columns: D1_RIM_SCORING_RATE_COLUMNS, defaultColumns: ["rim_scoring_attempt_freq", "rim_scoring_ppp", "rim_scoring_fg_pct", "rim_scoring_ftr", "rim_scoring_plus1_pct", "rim_iso_fg_pct", "rim_pnr_fg_pct", "rim_su_fg_pct"] },
        { id: "true_created", label: "True Created", columns: D1_RIM_TRUE_CREATED_COLUMNS, defaultColumns: ["rim_true_created_attempt_freq", "rim_true_created_ppp", "rim_true_created_fg_pct", "rim_true_created_ftr", "rim_true_created_tov_pct", "rim_true_created_plus1_pct", "rim_true_created_fga", "rim_true_created_poss"] },
        { id: "totals", label: "Totals", columns: D1_RIM_SCORING_TOTAL_COLUMNS, defaultColumns: ["rim_scoring_poss", "rim_scoring_points", "rim_scoring_fga", "rim_scoring_fgm", "rim_scoring_fta", "rim_iso_fga", "rim_pnr_fga", "rim_su_fga"] },
        { id: "per40", label: "Per 40", columns: D1_RIM_SCORING_PER40_COLUMNS, defaultColumns: ["rim_scoring_poss_per40", "rim_scoring_points_per40", "rim_scoring_fga_per40", "rim_scoring_fta_per40", "rim_iso_fga_per40", "rim_pnr_fga_per40", "rim_su_fga_per40"] },
        { id: "per_game", label: "Per Game", columns: D1_RIM_SCORING_PER_GAME_COLUMNS, defaultColumns: ["rim_scoring_poss_pg", "rim_scoring_points_pg", "rim_scoring_fga_pg", "rim_scoring_fta_pg", "rim_iso_fga_pg", "rim_pnr_fga_pg", "rim_su_fga_pg"] },
        { id: "all", label: "All", columns: D1_RIM_SCORING_COLUMNS },
      ],
    },
    {
      id: "runner",
      label: "Runners",
      columns: D1_RUNNER_COLUMNS.map((item) => item.key),
      defaultColumns: D1_RUNNER_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key),
      unitModeKind: "playtype",
    },
  );

  const defaultVisible = groups
    .filter((group) => ["general", "advanced_bart", "ancillaries", "shot_profile", "halfcourt", "transition"].includes(group.id))
    .flatMap((group) => group.defaultColumns);

  return {
    id: "d1",
    navLabel: "D1",
    title: "D1",
    subtitle: "",
    dataScript: "data/d1_enriched_all_seasons.js",
    extraScripts: [WINGSPAN_LOOKUP_SCRIPT, COMBINE_MEASUREMENTS_LOOKUP_SCRIPT],
    multipartDataScript: {
      type: "multipart-script",
      manifestScript: "data/vendor/d1_enriched_all_seasons_manifest.js",
      manifestGlobalName: "D1_ENRICHED_ALL_SEASONS_PARTS",
      partTemplate: "data/vendor/d1_enriched_all_seasons_parts/{part}.js",
    },
    mobileDataManifestScript: "data/vendor/d1_year_manifest.js",
    mobileDataScriptTemplate: "data/vendor/d1_year_chunks/{season}.js",
    mobileInitialYears: 1,
    deferredExtraScripts: [
      {
        type: "multipart-script",
        manifestScript: "data/vendor/d1_frontend_data_manifest.js",
        manifestGlobalName: "D1_FRONTEND_DATA_PARTS",
        partTemplate: "data/vendor/d1_frontend_data_parts/{part}.js",
      },
      "data/vendor/d1_drives.js",
      "data/vendor/d1_extras.js",
      "data/vendor/d1_rosters.js",
      "data/vendor/d1_coachdict.js",
    ],
    deferSupplementHydration: true,
    autoHydrateDeferred: false,
    globalName: "D1_ENRICHED_ALL_CSV",
    precomputed: false,
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "player_name", "team_name"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "conference", "coach", "team_search_text", "coach_search_text"]),
    sortBy: "min",
    sortDir: "desc",
    demoToggleColumns: ["age", "height_in", "weight_lb", "wingspan", "bmi", "dob", "gp", "min", "mpg", "draft_pick"],
    demoColumns,
    demoFilterColumns: ["age", "height_in", "weight_lb", "wingspan", "bmi", "dob", "gp", "min", "mpg", "draft_pick"],
    groups,
    singleFilters: withSharedSingleFilters([
      { id: "conference_bucket", label: "Conf", column: "conference" },
      { id: "coach", label: "Coach", column: "coach", searchable: true },
      {
        id: "status_path",
        label: "Status",
        options: [
          { value: "all", label: "All" },
          { value: "nba", label: "NBA" },
          { value: "former_juco", label: "Former JUCO" },
          { value: "future_juco", label: "Future JUCO" },
          { value: "former_d2", label: "Former D2" },
          { value: "future_d2", label: "Future D2" },
          { value: "former_naia", label: "Former NAIA" },
          { value: "future_naia", label: "Future NAIA" },
        ],
      },
      { id: "d1_bart_split", label: "Bart", defaultValue: D1_BART_SPLIT_DEFAULT, options: D1_BART_SPLIT_OPTIONS },
    ]),
    multiFilters: [
      { id: "pos", label: "Pos", column: "pos", sort: ["PG", "SG", "SF", "PF", "C"] },
      { id: "class_year", label: "Class", column: "class_year", sort: ["Fr", "So", "Jr", "Sr", "Gr"] },
    ],
    defaultVisible: [...new Set([...demoColumns.filter((column) => !["conference", "coach", "bmi", "draft_pick", "weight_lb", "wingspan", "mpg", "dob", "min"].includes(column)), ...defaultVisible])]
      .filter((column) => !GENERAL_DEFAULT_PER_GAME_COLUMNS.includes(column)),
    labels,
  };
}

function buildLowerTierShotProfileGroup() {
  return {
    id: "shot_profile",
    label: "Shot Profile",
    columns: LOWER_TIER_SHOT_PROFILE_COLUMNS.map((item) => item.key),
    defaultColumns: LOWER_TIER_SHOT_PROFILE_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key),
    unitModeKind: "shot_profile",
  };
}

const NBA_COMPANION_PLAYTYPE_DEFS = NBA_PLAYTYPE_DEFS.filter((playtype) => playtype.id !== "misc");
const NBA_COMPANION_PLAYTYPE_METRICS = [
  { suffix: "freq", label: "Freq" },
  { suffix: "ppp", label: "PPP" },
  { suffix: "poss", label: "Poss" },
];
const NBA_COMPANION_PLAYTYPE_COLUMNS = NBA_COMPANION_PLAYTYPE_DEFS.flatMap((playtype) => (
  NBA_COMPANION_PLAYTYPE_METRICS.flatMap((metric) => [
    `ncaa_${playtype.id}_${metric.suffix}`,
    `nba_${playtype.id}_${metric.suffix}`,
  ])
));
const NBA_COMPANION_DEFAULT_PLAYTYPE_IDS = new Set(["iso", "pnr_bh", "post_up", "spot_up", "transition"]);
const NBA_COMPANION_PLAYTYPE_DEFAULT_COLUMNS = NBA_COMPANION_PLAYTYPE_DEFS
  .filter((playtype) => NBA_COMPANION_DEFAULT_PLAYTYPE_IDS.has(playtype.id))
  .flatMap((playtype) => [
  `ncaa_${playtype.id}_ppp`,
  `nba_${playtype.id}_ppp`,
  `ncaa_${playtype.id}_freq`,
  `nba_${playtype.id}_freq`,
  ]);
const NBA_COMPANION_PLAYTYPE_LABELS = NBA_COMPANION_PLAYTYPE_DEFS.reduce((labels, playtype) => {
  NBA_COMPANION_PLAYTYPE_METRICS.forEach((metric) => {
    labels[`ncaa_${playtype.id}_${metric.suffix}`] = `NCAA ${playtype.short} ${metric.label}`;
    labels[`nba_${playtype.id}_${metric.suffix}`] = `NBA ${playtype.short} ${metric.label}`;
  });
  return labels;
}, {});

const NBA_COMPANION_GROUPS = [
  {
    id: "summary",
    label: "Summary",
    columns: ["ncaa_gp", "ncaa_min", "ncaa_mpg", "ncaa_height_in", "nba_height_in", "ncaa_weight_lb", "nba_weight_lb", "ncaa_bmi", "nba_bmi", "ncaa_porpag", "ncaa_dporpag", "ncaa_bpm", "nba_gp", "nba_mp", "nba_mpg", "nba_epm", "nba_oepm", "nba_depm", "nba_ewins"],
    defaultColumns: ["ncaa_gp", "ncaa_min", "ncaa_porpag", "ncaa_dporpag", "ncaa_bpm", "nba_gp", "nba_mp", "nba_epm", "nba_oepm", "nba_depm", "nba_ewins"],
  },
  {
    id: "advanced",
    label: "Advanced",
    columns: ["ncaa_orb_pct", "nba_orb_pct", "ncaa_drb_pct", "nba_drb_pct", "ncaa_usg_pct", "nba_usg_pct", "ncaa_ast_pct", "nba_ast_pct", "ncaa_ast_to", "nba_ast_to", "ncaa_tov_pct", "nba_tov_pct", "ncaa_stl_pct", "nba_stl_pct", "ncaa_blk_pct", "nba_blk_pct", "ncaa_stl_pct_percentile", "nba_stl_pct_percentile", "ncaa_blk_pct_percentile", "nba_blk_pct_percentile", "ncaa_ts_pct", "nba_ts_pct", "ncaa_efg_pct", "nba_efg_pct"],
    defaultColumns: ["ncaa_usg_pct", "nba_usg_pct", "ncaa_ast_pct", "nba_ast_pct", "ncaa_ast_to", "nba_ast_to", "ncaa_tov_pct", "nba_tov_pct", "ncaa_stl_pct", "nba_stl_pct", "ncaa_blk_pct", "nba_blk_pct", "ncaa_ts_pct", "nba_ts_pct", "ncaa_efg_pct", "nba_efg_pct"],
  },
  {
    id: "shooting",
    label: "Shot Profile",
    columns: ["ncaa_rim_pct", "nba_rim_pct", "ncaa_rim_ast_pct", "nba_rim_ast_pct", "ncaa_mid_pct", "nba_mid_pct", "ncaa_mid_ast_pct", "nba_mid_ast_pct", "ncaa_two_p_pct", "nba_two_p_pct", "ncaa_two_p_ast_pct", "nba_two_p_ast_pct", "ncaa_three_p_pct", "nba_three_p_pct", "ncaa_three_p_ast_pct", "nba_three_p_ast_pct", "ncaa_ft_pct", "nba_ft_pct", "ncaa_ftr", "nba_ftr", "ncaa_three_pr", "nba_three_pr"],
    defaultColumns: ["ncaa_rim_pct", "nba_rim_pct", "ncaa_rim_ast_pct", "nba_rim_ast_pct", "ncaa_two_p_pct", "nba_two_p_pct", "ncaa_two_p_ast_pct", "nba_two_p_ast_pct", "ncaa_three_p_pct", "nba_three_p_pct", "ncaa_three_p_ast_pct", "nba_three_p_ast_pct", "ncaa_ft_pct", "nba_ft_pct", "ncaa_ftr", "nba_ftr", "ncaa_three_pr", "nba_three_pr"],
  },
  {
    id: "playtypes",
    label: "Playtypes",
    columns: NBA_COMPANION_PLAYTYPE_COLUMNS,
    defaultColumns: NBA_COMPANION_PLAYTYPE_DEFAULT_COLUMNS,
    unitModeKind: "playtype",
  },
];

const NBA_COMPANION_LABELS = {
  ncaa_gp: "NCAA GP",
  ncaa_min: "NCAA Min",
  ncaa_mpg: "NCAA MPG",
  ncaa_height_in: "NCAA HT",
  nba_height_in: "NBA HT",
  ncaa_weight_lb: "NCAA WT",
  nba_weight_lb: "NBA WT",
  ncaa_bmi: "NCAA BMI",
  nba_bmi: "NBA BMI",
  ncaa_porpag: "NCAA PRPG",
  ncaa_dporpag: "NCAA dPRPG",
  ncaa_bpm: "NCAA BPM",
  nba_gp: "NBA GP",
  nba_mp: "NBA MP",
  nba_mpg: "NBA MPG",
  nba_epm: "NBA EPM",
  nba_oepm: "NBA oEPM",
  nba_depm: "NBA dEPM",
  nba_ewins: "NBA EW",
  ncaa_orb_pct: "NCAA ORB%",
  nba_orb_pct: "NBA ORB%",
  ncaa_drb_pct: "NCAA DRB%",
  nba_drb_pct: "NBA DRB%",
  ncaa_usg_pct: "NCAA USG%",
  nba_usg_pct: "NBA USG%",
  ncaa_ast_pct: "NCAA AST%",
  nba_ast_pct: "NBA AST%",
  ncaa_ast_to: "NCAA AST/TO",
  nba_ast_to: "NBA AST/TO",
  ncaa_tov_pct: "NCAA TOV%",
  nba_tov_pct: "NBA TOV%",
  ncaa_stl_pct: "NCAA STL%",
  nba_stl_pct: "NBA STL%",
  ncaa_blk_pct: "NCAA BLK%",
  nba_blk_pct: "NBA BLK%",
  ncaa_stl_pct_percentile: "NCAA STL Pctl",
  nba_stl_pct_percentile: "NBA STL Pctl",
  ncaa_blk_pct_percentile: "NCAA BLK Pctl",
  nba_blk_pct_percentile: "NBA BLK Pctl",
  ncaa_ts_pct: "NCAA TS%",
  nba_ts_pct: "NBA TS%",
  ncaa_efg_pct: "NCAA eFG%",
  nba_efg_pct: "NBA eFG%",
  ncaa_rim_pct: "NCAA Rim%",
  nba_rim_pct: "NBA Rim%",
  ncaa_rim_ast_pct: "NCAA Rim Ast%",
  nba_rim_ast_pct: "NBA Rim Ast%",
  ncaa_mid_pct: "NCAA Mid%",
  nba_mid_pct: "NBA Mid%",
  ncaa_mid_ast_pct: "NCAA Mid Ast%",
  nba_mid_ast_pct: "NBA Mid Ast%",
  ncaa_two_p_pct: "NCAA 2P%",
  nba_two_p_pct: "NBA 2P%",
  ncaa_two_p_ast_pct: "NCAA 2P Ast%",
  nba_two_p_ast_pct: "NBA 2P Ast%",
  ncaa_three_p_pct: "NCAA 3P%",
  nba_three_p_pct: "NBA 3P%",
  ncaa_three_p_ast_pct: "NCAA 3P Ast%",
  nba_three_p_ast_pct: "NBA 3P Ast%",
  ncaa_ft_pct: "NCAA FT%",
  nba_ft_pct: "NBA FT%",
  ncaa_ftr: "NCAA FTr",
  nba_ftr: "NBA FTr",
  ncaa_three_pr: "NCAA 3Pr",
  nba_three_pr: "NBA 3Pr",
  ...NBA_COMPANION_PLAYTYPE_LABELS,
};

const NBA_COMPANION_COPY_MAP = [
  ["ncaa_gp", "gp"],
  ["ncaa_min", "min"],
  ["ncaa_mpg", "mpg"],
  ["ncaa_height_in", "height_in"],
  ["ncaa_weight_lb", "weight_lb"],
  ["ncaa_bmi", "bmi"],
  ["ncaa_porpag", "porpag"],
  ["ncaa_dporpag", "dporpag"],
  ["ncaa_bpm", "bpm"],
  ["ncaa_orb_pct", "orb_pct"],
  ["ncaa_drb_pct", "drb_pct"],
  ["ncaa_usg_pct", "usg_pct"],
  ["ncaa_ast_pct", "ast_pct"],
  ["ncaa_ast_to", "ast_to"],
  ["ncaa_tov_pct", "tov_pct_adv"],
  ["ncaa_stl_pct", "stl_pct"],
  ["ncaa_blk_pct", "blk_pct"],
  ["ncaa_stl_pct_percentile", "stl_pct_percentile"],
  ["ncaa_blk_pct_percentile", "blk_pct_percentile"],
  ["ncaa_ts_pct", "ts_pct"],
  ["ncaa_efg_pct", "efg_pct"],
  ["ncaa_rim_pct", "rim_pct"],
  ["ncaa_rim_ast_pct", "rim_ast_pct"],
  ["ncaa_mid_pct", "mid_pct"],
  ["ncaa_mid_ast_pct", "mid_ast_pct"],
  ["ncaa_two_p_pct", "two_p_pct"],
  ["ncaa_two_p_ast_pct", "two_p_ast_pct"],
  ["ncaa_three_p_pct", "three_p_pct"],
  ["ncaa_three_p_ast_pct", "three_p_ast_pct"],
  ["ncaa_ft_pct", "ft_pct"],
  ["ncaa_ftr", "ftr"],
  ["ncaa_three_pr", "three_pr"],
  ...NBA_COMPANION_PLAYTYPE_DEFS.flatMap((playtype) => (
    NBA_COMPANION_PLAYTYPE_METRICS.map((metric) => [`ncaa_${playtype.id}_${metric.suffix}`, `${playtype.id}_${metric.suffix}`])
  )),
];

const NBA_COMPANION_NBA_COPY_MAP = [
  ["nba_gp", "gp"],
  ["nba_mp", "mp"],
  ["nba_mpg", "mpg"],
  ["nba_height_in", "inches"],
  ["nba_weight_lb", "weight"],
  ["nba_bmi", "bmi"],
  ["nba_epm", "tot"],
  ["nba_oepm", "off"],
  ["nba_depm", "def"],
  ["nba_ewins", "ewins"],
  ["nba_orb_pct", "orbpct"],
  ["nba_drb_pct", "drbpct"],
  ["nba_usg_pct", "usg"],
  ["nba_ast_pct", "astpct"],
  ["nba_ast_to", "ast_to"],
  ["nba_tov_pct", "topct"],
  ["nba_stl_pct", "stlpct"],
  ["nba_blk_pct", "blkpct"],
  ["nba_stl_pct_percentile", "stlpct_percentile"],
  ["nba_blk_pct_percentile", "blkpct_percentile"],
  ["nba_ts_pct", "tspct"],
  ["nba_efg_pct", "efg"],
  ["nba_rim_pct", "fgpct_rim"],
  ["nba_rim_ast_pct", "rim_ast_pct"],
  ["nba_mid_pct", "fgpct_mid"],
  ["nba_mid_ast_pct", "mid_ast_pct"],
  ["nba_two_p_pct", "fg2pct"],
  ["nba_two_p_ast_pct", "two_ast_pct"],
  ["nba_three_p_pct", "fg3pct"],
  ["nba_three_p_ast_pct", "three_ast_pct"],
  ["nba_ft_pct", "ftpct"],
  ["nba_ftr", "ftr"],
  ["nba_three_pr", "three_pr"],
  ...NBA_COMPANION_PLAYTYPE_DEFS.flatMap((playtype) => (
    NBA_COMPANION_PLAYTYPE_METRICS.map((metric) => [`nba_${playtype.id}_${metric.suffix}`, `${playtype.id}_${metric.suffix}`])
  )),
];

const NBA_COMPANION_BASE_COLUMNS = [
  "rank",
  "season",
  "player_name",
  "player",
  "player_search_text",
  "player_aliases",
  "team_name",
  "team_full",
  "team_search_text",
  "coach",
  "coach_search_text",
  "conference",
  "conference_bucket",
  "pos",
  "class_year",
  "height_in",
  "weight_lb",
  "wingspan",
  "bmi",
  "age",
  "dob",
  "birthday",
  "draft_year",
  "draft_pick",
  "gp",
  "min",
  "mpg",
  "realgm_player_id",
  "canonical_player_id",
  "source_player_id",
  "player_id",
  "pid",
  "id",
  "player_profile_key",
  "profile_levels",
  "career_path",
  "current_nba_status",
];

const DEFENSE_RATE_PERCENTILE_COLUMNS = {
  nba_companion: [
    { source: "ncaa_stl_pct", percentile: "ncaa_stl_pct_percentile" },
    { source: "ncaa_blk_pct", percentile: "ncaa_blk_pct_percentile" },
    { source: "nba_stl_pct", percentile: "nba_stl_pct_percentile" },
    { source: "nba_blk_pct", percentile: "nba_blk_pct_percentile" },
  ],
};

function buildNbaCompanionConfig() {
  const demoColumns = ["conference", "pos", "class_year", "height_in", "weight_lb", "bmi", "age", "dob", "gp", "min", "mpg", "draft_pick"];
  return {
    id: "nba_companion",
    navLabel: "NBA Companion",
    title: "NBA Companion",
    subtitle: "",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "player_name"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "conference", "coach", "team_search_text", "coach_search_text"]),
    sortBy: "nba_epm",
    sortDir: "desc",
    demoColumns,
    demoFilterColumns: ["age", "height_in", "weight_lb", "bmi", "dob", "gp", "min", "mpg", "draft_pick"],
    groups: NBA_COMPANION_GROUPS,
    singleFilters: withSharedSingleFilters([{ id: "conference_bucket", label: "Conference" }]),
    multiFilters: [
      { id: "pos", label: "Pos", column: "pos", sort: ["PG", "SG", "SF", "PF", "C"] },
      { id: "class_year", label: "Class", column: "class_year", sort: ["Fr", "So", "Jr", "Sr", "Gr"] },
    ],
    defaultVisible: [...new Set([...demoColumns.filter((column) => !["conference", "bmi", "draft_pick", "weight_lb", "mpg", "dob"].includes(column)), ...NBA_COMPANION_GROUPS.flatMap((group) => group.defaultColumns)])],
    labels: {
      rank: "",
      season: "Year",
      player_name: "Player",
      team_name: "Team",
      conference: "Conf",
      coach: "Coach",
      pos: "Pos",
      class_year: "Class",
      height_in: "HT",
      weight_lb: "WT",
      bmi: "BMI",
      age: "Age",
      dob: "DOB",
      gp: "GP",
      min: "Min",
      mpg: "MPG",
      draft_pick: "Pick",
      ...NBA_COMPANION_LABELS,
    },
  };
}

const PLAYER_CAREER_PROFESSIONAL_LEVELS = new Set(["International", "G League", "NBA", "Professional"]);

function buildPlayerCareerConfig() {
  const demoColumns = ["competition_level", "profile_levels", "pos", "class_year", "height_in", "weight_lb", "wingspan", "age", "dob", "draft_year", "draft_pick"];
  return {
    id: "player_career",
    navLabel: "Player/Career",
    title: "Player/Career",
    subtitle: "Unified player-season and career rows across site data and RealGM",
    precomputed: true,
    skipPostProcessing: true,
    dataScript: "",
    extraScripts: [
      PLAYER_BIO_LOOKUP_SCRIPT,
      INTERNATIONAL_PROFILE_BIO_LOOKUP_SCRIPT,
      WINGSPAN_LOOKUP_SCRIPT,
      {
        type: "multipart-script",
        manifestScript: "data/vendor/player_career_international_overlay_manifest.js",
        manifestGlobalName: "PLAYER_CAREER_INTERNATIONAL_OVERLAY_PARTS",
        partTemplate: "data/vendor/player_career_international_overlay_parts/{part}.js",
      },
    ],
    chunkManifestScript: `data/vendor/player_career_manifest.js?v=${SCRIPT_CACHE_BUST}`,
    chunkTemplate: `data/vendor/player_career_chunks/{chunk}.js?v=${SCRIPT_CACHE_BUST}`,
    chunkOrderGlobalName: "PLAYER_CAREER_CHUNK_ORDER",
    chunkStoreGlobalName: "PLAYER_CAREER_CSV_CHUNKS",
    chunkMultipartGlobalName: "PLAYER_CAREER_CHUNK_MULTIPART",
    chunkMultipartTemplate: `data/vendor/player_career_chunk_parts/{part}.js?v=${SCRIPT_CACHE_BUST}`,
    yearManifestScript: `data/vendor/player_career_year_manifest.js?v=${SCRIPT_CACHE_BUST}`,
    yearChunkTemplate: `data/vendor/player_career_year_chunks/{season}.js?v=${SCRIPT_CACHE_BUST}`,
    yearChunkMultipartTemplate: `data/vendor/player_career_year_chunk_parts/{part}.js?v=${SCRIPT_CACHE_BUST}`,
    deferredScriptTemplate: `data/vendor/player_career_year_supplement_chunks/{season}.js?v=${SCRIPT_CACHE_BUST}`,
    deferredMultipartTemplate: `data/vendor/player_career_year_supplement_chunk_parts/{part}.js?v=${SCRIPT_CACHE_BUST}`,
    deferredHydrationMode: "supplement",
    autoHydrateDeferred: false,
    globalName: "PLAYER_CAREER_ALL_CSV",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "player_name", "competition_level", "pos"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "team_full", "team_search_text"]),
    sortBy: "min",
    sortDir: "desc",
    defaultAllYears: false,
    minYear: 1998,
    minuteFilterDefault: 200,
    demoColumns,
    demoFilterColumns: ["height_in", "weight_lb", "wingspan", "age", "gp", "min", "mpg", "draft_year", "draft_pick"],
    groups: [
      {
        id: "identity",
        label: "Identity",
        columns: ["competition_level", "profile_levels", "career_path", "league", "team_name", "team_full", "nationality", "hometown", "high_school", "pre_draft_team", "current_team", "current_nba_status", "pos", "class_year", "height_in", "weight_lb", "wingspan", "age", "dob", "draft_year", "draft_pick", "rookie_year", "source_player_id", "player_profile_key", "realgm_player_id", "canonical_player_id"],
        defaultColumns: ["competition_level", "profile_levels", "team_name", "pos", "class_year", "height_in", "draft_pick"],
      },
      {
        id: "summary",
        label: "Summary",
        columns: ["gp", "min", "mpg", "pts", "trb", "ast", "tov", "stl", "blk", "pf", "stocks", "orb", "drb"],
        defaultColumns: ["gp", "min", "mpg"],
      },
      buildGeneralStatGroup(),
      {
        id: "shooting",
        label: "Shooting",
        columns: ["fgm", "fga", "fg_pct", "two_pm", "two_pa", "two_p_pct", "three_pm", "three_pa", "three_p_pct", "ftm", "fta", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr", "three_pa_per100"],
        defaultColumns: ["fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr"],
      },
      buildLowerTierShotProfileGroup(),
      {
        id: "advanced",
        label: "Advanced",
        columns: ["min_per", "orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "ast_to", "tov_pct", "tov_pct_adv", "stl_pct", "blk_pct", "ortg", "drtg"],
        defaultColumns: ["orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "ast_to", "tov_pct", "stl_pct", "blk_pct"],
      },
      {
        id: "impact",
        label: "Impact",
        columns: ["adjoe", "adrtg", "porpag", "dporpag", "bpm", "obpm", "dbpm", "fic", "ppr", "per", "rgm_per", "off", "def", "tot", "ewins", "plus_minus", "plus_minus_pg", "eff", "eff_pg"],
        defaultColumns: ["adjoe", "adrtg", "porpag", "dporpag", "bpm", "off", "def", "tot", "ewins"],
      },
      {
        id: "per40",
        label: "Per 40",
        columns: ["pts_per40", "trb_per40", "ast_per40", "tov_per40", "stl_per40", "blk_per40", "pf_per40", "stocks_per40", "two_pa_per40", "three_pa_per40", "ast_stl_per40"],
        defaultColumns: ["pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40"],
      },
      {
        id: "per_game",
        label: "Per Game",
        columns: ["pts_pg", "trb_pg", "ast_pg", "tov_pg", "stl_pg", "blk_pg", "pf_pg", "stocks_pg", "two_pa_pg", "three_pa_pg", "ftm_pg", "fta_pg", "ast_stl_pg"],
        defaultColumns: ["pts_pg", "trb_pg", "ast_pg", "stl_pg", "blk_pg"],
      },
    ],
    singleFilters: withSharedSingleFilters([{ id: "status_path", label: "Status", options: STATUS_EVER_FILTER_OPTIONS }]),
    multiFilters: [
      { id: "competition_level", label: "Level", column: "competition_level", sort: PLAYER_CAREER_LEVEL_FILTER_ORDER },
      { id: "pos", label: "Pos", column: "pos", sort: STANDARD_POSITION_SORT },
      { id: "path_levels", label: "Path", column: "profile_levels", sort: PLAYER_CAREER_LEVEL_FILTER_ORDER },
    ],
    defaultVisible: ["rank", "season", "player_name", "competition_level", "profile_levels", "team_name", "pos", "class_year", "gp", "min", "mpg", ...GENERAL_DEFAULT_PER_GAME_COLUMNS, "stocks_pg", "fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr", "rim_pct", "mid_pct", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "ast_to", "tov_pct", "stl_pct", "blk_pct", "adjoe", "adrtg", "porpag", "dporpag", "bpm"],
    labels: {
      rank: "",
      season: "Year",
      player_name: "Player",
      team_name: "Team",
      team_full: "Team Raw",
      source_dataset: "Source",
      competition_level: "Level",
      profile_levels: "Path",
      career_path: "Career",
      league: "League",
      nationality: "Nation",
      hometown: "Hometown",
      high_school: "HS",
      pre_draft_team: "Pre-Draft",
      current_team: "Current Team",
      current_nba_status: "NBA Status",
      pos: "Pos",
      class_year: "Class",
      height_in: "HT",
      weight_lb: "WT",
      wingspan: "WS",
      age: "Age",
      dob: "DOB",
      draft_year: "Draft",
      draft_pick: "Pick",
      rookie_year: "Rookie",
      source_player_id: "Source ID",
      player_profile_key: "Profile Key",
      realgm_player_id: "RealGM ID",
      canonical_player_id: "Player ID",
      gp: "GP",
      min: "MIN",
      mpg: "MPG",
      pts: "PTS",
      pts_pg: "PTS/G",
      trb: "TRB",
      trb_pg: "TRB/G",
      orb: "ORB",
      drb: "DRB",
      orb_pg: "ORB/G",
      drb_pg: "DRB/G",
      ast: "AST",
      ast_pg: "AST/G",
      stl: "STL",
      stl_pg: "STL/G",
      blk: "BLK",
      blk_pg: "BLK/G",
      tov: "TOV",
      tov_pg: "TOV/G",
      pf: "PF",
      pf_pg: "PF/G",
      stocks: "Stocks",
      stocks_pg: "Stocks/G",
      ast_stl_pg: "AST+STL/G",
      fgm: "FGM",
      fgm_pg: "FGM/G",
      fga: "FGA",
      fga_pg: "FGA/G",
      two_pm: "2PM",
      two_pm_pg: "2PM/G",
      two_pa: "2PA",
      two_pa_pg: "2PA/G",
      three_pm: "3PM",
      three_pm_pg: "3PM/G",
      three_pa: "3PA",
      three_pa_pg: "3PA/G",
      ftm: "FTM",
      ftm_pg: "FTM/G",
      fta: "FTA",
      fta_pg: "FTA/G",
      fg_pct: "FG%",
      two_p_pct: "2P%",
      three_p_pct: "3P%",
      ft_pct: "FT%",
      efg_pct: "eFG%",
      ts_pct: "TS%",
      ftr: "FTr",
      three_pr: "3Pr",
      three_pa_per100: "3PA/100",
      adjoe: "AdjO",
      adrtg: "AdjD",
      porpag: "PRPG",
      dporpag: "dPRPG",
      bpm: "BPM",
      obpm: "OBPM",
      dbpm: "DBPM",
      fic: "FIC",
      ppr: "PPR",
      per: "PER",
      rgm_per: "RGM PER",
      off: "oEPM",
      def: "dEPM",
      tot: "EPM",
      ewins: "eWins",
      plus_minus: "+/-",
      plus_minus_pg: "+/-/G",
      eff: "EFF",
      eff_pg: "EFF/G",
      min_per: "Min%",
      ortg: "ORtg",
      drtg: "DRtg",
      orb_pct: "ORB%",
      drb_pct: "DRB%",
      trb_pct: "TRB%",
      ast_pct: "AST%",
      tov_pct: "TOV%",
      tov_pct_adv: "TOV%",
      stl_pct: "STL%",
      blk_pct: "BLK%",
      usg_pct: "USG%",
      ast_to: "AST/TO",
      pts_per40: "PTS/40",
      trb_per40: "TRB/40",
      ast_per40: "AST/40",
      tov_per40: "TOV/40",
      stl_per40: "STL/40",
      blk_per40: "BLK/40",
      pf_per40: "PF/40",
      stocks_per40: "Stocks/40",
      two_pa_per40: "2PA/40",
      three_pa_per40: "3PA/40",
      ast_stl_per40: "AST+STL/40",
      ram: "RAM",
      c_ram: "C-RAM",
      psp: "PSP",
      dsi: "DSI",
      adj_bpm: "Adj BPM",
      three_pe: "3PE",
      ftm_fga: "FTMr",
      three_pr_plus_ftm_fga: "3Pr+FTMr",
      blk_pf: "BLK/PF",
      stl_pf: "STL/PF",
      stocks_pf: "Stocks/PF",
      ncaa_spi_peak: "NCAA SPI Peak",
      ncaa_spi_pct_peak: "NCAA SPI %",
      ncaa_off_impact_peak: "NCAA Off Peak",
      ncaa_off_impact_pct_peak: "NCAA Off %",
      ncaa_def_impact_peak: "NCAA Def Peak",
      ncaa_def_impact_pct_peak: "NCAA Def %",
      ncaa_wins_added_peak: "NCAA Wins Peak",
      ncaa_wins_added_pct_peak: "NCAA Wins %",
      d1_peak_prpg: "D1 Peak PRPG",
      d1_peak_dprpg: "D1 Peak dPRPG",
      d1_peak_bpm: "D1 Peak BPM",
      ...GENERAL_LABELS,
      ...D1_SUMMARY_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...D1_HALFCOURT_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...D1_SHOT_PROFILE_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...D1_ADVANCED_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...D1_DRIVE_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...D1_RUNNER_COLUMNS.reduce((labels, item) => ({ ...labels, [item.key]: item.label }), {}),
      ...getD1TransitionGroup().labels,
      ...D1_PLAYTYPE_DEFS.reduce((labels, playtype) => {
        getD1PlaytypeMetrics(playtype.id).forEach((metric) => {
          labels[`${playtype.id}_${metric.suffix}`] = `${playtype.short} ${metric.label}`;
        });
        return labels;
      }, {}),
      ...LOWER_TIER_SHOT_PROFILE_LABELS,
    },
  };
}

function isPlayerCareerPlaytypeExtraColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return D1_PLAYTYPE_FAMILY_PREFIXES.some((prefix) => baseColumn === prefix || baseColumn.startsWith(`${prefix}_`))
    || baseColumn === "transition"
    || /^transition_/.test(baseColumn)
    || /^runner_/.test(baseColumn)
    || /^drive_/.test(baseColumn);
}

function buildPlayerCareerExtraGroups(availableColumns, groupedColumns) {
  const available = new Set(availableColumns || []);
  const used = groupedColumns instanceof Set ? new Set(groupedColumns) : new Set(groupedColumns || []);
  const groups = [];
  const addGroup = (id, label, candidateColumns, defaultColumns = []) => {
    const columns = [...new Set(candidateColumns || [])].filter((column) => available.has(column) && !used.has(column));
    if (!columns.length) return;
    columns.forEach((column) => used.add(column));
    groups.push({
      id,
      label,
      columns,
      defaultColumns: (defaultColumns || []).filter((column) => columns.includes(column)),
    });
  };

  addGroup(
    "d1_peak",
    "D1 Peak",
    ["d1_peak_prpg", "d1_peak_dprpg", "d1_peak_bpm"],
  );
  addGroup(
    "ncaa_projection",
    "NCAA Projection",
    [
      "ncaa_spi_peak",
      "ncaa_spi_pct_peak",
      "ncaa_off_impact_peak",
      "ncaa_off_impact_pct_peak",
      "ncaa_def_impact_peak",
      "ncaa_def_impact_pct_peak",
      "ncaa_wins_added_peak",
      "ncaa_wins_added_pct_peak",
      ...Array.from({ length: 6 }, (_, index) => index + 1).flatMap((yearIndex) => [
        `ncaa_team_y${yearIndex}`,
        `ncaa_spi_y${yearIndex}`,
        `ncaa_spi_pct_y${yearIndex}`,
        `ncaa_off_impact_y${yearIndex}`,
        `ncaa_off_impact_pct_y${yearIndex}`,
        `ncaa_def_impact_y${yearIndex}`,
        `ncaa_def_impact_pct_y${yearIndex}`,
        `ncaa_wins_added_y${yearIndex}`,
        `ncaa_wins_added_pct_y${yearIndex}`,
      ]),
    ],
    ["ncaa_spi_peak"],
  );
  addGroup(
    "d1_context",
    "D1 Context",
    [
      ...D1_HALFCOURT_COLUMNS.map((item) => item.key),
      ...D1_ADVANCED_COLUMNS.map((item) => item.key),
      ...D1_SHOT_PROFILE_COLUMNS.map((item) => item.key),
    ],
    [...D1_HALFCOURT_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key), "bpm"],
  );
  D1_PLAYTYPE_DEFS.forEach((playtype) => {
    const metrics = getD1PlaytypeMetrics(playtype.id);
    addGroup(
      `d1_${playtype.id}`,
      playtype.label,
      metrics.map((metric) => `${playtype.id}_${metric.suffix}`),
      metrics.filter((metric) => metric.defaultVisible).map((metric) => `${playtype.id}_${metric.suffix}`),
    );
  });
  const transitionGroup = getD1TransitionGroup().group;
  addGroup("d1_halfcourt", "HC Stats", D1_HALFCOURT_COLUMNS.map((item) => item.key), D1_HALFCOURT_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key));
  addGroup("d1_transition", "Transition", transitionGroup.columns, transitionGroup.defaultColumns);
  addGroup("d1_drive", "Drive", D1_DRIVE_COLUMNS.map((item) => item.key), D1_DRIVE_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key));
  addGroup("d1_runner", "Runners", D1_RUNNER_COLUMNS.map((item) => item.key), D1_RUNNER_COLUMNS.filter((item) => item.defaultVisible).map((item) => item.key));
  addGroup(
    "nba_context",
    "NBA Context",
    [
      "fga_75",
      "fta_75",
      "fg3a_75",
      "fga_rim_75",
      "fga_mid_75",
      "fgm_rim_pg",
      "fga_rim_pg",
      "fgm_mid_pg",
      "fga_mid_pg",
      "fg2m_pg",
      "fg2a_pg",
      "fg3m_pg",
      "fg3a_pg",
      "fgm_rim",
      "fga_rim",
      "fgm_mid",
      "fga_mid",
      "rim_ast_pct",
      "mid_ast_pct",
      "two_ast_pct",
      "three_ast_pct",
      "c3_ast_pct",
      "ab3_ast_pct",
      "smr_ast_pct",
      "lmr_ast_pct",
      "rim_mid_ratio",
    ],
  );
  addGroup(
    "grassroots_metrics",
    "Grassroots",
    [
      "ram",
      "c_ram",
      "psp",
      "dsi",
      "three_pe",
      "ftm_fga",
      "three_pr_plus_ftm_fga",
      "blk_pf",
      "stl_pf",
      "stocks_pf",
      "tpm_pg",
      "tpa_pg",
      "fgs",
      "percentile_weight",
      "atr",
    ],
    ["ram", "c_ram", "psp", "dsi"],
  );

  const excludedExtras = new Set([
    "player_id",
    "canonical_player_id",
    "realgm_player_id",
    "source_player_id",
    "player_profile_key",
    "player_name",
    "player_search_text",
    "player_aliases",
    "season",
    "source_dataset",
    "competition_level",
    "profile_levels",
    "profile_match_source",
    "realgm_summary_url",
    "team_name",
    "team_full",
    "team_search_text",
    "team_aliases",
    "coach_search_text",
    "career_path",
    "league",
    "nationality",
    "hometown",
    "high_school",
    "pre_draft_team",
    "current_team",
    "current_nba_status",
    "event_aliases",
    "event_url",
    "event_name",
    "event_group",
    "event_raw_name",
    "adj_bpm",
  ]);
  const sourceExtras = Array.from(available).filter((column) => {
    if (used.has(column) || excludedExtras.has(column) || /^_/.test(column)) return false;
    return /(_pg$|_per_g$|_per40$|_per100$|_75$|_pct$|_rate$|_share$|_poss$|_freq$|_ppp$|_att$|_made$|_miss$|^fg|^orb|^drb|^trb|^ast|^stl|^blk|^tov|^pf|^pts|^eff|^plus_minus|^bpm|^per$|^ppr$|^fic$|^ram$|^psp$|^dsi$)/i.test(column);
  });
  addGroup("source_extras", "Source Extras", sourceExtras);
  return groups;
}

function buildInternationalConfig() {
  const demoColumns = ["league_name", "team_abbrev", "pos", "height_in", "weight_lb", "wingspan", "nationality", "age", "dob", "draft_year", "draft_pick", "gp", "min", "mpg"];
  return {
    id: "international",
    navLabel: "International",
    title: "International",
    subtitle: "RealGM notable international league seasons",
    dataScript: "data/vendor/international_all_seasons.js",
    multipartDataScript: {
      type: "multipart-script",
      manifestScript: "data/vendor/international_all_seasons_manifest.js",
      manifestGlobalName: "INTERNATIONAL_ALL_SEASONS_PARTS",
      partTemplate: "data/vendor/international_all_seasons_parts/{part}.js",
    },
    extraScripts: [PLAYER_BIO_LOOKUP_SCRIPT, INTERNATIONAL_PROFILE_BIO_LOOKUP_SCRIPT, WINGSPAN_LOOKUP_SCRIPT],
    globalName: "INTERNATIONAL_ALL_CSV",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "player_name", "league_name", "team_abbrev", "pos"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "team_abbrev", "league_name", "competition_label", "nationality", "nationality_list", "nationality_regions"]),
    sortBy: "min",
    sortDir: "desc",
    defaultAllYears: false,
    minYear: 2001,
    minuteDefault: 200,
    minuteFilterDefault: 200,
    demoColumns,
    demoFilterColumns: ["height_in", "weight_lb", "wingspan", "age", "dob", "draft_year", "draft_pick", "gp", "min", "mpg"],
    groups: [
      {
        id: "identity",
        label: "Identity",
        columns: ["league_name", "competition_label", "team_name", "team_abbrev", "pos", "height_in", "weight_lb", "wingspan", "age", "dob", "birthday", "birth_city", "draft_year", "draft_pick", "draft_status", "nationality", "nationality_list", "nationality_regions", "realgm_player_id", "realgm_summary_url"],
        defaultColumns: ["league_name", "team_abbrev", "pos", "age", "nationality", "draft_year", "draft_pick"],
      },
      {
        id: "summary",
        label: "Summary",
        columns: ["gp", "min", "mpg", "pts", "trb", "ast", "tov", "stl", "blk", "pf", "stocks", "orb", "drb"],
        defaultColumns: ["gp", "min", "mpg"],
      },
      buildGeneralStatGroup(),
      {
        id: "advanced",
        label: "Advanced",
        columns: ["per", "orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "tov_pct", "ast_to", "stl_pct", "blk_pct", "ppr", "pps", "ortg", "drtg", "ediff", "fic", "stl_to", "ftm_fga"],
        defaultColumns: ["per", "orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "tov_pct", "ast_to", "stl_pct", "blk_pct"],
      },
      {
        id: "shooting",
        label: "Shooting",
        columns: ["fgm", "fga", "fg_pct", "two_pm", "two_pa", "two_p_pct", "three_pm", "three_pa", "three_p_pct", "ftm", "fta", "ft_pct", "efg_pct", "ts_pct", "total_s_pct", "ftr", "three_pr"],
        defaultColumns: ["fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr"],
      },
      {
        id: "per_game",
        label: "Per Game",
        columns: ["pts_pg", "trb_pg", "ast_pg", "ast_stl_pg", "tov_pg", "stl_pg", "blk_pg", "pf_pg", "stocks_pg", "fgm_pg", "fga_pg", "two_pa_pg", "three_pa_pg", "ftm_pg", "fta_pg"],
        defaultColumns: ["pts_pg", "trb_pg", "ast_pg", "stl_pg", "blk_pg", "stocks_pg"],
      },
      {
        id: "per40",
        label: "Per 40",
        columns: ["pts_per40", "trb_per40", "orb_per40", "drb_per40", "ast_per40", "ast_stl_per40", "tov_per40", "stl_per40", "blk_per40", "pf_per40", "stocks_per40", "fgm_per40", "fga_per40", "two_pa_per40", "three_pa_per40", "ftm_per40", "fta_per40"],
        defaultColumns: ["pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40", "stocks_per40"],
      },
      {
        id: "misc",
        label: "Misc",
        columns: ["double_doubles", "triple_doubles", "forty_pts_games", "twenty_reb_games", "twenty_ast_games", "five_stl_games", "five_blk_games", "high_game", "techs", "hob", "wins", "losses", "win_pct", "ows", "dws", "ws"],
        defaultColumns: [],
      },
    ],
    singleFilters: withSingleFilterDefault(withSingleFilterDefault(withSharedSingleFilters([
      { id: "season_scope", label: "Season", options: INTERNATIONAL_SEASON_SCOPE_OPTIONS },
      { id: "league_name", label: "League", column: "league_name" },
    ]), "color_mode", "competition_position"), "season_scope", "all"),
    multiFilters: [
      { id: "pos", label: "Pos", column: "pos", sort: STANDARD_POSITION_SORT },
      { id: "competition_label", label: "Event", column: "competition_label", renderAsSelect: true },
      { id: "nationality_regions", label: "Region", column: "nationality_regions", renderAsSelect: true, sort: INTERNATIONAL_REGION_ORDER, options: INTERNATIONAL_REGION_ORDER },
      { id: "nationality", label: "Country", column: "nationality_list", renderAsSelect: true },
    ],
    defaultVisible: ["rank", "season", "player_name", "league_name", "team_abbrev", "pos", "age", "dob", "nationality", "draft_year", "draft_pick", "gp", "min", "mpg", ...GENERAL_DEFAULT_PER_GAME_COLUMNS, "per", "orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "tov_pct", "ast_to", "stl_pct", "blk_pct", "fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr"],
    labels: {
      rank: "",
      season: "Year",
      player_name: "Player",
      league_name: "League",
      competition_label: "Event",
      team_name: "Team",
      team_abbrev: "Team",
      realgm_player_id: "RealGM ID",
      realgm_summary_url: "RealGM",
      pos: "Pos",
      height: "HT",
      height_in: "HT",
      weight_lb: "WT",
      wingspan: "WS",
      age: "Age",
      dob: "DOB",
      birthday: "Birthday",
      birth_city: "Birth City",
      draft_year: "Draft",
      draft_pick: "Pick",
      draft_status: "Draft Text",
      nationality: "Nation",
      nationality_list: "Countries",
      nationality_regions: "Regions",
      gp: "GP",
      min: "MIN",
      mpg: "MPG",
      pts: "PTS",
      pts_pg: "PTS/G",
      trb: "TRB",
      trb_pg: "TRB/G",
      ast: "AST",
      ast_pg: "AST/G",
      ast_stl_pg: "AST+STL/G",
      stl: "STL",
      stl_pg: "STL/G",
      blk: "BLK",
      blk_pg: "BLK/G",
      stocks: "Stocks",
      stocks_pg: "Stocks/G",
      tov: "TOV",
      tov_pg: "TOV/G",
      pf: "PF",
      pf_pg: "PF/G",
      fgm: "FGM",
      fgm_pg: "FGM/G",
      fga: "FGA",
      fga_pg: "FGA/G",
      fg_pct: "FG%",
      two_pm: "2PM",
      two_pa: "2PA",
      two_pa_pg: "2PA/G",
      two_p_pct: "2P%",
      three_pm: "3PM",
      three_pa: "3PA",
      three_pa_pg: "3PA/G",
      three_p_pct: "3P%",
      ftm: "FTM",
      ftm_pg: "FTM/G",
      fta: "FTA",
      fta_pg: "FTA/G",
      ft_pct: "FT%",
      efg_pct: "eFG%",
      ts_pct: "TS%",
      total_s_pct: "Total S%",
      ftr: "FTr",
      three_pr: "3Pr",
      pts_per40: "PTS/40",
      trb_per40: "TRB/40",
      ast_per40: "AST/40",
      ast_stl_per40: "AST+STL/40",
      stl_per40: "STL/40",
      blk_per40: "BLK/40",
      stocks_per40: "Stocks/40",
      tov_per40: "TOV/40",
      pf_per40: "PF/40",
      orb_pct: "ORB%",
      drb_pct: "DRB%",
      trb_pct: "TRB%",
      ast_pct: "AST%",
      tov_pct: "TOV%",
      stl_pct: "STL%",
      blk_pct: "BLK%",
      usg_pct: "USG%",
      ppr: "PPR",
      pps: "PPS",
      ortg: "ORtg",
      drtg: "DRtg",
      ediff: "eDiff",
      fic: "FIC",
      per: "PER",
      ast_to: "AST/TO",
      stl_to: "STL/TO",
      ftm_fga: "FT/FGA",
      double_doubles: "Dbl Dbl",
      triple_doubles: "Tpl Dbl",
      forty_pts_games: "40 Pts",
      twenty_reb_games: "20 Reb",
      twenty_ast_games: "20 Ast",
      five_stl_games: "5 Stl",
      five_blk_games: "5 Blk",
      high_game: "High",
      techs: "Techs",
      hob: "HOB",
      wins: "W",
      losses: "L",
      win_pct: "Win%",
      ows: "OWS",
      dws: "DWS",
      ws: "WS",
      ...GENERAL_LABELS,
    },
  };
}

function buildCapitanesReferenceConfig() {
  const demoColumns = ["league_name", "team_name", "nationality", "height_in", "weight_lb", "age", "gp", "mpg"];
  const advancedColumns = [
    "win_pct",
    "orb_pct",
    "drb_pct",
    "trb_pct",
    "ast_pct",
    "tov_pct",
    "a_to",
    "ppr",
    "stl_pct",
    "blk_pct",
    "usg_pct",
    "hob",
    "pf_per40",
    "per",
    "porpag",
    "ows_per40",
    "dws_per40",
    "ws_per40",
    "ediff",
    "ortg",
    "drtg",
    "fic",
    "pps",
    "wins",
    "losses",
  ];
  const advancedDefaultColumns = [
    "win_pct",
    "orb_pct",
    "drb_pct",
    "trb_pct",
    "ast_pct",
    "tov_pct",
    "a_to",
    "ppr",
    "stl_pct",
    "blk_pct",
    "usg_pct",
    "pf_per40",
    "per",
    "porpag",
    "ows_per40",
    "dws_per40",
    "ws_per40",
    "ediff",
  ];
  const shootingColumns = ["fg_pct", "fga", "fgm", "two_p_pct", "two_pa", "two_pm", "three_p_pct", "three_pa", "three_pm", "ft_pct", "fta", "ftm", "efg_pct", "ts_pct", "total_s_pct", "ftr", "three_pr"];
  const defaultVisible = [
    "rank",
    "player_name",
    "league_name",
    "team_name",
    "nationality",
    "height_in",
    "weight_lb",
    "age",
    "gp",
    "mpg",
    ...advancedDefaultColumns,
    "two_p_pct",
    "three_p_pct",
    "ft_pct",
    "efg_pct",
    "ts_pct",
    "ftr",
    "three_pr",
    "pts_per40",
  ];
  return {
    id: "capitanesreference",
    navLabel: "Capitanes",
    title: "Capitanes Reference",
    subtitle: "RealGM 2025-26 international reference table",
    dataScript: "data/vendor/capitanesreference_2026.js",
    globalName: "CAPITANESREFERENCE_2026_CSV",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "player_name"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "team_abbrev", "team_search_text", "league_name", "league_list", "nationality", "nationality_list", "nationality_regions", "potential_latino_name"]),
    sortBy: "min",
    sortDir: "desc",
    defaultAllYears: false,
    minYear: 2026,
    minuteDefault: 0,
    minuteFilterDefault: 0,
    demoColumns,
    demoFilterColumns: ["height_in", "weight_lb", "age", "gp", "mpg"],
    demoFilterDefaults: {
      age: { min: 22.5 },
    },
    groups: [
      {
        id: "advanced",
        label: "Advanced",
        columns: advancedColumns,
        defaultColumns: advancedDefaultColumns,
      },
      {
        id: "shooting",
        label: "Shooting",
        columns: shootingColumns,
        defaultColumns: ["two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr"],
      },
      {
        id: "creation",
        label: "Creation",
        columns: ["stl_to", "ftm_fga", "pts_per40", "trb_per40", "orb_per40", "drb_per40", "ast_per40", "stl_per40", "blk_per40", "stocks_per40", "tov_per40"],
        defaultColumns: ["pts_per40"],
      },
      {
        id: "summary",
        label: "Averages",
        columns: ["pts_pg", "trb_pg", "orb_pg", "drb_pg", "ast_pg", "stl_pg", "blk_pg", "stocks_pg", "tov_pg", "pf_pg", "fgm_pg", "fga_pg", "two_pm_pg", "two_pa_pg", "three_pm_pg", "three_pa_pg", "ftm_pg", "fta_pg"],
        defaultColumns: [],
      },
      {
        id: "totals",
        label: "Totals",
        columns: ["pts", "trb", "orb", "drb", "ast", "stl", "blk", "stocks", "tov", "pf", "fgm", "fga", "two_pm", "three_pm", "ftm"],
        defaultColumns: [],
      },
      {
        id: "misc",
        label: "Misc",
        columns: ["double_doubles", "triple_doubles", "forty_pts_games", "twenty_reb_games", "twenty_ast_games", "five_stl_games", "five_blk_games", "high_game", "techs"],
        defaultColumns: [],
      },
    ],
    singleFilters: [
      {
        id: "view_mode",
        label: "View",
        defaultValue: "player",
        options: [
          { value: "player", label: "Player" },
        ],
      },
      {
        id: "color_mode",
        label: "Color mode",
        defaultValue: "overall",
        options: [
          { value: "none", label: "None" },
          { value: "year", label: "PCT by year" },
          { value: "competition", label: "PCT by comp" },
          { value: "overall", label: "PCT overall" },
        ],
      },
      {
        id: "percentile_mode",
        label: "Switch",
        defaultValue: "off",
        options: [
          { value: "off", label: "Off" },
          { value: "year_pctile", label: "Year Pctl" },
          { value: "all_time_pctile", label: "All-time Pctl" },
          { value: "year_rank", label: "Year Rank" },
          { value: "all_time_rank", label: "All-time Rank" },
        ],
      },
      { id: "status_path", label: "Status", options: STATUS_EVER_FILTER_OPTIONS },
      {
        id: "latino_pool",
        label: "Latino",
        defaultValue: "all",
        options: [
          { value: "all", label: "All" },
          { value: "latino", label: "Verified Latino" },
          { value: "latino_potential", label: "+ Potential" },
        ],
      },
      {
        id: "exclude_major_europe",
        label: "Top Euro",
        defaultValue: "all",
        hidden: true,
        options: [
          { value: "all", label: "Off" },
          { value: "yes", label: "Exclude" },
        ],
      },
      {
        id: "exclude_major_asia",
        label: "Top Asia",
        defaultValue: "all",
        hidden: true,
        options: [
          { value: "all", label: "Off" },
          { value: "yes", label: "Exclude" },
        ],
      },
    ],
    multiFilters: [
      { id: "league_name", label: "League", column: "league_name", renderAsSelect: true },
      { id: "nationality_regions", label: "Region", column: "nationality_regions", renderAsSelect: true, sort: INTERNATIONAL_REGION_ORDER, options: INTERNATIONAL_REGION_ORDER },
      { id: "nationality", label: "Country", column: "nationality_list", renderAsSelect: true },
    ],
    defaultVisible,
    labels: {
      rank: "",
      season: "Year",
      player_name: "Player",
      league_name: "League",
      league_list: "Leagues",
      team_name: "Team",
      team_abbrev: "Team",
      nationality: "Nation",
      nationality_list: "Countries",
      nationality_regions: "Regions",
      height_in: "HT",
      weight_lb: "WT",
      dob: "DOB",
      age: "Age",
      gp: "GP",
      min: "MIN",
      mpg: "MPG",
      pts_pg: "PTS/G",
      trb_pg: "TRB/G",
      orb_pg: "ORB/G",
      drb_pg: "DRB/G",
      ast_pg: "AST/G",
      stl_pg: "STL/G",
      blk_pg: "BLK/G",
      stocks_pg: "Stocks/G",
      tov_pg: "TOV/G",
      pf_pg: "PF/G",
      fgm_pg: "FGM/G",
      fga_pg: "FGA/G",
      two_pm_pg: "2PM/G",
      two_pa_pg: "2PA/G",
      three_pm_pg: "3PM/G",
      three_pa_pg: "3PA/G",
      ftm_pg: "FTM/G",
      fta_pg: "FTA/G",
      pts: "PTS",
      trb: "TRB",
      orb: "ORB",
      drb: "DRB",
      ast: "AST",
      stl: "STL",
      blk: "BLK",
      stocks: "Stocks",
      tov: "TOV",
      pf: "PF",
      fgm: "FGM",
      fga: "FGA",
      fg_pct: "FG%",
      two_pm: "2PM",
      two_pa: "2PA",
      two_p_pct: "2P%",
      three_pm: "3PM",
      three_pa: "3PA",
      three_p_pct: "3P%",
      ftm: "FTM",
      fta: "FTA",
      ft_pct: "FT%",
      efg_pct: "eFG%",
      ts_pct: "TS%",
      total_s_pct: "Total S%",
      ftr: "FTr",
      three_pr: "3Pr",
      wins: "W",
      losses: "L",
      win_pct: "Win%",
      ows_per40: "OWS/40",
      dws_per40: "DWS/40",
      ws_per40: "WS/40",
      orb_pct: "ORB%",
      drb_pct: "DRB%",
      trb_pct: "TRB%",
      ast_pct: "AST%",
      tov_pct: "TOV%",
      stl_pct: "STL%",
      blk_pct: "BLK%",
      usg_pct: "USG%",
      ppr: "PPR",
      pps: "PPS",
      ortg: "ORtg",
      drtg: "DRtg",
      ediff: "eDiff",
      fic: "FIC",
      per: "PER",
      porpag: "PRPG!",
      a_to: "A:TO",
      stl_to: "STL/TO",
      ftm_fga: "FT/FGA",
      pts_per40: "PTS/40",
      trb_per40: "TRB/40",
      orb_per40: "ORB/40",
      drb_per40: "DRB/40",
      ast_per40: "AST/40",
      stl_per40: "STL/40",
      blk_per40: "BLK/40",
      stocks_per40: "Stocks/40",
      tov_per40: "TOV/40",
      pf_per40: "PF/40",
      double_doubles: "Dbl Dbl",
      triple_doubles: "Tpl Dbl",
      forty_pts_games: "40 Pts",
      twenty_reb_games: "20 Reb",
      twenty_ast_games: "20 Ast",
      five_stl_games: "5 Stl",
      five_blk_games: "5 Blk",
      high_game: "High",
      techs: "Techs",
      hob: "HOB",
      potential_latino_name: "Potential Latino",
    },
  };
}

function buildTeamCoachConfig() {
  const labels = {
    rank: "",
    season: "Year",
    team_name: "Team",
    coach: "Coach",
    conference: "Conf",
    record: "Record",
    wins: "W",
    games: "G",
    adj_oe: "Adj OE",
    adj_de: "Adj DE",
    adj_ne: "Adj NE",
    barthag: "Barthag",
    efg_pct: "eFG%",
    efg_pct_def: "eFG% D",
    ft_rate: "FTr",
    ft_rate_def: "FTr D",
    tov_pct: "TOV%",
    tov_pct_def: "TOV% D",
    oreb_pct: "O Reb%",
    opp_oreb_pct: "Opp O Reb%",
    raw_tempo: "Raw T",
    adj_tempo: "Adj T",
    two_p_pct: "2P%",
    two_p_pct_def: "2P% D",
    three_p_pct: "3P%",
    three_p_pct_def: "3P% D",
    block_pct: "Blk%",
    blocked_pct: "Blked%",
    ast_pct: "Ast%",
    opp_ast_pct: "Opp Ast%",
    three_p_rate: "3Pr",
    three_p_rate_def: "3Pr D",
    avg_height: "Avg Hgt",
    eff_height: "Eff Hgt",
    exp: "Exp",
    talent: "Talent",
    ft_pct: "FT%",
    opp_ft_pct: "Opp FT%",
    ppp_off: "Off PPP",
    ppp_def: "Def PPP",
    ppp_net: "PPP Net",
    elite_sos: "Elite SOS",
    playtype_total_poss: "Poss",
  };
  const playtypes = [
    ["transition", "Trans"],
    ["spot_up", "Spot Up"],
    ["pnr_ball_handler", "PnR BH"],
    ["pnr_roll_man", "PnR Roll"],
    ["post_up", "Post Up"],
    ["cut", "Cut"],
    ["off_screen", "Off Screen"],
    ["hand_off", "Hand Off"],
    ["isolation", "Iso"],
    ["offensive_rebounds", "OREB"],
  ];
  const getTeamCoachDefaultPlaytypeShootSuffix = (id) => {
    if (["spot_up", "off_screen"].includes(id)) return "three_p_pct";
    if (["post_up", "pnr_roll_man", "cut", "offensive_rebounds"].includes(id)) return "two_p_pct";
    return "efg_pct";
  };
  const omittedPlaytypeColumns = new Set([
    "post_up_three_pa",
    "post_up_three_pa_pg",
    "post_up_three_p_pct",
    "post_up_three_pa_rate",
    "cut_three_pa",
    "cut_three_pa_pg",
    "cut_three_p_pct",
    "cut_three_pa_rate",
  ]);
  const playtypeMetrics = [
    ["freq", "Freq"],
    ["poss", "Poss"],
    ["ppp", "PPP"],
    ["fga", "FGA"],
    ["fga_pg", "FGA/G"],
    ["two_pa", "2PA"],
    ["two_pa_pg", "2PA/G"],
    ["two_p_pct", "2P%"],
    ["three_pa", "3PA"],
    ["three_pa_pg", "3PA/G"],
    ["three_p_pct", "3P%"],
    ["three_pa_rate", "3Pr"],
    ["fta", "FTA"],
    ["fta_pg", "FTA/G"],
    ["ft_rate", "FTr"],
    ["efg_pct", "eFG%"],
    ["ts_pct", "TS%"],
    ["to_pct", "TO%"],
  ];
  const playtypeColumns = [];
  const playtypeGroups = [];
  const playtypeSummaryColumns = [];
  const playtypeSummaryDefaultColumns = [];
  const getTeamCoachDefaultPlaytypeColumns = (id) => {
    const shootSuffix = getTeamCoachDefaultPlaytypeShootSuffix(id);
    const columns = [`${id}_freq`, `${id}_ppp`, `${id}_${shootSuffix}`];
    if (shootSuffix === "efg_pct") {
      columns.push(`${id}_two_p_pct`, `${id}_three_p_pct`);
    }
    return columns.filter((column) => !omittedPlaytypeColumns.has(column));
  };
  playtypes.forEach(([id, label]) => {
    const columns = [];
    const defaultColumns = [];
    const shootSuffix = getTeamCoachDefaultPlaytypeShootSuffix(id);
    playtypeMetrics.forEach(([suffix, suffixLabel]) => {
      const column = `${id}_${suffix}`;
      if (omittedPlaytypeColumns.has(column)) return;
      playtypeColumns.push(column);
      columns.push(column);
      labels[column] = `${label} ${suffixLabel}`;
      if (suffix === "freq" || suffix === "ppp") {
        playtypeSummaryColumns.push(column);
        playtypeSummaryDefaultColumns.push(column);
      }
      if (["freq", "ppp", "to_pct", "ft_rate", shootSuffix].includes(suffix)) defaultColumns.push(column);
    });
    if (shootSuffix === "efg_pct") {
      ["two_p_pct", "three_p_pct"].forEach((suffix) => {
        const column = `${id}_${suffix}`;
        if (!omittedPlaytypeColumns.has(column)) defaultColumns.push(column);
      });
    }
    playtypeGroups.push({
      id,
      label,
      columns,
      defaultColumns: Array.from(new Set(defaultColumns)),
      unitModeKind: "playtype",
    });
  });
  const defaultPlaytypeColumns = playtypes.flatMap(([id]) => getTeamCoachDefaultPlaytypeColumns(id));
  const teamCoachBartCoreColumns = ["record", "wins", "games", "adj_oe", "adj_de", "adj_ne", "barthag", "elite_sos"];
  const teamCoachBartRateColumns = ["efg_pct", "efg_pct_def", "ft_rate", "ft_rate_def", "tov_pct", "tov_pct_def", "oreb_pct", "opp_oreb_pct", "two_p_pct", "two_p_pct_def", "three_p_pct", "three_p_pct_def", "block_pct", "blocked_pct", "ast_pct", "opp_ast_pct", "three_p_rate", "three_p_rate_def", "ft_pct", "opp_ft_pct"];
  const teamCoachBartComboColumns = ["raw_tempo", "adj_tempo", "avg_height", "eff_height", "exp", "talent", "ppp_off", "ppp_def", "ppp_net", "playtype_total_poss"];
  const teamCoachBartColumns = [...new Set([...teamCoachBartCoreColumns, ...teamCoachBartRateColumns, ...teamCoachBartComboColumns])];
  return {
    id: "team_coach",
    navLabel: "Team/Coach",
    title: "Team/Coach",
    subtitle: "Bart team tables and Synergy team playtypes matched to coach",
    dataScript: `data/vendor/team_coach_all_seasons.js?v=${SCRIPT_CACHE_BUST}`,
    globalName: "TEAM_COACH_ALL_CSV",
    yearColumn: "season",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "team_name"],
    searchColumns: ["coach", "coach_search_text"],
    sortBy: "barthag",
    sortDir: "desc",
    defaultAllYears: false,
    minYear: 2011,
    minuteFilterDefault: "",
    demoToggleColumns: [],
    demoColumns: ["conference", "coach"],
    demoFilterColumns: [],
    groups: [
      {
        id: "bart",
        label: "Bart",
        columns: teamCoachBartColumns,
        defaultColumns: ["record", "wins", "games", "adj_oe", "adj_de", "adj_ne", "barthag"],
        defaultUnitMode: "core",
        unitModes: [
          { id: "core", label: "Core", columns: teamCoachBartCoreColumns, defaultColumns: ["record", "wins", "games", "adj_oe", "adj_de", "adj_ne", "barthag"] },
          { id: "rates", label: "Rates", columns: teamCoachBartRateColumns, defaultColumns: ["efg_pct", "tov_pct", "oreb_pct", "two_p_pct", "three_p_pct", "three_p_rate", "ft_pct"] },
          { id: "combos", label: "Combos", columns: teamCoachBartComboColumns, defaultColumns: ["adj_tempo", "ppp_off", "ppp_def", "ppp_net"] },
          { id: "all", label: "All", columns: teamCoachBartColumns },
        ],
      },
      ...playtypeGroups,
    ],
    singleFilters: withSharedSingleFilters([
      { id: "conference", label: "Conference", column: "conference" },
    ], {
      view_mode: {
        defaultValue: "player",
        options: [
          { value: "player", label: "Year" },
          { value: "career", label: "Career" },
        ],
      },
    }),
    multiFilters: [],
    defaultVisible: ["rank", "season", "team_name", "coach", "conference", "record", "wins", "games", "adj_oe", "adj_de", "adj_ne", "barthag", ...defaultPlaytypeColumns],
    labels,
  };
}

function buildCombineConfig() {
  const measurementColumns = [
    "height_wo_shoes", "weight_lb", "bmi", "wingspan", "ws_diff", "standing_reach",
    "hand_length", "hand_width", "hand_area", "body_fat_pct",
  ];
  const athleticColumns = [
    "standing_vert", "max_vert", "sprint", "lane_agility", "modified_lane_agility", "shuttle", "bench_press",
  ];
  const modifiedMetricColumns = ["ws_height", "sr_height", "sr_ws", "max_vert_sr", "standing_vert_sr", "avg_vert_sr", "max_vert_sprint_sq", "avg_vert"];
  const percentileColumns = [
    "height_wo_shoes_year_pos_pctile", "weight_lb_year_pos_pctile", "wingspan_year_pos_pctile", "ws_diff_year_pos_pctile",
    "standing_reach_year_pos_pctile", "standing_vert_year_pos_pctile", "max_vert_year_pos_pctile",
    "sprint_year_pos_pctile", "lane_agility_year_pos_pctile", "shuttle_year_pos_pctile",
    "height_wo_shoes_pos_pctile", "wingspan_pos_pctile", "ws_diff_pos_pctile", "standing_vert_pos_pctile",
    "max_vert_pos_pctile", "sprint_pos_pctile", "lane_agility_pos_pctile", "shuttle_pos_pctile",
  ];
  const labels = {
    rank: "",
    season: "Year",
    event: "Event",
    player_name: "Player",
    pos: "Pos",
    draft_year: "Draft",
    draft_pick: "Pick",
    source: "Source",
    height_wo_shoes: "HT",
    weight_lb: "WT",
    bmi: "BMI",
    wingspan: "WS",
    ws_diff: "WS Diff",
    ws_height: "WS/HT",
    standing_reach: "Reach",
    sr_height: "Reach/HT",
    sr_ws: "Reach/WS",
    hand_length: "Hand Len",
    hand_width: "Hand Wid",
    hand_area: "Hand Area",
    body_fat_pct: "Body Fat",
    standing_vert: "Stand Vert",
    max_vert: "Max Vert",
    avg_vert: "Avg Vert",
    max_vert_sr: "Max Vert+R",
    standing_vert_sr: "Stand Vert+R",
    avg_vert_sr: "Avg Vert+R",
    sprint: "Sprint",
    lane_agility: "Lane Agil",
    shuttle: "Shuttle",
    bench_press: "Bench",
    height_adj_max_vert_sr: "Adj Vert+R",
    longitudinal_area: "Long Area",
    mv_takeoff_force: "MV Force",
    standing_vert_takeoff_force: "SV Force",
    sprint_force: "Sprint Force",
    takeoff_velocity_residual: "Vel Resid",
    max_vert_takeoff_velocity: "MV Velocity",
    standing_vert_takeoff_velocity: "SV Velocity",
    sprint_acceleration: "Sprint Accel",
    max_vert_sprint_sq: "Vert/Sprint2",
    max_vert_standing_vert_residual: "MV-SV",
  };
  percentileColumns.forEach((column) => {
    const base = column
      .replace(/_year_pos_pctile$/, "")
      .replace(/_pos_pctile$/, "")
      .replace(/_/g, " ");
    labels[column] = column.includes("_year_pos_pctile") ? `${base} YrPos Pctl` : `${base} Pos Pctl`;
  });
  return {
    id: "combine",
    navLabel: "Combine",
    title: "Combine",
    subtitle: "",
    dataScript: "data/vendor/combine_all_seasons.js",
    globalName: "COMBINE_ALL_CSV",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "event",
    lockedColumns: ["rank", "season", "player_name", "pos"],
    searchColumns: withUniversalSearchColumns(["player_name", "event", "source", "draft_year", "draft_pick"]),
    sortBy: "max_vert",
    sortDir: "desc",
    minYear: 2000,
    minuteDefault: 0,
    demoColumns: ["event", "draft_year", "draft_pick", "body_fat_pct"],
    demoFilterColumns: ["draft_year", "draft_pick", "height_wo_shoes", "weight_lb", "wingspan", "ws_diff", "standing_reach", "standing_vert", "max_vert", "sprint", "lane_agility", "shuttle"],
    groups: [
      { id: "measurements", label: "Measurements", columns: measurementColumns, defaultColumns: ["height_wo_shoes", "weight_lb", "wingspan", "standing_reach", "hand_length", "hand_width"] },
      { id: "athletic", label: "Athletic", columns: athleticColumns, defaultColumns: ["standing_vert", "max_vert", "sprint", "lane_agility", "shuttle"] },
      { id: "modified_metrics", label: "Modified Metrics", columns: modifiedMetricColumns, defaultColumns: ["ws_height", "sr_height", "sr_ws", "max_vert_sr", "standing_vert_sr", "avg_vert_sr", "max_vert_sprint_sq", "avg_vert"] },
    ],
    singleFilters: withSharedSingleFilters([]),
    multiFilters: [
      { id: "event", label: "Event", column: "event", renderAsSelect: true },
      { id: "pos", label: "Pos", column: "pos", sort: ["PG", "G", "SG", "G/F", "SF", "F", "PF", "F/C", "C"] },
    ],
    defaultVisible: ["rank", "season", "player_name", "pos", "draft_year", "draft_pick", "height_wo_shoes", "weight_lb", "wingspan", "ws_diff", "standing_reach", "standing_vert", "max_vert", "sprint", "lane_agility", "shuttle", "ws_height", "sr_height"],
    labels,
  };
}

function buildGLeagueConfig() {
  const labels = {
    rank: "",
    season: "Year",
    player_name: "Player",
    team_name: "Team",
    league: "League",
    pos: "Pos",
    age: "Age",
    gp: "GP",
    min: "Min",
    mpg: "MPG",
    fg_pct: "FG%",
    two_p_pct: "2P%",
    three_p_pct: "3P%",
    ft_pct: "FT%",
    efg_pct: "eFG%",
    ts_pct: "TS%",
    ftr: "FTr",
    three_pr: "3Pr",
    ortg: "ORtg",
    drtg: "DRtg",
    net_rating: "NetRtg",
    per: "PER",
    bpm: "BPM",
    rgm_per: "RGM PER",
    orb_pct: "ORB%",
    drb_pct: "DRB%",
    trb_pct: "TRB%",
    ast_pct: "AST%",
    tov_pct: "TOV%",
    stl_pct: "STL%",
    blk_pct: "BLK%",
    usg_pct: "USG%",
    ast_to: "A:TO",
    ...GENERAL_LABELS,
  };
  return {
    id: "gleague",
    navLabel: "G League",
    title: "G League",
    subtitle: "",
    dataScript: "data/vendor/gleague_all_seasons.js",
    globalName: "GLEAGUE_ALL_CSV",
    yearColumn: "season",
    playerColumn: "player_name",
    teamColumn: "team_name",
    lockedColumns: ["rank", "season", "player_name", "team_name"],
    searchColumns: withUniversalSearchColumns(["player_name", "player_search_text", "team_name", "team_full", "league", "career_path", "profile_levels"]),
    sortBy: "pts_pg",
    sortDir: "desc",
    minuteDefault: 0,
    demoColumns: ["league", "pos", "age", "gp", "min", "mpg"],
    demoFilterColumns: ["gp", "min", "mpg"],
    groups: [
      buildGeneralStatGroup({ includePer100: false }),
      { id: "shooting", label: "Shooting", columns: ["fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr", "rim_pct", "mid_pct"], defaultColumns: ["fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ftr", "three_pr"] },
      { id: "advanced", label: "Advanced", columns: ["ortg", "drtg", "net_rating", "per", "bpm", "rgm_per", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct", "usg_pct", "ast_to"], defaultColumns: ["per", "bpm", "usg_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct"] },
    ],
    singleFilters: withSharedSingleFilters([
      { id: "league", label: "League", column: "league" },
    ]),
    multiFilters: [
      { id: "pos", label: "Pos", column: "pos", sort: ["PG", "G", "SG", "G/F", "SF", "F", "PF", "F/C", "C"] },
    ],
    defaultVisible: ["rank", "season", "player_name", "team_name", "pos", "gp", "mpg", "pts_pg", "trb_pg", "ast_pg", "stl_pg", "blk_pg", "fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "ts_pct", "per", "bpm"],
    labels,
  };
}

const DATASETS = {
  capitanesreference: buildCapitanesReferenceConfig(),
};

const elements = {
  pageTitle: document.getElementById("pageTitle"),
  pageSubtitle: document.getElementById("pageSubtitle"),
  leagueNav: document.getElementById("leagueNav"),
  statusPill: document.getElementById("statusPill"),
  filtersSummary: document.getElementById("filtersSummary"),
  yearPills: document.getElementById("yearPills"),
  searchInput: document.getElementById("searchInput"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  globalPlayerSearchInput: document.getElementById("globalPlayerSearchInput"),
  globalPlayerSearchSuggestions: document.getElementById("globalPlayerSearchSuggestions"),
  teamSelect: document.getElementById("teamSelect"),
  viewModeFilters: document.getElementById("viewModeFilters"),
  singleSelectFilters: document.getElementById("singleSelectFilters"),
  multiSelectFilters: document.getElementById("multiSelectFilters"),
  demoControls: document.getElementById("demoControls"),
  demoToggles: document.getElementById("demoToggles"),
  demoRangeFilters: document.getElementById("demoRangeFilters"),
  statGroups: document.getElementById("statGroups"),
  yearQuickSelect: document.getElementById("yearQuickSelect"),
  finderQuery: document.getElementById("finderQuery"),
  finderTitle: document.getElementById("finderTitle"),
  resultsCount: document.getElementById("resultsCount"),
  resultsSubtitle: document.getElementById("resultsSubtitle"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  tableWrapper: document.getElementById("tableWrapper"),
  statsTable: document.getElementById("statsTable"),
  statsTableHead: document.getElementById("statsTableHead"),
  statsTableBody: document.getElementById("statsTableBody"),
  queryPanel: document.getElementById("queryPanel"),
  homeContent: document.getElementById("homeContent"),
  tableContent: document.getElementById("tableContent"),
  selectAllYearsBtn: document.getElementById("selectAllYearsBtn"),
  selectLatestYearBtn: document.getElementById("selectLatestYearBtn"),
  clearYearsBtn: document.getElementById("clearYearsBtn"),
  demoDefaultsBtn: document.getElementById("demoDefaultsBtn"),
  demoAllBtn: document.getElementById("demoAllBtn"),
  demoClearBtn: document.getElementById("demoClearBtn"),
  statCompressBtn: document.getElementById("statCompressBtn"),
  statExpandBtn: document.getElementById("statExpandBtn"),
  tableLegend: document.getElementById("tableLegend"),
  statGroupTemplate: document.getElementById("statGroupTemplate"),
};

const appState = {
  currentId: null,
  nextUiStateRenderKey: 1,
  scriptLoads: new Map(),
  scriptPreloads: new Set(),
  statusLoads: new Map(),
  statusRealgmIndexKey: "",
  statusRealgmIndex: null,
  statusRealgmStaticIndex: undefined,
  statusRealgmStaticIndexLoad: null,
  grassrootsPlayerYearIndexLoad: null,
  combineMeasurementLookupLoad: null,
  playerProfileYearIndexLoad: null,
  playerProfileBucketManifestLoad: null,
  playerProfileBucketLoads: new Map(),
  playerProfileBucketRows: new Map(),
  playerProfileBucketPrefetches: new Set(),
  precomputedStatusAnnotations: undefined,
  statusAnnotationScriptLoad: null,
  hydrationLoads: new Map(),
  scheduledTasks: new Map(),
  datasetCache: {},
  uiState: {},
  searchRenderTimer: 0,
  filterRenderTimer: 0,
  filterRenderColumns: new Set(),
  urlStateSyncTimer: 0,
  applyingRouteState: false,
  globalSearchTimer: 0,
  globalSearchIndex: null,
  globalSearchIndexLoad: null,
  globalSearchSuggestionMap: new Map(),
  secondaryFilterFrame: 0,
  secondaryFilterDatasetId: "",
  adaptiveTeamTextFrame: 0,
  playerProfileRows: new Map(),
  playerProfileRequestSeq: 0,
  playerProfileSort: { column: "season", dir: "desc" },
  grassrootsScopePrefetches: new Set(),
  grassrootsScopeWorkerUrl: "",
  currentD1BartSplit: D1_BART_SPLIT_DEFAULT,
  d1BartSplitLoadKey: "",
};

renderNav();
wireGlobalEvents();
handleRoute();
window.addEventListener("hashchange", handleRoute);

function renderNav() {
  elements.leagueNav.innerHTML = Object.values(DATASETS)
    .map(
      (dataset) => `
        <a class="league-link" href="#${dataset.id}" data-id="${dataset.id}">
          <span class="league-tag">${escapeHtml(dataset.navLabel)}</span>
          <span>${escapeHtml(dataset.title.replace(" Explorer", ""))}</span>
        </a>
      `
    )
    .join("");
}

function wireGlobalEvents() {
  window.addEventListener("resize", scheduleAdaptiveTeamTextSizing);
  wireGlobalPlayerSearch();
  elements.searchInput.addEventListener("input", async () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    const changed = applySearchInputValue(dataset, state, elements.searchInput.value);
    const yearLoadsChanged = syncSearchScopedYearLoads(dataset, state);
    if (parseSearchTerms(state.search).length) {
      schedulePlayerCareerSearchPrefetch(dataset, state);
    }
    if (!changed && !yearLoadsChanged) return;
    if (!changed && yearLoadsChanged) {
      if (document.activeElement === elements.searchInput) return;
      renderCurrentDataset();
      return;
    }
    if (changed?.filtersChanged) {
      await ensureStatusReadyForState(dataset, state);
      if (appState.currentId !== dataset.id) return;
      renderCurrentDataset();
      return;
    }
    scheduleSearchResultsRender(dataset, state);
  });
  elements.searchInput.addEventListener("change", async () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    const changed = applySearchInputValue(dataset, state, elements.searchInput.value);
    syncSearchScopedYearLoads(dataset, state);
    if (!changed) return;
    if (changed.filtersChanged) {
      await ensureStatusReadyForState(dataset, state);
      if (appState.currentId !== dataset.id) return;
      renderCurrentDataset();
      return;
    }
    renderResultsOnly(dataset, state);
  });
  elements.searchInput.addEventListener("focus", () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    cancelQueuedSelectedYearLoads(dataset, state);
  });

  elements.teamSelect.addEventListener("change", () => {
    const state = getCurrentUiState();
    if (!state) return;
    state.team = elements.teamSelect.value;
    renderCurrentDataset();
  });

  elements.selectAllYearsBtn.addEventListener("click", async () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    try {
      const careerMode = dataset.id === "grassroots" && state.extraSelects.view_mode === "career";
      const years = careerMode ? getGrassrootsCareerYears(dataset, state) : getAvailableYears(dataset);
      if (careerMode) {
        state.years = new Set(years);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "grassroots" && dataset._grassrootsChunked) {
        state.years = new Set(years);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "player_career" && dataset._playerCareerChunked) {
        state.years = new Set(years);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        schedulePlayerCareerSelectedYearLoad(dataset, state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "d1" && isMobileLiteD1Dataset(dataset)) {
        state.years = new Set(years);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        scheduleD1SelectedYearLoad(dataset, state);
        renderCurrentDataset();
        return;
      }
      await ensureDatasetYearsLoaded(dataset, years);
      state.years = new Set(years);
      state._yearSelectionTouched = true;
      await ensureStatusReadyForState(dataset, state);
      if (appState.currentId !== dataset.id) return;
      renderCurrentDataset();
    } catch (error) {
      elements.statusPill.textContent = `${dataset.navLabel} load failed`;
      elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
    }
  });

  elements.selectLatestYearBtn.addEventListener("click", async () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    const careerMode = dataset.id === "grassroots" && state.extraSelects.view_mode === "career";
    if (careerMode) {
      const years = getGrassrootsCareerYears(dataset, state).slice().sort(compareYears);
      state.years = new Set(years.length ? [years[0]] : []);
      state._yearSelectionTouched = true;
    } else {
      const availableYears = getAvailableYears(dataset);
      const latestYear = getLatestAvailableYear(dataset) || (availableYears.length ? availableYears[0] : dataset.meta.latestYear);
      if (latestYear && !(dataset.id === "d1" && isMobileLiteD1Dataset(dataset))) {
        await ensureDatasetYearsLoaded(dataset, [latestYear]);
      }
      state.years = new Set(latestYear ? [latestYear] : []);
      state._yearSelectionTouched = true;
    }
    resetUiCaches(state);
    if (dataset.id === "d1" && isMobileLiteD1Dataset(dataset)) {
      scheduleD1SelectedYearLoad(dataset, state);
    }
    await ensureStatusReadyForState(dataset, state);
    if (appState.currentId !== dataset.id) return;
    renderCurrentDataset();
  });

  elements.clearYearsBtn.addEventListener("click", () => {
    const state = getCurrentUiState();
    if (!state) return;
    state.years = new Set();
    state._yearSelectionTouched = true;
    resetUiCaches(state);
    renderCurrentDataset();
  });

  elements.demoDefaultsBtn?.addEventListener("click", () => applyVisibilityMode("demo", "default"));
  elements.demoAllBtn?.addEventListener("click", () => applyVisibilityMode("demo", "all"));
  elements.demoClearBtn?.addEventListener("click", () => applyVisibilityMode("demo", "clear"));
  elements.statCompressBtn?.addEventListener("click", () => setAllStatGroupsCollapsed(true));
  elements.statExpandBtn?.addEventListener("click", () => setAllStatGroupsCollapsed(false));
  elements.statGroups?.addEventListener("click", async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const dataset = getCurrentDataset();
    const state = getCurrentUiState();
    if (!dataset || !state) return;
    const collapseButton = target.closest("[data-group-collapse]");
    if (collapseButton) {
      toggleStatGroupCollapsed(collapseButton.dataset.groupCollapse);
      return;
    }
    const groupButton = target.closest("[data-group-cycle]");
    if (groupButton) {
      const groupId = groupButton.dataset.groupCycle;
      const group = dataset.meta.groups.find((item) => item.id === groupId);
      if (!group) return;
      await cycleGroupVisibility(dataset, state, group);
      return;
    }
    const groupUnitButton = target.closest("[data-group-unit]");
    if (groupUnitButton) {
      const groupId = groupUnitButton.dataset.groupUnit;
      const group = dataset.meta.groups.find((item) => item.id === groupId);
      if (!group) return;
      const anchorTop = groupUnitButton.getBoundingClientRect().top;
      await cycleGroupUnitMode(dataset, state, group);
      const nextButton = elements.statGroups?.querySelector(`[data-group-unit="${CSS.escape(groupId)}"]`);
      if (nextButton) {
        const nextTop = nextButton.getBoundingClientRect().top;
        if (Number.isFinite(anchorTop) && Number.isFinite(nextTop) && Math.abs(nextTop - anchorTop) > 1) {
          window.scrollBy(0, nextTop - anchorTop);
        }
      }
      return;
    }
    const statButton = target.closest("[data-stat-column]");
    if (!statButton) return;
    const column = statButton.dataset.statColumn;
    if (!column) return;
    if (!state.visibleColumns[column]) {
      await ensureDeferredColumnsReady(dataset, state, [column], { scope: "visible" });
      if (appState.currentId !== dataset.id) return;
    }
    state.visibleColumns[column] = !state.visibleColumns[column];
    renderCurrentDataset();
  });
  elements.statGroups?.addEventListener("input", async (event) => {
    const target = event.target instanceof HTMLInputElement ? event.target : null;
    if (!target) return;
    const dataset = getCurrentDataset();
    const state = getCurrentUiState();
    if (!dataset || !state) return;
    const minColumn = target.dataset.statMin;
    const maxColumn = target.dataset.statMax;
    const column = minColumn || maxColumn;
    if (!column || !state.numericFilters[column]) return;
    if (minColumn) state.numericFilters[column].min = target.value;
    if (maxColumn) state.numericFilters[column].max = target.value;
    scheduleFilterResultsRender(dataset, state, [column]);
    scheduleUrlStateSync(dataset, state);
  });

  elements.loadMoreBtn.addEventListener("click", async () => {
    const state = getCurrentUiState();
    const dataset = getCurrentDataset();
    if (!state || !dataset) return;
    state.visibleCount += LOAD_STEP;
    const visibleDeferredColumns = getVisibleDeferredColumns(dataset, state);
    if (visibleDeferredColumns.length) {
      await ensureDeferredColumnsReady(dataset, state, visibleDeferredColumns, { scope: "visible" });
      if (appState.currentId !== dataset.id) return;
    }
    const filtered = getFilteredRows(dataset, state);
    state.visibleCount = Math.min(state.visibleCount, filtered.length);
    renderTable(dataset, state, filtered);
    updateSummary(dataset, state, filtered);
  });
}

function wireGlobalPlayerSearch() {
  const input = elements.globalPlayerSearchInput;
  const suggestions = elements.globalPlayerSearchSuggestions;
  if (!input || !suggestions) return;
  input.addEventListener("input", () => scheduleGlobalPlayerSuggestions(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    navigateToGlobalPlayerSearch(input.value);
  });
  input.addEventListener("change", () => {
    const match = findGlobalPlayerSuggestion(input.value, { exact: true });
    if (match) navigateToGlobalPlayerProfile(match);
  });
}

function scheduleGlobalPlayerSuggestions(value) {
  if (appState.globalSearchTimer) window.clearTimeout(appState.globalSearchTimer);
  const term = getStringValue(value).trim();
  if (!elements.globalPlayerSearchSuggestions || term.length < 2) {
    appState.globalSearchSuggestionMap = new Map();
    if (elements.globalPlayerSearchSuggestions) elements.globalPlayerSearchSuggestions.innerHTML = "";
    return;
  }
  appState.globalSearchTimer = window.setTimeout(async () => {
    appState.globalSearchTimer = 0;
    const requestId = (Number(appState.globalSearchRequestId) || 0) + 1;
    appState.globalSearchRequestId = requestId;
    const globalMatchesPromise = findGlobalPlayerSuggestions(term);
    const grassrootsMatches = await findGrassrootsGlobalSearchSuggestions(term, 6);
    if (requestId !== appState.globalSearchRequestId) return;
    if (getStringValue(elements.globalPlayerSearchInput?.value).trim() !== term) return;
    if (grassrootsMatches.length) {
      updateGlobalPlayerSuggestionResults(term, grassrootsMatches);
    }
    const matches = await globalMatchesPromise;
    if (requestId !== appState.globalSearchRequestId) return;
    if (getStringValue(elements.globalPlayerSearchInput?.value).trim() !== term) return;
    const merged = matches.slice();
    if (merged.length < 6) appendUniqueGlobalSearchSuggestions(merged, grassrootsMatches.slice(0, Math.max(0, 6 - merged.length)));
    if (!merged.length) {
      const grassrootsExact = await findExactGrassrootsGlobalSearchSuggestion(term);
      if (requestId !== appState.globalSearchRequestId) return;
      if (grassrootsExact) merged.push(grassrootsExact);
    }
    updateGlobalPlayerSuggestionResults(term, merged);
  }, 90);
}

function updateGlobalPlayerSuggestionResults(term, matches) {
  if (!elements.globalPlayerSearchSuggestions) return;
  if (getStringValue(elements.globalPlayerSearchInput?.value).trim() !== term) return;
  appState.globalSearchSuggestionMap = new Map((matches || []).map((item) => [normalizeNameKey(item.name), item]));
  elements.globalPlayerSearchSuggestions.innerHTML = (matches || [])
    .map((item) => {
      const label = [item.dob, item.realgmId ? `RealGM ${item.realgmId}` : ""].filter(Boolean).join(" | ");
      return `<option value="${escapeAttribute(item.name)}"${label ? ` label="${escapeAttribute(label)}"` : ""}></option>`;
    })
    .join("");
}

async function ensureGlobalPlayerSearchIndex() {
  if (appState.globalSearchIndex) return appState.globalSearchIndex;
  if (!appState.globalSearchIndexLoad) {
    appState.globalSearchIndexLoad = (async () => {
      const [bundle, _playerBioLookup, _internationalBioLookup] = await Promise.all([
        loadStatusRealgmIndex(),
        loadScriptOnce(PLAYER_BIO_LOOKUP_SCRIPT).catch(() => undefined),
        loadScriptOnce(INTERNATIONAL_PROFILE_BIO_LOOKUP_SCRIPT).catch(() => undefined),
      ]);
      const profileMap = new Map();
      const addProfile = (realgmId, data) => {
        const name = normalizeDisplayName(getStringValue(data?.name || data?.player_name).trim());
        if (!name) return;
        const key = getStringValue(realgmId).trim() || `name:${normalizeNameKey(name)}`;
        const current = profileMap.get(key) || {};
        const datasetId = getStringValue(data?.datasetId || data?.dataset || data?.source_dataset).trim();
        const sourceId = getStringValue(data?.sourceId || data?.source_player_id || data?.player_id || data?.pid || data?.id).trim();
        const canonicalId = getStringValue(data?.canonicalId || data?.canonical_player_id).trim();
        const profileKey = getStringValue(data?.profileKey || data?.player_profile_key).trim();
        profileMap.set(key, {
          ...current,
          ...data,
          name: current.name || name,
          realgmId: getStringValue(realgmId).trim() || current.realgmId || "",
          dob: current.dob || getStringValue(data?.dob || data?.birthday).trim(),
          height: current.height || firstPositiveFinite(data?.height, data?.height_in, data?.inches, Number.NaN),
          datasetId: current.datasetId || datasetId,
          sourceId: current.sourceId || sourceId,
          canonicalId: current.canonicalId || canonicalId,
          profileKey: current.profileKey || profileKey,
        });
      };
      Object.entries(bundle?.profiles || {}).forEach(([realgmId, entry]) => {
        const name = normalizeDisplayName(getStringValue(Array.isArray(entry) ? entry[0] : entry?.name).trim());
        if (!name) return;
        const dob = getStringValue(Array.isArray(entry) ? entry[1] : entry?.dob).trim();
        const heights = Array.isArray(Array.isArray(entry) ? entry[2] : entry?.heights) ? (Array.isArray(entry) ? entry[2] : entry.heights) : [];
        const height = heights.map((value) => Number(value)).find((value) => Number.isFinite(value) && value > 0);
        addProfile(realgmId, { name, dob, height: Number.isFinite(height) ? height : "" });
      });
      Object.entries(window.PLAYER_BIO_LOOKUP || {}).forEach(([realgmId, entry]) => addProfile(realgmId, entry));
      Object.entries(window.INTERNATIONAL_PROFILE_BIO_LOOKUP || {}).forEach(([realgmId, entry]) => addProfile(realgmId, entry));
      const grassrootsDataset = appState.datasetCache?.grassroots;
      (grassrootsDataset?.rows || []).forEach((row) => {
        const name = normalizeDisplayName(getStringValue(row?.player_name || row?.player).trim());
        if (!name) return;
        addProfile(getStringValue(row?.realgm_player_id).trim(), {
          name,
          dob: getStringValue(row?.dob || row?.birthday).trim(),
          height: firstPositiveFinite(row?.height_in, row?.inches, Number.NaN),
          datasetId: "grassroots",
          sourceId: getStringValue(row?.source_player_id || row?.player_id || row?.pid || row?.id).trim(),
          canonicalId: getStringValue(row?.canonical_player_id).trim(),
          profileKey: getStringValue(row?.player_profile_key).trim(),
        });
      });
      const rows = Array.from(profileMap.values())
        .map((item) => ({
          name: item.name,
          dob: getStringValue(item.dob).trim(),
          height: Number.isFinite(Number(item.height)) && Number(item.height) > 0 ? Number(item.height) : "",
          realgmId: getStringValue(item.realgmId).trim(),
          datasetId: getStringValue(item.datasetId).trim(),
          sourceId: getStringValue(item.sourceId).trim(),
          canonicalId: getStringValue(item.canonicalId).trim(),
          profileKey: getStringValue(item.profileKey).trim(),
          key: normalizeNameKey(item.name),
          looseKey: normalizeLooseNameKey(item.name),
        }))
        .filter((item) => item.name && item.key);
      rows.sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: "base" }));
      appState.globalSearchIndex = rows;
      return rows;
    })().catch((error) => {
      console.warn("Global player search index failed to load.", error);
      appState.globalSearchIndex = [];
      return [];
    });
  }
  return appState.globalSearchIndexLoad;
}

function appendUniqueGlobalSearchSuggestions(target, extras) {
  if (!Array.isArray(target) || !Array.isArray(extras) || !extras.length) return target;
  const seen = new Set(target.map((item) => `${normalizeNameKey(item?.name)}|${normalizeKey(item?.datasetId)}`));
  extras.forEach((item) => {
    const key = `${normalizeNameKey(item?.name)}|${normalizeKey(item?.datasetId)}`;
    if (!normalizeNameKey(item?.name) || seen.has(key)) return;
    seen.add(key);
    target.push(item);
  });
  return target;
}

async function findExactGrassrootsGlobalSearchSuggestion(term) {
  const normalized = normalizeGrassrootsSearchValue(term);
  if (!normalized || normalized.split(" ").length < 2) return null;
  try {
    const index = await loadGrassrootsPlayerYearIndex();
    const years = Array.isArray(index?.[normalized]) ? index[normalized].filter(Boolean) : [];
    if (!years.length) return null;
    return {
      name: formatGrassrootsGlobalSearchSuggestionName(normalized),
      datasetId: "grassroots",
      key: normalizeNameKey(term),
      looseKey: normalizeLooseNameKey(term),
    };
  } catch (error) {
    console.warn("Grassroots global search fallback failed.", error);
    return null;
  }
}

async function findGrassrootsGlobalSearchSuggestions(term, limit = 6) {
  const normalized = normalizeGrassrootsSearchValue(term);
  if (!normalized || limit <= 0) return [];
  const tokens = normalized.split(" ").filter(Boolean);
  if (!tokens.length) return [];
  if (tokens.length === 1 && normalized.length < 5) return [];
  try {
    const index = await loadGrassrootsPlayerYearIndex();
    const keys = getSortedGrassrootsGlobalSearchKeys(index);
    if (!keys.length) return [];
    const start = findSortedPrefixStartIndex(keys, normalized);
    if (start < 0) return [];
    const matches = [];
    for (let i = start; i < keys.length; i += 1) {
      const key = keys[i];
      if (!key.startsWith(normalized)) break;
      const keyTokens = key.split(" ").filter(Boolean);
      if (keyTokens.length < 2) continue;
      if (tokens.length > keyTokens.length) continue;
      matches.push({
        name: formatGrassrootsGlobalSearchSuggestionName(key),
        datasetId: "grassroots",
        key: normalizeNameKey(key),
        looseKey: normalizeLooseNameKey(key),
      });
      if (matches.length >= limit) break;
    }
    return matches;
  } catch (error) {
    console.warn("Grassroots global search suggestions failed.", error);
    return [];
  }
}

function formatGrassrootsGlobalSearchSuggestionName(key) {
  return getStringValue(key)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getSortedGrassrootsGlobalSearchKeys(index) {
  if (!index) return [];
  if (!Object.prototype.hasOwnProperty.call(index, "__grassrootsGlobalSearchKeys")) {
    const keys = getGrassrootsSearchIndexKeys(index)
      .filter((key) => getStringValue(key).includes(" "))
      .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }));
    Object.defineProperty(index, "__grassrootsGlobalSearchKeys", {
      configurable: false,
      enumerable: false,
      value: keys,
    });
  }
  return index.__grassrootsGlobalSearchKeys || [];
}

function findSortedPrefixStartIndex(values, term) {
  if (!Array.isArray(values) || !values.length || !term) return -1;
  let low = 0;
  let high = values.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (values[mid].localeCompare(term, undefined, { sensitivity: "base" }) < 0) low = mid + 1;
    else high = mid;
  }
  return low < values.length ? low : -1;
}

async function findGlobalPlayerSuggestions(term) {
  const index = await ensureGlobalPlayerSearchIndex();
  const strictTerm = normalizeNameKey(term);
  const looseTerm = normalizeLooseNameKey(term);
  if (!strictTerm && !looseTerm) return [];
  return (index || [])
    .map((item) => ({ item, score: scoreGlobalPlayerSuggestion(item, strictTerm, looseTerm) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, 16)
    .map((entry) => entry.item);
}

function scoreGlobalPlayerSuggestion(item, strictTerm, looseTerm) {
  if (!item) return 0;
  let score = 0;
  if (strictTerm && item.key === strictTerm) score += 500;
  else if (strictTerm && item.key.startsWith(strictTerm)) score += 360;
  else if (strictTerm && item.key.includes(strictTerm)) score += 210;
  if (looseTerm && item.looseKey === looseTerm) score += 420;
  else if (looseTerm && item.looseKey.startsWith(looseTerm)) score += 280;
  else if (looseTerm && item.looseKey.includes(looseTerm)) score += 140;
  if (!score) return 0;
  if (item.realgmId) score += 20;
  if (item.dob) score += 10;
  return score;
}

function findGlobalPlayerSuggestion(value, options = {}) {
  const key = normalizeNameKey(value);
  if (!key) return null;
  const mapped = appState.globalSearchSuggestionMap?.get(key);
  if (mapped) return mapped;
  if (options.exact) return null;
  return (appState.globalSearchIndex || []).find((item) => item.key === key) || null;
}

async function navigateToGlobalPlayerSearch(value) {
  const term = getStringValue(value).trim();
  if (!term) return;
  let suggestion = findGlobalPlayerSuggestion(term);
  if (!suggestion) {
    const matches = await findGlobalPlayerSuggestions(term);
    const grassrootsMatches = matches.length ? [] : await findGrassrootsGlobalSearchSuggestions(term, 1);
    suggestion = matches[0]
      || grassrootsMatches[0]
      || await findExactGrassrootsGlobalSearchSuggestion(term)
      || { name: normalizeDisplayName(term) };
  }
  navigateToGlobalPlayerProfile(suggestion);
}

function navigateToGlobalPlayerProfile(suggestion) {
  if (!suggestion?.name) return;
  if (elements.globalPlayerSearchInput) elements.globalPlayerSearchInput.value = suggestion.name;
  const params = new URLSearchParams();
  params.set("name", suggestion.name);
  if (suggestion.realgmId) params.set("rgm", suggestion.realgmId);
  if (suggestion.datasetId) params.set("dataset", suggestion.datasetId);
  if (suggestion.sourceId) params.set("source", suggestion.sourceId);
  if (suggestion.canonicalId) params.set("canonical", suggestion.canonicalId);
  if (suggestion.profileKey) params.set("profile_key", suggestion.profileKey);
  if (suggestion.dob) params.set("dob", suggestion.dob);
  if (Number.isFinite(Number(suggestion.height)) && Number(suggestion.height) > 0) params.set("height", String(Number(suggestion.height)));
  const hash = `#${PROFILE_ROUTE_ID}?${params.toString()}`;
  if (window.location.hash === hash) handleRoute();
  else window.location.hash = hash;
}

function getRouteInfo() {
  const raw = window.location.hash.replace(/^#/, "").trim();
  const [routePart, queryPart = ""] = raw.split("?");
  const route = routePart.toLowerCase();
  if (route === PROFILE_ROUTE_ID || route === "player_profile" || route === "player") {
    return { id: PROFILE_ROUTE_ID, params: new URLSearchParams(queryPart) };
  }
  if (route === HOME_ID || !route) return { id: "capitanesreference", params: new URLSearchParams(queryPart) };
  return { id: DATASETS[route] ? route : "capitanesreference", params: new URLSearchParams(queryPart) };
}

function getRouteId() {
  return getRouteInfo().id;
}

function applyRouteParamsToState(dataset, state, params) {
  if (!dataset || !state || !params) return false;
  let changed = false;
  const setChanged = () => {
    changed = true;
  };
  const routeSearch = params.get("q") ?? params.get("search");
  if (routeSearch != null) {
    if (applySearchInputValue(dataset, state, routeSearch)) setChanged();
  }
  const routeTeam = params.get("team");
  if (routeTeam != null) {
    state.team = getStringValue(routeTeam).trim() || "all";
    setChanged();
  }
  const routeYears = params.get("years");
  if (routeYears != null) {
    state.years = new Set(parseUrlStateList(routeYears));
    state._yearSelectionTouched = true;
    setChanged();
  }
  const routeSort = params.get("sort");
  if (routeSort && (dataset.meta?.allColumns || []).includes(routeSort)) {
    state.sortBy = routeSort;
    setChanged();
  }
  const routeDir = params.get("dir");
  if (routeDir === "asc" || routeDir === "desc") {
    state.sortDir = routeDir;
    setChanged();
  }
  const routeBlank = params.get("blank");
  if (routeBlank === "first" || routeBlank === "last") {
    state.sortBlankMode = routeBlank;
    setChanged();
  }
  (dataset.singleFilters || []).forEach((filter) => {
    const value = params.get(`sf.${filter.id}`) ?? params.get(filter.id);
    if (value == null || !(filter.id in state.extraSelects)) return;
    state.extraSelects[filter.id] = value || (filter.defaultValue ?? "all");
    setChanged();
  });
  (dataset.multiFilters || []).forEach((filter) => {
    const value = params.get(`mf.${filter.id}`) ?? params.get(filter.id);
    if (value == null || !(filter.id in state.multiSelects)) return;
    const parsed = new Set(parseUrlStateList(value));
    const options = getMultiFilterOptions(dataset, filter, state);
    state.multiSelects[filter.id] = parsed.size === options.length ? new Set() : parsed;
    setChanged();
  });
  Object.keys(state.demoFilters || {}).forEach((column) => {
    const minValue = params.get(`dmin.${column}`);
    const maxValue = params.get(`dmax.${column}`);
    if (minValue != null) {
      state.demoFilters[column].min = minValue;
      setChanged();
    }
    if (maxValue != null) {
      state.demoFilters[column].max = maxValue;
      setChanged();
    }
  });
  Object.keys(state.numericFilters || {}).forEach((column) => {
    const minValue = params.get(`smin.${column}`);
    const maxValue = params.get(`smax.${column}`);
    if (minValue != null) {
      state.numericFilters[column].min = minValue;
      setChanged();
    }
    if (maxValue != null) {
      state.numericFilters[column].max = maxValue;
      setChanged();
    }
  });
  if (changed) resetUiCaches(state);
  return changed;
}

function parseUrlStateList(value) {
  if (value == null) return [];
  return getStringValue(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function setUrlStateList(params, key, values, sorter = compareFilterValues) {
  const list = Array.from(values || [])
    .map((value) => getStringValue(value).trim())
    .filter(Boolean)
    .sort(sorter);
  params.set(key, list.join(","));
}

function getDefaultUrlYearSet(dataset) {
  const years = dataset?.defaultAllYears
    ? (getAvailableYears(dataset).length ? getAvailableYears(dataset) : dataset.meta?.years || [])
    : (dataset?.meta?.latestYear ? [dataset.meta.latestYear] : dataset?.meta?.years || []);
  return new Set((years || []).map((year) => getStringValue(year).trim()).filter(Boolean));
}

function setsHaveSameValues(left, right) {
  const leftSet = left instanceof Set ? left : new Set(left || []);
  const rightSet = right instanceof Set ? right : new Set(right || []);
  if (leftSet.size !== rightSet.size) return false;
  for (const value of leftSet) {
    if (!rightSet.has(value)) return false;
  }
  return true;
}

function getDefaultDemoFilterValue(dataset, column, side) {
  const configured = dataset?.demoFilterDefaults?.[column]?.[side];
  if (configured != null) return String(configured);
  if (side !== "min") return "";
  const minuteColumn = dataset?.meta?.minuteFilterColumn;
  if (!minuteColumn || column !== minuteColumn) return "";
  const minuteFilterDefault = dataset?.minuteFilterDefault;
  return minuteFilterDefault !== undefined ? String(minuteFilterDefault) : String(getDatasetMinuteThreshold(dataset));
}

function buildDatasetStateHash(dataset, state) {
  const params = new URLSearchParams();
  const search = getStringValue(state?.search).trim();
  if (search) params.set("q", search);
  const team = getStringValue(state?.team || "all").trim();
  if (team && team !== "all") params.set("team", team);
  const defaultYears = getDefaultUrlYearSet(dataset);
  if (!setsHaveSameValues(state?.years || new Set(), defaultYears)) {
    setUrlStateList(params, "years", state?.years || new Set(), compareYears);
  }
  if (state?.sortBy && state.sortBy !== dataset?.sortBy) params.set("sort", state.sortBy);
  if (state?.sortDir && state.sortDir !== dataset?.sortDir) params.set("dir", state.sortDir);
  if (state?.sortBlankMode && state.sortBlankMode !== "last") params.set("blank", state.sortBlankMode);
  (dataset.singleFilters || []).forEach((filter) => {
    if (filter.id === "view_mode") {
      const defaultValue = filter.defaultValue ?? "all";
      const value = getStringValue(state?.extraSelects?.[filter.id] ?? defaultValue);
      if (value && value !== defaultValue) params.set(`sf.${filter.id}`, value);
      return;
    }
    const defaultValue = filter.defaultValue ?? "all";
    const value = getStringValue(state?.extraSelects?.[filter.id] ?? defaultValue);
    if (value && value !== defaultValue) params.set(`sf.${filter.id}`, value);
  });
  (dataset.multiFilters || []).forEach((filter) => {
    const selected = state?.multiSelects?.[filter.id] || new Set();
    if (selected.size) setUrlStateList(params, `mf.${filter.id}`, selected);
  });
  Object.entries(state?.demoFilters || {}).forEach(([column, filter]) => {
    const minValue = getStringValue(filter?.min).trim();
    const maxValue = getStringValue(filter?.max).trim();
    if (minValue && minValue !== getDefaultDemoFilterValue(dataset, column, "min")) params.set(`dmin.${column}`, minValue);
    if (maxValue && maxValue !== getDefaultDemoFilterValue(dataset, column, "max")) params.set(`dmax.${column}`, maxValue);
  });
  Object.entries(state?.numericFilters || {}).forEach(([column, filter]) => {
    const minValue = getStringValue(filter?.min).trim();
    const maxValue = getStringValue(filter?.max).trim();
    if (minValue) params.set(`smin.${column}`, minValue);
    if (maxValue) params.set(`smax.${column}`, maxValue);
  });
  const query = params.toString();
  return query ? `#${dataset.id}?${query}` : `#${dataset.id}`;
}

function scheduleUrlStateSync(dataset, state) {
  if (!dataset || !state || appState.applyingRouteState) return;
  if (appState.currentId !== dataset.id) return;
  if (appState.urlStateSyncTimer) window.clearTimeout(appState.urlStateSyncTimer);
  appState.urlStateSyncTimer = window.setTimeout(() => {
    appState.urlStateSyncTimer = 0;
    syncUrlStateFromCurrent();
  }, URL_STATE_SYNC_DEBOUNCE_MS);
}

function syncUrlStateFromCurrent() {
  const dataset = getCurrentDataset();
  const state = getCurrentUiState();
  if (!dataset || !state || appState.currentId === PROFILE_ROUTE_ID || appState.currentId === HOME_ID) return;
  const nextHash = buildDatasetStateHash(dataset, state);
  if (window.location.hash === nextHash) return;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
}

async function waitForRouteLoadStability(datasetId) {
  if (!datasetId || appState.datasetCache[datasetId]) return true;
  await new Promise((resolve) => window.setTimeout(resolve, ROUTE_LOAD_STABILITY_DELAY_MS));
  return appState.currentId === datasetId;
}

async function handleRoute() {
  const routeInfo = getRouteInfo();
  const datasetId = routeInfo.id;
  appState.currentId = datasetId;
  document.body.classList.toggle("profile-route-active", datasetId === PROFILE_ROUTE_ID);
  cancelPendingInteractiveRenders();
  cancelBackgroundTasksForInactiveDataset(datasetId);
  cancelInteractiveLoadTimersForInactiveDataset(datasetId);
  updateNavActive(datasetId);

  if (datasetId === PROFILE_ROUTE_ID) {
    void renderPlayerProfileRoute(routeInfo.params);
    return;
  }

  if (datasetId === HOME_ID) {
    renderHomePage();
    return;
  }

  const config = DATASETS[datasetId];
  elements.queryPanel.hidden = false;
  elements.queryPanel.style.display = "";
  elements.homeContent.hidden = true;
  elements.homeContent.style.display = "none";
  elements.homeContent.classList.remove("profile-content");
  elements.tableContent.hidden = false;
  elements.tableContent.style.display = "";
  elements.pageTitle.textContent = "100guaranteed";
  elements.pageSubtitle.textContent = config.subtitle || "";
  const cachedDataset = appState.datasetCache[datasetId];
  let stateResetForRoute = false;
  if (cachedDataset) {
    const cachedState = createInitialUiState(cachedDataset);
    applyRouteParamsToState(cachedDataset, cachedState, routeInfo.params);
    appState.uiState[datasetId] = cachedState;
    stateResetForRoute = true;
    appState.applyingRouteState = true;
    renderCurrentDataset();
    appState.applyingRouteState = false;
  } else {
    renderDatasetLoadingState(config);
    elements.statusPill.textContent = `Loading ${config.navLabel}`;
    elements.resultsCount.textContent = "";
    elements.resultsSubtitle.textContent = "";
    elements.filtersSummary.textContent = "";
  }

  try {
    if (!await waitForRouteLoadStability(datasetId)) return;
    const dataset = await ensureDatasetLoaded(datasetId);
    if (appState.currentId !== datasetId) return;

    if (!stateResetForRoute) {
      appState.uiState[datasetId] = createInitialUiState(dataset);
      applyRouteParamsToState(dataset, appState.uiState[datasetId], routeInfo.params);
    } else if (!appState.uiState[datasetId]) {
      appState.uiState[datasetId] = createInitialUiState(dataset);
      applyRouteParamsToState(dataset, appState.uiState[datasetId], routeInfo.params);
    }

    const state = appState.uiState[datasetId];
    const shouldBlockForHydration = requiresHydratedDataset(datasetId, state);
    if (shouldBlockForHydration && dataset._hydrationPending) {
      elements.statusPill.textContent = `Loading ${config.navLabel} corrections`;
      if (isSupplementDeferredDataset(dataset)) {
        const scope = state?.extraSelects?.view_mode === "career" || usesDeferredColumnForSortOrFilter(dataset, state)
          ? "full"
          : "visible";
        await ensureDeferredSupplementScripts(dataset, state, { scope });
      } else {
        await ensureDatasetHydrated(datasetId);
      }
      if (appState.currentId !== datasetId) return;
      resetUiCaches(appState.uiState[datasetId]);
    }

    await ensureStatusReadyForState(dataset, state);
    if (appState.currentId !== datasetId) return;

    appState.applyingRouteState = true;
    renderCurrentDataset();
    appState.applyingRouteState = false;
    syncUrlStateFromCurrent();
    scheduleStatusAnnotations(datasetId);
    schedulePrefetchDataManifests();
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  } catch (error) {
    if (appState.currentId !== datasetId) return;
    elements.statusPill.textContent = `${config.navLabel} load failed`;
    elements.resultsCount.textContent = "Dataset failed to load.";
    elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
  }
}

function updateNavActive(datasetId) {
  elements.leagueNav.querySelectorAll(".league-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.id === datasetId);
  });
}

function getCurrentDataset() {
  return appState.currentId && appState.currentId !== HOME_ID ? appState.datasetCache[appState.currentId] : null;
}

function getCurrentUiState() {
  return appState.currentId && appState.currentId !== HOME_ID ? appState.uiState[appState.currentId] : null;
}

function getUiStateRenderKey(state) {
  return getStringValue(state?._stateRenderKey);
}

function renderHomePage() {
  elements.queryPanel.hidden = true;
  elements.queryPanel.style.display = "none";
  elements.tableContent.hidden = true;
  elements.tableContent.style.display = "none";
  elements.homeContent.hidden = false;
  elements.homeContent.style.display = "block";
  elements.homeContent.classList.remove("profile-content");
  elements.pageTitle.textContent = "100guaranteed";
  elements.pageSubtitle.textContent = "";
  elements.statusPill.textContent = "Home";
  elements.filtersSummary.textContent = "";
  elements.resultsCount.textContent = "";
  elements.resultsSubtitle.textContent = "";
  elements.homeContent.innerHTML = `
    <div class="home-card">
      <h2>Stat Explorers</h2>
      <div class="home-list">
        ${HOME_PAGES.map((page) => `<div class="home-item"><a href="#${page.id}">${escapeHtml(page.label)}</a></div>`).join("")}
      </div>
    </div>
  `;
}

function supportsDeferredHydration(dataset) {
  return Boolean(
    dataset?.deferSupplementHydration
      && ((Array.isArray(dataset?.deferredExtraScripts) && dataset.deferredExtraScripts.length)
        || dataset?.deferredScriptTemplate)
  );
}

function getDeferredColumns(dataset) {
  return Array.isArray(dataset?.deferredColumns) ? dataset.deferredColumns : [];
}

function hasActiveRangeFilter(filter) {
  return Boolean(getStringValue(filter?.min).trim() || getStringValue(filter?.max).trim());
}

function inputHasValue(value) {
  return getStringValue(value).trim() !== "";
}

function sanitizeDeferredSeasonKey(season) {
  return getStringValue(season).replace(/[^0-9A-Za-z_-]+/g, "_");
}

function getDeferredSupplementYears(dataset, state) {
  const selectedYears = Array.from(state?.years || []).filter(Boolean);
  if (selectedYears.length) return selectedYears.sort(compareYears);
  return Array.from(dataset?.meta?.years || []).filter(Boolean).sort(compareYears);
}

function getMissingDeferredSupplementYears(dataset, state) {
  if (!isSupplementDeferredDataset(dataset)) return [];
  const loadedYears = dataset._loadedSupplementYears || new Set();
  return getDeferredSupplementYears(dataset, state).filter((season) => !loadedYears.has(getStringValue(season)));
}

function getVisibleDeferredColumns(dataset, state) {
  return getDeferredColumns(dataset).filter((column) => state?.visibleColumns?.[column]);
}

function usesDeferredColumnForSortOrFilter(dataset, state) {
  if (!supportsDeferredHydration(dataset)) return false;
  if (isDeferredSupplementColumn(dataset, state?.sortBy)) return true;
  return getDeferredColumns(dataset).some((column) => hasActiveRangeFilter(state?.numericFilters?.[column]));
}

function getDeferredSupplementYearsForRows(rows, limit = LOAD_STEP) {
  const years = new Set();
  rows.slice(0, Math.max(limit, LOAD_STEP)).forEach((row) => {
    const season = getStringValue(row?.season).trim();
    if (season) years.add(season);
  });
  return Array.from(years).sort(compareYears);
}

function getImmediateDeferredSupplementYears(dataset, state) {
  if (!isSupplementDeferredDataset(dataset)) return [];
  if (state?.extraSelects?.view_mode === "career" || usesDeferredColumnForSortOrFilter(dataset, state)) {
    return getDeferredSupplementYears(dataset, state);
  }
  const rows = getFilteredRows(dataset, state);
  const visibleYears = getDeferredSupplementYearsForRows(rows, state?.visibleCount || LOAD_STEP);
  if (visibleYears.length) return visibleYears;
  return getDeferredSupplementYears(dataset, state).slice(0, 1);
}

function getMissingDeferredSupplementYearsForScope(dataset, state, scope = "full") {
  if (!isSupplementDeferredDataset(dataset)) return [];
  const targetYears = scope === "visible"
    ? getImmediateDeferredSupplementYears(dataset, state)
    : getDeferredSupplementYears(dataset, state);
  const loadedYears = dataset._loadedSupplementYears || new Set();
  return targetYears.filter((season) => !loadedYears.has(getStringValue(season)));
}

function usesDeferredColumns(dataset, state) {
  if (!supportsDeferredHydration(dataset)) return false;
  return getDeferredColumns(dataset).some((column) => state?.visibleColumns?.[column] || hasActiveRangeFilter(state?.numericFilters?.[column]));
}

function requiresHydratedDataset(datasetId, state) {
  const dataset = appState.datasetCache[datasetId] || DATASETS[datasetId];
  if (isSupplementDeferredDataset(dataset)) {
    const scope = state?.extraSelects?.view_mode === "career" || usesDeferredColumnForSortOrFilter(dataset, state)
      ? "full"
      : "visible";
    return usesDeferredColumns(dataset, state) && getMissingDeferredSupplementYearsForScope(dataset, state, scope).length > 0;
  }
  return usesDeferredColumns(dataset, state);
}

function scheduleBackgroundTask(taskKey, callback, delayMs = 1200) {
  if (!taskKey || typeof callback !== "function" || appState.scheduledTasks.has(taskKey)) return;
  const finalize = async () => {
    appState.scheduledTasks.delete(taskKey);
    await callback();
  };
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(() => {
      finalize().catch(() => {});
    });
    appState.scheduledTasks.set(taskKey, { type: "idle", handle });
    return;
  }
  const handle = window.setTimeout(() => {
    finalize().catch(() => {});
  }, delayMs);
  appState.scheduledTasks.set(taskKey, { type: "timeout", handle });
}

function cancelBackgroundTasksForInactiveDataset(activeDatasetId) {
  appState.scheduledTasks.forEach((task, taskKey) => {
    if (taskTargetsDataset(taskKey, activeDatasetId)) return;
    if (task?.type === "idle" && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(task.handle);
    } else if (task?.type === "timeout") {
      window.clearTimeout(task.handle);
    }
    appState.scheduledTasks.delete(taskKey);
  });
}

function cancelInteractiveLoadTimersForInactiveDataset(activeDatasetId) {
  Object.entries(appState.uiState || {}).forEach(([datasetId, state]) => {
    if (!state || datasetId === activeDatasetId) return;
    cancelPlayerCareerSelectedYearLoad(state);
    cancelGrassrootsCareerYearLoad(state);
    cancelD1SelectedYearLoad(state);
  });
}

function isInteractiveSearchActive(state) {
  return Boolean(getStringValue(state?.search).trim() || document.activeElement === elements.searchInput);
}

function cancelQueuedSelectedYearLoads(dataset, state) {
  if (!dataset || !state) return false;
  let canceled = false;
  if (dataset.id === "player_career") canceled = cancelPlayerCareerSelectedYearLoad(state) || canceled;
  if (dataset.id === "grassroots") canceled = cancelGrassrootsCareerYearLoad(state) || canceled;
  if (dataset.id === "d1") canceled = cancelD1SelectedYearLoad(state) || canceled;
  return canceled;
}

function syncSearchScopedYearLoads(dataset, state) {
  if (!dataset || !state) return false;
  if (dataset.id === "grassroots" && getGrassrootsDisplayScope(dataset, state)) return false;
  if (dataset.id === "grassroots" && state._grassrootsLoadingScope) state._grassrootsLoadingScope = "";
  if (isInteractiveSearchActive(state)) {
    if (dataset.id === "d1") return scheduleD1SelectedYearLoad(dataset, state);
    if (dataset.id === "grassroots") {
      scheduleGrassrootsSearchYearPrefetch(dataset, state);
      return Boolean(getGrassrootsPendingYearsKey(state));
    }
    return cancelQueuedSelectedYearLoads(dataset, state);
  }
  if (dataset.id === "player_career") return schedulePlayerCareerSelectedYearLoad(dataset, state);
  if (dataset.id === "grassroots") return maybeStartGrassrootsCareerYearLoad(dataset, state);
  if (dataset.id === "d1") return scheduleD1SelectedYearLoad(dataset, state);
  return false;
}

function cancelPendingInteractiveRenders() {
  if (appState.searchRenderTimer) {
    window.clearTimeout(appState.searchRenderTimer);
    appState.searchRenderTimer = 0;
  }
  if (appState.filterRenderTimer) {
    window.clearTimeout(appState.filterRenderTimer);
    appState.filterRenderTimer = 0;
  }
  if (appState.secondaryFilterFrame) {
    window.cancelAnimationFrame(appState.secondaryFilterFrame);
    appState.secondaryFilterFrame = 0;
  }
  appState.secondaryFilterDatasetId = "";
  appState.filterRenderColumns.clear();
}

function taskTargetsDataset(taskKey, datasetId) {
  if (!datasetId || datasetId === HOME_ID) return false;
  return getStringValue(taskKey).endsWith(`:${datasetId}`);
}

function scheduleDeferredHydration(datasetId) {
  const dataset = appState.datasetCache[datasetId];
  if (!dataset?._hydrationPending) return;
  if (dataset._grassrootsChunked) {
    if (dataset.autoHydrateGrassrootsYears === false) {
      return;
    }
    const missingYears = getGrassrootsMissingYears(dataset);
    if (!missingYears.length) {
      dataset._hydrated = true;
      dataset._hydrationPending = false;
      return;
    }
    scheduleBackgroundTask(`hydrate:${datasetId}`, async () => {
      if (appState.currentId !== datasetId) return;
      try {
        elements.statusPill.textContent = `Loading ${dataset.navLabel} seasons`;
        await ensureDatasetYearsLoaded(dataset, missingYears);
        if (appState.currentId !== datasetId) return;
        resetUiCaches(appState.uiState[datasetId]);
        renderYearPills(dataset, appState.uiState[datasetId]);
        renderResultsOnly(dataset, appState.uiState[datasetId]);
        elements.statusPill.textContent = `${dataset.navLabel} ready`;
      } catch (error) {
        if (appState.currentId !== datasetId) return;
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
    });
    return;
  }
  if (!supportsDeferredHydration(dataset) || dataset.autoHydrateDeferred === false) return;
  scheduleBackgroundTask(`hydrate:${datasetId}`, async () => {
    if (appState.currentId !== datasetId) return;
    try {
      elements.statusPill.textContent = `Loading ${dataset.navLabel} corrections`;
      await ensureDatasetHydrated(datasetId);
      if (appState.currentId !== datasetId) return;
      const state = appState.uiState[datasetId];
      resetUiCaches(state);
      renderResultsOnly(dataset, state);
      elements.statusPill.textContent = `${dataset.navLabel} ready`;
    } catch (error) {
      if (appState.currentId !== datasetId) return;
      elements.statusPill.textContent = `${dataset.navLabel} correction failed`;
      elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
    }
  });
}

function schedulePrefetchDataManifests() {
  if (appState._manifestPrefetchScheduled) return;
  appState._manifestPrefetchScheduled = true;
  setTimeout(() => {
    Object.values(DATASETS).forEach((config) => {
      const manifestSrc = config.multipartDataScript?.manifestScript;
      if (!manifestSrc) return;
      const cacheBustedSrc = getCacheBustedScriptUrl(manifestSrc);
      if (appState.scriptLoads.has(cacheBustedSrc)) return;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "script";
      link.href = cacheBustedSrc;
      document.head.appendChild(link);
    });
  }, 2500);
}

function scheduleStatusAnnotations(datasetId) {
  const dataset = appState.datasetCache[datasetId];
  const state = appState.uiState[datasetId];
  if (!dataset || dataset._statusAnnotated || !dataset.singleFilters?.some((filter) => filter.id === "status_path")) return;
  if (dataset.id === "d1" && isMobileLiteD1Dataset(dataset)) return;
  if (getStringValue(state?.extraSelects?.status_path) && getStringValue(state?.extraSelects?.status_path) !== "all") return;
  // These graphs are large enough to make cross-tab browsing feel stuck.
  // Compute status annotations only when the user explicitly asks for them.
}

function needsStatusAnnotationsForState(dataset, state) {
  if (!dataset || dataset._statusAnnotated) return false;
  if (!dataset.singleFilters?.some((filter) => filter.id === "status_path")) return false;
  const selectedStatus = getStringValue(state?.extraSelects?.status_path);
  return Boolean(selectedStatus && selectedStatus !== "all");
}

async function ensureStatusReadyForState(dataset, state) {
  if (!needsStatusAnnotationsForState(dataset, state)) return false;
  elements.statusPill.textContent = `Loading ${dataset.navLabel} status`;
  await ensureStatusAnnotations(dataset.id);
  if (appState.currentId !== dataset.id) return false;
  resetUiCaches(state);
  return true;
}

async function ensureStatusReadyAfterBackgroundLoad(dataset, state) {
  if (appState.currentId !== dataset?.id) return false;
  try {
    return await ensureStatusReadyForState(dataset, state);
  } catch (error) {
    if (appState.currentId === dataset?.id) {
      elements.statusPill.textContent = `${dataset.navLabel} status failed`;
      elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
    }
    return false;
  }
}

function buildDeferredSupplementScriptPath(dataset, season) {
  if (!dataset?.deferredScriptTemplate) return "";
  return dataset.deferredScriptTemplate.replace("{season}", sanitizeDeferredSeasonKey(season));
}

async function ensureDeferredSupplementScripts(dataset, state, options = {}) {
  if (!isSupplementDeferredDataset(dataset)) return dataset;
  const scope = options.scope === "visible" ? "visible" : "full";
  const requestedYears = Array.isArray(options.years) ? options.years.filter(Boolean) : null;
  const loadedYears = dataset._loadedSupplementYears || new Set();
  const missingYears = (requestedYears || getMissingDeferredSupplementYearsForScope(dataset, state, scope))
    .filter((season) => !loadedYears.has(getStringValue(season)));
  if (!missingYears.length) return dataset;
  if (dataset.id === "player_career" && dataset._playerCareerSupplementChunked) {
    await loadPlayerCareerSupplementRowsForYears(dataset, DATASETS.player_career, missingYears, options);
    dataset._hydrationPending = getMissingDeferredSupplementYears(dataset, state).length > 0;
    dataset._supplementScriptsLoaded = (dataset._loadedSupplementYears?.size || 0) > 0;
    return dataset;
  }
  if (!dataset._loadedSupplementYears) dataset._loadedSupplementYears = new Set();
  const scriptPaths = missingYears
    .map((season) => ({ season, src: buildDeferredSupplementScriptPath(dataset, season) }))
    .filter((entry) => entry.src);
  for (const entry of scriptPaths) {
    await loadScriptOnce(entry.src);
    dataset._loadedSupplementYears.add(getStringValue(entry.season));
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }
  dataset._hydrationPending = getMissingDeferredSupplementYears(dataset, state).length > 0;
  dataset._supplementScriptsLoaded = dataset._loadedSupplementYears.size > 0;
  return dataset;
}

async function ensureDeferredColumnsReady(dataset, state, columns, options = {}) {
  if (!supportsDeferredHydration(dataset)) return false;
  const deferred = new Set(getDeferredColumns(dataset));
  if (!(columns || []).some((column) => deferred.has(column))) return false;
  elements.statusPill.textContent = `Loading ${dataset.navLabel} shot profile`;
  if (isSupplementDeferredDataset(dataset)) {
    const scope = options.scope === "visible" && !usesDeferredColumnForSortOrFilter(dataset, state) && state?.extraSelects?.view_mode !== "career"
      ? "visible"
      : "full";
    await ensureDeferredSupplementScripts(dataset, state, { scope });
    if (appState.currentId !== dataset.id) return true;
    resetUiCaches(state);
    return true;
  }
  await ensureDatasetHydrated(dataset.id);
  if (appState.currentId !== dataset.id) return true;
  resetUiCaches(state);
  return true;
}

function invalidateDatasetDerivedCaches(datasetId) {
  const ids = datasetId === "d1"
    ? ["d1", "d2", "naia", "juco", "fiba", "nba_companion"]
    : [datasetId];
  ids.forEach((id) => {
    const dataset = appState.datasetCache[id];
    if (!dataset) return;
    dataset._statusAnnotated = false;
    dataset._linkedStatusMetricsAnnotated = false;
    dataset._statusGroups = null;
    if (id === "nba_companion") delete appState.datasetCache[id];
  });
  appState.statusLoads.clear();
}

function reapplyDatasetPostProcessing(rows, config) {
  if (!rows?.length || !config) return rows;
  if (config.minYear) {
    rows = rows.filter((row) => {
      const season = Number(normalizeSeasonValue(row[config.yearColumn]));
      return Number.isFinite(season) ? season >= config.minYear : true;
    });
  }
  rows = dedupeDatasetRows(rows, config.id);
  if (config.id === "d1") annotateTrustedD1Rows(rows);
  inferMissingClassYears(rows, config);
  normalizeRepeatedSeniorSeasons(rows, config);
  if (config.id === "grassroots") {
    backfillGrassrootsPlayerAttributes(rows);
  }
  rows.forEach((row) => populateImpactMetrics(row));
  applyCalculatedRatings(rows, config.id);
  rows.forEach((row) => populateImpactMetrics(row));
  applyPerNormalization(rows, config.id);
  populateDefenseRatePercentiles(rows, config.id);
  return rows;
}

async function ensureDatasetHydrated(datasetId) {
  const dataset = appState.datasetCache[datasetId];
  if (!dataset || dataset._hydrated || !supportsDeferredHydration(dataset)) return dataset;
  if (appState.hydrationLoads.has(datasetId)) {
    await appState.hydrationLoads.get(datasetId);
    return appState.datasetCache[datasetId];
  }

  const promise = (async () => {
    await Promise.all((dataset.deferredExtraScripts || []).map((entry) => loadScriptEntry(entry)));
    if (dataset.deferredHydrationMode === "supplement") {
      dataset._supplementScriptsLoaded = true;
    } else if (!dataset.precomputed) {
      enrichDatasetRows(dataset.rows, datasetId);
      dataset.rows.forEach((row) => normalizePercentLikeColumns(row, datasetId));
      dataset.rows = reapplyDatasetPostProcessing(dataset.rows, dataset);
      dataset.meta = buildDatasetMeta(dataset.rows, dataset);
      invalidateDatasetDerivedCaches(datasetId);
    }
    dataset._hydrated = true;
    dataset._hydrationPending = false;
    return dataset;
  })();

  appState.hydrationLoads.set(datasetId, promise);
  try {
    await promise;
  } finally {
    appState.hydrationLoads.delete(datasetId);
  }
  return appState.datasetCache[datasetId];
}

async function ensureDatasetLoaded(datasetId, options = {}) {
  if (appState.datasetCache[datasetId]) {
    const cached = appState.datasetCache[datasetId];
    if (datasetId === "d1" && isMobileLiteD1Dataset(cached) && (options.requireHydrated || options.requireAllRows)) {
      await upgradeMobileD1Dataset(cached, options);
      return appState.datasetCache[datasetId];
    }
    if (datasetId === "player_career" && cached._profileOnlyInit && !options.profileOnly && cached._playerCareerChunked && !options.requireHydrated) {
      const initialYears = getPlayerCareerInitialYears(DATASETS.player_career);
      if (initialYears.length) {
        await loadPlayerCareerRowsForYears(cached, DATASETS.player_career, initialYears, options);
      }
      cached._profileOnlyInit = false;
    }
    if (datasetId === "player_career" && !cached._playerCareerInternationalOverlayApplied) {
      if (DATASETS.player_career.extraScripts?.length) {
        await Promise.all(DATASETS.player_career.extraScripts.map((entry) => loadScriptEntry(entry)));
      }
      applyPlayerCareerInternationalOverlay(cached, DATASETS.player_career);
    }
    if (options.requireHydrated) await ensureDatasetHydrated(datasetId);
    return cached;
  }

  if (datasetId === "nba_companion") {
    return ensureNbaCompanionDataset();
  }

  const config = DATASETS[datasetId];
  if (config.extraScripts?.length) {
    await Promise.all(config.extraScripts.map((entry) => loadScriptEntry(entry)));
  }
  if (options.requireHydrated && supportsDeferredHydration(config)) {
    await Promise.all((config.deferredExtraScripts || []).map((entry) => loadScriptEntry(entry)));
  }
  let usePlayerCareerChunks = datasetId === "player_career" && Boolean(config.yearManifestScript && config.yearChunkTemplate);
  let useGrassrootsChunks = datasetId === "grassroots" && Boolean(config.yearChunkTemplate);
  let useMobileLite = datasetId === "d1" && !options.requireHydrated && !options.requireAllRows && config.mobileDataScriptTemplate;
  const profileOnlyPlayerCareer = usePlayerCareerChunks && options.profileOnly && !options.requireHydrated && !options.requireAllRows;
  let rows;
  let availableYears = [];
  try {
    if (usePlayerCareerChunks) {
      if (config.yearManifestScript) {
        await loadScriptOnce(config.yearManifestScript);
      }
      applyPlayerCareerManifestConfig(config);
      availableYears = getPlayerCareerAvailableYears(config);
      const initialYears = getPlayerCareerInitialYears(config);
      const yearsToLoad = initialYears.length ? initialYears : availableYears;
      if (!yearsToLoad.length) {
        throw new Error("Player/Career year manifest did not provide any seasons");
      }
      rows = [];
      const initialDataset = { id: datasetId, rows, _loadedYears: new Set() };
      if (!profileOnlyPlayerCareer) {
        await loadPlayerCareerRowsForYears(initialDataset, config, yearsToLoad, options);
      }
      rows = initialDataset.rows;
      availableYears = availableYears.length
        ? availableYears
        : Array.from(new Set(rows.map((row) => getStringValue(row[config.yearColumn])).filter(Boolean))).sort(compareYears);
    } else if (useGrassrootsChunks) {
      if (config.yearManifestScript) {
        await loadScriptOnce(config.yearManifestScript);
      }
      availableYears = getGrassrootsAvailableYears(config);
      const initialYears = getGrassrootsInitialYears(config);
      const yearsToLoad = initialYears.length ? initialYears : availableYears;
      rows = [];
      const initialDataset = { id: datasetId, rows, _loadedYears: new Set() };
      if (yearsToLoad.length) {
        await loadGrassrootsRowsForYears(initialDataset, config, yearsToLoad, options);
      }
      rows = initialDataset.rows;
      availableYears = availableYears.length ? availableYears : Array.from(new Set(rows.map((row) => getStringValue(row[config.yearColumn])).filter(Boolean))).sort(compareYears);
    } else if (useMobileLite) {
      await loadScriptOnce(config.mobileDataManifestScript);
      availableYears = getD1AvailableYears(config);
      const initialYears = getD1InitialYears(config);
      if (!initialYears.length) {
        const csvText = await loadDatasetCsvPayload(config);
        rows = parseDatasetRows(csvText, datasetId, config, options);
        availableYears = Array.from(new Set(rows.map((row) => getStringValue(row[config.yearColumn])).filter(Boolean))).sort(compareYears);
      } else {
        rows = [];
        const initialDataset = { id: datasetId, rows, _loadedYears: new Set() };
        await loadD1RowsForYears(initialDataset, config, initialYears, options);
        rows = initialDataset.rows;
        availableYears = getD1AvailableYears(config);
      }
    } else {
      const csvText = await loadDatasetCsvPayload(config);
      rows = parseDatasetRows(csvText, datasetId, config, options);
    }
  } catch (error) {
    if (usePlayerCareerChunks) {
      if (config.dataScript) {
        console.warn("Player/Career year chunk load failed; falling back to the legacy payload.", error);
        usePlayerCareerChunks = false;
        const csvText = await loadDatasetCsvPayload(config);
        rows = parseDatasetRows(csvText, datasetId, config, options);
      } else {
        throw error;
      }
    } else if (useGrassrootsChunks) {
      rows = [];
      const fallbackDataset = { id: datasetId, rows, _loadedYears: new Set() };
      if (config.yearManifestScript) {
        await loadScriptOnce(config.yearManifestScript);
      }
      availableYears = getGrassrootsAvailableYears(config);
      const fallbackYears = availableYears.length ? availableYears : [];
      if (fallbackYears.length) {
        await loadGrassrootsRowsForYears(fallbackDataset, config, fallbackYears, options);
      }
      rows = fallbackDataset.rows;
    } else {
      useGrassrootsChunks = false;
      useMobileLite = false;
      const csvText = await loadDatasetCsvPayload({ ...config, chunkManifestScript: "", chunkTemplate: "" });
      rows = parseDatasetRows(csvText, datasetId, config, options);
    }
  }
  rows = finalizeDatasetRows(rows, config);
  const meta = buildDatasetMeta(rows, config);
  const loadedYears = new Set(Array.from(new Set(rows.map((row) => getStringValue(row[config.yearColumn])).filter(Boolean))));
  const deferredHydrationMode = supportsDeferredHydration(config) && !options.requireHydrated
    ? (config.deferredHydrationMode || "full")
    : "";
  const playerCareerHydrationPending = false;
  const grassrootsHydrationPending = useGrassrootsChunks && Array.isArray(availableYears) && availableYears.length
    ? availableYears.some((season) => !loadedYears.has(getStringValue(season)))
    : false;
  const deferHydration = Boolean(deferredHydrationMode) || grassrootsHydrationPending || playerCareerHydrationPending;
  const dataset = { ...config, rows, meta, _hydrated: !deferHydration, _hydrationPending: deferHydration };
  dataset._loadedYears = loadedYears;
  if (usePlayerCareerChunks) {
    dataset._playerCareerChunked = true;
    dataset._playerCareerSupplementChunked = isSupplementDeferredDataset(dataset);
    dataset.availableYears = availableYears.length ? availableYears : meta.years;
    dataset._profileOnlyInit = Boolean(profileOnlyPlayerCareer);
  }
  if (useGrassrootsChunks) {
    dataset._grassrootsChunked = true;
    dataset.availableYears = availableYears.length ? availableYears : meta.years;
  } else if (datasetId === "d1" && useMobileLite) {
    dataset._mobileLite = true;
    dataset.availableYears = availableYears.length ? availableYears : meta.years;
  }
  if (datasetId === "player_career" && !profileOnlyPlayerCareer) {
    applyPlayerCareerInternationalOverlay(dataset, config);
  }
  appState.datasetCache[datasetId] = dataset;
  if (options.requireHydrated) {
    if (usePlayerCareerChunks) {
      const hydratedYears = (Array.isArray(dataset.availableYears) && dataset.availableYears.length)
        ? dataset.availableYears
        : (Array.isArray(availableYears) && availableYears.length ? availableYears : meta.years);
      await ensureDatasetYearsLoaded(dataset, hydratedYears, options);
    } else if (useGrassrootsChunks) {
      const hydratedYears = (Array.isArray(dataset.availableYears) && dataset.availableYears.length)
        ? dataset.availableYears
        : (Array.isArray(availableYears) && availableYears.length ? availableYears : meta.years);
      await ensureDatasetYearsLoaded(dataset, hydratedYears, options);
    } else {
      await ensureDatasetHydrated(datasetId);
    }
  } else if (!deferHydration) {
    dataset._hydrated = true;
    dataset._hydrationPending = false;
  }
  return dataset;
}

async function ensureNbaCompanionDataset() {
  if (appState.datasetCache.nba_companion) {
    return appState.datasetCache.nba_companion;
  }

  const config = DATASETS.nba_companion;
  const [d1Dataset, nbaDataset] = await Promise.all([ensureDatasetLoaded("d1"), ensureDatasetLoaded("nba")]);
  const initialYears = getAvailableYears(d1Dataset).slice(0, NBA_COMPANION_INITIAL_D1_YEARS);
  await ensureDatasetYearsLoaded(d1Dataset, initialYears);
  const dataset = rebuildNbaCompanionDataset(null, d1Dataset, nbaDataset, config);
  appState.datasetCache.nba_companion = dataset;
  return dataset;
}

function rebuildNbaCompanionDataset(targetDataset, d1Dataset, nbaDataset, config = DATASETS.nba_companion) {
  const graph = buildStatusGraph([d1Dataset, nbaDataset]);
  const rows = buildNbaCompanionRows(d1Dataset, nbaDataset, graph);
  const meta = buildDatasetMeta(rows, config);
  const sourceLoadedYears = getLoadedYearSet(d1Dataset);
  const loadedYears = sourceLoadedYears.size
    ? new Set(sourceLoadedYears)
    : new Set(meta.years);
  const dataset = targetDataset || {};
  Object.assign(dataset, {
    ...config,
    rows,
    meta,
    availableYears: getAvailableYears(d1Dataset),
    _loadedYears: loadedYears,
    _nbaCompanionChunked: true,
    _hydrated: false,
    _hydrationPending: true,
    _rowVersion: (Number(targetDataset?._rowVersion) || 0) + 1,
  });
  return dataset;
}

async function loadNbaCompanionRowsForYears(dataset, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!dataset || !targetYears.length) return dataset;
  const d1Dataset = await ensureDatasetLoaded("d1");
  await ensureDatasetYearsLoaded(d1Dataset, targetYears, options);
  const nbaDataset = await ensureDatasetLoaded("nba");
  const rebuilt = rebuildNbaCompanionDataset(dataset, d1Dataset, nbaDataset, DATASETS.nba_companion);
  appState.datasetCache.nba_companion = rebuilt;
  return rebuilt;
}

function buildNbaCompanionRows(d1Dataset, nbaDataset, graph) {
  const d1Groups = getStatusGroups(d1Dataset);
  const nbaGroups = getStatusGroups(nbaDataset);
  const nbaCareerByNodeId = new Map();
  const nbaCareerByD1NodeId = new Map();
  nbaGroups.forEach((group) => {
    nbaCareerByNodeId.set(group.nodeId, aggregateCareerRows(nbaDataset, group.rows));
  });
  const nbaLookup = buildStatusLookupIndex(nbaGroups);
  populateDefenseRatePercentiles(Array.from(nbaCareerByNodeId.values()), "nba");
  d1Groups.forEach((group) => {
    const bestCareer = selectBestNbaCareerCandidate(group, nbaGroups, nbaCareerByNodeId, graph, nbaLookup);
    if (bestCareer) nbaCareerByD1NodeId.set(group.nodeId, bestCareer);
  });

  return d1Groups.flatMap((group) => {
    const nbaCareer = nbaCareerByD1NodeId.get(group.nodeId);
    if (!nbaCareer) return [];
    return (group.rows || []).map((row) => {
      const out = {};
      NBA_COMPANION_BASE_COLUMNS.forEach((column) => {
        if (row[column] !== undefined) out[column] = row[column];
      });
      NBA_COMPANION_COPY_MAP.forEach(([target, source]) => {
        out[target] = row[source];
      });
      NBA_COMPANION_NBA_COPY_MAP.forEach(([target, source]) => {
        out[target] = nbaCareer[source];
      });
      populateNbaCompanionNcaaShooting(out, row);
      return out;
    });
  });
}

function populateNbaCompanionNcaaShooting(out, row) {
  const twoPm = firstFinite(row?.two_p_made, row?.two_pm, Number.NaN);
  const twoPa = firstFinite(row?.two_p_att, row?.two_pa, Number.NaN);
  const threePm = firstFinite(row?.three_p_made, row?.three_pm, Number.NaN);
  const threePa = firstFinite(row?.three_p_att, row?.three_pa, Number.NaN);
  const fgm = firstFinite(row?.fgm, addIfFinite(twoPm, threePm), Number.NaN);
  const fga = firstFinite(row?.fga, addIfFinite(twoPa, threePa), Number.NaN);
  const ftm = firstFinite(row?.ftm, Number.NaN);
  const fta = firstFinite(row?.fta, Number.NaN);
  const points = firstFinite(row?.pts, weightedPointTotal(twoPm, threePm, ftm), Number.NaN);
  if (!Number.isFinite(out.ncaa_efg_pct)) {
    const efgPct = zeroSafeEfgPct(fgm, threePm, fga);
    if (efgPct !== "") out.ncaa_efg_pct = efgPct;
  }
  if (!Number.isFinite(out.ncaa_ts_pct)) {
    const tsPct = zeroSafeTsPct(points, fga, fta);
    if (tsPct !== "") out.ncaa_ts_pct = tsPct;
  }
}

function companionNbaCareerScore(row) {
  return firstFinite(row?.mp, 0) + (firstFinite(row?.ewins, 0) * 100);
}

function getCacheBustedScriptUrl(src) {
  const srcValue = getStringValue(src).trim();
  const useLocalOverride = LOCAL_DATA_ASSET_PREFIXES.some((prefix) => srcValue === prefix || srcValue.startsWith(prefix));
  const resolvedSrc = (/^data\//i.test(srcValue) && DATA_ASSET_BASE && !useLocalOverride)
    ? `${DATA_ASSET_BASE}/${srcValue.replace(/^\/+/, "").replace(/^data\//i, "")}`
    : srcValue;
  const url = new URL(resolvedSrc, window.location.href);
  url.searchParams.set("v", String(SCRIPT_CACHE_BUST));
  return url.href;
}

function getLocalCacheBustedScriptUrl(src) {
  const srcValue = getStringValue(src).trim().replace(/^\/+/, "");
  const url = new URL(srcValue, window.location.href);
  url.searchParams.set("v", String(SCRIPT_CACHE_BUST));
  return url.href;
}

function shouldUseLocalDataFallback(src) {
  const srcValue = getStringValue(src).trim();
  if (!/^data\//i.test(srcValue)) return false;
  if (!DATA_ASSET_BASE) return false;
  return !LOCAL_DATA_ASSET_PREFIXES.some((prefix) => srcValue === prefix || srcValue.startsWith(prefix));
}

function getChunkScriptPath(template, chunk) {
  if (!template || !chunk) return "";
  return template.replace("{chunk}", chunk);
}

function isMultipartScriptEntry(entry) {
  return Boolean(entry && typeof entry === "object" && entry.type === "multipart-script");
}

function getMultipartScriptPartPaths(entry) {
  if (!isMultipartScriptEntry(entry)) return [];
  const manifest = entry.manifestGlobalName ? window[entry.manifestGlobalName] : null;
  const parts = Array.isArray(manifest?.parts)
    ? manifest.parts
    : (Array.isArray(manifest) ? manifest : []);
  if (!parts.length || !entry.partTemplate) return [];
  return parts
    .map((part) => getStringValue(part).trim())
    .filter(Boolean)
    .map((part) => {
      if (/\.js$/i.test(part) && entry.partTemplate.includes("{part}.js")) {
        return entry.partTemplate.replace("{part}.js", part);
      }
      return entry.partTemplate.replace("{part}", part);
    });
}

function preloadScriptAssets(paths) {
  const fragment = document.createDocumentFragment();
  (paths || []).forEach((path) => {
    const src = getStringValue(path).trim();
    if (!src) return;
    const cacheBustedSrc = getCacheBustedScriptUrl(src);
    if (appState.scriptLoads.has(cacheBustedSrc) || appState.scriptPreloads.has(cacheBustedSrc)) return;
    appState.scriptPreloads.add(cacheBustedSrc);
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "script";
    link.href = cacheBustedSrc;
    fragment.appendChild(link);
  });
  if (fragment.childNodes.length) document.head.appendChild(fragment);
}

async function loadScriptsInOrder(paths) {
  const scriptPaths = (paths || []).map((path) => getStringValue(path).trim()).filter(Boolean);
  preloadScriptAssets(scriptPaths.slice(1));
  for (const path of scriptPaths) {
    await loadScriptOnce(path);
  }
}

async function loadScriptEntry(entry) {
  if (!entry) return;
  if (!isMultipartScriptEntry(entry)) {
    await loadScriptOnce(entry);
    return;
  }
  if (entry.manifestScript) {
    await loadScriptOnce(entry.manifestScript);
  }
  const partPaths = getMultipartScriptPartPaths(entry);
  if (!partPaths.length) {
    throw new Error(`Missing multipart script parts for ${entry.manifestGlobalName || entry.manifestScript || entry.partTemplate || "entry"}`);
  }
  await loadScriptsInOrder(partPaths);
}

function getChunkMultipartParts(config, chunk) {
  if (!config?.chunkMultipartGlobalName) return [];
  const partMap = window[config.chunkMultipartGlobalName];
  const values = partMap && Array.isArray(partMap[chunk]) ? partMap[chunk] : [];
  return values.map((value) => getStringValue(value).trim()).filter(Boolean);
}

function getChunkMultipartScriptPath(config, part) {
  if (!config?.chunkMultipartTemplate || !part) return "";
  return config.chunkMultipartTemplate.replace("{part}", part);
}

async function loadChunkValueFromMultipart(config, chunk) {
  const parts = getChunkMultipartParts(config, chunk);
  if (!parts.length) return "";
  const chunkStore = window[config.chunkStoreGlobalName] = window[config.chunkStoreGlobalName] || {};
  chunkStore[chunk] = "";
  await loadScriptsInOrder(parts.map((part) => getChunkMultipartScriptPath(config, part)));
  return getStringValue(chunkStore[chunk]);
}

async function loadChunkedCsvPayload(config) {
  if (!config?.chunkManifestScript || !config?.chunkTemplate || !config?.chunkOrderGlobalName || !config?.chunkStoreGlobalName) return "";
  await loadScriptOnce(config.chunkManifestScript);
  const chunkOrder = Array.isArray(window[config.chunkOrderGlobalName])
    ? window[config.chunkOrderGlobalName].map((value) => getStringValue(value).trim()).filter(Boolean)
    : [];
  if (!chunkOrder.length) return "";
  const payloads = await Promise.all(chunkOrder.map(async (chunk) => {
    const multipartParts = getChunkMultipartParts(config, chunk);
    if (multipartParts.length) {
      return loadChunkValueFromMultipart(config, chunk);
    }
    await loadScriptOnce(getChunkScriptPath(config.chunkTemplate, chunk));
    const chunkStore = window[config.chunkStoreGlobalName] || {};
    return getStringValue(chunkStore[chunk]);
  }));
  return payloads.join("");
}

async function loadDatasetCsvPayload(config) {
  if (config?.chunkManifestScript && config?.chunkTemplate) {
    const chunkedPayload = await loadChunkedCsvPayload(config);
    if (chunkedPayload) return chunkedPayload;
  }
  if (config?.multipartDataScript) {
    try {
      await loadScriptEntry(config.multipartDataScript);
      const rawPayload = window[config.globalName] ?? "";
      const csvText = Array.isArray(rawPayload) ? rawPayload.join("\n") : String(rawPayload);
      if (csvText) return csvText;
    } catch (error) {
      console.warn(`Falling back to direct dataset script for ${config.id || config.globalName}`, error);
    }
  }
  await loadScriptOnce(config.dataScript);
  const rawPayload = window[config.globalName] ?? "";
  return Array.isArray(rawPayload) ? rawPayload.join("\n") : String(rawPayload);
}

function loadScriptOnce(src) {
  const cacheBustedSrc = getCacheBustedScriptUrl(src);
  const localFallbackSrc = shouldUseLocalDataFallback(src) ? getLocalCacheBustedScriptUrl(src) : "";

  if (appState.scriptLoads.has(cacheBustedSrc)) {
    return appState.scriptLoads.get(cacheBustedSrc);
  }

  const appendScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error(`Failed to load ${url}`));
    };
    document.head.appendChild(script);
  });
  const promise = appendScript(cacheBustedSrc).catch(async (error) => {
    if (!localFallbackSrc || localFallbackSrc === cacheBustedSrc) throw error;
    console.warn(`Falling back to local asset for ${src}`, error);
    return appendScript(localFallbackSrc);
  });

  appState.scriptLoads.set(cacheBustedSrc, promise);
  if (localFallbackSrc) appState.scriptLoads.set(localFallbackSrc, promise);
  return promise;
}

function getD1BartSplitMode(state) {
  const value = getStringValue(state?.extraSelects?.d1_bart_split || D1_BART_SPLIT_DEFAULT).trim();
  return D1_BART_SPLIT_OPTIONS.some((option) => option.value === value) ? value : D1_BART_SPLIT_DEFAULT;
}

function getD1BartSplitLabel(split) {
  return D1_BART_SPLIT_OPTIONS.find((option) => option.value === split)?.label || "Season";
}

function getD1BartSplitYearsForState(dataset, state) {
  const selected = Array.from(state?.years || []).map((year) => getStringValue(year).trim()).filter(Boolean);
  if (selected.length) return selected.sort(compareYears);
  const latest = getLatestAvailableYear(dataset);
  return latest ? [latest] : [];
}

function getD1BartSplitManifest() {
  return window.D1_BART_SPLITS_MANIFEST || null;
}

function getD1BartSplitChunkStore(split) {
  const store = window.D1_BART_SPLIT_CHUNKS || {};
  return store[split] || {};
}

function isD1BartSplitReady(split, years) {
  if (split === D1_BART_SPLIT_DEFAULT) return true;
  const manifest = getD1BartSplitManifest();
  if (!manifest?.columns?.length) return false;
  const store = getD1BartSplitChunkStore(split);
  return (years || []).every((year) => store[getStringValue(year).trim()]);
}

async function loadD1BartSplit(split, years) {
  await loadScriptOnce(D1_BART_SPLITS_MANIFEST_SCRIPT);
  const manifest = getD1BartSplitManifest();
  if (!manifest?.chunks?.[split]) throw new Error(`Missing Bart split ${split}`);
  const store = getD1BartSplitChunkStore(split);
  const paths = (years || [])
    .map((year) => {
      const yearKey = getStringValue(year).trim();
      if (!yearKey || store[yearKey]) return "";
      return manifest.chunks[split][yearKey] || "";
    })
    .filter(Boolean);
  if (paths.length) await loadScriptsInOrder(paths);
}

function ensureD1BartSplitReadyForRender(dataset, state) {
  const split = dataset?.id === "d1" ? getD1BartSplitMode(state) : D1_BART_SPLIT_DEFAULT;
  appState.currentD1BartSplit = split;
  if (dataset?.id !== "d1" || split === D1_BART_SPLIT_DEFAULT) return true;
  const years = getD1BartSplitYearsForState(dataset, state);
  if (isD1BartSplitReady(split, years)) return true;
  const key = `${split}|${years.join("|")}`;
  if (appState.d1BartSplitLoadKey !== key) {
    appState.d1BartSplitLoadKey = key;
    Promise.resolve().then(async () => {
      try {
        elements.statusPill.textContent = `Loading D1 ${getD1BartSplitLabel(split)}`;
        await loadD1BartSplit(split, years);
        if (appState.currentId !== "d1") return;
        resetUiCaches(state);
        renderCurrentDataset();
      } catch (error) {
        if (appState.currentId === "d1") {
          elements.statusPill.textContent = "D1 Bart split failed";
          elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
        }
      } finally {
        if (appState.d1BartSplitLoadKey === key) appState.d1BartSplitLoadKey = "";
      }
    });
  }
  elements.statusPill.textContent = `Loading D1 ${getD1BartSplitLabel(split)}`;
  return false;
}

function isD1CareerMode(dataset, state) {
  return dataset?.id === "d1" && getStringValue(state?.extraSelects?.view_mode || "player") === "career";
}

function getD1CareerBundleRows(dataset) {
  if (!dataset || dataset.id !== "d1") return [];
  const csvText = getStringValue(window.D1_CAREER_CSV || "");
  if (!csvText) return [];
  const cacheKey = `${csvText.length}`;
  if (dataset._d1CareerBundleRowsKey === cacheKey) return dataset._d1CareerBundleRows || [];
  const parseConfig = { ...DATASETS.d1, minYear: null, precomputed: true };
  const rows = parseDatasetRows(csvText, "d1", parseConfig, { skipEnhance: true, skipEnrich: true });
  rows.forEach((row) => {
    tagDatasetRow(row, "d1");
    row.season = "Career";
    row.rank = null;
    row._careerAggregate = true;
    row._searchCacheKey = "";
    row._searchHaystack = "";
    row._colorBucketCacheKey = "";
    row._colorBucketValue = "";
  });
  dataset._d1CareerBundleRowsKey = cacheKey;
  dataset._d1CareerBundleRows = rows;
  return rows;
}

function ensureD1CareerRowsReadyForRender(dataset, state) {
  if (!isD1CareerMode(dataset, state)) return true;
  if (getD1CareerBundleRows(dataset).length) return true;
  if (!dataset._d1CareerBundleLoadPromise) {
    dataset._d1CareerBundleLoadPromise = Promise.resolve().then(async () => {
      try {
        elements.statusPill.textContent = "Loading D1 career";
        await loadScriptOnce(D1_CAREER_ROWS_SCRIPT);
        getD1CareerBundleRows(dataset);
        if (appState.currentId !== "d1") return;
        resetUiCaches(state);
        renderCurrentDataset();
      } catch (error) {
        if (appState.currentId === "d1") {
          elements.statusPill.textContent = "D1 career failed";
          elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
        }
      } finally {
        dataset._d1CareerBundleLoadPromise = null;
      }
    });
  }
  elements.statusPill.textContent = "Loading D1 career";
  return false;
}

function getD1BartSplitValue(row, column) {
  const split = appState.currentD1BartSplit || D1_BART_SPLIT_DEFAULT;
  if (split === D1_BART_SPLIT_DEFAULT || !row || !column) return undefined;
  const manifest = getD1BartSplitManifest();
  const columnIndex = Array.isArray(manifest?.columns) ? manifest.columns.indexOf(column) : -1;
  if (columnIndex < 0) return undefined;
  const year = getStringValue(row.season).trim();
  if (!year) return undefined;
  const chunk = getD1BartSplitChunkStore(split)[year];
  if (!chunk) return undefined;
  const playerId = getStringValue(row.player_id || row.source_player_id).trim();
  const values = playerId ? chunk[playerId] : null;
  if (!Array.isArray(values) || columnIndex >= values.length) return undefined;
  const value = values[columnIndex];
  return value === null || value === undefined || value === "" ? undefined : value;
}

function isCompactViewport() {
  return Boolean(window.matchMedia && window.matchMedia("(max-width: 860px)").matches);
}

function getAvailableYears(dataset) {
  if (Array.isArray(dataset?.availableYears) && dataset.availableYears.length) return dataset.availableYears;
  if (Array.isArray(dataset?.meta?.years) && dataset.meta.years.length) return dataset.meta.years;
  return [];
}

function sortAvailableYears(values) {
  return Array.from(new Set((values || []).map((year) => getStringValue(year).trim()).filter(Boolean))).sort(compareYears);
}

function getLatestAvailableYear(dataset) {
  const years = sortAvailableYears(getAvailableYears(dataset));
  return years[0] || "";
}

function getD1Manifest() {
  return window.D1_YEAR_MANIFEST || null;
}

function getD1AvailableYears(config) {
  const manifestYears = getD1Manifest()?.years;
  if (Array.isArray(manifestYears) && manifestYears.length) return sortAvailableYears(manifestYears);
  return sortAvailableYears(config?.availableYears);
}

function getD1InitialYears(config) {
  const years = getD1AvailableYears(config);
  if (!years.length) return [];
  const count = Math.max(1, Number(config?.mobileInitialYears) || 1);
  return years.slice(0, count);
}

function getD1YearChunkPath(config, season) {
  return buildYearChunkPath(config?.mobileDataScriptTemplate, season);
}

function getD1RequestedYears(dataset, state) {
  const availableYears = getAvailableYears(dataset).map((season) => getStringValue(season).trim()).filter(Boolean);
  const selectedYears = Array.from(state?.years || []).map((season) => getStringValue(season).trim()).filter(Boolean);
  if (!selectedYears.length) return availableYears;
  const availableSet = new Set(availableYears);
  return selectedYears.filter((season) => availableSet.has(season));
}

function getD1MissingSelectedYears(dataset, state) {
  if (!isMobileLiteD1Dataset(dataset)) return [];
  const loadedYears = getLoadedYearSet(dataset);
  return getD1RequestedYears(dataset, state).filter((season) => !loadedYears.has(getStringValue(season)));
}

function getD1PendingYearsKey(state) {
  return getStringValue(state?._d1LoadingYearsKey || state?._d1QueuedYearsKey);
}

function renderD1YearLoadProgress(dataset, state) {
  if (appState.currentId !== dataset?.id) return;
  if (document.activeElement === elements.searchInput) return;
  renderCurrentDataset();
}

function cancelD1SelectedYearLoad(state) {
  if (!state) return false;
  let canceled = false;
  if (state._d1LoadTimer) {
    window.clearTimeout(state._d1LoadTimer);
    state._d1LoadTimer = 0;
    canceled = true;
  }
  if (state._d1QueuedYearsKey) {
    state._d1QueuedYearsKey = "";
    canceled = true;
  }
  return canceled;
}

function scheduleD1SelectedYearLoad(dataset, state) {
  if (dataset?.id !== "d1" || !isMobileLiteD1Dataset(dataset) || !state) return false;
  const allowDuringSearch = Boolean(getStringValue(state.search).trim());
  const missingYears = sortD1BackgroundYears(getD1MissingSelectedYears(dataset, state), allowDuringSearch);
  const loadKey = missingYears.join("|");
  if (!missingYears.length) {
    const hadPending = Boolean(state._d1LoadTimer || state._d1QueuedYearsKey || state._d1LoadingYearsKey);
    cancelD1SelectedYearLoad(state);
    if (hadPending && !state._d1LoadingYearsKey) resetUiCaches(state);
    return false;
  }
  if (state._d1LoadingYearsKey) {
    state._d1QueuedYearsKey = loadKey;
    return true;
  }
  if (isInteractiveSearchActive(state) && !allowDuringSearch) {
    cancelD1SelectedYearLoad(state);
    return false;
  }
  state._d1QueuedYearsKey = loadKey;
  if (state._d1LoadTimer) window.clearTimeout(state._d1LoadTimer);
  const delayMs = allowDuringSearch ? D1_SEARCH_BACKGROUND_YEAR_LOAD_DELAY_MS : BACKGROUND_YEAR_LOAD_DELAY_MS;
  state._d1LoadTimer = window.setTimeout(async () => {
    state._d1LoadTimer = 0;
    if (isInteractiveSearchActive(state) && !allowDuringSearch) {
      state._d1QueuedYearsKey = "";
      return;
    }
    const allYearsToLoad = sortD1BackgroundYears(getD1MissingSelectedYears(dataset, state), allowDuringSearch);
    const yearsToLoad = allYearsToLoad.slice(0, D1_BACKGROUND_YEAR_BATCH_SIZE);
    const yearsKey = allYearsToLoad.join("|");
    state._d1QueuedYearsKey = "";
    if (!yearsToLoad.length) {
      resetUiCaches(state);
      renderD1YearLoadProgress(dataset, state);
      return;
    }
    state._d1LoadingYearsKey = yearsKey;
    renderD1YearLoadProgress(dataset, state);
    try {
      await ensureDatasetYearsLoaded(dataset, yearsToLoad, { background: true });
    } catch (error) {
      if (appState.currentId === dataset.id) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
      return;
    } finally {
      state._d1LoadingYearsKey = "";
    }
    resetUiCaches(state);
    await ensureStatusReadyAfterBackgroundLoad(dataset, state);
    const shouldContinueD1Load = Boolean(getD1PendingYearsKey(state))
      || !isInteractiveSearchActive(state)
      || Boolean(getStringValue(state.search).trim());
    if (shouldContinueD1Load && getD1MissingSelectedYears(dataset, state).length) {
      scheduleD1SelectedYearLoad(dataset, state);
      return;
    }
    renderD1YearLoadProgress(dataset, state);
  }, delayMs);
  return true;
}

function sortD1BackgroundYears(years, preferOlderYears = false) {
  const uniqueYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  return uniqueYears.sort(preferOlderYears ? ((left, right) => compareYears(right, left)) : compareYears);
}

function getLoadedYearSet(dataset) {
  if (!dataset._loadedYears) dataset._loadedYears = new Set();
  return dataset._loadedYears;
}

function buildYearChunkPath(template, season) {
  if (!template) return "";
  return template.replace("{season}", sanitizeDeferredSeasonKey(season));
}

function getGrassrootsManifest() {
  return window.GRASSROOTS_YEAR_MANIFEST || null;
}

function getGrassrootsAvailableYears(config) {
  const manifestYears = getGrassrootsManifest()?.years;
  if (Array.isArray(manifestYears) && manifestYears.length) return sortAvailableYears(manifestYears);
  return sortAvailableYears(config?.availableYears);
}

function getGrassrootsInitialYears(config) {
  const manifest = getGrassrootsManifest();
  const years = getGrassrootsAvailableYears(config);
  if (!years.length) return [];
  if (Array.isArray(manifest?.initialYears) && manifest.initialYears.length) return sortAvailableYears(manifest.initialYears);
  return years.slice(0, 1);
}

function getPlayerCareerManifest() {
  return window.PLAYER_CAREER_YEAR_MANIFEST || null;
}

function applyPlayerCareerManifestConfig(config) {
  if (!config || config.id !== "player_career") return config;
  const manifest = getPlayerCareerManifest();
  const deferredColumns = Array.isArray(manifest?.deferredColumns) ? manifest.deferredColumns.filter(Boolean) : [];
  if (deferredColumns.length) {
    config.deferredColumns = deferredColumns.slice();
  }
  return config;
}

function getPlayerCareerAvailableYears(config) {
  const manifestYears = getPlayerCareerManifest()?.years;
  if (Array.isArray(manifestYears) && manifestYears.length) return sortAvailableYears(manifestYears);
  return sortAvailableYears(config?.availableYears);
}

function getPlayerCareerInitialYears(config) {
  const manifest = getPlayerCareerManifest();
  const years = getPlayerCareerAvailableYears(config);
  if (!years.length) return [];
  if (Array.isArray(manifest?.initialYears) && manifest.initialYears.length) return manifest.initialYears;
  return years.slice(0, 1);
}

function getPlayerCareerYearChunkPath(config, season) {
  return buildYearChunkPath(config?.yearChunkTemplate, season);
}

function getPlayerCareerYearChunkPartPaths(config, season) {
  const manifest = getPlayerCareerManifest();
  const partKeys = Array.isArray(manifest?.multipartYearChunks?.[season])
    ? manifest.multipartYearChunks[season]
    : [];
  if (!partKeys.length || !config?.yearChunkMultipartTemplate) return [];
  return partKeys
    .map((part) => getStringValue(part).trim())
    .filter(Boolean)
    .map((part) => config.yearChunkMultipartTemplate.replace("{part}", part));
}

function getPlayerCareerSupplementChunkPartPaths(config, season) {
  const manifest = getPlayerCareerManifest();
  const partKeys = Array.isArray(manifest?.multipartSupplementChunks?.[season])
    ? manifest.multipartSupplementChunks[season]
    : [];
  if (!partKeys.length || !config?.deferredMultipartTemplate) return [];
  return partKeys
    .map((part) => getStringValue(part).trim())
    .filter(Boolean)
    .map((part) => config.deferredMultipartTemplate.replace("{part}", part));
}

function getPlayerCareerRequestedYears(dataset, state) {
  const availableYears = getPlayerCareerAvailableYears(dataset).map((season) => getStringValue(season).trim()).filter(Boolean);
  const selectedYears = Array.from(state?.years || []).map((season) => getStringValue(season).trim()).filter(Boolean);
  if (!selectedYears.length) return availableYears;
  const availableSet = new Set(availableYears);
  return selectedYears.filter((season) => availableSet.has(season));
}

function getPlayerCareerMissingSelectedYears(dataset, state) {
  const loadedYears = getLoadedYearSet(dataset);
  return getPlayerCareerRequestedYears(dataset, state).filter((season) => !loadedYears.has(getStringValue(season)));
}

function getPlayerCareerPendingYearsKey(state) {
  return getStringValue(state?._playerCareerLoadingYearsKey || state?._playerCareerQueuedYearsKey);
}

function renderPlayerCareerYearLoadProgress(dataset, state) {
  if (appState.currentId !== dataset?.id) return;
  if (document.activeElement === elements.searchInput) return;
  renderCurrentDataset();
}

function cancelPlayerCareerSelectedYearLoad(state) {
  if (!state) return false;
  let canceled = false;
  if (state._playerCareerLoadTimer) {
    window.clearTimeout(state._playerCareerLoadTimer);
    state._playerCareerLoadTimer = 0;
    canceled = true;
  }
  if (state._playerCareerQueuedYearsKey) {
    state._playerCareerQueuedYearsKey = "";
    canceled = true;
  }
  return canceled;
}

function schedulePlayerCareerSelectedYearLoad(dataset, state) {
  if (dataset?.id !== "player_career" || !dataset?._playerCareerChunked || !state) return false;
  const missingYears = getPlayerCareerMissingSelectedYears(dataset, state).sort(compareYears);
  const loadKey = missingYears.join("|");
  if (!missingYears.length) {
    const hadPending = Boolean(state._playerCareerLoadTimer || state._playerCareerQueuedYearsKey || state._playerCareerLoadingYearsKey);
    cancelPlayerCareerSelectedYearLoad(state);
    if (hadPending && !state._playerCareerLoadingYearsKey) resetUiCaches(state);
    return false;
  }
  if (state._playerCareerLoadingYearsKey) {
    state._playerCareerQueuedYearsKey = loadKey;
    return true;
  }
  if (isInteractiveSearchActive(state)) {
    cancelPlayerCareerSelectedYearLoad(state);
    return false;
  }
  state._playerCareerQueuedYearsKey = loadKey;
  if (state._playerCareerLoadTimer) window.clearTimeout(state._playerCareerLoadTimer);
  state._playerCareerLoadTimer = window.setTimeout(async () => {
    state._playerCareerLoadTimer = 0;
    if (isInteractiveSearchActive(state)) {
      state._playerCareerQueuedYearsKey = "";
      return;
    }
    const allYearsToLoad = getPlayerCareerMissingSelectedYears(dataset, state).sort(compareYears);
    const yearsToLoad = allYearsToLoad.slice(0, PLAYER_CAREER_BACKGROUND_YEAR_BATCH_SIZE);
    const yearsKey = allYearsToLoad.join("|");
    state._playerCareerQueuedYearsKey = "";
    if (!yearsToLoad.length) {
      resetUiCaches(state);
      renderPlayerCareerYearLoadProgress(dataset, state);
      return;
    }
    state._playerCareerLoadingYearsKey = yearsKey;
    renderPlayerCareerYearLoadProgress(dataset, state);
    try {
      await ensureDatasetYearsLoaded(dataset, yearsToLoad, { background: true });
    } catch (error) {
      if (appState.currentId === dataset.id) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
      return;
    } finally {
      state._playerCareerLoadingYearsKey = "";
    }
    resetUiCaches(state);
    await ensureStatusReadyAfterBackgroundLoad(dataset, state);
    if (!isInteractiveSearchActive(state) && getPlayerCareerMissingSelectedYears(dataset, state).length) {
      schedulePlayerCareerSelectedYearLoad(dataset, state);
      return;
    }
    renderPlayerCareerYearLoadProgress(dataset, state);
  }, BACKGROUND_YEAR_LOAD_DELAY_MS);
  return true;
}

function getGrassrootsCareerYears(dataset, state) {
  if (dataset?.id !== "grassroots" || state?.extraSelects?.view_mode !== "career") return getAvailableYears(dataset);
  return getAvailableYears(dataset);
}

function getGrassrootsYearChunkPath(config, season) {
  return buildYearChunkPath(config?.yearChunkTemplate, season);
}

function getGrassrootsMissingYears(dataset) {
  const availableYears = getGrassrootsAvailableYears(dataset);
  if (!availableYears.length) return [];
  const loadedYears = getLoadedYearSet(dataset);
  return availableYears.filter((season) => !loadedYears.has(getStringValue(season)));
}

function getGrassrootsRequestedYears(dataset, state) {
  const availableYears = getGrassrootsCareerYears(dataset, state).map((season) => getStringValue(season).trim()).filter(Boolean);
  const selectedYears = Array.from(state?.years || []).map((season) => getStringValue(season).trim()).filter(Boolean);
  const availableSet = new Set(availableYears);
  const requestedYears = selectedYears.length
    ? selectedYears.filter((season) => availableSet.has(season))
    : availableYears;
  const hasExplicitYearScope = Boolean(state?._yearSelectionTouched && selectedYears.length);
  if (dataset?.id === "grassroots" && getStringValue(state?.search).trim() && !hasExplicitYearScope) {
    getGrassrootsPriorityYears(state).forEach((year) => {
      if (availableSet.has(year) && !requestedYears.includes(year)) requestedYears.push(year);
    });
  }
  return requestedYears;
}

function getGrassrootsMissingSelectedYears(dataset, state) {
  const loadedYears = getLoadedYearSet(dataset);
  return getGrassrootsRequestedYears(dataset, state).filter((season) => !loadedYears.has(getStringValue(season)));
}

function renderGrassrootsYearLoadProgress(dataset, state) {
  if (appState.currentId !== dataset?.id) return;
  if (document.activeElement === elements.searchInput) return;
  renderCurrentDataset();
}

function getGrassrootsPendingYearsKey(state) {
  return getStringValue(state?._grassrootsLoadingYearsKey || state?._grassrootsQueuedYearsKey);
}

function cancelGrassrootsCareerYearLoad(state) {
  if (!state) return false;
  let canceled = false;
  if (state._grassrootsLoadTimer) {
    window.clearTimeout(state._grassrootsLoadTimer);
    state._grassrootsLoadTimer = 0;
    canceled = true;
  }
  if (state._grassrootsQueuedYearsKey) {
    state._grassrootsQueuedYearsKey = "";
    canceled = true;
  }
  return canceled;
}

function maybeStartGrassrootsCareerYearLoad(dataset, state) {
  if (dataset?.id !== "grassroots" || !dataset?._grassrootsChunked) return false;
  const allowDuringSearch = Boolean(getStringValue(state.search).trim());
  const priorityYears = getGrassrootsPriorityYears(state);
  const missingSelectedYears = getGrassrootsMissingSelectedYears(dataset, state);
  const missingYears = sortGrassrootsBackgroundYears(
    allowDuringSearch
      ? missingSelectedYears.filter((year) => priorityYears.includes(getStringValue(year).trim()))
      : missingSelectedYears,
    allowDuringSearch,
    priorityYears
  );
  const loadKey = missingYears.join("|");
  if (allowDuringSearch && !priorityYears.length) {
    cancelGrassrootsCareerYearLoad(state);
    return false;
  }
  if (!missingYears.length) {
    const hadPending = Boolean(state._grassrootsLoadTimer || state._grassrootsQueuedYearsKey || state._grassrootsLoadingYearsKey);
    cancelGrassrootsCareerYearLoad(state);
    if (hadPending && !state._grassrootsLoadingYearsKey) resetUiCaches(state);
    state._grassrootsFailedYearsKey = "";
    return false;
  }
  if (state._grassrootsFailedYearsKey === loadKey) return false;
  if (state._grassrootsLoadingYearsKey) {
    state._grassrootsQueuedYearsKey = loadKey;
    return true;
  }
  if (isInteractiveSearchActive(state) && !allowDuringSearch) {
    cancelGrassrootsCareerYearLoad(state);
    return false;
  }
  state._grassrootsQueuedYearsKey = loadKey;
  if (state._grassrootsLoadTimer) window.clearTimeout(state._grassrootsLoadTimer);
  const delayMs = allowDuringSearch ? GRASSROOTS_SEARCH_BACKGROUND_YEAR_LOAD_DELAY_MS : GRASSROOTS_BACKGROUND_YEAR_LOAD_DELAY_MS;
  state._grassrootsLoadTimer = window.setTimeout(async () => {
    state._grassrootsLoadTimer = 0;
    if (isInteractiveSearchActive(state) && !allowDuringSearch) {
      state._grassrootsQueuedYearsKey = "";
      return;
    }
    const nextPriorityYears = getGrassrootsPriorityYears(state);
    const nextMissingSelectedYears = getGrassrootsMissingSelectedYears(dataset, state);
    const allYearsToLoad = sortGrassrootsBackgroundYears(
      allowDuringSearch
        ? nextMissingSelectedYears.filter((year) => nextPriorityYears.includes(getStringValue(year).trim()))
        : nextMissingSelectedYears,
      allowDuringSearch,
      nextPriorityYears
    );
    const yearsToLoad = allYearsToLoad.slice(0, GRASSROOTS_BACKGROUND_YEAR_BATCH_SIZE);
    const yearsKey = allYearsToLoad.join("|");
    state._grassrootsQueuedYearsKey = "";
    if (!yearsToLoad.length) {
      resetUiCaches(state);
      renderGrassrootsYearLoadProgress(dataset, state);
      return;
    }
    state._grassrootsLoadingYearsKey = yearsKey;
    try {
      await ensureDatasetYearsLoaded(dataset, yearsToLoad, { background: true });
      state._grassrootsFailedYearsKey = "";
    } catch (error) {
      state._grassrootsFailedYearsKey = yearsKey;
      if (appState.currentId === dataset.id) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
    } finally {
      state._grassrootsLoadingYearsKey = "";
      resetUiCaches(state);
      await ensureStatusReadyAfterBackgroundLoad(dataset, state);
      const missingAfterLoad = getGrassrootsMissingSelectedYears(dataset, state);
      const priorityYears = getGrassrootsPriorityYears(state);
      const hasMissingPriorityYear = priorityYears.some((year) => missingAfterLoad.includes(year));
      const activeSearch = Boolean(getStringValue(state.search).trim());
      const shouldContinueGrassrootsLoad = Boolean(getGrassrootsPendingYearsKey(state))
        || !isInteractiveSearchActive(state)
        || (activeSearch && (!priorityYears.length || hasMissingPriorityYear));
      if (shouldContinueGrassrootsLoad && missingAfterLoad.length) {
        maybeStartGrassrootsCareerYearLoad(dataset, state);
      }
      renderGrassrootsYearLoadProgress(dataset, state);
    }
  }, delayMs);
  return true;
}

function sortGrassrootsBackgroundYears(years, preferOlderYears = false, priorityYears = []) {
  const uniqueYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  const priority = new Set((priorityYears || []).map((year) => getStringValue(year).trim()).filter(Boolean));
  return uniqueYears.sort((left, right) => {
    const leftPriority = priority.has(left);
    const rightPriority = priority.has(right);
    if (leftPriority !== rightPriority) return leftPriority ? -1 : 1;
    return preferOlderYears ? compareYears(right, left) : compareYears(left, right);
  });
}

function getGrassrootsPriorityYears(state) {
  return getStringValue(state?._grassrootsPriorityYearsKey).split("|").filter(Boolean);
}

function getGrassrootsSearchYearFilterKey(dataset, state) {
  if (dataset?.id !== "grassroots" || !getStringValue(state?.search).trim()) return "";
  return getGrassrootsPriorityYears(state).join("|");
}

function getEffectiveYearFilterSet(dataset, state) {
  const years = new Set(state?.years || []);
  if (dataset?.id === "grassroots" && getStringValue(state?.search).trim()) {
    if (years.size && state?._yearSelectionTouched) return years;
    getGrassrootsPriorityYears(state).forEach((year) => {
      if (year) years.add(year);
    });
  }
  return years;
}

function scheduleGrassrootsSearchYearPrefetch(dataset, state) {
  if (dataset?.id !== "grassroots" || !dataset?._grassrootsChunked || !state) return false;
  const searchKey = parseSearchTerms(state.search).join("||");
  if (!searchKey) {
    if (state._grassrootsSearchYearPrefetchTimer) {
      window.clearTimeout(state._grassrootsSearchYearPrefetchTimer);
      state._grassrootsSearchYearPrefetchTimer = 0;
    }
    state._grassrootsSearchYearPrefetchKey = "";
    state._grassrootsPriorityYearsKey = "";
    return false;
  }
  const requestKey = [
    searchKey,
    Array.from(state.years || []).sort(compareYears).join("|"),
    Number(dataset?._rowVersion) || 0,
  ].join("||");
  if (state._grassrootsSearchYearPrefetchKey === requestKey) return Boolean(getGrassrootsPendingYearsKey(state));
  state._grassrootsSearchYearPrefetchKey = requestKey;
  if (state._grassrootsSearchYearPrefetchTimer) window.clearTimeout(state._grassrootsSearchYearPrefetchTimer);
  state._grassrootsSearchYearPrefetchTimer = window.setTimeout(async () => {
    state._grassrootsSearchYearPrefetchTimer = 0;
    if (appState.currentId !== dataset.id) return;
    if (state._grassrootsSearchYearPrefetchKey !== requestKey) return;
    try {
      const index = await loadGrassrootsPlayerYearIndex();
      if (appState.currentId !== dataset.id) return;
      if (state._grassrootsSearchYearPrefetchKey !== requestKey) return;
      const priorityYears = getGrassrootsIndexedSearchYears(dataset, state, index);
      state._grassrootsPriorityYearsKey = priorityYears.join("|");
      if (priorityYears.length && state._grassrootsLoadTimer) {
        window.clearTimeout(state._grassrootsLoadTimer);
        state._grassrootsLoadTimer = 0;
        state._grassrootsQueuedYearsKey = "";
      }
      maybeStartGrassrootsCareerYearLoad(dataset, state);
      renderResultsOnly(dataset, state);
    } catch (error) {
      if (appState.currentId !== dataset.id) return;
      state._grassrootsPriorityYearsKey = "";
      maybeStartGrassrootsCareerYearLoad(dataset, state);
    }
  }, 220);
  return true;
}

async function loadGrassrootsPlayerYearIndex() {
  if (window.GRASSROOTS_PLAYER_YEAR_INDEX) return window.GRASSROOTS_PLAYER_YEAR_INDEX;
  if (!appState.grassrootsPlayerYearIndexLoad) {
    appState.grassrootsPlayerYearIndexLoad = loadScriptOnce(GRASSROOTS_PLAYER_YEAR_INDEX_SCRIPT)
      .then(() => window.GRASSROOTS_PLAYER_YEAR_INDEX || {});
  }
  return appState.grassrootsPlayerYearIndexLoad;
}

function getGrassrootsIndexedSearchYears(dataset, state, index) {
  if (!index) return [];
  const availableYears = getGrassrootsCareerYears(dataset, state).map((season) => getStringValue(season).trim()).filter(Boolean);
  const availableSet = new Set(availableYears);
  const selectedYears = Array.from(state?.years || []).map((season) => getStringValue(season).trim()).filter((season) => availableSet.has(season));
  const selected = getStringValue(state?.search).trim() && !(state?._yearSelectionTouched && selectedYears.length)
    ? new Set(availableYears)
    : new Set(getGrassrootsRequestedYears(dataset, state));
  const loaded = getLoadedYearSet(dataset);
  const candidateYears = new Set();
  getGrassrootsSpecificSearchPrefetchClauses(state.search).forEach((clause) => {
    getGrassrootsIndexedYearsForClause(index, clause).forEach((year) => {
      if (selected.size && !selected.has(year)) return;
      if (loaded.has(year)) return;
      candidateYears.add(year);
    });
  });
  return Array.from(candidateYears).sort((left, right) => compareYears(right, left));
}

function getGrassrootsSpecificSearchPrefetchClauses(search) {
  return parseSearchTerms(search).filter((clause) => {
    const phrase = normalizeGrassrootsSearchValue(clause);
    if (!phrase) return false;
    const tokens = phrase.split(" ").filter(Boolean);
    if (!tokens.length) return false;
    if (tokens.length >= 2) {
      return tokens.some((token) => token.length >= GRASSROOTS_SEARCH_PREFETCH_MIN_TOKEN_LENGTH);
    }
    return tokens[0].length >= GRASSROOTS_SEARCH_PREFETCH_MIN_TOKEN_LENGTH;
  });
}

function getGrassrootsIndexedYearsForClause(index, clause) {
  const phrase = normalizeGrassrootsSearchValue(clause);
  if (!phrase) return [];
  const phraseTokens = phrase.split(" ").filter(Boolean);
  const direct = index[phrase];
  if (Array.isArray(direct) && direct.length) {
    if (phraseTokens.length === 1 && direct.length > GRASSROOTS_SEARCH_PREFETCH_MAX_SINGLE_TOKEN_YEARS) return [];
    return direct;
  }
  if (phraseTokens.length >= 2) {
    const prefixYears = getGrassrootsIndexedPrefixYears(index, phrase);
    return prefixYears;
  }
  const tokens = phraseTokens.filter((token) => token.length >= 3);
  if (!tokens.length) return [];
  let matches = null;
  tokens.forEach((token) => {
    const years = new Set(index[token] || []);
    if (!years.size) {
      matches = new Set();
      return;
    }
    matches = matches == null
      ? years
      : new Set(Array.from(matches).filter((year) => years.has(year)));
  });
  return Array.from(matches || []);
}

function getGrassrootsIndexedPrefixYears(index, phrase) {
  const keys = getGrassrootsSearchIndexKeys(index);
  if (!keys.length || phrase.length < GRASSROOTS_SEARCH_PREFETCH_MIN_TOKEN_LENGTH) return [];
  const years = new Set();
  let matchedKeys = 0;
  for (const key of keys) {
    if (!key.startsWith(phrase)) continue;
    matchedKeys += 1;
    if (matchedKeys > GRASSROOTS_SEARCH_PREFETCH_MAX_PREFIX_KEYS) return [];
    (index[key] || []).forEach((year) => years.add(year));
    if (years.size > GRASSROOTS_SEARCH_PREFETCH_MAX_PREFIX_YEARS) return [];
  }
  return Array.from(years);
}

function getGrassrootsSearchIndexKeys(index) {
  if (!index) return [];
  if (!Object.prototype.hasOwnProperty.call(index, "__grassrootsSearchKeys")) {
    Object.defineProperty(index, "__grassrootsSearchKeys", {
      configurable: false,
      enumerable: false,
      value: Object.keys(index),
    });
  }
  return index.__grassrootsSearchKeys || [];
}

function getGrassrootsDisplayScope(dataset, state) {
  if (dataset?.id !== "grassroots" || !state) return "";
  const viewMode = getStringValue(state?.extraSelects?.view_mode || "player");
  const setting = normalizeKey(state?.extraSelects?.setting || "all");
  const hasSearch = Boolean(getStringValue(state?.search).trim());
  if (viewMode === "career" && !hasSearch) {
    if (setting === "aau") return "career_aau";
  }
  return "";
}

function getGrassrootsScopeScriptPath(config, scope) {
  if (!config?.grassrootsScopeScriptTemplate || !scope) return "";
  return config.grassrootsScopeScriptTemplate.replace("{scope}", scope);
}

function getGrassrootsScopeBundleParts(scope) {
  const partMap = window.GRASSROOTS_SCOPE_BUNDLE_PARTS || {};
  const parts = partMap[scope];
  return Array.isArray(parts) ? parts : [];
}

function getGrassrootsActiveScopeRows(dataset, state) {
  if (dataset?.id !== "grassroots") return Array.isArray(dataset?.rows) ? dataset.rows : [];
  const scope = getGrassrootsDisplayScope(dataset, state);
  if (!scope) return Array.isArray(dataset?.rows) ? dataset.rows : [];
  return dataset?._grassrootsScopeRows?.get(scope) || [];
}

function getGrassrootsViewSnapshots(dataset) {
  if (!dataset) return new Map();
  if (!dataset._grassrootsViewSnapshots) dataset._grassrootsViewSnapshots = new Map();
  return dataset._grassrootsViewSnapshots;
}

function cloneGrassrootsRangeFilters(filters) {
  const cloned = {};
  Object.entries(filters || {}).forEach(([column, filter]) => {
    cloned[column] = {
      min: getStringValue(filter?.min),
      max: getStringValue(filter?.max),
    };
  });
  return cloned;
}

function snapshotGrassrootsUiState(state) {
  return {
    search: getStringValue(state?.search || ""),
    team: getStringValue(state?.team || "all"),
    years: Array.from(state?.years || []),
    sortBy: getStringValue(state?.sortBy || ""),
    sortDir: getStringValue(state?.sortDir || "desc"),
    sortMetric: getStringValue(state?.sortMetric || "value"),
    sortBlankMode: getStringValue(state?.sortBlankMode || "last"),
    yearSelectionTouched: Boolean(state?._yearSelectionTouched),
    extraSelects: { ...(state?.extraSelects || {}) },
    multiSelects: Object.fromEntries(Object.entries(state?.multiSelects || {}).map(([filterId, selected]) => [filterId, Array.from(selected || [])])),
    visibleColumns: { ...(state?.visibleColumns || {}) },
    groupUnitModes: { ...(state?.groupUnitModes || {}) },
    demoFilters: cloneGrassrootsRangeFilters(state?.demoFilters),
    numericFilters: cloneGrassrootsRangeFilters(state?.numericFilters),
    groupCycles: { ...(state?.groupCycles || {}) },
    collapsedGroups: { ...(state?.collapsedGroups || {}) },
    visibleCount: Number.isFinite(state?.visibleCount) ? state.visibleCount : LOAD_STEP,
  };
}

function restoreGrassrootsUiState(dataset, snapshot, viewMode) {
  const state = createInitialUiState(dataset);
  const availableYears = getAvailableYears(dataset).map((year) => getStringValue(year).trim()).filter(Boolean);
  state.extraSelects.view_mode = viewMode;
  if (snapshot) {
    state.search = getStringValue(snapshot.search || "");
    state.team = getStringValue(snapshot.team || "all");
    state.years = new Set(Array.isArray(snapshot.years) ? snapshot.years : []);
    state.sortBy = getStringValue(snapshot.sortBy || state.sortBy);
    state.sortDir = getStringValue(snapshot.sortDir || state.sortDir);
    state.sortMetric = getStringValue(snapshot.sortMetric || state.sortMetric || "value");
    state.sortBlankMode = getStringValue(snapshot.sortBlankMode || state.sortBlankMode);
    state._yearSelectionTouched = Boolean(snapshot.yearSelectionTouched);
    state.extraSelects = { ...state.extraSelects, ...(snapshot.extraSelects || {}) };
    state.extraSelects.view_mode = viewMode;
    state.multiSelects = Object.fromEntries((dataset.multiFilters || []).map((filter) => [
      filter.id,
      new Set(Array.isArray(snapshot.multiSelects?.[filter.id]) ? snapshot.multiSelects[filter.id] : []),
    ]));
    state.visibleColumns = { ...state.visibleColumns, ...(snapshot.visibleColumns || {}) };
    state.groupUnitModes = { ...state.groupUnitModes, ...(snapshot.groupUnitModes || {}) };
    state.demoFilters = cloneGrassrootsRangeFilters(snapshot.demoFilters);
    state.numericFilters = cloneGrassrootsRangeFilters(snapshot.numericFilters);
    state.groupCycles = Object.fromEntries((dataset.meta?.groups || []).map((group) => [
      group.id,
      Number.isFinite(snapshot.groupCycles?.[group.id]) ? snapshot.groupCycles[group.id] : 0,
    ]));
    state.collapsedGroups = Object.fromEntries((dataset.meta?.groups || []).map((group) => [
      group.id,
      Boolean(snapshot.collapsedGroups?.[group.id]),
    ]));
    state.visibleCount = Number.isFinite(snapshot.visibleCount) ? snapshot.visibleCount : LOAD_STEP;
    if (viewMode === "career") {
      const selectedYears = Array.from(state.years || []).map((year) => getStringValue(year).trim()).filter((year) => year && availableYears.includes(year));
      state.years = new Set(
        selectedYears.length
          ? selectedYears
          : availableYears
      );
    }
  } else if (viewMode === "career") {
    state.years = new Set(availableYears);
  }
  resetUiCaches(state);
  return state;
}

function switchGrassrootsViewMode(dataset, state, nextMode) {
  if (!dataset || dataset.id !== "grassroots" || !state) return state;
  const currentMode = getStringValue(state.extraSelects?.view_mode || "player");
  if (currentMode === nextMode) return state;
  const snapshots = getGrassrootsViewSnapshots(dataset);
  const currentSnapshot = snapshotGrassrootsUiState(state);
  snapshots.set(currentMode, currentSnapshot);
  const nextSnapshot = snapshots.get(nextMode) || currentSnapshot;
  const nextState = restoreGrassrootsUiState(dataset, nextSnapshot, nextMode);
  appState.uiState[dataset.id] = nextState;
  return nextState;
}

function switchDatasetViewMode(dataset, state, nextMode) {
  if (!dataset || !state) return state;
  if (dataset.id === "grassroots") return switchGrassrootsViewMode(dataset, state, nextMode);
  const currentMode = getStringValue(state.extraSelects?.view_mode || "player");
  if (currentMode === nextMode) return state;
  if (dataset.id === "team_coach") {
    state.extraSelects.view_mode = nextMode;
    if (nextMode === "career") state.years = new Set(getAvailableYears(dataset));
    resetUiCaches(state);
    return state;
  }
  const nextState = createInitialUiState(dataset);
  nextState.extraSelects.view_mode = nextMode;
  appState.uiState[dataset.id] = nextState;
  return nextState;
}

async function ensureGrassrootsScopeRowsLoaded(dataset, state, scope) {
  if (!dataset || dataset.id !== "grassroots" || !scope) return dataset;
  if (!dataset._grassrootsScopeRows) dataset._grassrootsScopeRows = new Map();
  if (!dataset._grassrootsScopeLoads) dataset._grassrootsScopeLoads = new Map();
  if (dataset._grassrootsScopeRows.has(scope)) return dataset;
  if (dataset._grassrootsScopeLoads.has(scope)) {
    await dataset._grassrootsScopeLoads.get(scope);
    return dataset;
  }

  const promise = (async () => {
    const src = getGrassrootsScopeScriptPath(dataset, scope);
    if (!src) throw new Error(`Missing grassroots scope bundle for ${scope}`);
    const rows = await loadGrassrootsScopeRows(dataset, scope, src);
    dataset._grassrootsScopeRows.set(scope, rows);
  })();

  dataset._grassrootsScopeLoads.set(scope, promise);
  try {
    await promise;
  } finally {
    dataset._grassrootsScopeLoads.delete(scope);
  }
  return dataset;
}

async function loadGrassrootsScopeRows(dataset, scope, src) {
  if (canUseGrassrootsScopeWorker()) {
    try {
      const rows = await loadGrassrootsScopeRowsInWorker(scope, src);
      normalizeGrassrootsScopeRows(rows);
      return scope && scope.startsWith("career_") ? dedupeGrassrootsCareerScopeRows(dataset, rows) : rows;
    } catch (error) {
      console.warn(`Grassroots worker load failed for ${scope}; falling back to main thread parsing.`, error);
    }
  }

  await loadScriptOnce(src);
  const partPaths = getGrassrootsScopeBundleParts(scope);
  for (const partPath of partPaths) {
    await loadScriptOnce(partPath);
  }
  const bundleMap = window.GRASSROOTS_SCOPE_CSV_BUNDLES || {};
  const csvText = bundleMap[scope];
  if (!csvText) throw new Error(`Missing grassroots scope rows for ${scope}`);
  const rows = parseDatasetRows(csvText, dataset.id, dataset, { skipEnhance: true, skipEnrich: true });
  normalizeGrassrootsScopeRows(rows);
  return scope && scope.startsWith("career_") ? dedupeGrassrootsCareerScopeRows(dataset, rows) : rows;
}

function normalizeGrassrootsScopeRows(rows) {
  (rows || []).forEach((row) => {
    row.circuit = normalizeGrassrootsCircuitLabel(row.circuit);
    row.setting = getGrassrootsSettingForCircuit(row.circuit);
  });
}

function canUseGrassrootsScopeWorker() {
  return typeof Worker !== "undefined" && typeof Blob !== "undefined" && typeof URL !== "undefined" && typeof URL.createObjectURL === "function";
}

function getGrassrootsScopeWorkerUrl() {
  if (appState.grassrootsScopeWorkerUrl) return appState.grassrootsScopeWorkerUrl;
  const workerSource = `
    self.onmessage = async (event) => {
      const { scope, src, cacheBust, appBaseUrl } = event.data || {};
      try {
        if (!scope || !src) throw new Error("Missing scope load parameters.");
        importScripts(src);
        const partMap = self.GRASSROOTS_SCOPE_BUNDLE_PARTS || {};
        const partPaths = Array.isArray(partMap[scope]) ? partMap[scope] : [];
        for (const partSrc of partPaths) {
          importScripts(cacheBustedWorkerUrl(partSrc, cacheBust, src, appBaseUrl));
        }
        const bundleMap = self.GRASSROOTS_SCOPE_CSV_BUNDLES || {};
        const csvText = bundleMap[scope];
        if (!csvText) throw new Error("Missing grassroots scope rows for " + scope);
        const rows = parseGrassrootsScopeCsv(csvText);
        self.postMessage({ ok: true, scope, rows });
      } catch (error) {
        self.postMessage({ ok: false, scope, error: String(error && error.message ? error.message : error) });
      }
    };

    function cacheBustedWorkerUrl(src, cacheBust, baseUrl, appBaseUrl) {
      try {
        const rawSrc = String(src || "");
        const urlBase = /^data\\//i.test(rawSrc) && appBaseUrl ? appBaseUrl : baseUrl;
        const url = new URL(rawSrc, urlBase);
        if (url.origin === self.location.origin && cacheBust) {
          url.searchParams.set("v", String(cacheBust));
        }
        return url.href;
      } catch (error) {
        return src;
      }
    }

    function parseGrassrootsScopeCsv(text) {
      const table = parseCsv(text);
      if (!table.length) return [];
      const headers = table[0];
      return table.slice(1).map((cells) => {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = coerceCell(cells[index]);
        });
        return row;
      });
    }

    function parseCsv(text) {
      const rows = [];
      if (!text) return rows;
      let current = "";
      let row = [];
      let inQuotes = false;

      for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        const next = text[index + 1];
        if (char === '"') {
          if (inQuotes && next === '"') {
            current += '"';
            index += 1;
          } else {
            inQuotes = !inQuotes;
          }
          continue;
        }
        if (!inQuotes && char === ",") {
          row.push(current);
          current = "";
          continue;
        }
        if (!inQuotes && (char === '\\n' || char === '\\r')) {
          if (char === '\\r' && next === '\\n') index += 1;
          row.push(current);
          current = "";
          if (row.some((cell) => cell !== "")) rows.push(row);
          row = [];
          continue;
        }
        current += char;
      }

      row.push(current);
      if (row.some((cell) => cell !== "")) rows.push(row);
      return rows;
    }

    function coerceCell(value) {
      const text = String(value ?? "").trim();
      if (!text) return "";
      if (/^[-+]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][-+]?\\d+)?$/.test(text)) {
        const number = Number(text);
        if (!Number.isNaN(number)) return number;
      }
      return text;
    }
  `;
  const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  appState.grassrootsScopeWorkerUrl = workerUrl;
  return workerUrl;
}

function loadGrassrootsScopeRowsInWorker(scope, src) {
  return new Promise((resolve, reject) => {
  const worker = new Worker(getGrassrootsScopeWorkerUrl());
  const cleanup = () => worker.terminate();
  const cacheBustedSrc = getCacheBustedScriptUrl(src);
  const appBaseUrl = window.location.href;
  worker.onmessage = (event) => {
      const data = event.data || {};
      if (data.ok) {
        cleanup();
        resolve(Array.isArray(data.rows) ? data.rows : []);
        return;
      }
      cleanup();
      reject(new Error(data.error || `Failed to load grassroots scope ${scope}`));
    };
    worker.onerror = (error) => {
      cleanup();
      reject(error instanceof ErrorEvent ? new Error(error.message) : new Error(String(error?.message || error)));
    };
    worker.postMessage({ scope, src: cacheBustedSrc, cacheBust: SCRIPT_CACHE_BUST, appBaseUrl });
  });
}

function scheduleGrassrootsScopePrefetch(dataset, scope) {
  if (!dataset || dataset.id !== "grassroots" || !scope) return;
  if (dataset._grassrootsScopeRows?.has(scope) || dataset._grassrootsScopeLoads?.has(scope)) return;
  const prefetchKey = `${dataset.id}|${scope}`;
  if (appState.grassrootsScopePrefetches.has(prefetchKey)) return;
  appState.grassrootsScopePrefetches.add(prefetchKey);
  const run = async () => {
    try {
      await ensureGrassrootsScopeRowsLoaded(dataset, appState.uiState[dataset.id] || null, scope);
    } catch (error) {
      console.warn(`Grassroots prefetch failed for ${scope}.`, error);
    }
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 250 });
    return;
  }
  window.setTimeout(run, 0);
}

function startGrassrootsScopeLoad(dataset, state, scope) {
  if (!dataset || dataset.id !== "grassroots" || !state || !scope) return;
  if (dataset._grassrootsScopeRows?.has(scope)) {
    state._grassrootsLoadingScope = "";
    resetUiCaches(state);
    renderCurrentDataset();
    return;
  }
  state._grassrootsLoadingScope = scope;
  renderCurrentDataset();
  const nextState = state;
  Promise.resolve().then(async () => {
    try {
      await ensureGrassrootsScopeRowsLoaded(dataset, nextState, scope);
    } catch (error) {
      if (appState.currentId === dataset.id) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
      return;
    } finally {
      if (nextState._grassrootsLoadingScope === scope) {
        nextState._grassrootsLoadingScope = "";
      }
    }
    resetUiCaches(nextState);
    if (appState.currentId === dataset.id && getGrassrootsDisplayScope(dataset, nextState) === scope) {
      renderCurrentDataset();
    }
  });
}

function syncGrassrootsCareerYears(dataset, state, active) {
  if (dataset?.id !== "grassroots" || !state) return;
  const allYears = getAvailableYears(dataset);
  if (active) {
    if (!state._grassrootsPlayerYears) state._grassrootsPlayerYears = new Set(state.years);
    state.years = new Set(allYears.length ? allYears : Array.from(state.years || []));
    return;
  }
  if (state._grassrootsPlayerYears) {
    state.years = new Set(state._grassrootsPlayerYears);
  }
}

function renderDatasetLoadingState(config) {
  elements.searchInput.value = "";
  elements.searchInput.disabled = false;
  elements.searchInput.removeAttribute("list");
  if (elements.searchSuggestions) elements.searchSuggestions.innerHTML = "";
  const searchLabel = document.querySelector('label[for="searchInput"]');
  if (searchLabel) searchLabel.textContent = getDatasetSearchLabelText(config);
  elements.searchInput.placeholder = getDatasetSearchPlaceholder(config);
  const globalSearchLabel = document.querySelector('label[for="globalPlayerSearchInput"]');
  if (globalSearchLabel) globalSearchLabel.textContent = getDatasetSearchEntityLabel(config);
  if (elements.globalPlayerSearchInput) {
    elements.globalPlayerSearchInput.placeholder = config?.id === "team_coach" ? "Find coach" : "Find player";
  }
  elements.yearPills.innerHTML = "";
  elements.yearQuickSelect.innerHTML = '<option value="all">All years</option>';
  elements.teamSelect.innerHTML = '<option value="all">Loading...</option>';
  elements.teamSelect.disabled = true;
  if (elements.viewModeFilters) elements.viewModeFilters.innerHTML = "";
  elements.singleSelectFilters.innerHTML = "";
  elements.multiSelectFilters.innerHTML = "";
  elements.demoToggles.innerHTML = "";
  elements.demoToggles.dataset.shellKey = "";
  elements.demoRangeFilters.innerHTML = "";
  elements.statGroups.innerHTML = "";
  elements.finderQuery.textContent = "";
  elements.finderTitle.textContent = `Loading ${escapeHtml(config?.navLabel || "dataset")}`;
  elements.tableLegend.innerHTML = "";
  elements.tableLegend.dataset.legendKey = "";
  elements.loadMoreBtn.hidden = true;
  elements.statsTable.innerHTML = `<thead id="statsTableHead"></thead><tbody id="statsTableBody"><tr class="empty-state"><td colspan="1">Loading ${escapeHtml(config?.navLabel || "dataset")}...</td></tr></tbody>`;
  elements.statsTable.dataset.shellKey = "";
  elements.statsTableHead = document.getElementById("statsTableHead");
  elements.statsTableBody = document.getElementById("statsTableBody");
}

function syncPlayerCareerSearchYears(dataset, state) {
  if (dataset?.id !== "player_career" || !state) return false;
  return schedulePlayerCareerSelectedYearLoad(dataset, state);
}

function schedulePlayerCareerSearchPrefetch(dataset, state) {
  if (dataset?.id !== "player_career" || !state) return;
  const sourceRows = state?.extraSelects?.view_mode === "career"
    ? getStaticCareerColorRows(dataset)
    : dataset?.rows;
  scheduleSearchWarmup(dataset, sourceRows, `${state?.extraSelects?.view_mode || "player"}|${Number(dataset?._rowVersion) || 0}`);
}

function setsMatch(left, right) {
  if (!left && !right) return true;
  if (!left || !right || left.size !== right.size) return false;
  for (const value of left) {
    if (!right.has(value)) return false;
  }
  return true;
}

function comparePlayerCareerDefaultRows(left, right) {
  const leftMin = firstFinite(left?.min, left?.mp, Number.NaN);
  const rightMin = firstFinite(right?.min, right?.mp, Number.NaN);
  const leftBlank = !Number.isFinite(leftMin);
  const rightBlank = !Number.isFinite(rightMin);
  if (leftBlank && rightBlank) return comparePlayerCareerDefaultRowTies(left, right);
  if (leftBlank) return 1;
  if (rightBlank) return -1;
  if (rightMin !== leftMin) return rightMin - leftMin;
  return comparePlayerCareerDefaultRowTies(left, right);
}

function comparePlayerCareerDefaultRowTies(left, right) {
  const seasonDiff = compareYears(getStringValue(left?.season), getStringValue(right?.season));
  if (seasonDiff) return seasonDiff;
  const playerDiff = getStringValue(left?.player_name).localeCompare(getStringValue(right?.player_name), undefined, { numeric: true, sensitivity: "base" });
  if (playerDiff) return playerDiff;
  return getStringValue(left?.team_name).localeCompare(getStringValue(right?.team_name), undefined, { numeric: true, sensitivity: "base" });
}

function mergeSortedPlayerCareerRows(existingRows, appendedRows) {
  const baseRows = Array.isArray(existingRows) ? existingRows : [];
  const nextRows = Array.isArray(appendedRows) ? appendedRows : [];
  if (!baseRows.length) return nextRows.slice();
  if (!nextRows.length) return baseRows.slice();
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < baseRows.length && rightIndex < nextRows.length) {
    if (comparePlayerCareerDefaultRows(baseRows[leftIndex], nextRows[rightIndex]) <= 0) {
      merged.push(baseRows[leftIndex]);
      leftIndex += 1;
    } else {
      merged.push(nextRows[rightIndex]);
      rightIndex += 1;
    }
  }
  while (leftIndex < baseRows.length) {
    merged.push(baseRows[leftIndex]);
    leftIndex += 1;
  }
  while (rightIndex < nextRows.length) {
    merged.push(nextRows[rightIndex]);
    rightIndex += 1;
  }
  return merged;
}

function getPlayerCareerInternationalOverlayCsv() {
  return getStringValue(window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_CSV || "");
}

function getPlayerCareerInternationalOverlayRows(config) {
  if (Array.isArray(window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_ROWS)) {
    return window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_ROWS;
  }
  const csvText = getPlayerCareerInternationalOverlayCsv();
  if (!csvText) {
    window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_ROWS = [];
    return window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_ROWS;
  }
  const rows = parseDatasetRows(csvText, "player_career", config, { skipEnhance: true, skipEnrich: true });
  rows.forEach((row) => {
    preparePlayerCareerLoadedRow(row);
    normalizePercentLikeColumns(row, "player_career");
  });
  window.PLAYER_CAREER_INTERNATIONAL_OVERLAY_ROWS = rows;
  return rows;
}

function normalizeInternationalLeagueAlias(value) {
  const key = normalizeKey(value);
  if (!key) return "";
  if (/^(?:aus|australian|australia) nbl$/.test(key) || /^nbl australia$/.test(key) || /^national basketball league australia$/.test(key)) return "australian nbl";
  if (/^(?:italian )?lega a$/.test(key) || /^italy lega a$/.test(key) || /^serie a italy$/.test(key)) return "lega a";
  if (/^(?:spanish )?acb$/.test(key) || /^liga acb$/.test(key) || /^liga endesa$/.test(key)) return "acb";
  if (/\bg bbl\b/.test(key) || /\bgerman bbl\b/.test(key)) return "german bbl";
  if ((/\bliga aba\b/.test(key) || /\baba\b/.test(key)) && /\badriatic league\b/.test(key)) return "liga aba";
  if (/^liga aba$/.test(key)) return "liga aba";
  return key;
}

function getPlayerCareerInternationalLeagueKeys(row) {
  const keys = new Set();
  [
    row?.competition_label,
    row?.league_name,
    row?.league,
    row?.competition_key,
  ].forEach((value) => {
    const raw = normalizeKey(value);
    const alias = normalizeInternationalLeagueAlias(value);
    if (alias) keys.add(alias);
    if (raw) keys.add(raw);
  });
  return Array.from(keys);
}

function getPlayerCareerInternationalTeamKeys(row) {
  return Array.from(new Set([
    row?.team_full,
    row?.team_name,
    row?.team_code,
    row?.team_alias,
    row?.team_alias_all,
  ].flatMap((value) => getStringValue(value).split(/[|/]+/)).map((value) => normalizeKey(value)).filter(Boolean)));
}

function getPlayerCareerInternationalPlayerKeys(row) {
  const realgmId = getStringValue(row?.realgm_player_id).trim()
    || (getStringValue(row?.canonical_player_id).trim().match(/^rgm_(.+)$/i)?.[1] || "")
    || getStringValue(row?.source_player_id).trim();
  const nameKey = normalizeNameKey(row?.player_name || row?.player);
  if (realgmId) return [`rgm:${realgmId}`];
  return nameKey ? [`name:${nameKey}`] : [];
}

function isPlayerCareerInternationalRow(row) {
  const source = normalizeKey(row?.source_dataset);
  const level = normalizeKey(row?.competition_level);
  const path = normalizeKey(row?.career_path);
  return source === "realgm international extraction" || level === "international" || path === "international";
}

function getPlayerCareerInternationalCanonicalLeagueKey(row) {
  return normalizeInternationalLeagueAlias(row?.competition_label || row?.league_name || row?.league || row?.competition_key || "");
}

function getPlayerCareerInternationalCanonicalTeamKey(row) {
  return normalizeKey(
    row?.team_full
    || row?.team_alias_all
    || row?.team_name
    || row?.team_abbrev
    || row?.team_alias
    || row?.team_code
    || ""
  );
}

function getPlayerCareerInternationalCanonicalPlayerKey(row) {
  return getPlayerCareerInternationalPlayerKeys(row)[0] || "";
}

function getPlayerCareerInternationalRowKeys(row) {
  if (!row || !isPlayerCareerInternationalRow(row)) return [];
  const season = getStringValue(row.season).trim();
  const leagueKeys = getPlayerCareerInternationalLeagueKeys(row);
  const teamKeys = getPlayerCareerInternationalTeamKeys(row);
  const playerKeys = getPlayerCareerInternationalPlayerKeys(row);
  if (!season || !leagueKeys.length || !teamKeys.length || !playerKeys.length) return [];
  const keys = [];
  leagueKeys.forEach((leagueKey) => {
    teamKeys.forEach((teamKey) => {
      playerKeys.forEach((playerKey) => {
        keys.push(`${season}|${leagueKey}|${teamKey}|${playerKey}`);
      });
    });
  });
  return Array.from(new Set(keys));
}

function getPlayerCareerInternationalPrimaryKey(row) {
  if (!row || !isPlayerCareerInternationalRow(row)) return "";
  const season = getStringValue(row.season).trim();
  const leagueKey = getPlayerCareerInternationalCanonicalLeagueKey(row);
  const teamKey = getPlayerCareerInternationalCanonicalTeamKey(row);
  const playerKey = getPlayerCareerInternationalCanonicalPlayerKey(row);
  if (!season || !leagueKey || !teamKey || !playerKey) return "";
  return `${season}|${leagueKey}|${teamKey}|${playerKey}`;
}

function hasPlayerCareerMergeValue(value) {
  return !(value == null || value === "" || (typeof value === "number" && !Number.isFinite(value)));
}

function mergePlayerCareerInternationalFields(target, source) {
  if (!target || !source) return target;
  Object.entries(source).forEach(([column, value]) => {
    if (column.startsWith("_") || !hasPlayerCareerMergeValue(value)) return;
    if (!hasPlayerCareerMergeValue(target[column])) {
      target[column] = value;
    }
  });
  preparePlayerCareerLoadedRow(target);
  normalizePercentLikeColumns(target, "player_career");
  return target;
}

function dedupePlayerCareerInternationalRows(dataset) {
  if (!Array.isArray(dataset?.rows) || !dataset.rows.length) return 0;
  const grouped = new Map();
  dataset.rows.forEach((row) => {
    const key = getPlayerCareerInternationalPrimaryKey(row);
    if (!key) return;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  if (![...grouped.values()].some((group) => group.length > 1)) return 0;

  const bestByKey = new Map();
  grouped.forEach((rows, key) => {
    const best = rows.slice().sort((left, right) => duplicateRowScore(right) - duplicateRowScore(left))[0];
    rows.forEach((row) => {
      if (row !== best) mergePlayerCareerInternationalFields(best, row);
    });
    bestByKey.set(key, best);
  });

  const emittedKeys = new Set();
  const nextRows = [];
  dataset.rows.forEach((row) => {
    const key = getPlayerCareerInternationalPrimaryKey(row);
    if (!key) {
      nextRows.push(row);
      return;
    }
    if (emittedKeys.has(key)) return;
    nextRows.push(bestByKey.get(key) || row);
    emittedKeys.add(key);
  });
  const removed = dataset.rows.length - nextRows.length;
  dataset.rows = nextRows;
  return removed;
}

function applyPlayerCareerInternationalOverlay(dataset, config) {
  if (!dataset || dataset.id !== "player_career" || dataset._playerCareerInternationalOverlayApplied) return dataset;
  const overlayRows = getPlayerCareerInternationalOverlayRows(config);
  if (!overlayRows.length) {
    dataset._playerCareerInternationalOverlayApplied = true;
    return dataset;
  }

  const existingByKey = new Map();
  (dataset.rows || []).forEach((row) => {
    getPlayerCareerInternationalRowKeys(row).forEach((key) => {
      if (!existingByKey.has(key)) existingByKey.set(key, row);
    });
  });

  const rowsToAppend = [];
  overlayRows.forEach((row) => {
    const keys = getPlayerCareerInternationalRowKeys(row);
    const existing = keys.map((key) => existingByKey.get(key)).find(Boolean);
    if (existing) {
      mergePlayerCareerInternationalFields(existing, row);
      keys.forEach((key) => existingByKey.set(key, existing));
      return;
    }
    rowsToAppend.push(row);
    keys.forEach((key) => existingByKey.set(key, row));
  });

  if (rowsToAppend.length) {
    const sortedAppend = rowsToAppend.slice().sort(comparePlayerCareerDefaultRows);
    dataset.rows = config?.sortBy === "min" && config?.sortDir === "desc"
      ? mergeSortedPlayerCareerRows(dataset.rows, sortedAppend)
      : (Array.isArray(dataset.rows) ? dataset.rows.concat(rowsToAppend) : rowsToAppend.slice());
  }
  dedupePlayerCareerInternationalRows(dataset);
  dataset.meta = buildDatasetMeta(dataset.rows, config);
  if (Array.isArray(dataset.availableYears)) {
    dataset.availableYears = Array.from(new Set([...dataset.availableYears, ...dataset.meta.years])).sort(compareYears);
  }
  dataset._playerCareerInternationalOverlayApplied = true;
  dataset._rowVersion = (dataset._rowVersion || 0) + 1;
  invalidateDatasetDerivedCaches(dataset.id);
  return dataset;
}

async function loadPlayerCareerRowsForYears(dataset, config, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!dataset || !targetYears.length) return dataset;
  if (!dataset._playerCareerRowLoads) dataset._playerCareerRowLoads = new Map();
  if (!dataset._playerCareerRowsByYear) dataset._playerCareerRowsByYear = new Map();
  if (!dataset._loadedYears) dataset._loadedYears = new Set();

  const rowsToAppend = [];
  const pendingYears = targetYears
    .filter((season) => !dataset._loadedYears.has(season))
    .sort(compareYears);
  if (!pendingYears.length) return dataset;

  for (let index = 0; index < pendingYears.length; index += PLAYER_CAREER_YEAR_LOAD_BATCH_SIZE) {
    const batchYears = pendingYears.slice(index, index + PLAYER_CAREER_YEAR_LOAD_BATCH_SIZE);
    batchYears.forEach((season) => {
      if (dataset._loadedYears.has(season) || dataset._playerCareerRowLoads.has(season)) return;
      const promise = (async () => {
        const partPaths = getPlayerCareerYearChunkPartPaths(config, season);
        const chunkMap = window.PLAYER_CAREER_YEAR_CSV_CHUNKS = window.PLAYER_CAREER_YEAR_CSV_CHUNKS || {};
        if (partPaths.length) {
          if (!chunkMap[season]) {
            chunkMap[season] = "";
            await loadScriptsInOrder(partPaths);
          }
        } else {
          const src = getPlayerCareerYearChunkPath(config, season);
          if (!src) throw new Error(`Missing Player/Career chunk for ${season}`);
          await loadScriptOnce(src);
        }
        const csvText = chunkMap[season];
        if (!csvText) throw new Error(`Missing Player/Career rows for ${season}`);
        return parseDatasetRows(csvText, dataset.id, config, { ...options, skipEnhance: true });
      })();
      dataset._playerCareerRowLoads.set(season, promise);
    });

    const loadedChunks = await Promise.all(batchYears.map(async (season) => ({
      season,
      rows: await dataset._playerCareerRowLoads.get(season),
    })));
    loadedChunks.sort((left, right) => compareYears(left.season, right.season));
    loadedChunks.forEach(({ season, rows }) => {
      rowsToAppend.push(...rows);
      dataset._playerCareerRowsByYear.set(season, rows);
      dataset._loadedYears.add(season);
      dataset._playerCareerRowLoads.delete(season);
    });
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }

  if (!rowsToAppend.length) return dataset;
  rowsToAppend.forEach((row) => {
    preparePlayerCareerLoadedRow(row);
    normalizePercentLikeColumns(row, dataset.id);
  });
  const currentRows = Array.isArray(dataset.rows) ? dataset.rows : [];
  const sortedAppendedRows = rowsToAppend.slice().sort(comparePlayerCareerDefaultRows);
  dataset.rows = config?.sortBy === "min" && config?.sortDir === "desc"
    ? mergeSortedPlayerCareerRows(currentRows, sortedAppendedRows)
    : finalizeDatasetRows(currentRows.concat(rowsToAppend), config);
  const removedInternationalDuplicates = dedupePlayerCareerInternationalRows(dataset);
  if (removedInternationalDuplicates) {
    dataset.meta = buildDatasetMeta(dataset.rows, config);
  } else {
    updateDatasetMetaForAppendedRows(dataset, config, rowsToAppend);
  }
  dataset._rowVersion = (dataset._rowVersion || 0) + 1;
  invalidateDatasetDerivedCaches(dataset.id);
  dataset._hydrationPending = false;
  dataset._hydrated = true;
  return dataset;
}

async function loadPlayerCareerSupplementRowsForYears(dataset, config, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!dataset || !targetYears.length) return dataset;
  if (!dataset._playerCareerSupplementLoads) dataset._playerCareerSupplementLoads = new Map();
  if (!dataset._playerCareerRowsByYear) dataset._playerCareerRowsByYear = new Map();
  if (!dataset._loadedSupplementYears) dataset._loadedSupplementYears = new Set();

  const pendingYears = targetYears
    .filter((season) => !dataset._loadedSupplementYears.has(season))
    .sort(compareYears);
  if (!pendingYears.length) return dataset;

  const missingBaseYears = pendingYears.filter((season) => !dataset._loadedYears?.has(season));
  if (missingBaseYears.length) {
    await loadPlayerCareerRowsForYears(dataset, config, missingBaseYears, options);
  }

  for (let index = 0; index < pendingYears.length; index += PLAYER_CAREER_YEAR_LOAD_BATCH_SIZE) {
    const batchYears = pendingYears.slice(index, index + PLAYER_CAREER_YEAR_LOAD_BATCH_SIZE);
    batchYears.forEach((season) => {
      if (dataset._playerCareerSupplementLoads.has(season)) return;
      const promise = (async () => {
        const partPaths = getPlayerCareerSupplementChunkPartPaths(config, season);
        const chunkMap = window.PLAYER_CAREER_YEAR_SUPPLEMENT_CSV_CHUNKS = window.PLAYER_CAREER_YEAR_SUPPLEMENT_CSV_CHUNKS || {};
        if (partPaths.length) {
          chunkMap[season] = "";
          await loadScriptsInOrder(partPaths);
        } else {
          const src = buildDeferredSupplementScriptPath(config, season);
          if (!src) return [];
          await loadScriptOnce(src);
        }
        const csvText = chunkMap[season];
        if (!csvText) return [];
        return parseDatasetRows(csvText, dataset.id, config, { ...options, skipEnhance: true });
      })();
      dataset._playerCareerSupplementLoads.set(season, promise);
    });

    const loadedSupplements = await Promise.all(batchYears.map(async (season) => ({
      season,
      rows: await dataset._playerCareerSupplementLoads.get(season),
    })));
    loadedSupplements.sort((left, right) => compareYears(left.season, right.season));
    loadedSupplements.forEach(({ season, rows: supplementRows }) => {
      const yearRows = dataset._playerCareerRowsByYear.get(season) || [];
      if (supplementRows.length && yearRows.length) {
        const rowCount = Math.min(yearRows.length, supplementRows.length);
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
          Object.assign(yearRows[rowIndex], supplementRows[rowIndex]);
          preparePlayerCareerLoadedRow(yearRows[rowIndex]);
          normalizePercentLikeColumns(yearRows[rowIndex], dataset.id);
        }
        if (rowCount !== yearRows.length || rowCount !== supplementRows.length) {
          console.warn(`Player/Career supplement row mismatch for ${season}: base=${yearRows.length}, supplement=${supplementRows.length}`);
        }
      }
      dataset._loadedSupplementYears.add(season);
      dataset._playerCareerSupplementLoads.delete(season);
    });
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }

  dataset._rowVersion = (dataset._rowVersion || 0) + 1;
  invalidateDatasetDerivedCaches(dataset.id);
  dataset._supplementScriptsLoaded = (dataset._loadedSupplementYears?.size || 0) > 0;
  return dataset;
}

function updateDatasetMetaForAppendedRows(dataset, config, rows) {
  if (!dataset?.meta || !Array.isArray(rows) || !rows.length) return;
  const teamColumn = config?.teamColumn;
  const yearColumn = config?.yearColumn;
  const nextTeams = new Set(dataset.meta.teams || []);
  const nextYears = new Set(dataset.meta.years || []);
  rows.forEach((row) => {
    const team = teamColumn ? getStringValue(row?.[teamColumn]).trim() : "";
    const year = yearColumn ? getStringValue(row?.[yearColumn]).trim() : "";
    if (team) nextTeams.add(team);
    if (year && (!config?.minYear || extractLeadingYear(year) >= config.minYear)) {
      nextYears.add(year);
    }
  });
  dataset.meta.teams = Array.from(nextTeams).sort((left, right) => left.localeCompare(right));
  dataset.meta.years = Array.from(nextYears).sort(compareYears);
  dataset.meta.latestYear = dataset.meta.years[0] || "";
}

async function loadGrassrootsRowsForYears(dataset, config, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!targetYears.length) return dataset;
  if (!dataset._grassrootsRowLoads) dataset._grassrootsRowLoads = new Map();
  if (!dataset._loadedYears) dataset._loadedYears = new Set();

  const rowsToAppend = [];
  const pendingYears = targetYears.filter((season) => !dataset._loadedYears.has(season));
  if (!pendingYears.length) return dataset;

  pendingYears.forEach((season) => {
    if (dataset._grassrootsRowLoads.has(season)) return;
    const promise = (async () => {
      const src = getGrassrootsYearChunkPath(config, season);
      if (!src) throw new Error(`Missing grassroots chunk for ${season}`);
      await loadScriptOnce(src);
      const chunkMap = window.GRASSROOTS_YEAR_CSV_CHUNKS || {};
      const csvText = chunkMap[season];
      if (!csvText) throw new Error(`Missing grassroots rows for ${season}`);
      return parseDatasetRows(csvText, dataset.id, config, options);
    })();
    dataset._grassrootsRowLoads.set(season, promise);
  });

  const loadedChunks = await Promise.all(pendingYears.map(async (season) => ({
    season,
    rows: await dataset._grassrootsRowLoads.get(season),
  })));
  loadedChunks.sort((left, right) => compareYears(left.season, right.season));
  loadedChunks.forEach(({ season, rows }) => {
    rowsToAppend.push(...rows);
    dataset._loadedYears.add(season);
    dataset._grassrootsRowLoads.delete(season);
  });

  if (!rowsToAppend.length) return dataset;
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  const isIncrementalDataset = Boolean(dataset.meta);
  const nextRows = isIncrementalDataset ? finalizeGrassrootsIncrementalRows(rowsToAppend, config) : rowsToAppend;
  dataset.rows = dataset.rows.concat(nextRows);
  if (isIncrementalDataset) dataset.meta = buildDatasetMeta(dataset.rows, config);
  dataset._rowVersion = (dataset._rowVersion || 0) + 1;
  invalidateDatasetDerivedCaches(dataset.id);
  dataset._hydrationPending = getGrassrootsMissingYears(dataset).length > 0;
  dataset._hydrated = !dataset._hydrationPending;
  return dataset;
}

function finalizeGrassrootsIncrementalRows(rows, config) {
  let finalized = dedupeDatasetRows(rows || [], config?.id || "grassroots");
  backfillGrassrootsPlayerAttributes(finalized);
  finalized.forEach((row) => populateImpactMetrics(row));
  applyCalculatedRatings(finalized, config?.id || "grassroots");
  finalized.forEach((row) => populateImpactMetrics(row));
  applyPerNormalization(finalized, config?.id || "grassroots");
  populateDefenseRatePercentiles(finalized, config?.id || "grassroots");
  return finalized;
}

function parseDatasetRows(csvText, datasetId, config, options = {}) {
  const rows = parseCSV(csvText);
  let normalized = normalizeRows(rows, datasetId, options);
  if (config.minYear) {
    normalized = normalized.filter((row) => {
      const season = Number(normalizeSeasonValue(row[config.yearColumn]));
      return Number.isFinite(season) ? season >= config.minYear : true;
    });
  }
  const deferredHydrationMode = supportsDeferredHydration(config) && !options.requireHydrated
    ? (config.deferredHydrationMode || "full")
    : "";
  if (!config.precomputed && deferredHydrationMode !== "full" && !options.skipEnrich) {
    enrichDatasetRows(normalized, datasetId);
    normalized.forEach((row) => normalizePercentLikeColumns(row, datasetId));
  }
  return normalized;
}

function finalizeDatasetRows(rows, config) {
  if (config?.skipPostProcessing) return rows;
  return reapplyDatasetPostProcessing(rows, config);
}

function isMobileLiteD1Dataset(dataset) {
  return Boolean(dataset?.id === "d1" && dataset?._mobileLite);
}

async function loadD1RowsForYears(dataset, config, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!targetYears.length) return dataset;
  if (!dataset._d1RowLoads) dataset._d1RowLoads = new Map();
  if (!dataset._loadedYears) dataset._loadedYears = new Set();

  const rowsToAppend = [];
  for (const season of targetYears) {
    if (dataset._loadedYears.has(season)) continue;
    if (!dataset._d1RowLoads.has(season)) {
      const promise = (async () => {
        const src = getD1YearChunkPath(config, season);
        if (!src) throw new Error(`Missing D1 chunk for ${season}`);
        await loadScriptOnce(src);
        const chunkMap = window.D1_YEAR_CSV_CHUNKS || {};
        const csvText = chunkMap[season];
        if (!csvText) throw new Error(`Missing D1 rows for ${season}`);
        return parseDatasetRows(csvText, dataset.id, config, options);
      })();
      dataset._d1RowLoads.set(season, promise);
    }
    const rows = await dataset._d1RowLoads.get(season);
    rowsToAppend.push(...rows);
    dataset._loadedYears.add(season);
    dataset._d1RowLoads.delete(season);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }

  if (!rowsToAppend.length) return dataset;
  const mergedRows = dataset.rows.concat(rowsToAppend);
  dataset.rows = finalizeDatasetRows(mergedRows, config);
  dataset.meta = buildDatasetMeta(dataset.rows, config);
  dataset._rowVersion = (dataset._rowVersion || 0) + 1;
  invalidateDatasetDerivedCaches(dataset.id);
  return dataset;
}

async function upgradeMobileD1Dataset(dataset, options = {}) {
  if (!dataset || dataset.id !== "d1" || !dataset._mobileLite) return dataset;
  const config = DATASETS.d1;
  if (config.extraScripts?.length) {
    await Promise.all(config.extraScripts.map((entry) => loadScriptEntry(entry)));
  }
  if (options.requireHydrated && supportsDeferredHydration(config)) {
    await Promise.all((config.deferredExtraScripts || []).map((entry) => loadScriptEntry(entry)));
  }
  const csvText = await loadDatasetCsvPayload(config);
  const rows = finalizeDatasetRows(parseDatasetRows(csvText, dataset.id, config, options), config);
  dataset.rows = rows;
  dataset.meta = buildDatasetMeta(rows, config);
  dataset.availableYears = getD1AvailableYears(config);
  dataset._loadedYears = new Set(dataset.meta.years);
  dataset._mobileLite = false;
  dataset._hydrated = Boolean(!supportsDeferredHydration(config) || options.requireHydrated);
  dataset._hydrationPending = supportsDeferredHydration(config) && !options.requireHydrated;
  invalidateDatasetDerivedCaches(dataset.id);
  return dataset;
}

async function ensureDatasetYearsLoaded(dataset, years, options = {}) {
  const targetYears = Array.from(new Set((years || []).map((season) => getStringValue(season).trim()).filter(Boolean)));
  if (!dataset || !targetYears.length) return dataset;
  const missingYears = targetYears.filter((season) => !getLoadedYearSet(dataset).has(season));
  if (!missingYears.length) return dataset;
  if (dataset.id === "player_career" && dataset._playerCareerChunked) {
    if (!options.background) elements.statusPill.textContent = `Loading ${dataset.navLabel} ${missingYears.join(" / ")}`;
    await loadPlayerCareerRowsForYears(dataset, DATASETS.player_career, missingYears, options);
    return dataset;
  }
  if (dataset.id === "grassroots" && dataset._grassrootsChunked) {
    if (!options.background) elements.statusPill.textContent = `Loading ${dataset.navLabel} ${missingYears.join(" / ")}`;
    await loadGrassrootsRowsForYears(dataset, DATASETS.grassroots, missingYears, options);
    return dataset;
  }
  if (dataset.id === "nba_companion" && dataset._nbaCompanionChunked) {
    if (!options.background) elements.statusPill.textContent = `Loading ${dataset.navLabel} ${missingYears.join(" / ")}`;
    await loadNbaCompanionRowsForYears(dataset, missingYears, options);
    return dataset;
  }
  if (dataset.id !== "d1" || !isMobileLiteD1Dataset(dataset)) return dataset;
  if (!options.background) elements.statusPill.textContent = `Loading ${dataset.navLabel} ${missingYears.join(" / ")}`;
  await loadD1RowsForYears(dataset, DATASETS.d1, missingYears, options);
  return dataset;
}

function enrichDatasetRows(rows, datasetId) {
  tagDatasetRows(rows, datasetId);
  if (datasetId === "d1") enrichD1Rows(rows);
  if (datasetId === "naia") enrichNaiaRows(rows);
  if (datasetId === "d1") backfillTeamSeasonFields(rows, ["conference", "coach"]);
  if (datasetId === "naia") backfillTeamSeasonFields(rows, ["conference", "division"]);
  if (datasetId === "naia") backfillNaiaDivisionFromConference(rows);
  if (datasetId === "juco") backfillTeamSeasonFields(rows, ["conference", "region"]);
  finalizeCategoricalFields(rows, datasetId);
}

function tagDatasetRows(rows, datasetId) {
  (rows || []).forEach((row) => tagDatasetRow(row, datasetId));
}

function tagDatasetRow(row, datasetId) {
  if (!row || typeof row !== "object" || !datasetId) return row;
  Object.defineProperty(row, "_datasetId", {
    value: datasetId,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  return row;
}

async function ensureStatusAnnotations(datasetId) {
  if (datasetId === "nba") return;
  if (appState.statusLoads.has(datasetId)) {
    await appState.statusLoads.get(datasetId);
    return;
  }

  const promise = (async () => {
    const source = appState.datasetCache[datasetId] || await ensureDatasetLoaded(datasetId);
    if (datasetId === "grassroots") {
      await resolveGrassrootsStatusIdentities(source);
    }
    const staticIndex = await loadStatusRealgmIndex();
    resolveStaticStatusIdentitiesForDataset(source, staticIndex);
    if (applyStatusFlagsFromStaticRealgmIndex(source, staticIndex)) {
      applyDirectStatusFlags(source.rows, source.id);
      source._rowVersion = (source._rowVersion || 0) + 1;
      invalidateDatasetDerivedCaches(source.id);
      source._statusAnnotated = true;
      return;
    }
    const precomputed = await loadPrecomputedStatusAnnotations();
    if (applyPrecomputedStatusAnnotations(source, precomputed)) {
      applyDirectStatusFlags(source.rows, source.id);
      source._rowVersion = (source._rowVersion || 0) + 1;
      invalidateDatasetDerivedCaches(source.id);
      source._statusAnnotated = true;
      return;
    }
    const requiredIds = getStatusLinkedDatasetIds(datasetId);
    const datasets = await Promise.all(requiredIds.map((id) => ensureDatasetLoaded(id, id === "d1" ? { requireHydrated: true } : {})));
    const fallbackSource = datasets.find((dataset) => dataset.id === datasetId) || source;
    const graph = buildStatusGraph(datasets);
    annotateLinkedStatusMetrics(fallbackSource, graph);
    annotateStatusFlagsFromRealgmIndex(fallbackSource, datasets);
    applyDirectStatusFlags(fallbackSource.rows, fallbackSource.id);
    fallbackSource._rowVersion = (fallbackSource._rowVersion || 0) + 1;
    invalidateDatasetDerivedCaches(fallbackSource.id);
    fallbackSource._statusAnnotated = true;
  })();

  appState.statusLoads.set(datasetId, promise);
  try {
    await promise;
  } finally {
    if (appState.statusLoads.get(datasetId) === promise) {
      appState.statusLoads.delete(datasetId);
    }
  }
}

function getStatusLinkedDatasetIds(datasetId) {
  if (datasetId === "d1") return ["d1", "d2", "naia", "juco", "nba"];
  if (datasetId === "fiba") return ["fiba", "d1", "nba"];
  return [datasetId, "d1", "nba"];
}

function getStaticStatusSlotLookup(bundle) {
  if (!bundle) return null;
  if (bundle._slotLookup) return bundle._slotLookup;
  const slotLookup = {};
  const slotNames = Array.isArray(bundle.slots) ? bundle.slots : [];
  slotNames.forEach((slotName, index) => {
    slotLookup[String(slotName)] = index;
  });
  bundle._slotLookup = slotLookup;
  return slotLookup;
}

function buildGrassrootsStaticIdentityLookup(bundle) {
  if (!bundle?.players || !bundle?.profiles) return null;
  if (bundle._grassrootsIdentityLookup) return bundle._grassrootsIdentityLookup;
  const strict = new Map();
  const loose = new Map();
  Object.entries(bundle.profiles || {}).forEach(([realgmId, profile]) => {
    const seasonEntry = bundle.players?.[realgmId];
    if (!Array.isArray(seasonEntry)) return;
    const [rawName, rawDob, rawHeights] = Array.isArray(profile) ? profile : ["", "", []];
    const name = getStringValue(rawName).trim();
    if (!name) return;
    const candidate = {
      realgmId: getStringValue(realgmId).trim(),
      canonicalId: `rgm_${getStringValue(realgmId).trim()}`,
      name,
      dob: getStringValue(rawDob).trim(),
      heights: (Array.isArray(rawHeights) ? rawHeights : [])
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value)),
      seasons: seasonEntry,
    };
    const strictName = normalizeNameKey(name);
    const looseName = normalizeLooseNameKey(name);
    if (strictName) {
      if (!strict.has(strictName)) strict.set(strictName, []);
      strict.get(strictName).push(candidate);
    }
    if (looseName) {
      if (!loose.has(looseName)) loose.set(looseName, []);
      loose.get(looseName).push(candidate);
    }
  });
  bundle._grassrootsIdentityLookup = { strict, loose };
  return bundle._grassrootsIdentityLookup;
}

function collectGrassrootsStaticIdentityCandidates(lookup, value) {
  if (!lookup) return [];
  const strictName = normalizeNameKey(value);
  const looseName = normalizeLooseNameKey(value);
  const candidates = new Map();
  (lookup.strict?.get(strictName) || []).forEach((candidate) => candidates.set(candidate.realgmId, candidate));
  if (!candidates.size) {
    (lookup.loose?.get(looseName) || []).forEach((candidate) => candidates.set(candidate.realgmId, candidate));
  }
  return Array.from(candidates.values());
}

function resolveStaticStatusIdentitiesForDataset(dataset, bundle) {
  if (!dataset?.rows?.length || !bundle?.players || !bundle?.profiles) return false;
  const lookup = buildGrassrootsStaticIdentityLookup(bundle);
  const slotLookup = getStaticStatusSlotLookup(bundle);
  if (!lookup || !slotLookup) return false;
  let changed = false;
  (dataset.rows || []).forEach((row) => {
    if (!row || hasStatusIdentity(row)) return;
    const match = chooseStaticStatusIdentityCandidate(dataset.id, row, lookup, slotLookup);
    if (!match) return;
    row.realgm_player_id = match.realgmId;
    row.canonical_player_id = match.canonicalId;
    applyStaticIdentityBio(row, match);
    changed = true;
  });
  if (changed) dataset._playerProfileDatasetIndex = null;
  return changed;
}

function applyStaticIdentityBio(row, candidate) {
  if (!row || !candidate) return;
  const dob = getStringValue(candidate.dob).trim();
  if (dob) {
    if (!getStringValue(row.dob).trim()) row.dob = dob;
    if (!getStringValue(row.birthday).trim()) row.birthday = row.dob || dob;
  }
  const height = Array.isArray(candidate.heights)
    ? candidate.heights.find((value) => Number.isFinite(Number(value)) && Number(value) > 0)
    : Number.NaN;
  if (Number.isFinite(Number(height)) && Number(height) > 0) {
    if (!Number.isFinite(row.height_in)) row.height_in = Number(height);
    if (!Number.isFinite(row.inches)) row.inches = Number(height);
  }
  normalizePhysicalMeasurements(row);
  normalizeDraftPickValue(row);
  populateAgeFromDob(row);
  clearDerivedRowCaches(row);
}

function chooseStaticStatusIdentityCandidate(datasetId, row, lookup, slotLookup) {
  const name = getStringValue(row?.player_name || row?.player || row?.nba_name || "").trim();
  if (!name) return null;
  const candidates = collectGrassrootsStaticIdentityCandidates(lookup, name)
    .map((candidate) => ({
      candidate,
      score: scoreRowToStaticStatusIdentityCandidate(datasetId, row, candidate, slotLookup),
    }))
    .filter((item) => Number.isFinite(item.score))
    .sort((left, right) => right.score - left.score);
  if (!candidates.length) return null;
  const [best, second] = candidates;
  if (best.score < 250) return null;
  if (second && best.score - second.score < 90) return null;
  return best.candidate;
}

function scoreRowToStaticStatusIdentityCandidate(datasetId, row, candidate, slotLookup) {
  if (!row || !candidate) return Number.NEGATIVE_INFINITY;
  const rowName = getStringValue(row.player_name || row.player || row.nba_name || "");
  const strictName = normalizeNameKey(rowName);
  const looseName = normalizeLooseNameKey(rowName);
  const candidateStrict = normalizeNameKey(candidate.name);
  const candidateLoose = normalizeLooseNameKey(candidate.name);
  if (!strictName || !candidateStrict) return Number.NEGATIVE_INFINITY;
  if (strictName !== candidateStrict && looseName !== candidateLoose) return Number.NEGATIVE_INFINITY;

  const season = extractLeadingYear(row.season);
  const slotDatasetId = getStaticStatusDatasetSlotId(datasetId, row);
  if (hasStaticStatusDatasetSlot(slotDatasetId, slotLookup) && !candidateHasStaticStatusSeason(candidate, slotLookup, slotDatasetId, season)) {
    return Number.NEGATIVE_INFINITY;
  }

  const rowDob = getStringValue(row.dob || row.birth_date || "").trim();
  if (rowDob && candidate.dob && rowDob !== candidate.dob) return Number.NEGATIVE_INFINITY;
  const heightGap = getStaticStatusIdentityHeightGap(row, candidate);
  if (Number.isFinite(heightGap) && heightGap > 1.5) return Number.NEGATIVE_INFINITY;
  if (!rowDob && !Number.isFinite(heightGap)) return Number.NEGATIVE_INFINITY;

  let score = strictName === candidateStrict ? 260 : 210;
  if (rowDob && candidate.dob && rowDob === candidate.dob) score += 300;
  if (Number.isFinite(heightGap)) score += Math.max(0, 100 - (heightGap * 45));
  return score;
}

function getStaticStatusDatasetSlotId(datasetId, row) {
  const rawId = getStringValue(datasetId).toLowerCase();
  if (["d1", "d2", "naia", "juco", "nba"].includes(rawId)) return rawId;
  if (rawId === "player_career") {
    const level = normalizeKey(row?.competition_level || row?.source_dataset || "");
    if (level === "d1") return "d1";
    if (level === "d2") return "d2";
    if (level === "naia") return "naia";
    if (level === "juco") return "juco";
    if (level === "nba") return "nba";
  }
  return rawId;
}

function hasStaticStatusDatasetSlot(datasetId, slotLookup) {
  return Object.prototype.hasOwnProperty.call(slotLookup || {}, `${datasetId}_min`)
    && Object.prototype.hasOwnProperty.call(slotLookup || {}, `${datasetId}_max`);
}

function candidateHasStaticStatusSeason(candidate, slotLookup, datasetId, season) {
  const min = getStaticStatusRangeValue(candidate.seasons, slotLookup, `${datasetId}_min`);
  const max = getStaticStatusRangeValue(candidate.seasons, slotLookup, `${datasetId}_max`);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return false;
  if (!Number.isFinite(season)) return true;
  return season >= min && season <= max;
}

function getStaticStatusIdentityHeightGap(row, candidate) {
  const rowHeight = firstFinite(row.height_in, row.inches, parseHeightToInches(row.height), Number.NaN);
  if (!Number.isFinite(rowHeight) || !candidate?.heights?.length) return Number.NaN;
  return Math.min(...candidate.heights.map((height) => Math.abs(Number(height) - rowHeight)).filter(Number.isFinite));
}

function scoreGrassrootsToStaticD1IdentityCandidate(sourceGroup, candidate, slotLookup) {
  if (!sourceGroup || !candidate) return Number.NEGATIVE_INFINITY;
  const sourceRow = sourceGroup.representative || sourceGroup.rows?.[0] || {};
  const sourceName = normalizeNameKey(getPreferredStatusName(sourceGroup.rows));
  const sourceLooseName = normalizeLooseNameKey(getPreferredStatusName(sourceGroup.rows));
  const candidateName = normalizeNameKey(candidate.name);
  const candidateLooseName = normalizeLooseNameKey(candidate.name);
  if (!sourceName || !candidateName) return Number.NEGATIVE_INFINITY;
  if (sourceName !== candidateName && sourceLooseName !== candidateLooseName) return Number.NEGATIVE_INFINITY;

  const d1FirstYear = getStaticStatusRangeValue(candidate.seasons, slotLookup, "d1_min");
  if (!Number.isFinite(d1FirstYear)) return Number.NEGATIVE_INFINITY;

  const sourceDob = getStringValue(sourceRow?.dob).trim();
  if (sourceDob && candidate.dob && sourceDob !== candidate.dob) return Number.NEGATIVE_INFINITY;

  const sourceHeight = getGrassrootsCareerInches(sourceRow);
  const heightGap = Number.isFinite(sourceHeight) && candidate.heights.length
    ? Math.min(...candidate.heights.map((height) => Math.abs(sourceHeight - height)).filter(Number.isFinite))
    : Number.NaN;
  if (Number.isFinite(heightGap) && heightGap > 2) return Number.NEGATIVE_INFINITY;

  const expectedFreshmanYear = getProjectedCollegeFreshmanYear(sourceRow);
  if (Number.isFinite(expectedFreshmanYear) && Math.abs(d1FirstYear - expectedFreshmanYear) > 1) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = sourceName === candidateName ? 250 : 200;
  if (sourceDob && candidate.dob && sourceDob === candidate.dob) score += 280;
  if (Number.isFinite(heightGap)) score += Math.max(0, 90 - (heightGap * 35));
  if (Number.isFinite(expectedFreshmanYear)) {
    score += Math.max(0, 160 - (Math.abs(d1FirstYear - expectedFreshmanYear) * 90));
  }
  return score;
}

function scoreGrassrootsToStaticNbaIdentityCandidate(sourceGroup, candidate, slotLookup) {
  if (!sourceGroup || !candidate) return Number.NEGATIVE_INFINITY;
  const sourceRow = sourceGroup.representative || sourceGroup.rows?.[0] || {};
  const sourceName = normalizeNameKey(getPreferredStatusName(sourceGroup.rows));
  const sourceLooseName = normalizeLooseNameKey(getPreferredStatusName(sourceGroup.rows));
  const candidateName = normalizeNameKey(candidate.name);
  const candidateLooseName = normalizeLooseNameKey(candidate.name);
  if (!sourceName || !candidateName) return Number.NEGATIVE_INFINITY;
  if (sourceName !== candidateName && sourceLooseName !== candidateLooseName) return Number.NEGATIVE_INFINITY;

  const nbaFirstYear = getStaticStatusRangeValue(candidate.seasons, slotLookup, "nba_min");
  if (!Number.isFinite(nbaFirstYear)) return Number.NEGATIVE_INFINITY;

  const sourceDob = getStringValue(sourceRow?.dob).trim();
  if (sourceDob && candidate.dob && sourceDob !== candidate.dob) return Number.NEGATIVE_INFINITY;

  const sourceHeight = getGrassrootsCareerInches(sourceRow);
  const heightGap = Number.isFinite(sourceHeight) && candidate.heights.length
    ? Math.min(...candidate.heights.map((height) => Math.abs(sourceHeight - height)).filter(Number.isFinite))
    : Number.NaN;
  if (Number.isFinite(heightGap) && heightGap > 2) return Number.NEGATIVE_INFINITY;

  const expectedFreshmanYear = getProjectedCollegeFreshmanYear(sourceRow);
  if (Number.isFinite(expectedFreshmanYear)) {
    const rookieGap = nbaFirstYear - expectedFreshmanYear;
    if (rookieGap < -1 || rookieGap > 8) return Number.NEGATIVE_INFINITY;
  }

  let score = sourceName === candidateName ? 235 : 185;
  if (sourceDob && candidate.dob && sourceDob === candidate.dob) score += 280;
  if (Number.isFinite(heightGap)) score += Math.max(0, 90 - (heightGap * 35));
  if (Number.isFinite(expectedFreshmanYear)) {
    score += Math.max(0, 120 - (Math.abs(nbaFirstYear - expectedFreshmanYear) * 18));
  }
  return score;
}

function getIdentityResolverGroups(dataset) {
  if (!dataset?.rows?.length) return [];
  const cacheKey = `${Number(dataset?._rowVersion) || 0}|${dataset.rows.length}`;
  if (dataset._identityResolverGroupsKey === cacheKey) return dataset._identityResolverGroups || [];
  const grouped = new Map();
  const sourceRows = dataset.id === "d1"
    ? dataset.rows.filter((row) => row?._trustedD1 !== false && hasStatusIdentity(row))
    : dataset.rows.filter((row) => hasStatusIdentity(row));
  sourceRows.forEach((row, index) => {
    const key = getCareerGroupKey(dataset, row) || `${dataset.id}|identity|${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  const groups = mergeCareerRowGroups(dataset, Array.from(grouped.values())).map((rows, index) => {
    const meta = buildCareerGroupMeta(dataset, rows);
    const preferredName = getPreferredStatusName(rows);
    return {
      ...meta,
      datasetId: dataset.id,
      nodeId: `${dataset.id}:identity:${index}`,
      nameKey: normalizeNameKey(preferredName),
      nameKeys: buildStatusNameKeys(preferredName),
      rows,
    };
  });
  dataset._identityResolverGroupsKey = cacheKey;
  dataset._identityResolverGroups = groups;
  return groups;
}

function getStatusGroupRepresentative(group) {
  const rows = Array.isArray(group?.rows) ? group.rows : [];
  if (!rows.length) return {};
  return rows
    .slice()
    .sort((left, right) => duplicateRowScore(right) - duplicateRowScore(left))[0] || rows[0] || {};
}

function buildExactStatusGroupNameLookup(groups) {
  const strict = new Map();
  const loose = new Map();
  (groups || []).forEach((group) => {
    const preferredName = getPreferredStatusName(group?.rows || []);
    const strictName = normalizeNameKey(preferredName);
    const looseName = normalizeLooseNameKey(preferredName);
    if (strictName) {
      if (!strict.has(strictName)) strict.set(strictName, []);
      strict.get(strictName).push(group);
    }
    if (looseName) {
      if (!loose.has(looseName)) loose.set(looseName, []);
      loose.get(looseName).push(group);
    }
  });
  return { strict, loose };
}

function collectExactStatusGroupNameCandidates(lookup, value) {
  if (!lookup) return [];
  const strictName = normalizeNameKey(value);
  const looseName = normalizeLooseNameKey(value);
  const candidates = new Map();
  (lookup.strict?.get(strictName) || []).forEach((group) => candidates.set(group.nodeId, group));
  if (!candidates.size) {
    (lookup.loose?.get(looseName) || []).forEach((group) => candidates.set(group.nodeId, group));
  }
  return Array.from(candidates.values());
}

function getGrassrootsStatusIdentityGroups(dataset) {
  if (!dataset?.rows?.length) return [];
  const cacheKey = `${Number(dataset?._rowVersion) || 0}|${dataset.rows.length}`;
  if (dataset._grassrootsStatusIdentityGroupsKey === cacheKey) return dataset._grassrootsStatusIdentityGroups || [];
  const grouped = new Map();
  dataset.rows.forEach((row, index) => {
    const key = getCareerGroupKey(dataset, row) || `grassroots|${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  const groups = mergeCareerRowGroups(dataset, Array.from(grouped.values())).map((rows, index) => {
    const meta = buildCareerGroupMeta(dataset, rows);
    const representative = rows
      .slice()
      .sort((left, right) => grassrootsAliasRowScore(right) - grassrootsAliasRowScore(left))[0] || rows[0] || {};
    return {
      ...meta,
      datasetId: dataset.id,
      nodeId: `${dataset.id}:status-identity:${index}`,
      rows,
      representative,
      teamTokens: rows.reduce((set, row) => {
        getGrassrootsCareerTeamTokens(row).forEach((token) => set.add(token));
        return set;
      }, new Set()),
      nameKey: normalizeNameKey(getPreferredStatusName(rows)),
      looseNameKey: normalizeLooseNameKey(getPreferredStatusName(rows)),
    };
  });
  dataset._grassrootsStatusIdentityGroupsKey = cacheKey;
  dataset._grassrootsStatusIdentityGroups = groups;
  return groups;
}

function scoreGrassrootsToD1IdentityCandidate(sourceGroup, targetGroup) {
  if (!sourceGroup || !targetGroup || targetGroup.datasetId !== "d1") return Number.NEGATIVE_INFINITY;
  const sourceRow = sourceGroup.representative || sourceGroup.rows?.[0] || {};
  const sourceName = normalizeNameKey(getPreferredStatusName(sourceGroup.rows));
  const sourceLooseName = normalizeLooseNameKey(getPreferredStatusName(sourceGroup.rows));
  const targetName = normalizeNameKey(getPreferredStatusName(targetGroup.rows));
  const targetLooseName = normalizeLooseNameKey(getPreferredStatusName(targetGroup.rows));
  if (!sourceName || !targetName) return Number.NEGATIVE_INFINITY;
  if (sourceName !== targetName && sourceLooseName !== targetLooseName) return Number.NEGATIVE_INFINITY;

  const sourceDob = getStringValue(sourceRow?.dob).trim();
  if (sourceDob && targetGroup.dobs?.length && !targetGroup.dobs.includes(sourceDob)) return Number.NEGATIVE_INFINITY;

  const sourceHeight = getGrassrootsCareerInches(sourceRow);
  const heightGap = Number.isFinite(sourceHeight) && targetGroup.heights?.length
    ? Math.min(...targetGroup.heights.map((height) => Math.abs(sourceHeight - Number(height))).filter(Number.isFinite))
    : Number.NaN;
  if (Number.isFinite(heightGap) && heightGap > 2) return Number.NEGATIVE_INFINITY;

  const expectedFreshmanYear = getProjectedCollegeFreshmanYear(sourceRow);
  const candidateFreshmanYear = Number(targetGroup?.minYear);
  if (Number.isFinite(expectedFreshmanYear) && Number.isFinite(candidateFreshmanYear) && Math.abs(candidateFreshmanYear - expectedFreshmanYear) > 1) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = sourceName === targetName ? 250 : 200;
  if (sourceDob && targetGroup.dobs?.includes(sourceDob)) score += 280;
  if (Number.isFinite(heightGap)) score += Math.max(0, 90 - (heightGap * 35));
  if (Number.isFinite(expectedFreshmanYear) && Number.isFinite(candidateFreshmanYear)) {
    score += Math.max(0, 160 - (Math.abs(candidateFreshmanYear - expectedFreshmanYear) * 90));
  }
  return score;
}

function scoreGrassrootsToNbaIdentityCandidate(sourceGroup, targetGroup) {
  if (!sourceGroup || !targetGroup || targetGroup.datasetId !== "nba") return Number.NEGATIVE_INFINITY;
  const sourceRow = sourceGroup.representative || sourceGroup.rows?.[0] || {};
  const sourceName = normalizeNameKey(getPreferredStatusName(sourceGroup.rows));
  const sourceLooseName = normalizeLooseNameKey(getPreferredStatusName(sourceGroup.rows));
  const targetName = normalizeNameKey(getPreferredStatusName(targetGroup.rows));
  const targetLooseName = normalizeLooseNameKey(getPreferredStatusName(targetGroup.rows));
  if (!sourceName || !targetName) return Number.NEGATIVE_INFINITY;
  if (sourceName !== targetName && sourceLooseName !== targetLooseName) return Number.NEGATIVE_INFINITY;

  const sourceDob = getStringValue(sourceRow?.dob).trim();
  if (sourceDob && targetGroup.dobs?.length && !targetGroup.dobs.includes(sourceDob)) return Number.NEGATIVE_INFINITY;

  const sourceHeight = getGrassrootsCareerInches(sourceRow);
  const heightGap = Number.isFinite(sourceHeight) && targetGroup.heights?.length
    ? Math.min(...targetGroup.heights.map((height) => Math.abs(sourceHeight - Number(height))).filter(Number.isFinite))
    : Number.NaN;
  if (Number.isFinite(heightGap) && heightGap > 2) return Number.NEGATIVE_INFINITY;

  const expectedFreshmanYear = getProjectedCollegeFreshmanYear(sourceRow);
  const rookieYear = Number.isFinite(targetGroup?.minYear) ? Number(targetGroup.minYear) : firstFinite(...(targetGroup?.rookieYears || []), Number.NaN);
  if (Number.isFinite(expectedFreshmanYear) && Number.isFinite(rookieYear)) {
    const rookieGap = rookieYear - expectedFreshmanYear;
    if (rookieGap < -1 || rookieGap > 8) return Number.NEGATIVE_INFINITY;
  }

  let score = sourceName === targetName ? 235 : 185;
  if (sourceDob && targetGroup.dobs?.includes(sourceDob)) score += 280;
  if (Number.isFinite(heightGap)) score += Math.max(0, 90 - (heightGap * 35));
  if (Number.isFinite(expectedFreshmanYear) && Number.isFinite(rookieYear)) {
    score += Math.max(0, 120 - (Math.abs(rookieYear - expectedFreshmanYear) * 18));
  }
  return score;
}

function selectBestScoredIdentityCandidate(candidates, scorer, minimumScore, ambiguityGap = 35) {
  let best = null;
  let secondBest = Number.NEGATIVE_INFINITY;
  (candidates || []).forEach((candidate) => {
    const score = scorer(candidate);
    if (!Number.isFinite(score)) return;
    if (!best || score > best.score) {
      secondBest = best ? best.score : secondBest;
      best = { candidate, score };
    } else if (score > secondBest) {
      secondBest = score;
    }
  });
  if (!best || best.score < minimumScore) return null;
  if (secondBest > Number.NEGATIVE_INFINITY && (best.score - secondBest) < ambiguityGap) return null;
  return best.candidate;
}

function resolveGrassrootsIdentityCandidate(sourceGroup, d1Lookup, nbaLookup) {
  const preferredName = getPreferredStatusName(sourceGroup?.rows || []);
  const d1Candidates = collectExactStatusGroupNameCandidates(d1Lookup, preferredName)
    .filter((group) => Boolean(getStatusIdentityId(getStatusGroupRepresentative(group))));
  const bestD1 = selectBestScoredIdentityCandidate(
    d1Candidates,
    (candidate) => scoreGrassrootsToD1IdentityCandidate(sourceGroup, candidate),
    280,
  );
  if (bestD1) return getStatusGroupRepresentative(bestD1);

  const nbaCandidates = collectExactStatusGroupNameCandidates(nbaLookup, preferredName)
    .filter((group) => Boolean(getStatusIdentityId(getStatusGroupRepresentative(group))));
  const bestNba = selectBestScoredIdentityCandidate(
    nbaCandidates,
    (candidate) => scoreGrassrootsToNbaIdentityCandidate(sourceGroup, candidate),
    250,
  );
  return bestNba ? getStatusGroupRepresentative(bestNba) : null;
}

async function resolveGrassrootsStatusIdentities(dataset) {
  if (!dataset?.rows?.length || dataset.id !== "grassroots") return;
  const cacheKey = `${Number(dataset?._rowVersion) || 0}|${dataset.rows.length}`;
  if (dataset._grassrootsStatusIdentityResolvedKey === cacheKey) return;

  const staticBundle = await loadStatusRealgmIndex();
  const slotLookup = getStaticStatusSlotLookup(staticBundle);
  const identityLookup = buildGrassrootsStaticIdentityLookup(staticBundle);
  if (!slotLookup || !identityLookup) return;

  getGrassrootsStatusIdentityGroups(dataset).forEach((group) => {
    if ((group.rows || []).some((row) => hasStatusIdentity(row))) return;
    const candidates = collectGrassrootsStaticIdentityCandidates(identityLookup, getPreferredStatusName(group.rows));
    const identitySource = selectBestScoredIdentityCandidate(
      candidates,
      (candidate) => scoreGrassrootsToStaticD1IdentityCandidate(group, candidate, slotLookup),
      280,
    );
    const fallbackSource = identitySource || selectBestScoredIdentityCandidate(
      candidates,
      (candidate) => scoreGrassrootsToStaticNbaIdentityCandidate(group, candidate, slotLookup),
      250,
    );
    const realgmId = getStringValue((fallbackSource || {}).realgmId).trim();
    if (!realgmId) return;
    const canonicalId = getStringValue((fallbackSource || {}).canonicalId).trim() || `rgm_${realgmId}`;
    (group.rows || []).forEach((row) => {
      if (!getStringValue(row.realgm_player_id).trim()) row.realgm_player_id = realgmId;
      if (!getStringValue(row.canonical_player_id).trim()) row.canonical_player_id = canonicalId;
      applyStaticIdentityBio(row, fallbackSource);
    });
  });

  dataset._playerProfileDatasetIndex = null;
  dataset._grassrootsStatusIdentityResolvedKey = cacheKey;
}

function getStaticStatusRangeValue(entry, slotLookup, slotName) {
  if (!Array.isArray(entry) || !slotLookup) return Number.NaN;
  const slotIndex = slotLookup[slotName];
  const rawValue = typeof slotIndex === "number" ? entry[slotIndex] : undefined;
  if (rawValue == null || rawValue === "") return Number.NaN;
  const value = Number(rawValue);
  return Number.isFinite(value) ? value : Number.NaN;
}

function hasStaticStatusSeasonBefore(entry, slotLookup, datasetId, season) {
  const minSeason = getStaticStatusRangeValue(entry, slotLookup, `${datasetId}_min`);
  return Number.isFinite(minSeason) && minSeason < season;
}

function hasStaticStatusSeasonAfter(entry, slotLookup, datasetId, season) {
  const maxSeason = getStaticStatusRangeValue(entry, slotLookup, `${datasetId}_max`);
  return Number.isFinite(maxSeason) && maxSeason > season;
}

function hasAnyStaticStatusSeason(entry, slotLookup, datasetId) {
  return Number.isFinite(getStaticStatusRangeValue(entry, slotLookup, `${datasetId}_min`))
    || Number.isFinite(getStaticStatusRangeValue(entry, slotLookup, `${datasetId}_max`));
}

function getStrictStatusFlagsFromStaticRealgmIndex(datasetId, row, bundle, slotLookup) {
  const flags = createEmptyStatusFlags(datasetId);
  const realgmId = getStatusIdentityId(row);
  const season = extractLeadingYear(row?.season);
  if (!realgmId || !Number.isFinite(season) || !bundle?.players) return flags;
  const entry = bundle.players[realgmId];
  if (!entry) return flags;
  if (datasetId === "d1") {
    flags.nba = hasAnyStaticStatusSeason(entry, slotLookup, "nba");
    flags.former_juco = hasStaticStatusSeasonBefore(entry, slotLookup, "juco", season);
    flags.future_juco = hasStaticStatusSeasonAfter(entry, slotLookup, "juco", season);
    flags.former_d2 = hasStaticStatusSeasonBefore(entry, slotLookup, "d2", season);
    flags.future_d2 = hasStaticStatusSeasonAfter(entry, slotLookup, "d2", season);
    flags.former_naia = hasStaticStatusSeasonBefore(entry, slotLookup, "naia", season);
    flags.future_naia = hasStaticStatusSeasonAfter(entry, slotLookup, "naia", season);
    return flags;
  }
  flags.future_d1 = hasStaticStatusSeasonAfter(entry, slotLookup, "d1", season);
  flags.former_d1 = hasStaticStatusSeasonBefore(entry, slotLookup, "d1", season);
  flags.ncaa = flags.future_d1 || flags.former_d1 || hasAnyStaticStatusSeason(entry, slotLookup, "d1");
  flags.nba = hasAnyStaticStatusSeason(entry, slotLookup, "nba");
  return flags;
}

function applyStatusFlagsFromStaticRealgmIndex(sourceDataset, bundle) {
  if (!sourceDataset?.rows?.length || !bundle?.players) return false;
  const slotLookup = getStaticStatusSlotLookup(bundle);
  if (!slotLookup) return false;
  (sourceDataset.rows || []).forEach((row) => {
    row._statusFlags = hasStatusIdentity(row)
      ? getStrictStatusFlagsFromStaticRealgmIndex(sourceDataset.id, row, bundle, slotLookup)
      : createEmptyStatusFlags(sourceDataset.id);
  });
  return true;
}

async function loadStatusRealgmIndex() {
  if (appState.statusRealgmStaticIndex !== undefined) {
    return appState.statusRealgmStaticIndex;
  }
  if (window.STATUS_REALGM_INDEX?.players) {
    appState.statusRealgmStaticIndex = window.STATUS_REALGM_INDEX;
    return appState.statusRealgmStaticIndex;
  }
  if (!appState.statusRealgmStaticIndexLoad) {
    appState.statusRealgmStaticIndexLoad = loadScriptOnce(STATUS_REALGM_INDEX_SCRIPT).catch((error) => {
      console.warn("Static RealGM status index failed to load.", error);
      return null;
    });
  }
  await appState.statusRealgmStaticIndexLoad;
  appState.statusRealgmStaticIndex = window.STATUS_REALGM_INDEX?.players ? window.STATUS_REALGM_INDEX : null;
  return appState.statusRealgmStaticIndex;
}

async function loadPrecomputedStatusAnnotations() {
  if (appState.precomputedStatusAnnotations !== undefined) {
    return appState.precomputedStatusAnnotations;
  }
  if (window.STATUS_ANNOTATIONS?.datasets) {
    appState.precomputedStatusAnnotations = window.STATUS_ANNOTATIONS;
    return appState.precomputedStatusAnnotations;
  }
  if (!appState.statusAnnotationScriptLoad) {
    appState.statusAnnotationScriptLoad = loadScriptOnce(STATUS_ANNOTATIONS_SCRIPT).catch((error) => {
      console.warn("Status annotations failed to load.", error);
      return null;
    });
  }
  await appState.statusAnnotationScriptLoad;
  appState.precomputedStatusAnnotations = window.STATUS_ANNOTATIONS?.datasets ? window.STATUS_ANNOTATIONS : null;
  return appState.precomputedStatusAnnotations;
}

function applyPrecomputedStatusAnnotations(sourceDataset, bundle) {
  if (!sourceDataset?.rows?.length || !bundle?.datasets?.[sourceDataset.id]?.entries) return false;
  const datasetBundle = bundle.datasets[sourceDataset.id];
  const sourceGroups = getStatusGroups(sourceDataset);
  const entries = datasetBundle.entries || {};
  let matchedGroups = 0;
  sourceGroups.forEach((group) => {
    const entry = entries[getStatusAnnotationGroupKey(group)] || null;
    const flags = entry
      ? decodeStatusAnnotationFlags(entry?.b, sourceDataset.id)
      : createEmptyStatusFlags(sourceDataset.id);
    if (entry) matchedGroups += 1;
    group.rows.forEach((row) => {
      row._statusFlags = { ...flags };
      if (Number.isFinite(entry?.p)) row.d1_peak_prpg = entry.p;
      if (Number.isFinite(entry?.q)) row.d1_peak_dprpg = entry.q;
      if (Number.isFinite(entry?.r)) row.d1_peak_bpm = entry.r;
      if (Number.isFinite(entry?.n)) row.nba_career_epm = entry.n;
      if (sourceDataset.id === "fiba" && entry?.x) {
        row.player_name = entry.x;
        row.player = entry.x;
        row._searchCacheKey = "";
        row._searchHaystack = "";
      }
    });
  });

  const coverage = sourceGroups.length ? (matchedGroups / sourceGroups.length) : 0;
  if (!matchedGroups || coverage < 0.5) return false;
  sourceDataset._statusAnnotated = true;
  sourceDataset._linkedStatusMetricsAnnotated = matchedGroups > 0;
  return true;
}

function decodeStatusAnnotationFlags(bitmask, datasetId) {
  const bits = Number(bitmask) || 0;
  if (datasetId === "d1") {
    return {
      nba: Boolean(bits & 1),
      former_juco: Boolean(bits & 8),
      future_juco: false,
      former_d2: Boolean(bits & 16),
      future_d2: false,
      former_naia: Boolean(bits & 32),
      future_naia: false,
    };
  }
  return {
    former_d1: Boolean(bits & 4),
    future_d1: Boolean(bits & 2),
    ncaa: Boolean(bits & 4) || Boolean(bits & 2),
    nba: Boolean(bits & 1),
  };
}

function createEmptyStatusFlags(datasetId) {
  if (datasetId === "d1") {
    return {
      nba: false,
      former_juco: false,
      future_juco: false,
      former_d2: false,
      future_d2: false,
      former_naia: false,
      future_naia: false,
    };
  }
  return {
    former_d1: false,
    future_d1: false,
    ncaa: false,
    nba: false,
  };
}

function getStatusPathTokens(rows) {
  const tokens = new Set();
  (rows || []).forEach((row) => {
    [
      row?.profile_levels,
      row?.profile_career_path,
      row?.career_path,
      row?.competition_level,
      row?.competition_label,
      row?.source_dataset,
    ].forEach((value) => {
      getStringValue(value)
        .split(/[\/,|]+/)
        .map((part) => normalizeDirectiveValue(part))
        .filter(Boolean)
        .forEach((token) => tokens.add(token));
    });
  });
  return tokens;
}

function inferDirectStatusFlags(datasetId, rows) {
  const tokens = getStatusPathTokens(rows);
  const hasProjectedD1 = (rows || []).some((row) => rowHasExplicitProjectedD1Data(row));
  const hasNba = tokens.has("nba");
  if (datasetId === "d1") {
    return {
      nba: hasNba,
      former_juco: false,
      future_juco: false,
      former_d2: false,
      future_d2: false,
      former_naia: false,
      future_naia: false,
    };
  }
  return {
    former_d1: false,
    future_d1: hasProjectedD1,
    ncaa: hasProjectedD1,
    nba: hasNba,
  };
}

function applyDirectStatusFlags(rows, datasetId) {
  (rows || []).forEach((row) => {
    if (!row) return;
    if (!hasStatusIdentity(row) && !(datasetId === "grassroots" && rowHasExplicitProjectedD1Data(row))) return;
    const directFlags = inferDirectStatusFlags(datasetId, [row]);
    const mergedFlags = {
      ...createEmptyStatusFlags(datasetId),
      ...(row._statusFlags || {}),
    };
    Object.entries(directFlags || {}).forEach(([key, value]) => {
      if (value) mergedFlags[key] = true;
    });
    row._statusFlags = mergedFlags;
  });
}

function datasetHasDirectStatusFlags(dataset) {
  if (!dataset?.rows?.length) return false;
  const sourceRows = getStatusSourceRows(dataset);
  if (!sourceRows.length) return false;
  return sourceRows.every((row) => row?._statusFlags && Object.keys(row._statusFlags).length);
}

function getStatusIndexRows(dataset) {
  if (!dataset?.rows?.length) return [];
  const baseRows = dataset.id === "d1"
    ? dataset.rows.filter((row) => row._trustedD1 !== false)
    : dataset.rows;
  return baseRows.filter((row) => hasStatusIdentity(row) && Number.isFinite(extractLeadingYear(row?.season)));
}

function getCachedStatusRealgmIndex(datasets) {
  const key = (datasets || [])
    .filter(Boolean)
    .map((dataset) => `${dataset.id}:${Number(dataset?._rowVersion) || 0}:${Array.isArray(dataset?.rows) ? dataset.rows.length : 0}`)
    .sort()
    .join("|");
  if (appState.statusRealgmIndexKey === key && appState.statusRealgmIndex) return appState.statusRealgmIndex;
  const index = new Map();
  (datasets || []).forEach((dataset) => {
    getStatusIndexRows(dataset).forEach((row) => {
      const realgmId = getStatusIdentityId(row);
      const season = extractLeadingYear(row?.season);
      if (!realgmId || !Number.isFinite(season)) return;
      if (!index.has(realgmId)) index.set(realgmId, {});
      const bucket = index.get(realgmId);
      if (!bucket[dataset.id]) bucket[dataset.id] = [];
      bucket[dataset.id].push(season);
    });
  });
  index.forEach((bucket) => {
    Object.keys(bucket).forEach((datasetId) => {
      bucket[datasetId] = Array.from(new Set(bucket[datasetId].filter(Number.isFinite))).sort((left, right) => left - right);
    });
  });
  appState.statusRealgmIndexKey = key;
  appState.statusRealgmIndex = index;
  return index;
}

function hasStatusSeasonBefore(statusBucket, datasetId, season) {
  return (statusBucket?.[datasetId] || []).some((value) => value < season);
}

function hasStatusSeasonAfter(statusBucket, datasetId, season) {
  return (statusBucket?.[datasetId] || []).some((value) => value > season);
}

function hasAnyStatusSeason(statusBucket, datasetId) {
  return Boolean(statusBucket?.[datasetId]?.length);
}

function getStrictStatusFlags(datasetId, row, statusIndex) {
  const flags = createEmptyStatusFlags(datasetId);
  const realgmId = getStatusIdentityId(row);
  const season = extractLeadingYear(row?.season);
  if (!realgmId || !Number.isFinite(season)) return flags;
  const statusBucket = statusIndex.get(realgmId);
  if (!statusBucket) return flags;
  if (datasetId === "d1") {
    flags.nba = hasAnyStatusSeason(statusBucket, "nba");
    flags.former_juco = hasStatusSeasonBefore(statusBucket, "juco", season);
    flags.future_juco = hasStatusSeasonAfter(statusBucket, "juco", season);
    flags.former_d2 = hasStatusSeasonBefore(statusBucket, "d2", season);
    flags.future_d2 = hasStatusSeasonAfter(statusBucket, "d2", season);
    flags.former_naia = hasStatusSeasonBefore(statusBucket, "naia", season);
    flags.future_naia = hasStatusSeasonAfter(statusBucket, "naia", season);
    return flags;
  }
  flags.future_d1 = hasStatusSeasonAfter(statusBucket, "d1", season);
  flags.former_d1 = hasStatusSeasonBefore(statusBucket, "d1", season);
  flags.ncaa = flags.future_d1 || flags.former_d1 || hasAnyStatusSeason(statusBucket, "d1");
  flags.nba = hasAnyStatusSeason(statusBucket, "nba");
  return flags;
}

function annotateStatusFlagsFromRealgmIndex(sourceDataset, datasets) {
  if (!sourceDataset?.rows?.length) return;
  const statusIndex = getCachedStatusRealgmIndex(datasets);
  (sourceDataset.rows || []).forEach((row) => {
    row._statusFlags = hasStatusIdentity(row)
      ? getStrictStatusFlags(sourceDataset.id, row, statusIndex)
      : createEmptyStatusFlags(sourceDataset.id);
  });
}

function getStatusAnnotationGroupKey(group) {
  if (!group) return "";
  const ids = Array.from(new Set(group.explicitIds || [])).filter(Boolean).sort().join(",");
  const dobs = Array.from(new Set(group.dobs || [])).filter(Boolean).sort().join(",");
  const heights = Array.from(new Set((group.heights || []).filter(Number.isFinite))).sort((left, right) => left - right).join(",");
  const years = Array.from(new Set((group.years || []).filter(Number.isFinite))).sort((left, right) => left - right).join(",");
  return [
    getStringValue(group.nameKey).trim(),
    ids,
    dobs,
    heights,
    years,
  ].join("|");
}

function annotateStatusFlags(sourceDataset, graph) {
  if (sourceDataset._statusAnnotated) return;
  const sourceGroups = getStatusGroups(sourceDataset);

  sourceGroups.forEach((group) => {
    const flags = sourceDataset.id === "d1"
      ? {
        nba: hasAnyStatusPath(group, graph, "nba"),
        former_juco: hasStatusPath(group, graph, "juco", "backward"),
        future_juco: hasStatusPath(group, graph, "juco", "forward"),
        former_d2: hasStatusPath(group, graph, "d2", "backward"),
        future_d2: hasStatusPath(group, graph, "d2", "forward"),
        former_naia: hasStatusPath(group, graph, "naia", "backward"),
        future_naia: hasStatusPath(group, graph, "naia", "forward"),
      }
      : {
        future_d1: hasStatusPath(group, graph, "d1", "forward"),
        former_d1: hasStatusPath(group, graph, "d1", "backward"),
        nba: hasAnyStatusPath(group, graph, "nba"),
      };
    if (sourceDataset.id !== "d1" && group.rows.some((row) => rowHasExplicitProjectedD1Data(row))) {
      flags.future_d1 = true;
    }
    group.rows.forEach((row) => {
      row._statusFlags = { ...flags };
    });
  });

  sourceDataset._statusAnnotated = true;
}

function getStatusGroups(dataset) {
  if (dataset._statusGroups) return dataset._statusGroups;
  const grouped = new Map();
  getStatusSourceRows(dataset).forEach((row) => {
    const key = getCareerGroupKey(dataset, row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  dataset._statusGroups = mergeCareerRowGroups(dataset, Array.from(grouped.values())).map((rows, index) => {
    const meta = buildCareerGroupMeta(dataset, rows);
    const preferredName = getPreferredStatusName(rows);
    return {
      ...meta,
      datasetId: dataset.id,
      nodeId: `${dataset.id}:${index}`,
      nameKey: normalizeNameKey(preferredName),
      nameKeys: buildStatusNameKeys(preferredName),
      identityKeys: buildStatusIdentityKeys(meta, rows),
    };
  });
  return dataset._statusGroups;
}

function getStatusSourceRows(dataset) {
  if (!dataset?.rows) return [];
  const sourceRows = dataset.id === "d1"
    ? dataset.rows.filter((row) => row._trustedD1 !== false)
    : dataset.rows.slice();
  const identifiedRows = sourceRows.filter((row) => hasStatusIdentity(row));
  if (dataset.id === "grassroots") return identifiedRows;
  if (dataset.id === "fiba") return identifiedRows.length ? identifiedRows : sourceRows;
  if (!identifiedRows.length) return sourceRows;
  if (dataset.id === "nba") return identifiedRows;
  const qualified = identifiedRows.filter((row) => getMinutesValue(row) >= MINUTES_DEFAULT || rowHasExplicitProjectedD1Data(row));
  return qualified.length ? qualified : identifiedRows;
}

function getPreferredStatusName(rows) {
  return (rows || [])
    .map((row) => getStringValue(row?.player_name || row?.player).trim())
    .sort((left, right) => right.length - left.length)[0] || "";
}

function buildStatusGraph(datasets) {
  const nodes = new Map();
  const nameBuckets = new Map();
  (datasets || []).forEach((dataset) => {
    getStatusGroups(dataset).forEach((group) => {
      nodes.set(group.nodeId, group);
      const bucketKeys = new Set([...(group.nameKeys || [group.nameKey]), ...(group.identityKeys || [])]);
      bucketKeys.forEach((nameKey) => {
        if (!nameKey) return;
        if (!nameBuckets.has(nameKey)) nameBuckets.set(nameKey, []);
        nameBuckets.get(nameKey).push(group);
      });
    });
  });

  const forward = new Map();
  const backward = new Map();
  nodes.forEach((_, nodeId) => {
    forward.set(nodeId, new Set());
    backward.set(nodeId, new Set());
  });

  const seenPairs = new Set();
  nameBuckets.forEach((groups) => {
    for (let i = 0; i < groups.length; i += 1) {
      for (let j = i + 1; j < groups.length; j += 1) {
        const left = groups[i];
        const right = groups[j];
        const pairKey = [left.nodeId, right.nodeId].sort().join("|");
        if (seenPairs.has(pairKey)) continue;
        seenPairs.add(pairKey);
        if (!statusGroupsMatch(left, right)) continue;
        if (isValidStatusTransition(left, right)) {
          forward.get(left.nodeId).add(right.nodeId);
          backward.get(right.nodeId).add(left.nodeId);
        }
        if (isValidStatusTransition(right, left)) {
          forward.get(right.nodeId).add(left.nodeId);
          backward.get(left.nodeId).add(right.nodeId);
        }
      }
    }
  });

  addExplicitProjectedD1StatusEdges(datasets, nodes, forward, backward);
  return { nodes, forward, backward };
}

function addExplicitProjectedD1StatusEdges(datasets, nodes, forward, backward) {
  const d1Dataset = (datasets || []).find((dataset) => dataset?.id === "d1");
  if (!d1Dataset) return;
  const d1Groups = getStatusGroups(d1Dataset);
  if (!d1Groups.length) return;
  const d1GroupIndex = buildExplicitProjectedD1GroupIndex(d1Groups);

  (datasets || []).forEach((dataset) => {
    if (!dataset || dataset.id === "d1" || dataset.id === "nba" || dataset.id === "nba_companion") return;
    getStatusGroups(dataset).forEach((group) => {
      getExplicitProjectedD1GroupsForStatusGroup(group, d1GroupIndex).forEach((targetGroup) => {
        if (!group?.nodeId || !targetGroup?.nodeId || group.nodeId === targetGroup.nodeId) return;
        if (!nodes.has(group.nodeId) || !nodes.has(targetGroup.nodeId)) return;
        forward.get(group.nodeId)?.add(targetGroup.nodeId);
        backward.get(targetGroup.nodeId)?.add(group.nodeId);
      });
    });
  });
}

function buildExplicitProjectedD1GroupIndex(d1Groups) {
  const byNameKey = new Map();
  const entries = (d1Groups || []).map((group) => ({
    group,
    teamKeys: buildExplicitProjectedD1TeamKeys(group.rows || []),
  }));
  entries.forEach((entry) => {
    (entry.group?.nameKeys || [entry.group?.nameKey]).forEach((nameKey) => {
      if (!nameKey) return;
      if (!byNameKey.has(nameKey)) byNameKey.set(nameKey, []);
      byNameKey.get(nameKey).push(entry);
    });
  });
  return { byNameKey, entries };
}

function buildExplicitProjectedD1TeamKeys(rows) {
  const keys = new Set();
  (rows || []).forEach((row) => {
    buildTeamVariants(row?.team_full || row?.team_name).forEach((variant) => {
      if (variant) keys.add(variant);
    });
  });
  return Array.from(keys);
}

function getExplicitProjectedD1GroupsForStatusGroup(group, d1GroupIndex) {
  const matches = new Map();
  const candidateMap = new Map();
  (group?.nameKeys || [group?.nameKey]).forEach((nameKey) => {
    (d1GroupIndex?.byNameKey?.get(nameKey) || []).forEach((entry) => {
      if (entry?.group?.nodeId) candidateMap.set(entry.group.nodeId, entry);
    });
  });
  const candidates = Array.from(candidateMap.values());
  if (!candidates.length) return [];

  (group?.rows || []).forEach((row) => {
    getExplicitProjectedD1SeasonSpecs(row).forEach((spec) => {
      const targetGroup = findExplicitProjectedD1Group(candidates, row, spec)?.group || null;
      if (targetGroup?.nodeId) matches.set(targetGroup.nodeId, targetGroup);
    });
  });
  return Array.from(matches.values());
}

function getExplicitProjectedD1SeasonSpecs(row) {
  const baseSeason = normalizeSeasonValue(row?.season);
  if (!Number.isFinite(baseSeason)) return [];
  const specs = [];
  for (let index = 1; index <= 6; index += 1) {
    const team = getStringValue(row?.[`ncaa_team_y${index}`]).trim();
    const eligibility = getStringValue(row?.[`ncaa_eligibility_y${index}`]).trim();
    const heightText = getStringValue(row?.[`ncaa_height_y${index}`]).trim();
    const hasNumericEvidence = Number.isFinite(firstFinite(
      row?.[`ncaa_spi_y${index}`],
      row?.[`ncaa_rank_y${index}`],
      row?.[`ncaa_off_impact_y${index}`],
      row?.[`ncaa_def_impact_y${index}`],
      row?.[`ncaa_wins_added_y${index}`],
      Number.NaN,
    ));
    if (!hasNumericEvidence && !team && !eligibility && !heightText) continue;
    specs.push({
      team,
      heightIn: parseHeightToInches(heightText),
    });
  }
  return specs;
}

function rowHasExplicitProjectedD1Data(row) {
  return getExplicitProjectedD1SeasonSpecs(row).length > 0;
}

function getProjectedCollegeFreshmanYear(row) {
  const rawClassYear = Number(getStringValue(row?.class_year).trim());
  if (Number.isFinite(rawClassYear) && rawClassYear >= 1000 && rawClassYear < 3000) {
    return Math.round(rawClassYear) + 1;
  }
  const baseSeason = Number(normalizeSeasonValue(row?.season));
  const inferredClassYear = inferGrassrootsClassYear(
    row?.class_year,
    baseSeason,
    row?.age_range || row?.level || row?.event_name || row?.team_name
  );
  if (Number.isFinite(inferredClassYear) && inferredClassYear >= 1000) {
    return Math.round(inferredClassYear) + 1;
  }
  if (Number.isFinite(baseSeason)) return baseSeason + 1;
  return Number.NaN;
}

function projectedD1TimelineMatchesTargetGroup(targetGroup, sourceRow) {
  const expectedFreshmanYear = getProjectedCollegeFreshmanYear(sourceRow);
  const targetFirstYear = Number(targetGroup?.minYear);
  if (!Number.isFinite(expectedFreshmanYear) || !Number.isFinite(targetFirstYear)) return true;
  return Math.abs(targetFirstYear - expectedFreshmanYear) <= 1;
}

function findExplicitProjectedD1Group(candidates, sourceRow, spec) {
  if (!candidates?.length || !sourceRow) return null;
  const compatible = candidates.filter((entry) => explicitProjectedD1GroupCompatible(entry?.group, sourceRow, spec));
  if (!compatible.length) return null;

  const team = getStringValue(spec?.team).trim();
  if (!team) {
    if (compatible.length === 1) return compatible[0];
    return null;
  }

  const teamVariants = buildTeamVariants(team);
  const scored = compatible
    .map((entry) => ({
      entry,
      teamScore: Math.max(
        ...teamVariants.map((variant) => Math.max(...entry.teamKeys.map((candidateTeam) => teamMatchScore(variant, candidateTeam)), 0)),
        0,
      ),
    }))
    .sort((left, right) => right.teamScore - left.teamScore);
  const best = scored[0];
  const second = scored[1];
  if (!best || best.teamScore < 50) return null;
  if (second && (best.teamScore - second.teamScore) < 12 && best.teamScore < 90) return null;
  return best.entry;
}

function explicitProjectedD1GroupCompatible(targetGroup, sourceRow, spec) {
  if (!targetGroup) return false;
  if (!projectedD1TimelineMatchesTargetGroup(targetGroup, sourceRow)) return false;
  const sourceDob = getStringValue(sourceRow?.dob).trim();
  if (sourceDob && targetGroup.dobs?.length && !targetGroup.dobs.includes(sourceDob)) return false;

  if (targetGroup.heights?.length) {
    const anchorHeights = [
      firstFinite(sourceRow?.height_in, sourceRow?.inches, Number.NaN),
      spec?.heightIn,
    ].filter(Number.isFinite);
    if (anchorHeights.length && !targetGroup.heights.some((targetHeight) => anchorHeights.some((height) => Math.abs(height - targetHeight) <= 1))) {
      return false;
    }
  }
  return true;
}

function hasStatusPath(sourceGroup, graph, targetDatasetId, direction) {
  if (!sourceGroup?.nodeId || !graph?.nodes?.size) return false;
  const seen = new Set();
  const stack = [sourceGroup.nodeId];
  const edgeMap = direction === "backward" ? graph.backward : graph.forward;

  while (stack.length) {
    const nodeId = stack.pop();
    if (!nodeId || seen.has(nodeId)) continue;
    seen.add(nodeId);
    const nextIds = edgeMap.get(nodeId);
    if (!nextIds) continue;
    for (const nextId of nextIds) {
      if (seen.has(nextId)) continue;
      const nextGroup = graph.nodes.get(nextId);
      if (!nextGroup) continue;
      if (nextGroup.datasetId === targetDatasetId) return true;
      stack.push(nextId);
    }
  }

  return false;
}

function hasAnyStatusPath(sourceGroup, graph, targetDatasetId) {
  return hasStatusPath(sourceGroup, graph, targetDatasetId, "forward")
    || hasStatusPath(sourceGroup, graph, targetDatasetId, "backward");
}

function getReachableStatusGroups(sourceGroup, graph, targetDatasetId, direction) {
  if (!sourceGroup?.nodeId || !graph?.nodes?.size) return [];
  const seen = new Set([sourceGroup.nodeId]);
  const stack = [sourceGroup.nodeId];
  const edgeMap = direction === "backward" ? graph.backward : graph.forward;
  const matches = new Map();

  while (stack.length) {
    const nodeId = stack.pop();
    const nextIds = edgeMap.get(nodeId);
    if (!nextIds) continue;
    for (const nextId of nextIds) {
      if (seen.has(nextId)) continue;
      seen.add(nextId);
      const nextGroup = graph.nodes.get(nextId);
      if (!nextGroup) continue;
      if (nextGroup.datasetId === targetDatasetId) matches.set(nextId, nextGroup);
      stack.push(nextId);
    }
  }

  return Array.from(matches.values());
}

function annotateLinkedStatusMetrics(sourceDataset, graph) {
  if (!sourceDataset?.rows?.length || sourceDataset._linkedStatusMetricsAnnotated) return;
  const nbaDataset = appState.datasetCache?.nba;
  const nbaGroups = nbaDataset ? getStatusGroups(nbaDataset) : [];
  const nbaCareerByNodeId = new Map();
  nbaGroups.forEach((group) => {
    nbaCareerByNodeId.set(group.nodeId, aggregateCareerRows(nbaDataset, group.rows || []));
  });
  const nbaLookup = nbaDataset ? buildStatusLookupIndex(nbaGroups) : null;
  const sourceGroups = getStatusGroups(sourceDataset);
  sourceGroups.forEach((group) => {
    const d1Groups = getReachableStatusGroups(group, graph, "d1", "forward");
    const d1Rows = d1Groups.flatMap((targetGroup) => targetGroup.rows || []);
    const d1PeakPrpg = d1Rows.map((row) => row.porpag).filter(Number.isFinite);
    const d1PeakDprpg = d1Rows.map((row) => row.dporpag).filter(Number.isFinite);
    const d1PeakBpm = d1Rows.map((row) => row.bpm).filter(Number.isFinite);
    const linkedNbaCareer = nbaDataset
      ? selectBestNbaCareerCandidate(group, nbaGroups, nbaCareerByNodeId, graph, nbaLookup)
      : null;
    const nbaCareer = linkedNbaCareer;
    group.rows.forEach((row) => {
      if (d1PeakPrpg.length) row.d1_peak_prpg = roundNumber(Math.max(...d1PeakPrpg), 3);
      if (d1PeakDprpg.length) row.d1_peak_dprpg = roundNumber(Math.max(...d1PeakDprpg), 3);
      if (d1PeakBpm.length) row.d1_peak_bpm = roundNumber(Math.max(...d1PeakBpm), 1);
      if (Number.isFinite(nbaCareer?.tot)) row.nba_career_epm = roundNumber(nbaCareer.tot, 1);
      if (sourceDataset.id === "fiba" && nbaCareer?.player_name) {
        row.player_name = nbaCareer.player_name;
        row.player = nbaCareer.player_name;
        row._searchCacheKey = "";
        row._searchHaystack = "";
      }
    });
  });
  sourceDataset._linkedStatusMetricsAnnotated = true;
}

function getStatusGroupRealgmIds(group) {
  const ids = new Set();
  (group?.explicitIds || []).forEach((value) => {
    const text = getStringValue(value).trim();
    const match = text.match(/^(?:profile:)?rgm[_:](\d+)$/i);
    if (match) ids.add(match[1]);
  });
  (group?.rows || []).forEach((row) => {
    const realgmId = getStatusIdentityId(row);
    if (realgmId) ids.add(realgmId);
  });
  return Array.from(ids);
}

function statusGroupsMatch(left, right) {
  if (!left || !right || left.datasetId === right.datasetId) return false;
  const leftRealgmIds = getStatusGroupRealgmIds(left);
  const rightRealgmIds = getStatusGroupRealgmIds(right);
  if (leftRealgmIds.length && rightRealgmIds.length && !leftRealgmIds.some((id) => rightRealgmIds.includes(id))) return false;
  const leftKeys = new Set([...(left.nameKeys || [left.nameKey]), ...(left.identityKeys || [])]);
  const sharedKey = [...(right.nameKeys || [right.nameKey]), ...(right.identityKeys || [])].find((key) => leftKeys.has(key));
  if (!sharedKey) return false;
  if (left.dobs.length && right.dobs.length && !left.dobs.some((dob) => right.dobs.includes(dob))) return false;
  if (left.draftPicks.length && right.draftPicks.length && !left.draftPicks.some((pick) => right.draftPicks.includes(pick))) return false;
  if (left.rookieYears.length && right.rookieYears.length && !left.rookieYears.some((year) => right.rookieYears.includes(year))) return false;
  if (left.heights.length && right.heights.length) {
    const tolerance = statusHeightTolerance(left.datasetId, right.datasetId);
    const compatibleHeight = left.heights.some((height) => right.heights.some((other) => Math.abs(height - other) <= tolerance));
    if (!compatibleHeight) return false;
  }
  const sameStrictName = left.nameKey && right.nameKey && left.nameKey === right.nameKey;
  const hasIdentityAnchor = /^id\|/.test(sharedKey)
    || /^dob\|/.test(sharedKey)
    || /^lastdob\|/.test(sharedKey)
    || /^dobheight\|/.test(sharedKey)
    || /^dobdraft\|/.test(sharedKey)
    || /^dobrookie\|/.test(sharedKey)
    || /^draftheight\|/.test(sharedKey)
    || /^rookieheight\|/.test(sharedKey)
    || /^draftrookie\|/.test(sharedKey)
    || /^lastdraft\|/.test(sharedKey)
    || /^lastrookie\|/.test(sharedKey);
  if (!sameStrictName && !hasIdentityAnchor) return false;
  return true;
}

function isValidStatusTransition(sourceGroup, targetGroup) {
  if (!sourceGroup || !targetGroup || sourceGroup.datasetId === targetGroup.datasetId) return false;
  return getStatusTransitionPairs(sourceGroup, targetGroup).length > 0;
}

function buildStatusNameKeys(value) {
  const strictKey = normalizeNameKey(value);
  const looseKey = normalizeLooseNameKey(value);
  const keys = new Set([strictKey, looseKey].filter(Boolean));
  const tokens = strictKey.split(" ").filter(Boolean);
  if (tokens.length >= 3) {
    keys.add(tokens.slice(0, -1).join(" "));
    keys.add(tokens.slice(0, 2).join(" "));
    keys.add([tokens[0], tokens[tokens.length - 1]].join(" "));
  }
  if (tokens.length >= 4) {
    keys.add([tokens[0], tokens[1], tokens[tokens.length - 1]].join(" "));
  }
  return Array.from(keys).filter(Boolean);
}

function buildStatusIdentityKeys(meta, rows) {
  const keys = new Set();
  const preferredName = normalizeNameKey(getPreferredStatusName(rows));
  const lastName = getNameLastToken(preferredName);
  const heights = Array.from(new Set((meta?.heights || [])
    .map((height) => Math.round(Number(height)))
    .filter((height) => Number.isFinite(height))));
  const draftPicks = Array.from(new Set((meta?.draftPicks || [])
    .map((pick) => Math.round(Number(pick)))
    .filter((pick) => Number.isFinite(pick))));
  const rookieYears = Array.from(new Set((meta?.rookieYears || [])
    .map((year) => Math.round(Number(year)))
    .filter((year) => Number.isFinite(year))));

  (meta?.explicitIds || []).forEach((id) => {
    const key = normalizeKey(id);
    if (key) keys.add(`id|${key}`);
  });

  (meta?.dobs || []).forEach((dob) => {
    const dobKey = getStringValue(dob).trim();
    if (!dobKey) return;
    keys.add(`dob|${dobKey}`);
    if (lastName) keys.add(`lastdob|${lastName}|${dobKey}`);
    heights.forEach((height) => keys.add(`dobheight|${dobKey}|${height}`));
    draftPicks.forEach((pick) => keys.add(`dobdraft|${dobKey}|${pick}`));
    rookieYears.forEach((year) => keys.add(`dobrookie|${dobKey}|${year}`));
  });

  heights.forEach((height) => {
    if (lastName) keys.add(`lastheight|${lastName}|${height}`);
    draftPicks.forEach((pick) => keys.add(`draftheight|${pick}|${height}`));
    rookieYears.forEach((year) => keys.add(`rookieheight|${year}|${height}`));
  });

  draftPicks.forEach((pick) => {
    if (lastName) keys.add(`lastdraft|${lastName}|${pick}`);
    rookieYears.forEach((year) => keys.add(`draftrookie|${pick}|${year}`));
  });

  rookieYears.forEach((year) => {
    if (lastName) keys.add(`lastrookie|${lastName}|${year}`);
  });

  return Array.from(keys).filter(Boolean);
}

function buildStatusLookupIndex(groups) {
  const index = {
    byNameKey: new Map(),
    byIdentityKey: new Map(),
    byDob: new Map(),
    byDraftPick: new Map(),
    byRookieYear: new Map(),
    byLastName: new Map(),
  };

  (groups || []).forEach((group) => {
    addStatusLookupEntry(index.byNameKey, group.nameKeys || [group.nameKey], group);
    addStatusLookupEntry(index.byIdentityKey, group.identityKeys || [], group);
    addStatusLookupEntry(index.byDob, group.dobs || [], group);
    addStatusLookupEntry(index.byDraftPick, group.draftPicks || [], group);
    addStatusLookupEntry(index.byRookieYear, group.rookieYears || [], group);
    const lastName = getNameLastToken(getPreferredStatusName(group.rows));
    if (lastName) addStatusLookupEntry(index.byLastName, [lastName], group);
  });

  return index;
}

function addStatusLookupEntry(map, keys, group) {
  (keys || []).forEach((key) => {
    const normalized = getStringValue(key).trim();
    if (!normalized) return;
    if (!map.has(normalized)) map.set(normalized, new Map());
    map.get(normalized).set(group.nodeId, group);
  });
}

function collectStatusLookupGroups(index, keys) {
  const groups = new Map();
  (keys || []).forEach((key) => {
    const normalized = getStringValue(key).trim();
    if (!normalized) return;
    const bucket = index?.get(normalized);
    if (!bucket) return;
    bucket.forEach((group, nodeId) => {
      if (!groups.has(nodeId)) groups.set(nodeId, group);
    });
  });
  return Array.from(groups.values());
}

function getMinimumNumericGap(leftValues, rightValues) {
  if (!leftValues?.length || !rightValues?.length) return Number.NaN;
  let best = Number.POSITIVE_INFINITY;
  leftValues.forEach((left) => {
    rightValues.forEach((right) => {
      const gap = Math.abs(left - right);
      if (gap < best) best = gap;
    });
  });
  return Number.isFinite(best) && best !== Number.POSITIVE_INFINITY ? best : Number.NaN;
}

function findSharedValue(leftValues, rightValues) {
  if (!leftValues?.length || !rightValues?.length) return null;
  return leftValues.find((value) => rightValues.includes(value)) ?? null;
}

function scoreLinkedNbaCareerCandidate(sourceGroup, targetGroup, targetCareer, options = {}) {
  if (!sourceGroup || !targetGroup || targetGroup.datasetId !== "nba") return Number.NEGATIVE_INFINITY;

  const sourceName = normalizeNameKey(getPreferredStatusName(sourceGroup.rows));
  const targetName = normalizeNameKey(getPreferredStatusName(targetGroup.rows));
  const sourceLooseName = normalizeLooseNameKey(getPreferredStatusName(sourceGroup.rows));
  const targetLooseName = normalizeLooseNameKey(getPreferredStatusName(targetGroup.rows));
  const sourceLast = getNameLastToken(sourceName);
  const targetLast = getNameLastToken(targetName);
  const sourceNames = new Set([...(sourceGroup.nameKeys || [sourceGroup.nameKey]), sourceName].filter(Boolean));
  const targetNames = new Set([...(targetGroup.nameKeys || [targetGroup.nameKey]), targetName].filter(Boolean));
  const sharedNameKey = [...targetNames].find((key) => sourceNames.has(key));
  const sharedStrictName = sourceName && targetName && sourceName === targetName;
  const sharedLooseName = sourceLooseName && targetLooseName && sourceLooseName === targetLooseName;

  const sharedDob = findSharedValue(sourceGroup.dobs, targetGroup.dobs);
  const sharedDraftPick = findSharedValue(sourceGroup.draftPicks, targetGroup.draftPicks);
  const sharedRookieYear = findSharedValue(sourceGroup.rookieYears, targetGroup.rookieYears);
  const heightGap = getMinimumNumericGap(sourceGroup.heights, targetGroup.heights);

  if (sourceGroup.dobs.length && targetGroup.dobs.length && !sharedDob) return Number.NEGATIVE_INFINITY;
  if (sourceGroup.draftPicks.length && targetGroup.draftPicks.length && !sharedDraftPick) return Number.NEGATIVE_INFINITY;
  if (sourceGroup.rookieYears.length && targetGroup.rookieYears.length && !sharedRookieYear) return Number.NEGATIVE_INFINITY;
  if (Number.isFinite(heightGap) && heightGap > statusHeightTolerance(sourceGroup.datasetId, targetGroup.datasetId)) return Number.NEGATIVE_INFINITY;

  let score = 0;
  if (sharedStrictName) score += 240;
  else if (sharedLooseName) score += 200;
  else if (sharedNameKey && sharedNameKey !== sourceLast && sharedNameKey !== targetLast) score += 150;

  if (sharedDob) score += 260;
  if (sharedDraftPick) score += 220;
  if (sharedRookieYear) score += 180;

  const sourceYear = Number.isFinite(sourceGroup.maxYear) ? sourceGroup.maxYear : firstFinite(...(sourceGroup.years || []), Number.NaN);
  const targetRookieYear = Number.isFinite(targetGroup.minYear) ? targetGroup.minYear : firstFinite(...(targetGroup.rookieYears || []), Number.NaN);
  if (Number.isFinite(sourceYear) && Number.isFinite(targetRookieYear)) {
    const gap = Math.abs(targetRookieYear - sourceYear);
    score += Math.max(0, 120 - (gap * 35));
  }

  if (Number.isFinite(heightGap)) score += Math.max(0, 90 - (heightGap * 20));
  if (options.reachable) score += 35;
  score += Math.min(40, companionNbaCareerScore(targetCareer) / 50);
  return score;
}

function selectBestNbaCareerCandidate(sourceGroup, nbaGroups, nbaCareerByNodeId, graph, lookup, options = {}) {
  const candidates = new Map();
  const addCandidate = (group, reachable = false) => {
    if (!group || group.datasetId !== "nba") return;
    const current = candidates.get(group.nodeId);
    if (current) {
      current.reachable = current.reachable || reachable;
      return;
    }
    candidates.set(group.nodeId, { group, reachable });
  };

  const sourceYear = Number.isFinite(sourceGroup?.maxYear) ? sourceGroup.maxYear : firstFinite(...(sourceGroup?.years || []), Number.NaN);
  const yearKeys = Number.isFinite(sourceYear)
    ? [sourceYear - 1, sourceYear, sourceYear + 1]
    : [];

  collectStatusLookupGroups(lookup?.byNameKey, sourceGroup?.nameKeys || [sourceGroup?.nameKey]).forEach((group) => addCandidate(group));
  collectStatusLookupGroups(lookup?.byIdentityKey, sourceGroup?.identityKeys || []).forEach((group) => addCandidate(group));
  collectStatusLookupGroups(lookup?.byDob, sourceGroup?.dobs || []).forEach((group) => addCandidate(group));
  collectStatusLookupGroups(lookup?.byDraftPick, sourceGroup?.draftPicks || []).forEach((group) => addCandidate(group));
  collectStatusLookupGroups(lookup?.byRookieYear, yearKeys).forEach((group) => addCandidate(group));
  const lastName = getNameLastToken(getPreferredStatusName(sourceGroup?.rows || []));
  if (!candidates.size && lastName) collectStatusLookupGroups(lookup?.byLastName, [lastName]).forEach((group) => addCandidate(group));

  getReachableStatusGroups(sourceGroup, graph, "nba", "forward").forEach((group) => addCandidate(group, true));
  (options.candidateGroups || []).forEach((group) => addCandidate(group));

  let best = null;
  let secondBest = Number.NEGATIVE_INFINITY;
  candidates.forEach(({ group, reachable }) => {
    const career = nbaCareerByNodeId?.get(group.nodeId);
    if (!career) return;
    const score = scoreLinkedNbaCareerCandidate(sourceGroup, group, career, { reachable });
    if (score > secondBest) secondBest = score;
    if (!best || score > best.score) {
      best = { group, career, score, reachable };
    }
  });

  if (!best || best.score < 120) return null;
  if (secondBest > Number.NEGATIVE_INFINITY && (best.score - secondBest) < 20 && !best.reachable) return null;
  return best.career;
}

function getStatusTransitionPairs(sourceGroup, targetGroup) {
  if (!sourceGroup || !targetGroup) return [];
  const pairs = [];
  sourceGroup.rows.forEach((sourceRow) => {
    const sourceYear = extractLeadingYear(sourceRow.season);
    if (!Number.isFinite(sourceYear) || sourceYear <= 0) return;
    targetGroup.rows.forEach((targetRow) => {
      const targetYear = extractLeadingYear(targetRow.season);
      if (!Number.isFinite(targetYear) || targetYear <= sourceYear) return;
      if (isUnanchoredLowerTierLink(sourceGroup, targetGroup)) return;
      if (!statusRowsCompatible(sourceRow, targetRow, sourceGroup.datasetId, targetGroup.datasetId)) return;
      if (isAmbiguousLowerTierPromotion(sourceGroup, targetGroup, sourceYear)) return;
      const gap = targetYear - sourceYear;
      if (gap < 1 || gap > maxStatusGap(sourceGroup, targetGroup, sourceYear)) return;
      if (targetGroup.datasetId === "nba" && !["d1", "d2", "fiba"].includes(sourceGroup.datasetId)) return;
      if (isLowerTierFreshmanJump(sourceGroup, targetGroup, targetRow)) return;
      if (isPre21NbaBlock(sourceGroup, targetGroup, targetRow)) return;
      if (isGraduationBlockedDrop(sourceRow, sourceGroup, targetGroup)) return;
      pairs.push({ sourceRow, targetRow, gap });
    });
  });
  return pairs;
}

function isUnanchoredLowerTierLink(sourceGroup, targetGroup) {
  if (!sourceGroup || !targetGroup) return false;
  const sourceTier = datasetTier(sourceGroup.datasetId);
  const targetTier = datasetTier(targetGroup.datasetId);
  if (sourceTier === targetTier) return false;
  const lowerGroup = sourceTier < targetTier ? sourceGroup : targetGroup;
  const higherGroup = sourceTier < targetTier ? targetGroup : sourceGroup;
  if (!["d2", "juco", "naia"].includes(lowerGroup.datasetId)) return false;
  if (!["d1", "nba"].includes(higherGroup.datasetId)) return false;
  const hasIdentityAnchor = (lowerGroup.dobs.length && higherGroup.dobs.length)
    || (lowerGroup.heights.length && higherGroup.heights.length);
  if (hasIdentityAnchor) return false;
  return higherGroup.years.length > 1;
}

function isAmbiguousLowerTierPromotion(sourceGroup, targetGroup, sourceYear) {
  if (!sourceGroup || !targetGroup) return false;
  if (!["d2", "juco", "naia"].includes(sourceGroup.datasetId)) return false;
  if (!["d1", "nba"].includes(targetGroup.datasetId)) return false;
  if (targetGroup.minYear >= sourceYear) return false;
  const hasIdentityAnchor = (sourceGroup.dobs.length && targetGroup.dobs.length)
    || (sourceGroup.heights.length && targetGroup.heights.length);
  return !hasIdentityAnchor;
}

function isLowerTierFreshmanJump(sourceGroup, targetGroup, targetRow) {
  if (!sourceGroup || !targetGroup) return false;
  if (!["d2", "juco", "naia"].includes(sourceGroup.datasetId)) return false;
  if (targetGroup.datasetId !== "d1") return false;
  return normalizeClassValue(targetRow?.class_year) === "Fr";
}

function getStatusAgeValue(row) {
  const directAge = firstFinite(row?.age, Number.NaN);
  if (Number.isFinite(directAge)) return directAge;
  const season = extractLeadingYear(row?.season);
  const dob = getStringValue(row?.dob).trim();
  if (!season || !dob) return Number.NaN;
  const parsedDob = new Date(dob);
  if (Number.isNaN(parsedDob.getTime())) return Number.NaN;
  const ref = new Date(Number(season), 5, 23);
  return (ref - parsedDob) / (1000 * 60 * 60 * 24 * 365.25);
}

function isPre21NbaBlock(sourceGroup, targetGroup, targetRow) {
  if (!sourceGroup || !targetGroup) return false;
  if (!["d2", "juco", "naia"].includes(sourceGroup.datasetId)) return false;
  if (targetGroup.datasetId !== "nba") return false;
  const age = getStatusAgeValue(targetRow);
  return Number.isFinite(age) && age < 21;
}

function statusRowsCompatible(sourceRow, targetRow, sourceDatasetId = "", targetDatasetId = "") {
  const sourceDob = getStringValue(sourceRow?.dob).trim();
  const targetDob = getStringValue(targetRow?.dob).trim();
  if (sourceDob && targetDob && sourceDob !== targetDob) return false;
  const sourceDraftPick = sourceRow?._draftPickBlank ? Number.NaN : Number(sourceRow?.draft_pick);
  const targetDraftPick = targetRow?._draftPickBlank ? Number.NaN : Number(targetRow?.draft_pick);
  if (Number.isFinite(sourceDraftPick) && Number.isFinite(targetDraftPick) && sourceDraftPick !== targetDraftPick) return false;
  const sourceRookieYear = Number(sourceRow?.rookie_year);
  const targetRookieYear = Number(targetRow?.rookie_year);
  if (Number.isFinite(sourceRookieYear) && Number.isFinite(targetRookieYear) && sourceRookieYear !== targetRookieYear) return false;
  const sourceHeight = firstFinite(sourceRow?.height_in, sourceRow?.inches, Number.NaN);
  const targetHeight = firstFinite(targetRow?.height_in, targetRow?.inches, Number.NaN);
  if (Number.isFinite(sourceHeight) && Number.isFinite(targetHeight)) {
    const tolerance = statusHeightTolerance(sourceDatasetId, targetDatasetId);
    if (Math.abs(sourceHeight - targetHeight) > tolerance) return false;
  }
  return true;
}

function statusHeightTolerance(leftDatasetId, rightDatasetId) {
  return leftDatasetId === "fiba" || rightDatasetId === "fiba" ? 3 : 1;
}

function maxStatusGap(sourceGroup, targetGroup, sourceYear) {
  if (sourceGroup.datasetId === "d1" && targetGroup.datasetId === "nba") return 2;
  if (sourceGroup.datasetId === "fiba" && targetGroup.datasetId === "d1") return 8;
  if (sourceGroup.datasetId === "fiba" && targetGroup.datasetId === "nba") return 12;
  if (sourceGroup.datasetId === "d2" && targetGroup.datasetId === "d1") {
    return sourceYear <= 2020 ? 2 : 1;
  }
  return 1;
}

function isGraduationBlockedDrop(sourceRow, sourceGroup, targetGroup) {
  const sourceTier = datasetTier(sourceGroup.datasetId);
  const targetTier = datasetTier(targetGroup.datasetId);
  if (!(targetTier < sourceTier)) return false;
  const sourceClass = normalizeClassValue(sourceRow?.class_year);
  const sourceMinutes = getMinutesValue(sourceRow);
  return ["Sr", "Gr"].includes(sourceClass) && sourceMinutes >= MINUTES_DEFAULT;
}

function datasetTier(datasetId) {
  if (datasetId === "juco") return 1;
  if (datasetId === "naia") return 2;
  if (datasetId === "d2") return 3;
  if (datasetId === "d1") return 4;
  if (datasetId === "nba") return 5;
  return 0;
}

function enrichD1Rows(rows) {
  const rawRows = typeof playersData !== "undefined" ? playersData : (window.playersData || []);
  const runnerMetrics = typeof RUNNER_METRICS !== "undefined" ? RUNNER_METRICS : (window.RUNNER_METRICS || []);
  const drivesHeaders = typeof DRIVES_HEADERS !== "undefined" ? DRIVES_HEADERS : (window.DRIVES_HEADERS || []);
  const drivesData = typeof DRIVES_DATA !== "undefined" ? DRIVES_DATA : (window.DRIVES_DATA || {});
  const advHeaders = typeof ADV_HEADERS !== "undefined" ? ADV_HEADERS : (window.ADV_HEADERS || []);
  const advData = typeof ADV_DATA !== "undefined" ? ADV_DATA : (window.ADV_DATA || {});
  const coachDict = typeof COACH_DICT !== "undefined" ? COACH_DICT : (window.COACH_DICT || {});
  const rosterData = typeof ROSTER_DATA !== "undefined" ? ROSTER_DATA : (window.ROSTER_DATA || {});

  const rawIndex = buildD1CandidateMap(rawRows.map((values) => ({
    season: values[2],
    player: values[0],
    team: values[1],
    poss: Number(values[4]),
    draftPickHint: Number.isFinite(Number(values[6])) && Number(values[6]) > 0 ? Number(values[6]) : Number.NaN,
    classYearHint: values[7],
    heightHint: parseHeightToInches(values[8]),
    isRawCandidate: true,
    values,
  })));
  const advIndex = Object.fromEntries(advHeaders.map((header, index) => [header, index]));
  const advEntries = Object.entries(advData).map(([key, values]) => {
    const [season = "", team = "", player = ""] = key.split("|");
    return { season, player, team, values };
  });
  const advMap = buildD1CandidateMap(advEntries);
  const driveEntries = Object.entries(drivesData).map(([key, values]) => {
    const [season = "", team = "", player = ""] = key.split("|");
    return { season, player, team, values };
  });
  const driveMap = buildD1CandidateMap(driveEntries);
  const rosterEntries = Object.entries(rosterData).map(([key, values]) => {
    const [season = "", team = "", player = ""] = key.split("|");
    return { season, player, team, values };
  });
  const rosterMap = buildD1CandidateMap(rosterEntries);
  const runnerIndex = Object.fromEntries(runnerMetrics.map((metric, index) => [metric, index]));
  const driveIndex = Object.fromEntries(drivesHeaders.map((metric, index) => [metric, index]));
  const rawMatches = assignD1CandidateMatches(rows, rawIndex);
  const advMatches = assignD1CandidateMatches(rows, advMap);
  const driveMatches = assignD1CandidateMatches(rows, driveMap);
  const rosterMatches = assignD1CandidateMatches(rows, rosterMap);

  rows.forEach((row) => {
    const rawMatch = rawMatches.get(row) || null;
    const advMatch = advMatches.get(row) || null;
    const driveMatch = driveMatches.get(row) || null;
    const rosterMatch = rosterMatches.get(row) || null;

    if (rawMatch?.values) {
      row._rawTeamScore = rawMatch._teamScore;
      const rawValues = rawMatch.values;
      if (Number.isFinite(Number(rawValues[3]))) row.gp = Number(rawValues[3]);
      if (Number.isFinite(Number(rawValues[4]))) row.total_poss = Number(rawValues[4]);
      if (rawValues[7]) row.class_year = normalizeClassValue(rawValues[7]);
      if (!Number.isFinite(row.height_in)) {
        const height = parseHeightToInches(rawValues[8]);
        if (Number.isFinite(height)) row.height_in = height;
      }
      if (Number.isFinite(Number(rawValues[6]))) row.draft_pick = Number(rawValues[6]);

      const runnerBase = 229;
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["%Time"], "runner_freq");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex.PPP, "runner_ppp");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["FTA/FGA"], "runner_ftr");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["FG Att"], "runner_fg_att");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["FG%"], "runner_fg_pct");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex.SSQ, "runner_ssq");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex.SSM, "runner_ssm");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["+1%"], "runner_plus1_pct");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["2 FG Att"], "runner_two_fg_att");
      assignD1RawMetric(row, rawValues, runnerBase, runnerIndex["2 FG%"], "runner_two_fg_pct");
    }

    if (advMatch?.values) {
      row._advTeamScore = advMatch._teamScore;
      const advValues = advMatch.values;
      if (advValues[advIndex.pid] != null && advValues[advIndex.pid] !== "") {
        const advPlayerId = getStringValue(advValues[advIndex.pid]).trim();
        if (advPlayerId) {
          if (!getStringValue(row.source_player_id).trim()) row.source_player_id = advPlayerId;
          if (!getExplicitIdentityId(row)) row.player_id = advPlayerId;
        }
      }
      assignIfFinite(row, "gp", advValues[advIndex.GP]);
      assignIfFinite(row, "min_per", advValues[advIndex.Min_per]);
      assignIfFinite(row, "mpg", advValues[advIndex.mp]);
      if (!Number.isFinite(row.min) && Number.isFinite(row.mpg) && Number.isFinite(row.gp) && row.gp > 0) {
        row.min = roundNumber(row.mpg * row.gp, 1);
      }
      const gp = firstFinite(row.gp, Number.NaN);
      [
        ["ortg", "ORtg"], ["drtg", "drtg"], ["adjoe", "adjoe"], ["adrtg", "adrtg"], ["porpag", "porpag"], ["dporpag", "dporpag"],
        ["bpm", "bpm"], ["obpm", "obpm"], ["dbpm", "dbpm"], ["orb_pct", "ORB_per"], ["drb_pct", "DRB_per"], ["ast_pct", "AST_per"],
        ["tov_pct_adv", "TO_per"], ["stl_pct", "stl_per"], ["blk_pct", "blk_per"], ["usg_pct", "usg"], ["ast_to", "ast/tov"],
        ["ft_pct", "FT_per"], ["two_p_pct_adv", "twoP_per"], ["three_p_pct_adv", "TP_per"], ["three_p_per100", "3p/100?"], ["pf_per40", "pfr"]
      ].forEach(([target, source]) => assignIfFinite(row, target, advValues[advIndex[source]]));
      [
        ["pts", "pts"], ["orb", "oreb"], ["drb", "dreb"], ["trb", "treb"], ["ast", "ast"], ["stl", "stl"], ["blk", "blk"],
      ].forEach(([target, source]) => {
        const perGameValue = Number(advValues[advIndex[source]]);
        if (Number.isFinite(perGameValue) && Number.isFinite(gp)) {
          row[target] = roundNumber(perGameValue * gp, 3);
        }
      });
      [
        ["fta", "FTA"], ["ftm", "FTM"], ["two_pa", "twoPA"], ["two_pm", "twoPM"], ["three_pa", "TPA"], ["three_pm", "TPM"],
      ].forEach(([target, source]) => assignIfFinite(row, target, advValues[advIndex[source]]));
      assignD1AdvShotProfile(row, advValues, advIndex);
      if (!Number.isFinite(row.fga) && Number.isFinite(row.two_pa) && Number.isFinite(row.three_pa)) row.fga = row.two_pa + row.three_pa;
      if (!Number.isFinite(row.fgm) && Number.isFinite(row.two_pm) && Number.isFinite(row.three_pm)) row.fgm = row.two_pm + row.three_pm;
      if (!Number.isFinite(row.tov) && Number.isFinite(row.ast) && Number.isFinite(row.ast_to) && row.ast_to > 0) {
        row.tov = roundNumber(row.ast / row.ast_to, 3);
      }
      if (!Number.isFinite(row.tov) && Number.isFinite(row.total_poss) && Number.isFinite(row.tov_pct_adv)) {
        row.tov = roundNumber(row.total_poss * (row.tov_pct_adv / 100), 3);
      }
      populateD1FoulDerived(row);
      row.conference = getStringValue(advValues[advIndex.conf]) || row.conference;
      row.class_year = normalizeClassValue(advValues[advIndex.yr]) || row.class_year;
      const height = parseHeightToInches(advValues[advIndex.ht]);
      if (Number.isFinite(height)) row.height_in = height;
      row.dob = getStringValue(advValues[advIndex.birthday]) || row.dob;
      row.pos = normalizePosLabel(advValues[advIndex.role]) || row.pos;
    }

    if (driveMatch?.values) {
      const driveValues = driveMatch.values;
      const driveMetric = (name) => finiteSourceNumber(driveValues[driveIndex[name]]);
      const drivePoss = driveMetric("Poss");
      const drivePoints = driveMetric("Points");
      const driveTov = driveMetric("TO");
      const driveFta = driveMetric("FTA");
      const driveFgm = driveMetric("FGM");
      const driveFga = driveMetric("FGA");
      const driveTwoPm = driveMetric("2FGM");
      const driveTwoPa = driveMetric("2FGA");
      const drivePlus1 = driveMetric("+1");
      const totalPoss = firstFinite(row.total_poss, rawMatch?.poss, Number.NaN);
      if (Number.isFinite(drivePoints)) row.drive_points = drivePoints;
      if (Number.isFinite(driveTov)) row.drive_tov = driveTov;
      if (Number.isFinite(driveFta)) row.drive_fta = driveFta;
      if (Number.isFinite(driveFgm)) row.drive_fgm = driveFgm;
      if (Number.isFinite(driveTwoPm)) row.drive_two_pm = driveTwoPm;
      if (Number.isFinite(drivePlus1)) row.drive_plus1 = drivePlus1;
      if (Number.isFinite(drivePoss) && Number.isFinite(totalPoss) && totalPoss > 0) {
        row.drive_freq = roundNumber((drivePoss / totalPoss) * 100, 1);
        const transitionPoss = Number.isFinite(row.transition_freq) ? (totalPoss * row.transition_freq) / 100 : firstFinite(row.transition_poss, Number.NaN);
        const halfcourtPoss = totalPoss - transitionPoss;
        if (halfcourtPoss > 0) row.hc_drive_freq = roundNumber((drivePoss / halfcourtPoss) * 100, 1);
      }
      if (Number.isFinite(drivePoss) && drivePoss > 0 && Number.isFinite(drivePoints)) {
        row.drive_ppp = roundNumber(drivePoints / drivePoss, 3);
      }
      if (Number.isFinite(drivePoss)) row.drive_poss = drivePoss;
      if (Number.isFinite(driveFga)) row.drive_fga = driveFga;
      if (Number.isFinite(driveTwoPa)) row.drive_two_pa = driveTwoPa;
      row.drive_fg_pct = percentIfPossible(driveFgm, driveFga);
      row.drive_two_p_pct = percentIfPossible(driveTwoPm, driveTwoPa);
      row.drive_tov_pct = percentOfPossessions(driveTov, drivePoss);
      row.drive_ftr = ratioIfPossible(driveFta, driveFga);
      row.drive_plus1_pct = percentOfPossessions(drivePlus1, drivePoss);
    }

    if (rosterMatch?.values && !Number.isFinite(row.weight_lb)) {
      assignIfFinite(row, "weight_lb", rosterMatch.values.weight);
    }

    const coachName = getD1CoachName(row.season, rawMatch?.team || row.team_full || row.team_name, coachDict);
    if (coachName) row.coach = coachName;
    normalizeD1DriveMetrics(row);
    normalizeD1RimScoringMetrics(row);
    refreshDerivedBiography(row);
  });
  repairD1SplitAliasRows(rows);
  resolveD1SharedNameAssignments(rows);
}

function buildTeamVariants(value) {
  const raw = normalizeKey(value);
  const simplified = normalizeKey(simplifySchoolName(value, "d1"));
  const variants = new Set([raw, simplified]);
  const parts = simplified.split(" ").filter(Boolean);
  if (parts.length > 1) variants.add(parts.slice(0, -1).join(" "));
  return Array.from(variants).filter(Boolean);
}

function enrichNaiaRows(rows) {
  const csv = window.MASSEY_TEAM_CSV || "";
  const seasonMap = new Map();
  if (csv) {
    parseCSV(String(csv)).forEach((entry) => {
      const season = normalizeSeasonValue(entry.season);
      if (!season) return;
      buildSchoolKeys(entry.team, "naia").forEach((teamKey) => {
        seasonMap.set(`${season}|${teamKey}`, entry);
      });
    });
  }
  const divisionMap = window.NAIA_DIVISION_MAP || {};
  const divisionTeamMap = window.NAIA_DIVISION_TEAM_MAP || {};
  rows.forEach((row) => {
    const season = getStringValue(row.season);
    const candidates = buildSchoolKeys(row.team_full || row.team_name, "naia");
    const entry = candidates.map((key) => seasonMap.get(`${season}|${key}`)).find(Boolean);
    if (entry?.conference && !row.conference) row.conference = entry.conference;
    if (entry?.division && !row.division) row.division = normalizeNaiaDivision(entry.division);
    if (row.division) return;
    const resolved = resolveNaiaDivisionName(row.team_full || row.team_name, row.season);
    if (resolved) {
      row.division = normalizeNaiaDivision(resolved);
      return;
    }
    const legacySeason = normalizeLegacySeason(row.season);
    for (const candidate of candidates) {
      const seasonKey = `${legacySeason}|${candidate}`;
      if (divisionMap[seasonKey]) {
        row.division = normalizeNaiaDivision(divisionMap[seasonKey]);
        return;
      }
      if (divisionTeamMap[candidate]) {
        row.division = normalizeNaiaDivision(divisionTeamMap[candidate]);
        return;
      }
    }
  });
}

function backfillNaiaDivisionFromConference(rows) {
  const confSeasonMap = new Map();
  const confMap = new Map();

  rows.forEach((row) => {
    const conference = getStringValue(row.conference).trim();
    const division = normalizeNaiaDivision(row.division);
    if (!conference || !division) return;
    const confKey = normalizeKey(conference);
    const season = getStringValue(row.season);
    incrementValueCounter(confSeasonMap, `${season}|${confKey}`, division);
    incrementValueCounter(confMap, confKey, division);
  });

  rows.forEach((row) => {
    const normalized = normalizeNaiaDivision(row.division);
    if (normalized) {
      row.division = normalized;
      return;
    }
    const conference = getStringValue(row.conference).trim();
    if (!conference) return;
    const confKey = normalizeKey(conference);
    const season = getStringValue(row.season);
    const seasonGuess = normalizeNaiaDivision(pickBestCounterValue(confSeasonMap.get(`${season}|${confKey}`), false));
    const confGuess = normalizeNaiaDivision(pickBestCounterValue(confMap.get(confKey), true));
    const textGuess = normalizeNaiaDivision(inferNaiaDivisionFromText(conference));
    row.division = seasonGuess || confGuess || textGuess || row.division;
  });
}

function backfillTeamSeasonFields(rows, fields) {
  const seasonMaps = Object.fromEntries(fields.map((field) => [field, new Map()]));
  const teamMaps = Object.fromEntries(fields.map((field) => [field, new Map()]));

  rows.forEach((row) => {
    const season = getStringValue(row.season);
    const teamKey = normalizeKey(row.team_full || row.team_name);
    if (!teamKey) return;
    fields.forEach((field) => {
      const value = getStringValue(row[field]).trim();
      if (!value) return;
      incrementValueCounter(seasonMaps[field], `${season}|${teamKey}`, value);
      incrementValueCounter(teamMaps[field], teamKey, value);
    });
  });

  rows.forEach((row) => {
    const season = getStringValue(row.season);
    const teamKey = normalizeKey(row.team_full || row.team_name);
    if (!teamKey) return;
    fields.forEach((field) => {
      if (getStringValue(row[field]).trim()) return;
      const seasonValue = pickBestCounterValue(seasonMaps[field].get(`${season}|${teamKey}`), false);
      const teamValue = pickBestCounterValue(teamMaps[field].get(teamKey), true);
      if (seasonValue) row[field] = seasonValue;
      else if (teamValue) row[field] = teamValue;
    });
  });
}

function finalizeCategoricalFields(rows, datasetId) {
  rows.forEach((row) => {
    if (datasetId === "d1") {
      const conf = getStringValue(row.conference);
      if (!conf) row.conference = "Ind";
      else if (conf.toLowerCase() === "ind") row.conference = "Ind";
    }
    if (datasetId === "naia") {
      if (!getStringValue(row.conference)) row.conference = "Independent";
    }
    if (datasetId === "juco") {
      if (!getStringValue(row.region)) row.region = "Unknown";
    }
    row.team_search_text = Array.from(new Set([row.team_name, row.team_full, row.team_alias, row.team_alias_all].map((value) => getStringValue(value).trim()).filter(Boolean))).join(" ");
    row.coach_search_text = getStringValue(row.coach).trim();
  });
}

function incrementValueCounter(map, key, value) {
  if (!key || !value) return;
  if (!map.has(key)) map.set(key, new Map());
  const counter = map.get(key);
  counter.set(value, (counter.get(value) || 0) + 1);
}

function pickBestCounterValue(counter, requireDominant) {
  if (!counter || !counter.size) return "";
  const values = Array.from(counter.entries()).sort((left, right) => right[1] - left[1]);
  if (!values.length) return "";
  if (!requireDominant || values.length === 1) return values[0][0];
  if (values[0][1] >= (values[1]?.[1] || 0) * 2) return values[0][0];
  return "";
}

function normalizeNaiaDivision(value) {
  return inferNaiaDivisionFromText(value);
}

function inferNaiaDivisionFromText(value) {
  const text = getStringValue(value).toUpperCase();
  if (!text) return "";
  if (/\bDII\b|\bDIVISION\s*II\b|\bNAIA\s*II\b/.test(text)) return "DII";
  if (/\bDI\b|\bDIVISION\s*I\b|\bNAIA\s*I\b/.test(text)) return "DI";
  return "";
}

function simplifyKeyWithStopwords(key, stopwords) {
  if (!key) return "";
  return key.split(" ").filter((word) => word && !stopwords.has(word)).join(" ");
}

function stripNaiaStateTokens(key) {
  if (!key) return "";
  return key.split(" ").filter((word) => word && !NAIA_STATE_TOKENS.has(word)).join(" ");
}

function seasonEndYear(value) {
  const season = Number(normalizeSeasonValue(value));
  return Number.isFinite(season) ? season : null;
}

function buildNaiaDivisionLookups() {
  if (naiaDivisionLookup && naiaDivisionTeamLookup && naiaDivisionHistory) return;
  const divisionMap = window.NAIA_DIVISION_MAP || {};
  const divisionTeamMap = window.NAIA_DIVISION_TEAM_MAP || {};
  const seasonCandidates = new Map();
  const teamCandidates = new Map();
  const history = new Map();

  const addCandidate = (map, key, division) => {
    if (!key || !division) return;
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(division);
  };

  Object.keys(divisionMap).forEach((fullKey) => {
    if (!fullKey.includes("|")) return;
    const [season, rawKey] = fullKey.split("|");
    const division = normalizeNaiaDivision(divisionMap[fullKey]);
    if (!season || !rawKey || !division) return;
    const variants = [
      rawKey,
      stripNaiaStateTokens(rawKey),
      simplifyKeyWithStopwords(rawKey, NAIA_DIVISION_STOPWORDS),
      simplifyKeyWithStopwords(rawKey, NAIA_DIVISION_STOPWORDS_EXT),
      simplifyKeyWithStopwords(stripNaiaStateTokens(rawKey), NAIA_DIVISION_STOPWORDS),
      simplifyKeyWithStopwords(stripNaiaStateTokens(rawKey), NAIA_DIVISION_STOPWORDS_EXT),
    ].filter(Boolean);
    variants.forEach((variant) => addCandidate(seasonCandidates, `${normalizeSeasonValue(season)}|${variant}`, division));
    const endYear = seasonEndYear(season);
    if (!endYear) return;
    if (!history.has(rawKey)) history.set(rawKey, []);
    history.get(rawKey).push({ year: endYear, division });
  });

  Object.keys(divisionTeamMap).forEach((rawKey) => {
    const division = normalizeNaiaDivision(divisionTeamMap[rawKey]);
    if (!rawKey || !division) return;
    [
      rawKey,
      stripNaiaStateTokens(rawKey),
      simplifyKeyWithStopwords(rawKey, NAIA_DIVISION_STOPWORDS),
      simplifyKeyWithStopwords(rawKey, NAIA_DIVISION_STOPWORDS_EXT),
      simplifyKeyWithStopwords(stripNaiaStateTokens(rawKey), NAIA_DIVISION_STOPWORDS),
      simplifyKeyWithStopwords(stripNaiaStateTokens(rawKey), NAIA_DIVISION_STOPWORDS_EXT),
    ].filter(Boolean).forEach((variant) => addCandidate(teamCandidates, variant, division));
  });

  const seasonLookup = {};
  seasonCandidates.forEach((set, key) => {
    if (set.size === 1) seasonLookup[key] = Array.from(set)[0];
  });
  const teamLookup = {};
  teamCandidates.forEach((set, key) => {
    if (set.size === 1) teamLookup[key] = Array.from(set)[0];
  });
  history.forEach((list) => list.sort((left, right) => left.year - right.year));

  naiaDivisionLookup = seasonLookup;
  naiaDivisionTeamLookup = teamLookup;
  naiaDivisionHistory = history;
}

function getNaiaDivisionCandidates(teamName) {
  const raw = normalizeKey(teamName);
  if (!raw) return [];
  const noParen = normalizeKey(getStringValue(teamName).replace(/\([^)]*\)/g, " "));
  const candidates = [];
  const push = (value) => {
    if (value && !candidates.includes(value)) candidates.push(value);
  };
  push(raw);
  push(noParen);
  [...candidates].forEach((candidate) => {
    const noState = stripNaiaStateTokens(candidate);
    push(noState);
    push(simplifyKeyWithStopwords(candidate, NAIA_DIVISION_STOPWORDS));
    push(simplifyKeyWithStopwords(candidate, NAIA_DIVISION_STOPWORDS_EXT));
    push(simplifyKeyWithStopwords(noState, NAIA_DIVISION_STOPWORDS));
    push(simplifyKeyWithStopwords(noState, NAIA_DIVISION_STOPWORDS_EXT));
  });
  return candidates;
}

function resolveNaiaDivisionName(teamName, season) {
  buildNaiaDivisionLookups();
  const candidates = getNaiaDivisionCandidates(teamName);
  const endYear = seasonEndYear(season);

  const resolveFromHistory = (key) => {
    if (!naiaDivisionHistory || !endYear) return "";
    const list = naiaDivisionHistory.get(key);
    if (!list?.length) return "";
    let latest = "";
    for (let index = 0; index < list.length; index += 1) {
      if (list[index].year <= endYear) latest = list[index].division;
      else break;
    }
    return latest || list[0].division || "";
  };

  for (const candidate of candidates) {
    const alias = NAIA_DIVISION_ALIASES[candidate];
    if (alias) {
      const aliasDivision = inferNaiaDivisionFromText(alias);
      if (aliasDivision) return aliasDivision;
      const aliasSeasonKey = `${normalizeSeasonValue(season)}|${alias}`;
      if (naiaDivisionLookup?.[aliasSeasonKey]) return naiaDivisionLookup[aliasSeasonKey];
      if (naiaDivisionTeamLookup?.[alias]) return naiaDivisionTeamLookup[alias];
      const aliasHistory = resolveFromHistory(alias);
      if (aliasHistory) return aliasHistory;
    }

    const seasonKey = `${normalizeSeasonValue(season)}|${candidate}`;
    if (naiaDivisionLookup?.[seasonKey]) return naiaDivisionLookup[seasonKey];
    if (naiaDivisionTeamLookup?.[candidate]) return naiaDivisionTeamLookup[candidate];
    const historyDivision = resolveFromHistory(candidate);
    if (historyDivision) return historyDivision;
  }
  return "";
}

function normalizeKey(value) {
  return getStringValue(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\ba\s*&\s*m\b/g, "a m")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTeamToken(value) {
  return getStringValue(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function buildSchoolKeys(value, datasetId) {
  const raw = getStringValue(value).trim();
  if (!raw) return [];
  const keys = new Set();
  const push = (candidate) => {
    const key = normalizeKey(candidate);
    if (key) keys.add(key);
  };
  push(raw);
  push(raw.replace(/\([^)]*\)/g, " "));
  push(simplifySchoolName(raw, datasetId));
  const strippedState = stripStateTokens(raw);
  if (strippedState !== raw) push(strippedState);
  return Array.from(keys);
}

function stripStateTokens(value) {
  const tokens = normalizeKey(value).split(" ").filter(Boolean);
  const cleaned = tokens.filter((token) => !TEAM_STATE_TOKENS.has(token));
  return cleaned.join(" ");
}

function teamMatchScore(left, right) {
  if (!left || !right) return 0;
  if (left === right) return 100;
  const leftTokens = new Set(left.split(" ").filter(Boolean));
  const rightTokens = new Set(right.split(" ").filter(Boolean));
  let overlap = 0;
  rightTokens.forEach((token) => {
    if (leftTokens.has(token)) overlap += 1;
  });
  if (!overlap) return 0;
  const minSize = Math.min(leftTokens.size, rightTokens.size);
  const maxSize = Math.max(leftTokens.size, rightTokens.size);
  if (overlap === minSize && minSize >= 2) return 82;
  return Math.round((overlap / maxSize) * 70);
}

function buildD1CandidateMap(entries) {
  const map = new Map();
  let counter = 0;
  entries.forEach((entry) => {
    if (!entry._candidateId) entry._candidateId = `d1cand_${counter += 1}`;
    const season = getStringValue(normalizeSeasonValue(entry.season));
    const name = normalizeNameKey(entry.player);
    if (!season || !name) return;
    const looseName = normalizeLooseNameKey(entry.player);
    const lastName = getNameLastToken(entry.player);
    entry.nameKey = name;
    entry.looseNameKey = looseName;
    entry.lastNameKey = lastName;
    if (entry.isRawCandidate) {
      const draftPick = Number(entry.draftPickHint);
      entry.draftPickHint = Number.isFinite(draftPick) ? draftPick : Number.NaN;
      entry.classYearHint = normalizeClassValue(entry.classYearHint);
      const height = Number(entry.heightHint);
      entry.heightHint = Number.isFinite(height) ? height : Number.NaN;
    }
    const keys = new Set([name]);
    if (looseName) keys.add(looseName);
    if (lastName) keys.add(lastName);
    if (entry.isRawCandidate) {
      const draftPick = Number(entry.draftPickHint);
      if (Number.isFinite(draftPick)) {
        const pickKey = `pick:${Math.round(draftPick)}`;
        keys.add(`${name}|${pickKey}`);
        if (lastName) keys.add(`${lastName}|${pickKey}`);
      }
    }
    keys.forEach((key) => {
      const seasonKey = `${season}|${key}`;
      if (!map.has(seasonKey)) map.set(seasonKey, []);
      map.get(seasonKey).push(entry);
    });
  });
  return map;
}

function collectD1Candidates(index, seasonValue, playerName) {
  const season = getStringValue(normalizeSeasonValue(seasonValue));
  if (!season) return [];
  const nameKeys = Array.from(new Set([
    normalizeNameKey(playerName),
    normalizeLooseNameKey(playerName),
    getNameLastToken(playerName),
  ].filter(Boolean)));
  const unique = new Map();
  nameKeys.forEach((nameKey) => {
    (index.get(`${season}|${nameKey}`) || []).forEach((entry) => {
      if (!entry?._candidateId) return;
      unique.set(entry._candidateId, entry);
    });
  });
  return Array.from(unique.values());
}

function scoreD1CandidateMatch(candidate, row, teamVariants, possTarget) {
  const candidateTeam = normalizeKey(candidate?.team);
  const teamScore = Math.max(...teamVariants.map((team) => teamMatchScore(team, candidateTeam)), 0);
  const possScore = Number.isFinite(possTarget) && Number.isFinite(candidate?.poss) ? Math.max(0, 12 - Math.abs(possTarget - candidate.poss) / 20) : 0;
  const rowNameKey = normalizeNameKey(row?.player_name || row?.player);
  const rowLooseNameKey = normalizeLooseNameKey(row?.player_name || row?.player);
  const rowLastNameKey = getNameLastToken(row?.player_name || row?.player);
  const nameScore = candidate?.nameKey && rowNameKey === candidate.nameKey
    ? 18
    : (candidate?.looseNameKey && rowLooseNameKey === candidate.looseNameKey ? 10 : (candidate?.lastNameKey && rowLastNameKey === candidate.lastNameKey ? 6 : 0));
  const rowDraftPick = row?._draftPickBlank ? Number.NaN : Number(row?.draft_pick);
  const candidateDraftPick = Number(candidate?.draftPickHint);
  const draftScore = Number.isFinite(rowDraftPick) && Number.isFinite(candidateDraftPick)
    ? Math.max(0, 18 - (Math.abs(rowDraftPick - candidateDraftPick) * 6))
    : 0;
  const rowClass = normalizeClassValue(row?.class_year);
  const candidateClass = normalizeClassValue(candidate?.classYearHint);
  const classScore = rowClass && candidateClass && rowClass === candidateClass ? 6 : 0;
  const rowHeight = firstFinite(row?.height_in, row?.inches, Number.NaN);
  const candidateHeight = Number(candidate?.heightHint);
  const heightScore = Number.isFinite(rowHeight) && Number.isFinite(candidateHeight)
    ? Math.max(0, 10 - (Math.abs(rowHeight - candidateHeight) * 2))
    : 0;
  return {
    candidate,
    score: (teamScore * 2) + possScore + nameScore + draftScore + classScore + heightScore,
    teamScore,
    possScore,
  };
}

function isUsableD1CandidateScore(match) {
  return Boolean(match?.candidate) && match.score >= 50 && match.teamScore >= 50;
}

function findBestD1Candidate(index, row) {
  const candidates = collectD1Candidates(index, row?.season, row?.player_name);
  if (!candidates.length) return null;
  const teamVariants = buildTeamVariants(row?.team_full || row?.team_name);
  const possTarget = firstFinite(row?.total_poss, row?.min, Number.NaN);
  let best = null;
  let bestScore = -Infinity;
  let bestTeamScore = -Infinity;
  let secondBestScore = -Infinity;
  candidates.forEach((candidate) => {
    const { score, teamScore } = scoreD1CandidateMatch(candidate, row, teamVariants, possTarget);
    if (score > secondBestScore) secondBestScore = score;
    if (score > bestScore) {
      secondBestScore = bestScore;
      bestScore = score;
      bestTeamScore = teamScore;
      best = candidate;
    }
  });
  if (!best || bestScore < 50 || bestTeamScore < 50) return null;
  if (secondBestScore > -Infinity && (bestScore - secondBestScore) < 12 && bestTeamScore < 90) return null;
  return { ...best, _matchScore: bestScore, _teamScore: bestTeamScore };
}

function assignD1CandidateMatches(rows, index) {
  const matches = new Map();
  const grouped = new Map();

  rows.forEach((row) => {
    const season = getStringValue(normalizeSeasonValue(row.season));
    const nameKey = normalizeNameKey(row.player_name);
    if (!season || !nameKey) return;
    const key = `${season}|${nameKey}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  grouped.forEach((group) => {
    if (group.length === 1) {
      const row = group[0];
      matches.set(row, findBestD1Candidate(index, row));
      return;
    }

    const candidateMap = new Map();
    group.forEach((row) => {
      collectD1Candidates(index, row.season, row.player_name).forEach((candidate) => {
        candidateMap.set(candidate._candidateId, candidate);
      });
    });
    const candidates = Array.from(candidateMap.values());
    if (!candidates.length) {
      group.forEach((row) => matches.set(row, null));
      return;
    }

    const rowOptions = group.map((row) => {
      const teamVariants = buildTeamVariants(row.team_full || row.team_name);
      const possTarget = firstFinite(row.total_poss, row.min, Number.NaN);
      return {
        row,
        options: candidates
          .map((candidate) => scoreD1CandidateMatch(candidate, row, teamVariants, possTarget))
          .filter(isUsableD1CandidateScore)
          .sort((left, right) => right.score - left.score),
      };
    }).sort((left, right) => left.options.length - right.options.length);

    let bestScore = -Infinity;
    let bestCount = -Infinity;
    let bestMap = new Map();

    function search(rowIndex, usedIds, assigned, score, count) {
      if (rowIndex >= rowOptions.length) {
        if (score > bestScore || (Math.abs(score - bestScore) < 0.001 && count > bestCount)) {
          bestScore = score;
          bestCount = count;
          bestMap = new Map(assigned);
        }
        return;
      }

      const current = rowOptions[rowIndex];
      search(rowIndex + 1, usedIds, assigned, score, count);
      current.options.forEach((option) => {
        const candidateId = option.candidate._candidateId;
        if (usedIds.has(candidateId)) return;
        usedIds.add(candidateId);
        assigned.set(current.row, { ...option.candidate, _matchScore: option.score, _teamScore: option.teamScore });
        search(rowIndex + 1, usedIds, assigned, score + option.score, count + 1);
        assigned.delete(current.row);
        usedIds.delete(candidateId);
      });
    }

    search(0, new Set(), new Map(), 0, 0);
    group.forEach((row) => matches.set(row, bestMap.get(row) || null));
  });

  return matches;
}

function repairD1SplitAliasRows(rows) {
  if (!Array.isArray(rows) || rows.length < 2) return;
  const groups = new Map();
  rows.forEach((row) => {
    const signature = getD1SplitAliasSignature(row);
    if (!signature) return;
    if (!groups.has(signature)) groups.set(signature, []);
    groups.get(signature).push(row);
  });
  if (!groups.size) return;

  const replacements = new Map();
  const mergedAway = new Set();
  groups.forEach((group) => {
    const nameKeys = Array.from(new Set(group.map((row) => normalizeNameKey(row.player_name || row.player)).filter(Boolean)));
    if (nameKeys.length < 2) return;
    const lastNames = Array.from(new Set(group.map((row) => getNameLastToken(row.player_name || row.player)).filter(Boolean)));
    if (lastNames.length !== 1) return;
    if (!group.some((row) => d1PlaytypeCoverageCount(row) > 0 || d1PlaytypePossessionSum(row) > 0)) return;
    const merged = buildMergedD1SplitAliasRow(group);
    if (!merged) return;
    const keeper = chooseD1SplitAliasPlaytypeLeader(group);
    if (!keeper) return;
    replacements.set(keeper, merged);
    group.forEach((row) => {
      if (row !== keeper) mergedAway.add(row);
    });
  });
  if (!replacements.size && !mergedAway.size) return;

  const repaired = [];
  rows.forEach((row) => {
    if (mergedAway.has(row)) return;
    repaired.push(replacements.get(row) || row);
  });
  rows.splice(0, rows.length, ...repaired);
}

function getD1SplitAliasSignature(row) {
  if (!row) return "";
  const season = getStringValue(normalizeSeasonValue(row.season));
  const team = normalizeKey(row.team_name || row.team_full);
  const lastName = getNameLastToken(row.player_name || row.player);
  if (!season || !team || !lastName) return "";
  return [season, team, lastName].join("|");
}

function formatD1SplitAliasValue(value, decimals = 3) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  return numeric.toFixed(decimals);
}

function chooseD1SplitAliasPlaytypeLeader(group) {
  return (group || [])
    .slice()
    .sort((left, right) => d1SplitAliasPlaytypeLeaderScore(right) - d1SplitAliasPlaytypeLeaderScore(left))[0] || null;
}

function d1SplitAliasPlaytypeLeaderScore(row) {
  const possSum = d1PlaytypePossessionSum(row);
  const coverage = d1PlaytypeCoverageCount(row);
  const transitionPoss = Math.max(firstFinite(row.transition_poss, Number.NaN), 0);
  return (coverage * 100000) + (possSum * 1000) + transitionPoss + countMeaningfulRowFields(row);
}

function d1SplitAliasIdentityScore(row) {
  const playerIdBonus = getExplicitIdentityId(row) ? 500 : 0;
  const dobBonus = getStringValue(row.dob).trim() ? 250 : 0;
  const draftBonus = Number.isFinite(row.draft_pick) && !row._draftPickBlank ? 150 : 0;
  return playerIdBonus + dobBonus + draftBonus + countMeaningfulRowFields(row);
}

function d1PlaytypePossessionSum(row) {
  return D1_TRUE_PLAYTYPE_IDS.reduce((sum, id) => sum + Math.max(firstFinite(row[`${id}_poss`], 0), 0), 0);
}

function d1PlaytypeCoverageCount(row) {
  return D1_TRUE_PLAYTYPE_IDS.reduce((sum, id) => sum + (firstFinite(row[`${id}_poss`], 0) > 0 ? 1 : 0), 0);
}

function countMeaningfulRowFields(row) {
  return Object.entries(row || {}).reduce((sum, [column, value]) => {
    if (column.startsWith("_")) return sum;
    if (value == null || value === "") return sum;
    if (typeof value === "number" && !Number.isFinite(value)) return sum;
    return sum + 1;
  }, 0);
}

function chooseBestD1SplitAliasPrefixSource(group, prefix) {
  return (group || [])
    .slice()
    .sort((left, right) => d1SplitAliasPrefixScore(right, prefix) - d1SplitAliasPrefixScore(left, prefix))[0] || null;
}

function d1SplitAliasPrefixScore(row, prefix) {
  const keys = Object.keys(row || {}).filter((column) => column === prefix || column.startsWith(`${prefix}_`));
  if (!keys.length) return -1;
  const meaningful = keys.reduce((sum, column) => sum + (hasMeaningfulFieldValue(row[column]) ? 1 : 0), 0);
  if (!meaningful) return -1;
  let anchor = Number.NaN;
  if (prefix === "transition") {
    anchor = firstFinite(row.transition_poss, row.transition_freq, Number.NaN);
  } else if (prefix === "halfcourt") {
    anchor = firstFinite(row.halfcourt_two_pa, row.halfcourt_freq, Number.NaN);
  } else if (prefix === "runner") {
    anchor = firstFinite(row.runner_fg_att, row.runner_freq, Number.NaN);
  } else if (prefix === "drive") {
    anchor = firstFinite(row.drive_poss, row.drive_freq, Number.NaN);
  } else {
    anchor = firstFinite(row[`${prefix}_poss`], row[`${prefix}_freq`], row[`${prefix}_ppp`], Number.NaN);
  }
  return (meaningful * 1000) + Math.max(anchor, 0);
}

function copyD1SplitAliasPrefixFields(target, source, prefix) {
  if (!target || !source) return;
  Object.keys(source).forEach((column) => {
    if (column === prefix || column.startsWith(`${prefix}_`)) target[column] = source[column];
  });
}

function buildMergedD1SplitAliasRow(group) {
  if (!group?.length) return null;
  const playtypeLeader = chooseD1SplitAliasPlaytypeLeader(group);
  if (!playtypeLeader) return null;
  const identityLeader = group
    .slice()
    .sort((left, right) => d1SplitAliasIdentityScore(right) - d1SplitAliasIdentityScore(left))[0] || playtypeLeader;
  const merged = { ...playtypeLeader };
  const aliasNames = new Set();

  group.forEach((row) => {
    const playerName = getStringValue(row.player_name || row.player).trim();
    if (playerName) aliasNames.add(playerName);
    Object.keys(row || {}).forEach((column) => {
      if (column.startsWith("_")) return;
      if (["player_name", "player", "player_search_text", "team_search_text", "coach_search_text"].includes(column)) return;
      if (!hasMeaningfulFieldValue(merged[column]) && hasMeaningfulFieldValue(row[column])) {
        merged[column] = row[column];
      }
    });
  });

  [...D1_TRUE_PLAYTYPE_IDS, "halfcourt", "creation", "shooting", "assisted_fin", "unassisted_fin", "transition", "runner", "drive"].forEach((prefix) => {
    const source = chooseBestD1SplitAliasPrefixSource(group, prefix);
    if (source) copyD1SplitAliasPrefixFields(merged, source, prefix);
  });

  if ((!Number.isFinite(merged.draft_pick) || merged._draftPickBlank) && Number.isFinite(identityLeader.draft_pick) && !identityLeader._draftPickBlank) {
    merged.draft_pick = identityLeader.draft_pick;
    merged._draftPickBlank = false;
  }
  copyExplicitIdentityFields(merged, identityLeader);
  if (!getStringValue(merged.dob).trim()) merged.dob = getStringValue(identityLeader.dob).trim();

  merged.player_search_text = Array.from(aliasNames).join(" ");
  merged._searchCacheKey = "";
  merged._searchHaystack = "";
  merged._colorBucketCacheKey = "";
  merged._colorBucketValue = "";
  return enhanceRowForDataset(merged, "d1");
}

function hasMeaningfulFieldValue(value) {
  if (value == null || value === "") return false;
  if (typeof value === "number") return Number.isFinite(value);
  return true;
}

function getNameLastToken(value) {
  const tokens = normalizeNameKey(value).split(" ").filter(Boolean);
  return tokens[tokens.length - 1] || "";
}

function resolveD1SharedNameAssignments(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    const season = getStringValue(row.season);
    const nameKey = normalizeNameKey(row.player_name);
    if (!season || !nameKey) return;
    const key = `${season}|${nameKey}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  grouped.forEach((group) => {
    if (group.length < 2) return;
    dedupeSharedField(group, "draft_pick", "_rawTeamScore");
    dedupeSharedField(group, "canonical_player_id", "_advTeamScore");
    dedupeSharedField(group, "player_profile_key", "_advTeamScore");
    dedupeSharedField(group, "realgm_player_id", "_advTeamScore");
    dedupeSharedField(group, "source_player_id", "_advTeamScore");
    dedupeSharedField(group, "player_id", "_advTeamScore");
  });
}

function dedupeSharedField(rows, field, scoreField) {
  const values = new Map();
  rows.forEach((row) => {
    if (field === "draft_pick") {
      if (!Number.isFinite(row.draft_pick) || row._draftPickBlank) return;
      const key = String(row.draft_pick);
      if (!values.has(key)) values.set(key, []);
      values.get(key).push(row);
      return;
    }
    const key = getStringValue(row[field]).trim();
    if (!key) return;
    if (!values.has(key)) values.set(key, []);
    values.get(key).push(row);
  });

  values.forEach((dupes) => {
    if (dupes.length < 2) return;
    const best = dupes.slice().sort((left, right) => {
      const leftScore = firstFinite(left[scoreField], left._rawTeamScore, left._advTeamScore, 0);
      const rightScore = firstFinite(right[scoreField], right._rawTeamScore, right._advTeamScore, 0);
      if (rightScore !== leftScore) return rightScore - leftScore;
      return duplicateRowScore(right) - duplicateRowScore(left);
    })[0];
    dupes.forEach((row) => {
      if (row === best) return;
      if (field === "draft_pick") {
        row._draftPickBlank = true;
        row.draft_pick = 61;
      } else {
        row[field] = "";
      }
    });
  });
}

function normalizeNameKey(value) {
  return normalizeKey(value).replace(/\b(jr|sr|ii|iii|iv|v)\b/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeLooseNameKey(value) {
  return normalizeNameKey(value).replace(/\b[a-z]\b/g, " ").replace(/\s+/g, " ").trim();
}

let manualD2NbaOverrideIndex = null;

function getManualD2NbaOverrideIndex() {
  if (manualD2NbaOverrideIndex) return manualD2NbaOverrideIndex;
  const index = {};
  D2_PDF_NBA_OVERRIDE_ROWS.forEach((entry) => {
    index[makeManualD2NbaOverrideKey(entry.season, entry.team, entry.player)] = entry;
  });
  manualD2NbaOverrideIndex = index;
  return manualD2NbaOverrideIndex;
}

function makeManualD2NbaOverrideKey(season, team, player) {
  return `d2|${getStringValue(season).trim()}|${normalizeKey(team)}|${normalizeNameKey(player)}`;
}

function getManualD2NbaOverrideForRow(row) {
  if (!row) return null;
  return getManualD2NbaOverrideIndex()[makeManualD2NbaOverrideKey(row.season, row.team_name || row.team_full, row.player_name || row.player)] || null;
}

function getManualD2NbaOverrideForGroup(group) {
  if (!group || group.datasetId !== "d2") return null;
  return (group.rows || []).map((row) => getManualD2NbaOverrideForRow(row)).find(Boolean) || null;
}

function isSupplementDeferredDataset(dataset) {
  return dataset?.deferredHydrationMode === "supplement";
}

function isDeferredSupplementColumn(dataset, column) {
  return Boolean(column && isSupplementDeferredDataset(dataset) && getDeferredColumns(dataset).includes(column));
}

function getRowColumnValue(dataset, row, column) {
  if (!row || !column) return row?.[column];
  if (dataset?.id === "d1") {
    const splitValue = getD1BartSplitValue(row, column);
    if (splitValue !== undefined) return splitValue;
  }
  const direct = row[column];
  return direct;
}

function findManualNbaCareer(override, nbaDataset) {
  if (!override?.nba_name || !nbaDataset?.rows?.length) return null;
  const targetName = normalizeNameKey(override.nba_name);
  const targetLooseName = normalizeLooseNameKey(override.nba_name);
  const targetLast = getNameLastToken(targetName);
  const firstYear = Number(override.first_nba_year);
  const rows = nbaDataset.rows.filter((row) => {
    const rowName = normalizeNameKey(row.player_name);
    const rowLooseName = normalizeLooseNameKey(row.player_name);
    const rowLast = getNameLastToken(rowName);
    if (rowName !== targetName && rowLooseName !== targetLooseName && rowLast !== targetLast) return false;
    if (Number.isFinite(firstYear) && Number.isFinite(row.rookie_year) && row.rookie_year < firstYear - 1) return false;
    return true;
  });
  if (!rows.length) return null;
  const merged = mergeCareerRowGroups(nbaDataset, rows.map((row) => [row]));
  const candidateGroups = merged.map((groupRows, index) => {
    const meta = buildCareerGroupMeta(nbaDataset, groupRows);
    const preferredName = getPreferredStatusName(groupRows);
    return {
      ...meta,
      rows: groupRows,
      datasetId: "nba",
      nodeId: `manual:${index}`,
      nameKey: normalizeNameKey(preferredName),
      nameKeys: buildStatusNameKeys(preferredName),
      identityKeys: buildStatusIdentityKeys(meta, groupRows),
    };
  });
  const candidateCareerByNodeId = new Map(candidateGroups.map((group) => [group.nodeId, aggregateCareerRows(nbaDataset, group.rows)]));
  const sourceSeason = Number.isFinite(firstYear) ? Math.round(firstYear) : Number.NaN;
  const sourceGroup = {
    datasetId: "manual",
    rows: [{ player_name: override.nba_name, season: sourceSeason }],
    nameKey: targetName,
    nameKeys: buildStatusNameKeys(override.nba_name),
    identityKeys: [],
    dobs: [],
    heights: [],
    draftPicks: [],
    rookieYears: Number.isFinite(sourceSeason) ? [sourceSeason] : [],
    years: Number.isFinite(sourceSeason) ? [sourceSeason] : [],
    minYear: Number.isFinite(sourceSeason) ? sourceSeason : 0,
    maxYear: Number.isFinite(sourceSeason) ? sourceSeason : 0,
    explicitIds: [],
  };
  const lookup = buildStatusLookupIndex(candidateGroups);
  return selectBestNbaCareerCandidate(sourceGroup, candidateGroups, candidateCareerByNodeId, null, lookup, { candidateGroups });
}

function assignD1RawMetric(row, values, baseIndex, metricIndex, target) {
  if (!Array.isArray(values) || !Number.isInteger(metricIndex) || metricIndex < 0) return;
  assignIfFinite(row, target, values[baseIndex + metricIndex]);
}

function assignIfFinite(row, target, value) {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) row[target] = numeric;
}

function finiteSourceNumber(value) {
  if (value == null || value === "") return Number.NaN;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : Number.NaN;
}

function assignD1AdvShotProfile(row, advValues, advIndex) {
  assignIfFinite(row, "rim_made", advValues[advIndex.rimmade]);
  assignIfFinite(row, "rim_att", advValues[advIndex["rimmade+rimmiss"]]);
  assignIfFinite(row, "rim_pct", advValues[advIndex["rimmade/(rimmade+rimmiss)"]]);
  assignIfFinite(row, "mid_made", advValues[advIndex.midmade]);
  assignIfFinite(row, "mid_att", advValues[advIndex["midmade+midmiss"]]);
  assignIfFinite(row, "mid_pct", advValues[advIndex["midmade/(midmade+midmiss)"]]);
  assignIfFinite(row, "dunk_made", advValues[advIndex.dunksmade]);
  assignIfFinite(row, "dunk_att", advValues[advIndex["dunksmiss+dunksmade"]]);
  assignIfFinite(row, "dunk_pct", advValues[advIndex["dunksmade/(dunksmade+dunksmiss)"]]);
  assignIfFinite(row, "two_p_made", advValues[advIndex.twoPM]);
  assignIfFinite(row, "two_p_att", advValues[advIndex.twoPA]);
  assignIfFinite(row, "two_p_pct", advValues[advIndex.twoP_per]);
  assignIfFinite(row, "three_p_made", advValues[advIndex.TPM]);
  assignIfFinite(row, "three_p_att", advValues[advIndex.TPA]);
  assignIfFinite(row, "three_p_pct", advValues[advIndex.TP_per]);
  assignIfFinite(row, "ft_pct", advValues[advIndex.FT_per]);
}

function getD1CoachName(seasonValue, teamValue, coachDict) {
  const yearMap = coachDict?.[getStringValue(seasonValue)];
  if (!yearMap) return "";
  const teamVariants = buildTeamVariants(teamValue);
  let bestCoach = "";
  let bestScore = 0;
  Object.entries(yearMap).forEach(([team, coach]) => {
    const candidate = normalizeKey(team);
    const score = Math.max(...teamVariants.map((variant) => teamMatchScore(variant, candidate)), 0);
    if (score > bestScore) {
      bestScore = score;
      bestCoach = coach;
    }
  });
  return bestScore >= 45 ? bestCoach : "";
}

function normalizeClassValue(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  const lower = text.toLowerCase();
  if (lower.startsWith("fr")) return "Fr";
  if (lower.startsWith("so")) return "So";
  if (lower.startsWith("jr")) return "Jr";
  if (lower.startsWith("sr")) return "Sr";
  if (lower.startsWith("gr")) return "Gr";
  return text;
}

function classToOrdinal(value) {
  const normalized = normalizeClassValue(value);
  if (normalized === "Fr") return 1;
  if (normalized === "So") return 2;
  if (normalized === "Jr") return 3;
  if (normalized === "Sr") return 4;
  if (normalized === "Gr") return 5;
  return 0;
}

function ordinalToClass(value) {
  const ordinal = Math.max(1, Math.min(5, Math.round(Number(value) || 0)));
  if (ordinal === 1) return "Fr";
  if (ordinal === 2) return "So";
  if (ordinal === 3) return "Jr";
  if (ordinal === 4) return "Sr";
  return "Gr";
}

function normalizePosLabel(value) {
  const text = getStringValue(value).trim().toUpperCase();
  if (!text) return "";
  const compact = text.replace(/[^A-Z]/g, "");
  if (!compact || compact === "NA") return "";
  if (/^\s*(G\/F|F\/G|GUARD\/FORWARD|FORWARD\/GUARD)\s*$/.test(text)) return "G/F";
  if (/^\s*(F\/C|C\/F|FORWARD\/CENTER|CENTER\/FORWARD)\s*$/.test(text)) return "F/C";
  const strictParts = text
    .split(/\s*(?:\/|,|&|\||\+|-)\s*/)
    .map((part) => {
      if (/^(PG|POINT GUARD)$/.test(part)) return "PG";
      if (/^(SG|SHOOTING GUARD)$/.test(part)) return "SG";
      if (/^(SF|SMALL FORWARD)$/.test(part)) return "SF";
      if (/^(PF|POWER FORWARD)$/.test(part)) return "PF";
      if (/^(C|CENTER|CENTRE)$/.test(part)) return "C";
      return "";
    })
    .filter(Boolean);
  if (strictParts.length) return strictParts[0];
  if (/^\s*(PG|POINT GUARD)\s*[\/,&|+-]\s*(SG|SHOOTING GUARD)\s*$/.test(text)
    || /^\s*(SG|SHOOTING GUARD)\s*[\/,&|+-]\s*(PG|POINT GUARD)\s*$/.test(text)
    || /^G$|^GUARD$|^CG$|^COMBOG$|^COMBOGUARD$/.test(compact)) return "G";
  if (/^\s*(SG|SHOOTING GUARD)\s*[\/,&|+-]\s*(SF|SMALL FORWARD)\s*$/.test(text)
    || /^\s*(SF|SMALL FORWARD)\s*[\/,&|+-]\s*(SG|SHOOTING GUARD)\s*$/.test(text)
    || /^GF$|^FG$/.test(compact)) return "G/F";
  if (/^\s*(SF|SMALL FORWARD)\s*[\/,&|+-]\s*(PF|POWER FORWARD)\s*$/.test(text)
    || /^\s*(PF|POWER FORWARD)\s*[\/,&|+-]\s*(SF|SMALL FORWARD)\s*$/.test(text)
    || /^F$|^FORWARD$|^FORWARDS$/.test(compact)) return "F";
  if (/^\s*(PF|POWER FORWARD|F|FORWARD)\s*[\/,&|+-]\s*(C|CENTER|CENTRE)\s*$/.test(text)
    || /^\s*(C|CENTER|CENTRE)\s*[\/,&|+-]\s*(PF|POWER FORWARD|F|FORWARD)\s*$/.test(text)
    || /^FC$|^CF$/.test(compact)) return "F/C";
  if (/\bPOINT GUARD\b/.test(text)) return "PG";
  if (/\bPG\b|PURE PG/.test(text)) return "PG";
  if (/\bSHOOTING GUARD\b/.test(text)) return "SG";
  if (/\bSG\b|SCORING PG|COMBO G/.test(text)) return "SG";
  if (/\bSMALL FORWARD\b/.test(text)) return "SF";
  if (/\bWING\b/.test(text)) return "SF";
  if (/\bSF\b/.test(text)) return "SF";
  if (/\bPOWER FORWARD\b/.test(text)) return "PF";
  if (/\bPF\b|STRETCH 4/.test(text)) return "PF";
  if (/^\s*(G\/F|F\/G|GUARD\/FORWARD|FORWARD\/GUARD)\s*$/.test(text)) return "G/F";
  if (/^\s*GUARD\s*$/.test(text)) return "G";
  if (/^\s*FORWARD\s*$/.test(text)) return "F";
  if (/^\s*CENTER\s*$/.test(text)) return "C";
  if (compact === "PG" || compact === "SG" || compact === "SF" || compact === "PF" || compact === "C") return compact;
  if (/\bC\b/.test(text)) return "C";
  return text;
}

function refreshDerivedBiography(row) {
  if (!Number.isFinite(row.bmi) && Number.isFinite(row.height_in) && Number.isFinite(row.weight_lb) && row.height_in > 0) {
    row.bmi = roundNumber((row.weight_lb / (row.height_in * row.height_in)) * 703, 1);
  }
  if (!Number.isFinite(row.age) && row.dob && Number.isFinite(row.season)) {
    const dob = new Date(row.dob);
    if (!Number.isNaN(dob.getTime())) {
      const ref = new Date(Number(row.season), 5, 23);
      row.age = roundNumber((ref - dob) / (1000 * 60 * 60 * 24 * 365.25), 1);
    }
  }
}

function inferMissingClassYears(rows, config) {
  if (!rows?.length || !config?.yearColumn) return;
  const miniDataset = { id: config.id, yearColumn: config.yearColumn };
  const grouped = new Map();
  rows.forEach((row) => {
    const key = getCareerGroupKey(miniDataset, row);
    if (!key) return;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  mergeCareerRowGroups(miniDataset, Array.from(grouped.values())).forEach((careerRows) => {
    const sorted = careerRows
      .slice()
      .sort((left, right) => extractLeadingYear(left[config.yearColumn]) - extractLeadingYear(right[config.yearColumn]));
    const anchors = sorted
      .map((row, index) => ({
        index,
        year: extractLeadingYear(row[config.yearColumn]),
        ordinal: classToOrdinal(row.class_year),
      }))
      .filter((item) => item.ordinal);

    sorted.forEach((row, index) => {
      const normalized = normalizeClassValue(row.class_year);
      if (normalized) {
        row.class_year = normalized;
        return;
      }
      const rowYear = extractLeadingYear(row[config.yearColumn]);
      let best = null;
      anchors.forEach((anchor) => {
        const offset = rowYear && anchor.year ? rowYear - anchor.year : index - anchor.index;
        const candidate = anchor.ordinal + offset;
        if (candidate < 1 || candidate > 5) return;
        const distance = Math.abs(offset);
        if (!best || distance < best.distance) {
          best = { distance, candidate };
        }
      });
      row.class_year = ordinalToClass(best ? best.candidate : Math.min(5, index + 1));
    });
  });
}

function normalizeRepeatedSeniorSeasons(rows, config) {
  if (!rows?.length || !config?.yearColumn) return;
  const miniDataset = { id: config.id, yearColumn: config.yearColumn };
  const grouped = new Map();
  rows.forEach((row) => {
    const key = getCareerGroupKey(miniDataset, row);
    if (!key) return;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  mergeCareerRowGroups(miniDataset, Array.from(grouped.values())).forEach((careerRows) => {
    const seniorRows = careerRows
      .filter((row) => ["Sr", "Gr"].includes(normalizeClassValue(row.class_year)))
      .sort((left, right) => extractLeadingYear(left[config.yearColumn]) - extractLeadingYear(right[config.yearColumn]));
    if (!seniorRows.length) return;
    seniorRows.forEach((row, index) => {
      const season = extractLeadingYear(row[config.yearColumn]);
      row.class_year = index === 0 || season <= 2021 ? "Sr" : "Gr";
    });
  });
}

function normalizeLegacySeason(value) {
  const season = Number(normalizeSeasonValue(value));
  if (!Number.isFinite(season)) return "";
  const start = season - 1;
  return `${start}-${String(season).slice(-2)}`;
}

function createInitialUiState(dataset) {
  const visibleColumns = {};
  dataset.meta.allColumns.forEach((column) => {
    visibleColumns[column] = dataset.defaultVisible.includes(column);
  });
  getLockedColumns(dataset).forEach((column) => {
    if (column in visibleColumns) visibleColumns[column] = true;
  });

  const numericFilters = {};
  dataset.meta.statColumns.filter((column) => dataset.meta.numericColumnSet.has(column)).forEach((column) => {
    numericFilters[column] = { min: "", max: "" };
  });

  const demoFilters = {};
  dataset.meta.demoFilterMeta.forEach((item) => {
    demoFilters[item.column] = { min: "", max: "" };
  });
  const minuteColumn = dataset?.meta?.minuteFilterColumn;
  if (minuteColumn && demoFilters[minuteColumn]) {
    const minuteFilterDefault = dataset?.minuteFilterDefault;
    demoFilters[minuteColumn].min = minuteFilterDefault !== undefined ? String(minuteFilterDefault) : String(getDatasetMinuteThreshold(dataset));
  }
  Object.entries(dataset?.demoFilterDefaults || {}).forEach(([column, defaults]) => {
    if (!demoFilters[column] || !defaults || typeof defaults !== "object") return;
    if (defaults.min != null) demoFilters[column].min = String(defaults.min);
    if (defaults.max != null) demoFilters[column].max = String(defaults.max);
  });

  const state = {
    _stateRenderKey: appState.nextUiStateRenderKey++,
    search: "",
    team: "all",
    years: new Set(dataset.defaultAllYears ? (getAvailableYears(dataset).length ? getAvailableYears(dataset) : dataset.meta.years) : (dataset.meta.latestYear ? [dataset.meta.latestYear] : dataset.meta.years)),
    sortBy: dataset.sortBy,
    sortDir: dataset.sortDir,
    sortMetric: "value",
    sortBlankMode: "last",
    extraSelects: Object.fromEntries((dataset.singleFilters || []).map((filter) => [filter.id, filter.defaultValue ?? "all"])),
    multiSelects: Object.fromEntries((dataset.multiFilters || []).map((filter) => [filter.id, new Set()])),
    visibleColumns,
    groupUnitModes: Object.fromEntries(dataset.meta.groups.map((group) => [group.id, getDefaultGroupUnitMode(dataset, group)])),
    demoFilters,
    numericFilters,
    groupCycles: Object.fromEntries(dataset.meta.groups.map((group) => [group.id, 0])),
    collapsedGroups: Object.fromEntries(dataset.meta.groups.map((group) => [group.id, false])),
    visibleCount: LOAD_STEP,
    _careerCache: null,
    _renderCache: null,
    _visibleSupplementLoadKey: "",
    _yearSelectionTouched: false,
  };
  if (dataset.meta.latestYear && dataset.meta.years.length > 1 && !getFilteredRows(dataset, state).length) {
    state.years = new Set(dataset.meta.years);
  }
  return state;
}

function resetUiCaches(state) {
  if (!state) return;
  state._careerCache = null;
  state._renderCache = null;
  state._internationalSingleSeasonCache = null;
}

function scheduleSearchResultsRender(dataset, state) {
  if (appState.searchRenderTimer) window.clearTimeout(appState.searchRenderTimer);
  const datasetId = dataset?.id;
  appState.searchRenderTimer = window.setTimeout(() => {
    appState.searchRenderTimer = 0;
    if (appState.currentId !== datasetId) return;
    renderResultsOnly(dataset, state);
  }, SEARCH_RENDER_DEBOUNCE_MS);
}

function scheduleFilterResultsRender(dataset, state, deferredColumns = []) {
  if (!dataset || !state) return;
  if (appState.filterRenderTimer) window.clearTimeout(appState.filterRenderTimer);
  deferredColumns.forEach((column) => {
    if (column) appState.filterRenderColumns.add(column);
  });
  const datasetId = dataset.id;
  appState.filterRenderTimer = window.setTimeout(async () => {
    appState.filterRenderTimer = 0;
    if (appState.currentId !== datasetId) {
      appState.filterRenderColumns.clear();
      return;
    }
    const queuedColumns = Array.from(appState.filterRenderColumns)
      .filter((column) => {
        const filter = state.numericFilters?.[column];
        return filter && (inputHasValue(filter.min) || inputHasValue(filter.max));
      });
    appState.filterRenderColumns.clear();
    if (queuedColumns.length) {
      await ensureDeferredColumnsReady(dataset, state, queuedColumns);
      if (appState.currentId !== datasetId) return;
    }
    renderResultsOnly(dataset, state);
  }, FILTER_RENDER_DEBOUNCE_MS);
}

function bindCommittedFilterInput(input, commit) {
  if (!input || typeof commit !== "function") return;
  input.addEventListener("change", commit);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    commit();
    input.blur();
  });
}

function applySearchInputValue(dataset, state, rawValue) {
  const parsed = parseSearchDirectives(dataset, rawValue, state);
  const nextSearch = parsed.search;
  const currentSearch = getStringValue(state.search);
  const filtersChanged = parsed.filtersChanged;
  const searchChanged = nextSearch !== currentSearch;
  state.search = nextSearch;
  return searchChanged || filtersChanged ? { searchChanged, filtersChanged } : null;
}

function parseSearchDirectives(dataset, rawValue, state) {
  let filtersChanged = false;
  let consumedDirective = false;
  let search = getStringValue(rawValue);
  const statusFilter = (dataset?.singleFilters || []).find((filter) => filter.id === "status_path");
  if (statusFilter) {
    const statusLookup = new Map((statusFilter.options || []).map((option) => {
      const aliases = new Set([
        normalizeDirectiveValue(option.value),
        normalizeDirectiveValue(option.label),
      ]);
      if (option.value === "former_d1") aliases.add("formerd1");
      if (option.value === "future_d1") aliases.add("d1_future");
      if (option.value === "former_juco") aliases.add("juco_former");
      if (option.value === "future_juco") aliases.add("juco_future");
      if (option.value === "former_d2") aliases.add("d2_former");
      if (option.value === "future_d2") aliases.add("d2_future");
      if (option.value === "former_naia") aliases.add("naia_former");
      if (option.value === "future_naia") aliases.add("naia_future");
      return [Array.from(aliases), option.value];
    }).flatMap(([aliases, value]) => aliases.map((alias) => [alias, value])));
    search = search.replace(/(^|\s)status:([^\s,;]+)/gi, (match, prefix, rawStatus) => {
      consumedDirective = true;
      const normalized = normalizeDirectiveValue(rawStatus);
      const nextValue = statusLookup.get(normalized);
      if (nextValue && state.extraSelects.status_path !== nextValue) {
        state.extraSelects.status_path = nextValue;
        filtersChanged = true;
      }
      return prefix;
    });
  }
  return { search: search.replace(/\s{2,}/g, " ").trim(), filtersChanged: filtersChanged || consumedDirective };
}

function normalizeDirectiveValue(value) {
  return getStringValue(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

async function applyVisibilityMode(section, mode) {
  const dataset = getCurrentDataset();
  const state = getCurrentUiState();
  if (!dataset || !state) return;

  const columns = section === "demo" ? getDemoControlColumns(dataset) : dataset.meta.statColumns;

  if (section === "stats" && mode === "clear") {
    columns.forEach((column) => {
      if (state.numericFilters[column]) state.numericFilters[column] = { min: "", max: "" };
    });
    renderResultsOnly(dataset, state);
    return;
  }

  if (section === "stats" && mode !== "none") {
    const nextVisibleColumns = columns.filter((column) => {
      if (!(column in state.visibleColumns) || getLockedColumns(dataset).includes(column)) return false;
      if (mode === "all") return !state.visibleColumns[column];
      return dataset.defaultVisible.includes(column) && !state.visibleColumns[column];
    });
    if (nextVisibleColumns.length) {
      await ensureDeferredColumnsReady(dataset, state, nextVisibleColumns, { scope: "visible" });
    }
  }

  columns.forEach((column) => {
    if (!(column in state.visibleColumns)) return;
    if (getLockedColumns(dataset).includes(column)) return;
    if (mode === "default") {
      state.visibleColumns[column] = dataset.defaultVisible.includes(column);
    } else if (mode === "all") {
      state.visibleColumns[column] = true;
    } else if (mode === "none") {
      state.visibleColumns[column] = false;
    } else {
      state.visibleColumns[column] = false;
    }

  });

  renderCurrentDataset();
}

function setAllStatGroupsCollapsed(collapsed) {
  const dataset = getCurrentDataset();
  const state = getCurrentUiState();
  if (!dataset || !state) return;
  const nextCollapsed = { ...(state.collapsedGroups || {}) };
  (dataset.meta?.groups || [])
    .filter((group) => !group.hiddenInFilters)
    .forEach((group) => {
      nextCollapsed[group.id] = Boolean(collapsed);
    });
  state.collapsedGroups = nextCollapsed;
  renderCurrentDataset();
}

function toggleStatGroupCollapsed(groupId) {
  const dataset = getCurrentDataset();
  const state = getCurrentUiState();
  if (!dataset || !state || !groupId) return;
  state.collapsedGroups = { ...(state.collapsedGroups || {}), [groupId]: !Boolean(state.collapsedGroups?.[groupId]) };
  renderCurrentDataset();
}

function renderCurrentDataset() {
  const dataset = getCurrentDataset();
  const state = getCurrentUiState();
  if (!dataset || !state) return;
  if (dataset.id === "grassroots") {
    const scope = getGrassrootsDisplayScope(dataset, state);
    if (scope) {
      if (!dataset._grassrootsScopeRows?.has(scope) && state._grassrootsLoadingScope !== scope) {
        startGrassrootsScopeLoad(dataset, state, scope);
        return;
      }
    } else {
      state._grassrootsLoadingScope = "";
      if (getStringValue(state.search).trim()) scheduleGrassrootsSearchYearPrefetch(dataset, state);
      else maybeStartGrassrootsCareerYearLoad(dataset, state);
    }
  }
  if (dataset.id === "d1" && !isD1CareerMode(dataset, state)) scheduleD1SelectedYearLoad(dataset, state);
  if (!ensureD1CareerRowsReadyForRender(dataset, state)) return;
  if (!ensureD1BartSplitReadyForRender(dataset, state)) return;

  renderResultsOnly(dataset, state);
  renderPrimaryFilters(dataset, state);
  scheduleSecondaryFiltersRender(dataset, state);
  scheduleDeferredHydration(dataset.id);
  if (dataset.id === "grassroots" && getGrassrootsPendingYearsKey(state)) {
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  } else if (dataset.id === "grassroots" && state._grassrootsLoadingScope) {
    elements.statusPill.textContent = `Loading ${dataset.navLabel} ${state._grassrootsLoadingScope.replace(/_/g, " ")}`;
  } else if (dataset.id === "d1" && getD1PendingYearsKey(state)) {
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  } else if (dataset.id === "player_career" && getPlayerCareerPendingYearsKey(state)) {
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  } else {
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  }
}

function scheduleSecondaryFiltersRender(dataset, state) {
  if (appState.secondaryFilterFrame) {
    window.cancelAnimationFrame(appState.secondaryFilterFrame);
    appState.secondaryFilterFrame = 0;
  }
  appState.secondaryFilterDatasetId = dataset?.id || "";
  appState.secondaryFilterFrame = window.requestAnimationFrame(() => {
    appState.secondaryFilterFrame = 0;
    if (!dataset || !state) return;
    if (appState.currentId !== dataset.id) return;
    if (appState.secondaryFilterDatasetId !== dataset.id) return;
    renderSecondaryFilters(dataset, state);
  });
}

function maybeScheduleVisibleDeferredSupplementLoad(dataset, state) {
  if (!isSupplementDeferredDataset(dataset)) return;
  if (dataset?.id === "grassroots" && state?._grassrootsLoadingScope) return;
  if (isInteractiveSearchActive(state)) return;
  if (!getVisibleDeferredColumns(dataset, state).length) return;
  if (state?.extraSelects?.view_mode === "career" || usesDeferredColumnForSortOrFilter(dataset, state)) return;
  const missingYears = getMissingDeferredSupplementYearsForScope(dataset, state, "visible");
  if (!missingYears.length) return;
  const key = [
    dataset.id,
    Array.from(state?.years || []).sort(compareYears).join("|"),
    state.visibleCount,
    getStringValue(state.team),
    state.search.trim().toLowerCase(),
    missingYears.join("|"),
  ].join("||");
  if (state._visibleSupplementLoadKey === key) return;
  state._visibleSupplementLoadKey = key;
  Promise.resolve().then(async () => {
    try {
      if (appState.currentId === dataset.id) {
        elements.statusPill.textContent = `Loading ${dataset.navLabel} shot profile`;
      }
      await ensureDeferredSupplementScripts(dataset, state, { scope: "visible", years: missingYears });
      if (appState.currentId !== dataset.id) return;
      resetUiCaches(state);
      renderResultsOnly(dataset, state);
      elements.statusPill.textContent = `${dataset.navLabel} ready`;
    } catch (error) {
      if (appState.currentId !== dataset.id) return;
      elements.statusPill.textContent = `${dataset.navLabel} shot profile failed`;
      elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
    } finally {
      if (state._visibleSupplementLoadKey === key) state._visibleSupplementLoadKey = "";
    }
  });
}

function renderResultsOnly(dataset = getCurrentDataset(), state = getCurrentUiState()) {
  if (!dataset || !state) return;
  if (dataset.id === "d1") appState.currentD1BartSplit = getD1BartSplitMode(state);
  if (dataset.id === "grassroots" && state._grassrootsLoadingScope && !getGrassrootsDisplayScope(dataset, state)) {
    state._grassrootsLoadingScope = "";
  }
  maybeScheduleVisibleDeferredSupplementLoad(dataset, state);
  const filtered = getFilteredRows(dataset, state);
  const visibleColumns = getVisibleColumns(dataset, state);
  const colorScale = getColorScale(dataset, state, visibleColumns);
  renderTable(dataset, state, filtered, { visibleColumns, colorScale });
  renderFinderBar(dataset, state);
  updateSummary(dataset, state, filtered);
  renderTableLegend(dataset, state);
  scheduleUrlStateSync(dataset, state);
  if (
    dataset.id === "grassroots"
    && !state._grassrootsLoadingScope
    && !getGrassrootsDisplayScope(dataset, state)
    && /loading/i.test(elements.statusPill.textContent || "")
  ) {
    elements.statusPill.textContent = `${dataset.navLabel} ready`;
  }
}

function renderFilters(dataset, state) {
  renderPrimaryFilters(dataset, state);
  renderSecondaryFilters(dataset, state);
}

function renderPrimaryFilters(dataset, state) {
  renderYearPills(dataset, state);
  renderTeamSelect(dataset, state);
  renderExtraFilters(dataset, state);
  elements.searchInput.value = state.search;
  elements.searchInput.disabled = false;
  const searchLabel = document.querySelector('label[for="searchInput"]');
  if (searchLabel) {
    searchLabel.textContent = getDatasetSearchLabelText(dataset);
  }
  elements.searchInput.placeholder = getDatasetSearchPlaceholder(dataset);
  const globalSearchLabel = document.querySelector('label[for="globalPlayerSearchInput"]');
  if (globalSearchLabel) globalSearchLabel.textContent = getDatasetSearchEntityLabel(dataset);
  if (elements.globalPlayerSearchInput) {
    elements.globalPlayerSearchInput.placeholder = dataset?.id === "team_coach" ? "Find coach" : "Find player";
  }
  renderDatasetSearchSuggestions(dataset, state);
}

function renderSecondaryFilters(dataset, state) {
  if (elements.demoControls) elements.demoControls.hidden = !getDemoControlColumns(dataset).length;
  renderDemoToggles(dataset, state);
  renderDemoRangeFilters(dataset, state);
  renderStatGroups(dataset, state);
}

function getDatasetSearchEntityLabel(dataset) {
  return dataset?.id === "team_coach" ? "Coach" : "Player";
}

function getDatasetSearchLabelText(dataset) {
  return dataset?.id === "team_coach" ? "Coach" : "Player";
}

function getDatasetSearchPlaceholder(dataset) {
  if (dataset?.id === "grassroots") return "Player name; use && for OR";
  if (dataset?.id === "team_coach") return "Coach name";
  return "Player name";
}

function getFilterVisibilityColumn(dataset, filter) {
  if (!dataset || !filter) return "";
  if (dataset.id === "d1" && filter.id === "conference_bucket") return "conference";
  const column = getStringValue(filter.column).trim();
  if (!column) return "";
  return dataset?.meta?.allColumns?.includes(column) ? column : "";
}

function renderFilterVisibilityButton(dataset, state, column) {
  if (!column || !(column in (state?.visibleColumns || {}))) return "";
  if (getLockedColumns(dataset).includes(column)) return "";
  if (hasDedicatedColumnToggleControl(dataset, column)) return "";
  const label = state.visibleColumns[column] ? "Hide" : "Show";
  return `<button class="filter-visibility-toggle" type="button" data-filter-visibility="${escapeAttribute(column)}">${escapeHtml(label)}</button>`;
}

function hasDedicatedColumnToggleControl(dataset, column) {
  if (!dataset || !column) return false;
  const controlColumns = new Set(getDemoControlColumns(dataset));
  if (controlColumns.has(column)) return true;
  return (dataset?.meta?.groups || []).some((group) => !group.hiddenInFilters && (group.columns || []).includes(column));
}

function renderYearPills(dataset, state) {
  const careerMode = dataset?.id === "grassroots" && state?.extraSelects?.view_mode === "career";
  const years = careerMode ? getGrassrootsCareerYears(dataset, state) : getAvailableYears(dataset);
  const loadedYears = getLoadedYearSet(dataset);
  const activeYears = state.years;
  const shellKey = [
    dataset?.id,
    getUiStateRenderKey(state),
    careerMode ? "career" : "season",
    years.join("|"),
    careerMode ? "" : Array.from(loadedYears).sort(compareYears).join("|"),
  ].join("||");
  if (elements.yearPills.dataset.shellKey === shellKey) {
    syncYearPillSelectionState(activeYears, loadedYears, careerMode);
    return;
  }
  elements.yearPills.innerHTML = years
    .map((year) => {
      const active = activeYears.has(year) ? "is-active" : "";
      const loaded = careerMode ? "" : (loadedYears.has(year) ? "" : " is-unloaded");
      return `<button class="pill-toggle ${active}${loaded}" data-year="${escapeHtml(year)}" type="button">${escapeHtml(formatYearValueLabel(year))}</button>`;
    })
    .join("");
  elements.yearPills.dataset.shellKey = shellKey;

  elements.yearPills.querySelectorAll("[data-year]").forEach((button) => {
    button.addEventListener("click", async () => {
      const year = button.dataset.year;
      if (!year) return;
      if (careerMode) {
        if (state.years.has(year)) {
          state.years.delete(year);
        } else {
          state.years.add(year);
        }
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "player_career" && dataset._playerCareerChunked) {
        const wasSelected = state.years.has(year);
        if (wasSelected) {
          state.years.delete(year);
        } else {
          state.years.add(year);
        }
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        if (!wasSelected && !loadedYears.has(year)) {
          schedulePlayerCareerSelectedYearLoad(dataset, state);
          renderYearPills(dataset, state);
          renderFinderBar(dataset, state);
          elements.statusPill.textContent = `Loading ${dataset.navLabel} ${formatSelectedYearSummary(getPlayerCareerPendingYearsKey(state).split("|").filter(Boolean))}`;
        } else {
          renderCurrentDataset();
        }
        return;
      }
      if (dataset.id === "d1" && isMobileLiteD1Dataset(dataset)) {
        const wasSelected = state.years.has(year);
        if (wasSelected) {
          state.years.delete(year);
        } else {
          state.years.add(year);
        }
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        if (!wasSelected && !loadedYears.has(year)) {
          scheduleD1SelectedYearLoad(dataset, state);
          const pendingKey = getD1PendingYearsKey(state);
          if (pendingKey) {
            renderYearPills(dataset, state);
            renderFinderBar(dataset, state);
            elements.statusPill.textContent = `Loading ${dataset.navLabel} ${formatSelectedYearSummary(pendingKey.split("|").filter(Boolean))}`;
          } else {
            renderCurrentDataset();
          }
        } else {
          renderCurrentDataset();
        }
        return;
      }
      try {
        if (state.years.has(year)) {
          state.years.delete(year);
        } else {
          await ensureDatasetYearsLoaded(dataset, [year]);
          state.years.add(year);
        }
        state._yearSelectionTouched = true;
        await ensureStatusReadyForState(dataset, state);
        if (appState.currentId !== dataset.id) return;
        renderCurrentDataset();
      } catch (error) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
    });
  });
}

function syncYearPillSelectionState(activeYears, loadedYears, careerMode) {
  elements.yearPills.querySelectorAll("[data-year]").forEach((button) => {
    const year = getStringValue(button.dataset.year);
    button.classList.toggle("is-active", activeYears.has(year));
    button.classList.toggle("is-unloaded", !careerMode && !loadedYears.has(year));
  });
}

function ensureTeamSelectValue(current) {
  const targetValue = getStringValue(current) || "all";
  let option = Array.from(elements.teamSelect.options || []).find((candidate) => candidate.value === targetValue);
  if (!option && targetValue !== "all") {
    option = document.createElement("option");
    option.value = targetValue;
    option.textContent = targetValue;
    elements.teamSelect.appendChild(option);
  }
  elements.teamSelect.value = targetValue;
  if (elements.teamSelect.value !== targetValue) {
    elements.teamSelect.value = "all";
  }
}

function renderTeamSelect(dataset, state) {
  elements.teamSelect.disabled = false;
  const current = state.team;
  const cache = getRenderCache(state);
  const scopeRows = dataset.id === "grassroots" ? getGrassrootsActiveScopeRows(dataset, state) : null;
  const cacheKey = [
    dataset.id,
    Number(dataset?._rowVersion) || 0,
    getStringValue(state?.extraSelects?.view_mode || "player"),
    Array.from(state?.years || []).sort(compareYears).join("|"),
    serializeSingleFilterState(dataset, state),
    serializeMultiFilterState(dataset, state),
  ].join("||");
  if (cache.teamSelectKey === cacheKey && cache.teamSelectHtml && elements.teamSelect.dataset.optionsKey === cacheKey) {
    ensureTeamSelectValue(current);
    return;
  }
  const teamRows = dataset.id === "grassroots"
    ? getFilterContextRows(dataset, state, {
      rows: scopeRows || dataset.rows,
      ignoreTeam: true,
      ignoreSearch: true,
      ignoreNumericFilters: true,
      ignoreDemoFilters: true,
      skipSort: true,
    })
    : getRawFilterContextRows(dataset, state, { ignoreTeam: true, ignoreSearch: true, ignoreNumericFilters: true, ignoreDemoFilters: true, skipSort: true });
  const teamMap = new Map();
  teamRows.forEach((row) => {
    const team = dataset.id === "grassroots"
      ? getStringValue(row.team_full || row[dataset.teamColumn]).trim()
      : getStringValue(row[dataset.teamColumn]).trim();
    if (!team) return;
    const key = normalizeKey(team);
    const currentTeam = teamMap.get(key);
    if (!currentTeam || team.length >= currentTeam.length) {
      teamMap.set(key, team);
    }
  });
  if (current !== "all") {
    teamMap.set(normalizeKey(current), current);
  }
  const teams = Array.from(teamMap.values()).sort((a, b) => a.localeCompare(b));
  const options = ['<option value="all">All teams</option>'].concat(
    teams.map((team) => {
      const selected = current === team ? " selected" : "";
      return `<option value="${escapeAttribute(team)}"${selected}>${escapeHtml(team)}</option>`;
    })
  );
  cache.teamSelectKey = cacheKey;
  cache.teamSelectHtml = options.join("");
  elements.teamSelect.innerHTML = cache.teamSelectHtml;
  elements.teamSelect.dataset.optionsKey = cacheKey;
  ensureTeamSelectValue(current);
}

function renderExtraFilters(dataset, state) {
  const viewModeFilter = (dataset.singleFilters || []).find((filter) => filter.id === "view_mode");
  if (elements.viewModeFilters) {
    if (viewModeFilter) {
      const selected = state.extraSelects[viewModeFilter.id];
      const pills = (viewModeFilter.options || []).map((option) => `<button class="pill-toggle ${selected === option.value ? "is-active" : ""}" type="button" data-view-mode="${escapeAttribute(option.value)}">${escapeHtml(option.label)}</button>`).join("");
      elements.viewModeFilters.innerHTML = `<div class="multi-pill-group"><div class="pill-grid">${pills}</div></div>`;
    } else {
      elements.viewModeFilters.innerHTML = "";
    }
  }

  elements.singleSelectFilters.innerHTML = (dataset.singleFilters || [])
    .map((filter) => {
      if (filter.id === "view_mode" || filter.hidden) return "";
      const visibilityColumn = getFilterVisibilityColumn(dataset, filter);
      const visibilityButton = renderFilterVisibilityButton(dataset, state, visibilityColumn);
      const inlineClass = visibilityButton ? " field-stack--inline-toggle" : "";
      if (filter.searchable) {
        const options = getSingleFilterOptions(dataset, filter, state).filter((option) => option.value !== "all");
        const selected = state.extraSelects[filter.id] === "all" ? "" : getStringValue(state.extraSelects[filter.id]);
        const datalistId = `single-${filter.id}-options`;
        const datalist = options
          .map((option) => `<option value="${escapeAttribute(option.value)}">${escapeHtml(option.label)}</option>`)
          .join("");
        return `<div class="field-stack field-stack--compact field-stack--inline${inlineClass}"><label class="field-label field-label--inline" for="single-${escapeAttribute(filter.id)}">${escapeHtml(filter.label)}</label><input class="form-control" id="single-${escapeAttribute(filter.id)}" type="search" autocomplete="off" list="${escapeAttribute(datalistId)}" value="${escapeAttribute(selected)}" data-single-filter-text="${escapeAttribute(filter.id)}" placeholder="All">${visibilityButton}<datalist id="${escapeAttribute(datalistId)}">${datalist}</datalist></div>`;
      }
      const options = getSingleFilterOptions(dataset, filter, state)
        .map((option) => `<option value="${escapeAttribute(option.value)}"${state.extraSelects[filter.id] === option.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`)
        .join("");
      return `<div class="field-stack field-stack--compact field-stack--inline${inlineClass}"><label class="field-label field-label--inline" for="single-${escapeAttribute(filter.id)}">${escapeHtml(filter.label)}</label><select class="form-control" id="single-${escapeAttribute(filter.id)}" data-single-filter="${escapeAttribute(filter.id)}">${options}</select>${visibilityButton}</div>`;
    })
    .join("");

  elements.multiSelectFilters.innerHTML = (dataset.multiFilters || [])
    .map((filter) => {
      const selected = state.multiSelects[filter.id] || new Set();
      const options = getMultiFilterOptions(dataset, filter, state);
      const visibilityColumn = getFilterVisibilityColumn(dataset, filter);
      const visibilityButton = renderFilterVisibilityButton(dataset, state, visibilityColumn);
      if (filter.renderAsSelect) {
        const noneSelected = selected.has(MULTI_FILTER_NONE_VALUE);
        const effectiveAll = !selected.size;
        const summary = noneSelected ? "None" : (effectiveAll ? "All" : `${selected.size} selected`);
        const extraButtons = getMultiFilterQuickActions(dataset, filter, state)
          .map((action) => `<button class="link-button ${action.active ? "is-active" : ""}" type="button" data-multi-filter-quick="${escapeAttribute(filter.id)}" data-multi-filter-action="${escapeAttribute(action.action)}">${escapeHtml(action.label)}</button>`)
          .join("");
        const bulkActions = `
          <div class="bulk-actions multi-filter-bulk-actions">
            <button class="link-button" type="button" data-multi-filter-bulk="${escapeAttribute(filter.id)}" data-multi-filter-action="all">All</button>
            <button class="link-button" type="button" data-multi-filter-bulk="${escapeAttribute(filter.id)}" data-multi-filter-action="none">None</button>
            ${extraButtons}
          </div>
        `;
        const checkboxOptions = options
          .map((option) => `<label class="multi-filter-option"><input type="checkbox" value="${escapeAttribute(option)}" data-multi-filter-option="${escapeAttribute(filter.id)}"${(effectiveAll || selected.has(option)) && !noneSelected ? " checked" : ""}> <span>${escapeHtml(option)}</span></label>`)
          .join("");
        return `<details class="multi-pill-group multi-pill-group--select" data-filter-id="${escapeAttribute(filter.id)}"><summary class="multi-filter-summary">${escapeHtml(filter.label)}: ${escapeHtml(summary)}</summary>${visibilityButton}${bulkActions}<div class="multi-filter-select" role="group" aria-label="${escapeAttribute(filter.label)}">${checkboxOptions}</div></details>`;
      }
      const pills = options
        .map((option) => `<button class="pill-toggle ${selected.has(option) ? "is-active" : ""}" type="button" data-multi-filter="${escapeAttribute(filter.id)}" data-multi-value="${escapeAttribute(option)}">${escapeHtml(option)}</button>`)
        .join("");
      return `<div class="multi-pill-group" data-filter-id="${escapeAttribute(filter.id)}"><div class="multi-pill-group__header"><div class="multi-pill-group__label">${escapeHtml(filter.label)}</div>${visibilityButton}</div><div class="pill-grid">${pills}</div></div>`;
    })
    .join("");

  const viewModeRoot = elements.viewModeFilters || elements.singleSelectFilters;
  viewModeRoot.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.addEventListener("click", async () => {
      const nextMode = button.dataset.viewMode;
      if (!nextMode) return;
      const nextState = switchDatasetViewMode(dataset, state, nextMode);
      if (dataset.id === "grassroots") {
        const scope = getGrassrootsDisplayScope(dataset, nextState);
        nextState._grassrootsLoadingScope = scope || "";
        if (scope) {
          startGrassrootsScopeLoad(dataset, nextState, scope);
        }
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "player_career") schedulePlayerCareerSelectedYearLoad(dataset, nextState);
      renderCurrentDataset();
    });
  });

  elements.singleSelectFilters.querySelectorAll("[data-single-filter]").forEach((select) => {
    select.addEventListener("change", async () => {
      try {
        const filterId = select.dataset.singleFilter;
        if (filterId === "view_mode") {
          const nextState = switchDatasetViewMode(dataset, state, select.value);
          if (dataset.id === "grassroots") {
            const scope = getGrassrootsDisplayScope(dataset, nextState);
            nextState._grassrootsLoadingScope = scope || "";
            if (scope) {
              startGrassrootsScopeLoad(dataset, nextState, scope);
            }
            renderCurrentDataset();
            return;
          }
          if (dataset.id === "player_career") schedulePlayerCareerSelectedYearLoad(dataset, nextState);
          renderCurrentDataset();
          return;
        }
        state.extraSelects[filterId] = select.value;
        if (filterId === "setting") {
          state.team = "all";
          state.multiSelects.circuit = new Set();
        }
        if (dataset.id === "grassroots" && (filterId === "setting")) {
          const scope = getGrassrootsDisplayScope(dataset, state);
          state._grassrootsLoadingScope = scope || "";
          if (scope) {
            startGrassrootsScopeLoad(dataset, state, scope);
            return;
          }
          resetUiCaches(state);
        }
        if (dataset.id === "d1" && filterId === "d1_bart_split") {
          resetUiCaches(state);
        }
        await ensureStatusReadyForState(dataset, state);
        if (appState.currentId !== dataset.id) return;
        renderCurrentDataset();
      } catch (error) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
    });
  });

  elements.multiSelectFilters.querySelectorAll("[data-multi-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filterId = button.dataset.multiFilter;
      const value = button.dataset.multiValue;
      if (!filterId || !value) return;
      const selected = state.multiSelects[filterId] || new Set();
      if (selected.has(value)) selected.delete(value);
      else selected.add(value);
      state.multiSelects[filterId] = selected;
      renderCurrentDataset();
    });
  });

  elements.multiSelectFilters.querySelectorAll("[data-multi-filter-bulk]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const filterId = button.dataset.multiFilterBulk;
      const action = button.dataset.multiFilterAction;
      const filter = (dataset.multiFilters || []).find((item) => item.id === filterId);
      if (!filter) return;
      state.multiSelects[filterId] = action === "none" ? new Set([MULTI_FILTER_NONE_VALUE]) : new Set();
      renderCurrentDataset();
    });
  });

  elements.multiSelectFilters.querySelectorAll("[data-multi-filter-quick]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const filterId = button.dataset.multiFilterQuick;
      const action = button.dataset.multiFilterAction;
      const filter = (dataset.multiFilters || []).find((item) => item.id === filterId);
      if (!filter || !action) return;
      applyMultiFilterQuickAction(dataset, state, filter, action);
      renderCurrentDataset();
    });
  });

  elements.multiSelectFilters.querySelectorAll("[data-multi-filter-option]").forEach((input) => {
    input.addEventListener("change", () => {
      const filterId = input.dataset.multiFilterOption;
      if (!filterId) return;
      const selected = new Set(Array.from(elements.multiSelectFilters.querySelectorAll(`[data-multi-filter-option="${CSS.escape(filterId)}"]:checked`)).map((option) => option.value).filter(Boolean));
      const filter = (dataset.multiFilters || []).find((item) => item.id === filterId);
      const options = filter ? getMultiFilterOptions(dataset, filter, state) : [];
      state.multiSelects[filterId] = selected.size === options.length ? new Set() : selected;
      const summary = input.closest("details")?.querySelector(".multi-filter-summary");
      if (summary && filter) summary.textContent = `${filter.label}: ${getMultiFilterSummaryLabel(state.multiSelects[filterId])}`;
      scheduleFilterResultsRender(dataset, state);
    });
  });

  elements.singleSelectFilters.querySelectorAll("[data-single-filter-text]").forEach((input) => {
    const commit = async () => {
      try {
        const filterId = input.dataset.singleFilterText;
        if (!filterId) return;
        state.extraSelects[filterId] = input.value.trim() || "all";
        await ensureStatusReadyForState(dataset, state);
        if (appState.currentId !== dataset.id) return;
        scheduleFilterResultsRender(dataset, state);
      } catch (error) {
        elements.statusPill.textContent = `${dataset.navLabel} load failed`;
        elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
      }
    };
    input.addEventListener("change", commit);
    bindCommittedFilterInput(input, commit);
  });

  document.querySelectorAll("[data-filter-visibility]").forEach((button) => {
    button.addEventListener("click", async () => {
      const column = getStringValue(button.getAttribute("data-filter-visibility")).trim();
      if (!column || !(column in state.visibleColumns)) return;
      if (!state.visibleColumns[column] && isDeferredSupplementColumn(dataset, column)) {
        await ensureDeferredColumnsReady(dataset, state, [column], { scope: "visible" });
        if (appState.currentId !== dataset.id) return;
      }
      state.visibleColumns[column] = !state.visibleColumns[column];
      renderCurrentDataset();
    });
  });
}

function renderDatasetSearchSuggestions(dataset, state) {
  const suggestions = elements.searchSuggestions;
  const input = elements.searchInput;
  if (!suggestions || !input) return;
  if (dataset?.id !== "team_coach") {
    input.removeAttribute("list");
    suggestions.innerHTML = "";
    return;
  }
  const rows = getRawFilterContextRows(dataset, state, {
    ignoreSearch: true,
    ignoreTeam: true,
    ignoreNumericFilters: true,
    ignoreDemoFilters: true,
    skipSort: true,
  });
  const options = Array.from(new Set((rows || [])
    .map((row) => getStringValue(row?.coach_search_text || row?.coach).trim())
    .filter(Boolean)))
    .sort(compareFilterValues);
  input.setAttribute("list", "searchSuggestions");
  suggestions.innerHTML = options.map((value) => `<option value="${escapeAttribute(value)}"></option>`).join("");
}

function getSingleFilterOptions(dataset, filter, state) {
  if (filter.options) return filter.options;
  const cache = getRenderCache(state);
  const optionsCache = cache.singleFilterOptionsCache || (cache.singleFilterOptionsCache = new Map());
  const scope = dataset.id === "grassroots" ? getGrassrootsDisplayScope(dataset, state) : "";
  const scopeRows = dataset.id === "grassroots" ? getGrassrootsActiveScopeRows(dataset, state) : dataset.rows;
  const cacheKey = dataset.id === "grassroots" && filter.id === "event_name"
    ? [
      dataset.id,
      scope,
      Number(dataset?._rowVersion) || 0,
      Array.from(state?.years || []).sort(compareYears).join("|"),
      getStringValue(state?.team),
      getStringValue(state?.search).trim().toLowerCase(),
      serializeSingleFilterState(dataset, state),
      serializeMultiFilterState(dataset, state),
      getStringValue(state?.extraSelects?.view_mode),
    ].join("||")
    : "";
  if (cacheKey && optionsCache.has(cacheKey)) return optionsCache.get(cacheKey);
  if (filter.id === "conference_bucket" && dataset.id === "d1") {
    const conferences = Array.from(new Set(dataset.rows.map((row) => getStringValue(row.conference)).filter(Boolean))).sort(compareFilterValues);
    const options = [
      { value: "all", label: "All" },
      { value: "hm", label: "HM" },
      { value: "hmm", label: "HMM" },
      { value: "hm_hmm", label: "HM+HMM" },
      { value: "low_major", label: "Low Major" },
      ...conferences.map((conference) => ({ value: `conf:${conference}`, label: conference })),
    ];
    return options;
  }
  if (filter.id === "conference" && dataset.id === "team_coach") {
    const conferences = Array.from(new Set(dataset.rows.map((row) => getStringValue(row.conference)).filter(Boolean))).sort(compareFilterValues);
    const options = [
      { value: "all", label: "All" },
      { value: "hm", label: "HM" },
      { value: "hmm", label: "HMM" },
      { value: "hm_hmm", label: "HM+HMM" },
      { value: "low_major", label: "Low Major" },
      ...conferences.map((conference) => ({ value: `conf:${conference}`, label: conference })),
    ];
    return options;
  }
  const sourceRows = filter.id === "event_name"
    ? getFilterContextRows(dataset, state, {
      rows: scopeRows,
      ignoreSingleFilterId: filter.id,
      skipSort: true,
    })
    : scopeRows;
  const valueColumns = dataset.id === "grassroots" && filter.id === "event_name"
    ? ["event_name", "event_group", "event_aliases"]
    : [filter.column];
  const values = Array.from(new Set(sourceRows.flatMap((row) => valueColumns.map((column) => getStringValue(row[column])))
    .filter((value) => value && value !== "Unknown")))
    .sort(dataset.id === "grassroots" && filter.id === "event_name" ? compareGrassrootsEventValues : compareFilterValues);
  const options = [{ value: "all", label: "All" }, ...values.map((value) => ({ value, label: value }))];
  if (cacheKey) optionsCache.set(cacheKey, options);
  return options;
}

function compareGrassrootsEventValues(left, right) {
  const leftText = getStringValue(left).trim();
  const rightText = getStringValue(right).trim();
  if (!leftText || !rightText) return compareFilterValues(leftText, rightText);
  const leftAllClasses = /\ball classes\b/i.test(leftText);
  const rightAllClasses = /\ball classes\b/i.test(rightText);
  const leftBase = getGrassrootsEventSortBase(leftText);
  const rightBase = getGrassrootsEventSortBase(rightText);
  if (normalizeKey(leftBase) === normalizeKey(rightBase) && leftAllClasses !== rightAllClasses) {
    return leftAllClasses ? -1 : 1;
  }
  const leftSeason = extractLeadingYear(leftText);
  const rightSeason = extractLeadingYear(rightText);
  if (leftSeason !== rightSeason) return rightSeason - leftSeason;
  return compareFilterValues(leftBase || leftText, rightBase || rightText);
}

function sortGrassrootsEventValues(values) {
  return Array.from(values || [])
    .map((value) => getStringValue(value).trim())
    .filter(Boolean)
    .sort(compareGrassrootsEventValues);
}

function getGrassrootsEventSortBase(text) {
  return getStringValue(text)
    .replace(/\s*\([A-Z]{2,6}\)\s*/g, " ")
    .replace(/\s*\ball classes\b/i, "")
    .replace(/\b(?:class|div(?:ision)?)\s*\d+[a-z]?\b/gi, "")
    .replace(/\b\d+[a-z]?\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitProfileLevelsValue(value) {
  return Array.from(new Set(getStringValue(value)
    .split(/\s*\/\s*/)
    .map((part) => getStringValue(part).trim())
    .filter(Boolean)));
}

function splitMultiFilterValue(value) {
  return Array.from(new Set(getStringValue(value)
    .split(/\s*(?:\/|,|;|\|)\s*/)
    .map((part) => getStringValue(part).trim())
    .filter(Boolean)));
}

function searchableSingleFilterMatches(rowValue, selected) {
  const rowText = getStringValue(rowValue).trim();
  const selectedText = getStringValue(selected).trim();
  if (!selectedText) return true;
  if (rowText === selectedText) return true;
  const rowKey = normalizeKey(rowText);
  const selectedKey = normalizeKey(selectedText);
  if (!rowKey || !selectedKey) return false;
  if (rowKey === selectedKey) return true;
  const selectedTokens = selectedKey.split(" ").filter(Boolean);
  const rowTokens = rowKey.split(" ").filter(Boolean);
  if (selectedTokens.length < 2) return rowTokens.length === 1 && rowTokens[0] === selectedKey;
  if (selectedTokens.length >= 2) {
    return selectedTokens.every((token) => rowTokens.some((rowToken) => rowToken.startsWith(token)));
  }
  return false;
}

function getMultiFilterOptions(dataset, filter, state) {
  const cache = getRenderCache(state);
  const optionsCache = cache.multiFilterOptionsCache || (cache.multiFilterOptionsCache = new Map());
  const rawSourceRows = dataset.id === "grassroots" ? getGrassrootsActiveScopeRows(dataset, state) : dataset.rows;
  const sourceRows = Array.isArray(rawSourceRows) ? rawSourceRows : [];
  const cacheKey = [
    dataset.id,
    filter.id,
    Number(dataset?._rowVersion) || 0,
    Array.isArray(sourceRows) ? sourceRows.length : 0,
    getStringValue(state?.extraSelects?.view_mode || "player"),
    dataset.id === "grassroots" ? getStringValue(state?.extraSelects?.setting || "all") : "",
    dataset.id === "grassroots" ? Array.from(state?.years || []).sort(compareYears).join("|") : "",
  ].join("|");
  if (optionsCache.has(cacheKey)) return optionsCache.get(cacheKey);
  let options = [];
  if (dataset.id === "grassroots" && filter.id === "circuit") {
    const selectedSetting = getStringValue(state?.extraSelects?.setting).trim();
    const allowedCircuits = getGrassrootsCircuitsForSetting(selectedSetting);
    const values = Array.isArray(filter.sort)
      ? filter.sort.slice()
      : Array.from(new Set(sourceRows.map((row) => getStringValue(row[filter.column])).filter(Boolean)));
    options = allowedCircuits ? values.filter((value) => allowedCircuits.has(normalizeKey(value))) : values;
  } else if (dataset.id === "player_career" && filter.id === "path_levels") {
    const values = Array.from(new Set(sourceRows.flatMap((row) => splitProfileLevelsValue(row.profile_levels))));
    if (Array.isArray(filter.sort)) {
      const sorted = filter.sort.filter((value) => values.includes(value));
      const remainder = values.filter((value) => !sorted.includes(value)).sort(compareFilterValues);
      options = [...sorted, ...remainder];
    } else {
      options = values.sort(compareFilterValues);
    }
  } else if (filter.renderAsSelect) {
    const values = Array.from(new Set(sourceRows.flatMap((row) => splitMultiFilterValue(row[filter.column]))));
    if (Array.isArray(filter.options)) {
      const optionSet = new Set(filter.options);
      const sorted = filter.options.filter((value) => values.includes(value));
      const remainder = values.filter((value) => !optionSet.has(value)).sort(compareFilterValues);
      options = [...sorted, ...remainder];
    } else if (Array.isArray(filter.sort)) {
      const sortSet = new Set(filter.sort);
      const sorted = filter.sort.filter((value) => values.includes(value));
      const remainder = values.filter((value) => !sortSet.has(value)).sort(compareFilterValues);
      options = [...sorted, ...remainder];
    } else {
      options = values.sort(compareFilterValues);
    }
  } else {
    const values = Array.from(new Set(sourceRows.map((row) => getStringValue(row[filter.column])).filter(Boolean)));
    options = Array.isArray(filter.sort)
      ? filter.sort.slice()
      : values.sort(compareFilterValues);
  }
  optionsCache.set(cacheKey, options);
  if (optionsCache.size > 24) {
    const oldest = optionsCache.keys().next().value;
    if (oldest) optionsCache.delete(oldest);
  }
  return options;
}

function compareFilterValues(left, right) {
  return getStringValue(left).localeCompare(getStringValue(right), undefined, { numeric: true, sensitivity: "base" });
}

function getDemoToggleColumns(dataset) {
  const rangeColumns = new Set(getDemoRangeColumns(dataset));
  return (dataset?.meta?.demoToggleColumns || [])
    .filter((column) => !getLockedColumns(dataset).includes(column))
    .filter((column) => !rangeColumns.has(column));
}

function getDemoRangeColumns(dataset) {
  return dataset?.meta?.demoFilterColumns || [];
}

function renderDemoToggles(dataset, state) {
  const columns = getDemoToggleColumns(dataset);
  if (!columns.length) {
    elements.demoToggles.innerHTML = "";
    elements.demoToggles.hidden = true;
    elements.demoToggles.dataset.shellKey = "";
    return;
  }
  const shellKey = [
    dataset?.id,
    columns.join("|"),
  ].join("||");
  if (elements.demoToggles.dataset.shellKey === shellKey) {
    elements.demoToggles.querySelectorAll("[data-demo-column]").forEach((button) => {
      const column = getStringValue(button.dataset.demoColumn);
      button.classList.toggle("is-active", Boolean(state.visibleColumns[column]));
    });
    elements.demoToggles.hidden = false;
    return;
  }
  elements.demoToggles.innerHTML = columns
    .map((column) => {
      const active = state.visibleColumns[column] ? "is-active" : "";
      return `<button class="pill-toggle ${active}" type="button" data-demo-column="${escapeAttribute(column)}">${escapeHtml(displayLabel(dataset, column))}</button>`;
    })
    .join("");
  elements.demoToggles.dataset.shellKey = shellKey;
  elements.demoToggles.hidden = false;
  elements.demoToggles.querySelectorAll("[data-demo-column]").forEach((button) => {
    button.addEventListener("click", () => {
      const column = button.dataset.demoColumn;
      if (!column || getLockedColumns(dataset).includes(column)) return;
      state.visibleColumns[column] = !state.visibleColumns[column];
      renderCurrentDataset();
    });
  });
}

function renderDemoRangeFilters(dataset, state) {
  const filterMeta = new Map(dataset.meta.demoFilterMeta.map((item) => [item.column, item]));
  const columns = getDemoRangeColumns(dataset);
  if (!columns.length) {
    elements.demoRangeFilters.innerHTML = "";
    elements.demoRangeFilters.dataset.shellKey = "";
    return;
  }
  const shellKey = [
    dataset?.id,
    getUiStateRenderKey(state),
    columns.join("|"),
    columns.map((column) => `${column}:${filterMeta.get(column)?.type || ""}:${filterMeta.has(column) ? "1" : "0"}`).join("|"),
  ].join("||");
  if (elements.demoRangeFilters.dataset.shellKey === shellKey) {
    elements.demoRangeFilters.querySelectorAll("[data-demo-column]").forEach((button) => {
      const column = getStringValue(button.dataset.demoColumn);
      button.classList.toggle("is-active", Boolean(state.visibleColumns[column]));
    });
    elements.demoRangeFilters.querySelectorAll("[data-demo-min]").forEach((input) => {
      const column = getStringValue(input.dataset.demoMin);
      const nextValue = getStringValue(state.demoFilters[column]?.min);
      if (input.value !== nextValue) input.value = nextValue;
    });
    elements.demoRangeFilters.querySelectorAll("[data-demo-max]").forEach((input) => {
      const column = getStringValue(input.dataset.demoMax);
      const nextValue = getStringValue(state.demoFilters[column]?.max);
      if (input.value !== nextValue) input.value = nextValue;
    });
    return;
  }
  elements.demoRangeFilters.innerHTML = columns
    .map((column) => {
      const type = filterMeta.get(column)?.type || "";
      const filter = state.demoFilters[column] || { min: "", max: "" };
      const inputMode = type === "date" ? "numeric" : "decimal";
      const active = state.visibleColumns[column] ? "is-active" : "";
      const disabled = filterMeta.has(column) ? "" : " disabled";
      return `
        <div class="demo-range-item" data-demo-range="${escapeAttribute(column)}">
          <button class="demo-toggle-button demo-range-label ${active}" type="button" data-demo-column="${escapeAttribute(column)}">${escapeHtml(displayLabel(dataset, column))}</button>
          <input class="demo-range-input" type="text" inputmode="${inputMode}" autocomplete="off" placeholder="Min" value="${escapeAttribute(filter.min)}" data-demo-min="${escapeAttribute(column)}"${disabled}>
          <input class="demo-range-input" type="text" inputmode="${inputMode}" autocomplete="off" placeholder="Max" value="${escapeAttribute(filter.max)}" data-demo-max="${escapeAttribute(column)}"${disabled}>
        </div>
      `;
    })
    .join("");
  elements.demoRangeFilters.dataset.shellKey = shellKey;

  elements.demoRangeFilters.querySelectorAll("[data-demo-column]").forEach((button) => {
    button.addEventListener("click", () => {
      const column = button.dataset.demoColumn;
      if (!column) return;
      if (getLockedColumns(dataset).includes(column)) return;
      state.visibleColumns[column] = !state.visibleColumns[column];
      renderCurrentDataset();
    });
  });

  elements.demoRangeFilters.querySelectorAll("[data-demo-min]").forEach((input) => {
    input.addEventListener("input", () => {
      const column = input.dataset.demoMin;
      if (!column || !state.demoFilters[column]) return;
      state.demoFilters[column].min = input.value;
    });
    bindCommittedFilterInput(input, () => scheduleFilterResultsRender(dataset, state));
  });

  elements.demoRangeFilters.querySelectorAll("[data-demo-max]").forEach((input) => {
    input.addEventListener("input", () => {
      const column = input.dataset.demoMax;
      if (!column || !state.demoFilters[column]) return;
      state.demoFilters[column].max = input.value;
    });
    bindCommittedFilterInput(input, () => scheduleFilterResultsRender(dataset, state));
  });
}

function getLockedColumns(dataset) {
  const locked = Array.isArray(dataset?.lockedColumns) ? dataset.lockedColumns : [];
  const autoLocked = (dataset?.multiFilters || [])
    .map((filter) => getStringValue(filter?.column).trim())
    .filter((column) => /^(pos|pos_text)$/i.test(column));
  return Array.from(new Set([...locked, ...autoLocked]));
}

function getDemoControlColumns(dataset) {
  return Array.from(new Set([
    ...getDemoToggleColumns(dataset),
    ...getDemoRangeColumns(dataset),
  ]));
}

const GROUP_VISIBILITY_ACTIONS = ["default", "all", "none"];
const GROUP_UNIT_MODE_ORDER = [
  { id: "rates", label: "Rates" },
  { id: "totals", label: "Totals" },
  { id: "per_game", label: "Per G" },
  { id: "per40", label: "Per 40" },
  { id: "per100", label: "Per 100" },
  { id: "all", label: "All" },
];

function isPlaytypeCountColumn(baseColumn) {
  return /(?:_poss$|_points$|_pts$|_fga$|_fgm$|_fg_miss$|_two_pa$|_three_pa$|_fta$|_ftm$|_tov$|_plus1$|_fg_att$|_fg_made$|_fg_miss$|_two_fg_att$|_two_fg_made$|_two_fg_miss$|_three_fg_att$|_three_fg_made$|_three_fg_miss$)/i.test(baseColumn);
}

function isShotProfileCountColumn(baseColumn) {
  return /(?:_made$|_att$|_unast(?:_made)?$|^(?:fgm|fga|ftm|fta|two_pm|two_pa|three_pm|three_pa|2pm|2pa|3pm|3pa|tpm|tpa)$)/i.test(baseColumn);
}

function getColumnUnitMode(column, group = null) {
  const baseColumn = stripCompanionPrefix(column);
  if (/_per100$/i.test(baseColumn)) return "per100";
  if (/_per40$/i.test(baseColumn)) return "per40";
  if (/_pg$/i.test(baseColumn) || /_per_g$/i.test(baseColumn)) return "per_game";
  if (group?.unitModeKind === "playtype") {
    return isPlaytypeCountColumn(baseColumn) ? "totals" : "rates";
  }
  if (group?.unitModeKind === "shot_profile") {
    return isShotProfileCountColumn(baseColumn) ? "totals" : "rates";
  }
  return "totals";
}

function getCustomGroupUnitModes(group) {
  if (!Array.isArray(group?.unitModes) || !group.unitModes.length) return [];
  const groupColumns = new Set(group.columns || []);
  const modes = group.unitModes
    .map((item) => {
      const id = getStringValue(item?.id).trim();
      if (!id) return null;
      const sourceColumns = Array.isArray(item?.columns) && item.columns.length ? item.columns : group.columns;
      const columns = sourceColumns.filter((column) => groupColumns.has(column));
      if (!columns.length) return null;
      const defaultColumns = (Array.isArray(item?.defaultColumns) ? item.defaultColumns : [])
        .filter((column) => columns.includes(column));
      return {
        id,
        label: getStringValue(item?.label || id).trim() || id,
        columns,
        defaultColumns,
      };
    })
    .filter(Boolean);
  if (modes.length > 1 && !modes.some((item) => item.id === "all")) {
    modes.push({ id: "all", label: "All", columns: (group.columns || []).slice(), defaultColumns: [] });
  }
  return modes;
}

function getGroupUnitModes(dataset, group) {
  if (!group?.columns?.length) return [];
  if (Array.isArray(group._unitModesCache)) return group._unitModesCache;
  const customModes = getCustomGroupUnitModes(group);
  if (customModes.length) {
    group._unitModesCache = customModes;
    return group._unitModesCache;
  }
  if (!group?.unitModeKind) return [];
  const columnsByMode = new Map();
  (group.columns || []).forEach((column) => {
    const unitMode = getColumnUnitMode(column, group);
    if (!columnsByMode.has(unitMode)) columnsByMode.set(unitMode, []);
    columnsByMode.get(unitMode).push(column);
  });
  const detectedModes = GROUP_UNIT_MODE_ORDER
    .filter((item) => columnsByMode.has(item.id))
    .map((item) => ({ ...item, columns: columnsByMode.get(item.id).slice() }));
  if (detectedModes.length > 1) {
    detectedModes.push({ id: "all", label: "All", columns: (group.columns || []).slice() });
  }
  group._unitModesCache = detectedModes;
  return group._unitModesCache;
}

function getDefaultGroupUnitMode(dataset, group) {
  const unitModes = getGroupUnitModes(dataset, group);
  if (!unitModes.length) return "totals";
  const configuredDefault = getStringValue(group?.defaultUnitMode).trim();
  if (configuredDefault && unitModes.some((item) => item.id === configuredDefault)) return configuredDefault;
  return unitModes.find((item) => item.id === "rates")?.id
    || unitModes.find((item) => item.id === "totals")?.id
    || unitModes[0].id;
}

function getGroupUnitMode(state, dataset, group) {
  const unitModes = getGroupUnitModes(dataset, group);
  if (!unitModes.length) return "totals";
  const fallback = getDefaultGroupUnitMode(dataset, group);
  const requested = getStringValue(state?.groupUnitModes?.[group.id] || fallback);
  return unitModes.find((item) => item.id === requested)?.id || fallback;
}

function getGroupUnitModeLabel(state, dataset, group) {
  const unitMode = getGroupUnitMode(state, dataset, group);
  return getGroupUnitModes(dataset, group).find((item) => item.id === unitMode)?.label || "Rates";
}

function getVisibleGroupColumns(group, state) {
  return (group?.columns || []).filter((column) => state.visibleColumns[column]);
}

function findEquivalentGroupUnitColumn(group, column, targetUnitMode) {
  if (!group?.columns?.length || !column) return "";
  if (targetUnitMode === "all") return group.columns.includes(column) ? column : "";
  const baseColumn = stripCompanionPrefix(column).replace(/(_pg|_per_g|_per40)$/i, "");
  const candidates = targetUnitMode === "per40"
    ? [`${baseColumn}_per40`]
    : targetUnitMode === "per_game"
    ? [`${baseColumn}_pg`, `${baseColumn}_per_g`]
    : targetUnitMode === "rates"
    ? [baseColumn]
    : [baseColumn];
  return group.columns.find((item) => candidates.includes(stripCompanionPrefix(item))) || "";
}

function getEquivalentShotProfileUnitColumns(group, column, targetUnitMode) {
  if (!group?.columns?.length || !column || !["totals", "per_game", "per40"].includes(targetUnitMode)) return [];
  if (getColumnUnitMode(column, group) === targetUnitMode && group.columns.includes(column)) return [column];
  const baseColumn = stripCompanionPrefix(column);
  const suffix = targetUnitMode === "per40" ? "_per40" : targetUnitMode === "per_game" ? "_pg" : "";
  const mappedBases = {
    dunk_pct: ["dunk_made", "dunk_att"],
    rim_pct: ["rim_made", "rim_att"],
    fgpct_rim: ["rim_made", "rim_att"],
    mid_pct: ["mid_made", "mid_att"],
    fgpct_mid: ["mid_made", "mid_att"],
    two_p_pct: ["two_p_made", "two_p_att"],
    "2p_pct": ["two_p_made", "two_p_att"],
    fg2pct: ["two_p_made", "two_p_att"],
    three_p_pct: ["three_p_made", "three_p_att"],
    "3p_pct": ["three_p_made", "three_p_att"],
    tp_pct: ["three_p_made", "three_p_att"],
    fg3pct: ["three_p_made", "three_p_att"],
    ft_pct: ["ftm", "fta"],
    ftpct: ["ftm", "fta"],
  }[baseColumn] || [];
  return mappedBases
    .map((item) => `${item}${suffix}`)
    .filter((item) => group.columns.includes(item));
}

function mapGroupColumnsToUnitMode(group, columns, targetUnitMode) {
  const customUnitMode = Array.isArray(group?.unitModes)
    ? getGroupUnitModes(null, group).find((item) => item.id === targetUnitMode)
    : null;
  if (customUnitMode) {
    return Array.from(new Set((columns || []).filter((column) => customUnitMode.columns.includes(column))));
  }
  const mapped = [];
  const seen = new Set();
  (columns || []).forEach((column) => {
    const shotProfileColumns = group?.unitModeKind === "shot_profile"
      ? getEquivalentShotProfileUnitColumns(group, column, targetUnitMode)
      : [];
    if (shotProfileColumns.length) {
      shotProfileColumns.forEach((item) => {
        if (seen.has(item)) return;
        seen.add(item);
        mapped.push(item);
      });
      return;
    }
    const nextColumn = findEquivalentGroupUnitColumn(group, column, targetUnitMode);
    if (!nextColumn || seen.has(nextColumn)) return;
    seen.add(nextColumn);
    mapped.push(nextColumn);
  });
  return mapped;
}

function getGroupColumnsForUnitMode(dataset, group, unitMode) {
  const unitModes = getGroupUnitModes(dataset, group);
  if (!unitModes.length) return group?.columns || [];
  return unitModes.find((item) => item.id === unitMode)?.columns.slice() || unitModes[0].columns.slice();
}

function getGroupDefaultColumnsForUnitMode(dataset, group, unitMode) {
  const unitColumns = getGroupColumnsForUnitMode(dataset, group, unitMode);
  if (!unitColumns.length) return [];
  if (unitMode === "all") {
    const baseModes = getGroupUnitModes(dataset, group)
      .map((item) => item.id)
      .filter((id) => id !== "all");
    return Array.from(new Set(baseModes.flatMap((mode) => getGroupDefaultColumnsForUnitMode(dataset, group, mode))));
  }
  const modeDefaults = getGroupUnitModes(dataset, group)
    .find((item) => item.id === unitMode)
    ?.defaultColumns
    ?.filter((column) => unitColumns.includes(column)) || [];
  if (modeDefaults.length) return modeDefaults;
  const directDefaults = (group.defaultColumns || []).filter((column) => unitColumns.includes(column));
  if (directDefaults.length) return directDefaults;
  const mappedDefaults = mapGroupColumnsToUnitMode(group, group.defaultColumns || [], unitMode).filter((column) => unitColumns.includes(column));
  if (mappedDefaults.length >= Math.min(2, unitColumns.length)) return mappedDefaults;
  return unitColumns;
}

function getGroupScopeColumns(dataset, group, state, scope, unitMode = getGroupUnitMode(state, dataset, group)) {
  const unitColumns = getGroupColumnsForUnitMode(dataset, group, unitMode);
  if (scope === "none") return [];
  if (scope === "all") return unitColumns;
  if (scope === "custom") {
    const mappedVisible = mapGroupColumnsToUnitMode(group, getVisibleGroupColumns(group, state), unitMode).filter((column) => unitColumns.includes(column));
    return mappedVisible.length ? mappedVisible : getGroupDefaultColumnsForUnitMode(dataset, group, unitMode);
  }
  return getGroupDefaultColumnsForUnitMode(dataset, group, unitMode);
}

function getNextGroupVisibilityState(dataset, group, state) {
  const currentColumns = getVisibleGroupColumns(group, state);
  const currentState = getGroupSelectionState(dataset, group, state);
  const startIndex = GROUP_VISIBILITY_ACTIONS.indexOf(currentState);
  for (let offset = 1; offset <= GROUP_VISIBILITY_ACTIONS.length; offset += 1) {
    const candidate = GROUP_VISIBILITY_ACTIONS[(Math.max(startIndex, -1) + offset) % GROUP_VISIBILITY_ACTIONS.length];
    const targetColumns = getGroupScopeColumns(dataset, group, state, candidate);
    if (!areSameColumns(currentColumns, targetColumns)) return candidate;
  }
  return currentState === "none" ? "default" : "none";
}

function renderStatGroups(dataset, state) {
  const numericColumnSet = dataset.meta.numericColumnSet || new Set(dataset.meta.numericColumns || []);
  let groups = dataset.meta.groups
    .filter((group) => !(dataset.id === "d1" && group.id === "playtype_analysis"))
    .filter((group) => !group.hiddenInFilters);
  const seenFilterColumns = new Set();
  const renderedGroupColumns = new Map();
  groups.forEach((group) => {
    const columns = getRenderedFilterColumnsForGroup(dataset, group, state)
      .filter((column) => {
        if (seenFilterColumns.has(column)) return false;
        seenFilterColumns.add(column);
        return true;
      });
    renderedGroupColumns.set(group.id, columns);
  });
  groups = groups.filter((group) => (renderedGroupColumns.get(group.id) || []).length);
  const shellKey = [
    dataset?.id,
    Array.from(dataset.meta.allColumns || []).map((column) => (state.visibleColumns[column] ? column : "")).join("|"),
    groups.map((group) => `${group.id}:${getGroupUnitMode(state, dataset, group)}`).join("|"),
    groups.map((group) => `${group.id}:${state.collapsedGroups?.[group.id] ? 1 : 0}`).join("|"),
    Number(dataset?._rowVersion) || 0,
    groups.map((group) => `${group.id}:${(renderedGroupColumns.get(group.id) || []).join(",")}`).join("|"),
    Array.from(numericColumnSet).sort(compareFilterValues).join("|"),
  ].join("||");
  if (elements.statGroups.dataset.shellKey === shellKey) {
    elements.statGroups.querySelectorAll("[data-group-cycle]").forEach((button) => {
      const groupId = getStringValue(button.dataset.groupCycle);
      const group = groups.find((item) => item.id === groupId);
      if (!group) return;
      button.classList.toggle("is-active", group.columns.some((column) => state.visibleColumns[column]));
      const groupState = getGroupSelectionState(dataset, group, state);
      const note = button.querySelector(".cycle-note");
      if (note) note.textContent = `(${groupState})`;
    });
    elements.statGroups.querySelectorAll("[data-group-unit]").forEach((button) => {
      const groupId = getStringValue(button.dataset.groupUnit);
      const group = groups.find((item) => item.id === groupId);
      if (!group) return;
      button.textContent = getGroupUnitModeLabel(state, dataset, group);
    });
    elements.statGroups.querySelectorAll("[data-group-collapse]").forEach((button) => {
      const groupId = getStringValue(button.dataset.groupCollapse);
      const collapsed = Boolean(state.collapsedGroups?.[groupId]);
      button.textContent = collapsed ? ">" : "v";
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
      button.title = collapsed ? "Expand" : "Compress";
      const section = button.closest(".stat-group");
      section?.classList.toggle("is-collapsed", collapsed);
      section?.querySelector(".stat-group__body")?.toggleAttribute("hidden", collapsed);
    });
    elements.statGroups.querySelectorAll("[data-stat-column]").forEach((button) => {
      const column = getStringValue(button.dataset.statColumn);
      button.classList.toggle("is-active", Boolean(state.visibleColumns[column]));
    });
    elements.statGroups.querySelectorAll("[data-stat-min]").forEach((input) => {
      const column = getStringValue(input.dataset.statMin);
      const nextValue = getStringValue(state.numericFilters[column]?.min);
      if (input.value !== nextValue) input.value = nextValue;
    });
    elements.statGroups.querySelectorAll("[data-stat-max]").forEach((input) => {
      const column = getStringValue(input.dataset.statMax);
      const nextValue = getStringValue(state.numericFilters[column]?.max);
      if (input.value !== nextValue) input.value = nextValue;
    });
    return;
  }
  elements.statGroups.innerHTML = groups
    .map((group) => {
      const groupState = getGroupSelectionState(dataset, group, state);
      const unitModes = getGroupUnitModes(dataset, group);
      const unitModeButton = unitModes.length > 1
        ? `<button class="group-unit-button" type="button" data-group-unit="${escapeAttribute(group.id)}">${escapeHtml(getGroupUnitModeLabel(state, dataset, group))}</button>`
        : "";
      const filterColumns = renderedGroupColumns.get(group.id) || [];
      const collapsed = Boolean(state.collapsedGroups?.[group.id]);
      const rowsHtml = filterColumns
        .map((column) => {
          const active = state.visibleColumns[column] ? "is-active" : "";
          const filter = state.numericFilters[column] || { min: "", max: "" };
          const disabled = numericColumnSet.has(column) ? "" : " disabled";
          return `<div class="filter-row"><button class="pill-toggle filter-row__label ${active}" type="button" data-stat-column="${escapeAttribute(column)}">${escapeHtml(displayLabel(dataset, column))}</button><input class="filter-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Min" value="${escapeAttribute(filter.min ?? "")}" data-stat-min="${escapeAttribute(column)}"${disabled}><input class="filter-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Max" value="${escapeAttribute(filter.max ?? "")}" data-stat-max="${escapeAttribute(column)}"${disabled}></div>`;
        })
        .join("");
      return `<section class="stat-group${collapsed ? " is-collapsed" : ""}"><div class="stat-group__header"><button class="group-collapse-button" type="button" data-group-collapse="${escapeAttribute(group.id)}" aria-label="${escapeAttribute(collapsed ? `Expand ${group.label}` : `Compress ${group.label}`)}" aria-expanded="${collapsed ? "false" : "true"}" title="${collapsed ? "Expand" : "Compress"}">${collapsed ? ">" : "v"}</button><button class="group-cycle-button ${group.columns.some((column) => state.visibleColumns[column]) ? "is-active" : ""}" type="button" data-group-cycle="${escapeAttribute(group.id)}">${escapeHtml(group.label)} <span class="cycle-note">(${escapeHtml(groupState)})</span></button>${unitModeButton}</div><div class="stat-group__body"${collapsed ? " hidden" : ""}>${rowsHtml}</div></section>`;
    })
    .join("");
  elements.statGroups.dataset.shellKey = shellKey;

  elements.statGroups.querySelectorAll("[data-stat-min]").forEach((input) => {
    bindCommittedFilterInput(input, () => {
      const column = input.dataset.statMin;
      if (!column) return;
      scheduleFilterResultsRender(dataset, state, [column]);
    });
  });

  elements.statGroups.querySelectorAll("[data-stat-max]").forEach((input) => {
    bindCommittedFilterInput(input, () => {
      const column = input.dataset.statMax;
      if (!column) return;
      scheduleFilterResultsRender(dataset, state, [column]);
    });
  });
}

function getGroupSelectionState(dataset, group, state) {
  const visible = getVisibleGroupColumns(group, state);
  if (!visible.length) return "none";
  const unitMode = getGroupUnitMode(state, dataset, group);
  if (areSameColumns(visible, getGroupScopeColumns(dataset, group, state, "default", unitMode))) return "default";
  if (areSameColumns(visible, getGroupScopeColumns(dataset, group, state, "all", unitMode))) return "all";
  return "custom";
}

function getRenderedFilterColumnsForGroup(dataset, group, state) {
  if (!group) return [];
  const demoRangeColumns = new Set(dataset?.meta?.demoFilterColumns || []);
  const unitMode = getGroupUnitMode(state, dataset, group);
  const unitColumns = getGroupColumnsForUnitMode(dataset, group, unitMode)
    .filter((column) => !demoRangeColumns.has(column));
  const activeFilters = (group.columns || [])
    .filter((column) => !demoRangeColumns.has(column))
    .filter((column) => hasActiveRangeFilter(state?.numericFilters?.[column]));
  return Array.from(new Set([...unitColumns, ...activeFilters]));
}

function areSameColumns(left = [], right = []) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((column) => rightSet.has(column));
}

function getGroupCycleActions(dataset, group) {
  return GROUP_VISIBILITY_ACTIONS;
}

async function cycleGroupVisibility(dataset, state, group) {
  const nextState = getNextGroupVisibilityState(dataset, group, state);
  const targetColumns = getGroupScopeColumns(dataset, group, state, nextState);
  const missingColumns = targetColumns.filter((column) => !state.visibleColumns[column]);
  if (missingColumns.length) {
    await ensureDeferredColumnsReady(dataset, state, missingColumns, { scope: "visible" });
    if (appState.currentId !== dataset.id) return;
  }
  group.columns.forEach((column) => {
    if (!(column in state.visibleColumns)) return;
    state.visibleColumns[column] = targetColumns.includes(column);
  });
  renderCurrentDataset();
}

async function cycleGroupUnitMode(dataset, state, group) {
  const unitModes = getGroupUnitModes(dataset, group);
  if (unitModes.length < 2) return;
  const currentMode = getGroupUnitMode(state, dataset, group);
  const currentIndex = unitModes.findIndex((item) => item.id === currentMode);
  const nextMode = unitModes[(currentIndex + 1) % unitModes.length]?.id || unitModes[0].id;
  const currentState = getGroupSelectionState(dataset, group, state);
  const targetColumns = getGroupScopeColumns(dataset, group, state, currentState, nextMode);
  const missingColumns = targetColumns.filter((column) => !state.visibleColumns[column]);
  if (missingColumns.length) {
    await ensureDeferredColumnsReady(dataset, state, missingColumns, { scope: "visible" });
    if (appState.currentId !== dataset.id) return;
  }
  state.groupUnitModes[group.id] = nextMode;
  group.columns.forEach((column) => {
    if (!(column in state.visibleColumns)) return;
    state.visibleColumns[column] = targetColumns.includes(column);
  });
  renderCurrentDataset();
}

function getPlaytypeLegendMetricActions(dataset) {
  if (!["d1", "team_coach", "nba"].includes(dataset?.id)) return [];
  const actions = [
    { id: "freq", label: "Freq" },
    { id: "ppp", label: "PPP" },
    { id: "efg", label: "eFG%" },
    { id: "ts", label: "TS%" },
    { id: "to", label: "TO%" },
    { id: "two_p", label: "2P%" },
    { id: "three_p", label: "3P%" },
  ];
  return actions.filter((item) => getPlaytypeLegendMetricColumns(dataset, item.id).length);
}

function getPlaytypeLegendMetricColumns(dataset, metricId) {
  const suffixTests = {
    freq: [/_freq$/i],
    ppp: [/_ppp$/i],
    efg: [/_efg_pct$/i],
    ts: [/_ts_pct$/i],
    to: [/_to_pct$/i, /_tov_pct$/i],
    two_p: [/_two_p_pct$/i, /_two_fg_pct$/i],
    three_p: [/_three_p_pct$/i, /_three_fg_pct$/i],
  }[metricId] || [];
  if (!suffixTests.length) return [];
  const columns = new Set((dataset?.meta?.groups || []).flatMap((group) => group.columns || []));
  return Array.from(columns).filter((column) => {
    const baseColumn = stripCompanionPrefix(column);
    const isPlaytype = dataset?.id === "team_coach"
      ? isTeamCoachPlaytypeColumn(baseColumn)
      : (dataset?.id === "nba"
        ? NBA_PLAYTYPE_DEFS.some((playtype) => baseColumn === playtype.id || baseColumn.startsWith(`${playtype.id}_`))
        : D1_TRUE_PLAYTYPE_IDS.some((prefix) => baseColumn === prefix || baseColumn.startsWith(`${prefix}_`)));
    return isPlaytype && suffixTests.some((test) => test.test(baseColumn));
  });
}

async function togglePlaytypeLegendMetricVisibility(dataset, state, metricId) {
  if (!dataset || !state || !metricId) return;
  const columns = getPlaytypeLegendMetricColumns(dataset, metricId);
  if (!columns.length) return;
  const allVisible = columns.every((column) => state.visibleColumns[column]);
  const targetColumns = allVisible ? [] : columns;
  const missingColumns = targetColumns.filter((column) => !state.visibleColumns[column]);
  if (missingColumns.length) {
    await ensureDeferredColumnsReady(dataset, state, missingColumns, { scope: "visible" });
    if (appState.currentId !== dataset.id) return;
  }
  columns.forEach((column) => {
    if (column in state.visibleColumns) state.visibleColumns[column] = !allVisible;
  });
  renderCurrentDataset();
}

function renderTableLegend(dataset, state) {
  if (!elements.tableLegend) return;
  const legendKey = `${dataset.id}|${(dataset.meta.groups || []).map((group) => group.id).join("|")}`;
  if (elements.tableLegend.dataset.legendKey === legendKey) return;
  const footerGroups = dataset.id === "d1"
    ? ["summary", "playtype_analysis", "advanced", "shot_profile", "scoring_data"]
      .map((groupId) => (dataset.meta.groups || []).find((group) => group.id === groupId))
      .filter(Boolean)
    : (dataset.meta.groups || []).filter((group) => !["info", "meta"].includes(group.id) && !group.hiddenInLegend);
  const sep = '<span class="table-legend__sep">&bull;</span>';
  const links = [
    `<button class="link-button" type="button" data-stat-mode="default">Default</button>`,
    sep,
    `<button class="link-button" type="button" data-stat-mode="all">All</button>`,
    sep,
    `<button class="link-button" type="button" data-stat-mode="none">None</button>`,
  ];
  footerGroups.forEach((group) => {
    links.push(sep);
    links.push(`<button class="link-button" type="button" data-stat-group="${escapeAttribute(group.id)}">${escapeHtml(group.label)}</button>`);
  });
  getPlaytypeLegendMetricActions(dataset).forEach((item) => {
    links.push(sep);
    links.push(`<button class="link-button" type="button" data-stat-playtype-metric="${escapeAttribute(item.id)}">${escapeHtml(item.label)}</button>`);
  });
  links.push(sep);
  links.push(`<button class="link-button" type="button" data-reset-filters="true">Reset</button>`);
  elements.tableLegend.innerHTML = `<span class="table-legend__title">Show:</span> <span class="table-legend__links">${links.join("")}</span>`;
  elements.tableLegend.dataset.legendKey = legendKey;

  elements.tableLegend.querySelectorAll("[data-stat-mode]").forEach((button) => {
    button.addEventListener("click", async () => {
      const mode = button.dataset.statMode;
      if (!mode) return;
      await applyVisibilityMode("stats", mode);
    });
  });

  elements.tableLegend.querySelectorAll("[data-stat-group]").forEach((button) => {
    button.addEventListener("click", async () => {
      const currentDataset = getCurrentDataset();
      const currentState = getCurrentUiState();
      const groupId = button.dataset.statGroup;
      const group = currentDataset?.meta?.groups?.find((item) => item.id === groupId);
      if (!currentDataset || !currentState || !group) return;
      await cycleGroupVisibility(currentDataset, currentState, group);
    });
  });

  elements.tableLegend.querySelectorAll("[data-stat-playtype-metric]").forEach((button) => {
    button.addEventListener("click", async () => {
      const currentDataset = getCurrentDataset();
      const currentState = getCurrentUiState();
      if (!currentDataset || !currentState) return;
      await togglePlaytypeLegendMetricVisibility(currentDataset, currentState, button.dataset.statPlaytypeMetric);
    });
  });

  elements.tableLegend.querySelectorAll("[data-reset-filters]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentDataset = getCurrentDataset();
      if (!currentDataset) return;
      appState.uiState[currentDataset.id] = createInitialUiState(currentDataset);
      renderCurrentDataset();
    });
  });
}

function getFilteredRows(dataset, state) {
  const cache = getRenderCache(state);
  const filterKey = [
    getDisplayRowsCacheKey(dataset, state),
    getStringValue(state.team),
    state.search.trim().toLowerCase(),
    getGrassrootsSearchYearFilterKey(dataset, state),
    serializeSingleFilterState(dataset, state),
    serializeMultiFilterState(dataset, state),
    serializeRangeFilters(dataset.meta.demoFilterMeta.map((item) => item.column), state.demoFilters),
    serializeRangeFilters(dataset.meta.numericColumns || [], state.numericFilters),
  ].join("||");
  const sortKey = [
    filterKey,
    getStringValue(state.sortBy),
    getStringValue(state.sortDir),
    getStringValue(state.sortMetric || "value"),
    getStringValue(state.sortBlankMode),
  ].join("||");
  if (cache.filteredRowsKey === sortKey) return cache.filteredRows;
  const displayRows = getDisplayRows(dataset, state);
  const filteredBase = state.extraSelects.view_mode === "career"
    ? getCareerFilteredRows(dataset, state, displayRows, filterKey)
    : getBaseFilteredRows(dataset, state, displayRows, filterKey);
  const filtered = sortRows(filteredBase, state.sortBy, state.sortDir, dataset, state.sortBlankMode, state.sortMetric || "value");
  cache.filteredRowsKey = sortKey;
  cache.filteredRows = filtered;
  return filtered;
}

function getBaseFilteredRows(dataset, state, rows, baseKey) {
  const cache = getRenderCache(state);
  if (cache.baseFilteredRowsKey === baseKey) return cache.baseFilteredRows;
  const filtered = getFilterContextRows(dataset, state, { rows, skipSort: true });
  cache.baseFilteredRowsKey = baseKey;
  cache.baseFilteredRows = filtered;
  return filtered;
}

function getCareerFilteredRows(dataset, state, rows, baseKey = "") {
  const cache = getRenderCache(state);
  const key = baseKey || [
    getDisplayRowsCacheKey(dataset, state),
    getStringValue(state.team),
    getStringValue(state.search).trim().toLowerCase(),
    getGrassrootsSearchYearFilterKey(dataset, state),
    serializeSingleFilterState(dataset, state),
    serializeMultiFilterState(dataset, state),
    serializeRangeFilters(dataset.meta.demoFilterMeta.map((item) => item.column), state.demoFilters),
    serializeRangeFilters(dataset.meta.numericColumns || [], state.numericFilters),
  ].join("||");
  if (cache.careerFilteredRowsKey === key) return cache.careerFilteredRows;
  const filtered = getFilterContextRows(dataset, state, {
    rows,
    ignoreYears: true,
    ignoreTeam: true,
    ignoreSingleFilters: true,
    ignoreMultiFilters: true,
    skipSort: true,
  });
  cache.careerFilteredRowsKey = key;
  cache.careerFilteredRows = filtered;
  return filtered;
}

function getFilterContextRows(dataset, state, options = {}) {
  const searchClauses = parseSearchTerms(state.search);
  const baseRows = options.rows || getDisplayRows(dataset, state);
  const applyYearFilter = !options.ignoreYears && !shouldIgnoreCareerYearFilter(dataset, state);
  const activeYearSet = applyYearFilter ? getEffectiveYearFilterSet(dataset, state) : new Set();
  const selectedTeam = !options.ignoreTeam && state.team !== "all"
    ? getStringValue(state.team)
    : "";
  const selectedTeamKey = selectedTeam ? normalizeKey(selectedTeam) : "";
  const activeSingleFilters = options.ignoreSingleFilters
    ? []
    : (dataset.singleFilters || [])
      .map((filter) => ({ filter, selected: state.extraSelects[filter.id] }))
      .filter(({ filter, selected }) => selected && selected !== "all" && filter.id !== options.ignoreSingleFilterId);
  const activeMultiFilters = options.ignoreMultiFilters
    ? []
    : (dataset.multiFilters || [])
      .map((filter) => ({ filter, selected: state.multiSelects[filter.id] }))
      .filter(({ filter, selected }) => selected && selected.size && filter.id !== options.ignoreMultiFilterId);
  const activeDemoFilters = options.ignoreDemoFilters ? [] : getActiveDemoFilters(dataset, state);
  const activeNumericFilters = options.ignoreNumericFilters ? [] : getActiveNumericFilters(dataset, state);
  const indexedSearchApplied = searchClauses.length && !options.ignoreSearch;
  const filteredSourceRows = indexedSearchApplied
    ? getSearchRows(dataset, searchClauses, baseRows)
    : baseRows;

  const filtered = filteredSourceRows.filter((row) => {
    if (applyYearFilter) {
      if (!activeYearSet.size) return false;
      const yearValue = getStringValue(row[dataset.yearColumn]);
      if (activeYearSet.size && !activeYearSet.has(yearValue)) return false;
    }
    if (selectedTeam) {
      const rowTeam = dataset.id === "grassroots"
        ? getStringValue(row.team_full || row[dataset.teamColumn])
        : getStringValue(row[dataset.teamColumn]);
      if (rowTeam !== selectedTeam) {
        if (state.extraSelects.view_mode !== "career") return false;
        const teamSearch = normalizeKey(row.team_search_text || rowTeam);
        if (!teamSearch || !teamSearch.includes(selectedTeamKey)) return false;
      }
    }

    for (const { filter, selected } of activeSingleFilters) {
      if (filter.id === "conference_bucket" && dataset.id === "d1") {
        const conf = getStringValue(row.conference).toUpperCase();
        if (selected === "hm" && !D1_HM_CONFS.has(conf)) return false;
        if (selected === "hmm" && !D1_HMM_CONFS.has(conf)) return false;
        if (selected === "hm_hmm" && !D1_HM_CONFS.has(conf) && !D1_HMM_CONFS.has(conf)) return false;
        if (selected === "low_major" && (D1_HM_CONFS.has(conf) || D1_HMM_CONFS.has(conf))) return false;
        if (selected.startsWith("conf:") && conf !== selected.slice(5).toUpperCase()) return false;
        continue;
      }
      if (filter.id === "conference" && dataset.id === "team_coach") {
        const conf = getStringValue(row.conference).toUpperCase();
        if (selected === "hm" && !D1_HM_CONFS.has(conf)) return false;
        if (selected === "hmm" && !D1_HMM_CONFS.has(conf)) return false;
        if (selected === "hm_hmm" && !D1_HM_CONFS.has(conf) && !D1_HMM_CONFS.has(conf)) return false;
        if (selected === "low_major" && (D1_HM_CONFS.has(conf) || D1_HMM_CONFS.has(conf))) return false;
        if (selected.startsWith("conf:") && conf !== selected.slice(5).toUpperCase()) return false;
        continue;
      }
      if (dataset.id === "capitanesreference" && filter.id === "latino_pool") {
        const verifiedLatino = capitanesRowHasVerifiedLatinoNationality(row);
        const potentialLatino = getStringValue(row.potential_latino_name).trim() === "Yes";
        if (selected === "latino" && !verifiedLatino) return false;
        if (selected === "latino_potential" && !verifiedLatino && !potentialLatino) return false;
        continue;
      }
      if (dataset.id === "capitanesreference" && filter.id === "exclude_major_europe") {
        if (selected === "yes" && getStringValue(row.major_europe).trim() === "Yes") return false;
        continue;
      }
      if (dataset.id === "capitanesreference" && filter.id === "exclude_major_asia") {
        if (selected === "yes" && getStringValue(row.major_asia).trim() === "Yes") return false;
        continue;
      }
      if (filter.id === "status_path") {
        if (!row._statusFlags?.[selected]) return false;
        continue;
      }
      if (dataset.id === "grassroots" && filter.id === "state") {
        if (!grassrootsStateMatchesSelection(row, selected)) return false;
        continue;
      }
      if (dataset.id === "grassroots" && filter.id === "event_name") {
        if (!grassrootsEventMatchesSelection(row, selected)) return false;
        continue;
      }
      if (dataset.id === "grassroots" && filter.id === "setting") {
        if (normalizeKey(getStringValue(row[filter.column])) !== normalizeKey(selected)) return false;
        continue;
      }
      if (!filter.column) continue;
      if (filter.searchable) {
        if (!searchableSingleFilterMatches(row[filter.column], selected)) return false;
        continue;
      }
      if (getStringValue(row[filter.column]) !== selected) return false;
    }

    for (const { filter, selected } of activeMultiFilters) {
      if (dataset.id === "player_career" && filter.id === "competition_level") {
        const rowLevel = getStringValue(row[filter.column]);
        const matchesLevel = Array.from(selected).some((value) => (
          value === "Professional"
            ? PLAYER_CAREER_PROFESSIONAL_LEVELS.has(rowLevel)
            : rowLevel === value
        ));
        if (!matchesLevel) return false;
        continue;
      }
      if (dataset.id === "player_career" && filter.id === "path_levels") {
        const levels = new Set(splitProfileLevelsValue(row.profile_levels));
        const matchesPath = Array.from(selected).every((value) => levels.has(value));
        if (!matchesPath) return false;
        continue;
      }
      if (filter.id === "circuit" && dataset.id === "grassroots") {
        const matchesCircuit = grassrootsCircuitMatchesSelection(row.circuit || row[filter.column], selected);
        if (!matchesCircuit) return false;
        continue;
      }
      if (filter.id === "pos" || /^(pos|pos_text)$/i.test(getStringValue(filter.column).trim())) {
        const rowPos = row.pos || row.pos_text || row[filter.column];
        const matchesPos = Array.from(selected).some((value) => positionMatchesSelection(rowPos, value));
        if (!matchesPos) return false;
        continue;
      }
      if (filter.renderAsSelect) {
        const rowValues = new Set(splitMultiFilterValue(row[filter.column]));
        const matchesAny = Array.from(selected).some((value) => rowValues.has(value));
        if (!matchesAny) return false;
        continue;
      }
      if (!selected.has(getStringValue(row[filter.column]))) return false;
    }

    if (!options.ignoreSearch && searchClauses.length && !indexedSearchApplied) {
      const haystack = getRowSearchHaystack(dataset, row);
      const matches = searchClauses.some((clause) => matchesSearchPhrase(haystack, clause));
      if (!matches) return false;
    }

    for (const item of activeDemoFilters) {
      if (!matchesDemoFilter(getRowColumnValue(dataset, row, item.column), item.filter, item.type)) return false;
    }

    for (const filter of activeNumericFilters) {
      const rawValue = getRowColumnValue(dataset, row, filter.column);
      const numericValue = typeof rawValue === "number"
        ? normalizeRowNumericFilterValue(filter.column, rawValue)
        : (getStringValue(rawValue).trim() === "" ? Number.NaN : normalizeRowNumericFilterValue(filter.column, rawValue));
      if (!Number.isFinite(numericValue)) return false;
      if (filter.hasMin && numericValue < filter.minValue) return false;
      if (filter.hasMax && numericValue > filter.maxValue) return false;
    }

    return true;
  });

  if (options.skipSort) return filtered;
  return sortRows(filtered, state.sortBy, state.sortDir, dataset, state.sortBlankMode);
}

function getRawFilterContextRows(dataset, state, options = {}) {
  const rawState = state?.extraSelects?.view_mode === "career"
    ? { ...state, extraSelects: { ...state.extraSelects, view_mode: "player" } }
    : state;
  return getFilterContextRows(dataset, rawState, { ...options, rows: options.rows || dataset.rows });
}

function formatYearValueLabel(value) {
  const normalized = normalizeSeasonValue(value);
  if (Number.isFinite(normalized)) return String(Math.round(normalized));
  return getStringValue(value).trim();
}

function formatSelectedYearSummary(values) {
  const normalizedYears = Array.from(new Set((values || [])
    .map((value) => formatYearValueLabel(value))
    .filter((value) => /^\d{4}$/.test(value))
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value))))
    .sort((left, right) => left - right);

  if (!normalizedYears.length) {
    const labels = Array.from(new Set((values || []).map((value) => getStringValue(value).trim()).filter(Boolean))).sort(compareYears);
    return labels.join(" / ");
  }

  const segments = [];
  let rangeStart = normalizedYears[0];
  let previous = normalizedYears[0];
  normalizedYears.slice(1).forEach((year) => {
    if (year === previous + 1) {
      previous = year;
      return;
    }
    segments.push(rangeStart === previous ? String(rangeStart) : `${rangeStart}-${previous}`);
    rangeStart = year;
    previous = year;
  });
  segments.push(rangeStart === previous ? String(rangeStart) : `${rangeStart}-${previous}`);
  return segments.join(", ");
}

function getGrassrootsCareerYearLabel(dataset, state) {
  if (dataset?.id !== "grassroots" || state?.extraSelects?.view_mode !== "career") return "All Years";
  const availableYears = getGrassrootsCareerYears(dataset, state).map((year) => getStringValue(year).trim()).filter(Boolean);
  const selectedYears = Array.from(state?.years || []).map((year) => getStringValue(year).trim()).filter(Boolean);
  if (!selectedYears.length) return "All Years";
  const allSelected = availableYears.length
    && selectedYears.length === availableYears.length
    && selectedYears.every((year) => availableYears.includes(year));
  if (allSelected) return "All Years";
  return formatSelectedYearSummary(selectedYears);
}

function getCareerYearLabel(dataset, state) {
  if (isD1CareerMode(dataset, state)) return "All Years";
  if (dataset?.id === "grassroots" && state?.extraSelects?.view_mode === "career") {
    return getGrassrootsCareerYearLabel(dataset, state);
  }
  const selectedYears = Array.from(state?.years || []).map((year) => getStringValue(year).trim()).filter(Boolean);
  if (!selectedYears.length) return "All Years";
  const availableYears = getAvailableYears(dataset).map((year) => getStringValue(year).trim()).filter(Boolean);
  const allSelected = availableYears.length
    && selectedYears.length === availableYears.length
    && selectedYears.every((year) => availableYears.includes(year));
  if (allSelected) return "All Years";
  return formatSelectedYearSummary(selectedYears);
}

function shouldIgnoreCareerYearFilter(dataset, state) {
  return isD1CareerMode(dataset, state);
}

function parseSearchTerms(value) {
  return getStringValue(value)
    .split(/\s*(?:&&|,|;)\s*/)
    .map((clause) => normalizeSearchPhrase(clause))
    .filter(Boolean);
}

function normalizeSearchPhrase(value) {
  return normalizeKey(value);
}

function getCompactSearchColumns(dataset) {
  const configured = Array.isArray(dataset?.searchColumns) ? dataset.searchColumns : [];
  if (dataset?.id === "team_coach") {
    return Array.from(new Set([
      ...configured,
      "team_name",
      "team_full",
      "team_search_text",
      "coach",
      "coach_search_text",
      "conference",
    ])).filter(Boolean);
  }
  return Array.from(new Set([
    dataset?.playerColumn,
    ...configured.filter((column) => PLAYER_SEARCH_INDEX_COLUMNS.includes(column)),
    ...PLAYER_SEARCH_INDEX_COLUMNS,
  ])).filter(Boolean);
}

function getSearchColumnsForRows(dataset, rows) {
  return getCompactSearchColumns(dataset);
}

function shouldUseLinearSearchScan(dataset, rows) {
  const rowCount = Array.isArray(rows) ? rows.length : 0;
  return dataset?.id === "player_career" && rowCount > SEARCH_INDEX_ROW_LIMIT;
}

function matchesSearchPhrase(haystack, phrase) {
  const normalizedHaystack = normalizeSearchPhrase(haystack);
  const normalizedPhrase = normalizeSearchPhrase(phrase);
  if (!normalizedHaystack || !normalizedPhrase) return false;
  if (` ${normalizedHaystack} `.includes(` ${normalizedPhrase} `)) return true;
  const haystackTokens = normalizedHaystack.split(" ").filter(Boolean);
  const phraseTokens = normalizedPhrase.split(" ").filter(Boolean);
  if (!haystackTokens.length || !phraseTokens.length) return false;
  for (let startIndex = 0; startIndex <= haystackTokens.length - phraseTokens.length; startIndex += 1) {
    let matched = true;
    for (let phraseIndex = 0; phraseIndex < phraseTokens.length; phraseIndex += 1) {
      const haystackToken = haystackTokens[startIndex + phraseIndex];
      const phraseToken = phraseTokens[phraseIndex];
      if (haystackToken !== phraseToken && !haystackToken.startsWith(phraseToken)) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

function normalizeGrassrootsSearchValue(value) {
  return normalizeSearchPhrase(value);
}

function getGrassrootsSearchIndex(dataset) {
  return getSearchIndexForRows(dataset, dataset?.rows);
}

function getGrassrootsSearchIndexForRows(dataset, rows) {
  return getSearchIndexForRows(dataset, rows);
}

function getSearchIndexForRows(dataset, rows) {
  const sourceRows = Array.isArray(rows) ? rows : [];
  const rowsAreDatasetRows = sourceRows === dataset?.rows;
  const cacheOwner = rowsAreDatasetRows ? dataset : sourceRows;
  const columns = getSearchIndexColumns(dataset, sourceRows);
  const fallbackScan = shouldAllowSearchFallbackScan(dataset, sourceRows);
  const cacheKey = `${rowsAreDatasetRows ? Number(dataset?._rowVersion) || 0 : 0}|${sourceRows.length}|${fallbackScan ? 1 : 0}|${columns.join("|")}`;
  if (cacheOwner?._searchIndex?.key === cacheKey) return cacheOwner._searchIndex;

  const exact = new Map();
  const token = new Map();
  const add = (map, key, rowIndex) => {
    if (!key) return;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(rowIndex);
  };
  const addSearchValue = (value, rowIndex) => {
    const raw = getStringValue(value).trim();
    if (!raw) return;
    raw.split(/\s*\/\s*/).forEach((part) => {
      const exactKey = normalizeGrassrootsSearchValue(part);
      if (!exactKey) return;
      add(exact, exactKey, rowIndex);
      exactKey.split(" ").forEach((word) => {
        if (word.length < 2) return;
        for (let length = 2; length <= word.length; length += 1) {
          add(token, word.slice(0, length), rowIndex);
        }
      });
    });
  };

  sourceRows.forEach((row, rowIndex) => {
    columns.forEach((column) => addSearchValue(row?.[column], rowIndex));
  });

  cacheOwner._searchIndex = { key: cacheKey, exact, token, fallbackScan };
  return cacheOwner._searchIndex;
}

function getSearchIndexColumns(dataset, rows) {
  return getSearchColumnsForRows(dataset, rows);
}

function shouldAllowSearchFallbackScan(dataset, rows) {
  const rowCount = Array.isArray(rows) ? rows.length : 0;
  if (!rowCount) return false;
  if (dataset?.id === "player_career" && rowCount > SEARCH_INDEX_ROW_LIMIT) return false;
  return rowCount <= SEARCH_INDEX_ROW_LIMIT;
}

function getGrassrootsRowSearchHaystack(row) {
  if (!row) return "";
  if (!row._grassrootsSearchHaystack) {
    row._grassrootsSearchHaystack = [
      row.player_name,
      row.player_search_text,
      row.player_aliases,
    ].map((value) => normalizeGrassrootsSearchValue(value)).filter(Boolean).join(" ");
  }
  return row._grassrootsSearchHaystack;
}

function getGrassrootsSearchRows(dataset, searchClauses, rows = dataset?.rows) {
  return getSearchRows(dataset, searchClauses, rows);
}

function getSearchRows(dataset, searchClauses, rows = dataset?.rows) {
  const sourceRows = Array.isArray(rows) ? rows : [];
  if (!Array.isArray(searchClauses) || !searchClauses.length) return sourceRows;
  const cacheOwner = sourceRows === dataset?.rows ? dataset : sourceRows;
  const searchColumns = getSearchColumnsForRows(dataset, sourceRows);
  const searchKey = searchColumns.join("|");
  const normalizedClauses = searchClauses.map((clause) => normalizeGrassrootsSearchValue(clause)).filter(Boolean);
  const rowVersion = sourceRows === dataset?.rows ? Number(dataset?._rowVersion) || 0 : 0;
  const scanMode = shouldUseLinearSearchScan(dataset, sourceRows);
  const index = scanMode ? null : getSearchIndexForRows(dataset, sourceRows);
  const cacheKey = scanMode
    ? `scan|${rowVersion}|${sourceRows.length}|${searchKey}|${normalizedClauses.join("||")}`
    : `${index?.key || ""}|${normalizedClauses.join("||")}`;
  const cache = cacheOwner._searchRowsCache || (cacheOwner._searchRowsCache = new Map());
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const matched = [];
  const seen = new Set();

  if (scanMode) {
    sourceRows.forEach((row, rowIndex) => {
      const haystack = getRowSearchHaystack(dataset, row, searchColumns);
      const matches = normalizedClauses.some((phrase) => matchesSearchPhrase(haystack, phrase));
      if (!matches) return;
      seen.add(rowIndex);
      matched.push(row);
    });
    cache.set(cacheKey, matched.slice());
    if (cache.size > 24) {
      const oldest = cache.keys().next().value;
      if (oldest) cache.delete(oldest);
    }
    return matched;
  }

  normalizedClauses.forEach((phrase) => {
    if (!phrase) return;
    if (!index) return;
    const phraseTokens = phrase.split(" ").filter(Boolean);
    let rowIndexes = [];
    if (phraseTokens.length > 1) {
      const indexedPhraseTokens = phraseTokens.filter((token) => token.length >= 2);
      const tokenHits = indexedPhraseTokens
        .map((token) => Array.from(new Set([...(index.token.get(token) || []), ...(index.exact.get(token) || [])])))
        .filter((hits) => hits.length);
      if (indexedPhraseTokens.length && tokenHits.length === indexedPhraseTokens.length) {
        rowIndexes = tokenHits.reduce((current, hits) => current.filter((rowIndex) => hits.includes(rowIndex)));
      }
      if (!rowIndexes.length) rowIndexes = index.exact.get(phrase) || [];
    } else {
      rowIndexes = index.token.get(phrase) || index.exact.get(phrase) || [];
    }
    const candidateIndexes = rowIndexes.length
      ? rowIndexes
      : (index?.fallbackScan ? sourceRows.map((_, rowIndex) => rowIndex) : []);
    candidateIndexes.forEach((rowIndex) => {
      if (seen.has(rowIndex)) return;
      const row = sourceRows[rowIndex];
      if (!row || !matchesSearchPhrase(getRowSearchHaystack(dataset, row, searchColumns), phrase)) return;
      seen.add(rowIndex);
      matched.push(row);
    });
  });

  cache.set(cacheKey, matched.slice());
  if (cache.size > 24) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }

  return matched;
}

function scheduleGrassrootsSearchWarmup(dataset, rows, cacheKey) {
  scheduleSearchWarmup(dataset, rows, cacheKey);
}

function scheduleSearchWarmup(dataset, rows, cacheKey) {
  if (!dataset || !Array.isArray(rows) || !rows.length) return;
  if ((dataset?.id === "player_career" && rows.length > SEARCH_WARMUP_ROW_LIMIT) || rows.length > (SEARCH_INDEX_ROW_LIMIT * 2)) {
    return;
  }
  const warmKey = `${String(cacheKey || "")}|${rows.length}`;
  if (dataset._searchWarmupKey === warmKey) return;
  dataset._searchWarmupKey = warmKey;
  const run = () => {
    try {
      getSearchIndexForRows(dataset, rows);
    } catch (error) {
      console.warn("Search warmup failed.", error);
    }
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    window.setTimeout(run, 600);
  }
}

function getRowSearchHaystack(dataset, row, columns = null) {
  if (!row) return "";
  const resolvedColumns = Array.isArray(columns) && columns.length ? columns : getSearchHaystackColumns(dataset);
  const searchKey = resolvedColumns.join("|");
  if (row._searchCacheKey !== searchKey) {
    row._searchCacheKey = searchKey;
    row._searchHaystack = resolvedColumns
      .map((column) => row?.[column])
      .map((value) => normalizeSearchPhrase(value))
      .filter(Boolean)
      .join(" ");
  }
  return row._searchHaystack || "";
}

function getSearchHaystackColumns(dataset) {
  const configured = Array.isArray(dataset?.searchColumns) ? dataset.searchColumns : [];
  return Array.from(new Set([...configured, ...UNIVERSAL_SEARCH_COLUMNS])).filter(Boolean);
}

function getRenderCache(state) {
  if (!state._renderCache) state._renderCache = {};
  return state._renderCache;
}

function getSortedDisplayRows(dataset, state, rows = getDisplayRows(dataset, state)) {
  const cache = getRenderCache(state);
  const key = [
    cache.displayRowsKey || getDisplayRowsCacheKey(dataset, state),
    getStringValue(state.sortBy),
    getStringValue(state.sortDir),
    getStringValue(state.sortMetric || "value"),
    getStringValue(state.sortBlankMode),
  ].join("||");
  if (cache.sortedDisplayRowsKey === key) return cache.sortedDisplayRows;
  cache.sortedDisplayRowsKey = key;
  cache.sortedDisplayRows = sortRows(rows, state.sortBy, state.sortDir, dataset, state.sortBlankMode, state.sortMetric || "value");
  return cache.sortedDisplayRows;
}

function getDisplayRowsCacheKey(dataset, state) {
  const yearsKey = Array.from(state?.years || []).sort(compareYears).join("|");
  const viewMode = getStringValue(state?.extraSelects?.view_mode || "season");
  const settingKey = dataset?.id === "grassroots" ? getStringValue(state?.extraSelects?.setting || "all") : "";
  const internationalScopeKey = dataset?.id === "international" ? getStringValue(state?.extraSelects?.season_scope || "all") : "";
  const scopeKey = dataset?.id === "grassroots" ? getGrassrootsDisplayScope(dataset, state) : "";
  const scopeRows = scopeKey ? dataset?._grassrootsScopeRows?.get(scopeKey) : null;
  const rowCount = Array.isArray(dataset?.rows) ? dataset.rows.length : 0;
  const rowVersion = Number(dataset?._rowVersion) || 0;
  if (scopeKey) {
    return [
      "scope",
      scopeKey,
      Array.isArray(scopeRows) ? scopeRows.length : 0,
      rowVersion,
      getStringValue(state?.team),
      serializeSingleFilterState(dataset, state),
      serializeMultiFilterState(dataset, state),
    ].join("|");
  }
  if (isGrassrootsSingleYearSetting(dataset, state)) {
    return [
      "single_year",
      settingKey,
      yearsKey,
      rowCount,
      rowVersion,
      getStringValue(state?.team),
      serializeSingleFilterState(dataset, state),
      serializeMultiFilterState(dataset, state),
    ].join("|");
  }
  if (isInternationalSingleSeasonSetting(dataset, state)) {
    return [
      "international_single_season",
      internationalScopeKey,
      yearsKey,
      rowCount,
      rowVersion,
      getStringValue(state?.team),
      serializeSingleFilterState(dataset, state),
      serializeMultiFilterState(dataset, state),
    ].join("|");
  }
  if (viewMode !== "career") return `${viewMode}|${settingKey}|${internationalScopeKey}|${yearsKey}|${rowCount}|${rowVersion}`;
  return [
    viewMode,
    settingKey,
    internationalScopeKey,
    yearsKey,
    getGrassrootsSearchYearFilterKey(dataset, state),
    rowCount,
    rowVersion,
    getStringValue(state?.team),
    serializeSingleFilterState(dataset, state),
    serializeMultiFilterState(dataset, state),
  ].join("|");
}

function serializeSingleFilterState(dataset, state) {
  return (dataset.singleFilters || [])
    .map((filter) => `${filter.id}:${getStringValue(state.extraSelects?.[filter.id])}`)
    .join("|");
}

function serializeMultiFilterState(dataset, state) {
  return (dataset.multiFilters || [])
    .map((filter) => {
      const selected = Array.from(state.multiSelects?.[filter.id] || []).sort();
      return `${filter.id}:${selected.join(",")}`;
    })
    .join("|");
}

function serializeRangeFilters(columns, filters) {
  return columns
    .map((column) => {
      const filter = filters?.[column];
      return filter ? `${column}:${getStringValue(filter.min)}:${getStringValue(filter.max)}` : `${column}::`;
    })
    .join("|");
}

function isGrassrootsSingleYearSetting(dataset, state) {
  return dataset?.id === "grassroots" && normalizeKey(state?.extraSelects?.setting) === "single year";
}

function isInternationalSingleSeasonSetting(dataset, state) {
  if (dataset?.id !== "international") return false;
  const selected = normalizeKey(state?.extraSelects?.season_scope);
  return ["single season", "single season combined", "single_season", "single_season_combined"].includes(selected);
}

function getActiveDemoFilters(dataset, state) {
  const cache = getRenderCache(state);
  const key = serializeRangeFilters(dataset.meta.demoFilterMeta.map((item) => item.column), state.demoFilters);
  if (cache.activeDemoFiltersKey === key) return cache.activeDemoFilters;
  cache.activeDemoFiltersKey = key;
  cache.activeDemoFilters = dataset.meta.demoFilterMeta
    .map((item) => {
      const filter = state.demoFilters?.[item.column];
      return hasActiveRangeFilter(filter) ? { column: item.column, type: item.type, filter } : null;
    })
    .filter(Boolean);
  return cache.activeDemoFilters;
}

function getActiveNumericFilters(dataset, state) {
  const cache = getRenderCache(state);
  const key = serializeRangeFilters(dataset.meta.numericColumns || [], state.numericFilters);
  if (cache.activeNumericFiltersKey === key) return cache.activeNumericFilters;
  cache.activeNumericFiltersKey = key;
  const demoRangeColumns = new Set(dataset?.meta?.demoFilterColumns || []);
  cache.activeNumericFilters = Object.entries(state.numericFilters || {})
    .filter(([column]) => !demoRangeColumns.has(column))
    .map(([column, filter]) => {
      if (!hasActiveRangeFilter(filter)) return null;
      const minValue = inputHasValue(filter?.min) ? normalizeNumericFilterInput(column, filter.min) : Number.NaN;
      const maxValue = inputHasValue(filter?.max) ? normalizeNumericFilterInput(column, filter.max) : Number.NaN;
      return {
        column,
        hasMin: Number.isFinite(minValue),
        hasMax: Number.isFinite(maxValue),
        minValue,
        maxValue,
      };
    })
    .filter(Boolean);
  return cache.activeNumericFilters;
}

function normalizeNumericFilterInput(column, value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return Number.NaN;
  const baseColumn = stripCompanionPrefix(column);
  if (/_freq$/i.test(baseColumn) && Math.abs(numeric) <= 1.5) return numeric * 100;
  if (!/_freq$/i.test(baseColumn) && !isPercentRatioColumn(column) && isShootingPercentageColumn(column) && Math.abs(numeric) <= 1.5) {
    return numeric * 100;
  }
  return numeric;
}

function normalizeRowNumericFilterValue(column, value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return Number.NaN;
  const baseColumn = stripCompanionPrefix(column);
  if (/_freq$/i.test(baseColumn) && Math.abs(numeric) <= 1.5) {
    return numeric * 100;
  }
  if (isShootingPercentageColumn(column) && Math.abs(numeric) <= 1.5) {
    return numeric * 100;
  }
  return numeric;
}

function getRelativeDisplayMode(state) {
  const rawMode = getStringValue(state?.extraSelects?.percentile_mode || "off");
  const mode = rawMode === "year" ? "year_pctile" : (rawMode === "all_time" ? "all_time_pctile" : rawMode);
  const parsed = {
    year_pctile: { scope: "year", metric: "pctile", value: mode },
    all_time_pctile: { scope: "all_time", metric: "pctile", value: mode },
    year_rank: { scope: "year", metric: "rank", value: mode },
    all_time_rank: { scope: "all_time", metric: "rank", value: mode },
  }[mode];
  return parsed || null;
}

function isRelativeDisplayColumn(column) {
  return /__(?:pctile|rank)_(?:year|all_time)$/i.test(getStringValue(column));
}

function getRelativeDisplayBaseColumn(column) {
  return getStringValue(column).replace(/__(?:pctile|rank)_(?:year|all_time)$/i, "");
}

function getRelativeDisplayMetric(column) {
  const match = getStringValue(column).match(/__(pctile|rank)_(year|all_time)$/i);
  return match ? { metric: match[1].toLowerCase(), scope: match[2].toLowerCase() } : null;
}

function makeRelativeDisplayColumn(column, mode) {
  return `${column}__${mode.metric}_${mode.scope}`;
}

function shouldAddRelativeDisplayColumn(dataset, column) {
  return shouldColorColumn(dataset, column);
}

function expandVisibleColumnsForPercentiles(dataset, state, columns) {
  const mode = getRelativeDisplayMode(state);
  if (!mode) return columns;
  const expanded = [];
  columns.forEach((column) => {
    expanded.push(column);
    if (shouldAddRelativeDisplayColumn(dataset, column)) {
      expanded.push(makeRelativeDisplayColumn(column, mode));
    }
  });
  return expanded;
}

function getVisibleColumns(dataset, state) {
  const cache = getRenderCache(state);
  const key = [
    dataset.meta.allColumns.map((column) => (state.visibleColumns[column] ? column : "")).join("|"),
    getRelativeDisplayMode(state)?.value || "",
  ].join("||pct:");
  if (cache.visibleColumnsKey === key) return cache.visibleColumns;
  const baseVisibleColumns = dataset.meta.allColumns.filter((column) => state.visibleColumns[column]);
  const visibleColumns = expandVisibleColumnsForPercentiles(dataset, state, baseVisibleColumns);
  cache.visibleColumnsKey = key;
  cache.visibleColumns = visibleColumns;
  return visibleColumns;
}

function getDisplayRows(dataset, state) {
  const cache = getRenderCache(state);
  const key = getDisplayRowsCacheKey(dataset, state);
  if (cache.displayRowsKey === key) return cache.displayRows;
  let rows = dataset.rows;
  if (dataset?.id === "grassroots") {
    const scope = getGrassrootsDisplayScope(dataset, state);
    if (scope) {
      rows = getGrassrootsActiveScopeRows(dataset, state);
    } else if (state?.extraSelects?.view_mode === "career") {
      rows = buildCareerRows(dataset, state);
    } else if (isGrassrootsSingleYearSetting(dataset, state)) {
      rows = buildGrassrootsSingleYearRows(dataset, state);
    }
  } else if (isInternationalSingleSeasonSetting(dataset, state)) {
    rows = buildInternationalSingleSeasonRows(dataset, state);
  } else if (isD1CareerMode(dataset, state)) {
    rows = getD1CareerBundleRows(dataset);
  } else if (state.extraSelects.view_mode === "career") {
    rows = buildCareerRows(dataset, state);
  }
  cache.displayRowsKey = key;
  cache.displayRows = rows;
  return rows;
}

function getCareerRowsCacheKey(dataset, state) {
  const yearsKey = Array.from(state?.years || []).sort(compareYears).join("|");
  const viewMode = getStringValue(state?.extraSelects?.view_mode || "season");
  const settingKey = dataset?.id === "grassroots" ? getStringValue(state?.extraSelects?.setting || "all") : "";
  const internationalScopeKey = dataset?.id === "international" ? getStringValue(state?.extraSelects?.season_scope || "all") : "";
  const rowCount = Array.isArray(dataset?.rows) ? dataset.rows.length : 0;
  const rowVersion = Number(dataset?._rowVersion) || 0;
  return [
    viewMode,
    settingKey,
    internationalScopeKey,
    yearsKey,
    rowCount,
    rowVersion,
    getStringValue(state?.team),
    serializeSingleFilterState(dataset, state),
    serializeMultiFilterState(dataset, state),
  ].join("|");
}

function buildCareerRows(dataset, state) {
  const cacheKey = getCareerRowsCacheKey(dataset, state);
  if (state._careerCache?.key === cacheKey) {
    scheduleSearchWarmup(dataset, state._careerCache.rows, cacheKey);
    return state._careerCache.rows;
  }

  let scopedRows = getRawFilterContextRows(dataset, state, {
    skipSort: true,
    ignoreSearch: true,
    ignoreDemoFilters: true,
    ignoreNumericFilters: true,
    ignoreYears: shouldIgnoreCareerYearFilter(dataset, state),
  });
  if (dataset.id === "grassroots") {
    scopedRows = dedupeGrassrootsLikelyDuplicateStatRows(dataset, scopedRows);
  }
  const grouped = new Map();
  scopedRows.forEach((row) => {
    const key = getCareerGroupKey(dataset, row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  const mergedGroups = mergeCareerRowGroups(dataset, Array.from(grouped.values()));
  let careerRows = mergedGroups.map((rows) => (rows.length <= 1 ? rows[0] : aggregateCareerRows(dataset, rows)));
  if (dataset.id === "grassroots") {
    careerRows = dedupeGrassrootsLikelyDuplicateStatRows(dataset, careerRows);
  }
  applyCalculatedRatings(careerRows, dataset.id);
  applyPerNormalization(careerRows, dataset.id);
  const referenceRows = dataset.id === "grassroots" && !shouldIgnoreCareerYearFilter(dataset, state)
    ? careerRows
    : getStaticCareerColorRows(dataset);
  populateDefenseRatePercentiles(careerRows, dataset.id, { referenceRows });
  state._careerCache = { key: cacheKey, rows: careerRows };
  scheduleSearchWarmup(dataset, careerRows, cacheKey);
  return careerRows;
}

function buildGrassrootsSingleYearRows(dataset, state) {
  const cacheKey = `${getCareerRowsCacheKey(dataset, state)}|single_year`;
  if (state._grassrootsSingleYearCache?.key === cacheKey) {
    scheduleSearchWarmup(dataset, state._grassrootsSingleYearCache.rows, cacheKey);
    return state._grassrootsSingleYearCache.rows;
  }

  const scopedRows = dedupeGrassrootsLikelyDuplicateStatRows(dataset, getRawFilterContextRows(dataset, state, {
    skipSort: true,
    ignoreSearch: true,
    ignoreDemoFilters: true,
    ignoreNumericFilters: true,
    ignoreSingleFilterId: "setting",
  }));
  const groupedBySeason = new Map();
  scopedRows.forEach((row, index) => {
    const season = getStringValue(row?.[dataset.yearColumn]).trim();
    const seasonKey = season || "__unknown_year";
    if (!groupedBySeason.has(seasonKey)) groupedBySeason.set(seasonKey, new Map());
    const grouped = groupedBySeason.get(seasonKey);
    const key = getCareerGroupKey(dataset, row) || `row_${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  const mergedGroups = [];
  groupedBySeason.forEach((grouped) => {
    mergedGroups.push(...mergeCareerRowGroups(dataset, Array.from(grouped.values())));
  });
  const rows = dedupeGrassrootsLikelyDuplicateStatRows(dataset, mergedGroups
    .map((groupRows) => {
      const aggregate = aggregateCareerRows(dataset, groupRows);
      aggregate.setting = "Single Year";
      aggregate._grassrootsSingleYearAggregate = true;
      return aggregate;
    }));
  applyCalculatedRatings(rows, dataset.id);
  applyPerNormalization(rows, dataset.id);
  populateDefenseRatePercentiles(rows, dataset.id, { referenceRows: rows });
  state._grassrootsSingleYearCache = { key: cacheKey, rows };
  scheduleSearchWarmup(dataset, rows, cacheKey);
  return rows;
}

function buildInternationalSingleSeasonRows(dataset, state) {
  const cacheKey = `${getCareerRowsCacheKey(dataset, state)}|international_single_season`;
  if (state._internationalSingleSeasonCache?.key === cacheKey) {
    scheduleSearchWarmup(dataset, state._internationalSingleSeasonCache.rows, cacheKey);
    return state._internationalSingleSeasonCache.rows;
  }

  const scopedRows = getRawFilterContextRows(dataset, state, {
    skipSort: true,
    ignoreSearch: true,
    ignoreDemoFilters: true,
    ignoreNumericFilters: true,
    ignoreSingleFilterId: "season_scope",
  });
  const groupedBySeason = new Map();
  scopedRows.forEach((row, index) => {
    const season = getStringValue(row?.[dataset.yearColumn]).trim();
    const seasonKey = season || "__unknown_year";
    if (!groupedBySeason.has(seasonKey)) groupedBySeason.set(seasonKey, new Map());
    const grouped = groupedBySeason.get(seasonKey);
    const key = getCareerGroupKey(dataset, row) || `row_${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  const rows = [];
  groupedBySeason.forEach((grouped, seasonKey) => {
    grouped.forEach((groupRows) => {
      const aggregate = groupRows.length > 1 ? aggregateCareerRows(dataset, groupRows) : { ...groupRows[0] };
      decorateInternationalSingleSeasonAggregate(aggregate, groupRows, seasonKey);
      rows.push(enhanceRowForDataset(aggregate, dataset.id));
    });
  });
  applyCalculatedRatings(rows, dataset.id);
  applyPerNormalization(rows, dataset.id);
  populateDefenseRatePercentiles(rows, dataset.id, { referenceRows: rows });
  state._internationalSingleSeasonCache = { key: cacheKey, rows };
  scheduleSearchWarmup(dataset, rows, cacheKey);
  return rows;
}

function decorateInternationalSingleSeasonAggregate(aggregate, rows, seasonKey) {
  const leagues = sortGrassrootsDisplayValues(new Set(rows.map((row) => row.league_name || row.competition_label || row.league).filter(Boolean)), []);
  const teams = sortGrassrootsDisplayValues(new Set(rows.map((row) => row.team_abbrev || row.team_name || row.team_code || row.team_alias).filter(Boolean)), []);
  const countries = splitInternationalCountries(rows.map((row) => row.nationality_list || row.nationality).join(" / "));
  if (seasonKey && seasonKey !== "__unknown_year") aggregate.season = seasonKey;
  if (leagues.length) {
    aggregate.league_name = leagues.join(" / ");
    aggregate.league = leagues.join(" / ");
    aggregate.competition_label = leagues.join(" / ");
  }
  if (teams.length) {
    aggregate.team_abbrev = teams.join(" / ");
    aggregate.team_name = teams.join(" / ");
    aggregate.team_search_text = teams.join(" / ");
  }
  if (countries.length) {
    aggregate.nationality = countries.join(" / ");
    aggregate.nationality_list = countries.join(" / ");
    aggregate.nationality_regions = Array.from(new Set(countries.map(getInternationalCountryRegion).filter(Boolean))).join(" / ");
  }
  aggregate._internationalSingleSeasonAggregate = true;
  aggregate._careerAggregate = true;
  aggregate.rank = null;
  aggregate._searchCacheKey = "";
  aggregate._searchHaystack = "";
  aggregate._colorBucketCacheKey = "";
  aggregate._colorBucketValue = "";
}

function getStaticCareerColorRows(dataset) {
  if (!dataset) return [];
  const cacheKey = `${Number(dataset?._rowVersion) || 0}|${Array.isArray(dataset?.rows) ? dataset.rows.length : 0}`;
  if (dataset._staticCareerColorRowsKey === cacheKey) return dataset._staticCareerColorRows || [];
  const grouped = new Map();
  (dataset.rows || []).forEach((row) => {
    const key = getCareerGroupKey(dataset, row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  const mergedGroups = mergeCareerRowGroups(dataset, Array.from(grouped.values()));
  let rows = mergedGroups.map((groupRows) => (groupRows.length <= 1 ? groupRows[0] : aggregateCareerRows(dataset, groupRows)));
  if (dataset.id === "grassroots") {
    rows = dedupeGrassrootsLikelyDuplicateStatRows(dataset, rows);
  }
  applyCalculatedRatings(rows, dataset.id);
  applyPerNormalization(rows, dataset.id);
  populateDefenseRatePercentiles(rows, dataset.id, { referenceRows: rows });
  dataset._staticCareerColorRowsKey = cacheKey;
  dataset._staticCareerColorRows = rows;
  return rows;
}

function getCareerGroupKey(dataset, row) {
  if (dataset.id === "team_coach") {
    const coach = normalizeNameKey(row?.coach_search_text || row?.coach);
    if (coach) return `${dataset.id}|coach|${coach}`;
    return `${dataset.id}|team|${normalizeKey(row?.team_name || row?.team_full)}|${normalizeKey(row?.conference)}`;
  }
  const explicitId = getExplicitIdentityId(row);
  if (explicitId) return `${dataset.id}|id|${explicitId}`;
  if (dataset.id === "grassroots") {
    const grassrootsKey = getGrassrootsCareerAliasKey(row);
    if (grassrootsKey) return `${dataset.id}|grassroots|${grassrootsKey}`;
  }
  const player = normalizeKey(row.player_name || row.player);
  const dob = getStringValue(row.dob).trim();
  const height = firstFinite(row.height_in, row.inches, "");
  const rookie = Number.isFinite(row.rookie_year) ? row.rookie_year : "";
  const draftPick = Number.isFinite(row.draft_pick) && !row._draftPickBlank ? row.draft_pick : "";
  const era = Math.floor(extractLeadingYear(row.season) / 8);
  if (dob) return `${dataset.id}|dob|${player}|${dob}|${height}|${rookie}|${draftPick}`;
  if (rookie !== "" || draftPick !== "") return `${dataset.id}|rookie|${player}|${rookie}|${draftPick}|${height}`;
  if (draftPick !== "") return `${dataset.id}|draft|${player}|${draftPick}|${height}`;
  return `${dataset.id}|era|${player}|${height}|${era}`;
}

function getGrassrootsCareerAliasKey(rowsOrRow) {
  const rows = Array.isArray(rowsOrRow) ? rowsOrRow : [rowsOrRow];
  if (!rows.length) return "";
  const sample = rows
    .slice()
    .sort((left, right) => grassrootsAliasRowScore(right) - grassrootsAliasRowScore(left))[0] || {};
  const nameYearKey = getGrassrootsCareerNameYearKey(sample);
  if (nameYearKey) return nameYearKey;
  return buildGrassrootsCareerKey(sample);
}

function getGrassrootsCareerBucketKey(rowsOrRow) {
  const rows = Array.isArray(rowsOrRow) ? rowsOrRow : [rowsOrRow];
  if (!rows.length) return "";
  const explicitId = Array.from(new Set(rows.map((row) => getExplicitIdentityId(row)).filter(Boolean)))[0] || "";
  if (explicitId) return `id|${explicitId}`;
  const preferredName = normalizeNameKey(getPreferredStatusName(rows));
  if (preferredName) return `name|${preferredName}`;
  const aliasKey = getGrassrootsCareerAliasKey(rows);
  return aliasKey ? `alias|${aliasKey}` : "";
}

function getGrassrootsCareerNameYearKey(row) {
  const playerName = normalizeKey(row?.player_name || row?.player);
  const classYear = getGrassrootsCareerClassYearKey(row?.class_year);
  if (!playerName && !classYear) return "";
  return [playerName, classYear].map((value) => String(value ?? "").trim()).join("|");
}

function buildGrassrootsCareerKey(row) {
  const playerName = normalizeNameKey(row.player_name || row.player);
  const classYearText = getStringValue(row.class_year).trim();
  const classYearNumeric = classYearText ? Number(classYearText) : Number.NaN;
  const classYear = Number.isFinite(classYearNumeric) && classYearNumeric >= 1000 ? Math.round(classYearNumeric) : "";
  const heightValue = firstPositiveFinite(row.height_in, row.inches, Number.NaN);
  const heightKey = Number.isFinite(heightValue) ? Math.round(heightValue / 2) * 2 : "";
  const weightValue = firstPositiveFinite(row.weight_lb, row.weight, Number.NaN);
  const weightKey = Number.isFinite(weightValue) ? Math.round(weightValue / 5) * 5 : "";
  const posKey = normalizePosLabel(row.pos || row.pos_text);
  return [playerName, classYear, heightKey, weightKey, normalizeKey(posKey)].map((value) => String(value ?? "").trim()).join("|");
}

// Collapse career bundles to one row per displayed player name + class year.
function dedupeGrassrootsCareerScopeRows(dataset, rows) {
  if (!dataset || dataset.id !== "grassroots" || !Array.isArray(rows) || rows.length <= 1) return rows;

  const grouped = new Map();
  rows.forEach((row, index) => {
    const key = getCareerGroupKey(dataset, row) || `__grassroots_row_${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  const careerRows = mergeCareerRowGroups(dataset, Array.from(grouped.values()))
    .map((groupRows) => (groupRows.length > 1 ? aggregateCareerRows(dataset, groupRows) : groupRows[0]));
  return dedupeGrassrootsLikelyDuplicateStatRows(dataset, careerRows);
}

const GRASSROOTS_DUPLICATE_STAT_COLUMNS = [
  "gp",
  "min",
  "mpg",
  "pts",
  "trb",
  "ast",
  "tov",
  "stl",
  "blk",
  "pf",
  "stocks",
  "fgm",
  "fga",
  "2pm",
  "2pa",
  "tpm",
  "tpa",
  "ftm",
  "pts_pg",
  "trb_pg",
  "ast_pg",
  "stl_pg",
  "blk_pg",
  "fg_pct",
  "2p_pct",
  "tp_pct",
  "ftm_fga",
  "three_pr",
];

function dedupeGrassrootsLikelyDuplicateStatRows(dataset, rows) {
  if (!dataset || dataset.id !== "grassroots" || !Array.isArray(rows) || rows.length <= 1) return rows;

  const output = [];
  const buckets = new Map();
  rows.forEach((row) => {
    const key = buildGrassrootsDuplicateStatKey(row);
    if (!key) {
      output.push(row);
      return;
    }
    const bucket = buckets.get(key) || [];
    let cluster = bucket.find((candidate) => candidate.rows.some((existing) => areGrassrootsLikelyDuplicateNames(existing, row)));
    if (!cluster) {
      cluster = { rows: [], outputIndex: output.length };
      bucket.push(cluster);
      buckets.set(key, bucket);
      output.push(cluster);
    }
    cluster.rows.push(row);
  });

  return output.map((item) => {
    if (!item || !Array.isArray(item.rows)) return item;
    return item.rows.length > 1 ? mergeGrassrootsLikelyDuplicateStatRows(item.rows) : item.rows[0];
  });
}

function buildGrassrootsDuplicateStatKey(row) {
  const season = normalizeGrassrootsDuplicateContext(row?.season || row?.Year || "");
  const gp = normalizeGrassrootsDuplicateNumber(getGamesValue(row), 1);
  const minutes = normalizeGrassrootsDuplicateNumber(getMinutesValue(row), 1);
  if (!season || !gp || !minutes || Number(gp) <= 0 || Number(minutes) <= 0) return "";
  const statSignature = buildGrassrootsDuplicateStatSignature(row);
  if (!statSignature) return "";
  const team = normalizeGrassrootsDuplicateContext(row?.team_full || row?.team_aliases || row?.team_name || row?.team || "");
  const event = normalizeGrassrootsDuplicateContext(row?.event_group || row?.event_name || row?.event_raw_name || "");
  const circuit = normalizeGrassrootsDuplicateContext(row?.circuit || "");
  const setting = normalizeGrassrootsDuplicateContext(row?.setting || getGrassrootsSettingForCircuit(row?.circuit || ""));
  const classYear = getGrassrootsCareerClassYearKey(row?.class_year);
  return [season, setting, circuit, team, event, classYear, gp, minutes, statSignature].join("||");
}

function buildGrassrootsDuplicateStatSignature(row) {
  let filled = 0;
  const parts = GRASSROOTS_DUPLICATE_STAT_COLUMNS.map((column) => {
    const value = normalizeGrassrootsDuplicateNumber(row?.[column], isIntegerCountColumn(column) ? 1 : 3);
    if (value) filled += 1;
    return `${column}:${value}`;
  });
  return filled >= 4 ? parts.join("|") : "";
}

function normalizeGrassrootsDuplicateNumber(value, digits = 3) {
  const numeric = typeof value === "number" ? value : Number(getStringValue(value).trim());
  if (!Number.isFinite(numeric)) return "";
  return String(roundNumber(numeric, digits));
}

function normalizeGrassrootsDuplicateContext(value) {
  const parts = getStringValue(value)
    .split(/\s*(?:\/|\||;)\s*/)
    .map((part) => normalizeKey(part))
    .filter(Boolean)
    .sort();
  return Array.from(new Set(parts)).join("/");
}

function areGrassrootsLikelyDuplicateNames(left, right) {
  const leftIds = new Set([getExplicitIdentityId(left)].filter(Boolean));
  const rightIds = new Set([getExplicitIdentityId(right)].filter(Boolean));
  if (leftIds.size && rightIds.size && !Array.from(leftIds).some((id) => rightIds.has(id))) return false;
  if (leftIds.size && rightIds.size) return true;

  const leftNames = getGrassrootsDuplicateNameKeys(left);
  const rightNames = getGrassrootsDuplicateNameKeys(right);
  return leftNames.some((leftName) => rightNames.some((rightName) => areGrassrootsNamesSimilar(leftName, rightName)));
}

function getGrassrootsDuplicateNameKeys(row) {
  const values = [
    row?.player_name,
    row?.player,
    row?.player_aliases,
    row?.player_search_text,
  ];
  const names = new Set();
  values.forEach((value) => {
    getStringValue(value)
      .split(/\s*(?:\/|\||;)\s*/)
      .map((part) => normalizeNameKey(part))
      .filter(Boolean)
      .forEach((name) => names.add(name));
  });
  return Array.from(names);
}

function areGrassrootsNamesSimilar(left, right) {
  if (!left || !right) return false;
  if (left === right) return true;
  const leftTokens = left.split(" ").filter(Boolean);
  const rightTokens = right.split(" ").filter(Boolean);
  if (!leftTokens.length || !rightTokens.length) return false;
  const leftFirst = leftTokens[0];
  const rightFirst = rightTokens[0];
  const leftLast = leftTokens[leftTokens.length - 1];
  const rightLast = rightTokens[rightTokens.length - 1];
  if (!leftFirst || !rightFirst || !leftLast || !rightLast) return false;
  if (leftLast === rightLast && leftFirst[0] === rightFirst[0]) return true;
  if (leftFirst === rightFirst && boundedEditDistance(leftLast, rightLast, 2) <= 2) return true;
  if (leftLast === rightLast && boundedEditDistance(leftFirst, rightFirst, 2) <= 2) return true;
  return false;
}

function boundedEditDistance(left, right, maxDistance) {
  if (left === right) return 0;
  if (!left || !right) return Math.max(left.length, right.length);
  if (Math.abs(left.length - right.length) > maxDistance) return maxDistance + 1;
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    let rowMin = current[0];
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      const value = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      );
      current[j] = value;
      rowMin = Math.min(rowMin, value);
    }
    if (rowMin > maxDistance) return maxDistance + 1;
    for (let j = 0; j < current.length; j += 1) previous[j] = current[j];
  }
  return previous[right.length];
}

function mergeGrassrootsLikelyDuplicateStatRows(rows) {
  const preferred = rows
    .slice()
    .sort((left, right) => grassrootsDuplicatePreferredRowScore(right) - grassrootsDuplicatePreferredRowScore(left))[0] || rows[0] || {};
  const out = { ...preferred };
  const preferredName = getPreferredStatusName(rows) || getStringValue(preferred.player_name || preferred.player).trim();
  const nameValues = new Set();
  rows.forEach((row) => {
    getGrassrootsDuplicateDisplayNames(row).forEach((name) => nameValues.add(name));
  });
  if (preferredName) {
    out.player_name = preferredName;
    out.player = preferredName;
    nameValues.add(preferredName);
  }
  const aliases = Array.from(nameValues).filter(Boolean).join(" / ");
  if (aliases) {
    out.player_aliases = aliases;
    out.player_search_text = aliases;
  }
  out._searchCacheKey = "";
  out._searchHaystack = "";
  out._colorBucketCacheKey = "";
  out._colorBucketValue = "";
  out._grassrootsDuplicateCollapsed = rows.length;
  return out;
}

function getGrassrootsDuplicateDisplayNames(row) {
  const names = new Set();
  [row?.player_name, row?.player, row?.player_aliases].forEach((value) => {
    getStringValue(value)
      .split(/\s*(?:\/|\||;)\s*/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((name) => names.add(name));
  });
  return Array.from(names);
}

function grassrootsDuplicatePreferredRowScore(row) {
  let score = duplicateRowScore(row);
  if (getStringValue(row?.player_name || row?.player).trim()) score += 1000;
  if (getStringValue(row?.player_aliases).trim()) score += 25;
  if (getStringValue(row?.event_url).trim()) score += 10;
  return score;
}

function buildGrassrootsCareerClusterMeta(rowsOrRow) {
  const rows = Array.isArray(rowsOrRow) ? rowsOrRow.slice() : [rowsOrRow];
  const representative = rows
    .slice()
    .sort((left, right) => grassrootsAliasRowScore(right) - grassrootsAliasRowScore(left))[0] || {};
  const explicitIds = new Set();
  const teamTokens = new Set();
  rows.forEach((row) => {
    const explicitId = getExplicitIdentityId(row);
    if (explicitId) explicitIds.add(explicitId);
    getGrassrootsCareerTeamTokens(row).forEach((value) => teamTokens.add(value));
  });
  return {
    rows,
    representative,
    explicitIds,
    teamTokens,
  };
}

function mergeGrassrootsCareerClusterMeta(target, source) {
  if (!target || !source) return target;
  target.rows.push(...source.rows);
  if (grassrootsAliasRowScore(source.representative) > grassrootsAliasRowScore(target.representative)) {
    target.representative = source.representative;
  }
  source.explicitIds.forEach((value) => target.explicitIds.add(value));
  source.teamTokens.forEach((value) => target.teamTokens.add(value));
  return target;
}

function canMergeGrassrootsCareerClusters(left, right) {
  if (!left || !right) return false;
  const leftIds = Array.from(left.explicitIds || []).filter(Boolean);
  const rightIds = Array.from(right.explicitIds || []).filter(Boolean);
  if (leftIds.length && rightIds.length && !leftIds.some((value) => rightIds.includes(value))) return false;

  const leftRow = left.representative || left.rows?.[0] || {};
  const rightRow = right.representative || right.rows?.[0] || {};
  const leftFamily = getGrassrootsPosFamily(leftRow);
  const rightFamily = getGrassrootsPosFamily(rightRow);
  const teamOverlap = hasGrassrootsCareerTokenOverlap(left.teamTokens, right.teamTokens);
  if (!areGrassrootsPosFamiliesCompatible(leftFamily, rightFamily, teamOverlap)) return false;

  const leftHeight = getGrassrootsCareerInches(leftRow);
  const rightHeight = getGrassrootsCareerInches(rightRow);
  const leftWeight = getGrassrootsCareerWeight(leftRow);
  const rightWeight = getGrassrootsCareerWeight(rightRow);
  const hasHeightPair = Number.isFinite(leftHeight) && Number.isFinite(rightHeight);
  const hasWeightPair = Number.isFinite(leftWeight) && Number.isFinite(rightWeight);

  if (teamOverlap) {
    if (hasHeightPair && Math.abs(leftHeight - rightHeight) > 3) return false;
    if (hasWeightPair && Math.abs(leftWeight - rightWeight) > 40) return false;
    return true;
  }

  if (!hasHeightPair) return false;
  if (Math.abs(leftHeight - rightHeight) > 3) return false;
  if (hasWeightPair && Math.abs(leftWeight - rightWeight) > 30) return false;
  return true;
}

function areGrassrootsPosFamiliesCompatible(leftFamily, rightFamily, teamOverlap) {
  if (!leftFamily || !rightFamily || leftFamily === rightFamily) return true;
  if (leftFamily === "C" || rightFamily === "C") return false;
  return true;
}

function getGrassrootsCareerClassYearKey(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  const numeric = Number(text);
  if (Number.isFinite(numeric) && numeric >= 1000) return String(Math.round(numeric));
  return normalizeKey(text);
}

function getGrassrootsCareerInches(row) {
  const value = firstFinite(row?.height_in, row?.inches, Number.NaN);
  return Number.isFinite(value) && value > 0 ? value : Number.NaN;
}

function getGrassrootsCareerWeight(row) {
  const value = firstFinite(row?.weight_lb, row?.weight, Number.NaN);
  return Number.isFinite(value) && value > 0 ? value : Number.NaN;
}

function normalizePhysicalMeasurementField(row, field) {
  if (!row || !field) return;
  const rawValue = row[field];
  if (/^(height_in|inches)$/i.test(field) && typeof rawValue === "string") {
    const parsedHeight = parseHeightToInches(rawValue);
    if (Number.isFinite(parsedHeight) && parsedHeight > 0) {
      row[field] = parsedHeight;
      return;
    }
  }
  const numeric = typeof rawValue === "number"
    ? rawValue
    : (getStringValue(rawValue).trim() === "" ? Number.NaN : Number(rawValue));
  if (Number.isFinite(numeric) && numeric > 0) {
    row[field] = numeric;
    return;
  }
  delete row[field];
}

function normalizePhysicalMeasurements(row) {
  normalizePhysicalMeasurementField(row, "height_in");
  normalizePhysicalMeasurementField(row, "inches");
  normalizePhysicalMeasurementField(row, "weight_lb");
  normalizePhysicalMeasurementField(row, "weight");
  normalizePhysicalMeasurementField(row, "wingspan");
}

function buildGrassrootsAttributeProfileKeys(row) {
  const explicitId = getExplicitIdentityId(row);
  const player = normalizeNameKey(row?.player_name || row?.player);
  if (!explicitId && !player) return [];
  const season = getStringValue(row?.season).trim();
  const ageRange = getStringValue(row?.age_range || row?.level || "").trim();
  const classYear = getGrassrootsCareerClassYearKey(row?.class_year);
  return Array.from(new Set([
    explicitId ? `id|${explicitId}` : "",
    getStringValue(row?.career_player_key).trim(),
    player ? [player, season, ageRange, classYear].join("|") : "",
    player ? [player, season, ageRange].join("|") : "",
    player ? [player, classYear].join("|") : "",
    player,
  ].filter(Boolean)));
}

function grassrootsAttributeSourceScore(row) {
  let score = countMeaningfulRowFields(row);
  if (getExplicitIdentityId(row)) score += 100;
  if (Number.isFinite(getGrassrootsCareerInches(row))) score += 25;
  if (Number.isFinite(getGrassrootsCareerWeight(row))) score += 15;
  if (normalizePosLabel(row?.pos || row?.pos_text)) score += 10;
  return score;
}

function backfillGrassrootsPlayerAttributes(rows) {
  if (!Array.isArray(rows) || !rows.length) return;
  const profiles = new Map();

  rows.forEach((row) => {
    normalizePhysicalMeasurements(row);
    const keys = buildGrassrootsAttributeProfileKeys(row);
    if (!keys.length) return;
    const score = grassrootsAttributeSourceScore(row);
    const height = getGrassrootsCareerInches(row);
    const weight = getGrassrootsCareerWeight(row);
    const pos = normalizePosLabel(row.pos || row.pos_text);
    if (pos) {
      row.pos = pos;
      row.pos_text = pos;
    }
    keys.forEach((key) => {
      const current = profiles.get(key) || {
        heightScore: Number.NEGATIVE_INFINITY,
        weightScore: Number.NEGATIVE_INFINITY,
        posScore: Number.NEGATIVE_INFINITY,
      };
      if (Number.isFinite(height) && score > current.heightScore) {
        current.heightScore = score;
        current.height = height;
      }
      if (Number.isFinite(weight) && score > current.weightScore) {
        current.weightScore = score;
        current.weight = weight;
      }
      if (pos && score > current.posScore) {
        current.posScore = score;
        current.pos = pos;
      }
      profiles.set(key, current);
    });
  });

  rows.forEach((row) => {
    const keys = buildGrassrootsAttributeProfileKeys(row);
    if (!keys.length) return;
    if (!Number.isFinite(getGrassrootsCareerInches(row))) {
      for (const key of keys) {
        const height = profiles.get(key)?.height;
        if (Number.isFinite(height)) {
          row.height_in = height;
          row.inches = height;
          break;
        }
      }
    }
    if (!Number.isFinite(getGrassrootsCareerWeight(row))) {
      for (const key of keys) {
        const weight = profiles.get(key)?.weight;
        if (Number.isFinite(weight)) {
          row.weight_lb = weight;
          row.weight = weight;
          break;
        }
      }
    }
    if (!normalizePosLabel(row.pos || row.pos_text)) {
      for (const key of keys) {
        const pos = profiles.get(key)?.pos;
        if (pos) {
          row.pos = pos;
          row.pos_text = pos;
          break;
        }
      }
    }
    normalizePhysicalMeasurements(row);
    row.career_player_key = buildGrassrootsCareerKey(row);
  });
}

function getGrassrootsCareerTeamTokens(row) {
  const tokens = new Set();
  [row?.team_aliases, row?.team_search_text, row?.team_full, row?.team_name, row?.team].forEach((value) => {
    splitGrassrootsCareerTokens(value).forEach((token) => tokens.add(token));
  });
  return tokens;
}

function splitGrassrootsCareerTokens(value) {
  return String(value ?? "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\band\b/gi, "/")
    .split(/[\/,&|+]/)
    .map((part) => normalizeKey(part))
    .filter((part) => part && part.length >= 3 && part !== "unknown");
}

function hasGrassrootsCareerTokenOverlap(leftTokens, rightTokens) {
  if (!leftTokens?.size || !rightTokens?.size) return false;
  const smaller = leftTokens.size <= rightTokens.size ? leftTokens : rightTokens;
  const larger = smaller === leftTokens ? rightTokens : leftTokens;
  for (const token of smaller) {
    if (larger.has(token)) return true;
  }
  return false;
}

function getGrassrootsSettingForCircuit(circuit) {
  const circuitKeys = splitGrassrootsCircuitValues(circuit).map((value) => normalizeKey(value)).filter(Boolean);
  if (!circuitKeys.length) return "";
  if (circuitKeys.some((key) => GRASSROOTS_AAU_CIRCUITS.has(key) || (/(eybl|3ssb|nbpa|puma|uaa)/i.test(key) && !GRASSROOTS_HS_CIRCUITS.has(key)))) return "AAU";
  if (circuitKeys.some((key) => GRASSROOTS_HS_CIRCUITS.has(key))) return "HS";
  const key = circuitKeys.join(" ");
  if (/(eybl|3ssb|nbpa|puma|uaa)/i.test(key)) return "AAU";
  return "HS";
}

function normalizeGrassrootsCircuitToken(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  return GRASSROOTS_NIKE_SHOWCASE_CIRCUITS.has(normalizeKey(text)) ? "Nike Showcases" : text;
}

function splitGrassrootsCircuitValues(value) {
  return getStringValue(value)
    .split(/\s*\/\s*/)
    .map((part) => normalizeGrassrootsCircuitToken(part))
    .filter(Boolean);
}

function normalizeGrassrootsCircuitLabel(value) {
  const parts = splitGrassrootsCircuitValues(value);
  const seen = new Set();
  const uniqueParts = [];
  parts.forEach((part) => {
    const key = normalizeKey(part);
    if (!key || seen.has(key)) return;
    seen.add(key);
    uniqueParts.push(part);
  });
  return uniqueParts.join(" / ");
}

function grassrootsCircuitMatchesSelection(rowCircuit, selectedValues) {
  const rowValues = new Set(splitGrassrootsCircuitValues(rowCircuit).map((value) => normalizeKey(value)));
  if (!rowValues.size) return false;
  return Array.from(selectedValues || []).some((value) => rowValues.has(normalizeKey(value)));
}

function sanitizeGrassrootsCountValue(value) {
  const text = getStringValue(value).trim();
  if (!text) return Number.NaN;
  const numeric = Number(text);
  if (!Number.isFinite(numeric)) return Number.NaN;
  return Math.max(0, Math.round(numeric));
}

function deriveGrassrootsPercentileWeight(gp, min) {
  const games = Number.isFinite(gp) && gp > 0 ? gp : 1;
  const minutes = Number.isFinite(min) && min > 0 ? min : 1;
  return roundNumber(games * minutes, 1);
}

const GRASSROOTS_ADJ_BPM_LG_2P = 0.51;
const GRASSROOTS_ADJ_BPM_LG_FT = 0.77;
const GRASSROOTS_ADJ_BPM_BAD_3P = 0.32;

const GRASSROOTS_ADJ_BPM_POSITION_IN = {
  PG: 74,
  SG: 76,
  SF: 78,
  PF: 80,
  C: 83,
  G: 75,
  "PG/SG": 75,
  "G/F": 77,
  F: 79,
  "SF/PF": 79,
};

const GRASSROOTS_ADJ_BPM_ROLE_ADJ = {
  PG: -0.5,
  G: -0.375,
  "PG/SG": -0.375,
  SG: -0.25,
  "G/F": 0.0,
  SF: 0.0,
  "SF/PF": 0.15,
  F: 0.15,
  PF: 0.3,
  C: 0.6,
};

function normalizeGrassrootsPercentRate(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return Number.NaN;
  return numeric > 1.5 ? (numeric / 100) : numeric;
}

function getGrassrootsAdjBpmPositionInfo(heightIn, positionText) {
  const position = normalizePosLabel(positionText);
  const canonicalIn = GRASSROOTS_ADJ_BPM_POSITION_IN[position];
  const roleAdj = GRASSROOTS_ADJ_BPM_ROLE_ADJ[position];
  const hasHeight = Number.isFinite(heightIn);
  const hasPosition = Boolean(position);

  if (hasHeight && hasPosition && Number.isFinite(canonicalIn) && Number.isFinite(roleAdj)) {
    return {
      effectiveIn: (heightIn * 0.65) + (canonicalIn * 0.35),
      roleAdj,
    };
  }

  if (hasHeight && !hasPosition) {
    if (heightIn <= 72) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ.PG };
    if (heightIn <= 74) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ["PG/SG"] };
    if (heightIn <= 76) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ.SG };
    if (heightIn <= 78) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ.SF };
    if (heightIn <= 80) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ["SF/PF"] };
    if (heightIn <= 82) return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ.PF };
    return { effectiveIn: heightIn, roleAdj: GRASSROOTS_ADJ_BPM_ROLE_ADJ.C };
  }

  if (hasPosition) {
    return {
      effectiveIn: Number.isFinite(canonicalIn) ? canonicalIn : 78,
      roleAdj: Number.isFinite(roleAdj) ? roleAdj : 0,
    };
  }

  return { effectiveIn: 78, roleAdj: 0 };
}

function getGrassrootsAdjBpmReboundSplit(positionText) {
  const position = normalizePosLabel(positionText);
  if (["PG", "SG", "G"].includes(position)) return 0.25;
  if (position === "G/F") return 0.30;
  if (position === "SF") return 0.31;
  if (position === "F") return 0.32;
  if (position === "PF") return 0.35;
  if (position === "C") return 0.40;
  return 0.30;
}

function calculateGrassrootsAdjBpm(row) {
  const minutes = getMinutesValue(row);
  const scale = Number.isFinite(minutes) && minutes > 0 ? (40 / minutes) : Number.NaN;
  const pts = firstFinite(row.pts_per40, Number.isFinite(row.pts) && Number.isFinite(scale) ? row.pts * scale : Number.NaN, Number.NaN);
  const twoPa = firstFinite(row.two_pa_per40, Number.isFinite(row["2pa"]) && Number.isFinite(scale) ? row["2pa"] * scale : Number.NaN, Number.NaN);
  const threePa = firstFinite(row.three_pa_per40, Number.isFinite(row.tpa) && Number.isFinite(scale) ? row.tpa * scale : Number.NaN, Number.NaN);
  const ast = firstFinite(row.ast_per40, Number.isFinite(row.ast) && Number.isFinite(scale) ? row.ast * scale : Number.NaN, Number.NaN);
  const tov = firstFinite(row.tov_per40, Number.isFinite(row.tov) && Number.isFinite(scale) ? row.tov * scale : Number.NaN, Number.NaN);
  const stl = firstFinite(row.stl_per40, Number.isFinite(row.stl) && Number.isFinite(scale) ? row.stl * scale : Number.NaN, Number.NaN);
  const blk = firstFinite(row.blk_per40, Number.isFinite(row.blk) && Number.isFinite(scale) ? row.blk * scale : Number.NaN, Number.NaN);
  const pf = firstFinite(row.pf_per40, Number.isFinite(row.pf) && Number.isFinite(scale) ? row.pf * scale : Number.NaN, Number.NaN);
  const trb = firstFinite(row.trb_per40, Number.isFinite(row.trb) && Number.isFinite(scale) ? row.trb * scale : Number.NaN, Number.NaN);
  const positionInfo = getGrassrootsAdjBpmPositionInfo(firstFinite(row.height_in, row.inches, Number.NaN), row.pos || row.pos_text);
  const reboundShare = getGrassrootsAdjBpmReboundSplit(row.pos || row.pos_text);
  const orb = Number.isFinite(trb) ? trb * reboundShare : 0;
  const drb = Number.isFinite(trb) ? Math.max(0, trb - orb) : 0;
  const fga = Number.isFinite(twoPa) && Number.isFinite(threePa) ? (twoPa + threePa) : Number.NaN;
  const twoPpct = normalizeGrassrootsPercentRate(firstFinite(row.two_p_pct, row["2p_pct"], Number.NaN));
  const threePpct = normalizeGrassrootsPercentRate(firstFinite(row.three_p_pct, row.tp_pct, Number.NaN));
  const ftPct = normalizeGrassrootsPercentRate(firstFinite(row.ft_pct, Number.NaN));
  const ftmPer40 = Number.isFinite(row.ftm) && Number.isFinite(scale) ? row.ftm * scale : Number.NaN;
  const ftAttempts = Number.isFinite(ftPct) && Number.isFinite(ftmPer40) && ftPct > 0 ? (ftmPer40 / ftPct) : Number.NaN;
  const eff2p = Number.isFinite(twoPpct) && Number.isFinite(twoPa)
    ? ((twoPpct - GRASSROOTS_ADJ_BPM_LG_2P) * twoPa * 1.9)
    : 0;
  const effFt = Number.isFinite(ftPct) && Number.isFinite(ftAttempts)
    ? ((ftPct - GRASSROOTS_ADJ_BPM_LG_FT) * ftAttempts * 0.75)
    : 0;
  const eff3p = Number.isFinite(threePpct) && Number.isFinite(threePa)
    ? (-Math.max(0, GRASSROOTS_ADJ_BPM_BAD_3P - threePpct) * threePa * 1.3)
    : 0;

  if (![pts, ast, tov, fga].every((value) => Number.isFinite(value))) return "";

  const obpm = -5.5
    + (pts * 0.22)
    + (ast * 0.68)
    - (tov * 0.42)
    - (fga * 0.10)
    + eff2p
    + effFt
    + eff3p;

  const dbpm = -0.8
    + ((positionInfo.effectiveIn - 76) * 0.33)
    + positionInfo.roleAdj
    + (Number.isFinite(stl) ? (stl * 0.36) : 0)
    + (Number.isFinite(blk) ? (blk * 0.30) : 0)
    + (Number.isFinite(drb) ? (drb * 0.10) : 0)
    + (Number.isFinite(orb) ? (orb * 0.08) : 0)
    - (Number.isFinite(pf) ? (pf * 0.10) : 0);

  return roundNumber(obpm + dbpm, 1);
}

function deriveGrassrootsShotTotals({ gp, ptsPg, fgPct, tpPct, tpmPg, forceNoThree = false }) {
  const games = Number.isFinite(gp) && gp > 0 ? Math.max(1, Math.round(gp)) : 0;
  const points = Number.isFinite(ptsPg) && games > 0 ? Math.max(0, Math.round(ptsPg * games)) : 0;
  const expectedThree = !forceNoThree && Number.isFinite(tpmPg) && games > 0 ? Math.max(0, Math.round(tpmPg * games)) : 0;
  const fgRatio = Number.isFinite(fgPct) && fgPct > 0 ? fgPct / 100 : Number.NaN;
  const tpRatio = Number.isFinite(tpPct) && tpPct > 0 ? tpPct / 100 : Number.NaN;

  const tpmCandidates = [];
  const seen = new Set();
  const maxThree = points > 0 ? Math.floor(points / 3) : expectedThree;
  const pushCandidate = (value) => {
    if (!Number.isFinite(value)) return;
    const candidate = Math.max(0, Math.min(maxThree, Math.round(value)));
    if (seen.has(candidate)) return;
    seen.add(candidate);
    tpmCandidates.push(candidate);
  };

  pushCandidate(expectedThree);
  if (!forceNoThree) {
    for (let delta = 1; delta <= 2; delta += 1) {
      pushCandidate(expectedThree - delta);
      pushCandidate(expectedThree + delta);
    }
  }
  if (!tpmCandidates.length) pushCandidate(0);
  tpmCandidates.sort((left, right) => left - right);

  let best = null;
  tpmCandidates.forEach((tpmCandidate) => {
    const maxFgm = points > 0 ? Math.floor((points - tpmCandidate) / 2) : tpmCandidate;
    for (let fgm = tpmCandidate; fgm <= Math.max(tpmCandidate, maxFgm); fgm += 1) {
      const ftm = points - (2 * fgm) - tpmCandidate;
      if (ftm < 0) continue;
      const twoPm = fgm - tpmCandidate;
      if (twoPm < 0) continue;
      const fga = Number.isFinite(fgRatio) ? Math.max(fgm, Math.round(fgm / fgRatio)) : fgm;
      const tpa = Number.isFinite(tpRatio) ? Math.max(tpmCandidate, Math.round(tpmCandidate / tpRatio)) : tpmCandidate;
      if (tpa > fga) continue;
      const twoPa = fga - tpa;
      if (twoPa < twoPm) continue;
      const calcFgPct = fga > 0 ? roundNumber((fgm / fga) * 100, 1) : 0;
      const calcTpPct = tpa > 0 ? roundNumber((tpmCandidate / tpa) * 100, 1) : 0;
      const fgErr = Number.isFinite(fgPct) && fgPct > 0 ? Math.abs(calcFgPct - fgPct) : 0;
      const tpErr = Number.isFinite(tpPct) && tpPct > 0 ? Math.abs(calcTpPct - tpPct) : 0;
      const expectedFgm = Number.isFinite(fgPct) && fgPct > 0
        ? Math.max(tpmCandidate, Math.round(points * (fgPct / 100) / 2))
        : Math.max(tpmCandidate, Math.round(points / 4));
      const score = (Math.abs(tpmCandidate - expectedThree) * 1000)
        + (fgErr * 25)
        + (tpErr * 25)
        + Math.abs(fgm - expectedFgm);
      if (!best || score < best.score || (score === best.score && ftm < best.ftm) || (score === best.score && ftm === best.ftm && fgm > best.fgm)) {
        best = { pts: points, tpm: tpmCandidate, twoPm, twoPa, ftm, fgm, fga, tpa, score };
      }
    }
  });

  if (!best) {
    const fallbackTpm = expectedThree;
    const fallbackTwoPm = Number.isFinite(points) ? Math.max(0, Math.floor((points - (3 * fallbackTpm)) / 2)) : 0;
    const fallbackFtm = Number.isFinite(points) ? Math.max(0, points - (2 * fallbackTwoPm) - (3 * fallbackTpm)) : 0;
    const fallbackFgm = fallbackTwoPm + fallbackTpm;
    const fallbackFga = Number.isFinite(fgRatio) ? Math.max(fallbackFgm, Math.round(fallbackFgm / fgRatio)) : fallbackFgm;
    const fallbackTpa = Number.isFinite(tpRatio) ? Math.max(fallbackTpm, Math.round(fallbackTpm / tpRatio)) : fallbackTpm;
    const fallbackTwoPa = Math.max(0, fallbackFga - fallbackTpa);
    return {
      pts: points,
      tpm: fallbackTpm,
      twoPm: fallbackTwoPm,
      twoPa: fallbackTwoPa,
      ftm: fallbackFtm,
      fgm: fallbackFgm,
      fga: Math.max(fallbackFgm, fallbackFga),
      tpa: Math.max(fallbackTpm, fallbackTpa),
    };
  }

  return best;
}

function grassrootsEventMatchesSelection(row, selected) {
  const selectedKey = normalizeKey(selected);
  if (!selectedKey) return false;
  const eventCandidates = [
    row?.event_name,
    row?.event_group,
    row?.event_raw_name,
    row?.event_aliases,
  ]
    .map((value) => getStringValue(value).trim())
    .filter(Boolean);
  return eventCandidates.some((value) => {
    if (normalizeKey(value) === selectedKey) return true;
    return value.split(/\s*\/\s*/).some((part) => part && normalizeKey(part) === selectedKey);
  });
}

function grassrootsStateMatchesSelection(row, selected) {
  const selectedKey = normalizeKey(selected);
  if (!selectedKey) return false;
  const stateCandidates = String(row?.state ?? "")
    .split(/\s*\/\s*/)
    .map((value) => normalizeKey(value))
    .filter(Boolean);
  return stateCandidates.some((value) => value === selectedKey);
}

function getGrassrootsCircuitsForSetting(setting) {
  const normalized = normalizeKey(setting);
  if (!normalized || normalized === "all" || normalized === "overall") return null;
  if (normalized === "aau") return GRASSROOTS_AAU_CIRCUITS;
  if (normalized === "hs") return GRASSROOTS_HS_CIRCUITS;
  return null;
}

function getGrassrootsPosAliases(pos) {
  const normalized = normalizePosLabel(pos);
  switch (normalized) {
    case "PG":
      return ["PG", "G"];
    case "SG":
      return ["SG", "G"];
    case "G":
      return ["G", "PG", "SG"];
    case "G/F":
      return ["G/F"];
    case "SF":
      return ["SF", "F"];
    case "PF":
      return ["PF", "F"];
    case "F":
      return ["F", "SF", "PF"];
    case "C":
      return ["C"];
    default:
      return normalized ? [normalized] : [];
  }
}

function splitPositionValues(value) {
  return String(value ?? "")
    .replace(/\band\b/gi, "/")
    .split(/[\/,&|+]/)
    .map((part) => normalizePosLabel(part))
    .filter(Boolean);
}

function positionMatchesSelection(rowPos, selectedPos) {
  const selected = normalizePosLabel(selectedPos);
  if (!selected) return false;
  const rowValues = splitPositionValues(rowPos);
  if (!rowValues.length) return false;
  const selectedAliases = getGrassrootsPosAliases(selected);
  return rowValues.some((value) => {
    const aliases = getGrassrootsPosAliases(value);
    return aliases.includes(selected) || selectedAliases.includes(value);
  });
}

function splitGrassrootsPosValues(value) {
  return splitPositionValues(value);
}

function grassrootsPosMatchesSelection(rowPos, selectedPos) {
  return positionMatchesSelection(rowPos, selectedPos);
}

function getGrassrootsPosFamily(rowsOrRow) {
  const rows = Array.isArray(rowsOrRow) ? rowsOrRow : [rowsOrRow];
  let guardScore = 0;
  let forwardScore = 0;
  let centerScore = 0;

  rows.forEach((row) => {
    splitGrassrootsPosValues(row?.pos || row?.pos_text).forEach((value) => {
      if (["PG", "SG", "G"].includes(value)) {
        guardScore += 1;
      } else if (["SF", "PF", "F"].includes(value)) {
        forwardScore += 1;
      } else if (value === "G/F") {
        guardScore += 1;
        forwardScore += 1;
      } else if (value === "C") {
        centerScore += 1;
      }
    });
  });

  if (centerScore && !guardScore && !forwardScore) return "C";
  if (guardScore && !forwardScore) return "G";
  if (forwardScore && !guardScore) return "F";
  if (guardScore && forwardScore) return guardScore >= forwardScore ? "G" : "F";
  return "";
}

function inferGrassrootsClassYear(classYear, season, ageRange) {
  const numericClass = Number(classYear);
  if (Number.isFinite(numericClass) && numericClass >= 1000) {
    if (numericClass === 2034) return 2024;
    if (numericClass === 2035) return 2025;
    if (numericClass === 2206) return 2026;
    return numericClass;
  }
  const numericSeason = Number(season);
  const ageMatch = String(ageRange ?? "").match(/\b(\d{1,2})U\b/i);
  const ageValue = ageMatch ? Number(ageMatch[1]) : Number.NaN;
  if (!Number.isFinite(numericSeason) || !Number.isFinite(ageValue) || ageValue <= 0) return "";
  return numericSeason + Math.max(0, 18 - ageValue);
}

function sortGrassrootsDisplayValues(values, preferredOrder = []) {
  const orderIndex = new Map(preferredOrder.map((value, index) => [normalizeKey(value), index]));
  return Array.from(values).sort((left, right) => {
    const leftIndex = orderIndex.has(normalizeKey(left)) ? orderIndex.get(normalizeKey(left)) : Number.POSITIVE_INFINITY;
    const rightIndex = orderIndex.has(normalizeKey(right)) ? orderIndex.get(normalizeKey(right)) : Number.POSITIVE_INFINITY;
    if (leftIndex !== rightIndex) return leftIndex - rightIndex;
    return compareFilterValues(left, right);
  });
}

function grassrootsAliasRowScore(row) {
  let score = countMeaningfulRowFields(row);
  if (getNameLastToken(row.player_name || row.player)) score += 50;
  if (Number.isFinite(firstFinite(row.height_in, row.inches, Number.NaN))) score += 25;
  if (Number.isFinite(firstFinite(row.weight_lb, row.weight, Number.NaN))) score += 15;
  if (normalizePosLabel(row.pos || row.pos_text)) score += 10;
  if (normalizeClassValue(row.class_year)) score += 5;
  return score;
}

const TEAM_COACH_PLAYTYPE_IDS = ["transition", "spot_up", "pnr_ball_handler", "pnr_roll_man", "post_up", "cut", "off_screen", "hand_off", "isolation", "offensive_rebounds"];
const TEAM_COACH_PLAYTYPE_TOTAL_SUFFIXES = ["fga", "two_pa", "three_pa", "fta"];
const TEAM_COACH_PLAYTYPE_WEIGHT_MAP = {
  ppp: "poss",
  efg_pct: "fga",
  to_pct: "poss",
  two_p_pct: "two_pa",
  three_p_pct: "three_pa",
};

function aggregateTeamCoachCareerRows(dataset, rows) {
  if (!rows.length) return {};
  let latest = rows[0] || {};
  rows.forEach((row) => {
    if (compareYears(getStringValue(row[dataset.yearColumn]), getStringValue(latest[dataset.yearColumn])) < 0) {
      latest = row;
    }
  });
  const aggregate = { ...latest };
  const teams = new Map();
  const conferences = new Map();
  let wins = 0;
  let games = 0;
  rows.forEach((row) => {
    const team = getStringValue(row.team_name || row.team_full).trim();
    if (team) teams.set(normalizeKey(team), team);
    const conference = getStringValue(row.conference).trim();
    if (conference) conferences.set(normalizeKey(conference), conference);
    const rowWins = firstFinite(row.wins, Number.NaN);
    const rowGames = firstFinite(row.games, Number.NaN);
    if (Number.isFinite(rowWins)) wins += rowWins;
    if (Number.isFinite(rowGames)) games += rowGames;
  });

  ["wins", "games", "playtype_total_poss"].forEach((column) => {
    const total = sumFiniteValues(rows, column);
    if (Number.isFinite(total)) aggregate[column] = roundNumber(total, column === "playtype_total_poss" ? 1 : 0);
  });
  if (games > 0 && wins >= 0) aggregate.record = `${Math.round(wins)}-${Math.max(0, Math.round(games - wins))}`;

  [
    "adj_oe", "adj_de", "barthag", "efg_pct", "efg_pct_def", "ft_rate", "ft_rate_def",
    "tov_pct", "tov_pct_def", "oreb_pct", "opp_oreb_pct", "raw_tempo", "adj_tempo",
    "two_p_pct", "two_p_pct_def", "three_p_pct", "three_p_pct_def", "block_pct",
    "blocked_pct", "ast_pct", "opp_ast_pct", "three_p_rate", "three_p_rate_def",
    "avg_height", "eff_height", "exp", "talent", "ft_pct", "opp_ft_pct", "ppp_off",
    "ppp_def", "elite_sos",
  ].forEach((column) => {
    const weighted = weightedFiniteAverage(rows, column, "games");
    if (Number.isFinite(weighted)) aggregate[column] = roundNumber(weighted, 3);
  });
  if (Number.isFinite(aggregate.adj_oe) && Number.isFinite(aggregate.adj_de)) {
    aggregate.adj_ne = roundNumber(aggregate.adj_oe - aggregate.adj_de, 3);
  }
  if (Number.isFinite(aggregate.ppp_off) && Number.isFinite(aggregate.ppp_def)) {
    aggregate.ppp_net = roundNumber(aggregate.ppp_off - aggregate.ppp_def, 3);
  }

  TEAM_COACH_PLAYTYPE_IDS.forEach((id) => {
    let totalPoss = 0;
    let totalBasePoss = 0;
    const playtypeTotals = {};
    TEAM_COACH_PLAYTYPE_TOTAL_SUFFIXES.forEach((suffix) => {
      playtypeTotals[suffix] = 0;
    });
    rows.forEach((row) => {
      const poss = firstFinite(row?.[`${id}_poss`], Number.NaN);
      if (Number.isFinite(poss)) {
        totalPoss += poss;
        const total = firstFinite(row?.playtype_total_poss, estimateTeamCoachTotalPoss(row, id), Number.NaN);
        if (Number.isFinite(total) && total > 0) totalBasePoss += total;
      }
      TEAM_COACH_PLAYTYPE_TOTAL_SUFFIXES.forEach((suffix) => {
        const value = firstFinite(row?.[`${id}_${suffix}`], Number.NaN);
        if (Number.isFinite(value)) playtypeTotals[suffix] += value;
      });
    });
    if (totalPoss > 0) aggregate[`${id}_poss`] = roundNumber(totalPoss, 1);
    if (totalBasePoss > 0) aggregate[`${id}_freq`] = roundNumber((totalPoss / totalBasePoss) * 100, 3);
    TEAM_COACH_PLAYTYPE_TOTAL_SUFFIXES.forEach((suffix) => {
      const total = playtypeTotals[suffix];
      if (total > 0 || rows.some((row) => Number.isFinite(row?.[`${id}_${suffix}`]))) {
        aggregate[`${id}_${suffix}`] = roundNumber(total, 1);
        if (games > 0) aggregate[`${id}_${suffix}_pg`] = roundNumber(total / games, 3);
      }
    });
    Object.entries(TEAM_COACH_PLAYTYPE_WEIGHT_MAP).forEach(([suffix, weightSuffix]) => {
      const column = `${id}_${suffix}`;
      const weighted = weightedFiniteAverageStrict(rows, column, `${id}_${weightSuffix}`);
      const fallback = Number.isFinite(weighted) ? weighted : weightedFiniteAverage(rows, column, `${id}_poss`);
      if (Number.isFinite(fallback)) aggregate[column] = roundNumber(fallback, 3);
    });
    const fga = firstFinite(aggregate[`${id}_fga`], Number.NaN);
    if (Number.isFinite(fga) && fga > 0) {
      const threePa = firstFinite(aggregate[`${id}_three_pa`], Number.NaN);
      const fta = firstFinite(aggregate[`${id}_fta`], Number.NaN);
      if (Number.isFinite(threePa)) aggregate[`${id}_three_pa_rate`] = roundNumber(threePa / fga, 4);
      if (Number.isFinite(fta)) aggregate[`${id}_ft_rate`] = roundNumber(fta / fga, 4);
    }
    populatePrefixedTsPct(aggregate, id, { fgaSuffix: "fga" });
  });

  aggregate[dataset.yearColumn] = "Career";
  aggregate.team_name = teams.size > 1 ? "All Teams" : (Array.from(teams.values())[0] || aggregate.team_name || "");
  aggregate.team_search_text = Array.from(teams.values()).join(" ");
  aggregate.conference = conferences.size > 1 ? Array.from(conferences.values()).join(" / ") : (Array.from(conferences.values())[0] || aggregate.conference || "");
  aggregate.coach = pickPreferredText(rows.map((row) => getStringValue(row.coach).trim()).filter(Boolean)) || aggregate.coach || "";
  aggregate.coach_search_text = rows.map((row) => getStringValue(row.coach_search_text || row.coach).trim()).filter(Boolean).join(" ");
  aggregate.rank = null;
  aggregate._careerAggregate = true;
  aggregate._searchCacheKey = "";
  aggregate._searchHaystack = "";
  aggregate._colorBucketCacheKey = "";
  aggregate._colorBucketValue = "";
  const enhanced = enhanceRowForDataset(aggregate, dataset.id);
  recomputeCareerAggregateDerivedMetrics(enhanced, rows);
  return enhanced;
}

function getFirstFiniteAliasValue(row, aliases) {
  if (!row || !Array.isArray(aliases)) return Number.NaN;
  for (const alias of aliases) {
    const rawValue = row?.[alias];
    if (rawValue == null || rawValue === "") continue;
    const value = Number(rawValue);
    if (Number.isFinite(value)) return value;
  }
  return Number.NaN;
}

function sumAliasColumnValues(rows, aliases) {
  let total = 0;
  let hasValue = false;
  (rows || []).forEach((row) => {
    const value = getFirstFiniteAliasValue(row, aliases);
    if (!Number.isFinite(value)) return;
    total += value;
    hasValue = true;
  });
  return hasValue ? total : Number.NaN;
}

function rowsHaveOwnColumn(rows, column) {
  return (rows || []).some((row) => row && Object.prototype.hasOwnProperty.call(row, column));
}

function hasCareerRelevantColumns(aggregate, rows, columns) {
  return (columns || []).some((column) => Object.prototype.hasOwnProperty.call(aggregate || {}, column) || rowsHaveOwnColumn(rows, column));
}

function setCareerDerivedColumns(aggregate, rows, columns, value, requiredColumns = []) {
  if (!(Number.isFinite(value) || value === 0)) return;
  if (!hasCareerRelevantColumns(aggregate, rows, [...(columns || []), ...(requiredColumns || [])])) return;
  (columns || []).forEach((column) => {
    if (Object.prototype.hasOwnProperty.call(aggregate, column) || rowsHaveOwnColumn(rows, column)) {
      aggregate[column] = value;
    }
  });
}

function getCareerAggregateTotalValue(aggregate, rows, aliases) {
  const aggregateValue = getFirstFiniteAliasValue(aggregate, aliases);
  if (Number.isFinite(aggregateValue)) return aggregateValue;
  return sumAliasColumnValues(rows, aliases);
}

function getAssistedMadePct(made, unassistedMade) {
  if (!Number.isFinite(made) || made < 0 || !Number.isFinite(unassistedMade) || unassistedMade < 0) return Number.NaN;
  const assistedMade = Math.max(0, made - Math.min(unassistedMade, made));
  return zeroSafePercent(assistedMade, made);
}

function getCareerPrefixedTotal(aggregate, rows, prefix, suffixes) {
  return getCareerAggregateTotalValue(aggregate, rows, (suffixes || []).map((suffix) => `${prefix}_${suffix}`));
}

function setCareerPrefixedDerived(aggregate, rows, prefix, suffixes, value, requiredSuffixes = []) {
  setCareerDerivedColumns(
    aggregate,
    rows,
    (suffixes || []).map((suffix) => `${prefix}_${suffix}`),
    value,
    (requiredSuffixes || []).map((suffix) => `${prefix}_${suffix}`),
  );
}

function recomputeCareerPrefixedScoringMetrics(aggregate, rows, prefix, options = {}) {
  const poss = getCareerPrefixedTotal(aggregate, rows, prefix, ["poss"]);
  const points = getCareerPrefixedTotal(aggregate, rows, prefix, ["points", "pts"]);
  const fga = getCareerPrefixedTotal(aggregate, rows, prefix, ["fg_att", "fga"]);
  const fgm = getCareerPrefixedTotal(aggregate, rows, prefix, ["fg_made", "fgm"]);
  const fgMiss = getCareerPrefixedTotal(aggregate, rows, prefix, ["fg_miss"]);
  const twoMade = getCareerPrefixedTotal(aggregate, rows, prefix, ["two_fg_made", "two_pm"]);
  const twoAtt = getCareerPrefixedTotal(aggregate, rows, prefix, ["two_fg_att", "two_pa"]);
  const threeMade = getCareerPrefixedTotal(aggregate, rows, prefix, ["three_fg_made", "three_pm"]);
  const threeAtt = getCareerPrefixedTotal(aggregate, rows, prefix, ["three_fg_att", "three_pa"]);
  const fta = getCareerPrefixedTotal(aggregate, rows, prefix, ["fta"]);
  const ftm = getCareerPrefixedTotal(aggregate, rows, prefix, ["ftm"]);
  const tov = getCareerPrefixedTotal(aggregate, rows, prefix, ["tov"]);
  const plus1 = getCareerPrefixedTotal(aggregate, rows, prefix, ["plus1"]);
  const minutes = getCareerAggregateTotalValue(aggregate, rows, ["min", "mp"]);
  const games = getCareerAggregateTotalValue(aggregate, rows, ["gp", "g", "games"]);
  const totalPoss = getCareerAggregateTotalValue(aggregate, rows, ["total_poss"]);

  if (Number.isFinite(points) && Number.isFinite(poss) && poss > 0) {
    setCareerPrefixedDerived(aggregate, rows, prefix, ["ppp"], roundNumber(points / poss, 3), ["points", "pts", "poss"]);
  }
  setCareerPrefixedDerived(aggregate, rows, prefix, ["fg_pct"], zeroSafePercent(fgm, fga), ["fg_made", "fgm", "fg_att", "fga"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["two_fg_pct", "two_p_pct"], zeroSafePercent(twoMade, twoAtt), ["two_fg_made", "two_pm", "two_fg_att", "two_pa"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["three_fg_pct", "three_p_pct"], zeroSafePercent(threeMade, threeAtt), ["three_fg_made", "three_pm", "three_fg_att", "three_pa"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["ft_pct"], zeroSafePercent(ftm, fta), ["ftm", "fta"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["efg_pct"], zeroSafeEfgPct(fgm, threeMade, fga), ["fg_made", "fgm", "fg_att", "fga", "three_fg_made", "three_pm"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["ts_pct"], zeroSafeTsPct(points, fga, fta), ["points", "pts", "fg_att", "fga", "fta"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["ftr"], ratioIfPossible(fta, fga), ["fta", "fg_att", "fga"]);
  setCareerPrefixedDerived(aggregate, rows, prefix, ["three_pr"], ratioIfPossible(threeAtt, fga), ["three_fg_att", "three_pa", "fg_att", "fga"]);
  if (Number.isFinite(tov) && Number.isFinite(poss) && poss > 0) {
    setCareerPrefixedDerived(aggregate, rows, prefix, ["tov_pct"], roundNumber((tov / poss) * 100, 1), ["tov", "poss"]);
  }
  if (Number.isFinite(plus1) && Number.isFinite(poss) && poss > 0) {
    setCareerPrefixedDerived(aggregate, rows, prefix, ["plus1_pct"], roundNumber((plus1 / poss) * 100, 1), ["plus1", "poss"]);
  }
  if (Number.isFinite(poss) && Number.isFinite(totalPoss) && totalPoss > 0 && !options.skipFreq) {
    setCareerPrefixedDerived(aggregate, rows, prefix, ["freq"], roundNumber((poss / totalPoss) * 100, 1), ["poss", "total_poss"]);
  }

  const perMode = [
    ["poss", poss],
    ["points", points],
    ["pts", points],
    ["fg_att", fga],
    ["fga", fga],
    ["fg_made", fgm],
    ["fgm", fgm],
    ["fg_miss", fgMiss],
    ["two_fg_att", twoAtt],
    ["two_fg_made", twoMade],
    ["three_fg_att", threeAtt],
    ["three_fg_made", threeMade],
    ["fta", fta],
    ["ftm", ftm],
    ["tov", tov],
    ["plus1", plus1],
  ];
  perMode.forEach(([suffix, value]) => {
    if (!Number.isFinite(value)) return;
    if (Number.isFinite(games) && games > 0) {
      setCareerPrefixedDerived(aggregate, rows, prefix, [`${suffix}_pg`], roundNumber(value / games, 3), [suffix, "gp"]);
    }
    if (Number.isFinite(minutes) && minutes > 0) {
      setCareerPrefixedDerived(aggregate, rows, prefix, [`${suffix}_per40`], roundNumber((value / minutes) * 40, 3), [suffix, "min"]);
    }
  });
}

function recomputeCareerPlaytypeMetrics(aggregate, rows) {
  const prefixes = new Set([
    ...D1_PLAYTYPE_FAMILY_PREFIXES,
    ...NBA_PLAYTYPE_DEFS.map((playtype) => playtype.id),
    ...D1_RIM_SCORING_COMPONENTS.map((component) => component.prefix),
    "rim_scoring",
  ]);
  prefixes.forEach((prefix) => recomputeCareerPrefixedScoringMetrics(aggregate, rows, prefix));
}

function recomputeCareerMinuteShare(aggregate, rows) {
  let playerMinutes = 0;
  let availableMinutes = 0;
  (rows || []).forEach((row) => {
    const minutes = firstFinite(row?.min, row?.mp, Number.NaN);
    const share = firstFinite(row?.min_per, Number.NaN);
    if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(share) || share <= 0) return;
    playerMinutes += minutes;
    availableMinutes += minutes / (share / 100);
  });
  if (playerMinutes > 0 && availableMinutes > 0) {
    setCareerDerivedColumns(aggregate, rows, ["min_per"], roundNumber((playerMinutes / availableMinutes) * 100, 1), ["min", "mp", "min_per"]);
  }
}

function recomputeCareerAggregateDerivedMetrics(aggregate, rows) {
  if (!aggregate || !Array.isArray(rows) || rows.length <= 1) return aggregate;

  const fgm = getCareerAggregateTotalValue(aggregate, rows, ["fgm"]);
  const fga = getCareerAggregateTotalValue(aggregate, rows, ["fga"]);
  const twoPm = getCareerAggregateTotalValue(aggregate, rows, ["2pm", "two_pm", "two_p_made"]);
  const twoPa = getCareerAggregateTotalValue(aggregate, rows, ["2pa", "two_pa", "2pa_total", "two_p_att"]);
  const threePm = getCareerAggregateTotalValue(aggregate, rows, ["3pm", "three_pm", "tpm", "three_p_made"]);
  const threePa = getCareerAggregateTotalValue(aggregate, rows, ["3pa", "three_pa", "tpa", "three_p_att"]);
  const ftm = getCareerAggregateTotalValue(aggregate, rows, ["ftm"]);
  const fta = getCareerAggregateTotalValue(aggregate, rows, ["fta"]);
  const pts = getCareerAggregateTotalValue(aggregate, rows, ["pts"]);
  const ast = getCareerAggregateTotalValue(aggregate, rows, ["ast"]);
  const tov = getCareerAggregateTotalValue(aggregate, rows, ["tov"]);
  const stl = getCareerAggregateTotalValue(aggregate, rows, ["stl"]);
  const blk = getCareerAggregateTotalValue(aggregate, rows, ["blk"]);
  const pf = getCareerAggregateTotalValue(aggregate, rows, ["pf"]);
  const stocks = Number.isFinite(stl) && Number.isFinite(blk) ? stl + blk : Number.NaN;

  setCareerDerivedColumns(aggregate, rows, ["fg_pct", "fgpct"], zeroSafePercent(fgm, fga), ["fgm", "fga"]);
  setCareerDerivedColumns(aggregate, rows, ["2p_pct", "two_p_pct", "fg2pct"], zeroSafePercent(twoPm, twoPa), ["2pm", "two_pm", "two_p_made", "2pa", "two_pa", "2pa_total", "two_p_att"]);
  setCareerDerivedColumns(aggregate, rows, ["3p_pct", "tp_pct", "three_p_pct", "fg3pct"], zeroSafePercent(threePm, threePa), ["3pm", "three_pm", "tpm", "three_p_made", "3pa", "three_pa", "tpa", "three_p_att"]);
  setCareerDerivedColumns(aggregate, rows, ["ft_pct", "ftpct"], zeroSafePercent(ftm, fta), ["ftm", "fta"]);
  setCareerDerivedColumns(aggregate, rows, ["efg_pct", "efg"], zeroSafeEfgPct(fgm, threePm, fga), ["fgm", "fga", "3pm", "three_pm", "tpm", "three_p_made"]);
  setCareerDerivedColumns(aggregate, rows, ["ts_pct", "tspct"], zeroSafeTsPct(pts, fga, fta), ["pts", "fga", "fta"]);
  setCareerDerivedColumns(aggregate, rows, ["ftr"], ratioIfPossible(fta, fga), ["fta", "fga"]);
  setCareerDerivedColumns(aggregate, rows, ["three_pr"], ratioIfPossible(threePa, fga), ["3pa", "three_pa", "tpa", "three_p_att", "fga"]);
  setCareerDerivedColumns(aggregate, rows, ["ftm_fga"], ratioIfPossible(ftm, fga), ["ftm", "fga"]);
  if (Number.isFinite(ftm) && Number.isFinite(fga) && Number.isFinite(threePa) && fga > 0) {
    setCareerDerivedColumns(aggregate, rows, ["three_pr_plus_ftm_fga"], roundNumber((threePa / fga) + (ftm / fga), 3), ["3pa", "three_pa", "tpa", "three_p_att", "ftm", "fga"]);
  }
  if (Number.isFinite(ast) && Number.isFinite(tov) && tov > 0) {
    setCareerDerivedColumns(aggregate, rows, ["ast_to"], roundNumber(ast / tov, 2), ["ast", "tov"]);
  }
  if (Number.isFinite(blk) && Number.isFinite(pf) && pf > 0) {
    setCareerDerivedColumns(aggregate, rows, ["blk_pf"], roundNumber(blk / pf, 2), ["blk", "pf"]);
  }
  if (Number.isFinite(stl) && Number.isFinite(pf) && pf > 0) {
    setCareerDerivedColumns(aggregate, rows, ["stl_pf"], roundNumber(stl / pf, 2), ["stl", "pf"]);
  }
  if (Number.isFinite(stocks) && Number.isFinite(pf) && pf > 0) {
    setCareerDerivedColumns(aggregate, rows, ["stocks_pf"], roundNumber(stocks / pf, 2), ["stl", "blk", "pf"]);
  }

  const dunkMade = getCareerAggregateTotalValue(aggregate, rows, ["dunk_made"]);
  const dunkAtt = getCareerAggregateTotalValue(aggregate, rows, ["dunk_att"]);
  const dunkUnastMade = getCareerAggregateTotalValue(aggregate, rows, ["dunk_unast_made"]);
  const rimMade = getCareerAggregateTotalValue(aggregate, rows, ["rim_made"]);
  const rimAtt = getCareerAggregateTotalValue(aggregate, rows, ["rim_att"]);
  const rimUnastMade = getCareerAggregateTotalValue(aggregate, rows, ["rim_unast_made"]);
  const midMade = getCareerAggregateTotalValue(aggregate, rows, ["mid_made", "long2_made"]);
  const midAtt = getCareerAggregateTotalValue(aggregate, rows, ["mid_att", "long2_att"]);
  const midUnastMade = getCareerAggregateTotalValue(aggregate, rows, ["mid_unast_made"]);
  const twoPUnastMade = getCareerAggregateTotalValue(aggregate, rows, ["two_p_unast_made"]);
  const threePUnastMade = getCareerAggregateTotalValue(aggregate, rows, ["three_p_unast_made"]);

  setCareerDerivedColumns(aggregate, rows, ["dunk_pct"], zeroSafePercent(dunkMade, dunkAtt), ["dunk_made", "dunk_att"]);
  setCareerDerivedColumns(aggregate, rows, ["dunk_ast_pct"], getAssistedMadePct(dunkMade, dunkUnastMade), ["dunk_made", "dunk_unast_made"]);
  setCareerDerivedColumns(aggregate, rows, ["rim_pct", "fgpct_rim"], zeroSafePercent(rimMade, rimAtt), ["rim_made", "rim_att"]);
  setCareerDerivedColumns(aggregate, rows, ["mid_pct", "fgpct_mid"], zeroSafePercent(midMade, midAtt), ["mid_made", "mid_att", "long2_made", "long2_att"]);
  setCareerDerivedColumns(aggregate, rows, ["rim_ast_pct"], getAssistedMadePct(rimMade, rimUnastMade), ["rim_made", "rim_unast_made"]);
  setCareerDerivedColumns(aggregate, rows, ["mid_ast_pct"], getAssistedMadePct(midMade, midUnastMade), ["mid_made", "mid_unast_made"]);
  setCareerDerivedColumns(aggregate, rows, ["two_p_ast_pct", "two_ast_pct"], getAssistedMadePct(twoPm, twoPUnastMade), ["2pm", "two_pm", "two_p_made", "two_p_unast_made"]);
  setCareerDerivedColumns(aggregate, rows, ["three_p_ast_pct", "three_ast_pct"], getAssistedMadePct(threePm, threePUnastMade), ["3pm", "three_pm", "tpm", "three_p_made", "three_p_unast_made"]);
  setCareerDerivedColumns(aggregate, rows, ["rim_to_mid_att_ratio"], ratioIfPossible(rimAtt, midAtt), ["rim_att", "mid_att", "long2_att"]);

  const drivePoss = getCareerAggregateTotalValue(aggregate, rows, ["drive_poss"]);
  const totalPoss = getCareerAggregateTotalValue(aggregate, rows, ["total_poss"]);
  const drivePoints = getCareerAggregateTotalValue(aggregate, rows, ["drive_points"]);
  const driveFgm = getCareerAggregateTotalValue(aggregate, rows, ["drive_fgm"]);
  const driveFga = getCareerAggregateTotalValue(aggregate, rows, ["drive_fga"]);
  const driveTwoPm = getCareerAggregateTotalValue(aggregate, rows, ["drive_two_pm"]);
  const driveTwoPa = getCareerAggregateTotalValue(aggregate, rows, ["drive_two_pa"]);
  const driveTov = getCareerAggregateTotalValue(aggregate, rows, ["drive_tov"]);
  const driveFta = getCareerAggregateTotalValue(aggregate, rows, ["drive_fta"]);
  const drivePlus1 = getCareerAggregateTotalValue(aggregate, rows, ["drive_plus1"]);

  if (Number.isFinite(drivePoints) && Number.isFinite(drivePoss) && drivePoss > 0) {
    setCareerDerivedColumns(aggregate, rows, ["drive_ppp"], roundNumber(drivePoints / drivePoss, 3), ["drive_points", "drive_poss"]);
  }
  setCareerDerivedColumns(aggregate, rows, ["drive_fg_pct"], zeroSafePercent(driveFgm, driveFga), ["drive_fgm", "drive_fga"]);
  setCareerDerivedColumns(aggregate, rows, ["drive_two_p_pct"], zeroSafePercent(driveTwoPm, driveTwoPa), ["drive_two_pm", "drive_two_pa"]);
  if (Number.isFinite(driveTov) && Number.isFinite(drivePoss) && drivePoss > 0) {
    setCareerDerivedColumns(aggregate, rows, ["drive_tov_pct"], roundNumber((driveTov / drivePoss) * 100, 1), ["drive_tov", "drive_poss"]);
  }
  setCareerDerivedColumns(aggregate, rows, ["drive_ftr"], ratioIfPossible(driveFta, driveFga), ["drive_fta", "drive_fga"]);
  if (Number.isFinite(drivePlus1) && Number.isFinite(drivePoss) && drivePoss > 0) {
    setCareerDerivedColumns(aggregate, rows, ["drive_plus1_pct"], roundNumber((drivePlus1 / drivePoss) * 100, 1), ["drive_plus1", "drive_poss"]);
  }
  if (Number.isFinite(drivePoss) && Number.isFinite(totalPoss) && totalPoss > 0) {
    setCareerDerivedColumns(aggregate, rows, ["drive_freq"], roundNumber((drivePoss / totalPoss) * 100, 1), ["drive_poss", "total_poss"]);
  }
  recomputeCareerMinuteShare(aggregate, rows);
  recomputeCareerPlaytypeMetrics(aggregate, rows);

  return aggregate;
}

function sumFiniteValues(rows, column) {
  let total = 0;
  let hasValue = false;
  rows.forEach((row) => {
    const value = firstFinite(row?.[column], Number.NaN);
    if (!Number.isFinite(value)) return;
    total += value;
    hasValue = true;
  });
  return hasValue ? total : Number.NaN;
}

function weightedFiniteAverage(rows, column, weightColumn) {
  let weightedSum = 0;
  let totalWeight = 0;
  rows.forEach((row) => {
    const value = firstFinite(row?.[column], Number.NaN);
    if (!Number.isFinite(value)) return;
    const weight = Math.max(firstFinite(row?.[weightColumn], row?.games, 1), 1);
    weightedSum += value * weight;
    totalWeight += weight;
  });
  return totalWeight > 0 ? weightedSum / totalWeight : Number.NaN;
}

function weightedFiniteAverageStrict(rows, column, weightColumn) {
  let weightedSum = 0;
  let totalWeight = 0;
  rows.forEach((row) => {
    const value = firstFinite(row?.[column], Number.NaN);
    const weight = firstFinite(row?.[weightColumn], Number.NaN);
    if (!Number.isFinite(value) || !Number.isFinite(weight) || weight <= 0) return;
    weightedSum += value * weight;
    totalWeight += weight;
  });
  return totalWeight > 0 ? weightedSum / totalWeight : Number.NaN;
}

function estimateTeamCoachTotalPoss(row, playtypeId) {
  const poss = firstFinite(row?.[`${playtypeId}_poss`], Number.NaN);
  const freq = firstFinite(row?.[`${playtypeId}_freq`], Number.NaN);
  if (Number.isFinite(poss) && Number.isFinite(freq) && freq > 0) return poss / (freq / 100);
  return Number.NaN;
}

function aggregateCareerRows(dataset, rows) {
  if (dataset.id === "team_coach") return aggregateTeamCoachCareerRows(dataset, rows || []);
  if (rows.length <= 1) {
    const latest = rows[0] || {};
    const aggregate = latest ? { ...latest } : {};
    aggregate.rank = null;
    aggregate._careerAggregate = true;
    aggregate._searchCacheKey = "";
    aggregate._searchHaystack = "";
    aggregate._colorBucketCacheKey = "";
    aggregate._colorBucketValue = "";
    return aggregate;
  }
  let latest = rows[0] || {};
  const minuteWeights = new Array(rows.length);
  const defaultWeights = new Array(rows.length);
  const playerSearchValues = new Set();
  const teamSearchValues = new Map();
  const eventValues = new Map();
  const eventGroupValues = new Map();
  const ageRangeValues = new Set();
  const eventUrlValues = new Set();
  const circuitValues = new Map();
  const settingValues = new Map();
  const positionValues = new Map();
  const coachSearchValues = new Set();
  const competitionLabels = new Set();
  rows.forEach((row, index) => {
    if (compareYears(getStringValue(row[dataset.yearColumn]), getStringValue(latest[dataset.yearColumn])) < 0) {
      latest = row;
    }
    const playerText = getStringValue(row.player_search_text || row.player_name || row.player).trim();
    if (playerText) playerSearchValues.add(playerText);
    const teamText = dataset.id === "grassroots"
      ? getStringValue(row.team_full || row[dataset.teamColumn]).trim()
      : getStringValue(row.team_search_text || row[dataset.teamColumn]).trim();
    if (teamText) {
      const teamKey = normalizeKey(teamText);
      const currentTeamText = teamSearchValues.get(teamKey);
      if (!currentTeamText || teamText.length >= currentTeamText.length) {
        teamSearchValues.set(teamKey, teamText);
      }
    }
    if (dataset.id === "grassroots") {
      const ageRangeText = getStringValue(row.age_range).trim();
      if (ageRangeText) ageRangeValues.add(ageRangeText);
      const eventUrlText = getStringValue(row.event_url).trim();
      if (eventUrlText) eventUrlValues.add(eventUrlText);
      const posText = getStringValue(row.pos_text || row.pos).trim();
      if (posText) positionValues.set(normalizeKey(posText), normalizePosLabel(posText));
      const eventText = getStringValue(row.event_name).trim();
      if (eventText) eventValues.set(normalizeKey(eventText), eventText);
      const eventGroupText = getStringValue(row.event_group).trim();
      if (eventGroupText) eventGroupValues.set(normalizeKey(eventGroupText), eventGroupText);
      const circuitText = getStringValue(row.circuit).trim();
      if (circuitText) circuitValues.set(normalizeKey(circuitText), circuitText);
      const settingText = getStringValue(row.setting || getGrassrootsSettingForCircuit(row.circuit)).trim();
      if (settingText) settingValues.set(normalizeKey(settingText), settingText);
    }
    const coachText = getStringValue(row.coach_search_text || row.coach).trim();
    if (coachText) coachSearchValues.add(coachText);
    if (dataset.id === "fiba") {
      const competitionLabel = getStringValue(row.competition_label).trim();
      if (competitionLabel) competitionLabels.add(competitionLabel);
    }
    const minutesWeight = Math.max(getMinutesValue(row), 1);
    minuteWeights[index] = minutesWeight;
    defaultWeights[index] = Math.max(firstFinite(row.total_poss, estimatedPossessions(row), getMinutesValue(row), row.gp, 1), 1);
  });
  const plans = getCareerAggregationPlans(dataset);
  const aggregate = latest ? { ...latest } : {};
  const mergedTeams = sortGrassrootsDisplayValues(teamSearchValues.values(), []);
  const mergedEvents = sortGrassrootsEventValues(eventValues.values());
  const mergedEventGroups = sortGrassrootsEventValues(eventGroupValues.values());
  const mergedCircuits = sortGrassrootsDisplayValues(circuitValues.values(), GRASSROOTS_CIRCUIT_ORDER);
  const mergedSettings = sortGrassrootsDisplayValues(settingValues.values(), ["HS", "AAU"]);
  const mergedPositions = sortGrassrootsDisplayValues(positionValues.values(), ["PG", "G", "SG", "G/F", "F", "SF", "PF", "C"]);
  const preferredPlayerName = dataset.id === "grassroots" ? getPreferredStatusName(rows) : "";

  plans.forEach((plan) => {
    const { column, mode, weightMode } = plan;
    let hasValue = false;
    let total = 0;
    let best = mode === "min" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    let totalWeight = 0;
    let weightedSum = 0;
    for (let index = 0; index < rows.length; index += 1) {
      const value = getRowColumnValue(dataset, rows[index], column);
      if (typeof value !== "number" || !Number.isFinite(value)) continue;
      hasValue = true;
      if (mode === "sum") {
        total += value;
        continue;
      }
      if (mode === "min") {
        if (value < best) best = value;
        continue;
      }
      if (mode === "max") {
        if (value > best) best = value;
        continue;
      }
      const weight = weightMode === "minutes" ? minuteWeights[index] : defaultWeights[index];
      totalWeight += weight;
      weightedSum += value * weight;
    }
    if (!hasValue) return;
    if (mode === "sum") {
      aggregate[column] = isIntegerCountColumn(column) ? Math.round(total) : roundNumber(total, 3);
      return;
    }
    if (mode === "min" || mode === "max") {
      aggregate[column] = best;
      return;
    }
    if (totalWeight > 0) {
      aggregate[column] = roundNumber(weightedSum / totalWeight, 3);
    }
  });

  [
    dataset.yearColumn,
    dataset.teamColumn,
    "team_full",
    "conference",
    "division",
    "region",
    "level",
    "coach",
    "player_name",
    "player",
    "pos",
    "pos_text",
    "class_year",
    "height_in",
    "inches",
    "weight_lb",
    "weight",
    "bmi",
    "age",
    "dob",
    "rookie_year",
    "draft_pick",
    "exp",
  ].forEach((column) => {
    if (Object.prototype.hasOwnProperty.call(latest, column)) aggregate[column] = latest[column];
  });

  aggregate[dataset.yearColumn] = latest[dataset.yearColumn];
  aggregate[dataset.teamColumn] = dataset.id === "grassroots" ? mergedTeams.join(" / ") : latest[dataset.teamColumn];
  if (dataset.id === "grassroots") {
    if (Array.from(ageRangeValues).length && !getStringValue(aggregate.age_range).trim()) {
      aggregate.age_range = Array.from(ageRangeValues).sort(compareFilterValues).join(" / ");
    }
    if (!getStringValue(aggregate.level).trim()) aggregate.level = aggregate.age_range || "";
    if (Array.from(eventUrlValues).length && !getStringValue(aggregate.event_url).trim()) {
      aggregate.event_url = Array.from(eventUrlValues).sort(compareFilterValues).join(" / ");
    }
    if (mergedPositions.length) {
      const mergedPositionText = mergedPositions.join(" / ");
      aggregate.pos = mergedPositionText;
      aggregate.pos_text = mergedPositionText;
    }
    if (mergedEvents.length) aggregate.event_name = mergedEvents.join(" / ");
    if (mergedEventGroups.length) aggregate.event_group = mergedEventGroups.join(" / ");
    if (mergedCircuits.length) aggregate.circuit = mergedCircuits.join(" / ");
    if (mergedSettings.length) aggregate.setting = mergedSettings.join(" / ");
    aggregate.event_raw_name = mergedEvents.join(" / ");
    aggregate.event_aliases = mergedEvents.join(" / ");
    aggregate.team_full = aggregate[dataset.teamColumn];
    aggregate.team_aliases = mergedTeams.join(" / ");
    aggregate.career_player_key = pickPreferredText(rows.map((row) => String(row.career_player_key || buildGrassrootsCareerKey(row) || "").trim()).filter(Boolean)) || "";
    aggregate.player_aliases = Array.from(playerSearchValues).join(" / ");
    if (preferredPlayerName) {
      aggregate.player_name = preferredPlayerName;
      aggregate.player = preferredPlayerName;
    }
  }
  aggregate.player_search_text = Array.from(playerSearchValues).join(" ");
  aggregate.team_search_text = mergedTeams.join(" / ");
  aggregate.coach_search_text = Array.from(coachSearchValues).join(" ");
  if (dataset.id === "fiba") {
    aggregate.competition_label = Array.from(competitionLabels).join(" / ");
  }
  aggregate.rank = null;
  aggregate._careerAggregate = true;
  aggregate._searchCacheKey = "";
  aggregate._searchHaystack = "";
  aggregate._colorBucketCacheKey = "";
  aggregate._colorBucketValue = "";
  const enhanced = enhanceRowForDataset(aggregate, dataset.id);
  recomputeCareerAggregateDerivedMetrics(enhanced, rows);
  return enhanced;
}

function pickPreferredText(values) {
  const counts = new Map();
  (values || []).forEach((value) => {
    const text = getStringValue(value).trim();
    if (!text) return;
    counts.set(text, (counts.get(text) || 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((left, right) => (right[1] - left[1]) || (right[0].length - left[0].length) || left[0].localeCompare(right[0]))[0]?.[0] || "";
}

function mergeCareerRowGroups(dataset, groups) {
  const buckets = new Map();
  groups.forEach((rows) => {
    const meta = buildCareerGroupMeta(dataset, rows);
    const bucketKey = getCareerMergeBucketKey(meta, rows);
    if (!bucketKey) return;
    if (!buckets.has(bucketKey)) buckets.set(bucketKey, []);
    buckets.get(bucketKey).push(meta);
  });

  const merged = [];
  buckets.forEach((bucket) => {
    bucket.sort((left, right) => left.minYear - right.minYear);
    const current = [];
    bucket.forEach((candidate) => {
      const target = current.find((group) => canMergeCareerGroups(group, candidate));
      if (target) {
        target.rows.push(...candidate.rows);
        target.years = Array.from(new Set(target.years.concat(candidate.years))).sort((a, b) => a - b);
        target.minYear = Math.min(target.minYear, candidate.minYear);
        target.maxYear = Math.max(target.maxYear, candidate.maxYear);
        target.dobs = Array.from(new Set(target.dobs.concat(candidate.dobs)));
        target.heights = Array.from(new Set(target.heights.concat(candidate.heights)));
        target.draftPicks = Array.from(new Set(target.draftPicks.concat(candidate.draftPicks)));
        target.rookieYears = Array.from(new Set(target.rookieYears.concat(candidate.rookieYears)));
      } else {
        current.push(candidate);
      }
    });
    current.forEach((group) => merged.push(group.rows));
  });
  return merged.length ? merged : groups;
}

function getCareerMergeBucketKey(meta, rows) {
  if (rows?.length && Object.prototype.hasOwnProperty.call(rows[0] || {}, "circuit")) {
    const grassrootsKey = getGrassrootsCareerBucketKey(rows);
    if (grassrootsKey) return `grassroots|${grassrootsKey}`;
  }
  const preferredName = normalizeNameKey(getPreferredStatusName(rows));
  const lastName = getNameLastToken(preferredName);
  const explicitId = meta?.explicitIds?.[0] || "";
  if (explicitId) return `id|${explicitId}`;
  if (meta?.dobs?.length) {
    const dob = getStringValue(meta.dobs[0]).trim();
    if (dob) return `dob|${dob}`;
  }
  if (meta?.draftPicks?.length && meta?.rookieYears?.length) {
    const draftPick = Math.min(...meta.draftPicks);
    const rookieYear = Math.min(...meta.rookieYears);
    return `draftrookie|${draftPick}|${rookieYear}`;
  }
  if (meta?.draftPicks?.length && meta?.heights?.length) {
    const draftPick = Math.min(...meta.draftPicks);
    const height = Math.round(Math.min(...meta.heights));
    return `draftheight|${draftPick}|${height}`;
  }
  if (meta?.rookieYears?.length && meta?.heights?.length) {
    const rookieYear = Math.min(...meta.rookieYears);
    const height = Math.round(Math.min(...meta.heights));
    return `rookieheight|${rookieYear}|${height}`;
  }
  if (preferredName) {
    if (meta?.heights?.length) {
      const height = Math.round(Math.min(...meta.heights));
      return `name|${preferredName}|${height}`;
    }
    return `name|${preferredName}`;
  }
  return "";
}

function buildCareerGroupMeta(dataset, rows) {
  let latestRow = rows[0] || {};
  let earliestRow = rows[0] || {};
  const years = [];
  const dobs = new Set();
  const heights = new Set();
  const explicitIds = new Set();
  const draftPicks = new Set();
  const rookieYears = new Set();
  rows.forEach((row) => {
    if (compareYears(getStringValue(row[dataset.yearColumn]), getStringValue(latestRow[dataset.yearColumn])) < 0) {
      latestRow = row;
    }
    if (compareYears(getStringValue(row[dataset.yearColumn]), getStringValue(earliestRow[dataset.yearColumn])) > 0) {
      earliestRow = row;
    }
    const year = extractLeadingYear(row[dataset.yearColumn]);
    if (Number.isFinite(year)) years.push(year);
    const dob = getStringValue(row.dob).trim();
    if (dob) dobs.add(dob);
    const height = firstFinite(row.height_in, row.inches, Number.NaN);
    if (Number.isFinite(height)) heights.add(height);
    const explicitId = getExplicitIdentityId(row);
    if (explicitId) explicitIds.add(explicitId);
    const draftPick = Number(row.draft_pick);
    if (Number.isFinite(draftPick) && !row._draftPickBlank) draftPicks.add(Math.round(draftPick));
    const rookieYear = Number(row.rookie_year);
    if (Number.isFinite(rookieYear)) rookieYears.add(Math.round(rookieYear));
  });
  years.sort((a, b) => a - b);
  return {
    rows: rows.slice(),
    years,
    minYear: years[0] || 0,
    maxYear: years[years.length - 1] || 0,
    dobs: Array.from(dobs),
    heights: Array.from(heights),
    explicitIds: Array.from(explicitIds),
    draftPicks: Array.from(draftPicks).sort((left, right) => left - right),
    rookieYears: Array.from(rookieYears).sort((left, right) => left - right),
    latestClass: normalizeClassValue(latestRow.class_year),
    earliestClass: normalizeClassValue(earliestRow.class_year),
    latestMinutes: getMinutesValue(latestRow),
    earliestMinutes: getMinutesValue(earliestRow),
  };
}

function canMergeCareerGroups(left, right) {
  if (left.explicitIds.length && right.explicitIds.length) {
    return left.explicitIds.some((id) => right.explicitIds.includes(id));
  }
  const leftGrassroots = Array.isArray(left.rows) && left.rows.length && Object.prototype.hasOwnProperty.call(left.rows[0] || {}, "circuit");
  const rightGrassroots = Array.isArray(right.rows) && right.rows.length && Object.prototype.hasOwnProperty.call(right.rows[0] || {}, "circuit");
  if (leftGrassroots || rightGrassroots) {
    return canMergeGrassrootsCareerClusters(
      buildGrassrootsCareerClusterMeta(left.rows || []),
      buildGrassrootsCareerClusterMeta(right.rows || [])
    );
  }
  if (left.dobs.length && right.dobs.length && !left.dobs.some((dob) => right.dobs.includes(dob))) return false;
  if (left.draftPicks.length && right.draftPicks.length && !left.draftPicks.some((pick) => right.draftPicks.includes(pick))) return false;
  if (left.rookieYears.length && right.rookieYears.length && !left.rookieYears.some((year) => right.rookieYears.includes(year))) return false;
  if (left.heights.length && right.heights.length) {
    const compatibleHeight = left.heights.some((height) => right.heights.some((other) => Math.abs(height - other) <= 1));
    if (!compatibleHeight) return false;
  }
  if (left.maxYear >= right.minYear && right.maxYear >= left.minYear) return false;
  const gap = left.maxYear < right.minYear ? right.minYear - left.maxYear : left.minYear - right.maxYear;
  const hasExtraIdentity = (left.dobs.length && right.dobs.length)
    || (left.heights.length && right.heights.length)
    || (left.draftPicks.length && right.draftPicks.length)
    || (left.rookieYears.length && right.rookieYears.length);
  return gap <= (hasExtraIdentity ? 2 : 1);
}

function stripCompanionPrefix(column) {
  return getStringValue(column).replace(/^(?:ncaa|nba)_/i, "");
}

function shouldUseLatestCareerValue(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /^(season|age|height_in|inches|weight|weight_lb|bmi|dob|rookie_year|draft_pick|exp|adj_bpm)$/i.test(baseColumn);
}

function shouldMinCareerColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /(^draft_pick$|^rookie_year$)/i.test(baseColumn);
}

function shouldMaxCareerColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /peak|_max$|_high$|percentile$/i.test(baseColumn);
}

function shouldSumCareerColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /(^gp$|^g$|^gs$|^min$|^mp$|^pts$|^orb$|^drb$|^trb$|^reb$|^ast$|^stl$|^blk$|^stocks$|^tov$|^pf$|^fga$|^fgm$|^fta$|^ftm$|^tpa$|^tpm$|^2pa$|^2pm$|^3pa$|^3pm$|^two_pa$|^two_pm$|^three_pa$|^three_pm$|^total_poss$|^transition_poss$|^team_poss$|^opp_poss$|^fga_rim_75$|^fga_mid_75$|^fg3a_75$|^fta_75$|^ewins$|^ws$)/i.test(baseColumn)
    || /(_poss$|_pts$|_points$|_att$|_made$|_miss$|_fga$|_fta$|_ftm$|_fgm$|_pa$|_pm$|_reb$|_ast$|_stl$|_blk$|_tov$|_stocks$|_wins$|_losses$|_games$|_minutes$|_possessions$)/i.test(baseColumn);
}

function getCareerAggregationPlans(dataset) {
  if (dataset?._careerAggregationPlans) return dataset._careerAggregationPlans;
  const plans = (dataset?.meta?.numericColumns || [])
    .filter((column) => !shouldUseLatestCareerValue(column) && !/percentile$/i.test(stripCompanionPrefix(column)))
    .map((column) => {
      if (shouldMinCareerColumn(column)) return { column, mode: "min", weightMode: "" };
      if (shouldMaxCareerColumn(column)) return { column, mode: "max", weightMode: "" };
      if (shouldSumCareerColumn(column)) return { column, mode: "sum", weightMode: "" };
      return { column, mode: "weighted", weightMode: getCareerWeightMode(column) };
    });
  dataset._careerAggregationPlans = plans;
  return plans;
}

function getCareerWeightMode(column) {
  const baseColumn = stripCompanionPrefix(column);
  if (/(_ppp$|pct|rate|freq|share|three_pr|ftm_fga|ftr|ast_to|per$|ppr|fic|bpm|epm|porpag|adjoe|ortg|drtg|usg|off$|def$|tot$)/i.test(baseColumn)) {
    return "minutes";
  }
  if (/(_per40$|_pg$|_per100$|_75$)/i.test(baseColumn)) {
    return "minutes";
  }
  return "default";
}

function getCareerWeight(column, row) {
  if (getCareerWeightMode(column) === "minutes") {
    return Math.max(getMinutesValue(row), 1);
  }
  return Math.max(firstFinite(row.total_poss, estimatedPossessions(row), getMinutesValue(row), row.gp, 1), 1);
}

function sortRows(rows, sortBy, sortDir, dataset, blankMode = "last", sortMetric = "value") {
  if (!sortBy) return rows.slice();
  const direction = sortDir === "asc" ? 1 : -1;
  const isNumeric = dataset.meta.numericColumns.includes(sortBy);
  return rows
    .map((row, index) => {
      const value = isSplitDisplayColumn(sortBy) && sortMetric !== "value"
        ? getSplitSortMetricValue(row, sortBy, sortMetric)
        : getRowColumnValue(dataset, row, sortBy);
      return {
        row,
        index,
        value,
        blank: isBlankSortValue(value, sortBy, row),
        text: isNumeric ? "" : getStringValue(value),
      };
    })
    .sort((left, right) => {
      if (left.blank && right.blank) return left.index - right.index;
      if (left.blank) return blankMode === "first" ? -1 : 1;
      if (right.blank) return blankMode === "first" ? 1 : -1;
      if (isNumeric) {
        const diff = (left.value - right.value) * direction;
        return diff || (left.index - right.index);
      }
      const diff = left.text.localeCompare(right.text, undefined, { numeric: true, sensitivity: "base" }) * direction;
      return diff || (left.index - right.index);
    })
    .map((entry) => entry.row);
}

function isBlankSortValue(value, column, row) {
  if (column === "draft_pick" && row?._draftPickBlank) return true;
  return value == null || value === "" || (typeof value === "number" && Number.isNaN(value));
}

function renderTable(dataset, state, filtered, renderContext = {}) {
  const visibleColumns = renderContext.visibleColumns || getVisibleColumns(dataset, state);
  const rowsToRender = filtered.slice(0, state.visibleCount);
  const colorScale = renderContext.colorScale || getColorScale(dataset, state, visibleColumns);
  const relativeDisplayContext = renderContext.relativeDisplayContext || getRelativeDisplayContext(dataset, state, visibleColumns);
  const columnWidths = visibleColumns.map((column) => getColumnWidth(column, dataset));
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  const frameWidth = Math.min(totalWidth || 320, TABLE_FRAME_LIMIT);
  const shellKey = `${dataset.id}|${getUiStateRenderKey(state)}|${visibleColumns.join("|")}`;
  const needsShellRebuild = elements.statsTable.dataset.shellKey !== shellKey || !elements.statsTableHead || !elements.statsTableBody;
  elements.statsTable.dataset.datasetId = dataset.id;
  elements.tableWrapper.style.setProperty("--table-frame-width", `${frameWidth}px`);
  elements.statsTable.style.setProperty("--table-total-width", `${Math.max(totalWidth, 320)}px`);
  if (needsShellRebuild) {
    const colgroup = `<colgroup>${visibleColumns.map((column, index) => `<col style="width:${columnWidths[index]}px">`).join("")}</colgroup>`;
    elements.statsTable.innerHTML = `${colgroup}<thead id="statsTableHead"><tr>${visibleColumns.map((column, index) => renderHeaderCell(dataset, state, column, index, visibleColumns)).join("")}</tr></thead><tbody id="statsTableBody"></tbody>`;
    elements.statsTable.dataset.shellKey = shellKey;
    elements.statsTableHead = document.getElementById("statsTableHead");
    elements.statsTableBody = document.getElementById("statsTableBody");

    elements.statsTableHead.querySelectorAll("[data-sort]").forEach((header) => {
      header.addEventListener("click", async () => {
        const column = header.dataset.sort;
        if (!column) return;
        cancelPendingInteractiveRenders();
        if (isDeferredSupplementColumn(dataset, column)) {
          await ensureDeferredColumnsReady(dataset, state, [column], { scope: "full" });
          if (appState.currentId !== dataset.id) return;
        }
        const nextSort = getNextSortState(column, state);
        state.sortBy = nextSort.sortBy;
        state.sortDir = nextSort.sortDir;
        state.sortMetric = nextSort.sortMetric;
        state.sortBlankMode = nextSort.sortBlankMode;
        renderResultsOnly(dataset, state);
      });
    });
    elements.statsTableBody.addEventListener("click", (event) => {
      const profileTarget = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      if (profileTarget) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const key = profileTarget.dataset.playerProfileKey;
        if (key) openPlayerProfileForKey(key);
        return;
      }
      const rowElement = event.target instanceof Element ? event.target.closest("tr") : null;
      if (rowElement && shouldToggleSelectedRow(dataset, event)) {
        rowElement.classList.toggle("is-selected");
      }
    });
    elements.statsTableBody.addEventListener("dblclick", (event) => {
      const profileTarget = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      if (profileTarget) return;
      const rowElement = event.target instanceof Element ? event.target.closest("tr") : null;
      if (rowElement && !rowElement.classList.contains("empty-state")) {
        rowElement.classList.toggle("is-selected");
      }
    });
    elements.statsTableBody.addEventListener("pointerdown", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      const key = target?.dataset?.playerProfileKey;
      if (key) prefetchPlayerProfileForKey(key);
    });
    elements.statsTableBody.addEventListener("contextmenu", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      const key = target?.dataset?.playerProfileKey;
      if (key) prefetchPlayerProfileForKey(key);
    });
    elements.statsTableBody.addEventListener("mouseover", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      const key = target?.dataset?.playerProfileKey;
      if (key) prefetchPlayerProfileForKey(key);
    });
    elements.statsTableBody.addEventListener("focusin", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-player-profile-key]") : null;
      const key = target?.dataset?.playerProfileKey;
      if (key) prefetchPlayerProfileForKey(key);
    });
  }

  appState.playerProfileRows = new Map();
  if (!rowsToRender.length) {
    elements.statsTableBody.innerHTML = `<tr class="empty-state"><td colspan="${Math.max(visibleColumns.length, 1)}">No rows matched the current filters.</td></tr>`;
  } else {
    elements.statsTableBody.innerHTML = rowsToRender
      .map((row, index) => `<tr>${visibleColumns.map((column, columnIndex) => renderBodyCell(dataset, state, column, row, index, colorScale, relativeDisplayContext, columnIndex, visibleColumns)).join("")}</tr>`)
      .join("");
  }

  updateLoadMoreButton(filtered.length, rowsToRender.length);
  scheduleAdaptiveTeamTextSizing();
}

function scheduleAdaptiveTeamTextSizing() {
  if (appState.adaptiveTeamTextFrame) window.cancelAnimationFrame(appState.adaptiveTeamTextFrame);
  appState.adaptiveTeamTextFrame = window.requestAnimationFrame(() => {
    appState.adaptiveTeamTextFrame = 0;
    syncAdaptiveTeamTextSizing();
  });
}

function syncAdaptiveTeamTextSizing() {
  const table = elements.statsTable;
  if (!table) return;
  table.querySelectorAll(
    "th.cell-name-text, th.cell-team-text, th.cell-compact-text, th.cell-wrap, th.cell-small-text, "
    + "td.cell-name-text, td.cell-team-text, td.cell-compact-text, td.cell-wrap, td.cell-small-text"
  ).forEach((cell) => {
    cell.classList.remove("cell-team-overflow");
    cell.classList.remove("cell-text-overflow-sm");
    cell.classList.remove("cell-text-overflow-xs");
    cell.style.fontSize = "";
    cell.style.lineHeight = "";
    if (!cell.textContent.trim()) return;
    const availableWidth = Math.max(cell.clientWidth - 1, 1);
    const overflowRatio = cell.scrollWidth / availableWidth;
    if (!(overflowRatio > 1.03)) return;
    if (overflowRatio >= 1.5) {
      cell.classList.add("cell-text-overflow-xs");
    } else if (overflowRatio >= 1.12) {
      cell.classList.add("cell-text-overflow-sm");
    }
    const computed = window.getComputedStyle(cell);
    const baseFontSize = Number.parseFloat(computed.fontSize) || 8;
    const targetFontSize = Math.max(5.7, Math.min(baseFontSize, baseFontSize / Math.min(overflowRatio, 2.25)));
    if (targetFontSize < baseFontSize - 0.05) {
      cell.style.fontSize = `${roundNumber(targetFontSize, 2)}px`;
      cell.style.lineHeight = targetFontSize < 6.5 ? "0.95" : "1";
    }
    if (cell.matches("td.cell-team-text, td.cell-name-text") && overflowRatio >= 1.16) {
      cell.classList.add("cell-team-overflow");
    }
  });
}

function getRelativeDisplayContext(dataset, state, visibleColumns) {
  const mode = getRelativeDisplayMode(state);
  if (!mode) return null;
  const columns = Array.from(new Set((visibleColumns || [])
    .filter(isRelativeDisplayColumn)
    .map(getRelativeDisplayBaseColumn)
    .filter((column) => shouldColorColumn(dataset, column))));
  if (!columns.length) return null;
  const scopedState = {
    ...state,
    extraSelects: {
      ...(state?.extraSelects || {}),
      color_mode: mode.scope === "year" ? "year" : "overall",
    },
  };
  const colorRows = getColorPopulation(dataset, scopedState);
  return {
    mode,
    state: scopedState,
    scales: buildColumnScales(dataset, scopedState, columns, colorRows),
  };
}

function getRelativeDisplayCellData(dataset, row, column, relativeDisplayContext) {
  if (!relativeDisplayContext) return null;
  const baseColumn = getRelativeDisplayBaseColumn(column);
  const value = getRowColumnValue(dataset, row, baseColumn);
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const bucketKey = getColorBucketKey(relativeDisplayContext.state, row);
  const distribution = relativeDisplayContext.scales?.[baseColumn]?.[bucketKey] || relativeDisplayContext.scales?.[baseColumn]?.all;
  if (!distribution) return null;
  let pct = percentileFromDistribution(distribution, value);
  if (pct == null) return null;
  if (isInverseColorColumn(baseColumn)) pct = 1 - pct;
  if (isInverseShotAssistColorColumn(baseColumn)) pct = 1 - pct;
  const metric = getRelativeDisplayMetric(column)?.metric || relativeDisplayContext.mode?.metric || "pctile";
  if (metric === "rank") {
    const sampleCount = getDistributionSampleCount(distribution);
    if (!(sampleCount > 0)) return null;
    const rank = 1 + Math.round((1 - pct) * Math.max(0, sampleCount - 1));
    return { value: rank, pct };
  }
  return { value: roundNumber(pct * 100, 0), pct };
}

function getDistributionSampleCount(distribution) {
  if (Array.isArray(distribution)) return distribution.length;
  return Array.isArray(distribution?.values) ? distribution.values.length : 0;
}

function getRelativeDisplayCellStyle(cellData) {
  if (!cellData || typeof cellData.pct !== "number" || !Number.isFinite(cellData.pct)) return "";
  const style = colorFromPercentile(cellData.pct);
  return `background-color: ${style.bg}; color: ${style.color};`;
}

function getColumnWidth(column, dataset) {
  const baseColumn = stripCompanionPrefix(column);
  if (isRelativeDisplayColumn(column)) return 38;
  if (column === "rank") return 24;
  if (dataset?.id === "capitanesreference") {
    if (isPlayerDisplayColumn(dataset, column)) return 130;
    if (baseColumn === "league_name" || baseColumn === "league_list") return 220;
    if (baseColumn === "team_name") return 300;
    if (baseColumn === "nationality" || baseColumn === "nationality_list") return 128;
    if (baseColumn === "height_in" || baseColumn === "weight_lb" || baseColumn === "age") return 42;
    if (baseColumn === "gp" || baseColumn === "mpg" || baseColumn === "win_pct") return 42;
    if (isSplitDisplayColumn(column)) return 44;
    return 42;
  }
  if (isSplitDisplayColumn(column)) return 74;
  if (baseColumn === dataset.yearColumn || baseColumn === "season") return 34;
  if (baseColumn === "age_range") return 48;
  if (isPlayerDisplayColumn(dataset, column)) {
    if (dataset.id === "nba") return 108;
    if (dataset.id === "player_career") return 106;
    if (dataset.id === "grassroots") return 108;
    return 104;
  }
  if (isTeamDisplayColumn(dataset, column)) {
    if (baseColumn === "team_full" || baseColumn === "current_team" || baseColumn === "pre_draft_team") return 98;
    if (dataset.id === "nba" && baseColumn === "team_name") return 58;
    if (dataset.id === "grassroots") return 78;
    if (dataset.id === "player_career") return 82;
    if (dataset.id === "international") return 84;
    return 76;
  }
  if (dataset.id === "player_career" && baseColumn === "profile_levels") return 96;
  if (dataset.id === "player_career" && baseColumn === "career_path") return 156;
  if (dataset.id === "player_career" && baseColumn === "league") return 84;
  if (dataset.id === "international" && baseColumn === "league_name") return 96;
  if (dataset.id === "international" && baseColumn === "team_abbrev") return 42;
  if (dataset.id === "grassroots" && baseColumn === "event_name") return 88;
  if (baseColumn === "event_group") return 188;
  if (baseColumn === "event_raw_name") return 220;
  if (baseColumn === "setting") return 56;
  if (baseColumn === "state") return 44;
  if (dataset.id === "grassroots" && baseColumn === "circuit") return 74;
  if (baseColumn === "ftm_fga") return 50;
  if (baseColumn === "rim_to_mid_att_ratio") return 42;
  if (baseColumn === "ast_stl_pg" || baseColumn === "ast_stl_per40") return 56;
  if (baseColumn === "blk_pf" || baseColumn === "stl_pf" || baseColumn === "stocks_pf") return 54;
  if (baseColumn === "three_pr_plus_ftm_fga") return 72;
  if (dataset.id === "team_coach" && isTeamCoachPlaytypeColumn(baseColumn)) return 56;
  if (dataset.id === "d1" && isD1PlaytypeColumn(baseColumn)) return 56;
  if (/player/i.test(baseColumn)) return 108;
  if (baseColumn === "competition_label") return 78;
  if (/^nationality$|^team_code$/.test(baseColumn)) return 52;
  if (baseColumn === "coach") return dataset.id === "team_coach" ? 64 : 74;
  if (/^conference$|^region$/.test(baseColumn)) return 42;
  if (/^division$|^level$/.test(baseColumn)) return 44;
  if (/^pos$|^pos_text$|class/.test(baseColumn)) return 28;
  if (/^(height_in|inches|age)$/.test(baseColumn)) return 30;
  if (/weight|bmi|rookie_year|draft_pick|dob/.test(baseColumn)) return 50;
  if (/^(gp|g|gs)$/.test(baseColumn)) return 24;
  if (/^(age|min|mp|mpg|min_per|total_poss|fga_rim_75|fga_mid_75|fg3a_75|drive_poss)$/.test(baseColumn)) return 36;
  if (/^three_pa_per100$|^three_p_per100$|^three_pa_per40$|^two_pa_per40$|_per40$|_pg$/.test(baseColumn)) return 42;
  if (/ppp$|^per$|^ppr$|^fic$|bpm|epm|ewins|^off$|^def$|^tot$|usg|porpag|dporpag|ortg|drtg|ast_to|three_pr|ftr/.test(baseColumn)) return 40;
  if (looksPercentColumn(baseColumn) || isPercentRatioColumn(baseColumn)) return 40;
  return 36;
}

function getColorPopulation(dataset, state) {
  const cache = getRenderCache(state);
  const viewMode = getStringValue(state?.extraSelects?.view_mode || "player");
  const minuteThreshold = getColorMinuteThreshold(dataset);
  const scoped = dataset.id === "grassroots"
    ? (viewMode === "career" ? (state?._careerCache?.rows || []) : getGrassrootsActiveScopeRows(dataset, state))
    : (viewMode === "career" ? getStaticCareerColorRows(dataset) : dataset?.rows);
  const splitKey = dataset?.id === "d1" ? getD1BartSplitMode(state) : "";
  const key = `${viewMode}|${splitKey}|${Number(dataset?._rowVersion) || 0}|${Array.isArray(scoped) ? scoped.length : 0}|${minuteThreshold}`;
  if (cache.colorRowsKey === key) return cache.colorRows;
  const qualified = (Array.isArray(scoped) ? scoped : []).filter((row) => (
    getMinutesValue(row) >= minuteThreshold
      && (dataset.id !== "grassroots" || getGamesValue(row) >= 2)
  ));
  const rows = qualified;
  cache.colorRowsKey = key;
  cache.colorRows = sampleColorRows(rows);
  return cache.colorRows;
}

function sampleColorRows(rows, limit = COLOR_SCALE_MAX_ROWS) {
  if (!Array.isArray(rows) || rows.length <= limit) return rows;
  const targetSize = Math.max(1, Math.min(limit, rows.length));
  const step = rows.length / targetSize;
  const sampled = [];
  for (let index = 0; index < targetSize; index += 1) {
    sampled.push(rows[Math.floor(index * step)]);
  }
  return sampled;
}

function getDatasetMinuteThreshold(dataset) {
  const value = Number(dataset?.minuteDefault);
  return Number.isFinite(value) && value >= 0 ? value : MINUTES_DEFAULT;
}

function getColorMinuteThreshold(dataset) {
  if (dataset?.id === "combine") return 0;
  if (dataset?.id === "team_coach") return 0;
  return Math.max(getDatasetMinuteThreshold(dataset), STATIC_PERCENTILE_MINUTES);
}

function getQualifiedMinuteThreshold(dataset, state) {
  const fallback = getDatasetMinuteThreshold(dataset);
  const minuteColumn = dataset?.meta?.minuteFilterColumn;
  const rawValue = minuteColumn ? state?.demoFilters?.[minuteColumn]?.min : "";
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getMinutesValue(row) {
  if (typeof row.mp === "number" && Number.isFinite(row.mp)) return row.mp;
  if (typeof row.min === "number" && Number.isFinite(row.min)) return row.min;
  if (typeof row.mpg === "number" && typeof row.gp === "number" && Number.isFinite(row.mpg) && Number.isFinite(row.gp)) {
    return row.mpg * row.gp;
  }
  return 0;
}

function getGamesValue(row) {
  if (typeof row.gp === "number" && Number.isFinite(row.gp)) return row.gp;
  if (typeof row.games === "number" && Number.isFinite(row.games)) return row.games;
  if (typeof row.Games === "number" && Number.isFinite(row.Games)) return row.Games;
  return 0;
}

function getColumnGroupFamilyForVisibleColumn(dataset, column) {
  const familyMap = dataset?.meta?.columnGroupFamily || {};
  const directFamily = getStringValue(familyMap[column]).trim();
  if (directFamily) return directFamily;
  const relativeBase = isRelativeDisplayColumn(column) ? getRelativeDisplayBaseColumn(column) : "";
  const companionBase = stripCompanionPrefix(relativeBase || column);
  return getStringValue(familyMap[relativeBase] || familyMap[companionBase]).trim();
}

function getColumnGroupEdgeClasses(dataset, columnIndex, visibleColumns) {
  const currentFamily = getColumnGroupFamilyForVisibleColumn(dataset, visibleColumns[columnIndex]);
  const previousFamily = columnIndex > 0 ? getColumnGroupFamilyForVisibleColumn(dataset, visibleColumns[columnIndex - 1]) : "";
  const nextFamily = columnIndex < visibleColumns.length - 1 ? getColumnGroupFamilyForVisibleColumn(dataset, visibleColumns[columnIndex + 1]) : "";
  const classes = [];
  if (columnIndex > 0 && currentFamily && currentFamily !== previousFamily) classes.push("cell-group-start");
  if (currentFamily && currentFamily !== nextFamily) classes.push("cell-group-end");
  return classes;
}

function renderHeaderCell(dataset, state, column, columnIndex = 0, visibleColumns = []) {
  const sortable = column !== "rank" && !isRelativeDisplayColumn(column);
  const classes = sortable ? ["is-sortable"] : [];
  const label = displayLabel(dataset, column);
  classes.push(...getColumnGroupEdgeClasses(dataset, columnIndex, visibleColumns));
  if (isWrapColumn(dataset, column)) classes.push("cell-wrap");
  if (isPlayerDisplayColumn(dataset, column)) classes.push("cell-name-text");
  if (isTeamDisplayColumn(dataset, column)) classes.push("cell-team-text");
  if (isCompactTextColumn(dataset, column)) classes.push("cell-compact-text");
  if (dataset.id === "grassroots" && ["team_name", "team_full", "event_name", "event_group", "event_raw_name", "circuit"].includes(column)) {
    classes.push("cell-small-text");
  }
  classes.push("cell-header-small");
  return `<th class="${classes.join(" ")}"${sortable ? ` data-sort="${escapeAttribute(column)}"` : ""}>${escapeHtml(label)}</th>`;
}

function getD1ShotProfileColumnsForMode(mode) {
  const normalizedMode = mode === "totals" || mode === "per_game" || mode === "per40" ? mode : "default";
  return D1_SHOT_PROFILE_COLUMNS
    .filter((item) => {
      const itemMode = item.mode || "always";
      if (normalizedMode === "default") return !!item.defaultVisible;
      if (normalizedMode === "totals") return itemMode === "totals" || itemMode === "always";
      return itemMode === normalizedMode || itemMode === "always";
    })
    .map((item) => item.key);
}

function getSplitDisplayConfig(column) {
  const baseColumn = stripCompanionPrefix(column);
  return {
    fg_pct: { madeKeys: ["fgm", "fg"], attKeys: ["fga"] },
    fgpct: { madeKeys: ["fgm", "fg"], attKeys: ["fga"] },
    dunk_pct: { madeKeys: ["dunk_made"], attKeys: ["dunk_att"] },
    rim_pct: { madeKeys: ["rim_made", "fgm_rim"], attKeys: ["rim_att", "fga_rim"] },
    fgpct_rim: { madeKeys: ["rim_made", "fgm_rim"], attKeys: ["rim_att", "fga_rim"] },
    mid_pct: { madeKeys: ["mid_made", "fgm_mid", "long2_made"], attKeys: ["mid_att", "fga_mid", "long2_att"] },
    fgpct_mid: { madeKeys: ["mid_made", "fgm_mid", "long2_made"], attKeys: ["mid_att", "fga_mid", "long2_att"] },
    two_p_pct: { madeKeys: ["two_p_made", "two_pm", "2pm"], attKeys: ["two_p_att", "two_pa", "2pa"] },
    "2p_pct": { madeKeys: ["two_p_made", "2pm", "two_pm"], attKeys: ["two_p_att", "2pa", "two_pa"] },
    fg2pct: { madeKeys: ["two_p_made", "2pm", "two_pm"], attKeys: ["two_p_att", "2pa", "two_pa"] },
    three_p_pct: { madeKeys: ["three_p_made", "three_pm", "3pm", "tpm"], attKeys: ["three_p_att", "three_pa", "3pa", "tpa"] },
    "3p_pct": { madeKeys: ["three_p_made", "3pm", "three_pm", "tpm"], attKeys: ["three_p_att", "3pa", "three_pa", "tpa"] },
    tp_pct: { madeKeys: ["three_p_made", "tpm", "3pm", "three_pm"], attKeys: ["three_p_att", "tpa", "3pa", "three_pa"] },
    fg3pct: { madeKeys: ["three_p_made", "tpm", "3pm", "three_pm"], attKeys: ["three_p_att", "tpa", "3pa", "three_pa"] },
    ft_pct: { madeKeys: ["ftm"], attKeys: ["fta"] },
    ftpct: { madeKeys: ["ftm"], attKeys: ["fta"] },
    rim_scoring_fg_pct: { madeKeys: ["rim_scoring_fgm"], attKeys: ["rim_scoring_fga"] },
    rim_iso_fg_pct: { madeKeys: ["rim_iso_fgm"], attKeys: ["rim_iso_fga"] },
    rim_pnr_fg_pct: { madeKeys: ["rim_pnr_fgm"], attKeys: ["rim_pnr_fga"] },
    rim_su_fg_pct: { madeKeys: ["rim_su_fgm"], attKeys: ["rim_su_fga"] },
  }[baseColumn] || null;
}

function isSplitDisplayColumn(column) {
  return Boolean(getSplitDisplayConfig(column));
}

function getSplitDisplayLabel(column) {
  const baseColumn = stripCompanionPrefix(column);
  return {
    fg_pct: "FG",
    fgpct: "FG",
    dunk_pct: "Dunks",
    rim_pct: "Close 2",
    fgpct_rim: "Close 2",
    mid_pct: "Far 2",
    fgpct_mid: "Far 2",
    two_p_pct: "2P",
    "2p_pct": "2P",
    fg2pct: "2P",
    three_p_pct: "3P",
    "3p_pct": "3P",
    tp_pct: "3P",
    fg3pct: "3P",
    ft_pct: "FT",
    ftpct: "FT",
    rim_scoring_fg_pct: "Created Rim",
    rim_iso_fg_pct: "Iso Rim",
    rim_pnr_fg_pct: "PnR Rim",
    rim_su_fg_pct: "SU Rim",
  }[baseColumn] || "";
}

function getSplitDisplayStats(row, column) {
  const config = getSplitDisplayConfig(column);
  if (!config || !row) return null;
  const made = firstFinite(...config.madeKeys.map((key) => row?.[key]), Number.NaN);
  const att = firstFinite(...config.attKeys.map((key) => row?.[key]), Number.NaN);
  if (!Number.isFinite(made) || !Number.isFinite(att)) return null;
  let pctValue = Number.isFinite(made) && Number.isFinite(att) && att > 0
    ? percentIfPossible(made, att)
    : Number.NaN;
  if (!Number.isFinite(pctValue)) pctValue = firstFinite(row?.[column], Number.NaN);
  const normalizedPct = Number.isFinite(pctValue)
    ? (Math.abs(pctValue) <= 1.5 ? pctValue * 100 : pctValue)
    : Number.NaN;
  if (!Number.isFinite(normalizedPct)) return null;
  return {
    made,
    att,
    pctValue: normalizedPct,
    ratio: Number.isFinite(normalizedPct) ? normalizedPct / 100 : Number.NaN,
  };
}

function formatSplitDisplayPct(value) {
  if (!Number.isFinite(value)) return "";
  const clamped = Math.max(0, Math.min(1, value));
  const text = clamped.toFixed(3);
  return clamped < 1 ? text.replace(/^0/, "") : text;
}

function formatSplitDisplayPctForDataset(dataset, value) {
  if (!Number.isFinite(value)) return "";
  if (dataset?.id === "capitanesreference") return (Math.max(0, Math.min(1, value)) * 100).toFixed(1);
  return formatSplitDisplayPct(value);
}

function getSplitSortMetricValue(row, column, metric = "pct") {
  const stats = getSplitDisplayStats(row, column);
  if (!stats) {
    if (metric !== "pct") return Number.NaN;
    const fallback = firstFinite(row?.[column], Number.NaN);
    if (!Number.isFinite(fallback)) return Number.NaN;
    return Math.abs(fallback) <= 1.5 ? fallback * 100 : fallback;
  }
  if (metric === "att") return stats.att;
  if (metric === "made") return stats.made;
  return stats.pctValue;
}

const SPLIT_SORT_SEQUENCE = [
  { metric: "pct", dir: "desc" },
  { metric: "pct", dir: "asc" },
  { metric: "att", dir: "desc" },
  { metric: "att", dir: "asc" },
  { metric: "made", dir: "desc" },
  { metric: "made", dir: "asc" },
];

function getNextSortState(column, state) {
  if (isSplitDisplayColumn(column)) {
    const currentIndex = state.sortBy === column
      ? SPLIT_SORT_SEQUENCE.findIndex((item) => item.metric === getStringValue(state.sortMetric || "pct") && item.dir === state.sortDir)
      : -1;
    const next = SPLIT_SORT_SEQUENCE[(currentIndex + 1 + SPLIT_SORT_SEQUENCE.length) % SPLIT_SORT_SEQUENCE.length] || SPLIT_SORT_SEQUENCE[0];
    return {
      sortBy: column,
      sortDir: next.dir,
      sortMetric: next.metric,
      sortBlankMode: "last",
    };
  }
  if (state.sortBy === column) {
    if (state.sortDir === "desc" && state.sortBlankMode !== "first") {
      return { sortBy: column, sortDir: "asc", sortMetric: "value", sortBlankMode: "last" };
    }
    if (state.sortDir === "asc") {
      return { sortBy: column, sortDir: "desc", sortMetric: "value", sortBlankMode: "first" };
    }
    return { sortBy: column, sortDir: "desc", sortMetric: "value", sortBlankMode: "last" };
  }
  return { sortBy: column, sortDir: "desc", sortMetric: "value", sortBlankMode: "last" };
}

function updateLoadMoreButton(totalRows, renderedRows) {
  elements.loadMoreBtn.hidden = renderedRows >= totalRows;
}

function shouldToggleSelectedRow(dataset, event) {
  const cell = event.target instanceof Element ? event.target.closest("td[data-column]") : null;
  if (!cell || !dataset) return false;
  const column = getStringValue(cell.dataset.column).trim();
  if (!column) return false;
  const rect = cell.getBoundingClientRect();
  if (!(rect.width > 0)) return false;
  const localX = event.clientX - rect.left;
  const gutterWidth = Math.max(8, Math.min(14, rect.width * 0.18));
  if (isPlayerDisplayColumn(dataset, column)) return localX >= rect.width - gutterWidth;
  if (isTeamDisplayColumn(dataset, column)) return localX <= gutterWidth;
  return false;
}

function renderBodyCell(dataset, state, column, row, index, colorScale, relativeDisplayContext = null, columnIndex = 0, visibleColumns = []) {
  const relativeDisplayCell = isRelativeDisplayColumn(column)
    ? getRelativeDisplayCellData(dataset, row, column, relativeDisplayContext)
    : null;
  const rawValue = relativeDisplayCell
    ? relativeDisplayCell.value
    : column === "rank"
    ? index + 1
    : getRowColumnValue(dataset, row, column);
  const display = sanitizeCellDisplayValue(formatValue(dataset, column, rawValue, row));
  const splitStats = !relativeDisplayCell && isSplitDisplayColumn(column)
    ? getSplitDisplayStats(row, column)
    : null;
  const classes = [];
  if (isLeftAligned(dataset, column)) classes.push("cell-left");
  if (isWrapColumn(dataset, column)) classes.push("cell-wrap");
  if (isPlayerDisplayColumn(dataset, column)) classes.push("cell-name-text");
  if (isTeamDisplayColumn(dataset, column)) classes.push("cell-team-text");
  if (isCompactTextColumn(dataset, column)) classes.push("cell-compact-text");
  classes.push(...getColumnGroupEdgeClasses(dataset, columnIndex, visibleColumns));
  if (dataset.id === "grassroots" && ["team_name", "team_full", "event_name", "event_group", "event_raw_name", "circuit"].includes(column)) {
    classes.push("cell-small-text");
  }
  if (typeof rawValue === "number" && rawValue < 0) classes.push("negative");
  const style = relativeDisplayCell
    ? getRelativeDisplayCellStyle(relativeDisplayCell)
    : getCellStyle(dataset, state, column, rawValue, colorScale, row);
  const styleAttribute = splitStats ? "" : (style ? ` style="${escapeAttribute(style)}"` : "");
  const splitPctText = splitStats ? formatSplitDisplayPctForDataset(dataset, splitStats.ratio) : "";
  const splitDisplay = splitStats
    ? `${Number.isFinite(splitStats.made) ? Math.round(splitStats.made) : 0}-${Number.isFinite(splitStats.att) ? Math.round(splitStats.att) : 0} ${splitPctText}`
    : "";
  const titleAttribute = splitStats
    ? ` title="${escapeAttribute(splitDisplay.trim())}"`
    : (rawValue != null && rawValue !== "" ? ` title="${escapeAttribute(display)}"` : "");
  const splitContent = splitStats
    ? `<span class="split-display"><span class="split-display__pair"><span class="split-display__made">${escapeHtml(Number.isFinite(splitStats.made) ? Math.round(splitStats.made) : 0)}</span><span class="split-display__sep">-</span><span class="split-display__att">${escapeHtml(Number.isFinite(splitStats.att) ? Math.round(splitStats.att) : 0)}</span></span><span class="split-display__pct"${style ? ` style="${escapeAttribute(style)}"` : ""}>${escapeHtml(splitPctText)}</span></span>`
    : "";
  const content = display && isPlayerDisplayColumn(dataset, column)
    ? (dataset.id === "capitanesreference" && getStringValue(row.realgm_summary_url).trim()
      ? `<a class="player-season-link" href="${escapeAttribute(getStringValue(row.realgm_summary_url).trim())}" target="_blank" rel="noopener noreferrer">${escapeHtml(display)}</a>`
      : `<a class="player-season-link" href="${escapeAttribute(buildPlayerProfileHref(row, dataset.id))}" data-player-profile-key="${escapeAttribute(registerPlayerProfileRow(dataset, row))}">${escapeHtml(display)}</a>`)
    : (splitContent || escapeHtml(display));
  return `<td class="${classes.join(" ")}" data-column="${escapeAttribute(column)}"${styleAttribute}${titleAttribute}>${content}</td>`;
}

function buildPlayerProfileHref(row, datasetId = "") {
  const params = new URLSearchParams();
  const name = getPlayerProfileDisplayName(row);
  if (name) params.set("name", name);
  const realgmId = getStatusIdentityId(row) || getStringValue(row?.realgm_player_id).trim();
  if (realgmId) params.set("rgm", realgmId);
  const canonical = getStringValue(row?.canonical_player_id).trim();
  if (canonical) params.set("canonical", canonical);
  const source = getStringValue(row?.source_player_id || row?.player_id || row?.pid || row?.id).trim();
  if (source) params.set("source", source);
  const profileKey = getStringValue(row?.player_profile_key).trim();
  if (profileKey) params.set("profile_key", profileKey);
  const dob = getStringValue(row?.dob || row?.birthday).trim();
  if (dob) params.set("dob", dob);
  const height = firstPositiveFinite(row?.height_in, row?.inches, Number.NaN);
  if (Number.isFinite(height)) params.set("height", String(roundNumber(height, 2)));
  const pick = Number.isFinite(row?.draft_pick) && !row?._draftPickBlank ? Math.round(row.draft_pick) : Number.NaN;
  if (Number.isFinite(pick) && pick > 0 && pick <= 60) params.set("pick", String(pick));
  if (datasetId) params.set("dataset", datasetId);
  const hash = `#${PROFILE_ROUTE_ID}?${params.toString()}`;
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.pathname}${window.location.search}${hash}`;
  }
  return hash;
}

function registerPlayerProfileRow(dataset, row) {
  const key = `${dataset?.id || "dataset"}:${appState.playerProfileRows.size}`;
  appState.playerProfileRows.set(key, { datasetId: dataset?.id || "", row });
  return key;
}

function prefetchPlayerProfileForKey(key) {
  const entry = appState.playerProfileRows.get(key);
  if (!entry?.row) return;
  prefetchPlayerProfileBuckets(buildPlayerProfileIdentity(entry.row));
}

async function openPlayerProfileForKey(key) {
  const entry = appState.playerProfileRows.get(key);
  if (!entry?.row) return;
  await openPlayerProfile(entry.row, entry.datasetId);
}

async function openPlayerProfile(row, datasetId = "") {
  const modal = getOrCreatePlayerProfileModal();
  const name = getPlayerProfileDisplayName(row);
  const requestId = String(++appState.playerProfileRequestSeq);
  modal.dataset.playerProfileRequestId = requestId;
  modal.hidden = false;
  modal.classList.add("is-open");
  modal.querySelector("[data-player-profile-content]").innerHTML = `<div class="player-profile-loading">Loading ${escapeHtml(name || "player")} seasons...</div>`;
  try {
    const rows = await loadPlayerProfileRowsProgressively(row, datasetId, (nextRows, meta = {}) => {
      if (modal.dataset.playerProfileRequestId !== requestId) return;
      renderPlayerProfileModal(modal, name, nextRows, { loadingMore: Boolean(meta.loadingMore) });
    });
    if (modal.dataset.playerProfileRequestId !== requestId) return;
    renderPlayerProfileModal(modal, name, rows, { loadingMore: false });
  } catch (error) {
    if (modal.dataset.playerProfileRequestId !== requestId) return;
    modal.querySelector("[data-player-profile-content]").innerHTML = `<div class="player-profile-loading">Unable to load seasons: ${escapeHtml(getStringValue(error?.message || error))}</div>`;
  }
}

function getOrCreatePlayerProfileModal() {
  let modal = document.getElementById("playerProfileModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "playerProfileModal";
  modal.className = "player-profile-overlay";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="player-profile-modal" role="dialog" aria-modal="true" aria-label="Player seasons">
      <button class="player-profile-close" type="button" data-player-profile-close>Close</button>
      <div data-player-profile-content></div>
    </div>
  `;
  modal.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target === modal || target.closest("[data-player-profile-close]")) closePlayerProfileModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closePlayerProfileModal();
  });
  document.body.appendChild(modal);
  return modal;
}

function closePlayerProfileModal() {
  const modal = document.getElementById("playerProfileModal");
  if (!modal) return;
  modal.dataset.playerProfileRequestId = String(++appState.playerProfileRequestSeq);
  modal.classList.remove("is-open");
  modal.hidden = true;
}

async function loadPlayerProfileBucketManifest() {
  if (window.PLAYER_PROFILE_BUCKET_MANIFEST) return window.PLAYER_PROFILE_BUCKET_MANIFEST;
  if (!appState.playerProfileBucketManifestLoad) {
    appState.playerProfileBucketManifestLoad = loadScriptOnce(PLAYER_PROFILE_BUCKET_MANIFEST_SCRIPT)
      .then(() => window.PLAYER_PROFILE_BUCKET_MANIFEST || null);
  }
  return appState.playerProfileBucketManifestLoad;
}

function getPlayerProfileRealgmIds(identity) {
  const ids = new Set();
  (identity?.ids || new Set()).forEach((value) => {
    const match = getStringValue(value).trim().match(/^rgm:(\d+)$/i);
    if (match) ids.add(match[1]);
  });
  return Array.from(ids);
}

function getPlayerProfileBucketKey(realgmId, manifest) {
  const id = Number(realgmId);
  const bucketCount = Number(manifest?.bucketCount);
  if (!Number.isFinite(id) || id <= 0 || !Number.isFinite(bucketCount) || bucketCount <= 0) return "";
  return `r${String(id % bucketCount).padStart(3, "0")}`;
}

function getPlayerProfileBucketPath(manifest, key) {
  const template = getStringValue(manifest?.pathTemplate || "data/vendor/player_profile_buckets/{bucket}.js");
  return template.replace("{bucket}", key);
}

async function loadPlayerProfileBucketRows(key, manifest) {
  if (!key) return [];
  if (appState.playerProfileBucketRows.has(key)) return appState.playerProfileBucketRows.get(key);
  if (!appState.playerProfileBucketLoads.has(key)) {
    const promise = (async () => {
      await loadScriptOnce(getPlayerProfileBucketPath(manifest, key));
      const encodedRows = window.PLAYER_PROFILE_BUCKETS?.[key] || [];
      const rows = decodePlayerProfileBucketRows(encodedRows, manifest);
      appState.playerProfileBucketRows.set(key, rows);
      return rows;
    })().catch((error) => {
      appState.playerProfileBucketLoads.delete(key);
      throw error;
    });
    appState.playerProfileBucketLoads.set(key, promise);
  }
  return appState.playerProfileBucketLoads.get(key);
}

function decodePlayerProfileBucketRows(encodedRows, manifest) {
  const columns = Array.isArray(manifest?.columns) ? manifest.columns : [];
  return (Array.isArray(encodedRows) ? encodedRows : []).map((values) => {
    const row = {};
    columns.forEach((column, index) => {
      if (!column || !Array.isArray(values) || index >= values.length) return;
      const value = values[index];
      if (value == null || value === "") return;
      row[column] = value;
    });
    preparePlayerCareerLoadedRow(row);
    normalizePercentLikeColumns(row, "player_career");
    return row;
  });
}

function getPlayerProfileBucketKeys(identity, manifest) {
  const availableFiles = new Set(Array.isArray(manifest?.files) ? manifest.files : []);
  return getPlayerProfileRealgmIds(identity)
    .map((realgmId) => getPlayerProfileBucketKey(realgmId, manifest))
    .filter((key, index, keys) => key && keys.indexOf(key) === index && (!availableFiles.size || availableFiles.has(key)));
}

async function collectPlayerProfileBucketRows(identity) {
  const manifest = await loadPlayerProfileBucketManifest();
  const bucketKeys = getPlayerProfileBucketKeys(identity, manifest);
  if (!bucketKeys.length) return [];
  const bucketRows = await Promise.all(bucketKeys.map((key) => loadPlayerProfileBucketRows(key, manifest)));
  const rows = [];
  const seen = new Set();
  bucketRows.flat().forEach((row) => {
    if (!rowMatchesPlayerProfile(row, identity) || seen.has(row)) return;
    seen.add(row);
    rows.push(row);
  });
  return rows;
}

async function ensureD1FoulLookupLoaded() {
  if (window.D1_FOUL_LOOKUP) return window.D1_FOUL_LOOKUP;
  if (!appState.d1FoulLookupLoad) {
    appState.d1FoulLookupLoad = loadScriptOnce(`${D1_FOUL_LOOKUP_SCRIPT}?v=${encodeURIComponent(SCRIPT_CACHE_BUST)}`)
      .then(() => window.D1_FOUL_LOOKUP || {});
  }
  return appState.d1FoulLookupLoad;
}

async function applyD1ProfileFoulLookup(rows) {
  const needsLookup = (rows || []).some((row) => {
    const level = normalizeProfileLevel(row);
    return level === "D1" && (!Number.isFinite(row?.pf) || !Number.isFinite(row?.pf_pg) || !Number.isFinite(row?.pf_per40));
  });
  if (!needsLookup) return rows || [];
  try {
    const lookup = await ensureD1FoulLookupLoaded();
    (rows || []).forEach((row) => applyD1ProfileFoulLookupRow(row, lookup));
  } catch (error) {
    console.warn("D1 foul lookup failed to load.", error);
  }
  return rows || [];
}

function applyD1ProfileFoulLookupRow(row, lookup) {
  if (!row || normalizeProfileLevel(row) !== "D1") return;
  const season = getStringValue(row.season).trim();
  const candidateIds = [
    row.realgm_player_id,
    row.source_player_id,
    row.player_id,
    row.pid,
    row.canonical_player_id,
  ].map((value) => getStringValue(value).replace(/^rgm_/i, "").trim()).filter(Boolean);
  if (!season || !candidateIds.length) return;
  const entry = candidateIds.map((id) => lookup?.[`${id}|${season}`]).find(Boolean);
  if (!entry) return;
  const values = Array.isArray(entry)
    ? { pf: entry[0], pf_pg: entry[1], pf_per40: entry[2] }
    : entry;
  ["pf", "pf_pg", "pf_per40"].forEach((column) => {
    const value = firstFinite(values[column], Number.NaN);
    if (Number.isFinite(value) && !Number.isFinite(row[column])) row[column] = value;
  });
}

function prefetchPlayerProfileBuckets(identity) {
  const realgmIds = getPlayerProfileRealgmIds(identity);
  if (!realgmIds.length) return;
  const key = realgmIds.sort().join("|");
  if (appState.playerProfileBucketPrefetches.has(key)) return;
  appState.playerProfileBucketPrefetches.add(key);
  loadPlayerProfileBucketManifest()
    .then((manifest) => {
      getPlayerProfileBucketKeys(identity, manifest).forEach((bucketKey) => {
        loadPlayerProfileBucketRows(bucketKey, manifest).catch((error) => {
          console.warn("Player profile bucket prefetch failed.", error);
        });
      });
    })
    .catch((error) => {
      console.warn("Player profile bucket manifest prefetch failed.", error);
    });
}

async function resolvePlayerProfileIdentity(identity) {
  if (getPlayerProfileRealgmIds(identity).length || !identity?.names?.size) return identity;
  try {
    const statusBundle = await loadStatusRealgmIndex();
    const statusMatch = findStatusProfileIdentityMatch(identity, statusBundle);
    if (statusMatch?.realgmId) {
      return {
        ...identity,
        ids: new Set([...(identity.ids || []), `rgm:${statusMatch.realgmId}`]),
        names: new Set(identity.names || []),
        dob: identity.dob || getStringValue(statusMatch.dob).trim(),
        height: Number.isFinite(identity.height) ? identity.height : firstPositiveFinite(statusMatch.height, Number.NaN),
      };
    }
    const index = await ensureGlobalPlayerSearchIndex();
    const match = Array.from(identity.names)
      .map((name) => (index || []).find((item) => item.key === name))
      .find((item) => item?.realgmId);
    if (!match?.realgmId) return identity;
    return {
      ...identity,
      ids: new Set([...(identity.ids || []), `rgm:${match.realgmId}`]),
      names: new Set(identity.names || []),
      dob: identity.dob || getStringValue(match.dob).trim(),
      height: Number.isFinite(identity.height) ? identity.height : firstPositiveFinite(match.height, Number.NaN),
    };
  } catch (error) {
    console.warn("Player profile identity lookup failed.", error);
    return identity;
  }
}

function findStatusProfileIdentityMatch(identity, bundle) {
  if (!identity?.names?.size || !bundle?.profiles) return null;
  let bestMatch = null;
  Object.entries(bundle.profiles || {}).forEach(([realgmId, entry]) => {
    const name = normalizeNameKey(Array.isArray(entry) ? entry[0] : entry?.name);
    if (!name || !identity.names.has(name)) return;
    const dob = getStringValue(Array.isArray(entry) ? entry[1] : entry?.dob).trim();
    if (identity.dob && dob && identity.dob !== dob) return;
    const heights = Array.isArray(Array.isArray(entry) ? entry[2] : entry?.heights)
      ? (Array.isArray(entry) ? entry[2] : entry.heights)
      : [];
    const height = heights
      .map((value) => Number(value))
      .find((value) => Number.isFinite(value) && value > 0);
    if (Number.isFinite(identity.height) && Number.isFinite(height) && Math.abs(identity.height - height) > 1) return;
    let score = 1;
    if (identity.dob && dob && identity.dob === dob) score += 10;
    else if (dob) score += 2;
    if (Number.isFinite(identity.height) && Number.isFinite(height) && Math.abs(identity.height - height) <= 1) score += 6;
    else if (Number.isFinite(height)) score += 1;
    const candidate = {
      realgmId: getStringValue(realgmId).trim(),
      dob,
      height: Number.isFinite(height) ? height : Number.NaN,
      score,
    };
    if (!bestMatch || candidate.score > bestMatch.score) bestMatch = candidate;
  });
  return bestMatch;
}

async function loadPlayerProfileYearIndex() {
  if (window.PLAYER_PROFILE_YEAR_INDEX) return window.PLAYER_PROFILE_YEAR_INDEX;
  if (!appState.playerProfileYearIndexLoad) {
    appState.playerProfileYearIndexLoad = loadScriptOnce(PLAYER_PROFILE_YEAR_INDEX_SCRIPT)
      .then(() => window.PLAYER_PROFILE_YEAR_INDEX || {});
  }
  return appState.playerProfileYearIndexLoad;
}

async function getPlayerProfileCandidateYears(dataset, identity) {
  const availableSet = new Set(getPlayerCareerAvailableYears(dataset).map((season) => getStringValue(season).trim()).filter(Boolean));
  const years = new Set();
  try {
    const index = await loadPlayerProfileYearIndex();
    (identity?.ids || new Set()).forEach((id) => {
      const text = getStringValue(id).trim();
      const realgm = text.match(/^rgm:(.+)$/i);
      if (realgm) {
        (index?.realgm?.[realgm[1]] || []).forEach((season) => {
          const year = getStringValue(season).trim();
          if (!availableSet.size || availableSet.has(year)) years.add(year);
        });
      }
      (index?.ids?.[text] || []).forEach((season) => {
        const year = getStringValue(season).trim();
        if (!availableSet.size || availableSet.has(year)) years.add(year);
      });
    });
    (identity?.names || new Set()).forEach((name) => {
      (index?.names?.[name] || []).forEach((season) => {
        const year = getStringValue(season).trim();
        if (!availableSet.size || availableSet.has(year)) years.add(year);
      });
    });
  } catch (error) {
    console.warn("Player profile year index failed to load.", error);
  }
  return Array.from(years).sort(compareYears);
}

async function loadPlayerCareerProfileCsvText(config, season) {
  const year = getStringValue(season).trim();
  if (!year) return "";
  const chunkMap = window.PLAYER_CAREER_YEAR_CSV_CHUNKS = window.PLAYER_CAREER_YEAR_CSV_CHUNKS || {};
  if (chunkMap[year]) return chunkMap[year];
  const partPaths = getPlayerCareerYearChunkPartPaths(config, year);
  if (partPaths.length) {
    chunkMap[year] = "";
    await loadScriptsInOrder(partPaths);
    return chunkMap[year] || "";
  }
  const src = getPlayerCareerYearChunkPath(config, year);
  if (!src) return "";
  await loadScriptOnce(src);
  return chunkMap[year] || "";
}

function getPlayerCareerProfileLineFragments(identity) {
  const fragments = new Set();
  (identity?.names || new Set()).forEach((name) => {
    const key = normalizeNameKey(name);
    if (key) fragments.add(key);
  });
  (identity?.ids || new Set()).forEach((value) => {
    const text = getStringValue(value).trim();
    if (!text) return;
    fragments.add(text.toLowerCase());
    const realgm = text.match(/^rgm:(.+)$/i);
    const generic = text.match(/^id:(.+)$/i);
    if (realgm) {
      fragments.add(`rgm_${realgm[1]}`.toLowerCase());
      fragments.add(getStringValue(realgm[1]).toLowerCase());
    }
    if (generic) fragments.add(getStringValue(generic[1]).toLowerCase());
  });
  return Array.from(fragments).filter((value) => value && value.length >= 2);
}

function filterPlayerCareerProfileCsv(csvText, identity) {
  const text = getStringValue(csvText);
  const headerEnd = text.indexOf("\n");
  if (headerEnd < 0) return "";
  const header = text.slice(0, headerEnd);
  const fragments = getPlayerCareerProfileLineFragments(identity);
  if (!fragments.length) return "";
  const matchedLines = [];
  let start = headerEnd + 1;
  while (start < text.length) {
    const end = text.indexOf("\n", start);
    const line = text.slice(start, end === -1 ? text.length : end);
    const lower = line.toLowerCase();
    if (fragments.some((fragment) => lower.includes(fragment))) matchedLines.push(line);
    if (end === -1) break;
    start = end + 1;
  }
  return matchedLines.length ? `${header}\n${matchedLines.join("\n")}` : "";
}

async function loadPlayerCareerProfileRows(identity, options = {}) {
  const config = DATASETS.player_career;
  if (config.yearManifestScript) await loadScriptOnce(config.yearManifestScript);
  await Promise.all([
    PLAYER_BIO_LOOKUP_SCRIPT,
    INTERNATIONAL_PROFILE_BIO_LOOKUP_SCRIPT,
    WINGSPAN_LOOKUP_SCRIPT,
  ].map((script) => loadScriptOnce(script).catch(() => undefined)));
  applyPlayerCareerManifestConfig(config);
  const shellDataset = { id: "player_career", rows: [], availableYears: getPlayerCareerAvailableYears(config), _loadedYears: new Set() };
  const requestedYears = Array.isArray(options?.requestedYears)
    ? options.requestedYears.map((season) => getStringValue(season).trim()).filter(Boolean)
    : [];
  const years = requestedYears.length ? requestedYears : await getPlayerProfileCandidateYears(shellDataset, identity);
  const rows = [];
  for (const season of years) {
    const csvText = await loadPlayerCareerProfileCsvText(config, season);
    const filteredCsv = filterPlayerCareerProfileCsv(csvText, identity);
    if (!filteredCsv) continue;
    rows.push(...parseDatasetRows(filteredCsv, "player_career", config, { ...options, skipEnhance: true }));
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }
  rows.forEach((row) => {
    preparePlayerCareerLoadedRow(row);
    normalizePercentLikeColumns(row, "player_career");
  });
  const matchedRows = rows.filter((row) => rowMatchesPlayerProfile(row, identity));
  const needsInternationalOverlay = matchedRows.some((row) => normalizeProfileLevel(row) === "International" || isPlayerCareerInternationalRow(row));
  if (!needsInternationalOverlay) return matchedRows;
  const overlayEntries = (config.extraScripts || []).filter((entry) => isMultipartScriptEntry(entry));
  if (overlayEntries.length) await Promise.all(overlayEntries.map((entry) => loadScriptEntry(entry)));
  const tempDataset = { ...config, id: "player_career", rows: matchedRows, meta: buildDatasetMeta(matchedRows, config) };
  applyPlayerCareerInternationalOverlay(tempDataset, config);
  return tempDataset.rows || matchedRows;
}

async function ensurePlayerCareerProfileSourceLoaded(identity, options = {}) {
  const dataset = await ensureDatasetLoaded("player_career", { profileOnly: true });
  if (dataset?._playerCareerChunked) {
    const requestedYears = Array.isArray(options?.requestedYears)
      ? options.requestedYears.map((season) => getStringValue(season).trim()).filter(Boolean)
      : [];
    const years = requestedYears.length ? requestedYears : await getPlayerProfileCandidateYears(dataset, identity);
    const missingYears = years.filter((season) => !getLoadedYearSet(dataset).has(getStringValue(season).trim()));
    if (missingYears.length) {
      if (!options?.silent) elements.statusPill.textContent = "Loading Player/Career seasons";
      await loadPlayerCareerRowsForYears(dataset, DATASETS.player_career, missingYears, { background: true });
    }
  }
  if (dataset && !dataset._playerCareerInternationalOverlayApplied) {
    if (DATASETS.player_career.extraScripts?.length) {
      await Promise.all(DATASETS.player_career.extraScripts.map((entry) => loadScriptEntry(entry)));
    }
    applyPlayerCareerInternationalOverlay(dataset, DATASETS.player_career);
  }
  return dataset;
}

async function resolvePlayerProfileSourceContext(sourceRow, datasetId = "") {
  const currentDatasetId = getStringValue(datasetId || sourceRow?.dataset || sourceRow?.source_dataset).trim();
  let currentDataset = currentDatasetId ? (appState.datasetCache[currentDatasetId] || null) : null;
  const baseIdentity = buildPlayerProfileIdentity(sourceRow);
  let identity = getPlayerProfileRealgmIds(baseIdentity).length
    ? baseIdentity
    : await resolvePlayerProfileIdentity(baseIdentity);
  let bucketRows = [];
  let bucketAttempted = false;
  try {
    bucketAttempted = getPlayerProfileRealgmIds(identity).length > 0;
    bucketRows = await collectPlayerProfileBucketRows(identity);
  } catch (error) {
    console.warn("Player profile bucket source failed to load.", error);
  }
  const currentDatasetShouldLoad = Boolean(currentDatasetId && DATASETS[currentDatasetId]) && (
    Boolean(currentDataset)
      || (!bucketRows.length && !bucketAttempted)
      || ["grassroots", "international", "fiba"].includes(normalizeKey(currentDatasetId))
  );
  if (!currentDataset && currentDatasetShouldLoad) {
    try {
      currentDataset = await ensureDatasetLoaded(currentDatasetId, currentDatasetId === "grassroots" ? { requireHydrated: true } : {});
    } catch (error) {
      console.warn("Player profile current dataset source failed to load.", error);
    }
  }
  const currentDatasetRows = currentDataset?.rows?.length
    ? collectIndexedPlayerProfileRows(currentDataset, identity)
    : [];
  if (currentDatasetRows.length && !getPlayerProfileRealgmIds(identity).length) {
    identity = await resolvePlayerProfileIdentity(extendPlayerProfileIdentity(identity, currentDatasetRows));
  } else if (currentDatasetRows.length) {
    identity = extendPlayerProfileIdentity(identity, currentDatasetRows);
  }
  return {
    currentDatasetId,
    currentDataset,
    currentDatasetRows,
    identity,
    bucketRows,
    bucketAttempted,
    shouldAugmentFromPlayerCareer: ["international", "fiba"].includes(normalizeKey(currentDatasetId)),
  };
}

function buildPlayerProfileSourceRows(sourceRow, context, playerCareerRows = []) {
  const rows = [];
  if (Array.isArray(context?.bucketRows) && context.bucketRows.length) rows.push(...context.bucketRows);
  if (Array.isArray(playerCareerRows) && playerCareerRows.length) {
    if (!rows.length && !context?.bucketAttempted) rows.push(...playerCareerRows);
    else rows.push(...playerCareerRows);
  }
  if (context?.currentDatasetRows?.length) {
    rows.push(...context.currentDatasetRows);
  } else if (context?.currentDataset?.rows?.length) {
    rows.push(...collectIndexedPlayerProfileRows(context.currentDataset, context.identity));
  }
  if (sourceRow && !(context?.currentDatasetRows?.length)) rows.push(sourceRow);
  return rows;
}

function playerProfileRowNeedsAugment(row) {
  if (!row || row._careerAggregate) return false;
  const sourceDataset = normalizeKey(row?.source_dataset);
  const level = normalizeProfileLevel(row);
  if (!sourceDataset.startsWith("realgm") && !["NBA", "International", "FIBA", "G League"].includes(level)) return false;
  const populatedAdvancedCount = [
    "orb_pct", "drb_pct", "trb_pct", "usg_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct",
    "bpm", "porpag", "dporpag", "adjoe", "adrtg", "off", "def", "tot", "ewins",
  ].filter((column) => Number.isFinite(firstFinite(row?.[column], Number.NaN))).length;
  return populatedAdvancedCount < 3;
}

function getPlayerProfileAugmentYears(baseRows, context) {
  if (!context?.shouldAugmentFromPlayerCareer) return [];
  if (Array.isArray(context?.bucketRows) && context.bucketRows.length) return [];
  const candidateRows = dedupePlayerProfileRows(baseRows || []);
  const seasonsWithRichCompetitionRows = new Set();
  candidateRows.forEach((row) => {
    if (playerProfileRowNeedsAugment(row) || isPlayerProfileAggregateSeasonRow(row)) return;
    const season = getStringValue(row?.season).trim();
    if (season) seasonsWithRichCompetitionRows.add(season);
  });
  const years = new Set();
  candidateRows.forEach((row) => {
    if (!playerProfileRowNeedsAugment(row)) return;
    const season = getStringValue(row?.season).trim();
    if (isPlayerProfileAggregateSeasonRow(row) && seasonsWithRichCompetitionRows.has(season)) return;
    if (season) years.add(season);
  });
  return Array.from(years).sort(compareYears);
}

function shouldFallbackToPlayerCareerProfileRows(baseRows, context) {
  if (context?.bucketRows?.length || context?.bucketAttempted) return false;
  const candidateRows = dedupePlayerProfileRows(baseRows || []);
  if (!candidateRows.length) return true;
  const competitionRows = candidateRows.filter((row) => !row?._careerAggregate && !isPlayerProfileAggregateSeasonRow(row));
  if (!competitionRows.length) return true;
  return !competitionRows.some((row) => !playerProfileRowNeedsAugment(row));
}

function shouldBridgePlayerProfileFromCareer(baseRows, context) {
  const currentDatasetId = normalizeKey(context?.currentDatasetId);
  if (!currentDatasetId || currentDatasetId === "player_career") return false;
  const bridgeDatasets = new Set(["grassroots", "d2", "naia", "juco", "international", "fiba"]);
  if (!bridgeDatasets.has(currentDatasetId)) return false;
  if (currentDatasetId !== "grassroots" && (context?.bucketRows?.length || context?.bucketAttempted)) return false;
  const identity = context?.identity;
  if (!identity || (!identity.names?.size && !identity.ids?.size)) return false;
  const candidateRows = dedupePlayerProfileRows(baseRows || []);
  return currentDatasetId === "grassroots" || candidateRows.length > 0;
}

async function finalizePlayerProfileRows(rows) {
  const sourceRows = (rows || []).filter(Boolean);
  try {
    await ensureCombineMeasurementLookupLoaded();
    sourceRows.forEach((row) => applyCombineMeasurementLookup(row));
  } catch (error) {
    console.warn("Combine measurement lookup failed to load.", error);
  }
  if (sourceRows.some((row) => rowHasNbaProfilePath(row))) {
    await loadScriptOnce(WINGSPAN_LOOKUP_SCRIPT).catch(() => undefined);
    sourceRows.forEach((row) => applyWingspanLookup(row));
  }
  await applyD1ProfileFoulLookup(sourceRows);
  const dedupedRows = dedupePlayerProfileRows(sourceRows);
  const seasonRows = fillPlayerProfileReboundSplitsFromKnownRows(dedupedRows
    .filter((row) => !row?._careerAggregate)
    .sort(comparePlayerProfileSeasonRows)
    .map((row) => normalizePlayerProfileRowForDisplay(row)));
  const careerRows = buildPlayerProfileCareerRows(seasonRows);
  return seasonRows.concat(careerRows);
}

async function getPlayerProfileRows(sourceRow, datasetId = "", options = {}) {
  const context = await resolvePlayerProfileSourceContext(sourceRow, datasetId);
  const baseRows = buildPlayerProfileSourceRows(sourceRow, context, []);
  let playerCareerRows = [];
  const requestedYears = getPlayerProfileAugmentYears(baseRows, context);
  if (shouldFallbackToPlayerCareerProfileRows(baseRows, context) || shouldBridgePlayerProfileFromCareer(baseRows, context) || requestedYears.length) {
    try {
      playerCareerRows = await loadPlayerCareerProfileRows(context.identity, { ...options, requestedYears });
    } catch (error) {
      console.warn("Player/Career profile source failed to load.", error);
    }
  }
  return finalizePlayerProfileRows(buildPlayerProfileSourceRows(sourceRow, context, playerCareerRows));
}

async function loadPlayerProfileRowsProgressively(sourceRow, datasetId = "", onUpdate) {
  const context = await resolvePlayerProfileSourceContext(sourceRow, datasetId);
  const baseRows = buildPlayerProfileSourceRows(sourceRow, context, []);
  const requestedYears = getPlayerProfileAugmentYears(baseRows, context);
  const needsPlayerCareer = shouldFallbackToPlayerCareerProfileRows(baseRows, context) || shouldBridgePlayerProfileFromCareer(baseRows, context) || requestedYears.length;
  let partialRows = [];
  if (baseRows.length) {
    partialRows = await finalizePlayerProfileRows(baseRows);
    if (typeof onUpdate === "function") onUpdate(partialRows, { complete: !needsPlayerCareer, loadingMore: needsPlayerCareer });
    if (!needsPlayerCareer) return partialRows;
  }
  try {
    const playerCareerRows = await loadPlayerCareerProfileRows(context.identity, { silent: true, requestedYears });
    const fullRows = await finalizePlayerProfileRows(buildPlayerProfileSourceRows(sourceRow, context, playerCareerRows));
    if (typeof onUpdate === "function") onUpdate(fullRows, { complete: true, loadingMore: false });
    return fullRows;
  } catch (error) {
    console.warn("Player/Career profile source failed to load.", error);
    if (partialRows.length) {
      if (typeof onUpdate === "function") onUpdate(partialRows, { complete: true, loadingMore: false });
      return partialRows;
    }
    throw error;
  }
}

function buildPlayerProfileIdentity(row) {
  const ids = new Set();
  const realgmId = getStatusIdentityId(row);
  if (realgmId) ids.add(`rgm:${realgmId}`);
  [row?.canonical_player_id, row?.player_profile_key, row?.realgm_player_id, row?.source_player_id, row?.player_id, row?.pid, row?.id].forEach((value) => {
    const text = getStringValue(value).trim();
    if (!text) return;
    ids.add(text.startsWith("rgm_") ? `rgm:${text.slice(4)}` : `id:${text}`);
  });
  const names = new Set([row?.player_name, row?.player, row?.realgm_player_name, row?.nba_name, row?.name]
    .map((value) => normalizeNameKey(value))
    .filter(Boolean));
  const dob = getStringValue(row?.dob || row?.birthday).trim();
  const height = firstPositiveFinite(row?.height_in, row?.inches, Number.NaN);
  const draftPick = Number.isFinite(row?.draft_pick) && !row?._draftPickBlank ? Math.round(row.draft_pick) : Number.NaN;
  return { ids, names, dob, height, draftPick };
}

function extendPlayerProfileIdentity(identity, rows) {
  const merged = {
    ids: new Set(identity?.ids || []),
    names: new Set(identity?.names || []),
    dob: getStringValue(identity?.dob).trim(),
    height: Number.isFinite(identity?.height) ? identity.height : Number.NaN,
    draftPick: Number.isFinite(identity?.draftPick) ? identity.draftPick : Number.NaN,
  };
  (rows || []).forEach((row) => {
    const rowIdentity = buildPlayerProfileIdentity(row);
    rowIdentity.ids.forEach((id) => merged.ids.add(id));
    rowIdentity.names.forEach((name) => merged.names.add(name));
    if (!merged.dob && rowIdentity.dob) merged.dob = rowIdentity.dob;
    if (!Number.isFinite(merged.height) && Number.isFinite(rowIdentity.height)) merged.height = rowIdentity.height;
    if (!Number.isFinite(merged.draftPick) && Number.isFinite(rowIdentity.draftPick)) merged.draftPick = rowIdentity.draftPick;
  });
  return merged;
}

function rowMatchesPlayerProfile(row, identity) {
  if (!row || !identity) return false;
  const rowIdentity = buildPlayerProfileIdentity(row);
  for (const id of rowIdentity.ids) {
    if (identity.ids.has(id)) return true;
  }
  const targetRealgmIds = getPlayerProfileRealgmIds(identity);
  const rowRealgmIds = getPlayerProfileRealgmIds(rowIdentity);
  if (targetRealgmIds.length && rowRealgmIds.length && !rowRealgmIds.some((id) => targetRealgmIds.includes(id))) return false;
  const sharedName = Array.from(rowIdentity.names).some((name) => identity.names.has(name));
  if (!sharedName) return false;
  if (identity.dob && rowIdentity.dob && identity.dob === rowIdentity.dob) return true;
  if (Number.isFinite(identity.height) && Number.isFinite(rowIdentity.height) && Math.abs(identity.height - rowIdentity.height) <= 1) return true;
  if (Number.isFinite(identity.draftPick) && Number.isFinite(rowIdentity.draftPick) && identity.draftPick === rowIdentity.draftPick) return true;
  return !identity.dob && !Number.isFinite(identity.height) && !Number.isFinite(identity.draftPick);
}

function collectIndexedPlayerProfileRows(dataset, identity) {
  if (!dataset?.rows?.length || !identity) return [];
  const index = getPlayerProfileDatasetIndex(dataset);
  const candidates = new Set();
  identity.ids.forEach((id) => {
    (index.byId.get(id) || []).forEach((row) => candidates.add(row));
  });
  identity.names.forEach((name) => {
    (index.byName.get(name) || []).forEach((row) => candidates.add(row));
  });
  const rows = candidates.size ? Array.from(candidates) : dataset.rows;
  return rows.filter((row) => rowMatchesPlayerProfile(row, identity));
}

function getPlayerProfileDatasetIndex(dataset) {
  const cacheKey = `${Number(dataset?._rowVersion) || 0}|${dataset?.rows?.length || 0}`;
  if (dataset._playerProfileDatasetIndex?.key === cacheKey) return dataset._playerProfileDatasetIndex;
  const byId = new Map();
  const byName = new Map();
  (dataset.rows || []).forEach((row) => {
    const identity = buildPlayerProfileIdentity(row);
    identity.ids.forEach((id) => addPlayerProfileIndexEntry(byId, id, row));
    identity.names.forEach((name) => addPlayerProfileIndexEntry(byName, name, row));
  });
  dataset._playerProfileDatasetIndex = { key: cacheKey, byId, byName };
  return dataset._playerProfileDatasetIndex;
}

function addPlayerProfileIndexEntry(map, key, row) {
  if (!key || !row) return;
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(row);
}

const PLAYER_PROFILE_TOTAL_ALIASES = {
  gp: ["gp", "g"],
  min: ["min", "mp"],
  pts: ["pts"],
  trb: ["trb", "reb"],
  orb: ["orb", "oreb", "off"],
  drb: ["drb", "dreb", "def"],
  ast: ["ast"],
  tov: ["tov", "to"],
  stl: ["stl"],
  blk: ["blk"],
  pf: ["pf", "fouls"],
  stocks: ["stocks"],
  fgm: ["fgm", "fg"],
  fga: ["fga"],
  two_pm: ["two_pm", "2pm", "fg2m"],
  two_pa: ["two_pa", "2pa", "two_p_att", "fg2a"],
  three_pm: ["three_pm", "3pm", "tpm", "fg3m"],
  three_pa: ["three_pa", "3pa", "tpa", "fg3a"],
  ftm: ["ftm"],
  fta: ["fta"],
};

const PLAYER_PROFILE_STORAGE_KEY = "multiExplorerPlayerProfileColumnsV7";
const PLAYER_PROFILE_COLOR_STORAGE_KEY = "multiExplorerPlayerProfileColorsV2";
const PLAYER_PROFILE_ROW_MODE_STORAGE_KEY = "multiExplorerPlayerProfileCareerOnlyV1";
const PLAYER_PROFILE_SORT_STORAGE_KEY = "multiExplorerPlayerProfileSortV1";
const PLAYER_PROFILE_COMMON_COLUMNS_STORAGE_KEY = "multiExplorerPlayerProfileCommonColumnsV1";
const PLAYER_PROFILE_SEASON_COMBINED_STORAGE_KEY = "multiExplorerPlayerProfileSeasonCombinedV1";
const PLAYER_PROFILE_LOCKED_COLUMNS = ["season", "competition_level", "league", "team_name"];
const PLAYER_PROFILE_COLUMN_GROUPS = [
  {
    id: "identity",
    label: "Identity",
    columns: ["season", "competition_level", "league", "team_name"],
  },
  {
    id: "totals",
    label: "Totals",
    columns: [
      "gp", "min", "mpg", "pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf", "stocks",
      "ast_tov", "fg_made_att", "two_p_made_att", "three_p_made_att", "ft_made_att",
      "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta",
    ],
  },
  {
    id: "per_game",
    label: "Per Game",
    columns: [
      "pts_pg", "trb_pg", "orb_pg", "drb_pg", "ast_pg", "tov_pg", "stl_pg", "blk_pg", "pf_pg", "stocks_pg",
      "ast_tov_pg", "fg_made_att_pg", "fg_pct", "two_p_made_att_pg", "two_p_pct", "three_p_made_att_pg", "three_p_pct",
      "ft_made_att_pg", "ft_pct", "ftr", "three_pr", "efg_pct", "ts_pct", "ast_to",
      "fgm_pg", "fga_pg", "two_pm_pg", "two_pa_pg", "three_pm_pg", "three_pa_pg", "ftm_pg", "fta_pg",
    ],
  },
  {
    id: "per40",
    label: "Per 40",
    columns: [
      "pts_per40", "trb_per40", "orb_per40", "drb_per40", "ast_per40", "tov_per40", "stl_per40", "blk_per40", "pf_per40", "stocks_per40",
      "ast_tov_per40", "fg_made_att_per40", "two_p_made_att_per40", "three_p_made_att_per40", "ft_made_att_per40",
      "fgm_per40", "fga_per40", "two_pm_per40", "two_pa_per40", "three_pm_per40", "three_pa_per40", "ftm_per40", "fta_per40",
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    columns: [
      "usg_pct", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct",
      "per", "bpm", "obpm", "dbpm", "bpm_diff", "bpm_frac", "net_rating", "porpag", "dporpag", "adjoe", "adrtg", "ortg", "drtg", "fic", "ppr", "rgm_per",
    ],
  },
];
const PLAYER_PROFILE_ALL_COLUMNS = [...new Set(PLAYER_PROFILE_COLUMN_GROUPS.flatMap((group) => group.columns))];
const PLAYER_PROFILE_DEFAULT_COLUMNS = [
  ...PLAYER_PROFILE_LOCKED_COLUMNS,
  "gp", "mpg",
  "pts_pg", "trb_pg", "orb_pg", "drb_pg", "ast_tov_pg", "stl_pg", "blk_pg", "pf_pg", "stocks_pg",
  "fg_made_att_pg", "fg_pct",
  "two_p_made_att_pg", "two_p_pct",
  "three_p_made_att_pg", "three_p_pct",
  "ft_made_att_pg", "ft_pct",
  "efg_pct", "ts_pct", "ftr", "three_pr", "ast_to",
  "pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40", "stocks_per40",
  "per", "bpm", "usg_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct",
];
const PLAYER_PROFILE_LABELS = {
  competition_level: "Level",
  team_name: "Team",
  height_in: "HT",
  weight_lb: "WT",
  dob: "DOB",
  wingspan: "WS",
  pts: "PTS",
  trb: "TRB",
  orb: "ORB",
  drb: "DRB",
  ast: "AST",
  tov: "TOV",
  ast_tov: "AST:TOV",
  stl: "STL",
  blk: "BLK",
  pf: "PF",
  fgm: "FGM",
  fga: "FGA",
  fg_made_att: "FG",
  two_pm: "2PM",
  two_pa: "2PA",
  two_p_made_att: "2P",
  three_pm: "3PM",
  three_pa: "3PA",
  three_p_made_att: "3P",
  ftm: "FTM",
  fta: "FTA",
  ft_made_att: "FT",
  pts_pg: "PTS/G",
  trb_pg: "TRB/G",
  orb_pg: "ORB/G",
  drb_pg: "DRB/G",
  ast_pg: "AST/G",
  tov_pg: "TOV/G",
  ast_tov_pg: "AST:TOV G",
  stl_pg: "STL/G",
  blk_pg: "BLK/G",
  pf_pg: "PF/G",
  stocks_pg: "Stocks/G",
  fgm_pg: "FGM/G",
  fga_pg: "FGA/G",
  fg_made_att_pg: "FG G",
  two_pm_pg: "2PM/G",
  two_pa_pg: "2PA/G",
  two_p_made_att_pg: "2P G",
  three_pm_pg: "3PM/G",
  three_pa_pg: "3PA/G",
  three_p_made_att_pg: "3P G",
  ftm_pg: "FTM/G",
  fta_pg: "FTA/G",
  ft_made_att_pg: "FT G",
  fg_pct: "FG%",
  two_p_pct: "2P%",
  three_p_pct: "3P%",
  ft_pct: "FT%",
  ftr: "FTr",
  three_pr: "3Pr",
  efg_pct: "eFG%",
  ts_pct: "TS%",
  ast_to: "A:TO",
  pts_per40: "PTS/40",
  trb_per40: "TRB/40",
  orb_per40: "ORB/40",
  drb_per40: "DRB/40",
  ast_per40: "AST/40",
  tov_per40: "TOV/40",
  ast_tov_per40: "AST:TOV 40",
  stl_per40: "STL/40",
  blk_per40: "BLK/40",
  pf_per40: "PF/40",
  stocks_per40: "Stocks/40",
  fgm_per40: "FGM/40",
  fga_per40: "FGA/40",
  fg_made_att_per40: "FG 40",
  two_pm_per40: "2PM/40",
  two_pa_per40: "2PA/40",
  two_p_made_att_per40: "2P 40",
  three_pm_per40: "3PM/40",
  three_pa_per40: "3PA/40",
  three_p_made_att_per40: "3P 40",
  ftm_per40: "FTM/40",
  fta_per40: "FTA/40",
  ft_made_att_per40: "FT 40",
  ortg: "ORtg",
  drtg: "DRtg",
  net_rating: "NetRtg",
  obpm: "OBPM",
  dbpm: "DBPM",
  bpm_diff: "BPMdiff",
  bpm_frac: "BPMfrac",
  stocks_pct: "STL%+BLK%",
};

const PLAYER_PROFILE_PAIRED_DISPLAY_COLUMNS = {
  ast_tov: { left: "ast", right: "tov", separator: ":", decimals: 0, sort: "left" },
  ast_tov_pg: { left: "ast_pg", right: "tov_pg", separator: ":", decimals: 1, sort: "left" },
  ast_tov_per40: { left: "ast_per40", right: "tov_per40", separator: ":", decimals: 1, sort: "left" },
  fg_made_att: { left: "fgm", right: "fga", separator: "-", decimals: 0, sort: "right" },
  fg_made_att_pg: { left: "fgm_pg", right: "fga_pg", separator: "-", decimals: 1, sort: "right" },
  fg_made_att_per40: { left: "fgm_per40", right: "fga_per40", separator: "-", decimals: 1, sort: "right" },
  two_p_made_att: { left: "two_pm", right: "two_pa", separator: "-", decimals: 0, sort: "right" },
  two_p_made_att_pg: { left: "two_pm_pg", right: "two_pa_pg", separator: "-", decimals: 1, sort: "right" },
  two_p_made_att_per40: { left: "two_pm_per40", right: "two_pa_per40", separator: "-", decimals: 1, sort: "right" },
  three_p_made_att: { left: "three_pm", right: "three_pa", separator: "-", decimals: 0, sort: "right" },
  three_p_made_att_pg: { left: "three_pm_pg", right: "three_pa_pg", separator: "-", decimals: 1, sort: "right" },
  three_p_made_att_per40: { left: "three_pm_per40", right: "three_pa_per40", separator: "-", decimals: 1, sort: "right" },
  ft_made_att: { left: "ftm", right: "fta", separator: "-", decimals: 0, sort: "right" },
  ft_made_att_pg: { left: "ftm_pg", right: "fta_pg", separator: "-", decimals: 1, sort: "right" },
  ft_made_att_per40: { left: "ftm_per40", right: "fta_per40", separator: "-", decimals: 1, sort: "right" },
};

function dedupePlayerProfileRows(rows) {
  const grouped = new Map();
  (rows || []).forEach((row) => {
    if (!hasPlayerProfileStatContent(row)) return;
    const key = buildPlayerProfileDuplicateKey(row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  const merged = Array.from(grouped.values()).map((group) => mergePlayerProfileDuplicateRows(group));
  return collapsePlayerProfileDisplayDuplicates(merged);
}

function buildPlayerProfileDuplicateKey(row) {
  const season = getStringValue(row?.season).trim();
  const playerKey = normalizeNameKey(getPlayerProfileDisplayName(row)) || getDuplicatePlayerKey(row, "player_career");
  const level = normalizeProfileLevel(row);
  if (season && playerKey && level === "NBA") return `profile|nba|${season}|${playerKey}`;
  const canonicalKey = buildPlayerProfileCanonicalDuplicateKey(row, "profile");
  if (canonicalKey) return canonicalKey;
  return [
    "profile-fallback",
    season,
    playerKey,
    normalizeProfileLevel(row),
    normalizePlayerProfileCompetitionKey(row),
    normalizePlayerProfileTeamKey(row),
    buildDuplicateStatSignature(row) || duplicateRowScore(row),
  ].join("|");
}

function normalizePlayerProfileCompetitionKey(row) {
  const level = normalizeProfileLevel(row);
  if (level === "D1" || level === "College") return "college";
  if (level === "International" || isPlayerCareerInternationalRow(row)) {
    return getPlayerCareerInternationalCanonicalLeagueKey(row)
      || normalizeKey(row?.competition_key || row?.competition_label || row?.league_name || row?.league || "");
  }
  return normalizeKey(row?.competition_key || row?.competition_label || row?.league_name || row?.league || "");
}

function normalizePlayerProfileTeamKey(row) {
  const level = normalizeProfileLevel(row);
  if (level === "International" || level === "FIBA" || level === "G League" || isPlayerCareerInternationalRow(row)) {
    return getPlayerCareerInternationalCanonicalTeamKey(row)
      || normalizeKey(row?.team_full || row?.team_name || row?.team_abbrev || row?.team || "");
  }
  const raw = normalizeKey(row?.team_full || row?.team_alias_all || row?.team_name || row?.team_abbrev || row?.team || "");
  const nbaAliases = {
    phl: "phi",
    phoenix: "phx",
    pho: "phx",
    nor: "nop",
    nok: "nop",
    no: "nop",
    brk: "bkn",
    brooklyn: "bkn",
    cha: "cha",
    charlotte: "cha",
    gs: "gsw",
    goldenstate: "gsw",
    sa: "sas",
    sanantonio: "sas",
    ny: "nyk",
    newyork: "nyk",
  };
  return nbaAliases[raw] || raw;
}

function buildPlayerProfileCanonicalDuplicateKey(row, prefix = "profile") {
  if (!row) return "";
  const season = getStringValue(row?.season).trim();
  const playerKey = normalizeNameKey(getPlayerProfileDisplayName(row)) || getDuplicatePlayerKey(row, "player_career");
  const level = normalizeProfileLevel(row);
  if (season && playerKey && level === "NBA") return `${prefix}|nba|${season}|${playerKey}`;
  const competitionKey = normalizePlayerProfileCompetitionKey(row);
  const teamKey = normalizePlayerProfileTeamKey(row);
  if (season && playerKey && competitionKey && teamKey) {
    const levelKey = ["D1", "College"].includes(level) ? "college" : normalizeKey(level || row?.competition_level || row?.source_dataset || "");
    return [prefix, season, playerKey, levelKey, competitionKey, teamKey].join("|");
  }
  return "";
}

function collapsePlayerProfileDisplayDuplicates(rows) {
  const grouped = new Map();
  (rows || []).forEach((row, index) => {
    if (!hasPlayerProfileStatContent(row)) return;
    const normalized = normalizePlayerProfileRowForDisplay(row);
    const key = buildPlayerProfileDisplayDuplicateKey(normalized) || `profile-display-fallback|${index}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(normalized);
  });
  return Array.from(grouped.values()).map((group) => mergePlayerProfileDuplicateRows(group));
}

function buildPlayerProfileDisplayDuplicateKey(row) {
  if (!row) return "";
  const canonicalKey = buildPlayerProfileCanonicalDuplicateKey(row, "profile-display");
  if (canonicalKey) return canonicalKey;
  const season = getStringValue(row?.season).trim();
  const playerKey = normalizeNameKey(getPlayerProfileDisplayName(row)) || getDuplicatePlayerKey(row, "player_career");
  const level = normalizeKey(row?.competition_level || row?._normalizedProfileLevel || row?.source_dataset || "");
  return [
    "profile-display-fallback",
    season,
    playerKey,
    level,
    normalizePlayerProfileCompetitionKey(row),
    normalizePlayerProfileTeamKey(row),
    buildDuplicateStatSignature(row) || duplicateRowScore(row),
  ].join("|");
}

function buildPlayerProfileCoreStatSignature(row) {
  const columns = ["gp", "min", "pts", "trb", "ast", "tov", "stl", "blk", "pf", "fgm", "fga"];
  const parts = [];
  columns.forEach((column) => {
    const value = getPlayerProfileTotalValue(row, column);
    if (Number.isFinite(value)) parts.push(`${column}:${roundNumber(value, 2)}`);
  });
  return parts.length >= 5 ? parts.join("|") : "";
}

function inferPlayerProfileRowDatasetId(row) {
  const explicitDataset = normalizeKey(row?._datasetId || row?.dataset);
  if (explicitDataset && DATASETS[explicitDataset]) return explicitDataset;
  const sourceDataset = normalizeKey(row?.source_dataset);
  if (sourceDataset && DATASETS[sourceDataset]) return sourceDataset;
  const level = normalizeProfileLevel(row);
  if (level === "NBA") return "nba";
  if (level === "International") return "international";
  if (level === "FIBA") return "fiba";
  if (level === "G League") return "gleague";
  if (level === "D1") return "d1";
  if (level === "D2") return "d2";
  if (level === "JUCO") return "juco";
  if (level === "NAIA") return "naia";
  if (level === "Grassroots") return "grassroots";
  if (sourceDataset.startsWith("realgm nba")) return "nba";
  if (sourceDataset.startsWith("realgm international")) return "international";
  return "player_career";
}

function isPlayerProfileAggregateSeasonRow(row) {
  if (!row || row._careerAggregate) return false;
  if (row._seasonAggregate || row._internationalSingleSeasonAggregate || row._grassrootsSingleYearAggregate) return true;
  const teamKey = normalizeKey(row?.team_name || row?.team_full || row?.team || "");
  const leagueKey = normalizeKey(row?.league || row?.competition_label || row?.competition_key || row?.league_name || "");
  const level = normalizeProfileLevel(row);
  const aggregateCompetitionText = [
    row?.league,
    row?.competition_label,
    row?.competition_key,
    row?.league_name,
  ].some((value) => /(?:\s\/\s|,\s|;\s)/.test(getStringValue(value).trim()));
  const aggregateTeamText = [row?.team_name, row?.team_full, row?.team].some((value) => /(?:\s\/\s|,\s|;\s)/.test(getStringValue(value).trim()));
  return ["all teams", "allteams"].includes(teamKey.replace(/\s+/g, ""))
    || ["all leagues", "allleagues"].includes(leagueKey.replace(/\s+/g, ""))
    || (["International", "FIBA", "G League", "Professional"].includes(level) && (aggregateCompetitionText || aggregateTeamText));
}

function mergePlayerProfileDuplicateRows(rows) {
  const sorted = (rows || []).slice().sort((left, right) => playerProfileRowScore(right) - playerProfileRowScore(left));
  const merged = { ...(sorted[0] || {}) };
  sorted.slice(1).forEach((row) => mergeDuplicateRowFields(merged, row));
  return normalizePlayerProfileRowForDisplay(merged);
}

function playerProfileRowScore(row) {
  let score = duplicateRowScore(row);
  const level = normalizeProfileLevel(row);
  const sourceDataset = normalizeKey(row?.source_dataset);
  if (level === "NBA") score += 5000;
  else if (level && level !== "Other") score += 1000;
  if (level === "Other") score -= 500;
  if (sourceDataset && sourceDataset !== "other" && !sourceDataset.startsWith("realgm")) score += 120;
  if (sourceDataset.startsWith("realgm")) score -= 40;
  [
    "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta",
    "fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "usg_pct", "ast_pct", "stl_pct", "blk_pct",
  ].forEach((column) => {
    if (Number.isFinite(row?.[column])) score += 8;
  });
  if (getStringValue(row?.league || row?.league_name || row?.competition_label).trim()) score += 25;
  return score;
}

function hasPlayerProfileStatContent(row) {
  return [
    "gp", "g", "min", "mp", "mpg", "pts", "pts_pg", "trb", "trb_pg", "ast", "ast_pg", "stl", "stl_pg",
    "blk", "blk_pg", "tov", "tov_pg", "pf", "pf_pg", "stocks", "stocks_pg",
    "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta",
    "fg_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "ast_to", "per", "bpm",
  ].some((column) => {
    const value = firstFinite(row?.[column], Number.NaN);
    if (!Number.isFinite(value)) return false;
    if (["gp", "g", "min", "mp", "mpg"].includes(column)) return value > 0;
    return Math.abs(value) > 0;
  });
}

function comparePlayerProfileSeasonRows(left, right) {
  const leftYear = extractLeadingYear(left?.season);
  const rightYear = extractLeadingYear(right?.season);
  if (Number.isFinite(leftYear) && Number.isFinite(rightYear) && leftYear !== rightYear) return leftYear - rightYear;
  return getStringValue(left?.competition_level || left?.league || "").localeCompare(getStringValue(right?.competition_level || right?.league || ""), undefined, { numeric: true, sensitivity: "base" });
}

function normalizePlayerProfileRowForDisplay(row) {
  const out = { ...(row || {}) };
  const level = normalizeProfileLevel(out);
  out._normalizedProfileLevel = level;
  const displayLevel = getPlayerProfileDisplayLevel(level, out.competition_level);
  if (displayLevel) out.competition_level = displayLevel;
  else if (level && !getStringValue(out.competition_level).trim()) out.competition_level = level;
  if (!getStringValue(out.league).trim()) out.league = getStringValue(out.league_name || out.competition_label).trim();
  if (level === "NBA" && (!getStringValue(out.league).trim() || normalizeKey(out.league) === "other")) out.league = "NBA";
  if (isPlayerProfileCollegeLevel(level)) out.league = level;
  if (level !== "Other" && normalizeKey(out.competition_level) === "other") out.competition_level = getPlayerProfileDisplayLevel(level, out.competition_level);
  if (!getStringValue(out.team_name).trim()) out.team_name = getStringValue(out.team_abbrev || out.team_full || out.team).trim();
  normalizePlayerProfileShootingTotals(out);
  if (!Number.isFinite(out.per) && Number.isFinite(out.rgm_per)) out.per = out.rgm_per;
  populateAstStlDerived(out, { overwrite: false });
  normalizePercentLikeColumns(out, inferPlayerProfileRowDatasetId(out));
  return out;
}

function normalizePlayerProfileShootingTotals(row) {
  if (!row || typeof row !== "object") return row;
  Object.keys(PLAYER_PROFILE_TOTAL_ALIASES).forEach((target) => {
    const value = getPlayerProfileTotalValue(row, target);
    if (Number.isFinite(value) && !Number.isFinite(row[target])) row[target] = value;
  });
  const twoPm = getPlayerProfileTotalValue(row, "two_pm");
  const threePm = getPlayerProfileTotalValue(row, "three_pm");
  if (!Number.isFinite(row.fgm)) {
    const inferred = addIfFinite(twoPm, threePm);
    if (Number.isFinite(inferred)) row.fgm = inferred;
  }
  const twoPa = getPlayerProfileTotalValue(row, "two_pa");
  const threePa = getPlayerProfileTotalValue(row, "three_pa");
  if (!Number.isFinite(row.fga)) {
    const inferred = addIfFinite(twoPa, threePa);
    if (Number.isFinite(inferred)) row.fga = inferred;
  }
  const inferredPoints = weightedPointTotal(row.two_pm, row.three_pm, row.ftm);
  if (!Number.isFinite(row.pts) && Number.isFinite(inferredPoints)) row.pts = inferredPoints;
  const twoPct = percentIfPossible(row.two_pm, row.two_pa);
  const threePct = percentIfPossible(row.three_pm, row.three_pa);
  const ftPct = percentIfPossible(row.ftm, row.fta);
  const fgPct = percentIfPossible(row.fgm, row.fga);
  const efgPct = zeroSafeEfgPct(row.fgm, row.three_pm, row.fga);
  const tsPct = zeroSafeTsPct(firstFinite(row.pts, inferredPoints, Number.NaN), row.fga, row.fta);
  const ftr = ratioIfPossible(row.fta, row.fga);
  const threePr = ratioIfPossible(row.three_pa, row.fga);
  if (twoPct !== "") row.two_p_pct = twoPct;
  if (threePct !== "") row.three_p_pct = threePct;
  if (ftPct !== "") row.ft_pct = ftPct;
  if (fgPct !== "") row.fg_pct = fgPct;
  if (efgPct !== "") row.efg_pct = efgPct;
  if (tsPct !== "") row.ts_pct = tsPct;
  if (ftr !== "") row.ftr = ftr;
  if (threePr !== "") row.three_pr = threePr;
  const gp = firstFinite(row.gp, row.g, Number.NaN);
  const minutes = firstFinite(row.min, row.mp, Number.NaN);
  inferPlayerProfileReboundSplits(row);
  if (!Number.isFinite(row.stocks)) row.stocks = addIfFinite(row.stl, row.blk);
  if (!Number.isFinite(row.ast_to) && Number.isFinite(row.ast) && Number.isFinite(row.tov) && row.tov > 0) row.ast_to = roundNumber(row.ast / row.tov, 3);
  [
    "pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf", "stocks",
    "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta",
  ].forEach((column) => {
    const pg = perGameValue(row[column], gp);
    if (pg !== "" && !Number.isFinite(row[`${column}_pg`])) row[`${column}_pg`] = pg;
    const per40 = per40Value(row[column], minutes);
    if (per40 !== "" && !Number.isFinite(row[`${column}_per40`])) row[`${column}_per40`] = per40;
  });
  return row;
}

function fillPlayerProfileReboundSplitsFromKnownRows(rows) {
  let knownOrb = 0;
  let knownDrb = 0;
  (rows || []).forEach((row) => {
    normalizePlayerProfileShootingTotals(row);
    const orb = firstFinite(row?.orb, Number.NaN);
    const drb = firstFinite(row?.drb, Number.NaN);
    if (!Number.isFinite(orb) || !Number.isFinite(drb) || orb < 0 || drb < 0 || orb + drb <= 0) return;
    knownOrb += orb;
    knownDrb += drb;
  });
  const knownTotal = knownOrb + knownDrb;
  if (!Number.isFinite(knownTotal) || knownTotal <= 0) return rows || [];
  const orbShare = knownOrb / knownTotal;
  (rows || []).forEach((row) => {
    const trb = firstFinite(row?.trb, Number.NaN);
    if (!Number.isFinite(trb) || trb < 0) return;
    const hasOrb = Number.isFinite(row?.orb);
    const hasDrb = Number.isFinite(row?.drb);
    if (!hasOrb && !hasDrb) {
      row.orb = roundNumber(trb * orbShare, 2);
      row.drb = roundNumber(Math.max(0, trb - row.orb), 2);
    } else if (hasOrb && !hasDrb) {
      row.drb = roundNumber(Math.max(0, trb - row.orb), 2);
    } else if (!hasOrb && hasDrb) {
      row.orb = roundNumber(Math.max(0, trb - row.drb), 2);
    }
    normalizePlayerProfileShootingTotals(row);
  });
  return rows || [];
}

function inferPlayerProfileReboundSplits(row) {
  const trb = firstFinite(row?.trb, Number.NaN);
  if (!Number.isFinite(trb) || trb < 0) return;
  const orb = firstFinite(row?.orb, Number.NaN);
  const drb = firstFinite(row?.drb, Number.NaN);
  if (Number.isFinite(orb) && Number.isFinite(drb)) return;
  if (Number.isFinite(orb) && !Number.isFinite(drb)) {
    row.drb = roundNumber(Math.max(0, trb - orb), 2);
    return;
  }
  if (!Number.isFinite(orb) && Number.isFinite(drb)) {
    row.orb = roundNumber(Math.max(0, trb - drb), 2);
    return;
  }
  const orbPct = firstFinite(row?.orb_pct, Number.NaN);
  const drbPct = firstFinite(row?.drb_pct, Number.NaN);
  if (!Number.isFinite(orbPct) || !Number.isFinite(drbPct) || orbPct <= 0 || drbPct <= 0) return;
  const split = orbPct / (orbPct + drbPct);
  row.orb = roundNumber(trb * split, 2);
  row.drb = roundNumber(Math.max(0, trb - row.orb), 2);
}

function getPlayerProfileTotalValue(row, column) {
  const aliases = PLAYER_PROFILE_TOTAL_ALIASES[column] || [column];
  for (const alias of aliases) {
    const value = firstFinite(row?.[alias], Number.NaN);
    if (Number.isFinite(value)) return value;
  }
  return Number.NaN;
}

function normalizeProfileLevel(row) {
  if (getStringValue(row?._normalizedProfileLevel).trim()) return getStringValue(row._normalizedProfileLevel).trim();
  const explicitDataset = normalizeKey(row?._datasetId || row?.dataset);
  if (explicitDataset === "nba") return "NBA";
  if (explicitDataset === "fiba") return "FIBA";
  if (explicitDataset === "international") return "International";
  if (explicitDataset === "grassroots") return "Grassroots";
  if (explicitDataset === "d1") return "D1";
  if (explicitDataset === "d2") return "D2";
  if (explicitDataset === "naia") return "NAIA";
  if (explicitDataset === "juco") return "JUCO";
  const text = normalizeKey([
    row?.competition_level,
    row?.source_dataset,
    row?.career_path,
    row?.competition_label,
    row?.competition_key,
    row?.league_name,
    row?.league,
  ].map((value) => getStringValue(value).trim()).filter(Boolean).join(" "));
  if (/nba/.test(text)) return "NBA";
  if (/g league|gleague/.test(text)) return "G League";
  if (/fiba/.test(text)) return "FIBA";
  if (/international|euro|nbl|acb|bbl|bsl|adriatic|french|turkish|israeli|australian|league/.test(text)) return "International";
  if (/grassroot|aau|eybl|3ssb|uaa|high school/.test(text)) return "Grassroots";
  if (/\bd1\b|division i|ncaa/.test(text)) return "D1";
  if (/\bd2\b|division ii/.test(text)) return "D2";
  if (/naia/.test(text)) return "NAIA";
  if (/juco|njcaa/.test(text)) return "JUCO";
  return getStringValue(row?.competition_level || row?.source_dataset || "Other").trim() || "Other";
}

function isPlayerProfileCollegeLevel(level) {
  return ["D1", "D2", "NAIA", "JUCO"].includes(getStringValue(level).trim());
}

function getPlayerProfileDisplayLevel(level, rawLevelText = "") {
  const normalizedLevel = getStringValue(level).trim();
  const raw = getStringValue(rawLevelText).trim();
  const isCareer = /^career\b/i.test(raw);
  if (isPlayerProfileCollegeLevel(normalizedLevel)) return isCareer ? "Career NCAA" : "NCAA";
  if (isCareer && normalizedLevel) return `Career ${normalizedLevel}`;
  return normalizedLevel;
}

function buildPlayerProfileCareerRows(rows) {
  const groups = new Map();
  (rows || []).forEach((row) => {
    const level = normalizeProfileLevel(row);
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level).push(row);
  });
  const careerRows = Array.from(groups.entries())
    .sort((left, right) => getPlayerCareerLevelOrder(left[0]) - getPlayerCareerLevelOrder(right[0]))
    .map(([level, groupRows]) => aggregatePlayerProfileRows(groupRows, `Career ${level}`, level));
  if ((rows || []).length) careerRows.push(aggregatePlayerProfileRows(rows, "Lifetime", "Lifetime"));
  return careerRows;
}

function getPlayerCareerLevelOrder(level) {
  const index = PLAYER_CAREER_LEVEL_FILTER_ORDER.indexOf(level);
  return index >= 0 ? index : PLAYER_CAREER_LEVEL_FILTER_ORDER.length + 1;
}

function aggregatePlayerProfileRows(rows, label, level) {
  const teams = Array.from(new Set((rows || [])
    .map((row) => getStringValue(row?.team_name || row?.team_abbrev || row?.team).trim())
    .filter(Boolean)));
  const row = {
    season: "Career",
    competition_level: label,
    league: level === "Lifetime" ? "All" : level,
    team_name: teams.length === 1 ? teams[0] : "All Teams",
    _careerAggregate: true,
  };
  const totals = {};
  (rows || []).forEach((sourceRow) => normalizePlayerProfileShootingTotals(sourceRow));
  ["gp", "min", "pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf", "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta"].forEach((column) => {
    totals[column] = sumPlayerProfileTotal(rows, column);
    if (Number.isFinite(totals[column])) row[column] = roundNumber(totals[column], isIntegerCountColumn(column) ? 0 : 2);
  });
  const gp = firstFinite(row.gp, Number.NaN);
  const minutes = firstFinite(row.min, Number.NaN);
  if (Number.isFinite(gp) && gp > 0 && Number.isFinite(minutes)) row.mpg = roundNumber(minutes / gp, 1);
  ["pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf", "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta"].forEach((column) => {
    row[`${column}_pg`] = perGameValue(row[column], gp);
    row[`${column}_per40`] = per40Value(row[column], minutes);
  });
  row.stocks = addIfFinite(row.stl, row.blk);
  row.stocks_pg = perGameValue(row.stocks, gp);
  row.stocks_per40 = per40Value(row.stocks, minutes);
  row.ast_stl_pg = addIfFinite(row.ast_pg, row.stl_pg);
  row.ast_stl_per40 = addIfFinite(row.ast_per40, row.stl_per40);
  row.fg_pct = percentIfPossible(row.fgm, row.fga);
  row.two_p_pct = percentIfPossible(row.two_pm, row.two_pa);
  row.three_p_pct = percentIfPossible(row.three_pm, row.three_pa);
  row.ft_pct = percentIfPossible(row.ftm, row.fta);
  [
    "fg_pct",
    "two_p_pct",
    "three_p_pct",
    "ft_pct",
  ].forEach((column) => {
    if (Number.isFinite(row[column])) return;
    const avg = weightedAveragePlayerProfileValue(rows, column);
    if (Number.isFinite(avg)) row[column] = roundNumber(avg, 1);
  });
  row.efg_pct = zeroSafeEfgPct(row.fgm, row.three_pm, row.fga);
  row.ts_pct = zeroSafeTsPct(row.pts, row.fga, row.fta);
  row.ftr = ratioIfPossible(row.fta, row.fga);
  row.three_pr = ratioIfPossible(row.three_pa, row.fga);
  populateAstTo(row);
  ["usg_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct", "orb_pct", "drb_pct", "trb_pct", "per", "bpm", "porpag", "dporpag", "adjoe", "adrtg", "ortg", "drtg", "fic", "ppr"].forEach((column) => {
    const avg = weightedAveragePlayerProfileValue(rows, column);
    if (Number.isFinite(avg)) row[column] = roundNumber(avg, 2);
  });
  normalizePercentLikeColumns(row, "player_career");
  row.stat_search_text = buildStatSearchText(row, "player_career");
  return row;
}

function sumPlayerProfileTotal(rows, column) {
  let total = 0;
  let hasValue = false;
  (rows || []).forEach((row) => {
    let value = getPlayerProfileTotalValue(row, column);
    if (!Number.isFinite(value) && column === "min") {
      const gp = firstFinite(row?.gp, row?.g, Number.NaN);
      const mpg = firstFinite(row?.mpg, Number.NaN);
      if (Number.isFinite(gp) && Number.isFinite(mpg)) value = gp * mpg;
    }
    if (!Number.isFinite(value)) {
      const gp = firstFinite(row?.gp, row?.g, Number.NaN);
      const pg = firstFinite(row?.[`${column}_pg`], Number.NaN);
      if (Number.isFinite(gp) && Number.isFinite(pg)) value = gp * pg;
    }
    if (!Number.isFinite(value)) return;
    total += value;
    hasValue = true;
  });
  return hasValue ? total : Number.NaN;
}

function weightedAveragePlayerProfileValue(rows, column) {
  let totalWeight = 0;
  let total = 0;
  (rows || []).forEach((row) => {
    const value = firstFinite(row?.[column], Number.NaN);
    if (!Number.isFinite(value)) return;
    const weight = Math.max(firstFinite(row?.min, row?.mp, row?.gp, 1), 1);
    total += value * weight;
    totalWeight += weight;
  });
  return totalWeight > 0 ? total / totalWeight : Number.NaN;
}

function getPlayerProfileRenderTarget(root) {
  return root?.querySelector?.("[data-player-profile-content]") || root;
}

function hasPlayerProfileColumnValue(rows, column) {
  return (rows || []).some((row) => {
    const pairedStats = isPlayerProfilePairedDisplayColumn(column) ? getPlayerProfilePairedDisplayStats(row, column) : null;
    if (pairedStats) return Number.isFinite(pairedStats.left) || Number.isFinite(pairedStats.right);
    const splitStats = isSplitDisplayColumn(column) ? getSplitDisplayStats(row, column) : null;
    if (splitStats) {
      return Number.isFinite(splitStats.made) || Number.isFinite(splitStats.att) || Number.isFinite(splitStats.ratio);
    }
    const rawValue = getRowColumnValue(DATASETS.player_career, row, column);
    if (typeof rawValue === "number") return Number.isFinite(rawValue);
    return getStringValue(rawValue).trim() !== "";
  });
}

function hasEveryPlayerProfileColumnValue(rows, column) {
  const candidates = (rows || []).filter(Boolean);
  if (!candidates.length) return false;
  return candidates.every((row) => {
    const pairedStats = isPlayerProfilePairedDisplayColumn(column) ? getPlayerProfilePairedDisplayStats(row, column) : null;
    if (pairedStats) return Number.isFinite(pairedStats.left) || Number.isFinite(pairedStats.right);
    const splitStats = isSplitDisplayColumn(column) ? getSplitDisplayStats(row, column) : null;
    if (splitStats) {
      return Number.isFinite(splitStats.made) || Number.isFinite(splitStats.att) || Number.isFinite(splitStats.ratio);
    }
    const rawValue = getRowColumnValue(DATASETS.player_career, row, column);
    if (typeof rawValue === "number") return Number.isFinite(rawValue);
    return getStringValue(rawValue).trim() !== "";
  });
}

function getPlayerProfileSeasonDisplayGroupKey(row) {
  if (!row || row._careerAggregate) return "";
  const season = getStringValue(row?.season).trim();
  const level = normalizeKey(normalizeProfileLevel(row) || row?.competition_level || row?.source_dataset || "");
  if (!season && !level) return "";
  return `${season}|${level}`;
}

function aggregatePlayerProfileSingleSeasonRows(rows) {
  const seasonRows = (rows || []).filter((row) => row && !row._careerAggregate);
  if (!seasonRows.length) return null;
  const sample = seasonRows[0];
  const level = normalizeProfileLevel(sample);
  const displayLevel = getPlayerProfileDisplayLevel(level, sample?.competition_level) || level || getStringValue(sample?.competition_level).trim() || "Other";
  const aggregate = aggregatePlayerProfileRows(seasonRows, displayLevel, level || displayLevel);
  const season = getStringValue(sample?.season).trim();
  const leagues = sortGrassrootsDisplayValues(new Set(seasonRows.map((row) => row.league_name || row.competition_label || row.league).filter(Boolean)), []);
  const teams = sortGrassrootsDisplayValues(new Set(seasonRows.map((row) => row.team_abbrev || row.team_name || row.team_full || row.team).filter(Boolean)), []);
  const countries = splitInternationalCountries(seasonRows.map((row) => row.nationality_list || row.nationality).join(" / "));
  if (season) aggregate.season = season;
  if (displayLevel) aggregate.competition_level = displayLevel;
  if (leagues.length) {
    const combinedLeague = leagues.join(" / ");
    aggregate.league = combinedLeague;
    aggregate.league_name = combinedLeague;
    aggregate.competition_label = combinedLeague;
  } else if (level) {
    aggregate.league = level;
  }
  if (teams.length) {
    const combinedTeam = teams.join(" / ");
    aggregate.team_name = combinedTeam;
    aggregate.team_full = combinedTeam;
    aggregate.team_abbrev = combinedTeam;
    aggregate.team_search_text = combinedTeam;
  }
  if (countries.length) {
    const combinedCountries = countries.join(" / ");
    aggregate.nationality = combinedCountries;
    aggregate.nationality_list = combinedCountries;
    aggregate.nationality_regions = Array.from(new Set(countries.map(getInternationalCountryRegion).filter(Boolean))).join(" / ");
  }
  aggregate._careerAggregate = false;
  aggregate._seasonAggregate = true;
  aggregate.rank = null;
  aggregate._searchCacheKey = "";
  aggregate._searchHaystack = "";
  aggregate._colorBucketCacheKey = "";
  aggregate._colorBucketValue = "";
  return normalizePlayerProfileRowForDisplay(aggregate);
}

function getPlayerProfileDisplayRows(rows, options = {}) {
  const careerOnly = Boolean(options.careerOnly);
  const includeSeasonCombined = Boolean(options.includeSeasonCombined);
  const careerRows = (rows || []).filter((row) => row?._careerAggregate);
  if (careerOnly) return careerRows;
  const groupedSeasonRows = new Map();
  (rows || []).forEach((row, index) => {
    if (!row || row._careerAggregate) return;
    const key = getPlayerProfileSeasonDisplayGroupKey(row) || `row_${index}`;
    if (!groupedSeasonRows.has(key)) groupedSeasonRows.set(key, []);
    groupedSeasonRows.get(key).push(row);
  });
  const displaySeasonRows = [];
  groupedSeasonRows.forEach((groupRows) => {
    const aggregateRows = groupRows.filter((row) => isPlayerProfileAggregateSeasonRow(row));
    const specificRows = groupRows.filter((row) => !isPlayerProfileAggregateSeasonRow(row));
    if (includeSeasonCombined) {
      if (aggregateRows.length === 1) {
        displaySeasonRows.push(aggregateRows[0]);
        return;
      }
      if (aggregateRows.length > 1) {
        displaySeasonRows.push(mergePlayerProfileDuplicateRows(aggregateRows));
        return;
      }
      const combined = aggregatePlayerProfileSingleSeasonRows(specificRows);
      if (combined) displaySeasonRows.push(combined);
      else displaySeasonRows.push(...specificRows);
      return;
    }
    if (specificRows.length) {
      displaySeasonRows.push(...specificRows);
      return;
    }
    if (aggregateRows.length === 1) {
      displaySeasonRows.push(aggregateRows[0]);
      return;
    }
    if (aggregateRows.length > 1) {
      displaySeasonRows.push(mergePlayerProfileDuplicateRows(aggregateRows));
    }
  });
  return displaySeasonRows.concat(careerRows);
}

function getAvailablePlayerProfileColumns(rows, options = {}) {
  const commonOnly = Boolean(options.commonOnly);
  return PLAYER_PROFILE_ALL_COLUMNS.filter((column) => (
    PLAYER_PROFILE_LOCKED_COLUMNS.includes(column)
      || (commonOnly ? hasEveryPlayerProfileColumnValue(rows, column) : hasPlayerProfileColumnValue(rows, column))
  ));
}

function getPlayerProfilePairedDisplayConfig(column) {
  return PLAYER_PROFILE_PAIRED_DISPLAY_COLUMNS[stripCompanionPrefix(column)] || null;
}

function getPlayerProfilePairedDisplayStats(row, column) {
  const config = getPlayerProfilePairedDisplayConfig(column);
  if (!config || !row) return null;
  const left = firstFinite(row?.[config.left], getPlayerProfileTotalValue(row, config.left), Number.NaN);
  const right = firstFinite(row?.[config.right], getPlayerProfileTotalValue(row, config.right), Number.NaN);
  if (!Number.isFinite(left) && !Number.isFinite(right)) return null;
  const sortValue = config.sort === "right" && Number.isFinite(right)
    ? right
    : (Number.isFinite(left) ? left : right);
  return { ...config, left, right, sortValue };
}

function isPlayerProfilePairedDisplayColumn(column) {
  return Boolean(getPlayerProfilePairedDisplayConfig(column));
}

function formatPlayerProfilePairedNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return "";
  if (decimals <= 0) return String(Math.round(value));
  return value.toFixed(decimals).replace(/\.0$/, ".0");
}

function renderPlayerProfilePairedDisplay(row, column) {
  const stats = getPlayerProfilePairedDisplayStats(row, column);
  if (!stats) return "";
  const left = formatPlayerProfilePairedNumber(stats.left, stats.decimals);
  const right = formatPlayerProfilePairedNumber(stats.right, stats.decimals);
  if (!left && !right) return "";
  return `${left || "0"}${stats.separator}${right || "0"}`;
}

function normalizePlayerProfileSortState(sortState, availableColumns = PLAYER_PROFILE_ALL_COLUMNS) {
  const available = new Set(availableColumns);
  const fallbackColumn = available.has("season") ? "season" : (availableColumns[0] || PLAYER_PROFILE_LOCKED_COLUMNS[0] || "season");
  const column = available.has(sortState?.column) ? sortState.column : fallbackColumn;
  const dir = sortState?.dir === "asc" ? "asc" : "desc";
  return { column, dir };
}

function getPlayerProfileSortState(availableColumns = PLAYER_PROFILE_ALL_COLUMNS) {
  let stored = appState.playerProfileSort;
  try {
    const parsed = JSON.parse(localStorage.getItem(PLAYER_PROFILE_SORT_STORAGE_KEY) || "null");
    if (parsed && typeof parsed === "object") stored = parsed;
  } catch (_error) {
    stored = appState.playerProfileSort;
  }
  const normalized = normalizePlayerProfileSortState(stored, availableColumns);
  appState.playerProfileSort = normalized;
  return normalized;
}

function savePlayerProfileSortState(sortState, availableColumns = PLAYER_PROFILE_ALL_COLUMNS) {
  const normalized = normalizePlayerProfileSortState(sortState, availableColumns);
  appState.playerProfileSort = normalized;
  try {
    localStorage.setItem(PLAYER_PROFILE_SORT_STORAGE_KEY, JSON.stringify(normalized));
  } catch (_error) {
    // Ignore storage failures; in-memory state still updates.
  }
}

function getPlayerProfileSortValue(row, column) {
  if (column === "season") {
    const year = extractLeadingYear(row?.season);
    return Number.isFinite(year) ? year : sanitizeCellDisplayValue(row?.season);
  }
  if (isPlayerProfilePairedDisplayColumn(column)) {
    const pairedStats = getPlayerProfilePairedDisplayStats(row, column);
    if (Number.isFinite(pairedStats?.sortValue)) return pairedStats.sortValue;
  }
  if (isSplitDisplayColumn(column)) {
    const splitStats = getSplitDisplayStats(row, column);
    if (Number.isFinite(splitStats?.pctValue)) return splitStats.pctValue;
  }
  const totalValue = getPlayerProfileTotalValue(row, column);
  if (Number.isFinite(totalValue)) return totalValue;
  const rawValue = getRowColumnValue(DATASETS.player_career, row, column);
  if (typeof rawValue === "number" && Number.isFinite(rawValue)) return rawValue;
  return sanitizeCellDisplayValue(rawValue);
}

function comparePlayerProfileSortValues(left, right, column, dir = "desc") {
  const leftValue = getPlayerProfileSortValue(left, column);
  const rightValue = getPlayerProfileSortValue(right, column);
  const leftBlank = leftValue == null || leftValue === "";
  const rightBlank = rightValue == null || rightValue === "";
  if (leftBlank && rightBlank) return comparePlayerProfileSeasonRows(left, right);
  if (leftBlank) return 1;
  if (rightBlank) return -1;
  let compareResult = 0;
  if (typeof leftValue === "number" && typeof rightValue === "number") {
    compareResult = leftValue !== rightValue ? leftValue - rightValue : comparePlayerProfileSeasonRows(left, right);
  } else {
    compareResult = String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true, sensitivity: "base" }) || comparePlayerProfileSeasonRows(left, right);
  }
  return dir === "asc" ? compareResult : -compareResult;
}

function sortPlayerProfileRows(rows, sortState, availableColumns = getAvailablePlayerProfileColumns(rows)) {
  const seasonRows = (rows || []).filter((row) => !row?._careerAggregate);
  const careerRows = (rows || []).filter((row) => row?._careerAggregate);
  const activeSort = normalizePlayerProfileSortState(sortState, availableColumns);
  const comparator = activeSort.column ? (left, right) => comparePlayerProfileSortValues(left, right, activeSort.column, activeSort.dir) : comparePlayerProfileSeasonRows;
  const sortedSeasonRows = seasonRows.slice().sort(comparator);
  return sortedSeasonRows.concat(careerRows);
}

function renderPlayerProfileModal(root, name, rows, options = {}) {
  const previousNameKey = normalizeNameKey(root?._playerProfileName || "");
  const nextNameKey = normalizeNameKey(name || "");
  const shouldResetColumns = !previousNameKey || (nextNameKey && previousNameKey !== nextNameKey);
  const mergedOptions = {
    ...(root?._playerProfileOptions || {}),
    ...options,
    forceDefaultColumns: shouldResetColumns && !options.loadingMore,
  };
  const displayRows = getPlayerProfileDisplayRows(rows, {
    careerOnly: getPlayerProfileCareerOnlyEnabled(),
    includeSeasonCombined: getPlayerProfileSeasonCombinedEnabled(),
  });
  const availableColumns = getAvailablePlayerProfileColumns(displayRows, { commonOnly: getPlayerProfileCommonColumnsOnlyEnabled() });
  root._playerProfileName = name;
  root._playerProfileRows = Array.isArray(rows) ? rows.slice() : [];
  root._playerProfileOptions = mergedOptions;
  root._playerProfileAvailableColumns = new Set(availableColumns);
  const target = getPlayerProfileRenderTarget(root);
  target.innerHTML = buildPlayerProfileContentHtml(name, rows, mergedOptions);
  bindPlayerProfileColumnControls(root);
  bindPlayerProfileSortControls(root);
}

function getPlayerProfileBioValue(rows, columns = []) {
  const sortedRows = (Array.isArray(rows) ? rows : [])
    .filter((row) => row && !row._careerAggregate)
    .slice()
    .sort((left, right) => playerProfileRowScore(right) - playerProfileRowScore(left));
  for (const row of sortedRows) {
    for (const column of columns) {
      const value = row?.[column];
      if (value == null || value === "") continue;
      if (typeof value === "number" && !Number.isFinite(value)) continue;
      return value;
    }
  }
  return "";
}

function formatPlayerProfileHeight(value) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(numeric) && numeric > 24 && numeric < 110) {
    const inches = Math.round(numeric);
    return `${Math.floor(inches / 12)}-${inches % 12}`;
  }
  return getStringValue(value).trim();
}

function formatPlayerProfileInches(value) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return getStringValue(value).trim();
  const feetText = formatPlayerProfileHeight(numeric);
  return `${feetText} (${numeric.toFixed(1).replace(/\.0$/, "")}")`;
}

function formatPlayerProfileDate(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  const iso = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (iso) return `${iso[2].padStart(2, "0")}/${iso[3].padStart(2, "0")}/${iso[1]}`;
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return `${String(parsed.getMonth() + 1).padStart(2, "0")}/${String(parsed.getDate()).padStart(2, "0")}/${parsed.getFullYear()}`;
  }
  return text;
}

function buildPlayerProfileBioHtml(rows) {
  const heightText = formatPlayerProfileHeight(getPlayerProfileBioValue(rows, ["height_in", "inches"]));
  const weight = getPlayerProfileBioValue(rows, ["weight_lb", "weight"]);
  const dobText = formatPlayerProfileDate(getPlayerProfileBioValue(rows, ["dob", "birth_date"]));
  const wingspanText = formatPlayerProfileInches(getPlayerProfileBioValue(rows, ["wingspan"]));
  const cards = [];
  if (heightText) cards.push({ label: "HT", value: heightText });
  if (weight !== "" && weight != null) {
    const numericWeight = typeof weight === "number" ? weight : Number(weight);
    cards.push({ label: "WT", value: Number.isFinite(numericWeight) ? `${Math.round(numericWeight)}` : getStringValue(weight).trim() });
  }
  if (wingspanText) cards.push({ label: "WS", value: wingspanText });
  if (dobText) cards.push({ label: "DOB", value: dobText });
  return cards.length
    ? `<div class="player-profile-bio">${cards.map((card) => `<div class="player-profile-bio-card"><span>${escapeHtml(card.label)}</span><strong>${escapeHtml(card.value)}</strong></div>`).join("")}</div>`
    : "";
}

function buildPlayerProfileContentHtml(name, rows, options = {}) {
  const careerOnly = getPlayerProfileCareerOnlyEnabled();
  const commonOnly = getPlayerProfileCommonColumnsOnlyEnabled();
  const includeSeasonCombined = getPlayerProfileSeasonCombinedEnabled();
  const displayRows = getPlayerProfileDisplayRows(rows, { careerOnly, includeSeasonCombined });
  const columns = getAvailablePlayerProfileColumns(displayRows, { commonOnly });
  const visibleColumns = getPlayerProfileVisibleColumns(columns, { forceDefault: options.forceDefaultColumns });
  const colorsEnabled = getPlayerProfileColorsEnabled();
  const dataset = getPlayerProfileRenderDataset(rows);
  const profileColorState = { extraSelects: { view_mode: "player", color_mode: "competition" } };
  const profileReferenceRows = getPlayerProfileColorReferenceRows(rows);
  const colorScale = getPlayerProfileColorScale(dataset, profileColorState, columns, profileReferenceRows, colorsEnabled);
  const sortState = getPlayerProfileSortState(columns);
  const sortedRows = sortPlayerProfileRows(displayRows, sortState, columns);
  const header = columns.map((column) => {
    const hidden = visibleColumns.has(column) ? "" : " hidden";
    const isActive = sortState.column === column;
    const nextDir = isActive && sortState.dir === "desc" ? "asc" : "desc";
    const direction = isActive ? (sortState.dir === "desc" ? "descending" : "ascending") : "none";
    const indicator = isActive ? (sortState.dir === "desc" ? "▼" : "▲") : "";
    return `<th data-profile-column="${escapeAttribute(column)}"${hidden}><button class="player-profile-sort-button${isActive ? " is-active" : ""}" type="button" data-profile-sort="${escapeAttribute(column)}" data-profile-sort-dir="${escapeAttribute(nextDir)}" aria-sort="${escapeAttribute(direction)}">${escapeHtml(getPlayerProfileColumnLabel(dataset, column))}${indicator ? `<span class="player-profile-sort-indicator">${escapeHtml(indicator)}</span>` : ""}</button></th>`;
  }).join("");
  const body = sortedRows.length
    ? sortedRows.map((row) => `<tr class="${row._careerAggregate ? "player-profile-career-row" : ""}" data-profile-row-kind="${row._careerAggregate ? "career" : "season"}">${columns.map((column) => {
      const hidden = visibleColumns.has(column) ? "" : " hidden";
      const rawValue = getRowColumnValue(dataset, row, column);
      const pairedHtml = isPlayerProfilePairedDisplayColumn(column)
        ? renderPlayerProfilePairedDisplay(row, column)
        : "";
      const style = !pairedHtml && colorsEnabled ? getCellStyle(dataset, profileColorState, column, rawValue, colorScale, row) : "";
      const splitStats = isSplitDisplayColumn(column) ? getSplitDisplayStats(row, column) : null;
      const styleAttribute = splitStats || pairedHtml ? "" : (colorsEnabled && style ? ` style="${escapeAttribute(style)}"` : "");
      const storedStyleAttribute = style ? ` data-profile-color-style="${escapeAttribute(style)}"` : "";
      const splitHtml = splitStats
        ? `<span class="split-display"><span class="split-display__pair"><span class="split-display__made">${escapeHtml(Number.isFinite(splitStats.made) ? Math.round(splitStats.made) : 0)}</span><span class="split-display__sep">-</span><span class="split-display__att">${escapeHtml(Number.isFinite(splitStats.att) ? Math.round(splitStats.att) : 0)}</span></span><span class="split-display__pct"${colorsEnabled && style ? ` style="${escapeAttribute(style)}"` : ""}>${escapeHtml(formatSplitDisplayPct(splitStats.ratio))}</span></span>`
        : "";
      return `<td data-profile-column="${escapeAttribute(column)}"${hidden}${styleAttribute}${storedStyleAttribute}>${pairedHtml ? escapeHtml(pairedHtml) : (splitHtml || escapeHtml(sanitizeCellDisplayValue(formatValue(dataset, column, rawValue, row))))}</td>`;
    }).join("")}</tr>`).join("")
    : `<tr><td colspan="${Math.max(columns.length, 1)}">No logged seasons found.</td></tr>`;
  const backLink = options.standalone ? `<div><a href="#player_career">Player/Career</a></div>` : "";
  const loadingNote = options.loadingMore ? `<div class="player-profile-loading-note">Loading additional merged seasons and advanced stats...</div>` : "";
  const controls = buildPlayerProfileColumnControlsHtml(visibleColumns, columns);
  const totalRowCount = Array.isArray(rows) ? rows.length : 0;
  const countLabel = totalRowCount !== sortedRows.length
    ? `${sortedRows.length.toLocaleString()} displayed rows (${totalRowCount.toLocaleString()} total including career totals)`
    : `${sortedRows.length.toLocaleString()} rows including career totals`;
  return `
    <div class="player-profile-header">
      <h2>${escapeHtml(name || "Player")}</h2>
      ${buildPlayerProfileBioHtml(rows)}
      <div>${escapeHtml(countLabel)}</div>
      ${loadingNote}
      ${backLink}
    </div>
    <div class="player-profile-layout">
      ${controls}
      <div class="player-profile-table-wrap">
        <table class="player-profile-table">
          <thead><tr>${header}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </div>
  `;
}

function getPlayerProfileRenderDataset(rows) {
  const loaded = appState.datasetCache?.player_career;
  if (loaded?.meta) return loaded;
  const config = DATASETS.player_career;
  return {
    ...config,
    meta: buildDatasetMeta(rows || [], config),
  };
}

function getPlayerProfileColorReferenceRows(rows) {
  const loadedRows = appState.datasetCache?.player_career?.rows;
  return Array.isArray(loadedRows) && loadedRows.length ? loadedRows : (rows || []);
}

function getPlayerProfileColorScale(dataset, profileColorState, columns, referenceRows, enabled) {
  if (!enabled || !dataset?.meta || !columns.length) return {};
  const loadedRows = appState.datasetCache?.player_career?.rows;
  if (Array.isArray(loadedRows) && loadedRows.length && loadedRows === referenceRows) {
    const cacheKey = `${Number(dataset?._rowVersion) || 0}|${columns.join("|")}`;
    if (dataset._playerProfileColorScaleKey === cacheKey && dataset._playerProfileColorScale) {
      return dataset._playerProfileColorScale;
    }
    const colorScale = buildColumnScales(dataset, profileColorState, columns, referenceRows);
    dataset._playerProfileColorScaleKey = cacheKey;
    dataset._playerProfileColorScale = colorScale;
    return colorScale;
  }
  return buildColumnScales(dataset, profileColorState, columns, referenceRows);
}

function getPlayerProfileColumnLabel(dataset, column) {
  return PLAYER_PROFILE_LABELS[column] || displayLabel(dataset, column);
}

function getPlayerProfileVisibleColumns(availableColumns = PLAYER_PROFILE_ALL_COLUMNS, options = {}) {
  const available = new Set(availableColumns);
  let stored = [];
  if (!options?.forceDefault) {
    try {
      const parsed = JSON.parse(localStorage.getItem(PLAYER_PROFILE_STORAGE_KEY) || "[]");
      if (Array.isArray(parsed)) stored = parsed;
    } catch (_error) {
      stored = [];
    }
  }
  const selected = stored.length ? stored : PLAYER_PROFILE_DEFAULT_COLUMNS;
  const visible = new Set([
    ...PLAYER_PROFILE_LOCKED_COLUMNS.filter((column) => available.has(column)),
    ...selected.filter((column) => available.has(column) && PLAYER_PROFILE_ALL_COLUMNS.includes(column)),
  ]);
  if (options?.forceDefault) savePlayerProfileVisibleColumns(visible);
  return visible;
}

function savePlayerProfileVisibleColumns(columns) {
  try {
    const ordered = PLAYER_PROFILE_ALL_COLUMNS.filter((column) => columns.has(column));
    localStorage.setItem(PLAYER_PROFILE_STORAGE_KEY, JSON.stringify(ordered));
  } catch (_error) {
    // Ignore storage failures; the current table still updates.
  }
}

function getPlayerProfileColorsEnabled() {
  try {
    return localStorage.getItem(PLAYER_PROFILE_COLOR_STORAGE_KEY) === "on";
  } catch (_error) {
    return false;
  }
}

function savePlayerProfileColorsEnabled(enabled) {
  try {
    localStorage.setItem(PLAYER_PROFILE_COLOR_STORAGE_KEY, enabled ? "on" : "off");
  } catch (_error) {
    // Ignore storage failures; the current profile view still updates.
  }
}

function getPlayerProfileCareerOnlyEnabled() {
  try {
    return localStorage.getItem(PLAYER_PROFILE_ROW_MODE_STORAGE_KEY) === "on";
  } catch (_error) {
    return false;
  }
}

function savePlayerProfileCareerOnlyEnabled(enabled) {
  try {
    localStorage.setItem(PLAYER_PROFILE_ROW_MODE_STORAGE_KEY, enabled ? "on" : "off");
  } catch (_error) {
    // Ignore storage failures; the current profile view still updates.
  }
}

function getPlayerProfileCommonColumnsOnlyEnabled() {
  try {
    return localStorage.getItem(PLAYER_PROFILE_COMMON_COLUMNS_STORAGE_KEY) === "on";
  } catch (_error) {
    return false;
  }
}

function savePlayerProfileCommonColumnsOnlyEnabled(enabled) {
  try {
    localStorage.setItem(PLAYER_PROFILE_COMMON_COLUMNS_STORAGE_KEY, enabled ? "on" : "off");
  } catch (_error) {
    // Ignore storage failures; the current profile view still updates.
  }
}

function getPlayerProfileSeasonCombinedEnabled() {
  try {
    return localStorage.getItem(PLAYER_PROFILE_SEASON_COMBINED_STORAGE_KEY) === "on";
  } catch (_error) {
    return false;
  }
}

function savePlayerProfileSeasonCombinedEnabled(enabled) {
  try {
    localStorage.setItem(PLAYER_PROFILE_SEASON_COMBINED_STORAGE_KEY, enabled ? "on" : "off");
  } catch (_error) {
    // Ignore storage failures; the current profile view still updates.
  }
}

function buildPlayerProfileColumnControlsHtml(visibleColumns, availableColumns = PLAYER_PROFILE_ALL_COLUMNS) {
  const available = new Set(availableColumns);
  const colorChecked = getPlayerProfileColorsEnabled() ? " checked" : "";
  const careerOnlyChecked = getPlayerProfileCareerOnlyEnabled() ? " checked" : "";
  const commonOnlyChecked = getPlayerProfileCommonColumnsOnlyEnabled() ? " checked" : "";
  const seasonCombinedChecked = getPlayerProfileSeasonCombinedEnabled() ? " checked" : "";
  const groups = PLAYER_PROFILE_COLUMN_GROUPS.map((group) => {
    const groupColumns = group.columns.filter((column) => available.has(column));
    if (!groupColumns.length) return "";
    const options = groupColumns.map((column) => {
      const locked = PLAYER_PROFILE_LOCKED_COLUMNS.includes(column);
      const checked = visibleColumns.has(column) ? " checked" : "";
      const disabled = locked ? " disabled" : "";
      return `<label class="player-profile-column-option"><input type="checkbox" data-profile-column-toggle="${escapeAttribute(column)}"${checked}${disabled}> <span>${escapeHtml(getPlayerProfileColumnLabel(DATASETS.player_career, column))}</span></label>`;
    }).join("");
    const selectedCount = groupColumns.filter((column) => visibleColumns.has(column)).length;
    return `<details class="player-profile-column-group"><summary><span class="player-profile-column-summary-text">${escapeHtml(group.label)}</span><span class="player-profile-column-summary-count" data-profile-column-count="${escapeAttribute(group.id)}">${selectedCount}/${groupColumns.length}</span><span class="player-profile-column-summary-actions"><button type="button" data-profile-column-group="${escapeAttribute(group.id)}" data-profile-column-group-mode="show">Show</button><button type="button" data-profile-column-group="${escapeAttribute(group.id)}" data-profile-column-group-mode="hide">Hide</button></span></summary><div class="player-profile-column-options">${options}</div></details>`;
  }).filter(Boolean).join("");
  return `
    <div class="player-profile-column-controls" data-player-profile-columns>
      <div class="player-profile-column-actions">
        <button type="button" data-profile-column-mode="default">Default</button>
        <button type="button" data-profile-column-mode="all">Show All</button>
        <button type="button" data-profile-column-mode="none">Hide All</button>
        <label class="player-profile-color-toggle"><input type="checkbox" data-profile-career-only-toggle${careerOnlyChecked}> Career Only</label>
        <label class="player-profile-color-toggle"><input type="checkbox" data-profile-common-columns-toggle${commonOnlyChecked}> Common Stats</label>
        <label class="player-profile-color-toggle"><input type="checkbox" data-profile-season-combined-toggle${seasonCombinedChecked}> Season Combined</label>
        <label class="player-profile-color-toggle"><input type="checkbox" data-profile-color-toggle${colorChecked}> Colors</label>
      </div>
      <div class="player-profile-column-groups">${groups}</div>
    </div>
  `;
}

function bindPlayerProfileColumnControls(root) {
  const container = root?.querySelector?.("[data-player-profile-columns]");
  if (!container || container.dataset.bound === "true") return;
  container.dataset.bound = "true";
  container.addEventListener("change", (event) => {
    const input = event.target instanceof HTMLInputElement ? event.target : null;
    const available = root?._playerProfileAvailableColumns instanceof Set ? root._playerProfileAvailableColumns : new Set(PLAYER_PROFILE_ALL_COLUMNS);
    if (input?.matches("[data-profile-career-only-toggle]")) {
      savePlayerProfileCareerOnlyEnabled(input.checked);
      renderPlayerProfileModal(root, root?._playerProfileName || "", root?._playerProfileRows || [], root?._playerProfileOptions || {});
      return;
    }
    if (input?.matches("[data-profile-common-columns-toggle]")) {
      savePlayerProfileCommonColumnsOnlyEnabled(input.checked);
      renderPlayerProfileModal(root, root?._playerProfileName || "", root?._playerProfileRows || [], root?._playerProfileOptions || {});
      return;
    }
    if (input?.matches("[data-profile-season-combined-toggle]")) {
      savePlayerProfileSeasonCombinedEnabled(input.checked);
      renderPlayerProfileModal(root, root?._playerProfileName || "", root?._playerProfileRows || [], root?._playerProfileOptions || {});
      return;
    }
    if (input?.matches("[data-profile-color-toggle]")) {
      savePlayerProfileColorsEnabled(input.checked);
      renderPlayerProfileModal(root, root?._playerProfileName || "", root?._playerProfileRows || [], root?._playerProfileOptions || {});
      return;
    }
    if (!input?.matches("[data-profile-column-toggle]")) return;
    const selected = new Set(PLAYER_PROFILE_LOCKED_COLUMNS.filter((column) => available.has(column)));
    container.querySelectorAll("[data-profile-column-toggle]").forEach((item) => {
      if (item instanceof HTMLInputElement && item.checked) selected.add(item.dataset.profileColumnToggle);
    });
    savePlayerProfileVisibleColumns(selected);
    applyPlayerProfileColumnVisibility(root, selected);
  });
  container.querySelectorAll("[data-profile-column-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.profileColumnMode;
      const available = root?._playerProfileAvailableColumns instanceof Set ? root._playerProfileAvailableColumns : new Set(PLAYER_PROFILE_ALL_COLUMNS);
      const selected = new Set(PLAYER_PROFILE_LOCKED_COLUMNS.filter((column) => available.has(column)));
      const source = mode === "all"
        ? PLAYER_PROFILE_ALL_COLUMNS.filter((column) => available.has(column))
        : (mode === "none"
          ? PLAYER_PROFILE_LOCKED_COLUMNS.filter((column) => available.has(column))
          : PLAYER_PROFILE_DEFAULT_COLUMNS.filter((column) => available.has(column)));
      source.forEach((column) => selected.add(column));
      container.querySelectorAll("[data-profile-column-toggle]").forEach((item) => {
        if (item instanceof HTMLInputElement) item.checked = selected.has(item.dataset.profileColumnToggle);
      });
      savePlayerProfileVisibleColumns(selected);
      applyPlayerProfileColumnVisibility(root, selected);
    });
  });
  container.querySelectorAll("[data-profile-column-group-mode]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const groupId = button.dataset.profileColumnGroup;
      const group = PLAYER_PROFILE_COLUMN_GROUPS.find((item) => item.id === groupId);
      if (!group) return;
      const available = root?._playerProfileAvailableColumns instanceof Set ? root._playerProfileAvailableColumns : new Set(PLAYER_PROFILE_ALL_COLUMNS);
      const groupColumns = group.columns.filter((column) => available.has(column));
      const selected = new Set(PLAYER_PROFILE_LOCKED_COLUMNS.filter((column) => available.has(column)));
      container.querySelectorAll("[data-profile-column-toggle]").forEach((item) => {
        if (item instanceof HTMLInputElement && item.checked) selected.add(item.dataset.profileColumnToggle);
      });
      const show = button.dataset.profileColumnGroupMode === "show";
      groupColumns.forEach((column) => {
        if (show || PLAYER_PROFILE_LOCKED_COLUMNS.includes(column)) selected.add(column);
        else selected.delete(column);
      });
      container.querySelectorAll("[data-profile-column-toggle]").forEach((item) => {
        if (item instanceof HTMLInputElement) item.checked = selected.has(item.dataset.profileColumnToggle);
      });
      savePlayerProfileVisibleColumns(selected);
      applyPlayerProfileColumnVisibility(root, selected);
    });
  });
}

function applyPlayerProfileColorVisibility(root, enabled) {
  root?.querySelectorAll?.("[data-profile-color-style]").forEach((cell) => {
    if (!(cell instanceof HTMLElement)) return;
    const style = getStringValue(cell.dataset.profileColorStyle);
    if (enabled && style) cell.setAttribute("style", style);
    else cell.removeAttribute("style");
  });
}

function applyPlayerProfileRowVisibility(root, careerOnly) {
  root?.querySelectorAll?.("[data-profile-row-kind]").forEach((row) => {
    if (!(row instanceof HTMLElement)) return;
    row.hidden = careerOnly && row.dataset.profileRowKind !== "career";
  });
}

function bindPlayerProfileSortControls(root) {
  const target = getPlayerProfileRenderTarget(root);
  target?.querySelectorAll?.("[data-profile-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const column = getStringValue(button.getAttribute("data-profile-sort")).trim();
      const dir = getStringValue(button.getAttribute("data-profile-sort-dir")).trim() || "desc";
      if (!column) return;
      savePlayerProfileSortState({ column, dir }, Array.from(root?._playerProfileAvailableColumns || []));
      renderPlayerProfileModal(root, root?._playerProfileName || "", root?._playerProfileRows || [], root?._playerProfileOptions || {});
    });
  });
}

function applyPlayerProfileColumnVisibility(root, selected) {
  root?.querySelectorAll?.("[data-profile-column]").forEach((cell) => {
    const column = cell.dataset.profileColumn;
    cell.hidden = !selected.has(column);
  });
  const available = root?._playerProfileAvailableColumns instanceof Set ? root._playerProfileAvailableColumns : new Set(PLAYER_PROFILE_ALL_COLUMNS);
  PLAYER_PROFILE_COLUMN_GROUPS.forEach((group) => {
    const counter = root?.querySelector?.(`[data-profile-column-count="${CSS.escape(group.id)}"]`);
    if (!counter) return;
    const groupColumns = group.columns.filter((column) => available.has(column));
    const selectedCount = groupColumns.filter((column) => selected.has(column)).length;
    counter.textContent = `${selectedCount}/${groupColumns.length}`;
  });
}

async function renderPlayerProfileRoute(params) {
  const sourceRow = buildPlayerProfileRouteRow(params);
  const name = getPlayerProfileDisplayName(sourceRow) || "Player";
  elements.queryPanel.hidden = true;
  elements.queryPanel.style.display = "none";
  elements.tableContent.hidden = true;
  elements.tableContent.style.display = "none";
  elements.homeContent.hidden = false;
  elements.homeContent.style.display = "block";
  elements.homeContent.classList.add("profile-content");
  elements.pageTitle.textContent = name;
  elements.pageSubtitle.textContent = "Logged seasons";
  elements.statusPill.textContent = `Loading ${name}`;
  elements.filtersSummary.textContent = "";
  elements.resultsCount.textContent = "";
  elements.resultsSubtitle.textContent = "";
  elements.homeContent.innerHTML = `<div class="player-profile-loading">Loading ${escapeHtml(name)} seasons...</div>`;
  try {
    const rows = await loadPlayerProfileRowsProgressively(
      sourceRow,
      getStringValue(params?.get("dataset")).trim(),
      (nextRows, meta = {}) => {
        if (appState.currentId !== PROFILE_ROUTE_ID) return;
        renderPlayerProfileModal(elements.homeContent, name, nextRows, { standalone: true, loadingMore: Boolean(meta.loadingMore) });
      },
    );
    if (appState.currentId !== PROFILE_ROUTE_ID) return;
    renderPlayerProfileModal(elements.homeContent, name, rows, { standalone: true, loadingMore: false });
    elements.statusPill.textContent = `${name} ready`;
  } catch (error) {
    if (appState.currentId !== PROFILE_ROUTE_ID) return;
    elements.statusPill.textContent = `${name} load failed`;
    elements.homeContent.innerHTML = `<div class="player-profile-loading">Unable to load seasons: ${escapeHtml(getStringValue(error?.message || error))}</div>`;
  }
}

function buildPlayerProfileRouteRow(params) {
  const row = {};
  if (!params) return row;
  const setText = (field, param = field) => {
    const value = getStringValue(params.get(param)).trim();
    if (value) row[field] = value;
  };
  setText("player_name", "name");
  setText("realgm_player_id", "rgm");
  setText("source_player_id", "source");
  setText("canonical_player_id", "canonical");
  setText("player_profile_key", "profile_key");
  setText("dob", "dob");
  setText("birthday", "dob");
  setText("dataset", "dataset");
  setText("source_dataset", "dataset");
  const height = Number(params.get("height"));
  if (Number.isFinite(height) && height > 0) row.height_in = height;
  const pick = Number(params.get("pick"));
  if (Number.isFinite(pick) && pick > 0 && pick <= 60) row.draft_pick = pick;
  return row;
}

function getPlayerProfileDisplayName(row) {
  return normalizeDisplayName(getStringValue(row?.player_name || row?.player || row?.realgm_player_name || row?.nba_name || row?.name).trim());
}

function sanitizeCellDisplayValue(value) {
  return getStringValue(value).replace(/\s+/g, " ").trim();
}

function buildColumnScales(dataset, state, visibleColumns, rows) {
  const scales = {};
  visibleColumns.forEach((column) => {
    if (!shouldColorColumn(dataset, column)) return;
    const weighted = shouldWeightPercentileColumn(dataset, column);
    const buckets = new Map();
    rows.forEach((row) => {
      const value = getRowColumnValue(dataset, row, column);
      if (typeof value !== "number" || !Number.isFinite(value)) return;
      if (shouldSkipPercentileColor(row, column)) return;
      const bucketKey = getCachedColorBucketKey(state, row);
      if (!buckets.has(bucketKey)) buckets.set(bucketKey, []);
      if (bucketKey !== "all" && !buckets.has("all")) buckets.set("all", []);
      if (weighted) {
        const weight = getPercentileWeight(row, column, dataset);
        if (!(weight > 0)) return;
        const weightedEntry = { value, weight };
        buckets.get(bucketKey).push(weightedEntry);
        if (bucketKey !== "all") buckets.get("all").push(weightedEntry);
        return;
      }
      buckets.get(bucketKey).push(value);
      if (bucketKey !== "all") buckets.get("all").push(value);
    });
    const sortedBuckets = {};
    buckets.forEach((values, key) => {
      if (values.length > 1) {
        sortedBuckets[key] = weighted
          ? values.sort((left, right) => left.value - right.value)
          : values.sort((left, right) => left - right);
      }
    });
    if (Object.keys(sortedBuckets).length) scales[column] = sortedBuckets;
  });
  return scales;
}

function getColorScale(dataset, state, visibleColumns) {
  const colorColumns = visibleColumns.filter((column) => shouldColorColumn(dataset, column));
  if (!colorColumns.length) return {};
  const cache = getRenderCache(state);
  const colorRows = getColorPopulation(dataset, state);
  const key = [
    cache.colorRowsKey || `${getDisplayRowsCacheKey(dataset, state)}|${getColorMinuteThreshold(dataset)}`,
    getStringValue(state.extraSelects?.color_mode || "year"),
    dataset?.id === "d1" ? getD1BartSplitMode(state) : "",
    colorColumns.join("|"),
  ].join("||");
  if (cache.colorScaleKey === key) return cache.colorScale;
  const colorScale = buildColumnScales(dataset, state, colorColumns, colorRows);
  cache.colorScaleKey = key;
  cache.colorScale = colorScale;
  return colorScale;
}

function shouldColorColumn(dataset, column) {
  if (isRelativeDisplayColumn(column)) return false;
  const baseColumn = stripCompanionPrefix(column);
  if (/^(gp|g|gs)$/i.test(baseColumn)) return false;
  if (/percentile$/i.test(baseColumn)) return false;
  if (dataset?.id === "combine") {
    return dataset.meta.statColumnSet.has(column) && dataset.meta.numericColumnSet.has(column);
  }
  if (isNonPerformanceInfoColorColumn(baseColumn)) return false;
  return dataset.meta.statColumnSet.has(column) && dataset.meta.numericColumnSet.has(column);
}

function isNonPerformanceInfoColorColumn(column) {
  return /^(rank|season|year|age|dob|birthday|draft_year|draft_pick|pick|rookie_year|height|height_in|inches|weight|weight_lb|bmi)$/i.test(stripCompanionPrefix(column));
}

function isInverseColorColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  if (/^ast_pct_tov_pct$/i.test(baseColumn)) return false;
  if (/^tov_pct_def$/i.test(baseColumn)) return false;
  if (/^(drtg|losses)$/i.test(baseColumn)) return true;
  if (/^he_(?:d_rapm|rapm_def_)/i.test(baseColumn)) return true;
  if (/^(sprint|lane_agility|modified_lane_agility|shuttle)$/i.test(baseColumn)) return true;
  return /(^tov$|_tov$|tov_|topct$|tov_pct$|fg_miss$|two_fg_miss$|three_fg_miss$|^adj_de$|^adrtg$|^ppp_def$|^efg_pct_def$|^ft_rate_def$|^two_p_pct_def$|^three_p_pct_def$|^opp_oreb_pct$|^opp_ast_pct$|^blocked_pct$)/i.test(baseColumn);
}

function isInverseShotAssistColorColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /(^dunk_ast_pct$|^rim_ast_pct$|^mid_ast_pct$|^two_p_ast_pct$|^three_p_ast_pct$|^two_ast_pct$|^three_ast_pct$|^smr_ast_pct$|^lmr_ast_pct$|^c3_ast_pct$|^ab3_ast_pct$)/i.test(baseColumn);
}

function getColorBucketKey(state, row) {
  const mode = state?.extraSelects?.color_mode || "year";
  if (mode === "overall") return "all";
  if (mode === "position") {
    const pos = getStringValue(row?.pos || row?.pos_text).trim();
    return pos || "all";
  }
  const competition = getStringValue(row?.competition_label || row?.competition_key || row?.event || row?.competition_level || row?.source_dataset || row?.league).trim();
  if (mode === "competition") {
    return competition || "all";
  }
  const season = getStringValue(row?.season) || "all";
  if (mode === "competition_position") {
    const pos = getStringValue(row?.pos || row?.pos_text).trim();
    if (competition && pos) return `${competition}|${pos}`;
    return competition || pos || "all";
  }
  if (mode === "year_position") {
    const pos = getStringValue(row?.pos || row?.pos_text).trim();
    return pos ? `${season}|${pos}` : season;
  }
  return season;
}

function getCachedColorBucketKey(state, row) {
  if (!row) return "all";
  const mode = state?.extraSelects?.color_mode || "year";
  const viewMode = state?.extraSelects?.view_mode || "player";
  const cacheKey = `${viewMode}|${mode}`;
  if (row._colorBucketCacheKey !== cacheKey) {
    row._colorBucketCacheKey = cacheKey;
    row._colorBucketValue = getColorBucketKey(state, row);
  }
  return row._colorBucketValue || "all";
}

function getCellStyle(dataset, state, column, value, colorScale, row) {
  if (getStringValue(state?.extraSelects?.color_mode).trim() === "none") return "";
  if (!shouldColorColumn(dataset, column)) return "";
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  const fixedPercentile = getFixedBoundedPercentile(column, value);
  if (fixedPercentile != null) {
    let pct = fixedPercentile;
    if (isInverseColorColumn(column)) pct = 1 - pct;
    if (isInverseShotAssistColorColumn(column)) pct = 1 - pct;
    const style = colorFromPercentile(pct);
    return `background-color: ${style.bg}; color: ${style.color};`;
  }
  if (isZeroAttemptThreePointRow(row, column)) {
    return "background-color: rgb(226, 196, 184); color: #111111;";
  }
  const bucketKey = getCachedColorBucketKey(state, row);
  const distribution = colorScale[column]?.[bucketKey] || colorScale[column]?.all;
  if (!distribution) return "";
  let pct = percentileFromDistribution(distribution, value);
  if (pct == null) return "";
  if (isInverseColorColumn(column)) pct = 1 - pct;
  if (isInverseShotAssistColorColumn(column)) pct = 1 - pct;
  const style = colorFromPercentile(pct);
  return `background-color: ${style.bg}; color: ${style.color};`;
}

function getFixedBoundedPercentile(column, value) {
  if (!isFixedBoundedPercentColumn(column)) return null;
  const normalized = Math.abs(value) <= 1.5 && !/_poss$/i.test(column) ? value * 100 : value;
  if (!Number.isFinite(normalized)) return null;
  return Math.max(0, Math.min(100, normalized)) / 100;
}

function isFixedBoundedPercentColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  if (/percentile/i.test(baseColumn)) return false;
  return false;
}

function shouldWeightPercentileColumn(dataset, column) {
  const prefix = getD1PlaytypeColumnPrefix(column);
  if (dataset?.id === "grassroots") {
    const baseColumn = stripCompanionPrefix(column);
    if (/^(rank|season|age_range|level|circuit|setting|event_name|event_group|event_raw_name|event_aliases|player_search_text|team_search_text|player_aliases|team_aliases|player_name|team_name|team_full|state|team_state|pos|class_year|height_in|weight_lb|gp|min|mpg)$/i.test(baseColumn)) {
      return false;
    }
    return true;
  }
  if (!prefix) return false;
  return !/(?:_freq|_poss)$/i.test(stripCompanionPrefix(column));
}

function getD1PlaytypeColumnPrefix(column) {
  const baseColumn = stripCompanionPrefix(column);
  let best = "";
  D1_PLAYTYPE_FAMILY_PREFIXES.forEach((prefix) => {
    if (baseColumn === prefix || baseColumn.startsWith(`${prefix}_`)) {
      if (prefix.length > best.length) best = prefix;
    }
  });
  return best;
}

function getPercentileWeight(row, column, dataset) {
  const prefix = getD1PlaytypeColumnPrefix(column);
  if (prefix) {
    const freq = getD1PlaytypeFrequency(row, prefix);
    if (!Number.isFinite(freq) || freq < 0) return 1;
    if (freq >= PLAYTYPE_PERCENTILE_FREQ_FLOOR) return freq;
    return (freq * freq) / PLAYTYPE_PERCENTILE_FREQ_FLOOR;
  }
  if (dataset?.id === "grassroots") {
    const explicitWeight = Number(row?.percentile_weight);
    const baseWeight = Number.isFinite(explicitWeight) && explicitWeight > 0
      ? explicitWeight
      : Math.max(getMinutesValue(row), 1) * Math.max(getGamesValue(row), 1);
    if (isGrassrootsSampleSensitiveRatioColumn(column)) {
      return baseWeight * Math.max(getGamesValue(row), 1);
    }
    return baseWeight;
  }
  const explicitWeight = Number(row?.percentile_weight);
  if (Number.isFinite(explicitWeight) && explicitWeight > 0) return explicitWeight;
  return Math.max(getMinutesValue(row), 1);
}

function isGrassrootsSampleSensitiveRatioColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /^(three_pr|ftm_fga|three_pr_plus_ftm_fga)$/i.test(baseColumn);
}

function getD1PlaytypeFrequency(row, prefix) {
  const possColumn = prefix === "halfcourt"
    ? "halfcourt_poss"
    : prefix === "drive"
    ? "drive_poss"
    : `${prefix}_poss`;
  const poss = Number(row?.[possColumn]);
  const totalPoss = Number(row?.total_poss);
  if (Number.isFinite(poss) && Number.isFinite(totalPoss) && totalPoss > 0) return (poss / totalPoss) * 100;
  const direct = normalizeFrequencyPercentValue(row?.[`${prefix}_freq`]);
  if (Number.isFinite(direct)) return direct;
  if (prefix === "halfcourt") {
    const halfcourtPoss = Number(row?.halfcourt_poss);
    if (Number.isFinite(halfcourtPoss) && Number.isFinite(totalPoss) && totalPoss > 0) return (halfcourtPoss / totalPoss) * 100;
  }
  return Number.NaN;
}

function buildWeightedPercentileDistribution(items) {
  const sorted = items
    .map((item) => ({
      value: Number(item?.value),
      weight: Number.isFinite(item?.weight) && item.weight > 0 ? item.weight : 1,
    }))
    .filter((item) => Number.isFinite(item.value) && item.weight > 0)
    .sort((left, right) => left.value - right.value);
  const values = new Array(sorted.length);
  const cumulativeWeights = new Array(sorted.length);
  let totalWeight = 0;
  sorted.forEach((item, index) => {
    values[index] = item.value;
    totalWeight += item.weight;
    cumulativeWeights[index] = totalWeight;
  });
  return { values, cumulativeWeights, totalWeight };
}

function percentileFromDistribution(distribution, value) {
  if (Array.isArray(distribution)) {
    if (!distribution.length) return null;
    if (typeof distribution[0] === "number") return percentileFromSorted(distribution, value);
    return percentileFromWeightedDistribution(buildWeightedPercentileDistribution(distribution), value);
  }
  return percentileFromWeightedDistribution(distribution, value);
}

function percentileFromWeightedDistribution(distribution, value) {
  const values = distribution?.values || [];
  const cumulativeWeights = distribution?.cumulativeWeights || [];
  const totalWeight = distribution?.totalWeight || cumulativeWeights[cumulativeWeights.length - 1] || 0;
  if (!values.length || !(totalWeight > 0)) return null;
  const first = lowerBound(values, value);
  const last = upperBound(values, value) - 1;
  if (last < 0) return 0;
  const lowerWeight = first > 0 ? cumulativeWeights[first - 1] : 0;
  const upperWeight = last >= 0 ? cumulativeWeights[last] : 0;
  return ((lowerWeight + upperWeight) / 2) / totalWeight;
}

function lowerBound(values, target) {
  let lo = 0;
  let hi = values.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (values[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function upperBound(values, target) {
  let lo = 0;
  let hi = values.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (values[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function shouldSkipPercentileColor(row, column) {
  if (isZeroAttemptThreePointRow(row, column)) return true;
  if (isZeroAttemptTwoPointRow(row, column)) return true;
  if (isZeroAttemptFreeThrowRow(row, column)) return true;
  if (isZeroAttemptEfgRow(row, column)) return true;
  if (isZeroAttemptRimMidRow(row, column)) return true;
  return false;
}

function isZeroAttemptThreePointRow(row, column) {
  if (!/(^3p_pct$|^tp_pct$|^three_p_pct$|^fg3pct$|^three_fg_pct$)/i.test(column)) return false;
  const attempts = firstFinite(row["3pa"], row.tpa, row.three_pa, Number.NaN);
  return Number.isFinite(attempts) && attempts <= 0;
}

function isZeroAttemptTwoPointRow(row, column) {
  if (!/(^2p_pct$|^two_p_pct$|^fg2pct$|^two_fg_pct$)/i.test(column)) return false;
  const attempts = firstFinite(row["2pa"], row.two_pa, row["2pa_total"], Number.NaN);
  return Number.isFinite(attempts) && attempts <= 0;
}

function isZeroAttemptFreeThrowRow(row, column) {
  if (!/(^ft_pct$|^ftpct$)/i.test(column)) return false;
  const attempts = firstFinite(row.fta, Number.NaN);
  return Number.isFinite(attempts) && attempts <= 0;
}

function isZeroAttemptEfgRow(row, column) {
  if (!/(^efg$|^efg_pct$)/i.test(column)) return false;
  const attempts = firstFinite(row.fga, Number.NaN);
  return Number.isFinite(attempts) && attempts <= 0;
}

function isZeroAttemptRimMidRow(row, column) {
  const baseColumn = stripCompanionPrefix(column);
  if (/^rim_pct$/i.test(baseColumn)) {
    const attempts = firstFinite(row.rim_att, Number.NaN);
    return Number.isFinite(attempts) && attempts <= 0;
  }
  if (/^mid_pct$/i.test(baseColumn)) {
    const attempts = firstFinite(row.mid_att, Number.NaN);
    return Number.isFinite(attempts) && attempts <= 0;
  }
  return false;
}

function percentileFromSorted(arr, value) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] >= value) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  let first = lo;
  lo = 0;
  hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (arr[mid] <= value) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  const last = lo;
  return ((first + last) / 2) / (arr.length - 1);
}

function colorFromPercentile(pct) {
  const clamped = Math.min(1, Math.max(0, pct));
  if (clamped >= 0.495 && clamped <= 0.505) {
    return { bg: "#ffffff", color: "#111111" };
  }
  if (clamped < 0.495) {
    const t = Math.pow((0.495 - clamped) / 0.495, 0.82);
    return interpolateColorStops(["#fff7f3", "#f8ddd4", "#efb8a8", "#dc856f", "#bd5945"], t);
  }
  const t = Math.pow((clamped - 0.505) / 0.495, 0.82);
  return interpolateColorStops(["#f8fcf9", "#e5f2e8", "#c8e0cd", "#9bc8a4", "#68a977"], t);
}

function subtlePercentileGradient(value) {
  return Math.pow(Math.min(1, Math.max(0, value)), 1.55);
}

function smoothstep(value) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - (2 * t));
}

function mixColors(startHex, endHex, t) {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const clamp = Math.min(1, Math.max(0, t));
  const r = Math.round(start.r + (end.r - start.r) * clamp);
  const g = Math.round(start.g + (end.g - start.g) * clamp);
  const b = Math.round(start.b + (end.b - start.b) * clamp);
  return { bg: `rgb(${r}, ${g}, ${b})`, color: getReadableTextColor(r, g, b) };
}

function interpolateColorStops(stops, t) {
  const normalized = Math.min(1, Math.max(0, t));
  if (!Array.isArray(stops) || stops.length < 2) return mixColors("#ffffff", "#ffffff", 0);
  const scaled = normalized * (stops.length - 1);
  const lowerIndex = Math.floor(scaled);
  const upperIndex = Math.min(stops.length - 1, lowerIndex + 1);
  const localT = scaled - lowerIndex;
  return mixColors(stops[lowerIndex], stops[upperIndex], localT);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function getReadableTextColor(r, g, b) {
  return "#111111";
}

function updateSummary(dataset, state, filtered) {
  if (dataset?.id === "grassroots" && getGrassrootsPendingYearsKey(state)) {
    const pendingYears = getGrassrootsPendingYearsKey(state).split("|").filter(Boolean);
    const selectedYears = getSummaryYearLabel(dataset, state, state?.extraSelects?.view_mode === "career");
    const search = state.search.trim();
    const showingText = filtered.length ? `Showing ${Math.min(filtered.length, state.visibleCount).toLocaleString()} of ${filtered.length.toLocaleString()}` : "";
    const pendingText = pendingYears.length === 1
      ? `adding ${formatSelectedYearSummary(pendingYears)} in background`
      : `adding ${pendingYears.length.toLocaleString()} years in background`;
    elements.filtersSummary.textContent = `Years: ${selectedYears} | Team: ${state.team === "all" ? "all" : state.team} | Search: ${search || "none"}`;
    elements.resultsCount.textContent = "";
    elements.resultsSubtitle.textContent = showingText ? `${showingText}; ${pendingText}` : pendingText;
    return;
  }
  if (dataset?.id === "grassroots" && state?._grassrootsLoadingScope) {
    const loadingLabel = state._grassrootsLoadingScope.replace(/_/g, " ");
    elements.filtersSummary.textContent = `Loading ${loadingLabel} career data...`;
    elements.resultsCount.textContent = "";
    elements.resultsSubtitle.textContent = `Loading ${loadingLabel} career data...`;
    return;
  }
  const careerMode = state?.extraSelects?.view_mode === "career";
  const selectedYears = getSummaryYearLabel(dataset, state, careerMode);
  const search = state.search.trim();
  const capitanesFilterText = dataset?.id === "capitanesreference" ? ` | ${getCapitanesFilterSummary(dataset, state)}` : "";
  elements.filtersSummary.textContent = `Years: ${selectedYears} | Team: ${state.team === "all" ? "all" : state.team} | Search: ${search || "none"}${capitanesFilterText}`;
  elements.resultsCount.textContent = "";
  const showingText = filtered.length ? `Showing ${Math.min(filtered.length, state.visibleCount).toLocaleString()} of ${filtered.length.toLocaleString()}` : "";
  if (dataset?.id === "player_career" && getPlayerCareerPendingYearsKey(state)) {
    const pendingYears = getPlayerCareerPendingYearsKey(state).split("|").filter(Boolean);
    const pendingText = pendingYears.length === 1
      ? `adding ${formatSelectedYearSummary(pendingYears)} in background`
      : `adding ${pendingYears.length.toLocaleString()} years in background`;
    elements.resultsSubtitle.textContent = showingText ? `${showingText}; ${pendingText}` : pendingText;
    return;
  }
  if (dataset?.id === "d1" && getD1PendingYearsKey(state)) {
    const pendingYears = getD1PendingYearsKey(state).split("|").filter(Boolean);
    const pendingText = pendingYears.length === 1
      ? `adding ${formatSelectedYearSummary(pendingYears)} in background`
      : `adding ${pendingYears.length.toLocaleString()} years in background`;
    elements.resultsSubtitle.textContent = showingText ? `${showingText}; ${pendingText}` : pendingText;
    return;
  }
  elements.resultsSubtitle.textContent = showingText;
}

function getSummaryYearLabel(dataset, state, careerMode = false) {
  if (dataset?.id === "grassroots" && getStringValue(state?.search).trim()) {
    const activeYears = Array.from(getEffectiveYearFilterSet(dataset, state));
    if (!activeYears.length) return "none";
    const availableYears = getGrassrootsCareerYears(dataset, state).map((year) => getStringValue(year).trim()).filter(Boolean);
    const allSelected = availableYears.length
      && activeYears.length === availableYears.length
      && activeYears.every((year) => availableYears.includes(year));
    return allSelected ? "All Years" : formatSelectedYearSummary(activeYears);
  }
  if (careerMode) return getCareerYearLabel(dataset, state);
  return state?.years?.size ? formatSelectedYearSummary(Array.from(state.years)) : "none";
}

function renderFinderBar(dataset, state) {
  if (!elements.finderTitle || !elements.finderQuery || !elements.yearQuickSelect) return;
  const careerMode = state?.extraSelects?.view_mode === "career";
  const grassrootsCareerMode = dataset?.id === "grassroots" && careerMode;
  const selectedYears = Array.from(state.years).sort(compareYears);
  const singleYear = selectedYears.length === 1 ? selectedYears[0] : "all";
  const years = grassrootsCareerMode ? getGrassrootsCareerYears(dataset, state) : getAvailableYears(dataset);
  elements.yearQuickSelect.innerHTML = [
    '<option value="all">All years</option>',
    ...years.map((year) => `<option value="${escapeAttribute(year)}"${singleYear === year ? " selected" : ""}>${escapeHtml(formatYearValueLabel(year))}</option>`),
  ].join("");
  elements.yearQuickSelect.value = singleYear;
  elements.yearQuickSelect.disabled = Boolean(state?._grassrootsLoadingScope || getGrassrootsPendingYearsKey(state) || getPlayerCareerPendingYearsKey(state) || getD1PendingYearsKey(state));
  const yearLabel = careerMode ? getCareerYearLabel(dataset, state) : (selectedYears.length === 1 ? formatYearValueLabel(selectedYears[0]) : "All Years");
  elements.finderTitle.textContent = `${yearLabel} ${dataset.navLabel} Finder`;
  elements.finderQuery.textContent = buildFinderQueryText(dataset, state);

  elements.yearQuickSelect.onchange = async () => {
    const value = elements.yearQuickSelect.value;
    if (grassrootsCareerMode) {
      state.years = value === "all" ? new Set() : new Set([value]);
      state._yearSelectionTouched = true;
      resetUiCaches(state);
      renderCurrentDataset();
      return;
    }
    const targetYears = value === "all" ? years : [value];
    try {
      if (dataset.id === "grassroots" && dataset._grassrootsChunked && value === "all") {
        state.years = new Set(targetYears);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "player_career" && dataset._playerCareerChunked && value === "all") {
        state.years = new Set(targetYears);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        schedulePlayerCareerSelectedYearLoad(dataset, state);
        renderCurrentDataset();
        return;
      }
      if (dataset.id === "d1" && isMobileLiteD1Dataset(dataset)) {
        state.years = value === "all" ? new Set(targetYears) : new Set([value]);
        state._yearSelectionTouched = true;
        resetUiCaches(state);
        scheduleD1SelectedYearLoad(dataset, state);
        renderCurrentDataset();
        return;
      }
      await ensureDatasetYearsLoaded(dataset, targetYears);
      state.years = value === "all" ? new Set(targetYears) : new Set([value]);
      state._yearSelectionTouched = true;
      await ensureStatusReadyForState(dataset, state);
      if (appState.currentId !== dataset.id) return;
      renderCurrentDataset();
    } catch (error) {
      elements.statusPill.textContent = `${dataset.navLabel} load failed`;
      elements.resultsSubtitle.textContent = getStringValue(error?.message || error);
    }
  };
}

function buildFinderQueryText(dataset, state) {
  if (dataset?.id === "capitanesreference") return buildCapitanesFinderQueryText(dataset, state);
  const parts = [];
  if (state.search.trim()) parts.push(`Search: ${state.search.trim()}`);
  if (state.team !== "all") parts.push(`Team: ${state.team}`);

  (dataset.singleFilters || []).forEach((filter) => {
    if (["view_mode", "color_mode"].includes(filter.id)) return;
    const value = state.extraSelects[filter.id];
    const defaultValue = getStringValue(filter.defaultValue ?? "all");
    if (!value || value === "all" || value === defaultValue) return;
    const label = getSingleFilterOptions(dataset, filter, state).find((option) => option.value === value)?.label || value;
    parts.push(`${filter.label}: ${label}`);
  });

  (dataset.multiFilters || []).forEach((filter) => {
    const values = Array.from(state.multiSelects[filter.id] || []);
    if (!values.length) return;
    parts.push(`${filter.label}: ${values.join("/")}`);
  });

  Object.entries(state.demoFilters || {}).forEach(([column, filter]) => {
    if (!filter?.min && !filter?.max) return;
    parts.push(formatFilterRange(displayLabel(dataset, column), filter.min, filter.max));
  });

  Object.entries(state.numericFilters || {}).forEach(([column, filter]) => {
    if (!filter?.min && !filter?.max) return;
    parts.push(formatFilterRange(displayLabel(dataset, column), filter.min, filter.max));
  });

  if (!parts.length) return "No quality filter.";
  return parts.join("; ");
}

function getCapitanesFilterSummary(dataset, state) {
  return (dataset.multiFilters || [])
    .map((filter) => `${filter.label}: ${getCompactMultiFilterSummary(state.multiSelects?.[filter.id])}`)
    .join(" | ");
}

function getCompactMultiFilterSummary(selected) {
  if (selected?.has(MULTI_FILTER_NONE_VALUE)) return "none";
  return selected?.size ? `${selected.size} selected` : "all";
}

function buildCapitanesFinderQueryText(dataset, state) {
  const filterParts = [];
  (dataset.singleFilters || []).forEach((filter) => {
    if (["view_mode", "color_mode", "percentile_mode"].includes(filter.id)) return;
    const value = state.extraSelects[filter.id];
    const defaultValue = getStringValue(filter.defaultValue ?? "all");
    if (!value || value === "all" || value === defaultValue) return;
    const label = getSingleFilterOptions(dataset, filter, state).find((option) => option.value === value)?.label || value;
    filterParts.push(`${filter.label}: ${label}`);
  });
  (dataset.multiFilters || []).forEach((filter) => {
    const selected = state.multiSelects[filter.id] || new Set();
    if (!selected.size) return;
    if (selected.has(MULTI_FILTER_NONE_VALUE)) {
      filterParts.push(`${filter.label}: none`);
      return;
    }
    const values = Array.from(selected);
    filterParts.push(`${filter.label}: ${values.length <= 3 ? values.join("/") : `${values.length} selected`}`);
  });

  const infoParts = [];
  Object.entries(state.demoFilters || {}).forEach(([column, filter]) => {
    const minValue = getStringValue(filter?.min).trim();
    const maxValue = getStringValue(filter?.max).trim();
    if (!minValue && !maxValue) return;
    if (minValue === getDefaultDemoFilterValue(dataset, column, "min") && maxValue === getDefaultDemoFilterValue(dataset, column, "max")) return;
    infoParts.push(formatFilterRange(displayLabel(dataset, column), minValue, maxValue));
  });

  const statParts = [];
  Object.entries(state.numericFilters || {}).forEach(([column, filter]) => {
    if (!filter?.min && !filter?.max) return;
    statParts.push(formatFilterRange(displayLabel(dataset, column), filter.min, filter.max));
  });

  const lines = [];
  if (filterParts.length) lines.push(`Filters: ${filterParts.join("; ")}`);
  if (infoParts.length) lines.push(`Info: ${infoParts.join("; ")}`);
  if (statParts.length) lines.push(`Stats: ${statParts.join("; ")}`);
  return lines.length ? lines.join("\n") : "No quality filter.";
}

function formatFilterRange(label, minValue, maxValue) {
  if (minValue && maxValue) return `${label} ${minValue}-${maxValue}`;
  if (minValue) return `${label} >= ${minValue}`;
  return `${label} <= ${maxValue}`;
}

function normalizeRows(rows, datasetId, options = {}) {
  if (!rows.length) return [];
  const columns = Object.keys(rows[0]).filter((column) => column && !column.startsWith("_"));
  const types = inferTypes(rows, columns);

  const normalized = rows.map((row) => {
    const out = {};
    columns.forEach((column) => {
      out[column] = coerceValue(row[column], types[column]);
    });
    return options.skipEnhance ? out : enhanceRowForDataset(out, datasetId);
  });
  return normalized.filter((row) => shouldKeepNormalizedDatasetRow(row, datasetId));
}

function shouldKeepNormalizedDatasetRow(row, datasetId) {
  if (datasetId === "d1") {
    const nameKey = normalizeNameKey(row?.player_name || row?.player);
    const teamKey = normalizeKey(row?.team_name || row?.team_full || row?.team);
    if (nameKey === "kevin miller" && teamKey === "southern methodist") return false;
    const hasExplicitId = [row?.canonical_player_id, row?.realgm_player_id, row?.source_player_id, row?.player_id, row?.pid, row?.id]
      .some((value) => getStringValue(value).trim());
    if (!hasExplicitId && normalizeKey(row?.profile_match_source) === "fallback" && !Number.isFinite(row?.min)) return false;
  }
  if (!["international", "fiba"].includes(datasetId)) return true;
  const statColumns = [
    "gp", "g", "min", "mp", "mpg", "pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf",
    "fgm", "fga", "two_pm", "two_pa", "three_pm", "three_pa", "ftm", "fta",
    "pts_pg", "trb_pg", "ast_pg", "per", "fic", "ortg", "drtg",
  ];
  return statColumns.some((column) => {
    const value = row?.[column];
    return typeof value === "number" && Number.isFinite(value) && Math.abs(value) > 0;
  });
}

function dedupeDatasetRows(rows, datasetId) {
  const grouped = new Map();
  rows.forEach((row, index) => {
    const season = getStringValue(row.season);
    const playerKey = getDuplicatePlayerKey(row, datasetId) || `row_${index}`;
    const teamKey = getDuplicateTeamKey(row, datasetId);
    const competitionKey = getDuplicateCompetitionKey(row, datasetId);
    const eventKey = datasetId === "grassroots"
      ? normalizeKey(row.event_group || row.event_name || row.event_raw_name || "")
      : "";
    const leagueKey = ["international", "fiba"].includes(datasetId)
      ? competitionKey
      : "";
    const key = datasetId === "grassroots"
      ? `${datasetId}|${season}|${eventKey}|${teamKey}|${playerKey}|${normalizeKey(row.circuit || "")}|${normalizeKey(row.setting || "")}`
      : `${datasetId}|${season}|${leagueKey}|${teamKey}|${playerKey}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });

  const primaryRows = Array.from(grouped.values()).map((group) => mergeDuplicateRows(group, datasetId));
  return collapseNearDuplicateRows(primaryRows, datasetId);
}

const DUPLICATE_STAT_SIGNATURE_COLUMNS = [
  "gp", "g", "gs", "min", "mp", "mpg", "pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "pf", "stocks",
  "fgm", "fga", "fg_pct", "two_pm", "two_pa", "two_p_pct", "three_pm", "three_pa", "three_p_pct", "ftm", "fta", "ft_pct",
  "pts_pg", "trb_pg", "ast_pg", "stl_pg", "blk_pg", "stocks_pg", "pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40", "stocks_per40",
  "adjoe", "adrtg", "porpag", "dporpag", "bpm", "per", "fic", "ppr", "ortg", "drtg",
  "drive_poss", "drive_freq", "hc_drive_freq", "drive_ppp", "drive_two_p_pct",
];

function getDuplicatePlayerKey(row, datasetId) {
  const explicitId = getExplicitIdentityId(row);
  if (explicitId) return `id:${explicitId}`;
  if (datasetId === "grassroots") {
    const grassrootsKey = getGrassrootsCareerNameYearKey(row) || getGrassrootsCareerAliasKey(row);
    if (grassrootsKey) return `grassroots:${normalizeKey(grassrootsKey)}`;
  }
  const name = normalizeNameKey(row?.player_name || row?.player || row?.realgm_player_name || row?.nba_name);
  return name ? `name:${name}` : "";
}

function getDuplicateTeamKey(row, datasetId) {
  if (datasetId === "grassroots") return normalizeKey(row?.team_full || row?.team_name || row?.team_alias || row?.team || "");
  return normalizeKey(row?.team_name || row?.team_full || row?.team_alias || row?.team_abbrev || row?.team || "");
}

function getDuplicateCompetitionKey(row, datasetId) {
  if (datasetId === "grassroots") {
    return normalizeKey(row?.event_group || row?.event_name || row?.event_raw_name || "");
  }
  if (datasetId === "fiba") {
    return normalizeInternationalLeagueAlias(row?.competition_key || row?.competition_label || row?.league_name || row?.league || "");
  }
  if (datasetId === "international") {
    return normalizeInternationalLeagueAlias(row?.league_name || row?.competition_label || row?.competition_key || row?.league || "");
  }
  return "";
}

function mergeDuplicateRows(rows, datasetId) {
  const sorted = (rows || []).slice().sort((left, right) => duplicateRowScore(right) - duplicateRowScore(left));
  const merged = { ...(sorted[0] || {}) };
  sorted.slice(1).forEach((row) => {
    mergeDuplicateRowFields(merged, row);
  });
  clearDerivedRowCaches(merged);
  if (datasetId === "international") {
    normalizeInternationalIdentity(merged);
  }
  normalizeDraftPickValue(merged);
  return merged;
}

function mergeDuplicateRowFields(target, source) {
  if (!target || !source) return target;
  Object.entries(source).forEach(([column, value]) => {
    if (column.startsWith("_") && column !== "_draftPickBlank") return;
    if (column === "draft_pick" && source._draftPickBlank) {
      target.draft_pick = "";
      target._draftPickBlank = true;
      return;
    }
    const current = target[column];
    if (isBlankDuplicateValue(current) && !isBlankDuplicateValue(value)) {
      target[column] = value;
      return;
    }
    if (/^(player_name|player|team_name|team_full|league_name|nationality|nationality_list|nationality_regions)$/i.test(column)) {
      const preferred = pickPreferredText([current, value]);
      if (preferred) target[column] = preferred;
    }
  });
  return target;
}

function isBlankDuplicateValue(value) {
  if (value == null || value === "") return true;
  return typeof value === "number" && !Number.isFinite(value);
}

function clearDerivedRowCaches(row) {
  if (!row) return;
  row._searchCacheKey = "";
  row._searchHaystack = "";
  row._colorBucketCacheKey = "";
  row._colorBucketValue = "";
  row.stat_search_text = buildStatSearchText(row);
}

function collapseNearDuplicateRows(rows, datasetId) {
  if (!Array.isArray(rows) || rows.length <= 1) return rows;
  const output = [];
  const buckets = new Map();
  rows.forEach((row, index) => {
    const playerKey = getDuplicatePlayerKey(row, datasetId);
    const season = getStringValue(row?.season).trim();
    const signature = buildDuplicateStatSignature(row);
    const competitionKey = getDuplicateCompetitionKey(row, datasetId);
    if (!playerKey || !season || !signature) {
      output.push({ index, row });
      return;
    }
    const key = `${datasetId}|${season}|${competitionKey}|${playerKey}|${signature}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push({ row, index });
  });
  buckets.forEach((items) => {
    const index = Math.min(...items.map((item) => item.index));
    if (items.length === 1) {
      output.push({ index, row: items[0].row });
      return;
    }
    const groupRows = items.map((item) => item.row);
    output.push({ index, row: mergeDuplicateRows(groupRows, datasetId) });
  });
  return output.sort((left, right) => left.index - right.index).map((item) => item.row);
}

function buildDuplicateStatSignature(row) {
  const parts = [];
  DUPLICATE_STAT_SIGNATURE_COLUMNS.forEach((column) => {
    const value = row?.[column];
    if (isBlankDuplicateValue(value)) return;
    if (typeof value === "number" && Number.isFinite(value)) {
      parts.push(`${column}:${roundNumber(value, 3)}`);
      return;
    }
    const text = getStringValue(value).trim();
    if (text) parts.push(`${column}:${normalizeKey(text)}`);
  });
  return parts.length >= 4 ? parts.join("|") : "";
}

function duplicateRowScore(row) {
  const minutes = Math.max(getMinutesValue(row), 0);
  const gp = Math.max(firstFinite(row.gp, row.g, 0), 0);
  const nonEmpty = Object.entries(row || {}).reduce((sum, [column, value]) => {
    if (column.startsWith("_")) return sum;
    if (value == null || value === "") return sum;
    if (typeof value === "number" && !Number.isFinite(value)) return sum;
    return sum + 1;
  }, 0);
  const playerIdBonus = getExplicitIdentityId(row) ? 10 : 0;
  return (minutes * 100) + (gp * 10) + nonEmpty + playerIdBonus;
}

function annotateTrustedD1Rows(rows) {
  const teamSeasonMap = new Map();
  rows.forEach((row) => {
    const key = `${getStringValue(row.season)}|${normalizeKey(row.team_name || row.team_full)}`;
    if (!teamSeasonMap.has(key)) teamSeasonMap.set(key, []);
    teamSeasonMap.get(key).push(row);
  });

  teamSeasonMap.forEach((teamRows) => {
    const confCounts = new Map();
    teamRows.forEach((row) => {
      const conf = getStringValue(row.conference).trim();
      if (!conf) return;
      confCounts.set(conf, (confCounts.get(conf) || 0) + 1);
    });
    const total = teamRows.length || 1;
    const dominant = Math.max(0, ...confCounts.values());
    const trusted = confCounts.size > 0 && confCounts.size <= 2 && (dominant / total) >= 0.6;
    teamRows.forEach((row) => {
      row._trustedD1 = trusted;
    });
  });
}

function enhanceRowForDataset(row, datasetId) {
  const out = { ...row };
  tagDatasetRow(out, datasetId);
  enhanceCommonRow(out, datasetId);
  if (datasetId === "d1") enhanceD1Row(out);
  if (datasetId === "team_coach") enhanceTeamCoachRow(out);
  if (datasetId === "d2") enhanceD2Row(out);
  if (datasetId === "naia") enhanceCollegeRow(out, datasetId);
  if (datasetId === "juco") enhanceCollegeRow(out, datasetId);
  if (datasetId === "grassroots") enhanceCollegeRow(out, datasetId);
  if (datasetId === "player_career") enhancePlayerCareerRow(out);
  if (datasetId === "gleague") enhancePlayerCareerRow(out);
  if (datasetId === "fiba") enhanceFibaRow(out);
  if (datasetId === "international") enhanceInternationalRow(out);
  if (datasetId === "capitanesreference") enhanceCapitanesReferenceRow(out);
  if (datasetId === "combine") enhanceCombineRow(out);
  if (datasetId === "nba") enhanceNbaRow(out);
  applyWingspanLookup(out);
  normalizePercentLikeColumns(out, datasetId);
  out.stat_search_text = buildStatSearchText(out, datasetId);
  return out;
}

function enhanceCombineRow(row) {
  if (!row || typeof row !== "object") return;
  if (!Number.isFinite(row.shuttle) && Number.isFinite(row.modified_lane_agility)) row.shuttle = row.modified_lane_agility;
  if (!getStringValue(row.pos).trim()) {
    row.pos = normalizePosLabel(row.pos_text || row.position || "");
  } else {
    row.pos = normalizePosLabel(row.pos);
  }
}

function buildStatSearchText(row, datasetId = "") {
  const values = new Set();
  Object.entries(row || {}).forEach(([column, value]) => {
    if (column.startsWith("_") || /(?:id|url|name|team|player|search|alias|text)$/i.test(column)) return;
    if (typeof value !== "number" || !Number.isFinite(value)) return;
    const candidates = [value];
    if ((looksPercentColumn(column) || isShootingPercentageColumn(column) || isPercentRatioColumn(column)) && Math.abs(value) <= 1.5) {
      candidates.push(value * 100);
    }
    candidates.forEach((candidate) => {
      [3, 2, 1, 0].forEach((digits) => {
        const rounded = digits === 0 ? Math.round(candidate) : roundNumber(candidate, digits);
        if (Number.isFinite(rounded)) values.add(String(rounded));
      });
    });
  });
  return Array.from(values).join(" ");
}

function getMultiFilterSummaryLabel(selected) {
  if (selected?.has(MULTI_FILTER_NONE_VALUE)) return "None";
  return selected?.size ? `${selected.size} selected` : "All";
}

function getMultiFilterQuickActions(dataset, filter, state) {
  if (dataset?.id !== "capitanesreference") return [];
  if (filter.id === "league_name") {
    return [
      { action: "top_euro", label: "Top Euro", active: state.extraSelects?.exclude_major_europe === "yes" },
      { action: "top_asia", label: "Top Asia", active: state.extraSelects?.exclude_major_asia === "yes" },
    ];
  }
  if (filter.id === "nationality") {
    const selected = state.multiSelects?.[filter.id] || new Set();
    return [
      { action: "country_mexico", label: "Mexico", active: selected.size === 1 && selected.has("Mexico") },
    ];
  }
  return [];
}

function applyMultiFilterQuickAction(dataset, state, filter, action) {
  if (dataset?.id !== "capitanesreference") return;
  if (filter.id === "league_name" && action === "top_euro") {
    state.extraSelects.exclude_major_europe = state.extraSelects.exclude_major_europe === "yes" ? "all" : "yes";
    return;
  }
  if (filter.id === "league_name" && action === "top_asia") {
    state.extraSelects.exclude_major_asia = state.extraSelects.exclude_major_asia === "yes" ? "all" : "yes";
    return;
  }
  if (filter.id === "nationality" && action === "country_mexico") {
    const selected = state.multiSelects?.[filter.id] || new Set();
    state.multiSelects[filter.id] = selected.size === 1 && selected.has("Mexico") ? new Set() : new Set(["Mexico"]);
  }
}

function enhanceCapitanesReferenceRow(row) {
  normalizeInternationalIdentity(row);
  normalizeDraftPickValue(row);
  populateCapitanesAge(row);
  normalizeCapitanesPlayerName(row);
  normalizeCapitanesLeagues(row);
  populateCapitanesDerivedMetrics(row);
  if (!getStringValue(row.competition_label).trim()) {
    row.competition_label = getStringValue(row.league_name || row.league_list).trim();
  }
  if (!getStringValue(row.league_name).trim()) {
    row.league_name = getStringValue(row.league_list).trim();
  }
  if (!getStringValue(row.team_alias).trim()) {
    row.team_alias = getStringValue(row.team_abbrev).trim();
  }
  if (!getStringValue(row.nationality_regions).trim()) {
    row.nationality_regions = capitanesNationalityRegions(row).join(" / ");
  }
  row.major_europe = capitanesLeagueIncludes(row, ["euroleague", "eurocup"]) ? "Yes" : "";
  row.major_asia = capitanesLeagueIncludes(row, ["b_league", "bleague", "cba"]) ? "Yes" : "";
  row.potential_latino_name = hasPotentialLatinoName(row.player_name) ? "Yes" : "";
  const porpag = calculateNeutralTorvikPorpag(row);
  if (Number.isFinite(porpag)) row.porpag = roundNumber(porpag, 2);
}

function normalizeCapitanesPlayerName(row) {
  if (typeof row?.player_name === "string") row.player_name = normalizeDisplayName(row.player_name);
  if (typeof row?.player === "string") row.player = normalizeDisplayName(row.player);
}

function populateCapitanesAge(row) {
  const dobText = getStringValue(row?.dob || row?.birthday).trim();
  if (!dobText) return;
  const dob = new Date(`${dobText}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return;
  const target = new Date("2026-06-23T00:00:00");
  row.age = roundNumber((target - dob) / (1000 * 60 * 60 * 24 * 365.25), 1);
}

function populateCapitanesDerivedMetrics(row) {
  const assists = firstFinite(row?.ast, Number.NaN);
  const turnovers = firstFinite(row?.tov, Number.NaN);
  if (Number.isFinite(assists) && Number.isFinite(turnovers)) {
    row.a_to = turnovers > 0 ? roundNumber(assists / turnovers, 3) : "";
  }
  const minutes = firstFinite(row?.min, Number.NaN);
  [
    ["ows", "ows_per40"],
    ["dws", "dws_per40"],
    ["ws", "ws_per40"],
  ].forEach(([source, target]) => {
    const value = firstFinite(row?.[source], Number.NaN);
    if (Number.isFinite(value) && Number.isFinite(minutes) && minutes > 0) {
      row[target] = roundNumber((value / minutes) * 40, 3);
    }
  });
}

function normalizeCapitanesLeagues(row) {
  const parts = capitanesLeagueParts(row);
  if (!parts.length) return;
  const normalized = Array.from(new Set(parts.map((part) => normalizeCapitanesLeagueName(part)).filter(Boolean)));
  const leagueText = normalized.join(" / ");
  row.league_name = leagueText;
  row.league_list = leagueText;
}

function normalizeCapitanesLeagueName(value) {
  const text = getStringValue(value).trim().replace(/\s+/g, " ");
  const key = normalizeDirectiveValue(text);
  const aliases = {
    a_bundeslig: "Austrian A Bundesliga",
    austrian_a_bundesliga: "Austrian A Bundesliga",
    australian_nbl: "AUS NBL",
    aus_nbl: "AUS NBL",
    japanese_bleague: "B.League",
    b_league: "B.League",
    bleague: "B.League",
    basketball_super_league: "T-BSL",
    bsl: "T-BSL",
    belarusian_bpl: "BPL",
    bosnian_bih_liga: "BiH Liga",
    bnxt_league: "BNXT",
    brazilian_nbb: "NBB",
    bulgarian_nbl: "BUL NBL",
    chinese_cba: "CBA",
    croatian_a_1_liga: "A-1 Liga",
    cypriot_division_a: "CYP DivA",
    czech_nbl: "CZ NBL",
    danish_basketligaen: "Basketligaen",
    estonian_latvian_basketball_league: "ELBL",
    finnish_korisliiga: "Korisliiga",
    french_jeep_elite: "Jeep Elite",
    french_lnb_espoirs: "LNB Espoirs",
    french_lnb_pro_b: "LNB Pro B",
    french_nm1: "NM1",
    g_pro_a: "German Pro A",
    g_pro_b: "German Pro B",
    german_pro_a: "German Pro A",
    german_pro_b: "German Pro B",
    german_bbl: "G-BBL",
    georgian_super_liga: "Super Liga",
    greek_heba_a1: "HEBA A1",
    greek_heba_a2: "HEBA A2",
    israeli_bsl: "I-BSL",
    italian_lega_basket_serie_a: "Lega A",
    italian_serie_a2_basket: "Legadue Gold",
    kosovo_fbk: "FBK",
    lithuanian_lkl: "LKL",
    lithuanian_nkl: "NKL",
    macedonian_superleague: "Ma Superleague",
    mexican_cibacopa: "CIBACOPA",
    mexican_lnbp: "LNBP",
    montenegrin_prva_a_liga: "Mo Prva A",
    norwegian_blno: "BLNO",
    polish_obl: "P-OBL",
    portuguese_lpb: "P-LPB",
    puerto_rican_bsn: "BSN",
    romanian_divizia_a: "ROM DivA",
    serbian_kls: "KLS",
    slovakian_extraliga: "Extraliga",
    slovenian_skl: "SKL",
    south_korean_kbl: "KBL",
    spanish_acb: "ACB",
    spanish_primera_feb: "Primera FEB",
    spanish_segunda_feb: "Segunda FEB",
    swiss_lna: "LNA",
    turkish_bsl: "T-BSL",
    turkish_tbl: "T-TBL",
    super_league_basketball: "Uk Superleague",
    ukrainian_superleague: "Uk Superleague",
    venezuelan_slb: "V-SLB",
    slb: "V-SLB",
    v_slb: "V-SLB",
    vtb_united_league: "VTB United",
  };
  return aliases[key] || text;
}

function calculateNeutralTorvikPorpag(row) {
  const ortg = firstFinite(row?.ortg, Number.NaN);
  const usage = firstFinite(row?.usg_pct, Number.NaN);
  const mpg = firstFinite(row?.mpg, Number.NaN);
  if (!Number.isFinite(ortg) || !Number.isFinite(usage) || !Number.isFinite(mpg)) return Number.NaN;
  const averageEfficiency = 104.9;
  const usageFactor = (usage * -0.144) + 13.023;
  if (!Number.isFinite(usageFactor) || usageFactor <= 0) return Number.NaN;
  const altZ = (ortg - averageEfficiency) / usageFactor;
  const adjustedOrtg = averageEfficiency + (altZ * 10.143);
  const usageAdjustment = usage > 20 ? (usage - 20) * 1.25 : (usage - 20) * 1.5;
  const minuteShare = Math.max(0, Math.min(1, mpg / 40));
  return (adjustedOrtg + usageAdjustment - 88) * minuteShare * 69.4 / 500;
}

function capitanesLeagueIncludes(row, terms) {
  const termSet = new Set((terms || []).map((term) => normalizeDirectiveValue(term)));
  return capitanesLeagueParts(row).some((part) => {
    const key = normalizeDirectiveValue(part);
    return termSet.has(key);
  });
}

function capitanesLeagueParts(row) {
  return getStringValue(row?.league_name || row?.league_list)
    .split(/[\/,;|]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function capitanesNationalityParts(row) {
  return getStringValue(row?.nationality_list || row?.nationality)
    .split(/[\/,;|]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function capitanesNationalityRegions(row) {
  const regions = capitanesNationalityParts(row)
    .map((country) => getInternationalCountryRegion(country))
    .filter(Boolean);
  return Array.from(new Set(regions));
}

function capitanesRowHasVerifiedLatinoNationality(row) {
  const countries = new Set([
    "argentina",
    "belize",
    "bolivia",
    "brazil",
    "chile",
    "colombia",
    "costa_rica",
    "cuba",
    "dominican_republic",
    "ecuador",
    "el_salvador",
    "guatemala",
    "honduras",
    "mexico",
    "nicaragua",
    "panama",
    "paraguay",
    "peru",
    "puerto_rico",
    "uruguay",
    "venezuela",
  ]);
  return capitanesNationalityParts(row).some((country) => countries.has(normalizeDirectiveValue(country)));
}

function hasPotentialLatinoName(name) {
  const parts = normalizeDirectiveValue(name)
    .split("_")
    .filter(Boolean);
  if (!parts.length) return false;
  const roots = new Set([
    "acosta", "alvarez", "arias", "arroyo", "ayala", "bautista", "benitez", "cabral", "cabrera", "camacho", "campos", "cano", "cardenas", "carrasco", "castillo", "castro", "colon", "contreras", "cortez", "cruz", "delgado", "diaz", "dominguez", "duarte", "espinoza", "fernandez", "ferreira", "flores", "franco", "fuentes", "garcia", "gomez", "gonzalez", "gutierrez", "hernandez", "herrera", "jimenez", "leon", "lopez", "luna", "marquez", "martinez", "medina", "mendoza", "miranda", "molina", "montero", "morales", "moreno", "navarro", "nunez", "ortega", "ortiz", "pacheco", "perez", "ramirez", "ramos", "reyes", "rivera", "rodriguez", "rojas", "romero", "ruiz", "salazar", "sanchez", "santos", "silva", "soto", "suarez", "torres", "valdez", "vargas", "vasquez", "vega", "velazquez"
  ]);
  return parts.some((part) => roots.has(part));
}

function enhanceInternationalRow(row) {
  applyPlayerBioLookup(row);
  normalizeInternationalIdentity(row);
  normalizeDraftPickValue(row);
  populateAgeFromDob(row);
  if (!getStringValue(row.competition_label).trim()) {
    row.competition_label = getStringValue(row.league_name).trim();
  }
  if (!getStringValue(row.team_alias).trim()) {
    row.team_alias = getStringValue(row.team_abbrev).trim();
  }
  populateAstStlDerived(row, { overwrite: false });
  if (!Number.isFinite(row.stocks) && Number.isFinite(row.stl) && Number.isFinite(row.blk)) {
    row.stocks = row.stl + row.blk;
  }
  row.birthday = row.dob || row.birthday || "";
}

function applyPlayerBioLookup(row) {
  if (!row || typeof row !== "object") return;
  const lookup = typeof window !== "undefined" ? (window.PLAYER_BIO_LOOKUP || {}) : {};
  const internationalLookup = typeof window !== "undefined" ? (window.INTERNATIONAL_PROFILE_BIO_LOOKUP || {}) : {};
  const realgmId = getStatusIdentityId(row) || getStringValue(row.realgm_player_id).trim() || getStringValue(row.source_player_id).trim();
  const entry = realgmId ? { ...(lookup[realgmId] || {}), ...(internationalLookup[realgmId] || {}) } : null;
  if (!entry) return;
  ["dob", "birthday", "draft_year", "draft_pick", "rookie_year", "height_in", "weight_lb", "wingspan", "nationality", "birth_city"].forEach((field) => {
    if (hasMeaningfulFieldValue(row[field])) return;
    if (!shouldApplyBioLookupField(row, entry, field)) return;
    if (hasMeaningfulFieldValue(entry[field])) row[field] = entry[field];
  });
}

function applyWingspanLookup(row) {
  if (!row || typeof row !== "object") return;
  if (Number.isFinite(row.wingspan) && row.wingspan > 0) return;
  const lookup = typeof window !== "undefined" ? (window.WINGSPAN_LOOKUP || {}) : {};
  if (!lookup || (!lookup.byNbaId && !lookup.byName)) return;
  if (!rowHasNbaProfilePath(row)) return;
  const nbaId = getWingspanNbaId(row);
  const nameKey = normalizeNameKey(row.player_name || row.player || row.nba_name || row.name);
  const entry = (nbaId && lookup.byNbaId?.[nbaId]) || (nameKey && lookup.byName?.[nameKey]) || null;
  if (!shouldUseWingspanLookupEntry(row, entry)) return;
  const wingspan = Number(entry?.wingspan);
  if (Number.isFinite(wingspan) && wingspan > 0) row.wingspan = roundNumber(wingspan, 2);
}

async function ensureCombineMeasurementLookupLoaded() {
  if (window.COMBINE_MEASUREMENT_LOOKUP) return window.COMBINE_MEASUREMENT_LOOKUP;
  if (!appState.combineMeasurementLookupLoad) {
    appState.combineMeasurementLookupLoad = loadScriptOnce(`${COMBINE_MEASUREMENTS_LOOKUP_SCRIPT}?v=${encodeURIComponent(SCRIPT_CACHE_BUST)}`)
      .then(() => window.COMBINE_MEASUREMENT_LOOKUP || {});
  }
  return appState.combineMeasurementLookupLoad;
}

function applyCombineMeasurementLookup(row, options = {}) {
  if (!row || typeof row !== "object") return;
  const lookup = typeof window !== "undefined" ? (window.COMBINE_MEASUREMENT_LOOKUP || {}) : {};
  const nameKey = normalizeNameKey(row.player_name || row.player || row.nba_name || row.name);
  const entry = nameKey ? lookup.byName?.[nameKey] : null;
  if (!entry) return;
  const prefixMappings = [
    ["combine_source_year", "season"],
    ["combine_event", "event"],
    ["combine_source", "source"],
    ["combine_pos", "pos"],
    ["combine_draft_year", "draft_year"],
    ["combine_draft_pick", "draft_pick"],
    ["combine_height_wo_shoes", "height_wo_shoes"],
    ["combine_weight_lb", "weight_lb"],
    ["combine_bmi", "bmi"],
    ["combine_wingspan", "wingspan"],
    ["combine_ws_diff", "ws_diff"],
    ["combine_ws_height", "ws_height"],
    ["combine_standing_reach", "standing_reach"],
    ["combine_sr_height", "sr_height"],
    ["combine_sr_ws", "sr_ws"],
    ["combine_defensive_range", "defensive_range"],
    ["combine_hand_length", "hand_length"],
    ["combine_hand_width", "hand_width"],
    ["combine_hand_area", "hand_area"],
    ["combine_body_fat_pct", "body_fat_pct"],
    ["combine_standing_vert", "standing_vert"],
    ["combine_max_vert", "max_vert"],
    ["combine_avg_vert", "avg_vert"],
    ["combine_standing_vert_sr", "standing_vert_sr"],
    ["combine_max_vert_sr", "max_vert_sr"],
    ["combine_avg_vert_sr", "avg_vert_sr"],
    ["combine_height_adj_max_vert_sr", "height_adj_max_vert_sr"],
    ["combine_sprint", "sprint"],
    ["combine_lane_agility", "lane_agility"],
    ["combine_modified_lane_agility", "modified_lane_agility"],
    ["combine_shuttle", "shuttle"],
    ["combine_bench_press", "bench_press"],
  ];
  prefixMappings.forEach(([target, source]) => {
    const value = entry[source];
    if (value === null || value === undefined || value === "") return;
    if (typeof value === "number") {
      if (Number.isFinite(value)) row[target] = roundNumber(value, 3);
      return;
    }
    const text = getStringValue(value).trim();
    if (text) row[target] = text;
  });
  [
    ["height_in", "height_wo_shoes"],
    ["weight_lb", "weight_lb"],
    ["wingspan", "wingspan"],
    ["standing_reach", "standing_reach"],
  ].forEach(([target, source]) => {
    if (options.prefixOnly) return;
    const value = firstFinite(entry[source], Number.NaN);
    if (!Number.isFinite(value) || value <= 0) return;
    if (!hasMeaningfulFieldValue(row[target])) {
      row[target] = roundNumber(value, 2);
    }
  });
  row._measurementSource = getStringValue(entry.event || entry.source).trim();
  row._measurementSeason = entry.season;
}

function shouldUseWingspanLookupEntry(row, entry) {
  if (!entry) return false;
  const sourceYear = Number(entry.source_year);
  if (!Number.isFinite(sourceYear)) return true;
  const proYear = firstFinite(row?.rookie_year, row?.draft_year, Number.NaN);
  if (Number.isFinite(proYear) && sourceYear < proYear - 2) return false;
  const seasonYear = extractLeadingYear(row?.season);
  if (!Number.isFinite(proYear) && Number.isFinite(seasonYear) && sourceYear < seasonYear - 3) return false;
  return true;
}

function getWingspanNbaId(row) {
  const candidates = [row?.nba_id, row?.nba_player_id, row?.player_id, row?.source_player_id];
  for (const value of candidates) {
    const text = getStringValue(value).trim();
    if (/^\d{5,}$/.test(text)) return text;
  }
  return "";
}

function rowHasNbaProfilePath(row) {
  if (!row) return false;
  if (row?._statusFlags?.nba === true) return true;
  if (normalizeProfileLevel(row) === "NBA") return true;
  const rookieYearText = getStringValue(row.rookie_year).trim();
  if (/^\d{4}$/.test(rookieYearText)) return true;
  const nbaIdText = [row.nba_id, row.nba_player_id].map((value) => getStringValue(value).trim()).find((value) => /^\d{5,}$/.test(value));
  if (nbaIdText) return true;
  const text = normalizeKey([
    row.profile_levels,
    row.profile_career_path,
    row.career_path,
    row.source_dataset,
  ].map((value) => getStringValue(value).trim()).filter(Boolean).join(" "));
  return /\bnba\b/.test(text);
}

function shouldApplyBioLookupField(row, entry, field) {
  if (field !== "draft_pick") return true;
  const hasDraftYear = hasMeaningfulFieldValue(entry?.draft_year) || hasMeaningfulFieldValue(row?.draft_year);
  const hasRookieYear = hasMeaningfulFieldValue(entry?.rookie_year) || hasMeaningfulFieldValue(row?.rookie_year);
  const hasDraftText = Boolean(getDraftInfoSource(row));
  return hasDraftYear || hasRookieYear || hasDraftText;
}

function normalizeInternationalIdentity(row) {
  const draftInfo = parseDraftInfo(getDraftInfoSource(row));
  if (!draftInfo.undrafted && !draftInfo.eligible && Number.isFinite(draftInfo.year)) row.draft_year = draftInfo.year;
  if (Number.isFinite(draftInfo.pick)) row.draft_pick = draftInfo.pick;
  const countries = splitInternationalCountries(row.nationality || row.nationality_list);
  if (countries.length) {
    const countryText = countries.join(" / ");
    row.nationality = countryText;
    row.nationality_list = countryText;
    row.nationality_regions = Array.from(new Set(countries.map((country) => getInternationalCountryRegion(country)).filter(Boolean))).join(" / ");
  }
  if (!getStringValue(row.dob).trim() && getStringValue(row.birthday).trim()) row.dob = row.birthday;
  if (getStringValue(row.dob).trim()) row.birthday = row.dob;
}

function splitInternationalCountries(value) {
  const text = getStringValue(value).replace(/\bN\/A\b/gi, "").trim();
  if (!text) return [];
  const parts = text.split(/\s*(?:\/|\||;|,)\s*/).map((part) => part.trim()).filter(Boolean);
  const countries = [];
  parts.forEach((part) => {
    const parsed = splitConcatenatedCountries(part);
    parsed.forEach((country) => {
      const display = normalizeInternationalCountryName(country);
      if (display) countries.push(display);
    });
  });
  return Array.from(new Set(countries));
}

function splitConcatenatedCountries(value) {
  const text = getStringValue(value).trim();
  if (!text) return [];
  const direct = normalizeInternationalCountryName(text);
  if (direct) return [direct];
  const compact = normalizeKey(text).replace(/\s+/g, "");
  if (!compact) return [];
  const out = [];
  let index = 0;
  while (index < compact.length) {
    const match = INTERNATIONAL_COUNTRY_NAMES.find((country) => {
      const key = normalizeKey(country).replace(/\s+/g, "");
      return key && compact.startsWith(key, index);
    });
    if (!match) return [text];
    out.push(match);
    index += normalizeKey(match).replace(/\s+/g, "").length;
  }
  return out;
}

function normalizeInternationalCountryName(value) {
  const key = normalizeKey(value);
  if (!key) return "";
  const alias = {
    "usa": "United States",
    "u s a": "United States",
    "united states of america": "United States",
    "great britain": "United Kingdom",
    "england": "United Kingdom",
    "scotland": "United Kingdom",
    "wales": "United Kingdom",
    "turkiye": "Turkey",
    "czech republic": "Czechia",
    "south korea": "South Korea",
    "korea": "South Korea",
    "bosnia herzegovina": "Bosnia and Herzegovina",
    "bosnia and herzegovina": "Bosnia and Herzegovina",
    "cape verde": "Cape Verde",
    "cote divoire": "Cote d'Ivoire",
    "ivory coast": "Cote d'Ivoire",
    "democratic republic of congo": "Democratic Republic of the Congo",
    "dr congo": "Democratic Republic of the Congo",
    "congo dr": "Democratic Republic of the Congo",
  }[key];
  if (alias) return alias;
  return INTERNATIONAL_COUNTRY_NAMES.find((country) => normalizeKey(country) === key) || "";
}

function getInternationalCountryRegion(country) {
  return INTERNATIONAL_COUNTRY_REGION_MAP[country] || "Other";
}

function enhanceFibaRow(row) {
  if (typeof row.competition_label === "string") {
    row.competition_label = abbreviateFibaCompetition(row.competition_label);
  }
  enhanceCollegeRow(row, "fiba");
  const teamCode = getStringValue(row.team_code).trim().toUpperCase();
  if (teamCode) row.team_name = teamCode;
  row.nationality = normalizeFibaCountryLabel(row.nationality || teamCode);
  applyPlayerBioLookup(row);
  normalizeDraftPickValue(row);
  populateAgeFromDob(row);
}

function enhanceCommonRow(row, datasetId) {
  if (row.season != null) {
    const seasonValue = normalizeSeasonValue(row.season);
    if (seasonValue !== "") row.season = seasonValue;
  }

  if (typeof row.player === "string" && !row.player_name) row.player_name = row.player;
  if (typeof row.team_alias === "string" && !row.team_name) row.team_name = row.team_alias;
  if (typeof row.player_name === "string") row.player_name = normalizeDisplayName(row.player_name);
  if (typeof row.player === "string") row.player = normalizeDisplayName(row.player);
  if (typeof row.coach === "string") row.coach = normalizeDisplayName(row.coach);
  if (typeof row.pos === "string") row.pos = normalizePosLabel(row.pos);
  if (typeof row.pos_text === "string") row.pos_text = normalizePosLabel(row.pos_text);

  if (typeof row.team_name === "string") {
    row.team_full = row.team_full || row.team_name;
    if (datasetId !== "grassroots") row.team_name = simplifySchoolName(row.team_name, datasetId);
  }

  if (datasetId === "grassroots") {
    row.circuit = normalizeGrassrootsCircuitLabel(row.circuit);
    row.setting = getGrassrootsSettingForCircuit(row.circuit);
  }

  normalizePhysicalMeasurements(row);
  if (!Number.isFinite(row.height_in) && Number.isFinite(row.inches)) row.height_in = row.inches;
  if (!Number.isFinite(row.inches) && Number.isFinite(row.height_in)) row.inches = row.height_in;
  if (!Number.isFinite(row.height_in) && typeof row.height === "string") {
    const parsed = parseHeightToInches(row.height);
    if (Number.isFinite(parsed)) {
      row.height_in = parsed;
      row.inches = parsed;
    }
  }
  normalizePhysicalMeasurements(row);

  if (!Number.isFinite(row.weight_lb) && Number.isFinite(row.weight)) row.weight_lb = row.weight;
  if (!Number.isFinite(row.weight) && Number.isFinite(row.weight_lb)) row.weight = row.weight_lb;
  normalizePhysicalMeasurements(row);

  if ((!Number.isFinite(row.gp) || row.gp <= 0) && Number.isFinite(row.min) && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.gp = roundNumber(row.min / row.mpg, 3);
  }
  if ((!Number.isFinite(row.min) || row.min <= 0) && Number.isFinite(row.gp) && row.gp > 0 && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.min = roundNumber(row.gp * row.mpg, 3);
  }
  if (!Number.isFinite(row.mpg) && Number.isFinite(row.min_per_g)) row.mpg = row.min_per_g;
  if (!Number.isFinite(row.mpg) && Number.isFinite(row.min) && Number.isFinite(row.gp) && row.gp > 0) {
    row.mpg = roundNumber(row.min / row.gp, 2);
  }
  if (!Number.isFinite(row.min_per) && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.min_per = roundNumber(Math.min(100, (row.mpg / 40) * 100), 1);
  }

  if (!Number.isFinite(row.exp) && Number.isFinite(row.season) && Number.isFinite(row.rookie_year)) {
    row.exp = Math.max(0, row.season - row.rookie_year);
  }
  normalizeDraftPickValue(row);

  if (!Number.isFinite(row.bmi) && Number.isFinite(row.height_in) && Number.isFinite(row.weight_lb) && row.height_in > 0) {
    row.bmi = roundNumber((row.weight_lb / (row.height_in * row.height_in)) * 703, 1);
  }

  if (!getStringValue(row.dob).trim() && getStringValue(row.birthday).trim()) row.dob = row.birthday;
  populateAgeFromDob(row);
  if (getStringValue(row.dob).trim()) row.birthday = row.dob;

  if (!Number.isFinite(row.stocks) && Number.isFinite(row.stl) && Number.isFinite(row.blk)) {
    row.stocks = row.stl + row.blk;
  }
  populateGeneralStatDisplayModes(row, datasetId);

  row.player_search_text = Array.from(new Set([row.player_name, row.player, row.player_search_text].map((value) => getStringValue(value).trim()).filter(Boolean))).join(" ");
  row.team_search_text = Array.from(new Set([row.team_name, row.team_full, row.team_alias, row.team_alias_all].map((value) => getStringValue(value).trim()).filter(Boolean))).join(" ");
  row.coach_search_text = getStringValue(row.coach).trim();
}

function enhanceD1Row(row) {
  applyCombineMeasurementLookup(row, { prefixOnly: true });
  normalizeD1PlaytypeColumns(row);
  populateD1PlaytypeVolumeMetrics(row);
  normalizeD1TruePlaytypeFrequencies(row);
  populateD1HalfcourtMetrics(row);
  if (!Number.isFinite(row.transition_poss) && Number.isFinite(row.total_poss) && Number.isFinite(row.transition_freq) && row.total_poss > 0) {
    row.transition_poss = roundNumber((row.total_poss * row.transition_freq) / 100, 1);
  }
  if (!Number.isFinite(row.halfcourt_poss) && Number.isFinite(row.total_poss) && Number.isFinite(row.transition_poss)) {
    row.halfcourt_poss = roundNumber(Math.max(0, row.total_poss - row.transition_poss), 1);
  }
  if (!Number.isFinite(row.transition_freq) && Number.isFinite(row.total_poss) && Number.isFinite(row.transition_poss) && row.total_poss > 0) {
    row.transition_freq = roundNumber((row.transition_poss / row.total_poss) * 100, 1);
  }
  if (!Number.isFinite(row.halfcourt_freq) && Number.isFinite(row.total_poss) && Number.isFinite(row.halfcourt_poss) && row.total_poss > 0) {
    row.halfcourt_freq = roundNumber((row.halfcourt_poss / row.total_poss) * 100, 1);
  }
  normalizeD1DriveMetrics(row);
  normalizeD1RimScoringMetrics(row);
  normalizeD1RunnerMetrics(row);
  D1_TRUE_PLAYTYPE_IDS.forEach((id) => populatePrefixedTsPct(row, id));
  populatePrefixedTsPct(row, "halfcourt");
  populatePrefixedTsPct(row, "runner");
  populatePrefixedTsPct(row, "drive", { fgaSuffix: "fga" });
  if (row.mid_made == null && Number.isFinite(row.long2_made)) row.mid_made = row.long2_made;
  if (row.mid_att == null && Number.isFinite(row.long2_att)) row.mid_att = row.long2_att;
  if (row.mid_pct == null && Number.isFinite(row.long2_pct)) row.mid_pct = row.long2_pct;
  row.rim_to_mid_att_ratio = firstFinite(row.rim_to_mid_att_ratio, ratioIfPossible(row.rim_att, row.mid_att), Number.NaN);
  populateDerivedShooting(row, {
    threeMadeKeys: ["three_p_made", "three_pm"],
    threeAttKeys: ["three_p_att", "three_pa"],
    twoMadeKeys: ["two_p_made", "two_pm"],
    twoAttKeys: ["two_p_att", "two_pa"],
    twoPctKeys: ["two_p_pct"],
    threePctKeys: ["three_p_pct"],
    efgKeys: ["efg_pct"],
  });
  populateComplementaryRimMidProfile(row);
  if (!Number.isFinite(row.rim_to_mid_att_ratio)) row.rim_to_mid_att_ratio = ratioIfPossible(row.rim_att, row.mid_att);
  if (!Number.isFinite(row.dunk_made)) row.dunk_made = 0;
  if (!Number.isFinite(row.dunk_att)) row.dunk_att = 0;
  if (!Number.isFinite(row.dunk_pct)) row.dunk_pct = zeroSafePercent(row.dunk_made, row.dunk_att);
  if (!Number.isFinite(row.tov) && Number.isFinite(row.total_poss) && Number.isFinite(row.tov_pct_adv)) {
    row.tov = roundNumber((row.total_poss * row.tov_pct_adv) / 100, 1);
  }
  populateD1FoulDerived(row);
  row.ftr = firstFinite(row.ftr, ratioIfPossible(row.fta, row.fga), Number.NaN);
  row.three_pr = firstFinite(row.three_pr, ratioIfPossible(firstFinite(row.three_p_att, row.three_pa, Number.NaN), row.fga), Number.NaN);
  if (!Number.isFinite(row.ftr)) row.ftr = 0;
  if (!Number.isFinite(row.three_pr)) row.three_pr = 0;
  populateAstTo(row);
  if (!Number.isFinite(row.net_rating) && Number.isFinite(row.ortg) && Number.isFinite(row.drtg)) {
    row.net_rating = roundNumber(row.ortg - row.drtg, 1);
  }
  row.drive_plus_trans_freq = firstFinite(
    Number.isFinite(row.drive_freq) || Number.isFinite(row.transition_freq)
      ? roundNumber(clampPercentValue(firstFinite(row.drive_freq, 0) + firstFinite(row.transition_freq, 0)), 1)
      : Number.NaN,
    row.drive_plus_trans_freq,
    Number.NaN
  );
  if (Number.isFinite(row.drive_plus_trans_freq)) {
    row.drive_plus_trans_freq = roundNumber(clampPercentValue(row.drive_plus_trans_freq), 1);
  }
  row.ast_pct_usg_pct = firstFinite(row.ast_pct_usg_pct, ratioIfPossible(row.ast_pct, row.usg_pct), Number.NaN);
  row.ast_pct_tov_pct = firstFinite(row.ast_pct_tov_pct, ratioIfPossible(row.ast_pct, firstFinite(row.tov_pct_adv, row.tov_pct, Number.NaN)), Number.NaN);
  populateD1ShotProfileDisplayModes(row);
  fillMissingRateStats(row, ["orb_pct", "drb_pct", "ast_pct", "stl_pct", "blk_pct", "usg_pct"]);
  scalePercentRatioColumns(row);
  normalizeD1FrequencyColumns(row);
  populateImpactMetrics(row);
}

function enhanceTeamCoachRow(row) {
  if (!row || typeof row !== "object") return;
  if (!Number.isFinite(row.adj_ne) && Number.isFinite(row.adj_oe) && Number.isFinite(row.adj_de)) {
    row.adj_ne = roundNumber(row.adj_oe - row.adj_de, 3);
  }
  if (!Number.isFinite(row.ppp_net) && Number.isFinite(row.ppp_off) && Number.isFinite(row.ppp_def)) {
    row.ppp_net = roundNumber(row.ppp_off - row.ppp_def, 3);
  }
  TEAM_COACH_PLAYTYPE_IDS.forEach((id) => populatePrefixedTsPct(row, id, { fgaSuffix: "fga" }));
}

function enhanceD2Row(row) {
  applyD2BioLookup(row);
  scaleRateColumns(row, ["fg_pct", "3p_pct", "ft_pct", "efg_pct", "ts_pct", "tpa_rate", "fta_rate", "usg_pct", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct"], "d2");
  populateDerivedShooting(row, {
    threeMadeKeys: ["3pm"],
    threeAttKeys: ["3pa"],
    twoMadeKeys: ["two_pm"],
    twoAttKeys: ["two_pa"],
    twoPctKeys: ["two_p_pct"],
    threePctKeys: ["3p_pct"],
    efgKeys: ["efg_pct"],
    blankAttemptsMeanZero: true,
  });
  populateComplementaryRimMidProfile(row);
  populateShotProfileDisplayModes(row);
  row.three_pa_per40 = per40Value(row["3pa"], row.min);
  row.two_pa_per40 = per40Value(row.two_pa, row.min);
  row.stocks_per40 = per40Value(row.stocks, row.min);
  row.pts_pg = perGameValue(row.pts, row.gp);
  row.trb_pg = perGameValue(row.trb, row.gp);
  row.ast_pg = perGameValue(row.ast, row.gp);
  row.tov_pg = perGameValue(row.tov, row.gp);
  row.stl_pg = perGameValue(row.stl, row.gp);
  row.blk_pg = perGameValue(row.blk, row.gp);
  row.stocks_pg = perGameValue(row.stocks, row.gp);
  row.two_pa_pg = perGameValue(row.two_pa, row.gp);
  row.three_pa_pg = perGameValue(row["3pa"], row.gp);
  populateAstStlDerived(row, { overwrite: true });
  row.ftr = ratioIfPossible(row.fta, row.fga);
  row.three_pr = ratioIfPossible(row["3pa"], row.fga);
  row.three_pa_per100 = d2Per100Value(row["3pa"], row);
  row.ortg = ortgEstimate(row);
  populateAstTo(row);
  fillMissingRateStats(row, ["orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "usg_pct"]);
  scalePercentRatioColumns(row);
  populateImpactMetrics(row);
}

function preparePlayerCareerLoadedRow(row) {
  if (!row || typeof row !== "object") return row;
  if (typeof row.player_name === "string") row.player_name = normalizeDisplayName(row.player_name);
  if (typeof row.player === "string") row.player = normalizeDisplayName(row.player);
  if (typeof row.coach === "string") row.coach = normalizeDisplayName(row.coach);
  if (typeof row.pos === "string") row.pos = normalizePosLabel(row.pos);
  if (typeof row.pos_text === "string") row.pos_text = normalizePosLabel(row.pos_text);

  if ((!Number.isFinite(row.gp) || row.gp <= 0) && Number.isFinite(row.min) && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.gp = roundNumber(row.min / row.mpg, 3);
  }
  if ((!Number.isFinite(row.min) || row.min <= 0) && Number.isFinite(row.gp) && row.gp > 0 && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.min = roundNumber(row.gp * row.mpg, 3);
  }
  if (!Number.isFinite(row.mpg) && Number.isFinite(row.min_per_g)) row.mpg = row.min_per_g;
  if (!Number.isFinite(row.mpg) && Number.isFinite(row.min) && Number.isFinite(row.gp) && row.gp > 0) {
    row.mpg = roundNumber(row.min / row.gp, 2);
  }
  if (!Number.isFinite(row.min_per) && Number.isFinite(row.mpg) && row.mpg > 0) {
    row.min_per = roundNumber(Math.min(100, (row.mpg / 40) * 100), 1);
  }
  applyPlayerBioLookup(row);
  applyWingspanLookup(row);
  normalizeDraftPickValue(row);
  if (!getStringValue(row.dob).trim() && getStringValue(row.birthday).trim()) row.dob = row.birthday;
  populateAgeFromDob(row);
  if (!Number.isFinite(row.stocks) && Number.isFinite(row.stl) && Number.isFinite(row.blk)) {
    row.stocks = row.stl + row.blk;
  }

  ["pts", "trb", "orb", "drb", "ast", "tov", "stl", "blk", "stocks", "pf", "ftm", "fta"].forEach((column) => {
    const total = firstFinite(row[column], Number.NaN);
    if (!Number.isFinite(total)) return;
    const perGame = perGameValue(total, row.gp);
    if (perGame !== "" && !Number.isFinite(row[`${column}_pg`])) row[`${column}_pg`] = perGame;
    const per40 = per40Value(total, row.min);
    if (per40 !== "" && !Number.isFinite(row[`${column}_per40`])) row[`${column}_per40`] = per40;
  });

  const twoPa = firstFinite(row["2pa"], row.two_pa, row["2pa_total"], row.two_p_att, Number.NaN);
  const threePa = firstFinite(row["3pa"], row.three_pa, row.tpa, row.three_p_att, Number.NaN);
  if (Number.isFinite(twoPa) && !Number.isFinite(row.two_pa)) row.two_pa = twoPa;
  if (Number.isFinite(threePa) && !Number.isFinite(row.three_pa)) row.three_pa = threePa;
  const twoPaPg = perGameValue(twoPa, row.gp);
  const threePaPg = perGameValue(threePa, row.gp);
  const twoPaPer40 = per40Value(twoPa, row.min);
  const threePaPer40 = per40Value(threePa, row.min);
  if (twoPaPg !== "" && !Number.isFinite(row.two_pa_pg)) row.two_pa_pg = twoPaPg;
  if (threePaPg !== "" && !Number.isFinite(row.three_pa_pg)) row.three_pa_pg = threePaPg;
  if (twoPaPer40 !== "" && !Number.isFinite(row.two_pa_per40)) row.two_pa_per40 = twoPaPer40;
  if (threePaPer40 !== "" && !Number.isFinite(row.three_pa_per40)) row.three_pa_per40 = threePaPer40;
  if (!Number.isFinite(row.three_pa_per100)) row.three_pa_per100 = possPer100Value(threePa, row);

  populateAstStlDerived(row, { overwrite: true });
  if (!Number.isFinite(row.ftr) && Number.isFinite(row.fta) && Number.isFinite(row.fga) && row.fga > 0) {
    row.ftr = ratioIfPossible(row.fta, row.fga);
  }
  if (!Number.isFinite(row.three_pr) && Number.isFinite(threePa) && Number.isFinite(row.fga) && row.fga > 0) {
    row.three_pr = ratioIfPossible(threePa, row.fga);
  }

  populateAstTo(row);
  populateImpactMetrics(row);
  row.player_search_text = Array.from(new Set([row.player_name, row.player, row.player_search_text].map((value) => getStringValue(value).trim()).filter(Boolean))).join(" ");
  row.team_search_text = Array.from(new Set([row.team_name, row.team_full, row.team_alias, row.team_alias_all, row.team_search_text].map((value) => getStringValue(value).trim()).filter(Boolean))).join(" ");
  row.coach_search_text = getStringValue(row.coach_search_text || row.coach).trim();
  row.stat_search_text = buildStatSearchText(row, "player_career");
  return row;
}

function enhancePlayerCareerRow(row) {
  populateDerivedShooting(row, {
    threeMadeKeys: ["tpm", "3pm", "three_pm"],
    threeAttKeys: ["tpa", "3pa", "three_pa"],
    twoMadeKeys: ["2pm", "two_pm"],
    twoAttKeys: ["2pa", "two_pa", "2pa_total"],
    twoPctKeys: ["2p_pct", "two_p_pct"],
    threePctKeys: ["tp_pct", "3p_pct", "three_p_pct"],
    efgKeys: ["efg_pct"],
    blankAttemptsMeanZero: !/^realgm_/i.test(getStringValue(row.source_dataset)),
  });
  populateComplementaryRimMidProfile(row);
  populateShotProfileDisplayModes(row);

  const twoPm = firstFinite(row["2pm"], row.two_pm, Number.NaN);
  const threePm = firstFinite(row["3pm"], row.three_pm, row.tpm, Number.NaN);
  if (!Number.isFinite(row.ftm) && Number.isFinite(row.fta) && Number.isFinite(row.ft_pct) && row.fta > 0) {
    const ftPct = Math.abs(row.ft_pct) <= 1.5 ? row.ft_pct : row.ft_pct / 100;
    row.ftm = Math.max(0, Math.round(row.fta * ftPct));
  }
  if (!Number.isFinite(row.ftm) && Number.isFinite(row.pts) && Number.isFinite(twoPm) && Number.isFinite(threePm)) {
    row.ftm = Math.max(0, row.pts - (2 * twoPm) - (3 * threePm));
  }
  if (!Number.isFinite(row.pts)) {
    const inferredPts = weightedPointTotal(twoPm, threePm, row.ftm);
    if (Number.isFinite(inferredPts)) row.pts = inferredPts;
  }

  ["pts", "trb", "ast", "tov", "stl", "blk", "stocks", "pf", "ftm"].forEach((column) => {
    const perGame = perGameValue(row[column], row.gp);
    if (perGame !== "" && !Number.isFinite(row[`${column}_pg`])) row[`${column}_pg`] = perGame;
    const per40 = per40Value(row[column], row.min);
    if (per40 !== "" && !Number.isFinite(row[`${column}_per40`])) row[`${column}_per40`] = per40;
  });
  populateAstStlDerived(row, { overwrite: true });

  const twoPa = firstFinite(row["2pa"], row.two_pa, row["2pa_total"], Number.NaN);
  const threePa = firstFinite(row["3pa"], row.three_pa, row.tpa, Number.NaN);
  const fgaBasis = firstFinite(row.fga, row.fga_75, Number.NaN);
  const twoPaPg = perGameValue(twoPa, row.gp);
  const threePaPg = perGameValue(threePa, row.gp);
  const twoPaPer40 = per40Value(twoPa, row.min);
  const threePaPer40 = per40Value(threePa, row.min);
  if (twoPaPg !== "" && !Number.isFinite(row.two_pa_pg)) row.two_pa_pg = twoPaPg;
  if (threePaPg !== "" && !Number.isFinite(row.three_pa_pg)) row.three_pa_pg = threePaPg;
  if (twoPaPer40 !== "" && !Number.isFinite(row.two_pa_per40)) row.two_pa_per40 = twoPaPer40;
  if (threePaPer40 !== "" && !Number.isFinite(row.three_pa_per40)) row.three_pa_per40 = threePaPer40;

  if (!Number.isFinite(row.ftr) && Number.isFinite(row.fta) && Number.isFinite(row.fga) && row.fga > 0) {
    row.ftr = ratioIfPossible(row.fta, row.fga);
  }
  if (!Number.isFinite(row.ftr) && Number.isFinite(row.fta_75) && Number.isFinite(fgaBasis) && fgaBasis > 0) {
    row.ftr = ratioIfPossible(row.fta_75, fgaBasis);
  }
  if (!Number.isFinite(row.three_pr) && Number.isFinite(threePa) && Number.isFinite(row.fga) && row.fga > 0) {
    row.three_pr = ratioIfPossible(threePa, row.fga);
  }
  if (!Number.isFinite(row.three_pr) && Number.isFinite(row.fg3a_75) && Number.isFinite(fgaBasis) && fgaBasis > 0) {
    row.three_pr = ratioIfPossible(row.fg3a_75, fgaBasis);
  }
  if (!Number.isFinite(row.three_pa_per100)) row.three_pa_per100 = possPer100Value(threePa, row);
  if (!Number.isFinite(row.ortg)) row.ortg = ortgEstimate(row);

  populateAstTo(row);
  if (isD2PlayerCareerRow(row)) {
    fillMissingRateStats(row, ["orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "usg_pct"]);
  } else {
    populateDefensiveRateStats(row);
    fillMissingRateStats(row, ["orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct", "usg_pct"]);
  }
  populateImpactMetrics(row);
}

function isD2PlayerCareerRow(row) {
  return getStringValue(row?.competition_level) === "D2" || normalizeKey(row?.source_dataset) === "d2";
}

function enhanceCollegeRow(row, datasetId) {
  if (datasetId === "juco") {
    row.region = getStringValue(row.region).replace(/\.0$/, "");
    row.level = normalizeJucoDivision(row.level);
  }
  if (datasetId === "grassroots") {
    const gp = sanitizeGrassrootsCountValue(firstFinite(row.gp, row.games, Number.NaN));
    if (Number.isFinite(gp)) row.gp = gp;

    const pts = sanitizeGrassrootsCountValue(firstFinite(row.pts, row.points, Number.NaN));
    if (Number.isFinite(pts)) row.pts = pts;

    const tpmSource = sanitizeGrassrootsCountValue(firstFinite(row.tpm, row["3pm"], row.three_pm, Number.NaN));
    const tpmPg = firstFinite(row.tpm_pg, row["3PM/G"], row["3pm/g"], Number.NaN);
    const fgPct = firstFinite(row.fg_pct, row["FG%"], Number.NaN);
    const tpPct = firstFinite(row.tp_pct, row["3PT%"], Number.NaN);
    const hasLoggedThreePm = Number.isFinite(tpmSource) && tpmSource > 0;
    const shotTotals = deriveGrassrootsShotTotals({
      gp: row.gp,
      ptsPg: firstFinite(row.pts_pg, Number.NaN),
      fgPct,
      tpPct,
      tpmPg: firstFinite(tpmPg, Number.NaN),
      forceNoThree: !hasLoggedThreePm,
    });

    const threePm = hasLoggedThreePm && Number.isFinite(shotTotals.tpm) ? shotTotals.tpm : 0;
    const twoPm = Number.isFinite(shotTotals.twoPm) ? shotTotals.twoPm : Math.max(0, Math.floor((row.pts - (3 * threePm)) / 2));
    const fgm = Number.isFinite(shotTotals.fgm) ? shotTotals.fgm : (twoPm + threePm);
    const fga = Number.isFinite(shotTotals.fga) ? shotTotals.fga : Math.max(fgm, Number.isFinite(row.fga) ? row.fga : fgm);
    const tpa = Number.isFinite(shotTotals.tpa) ? shotTotals.tpa : Math.max(0, Number.isFinite(row.tpa) ? row.tpa : threePm);
    const twoPa = Number.isFinite(shotTotals.twoPa) ? shotTotals.twoPa : Math.max(0, fga - tpa);
    const ftm = Number.isFinite(shotTotals.ftm)
      ? shotTotals.ftm
      : (Number.isFinite(row.pts) ? Math.max(0, row.pts - (2 * twoPm) - (3 * threePm)) : 0);

    row.tpm = threePm;
    row["3pm"] = threePm;
    row.three_pm = threePm;
    row.tpa = tpa;
    row["3pa"] = tpa;
    row.three_pa = tpa;
    row["2pm"] = twoPm;
    row.two_pm = twoPm;
    row.fgm = fgm;
    row.fgs = fgm;
    row.fga = fga;
    row["2pa"] = twoPa;
    row.two_pa = twoPa;
    row.ftm = ftm;
    const inferredClassYear = inferGrassrootsClassYear(row.class_year, row.season, row.age_range || row.level || row.event_name || row.team_name);
    if (Number.isFinite(inferredClassYear)) row.class_year = inferredClassYear;
  }
  scaleRateColumns(row, ["fg_pct", "2p_pct", "tp_pct", "ft_pct", "efg_pct", "ts_pct", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "stl_pct", "blk_pct", "tov_pct", "usg_pct"], datasetId);
  populateDerivedShooting(row, {
    threeMadeKeys: ["tpm", "3pm", "three_pm"],
    threeAttKeys: ["tpa", "3pa", "three_pa"],
    twoMadeKeys: ["2pm", "two_pm"],
    twoAttKeys: ["2pa", "two_pa", "2pa_total"],
    twoPctKeys: ["2p_pct", "two_p_pct"],
    threePctKeys: ["tp_pct", "3p_pct", "three_p_pct"],
    efgKeys: ["efg_pct"],
    blankAttemptsMeanZero: datasetId !== "grassroots",
  });
  populateComplementaryRimMidProfile(row);
  populateShotProfileDisplayModes(row);
  ["pts", "trb", "ast", "tov", "stl", "blk", "stocks"].forEach((column) => {
    const perGame = perGameValue(row[column], row.gp);
    if (datasetId === "grassroots") row[`${column}_pg`] = perGame !== "" ? perGame : 0;
    else if (perGame !== "") row[`${column}_pg`] = perGame;
    const per40 = per40Value(row[column], row.min);
    if (datasetId === "grassroots") row[`${column}_per40`] = per40 !== "" ? per40 : 0;
    else if (per40 !== "") row[`${column}_per40`] = per40;
  });
  row.pts_per40 = row.pts_per40 ?? per40Value(row.pts, row.min);
  row.trb_per40 = row.trb_per40 ?? per40Value(row.trb, row.min);
  row.ast_per40 = row.ast_per40 ?? per40Value(row.ast, row.min);
  row.tov_per40 = row.tov_per40 ?? per40Value(row.tov, row.min);
  row.stl_per40 = row.stl_per40 ?? per40Value(row.stl, row.min);
  row.blk_per40 = row.blk_per40 ?? per40Value(row.blk, row.min);
  row.stocks_per40 = row.stocks_per40 ?? per40Value(row.stocks, row.min);
  row.two_pa_pg = datasetId === "grassroots"
    ? (perGameValue(row["2pa"] ?? row.two_pa ?? row["2pa_total"], row.gp) || 0)
    : perGameValue(row["2pa"] ?? row.two_pa ?? row["2pa_total"], row.gp);
  row.three_pa_pg = datasetId === "grassroots"
    ? (perGameValue(row.tpa ?? row["3pa"] ?? row.three_pa, row.gp) || 0)
    : perGameValue(row.tpa ?? row["3pa"] ?? row.three_pa, row.gp);
  row.three_pa_per40 = datasetId === "grassroots"
    ? (per40Value(row.tpa ?? row["3pa"] ?? row.three_pa, row.min) || 0)
    : per40Value(row.tpa ?? row["3pa"] ?? row.three_pa, row.min);
  row.two_pa_per40 = datasetId === "grassroots"
    ? (per40Value(row["2pa"] ?? row.two_pa ?? row["2pa_total"], row.min) || 0)
    : per40Value(row["2pa"] ?? row.two_pa ?? row["2pa_total"], row.min);
  row.ftr = Number.isFinite(row.fta) && Number.isFinite(row.fga) && row.fga > 0 ? ratioIfPossible(row.fta, row.fga) : 0;
  row.three_pr = Number.isFinite(row.tpa ?? row["3pa"] ?? row.three_pa) && Number.isFinite(row.fga) && row.fga > 0
    ? ratioIfPossible(row.tpa ?? row["3pa"] ?? row.three_pa, row.fga)
    : 0;
  if (datasetId === "grassroots") {
    row.pts_pg = Number.isFinite(row.pts) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.pts / row.gp, 1) : row.pts_pg;
    row.trb_pg = Number.isFinite(row.trb) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.trb / row.gp, 1) : row.trb_pg;
    row.ast_pg = Number.isFinite(row.ast) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.ast / row.gp, 1) : row.ast_pg;
    row.tov_pg = Number.isFinite(row.tov) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.tov / row.gp, 1) : row.tov_pg;
    row.stl_pg = Number.isFinite(row.stl) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.stl / row.gp, 1) : row.stl_pg;
    row.blk_pg = Number.isFinite(row.blk) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.blk / row.gp, 1) : row.blk_pg;
    row.stocks_pg = Number.isFinite(row.stocks) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.stocks / row.gp, 1) : row.stocks_pg;
    row.two_pa_pg = Number.isFinite(row.two_pa) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.two_pa / row.gp, 1) : row.two_pa_pg;
    row.three_pa_pg = Number.isFinite(row.three_pa) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.three_pa / row.gp, 1) : row.three_pa_pg;
    row.ftm_pg = Number.isFinite(row.ftm) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.ftm / row.gp, 1) : row.ftm_pg;
    row.pf_pg = Number.isFinite(row.pf) && Number.isFinite(row.gp) && row.gp > 0 ? roundNumber(row.pf / row.gp, 1) : row.pf_pg;
    const ftmFga = ratioIfPossible(row.ftm, row.fga);
    row.ftm_fga = Number.isFinite(ftmFga) ? ftmFga : 0;
    row.ast_to = Number.isFinite(row.tov) && row.tov > 0 ? roundNumber(row.ast / row.tov, 2) : 0;
    row.blk_pf = Number.isFinite(row.pf) && row.pf > 0 ? roundNumber(row.blk / row.pf, 2) : 0;
    row.stl_pf = Number.isFinite(row.pf) && row.pf > 0 ? roundNumber(row.stl / row.pf, 2) : 0;
    row.stocks_pf = Number.isFinite(row.pf) && row.pf > 0 ? roundNumber(row.stocks / row.pf, 2) : 0;
    row.pf_per40 = per40Value(row.pf, row.min) || 0;
    row.tov_per40 = per40Value(row.tov, row.min) || 0;
    row.percentile_weight = deriveGrassrootsPercentileWeight(row.gp, row.min);
    const adjBpm = calculateGrassrootsAdjBpm(row);
    row.adj_bpm = Number.isFinite(adjBpm) ? adjBpm : 0;
  }
  populateAstStlDerived(row, { overwrite: true, perGameDigits: datasetId === "grassroots" ? 1 : 2 });
  row.three_pa_per100 = possPer100Value(row.tpa ?? row["3pa"] ?? row.three_pa, row);
  row.ortg = row.ortg ?? ortgEstimate(row);
  populateAstTo(row);
  if (datasetId === "d2") {
    fillMissingRateStats(row, ["orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "usg_pct"]);
  } else {
    populateDefensiveRateStats(row);
    fillMissingRateStats(row, ["orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct", "usg_pct"]);
  }
  scalePercentRatioColumns(row);
  if (datasetId === "grassroots" && Number.isFinite(row.three_pr) && Number.isFinite(row.ftm_fga)) {
    row.three_pr_plus_ftm_fga = roundNumber(row.three_pr + row.ftm_fga, 1);
  } else if (datasetId === "grassroots") {
    row.three_pr_plus_ftm_fga = 0;
  }
  populateImpactMetrics(row);
}

function enhanceNbaRow(row) {
  scaleRateColumns(row, ["usg", "tspct", "efg", "fgpct_rim", "fgpct_mid", "fg2pct", "fg3pct", "ftpct", "orbpct", "drbpct", "astpct", "topct", "stlpct", "blkpct", "rim_ast_pct", "mid_ast_pct", "two_ast_pct", "three_ast_pct"], "nba");
  if (!Number.isFinite(row.ftr)) row.ftr = ratioIfPossible(row.fta_75, row.fga_75) || 0;
  row.three_pr = ratioIfPossible(firstFinite(row.fg3a_75, row.three_pa, row["3pa"], Number.NaN), firstFinite(row.fga_75, row.fga, Number.NaN)) || 0;
  populateAstStlDerived(row, { overwrite: true });
  populateAstTo(row);
  scalePercentRatioColumns(row);
  populateImpactMetrics(row);
}

function getD2BioLookup() {
  return typeof D2_BIO_LOOKUP !== "undefined" ? D2_BIO_LOOKUP : (window.D2_BIO_LOOKUP || {});
}

function applyD2BioLookup(row) {
  const lookup = getD2BioLookup();
  const seasonKey = getStringValue(normalizeLegacySeason(row.season));
  const nameKey = normalizeNameKey(row.player_name || row.player);
  const teamKeys = Array.from(new Set([normalizeKey(row.team_name), normalizeKey(row.team_full)].filter(Boolean)));
  const match = teamKeys.map((teamKey) => lookup[`${seasonKey}|${teamKey}|${nameKey}`]).find(Boolean);
  if (!match) return;
  if (!row.pos && match.pos) row.pos = normalizePosLabel(match.pos);
  if (!row.class_year && match.class_year) row.class_year = normalizeClassValue(match.class_year);
  if (!Number.isFinite(row.height_in) && match.height) {
    const parsed = parseHeightToInches(match.height);
    if (Number.isFinite(parsed)) {
      row.height_in = parsed;
      row.inches = parsed;
    }
  }
  refreshDerivedBiography(row);
}

function fillMissingRateStats(row, columns) {
  if (getMinutesValue(row) <= 0) return;
  columns.forEach((column) => {
    if (!Number.isFinite(row[column]) && canImputeZeroRate(row, column)) row[column] = 0;
  });
}

function canImputeZeroRate(row, column) {
  if (/^orb_pct$|^orbpct$/i.test(column)) return Number.isFinite(row.orb);
  if (/^drb_pct$|^drbpct$/i.test(column)) return Number.isFinite(row.drb);
  if (/^trb_pct$|^trbpct$/i.test(column)) return Number.isFinite(row.trb) || (Number.isFinite(row.orb) && Number.isFinite(row.drb));
  if (/^ast_pct$|^astpct$/i.test(column)) return Number.isFinite(row.ast);
  if (/^tov_pct$|^topct$/i.test(column)) return Number.isFinite(row.tov);
  if (/^stl_pct$|^stlpct$/i.test(column)) return Number.isFinite(row.stl);
  if (/^blk_pct$|^blkpct$/i.test(column)) return Number.isFinite(row.blk);
  if (/^usg_pct$|^usg$/i.test(column)) {
    return [row.pts, row.fga, row.fta, row.tov, row.total_poss].some((value) => Number.isFinite(value));
  }
  return true;
}

function populateAstTo(row) {
  if (Number.isFinite(row.ast_to)) return;
  if (!Number.isFinite(row.ast) || !Number.isFinite(row.tov) || row.tov <= 0) return;
  row.ast_to = roundNumber(row.ast / row.tov, 2);
}

function populateAstStlDerived(row, options = {}) {
  const overwrite = Boolean(options.overwrite);
  const perGameDigits = Number.isFinite(options.perGameDigits) ? options.perGameDigits : 2;
  const ast = firstFinite(row.ast, row.assists, Number.NaN);
  const stl = firstFinite(row.stl, row.steals, Number.NaN);
  const combined = Number.isFinite(ast) && Number.isFinite(stl) ? ast + stl : Number.NaN;
  const gp = firstFinite(row.gp, row.g, row.games, Number.NaN);
  const minutes = firstFinite(row.min, row.mp, Number.NaN);
  const astStlPg = Number.isFinite(combined) && Number.isFinite(gp) && gp > 0
    ? roundNumber(combined / gp, perGameDigits)
    : (Number.isFinite(row.ast_pg) && Number.isFinite(row.stl_pg) ? roundNumber(row.ast_pg + row.stl_pg, perGameDigits) : "");
  const astStlPer40 = Number.isFinite(combined) && Number.isFinite(minutes) && minutes > 0
    ? roundNumber((combined / minutes) * 40, 1)
    : (Number.isFinite(row.ast_per40) && Number.isFinite(row.stl_per40) ? roundNumber(row.ast_per40 + row.stl_per40, 1) : "");
  if (astStlPg !== "" && (overwrite || !Number.isFinite(row.ast_stl_pg))) row.ast_stl_pg = astStlPg;
  if (astStlPer40 !== "" && (overwrite || !Number.isFinite(row.ast_stl_per40))) row.ast_stl_per40 = astStlPer40;
}

function populateImpactMetrics(row) {
  if (!Number.isFinite(row.tov_pct) && Number.isFinite(row.tov_pct_adv)) row.tov_pct = row.tov_pct_adv;
  if (!Number.isFinite(row.net_rating) && Number.isFinite(row.ortg) && Number.isFinite(row.drtg)) {
    row.net_rating = roundNumber(row.ortg - row.drtg, 1);
  }
  if (!Number.isFinite(row.ast_pct_usg_pct)) row.ast_pct_usg_pct = ratioIfPossible(row.ast_pct, row.usg_pct);
  if (!Number.isFinite(row.ast_pct_tov_pct)) row.ast_pct_tov_pct = ratioIfPossible(row.ast_pct, firstFinite(row.tov_pct, row.tov_pct_adv, Number.NaN));
  if (!Number.isFinite(row.stocks_pct) && (Number.isFinite(row.stl_pct) || Number.isFinite(row.blk_pct))) {
    row.stocks_pct = roundNumber(firstFinite(row.stl_pct, 0) + firstFinite(row.blk_pct, 0), 1);
  }
  if (!Number.isFinite(row.bpm_diff) && Number.isFinite(row.obpm) && Number.isFinite(row.dbpm)) {
    row.bpm_diff = roundNumber(Math.abs(row.obpm - row.dbpm), 2);
  }
  if (!Number.isFinite(row.bpm_frac) && Number.isFinite(row.dbpm) && Number.isFinite(row.bpm) && row.bpm !== 0) {
    row.bpm_frac = roundNumber(row.dbpm / row.bpm, 3);
  }
  const ppr = calculatePpr(row);
  if (ppr !== "") row.ppr = ppr;
  const fic = calculateFic(row);
  if (fic !== "") row.fic = fic;
}

function getDefenseRatePercentileColumns(datasetId = "") {
  return DEFENSE_RATE_PERCENTILE_COLUMNS[datasetId] || [];
}

function populateDefenseRatePercentiles(rows, datasetId = "", options = {}) {
  if (!Array.isArray(rows) || !rows.length) return rows;
  const referenceRows = Array.isArray(options.referenceRows) && options.referenceRows.length
    ? options.referenceRows
    : rows;
  const pairs = getDefenseRatePercentileColumns(datasetId);
  if (!pairs.length) return rows;
  const minuteThreshold = Math.max(MINUTES_DEFAULT, STATIC_PERCENTILE_MINUTES);

  pairs.forEach(({ source, percentile }) => {
    const qualifiedRows = referenceRows.filter((row) => {
      if (!row) return false;
      const value = Number(row?.[source]);
      if (!Number.isFinite(value)) return false;
      const minutes = getMinutesValue(row);
      if (!(minutes >= minuteThreshold)) return false;
      if (datasetId === "grassroots" && !(getGamesValue(row) >= 2)) return false;
      return true;
    });
    const percentileSourceRows = qualifiedRows;
    const values = percentileSourceRows
      .map((row) => Number(row?.[source]))
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => left - right);

    if (!values.length) {
      rows.forEach((row) => {
        if (Object.prototype.hasOwnProperty.call(row || {}, percentile)) row[percentile] = "";
      });
      return;
    }

    rows.forEach((row) => {
      const value = Number(row?.[source]);
      if (!Number.isFinite(value)) {
        row[percentile] = "";
        return;
      }
      row[percentile] = roundNumber(percentileFromSorted(values, value) * 100, 1);
    });
  });

  return rows;
}

function normalizeSeasonValue(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  const match = text.match(/(\d{4})\s*[-/]\s*(\d{2,4})/);
  if (match) {
    const endPart = match[2];
    return Number(endPart.length === 2 ? `20${endPart}` : endPart);
  }
  const years = text.match(/\d{4}/g);
  if (years?.length) return Number(years[years.length - 1]);
  const numeric = Number(text);
  return Number.isNaN(numeric) ? text : numeric;
}

function simplifySchoolName(value, datasetId) {
  const raw = getStringValue(value).trim();
  if (!raw || datasetId === "nba") return raw;
  let cleaned = raw
    .replace(/&amp;/gi, "&")
    .replace(/([A-Za-z])-\(([^)]*)\)/g, "$1 $2")
    .replace(/-\s+\(/g, " (")
    .replace(/\(([^)]*)\)/g, " $1 ")
    .replace(/\bN\.J\.I\.T\.\b/gi, "NJIT")
    .replace(/\s+/g, " ")
    .trim();
  TEAM_SUFFIX_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, " ").replace(/\s+/g, " ").trim();
  });
  ACADEMIC_SUFFIX_PATTERNS.forEach((pattern) => {
    while (pattern.test(cleaned)) {
      cleaned = cleaned.replace(pattern, " ").replace(/\s+/g, " ").trim();
    }
  });
  cleaned = cleaned
    .replace(/\bInstitute of Technology\b/gi, " ")
    .replace(/\bUniversity\b/gi, " ")
    .replace(/\bInstitutes?\b/gi, " ")
    .replace(/^(?:college|cc|community college)\s+of\s+/i, "")
    .replace(/^of\s+/i, "")
    .replace(/\s+(?:of|and|&|-)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (datasetId === "juco") cleaned = simplifyStopwordTeamName(cleaned, JUCO_TEAM_STOPWORDS);
  if (datasetId === "naia" || datasetId === "juco") cleaned = stripTrailingLocationSuffix(cleaned);
  const tokens = cleaned.split(" ").filter(Boolean);
  while (tokens.length) {
    const last = normalizeTeamToken(tokens[tokens.length - 1]);
    if (!MASCOT_TOKENS.has(last)) break;
    tokens.pop();
    while (tokens.length && MASCOT_PREFIX_TOKENS.has(normalizeTeamToken(tokens[tokens.length - 1]))) {
      tokens.pop();
    }
  }
  const simplified = cleanupTeamEdgeWords(tokens.join(" ").replace(/\s+/g, " ").trim());
  const override = TEAM_DISPLAY_OVERRIDES[normalizeKey(simplified)] || TEAM_DISPLAY_OVERRIDES[normalizeKey(cleaned)] || TEAM_DISPLAY_OVERRIDES[normalizeKey(raw)];
  return override || simplified || cleaned || raw;
}

function simplifyStopwordTeamName(value, stopwords) {
  const cleaned = getStringValue(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const parts = cleaned.split(" ").filter((word) => word && !stopwords.has(word));
  if (!parts.length) return cleanupTeamEdgeWords(value);
  return cleanupTeamEdgeWords(parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
}

function stripTrailingLocationSuffix(value) {
  const tokens = getStringValue(value).trim().split(/\s+/).filter(Boolean);
  while (tokens.length > 1) {
    const last = normalizeTeamToken(tokens[tokens.length - 1]);
    if (!TRAILING_LOCATION_TOKENS.has(last)) break;
    tokens.pop();
  }
  return tokens.join(" ");
}

function cleanupTeamEdgeWords(value) {
  return getStringValue(value)
    .replace(/&amp;/gi, "&")
    .replace(/^\s*(?:of|and|the|at)\s+/i, "")
    .replace(/\s+(?:of|and|the|at)\s*$/i, "")
    .replace(/^\s*[&-]\s*/, "")
    .replace(/\s*[&-]\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

const D1_UNSCALED_STANDARD_PERCENT_COLUMNS = new Set([
  "orb_pct",
  "drb_pct",
  "trb_pct",
  "usg_pct",
  "ast_pct",
  "tov_pct",
  "tov_pct_adv",
  "stl_pct",
  "blk_pct",
  "stocks_pct",
  "ast_pct_usg_pct",
  "ast_pct_tov_pct",
]);

function datasetPercentColumnsStoredAsRatios(datasetId = "") {
  return datasetId === "d1" || datasetId === "d2" || datasetId === "nba" || datasetId === "team_coach";
}

function shouldScaleStandardPercentColumn(datasetId = "", column = "") {
  const normalizedDatasetId = normalizeKey(datasetId);
  if (!datasetPercentColumnsStoredAsRatios(normalizedDatasetId)) return false;
  const baseColumn = stripCompanionPrefix(column);
  if (!baseColumn) return false;
  if (normalizedDatasetId === "d1" && D1_UNSCALED_STANDARD_PERCENT_COLUMNS.has(baseColumn)) return false;
  return true;
}

function scaleRateColumns(row, columns, datasetId = "") {
  let scaledStandardPercentColumn = false;
  columns.forEach((column) => {
    if (!shouldScaleStandardPercentColumn(datasetId, column)) return;
    if (typeof row[column] === "number" && Number.isFinite(row[column]) && Math.abs(row[column]) <= 1) {
      row[column] = row[column] * 100;
      scaledStandardPercentColumn = true;
    }
  });
  if (!scaledStandardPercentColumn || !row || typeof row !== "object") return;
  if (Object.prototype.hasOwnProperty.call(row, "_standardPercentColumnsScaled")) {
    row._standardPercentColumnsScaled = true;
  } else {
    Object.defineProperty(row, "_standardPercentColumnsScaled", {
      value: true,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
}

function scalePercentRatioColumns(row) {
  Object.keys(row || {}).forEach((column) => {
    if (!/(^ftr$|_ftr$|^three_pr$|_three_pr$|^ftm_fga$|_ftm_fga$|^three_pr_plus_ftm_fga$|_three_pr_plus_ftm_fga$)/i.test(column)) return;
    if (typeof row[column] !== "number" || !Number.isFinite(row[column])) return;
    if (Math.abs(row[column]) <= 1.5) row[column] = row[column] * 100;
  });
  if (row && typeof row === "object") {
    if (Object.prototype.hasOwnProperty.call(row, "_percentRatiosScaled")) {
      row._percentRatiosScaled = true;
    } else {
      Object.defineProperty(row, "_percentRatiosScaled", {
        value: true,
        configurable: true,
        enumerable: false,
        writable: true,
      });
    }
  }
}

function resolvePercentNormalizationDatasetId(row, datasetId = "") {
  if (datasetId !== "player_career") return datasetId;
  const explicitDataset = normalizeKey(row?._datasetId || row?.dataset);
  if (explicitDataset && DATASETS[explicitDataset]) return explicitDataset;
  const sourceDataset = normalizeKey(row?.source_dataset);
  if (sourceDataset.startsWith("realgm nba")) return "nba";
  if (sourceDataset.startsWith("realgm international") || sourceDataset.includes("international")) return "international";
  if (sourceDataset.includes("fiba")) return "fiba";
  if (sourceDataset.includes("gleague") || sourceDataset.includes("g league")) return "international";
  const level = normalizeProfileLevel(row);
  if (level === "NBA") return "nba";
  if (level === "International" || level === "G League") return "international";
  if (level === "FIBA") return "fiba";
  return datasetId;
}

function normalizePercentLikeColumns(row, datasetId = "") {
  const effectiveDatasetId = resolvePercentNormalizationDatasetId(row, datasetId);
  let scaledStandardPercentColumn = false;
  Object.keys(row || {}).forEach((column) => {
    if (typeof row[column] !== "number" || !Number.isFinite(row[column])) return;
    if (isPercentRatioColumn(column)) {
      if (row._percentRatiosScaled) return;
      if (datasetPercentColumnsStoredAsRatios(effectiveDatasetId)) {
        if (Math.abs(row[column]) <= 1.5) row[column] = row[column] * 100;
      } else if (effectiveDatasetId !== "grassroots" && Math.abs(row[column]) <= 1.5) {
        row[column] = row[column] * 100;
      }
      return;
    }
    if (!(looksPercentColumn(column) || /^min_per$/i.test(column))) return;
    if (row._standardPercentColumnsScaled) return;
    if (!shouldScaleStandardPercentColumn(effectiveDatasetId, column)) return;
    if (Math.abs(row[column]) <= 1) {
      row[column] = row[column] * 100;
      scaledStandardPercentColumn = true;
    }
  });
  if (!scaledStandardPercentColumn || !row || typeof row !== "object") return;
  if (Object.prototype.hasOwnProperty.call(row, "_standardPercentColumnsScaled")) {
    row._standardPercentColumnsScaled = true;
    return;
  }
  Object.defineProperty(row, "_standardPercentColumnsScaled", {
    value: true,
    configurable: true,
    enumerable: false,
    writable: true,
  });
}

function abbreviateFibaCompetition(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  let formatted = text
    .replace(/^FIBA\s+/i, "")
    .replace(/Basketball World Cup/gi, "WC")
    .replace(/World Cup/gi, "WC")
    .replace(/\bUnder\s*/gi, "U")
    .replace(/\s+/g, " ")
    .trim();
  if (/EuroBasket Division B/i.test(formatted)) {
    formatted = formatted.replace(/EuroBasket Division B/gi, "Euros B");
  } else if (/EuroBasket/i.test(formatted)) {
    formatted = formatted.replace(/EuroBasket/gi, "Euros A");
  }
  return formatted;
}

function normalizeFibaCountryLabel(value) {
  const text = getStringValue(value).trim();
  if (!text) return "";
  const upper = text.toUpperCase();
  if (/^[A-Z]{3}$/.test(upper)) return upper;
  const key = normalizeKey(text);
  return {
    "united states of america": "USA",
    "united states": "USA",
    usa: "USA",
    "great britain": "GBR",
    britain: "GBR",
    england: "GBR",
    scotland: "GBR",
    wales: "GBR",
    turkey: "TUR",
    turkiye: "TUR",
    "czech republic": "CZE",
    czechia: "CZE",
    korea: "KOR",
    "south korea": "KOR",
    "republic of korea": "KOR",
    "dominican republic": "DOM",
    "puerto rico": "PUR",
    "new zealand": "NZL",
    "saudi arabia": "KSA",
    "united arab emirates": "UAE",
    "bosnia and herzegovina": "BIH",
    "north macedonia": "MKD",
    "cape verde": "CPV",
    "ivory coast": "CIV",
    "cote divoire": "CIV",
  }[key] || upper;
}

function normalizeDisplayName(value) {
  let text = getStringValue(value).trim();
  if (!text) return "";
  if (text.includes(",")) {
    const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length === 2 && isNameSuffixToken(parts[1])) text = `${parts[0]} ${parts[1]}`;
    else if (parts.length === 2) text = `${parts[1]} ${parts[0]}`;
    else if (parts.length >= 3) text = `${parts[1]} ${parts[0]} ${parts.slice(2).join(" ")}`;
  }
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (!letters) return text;
  const upperRatio = letters.split("").filter((char) => char === char.toUpperCase()).length / letters.length;
  const needsCleanup = upperRatio >= 0.7 || text.split(/\s+/).some((part) => {
    const onlyLetters = part.replace(/[^A-Za-z]/g, "");
    return onlyLetters.length > 1 && onlyLetters === onlyLetters.toUpperCase();
  });
  const cleaned = normalizeApostropheNameCasing(!needsCleanup ? text.replace(/\s+/g, " ").trim() : text
    .split(/(\s+|-|')/)
    .map((part) => {
      const onlyLetters = part.replace(/[^A-Za-z]/g, "");
      if (!onlyLetters) return part;
      if (onlyLetters.length === 1) return part.toUpperCase();
      if (onlyLetters.length === 2 && onlyLetters === onlyLetters.toUpperCase() && /[BCDFGHJKLMNPQRSTVWXYZ]$/.test(onlyLetters)) {
        return onlyLetters;
      }
      const lower = part.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("")
    .replace(/\bMc([a-z])/g, (_, letter) => `Mc${letter.toUpperCase()}`)
    .replace(/\bO'([a-z])/g, (_, letter) => `O'${letter.toUpperCase()}`)
    .replace(/\s+/g, " ")
    .trim());
  return cleaned
    .split(/\s+/)
    .map((token) => normalizeDisplayNameToken(token))
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\bJR\.?$/i, "Jr.")
    .replace(/\bSR\.?$/i, "Sr.")
    .trim();
}

function isNameSuffixToken(value) {
  return /^(?:jr\.?|sr\.?|ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(getStringValue(value).trim());
}

function normalizeDisplayNameToken(token) {
  const bare = token.replace(/[^A-Za-z]/g, "");
  if (!bare) return token;
  if (/^(ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(bare)) return token.replace(bare, bare.toUpperCase());
  if (/^[A-Za-z]\.[A-Za-z]\.?$/.test(token) || /^[A-Za-z]\.?[A-Za-z]\.$/.test(token)) return bare.toUpperCase();
  return token;
}

function normalizeApostropheNameCasing(value) {
  return getStringValue(value).replace(/\b([A-Z]{2,})'(?=[A-Z][a-z])/g, (_, prefix) => {
    return `${prefix.charAt(0)}${prefix.slice(1).toLowerCase()}'`;
  });
}

function populateAgeFromDob(row) {
  if (!row || Number.isFinite(row.age) || !Number.isFinite(row.season)) return;
  const dobText = getStringValue(row.dob || row.birthday).trim();
  if (!dobText) return;
  const dob = new Date(dobText);
  if (Number.isNaN(dob.getTime())) return;
  const ref = new Date(Number(row.season), 5, 23);
  row.age = roundNumber((ref - dob) / (1000 * 60 * 60 * 24 * 365.25), 1);
}

function parseDraftInfo(value) {
  const text = getStringValue(value).trim();
  if (!text) return { year: "", pick: "", undrafted: false, eligible: false };
  const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
  const roundPickMatch = text.match(/\b(?:Rnd|Round)\s*([12])(?:st|nd|rd|th)?\D{0,16}(?:Pick)?\s*(\d{1,2})(?:st|nd|rd|th)?\b/i)
    || text.match(/\b([12])(?:st|nd|rd|th)?\s*(?:Rnd|Round)\D{0,16}(\d{1,2})(?:st|nd|rd|th)?\s*(?:Pick)?\b/i);
  const overallMatch = text.match(/\b(?:Overall|No\.?|#)\s*(\d{1,2})\b/i);
  const pickOnlyMatch = text.match(/\bPick\s*(\d{1,2})\b/i);
  const round = roundPickMatch ? Number(roundPickMatch[1]) : Number.NaN;
  const pickInRound = roundPickMatch
    ? Number(roundPickMatch[2])
    : (overallMatch ? Number(overallMatch[1]) : (pickOnlyMatch ? Number(pickOnlyMatch[1]) : Number.NaN));
  let pick = "";
  if (Number.isFinite(pickInRound)) {
    pick = Number.isFinite(round) && round > 1 && pickInRound <= 30
      ? ((round - 1) * 30) + pickInRound
      : pickInRound;
    if (!Number.isFinite(pick) || pick < 1 || pick > 60) pick = "";
  }
  return {
    year: yearMatch ? Number(yearMatch[1]) : "",
    pick,
    undrafted: /\bundrafted\b/i.test(text),
    eligible: /\bdraft eligible\b/i.test(text),
  };
}

function getDraftInfoSource(row) {
  return [
    row?.draft_status,
    row?.pre_draft_team,
    row?.current_nba_status,
  ].map((value) => getStringValue(value).trim()).find((value) => /\b(?:NBA\s+Draft|Rnd|Round|Pick|Undrafted|Draft Eligible)\b/i.test(value)) || "";
}

const NBA_DRAFT_TEAM_ABBREVIATIONS = new Set([
  "ATL", "BOS", "BRK", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "DET",
  "GS", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN",
  "NO", "NOH", "NOP", "NY", "NYK", "OKC", "ORL", "PHI", "PHO", "PHX",
  "POR", "SA", "SAS", "SAC", "TOR", "UTA", "WAS",
]);

const NBA_DRAFT_TEAM_NAME_PATTERN = /\b(?:76ers|blazers|bucks|bulls|cavaliers|celtics|clippers|grizzlies|hawks|heat|hornets|jazz|kings|knicks|lakers|magic|mavericks|nets|nuggets|pacers|pelicans|pistons|raptors|rockets|spurs|suns|thunder|timberwolves|warriors|wizards)\b/i;

function hasNbaCareerDraftContext(row) {
  const status = getStringValue(row?.current_nba_status).trim();
  const currentTeam = getStringValue(row?.current_team).trim();
  if (NBA_DRAFT_TEAM_NAME_PATTERN.test(status) || NBA_DRAFT_TEAM_NAME_PATTERN.test(currentTeam)) return true;
  const pathText = [row?.profile_career_path, row?.career_path]
    .map((value) => getStringValue(value).trim())
    .filter(Boolean)
    .join(" -> ");
  return pathText
    .split(/\s*(?:->|,|\/)\s*/)
    .some((token) => NBA_DRAFT_TEAM_ABBREVIATIONS.has(token.trim().toUpperCase()));
}

function normalizeDraftPickValue(row) {
  const draftSource = getDraftInfoSource(row);
  const draftInfo = parseDraftInfo(draftSource);
  if (!draftInfo.undrafted && !draftInfo.eligible && Number.isFinite(draftInfo.year) && !Number.isFinite(Number(row.draft_year))) {
    row.draft_year = draftInfo.year;
  }
  if (draftInfo.undrafted || draftInfo.eligible) {
    row._draftPickBlank = true;
    if (Object.prototype.hasOwnProperty.call(row, "draft_pick")) row.draft_pick = 61;
    return;
  }
  if (Number.isFinite(draftInfo.pick)) {
    row._draftPickBlank = false;
    row.draft_pick = Math.round(draftInfo.pick);
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(row, "draft_pick")) return;
  const pick = Number(row.draft_pick);
  const hasDraftYear = Number.isFinite(Number(row.draft_year));
  const hasRookieYear = Number.isFinite(Number(row.rookie_year));
  const hasReliableDraftContext = Boolean(
    draftSource
      || hasDraftYear
      || hasRookieYear
      || hasNbaCareerDraftContext(row)
  );
  if (!hasReliableDraftContext && pick > 0) {
    row._draftPickBlank = true;
    row.draft_pick = 61;
    return;
  }
  if (!Number.isFinite(pick) || pick < 1 || pick > 60) {
    row._draftPickBlank = true;
    row.draft_pick = 61;
    return;
  }
  row._draftPickBlank = false;
  row.draft_pick = Math.round(pick);
}

function normalizeD1PlaytypeColumns(row) {
  if (row._careerAggregate) return;
  const gp = firstFinite(row.gp, Number.NaN);
  if (!Number.isFinite(gp) || gp <= 0) return;
  Object.keys(row).forEach((column) => {
    if (typeof row[column] !== "number" || !Number.isFinite(row[column])) return;
    if (/(_fg_att$|_two_fg_att$|_three_fg_att$)/.test(column)) {
      const possColumn = column.replace(/(_fg_att|_two_fg_att|_three_fg_att)$/, "_poss");
      if (Number.isFinite(row[possColumn]) && row[column] > (row[possColumn] * 5)) return;
      row[column] = roundNumber(row[column] * gp, 1);
    }
  });
}

function populateD1PlaytypeVolumeMetrics(row) {
  if (!row || row._careerAggregate) return;
  const gp = firstFinite(row.gp, Number.NaN);
  const minutes = firstFinite(row.min, Number.isFinite(gp) && Number.isFinite(row.mpg) ? row.gp * row.mpg : Number.NaN, Number.NaN);
  D1_TRUE_PLAYTYPE_IDS.forEach((id) => {
    const pointsColumn = `${id}_points`;
    const fgAttColumn = `${id}_fg_att`;
    const twoAttColumn = `${id}_two_fg_att`;
    const threeAttColumn = `${id}_three_fg_att`;
    const ftaColumn = `${id}_fta`;
    let fgAtt = firstFinite(row[fgAttColumn], Number.NaN);
    let twoAtt = firstFinite(row[twoAttColumn], Number.NaN);
    let threeAtt = firstFinite(row[threeAttColumn], Number.NaN);
    if (!Number.isFinite(fgAtt) && Number.isFinite(twoAtt) && Number.isFinite(threeAtt)) {
      fgAtt = twoAtt + threeAtt;
      row[fgAttColumn] = roundNumber(fgAtt, 1);
    }
    if (!Number.isFinite(twoAtt) && Number.isFinite(fgAtt) && Number.isFinite(threeAtt)) {
      twoAtt = Math.max(0, fgAtt - threeAtt);
      row[twoAttColumn] = roundNumber(twoAtt, 1);
    }
    if (!Number.isFinite(threeAtt) && Number.isFinite(fgAtt) && Number.isFinite(twoAtt)) {
      threeAtt = Math.max(0, fgAtt - twoAtt);
      row[threeAttColumn] = roundNumber(threeAtt, 1);
    }
    const ftr = ratioValueFromMaybePercent(firstFinite(row[`${id}_ftr`], Number.NaN));
    if (!Number.isFinite(row[ftaColumn]) && Number.isFinite(fgAtt) && Number.isFinite(ftr)) {
      row[ftaColumn] = roundNumber(fgAtt * ftr, 1);
    }
    [
      [pointsColumn, `${id}_points_pg`],
      [fgAttColumn, `${id}_fg_att_pg`],
      [twoAttColumn, `${id}_two_fg_att_pg`],
      [threeAttColumn, `${id}_three_fg_att_pg`],
      [ftaColumn, `${id}_fta_pg`],
    ].forEach(([totalColumn, perGameColumn]) => {
      const total = firstFinite(row[totalColumn], Number.NaN);
      const pg = perGameValue(total, gp);
      if (pg !== "") row[perGameColumn] = pg;
    });
    [
      [pointsColumn, `${id}_points_per40`],
      [fgAttColumn, `${id}_fg_att_per40`],
      [twoAttColumn, `${id}_two_fg_att_per40`],
      [threeAttColumn, `${id}_three_fg_att_per40`],
      [ftaColumn, `${id}_fta_per40`],
    ].forEach(([totalColumn, per40Column]) => {
      const total = firstFinite(row[totalColumn], Number.NaN);
      const per40 = per40Value(total, minutes);
      if (per40 !== "") row[per40Column] = per40;
    });
  });
}

function populateD1CountDisplayModes(row, totalColumns = []) {
  if (!row || row._careerAggregate) return;
  const gp = firstFinite(row.gp, Number.NaN);
  const minutes = firstFinite(row.min, Number.isFinite(gp) && Number.isFinite(row.mpg) ? row.gp * row.mpg : Number.NaN, Number.NaN);
  (totalColumns || []).forEach((column) => {
    const total = firstFinite(row[column], Number.NaN);
    const perGame = perGameValue(total, gp);
    const per40 = per40Value(total, minutes);
    if (perGame !== "") row[`${column}_pg`] = perGame;
    if (per40 !== "") row[`${column}_per40`] = per40;
  });
}

function populateD1HalfcourtMetrics(row) {
  if (!row || row._careerAggregate) return;
  let poss = 0;
  let fgAtt = 0;
  let twoAtt = 0;
  let threeAtt = 0;
  let fta = 0;
  let points = 0;
  let turnovers = 0;
  let twoMade = 0;
  let threeMade = 0;
  let hasPoss = false;
  let hasFgAtt = false;
  let hasTwoAtt = false;
  let hasThreeAtt = false;
  let hasFta = false;
  let hasPoints = false;
  let hasTurnovers = false;
  let hasTwoMade = false;
  let hasThreeMade = false;

  D1_HALFCOURT_PLAYTYPE_IDS.forEach((id) => {
    const playPoss = firstFinite(row[`${id}_poss`], Number.NaN);
    let playFgAtt = firstFinite(row[`${id}_fg_att`], Number.NaN);
    let playTwoAtt = firstFinite(row[`${id}_two_fg_att`], Number.NaN);
    let playThreeAtt = firstFinite(row[`${id}_three_fg_att`], Number.NaN);
    if (!Number.isFinite(playFgAtt) && Number.isFinite(playTwoAtt) && Number.isFinite(playThreeAtt)) playFgAtt = playTwoAtt + playThreeAtt;
    if (!Number.isFinite(playTwoAtt) && Number.isFinite(playFgAtt) && Number.isFinite(playThreeAtt)) playTwoAtt = Math.max(0, playFgAtt - playThreeAtt);
    if (!Number.isFinite(playThreeAtt) && Number.isFinite(playFgAtt) && Number.isFinite(playTwoAtt)) playThreeAtt = Math.max(0, playFgAtt - playTwoAtt);
    const playFtr = ratioValueFromMaybePercent(firstFinite(row[`${id}_ftr`], Number.NaN));
    let playFta = firstFinite(row[`${id}_fta`], Number.NaN);
    if (!Number.isFinite(playFta) && Number.isFinite(playFgAtt) && Number.isFinite(playFtr)) playFta = playFgAtt * playFtr;
    const playTwoPct = ratioValueFromMaybePercent(firstFinite(row[`${id}_two_fg_pct`], Number.NaN));
    const playThreePct = ratioValueFromMaybePercent(firstFinite(row[`${id}_three_fg_pct`], Number.NaN));
    const playTovPct = ratioValueFromMaybePercent(firstFinite(row[`${id}_tov_pct`], Number.NaN));
    const playPpp = firstFinite(row[`${id}_ppp`], Number.NaN);

    if (Number.isFinite(playPoss)) {
      poss += playPoss;
      hasPoss = true;
    }
    if (Number.isFinite(playFgAtt)) {
      fgAtt += playFgAtt;
      hasFgAtt = true;
    }
    if (Number.isFinite(playTwoAtt)) {
      twoAtt += playTwoAtt;
      hasTwoAtt = true;
    }
    if (Number.isFinite(playThreeAtt)) {
      threeAtt += playThreeAtt;
      hasThreeAtt = true;
    }
    if (Number.isFinite(playFta)) {
      fta += playFta;
      hasFta = true;
    }
    if (Number.isFinite(playPoss) && Number.isFinite(playPpp)) {
      points += playPoss * playPpp;
      hasPoints = true;
    }
    if (Number.isFinite(playPoss) && Number.isFinite(playTovPct)) {
      turnovers += playPoss * playTovPct;
      hasTurnovers = true;
    }
    if (Number.isFinite(playTwoAtt) && Number.isFinite(playTwoPct)) {
      twoMade += playTwoAtt * playTwoPct;
      hasTwoMade = true;
    }
    if (Number.isFinite(playThreeAtt) && Number.isFinite(playThreePct)) {
      threeMade += playThreeAtt * playThreePct;
      hasThreeMade = true;
    }
  });

  if (hasPoss) row.halfcourt_poss = roundNumber(poss, 1);
  if (hasFgAtt) row.halfcourt_fg_att = roundNumber(fgAtt, 1);
  if (hasTwoAtt) row.halfcourt_two_fg_att = roundNumber(twoAtt, 1);
  if (hasThreeAtt) row.halfcourt_three_fg_att = roundNumber(threeAtt, 1);
  if (hasFta) row.halfcourt_fta = roundNumber(fta, 1);
  if (hasPoints && poss > 0) row.halfcourt_ppp = roundNumber(points / poss, 3);
  if (hasTurnovers && poss > 0) row.halfcourt_tov_pct = roundNumber((turnovers / poss) * 100, 1);
  if (hasTwoMade && twoAtt > 0) row.halfcourt_two_fg_pct = roundNumber((twoMade / twoAtt) * 100, 1);
  if (hasThreeMade && threeAtt > 0) row.halfcourt_three_fg_pct = roundNumber((threeMade / threeAtt) * 100, 1);
  if ((hasTwoMade || hasThreeMade) && fgAtt > 0) row.halfcourt_efg_pct = roundNumber(((twoMade + (1.5 * threeMade)) / fgAtt) * 100, 1);
  if (Number.isFinite(row.halfcourt_fta) && Number.isFinite(row.halfcourt_fg_att)) row.halfcourt_ftr = ratioIfPossible(row.halfcourt_fta, row.halfcourt_fg_att);
  if (Number.isFinite(row.halfcourt_three_fg_att) && Number.isFinite(row.halfcourt_fg_att)) row.halfcourt_three_pr = ratioIfPossible(row.halfcourt_three_fg_att, row.halfcourt_fg_att);
  if (!Number.isFinite(row.halfcourt_two_fg_att) && Number.isFinite(row.halfcourt_two_pa)) row.halfcourt_two_fg_att = row.halfcourt_two_pa;
  if (!Number.isFinite(row.halfcourt_two_fg_pct) && Number.isFinite(row.halfcourt_two_p_pct)) row.halfcourt_two_fg_pct = row.halfcourt_two_p_pct;
  if (!Number.isFinite(row.halfcourt_two_pa) && Number.isFinite(row.halfcourt_two_fg_att)) row.halfcourt_two_pa = row.halfcourt_two_fg_att;
  if (!Number.isFinite(row.halfcourt_two_p_pct) && Number.isFinite(row.halfcourt_two_fg_pct)) row.halfcourt_two_p_pct = row.halfcourt_two_fg_pct;
  if (Number.isFinite(row.total_poss) && Number.isFinite(row.halfcourt_poss) && row.total_poss > 0) {
    row.halfcourt_freq = roundNumber((row.halfcourt_poss / row.total_poss) * 100, 1);
  } else if (Number.isFinite(row.halfcourt_freq)) {
    row.halfcourt_freq = roundNumber(clampPercentValue(row.halfcourt_freq), 1);
  }
  populateD1CountDisplayModes(row, ["halfcourt_poss", "halfcourt_fg_att", "halfcourt_fta", "halfcourt_two_fg_att", "halfcourt_three_fg_att"]);
}

function populateD1FoulDerived(row) {
  if (!row || row._careerAggregate) return;
  const pfPer40 = firstFinite(row.pf_per40, row.pfr, Number.NaN);
  if (Number.isFinite(pfPer40) && !Number.isFinite(row.pf_per40)) row.pf_per40 = roundNumber(pfPer40, 1);
  const minutes = firstFinite(row.min, Number.isFinite(row.gp) && Number.isFinite(row.mpg) ? row.gp * row.mpg : Number.NaN, Number.NaN);
  if (!Number.isFinite(row.pf) && Number.isFinite(pfPer40) && Number.isFinite(minutes) && minutes > 0) {
    row.pf = roundNumber((pfPer40 * minutes) / 40, 1);
  }
  const pfPg = perGameValue(row.pf, row.gp);
  if (pfPg !== "") row.pf_pg = pfPg;
  const pf40 = per40Value(row.pf, minutes);
  if (pf40 !== "" && !Number.isFinite(row.pf_per40)) row.pf_per40 = pf40;
}

function getShotProfileTotalValue(row, column) {
  if (!row || !column) return Number.NaN;
  const aliases = {
    dunk_made: ["dunk_made"],
    dunk_att: ["dunk_att"],
    dunk_unast_made: ["dunk_unast_made"],
    rim_made: ["rim_made", "fgm_rim"],
    rim_att: ["rim_att", "fga_rim"],
    rim_unast_made: ["rim_unast_made"],
    mid_made: ["mid_made", "fgm_mid", "long2_made"],
    mid_att: ["mid_att", "fga_mid", "long2_att"],
    mid_unast_made: ["mid_unast_made"],
    two_p_made: ["two_p_made", "two_pm", "2pm"],
    two_p_att: ["two_p_att", "two_pa", "2pa", "2pa_total"],
    two_p_unast_made: ["two_p_unast_made"],
    three_p_made: ["three_p_made", "three_pm", "3pm", "tpm"],
    three_p_att: ["three_p_att", "three_pa", "3pa", "tpa"],
    three_p_unast_made: ["three_p_unast_made"],
    ftm: ["ftm"],
    fta: ["fta"],
  }[column] || [column];
  return firstFinite(...aliases.map((key) => row[key]), Number.NaN);
}

function getShotProfileAstPctValue(row, column) {
  if (!row || !column) return Number.NaN;
  const aliases = {
    dunk_ast_pct: ["dunk_ast_pct"],
    rim_ast_pct: ["rim_ast_pct"],
    mid_ast_pct: ["mid_ast_pct"],
    two_p_ast_pct: ["two_p_ast_pct", "two_ast_pct"],
    three_p_ast_pct: ["three_p_ast_pct", "three_ast_pct"],
  }[column] || [column];
  return firstFinite(...aliases.map((key) => row[key]), Number.NaN);
}

function populateShotProfileDisplayModes(row) {
  const gp = firstFinite(row.gp, Number.NaN);
  const minutes = firstFinite(row.min, Number.isFinite(gp) && Number.isFinite(row.mpg) ? row.gp * row.mpg : Number.NaN, Number.NaN);
  const assistedRatio = (value) => {
    const ratio = ratioValueFromMaybePercent(firstFinite(value, Number.NaN));
    return Number.isFinite(ratio) ? Math.max(0, Math.min(1, ratio)) : Number.NaN;
  };

  [
    "dunk_made",
    "dunk_att",
    "rim_made",
    "rim_att",
    "mid_made",
    "mid_att",
    "two_p_made",
    "two_p_att",
    "three_p_made",
    "three_p_att",
    "ftm",
    "fta",
  ].forEach((column) => {
    const value = getShotProfileTotalValue(row, column);
    if (Number.isFinite(value) && !Number.isFinite(row[column])) row[column] = roundNumber(value, 3);
  });

  [
    ["dunk_unast_made", "dunk_made", "dunk_ast_pct"],
    ["rim_unast_made", "rim_made", "rim_ast_pct"],
    ["mid_unast_made", "mid_made", "mid_ast_pct"],
    ["two_p_unast_made", "two_p_made", "two_p_ast_pct"],
    ["three_p_unast_made", "three_p_made", "three_p_ast_pct"],
  ].forEach(([target, madeColumn, astPctColumn]) => {
    const made = getShotProfileTotalValue(row, madeColumn);
    const astRatio = assistedRatio(getShotProfileAstPctValue(row, astPctColumn));
    if (!Number.isFinite(row[target]) && Number.isFinite(made) && Number.isFinite(astRatio)) {
      row[target] = roundNumber(made * (1 - astRatio), 3);
    }
  });

  [
    "dunk_made", "dunk_att", "dunk_unast_made",
    "rim_made", "rim_att", "rim_unast_made",
    "mid_made", "mid_att", "mid_unast_made",
    "two_p_made", "two_p_att", "two_p_unast_made",
    "three_p_made", "three_p_att", "three_p_unast_made",
    "ftm", "fta",
  ].forEach((column) => {
    const total = getShotProfileTotalValue(row, column);
    const perGame = perGameValue(total, gp);
    const per40 = per40Value(total, minutes);
    if (perGame !== "") row[`${column}_pg`] = perGame;
    if (per40 !== "") row[`${column}_per40`] = per40;
  });
}

function populateD1ShotProfileDisplayModes(row) {
  populateShotProfileDisplayModes(row);
}

function estimateD1PlaytypeTotalPossFromFreq(row) {
  if (!row) return Number.NaN;
  let possSum = 0;
  let freqRatioSum = 0;
  D1_TRUE_PLAYTYPE_IDS.forEach((id) => {
    const poss = firstFinite(row[`${id}_poss`], Number.NaN);
    const freq = normalizeFrequencyPercentValue(row[`${id}_freq`]);
    if (!Number.isFinite(poss) || poss <= 0 || !Number.isFinite(freq) || freq <= 0) return;
    possSum += poss;
    freqRatioSum += freq / 100;
  });
  return possSum > 0 && freqRatioSum > 0 ? possSum / freqRatioSum : Number.NaN;
}

function normalizeD1TruePlaytypeFrequencies(row) {
  const possColumns = [
    "iso_poss",
    "pnr_bh_poss",
    "post_up_poss",
    "pnr_roll_poss",
    "spot_up_poss",
    "off_screen_poss",
    "hand_off_poss",
    "cut_poss",
    "off_reb_poss",
    "transition_poss",
  ];
  const sourceTotal = estimateD1PlaytypeTotalPossFromFreq(row);
  const summedTotal = possColumns.reduce((sum, column) => sum + (Number.isFinite(row[column]) ? row[column] : 0), 0);
  const maxPoss = possColumns.reduce((max, column) => Math.max(max, Number.isFinite(row[column]) ? row[column] : 0), 0);
  let total = firstPositiveFinite(sourceTotal, summedTotal, Number.NaN);
  if (Number.isFinite(total) && maxPoss > total) {
    total = Number.isFinite(summedTotal) && summedTotal >= maxPoss ? summedTotal : maxPoss;
  }
  possColumns.forEach((column) => {
    const value = Number.isFinite(row[column]) ? row[column] : 0;
    const freqColumn = column.replace(/_poss$/, "_freq");
    if (total > 0) {
      row[freqColumn] = roundNumber((value / total) * 100, 1);
      return;
    }
    const normalized = normalizeFrequencyPercentValue(row[freqColumn]);
    if (Number.isFinite(normalized)) row[freqColumn] = roundNumber(normalized, 1);
  });
}

function normalizeD1DriveMetrics(row) {
  if (!row || row._careerAggregate) return;
  const totalPoss = firstPositiveFinite(estimateD1PlaytypeTotalPossFromFreq(row), row.total_poss, estimatedPossessions(row), Number.NaN);
  const driveGpColumns = ["drive_poss", "drive_fga", "drive_fta", "drive_two_pa"];
  if (Number.isFinite(row.transition_freq)) row.transition_freq = roundNumber(clampPercentValue(row.transition_freq), 1);
  let transitionPoss = Number.isFinite(totalPoss) && Number.isFinite(row.transition_freq)
    ? (totalPoss * clampPercentValue(row.transition_freq)) / 100
    : firstFinite(row.transition_poss, Number.NaN);
  if (!Number.isFinite(row.transition_poss) && Number.isFinite(transitionPoss)) row.transition_poss = roundNumber(transitionPoss, 1);
  let halfcourtPoss = firstFinite(row.halfcourt_poss, Number.NaN);
  if (!Number.isFinite(halfcourtPoss) && Number.isFinite(totalPoss)) {
    halfcourtPoss = Math.max(0, totalPoss - (Number.isFinite(transitionPoss) ? transitionPoss : 0));
    row.halfcourt_poss = roundNumber(halfcourtPoss, 1);
  }
  const drivePoss = firstFinite(row.drive_poss, Number.NaN);
  if (Number.isFinite(drivePoss) && Number.isFinite(totalPoss) && totalPoss > 0) {
    row.drive_freq = roundNumber(clampPercentValue((drivePoss / totalPoss) * 100), 1);
  } else if (Number.isFinite(row.drive_freq)) {
    row.drive_freq = roundNumber(clampPercentValue(row.drive_freq), 1);
  }
  const halfcourtSeasonPoss = Number.isFinite(totalPoss)
    ? Math.max(0, totalPoss - (Number.isFinite(transitionPoss) ? transitionPoss : 0))
    : halfcourtPoss;
  if (Number.isFinite(drivePoss) && Number.isFinite(halfcourtSeasonPoss) && halfcourtSeasonPoss > 0) {
    row.hc_drive_freq = roundNumber(clampPercentValue((drivePoss / halfcourtSeasonPoss) * 100), 1);
  } else if (Number.isFinite(row.hc_drive_freq)) {
    row.hc_drive_freq = roundNumber(clampPercentValue(row.hc_drive_freq), 1);
  } else if (Number.isFinite(row.drive_freq)) {
    row.hc_drive_freq = row.drive_freq;
  }
  if (Number.isFinite(row.drive_freq) && Number.isFinite(row.transition_freq)) {
    row.drive_plus_trans_freq = roundNumber(clampPercentValue(row.drive_freq + row.transition_freq), 1);
  }
  if (!Number.isFinite(row.drive_ppp) && Number.isFinite(row.drive_points) && Number.isFinite(drivePoss) && drivePoss > 0) {
    row.drive_ppp = roundNumber(row.drive_points / drivePoss, 3);
  }
  if (!Number.isFinite(row.drive_fta) && Number.isFinite(row.drive_fga)) {
    const driveFtr = ratioValueFromMaybePercent(firstFinite(row.drive_ftr, Number.NaN));
    if (Number.isFinite(driveFtr)) row.drive_fta = roundNumber(row.drive_fga * driveFtr, 1);
  }
  if (!Number.isFinite(row.drive_fg_pct)) row.drive_fg_pct = percentIfPossible(row.drive_fgm, row.drive_fga);
  if (!Number.isFinite(row.drive_two_p_pct)) row.drive_two_p_pct = percentIfPossible(row.drive_two_pm, row.drive_two_pa);
  if (!Number.isFinite(row.drive_tov_pct)) row.drive_tov_pct = percentOfPossessions(row.drive_tov, drivePoss);
  if (!Number.isFinite(row.drive_ftr)) row.drive_ftr = ratioIfPossible(row.drive_fta, row.drive_fga);
  if (!Number.isFinite(row.drive_plus1_pct)) row.drive_plus1_pct = percentOfPossessions(row.drive_plus1, drivePoss);
  populateD1CountDisplayModes(row, driveGpColumns);
}

function normalizeD1RimScoringMetrics(row) {
  if (!row || row._careerAggregate) return;
  const totalPoss = firstPositiveFinite(estimateD1PlaytypeTotalPossFromFreq(row), row.total_poss, estimatedPossessions(row), Number.NaN);
  const aggregateSums = Object.fromEntries(D1_RIM_SCORING_TOTAL_SUFFIXES.map((suffix) => [suffix, { total: 0, has: false }]));
  const weightedPercentSums = Object.fromEntries(["sf_pct", "score_pct", "plus1_pct"].map((suffix) => [suffix, { total: 0, weight: 0 }]));

  D1_RIM_SCORING_COMPONENTS.forEach((component) => {
    const prefix = component.prefix;
    let fga = firstFinite(row[`${prefix}_fga`], Number.NaN);
    let fgm = firstFinite(row[`${prefix}_fgm`], Number.NaN);
    let fgMiss = firstFinite(row[`${prefix}_fg_miss`], Number.NaN);
    let twoAtt = firstFinite(row[`${prefix}_two_fg_att`], Number.NaN);
    let twoMade = firstFinite(row[`${prefix}_two_fg_made`], Number.NaN);
    let twoMiss = firstFinite(row[`${prefix}_two_fg_miss`], Number.NaN);
    let threeAtt = firstFinite(row[`${prefix}_three_fg_att`], Number.NaN);
    let threeMade = firstFinite(row[`${prefix}_three_fg_made`], Number.NaN);
    let threeMiss = firstFinite(row[`${prefix}_three_fg_miss`], Number.NaN);
    let fta = firstFinite(row[`${prefix}_fta`], Number.NaN);
    let ftm = firstFinite(row[`${prefix}_ftm`], Number.NaN);
    let ftMiss = firstFinite(row[`${prefix}_ft_miss`], Number.NaN);
    const poss = firstFinite(row[`${prefix}_poss`], Number.NaN);
    const points = firstFinite(row[`${prefix}_points`], Number.NaN);
    const tov = firstFinite(row[`${prefix}_tov`], Number.NaN);
    const plus1 = firstFinite(row[`${prefix}_plus1`], Number.NaN);

    if (!Number.isFinite(fga) && Number.isFinite(twoAtt) && Number.isFinite(threeAtt)) fga = twoAtt + threeAtt;
    if (!Number.isFinite(fgm) && Number.isFinite(twoMade) && Number.isFinite(threeMade)) fgm = twoMade + threeMade;
    if (!Number.isFinite(fgMiss) && Number.isFinite(fga) && Number.isFinite(fgm)) fgMiss = Math.max(0, fga - fgm);
    if (!Number.isFinite(twoAtt) && Number.isFinite(fga) && Number.isFinite(threeAtt)) twoAtt = Math.max(0, fga - threeAtt);
    if (!Number.isFinite(threeAtt) && Number.isFinite(fga) && Number.isFinite(twoAtt)) threeAtt = Math.max(0, fga - twoAtt);
    if (!Number.isFinite(twoMiss) && Number.isFinite(twoAtt) && Number.isFinite(twoMade)) twoMiss = Math.max(0, twoAtt - twoMade);
    if (!Number.isFinite(threeMiss) && Number.isFinite(threeAtt) && Number.isFinite(threeMade)) threeMiss = Math.max(0, threeAtt - threeMade);
    if (!Number.isFinite(ftMiss) && Number.isFinite(fta) && Number.isFinite(ftm)) ftMiss = Math.max(0, fta - ftm);

    [
      ["fga", fga], ["fgm", fgm], ["fg_miss", fgMiss],
      ["two_fg_att", twoAtt], ["two_fg_made", twoMade], ["two_fg_miss", twoMiss],
      ["three_fg_att", threeAtt], ["three_fg_made", threeMade], ["three_fg_miss", threeMiss],
      ["fta", fta], ["ftm", ftm], ["ft_miss", ftMiss],
    ].forEach(([suffix, value]) => {
      if (!Number.isFinite(row[`${prefix}_${suffix}`]) && Number.isFinite(value)) row[`${prefix}_${suffix}`] = roundNumber(value, 3);
    });

    if (Number.isFinite(poss) && Number.isFinite(totalPoss) && totalPoss > 0) {
      row[`${prefix}_freq`] = roundNumber(clampPercentValue((poss / totalPoss) * 100), 1);
    }
    if (!Number.isFinite(row[`${prefix}_ppp`]) && Number.isFinite(points) && Number.isFinite(poss) && poss > 0) {
      row[`${prefix}_ppp`] = roundNumber(points / poss, 3);
    }
    if (!Number.isFinite(row[`${prefix}_fg_pct`])) row[`${prefix}_fg_pct`] = percentIfPossible(fgm, fga);
    if (!Number.isFinite(row[`${prefix}_two_fg_pct`])) row[`${prefix}_two_fg_pct`] = percentIfPossible(twoMade, twoAtt);
    if (!Number.isFinite(row[`${prefix}_three_fg_pct`])) row[`${prefix}_three_fg_pct`] = percentIfPossible(threeMade, threeAtt);
    if (!Number.isFinite(row[`${prefix}_ft_pct`])) row[`${prefix}_ft_pct`] = percentIfPossible(ftm, fta);
    if (!Number.isFinite(row[`${prefix}_efg_pct`])) {
      const efgPct = zeroSafeEfgPct(fgm, threeMade, fga);
      if (efgPct !== "") row[`${prefix}_efg_pct`] = efgPct;
    }
    if (!Number.isFinite(row[`${prefix}_ftr`])) row[`${prefix}_ftr`] = ratioIfPossible(fta, fga);
    if (!Number.isFinite(row[`${prefix}_tov_pct`])) row[`${prefix}_tov_pct`] = percentOfPossessions(tov, poss);
    if (!Number.isFinite(row[`${prefix}_plus1_pct`])) row[`${prefix}_plus1_pct`] = percentOfPossessions(plus1, poss);
    const sourceTwoAtt = getD1RimSourceTwoAttempts(row, component.sourcePrefix);
    if (Number.isFinite(fga) && Number.isFinite(sourceTwoAtt) && sourceTwoAtt > 0) {
      row[`${prefix}_attempt_freq`] = roundNumber(clampPercentValue((fga / sourceTwoAtt) * 100), 1);
    }

    D1_RIM_SCORING_TOTAL_SUFFIXES.forEach((suffix) => {
      const value = firstFinite(row[`${prefix}_${suffix}`], Number.NaN);
      if (!Number.isFinite(value)) return;
      aggregateSums[suffix].total += value;
      aggregateSums[suffix].has = true;
    });
    Object.keys(weightedPercentSums).forEach((suffix) => {
      const value = firstFinite(row[`${prefix}_${suffix}`], Number.NaN);
      if (!Number.isFinite(value) || !Number.isFinite(poss) || poss <= 0) return;
      weightedPercentSums[suffix].total += ratioValueFromMaybePercent(value) * poss;
      weightedPercentSums[suffix].weight += poss;
    });
  });

  D1_RIM_SCORING_TOTAL_SUFFIXES.forEach((suffix) => {
    const column = `rim_scoring_${suffix}`;
    const sum = aggregateSums[suffix];
    if (!Number.isFinite(row[column]) && sum?.has) row[column] = roundNumber(sum.total, 3);
  });
  if (Number.isFinite(row.rim_scoring_poss) && Number.isFinite(totalPoss) && totalPoss > 0) {
    row.rim_scoring_freq = roundNumber(clampPercentValue((row.rim_scoring_poss / totalPoss) * 100), 1);
  }
  if (!Number.isFinite(row.rim_scoring_ppp) && Number.isFinite(row.rim_scoring_points) && Number.isFinite(row.rim_scoring_poss) && row.rim_scoring_poss > 0) {
    row.rim_scoring_ppp = roundNumber(row.rim_scoring_points / row.rim_scoring_poss, 3);
  }
  if (!Number.isFinite(row.rim_scoring_fg_pct)) row.rim_scoring_fg_pct = percentIfPossible(row.rim_scoring_fgm, row.rim_scoring_fga);
  if (!Number.isFinite(row.rim_scoring_two_fg_pct)) row.rim_scoring_two_fg_pct = percentIfPossible(row.rim_scoring_two_fg_made, row.rim_scoring_two_fg_att);
  if (!Number.isFinite(row.rim_scoring_three_fg_pct)) row.rim_scoring_three_fg_pct = percentIfPossible(row.rim_scoring_three_fg_made, row.rim_scoring_three_fg_att);
  if (!Number.isFinite(row.rim_scoring_ft_pct)) row.rim_scoring_ft_pct = percentIfPossible(row.rim_scoring_ftm, row.rim_scoring_fta);
  if (!Number.isFinite(row.rim_scoring_efg_pct)) {
    const efgPct = zeroSafeEfgPct(row.rim_scoring_fgm, row.rim_scoring_three_fg_made, row.rim_scoring_fga);
    if (efgPct !== "") row.rim_scoring_efg_pct = efgPct;
  }
  if (!Number.isFinite(row.rim_scoring_ftr)) row.rim_scoring_ftr = ratioIfPossible(row.rim_scoring_fta, row.rim_scoring_fga);
  if (!Number.isFinite(row.rim_scoring_tov_pct)) row.rim_scoring_tov_pct = percentOfPossessions(row.rim_scoring_tov, row.rim_scoring_poss);
  if (!Number.isFinite(row.rim_scoring_plus1_pct)) row.rim_scoring_plus1_pct = percentOfPossessions(row.rim_scoring_plus1, row.rim_scoring_poss);
  const sourceCreatedTwoAtt = D1_RIM_SCORING_COMPONENTS.reduce((total, component) => {
    const value = getD1RimSourceTwoAttempts(row, component.sourcePrefix);
    return Number.isFinite(value) ? total + value : total;
  }, 0);
  if (Number.isFinite(row.rim_scoring_fga) && sourceCreatedTwoAtt > 0) {
    row.rim_scoring_attempt_freq = roundNumber(clampPercentValue((row.rim_scoring_fga / sourceCreatedTwoAtt) * 100), 1);
  }
  Object.entries(weightedPercentSums).forEach(([suffix, bucket]) => {
    const column = `rim_scoring_${suffix}`;
    if (!Number.isFinite(row[column]) && bucket.weight > 0) row[column] = roundNumber((bucket.total / bucket.weight) * 100, 1);
  });

  populateD1RimAggregateFromComponents(row, "rim_scoring", D1_RIM_SCORING_COMPONENTS, totalPoss);
  populateD1RimAggregateFromComponents(row, "rim_true_created", D1_RIM_TRUE_CREATED_COMPONENTS, totalPoss);
  populateD1CountDisplayModes(row, [
    ...D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_scoring_${suffix}`),
    ...D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `rim_true_created_${suffix}`),
    ...D1_RIM_SCORING_COMPONENTS.flatMap((component) => (
      D1_RIM_SCORING_PER_MODE_SUFFIXES.map((suffix) => `${component.prefix}_${suffix}`)
    )),
  ]);
}

function populateD1RimAggregateFromComponents(row, targetPrefix, components, totalPoss) {
  if (!row || !targetPrefix || !components?.length) return;
  const totals = Object.fromEntries(D1_RIM_SCORING_TOTAL_SUFFIXES.map((suffix) => [suffix, { total: 0, has: false }]));
  const weighted = Object.fromEntries(["sf_pct", "score_pct", "plus1_pct"].map((suffix) => [suffix, { total: 0, weight: 0 }]));
  components.forEach((component) => {
    const prefix = component.prefix;
    const poss = firstFinite(row[`${prefix}_poss`], Number.NaN);
    D1_RIM_SCORING_TOTAL_SUFFIXES.forEach((suffix) => {
      const value = firstFinite(row[`${prefix}_${suffix}`], Number.NaN);
      if (!Number.isFinite(value)) return;
      totals[suffix].total += value;
      totals[suffix].has = true;
    });
    Object.keys(weighted).forEach((suffix) => {
      const value = firstFinite(row[`${prefix}_${suffix}`], Number.NaN);
      if (!Number.isFinite(value) || !Number.isFinite(poss) || poss <= 0) return;
      weighted[suffix].total += ratioValueFromMaybePercent(value) * poss;
      weighted[suffix].weight += poss;
    });
  });
  D1_RIM_SCORING_TOTAL_SUFFIXES.forEach((suffix) => {
    const sum = totals[suffix];
    if (sum?.has) row[`${targetPrefix}_${suffix}`] = roundNumber(sum.total, 3);
  });
  const poss = firstFinite(row[`${targetPrefix}_poss`], Number.NaN);
  const fga = firstFinite(row[`${targetPrefix}_fga`], Number.NaN);
  const fgm = firstFinite(row[`${targetPrefix}_fgm`], Number.NaN);
  const fta = firstFinite(row[`${targetPrefix}_fta`], Number.NaN);
  const tov = firstFinite(row[`${targetPrefix}_tov`], Number.NaN);
  const plus1 = firstFinite(row[`${targetPrefix}_plus1`], Number.NaN);
  const points = firstFinite(row[`${targetPrefix}_points`], Number.NaN);
  if (Number.isFinite(poss) && Number.isFinite(totalPoss) && totalPoss > 0) {
    row[`${targetPrefix}_freq`] = roundNumber(clampPercentValue((poss / totalPoss) * 100), 1);
  }
  if (Number.isFinite(points) && Number.isFinite(poss) && poss > 0) {
    row[`${targetPrefix}_ppp`] = roundNumber(points / poss, 3);
  }
  const fgPct = percentIfPossible(fgm, fga);
  if (fgPct !== "") row[`${targetPrefix}_fg_pct`] = fgPct;
  const ftr = ratioIfPossible(fta, fga);
  if (ftr !== "") row[`${targetPrefix}_ftr`] = ftr;
  const tovPct = percentOfPossessions(tov, poss);
  if (tovPct !== "") row[`${targetPrefix}_tov_pct`] = tovPct;
  const plus1Pct = percentOfPossessions(plus1, poss);
  if (plus1Pct !== "") row[`${targetPrefix}_plus1_pct`] = plus1Pct;
  Object.entries(weighted).forEach(([suffix, bucket]) => {
    if (bucket.weight > 0) row[`${targetPrefix}_${suffix}`] = roundNumber((bucket.total / bucket.weight) * 100, 1);
  });
  const sourceCreatedTwoAtt = components.reduce((total, component) => {
    const value = getD1RimSourceTwoAttempts(row, component.sourcePrefix);
    return Number.isFinite(value) ? total + value : total;
  }, 0);
  if (Number.isFinite(fga) && sourceCreatedTwoAtt > 0) {
    row[`${targetPrefix}_attempt_freq`] = roundNumber(clampPercentValue((fga / sourceCreatedTwoAtt) * 100), 1);
  }
}

function getD1RimSourceTwoAttempts(row, sourcePrefix) {
  if (!row || !sourcePrefix) return Number.NaN;
  const made = firstFinite(row[`${sourcePrefix}_two_fg_made`], row[`${sourcePrefix}_two_pm`], Number.NaN);
  const miss = firstFinite(row[`${sourcePrefix}_two_fg_miss`], row[`${sourcePrefix}_two_p_miss`], Number.NaN);
  if (Number.isFinite(made) && Number.isFinite(miss)) return Math.max(0, made + miss);
  const attempts = firstFinite(row[`${sourcePrefix}_two_pa`], row[`${sourcePrefix}_two_fg_att`], Number.NaN);
  if (!Number.isFinite(attempts)) return Number.NaN;
  const poss = firstFinite(row[`${sourcePrefix}_poss`], Number.NaN);
  if (Number.isFinite(poss) && poss > 0 && attempts > poss * 5) return Number.NaN;
  return Math.max(0, attempts);
}

function normalizeD1RunnerMetrics(row) {
  if (!row || row._careerAggregate) return;
  if (Number.isFinite(row.runner_freq)) row.runner_freq = roundNumber(clampPercentValue(row.runner_freq), 1);
  if (!Number.isFinite(row.runner_fta) && Number.isFinite(row.runner_fg_att)) {
    const runnerFtr = ratioValueFromMaybePercent(firstFinite(row.runner_ftr, Number.NaN));
    if (Number.isFinite(runnerFtr)) row.runner_fta = roundNumber(row.runner_fg_att * runnerFtr, 1);
  }
  populateD1CountDisplayModes(row, ["runner_fg_att", "runner_fta", "runner_two_fg_att"]);
}

function normalizeFrequencyPercentValue(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return Number.NaN;
  if (numeric <= 1) return numeric * 100;
  if (numeric <= 100) return numeric;
  return Number.NaN;
}

function clampPercentValue(value) {
  const numeric = normalizeFrequencyPercentValue(value);
  if (!Number.isFinite(numeric)) return Number.NaN;
  return Math.max(0, Math.min(100, numeric));
}

function normalizeD1FrequencyColumns(row) {
  if (!row || row._careerAggregate) return;
  Object.keys(row).forEach((column) => {
    if (!/_freq$/i.test(column)) return;
    if (typeof row[column] !== "number" || !Number.isFinite(row[column])) return;
    const numeric = Number(row[column]);
    const normalized = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
    row[column] = roundNumber(Math.max(0, Math.min(100, normalized)), 1);
  });
}

function normalizeJucoDivision(value) {
  const text = getStringValue(value).toUpperCase().trim();
  if (!text) return "";
  if (/\bDIII\b|\bNJCAA\s*DIII\b|\bIII\b|\bD3\b|\bDIVISION\s*III\b/.test(text)) return "III";
  if (/\bDII\b|\bNJCAA\s*DII\b|\bII\b|\bD2\b|\bDIVISION\s*II\b/.test(text)) return "II";
  if (/\bDI\b|\bNJCAA\s*DI\b|\bI\b|\bD1\b|\bDIVISION\s*I\b/.test(text)) return "I";
  return getStringValue(value).trim();
}

function populateComplementaryRimMidProfile(row) {
  const twoMade = firstFinite(row["2pm"], row.two_pm, row.two_p_made, Number.NaN);
  const twoAttempts = firstFinite(row["2pa"], row.two_pa, row.two_p_att, row["2pa_total"], Number.NaN);
  if (!Number.isFinite(twoAttempts) || twoAttempts < 0) return;

  let rimMade = firstFinite(row.rim_made, Number.NaN);
  let rimAttempts = firstFinite(row.rim_att, Number.NaN);
  let midMade = firstFinite(row.mid_made, Number.NaN);
  let midAttempts = firstFinite(row.mid_att, Number.NaN);
  const hasRim = Number.isFinite(rimMade) || Number.isFinite(rimAttempts);
  const hasMid = Number.isFinite(midMade) || Number.isFinite(midAttempts);
  if (!hasRim && !hasMid) return;

  if (hasRim && !Number.isFinite(rimAttempts)) rimAttempts = 0;
  if (hasRim && !Number.isFinite(rimMade)) rimMade = 0;
  if (hasMid && !Number.isFinite(midAttempts)) midAttempts = 0;
  if (hasMid && !Number.isFinite(midMade)) midMade = 0;

  if (hasRim && !hasMid) {
    midAttempts = Math.max(0, twoAttempts - rimAttempts);
    midMade = Number.isFinite(twoMade) ? Math.max(0, Math.min(midAttempts, twoMade - rimMade)) : Number.NaN;
  } else if (hasMid && !hasRim) {
    rimAttempts = Math.max(0, twoAttempts - midAttempts);
    rimMade = Number.isFinite(twoMade) ? Math.max(0, Math.min(rimAttempts, twoMade - midMade)) : Number.NaN;
  }

  if (Number.isFinite(rimAttempts)) row.rim_att = roundNumber(rimAttempts, 3);
  if (Number.isFinite(rimMade)) row.rim_made = roundNumber(Math.max(0, Math.min(rimMade, rimAttempts)), 3);
  if (Number.isFinite(midAttempts)) row.mid_att = roundNumber(midAttempts, 3);
  if (Number.isFinite(midMade)) row.mid_made = roundNumber(Math.max(0, Math.min(midMade, midAttempts)), 3);
  if (!Number.isFinite(row.rim_pct) && Number.isFinite(row.rim_made) && Number.isFinite(row.rim_att)) row.rim_pct = zeroSafePercent(row.rim_made, row.rim_att);
  if (!Number.isFinite(row.mid_pct) && Number.isFinite(row.mid_made) && Number.isFinite(row.mid_att)) row.mid_pct = zeroSafePercent(row.mid_made, row.mid_att);
}

function populateDerivedShooting(row, config) {
  const blankAttemptsMeanZero = !!config?.blankAttemptsMeanZero;
  let twoPm = firstFinite(...config.twoMadeKeys.map((key) => row[key]), Number.NaN);
  let twoPa = firstFinite(...config.twoAttKeys.map((key) => row[key]), Number.NaN);
  let threePm = firstFinite(...config.threeMadeKeys.map((key) => row[key]), Number.NaN);
  let threePa = firstFinite(...config.threeAttKeys.map((key) => row[key]), Number.NaN);
  let fga = firstFinite(row.fga, row.fga_75, addIfFinite(twoPa, threePa), Number.NaN);

  let threePrRatio = ratioValueFromMaybePercent(firstFinite(row.three_pr, row.tpa_rate, Number.NaN));
  if (!Number.isFinite(threePrRatio)) threePrRatio = firstFinite(ratioIfPossible(row.fg3a_75, row.fga_75), Number.NaN);
  if (!Number.isFinite(threePa) && Number.isFinite(fga) && Number.isFinite(threePrRatio)) {
    threePa = roundNumber(fga * threePrRatio, 3);
  }
  if (!Number.isFinite(twoPa) && Number.isFinite(fga) && Number.isFinite(threePa)) {
    twoPa = roundNumber(Math.max(0, fga - threePa), 3);
  }

  const twoPctRatio = ratioValueFromMaybePercent(firstFinite(...config.twoPctKeys.map((key) => row[key]), row.fg2pct, Number.NaN));
  const threePctRatio = ratioValueFromMaybePercent(firstFinite(...config.threePctKeys.map((key) => row[key]), row.fg3pct, Number.NaN));
  if (!Number.isFinite(threePm) && Number.isFinite(threePa) && Number.isFinite(threePctRatio)) {
    threePm = roundNumber(threePa * threePctRatio, 3);
  }
  if (!Number.isFinite(threePm) && Number.isFinite(threePa) && threePa <= 0) {
    threePm = 0;
  }

  const fgPctRatio = ratioValueFromMaybePercent(firstFinite(row.fg_pct, row.fgpct, Number.NaN));
  let fgm = firstFinite(row.fgm, addIfFinite(twoPm, threePm), Number.NaN);
  if (!Number.isFinite(fgm) && Number.isFinite(fga) && Number.isFinite(fgPctRatio)) {
    fgm = roundNumber(fga * fgPctRatio, 3);
  }
  if (!Number.isFinite(fgm) && Number.isFinite(fga) && fga <= 0) {
    fgm = 0;
  }
  if (!Number.isFinite(twoPm) && Number.isFinite(fgm) && Number.isFinite(threePm)) {
    twoPm = roundNumber(Math.max(0, fgm - threePm), 3);
  }
  if (!Number.isFinite(twoPm) && Number.isFinite(twoPa) && Number.isFinite(twoPctRatio)) {
    twoPm = roundNumber(twoPa * twoPctRatio, 3);
  }
  if (!Number.isFinite(twoPm) && Number.isFinite(twoPa) && twoPa <= 0) {
    twoPm = 0;
  }
  if (!Number.isFinite(threePm) && Number.isFinite(fgm) && Number.isFinite(twoPm)) {
    threePm = roundNumber(Math.max(0, fgm - twoPm), 3);
  }
  if (!Number.isFinite(fga) && Number.isFinite(twoPa) && Number.isFinite(threePa)) {
    fga = roundNumber(twoPa + threePa, 3);
  }

  let ftrRatio = ratioValueFromMaybePercent(firstFinite(row.ftr, row.fta_rate, Number.NaN));
  if (!Number.isFinite(ftrRatio)) {
    ftrRatio = firstFinite(ratioIfPossible(row.fta, row.fga), ratioIfPossible(row.fta_75, row.fga_75), Number.NaN);
  }
  if (!Number.isFinite(ftrRatio) && Number.isFinite(fga) && fga <= 0) {
    ftrRatio = 0;
  }
  if ((row.ftr == null || row.ftr === "") && Number.isFinite(ftrRatio)) row.ftr = roundNumber(ftrRatio, 3);
  if ((row.three_pr == null || row.three_pr === "") && Number.isFinite(threePrRatio)) row.three_pr = roundNumber(threePrRatio, 3);

  if (!Number.isFinite(row.fta) && Number.isFinite(fga) && Number.isFinite(ftrRatio) && fga >= 0) {
    row.fta = roundNumber(fga * ftrRatio, 3);
  }
  if (!Number.isFinite(row.fta) && Number.isFinite(row.fta_75)) {
    row.fta = roundNumber(row.fta_75, 3);
  }
  const ftPctRatio = ratioValueFromMaybePercent(firstFinite(row.ft_pct, row.ftpct, Number.NaN));
  if (!Number.isFinite(row.ftm) && Number.isFinite(row.fta) && Number.isFinite(ftPctRatio) && row.fta >= 0) {
    row.ftm = roundNumber(row.fta * ftPctRatio, 3);
  }
  if (!Number.isFinite(row.ftm) && Number.isFinite(row.fta) && row.fta <= 0) {
    row.ftm = 0;
  }

  let points = firstFinite(row.pts, Number.NaN);
  const canInferFreeThrowsFromPoints = Number.isFinite(row.fta) || Number.isFinite(ftPctRatio);
  if (!Number.isFinite(row.ftm) && canInferFreeThrowsFromPoints && Number.isFinite(points) && Number.isFinite(twoPm) && Number.isFinite(threePm)) {
    row.ftm = roundNumber(Math.max(0, points - (2 * twoPm) - (3 * threePm)), 3);
  }
  if (!Number.isFinite(row.fta) && blankAttemptsMeanZero && Number.isFinite(row.ftm) && row.ftm <= 0 && !Number.isFinite(ftPctRatio)) {
    row.fta = 0;
  }
  if (blankAttemptsMeanZero) {
    if (!Number.isFinite(threePa) && !Number.isFinite(threePctRatio) && !Number.isFinite(threePm) && Number.isFinite(fga)) threePa = 0;
    if (!Number.isFinite(threePm) && Number.isFinite(threePa) && threePa <= 0) threePm = 0;
    if (!Number.isFinite(twoPa) && !Number.isFinite(twoPctRatio) && Number.isFinite(fga) && Number.isFinite(threePa)) {
      twoPa = roundNumber(Math.max(0, fga - threePa), 3);
    }
    if (!Number.isFinite(twoPm) && Number.isFinite(twoPa) && twoPa <= 0) twoPm = 0;
    if (!Number.isFinite(row.fta) && !Number.isFinite(ftPctRatio) && !Number.isFinite(row.ftm) && Number.isFinite(fga)) row.fta = 0;
    if (!Number.isFinite(row.ftm) && Number.isFinite(row.fta) && row.fta <= 0) row.ftm = 0;
  }

  points = firstFinite(row.pts, weightedPointTotal(twoPm, threePm, row.ftm), Number.NaN);
  if (Number.isFinite(points) && Math.abs(points) < 0.001) {
    if (!Number.isFinite(threePm) && Number.isFinite(threePa)) threePm = 0;
    if (!Number.isFinite(twoPm) && Number.isFinite(twoPa)) twoPm = 0;
    if (!Number.isFinite(fgm) && Number.isFinite(fga)) fgm = 0;
    if (!Number.isFinite(row.ftm) && Number.isFinite(row.fta)) row.ftm = 0;
    if (!Number.isFinite(row.fta) && blankAttemptsMeanZero) row.fta = 0;
  }

  fgm = firstFinite(row.fgm, addIfFinite(twoPm, threePm), fgm, Number.NaN);
  if (Number.isFinite(threePm)) {
    config.threeMadeKeys.forEach((key) => {
      if (row[key] == null || row[key] === "") row[key] = threePm;
    });
  }
  if (Number.isFinite(threePa)) {
    config.threeAttKeys.forEach((key) => {
      if (row[key] == null || row[key] === "") row[key] = threePa;
    });
  }
  if (Number.isFinite(twoPm)) {
    row.two_pm = twoPm;
    config.twoMadeKeys.forEach((key) => {
      if (row[key] == null || row[key] === "") row[key] = twoPm;
    });
  }
  if (Number.isFinite(twoPa)) {
    row.two_pa = twoPa;
    config.twoAttKeys.forEach((key) => {
      if (row[key] == null || row[key] === "") row[key] = twoPa;
    });
  }
  if (Number.isFinite(fgm) && !Number.isFinite(row.fgm)) row.fgm = fgm;
  if (Number.isFinite(fga) && !Number.isFinite(row.fga)) row.fga = fga;

  const fgPct = zeroSafePercent(fgm, fga);
  const twoPct = zeroSafePercent(twoPm, twoPa);
  const threePct = zeroSafePercent(threePm, threePa);
  const efgPct = zeroSafeEfgPct(fgm, threePm, fga);
  const ftPct = zeroSafePercent(row.ftm, row.fta);
  const tsPct = zeroSafeTsPct(points, fga, row.fta);
  if ((row.fg_pct == null || row.fg_pct === "") && fgPct !== "") row.fg_pct = fgPct;
  config.twoPctKeys.forEach((key) => {
    if ((row[key] == null || row[key] === "") && twoPct !== "") row[key] = twoPct;
  });
  config.threePctKeys.forEach((key) => {
    if ((row[key] == null || row[key] === "") && threePct !== "") row[key] = threePct;
  });
  config.efgKeys.forEach((key) => {
    if ((row[key] == null || row[key] === "") && efgPct !== "") row[key] = efgPct;
  });
  if ((row.ft_pct == null || row.ft_pct === "") && ftPct !== "") row.ft_pct = ftPct;
  if ((row.pts == null || row.pts === "") && Number.isFinite(points)) row.pts = points;
  if ((row.ts_pct == null || row.ts_pct === "") && tsPct !== "") row.ts_pct = tsPct;
}

function populateDefensiveRateStats(row) {
  const minutes = getMinutesValue(row);
  const teamMinutes = getTeamMinutesBasis(row);
  if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(teamMinutes) || teamMinutes <= 0) return;

  const stealPct = firstFinite(row.stl_pct, row.stlpct, Number.NaN);
  if (!Number.isFinite(stealPct) && Number.isFinite(row.stl) && defensiveRateInputsLookLikeTotals(row, row.opp_poss, 40)) {
    const computed = roundNumber((row.stl * ((teamMinutes / 5) / minutes) / row.opp_poss) * 100, 1);
    if (Number.isFinite(computed) && computed <= 8) {
      row.stl_pct = computed;
      if (!Number.isFinite(row.stlpct)) row.stlpct = computed;
    }
  }

  const blockPct = firstFinite(row.blk_pct, row.blkpct, Number.NaN);
  const defendedTwos = subtractIfFinite(row.opp_fga, row.opp_3pa);
  if (!Number.isFinite(blockPct) && Number.isFinite(row.blk) && defensiveRateInputsLookLikeTotals(row, defendedTwos, 18)) {
    const computed = roundNumber((row.blk * ((teamMinutes / 5) / minutes) / defendedTwos) * 100, 1);
    if (Number.isFinite(computed) && computed <= 15) {
      row.blk_pct = computed;
      if (!Number.isFinite(row.blkpct)) row.blkpct = computed;
    }
  }
}

function defensiveRateInputsLookLikeTotals(row, denominator, perGameFloor) {
  if (!Number.isFinite(denominator) || denominator <= 0) return false;
  const explicitTeamMinutes = firstFinite(row?.team_minutes, Number.NaN);
  if (Number.isFinite(explicitTeamMinutes) && explicitTeamMinutes > 0) return true;
  const gp = getGamesValue(row);
  if (!Number.isFinite(gp) || gp <= 1) return denominator >= perGameFloor;
  return denominator >= (gp * perGameFloor);
}

function getTeamMinutesBasis(row) {
  const teamMinutes = firstFinite(row.team_minutes, Number.NaN);
  if (Number.isFinite(teamMinutes) && teamMinutes > 0) return teamMinutes;
  const gp = getGamesValue(row);
  if (Number.isFinite(gp) && gp > 0) return gp * 200;
  return Number.NaN;
}

function subtractIfFinite(left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) return "";
  return left - right;
}

function addIfFinite(left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) return "";
  return left + right;
}

function percentIfPossible(made, att) {
  if (!Number.isFinite(made) || !Number.isFinite(att) || att <= 0) return "";
  return roundNumber((made / att) * 100, 1);
}

function zeroSafePercent(made, att) {
  if (!Number.isFinite(att)) return "";
  if (att <= 0) return 0;
  if (!Number.isFinite(made)) return "";
  return roundNumber((made / att) * 100, 1);
}

function zeroSafeEfgPct(fgm, threePm, fga) {
  if (!Number.isFinite(fga)) return "";
  if (fga <= 0) return 0;
  if (!Number.isFinite(fgm)) return "";
  const threes = Number.isFinite(threePm) ? threePm : 0;
  return roundNumber(((fgm + (0.5 * threes)) / fga) * 100, 1);
}

function zeroSafeTsPct(points, fga, fta) {
  if (!Number.isFinite(fga) || !Number.isFinite(fta)) return "";
  const denom = 2 * (fga + (0.44 * fta));
  if (denom <= 0) return 0;
  if (!Number.isFinite(points)) return "";
  return roundNumber((points / denom) * 100, 1);
}

function weightedPointTotal(twoPm, threePm, ftm) {
  if (![twoPm, threePm, ftm].some((value) => Number.isFinite(value))) return Number.NaN;
  return (Number.isFinite(twoPm) ? (twoPm * 2) : 0)
    + (Number.isFinite(threePm) ? (threePm * 3) : 0)
    + (Number.isFinite(ftm) ? ftm : 0);
}

function populatePrefixedTsPct(row, prefix, config = {}) {
  if (!row || !prefix) return;
  const tsColumn = `${prefix}_${config.tsSuffix || "ts_pct"}`;
  if (Number.isFinite(row[tsColumn])) return;
  const poss = firstFinite(row?.[`${prefix}_${config.possSuffix || "poss"}`], Number.NaN);
  const ppp = firstFinite(row?.[`${prefix}_${config.pppSuffix || "ppp"}`], Number.NaN);
  const fga = firstFinite(row?.[`${prefix}_${config.fgaSuffix || "fg_att"}`], Number.NaN);
  const fta = firstFinite(row?.[`${prefix}_${config.ftaSuffix || "fta"}`], Number.NaN);
  if (![poss, ppp, fga, fta].every((value) => Number.isFinite(value))) return;
  const tsPct = zeroSafeTsPct(ppp * poss, fga, fta);
  if (tsPct !== "") row[tsColumn] = tsPct;
}

function percentOfPossessions(value, poss) {
  if (!Number.isFinite(value) || !Number.isFinite(poss) || poss <= 0) return "";
  return roundNumber((value / poss) * 100, 1);
}

function ratioIfPossible(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return "";
  return roundNumber(numerator / denominator, 3);
}

function ratioValueFromMaybePercent(value) {
  if (!Number.isFinite(value)) return Number.NaN;
  return Math.abs(value) <= 1.5 ? value : (value / 100);
}

function per40Value(value, minutes) {
  if (!Number.isFinite(value) || !Number.isFinite(minutes) || minutes <= 0) return "";
  return roundNumber((value / minutes) * 40, 1);
}

function d2Per100Value(value, row) {
  if (!Number.isFinite(value) || !Number.isFinite(row.min) || row.min <= 0) return "";
  if (!Number.isFinite(row.team_minutes) || !Number.isFinite(row.team_poss) || row.team_poss <= 0) return "";
  return roundNumber((value / row.min) * ((row.team_minutes / 5) / row.team_poss) * 100, 1);
}

function possPer100Value(value, row) {
  if (!Number.isFinite(value)) return "";
  const poss = estimatedPossessions(row);
  if (!Number.isFinite(poss) || poss <= 0) return "";
  return roundNumber((value / poss) * 100, 1);
}

function estimatedPossessions(row) {
  if (Number.isFinite(row.total_poss)) return row.total_poss;
  const fga = firstFinite(row.fga, Number.isFinite(row.two_pa) && Number.isFinite(row.three_pa) ? row.two_pa + row.three_pa : Number.NaN);
  const fta = firstFinite(row.fta, Number.NaN);
  const tov = firstFinite(row.tov, Number.NaN);
  if (!Number.isFinite(fga) || !Number.isFinite(fta) || !Number.isFinite(tov)) return Number.NaN;
  return fga + (0.44 * fta) + tov;
}

function ortgEstimate(row) {
  const poss = estimatedPossessions(row);
  if (!Number.isFinite(poss) || poss <= 0 || !Number.isFinite(row.pts)) return "";
  return roundNumber((row.pts / poss) * 100, 1);
}

function applyCalculatedRatings(rows, datasetId) {
  const seasonBuckets = new Map();
  rows.forEach((row) => {
    if (!Number.isFinite(row.ortg)) {
      const estimated = ortgEstimate(row);
      if (Number.isFinite(estimated)) row.ortg = estimated;
    }
    const ortg = firstFinite(row.ortg, Number.NaN);
    if (!Number.isFinite(ortg)) return;
    const season = getStringValue(row.season) || datasetId || "all";
    const weight = Math.max(getMinutesValue(row), 1);
    if (!seasonBuckets.has(season)) seasonBuckets.set(season, { total: 0, weight: 0 });
    const bucket = seasonBuckets.get(season);
    bucket.total += ortg * weight;
    bucket.weight += weight;
  });

  rows.forEach((row) => {
    const season = getStringValue(row.season) || datasetId || "all";
    const bucket = seasonBuckets.get(season);
    const avgEff = bucket?.weight ? bucket.total / bucket.weight : 104.9;
    const nationalAvgEff = 104.9;
    const usageValue = firstFinite(row.usg_pct, row.usg, Number.NaN);
    const usage = Number.isFinite(usageValue) ? (Math.abs(usageValue) <= 1.5 ? usageValue * 100 : usageValue) : Number.NaN;
    const ortg = firstFinite(row.ortg, Number.NaN);
    const oppDe = avgEff;
    const mpg = firstFinite(row.mpg, Number.isFinite(row.min) && Number.isFinite(row.gp) && row.gp > 0 ? row.min / row.gp : Number.NaN);
    const minuteSharePct = firstFinite(
      Number.isFinite(row.min_per) ? (Math.abs(row.min_per) <= 1.5 ? row.min_per * 100 : row.min_per) : Number.NaN,
      Number.isFinite(mpg) ? (mpg / 40) * 100 : Number.NaN,
      Number.NaN
    );
    const minutePct = firstFinite(
      Number.isFinite(row.min_per) ? (Math.abs(row.min_per) <= 1.5 ? row.min_per : row.min_per / 100) : Number.NaN,
      Number.isFinite(mpg) ? mpg / 40 : Number.NaN,
      Number.NaN
    );

    if (datasetId !== "d1" && !Number.isFinite(row.adjoe) && Number.isFinite(ortg) && Number.isFinite(usage) && Number.isFinite(oppDe) && oppDe > 0) {
      row.adjoe = roundNumber(calculateAdjoe(ortg, avgEff, oppDe, usage), 1);
    }
    if (datasetId !== "d1" && !Number.isFinite(row.adrtg) && Number.isFinite(row.drtg)) {
      row.adrtg = roundNumber(row.drtg, 1);
    }
    if (datasetId !== "d1" && !Number.isFinite(row.porpag) && Number.isFinite(usage) && Number.isFinite(minutePct)) {
      const adjoe = firstFinite(row.adjoe, Number.NaN);
      if (Number.isFinite(adjoe)) {
        row.porpag = roundNumber(((adjoe + (nationalAvgEff - avgEff) - 88) * minutePct * 69.4) / 500, 3);
      }
    }
    if (datasetId !== "nba" && !Number.isFinite(row.dporpag)) {
      const adrtg = firstFinite(row.adrtg, row.drtg, Number.NaN);
      if (Number.isFinite(adrtg) && Number.isFinite(minuteSharePct)) {
        row.dporpag = roundNumber(calculateDporpag(adrtg, minuteSharePct, nationalAvgEff), 3);
      }
    }
  });
}

function calculateAdjoe(ortg, avgEff, oppDe, usage) {
  const oAdj = avgEff / oppDe;
  const uFactor = (usage * -0.144) + 13.023;
  if (!Number.isFinite(uFactor) || uFactor === 0) return Number.NaN;
  const altZscore = (ortg - avgEff) / uFactor;
  const xOrtg = avgEff + (altZscore * 10.143);
  const usageAdjustment = usage > 20 ? ((usage - 20) * 1.25) : ((usage - 20) * 1.5);
  return (xOrtg + usageAdjustment) * oAdj;
}

function calculateDporpag(adrtg, minuteSharePct, baselineEff = 104.9) {
  const minutePct = Math.abs(minuteSharePct) <= 1.5 ? minuteSharePct * 100 : minuteSharePct;
  const effGap = baselineEff - adrtg;
  return 0.281674445 + (0.031016033 * minutePct) + (0.006464185 * effGap) + (0.001213477 * minutePct * effGap);
}

function firstFinite(...values) {
  return values.find((value) => Number.isFinite(value));
}

function firstPositiveFinite(...values) {
  return values.find((value) => Number.isFinite(value) && value > 0);
}

function applyPerNormalization(rows, datasetId = "") {
  const buckets = new Map();
  const minuteThreshold = getDatasetMinuteThreshold(DATASETS[datasetId] || {});
  rows.forEach((row) => {
    if (datasetId === "d1" && !row._careerAggregate && Number.isFinite(row.per)) return;
    const base = perBaseValue(row);
    const minutes = getMinutesValue(row);
    if (!Number.isFinite(base) || !Number.isFinite(minutes) || minutes <= 0) return;
    row._perBase = base;
    const season = getStringValue(row.season) || "all";
    if (!buckets.has(season)) {
      buckets.set(season, {
        totalCount: 0,
        totalSum: 0,
        qualifiedCount: 0,
        qualifiedSum: 0,
      });
    }
    const bucket = buckets.get(season);
    bucket.totalCount += 1;
    bucket.totalSum += base;
    if (minutes >= minuteThreshold) {
      bucket.qualifiedCount += 1;
      bucket.qualifiedSum += base;
    }
  });
  rows.forEach((row) => {
    if (datasetId === "d1" && !row._careerAggregate && Number.isFinite(row.per)) return;
    if (!Number.isFinite(row._perBase)) return;
    const season = getStringValue(row.season) || "all";
    const bucket = buckets.get(season);
    const avg = bucket
      ? (bucket.qualifiedCount >= 10
        ? bucket.qualifiedSum / bucket.qualifiedCount
        : (bucket.totalCount ? bucket.totalSum / bucket.totalCount : 0))
      : 0;
    row.per = avg ? roundNumber((row._perBase / avg) * 15, 1) : "";
    delete row._perBase;
  });
  rows.forEach((row) => {
    populateAstStlDerived(row, { overwrite: true, perGameDigits: datasetId === "grassroots" ? 1 : 2 });
  });
}

function perBaseValue(row) {
  const minutes = getMinutesValue(row);
  const fic = calculateFic(row);
  if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(fic)) return Number.NaN;
  return (fic / minutes) * 40;
}

function calculatePpr(row) {
  const minutes = getMinutesValue(row);
  const ast = firstFinite(row.ast, 0);
  const tov = firstFinite(row.tov, resolveTurnoversValue(row), 0);
  if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(ast) || !Number.isFinite(tov)) return "";
  return roundNumber((((ast * (2 / 3)) - tov) * 40) / minutes, 1);
}

function calculateFic(row) {
  const pts = firstFinite(row.pts, Number.NaN);
  const orb = firstFinite(row.orb, 0);
  const drb = firstFinite(row.drb, Number.isFinite(row.trb) ? Math.max(0, row.trb - orb) : 0);
  const ast = firstFinite(row.ast, 0);
  const stl = firstFinite(row.stl, 0);
  const blk = firstFinite(row.blk, 0);
  const fga = firstFinite(row.fga, Number.NaN);
  const fta = firstFinite(row.fta, Number.NaN);
  const tov = firstFinite(row.tov, resolveTurnoversValue(row), 0);
  const pf = firstFinite(row.pf, 0);
  if (![pts, ast, stl, blk, fga, fta, tov].every((value) => Number.isFinite(value))) return "";
  return roundNumber(pts + orb + (0.75 * drb) + ast + stl + blk - (0.75 * fga) - (0.375 * fta) - tov - (0.5 * pf), 1);
}

function resolveTurnoversValue(row) {
  const ast = firstFinite(row.ast, Number.NaN);
  const astTo = firstFinite(row.ast_to, Number.NaN);
  if (Number.isFinite(ast) && Number.isFinite(astTo) && astTo > 0) {
    return ast / astTo;
  }
  const poss = firstFinite(row.total_poss, estimatedPossessions(row), Number.NaN);
  const tovPct = firstFinite(row.tov_pct_adv, row.tov_pct, row.topct, Number.NaN);
  if (Number.isFinite(poss) && Number.isFinite(tovPct)) {
    const pct = Math.abs(tovPct) <= 1.5 ? tovPct : tovPct / 100;
    return poss * pct;
  }
  return Number.NaN;
}

function parseHeightToInches(value) {
  if (!value) return Number.NaN;
  const match = String(value).trim().match(/^(\d+)\s*[-']\s*(\d+)$/);
  if (!match) return Number.NaN;
  return Number(match[1]) * 12 + Number(match[2]);
}

function perGameValue(value, gp) {
  if (!Number.isFinite(value) || !Number.isFinite(gp) || gp <= 0) return "";
  return roundNumber(value / gp, 2);
}

function populateGeneralStatDisplayModes(row, datasetId = "") {
  if (!row || typeof row !== "object") return;
  const aliases = {
    pts: ["pts", "points"],
    trb: ["trb", "reb", "treb"],
    orb: ["orb", "oreb"],
    drb: ["drb", "dreb"],
    ast: ["ast", "assists"],
    stl: ["stl", "steals"],
    blk: ["blk", "blocks"],
    tov: ["tov", "to", "turnovers"],
    pf: ["pf", "fouls"],
    stocks: ["stocks"],
  };
  Object.entries(aliases).forEach(([target, sourceKeys]) => {
    if (Number.isFinite(row[target])) return;
    const value = firstFinite(...sourceKeys.map((key) => row[key]), Number.NaN);
    if (Number.isFinite(value)) row[target] = value;
  });
  if (!Number.isFinite(row.stocks) && (Number.isFinite(row.stl) || Number.isFinite(row.blk))) {
    row.stocks = firstFinite(row.stl, 0) + firstFinite(row.blk, 0);
  }
  const gp = firstFinite(row.gp, row.g, row.games, Number.NaN);
  const minutes = firstFinite(row.min, row.mp, Number.isFinite(gp) && Number.isFinite(row.mpg) ? gp * row.mpg : Number.NaN, Number.NaN);
  const totalPoss = firstFinite(row.total_poss, estimatedPossessions(row), Number.NaN);
  const sourceIsPerGame = datasetId === "d1";
  GENERAL_TOTAL_COLUMNS.forEach((column) => {
    const value = firstFinite(row[column], Number.NaN);
    if (sourceIsPerGame) {
      if (Number.isFinite(value) && !Number.isFinite(row[`${column}_pg`])) row[`${column}_pg`] = roundNumber(value, 2);
      if (Number.isFinite(value) && Number.isFinite(row.mpg) && row.mpg > 0 && !Number.isFinite(row[`${column}_per40`])) {
        row[`${column}_per40`] = roundNumber((value / row.mpg) * 40, 2);
      }
      if (Number.isFinite(value) && Number.isFinite(gp) && gp > 0 && Number.isFinite(totalPoss) && totalPoss > 0 && !Number.isFinite(row[`${column}_per100`])) {
        row[`${column}_per100`] = roundNumber(((value * gp) / totalPoss) * 100, 2);
      }
      return;
    }
    const total = value;
    const perGame = perGameValue(total, gp);
    const per40 = per40Value(total, minutes);
    if (perGame !== "" && !Number.isFinite(row[`${column}_pg`])) row[`${column}_pg`] = perGame;
    if (per40 !== "" && !Number.isFinite(row[`${column}_per40`])) row[`${column}_per40`] = per40;
    if (Number.isFinite(total) && Number.isFinite(totalPoss) && totalPoss > 0 && !Number.isFinite(row[`${column}_per100`])) {
      row[`${column}_per100`] = roundNumber((total / totalPoss) * 100, 2);
    }
  });
}

function roundNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return "";
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function buildDatasetMeta(rows, config) {
  const columnSet = new Set();
  rows.forEach((row) => {
    Object.keys(row || {}).forEach((column) => columnSet.add(column));
  });
  const columns = Array.from(columnSet);
  const deferredColumns = Array.isArray(config?.deferredColumns) ? config.deferredColumns : [];
  const available = new Set([...columns, ...deferredColumns]);
  const demoColumns = [...new Set([...(config.lockedColumns || []), ...(config.demoColumns || [])])]
    .filter((column) => column === "rank" || available.has(column));
  const demoToggleColumns = (config.demoToggleColumns || [])
    .filter((column) => !((config.lockedColumns || []).includes(column)))
    .filter((column) => available.has(column));
  const demoFilterColumnSet = new Set(config.demoFilterColumns || []);
  let groups = config.groups
    .map((group) => {
      const removeDemoFilterDuplicates = /^(?:info|meta)$/i.test(group.id || "");
      const columnsForGroup = group.columns
        .filter((column) => available.has(column))
        .filter((column) => !(removeDemoFilterDuplicates && demoFilterColumnSet.has(column)));
      const defaultColumns = (group.defaultColumns || group.columns.filter((column) => config.defaultVisible.includes(column)))
        .filter((column) => columnsForGroup.includes(column));
      return { ...group, columns: columnsForGroup, defaultColumns };
    })
    .filter((group) => group.columns.length);
  if (config?.id === "player_career") {
    const groupedColumnSet = new Set([...demoColumns, ...groups.flatMap((group) => group.columns)]);
    groups = groups.concat(buildPlayerCareerExtraGroups(Array.from(available), groupedColumnSet));
  }
  const statColumns = groups.flatMap((group) => group.columns);
  const allColumns = [...new Set([...demoColumns, ...statColumns])];
  const columnGroupFamily = {};
  demoColumns.forEach((column) => {
    if (!columnGroupFamily[column]) columnGroupFamily[column] = "info";
  });
  groups.forEach((group) => {
    const family = getStringValue(group.groupClass || group.id).trim() || "stats";
    (group.columns || []).forEach((column) => {
      if (!columnGroupFamily[column]) columnGroupFamily[column] = family;
    });
  });
  const numericColumns = [...new Set([
    ...columns.filter((column) => rows.some((row) => typeof row[column] === "number" && !Number.isNaN(row[column]))),
    ...deferredColumns,
  ])];
  const teams = Array.from(new Set(rows.map((row) => getStringValue(row[config.teamColumn])).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  const years = Array.from(new Set(rows.map((row) => getStringValue(row[config.yearColumn])).filter(Boolean)))
    .filter((year) => !config.minYear || extractLeadingYear(year) >= config.minYear)
    .sort(compareYears);
  const demoFilterMeta = (config.demoFilterColumns || [])
    .filter((column) => available.has(column))
    .map((column) => ({ column, type: inferDemoFilterType(column, rows, numericColumns) }))
    .filter((item) => item.type);
  return {
    allColumns,
    demoColumns,
    demoColumnSet: new Set(demoColumns),
    demoToggleColumns,
    demoFilterColumns: demoFilterMeta.map((item) => item.column),
    demoFilterMeta,
    groups,
    numericColumns,
    numericColumnSet: new Set(numericColumns),
    statColumns,
    statColumnSet: new Set(statColumns),
    columnGroupFamily,
    teams,
    years,
    latestYear: years[0] || "",
    minuteFilterColumn: demoFilterMeta.find((item) => item.column === "min" || item.column === "mp")?.column || "",
  };
}

function inferDemoFilterType(column, rows, numericColumns) {
  if (/dob|birth/i.test(column)) return "date";
  if (/age|height|weight|inches|wingspan|bmi|gp|games|min$|^min|mpg|^mp$|poss|draft|pick|rookie/i.test(column)) return "number";
  if (numericColumns.includes(column)) return "number";
  const sample = rows.map((row) => getStringValue(row[column]).trim()).find(Boolean);
  return parseDateInput(sample) != null ? "date" : "";
}

function matchesDemoFilter(value, filter, type) {
  if (!filter) return true;
  if (type === "date") {
    const comparable = parseDateInput(value);
    if (comparable == null) return !(filter.min || filter.max);
    const min = parseDateInput(filter.min, "min");
    const max = parseDateInput(filter.max, "max");
    if (min != null && comparable < min) return false;
    if (max != null && comparable > max) return false;
    return true;
  }

  if (value == null || Number.isNaN(value)) return !(filter.min || filter.max);
  if (filter.min !== "" && Number(value) < Number(filter.min)) return false;
  if (filter.max !== "" && Number(value) > Number(filter.max)) return false;
  return true;
}

function parseDateInput(value, bound = "exact") {
  const text = getStringValue(value).trim();
  if (!text) return null;
  if (/^\d{4}$/.test(text)) {
    const year = Number(text);
    if (bound === "max") return Date.UTC(year, 11, 31);
    return Date.UTC(year, 0, 1);
  }
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? null : parsed;
}

function inferTypes(rows, columns) {
  const types = {};
  columns.forEach((column) => {
    let numericCount = 0;
    let sampleCount = 0;
    for (const row of rows) {
      const value = getStringValue(row[column]).trim();
      if (!value) continue;
      sampleCount += 1;
      if (isNumericString(value)) numericCount += 1;
      if (sampleCount >= 50) break;
    }
    types[column] = sampleCount > 0 && numericCount / sampleCount >= 0.75 ? "number" : "string";
  });
  return types;
}

function coerceValue(value, type) {
  const text = getStringValue(value).trim();
  if (!text) return null;
  if (type === "number" && isNumericString(text)) {
    const number = Number(text);
    return Number.isNaN(number) ? null : number;
  }
  return text;
}

function parseCSV(text) {
  const rows = [];
  if (!text) return rows;
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && char === ",") {
      row.push(current);
      current = "";
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(current);
      current = "";
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      continue;
    }
    current += char;
  }

  if (current !== "" || row.length) {
    row.push(current);
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  if (!rows.length) return [];
  const header = rows[0].map((cell) => cell.trim());
  return rows.slice(1).map((cells) => {
    const out = {};
    header.forEach((column, index) => {
      out[column] = cells[index] ?? "";
    });
    return out;
  });
}

function isNumericString(value) {
  return /^-?\d+(?:\.\d+)?$/.test(value);
}

function compareYears(left, right) {
  const leftYear = extractLeadingYear(left);
  const rightYear = extractLeadingYear(right);
  if (leftYear !== rightYear) return rightYear - leftYear;
  return right.localeCompare(left, undefined, { numeric: true, sensitivity: "base" });
}

function extractLeadingYear(value) {
  const match = getStringValue(value).match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function formatAutoDisplayLabelToken(token) {
  const normalized = getStringValue(token).trim().toLowerCase();
  if (!normalized) return "";
  return {
    pts: "PTS",
    trb: "TRB",
    reb: "REB",
    orb: "ORB",
    drb: "DRB",
    ast: "AST",
    stl: "STL",
    blk: "BLK",
    tov: "TOV",
    pf: "PF",
    fgm: "FGM",
    fga: "FGA",
    ftm: "FTM",
    fta: "FTA",
    two_p: "2P",
    three_p: "3P",
    two_pm: "2PM",
    two_pa: "2PA",
    three_pm: "3PM",
    three_pa: "3PA",
    "2pm": "2PM",
    "2pa": "2PA",
    "2p": "2P",
    "3pm": "3PM",
    "3pa": "3PA",
    "3p": "3P",
    tp: "3P",
    ftr: "FTr",
    efg: "eFG",
    tspct: "TS",
    ts: "TS",
    fg2pct: "2P",
    fg3pct: "3P",
    fgpct: "FG",
    ftpct: "FT",
    orbpct: "ORB",
    drbpct: "DRB",
    trbpct: "TRB",
    astpct: "AST",
    topct: "TOV",
    stlpct: "STL",
    blkpct: "BLK",
    ppp: "PPP",
    poss: "Poss",
    freq: "Freq",
    usg: "USG",
    off: "Off",
    def: "Def",
    tot: "Tot",
    epm: "EPM",
    bpm: "BPM",
    obpm: "OBPM",
    dbpm: "DBPM",
    per: "PER",
    ppr: "PPR",
    fic: "FIC",
    adjoe: "AdjO",
    adrtg: "AdjD",
    ortg: "ORtg",
    drtg: "DRtg",
    porpag: "PRPG",
    dporpag: "dPRPG",
    spi: "SPI",
    ncaa: "NCAA",
    d1: "D1",
    nba: "NBA",
    realgm: "RealGM",
    id: "ID",
    hs: "HS",
    gp: "GP",
    mpg: "MPG",
    min: "MIN",
    mp: "MIN",
  }[normalized] || normalized.split(/[\s-]+/).map((part) => {
    if (!part) return "";
    if (/^[a-z]{2}$/.test(part) && !/[aeiou]/.test(part)) return part.toUpperCase();
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(" ");
}

function buildAutoDisplayLabel(column) {
  const baseColumn = stripCompanionPrefix(column);
  const override = {
    dunk_pct: "Dunks",
    rim_pct: "Close 2",
    fgpct_rim: "Close 2",
    mid_pct: "Far 2",
    fgpct_mid: "Far 2",
    two_p_pct: "2P",
    "2p_pct": "2P",
    three_p_pct: "3P",
    "3p_pct": "3P",
    tp_pct: "3P",
    fg2pct: "2P",
    fg3pct: "3P",
    tspct: "TS%",
    efg: "eFG%",
    ft_pct: "FT",
    ftpct: "FT",
    orbpct: "ORB%",
    drbpct: "DRB%",
    trbpct: "TRB%",
    astpct: "AST%",
    topct: "TOV%",
    stlpct: "STL%",
    blkpct: "BLK%",
    tpa_rate: "3Pr",
    fta_rate: "FTr",
    min_per_g: "MPG",
    pts_per_g: "PTS/G",
    orb_per_g: "ORB/G",
    drb_per_g: "DRB/G",
    trb_per_g: "TRB/G",
    ast_per_g: "AST/G",
    tov_per_g: "TOV/G",
    stl_per_g: "STL/G",
    blk_per_g: "BLK/G",
    pf_per_g: "PF/G",
    plus_minus: "+/-",
    plus_minus_pg: "+/-/G",
  }[baseColumn];
  if (override) return override;
  let match = baseColumn.match(/^(.*)_(?:pg|per_g)$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])}/G`;
  match = baseColumn.match(/^(.*)_per40$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])}/40`;
  match = baseColumn.match(/^(.*)_per100$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])}/100`;
  match = baseColumn.match(/^(.*)_75$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])}/75`;
  match = baseColumn.match(/^(.*)_pct$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])}%`;
  match = baseColumn.match(/^(.*)_att$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])} Att`;
  match = baseColumn.match(/^(.*)_made$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])} Made`;
  match = baseColumn.match(/^(.*)_poss$/i);
  if (match) return `${formatAutoDisplayLabelToken(match[1])} Poss`;
  return baseColumn
    .split("_")
    .map((token) => formatAutoDisplayLabelToken(token))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function displayLabel(dataset, column) {
  if (!column) return "";
  if (isRelativeDisplayColumn(column)) return getRelativeDisplayMetric(column)?.metric === "rank" ? "Rank" : "Pctl";
  if (dataset?.id === "capitanesreference" && dataset.labels && Object.prototype.hasOwnProperty.call(dataset.labels, column)) {
    return dataset.labels[column];
  }
  const splitLabel = getSplitDisplayLabel(column);
  if (splitLabel) return splitLabel;
  let label = "";
  if (dataset?.labels && Object.prototype.hasOwnProperty.call(dataset.labels, column)) label = dataset.labels[column];
  else if (column === "bmi") label = "BMI";
  else if (column === "wingspan") label = "WS";
  else if (column === "exp") label = "Exp";
  else label = buildAutoDisplayLabel(column);
  return label;
}

function formatValue(dataset, column, value, row) {
  if (value == null) return "";
  if (typeof value !== "number") return String(value);
  if (!Number.isFinite(value)) return "";
  if (isRelativeDisplayColumn(column)) return value.toFixed(0);
  if (column === "draft_pick" && row?._draftPickBlank) return "";
  if (column === "rank") return String(value);
  if (dataset?.id === "capitanesreference" && stripCompanionPrefix(column) === "height_in") return formatHeightFeetInches(value);
  if (dataset?.id === "capitanesreference" && stripCompanionPrefix(column) === "win_pct") return value.toFixed(2);
  if (dataset?.id === "capitanesreference" && /^(ows_per40|dws_per40|ws_per40)$/i.test(stripCompanionPrefix(column))) return value.toFixed(3);
  if (dataset?.id === "capitanesreference" && stripCompanionPrefix(column) === "a_to") return value.toFixed(2);
  if (/^(season|year|rookie_year)$/i.test(column) && Number.isInteger(value)) return String(value);
  if (column === "age") return value.toFixed(1);
  if (column === "exp") return value.toFixed(2);
  if (dataset?.id === "combine" && /^(wingspan|standing_reach|ws_height|sr_height|sr_ws)$/i.test(stripCompanionPrefix(column))) return value.toFixed(2);
  if (dataset?.id === "combine" && /^(sprint|lane_agility|modified_lane_agility|shuttle)$/i.test(stripCompanionPrefix(column))) return value.toFixed(2);
  if (/^(gp|g|gs|min|mp|total_poss|games|wins|losses)$/i.test(column)) return String(Math.round(value));
  if (dataset?.id === "team_coach" && /_(?:fga|two_pa|three_pa|fta)_pg$/i.test(column)) return value.toFixed(1);
  if (dataset?.id === "team_coach" && /_(?:fga|two_pa|three_pa|fta)$/i.test(column)) return value.toFixed(1);
  if (/_poss$/i.test(stripCompanionPrefix(column))) return String(Math.round(value));
  if (value === 0 && /(_pg$|_per_g$|_per40$|_att$|_made$|_miss$|_poss$)/i.test(stripCompanionPrefix(column))) return "0";
  if (isIntegerCountColumn(column)) return String(Math.round(value));
  if (/(_att$|_made$|_miss$)/i.test(column)) return String(Math.round(value));
  if (column === "ast_to") return value.toFixed(2);
  if (/^ast_pct_(?:usg|tov)_pct$/i.test(column)) return value.toFixed(2);
  if (column === "rim_to_mid_att_ratio") return value.toFixed(2);
  if (column === "blk_pf" || column === "stl_pf" || column === "stocks_pf") return value.toFixed(2);
  if (/^barthag$/i.test(column)) return value.toFixed(3);
  if (/^ppp_(off|def|net)$/i.test(column)) return value.toFixed(3);
  if (/ppp$/i.test(column)) return value.toFixed(3);
  if (dataset?.id === "team_coach" && /_(?:three_pa_rate|ft_rate)$/i.test(column)) {
    const displayValue = Math.abs(value) <= 1.5 ? value * 100 : value;
    return displayValue.toFixed(1);
  }
  if (/^(fic|ppr)$/i.test(column)) return value.toFixed(1);
  if (isRatioDisplayPercentColumn(dataset, column)) return (Math.abs(value) <= 1.5 ? value * 100 : value).toFixed(1);
  if (isShootingPercentageColumn(column) && Math.abs(value) <= 1.5) return (value * 100).toFixed(1);
  if (isPercentRatioColumn(column)) return value.toFixed(1);

  if (looksPercentColumn(column)) {
    return value.toFixed(1);
  }

  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function formatHeightFeetInches(value) {
  const inches = Math.round(Number(value));
  if (!Number.isFinite(inches) || inches <= 0) return "";
  return `${Math.floor(inches / 12)}-${inches % 12}`;
}

function looksPercentColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /pct|percentile|rate|usg$|freq$|share$|^efg$|^tspct$|^ftpct$|^fg2pct$|^fg3pct$|^fgpct_rim$|^fgpct_mid$|^orbpct$|^drbpct$|^astpct$|^topct$|^stlpct$|^blkpct$/.test(baseColumn);
}

function isShootingPercentageColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /(^fg_pct$|^2p_pct$|^two_p_pct$|^3p_pct$|^tp_pct$|^three_p_pct$|^ft_pct$|^efg_pct$|^ts_pct$|^fg2pct$|^fg3pct$|^ftpct$|^efg$|^tspct$|^fgpct_rim$|^fgpct_mid$|_fg_pct$|_two_p_pct$|_two_fg_pct$|_three_p_pct$|_three_fg_pct$|_efg_pct$|_ast_pct$|^rim_pct$|^mid_pct$|^dunk_pct$|^dunk_ast_pct$|^rim_ast_pct$|^mid_ast_pct$|^two_p_ast_pct$|^three_p_ast_pct$)/i.test(baseColumn);
}

function isRatioDisplayPercentColumn(dataset, column) {
  const datasetId = getStringValue(dataset?.id).toLowerCase();
  const baseColumn = stripCompanionPrefix(column);
  const d1RatioColumns = new Set(["fg_pct", "dunk_pct", "rim_pct", "mid_pct", "two_p_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct"]);
  if (datasetId === "d1") return d1RatioColumns.has(baseColumn);
  if (datasetId === "nba_companion" && /^ncaa_/i.test(column)) return d1RatioColumns.has(baseColumn);
  return false;
}

function isPercentRatioColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /(^ftr$|_ftr$|^three_pr$|_three_pr$|^ftm_fga$|_ftm_fga$|^three_pr_plus_ftm_fga$|_three_pr_plus_ftm_fga$)/.test(baseColumn);
}

function isIntegerCountColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /^(pts|trb|ast|tov|stl|blk|pf|stocks|fgm|fga|2pm|2pa|3pm|3pa|ftm|fta|event_total_players|page_index)$/i.test(baseColumn)
    || /(?:_poss|_points|_fga|_fgm|_fg_att|_fg_made|_fg_miss|_two_fg_att|_two_fg_made|_two_fg_miss|_three_fg_att|_three_fg_made|_three_fg_miss|_fta|_ftm|_tov|_plus1)$/i.test(baseColumn);
}

function isTeamDisplayColumn(dataset, column) {
  const baseColumn = stripCompanionPrefix(column);
  if (!baseColumn || /^team_(code|id)$/i.test(baseColumn)) return false;
  if (baseColumn === dataset?.teamColumn) return true;
  return /^(team_name|team_full|team_alias|current_team|pre_draft_team)$/i.test(baseColumn);
}

function isPlayerDisplayColumn(dataset, column) {
  const baseColumn = stripCompanionPrefix(column);
  if (!baseColumn) return false;
  return column === dataset?.playerColumn || /^(player|player_name)$/i.test(baseColumn);
}

function isLeftAligned(dataset, column) {
  if (dataset?.id === "capitanesreference" && ["league_name", "team_name", "nationality", "nationality_list"].includes(stripCompanionPrefix(column))) return true;
  return false;
}

function isWrapColumn(dataset, column) {
  if (dataset?.id === "capitanesreference" && ["league_name", "team_name", "nationality", "nationality_list"].includes(stripCompanionPrefix(column))) return true;
  if (isTeamDisplayColumn(dataset, column)) return false;
  return column === dataset?.playerColumn
    || column === "profile_levels"
    || column === "career_path"
    || column === "coach"
    || column === "competition_label"
    || column === "event_name"
    || column === "event_group"
    || column === "event_raw_name"
    || column === "circuit";
}

function isCompactTextColumn(dataset, column) {
  const baseColumn = stripCompanionPrefix(column);
  if (!baseColumn) return false;
  if (["profile_levels", "career_path", "event_group", "event_raw_name"].includes(baseColumn)) return true;
  if (dataset?.id === "player_career" && ["team_name", "team_full"].includes(baseColumn)) return true;
  return false;
}

function isD1PlaytypeColumn(column) {
  return D1_PLAYTYPE_DEFS.some((playtype) => column.startsWith(`${playtype.id}_`));
}

function isTeamCoachPlaytypeColumn(column) {
  const baseColumn = stripCompanionPrefix(column);
  return /^(transition|spot_up|pnr_ball_handler|pnr_roll_man|post_up|cut|off_screen|hand_off|isolation|offensive_rebounds)_/i.test(baseColumn);
}

function getStringValue(value) {
  return value == null ? "" : String(value);
}

function getExplicitIdentityId(row) {
  if (!row) return "";
  const canonicalId = getStringValue(row.canonical_player_id).trim();
  if (canonicalId) return canonicalId;
  const profileKey = getStringValue(row.player_profile_key).trim();
  if (profileKey) return `profile:${profileKey}`;
  const realgmId = getStringValue(row.realgm_player_id).trim();
  if (realgmId) return `rgm_${realgmId}`;
  const sourceId = getStringValue(row.source_player_id).trim();
  if (sourceId) return `src:${sourceId}`;
  const legacyId = getStringValue(row.player_id || row.pid || row.id).trim();
  if (legacyId) return `legacy:${legacyId}`;
  return "";
}

function getStatusIdentityId(row) {
  const explicitRealgmId = getStringValue(row?.realgm_player_id).trim();
  if (explicitRealgmId) return explicitRealgmId;
  const canonicalId = getStringValue(row?.canonical_player_id).trim();
  const canonicalMatch = canonicalId.match(/^rgm_(.+)$/i);
  return canonicalMatch ? canonicalMatch[1] : "";
}

function hasStatusIdentity(row) {
  return Boolean(getStatusIdentityId(row));
}

function copyExplicitIdentityFields(target, source) {
  if (!target || !source) return;
  ["canonical_player_id", "player_profile_key", "realgm_player_id", "source_player_id", "player_id"].forEach((field) => {
    if (getStringValue(target[field]).trim()) return;
    const value = getStringValue(source[field]).trim();
    if (value) target[field] = value;
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}
