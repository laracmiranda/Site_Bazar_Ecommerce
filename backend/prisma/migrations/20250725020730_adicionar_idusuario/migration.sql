/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusItem" AS ENUM ('disponivel', 'trocado', 'reservado');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "id_usuario" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_id_usuario_key" ON "usuarios"("id_usuario");
