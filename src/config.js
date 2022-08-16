const appConfig = {
  eventsURL: "https://vatboard.estassinos.com/getevents.php",
  clientsURL: "https://vatboard.estassinos.com/getpilots.php",
  metarURL: "https://vatboard.estassinos.com/getmetar.php?icao=",
  atcURL: "https://vatboard.estassinos.com/getdata.php?type=ATC",
  pilotsURL: "https://vatboard.estassinos.com/getdata.php?type=PILOT",
  cidURL: "https://vatboard.estassinos.com/getdata.php?type=CID",
  infoURL: "https://vatboard.estassinos.com/getdata.php?type=INFO",
  serversURL: "https://vatboard.estassinos.com/getdata.php?type=SERVERS",
  callsignURL: "https://vatboard.estassinos.com/getdata.php?type=CALLSIGN&q=",
  clientsURL: "https://vatboard.estassinos.com/getdata.php?type=ALL",
  apiURL: "https://vatboard.estassinos.com",
  // friendsCID:
  //   "1041728,837997,819311,810670,810309,898093,827599,1463640,1378014,963239,1008143",
  status: {
    PILOT: "flight",
    ATC: "settings_input_antenna",
  },
  refreshInterval: 15 * 60 * 1000,
};

export default appConfig;
