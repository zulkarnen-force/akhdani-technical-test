-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PEGAWAI', 'SDM_DIVISION');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('IDR', 'USD');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PEGAWAI',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perdin_requests" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "destination_city_id" UUID NOT NULL,
    "origin_city_id" UUID NOT NULL,
    "arrival_date" DATE NOT NULL,
    "departure_date" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "travel_cost" DECIMAL(10,2),
    "currency" "Currency" DEFAULT 'IDR',

    CONSTRAINT "perdin_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "island_id" UUID NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "is_abroad" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "islands" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "islands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "islands_name_key" ON "islands"("name");

-- AddForeignKey
ALTER TABLE "perdin_requests" ADD CONSTRAINT "perdin_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perdin_requests" ADD CONSTRAINT "perdin_requests_destination_city_id_fkey" FOREIGN KEY ("destination_city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perdin_requests" ADD CONSTRAINT "perdin_requests_origin_city_id_fkey" FOREIGN KEY ("origin_city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_island_id_fkey" FOREIGN KEY ("island_id") REFERENCES "islands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
