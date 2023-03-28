/*
  Warnings:

  - You are about to drop the column `chain_id` on the `Ecosystem` table. All the data in the column will be lost.
  - Added the required column `chainId` to the `Ecosystem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ecosystem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_ico" BOOLEAN NOT NULL,
    "twitter_fans" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "financing" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Ecosystem_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ecosystem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ecosystem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ecosystem" ("category_id", "description", "financing", "homepage", "id", "is_ico", "logo", "name", "suggestion", "twitter_fans", "user_id") SELECT "category_id", "description", "financing", "homepage", "id", "is_ico", "logo", "name", "suggestion", "twitter_fans", "user_id" FROM "Ecosystem";
DROP TABLE "Ecosystem";
ALTER TABLE "new_Ecosystem" RENAME TO "Ecosystem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
