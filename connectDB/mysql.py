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
        db.commit()
        result = cursor.fetchall()

        cursor.close()
        db.close()

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
