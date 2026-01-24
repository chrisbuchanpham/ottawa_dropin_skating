const DATA_URL = "./data/latest.json";
const FALLBACK_DATA_URL =
  "https://raw.githubusercontent.com/chrisbuchanpham/ottawa_dropin_skating/main/data/latest.json";
const EXCLUDED_TERMS = [
  "ringette",
  "figure skate",
  "figure skating",
  "roller skate",
  "roller skating",
  "50+",
  "50 +",
  "50-plus",
  "50 plus",
  "50plus",
];
const LATEST_START_TIME = "22:00";
const HOCKEY_TERMS = [
  "hockey",
  "pick-up hockey",
  "pickup hockey",
  "stick and puck",
  "stick & puck",
  "shinny",
];
const YOUTH_HOCKEY_TERMS = [
  "youth",
  "child",
  "children",
  "preschool",
  "family hockey",
  "youth and adult",
  "ages 6",
  "6 to 12",
  "13 to 17",
];

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

const NEIGHBOURHOOD_WEST_EAST_ORDER = [
  "Carp",
  "Dunrobin",
  "Fitzroy Harbour",
  "Constance Bay",
  "Woodlawn",
  "Kanata",
  "Bells Corners",
  "Stittsville",
  "Richmond",
  "Munster",
  "Nepean",
  "Barrhaven",
  "Manotick",
  "North Gower",
  "Kars",
  "Osgoode",
  "Metcalfe",
  "Greely",
  "Vernon",
  "Kenmore",
  "Findlay Creek",
  "Riverside South",
  "Hunt Club",
  "Alta Vista",
  "Carleton Heights",
  "Carlington",
  "Britannia",
  "Bayshore",
  "Westboro",
  "Hintonburg",
  "Little Italy",
  "Chinatown",
  "Downtown",
  "The Glebe",
  "Old Ottawa South",
  "Old Ottawa East",
  "Sandy Hill",
  "ByWard Market",
  "Lowertown",
  "New Edinburgh",
  "Rockcliffe",
  "Vanier",
  "Overbrook",
  "Manor Park",
  "Beacon Hill",
  "Blackburn Hamlet",
  "Gloucester",
  "Orleans",
  "Navan",
  "Cumberland",
  "Rural Ottawa",
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

const FACILITY_RESERVATION_OVERRIDES = {
  "bob macquarrie recreation complex": false,
  "bob-macquarrie-recreation-complex-orleans": false,
};

const RESERVATION_NOT_REQUIRED_TERMS = [
  "reservation not required",
  "reservations not required",
  "no reservation required",
  "no reservations required",
  "no reservation",
  "no reservations",
  "walk-in",
];
const RESERVATION_REQUIRED_TERMS = ["reservation required", "reservations required"];
const DEFAULT_DISTANCE_KM = 15;
const MAX_DISTANCE_KM = 50;

function normalizeMatchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeForSearch(value) {
  return normalizeMatchText(value).replace(/skating/g, "skate");
}

function includesAny(haystack, terms) {
  return terms.some((term) => haystack.includes(term));
}

function buildActivityHaystack(activity) {
  return normalizeForSearch(
    [
      activity.name || "",
      activity.rawActivity || "",
      activity.rawScheduleGroup || "",
      activity.rawSchedule || "",
    ].join(" ")
  );
}

function parseISODateToUTC(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map((value) => Number(value));
  if (parts.length !== 3 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(Date.UTC(year, month - 1, day));
}

function getLocalIsoDate(dateObj) {
  const local = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function getWeekdayUTC(dateObj) {
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][
    dateObj.getUTCDay()
  ];
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
  return includesAny(haystack, EXCLUDED_TERMS);
}

function deriveReservationRequired(activity, facility) {
  const nameKey = normalizeMatchText((facility && facility.name) || "");
  const urlKey = normalizeMatchText(activity.facilityUrl || "");
  for (const [key, value] of Object.entries(FACILITY_RESERVATION_OVERRIDES)) {
    if (nameKey.includes(key) || urlKey.includes(key)) {
      return value;
    }
  }

  const haystack = buildActivityHaystack(activity);
  if (includesAny(haystack, RESERVATION_NOT_REQUIRED_TERMS)) {
    return false;
  }
  if (includesAny(haystack, RESERVATION_REQUIRED_TERMS)) {
    return true;
  }
  if ((activity.reservationLinks || []).length > 0) {
    return true;
  }
  return false;
}

function activityMatchesCategory(activity, category) {
  const haystack = buildActivityHaystack(activity);
  if (activityExcluded(haystack)) {
    return false;
  }
  const hasHockey = includesAny(haystack, HOCKEY_TERMS);
  const isYouthHockey = hasHockey && includesAny(haystack, YOUTH_HOCKEY_TERMS);
  if (category === "adult-hockey") {
    return hasHockey && !isYouthHockey;
  }
  if (category === "youth-hockey") {
    return isYouthHockey;
  }
  if (category === "skating") {
    return haystack.includes("skate") && !hasHockey;
  }
  return true;
}

function activityOnDate(activity, dateObj) {
  const weekday = (activity.weekday || "").toLowerCase();
  if (!weekday || getWeekdayUTC(dateObj) !== weekday) {
    return false;
  }
  const start = parseISODateToUTC(activity.startDate);
  if (start && dateObj < start) {
    return false;
  }
  const end = parseISODateToUTC(activity.endDate);
  if (end && dateObj > end) {
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
  const start = parseISODateToUTC(startDate);
  const end = parseISODateToUTC(endDate || startDate);
  if (!start || !end) {
    return dates;
  }
  for (let current = new Date(start); current <= end; current.setUTCDate(current.getUTCDate() + 1)) {
    dates.push(new Date(current));
  }
  return dates;
}

function buildRows(dates, data, category) {
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
    const isoDate = dateObj.toISOString().slice(0, 10);
    for (const activity of data.activity || []) {
      if (!activityOnDate(activity, dateObj)) {
        continue;
      }
      if (!activityMatchesCategory(activity, category)) {
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
        reservation_required: deriveReservationRequired(activity, facility),
        reservation_links: (activity.reservationLinks || []).join(";"),
        facility_latitude: facility.latitude ?? "",
        facility_longitude: facility.longitude ?? "",
      });
    }
  }
  return rows;
}

function dedupeRows(rows) {
  const seen = new Set();
  const deduped = [];
  for (const row of rows) {
    const key = [
      row.date,
      row.facility_url,
      row.start_time,
      row.end_time,
      row.activity_name,
    ].join("|");
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(row);
  }
  return deduped;
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
  const orderedBase = NEIGHBOURHOOD_WEST_EAST_ORDER.filter((name) =>
    neighbourhoods.has(name)
  );
  const remaining = Array.from(neighbourhoods).filter(
    (name) => !NEIGHBOURHOOD_WEST_EAST_ORDER.includes(name)
  );
  remaining.sort((a, b) => {
    const aVal = averages[a] ?? 999;
    const bVal = averages[b] ?? 999;
    return aVal === bVal ? a.localeCompare(b) : aVal - bVal;
  });
  const ordered = orderedBase.concat(remaining);
  const orderMap = {};
  ordered.forEach((name, idx) => {
    orderMap[name] = idx;
  });
  return orderMap;
}

function sortRows(rows, orderMap, { useDistance = false } = {}) {
  return rows.sort((a, b) => {
    const orderA = orderMap[a.neighbourhood] ?? 9999;
    const orderB = orderMap[b.neighbourhood] ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
    if (useDistance) {
      const distA = a.distance_km ?? Number.POSITIVE_INFINITY;
      const distB = b.distance_km ?? Number.POSITIVE_INFINITY;
      if (distA !== distB) return distA - distB;
    }
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.start_time !== b.start_time) return a.start_time.localeCompare(b.start_time);
    if (a.facility_name !== b.facility_name) return a.facility_name.localeCompare(b.facility_name);
    return a.activity_name.localeCompare(b.activity_name);
  });
}

function parseHour(startTime) {
  if (!startTime) return null;
  const parts = startTime.split(":").map((value) => Number(value));
  if (parts.length < 2 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  return parts[0];
}

function parseTimeToMinutes(timeValue) {
  if (!timeValue) return null;
  const parts = timeValue.split(":").map((value) => Number(value));
  if (parts.length < 2 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  const [hour, minute] = parts;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }
  return hour * 60 + minute;
}

function matchesTimeOfDay(row, filters) {
  if (!filters.length) {
    return true;
  }
  const hour = parseHour(row.start_time);
  if (hour === null) {
    return false;
  }
  const isMorning = hour < 12;
  const isAfternoon = hour >= 12 && hour < 18;
  const isEvening = hour >= 18;
  return (
    (filters.includes("morning") && isMorning) ||
    (filters.includes("afternoon") && isAfternoon) ||
    (filters.includes("evening") && isEvening)
  );
}

function isSessionUpcoming(row, todayIso, nowMinutes) {
  if (row.date !== todayIso) {
    return true;
  }
  const startMinutes = parseTimeToMinutes(row.start_time);
  const endMinutes = parseTimeToMinutes(row.end_time);
  if (endMinutes !== null) {
    return nowMinutes <= endMinutes;
  }
  if (startMinutes !== null) {
    return startMinutes >= nowMinutes;
  }
  return true;
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
    heading.className = "neighbourhood-title";
    container.appendChild(heading);

    const table = document.createElement("table");
    table.className = "results-table";
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th>Reservation</th>
        <th>Activity</th>
        <th>Facility</th>
        <th>Address</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (const row of grouped[neighbourhood]) {
      const tr = document.createElement("tr");

      const cells = [
        { label: "Date", value: formatListDate(row.date) },
        { label: "Start", value: row.start_time },
        { label: "End", value: row.end_time },
      ];
      for (const cell of cells) {
        const td = document.createElement("td");
        td.textContent = cell.value;
        td.setAttribute("data-label", cell.label);
        tr.appendChild(td);
      }

      const reservationTd = document.createElement("td");
      reservationTd.setAttribute("data-label", "Reservation");
      if (row.reservation_required) {
        const links = row.reservation_links ? row.reservation_links.split(";") : [];
        const firstLink = links.find((value) => value.trim()) || "";
        if (firstLink) {
          const a = document.createElement("a");
          a.href = firstLink;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = "Required";
          reservationTd.appendChild(a);
        } else {
          reservationTd.textContent = "Required";
        }
      } else {
        reservationTd.textContent = "No";
      }
      tr.appendChild(reservationTd);

      const activityTd = document.createElement("td");
      activityTd.textContent = row.activity_name;
      activityTd.setAttribute("data-label", "Activity");
      tr.appendChild(activityTd);

      const facilityTd = document.createElement("td");
      facilityTd.setAttribute("data-label", "Facility");
      if (row.facility_url) {
        const link = document.createElement("a");
        link.href = row.facility_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = row.facility_name || row.facility_url;
        facilityTd.appendChild(link);
      } else {
        facilityTd.textContent = row.facility_name;
      }
      tr.appendChild(facilityTd);

      const addressTd = document.createElement("td");
      addressTd.setAttribute("data-label", "Address");
      if (row.facility_address) {
        const link = document.createElement("a");
        const destination = encodeURIComponent(row.facility_address);
        link.href = `https://www.google.com/maps/search/?api=1&query=${destination}`;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = row.facility_address;
        addressTd.appendChild(link);
      } else {
        addressTd.textContent = "";
      }
      tr.appendChild(addressTd);

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

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }
  return response.json();
}

async function fetchData() {
  try {
    return { data: await fetchJson(DATA_URL), source: "local" };
  } catch (error) {
    return { data: await fetchJson(FALLBACK_DATA_URL), source: "remote" };
  }
}

function updateDownloadLink(rows, orderMap, dates, downloadLink) {
  const csv = buildCsv(rows, orderMap);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const start = dates[0] ? dates[0].toISOString().slice(0, 10) : "selection";
  const end = dates[dates.length - 1] ? dates[dates.length - 1].toISOString().slice(0, 10) : start;
  const label = start === end ? start : `${start}_to_${end}`;
  downloadLink.href = url;
  downloadLink.download = `ottawa_dropin_skating_${label}.csv`;
  downloadLink.style.display = "inline-block";
}

function renderNeighbourhoodFilter(rows, orderMap, container, onSelect) {
  const counts = {};
  rows.forEach((row) => {
    counts[row.neighbourhood] = (counts[row.neighbourhood] || 0) + 1;
  });
  const neighbourhoods = Object.keys(counts).sort((a, b) => {
    const orderA = orderMap[a] ?? 9999;
    const orderB = orderMap[b] ?? 9999;
    return orderA === orderB ? a.localeCompare(b) : orderA - orderB;
  });
  if (!neighbourhoods.length) {
    container.style.display = "none";
    return;
  }
  container.style.display = "block";
  container.innerHTML = "";

  const title = document.createElement("div");
  title.className = "filter-title";
  title.textContent = "Filter by Neighbourhood:";
  container.appendChild(title);

  const list = document.createElement("div");
  list.className = "neighbourhood-filter-list";
  container.appendChild(list);

  const buttons = [];
  function addButton(label, count, value) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.dataset.value = value;
    button.textContent = `${label} (${count})`;
    list.appendChild(button);
    buttons.push(button);
    return button;
  }

  addButton("All", rows.length, "__all__").classList.add("active");
  neighbourhoods.forEach((name) => addButton(name, counts[name], name));

  const setActive = (value) => {
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.value === value);
    });
    if (value === "__all__") {
      onSelect(rows);
    } else {
      onSelect(rows.filter((row) => row.neighbourhood === value));
    }
  };

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.value) {
      setActive(target.dataset.value);
    }
  });

  setActive("__all__");
}

const DATE_PATH_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const state = {
  data: null,
  source: "local",
  basePath: "/",
  selection: { start: null, end: null },
  calendarMonth: { year: 0, month: 0 },
  rowsByDate: {},
  dragging: false,
  dragStart: null,
  dragEnd: null,
  dragMoved: false,
  dragShift: false,
  previewRange: null,
  currentLocation: null,
  mapLocation: null,
  locationSource: null,
  maxDistanceKm: null,
  sortByDistance: false,
  locationStatus: "",
  distanceMode: "auto",
  distanceCacheKey: "",
  mapInstance: null,
  mapMarker: null,
};

function ensureTrailingSlash(path) {
  if (!path) return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function detectBasePath() {
  const script = document.querySelector('script[src$="ottawa_dropin_skating.js"]');
  if (script && script.src) {
    try {
      const url = new URL(script.src, window.location.href);
      return ensureTrailingSlash(url.pathname.replace(/[^/]+$/, ""));
    } catch (error) {
      // Fall through to location-based detection.
    }
  }
  const pathname = window.location.pathname || "/";
  const routedDate = getDateFromPath(pathname);
  if (routedDate) {
    const trimmed = pathname.replace(/\/+$/, "");
    return ensureTrailingSlash(trimmed.slice(0, -routedDate.length));
  }
  return ensureTrailingSlash(pathname);
}

function getDateFromPath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  const parts = trimmed.split("/");
  const last = parts[parts.length - 1] || "";
  return isValidIsoDate(last) ? last : null;
}

function isValidIsoDate(dateStr) {
  if (!DATE_PATH_REGEX.test(dateStr)) return false;
  const parsed = parseISODateToUTC(dateStr);
  return parsed && parsed.toISOString().slice(0, 10) === dateStr;
}

function toLocalDateFromIso(iso) {
  if (!iso) return null;
  const parts = iso.split("-").map((value) => Number(value));
  if (parts.length !== 3 || parts.some((value) => Number.isNaN(value))) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function formatShortDate(iso) {
  const date = toLocalDateFromIso(iso);
  if (!date) return iso || "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatLongDate(iso) {
  const date = toLocalDateFromIso(iso);
  if (!date) return iso || "";
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatListDate(iso) {
  const date = toLocalDateFromIso(iso);
  if (!date) return iso || "";
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMonthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function normalizeRange(start, end) {
  if (!start) return { start: null, end: null };
  const finalEnd = end || start;
  return start <= finalEnd ? { start, end: finalEnd } : { start: finalEnd, end: start };
}

function isIsoInRange(iso, start, end) {
  if (!iso || !start || !end) return false;
  return iso >= start && iso <= end;
}

function getActiveFilters() {
  const activityFilter = document.querySelector('input[name="activity-filter"]:checked');
  const timeFilters = Array.from(document.querySelectorAll('input[name="time-filter"]:checked')).map(
    (input) => input.value
  );
  return {
    category: activityFilter ? activityFilter.value : "skating",
    timeFilters,
  };
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function getActiveLocation() {
  if (state.locationSource === "current" && state.currentLocation) {
    return {
      label: "Current location",
      latitude: state.currentLocation.latitude,
      longitude: state.currentLocation.longitude,
    };
  }
  if (state.locationSource === "map" && state.mapLocation) {
    return {
      label: "Map selection",
      latitude: state.mapLocation.latitude,
      longitude: state.mapLocation.longitude,
    };
  }
  if (state.currentLocation) {
    state.locationSource = "current";
    return {
      label: "Current location",
      latitude: state.currentLocation.latitude,
      longitude: state.currentLocation.longitude,
    };
  }
  if (state.mapLocation) {
    state.locationSource = "map";
    return {
      label: "Map selection",
      latitude: state.mapLocation.latitude,
      longitude: state.mapLocation.longitude,
    };
  }
  return null;
}

function computeDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const originLat = toRad(lat1);
  const destLat = toRad(lat2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(originLat) * Math.cos(destLat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function ensureRowDistance(row, location, cacheKey) {
  if (row.distance_key === cacheKey && row.distance_km !== undefined) return row.distance_km;
  const lat = toNumber(row.facility_latitude);
  const lon = toNumber(row.facility_longitude);
  if (lat === null || lon === null) {
    row.distance_km = null;
    row.distance_key = cacheKey;
    return row.distance_km;
  }
  row.distance_km = computeDistanceKm(lat, lon, location.latitude, location.longitude);
  row.distance_key = cacheKey;
  return row.distance_km;
}

function applyLocationFilters(rows, filteredRows) {
  const activeLocation = getActiveLocation();
  const shouldCompute =
    activeLocation && (state.maxDistanceKm !== null || state.sortByDistance);
  if (!shouldCompute) {
    return { rows, filteredRows, activeLocation };
  }
  const maxDistance = state.maxDistanceKm;
  const cacheKey = `${activeLocation.latitude.toFixed(5)},${activeLocation.longitude.toFixed(5)}`;
  state.distanceCacheKey = cacheKey;
  const filterByDistance = (row) => {
    const distance = ensureRowDistance(row, activeLocation, cacheKey);
    if (maxDistance === null) {
      return true;
    }
    if (distance === null) {
      return false;
    }
    return distance <= maxDistance;
  };
  const rowsFiltered = rows.filter(filterByDistance);
  const filteredRowsFiltered = filteredRows.filter(filterByDistance);
  return { rows: rowsFiltered, filteredRows: filteredRowsFiltered, activeLocations };
}

function buildDistanceOrderMap(rows, fallbackOrderMap) {
  const minDistances = {};
  for (const row of rows) {
    if (row.distance_km === null || row.distance_km === undefined) continue;
    const current = minDistances[row.neighbourhood];
    if (current === undefined || row.distance_km < current) {
      minDistances[row.neighbourhood] = row.distance_km;
    }
  }
  const neighbourhoods = Array.from(new Set(rows.map((row) => row.neighbourhood)));
  if (!neighbourhoods.length || !Object.keys(minDistances).length) {
    return null;
  }
  neighbourhoods.sort((a, b) => {
    const distA = minDistances[a];
    const distB = minDistances[b];
    if (distA === undefined && distB === undefined) {
      return (fallbackOrderMap[a] ?? 9999) - (fallbackOrderMap[b] ?? 9999);
    }
    if (distA === undefined) return 1;
    if (distB === undefined) return -1;
    if (distA !== distB) return distA - distB;
    return (fallbackOrderMap[a] ?? 9999) - (fallbackOrderMap[b] ?? 9999);
  });
  const orderMap = {};
  neighbourhoods.forEach((name, idx) => {
    orderMap[name] = idx;
  });
  return orderMap;
}

function buildDisplayOrderMap(rows, facilities) {
  const baseOrder = buildNeighbourhoodOrder(rows, facilities);
  if (!state.sortByDistance) return baseOrder;
  const distanceOrder = buildDistanceOrderMap(rows, baseOrder);
  return distanceOrder || baseOrder;
}

function setCalendarMonthFromIso(iso) {
  const date = toLocalDateFromIso(iso);
  if (!date) return;
  state.calendarMonth = { year: date.getFullYear(), month: date.getMonth() };
}

function shiftCalendarMonth(offset) {
  const { year, month } = state.calendarMonth;
  const next = new Date(year, month + offset, 1);
  state.calendarMonth = { year: next.getFullYear(), month: next.getMonth() };
}

function updateSelectionSummary() {
  const summary = document.getElementById("selection-range");
  if (!summary) return;
  const range = state.previewRange || state.selection;
  if (!range.start) {
    summary.textContent = "No dates selected";
    return;
  }
  const days = iterDates(range.start, range.end).length;
  if (range.start === range.end) {
    summary.textContent = formatShortDate(range.start);
    return;
  }
  summary.textContent = `${formatShortDate(range.start)} - ${formatShortDate(range.end)} (${days} days)`;
}

function updateRouteForSelection(selection, { replace = false } = {}) {
  if (!selection || !selection.start) return;
  const normalized = normalizeRange(selection.start, selection.end);
  const single = normalized.start === normalized.end;
  const url = single ? `${state.basePath}${normalized.start}` : state.basePath;
  updateHistory(replace ? "replaceState" : "pushState", { selection: normalized }, url);
}

function buildCalendarCells(year, month) {
  const cells = [];
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = startOffset - 1; i >= 0; i -= 1) {
    const day = prevMonthDays - i;
    cells.push({ date: new Date(year, month - 1, day), outside: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(year, month, day), outside: false });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, nextDay), outside: true });
    nextDay += 1;
  }
  return cells;
}

function getDensityClass(count, maxCount) {
  if (!count || maxCount <= 0) return "";
  if (maxCount === 1) return "density-1";
  const ratio = count / maxCount;
  if (ratio <= 0.25) return "density-1";
  if (ratio <= 0.5) return "density-2";
  if (ratio <= 0.75) return "density-3";
  return "density-4";
}

function groupRowsByDate(rows) {
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.date]) grouped[row.date] = [];
    grouped[row.date].push(row);
  }
  return grouped;
}

function buildFilteredRowsWithStatus(dates, category, timeFilters) {
  const now = new Date();
  const todayIso = getLocalIsoDate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const allRows = dedupeRows(buildRows(dates, state.data, category));
  const filteredRows = allRows.filter((row) => matchesTimeOfDay(row, timeFilters));
  const rows = filteredRows.filter((row) => isSessionUpcoming(row, todayIso, nowMinutes));
  return { allRows, filteredRows, rows, todayIso };
}

async function ensureData() {
  if (state.data) return state.data;
  const { data, source } = await fetchData();
  state.data = data;
  state.source = source;
  return data;
}

function renderCalendarGrid(counts, maxCount) {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const selection = normalizeRange(state.selection.start, state.selection.end);
  const todayIso = getLocalIsoDate(new Date());
  const { year, month } = state.calendarMonth;
  const cells = buildCalendarCells(year, month);

  for (const cellInfo of cells) {
    const iso = getLocalIsoDate(cellInfo.date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.dataset.date = iso;
    if (cellInfo.outside) button.classList.add("outside-month");
    if (iso === todayIso) button.classList.add("is-today");
    if (selection.start && isIsoInRange(iso, selection.start, selection.end)) {
      button.classList.add("is-selected");
    }

    const count = counts[iso] || 0;
    const densityClass = getDensityClass(count, maxCount);
    if (densityClass) button.classList.add(densityClass);

    button.setAttribute(
      "aria-label",
      `${formatLongDate(iso)}${count ? `, ${count} sessions` : ""}`
    );

    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = cellInfo.date.getDate();
    button.appendChild(dayNumber);

    if (count) {
      const countEl = document.createElement("div");
      countEl.className = "session-count";
      countEl.textContent = `${count} session${count === 1 ? "" : "s"}`;
      button.appendChild(countEl);
    }

    grid.appendChild(button);
  }
}

function applyPreviewHighlight() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  const preview = state.previewRange;
  if (!preview) {
    grid.querySelectorAll(".calendar-day.is-preview").forEach((cell) => {
      cell.classList.remove("is-preview");
    });
    return;
  }
  grid.querySelectorAll(".calendar-day").forEach((cell) => {
    const iso = cell.dataset.date;
    if (!iso) return;
    const isActive = isIsoInRange(iso, preview.start, preview.end);
    cell.classList.toggle("is-preview", isActive);
    cell.classList.toggle("is-selected", isActive);
  });
}

function renderCalendarView() {
  const monthLabel = document.getElementById("month-label");
  if (monthLabel) {
    monthLabel.textContent = formatMonthLabel(state.calendarMonth.year, state.calendarMonth.month);
  }
  updateSelectionSummary();

  const selection = normalizeRange(state.selection.start, state.selection.end);
  if (!selection.start) return;

  const { category, timeFilters } = getActiveFilters();
  const dates = iterDates(selection.start, selection.end);
  let { rows, filteredRows, todayIso } = buildFilteredRowsWithStatus(dates, category, timeFilters);
  const locationFiltered = applyLocationFilters(rows, filteredRows);
  rows = locationFiltered.rows;
  filteredRows = locationFiltered.filteredRows;

  state.rowsByDate = groupRowsByDate(rows);
  const counts = {};
  let maxCount = 0;
  for (const [date, list] of Object.entries(state.rowsByDate)) {
    counts[date] = list.length;
    maxCount = Math.max(maxCount, list.length);
  }

  renderCalendarGrid(counts, maxCount);
  renderRangeListView(rows, dates, filteredRows, todayIso);

  const calendarStatus = document.getElementById("calendar-status");
  if (calendarStatus) {
    const label = state.source === "remote" ? " (fallback data)" : "";
    if (!rows.length) {
      let message = "No matching sessions in that range.";
      if (filteredRows.length && filteredRows.every((row) => row.date === todayIso)) {
        message = "No more sessions for today.";
      }
      calendarStatus.textContent = `${message}${label}`;
    } else {
      calendarStatus.textContent = `Showing ${rows.length} sessions across ${dates.length} day${
        dates.length === 1 ? "" : "s"
      }.${label}`;
    }
  }
}

function renderRangeListView(rows, dates, filteredRows, todayIso) {
  const listLabel = document.getElementById("range-title");
  const status = document.getElementById("status");
  const tableContainer = document.getElementById("results");
  const downloadLink = document.getElementById("download");
  const neighbourhoodFilter = document.getElementById("neighbourhood-filter");

  if (listLabel) {
    const selection = normalizeRange(state.selection.start, state.selection.end);
    if (selection.start === selection.end) {
      listLabel.textContent = `Sessions for ${formatLongDate(selection.start)}`;
    } else {
      listLabel.textContent = `Sessions for ${formatShortDate(selection.start)} - ${formatShortDate(
        selection.end
      )}`;
    }
  }
  if (status) status.textContent = "Loading data...";
  if (tableContainer) tableContainer.innerHTML = "";
  if (downloadLink) downloadLink.style.display = "none";

  if (!rows.length) {
    let message = "No matching sessions.";
    if (filteredRows.length && filteredRows.every((row) => row.date === todayIso)) {
      message = "No more sessions for today.";
    }
    if (status) status.textContent = message;
    if (tableContainer) tableContainer.innerHTML = "";
    if (neighbourhoodFilter) neighbourhoodFilter.style.display = "none";
    return;
  }

  const orderMap = buildDisplayOrderMap(rows, state.data.facility || []);
  sortRows(rows, orderMap, { useDistance: state.sortByDistance });

  const applySelection = (filteredRows) => {
    const label = state.source === "remote" ? " (fallback data)" : "";
    if (status) status.textContent = `Found ${filteredRows.length} sessions.${label}`;
    if (tableContainer) renderTable(filteredRows, orderMap, tableContainer);
    if (downloadLink) updateDownloadLink(filteredRows, orderMap, dates, downloadLink);
  };

  if (!neighbourhoodFilter) {
    applySelection(rows);
    return;
  }
  renderNeighbourhoodFilter(rows, orderMap, neighbourhoodFilter, applySelection);
}

async function updateView() {
  const status = document.getElementById("status");
  const calendarStatus = document.getElementById("calendar-status");
  if (status) status.textContent = "Loading data...";
  if (calendarStatus) calendarStatus.textContent = "Loading data...";
  closeDayModal();

  try {
    await ensureData();
  } catch (error) {
    const message = `Error: ${error.message}. Try a hard refresh or the GitHub Pages site.`;
    if (status) status.textContent = message;
    if (calendarStatus) calendarStatus.textContent = message;
    return;
  }

  renderCalendarView();
}

function updateHistory(method, stateObj, url) {
  try {
    history[method](stateObj, "", url);
  } catch (error) {
    // Ignore history errors (e.g., file://).
  }
}

function setModalOpen(isOpen) {
  document.body.classList.toggle("modal-open", Boolean(isOpen));
}

function openDayModal(dateIso) {
  const modal = document.getElementById("day-modal");
  const title = document.getElementById("modal-title");
  const status = document.getElementById("modal-status");
  const results = document.getElementById("modal-results");
  const filter = document.getElementById("modal-neighbourhood-filter");
  const downloadLink = document.getElementById("modal-download");
  if (!modal || !title || !status || !results) return;

  const rows = state.rowsByDate[dateIso] || [];
  const dates = iterDates(dateIso, dateIso);
  title.textContent = `Sessions on ${formatLongDate(dateIso)}`;
  status.textContent = "";
  results.innerHTML = "";
  if (downloadLink) downloadLink.style.display = "none";
  if (filter) filter.style.display = "none";

  if (!rows.length) {
    status.textContent = "No matching sessions for this day.";
  } else {
    const orderMap = buildDisplayOrderMap(rows, state.data.facility || []);
    sortRows(rows, orderMap, { useDistance: state.sortByDistance });
    const applySelection = (filteredRows) => {
      const label = state.source === "remote" ? " (fallback data)" : "";
      status.textContent = `Found ${filteredRows.length} sessions.${label}`;
      renderTable(filteredRows, orderMap, results);
      if (downloadLink) updateDownloadLink(filteredRows, orderMap, dates, downloadLink);
    };
    if (!filter) {
      applySelection(rows);
    } else {
      renderNeighbourhoodFilter(rows, orderMap, filter, applySelection);
    }
  }

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
  setModalOpen(true);
}

function closeDayModal() {
  const modal = document.getElementById("day-modal");
  if (!modal) {
    setModalOpen(false);
    return;
  }
  if (modal.hasAttribute("open")) {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }
  setModalOpen(false);
}

function setupModalInteractions() {
  const modal = document.getElementById("day-modal");
  const closeButton = document.getElementById("modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", closeDayModal);
  }
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeDayModal();
      }
    });
    modal.addEventListener("cancel", () => {
      closeDayModal();
    });
  }
}

function handleDayClick(dateIso, shiftKey) {
  if (!dateIso) return;
  const selection = normalizeRange(state.selection.start, state.selection.end);
  const isMulti = selection.start && selection.end && selection.start !== selection.end;
  if (shiftKey && selection.start) {
    const range = normalizeRange(selection.start, dateIso);
    state.selection = range;
    state.previewRange = null;
    updateSelectionSummary();
    updateRouteForSelection(range);
    void updateView();
    return;
  }
  if (isMulti && isIsoInRange(dateIso, selection.start, selection.end)) {
    openDayModal(dateIso);
    return;
  }
  const range = { start: dateIso, end: dateIso };
  state.selection = range;
  state.previewRange = null;
  updateSelectionSummary();
  updateRouteForSelection(range);
  void updateView();
}

function finalizeDrag() {
  if (!state.dragging) return;
  const start = state.dragStart;
  const end = state.dragEnd;
  const moved = state.dragMoved;
  const shiftKey = state.dragShift;
  state.dragging = false;
  state.dragStart = null;
  state.dragEnd = null;
  state.dragMoved = false;
  state.dragShift = false;
  state.previewRange = null;

  if (!start) return;
  if (!moved) {
    handleDayClick(start, shiftKey);
    return;
  }

  const range = normalizeRange(start, end);
  state.selection = range;
  updateSelectionSummary();
  updateRouteForSelection(range);
  void updateView();
}

function setupCalendarInteractions() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;

  grid.addEventListener("pointerdown", (event) => {
    const cell = event.target.closest(".calendar-day");
    if (!cell) return;
    const iso = cell.dataset.date;
    if (!iso) return;
    event.preventDefault();
    state.dragging = true;
    state.dragStart = iso;
    state.dragEnd = iso;
    state.dragMoved = false;
    state.dragShift = event.shiftKey;
    state.previewRange = normalizeRange(iso, iso);
    applyPreviewHighlight();
    updateSelectionSummary();
    grid.setPointerCapture(event.pointerId);
  });

  grid.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const cell = target ? target.closest(".calendar-day") : null;
    if (!cell) return;
    const iso = cell.dataset.date;
    if (!iso || iso === state.dragEnd) return;
    state.dragEnd = iso;
    state.dragMoved = state.dragStart !== iso;
    state.previewRange = normalizeRange(state.dragStart, state.dragEnd);
    applyPreviewHighlight();
    updateSelectionSummary();
  });

  grid.addEventListener("pointerup", () => {
    if (!state.dragging) return;
    finalizeDrag();
  });

  grid.addEventListener("pointercancel", () => {
    if (!state.dragging) return;
    state.dragging = false;
    state.previewRange = null;
    updateSelectionSummary();
    renderCalendarView();
  });

  window.addEventListener("pointerup", () => {
    if (state.dragging) finalizeDrag();
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const cell = event.target.closest(".calendar-day");
    if (!cell) return;
    event.preventDefault();
    handleDayClick(cell.dataset.date, event.shiftKey);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
}

function setLocationStatus(message) {
  state.locationStatus = message;
  const status = document.getElementById("location-status");
  if (status) {
    status.textContent = message;
  }
}

function refreshLocationStatus() {
  const status = document.getElementById("location-status");
  if (!status) return;
  if (state.locationStatus) {
    status.textContent = state.locationStatus;
    return;
  }
  const activeLocation = getActiveLocation();
  if (!activeLocation) {
    status.textContent = "Use my location or pick a spot on the map to enable distance filtering.";
    return;
  }
  if (state.maxDistanceKm !== null) {
    status.textContent = `Filtering within ${state.maxDistanceKm} km of ${activeLocation.label}.`;
    return;
  }
  if (state.sortByDistance) {
    status.textContent = `Sorting neighbourhoods by distance to ${activeLocation.label}.`;
    return;
  }
  if (state.distanceMode === "custom") {
    status.textContent = "No distance limit applied.";
    return;
  }
  status.textContent = `Distance options ready for ${activeLocation.label}.`;
}

function syncLocationControls() {
  const activeLocation = getActiveLocation();
  if (state.distanceMode === "auto") {
    state.maxDistanceKm = activeLocation ? DEFAULT_DISTANCE_KM : null;
  }

  const distanceRange = document.getElementById("distance-range");
  const distanceValue = document.getElementById("distance-value");
  if (distanceRange) {
    const value = state.maxDistanceKm === null
      ? MAX_DISTANCE_KM
      : Math.min(Math.max(state.maxDistanceKm, 1), MAX_DISTANCE_KM);
    distanceRange.value = String(value);
    distanceRange.disabled = !activeLocation;
  }
  if (distanceValue) {
    if (state.maxDistanceKm === null || !activeLocation) {
      distanceValue.textContent = "No limit";
    } else {
      distanceValue.textContent = `${distanceRange ? distanceRange.value : state.maxDistanceKm} km`;
    }
  }

  const sortDistance = document.getElementById("sort-distance");
  const hasActiveLocation = Boolean(activeLocation);
  if (sortDistance) {
    if (!hasActiveLocation && state.sortByDistance) {
      state.sortByDistance = false;
    }
    sortDistance.checked = state.sortByDistance;
    sortDistance.disabled = !hasActiveLocation;
  }

  refreshLocationStatus();
}

function setupLocationControls() {
  const useLocation = document.getElementById("use-location");
  if (useLocation) {
    useLocation.addEventListener("click", () => {
      if (!navigator.geolocation) {
        setLocationStatus("Geolocation is not supported in this browser.");
        return;
      }
      setLocationStatus("Requesting your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          state.currentLocation = { latitude, longitude };
          state.locationSource = "current";
          state.distanceMode = "auto";
          state.locationStatus = "Current location updated.";
          if (state.mapInstance && typeof L !== "undefined") {
            state.mapInstance.setView([latitude, longitude], 12);
            if (!state.mapMarker) {
              state.mapMarker = L.marker([latitude, longitude]).addTo(state.mapInstance);
            } else {
              state.mapMarker.setLatLng([latitude, longitude]);
            }
          }
          syncLocationControls();
          void updateView();
        },
        () => {
          setLocationStatus("Unable to access your location. Please allow access or pick a spot on the map.");
          syncLocationControls();
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    });
  }

  const distanceRange = document.getElementById("distance-range");
  const distanceValue = document.getElementById("distance-value");
  const applySliderValue = () => {
    if (!distanceRange) return;
    const rawValue = Number(distanceRange.value);
    if (rawValue >= MAX_DISTANCE_KM) {
      state.maxDistanceKm = null;
    } else {
      state.maxDistanceKm = rawValue;
    }
  };
  const updateDistanceLabel = () => {
    if (!distanceValue || !distanceRange) return;
    if (state.maxDistanceKm === null) {
      distanceValue.textContent = "No limit";
    } else {
      distanceValue.textContent = `${distanceRange.value} km`;
    }
  };
  if (distanceRange) {
    distanceRange.addEventListener("input", () => {
      state.distanceMode = "custom";
      applySliderValue();
      state.locationStatus = "";
      updateDistanceLabel();
    });
    distanceRange.addEventListener("change", () => {
      state.distanceMode = "custom";
      applySliderValue();
      state.locationStatus = "";
      refreshLocationStatus();
      void updateView();
    });
  }

  const sortDistance = document.getElementById("sort-distance");
  if (sortDistance) {
    sortDistance.addEventListener("change", () => {
      if (!getActiveLocation()) {
        sortDistance.checked = false;
        setLocationStatus("Pick a location first.");
        return;
      }
      state.sortByDistance = sortDistance.checked;
      state.locationStatus = "";
      refreshLocationStatus();
      void updateView();
    });
  }

  const mapElement = document.getElementById("location-map");
  if (mapElement && typeof L !== "undefined") {
    const defaultCenter = [45.4215, -75.6972];
    state.mapInstance = L.map(mapElement, { scrollWheelZoom: false }).setView(defaultCenter, 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(state.mapInstance);
    state.mapInstance.on("click", (event) => {
      const { lat, lng } = event.latlng;
      state.mapLocation = { latitude: lat, longitude: lng };
      state.locationSource = "map";
      state.distanceMode = "auto";
      if (!state.mapMarker) {
        state.mapMarker = L.marker([lat, lng]).addTo(state.mapInstance);
      } else {
        state.mapMarker.setLatLng([lat, lng]);
      }
      state.locationStatus = "Map location selected.";
      syncLocationControls();
      void updateView();
    });
  } else if (mapElement) {
    mapElement.textContent = "Map unavailable. Please check your connection.";
  }

  syncLocationControls();
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  state.basePath = detectBasePath();
  const dateFromPath = getDateFromPath(window.location.pathname);
  const todayIso = getLocalIsoDate(new Date());
  const initialDate = dateFromPath || todayIso;
  state.selection = { start: initialDate, end: initialDate };
  setCalendarMonthFromIso(initialDate);
  if (dateFromPath) {
    updateRouteForSelection(state.selection, { replace: true });
  } else {
    updateHistory("replaceState", { selection: state.selection }, state.basePath);
  }

  updateSelectionSummary();
  setupCalendarInteractions();
  setupModalInteractions();
  setupLocationControls();

  const resetButton = document.getElementById("reset-selection");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      const today = getLocalIsoDate(new Date());
      state.selection = { start: today, end: today };
      setCalendarMonthFromIso(today);
      updateSelectionSummary();
      updateRouteForSelection(state.selection);
      void updateView();
    });
  }

  const prevMonth = document.getElementById("prev-month");
  if (prevMonth) {
    prevMonth.addEventListener("click", () => {
      shiftCalendarMonth(-1);
      void updateView();
    });
  }
  const nextMonth = document.getElementById("next-month");
  if (nextMonth) {
    nextMonth.addEventListener("click", () => {
      shiftCalendarMonth(1);
      void updateView();
    });
  }

  document.querySelectorAll('input[name="activity-filter"]').forEach((input) => {
    input.addEventListener("change", () => void updateView());
  });
  document.querySelectorAll('input[name="time-filter"]').forEach((input) => {
    input.addEventListener("change", () => void updateView());
  });

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.selection) {
      state.selection = event.state.selection;
      setCalendarMonthFromIso(state.selection.start);
    } else {
      const routedDate = getDateFromPath(window.location.pathname);
      if (routedDate) {
        state.selection = { start: routedDate, end: routedDate };
        setCalendarMonthFromIso(routedDate);
      } else {
        const today = getLocalIsoDate(new Date());
        state.selection = { start: today, end: today };
        setCalendarMonthFromIso(today);
      }
    }
    updateSelectionSummary();
    void updateView();
  });

  void updateView();
});
