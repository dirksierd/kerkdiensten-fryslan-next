-- Migration number: 0002 	 2025-05-14T18:02:27.333Z

CREATE TABLE congregations_people (
	id VARCHAR NOT NULL PRIMARY KEY,
	congregationId VARCHAR NOT NULL,
	personId VARCHAR NOT NULL,
	role VARCHAR NOT NULL DEFAULT 'pastor',

	FOREIGN KEY (congregationId)
		REFERENCES congregations (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE,

	FOREIGN KEY (personId)
		REFERENCES people (id)
		ON UPDATE NO ACTION
		ON DELETE CASCADE
);
