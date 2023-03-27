-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signature" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Chain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rpc" TEXT NOT NULL,
    "explore" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ecosystem" (
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
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Ecosystem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ecosystem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ecosystemId" INTEGER NOT NULL,
    "homepage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "networkId" INTEGER NOT NULL,
    "remarks" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Job_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Chain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
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

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fp_number" TEXT,
    "address" TEXT NOT NULL,
    "mnemonic" TEXT,
    "p_key" TEXT,
    "user_id" INTEGER NOT NULL,
    "mm_pwd" TEXT NOT NULL,
    CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobDone" (
    "walletId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("walletId", "jobId"),
    CONSTRAINT "JobDone_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JobDone_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_JobToWallet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JobToWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JobToWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "Wallet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_signature_key" ON "User"("signature");

-- CreateIndex
CREATE UNIQUE INDEX "Account_fp_number_key" ON "Account"("fp_number");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToWallet_AB_unique" ON "_JobToWallet"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToWallet_B_index" ON "_JobToWallet"("B");
