import pymysql
import pandas as pd


class MysqlConnection(object):
    def __init__(self):
        self.host = 'mysql-109051-0.cloudclusters.net'
        self.port = 10253
        self.user = 'admin'
        self.passwd = 'C3xF8hGx'
        self.connection = ''

    def connect_mysql(self, db):
        return pymysql.Connect(host=self.host, port=self.port, user=self.user, passwd=self.passwd, db=db)

    def connect_database(self, db):
        self.connection = self.connect_mysql(db)
        cursor = self.connection.cursor()
        cursor.execute("SELECT VERSION()")
        data = cursor.fetchone()
        print('version is :', data[0])
        
    def close_connection(self):
        self.connection.close()

    def csv_to_movies_table(self, filelocation):
        data = pd.read_csv (filelocation)   
        df = pd.DataFrame(data)
        print(df)
        cursor = self.connection.cursor()
        for row in df.itertuples():
            cursor.execute(f'INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ("{row.tconst}","{row.titleType}","{row.primaryTitle}",{row.runtimeMinutes},"{row.genres}")')
        self.connection.commit()
        
    def csv_to_rating_table(self, filelocation):
        data = pd.read_csv (filelocation)   
        df = pd.DataFrame(data)
        print(df)
        cursor = self.connection.cursor()
        for row in df.itertuples():
            cursor.execute(f'INSERT INTO rating (tconst, averageRating, numVotes) VALUES ("{row.tconst}","{row.averageRating}","{row.numVotes}")')
        self.connection.commit()
        
        
    def create_movies_table(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute('''
                       CREATE TABLE movies(
                           tconst VARCHAR(100),
                           titleType VARCHAR(100),
                           primaryTitle VARCHAR(1000),
                           runtimeMinutes INT,
                           genres VARCHAR(200)
                           )                       
                       ''')
        except pymysql.Error as e:
            print(e.args[1])   
        self.connection.commit()
        
        

    def create_rating_table(self):
        try:
            cursor = self.connection.cursor()
            cursor.execute('''
                       CREATE TABLE rating(
                           tconst VARCHAR(20),
                           averageRating FLOAT,
                           numVotes INT
                           )                       
                       ''')
        except pymysql.Error as e:
            print(e.args[1])                       
        self.connection.commit()

if __name__ == '__main__':
    
    connector = MysqlConnection()
    connector.connect_database('test')
    connector.create_movies_table()
    connector.create_rating_table()
    # connector.csv_to_movies_table('./data/movies.csv')
    # connector.csv_to_rating_table('./data/ratings.csv')
    # connector.csv_to_sqlserver('movies', './data/movies.csv')
    connector.close_connection()