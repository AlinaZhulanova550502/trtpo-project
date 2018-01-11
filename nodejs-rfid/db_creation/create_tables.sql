create database IF NOT EXISTS magic_door; 

CREATE TABLE magic_door.worker (
	id INT 
		NOT NULL     
        PRIMARY KEY
        auto_increment,
	photo VARCHAR(32),
	name VARCHAR(32),
	surname VARCHAR(32),
	second_name VARCHAR(32),
	email VARCHAR(32),
	rfid VARCHAR(32),
	login VARCHAR(32),
	position VARCHAR(32),
	place VARCHAR(32),
	wh VARCHAR(32)
) ENGINE = InnoDB;

CREATE TABLE magic_door.pir (
	id INT 
		NOT NULL     
        PRIMARY KEY
        auto_increment,
	begin datetime,
	end datetime
) ENGINE = InnoDB;

CREATE TABLE magic_door.enter (
	id INT 
		NOT NULL     
        PRIMARY KEY
        auto_increment,
	ent INT(32),
	time DATETIME,
	worker_id INT,
	rfid VARCHAR(32)
) ENGINE = InnoDB;
