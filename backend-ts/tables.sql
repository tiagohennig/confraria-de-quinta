
-- Tabela de usuários
CREATE TABLE users (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Tabela de reuniões
CREATE TABLE meetings (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    place VARCHAR(150),
    date DATETIME NOT NULL,
    description TEXT,
    host VARCHAR(100),
    maxParticipants INT
);

-- Tabela de vinhos
CREATE TABLE wines (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT,
    producer VARCHAR(100),
    country VARCHAR(50),
    region VARCHAR(100),
    grape VARCHAR(100),
    description TEXT,
    oakAgeingTime VARCHAR(50),
    price VARCHAR(50),
    meet_id VARCHAR(100),
    FOREIGN KEY (meet_id) REFERENCES meetings(id)
);