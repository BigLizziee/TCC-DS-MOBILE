DROP database DigitalD;
CREATE DATABASE DigitalD;
USE DigitalD;

CREATE TABLE cli(
    id_pac INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_cli VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR (255) NOT NULL
);

insert into cli values (null, "Humberto", "humberto123@gmail.com", "humbigo231");
insert into cli values (null, "Pedro", "russo007@gmail.com", "pedr007");
insert into cli values (null, "Dutch", "dutch2022@gmail.com", "dutch22");

select * from cli;