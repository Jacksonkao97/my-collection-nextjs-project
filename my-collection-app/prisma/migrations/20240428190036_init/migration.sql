-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "episode" TEXT,
    "season" TEXT,
    "image" TEXT,
    "author" TEXT,
    "url" TEXT,
    "date" DATETIME
);

-- CreateTable
CREATE TABLE "ItemRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" DATETIME NOT NULL,
    "notes" TEXT,
    CONSTRAINT "ItemRecord_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecordCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recordId" TEXT NOT NULL,
    "numOfItems" INTEGER NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    CONSTRAINT "RecordCollection_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "ItemRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
