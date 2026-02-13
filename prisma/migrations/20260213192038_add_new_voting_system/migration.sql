/*
  Warnings:

  - A unique constraint covering the columns `[profileId,mediaId]` on the table `ViewingHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastWatchedAt` to the `ViewingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "criticalScore" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ViewingHistory" ADD COLUMN     "lastWatchedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserReview_mediaId_idx" ON "UserReview"("mediaId");

-- CreateIndex
CREATE INDEX "UserReview_userId_idx" ON "UserReview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserReview_userId_mediaId_key" ON "UserReview"("userId", "mediaId");

-- CreateIndex
CREATE INDEX "ViewingHistory_profileId_lastWatchedAt_idx" ON "ViewingHistory"("profileId", "lastWatchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ViewingHistory_profileId_mediaId_key" ON "ViewingHistory"("profileId", "mediaId");

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
