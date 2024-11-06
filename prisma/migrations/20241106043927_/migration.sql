/*
  Warnings:

  - You are about to alter the column `userId` on the `Dog` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "fixedStatus" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Dog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dog" ("age", "breed", "fixedStatus", "gender", "id", "name", "userId") SELECT "age", "breed", "fixedStatus", "gender", "id", "name", "userId" FROM "Dog";
DROP TABLE "Dog";
ALTER TABLE "new_Dog" RENAME TO "Dog";
CREATE UNIQUE INDEX "Dog_userId_key" ON "Dog"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
