/*
  Warnings:

  - You are about to drop the column `cpf_usuario` on the `itens` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_usuario` on the `proposta` table. All the data in the column will be lost.
  - Made the column `status_item` on table `itens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status_proposta` on table `proposta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_cpf_usuario_fkey";

-- DropForeignKey
ALTER TABLE "proposta" DROP CONSTRAINT "proposta_cpf_usuario_fkey";

-- AlterTable
ALTER TABLE "itens" DROP COLUMN "cpf_usuario",
ADD COLUMN     "cpf_dono" CHAR(11),
ALTER COLUMN "categoria" DROP NOT NULL,
ALTER COLUMN "categoria" SET DATA TYPE TEXT,
ALTER COLUMN "status_item" SET NOT NULL,
ALTER COLUMN "status_item" SET DEFAULT true,
ALTER COLUMN "imagem" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "proposta" DROP COLUMN "cpf_usuario",
ADD COLUMN     "cpf_dono_item" CHAR(11),
ADD COLUMN     "cpf_proponente" CHAR(11),
ALTER COLUMN "status_proposta" SET NOT NULL,
ALTER COLUMN "status_proposta" SET DEFAULT 'pendente',
ALTER COLUMN "status_proposta" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_cpf_dono_fkey" FOREIGN KEY ("cpf_dono") REFERENCES "usuarios"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposta" ADD CONSTRAINT "proposta_cpf_dono_item_fkey" FOREIGN KEY ("cpf_dono_item") REFERENCES "usuarios"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposta" ADD CONSTRAINT "proposta_cpf_proponente_fkey" FOREIGN KEY ("cpf_proponente") REFERENCES "usuarios"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION;
