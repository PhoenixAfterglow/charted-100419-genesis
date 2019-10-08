-- Drops the chartedDB if it exists currently --
DROP DATABASE IF EXISTS chartedDB;
-- Creates the "chartedDB" database --
CREATE DATABASE chartedDB;

CREATE TABLE charted_graph (
	id INT NOT NULL AUTO_INCREMENT,
	graph_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
);

CREATE TABLE charted_data (
	id INT NOT NULL AUTO_INCREMENT,
	column_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (charted_graph_id) REFERENCES charted_graph(id)
);

-- NOTE:  Once we know the data set for entry, we can then create the appropriate number of named columns for this database.