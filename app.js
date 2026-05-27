(function () {
  "use strict";

  const MAX_RENDERED_ROWS = 600;
  const AVG_EFF = 104.9;
  const NEUTRAL_OPPONENT_ADJ = 1;
  const STAT_NUMBERS = new Set([
    "rank", "season", "height_in", "weight_lb", "age", "gp", "min", "mpg",
    "pts_pg", "trb_pg", "orb_pg", "drb_pg", "ast_pg", "stl_pg", "blk_pg", "stocks_pg", "tov_pg", "pf_pg",
    "fgm_pg", "fga_pg", "three_pm_pg", "three_pa_pg", "ftm_pg", "fta_pg",
    "pts", "trb", "orb", "drb", "ast", "stl", "blk", "stocks", "tov", "pf", "fgm", "fga", "three_pm", "three_pa", "ftm", "fta",
    "fg_pct", "three_p_pct", "ft_pct", "efg_pct", "ts_pct", "total_s_pct", "ftr", "three_pr",
    "double_doubles", "triple_doubles", "forty_pts_games", "twenty_reb_games", "twenty_ast_games", "five_stl_games", "five_blk_games",
    "high_game", "techs", "hob", "a_to", "ast_to", "stl_to", "ftm_fga", "wins", "losses", "win_pct",
    "ows", "dws", "ws", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct", "blk_pct", "usg_pct",
    "ppr", "pps", "ortg", "drtg", "ediff", "fic", "per", "two_pm", "two_pa", "two_p_pct", "two_pm_pg", "two_pa_pg",
    "pts_per40", "trb_per40", "ast_per40", "stl_per40", "blk_per40", "stocks_per40", "tov_per40", "pf_per40"
  ]);

  const LATINO_COUNTRIES = new Set([
    "Argentina", "Belize", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica", "Cuba",
    "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Honduras", "Mexico",
    "Nicaragua", "Panama", "Paraguay", "Peru", "Puerto Rico", "Uruguay", "Venezuela"
  ]);

  const LATINO_NAME_ROOTS = new Set([
    "acevedo", "aguilar", "alarcon", "alba", "alcalde", "alfaro", "almonte", "alvarez", "arias", "arroyo",
    "avila", "baez", "barbosa", "barrera", "bautista", "benitez", "blanco", "bonilla", "bravo", "caballero",
    "cabrera", "calderon", "camacho", "campos", "cano", "cardenas", "carmona", "carrasco", "carrillo", "castaneda",
    "castellanos", "castillo", "castro", "cerda", "chavez", "colon", "contreras", "cordoba", "cordero", "corona",
    "cortes", "cruz", "delgado", "diaz", "dominguez", "duarte", "escobar", "espinal", "espinoza", "estrada",
    "fernandez", "figueroa", "flores", "franco", "fuentes", "galindo", "gallegos", "garcia", "gil", "gomez",
    "gonzales", "gonzalez", "guerrero", "gutierrez", "guzman", "hernandez", "herrera", "ibarra", "iglesias",
    "jimenez", "juarez", "lara", "leon", "lopez", "lora", "luna", "machado", "maldonado", "marquez", "martinez",
    "medina", "mejia", "mendez", "mendoza", "miranda", "molina", "montero", "montoya", "morales", "moreno",
    "munoz", "navarro", "negron", "nunez", "olivares", "ortega", "ortiz", "pacheco", "padilla", "palacios",
    "paredes", "pena", "perez", "quintero", "ramirez", "ramos", "reyes", "rios", "rivera", "roa", "robles",
    "rodriguez", "rojas", "romero", "rosario", "rubio", "ruiz", "salas", "salazar", "sanchez", "santos", "serrano",
    "silva", "solis", "sosa", "soto", "suarez", "tavares", "tejada", "torres", "valdez", "valencia", "vargas",
    "vasquez", "vazquez", "vega", "velasquez", "velazquez", "vera", "villalobos", "zapata", "zuniga"
  ]);

  const MAJOR_EURO_TERMS = ["euroleague", "eurocup"];
  const MAJOR_ASIA_TERMS = ["b.league", "bleague", "cba"];

  const columns = [
    { key: "player_name", label: "Player", group: "Demo", className: "player-cell", render: renderPlayer },
    { key: "team_name", label: "Team", group: "Demo", className: "team-cell" },
    { key: "league_list", label: "League", group: "Demo", className: "league-cell" },
    { key: "nationality_list", label: "Nation", group: "Demo", className: "country-cell" },
    { key: "height_in", label: "HT", group: "Demo", render: (row) => formatHeight(row.height_in) },
    { key: "weight_lb", label: "WT", group: "Demo", numeric: true, decimals: 0 },
    { key: "age", label: "Age", group: "Demo", numeric: true, decimals: 1 },
    { key: "gp", label: "GP", group: "Demo", numeric: true, decimals: 0 },
    { key: "min", label: "MIN", group: "Demo", numeric: true, decimals: 1 },
    { key: "mpg", label: "MPG", group: "Demo", numeric: true, decimals: 1 },

    { key: "pts_pg", label: "PTS", group: "Averages", numeric: true, decimals: 1 },
    { key: "trb_pg", label: "TRB", group: "Averages", numeric: true, decimals: 1 },
    { key: "orb_pg", label: "ORB", group: "Averages", numeric: true, decimals: 1 },
    { key: "drb_pg", label: "DRB", group: "Averages", numeric: true, decimals: 1 },
    { key: "ast_pg", label: "AST", group: "Averages", numeric: true, decimals: 1 },
    { key: "stl_pg", label: "STL", group: "Averages", numeric: true, decimals: 1 },
    { key: "blk_pg", label: "BLK", group: "Averages", numeric: true, decimals: 1 },
    { key: "stocks_pg", label: "STOCKS", group: "Averages", numeric: true, decimals: 1 },
    { key: "tov_pg", label: "TOV", group: "Averages", numeric: true, decimals: 1 },
    { key: "pf_pg", label: "PF", group: "Averages", numeric: true, decimals: 1 },
    { key: "fgm_pg", label: "FGM", group: "Averages", numeric: true, decimals: 1 },
    { key: "fga_pg", label: "FGA", group: "Averages", numeric: true, decimals: 1 },
    { key: "three_pm_pg", label: "3PM", group: "Averages", numeric: true, decimals: 1 },
    { key: "ftm_pg", label: "FTM", group: "Averages", numeric: true, decimals: 1 },
    { key: "fta_pg", label: "FTA/G", group: "Averages", numeric: true, decimals: 1 },

    { key: "pts", label: "PTS Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "trb", label: "TRB Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "orb", label: "ORB Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "drb", label: "DRB Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "ast", label: "AST Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "stl", label: "STL Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "blk", label: "BLK Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "stocks", label: "Stocks Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "tov", label: "TOV Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "pf", label: "PF Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "fgm", label: "FGM Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "fga", label: "FGA Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "three_pm", label: "3PM Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "ftm", label: "FTM Tot", group: "Totals", numeric: true, decimals: 0 },
    { key: "two_pm", label: "2PM", group: "Totals", numeric: true, decimals: 0 },

    { key: "two_p_pct", label: "2P%", group: "Shooting", numeric: true, pctOne: true },
    { key: "two_pa", label: "2PA", group: "Shooting", numeric: true, decimals: 0 },
    { key: "three_p_pct", label: "3P%", group: "Shooting", numeric: true, pctOne: true },
    { key: "three_pa", label: "3PA", group: "Shooting", numeric: true, decimals: 0 },
    { key: "ft_pct", label: "FT%", group: "Shooting", numeric: true, pctOne: true },
    { key: "fta", label: "FTA", group: "Shooting", numeric: true, decimals: 0 },
    { key: "fg_pct", label: "FG%", group: "Shooting", numeric: true, pctOne: true },
    { key: "efg_pct", label: "eFG%", group: "Shooting", numeric: true, pctOne: true },
    { key: "ts_pct", label: "TS%", group: "Shooting", numeric: true, pctOne: true },
    { key: "ftr", label: "FTr", group: "Shooting", numeric: true, decimals: 3 },
    { key: "three_pr", label: "3Pr", group: "Shooting", numeric: true, decimals: 3 },
    { key: "a_to", label: "A:TO", group: "Shooting", numeric: true, decimals: 1 },
    { key: "pts_per40", label: "PTS/40", group: "Shooting", numeric: true, decimals: 2 },
    { key: "prpg", label: "PRPG!", group: "Shooting", numeric: true, decimals: 2 },

    { key: "wins", label: "W", group: "Advanced", numeric: true, decimals: 0 },
    { key: "losses", label: "L", group: "Advanced", numeric: true, decimals: 0 },
    { key: "win_pct", label: "Win%", group: "Advanced", numeric: true, pctOne: true },
    { key: "ows", label: "OWS", group: "Advanced", numeric: true, decimals: 1 },
    { key: "dws", label: "DWS", group: "Advanced", numeric: true, decimals: 1 },
    { key: "ws", label: "WS", group: "Advanced", numeric: true, decimals: 1 },
    { key: "orb_pct", label: "ORB%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "drb_pct", label: "DRB%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "trb_pct", label: "TRB%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "ast_pct", label: "AST%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "tov_pct", label: "TOV%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "stl_pct", label: "STL%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "blk_pct", label: "BLK%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "usg_pct", label: "USG%", group: "Advanced", numeric: true, decimals: 1 },
    { key: "ppr", label: "PPR", group: "Advanced", numeric: true, decimals: 1 },
    { key: "pps", label: "PPS", group: "Advanced", numeric: true, decimals: 1 },
    { key: "ortg", label: "ORtg", group: "Advanced", numeric: true, decimals: 1 },
    { key: "drtg", label: "DRtg", group: "Advanced", numeric: true, decimals: 1 },
    { key: "ediff", label: "eDiff", group: "Advanced", numeric: true, decimals: 1 },
    { key: "fic", label: "FIC", group: "Advanced", numeric: true, decimals: 1 },
    { key: "per", label: "PER", group: "Advanced", numeric: true, decimals: 1 },

    { key: "double_doubles", label: "DD", group: "Misc", numeric: true, decimals: 0 },
    { key: "triple_doubles", label: "TD", group: "Misc", numeric: true, decimals: 0 },
    { key: "forty_pts_games", label: "40 PTS", group: "Misc", numeric: true, decimals: 0 },
    { key: "twenty_reb_games", label: "20 REB", group: "Misc", numeric: true, decimals: 0 },
    { key: "twenty_ast_games", label: "20 AST", group: "Misc", numeric: true, decimals: 0 },
    { key: "five_stl_games", label: "5 STL", group: "Misc", numeric: true, decimals: 0 },
    { key: "five_blk_games", label: "5 BLK", group: "Misc", numeric: true, decimals: 0 },
    { key: "high_game", label: "High", group: "Misc", numeric: true, decimals: 0 },
    { key: "techs", label: "Techs", group: "Misc", numeric: true, decimals: 0 },
    { key: "hob", label: "HOB", group: "Misc", numeric: true, decimals: 3 },
    { key: "ast_to", label: "AST/TO", group: "Misc", numeric: true, decimals: 1 },
    { key: "stl_to", label: "STL/TO", group: "Misc", numeric: true, decimals: 1 },
    { key: "ftm_fga", label: "FTM/FGA", group: "Misc", numeric: true, decimals: 1 },

    { key: "trb_per40", label: "TRB/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "ast_per40", label: "AST/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "stl_per40", label: "STL/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "blk_per40", label: "BLK/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "stocks_per40", label: "Stocks/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "tov_per40", label: "TOV/40", group: "Per 40", numeric: true, decimals: 2 },
    { key: "pf_per40", label: "PF/40", group: "Per 40", numeric: true, decimals: 2 }
  ];

  const columnByKey = new Map(columns.map((column) => [column.key, column]));
  const defaultColumnKeys = [
    "player_name", "team_name", "league_list", "nationality_list", "height_in", "weight_lb", "age", "gp", "min", "mpg",
    "wins", "losses", "win_pct", "ows", "dws", "ws", "orb_pct", "drb_pct", "trb_pct", "ast_pct", "tov_pct", "stl_pct",
    "blk_pct", "usg_pct", "ppr", "pps", "ortg", "drtg", "ediff", "fic", "per",
    "two_p_pct", "two_pa", "three_p_pct", "three_pa", "ft_pct", "fta", "efg_pct", "ts_pct",
    "a_to", "ftr", "three_pr", "pts_per40", "prpg"
  ];

  const el = {};
  const state = {
    allRows: [],
    filteredRows: [],
    visibleColumns: new Set(defaultColumnKeys),
    countrySelected: new Set(),
    leagueSelected: new Set(),
    countrySearch: "",
    leagueSearch: "",
    search: "",
    ageMin: 22.5,
    orbMin: null,
    astMin: null,
    perMin: null,
    atoMin: null,
    includePotentialLatino: false,
    excludeEuro: false,
    excludeAsia: false,
    sortKey: "prpg",
    sortDir: "desc"
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    bindElements();
    state.allRows = parseRows(window.CAPITANESREFERENCE_2026_CSV || "");
    state.countries = uniqueSorted(state.allRows.flatMap((row) => row._countries));
    state.leagues = uniqueSorted(state.allRows.flatMap((row) => row._leagues));
    state.countrySelected = new Set(state.countries);
    state.leagueSelected = new Set(state.leagues);
    readQueryParams();
    bindEvents();
    renderFilterLists();
    renderColumnList();
    syncInputs();
    render();
  }

  function bindElements() {
    [
      "searchInput", "ageMin", "orbMin", "astMin", "perMin", "atoMin", "latinoQuery", "copyQuery",
      "countryAll", "countryNone", "countryLatino", "includePotentialLatino", "countrySearch", "countryList", "countryCount",
      "leagueAll", "leagueNone", "excludeEuro", "excludeAsia", "leagueSearch", "leagueList", "leagueCount",
      "defaultColumns", "allColumns", "clearColumns", "columnList", "resultCount", "resultMeta", "activeFilters",
      "tableHead", "tableBody"
    ].forEach((id) => {
      el[id] = document.getElementById(id);
    });
  }

  function bindEvents() {
    el.searchInput.addEventListener("input", () => {
      state.search = el.searchInput.value.trim();
      render();
    });
    [
      ["ageMin", "ageMin"], ["orbMin", "orbMin"], ["astMin", "astMin"], ["perMin", "perMin"], ["atoMin", "atoMin"]
    ].forEach(([id, key]) => {
      el[id].addEventListener("input", () => {
        state[key] = parseOptionalNumber(el[id].value);
        render();
      });
    });

    el.countrySearch.addEventListener("input", () => {
      state.countrySearch = el.countrySearch.value.trim();
      renderFilterLists();
    });
    el.leagueSearch.addEventListener("input", () => {
      state.leagueSearch = el.leagueSearch.value.trim();
      renderFilterLists();
    });
    el.countryAll.addEventListener("click", () => {
      state.countrySelected = new Set(state.countries);
      renderFilterLists();
      render();
    });
    el.countryNone.addEventListener("click", () => {
      state.countrySelected = new Set();
      renderFilterLists();
      render();
    });
    el.countryLatino.addEventListener("click", () => {
      state.countrySelected = new Set(state.countries.filter((country) => LATINO_COUNTRIES.has(country)));
      renderFilterLists();
      render();
    });
    el.includePotentialLatino.addEventListener("change", () => {
      state.includePotentialLatino = el.includePotentialLatino.checked;
      render();
    });
    el.leagueAll.addEventListener("click", () => {
      state.leagueSelected = new Set(state.leagues);
      renderFilterLists();
      render();
    });
    el.leagueNone.addEventListener("click", () => {
      state.leagueSelected = new Set();
      renderFilterLists();
      render();
    });
    el.excludeEuro.addEventListener("click", () => {
      state.excludeEuro = !state.excludeEuro;
      if (state.excludeEuro) {
        removeLeaguesByTerms(MAJOR_EURO_TERMS);
      }
      renderFilterLists();
      render();
    });
    el.excludeAsia.addEventListener("click", () => {
      state.excludeAsia = !state.excludeAsia;
      if (state.excludeAsia) {
        removeLeaguesByTerms(MAJOR_ASIA_TERMS);
      }
      renderFilterLists();
      render();
    });
    el.latinoQuery.addEventListener("click", runLatinoBigsQuery);
    el.copyQuery.addEventListener("click", copyQueryLink);
    el.defaultColumns.addEventListener("click", () => {
      state.visibleColumns = new Set(defaultColumnKeys);
      renderColumnList();
      render();
    });
    el.allColumns.addEventListener("click", () => {
      state.visibleColumns = new Set(columns.map((column) => column.key));
      renderColumnList();
      render();
    });
    el.clearColumns.addEventListener("click", () => {
      state.visibleColumns = new Set(["player_name"]);
      renderColumnList();
      render();
    });
  }

  function parseRows(csv) {
    const records = parseCsv(csv);
    if (!records.length) return [];
    const headers = records[0];
    return records.slice(1).filter((record) => record.length && record.some(Boolean)).map((record) => {
      const row = {};
      headers.forEach((header, index) => {
        const raw = record[index] == null ? "" : record[index];
        row[header] = STAT_NUMBERS.has(header) ? parseOptionalNumber(raw) : raw;
      });
      row.team_name = row.team_name || row.team_abbrev || "";
      row.league_list = row.league_list || row.league_name || "Unknown";
      row.nationality_list = row.nationality_list || row.nationality || "Unknown";
      row._countries = splitList(row.nationality_list);
      row._leagues = splitList(row.league_list);
      row._countryNorm = normalize(row.nationality_list);
      row._leagueNorm = normalize(row.league_list);
      row._searchNorm = normalize([
        row.player_name, row.team_name, row.team_abbrev, row.league_list, row.nationality_list
      ].join(" "));
      row.verifiedLatino = row._countries.some((country) => LATINO_COUNTRIES.has(country));
      row.potentialLatinoName = hasPotentialLatinoName(row.player_name);
      row.prpg = computePrpg(row);
      return row;
    });
  }

  function parseCsv(csv) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;
    for (let index = 0; index < csv.length; index += 1) {
      const char = csv[index];
      const next = csv[index + 1];
      if (char === "\"") {
        if (inQuotes && next === "\"") {
          field += "\"";
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  function computePrpg(row) {
    const usage = row.usg_pct;
    const ortg = row.ortg;
    const mpg = row.mpg;
    if (!Number.isFinite(usage) || !Number.isFinite(ortg) || !Number.isFinite(mpg) || mpg <= 0) return null;
    const uFactor = usage * -0.144 + 13.023;
    if (!Number.isFinite(uFactor) || uFactor === 0) return null;
    const altZScore = (ortg - AVG_EFF) / uFactor;
    const xOrtg = AVG_EFF + altZScore * 10.143;
    const usageAdjustment = usage > 20
      ? (usage - 20) * 1.25 * NEUTRAL_OPPONENT_ADJ
      : (usage - 20) * 1.5 * NEUTRAL_OPPONENT_ADJ;
    const adjO = xOrtg + usageAdjustment;
    const actualMinPer = Math.max(0, Math.min(1, mpg / 40));
    return (adjO + (104.9 - AVG_EFF) - 88) * actualMinPer * 69.4 / 500;
  }

  function render() {
    state.filteredRows = applyFilters();
    sortRows(state.filteredRows);
    renderCounts();
    renderTable();
    renderColumnList();
    updateUrl();
  }

  function applyFilters() {
    const searchNorm = normalize(state.search);
    return state.allRows.filter((row) => {
      if (searchNorm && !row._searchNorm.includes(searchNorm)) return false;
      if (Number.isFinite(state.ageMin) && (!Number.isFinite(row.age) || row.age < state.ageMin)) return false;
      if (!passesMin(row.orb_pct, state.orbMin)) return false;
      if (!passesMin(row.ast_pct, state.astMin)) return false;
      if (!passesMin(row.per, state.perMin)) return false;
      if (!passesMin(row.a_to, state.atoMin)) return false;
      if (!passesCountry(row)) return false;
      if (!passesLeague(row)) return false;
      return true;
    });
  }

  function passesCountry(row) {
    const hasSelectedCountry = row._countries.some((country) => state.countrySelected.has(country));
    const potentialPass = state.includePotentialLatino && row.potentialLatinoName;
    return hasSelectedCountry || potentialPass;
  }

  function passesLeague(row) {
    const hasSelectedLeague = row._leagues.some((league) => state.leagueSelected.has(league));
    if (!hasSelectedLeague) return false;
    if (state.excludeEuro && hasLeagueTerms(row, MAJOR_EURO_TERMS)) return false;
    if (state.excludeAsia && hasLeagueTerms(row, MAJOR_ASIA_TERMS)) return false;
    return true;
  }

  function passesMin(value, minValue) {
    if (!Number.isFinite(minValue)) return true;
    return Number.isFinite(value) && value >= minValue;
  }

  function sortRows(rows) {
    const column = columnByKey.get(state.sortKey);
    const dir = state.sortDir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      const av = getSortValue(a, column);
      const bv = getSortValue(b, column);
      if (typeof av === "number" || typeof bv === "number") {
        const an = Number.isFinite(av) ? av : -Infinity;
        const bn = Number.isFinite(bv) ? bv : -Infinity;
        return (an - bn) * dir;
      }
      return String(av || "").localeCompare(String(bv || "")) * dir;
    });
  }

  function getSortValue(row, column) {
    if (!column) return "";
    const value = row[column.key];
    return column.numeric ? value : String(value || "").toLowerCase();
  }

  function renderCounts() {
    const total = state.filteredRows.length;
    const rendered = Math.min(total, MAX_RENDERED_ROWS);
    el.resultCount.textContent = `${total.toLocaleString()} player${total === 1 ? "" : "s"}`;
    el.resultMeta.textContent = total > rendered ? `showing first ${rendered.toLocaleString()} after sort` : "all matching rows shown";
    el.countryCount.textContent = `${state.countrySelected.size}/${state.countries.length} selected`;
    el.leagueCount.textContent = `${state.leagueSelected.size}/${state.leagues.length} selected`;
    el.excludeEuro.setAttribute("aria-pressed", String(state.excludeEuro));
    el.excludeAsia.setAttribute("aria-pressed", String(state.excludeAsia));
    const chips = [];
    if (Number.isFinite(state.ageMin)) chips.push(`Age >= ${state.ageMin}`);
    if (Number.isFinite(state.orbMin)) chips.push(`OREB% >= ${state.orbMin}`);
    if (Number.isFinite(state.astMin)) chips.push(`AST% >= ${state.astMin}`);
    if (Number.isFinite(state.perMin)) chips.push(`PER >= ${state.perMin}`);
    if (Number.isFinite(state.atoMin)) chips.push(`A:TO >= ${state.atoMin}`);
    if (state.includePotentialLatino) chips.push("Potential Latino names included");
    if (state.excludeEuro) chips.push("Euroleague/Eurocup excluded");
    if (state.excludeAsia) chips.push("B.League/CBA excluded");
    el.activeFilters.innerHTML = chips.map((chip) => `<span class="chip${chip.includes("excluded") ? " warn" : ""}">${escapeHtml(chip)}</span>`).join("");
  }

  function renderTable() {
    const visibleColumns = Array.from(state.visibleColumns)
      .map((key) => columnByKey.get(key))
      .filter(Boolean);
    el.tableHead.innerHTML = `<tr>${visibleColumns.map((column) => {
      const sorted = column.key === state.sortKey ? (state.sortDir === "asc" ? " up" : " down") : "";
      const marker = sorted === " up" ? "^" : sorted === " down" ? "v" : "";
      return `<th><button type="button" data-sort="${escapeAttr(column.key)}">${escapeHtml(column.label)} ${marker}</button></th>`;
    }).join("")}</tr>`;
    el.tableHead.querySelectorAll("button[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-sort");
        if (state.sortKey === key) {
          state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        } else {
          state.sortKey = key;
          state.sortDir = columnByKey.get(key)?.numeric ? "desc" : "asc";
        }
        render();
      });
    });

    const rows = state.filteredRows.slice(0, MAX_RENDERED_ROWS);
    if (!rows.length) {
      el.tableBody.innerHTML = `<tr class="empty-row"><td colspan="${visibleColumns.length || 1}">No players match the current query.</td></tr>`;
      return;
    }
    el.tableBody.innerHTML = rows.map((row) => {
      const cells = visibleColumns.map((column) => {
        const classNames = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
        return `<td class="${escapeAttr(classNames)}">${formatCell(row, column)}</td>`;
      }).join("");
      return `<tr>${cells}</tr>`;
    }).join("");
  }

  function renderFilterLists() {
    renderCheckboxList(el.countryList, state.countries, state.countrySelected, state.countrySearch, "country");
    renderCheckboxList(el.leagueList, state.leagues, state.leagueSelected, state.leagueSearch, "league");
    el.includePotentialLatino.checked = state.includePotentialLatino;
    el.countryCount.textContent = `${state.countrySelected.size}/${state.countries.length} selected`;
    el.leagueCount.textContent = `${state.leagueSelected.size}/${state.leagues.length} selected`;
  }

  function renderCheckboxList(container, values, selectedSet, filterText, type) {
    const filterNorm = normalize(filterText);
    const shownValues = values.filter((value) => !filterNorm || normalize(value).includes(filterNorm));
    container.innerHTML = shownValues.map((value) => {
      const id = `${type}-${cssId(value)}`;
      return `
        <label for="${escapeAttr(id)}">
          <input id="${escapeAttr(id)}" type="checkbox" data-${type}="${escapeAttr(value)}" ${selectedSet.has(value) ? "checked" : ""}>
          <span>${escapeHtml(value)}</span>
        </label>
      `;
    }).join("");
    container.querySelectorAll(`input[data-${type}]`).forEach((input) => {
      input.addEventListener("change", () => {
        const value = input.getAttribute(`data-${type}`);
        if (input.checked) selectedSet.add(value);
        else selectedSet.delete(value);
        render();
      });
    });
  }

  function renderColumnList() {
    el.columnList.innerHTML = columns.map((column) => {
      const id = `column-${cssId(column.key)}`;
      return `
        <label for="${escapeAttr(id)}">
          <input id="${escapeAttr(id)}" type="checkbox" data-column="${escapeAttr(column.key)}" ${state.visibleColumns.has(column.key) ? "checked" : ""}>
          <span>${escapeHtml(column.group)} / ${escapeHtml(column.label)}</span>
        </label>
      `;
    }).join("");
    el.columnList.querySelectorAll("input[data-column]").forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.getAttribute("data-column");
        if (input.checked) state.visibleColumns.add(key);
        else state.visibleColumns.delete(key);
        renderTable();
      });
    });
  }

  function syncInputs() {
    el.searchInput.value = state.search;
    el.ageMin.value = Number.isFinite(state.ageMin) ? state.ageMin : "";
    el.orbMin.value = Number.isFinite(state.orbMin) ? state.orbMin : "";
    el.astMin.value = Number.isFinite(state.astMin) ? state.astMin : "";
    el.perMin.value = Number.isFinite(state.perMin) ? state.perMin : "";
    el.atoMin.value = Number.isFinite(state.atoMin) ? state.atoMin : "";
    el.includePotentialLatino.checked = state.includePotentialLatino;
  }

  function runLatinoBigsQuery() {
    applyLatinoBigsState();
    syncInputs();
    renderFilterLists();
    render();
  }

  function applyLatinoBigsState() {
    state.countrySelected = new Set(getPresentLatinoCountries());
    state.leagueSelected = new Set(state.leagues);
    state.includePotentialLatino = true;
    state.excludeEuro = false;
    state.excludeAsia = false;
    state.search = "";
    state.ageMin = 22.5;
    state.orbMin = 18;
    state.astMin = 13;
    state.perMin = 25;
    state.atoMin = 1.5;
    state.sortKey = "per";
    state.sortDir = "desc";
  }

  function copyQueryLink() {
    updateUrl();
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        el.copyQuery.textContent = "Copied";
        window.setTimeout(() => {
          el.copyQuery.textContent = "Copy query link";
        }, 1100);
      }).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    window.prompt("Copy this query link", text);
  }

  function readQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preset") === "latino-bigs") {
      applyLatinoBigsState();
      return;
    }
    state.search = params.get("q") || state.search;
    state.ageMin = parseOptionalNumber(params.get("ageMin") ?? state.ageMin);
    state.orbMin = parseOptionalNumber(params.get("orbMin"));
    state.astMin = parseOptionalNumber(params.get("astMin"));
    state.perMin = parseOptionalNumber(params.get("perMin"));
    state.atoMin = parseOptionalNumber(params.get("atoMin"));
    state.includePotentialLatino = params.get("potential") === "1";
    state.excludeEuro = params.get("excludeEuro") === "1";
    state.excludeAsia = params.get("excludeAsia") === "1";
    if (params.has("countries")) {
      state.countrySelected = new Set(params.get("countries").split("|").filter(Boolean));
    }
    if (params.has("leagues")) {
      state.leagueSelected = new Set(params.get("leagues").split("|").filter(Boolean));
    }
    const sort = params.get("sort");
    if (sort) {
      const [key, dir] = sort.split(":");
      if (columnByKey.has(key)) {
        state.sortKey = key;
        state.sortDir = dir === "asc" ? "asc" : "desc";
      }
    }
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (isLatinoBigsPreset()) {
      params.set("preset", "latino-bigs");
      const nextPreset = `${window.location.pathname}?${params}`;
      window.history.replaceState(null, "", nextPreset);
      return;
    }
    if (state.search) params.set("q", state.search);
    if (Number.isFinite(state.ageMin) && state.ageMin !== 22.5) params.set("ageMin", String(state.ageMin));
    if (Number.isFinite(state.orbMin)) params.set("orbMin", String(state.orbMin));
    if (Number.isFinite(state.astMin)) params.set("astMin", String(state.astMin));
    if (Number.isFinite(state.perMin)) params.set("perMin", String(state.perMin));
    if (Number.isFinite(state.atoMin)) params.set("atoMin", String(state.atoMin));
    if (state.includePotentialLatino) params.set("potential", "1");
    if (state.excludeEuro) params.set("excludeEuro", "1");
    if (state.excludeAsia) params.set("excludeAsia", "1");
    if (state.countrySelected.size !== state.countries.length) {
      params.set("countries", Array.from(state.countrySelected).join("|"));
    }
    if (state.leagueSelected.size !== state.leagues.length) {
      params.set("leagues", Array.from(state.leagueSelected).join("|"));
    }
    if (state.sortKey !== "prpg" || state.sortDir !== "desc") params.set("sort", `${state.sortKey}:${state.sortDir}`);
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
    window.history.replaceState(null, "", next);
  }

  function isLatinoBigsPreset() {
    const presentLatino = getPresentLatinoCountries();
    return state.search === ""
      && Number.isFinite(state.ageMin) && state.ageMin === 22.5
      && Number.isFinite(state.orbMin) && state.orbMin === 18
      && Number.isFinite(state.astMin) && state.astMin === 13
      && Number.isFinite(state.perMin) && state.perMin === 25
      && Number.isFinite(state.atoMin) && state.atoMin === 1.5
      && state.includePotentialLatino
      && !state.excludeEuro
      && !state.excludeAsia
      && state.sortKey === "per"
      && state.sortDir === "desc"
      && setEquals(state.leagueSelected, new Set(state.leagues))
      && setEquals(state.countrySelected, new Set(presentLatino));
  }

  function getPresentLatinoCountries() {
    return state.countries.filter((country) => LATINO_COUNTRIES.has(country));
  }

  function setEquals(left, right) {
    if (left.size !== right.size) return false;
    for (const item of left) {
      if (!right.has(item)) return false;
    }
    return true;
  }

  function removeLeaguesByTerms(terms) {
    state.leagueSelected = new Set(Array.from(state.leagueSelected).filter((league) => {
      const norm = normalize(league);
      return !terms.some((term) => norm.includes(term));
    }));
  }

  function hasLeagueTerms(row, terms) {
    return terms.some((term) => row._leagueNorm.includes(term));
  }

  function hasPotentialLatinoName(name) {
    const normalized = normalize(name);
    const tokens = normalized.split(/[^a-z]+/).filter(Boolean);
    return tokens.some((token) => LATINO_NAME_ROOTS.has(token));
  }

  function splitList(value) {
    const text = String(value || "").trim();
    if (!text) return ["Unknown"];
    return text.split(/\s*\/\s*/).map((item) => item.trim()).filter(Boolean);
  }

  function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  }

  function formatCell(row, column) {
    if (column.render) return column.render(row);
    const value = row[column.key];
    if (value == null || value === "" || (typeof value === "number" && !Number.isFinite(value))) return "";
    if (column.pctOne) return `${(value * 100).toFixed(1)}%`;
    if (column.numeric) return formatNumber(value, column.decimals ?? 1);
    return escapeHtml(value);
  }

  function renderPlayer(row) {
    const url = row.realgm_summary_url || "#";
    const note = row.potentialLatinoName && !row.verifiedLatino
      ? `<span class="subflag">potential name match</span>`
      : "";
    return `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(row.player_name)}</a>${note}`;
  }

  function formatNumber(value, decimals) {
    if (!Number.isFinite(value)) return "";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function formatHeight(value) {
    if (!Number.isFinite(value)) return "";
    const feet = Math.floor(value / 12);
    const inches = Math.round(value % 12);
    return `${feet}'${inches}"`;
  }

  function parseOptionalNumber(value) {
    if (value == null || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function cssId(value) {
    return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "blank";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }
})();
