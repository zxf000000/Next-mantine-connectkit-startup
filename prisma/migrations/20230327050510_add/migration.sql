/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assist_email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `discord_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `fp_number` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `gmail` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `paassword` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `verifier` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SocialAccout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fp_number" TEXT,
    "phone" INTEGER,
    "country" TEXT,
    "paassword" TEXT,
    "gmail" TEXT,
    "verifier" TEXT,
    "assist_email" TEXT,
    "twitter" TEXT,
    "discord_token" TEXT,
    "username" TEXT,
    "ip" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fp_number" TEXT,
    "address" TEXT NOT NULL,
    "mnemonic" TEXT,
    "p_key" TEXT,
    "user_id" TEXT NOT NULL,
    "mm_pwd" TEXT NOT NULL,
    CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallet" ("address", "fp_number", "id", "mm_pwd", "mnemonic", "p_key", "user_id") SELECT "address", "fp_number", "id", "mm_pwd", "mnemonic", "p_key", "user_id" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("id") SELECT "id" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE TABLE "new_Ecosystem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "chain_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_ico" BOOLEAN NOT NULL,
    "twitter_fans" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "financing" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Ecosystem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ecosystem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ecosystem" ("category_id", "chain_id", "description", "financing", "homepage", "id", "is_ico", "logo", "name", "suggestion", "twitter_fans", "user_id") SELECT "category_id", "chain_id", "description", "financing", "homepage", "id", "is_ico", "logo", "name", "suggestion", "twitter_fans", "user_id" FROM "Ecosystem";
DROP TABLE "Ecosystem";
ALTER TABLE "new_Ecosystem" RENAME TO "Ecosystem";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_User" ("id", "name", "signature") SELECT "id", "name", "signature" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
CREATE UNIQUE INDEX "User_signature_key" ON "User"("signature");
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ecosystemId" INTEGER NOT NULL,
    "homepage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "networkId" INTEGER NOT NULL,
    "remarks" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Job_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Chain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("description", "ecosystemId", "homepage", "id", "networkId", "remarks", "userId") SELECT "description", "ecosystemId", "homepage", "id", "networkId", "remarks", "userId" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccout_fp_number_key" ON "SocialAccout"("fp_number");
