DROP database DigitalD;
CREATE DATABASE DigitalD;
USE DigitalD;

CREATE TABLE paciente(
    id_pac INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR (255) NOT NULL
);

insert into paciente values (null, "Humberto", "humberto123@gmail.com", "humbigo231");
insert into paciente values (null, "Pedro", "russo007@gmail.com", "pedr007");
insert into paciente values (null, "Dutch", "dutch2022@gmail.com", "dutch22");

select * from paciente;