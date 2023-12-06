import pymysql

def query_mysql(host_, port_, user_, password_, db_, query_):
    try:
        # db 연결
        db = pymysql.connect(
            host=host_,
            port=port_,
            user=user_,
            password=password_,
            db=db_
        )
        # cursor = db.cursor()
        # cursor.execute(query_)
        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query_)
        result = cursor.fetchall()
        cursor.close()
        db.close()
        
        return result

    except Exception as e:
        return f"Error: {str(e)}"

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
        )
        cursor = db.cursor(pymysql.cursors.DictCursor)
        result = cursor.execute(query_)

        return list(result)
    
    except Exception as e:
        return f"Error: {str(e)}"