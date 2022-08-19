# VATINFO

A web app that provides VATSIM inforamtion in panel-like layout.
![image](https://user-images.githubusercontent.com/1651764/185201536-26edd561-f583-4e4d-bf4d-26afeb35d0fa.png)


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

Cahnge `refreshInterval` to control the time between automatic updates.
