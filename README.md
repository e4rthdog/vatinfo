# VATINFO

A web app that provides VATSIM inforamtion in panel-like layout.
![image](https://user-images.githubusercontent.com/1651764/187764897-74b273e4-c3cc-4f5d-938a-0290d5e2fa57.png)

See the [WIKI INTRODUCTION](https://github.com/e4rthdog/vatinfo/wiki/Introduction) page for help and instructions.

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

## Customize the configuration

---

Configuration file : `config.sys`

The file contains the endpoints for the api calls.
Head over to [VATINFO API](https://github.com/e4rthdog/vatinfo-api) project if you want to create your own endpoints. The API is quick dirty for now in order to get VATINFO working. Will probably change it in the future to a laravel project.

Change `refreshInterval` to control the time between automatic updates.
