-- CreateTable
CREATE TABLE "itens" (
    "id_item" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "categoria" VARCHAR(100) NOT NULL,
    "status_item" BOOLEAN,
    "imagem" VARCHAR(100),
    "cpf_usuario" CHAR(11),

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "proposta" (
    "id_proposta" SERIAL NOT NULL,
    "item_ofertado" INTEGER,
    "item_desejado" INTEGER,
    "cpf_usuario" CHAR(11),
    "status_proposta" BOOLEAN,

    CONSTRAINT "proposta_pkey" PRIMARY KEY ("id_proposta")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "cpf" CHAR(11) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "endereco" VARCHAR(200) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_cpf_usuario_fkey" FOREIGN KEY ("cpf_usuario") REFERENCES "usuarios"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposta" ADD CONSTRAINT "proposta_cpf_usuario_fkey" FOREIGN KEY ("cpf_usuario") REFERENCES "usuarios"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposta" ADD CONSTRAINT "proposta_item_desejado_fkey" FOREIGN KEY ("item_desejado") REFERENCES "itens"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposta" ADD CONSTRAINT "proposta_item_ofertado_fkey" FOREIGN KEY ("item_ofertado") REFERENCES "itens"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;
