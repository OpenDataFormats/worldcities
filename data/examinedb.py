import sqlite3
from sqlite3 import Error

def get_db_structure(db_file):
    """
    Function to retrieve and print the structure of a SQLite database.

    :param db_file: Path to the SQLite database file
    :return: None, prints the database structure to console
    """
    try:
        # Connect to the database
        with sqlite3.connect(db_file) as conn:
            # Create a cursor object to execute SQL commands
            cursor = conn.cursor()

            # Retrieve table names
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()

            for table_name in tables:
                table_name = table_name[0]
                print(f"\nTable: {table_name}")

                # Retrieve column information for each table
                cursor.execute(f"PRAGMA table_info({table_name})")
                columns = cursor.fetchall()

                for column in columns:
                    print(f"  - Column: {column[1]} - Type: {column[2]} - Not NULL: {column[3]} - Default: {column[4]} - Primary Key: {column[5]}")

                # Retrieve indexes if any
                cursor.execute(f"PRAGMA index_list({table_name})")
                indexes = cursor.fetchall()
                if indexes:
                    print("  Indexes:")
                    for idx in indexes:
                        cursor.execute(f"PRAGMA index_info({idx[1]})")
                        index_info = cursor.fetchall()
                        print(f"    - Index name: {idx[1]} - Unique: {idx[2]}")
                        for col in index_info:
                            print(f"      - Column in index: {col[2]}")

    except Error as e:
        print(f"An error occurred: {e}")

# Example usage
db_path = 'worldcities.sqlite'
get_db_structure(db_path)
