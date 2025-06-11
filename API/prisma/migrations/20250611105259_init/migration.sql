-- CreateTable
CREATE TABLE `Paciente` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Paciente_email_key`(`email`),
    UNIQUE INDEX `Paciente_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enfermeira` (
    `id` INTEGER NOT NULL,
    `ecip` VARCHAR(100) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Enfermeira_ecip_key`(`ecip`),
    UNIQUE INDEX `Enfermeira_email_key`(`email`),
    UNIQUE INDEX `Enfermeira_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `crm` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Medico_crm_key`(`crm`),
    UNIQUE INDEX `Medico_email_key`(`email`),
    UNIQUE INDEX `Medico_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
