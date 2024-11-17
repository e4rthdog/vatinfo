const appConfig = {
  eventsURL: "https://apps.estassinos.com/api/vatinfo-api/getevents.php",
  metarURL: "https://apps.estassinos.com/api/vatinfo-api/getmetar.php?icao=",
  atcURL: "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=ATC",
  pilotsURL:
    "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=PILOT",
  cidURL: "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=CID",
  infoURL: "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=INFO",
  serversURL:
    "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=SERVERS",
  callsignURL:
    "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=CALLSIGN&q=",
  clientsURL:
    "https://apps.estassinos.com/api/vatinfo-api/getdata.php?type=ALL",
  apiURL: "https://apps.estassinos.com/api/vatinfo-api",
  status: {
    PILOT: "flight",
    ATC: "settings_input_antenna",
  },
  metarCategory: {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  },
  refreshInterval: 15 * 60 * 1000,
  vatsimDivisions: {
    BRZ: "Brazil (VATBRZ)",
    CAM: "Central America",
    CAN: "Canada",
    CAR: "Caribbean",
    EUD: "Europe (except UK)",
    GBR: "United Kingdom",
    IL: "Israel (VATIL)",
    JPN: "Japan",
    KOR: "Korea",
    MCO: "Mexico",
    MENA: "Middle East and North Africa",
    NZ: "New Zealand (VATNZ)",
    PAC: "Australia (VATPAC)",
    PRC: "People's Republic of China",
    ROC: "Republic of China (Taiwan)",
    RUS: "Russia",
    SAM: "South America",
    SEA: "Southeast Asia (VATSEA)",
    SSA: "Sub-Sahara Africa",
    USA: "United States",
    WA: "West Asia",
  },
};

export default appConfig;
