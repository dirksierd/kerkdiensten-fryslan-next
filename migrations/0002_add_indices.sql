-- Migration number: 0002 	 2025-05-15T10:42:32.094Z

CREATE INDEX idx_person_event ON events_people (personId, eventId);
CREATE INDEX idx_events_startingAt ON events (startingAt);
