## Overview

Project ini ditunjukan untuk dalam rangka mengikut proses _Technical Test_ di PT Akhdani Reka Solusi.

## Stacks
- NextJS
- PostgreSQL

## How to Run

Set environment variables

```
cp .env.example .env
```

Build and run the application via `docker compose`:

```
docker compose up app-release db -d --build
```

Akses via browser:

```http
http://localhost:3000
```

## Screenshots
