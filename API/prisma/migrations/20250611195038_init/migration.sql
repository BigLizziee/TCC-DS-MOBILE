/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `paciente` ADD COLUMN `cpf` VARCHAR(11) NULL,
    ADD COLUMN `data_nascimento` DATE NULL,
    ADD COLUMN `endereco` VARCHAR(200) NULL,
    ADD COLUMN `telefone` VARCHAR(15) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Paciente_cpf_key` ON `Paciente`(`cpf`);
