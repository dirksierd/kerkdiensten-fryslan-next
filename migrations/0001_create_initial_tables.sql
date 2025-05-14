-- Migration number: 0000 	 2025-05-14T14:37:56.305Z

CREATE TABLE denominations (
	id VARCHAR NOT NULL PRIMARY KEY,
	title VARCHAR NOT NULL,
	titleAbbr VARCHAR NOT NULL,
	url VARCHAR,
	insertedAt INTEGER NOT NULL
);
INSERT INTO denominations VALUES('ff73d58b-7d19-448f-9254-af04bfe5cbb3','Protestantse Kerk in Nederland','PKN','https://protestantsekerk.nl',1728339585);
CREATE TABLE congregations (
	id VARCHAR NOT NULL PRIMARY KEY,
	title VARCHAR NOT NULL,
	denominationId VARCHAR,
	url VARCHAR,
	insertedAt INTEGER NOT NULL,

	FOREIGN KEY (denominationId)
		REFERENCES denominations (id)
		ON UPDATE NO ACTION
		ON DELETE SET NULL
);
INSERT INTO congregations VALUES('aea54b56-c170-41ee-ab59-84e02b3e9a4c','Protestantse Gemeente Nij Beets','ff73d58b-7d19-448f-9254-af04bfe5cbb3','https://doarpstsjerke.nl',1728339585);
CREATE TABLE locations (
	id VARCHAR NOT NULL PRIMARY KEY,
	title VARCHAR NOT NULL,
	congregationId VARCHAR NOT NULL,
	postalCode VARCHAR NOT NULL,
	houseNumber INTEGER NOT NULL,
	houseNumberSuffix VARCHAR,
	"street" VARCHAR NOT NULL,
	locality VARCHAR NOT NULL,
	latitude REAL,
	longitude REAL,
	insertedAt INTEGER NOT NULL,

	FOREIGN KEY (congregationId)
		REFERENCES congregations (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
INSERT INTO locations VALUES('bc634bce-a2ac-42ca-aa70-24e8919ef2c9','Doarpstsjerke','aea54b56-c170-41ee-ab59-84e02b3e9a4c','9245HP',7,NULL,'Doarpsstrjitte','Nij Beets',53.07161,6.002424,1728339585);
CREATE TABLE people (
	id VARCHAR NOT NULL PRIMARY KEY,
	"lastName" VARCHAR NOT NULL,
	email VARCHAR,
	phoneNumber VARCHAR,
	locality VARCHAR,
	denominationId VARCHAR,
	insertedAt INTEGER NOT NULL, "firstName" VARCHAR, "title" VARCHAR NOT NULL DEFAULT 'ds',

	FOREIGN KEY (denominationId)
		REFERENCES denominations (id)
		ON UPDATE NO ACTION
		ON DELETE SET NULL
);
INSERT INTO people VALUES('e6564688-7262-4710-857d-70d9385e6c82','de Vries','dirksierd@me.com',NULL,'Nij Beets','ff73d58b-7d19-448f-9254-af04bfe5cbb3',1728339585,'Dirk Sierd','ds');
INSERT INTO people VALUES('3a1ac65c-f393-4db8-b33b-a1488269309b','Stegeman',NULL,NULL,'Leeuwarden','ff73d58b-7d19-448f-9254-af04bfe5cbb3',1728339585,'Jan-Jaap','ds');
CREATE TABLE locations_people (
	id VARCHAR NOT NULL PRIMARY KEY,
	locationId VARCHAR NOT NULL,
	personId VARCHAR NOT NULL,
	role VARCHAR DEFAULT 'pastor',
	insertedAt INTEGER NOT NULL,

	FOREIGN KEY (locationId)
		REFERENCES locations (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE,

	FOREIGN KEY (personId)
		REFERENCES people (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
INSERT INTO locations_people VALUES('c35d7aca-0419-4326-9e68-bafbb92a1555','bc634bce-a2ac-42ca-aa70-24e8919ef2c9','e6564688-7262-4710-857d-70d9385e6c82','role',1728339585);
CREATE TABLE events (
	id VARCHAR NOT NULL PRIMARY KEY,
	startingAt INTEGER NOT NULL,
	endingAt INTEGER NOT NULL,
	locationId VARCHAR NOT NULL,
	kind VARCHAR NOT NULL DEFAULT 'morning',
	insertedAt INTEGER NOT NULL,
	description TEXT,
	hasHolySupper BOOLEAN NOT NULL DEFAULT 0,
	language VARCHAR NOT NULL DEFAULT 'nl',
	isSpecial BOOLEAN NOT NULL DEFAULT 0,

	FOREIGN KEY (locationId)
		REFERENCES locations (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
INSERT INTO events VALUES('c6700dcb-d914-4419-b65d-8da4cd71f3d5',1729411200,1729414800,'bc634bce-a2ac-42ca-aa70-24e8919ef2c9','morning',1728339585,'Dit is een test.',1,'fy',0);
INSERT INTO events VALUES('c7a18215-1512-40d9-b1c2-32a82f46ccb2',1731231000,1731234600,'bc634bce-a2ac-42ca-aa70-24e8919ef2c9','morning',1728339585,'Dit en dat.',1,'fy',0);
CREATE TABLE events_people (
	id VARCHAR NOT NULL PRIMARY KEY,
	eventId VARCHAR NOT NULL,
	personId VARCHAR NOT NULL,
	insertedAt INTEGER NOT NULL,
	"role" VARCHAR NOT NULL DEFAULT 'pastor',

	FOREIGN KEY (eventId)
		REFERENCES events (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE,

	FOREIGN KEY (personId)
		REFERENCES people (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
INSERT INTO events_people VALUES('ec2b21b0-1b2d-47a0-b156-c9e65936b486','c6700dcb-d914-4419-b65d-8da4cd71f3d5','e6564688-7262-4710-857d-70d9385e6c82',1728339585,'pastor');
INSERT INTO events_people VALUES('f7f6c6ff-d90d-4965-ac03-c1eb896c3b99','c6700dcb-d914-4419-b65d-8da4cd71f3d5','3a1ac65c-f393-4db8-b33b-a1488269309b',1728339585,'pastor');
INSERT INTO events_people VALUES('af86451f-1172-46e5-bb37-b29ee22acba9','c7a18215-1512-40d9-b1c2-32a82f46ccb2','3a1ac65c-f393-4db8-b33b-a1488269309b',1728339585,'pastor');
CREATE TABLE login_tokens (
	id VARCHAR NOT NULL PRIMARY KEY,
	personId VARCHAR NOT NULL,
	accessToken VARCHAR NOT NULL,
	emailToken VARCHAR NOT NULL,
    browserToken VARCHAR NOT NULL,
	expiresAt INTEGER NOT NULL,
	insertedAt INTEGER NOT NULL,

	FOREIGN KEY (personId)
		REFERENCES people (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
CREATE UNIQUE INDEX idx_people_email ON people(email);
CREATE UNIQUE INDEX idx_access_tokens ON login_tokens(accessToken);
CREATE UNIQUE INDEX idx_denomination_titles ON denominations(titleAbbr);
