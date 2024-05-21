# 🎇 Neo4j 시각화

### 1. 기본 설정
* 데모 실행 환경
    * Neo4j (Server or Desktop)
    * Node.js
    * MariaDB

### 2. Neo4j
* Neo4j ([Download & Install](http://neo4j.com/download))를 로컬에서 시작 하고, [Neo4j Browser](http://localhost:7474)를 엽니다.
* 기본 ID는 'neo4j'이며 비밀번호는 'admin'으로 설정해야 합니다.
* `:play movies`를 사용하여 movies 데이터셋을 다운로드하고, 'CREATE'를 클릭한 다음 'Run' 버튼을 누르세요.

### 3. MariaDB

[***3.1 MariaDB 설치***](https://downloads.mariadb.org/mariadb/10.3.8/)

* Windows를 사용하는 경우 .zip 패키지 파일을 다운로드하고 원하는 디렉터리에 패키지의 압축을 풉니다.
* Mac을 사용 하고 컴퓨터에 Homebrew가 설치되어 있는 경우 다음 명령을 사용하여 설치할 수 있습니다.
  * 컴퓨터에 Homebrew 설치 필요

```
brew install mariadb
```

***3.2 MariaDB 서버 실행***

* Windows 사용자 의 경우 mysqld.exe가 있는 디렉터리로 이동하여 다음 명령을 실행합니다.

```
mysqld.exe --console
```

* Mac 사용자 의 경우 다음 명령을 실행하십시오.

```
mysql.server start
```

***3.3 MariaDB 사용 시작***

* Windows 사용자 의 경우 mysql.exe가 있는 디렉토리로 이동하여 다음 명령을 실행하십시오.

```
mysql -u root
```

***3.4 루트 비밀번호 변경***
* 루트 비밀번호를 'admin'으로 변경해야 합니다

```sql
mysql> FLUSH PRIVILEGES;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin';
```

***3.5 데이터베이스 생성***
```sql
mysql> CREATE DATABASE IF NOT EXISTS UserInfo;
```
  
***3.4 테이블 생성***
```sql
mysql> USE UserInfo
mysql> CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, profileid VARCHAR(30), token VARCHAR(200), email VARCHAR(30), password VARCHAR(100));
```

### 4. Node.js
* GitHub에서 이 프로젝트를 복제하고 프로젝트 디렉터리에서 다음 명령을 실행하여 필요한 모듈을 설치합니다.
```
$ npm install
```
* 프로젝트 경로로 이동하여 터미널에서 'npm start'를 실행하세요.

```
$ npm start
```


Copyright © 2018 MOSSupport, Inc.
