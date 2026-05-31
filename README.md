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

Production only:

```
docker compose up app-release db -d --build
```

Local development:

```
docker compose up app db -d;
```

Run tests:

```
docker compose exec app sh -c "npm run test"
```

Migrate & seed database:

```sh
docker compose exec app sh -c "npx prisma migrate dev"
docker compose exec app sh -c "npx prisma db seed"
```

Akses via browser:

For production:
```http
http://localhost:3000
```

For local development:
```http
http://localhost:3124
```


## Screenshots


### Auth
<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/2f23bdfb-c823-4280-b4a2-75a15028c0a8" />

<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/9c054620-e442-4f00-a46c-951fb3516b60" />


### SDM
<img width="1872" height="1048" alt="image" src="https://github.com/user-attachments/assets/b4b3d5b8-1223-4287-b8ff-d3dd833ce441" />

<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/c9a0cdb5-cac1-43ef-a332-24074640c13f" />

---
<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/3ec0648e-2fc3-4572-b334-3b9e494b7307" />

<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/a6eb7abd-680f-4ebc-a5ff-2e695e22c98d" />



## Pegawai
<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/ccb143e7-a35b-4b17-86e0-2c87b8740781" />
<img width="1875" height="1048" alt="image" src="https://github.com/user-attachments/assets/b7ec4466-ba69-4a26-baf8-ebd6370f84a6" />
