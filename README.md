# Weather API

## Tech Stack

- [Node.js](https://nodejs.org/) v18
- [PostgreSQL](https://www.postgresql.org/)

## Local Setup

### Requirements

- [Node.js](https://nodejs.org/en/) v18+
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

### Steps to run locally

1. Make sure to use Node v18+ by command `node -v`. We recommend using [VOLTA](https://volta.sh/) to quickly switch to the right version

2. 📦 Install dependencies

   ```bash
   yarn
   ```

3. ⚙ Local config

   1. In the `weather-api` root directory create `.env` file with the next environment variables.<br>
      Except WEATHER_API_KEY all the variables has default value configured in /config/default.js

      ```bash
      LOG_LEVEL=
      PORT=
      PATH_PREFIX=
      ALLOWED_ORIGIN=
      AUTH_SECRET=
      DATABASE_URL=
      DB_SCHEMA_NAME=
      WEATHER_API_URL=
      WEATHER_API_KEY=
      ```

4. 🚢 Start docker-compose with services which are required to start Weather API locally

   ```bash
   yarn services:up
   ```

5. ♻ Init DB

   ```bash
   yarn run init-db
   ```

   This command will create Database tables

   If you need to drop and recreate the tables:

   ```bash
   yarn init-db force
   ```


6. 🚀 Start Weather API

   ```bash
   yarn start
   ```

   Runs the weather api and fetches the weather initially from remote service and populates the potgres db.
   It will schedule a cron job to update weather data everyday.

## Testing

- Use the Postman collection in docs folder
Refer to open api definition in docs/swagger.yaml