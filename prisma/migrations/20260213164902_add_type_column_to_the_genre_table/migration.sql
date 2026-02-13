-- CreateEnum
CREATE TYPE "GenreType" AS ENUM ('MOVIE', 'EPISODE', 'TRACK');

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "type" "GenreType" NOT NULL DEFAULT 'MOVIE';
