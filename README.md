# Introduction of KETI-Web-Workbench
-------------

KETI-Web-Workbench enables users to monitor databases, perform query pushdown, and run validator to analyze resource utilization and energy savings.

## Contents
-------------
[1. Requirement](#requirement)

[2. How To Install](#How-To-Install)

[3. How To Use](#How-To-Use)

[4. Governance](#governance)


## Requirement
-------------
>   Python 3.7.5 <br>
>   Flask 2.2.5 <br>
>   Werkzeug 2.2.3




## How To Install
-------------
```bash
git clone
python3 main.py
```

## How To Use
-------------
### 1. Access a Web page
```bash
http://10.0.4.87:5001/login
```
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/879b628c-5383-4f0a-8ec0-3825ff781471">

### 2. Access a DB Monitoring Page
- Check DB Info
- Monitor DB Metrics
- Monitor Host Server Metrics
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/441c7c77-fd86-4049-90ea-e4ddf230c298">

### 3. Access a Query Pushdown Page
- Run Query
- Check Query Result
- Check Query Metric
- Check Host Server Metrics
- Check Query Log
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/20b9868c-7e02-4c24-b834-5523b05caa73">
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/f6bf749c-b1bd-4cbc-969b-0f25ad259db1">

### 4. Access a Validation Page
- Run Query
- Set Query Pushdown Option
- Check Query Log
- Compare two query results
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/26273d40-72c6-4c34-9b18-66abc592fb1c">
<img width="70%" heigth="70%" src="https://github.com/opencsd/KETI-Web-Workbench/assets/57175313/f887cfdc-8f1f-408c-b2c5-cdf41f1d06b9">


## Governance
-------------
This work was supported by Institute of Information & communications Technology Planning & Evaluation (IITP) grant funded by the Korea government(MSIT) (No.2021-0-00862, Development of DBMS storage engine technology to minimize massive data movement)

