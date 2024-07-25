CREATE TABLE Post (
    ID SERIAL PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    Descricao VARCHAR(500),
    DataPostagem TIMESTAMP,
    DataAtualizacao TIMESTAMP,
    Conteudo TEXT NOT NULL,
    Imagem BYTEA
);

INSERT INTO Post (Titulo, Descricao, DataPostagem, DataAtualizacao, Conteudo, Imagem) VALUES
('Titulo_01', 'Descricao_01', NOW(), NOW(), 'Conteudo_01', NULL),
('Titulo_02', 'Descricao_02', NOW(), NOW(), 'Conteudo_02', NULL),
('Titulo_03', 'Descricao_03', NOW(), NOW(), 'Conteudo_03', NULL),
('Titulo_04', 'Descricao_04', NOW(), NOW(), 'Conteudo_04', NULL),
('Titulo_05', 'Descricao_05', NOW(), NOW(), 'Conteudo_05', NULL),
('Titulo_06', 'Descricao_06', NOW(), NOW(), 'Conteudo_06', NULL),
('Titulo_07', 'Descricao_07', NOW(), NOW(), 'Conteudo_07', NULL),
('Titulo_08', 'Descricao_08', NOW(), NOW(), 'Conteudo_08', NULL),
('Titulo_09', 'Descricao_09', NOW(), NOW(), 'Conteudo_09', NULL),
('Titulo_10', 'Descricao_10', NOW(), NOW(), 'Conteudo_10', NULL);