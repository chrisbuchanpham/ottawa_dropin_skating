const DATA_URL = "https://data.ottrec.ca/export/latest.json";
const EXCLUDED_TERMS = ["hockey", "50+", "50 +", "50-plus", "50 plus", "50plus"];
const LATEST_START_TIME = "22:00";
const DEFAULT_KEYWORDS = ["drop-in skating", "family skating", "public skating"];

const NEIGHBOURHOOD_KEYWORDS = [
  ["Carp", ["carp", "w. erskine johnston"]],
  ["Dunrobin", ["dunrobin", "pinhey", "pinhey's point"]],
  ["Fitzroy Harbour", ["fitzroy harbour", "fitzroy"]],
  ["Constance Bay", ["constance bay", "buckham", "buckham's bay"]],
  ["Woodlawn", ["woodlawn"]],
  ["Kanata", ["kanata", "katimavik", "beaverbrook", "bridlewood", "hazeldean", "march"]],
  ["Bells Corners", ["bells corners", "corkstown"]],
  ["Stittsville", ["stittsville", "goulbourn", "fernbank"]],
  ["Richmond", ["richmond"]],
  ["Munster", ["munster"]],
  ["Nepean", ["nepean", "merivale", "centrepointe", "arlington woods", "tanglewood"]],
  ["Barrhaven", ["barrhaven", "stonebridge", "longfields", "strandherd", "chapman mills"]],
  ["Manotick", ["manotick"]],
  ["North Gower", ["north gower", "alfred taylor"]],
  ["Kars", ["kars"]],
  ["Osgoode", ["osgoode"]],
  ["Metcalfe", ["metcalfe"]],
  ["Greely", ["greely"]],
  ["Vernon", ["vernon"]],
  ["Kenmore", ["kenmore"]],
  ["Findlay Creek", ["findlay creek"]],
  ["Riverside South", ["riverside south", "riverside-south"]],
  ["Hunt Club", ["hunt club", "blossom park", "south keys"]],
  ["Alta Vista", ["alta vista", "elmvale", "riverview", "heron", "canterbury"]],
  ["Carleton Heights", ["carleton heights"]],
  ["Carlington", ["carlington"]],
  ["Britannia", ["britannia", "crystal beach", "lincoln heights"]],
  ["Bayshore", ["bayshore", "queensway terrace"]],
  ["Westboro", ["westboro", "mckellar"]],
  ["Hintonburg", ["hintonburg", "mechanicsville"]],
  ["Little Italy", ["little italy", "preston"]],
  ["Chinatown", ["chinatown", "somerset"]],
  ["Downtown", ["downtown", "centretown", "golden triangle", "lansdowne"]],
  ["The Glebe", ["glebe"]],
  ["Old Ottawa South", ["old ottawa south"]],
  ["Old Ottawa East", ["old ottawa east"]],
  ["Sandy Hill", ["sandy hill", "uottawa", "university of ottawa"]],
  ["ByWard Market", ["byward", "market"]],
  ["Lowertown", ["lowertown"]],
  ["New Edinburgh", ["new edinburgh"]],
  ["Rockcliffe", ["rockcliffe"]],
  ["Vanier", ["vanier"]],
  ["Overbrook", ["overbrook"]],
  ["Manor Park", ["manor park"]],
  ["Beacon Hill", ["beacon hill"]],
  ["Blackburn Hamlet", ["blackburn", "blackburn hamlet"]],
  ["Gloucester", ["gloucester", "shefford", "blossom park"]],
  ["Orleans", ["orleans", "chapel hill", "avalon"]],
  ["Navan", ["navan", "bearbrook"]],
  ["Cumberland", ["cumberland"]],
];

const FACILITY_NEIGHBOURHOOD_OVERRIDES = {
  "bob macquarrie recreation complex": "Orleans",
  "bob-macquarrie-recreation-complex-orleans": "Orleans",
  "navan memorial centre": "Navan",
  "navan-memorial-centre": "Navan",
  "richmond memorial community centre": "Richmond",
  "richmond-memorial-community-centre": "Richmond",
  "jim tubman chevrolet rink": "Alta Vista",
  "jim-tubman-chevrolet-rink": "Alta Vista",
};

const FSA_NEIGHBOURHOOD = {
  K0A: "Rural Ottawa",
  K1B: "Gloucester",
  K1C: "Orleans",
  K1E: "Orleans",
  K1G: "Alta Vista",
  K1H: "Alta Vista",
  K1J: "Beacon Hill",
  K1K: "Overbrook",
  K1L: "Vanier",
  K1M: "Rockcliffe",
  K1N: "Lowertown",
  K1R: "Downtown",
  K1S: "Old Ottawa South",
  K1T: "Hunt Club",
  K1V: "Riverside South",
  K1Y: "Westboro",
  K1Z: "Carlington",
  K2A: "Britannia",
  K2B: "Bayshore",
  K2C: "Nepean",
  K2E: "Nepean",
  K2G: "Barrhaven",
  K2H: "Bells Corners",
  K2J: "Barrhaven",
  K2K: "Kanata",
  K2L: "Kanata",
  K2M: "Kanata",
  K2P: "Downtown",
  K2S: "Stittsville",
  K2V: "Stittsville",
  K3H: "Nepean",
  K4A: "Orleans",
  K4B: "Cumberland",
  K4C: "Navan",
  K4M: "Manotick",
  K4P: "Greely",
};

function parseDateLocal(isoDate) {
  if (!isoDate) {
    return null;
  }
  const parts = isoDate.split("-").map((value) => Number(value));
  if (parts.length !== 3 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function formatDateLocal(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeText(value) {
  return value.toLowerCase().replace(/skating/g, "skate");
}

function normalizeMatchText(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeKeywords(raw) {
  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase().replace(/skating/g, "skate"))
    .filter(Boolean);
}

function extractFsa(address) {
  const match = address.match(/([A-Z]\d[A-Z])\s*\d[A-Z]\d/i) || address.match(/([A-Z]\d[A-Z])/i);
  return match ? match[1].toUpperCase() : "";
}

function detectNeighbourhood(facility) {
  const nameKey = normalizeMatchText(facility.name || "");
  const urlKey = normalizeMatchText(facility.url || "");
  for (const [key, neighbourhood] of Object.entries(FACILITY_NEIGHBOURHOOD_OVERRIDES)) {
    if (nameKey.includes(key) || urlKey.includes(key)) {
      return neighbourhood;
    }
  }
  const haystack = normalizeMatchText(
    [facility.name || "", facility.address || "", facility.url || ""].join(" ")
  );
  for (const [neighbourhood, keywords] of NEIGHBOURHOOD_KEYWORDS) {
    for (const keyword of keywords) {
      if (haystack.includes(keyword)) {
        return neighbourhood;
      }
    }
  }
  const fsa = extractFsa(facility.address || "");
  if (fsa && FSA_NEIGHBOURHOOD[fsa]) {
    return FSA_NEIGHBOURHOOD[fsa];
  }
  return "Downtown";
}

function activityExcluded(haystack) {
  return EXCLUDED_TERMS.some((term) => haystack.includes(term));
}

function activityMatches(activity, keywords) {
  const haystack = normalizeText(
    [
      activity.name || "",
      activity.rawActivity || "",
      activity.rawScheduleGroup || "",
      activity.rawSchedule || "",
    ].join(" ")
  );
  if (activityExcluded(haystack)) {
    return false;
  }
  for (const keyword of keywords) {
    if (keyword.includes(" ")) {
      const parts = keyword.split(/\s+/).filter(Boolean);
      if (parts.every((part) => haystack.includes(part))) {
        return true;
      }
    } else if (haystack.includes(keyword)) {
      return true;
    }
  }
  return false;
}

function activityOnDate(activity, dateObj) {
  const weekday = (activity.weekday || "").toLowerCase();
  if (!weekday || dateObj.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase() !== weekday) {
    return false;
  }
  const startDate = parseDateLocal(activity.startDate);
  if (startDate && dateObj < startDate) {
    return false;
  }
  const endDate = parseDateLocal(activity.endDate);
  if (endDate && dateObj > endDate) {
    return false;
  }
  if (activity.startTime && activity.startTime >= LATEST_START_TIME) {
    return false;
  }
  return true;
}

function iterDates(startDate, endDate) {
  const dates = [];
  if (!startDate) {
    return dates;
  }
  const start = parseDateLocal(startDate);
  const end = endDate ? parseDateLocal(endDate) : start ? new Date(start) : null;
  if (!start || !end) {
    return dates;
  }
  for (let current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
    dates.push(new Date(current));
  }
  return dates;
}

function buildRows(dates, data, keywords) {
  const facilities = {};
  for (const facility of data.facility || []) {
    facilities[facility.url] = facility;
  }
  const facilityNeighbourhoods = {};
  for (const [url, facility] of Object.entries(facilities)) {
    facilityNeighbourhoods[url] = detectNeighbourhood(facility);
  }
  const rows = [];
  for (const dateObj of dates) {
    const isoDate = formatDateLocal(dateObj);
    for (const activity of data.activity || []) {
      if (!activityOnDate(activity, dateObj)) {
        continue;
      }
      if (!activityMatches(activity, keywords)) {
        continue;
      }
      const facility = facilities[activity.facilityUrl] || {};
      rows.push({
        neighbourhood: facilityNeighbourhoods[activity.facilityUrl] || "Downtown",
        date: isoDate,
        start_time: activity.startTime || "",
        end_time: activity.endTime || "",
        activity_name: activity.name || "",
        raw_activity: activity.rawActivity || "",
        schedule_group: activity.rawScheduleGroup || "",
        facility_name: facility.name || "",
        facility_address: facility.address || "",
        facility_url: activity.facilityUrl || "",
        reservation_required: Boolean(activity.reservationRequired),
        reservation_links: (activity.reservationLinks || []).join(";"),
        facility_latitude: facility.latitude ?? "",
        facility_longitude: facility.longitude ?? "",
      });
    }
  }
  return rows;
}

function buildNeighbourhoodOrder(rows, facilities) {
  const longitudes = {};
  for (const facility of facilities) {
    const neighbourhood = detectNeighbourhood(facility);
    if (typeof facility.longitude === "number") {
      if (!longitudes[neighbourhood]) {
        longitudes[neighbourhood] = [];
      }
      longitudes[neighbourhood].push(facility.longitude);
    }
  }
  for (const row of rows) {
    if (typeof row.facility_longitude === "number") {
      const list = longitudes[row.neighbourhood] || [];
      list.push(row.facility_longitude);
      longitudes[row.neighbourhood] = list;
    }
  }
  const averages = {};
  for (const [neighbourhood, values] of Object.entries(longitudes)) {
    averages[neighbourhood] = values.reduce((a, b) => a + b, 0) / values.length;
  }
  const neighbourhoods = new Set(rows.map((row) => row.neighbourhood));
  const ordered = Array.from(neighbourhoods).sort((a, b) => {
    const aVal = averages[a] ?? 999;
    const bVal = averages[b] ?? 999;
    return aVal === bVal ? a.localeCompare(b) : aVal - bVal;
  });
  const orderMap = {};
  ordered.forEach((name, idx) => {
    orderMap[name] = idx;
  });
  return orderMap;
}

function sortRows(rows, orderMap) {
  return rows.sort((a, b) => {
    const orderA = orderMap[a.neighbourhood] ?? 9999;
    const orderB = orderMap[b.neighbourhood] ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.start_time !== b.start_time) return a.start_time.localeCompare(b.start_time);
    if (a.facility_name !== b.facility_name) return a.facility_name.localeCompare(b.facility_name);
    return a.activity_name.localeCompare(b.activity_name);
  });
}

function renderTable(rows, orderMap, container) {
  container.innerHTML = "";
  if (!rows.length) {
    container.textContent = "No matching sessions.";
    return;
  }
  const grouped = {};
  for (const row of rows) {
    grouped[row.neighbourhood] = grouped[row.neighbourhood] || [];
    grouped[row.neighbourhood].push(row);
  }
  const neighbourhoods = Object.keys(grouped).sort(
    (a, b) => (orderMap[a] ?? 9999) - (orderMap[b] ?? 9999)
  );
  for (const neighbourhood of neighbourhoods) {
    const heading = document.createElement("h3");
    heading.textContent = `Neighbourhood: ${neighbourhood}`;
    container.appendChild(heading);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th>Activity</th>
        <th>Facility</th>
        <th>Address</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (const row of grouped[neighbourhood]) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.start_time}</td>
        <td>${row.end_time}</td>
        <td>${row.activity_name}</td>
        <td>${row.facility_name}</td>
        <td>${row.facility_address}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }
}

function buildCsv(rows, orderMap) {
  const fieldnames = [
    "neighbourhood",
    "date",
    "start_time",
    "end_time",
    "activity_name",
    "raw_activity",
    "schedule_group",
    "facility_name",
    "facility_address",
    "facility_url",
    "reservation_required",
    "reservation_links",
    "facility_latitude",
    "facility_longitude",
  ];
  const grouped = {};
  for (const row of rows) {
    grouped[row.neighbourhood] = grouped[row.neighbourhood] || [];
    grouped[row.neighbourhood].push(row);
  }
  const neighbourhoods = Object.keys(grouped).sort(
    (a, b) => (orderMap[a] ?? 9999) - (orderMap[b] ?? 9999)
  );
  const lines = [];
  lines.push(fieldnames.join(","));
  for (const neighbourhood of neighbourhoods) {
    lines.push(escapeCsvRow({ neighbourhood: `Neighbourhood: ${neighbourhood}` }, fieldnames));
    for (const row of grouped[neighbourhood]) {
      lines.push(escapeCsvRow(row, fieldnames));
    }
  }
  return lines.join("\n");
}

function escapeCsvRow(row, fieldnames) {
  return fieldnames
    .map((field) => {
      let value = row[field] ?? "";
      value = String(value);
      if (value.includes('"') || value.includes(",") || value.includes("\n")) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    })
    .join(",");
}

async function runSearch() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const keywordsInput = document.getElementById("keywords").value;
  const status = document.getElementById("status");
  const tableContainer = document.getElementById("results");
  const downloadLink = document.getElementById("download");

  status.textContent = "Loading data...";
  tableContainer.innerHTML = "";
  downloadLink.style.display = "none";

  const dates = iterDates(startDate, endDate);
  if (!dates.length) {
    status.textContent = "Select a start date.";
    return;
  }
  const keywords = normalizeKeywords(keywordsInput);
  if (!keywords.length) {
    status.textContent = "Enter at least one keyword.";
    return;
  }

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const data = await response.json();
    const rows = buildRows(dates, data, keywords);
    const orderMap = buildNeighbourhoodOrder(rows, data.facility || []);
    sortRows(rows, orderMap);

    const csv = buildCsv(rows, orderMap);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `ottawa_dropin_skating_${formatDateLocal(dates[0])}.csv`;
    downloadLink.style.display = "inline-block";

    status.textContent = `Found ${rows.length} sessions.`;
    renderTable(rows, orderMap, tableContainer);
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}

function setDefaultDates() {
  const today = new Date();
  document.getElementById("start-date").value = formatDateLocal(today);
}

function setDefaultKeywords() {
  document.getElementById("keywords").value = DEFAULT_KEYWORDS.join(", ");
}

document.addEventListener("DOMContentLoaded", () => {
  setDefaultDates();
  setDefaultKeywords();
  document.getElementById("search-button").addEventListener("click", runSearch);
});
