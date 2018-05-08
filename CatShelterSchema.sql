-- Delete and recreate the cat_shelter database

DROP DATABASE IF EXISTS cat_shelter;
CREATE DATABASE cat_shelter;
USE cat_shelter;

-- Create the tables

CREATE TABLE owners (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name nvarchar(255) NOT NULL
);

CREATE TABLE cats (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name VARCHAR(255) NULL,
	age int NULL,
	owner_id int NOT NULL,
	FOREIGN KEY FK_Cats_Owner (owner_id) REFERENCES Owners(id)
);
