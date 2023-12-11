import pymysql

from connectDB import info

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
        result = cursor.fetchall()

        return result

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
        result = cursor.execute(query_)

        return list(result)
    
    except Exception as e:
        return f"Error: {str(e)}"

