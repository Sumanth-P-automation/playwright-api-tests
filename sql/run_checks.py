import sqlite3

def run_data_integrity_checks():
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()
    
    # Setup mock schema
    cursor.execute("CREATE TABLE users (id INT PRIMARY KEY, username TEXT, email TEXT)")
    cursor.execute("CREATE TABLE posts (id INT PRIMARY KEY, userId INT, title TEXT)")
    
    cursor.executemany("INSERT INTO users VALUES (?, ?, ?)", [
        (101, 's_paladugu', 's_paladugu@example.com'),
        (102, 'qa_lead', 'qalead@example.com')
    ])
    
    cursor.executemany("INSERT INTO posts VALUES (?, ?, ?)", [
        (1, 101, 'Valid Post 1'),
        (2, 102, 'Valid Post 2'),
        (3, None, 'Orphan Post'),
        (4, 101, 'Valid Post 1')
    ])
    
    # 1. Total Count
    cursor.execute("SELECT COUNT(*) FROM posts")
    print(f"Total Posts: {cursor.fetchone()[0]}")
    
    # 2. Orphan Checks
    cursor.execute("SELECT p.id FROM posts p LEFT JOIN users u ON p.userId = u.id WHERE u.id IS NULL OR p.userId IS NULL")
    print(f"Orphan Record Count: {len(cursor.fetchall())}")
    
    conn.close()

if __name__ == "__main__":
    run_data_integrity_checks()
