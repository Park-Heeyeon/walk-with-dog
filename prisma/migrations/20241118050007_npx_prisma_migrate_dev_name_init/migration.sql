/*
  Warnings:

  - You are about to alter the column `sendId` on the `Chat` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `nickname` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "sendId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Chat" ("id", "message", "roomId", "sendId", "timestamp") SELECT "id", "message", "roomId", "sendId", "timestamp" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
