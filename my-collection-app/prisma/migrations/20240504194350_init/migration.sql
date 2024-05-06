-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" DATETIME NOT NULL,
    "notes" TEXT,
    CONSTRAINT "ItemRecord_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemRecord_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "RecordCollection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ItemRecord" ("collectionId", "creationDate", "id", "itemId", "lastUpdate", "notes") SELECT "collectionId", "creationDate", "id", "itemId", "lastUpdate", "notes" FROM "ItemRecord";
DROP TABLE "ItemRecord";
ALTER TABLE "new_ItemRecord" RENAME TO "ItemRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
