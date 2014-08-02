idlesync/alaphbetSoup
---
A shared canvas where users can arrange letters, numbers and symbols.

There are two applications here, the `client/` and the `server/`

Installation
---
Server: `cd server` and `make install`

Client: `cd client` and `make install`

Development
---
You can either develop from the top-level project directory or `client/` or `server/`

`.editorconfig` and `.gitignore` have been symlinked to both directories

Client App
---
Edit `client/config.coffee` to include your desired port and domain.

Development: start the application with `make live` and it'll rebuild your changes as you save files.

Production: build the static files with `make build` and have your webserver serve from `public/`.

Server App
---
Start the server with `make live`
