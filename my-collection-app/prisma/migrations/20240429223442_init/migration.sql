-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "episode" INTEGER DEFAULT 0,
    "season" INTEGER DEFAULT 0,
    "country" TEXT,
    "image" TEXT,
    "imageType" TEXT,
    "author" TEXT,
    "url" TEXT,
    "date" DATETIME
);
INSERT INTO "new_Item" ("author", "country", "date", "episode", "id", "image", "imageType", "season", "title", "type", "url") SELECT "author", "country", "date", "episode", "id", "image", "imageType", "season", "title", "type", "url" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
