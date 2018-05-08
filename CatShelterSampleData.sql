USE cat_shelter;

-- Create some owners

INSERT INTO owners(name) VALUES ('Fred');
INSERT INTO owners(name) VALUES ('Bill');
INSERT INTO owners(name) VALUES ('Jane');

-- Create some cats

INSERT INTO Cats(name, age, owner_id) VALUES ('Tiddles', 2, 1);
INSERT INTO Cats(name, age, owner_id) VALUES ('Bunnikins', 4, 2);
INSERT INTO Cats(name, age, owner_id) VALUES ('Mr Scruff', 5, 3);
INSERT INTO Cats(name, age, owner_id) VALUES ('Mrs Scruff', 1, 3);
INSERT INTO Cats(name, age, owner_id) VALUES ('Old Faithful', 8, 2);
