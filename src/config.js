const appConfig = {
  eventsURL: "https://vatboard.estassinos.com/getevents.php",
  metarURL: "https://vatboard.estassinos.com/getmetar.php?icao=",
  atcURL: "https://vatboard.estassinos.com/getdata.php?type=ATC",
  pilotsURL: "https://vatboard.estassinos.com/getdata.php?type=PILOT",
  cidURL: "https://vatboard.estassinos.com/getdata.php?type=CID",
  infoURL: "https://vatboard.estassinos.com/getdata.php?type=INFO",
  serversURL: "https://vatboard.estassinos.com/getdata.php?type=SERVERS",
  callsignURL: "https://vatboard.estassinos.com/getdata.php?type=CALLSIGN&q=",
  clientsURL: "https://vatboard.estassinos.com/getdata.php?type=ALL",
  apiURL: "https://vatboard.estassinos.com",
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
};

export default appConfig;
