# ZOCKET - API REFERENCE 
## TO RUN THE APPLICATION 
-`Run following commands`
-`1. open terminal`
-`2. cd your_own_directory`
-`3. RUN - gitclone git@github.com:parmeet10/zocket.git`
-`4. cd zocket`
-`5. npm install `
-`6. npm start`


## URLS
 - `http://localhost:3000/authentication`
 - `http://localhost:3000/products`
 - `http://localhost:3000/platforms`
 - `http://localhost:3000/campaigns`
 

 ## 1.ping

 ### Description 

 The reachability of the host can be checked through the Ping API. The API responds with a `pong` to communicate availability to the requesting client.

 ### Method

`GET`

### URL

`/ping`

### Headers

`None`

### Query

`None`

### Body

`None`

### Response Type

`String`

### Response

```
pong
```

## 2.Authentication

 ### Description 

 provides token to access other API'S, gives better control and accessibility over the api's 

 ### Method

`GET`

### URL

`/authentication`

### Headers

`None`

### Query

`None`

### Body

`None`

### Response Type

`JSON`

### Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiU2F0IE9jdCAwOCAyMDIyIDIyOjQzOjU4IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2NTI0OTIzOH0.x1sGFnw51ibu5nqD3uaJPRUbmQ4YzyS48lPmlJ-dFEo"
}
```



