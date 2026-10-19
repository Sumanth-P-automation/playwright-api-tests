import sqlite3

def validate_database():
    print("Initializing SQLite In-Memory Database for SQL Data-Integrity Checks...")
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    """)
    cursor.execute("""
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            amount REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    cursor.executemany("INSERT INTO users VALUES (?, ?, ?)", [
        (1, 'sumanth_p', 'sumanth@example.com'),
        (2, 'qa_tester', 'tester@example.com')
    ])
    cursor.executemany("INSERT INTO orders VALUES (?, ?, ?)", [
        (101, 1, 250.00),
        (102, 1, 130.50),
        (103, 2, 85.00)
    ])
    conn.commit()

    cursor.execute("SELECT COUNT(*) FROM users")
    user_count = cursor.fetchone()[0]
    assert user_count == 2, f"Expected 2 users, found {user_count}"
    print(f"✔ Assertion Passed: User count verified ({user_count} records).")

    cursor.execute("""
        SELECT u.username, SUM(o.amount)
        FROM users u
        JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
    """)
    results = dict(cursor.fetchall())
    assert results['sumanth_p'] == 380.00, f"Expected 380.00 total for sumanth_p, got {results.get('sumanth_p')}"
    print("✔ Assertion Passed: JOIN and SUM aggregation verified.")

    cursor.execute("""
        SELECT COUNT(*) FROM orders WHERE user_id IS NULL OR user_id NOT IN (SELECT id FROM users)
    """)
    orphan_count = cursor.fetchone()[0]
    assert orphan_count == 0, f"Found {orphan_count} orphan orders!"
    print("✔ Assertion Passed: Zero orphan records detected.")

    conn.close()
    print("SQL Data-Integrity Validation Completed Successfully!")

if __name__ == "__main__":
    validate_database()
