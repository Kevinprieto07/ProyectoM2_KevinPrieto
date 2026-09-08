
TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio) VALUES
  ('Ada Lovelace', 'ada@miniblog.dev', 'Pionera de la programación, escribe sobre algoritmos y matemáticas.'),
  ('Alan Turing', 'alan@miniblog.dev', 'Investigador en computación e inteligencia artificial.'),
  ('Grace Hopper', 'grace@miniblog.dev', NULL);

-- Como RESTART IDENTITY acaba de reiniciar los ids, sabemos que quedaron:
-- Ada = 1, Alan = 2, Grace = 3 (en el orden en que se insertaron arriba).
INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Cómo pensar en algoritmos', 'Contenido de ejemplo sobre algoritmos y lógica de programación.', true),
  (1, 'Notas sobre el motor analítico', 'Contenido de ejemplo sobre máquinas de cálculo.', true),
  (1, 'Borrador: ideas sueltas', 'Todavía no está listo para publicarse.', false),
  (2, 'Máquinas que piensan', 'Contenido de ejemplo sobre inteligencia artificial.', true),
  (2, 'El problema de la parada', 'Contenido de ejemplo sobre computabilidad.', true),
  (3, 'Compiladores para principiantes', 'Contenido de ejemplo sobre compiladores.', true);
