const appConfig = {
  eventsURL: "https://vatboard.estassinos.com/getevents.php",
  clientsURL: "https://vatboard.estassinos.com/getpilots.php",
  cidsURL: "https://vatboard.estassinos.com/getcids.php?cids=",
  metarURL: "https://vatboard.estassinos.com/getmetar.php?icao=",
  friendsCID: "1041728,837997,819311,810670,810309,898093,827599,1463640",
  status: {
    PILOT:
      '<span class="badge badge-success badge-outline font-semibold">PILOT</span>',
    ATC: '<span class="badge badge-success font-semibold">ATC</span>',
  },
  refreshInterval: 300000,
};

export default appConfig;
