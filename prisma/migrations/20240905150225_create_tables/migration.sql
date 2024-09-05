-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vistorias" (
    "id" TEXT NOT NULL,
    "area_vistoriada" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data_agendamento" TIMESTAMP(3) NOT NULL,
    "data_laudo" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,
    "finalizada" BOOLEAN NOT NULL,
    "lista_ambiente" TEXT NOT NULL,
    "locador" TEXT NOT NULL,
    "locatario" TEXT NOT NULL,
    "mobiliado" TEXT NOT NULL,
    "sub_ambientes" TEXT NOT NULL,
    "tipo_imovel" TEXT NOT NULL,
    "tipo_vistoria" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vistorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambiente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "vistoriaId" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAmbiente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ambienteId" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "SubAmbiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ambienteId" TEXT,
    "subAmbienteId" TEXT,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vistorias" ADD CONSTRAINT "Vistorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ambiente" ADD CONSTRAINT "Ambiente_vistoriaId_fkey" FOREIGN KEY ("vistoriaId") REFERENCES "Vistorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAmbiente" ADD CONSTRAINT "SubAmbiente_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_subAmbienteId_fkey" FOREIGN KEY ("subAmbienteId") REFERENCES "SubAmbiente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
