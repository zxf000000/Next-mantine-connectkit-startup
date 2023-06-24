/*
  Warnings:

  - You are about to drop the column `paassword` on the `SocialAccout` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialAccout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fp_number" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "password" TEXT,
    "gmail" TEXT,
    "verifier" TEXT,
    "assist_email" TEXT,
    "twitter" TEXT,
    "discord_token" TEXT,
    "username" TEXT,
    "ip" TEXT
);
INSERT INTO "new_SocialAccout" ("assist_email", "country", "discord_token", "fp_number", "gmail", "id", "ip", "phone", "twitter", "username", "verifier") SELECT "assist_email", "country", "discord_token", "fp_number", "gmail", "id", "ip", "phone", "twitter", "username", "verifier" FROM "SocialAccout";
DROP TABLE "SocialAccout";
ALTER TABLE "new_SocialAccout" RENAME TO "SocialAccout";
CREATE UNIQUE INDEX "SocialAccout_fp_number_key" ON "SocialAccout"("fp_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
