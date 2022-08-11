const appConfig = {
  eventsURL: "https://vatboard.estassinos.com/getevents.php",
  clientsURL: "https://vatboard.estassinos.com/getpilots.php",
  cidsURL: "https://vatboard.estassinos.com/getcids.php?cids=",
  metarURL: "https://vatboard.estassinos.com/getmetar.php?icao=",
  friendsCID:
    "1041728,837997,819311,810670,810309,898093,827599,1463640,1378014",
  status: {
    PILOT: "flight",
    ATC: "settings_input_antenna",
  },
  refreshInterval: 300000,
};

export default appConfig;
