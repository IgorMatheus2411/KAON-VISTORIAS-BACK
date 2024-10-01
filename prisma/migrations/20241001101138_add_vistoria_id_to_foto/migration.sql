/*
  Warnings:

  - Added the required column `vistoriaId` to the `Foto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foto" ADD COLUMN     "vistoriaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_vistoriaId_fkey" FOREIGN KEY ("vistoriaId") REFERENCES "Vistoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
