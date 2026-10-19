-- 1. Record Count Validation
SELECT COUNT(*) AS total_posts FROM posts;

-- 2. Foreign Key Integrity / Orphan Record Check
SELECT p.id, p.title 
FROM posts p 
LEFT JOIN users u ON p.userId = u.id 
WHERE u.id IS NULL OR p.userId IS NULL;

-- 3. Duplicate Title Assertions
SELECT title, COUNT(*) AS duplicate_count 
FROM posts 
GROUP BY title 
HAVING COUNT(*) > 1;

-- 4. Inner Join Verification
SELECT p.id, p.title, u.username, u.email
FROM posts p
INNER JOIN users u ON p.userId = u.id;
