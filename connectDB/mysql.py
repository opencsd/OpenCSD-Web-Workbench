import pymysql

from connectDB import info
from prettytable import from_db_cursor

def execute_query_mysql_get_string_result(host_, port_, user_, password_, db_, query_):
    try:
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )

        cursor = db.cursor()
        cursor.execute(query_)
        result = from_db_cursor(cursor)

        cursor.close()
        db.close()

        return result

    except Exception as e:
        return f"Error: {str(e)}"

def execute_query_mysql(host_, port_, user_, password_, db_, query_):
    try:
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )

        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        db.commit()
        result = cursor.fetchall()

        cursor.close()
        db.close()

        return result

    except Exception as e:
        return f"Error: {str(e)}"
    
def execute_query_timestamp_mysql(host_, port_, user_, password_, db_, query_):
    try:
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )

        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        db.commit()
        result = cursor.fetchall()

        cursor.close()
        db.close()

        return result[0]

    except Exception as e:
        return f"Error: {str(e)}"

# mysql metric
def execute_query_mysql_demo(db_, query_):
    try:
        db = pymysql.connect(
            host=info.MYSQL_DB_HOST,
            port=info.MYSQL_DB_PORT,
            user=info.MYSQL_DB_USER,
            password=info.MYSQL_DB_PASSWORD,
            db=db_
        )

        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        result = cursor.fetchall()

        return result

    except Exception as e:
        return f"Error: {str(e)}"

def execute_query_mysql_management(query_):
    try:
        db = pymysql.connect(
            host=info.PLATFORM_MANAGEMENT_DB_HOST,
            port=info.PLATFORM_MANAGEMENT_DB_PORT,
            user=info.PLATFORM_MANAGEMENT_DB_USER,
            password=info.PLATFORM_MANAGEMENT_DB_PASSWORD,
            db=info.PLATFORM_MANAGEMENT_DB_NAME
        )

        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        db.commit()
        result = cursor.fetchall()

        cursor.close()
        db.close()

        return result
    
    except Exception as e:
        return f"Error: {str(e)}"

