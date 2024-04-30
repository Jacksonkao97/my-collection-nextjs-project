/*
  Warnings:

  - You are about to drop the column `numOfItems` on the `RecordCollection` table. All the data in the column will be lost.
  - You are about to drop the column `recordId` on the `RecordCollection` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `ItemRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfRecords` to the `RecordCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `RecordCollection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" DATETIME NOT NULL,
    "notes" TEXT,
    CONSTRAINT "ItemRecord_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemRecord_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "RecordCollection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecord" ("creationDate", "id", "itemId", "lastUpdate", "notes") SELECT "creationDate", "id", "itemId", "lastUpdate", "notes" FROM "ItemRecord";
DROP TABLE "ItemRecord";
ALTER TABLE "new_ItemRecord" RENAME TO "ItemRecord";
CREATE TABLE "new_RecordCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "numOfRecords" INTEGER NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "imageType" TEXT,
    "notes" TEXT
);
INSERT INTO "new_RecordCollection" ("creationDate", "id", "image", "notes") SELECT "creationDate", "id", "image", "notes" FROM "RecordCollection";
DROP TABLE "RecordCollection";
ALTER TABLE "new_RecordCollection" RENAME TO "RecordCollection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
