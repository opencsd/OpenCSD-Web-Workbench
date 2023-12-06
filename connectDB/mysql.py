import pymysql
<<<<<<< HEAD
from connectDB import info

def execute_query_mysql(host_, port_, user_, password_, db_, query_):
    try:
=======

def query_mysql(host_, port_, user_, password_, db_, query_):
    try:
        # db 연결
>>>>>>> hun_branch
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )
<<<<<<< HEAD

        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        result = cursor.fetchall()

=======
        # cursor = db.cursor()
        # cursor.execute(query_)
        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        result = cursor.fetchall()
        cursor.close()
        db.close()
        
>>>>>>> hun_branch
        return result

    except Exception as e:
        return f"Error: {str(e)}"

<<<<<<< HEAD
def execute_query_mysql_management(query_):
    try:
        db = pymysql.connect(
            host=info.PLATFORM_MANAGEMENT_DB_HOST,
            port=info.PLATFORM_MANAGEMENT_DB_PORT,
            user=info.PLATFORM_MANAGEMENT_DB_USER,
            password=info.PLATFORM_MANAGEMENT_DB_PASSWORD,
            db=info.PLATFORM_MANAGEMENT_DB_NAME
=======
def execute_query_mysql_instance(host_, port_, user_, password_, db_, query_):
    try:
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )

        print(query_)
        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        result = cursor.fetchall()
        
        return result
    except Exception as e:
        return f"Error: {str(e)}"

def execute_query_mysql_management(query_):
    try:
        db = pymysql.connect(
            host=PLATFORM_MANAGEMENT_DB_HOST,
            port=PLATFORM_MANAGEMENT_DB_PORT,
            user=PLATFORM_MANAGEMENT_DB_USER,
            password=PLATFORM_MANAGEMENT_DB_PASSWORD,
            db=PLATFORM_MANAGEMENT_DB_NAME
>>>>>>> hun_branch
        )
        cursor = db.cursor(pymysql.cursors.DictCursor)
        result = cursor.execute(query_)

        return list(result)
    
    except Exception as e:
<<<<<<< HEAD
        return f"Error: {str(e)}"
=======
        return f"Error: {str(e)}"
>>>>>>> hun_branch
