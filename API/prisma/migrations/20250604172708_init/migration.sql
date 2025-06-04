/*
  Warnings:

  - The primary key for the `enfermeira` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `enfermeira` DROP PRIMARY KEY,
    MODIFY `ecip` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ecip`);
