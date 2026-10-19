-- Total Record Count
SELECT COUNT(*) FROM posts;

-- Orphan Record Detection
SELECT p.id, p.title 
FROM posts p 
LEFT JOIN users u ON p.userId = u.id 
WHERE u.id IS NULL OR p.userId IS NULL;

-- Duplicate Record Detection
SELECT title, COUNT(*) 
FROM posts 
GROUP BY title 
HAVING COUNT(*) > 1;

-- Relational INNER JOIN Integrity
SELECT p.id, p.title, u.username, u.email 
FROM posts p 
INNER JOIN users u ON p.userId = u.id;
