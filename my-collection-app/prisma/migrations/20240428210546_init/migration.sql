/*
  Warnings:

  - You are about to alter the column `episode` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `season` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecordCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "numOfRecords" INTEGER NOT NULL DEFAULT 0,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "imageType" TEXT,
    "notes" TEXT
);
INSERT INTO "new_RecordCollection" ("creationDate", "id", "image", "imageType", "notes", "numOfRecords", "title") SELECT "creationDate", "id", "image", "imageType", "notes", "numOfRecords", "title" FROM "RecordCollection";
DROP TABLE "RecordCollection";
ALTER TABLE "new_RecordCollection" RENAME TO "RecordCollection";
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "episode" INTEGER DEFAULT 0,
    "season" INTEGER DEFAULT 0,
    "image" TEXT,
    "imageType" TEXT,
    "author" TEXT,
    "url" TEXT,
    "date" DATETIME
);
INSERT INTO "new_Item" ("author", "country", "date", "episode", "id", "image", "season", "title", "type", "url") SELECT "author", "country", "date", "episode", "id", "image", "season", "title", "type", "url" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
