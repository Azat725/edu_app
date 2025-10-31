/*
  Warnings:

  - You are about to drop the `QuizOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `optionId` on the `QuizAnswer` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `QuizAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `QuizAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuizOption";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuizAnswer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizAnswer" ("answeredAt", "id", "studentId") SELECT "answeredAt", "id", "studentId" FROM "QuizAnswer";
DROP TABLE "QuizAnswer";
ALTER TABLE "new_QuizAnswer" RENAME TO "QuizAnswer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
