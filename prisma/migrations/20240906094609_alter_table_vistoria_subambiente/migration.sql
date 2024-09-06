/*
  Warnings:

  - You are about to drop the column `sub_ambientes` on the `Vistorias` table. All the data in the column will be lost.
  - Added the required column `vistoriaId` to the `SubAmbiente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubAmbiente" ADD COLUMN     "vistoriaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vistorias" DROP COLUMN "sub_ambientes";

-- AddForeignKey
ALTER TABLE "SubAmbiente" ADD CONSTRAINT "SubAmbiente_vistoriaId_fkey" FOREIGN KEY ("vistoriaId") REFERENCES "Vistorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
