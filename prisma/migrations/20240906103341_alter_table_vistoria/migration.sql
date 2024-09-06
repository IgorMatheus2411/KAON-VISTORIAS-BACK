/*
  Warnings:

  - You are about to drop the `Vistorias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ambiente" DROP CONSTRAINT "Ambiente_vistoriaId_fkey";

-- DropForeignKey
ALTER TABLE "SubAmbiente" DROP CONSTRAINT "SubAmbiente_vistoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Vistorias" DROP CONSTRAINT "Vistorias_userId_fkey";

-- DropTable
DROP TABLE "Vistorias";

-- CreateTable
CREATE TABLE "Vistoria" (
    "id" TEXT NOT NULL,
    "area_vistoriada" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data_agendamento" TIMESTAMP(3) NOT NULL,
    "data_laudo" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,
    "finalizada" BOOLEAN NOT NULL,
    "locador" TEXT NOT NULL,
    "locatario" TEXT NOT NULL,
    "mobiliado" TEXT NOT NULL,
    "tipo_imovel" TEXT NOT NULL,
    "tipo_vistoria" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vistoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vistoria" ADD CONSTRAINT "Vistoria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ambiente" ADD CONSTRAINT "Ambiente_vistoriaId_fkey" FOREIGN KEY ("vistoriaId") REFERENCES "Vistoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAmbiente" ADD CONSTRAINT "SubAmbiente_vistoriaId_fkey" FOREIGN KEY ("vistoriaId") REFERENCES "Vistoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
