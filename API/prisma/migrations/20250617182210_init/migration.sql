/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Medico` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `medico` ADD COLUMN `cpf` VARCHAR(11) NULL,
    ADD COLUMN `data_nascimento` DATE NULL,
    ADD COLUMN `telefone` VARCHAR(15) NULL,
    MODIFY `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Medico_cpf_key` ON `Medico`(`cpf`);
