/*
  Warnings:

  - Added the required column `userId` to the `Chain` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rpc" TEXT NOT NULL,
    "explore" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Chain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chain" ("chainId", "explore", "id", "name", "rpc") SELECT "chainId", "explore", "id", "name", "rpc" FROM "Chain";
DROP TABLE "Chain";
ALTER TABLE "new_Chain" RENAME TO "Chain";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
