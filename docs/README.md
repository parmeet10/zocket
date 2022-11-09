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

## 3.Products

 ### Description 

Using this api you can create/get products.

 ### Method

`POST`

### URL

`/products`

### Headers

`x-auth`

### Query

`None`

### Body

`{
    "product":"some test product"
}`

### Response Type

`String`

### Response
```
  {
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "productId": 10
    }
```
 ### Method 
 
 `GET`

### URL

`/products`

### Headers

`x-auth`

### Query

`productId`

### Body

`none`

### Response Type

`String`

### Response
```
 {
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "products": [
            {
                "id": 4,
                "product": "Farerro rocher cake",
                "active": 1,
                "created_at": "2022-10-08T17:49:28.000Z"
            }
        ]
    }
}
```
## 4.platforms

 ### Description 

  Using this api you can create/get platforms.

 ### Method

`POST`

### URL

`/platforms`

### Headers

`x-auth`

### Query

`None`

### Body

`{
    "platform":"Instagram"
}`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "platfromId": 5
    }
}
```
### Method

`GET`

### URL

`/platforms`

### Headers

`x-auth`

### Query

`None`

### Body

`none`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "platforms": [
            {
                "id": 1,
                "platform": "Google",
                "active": 1,
                "created_at": "2022-10-08T18:02:26.000Z"
            },
            {
                "id": 2,
                "platform": "Facebook",
                "active": 1,
                "created_at": "2022-10-08T18:03:57.000Z"
            },
            {
                "id": 3,
                "platform": "Youtube",
                "active": 1,
                "created_at": "2022-10-08T18:04:08.000Z"
            },
            {
                "id": 4,
                "platform": "Instagram",
                "active": 1,
                "created_at": "2022-10-08T18:04:18.000Z"
            }
        ]
    }
}
```
## 5.Campaigns

### Description 

### Api for create,get,update campaigns .

 ### Method

`GET`

### URL

`/campaigns`

### Headers

`x-auth`

### Query

`status='live&from=2022-10-04 23:32:26
`

### Body

`none`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "campaigns": [
            {
                "id": 4,
                "campaign_name": "testCampaign2",
                "budget": 1000,
                "status": "live",
                "startDate": "2022-10-04T18:02:26.000Z",
                "endDate": "2022-10-18T18:02:26.000Z",
                "location": "delhi",
                "plaform": "Youtube",
                "product": "Brownie cake with cream",
                "active": 1,
                "created_at": "2022-10-09T09:16:24.000Z"
            },
            {
                "id": 6,
                "campaign_name": "testCampaign - 5",
                "budget": 1000,
                "status": "live",
                "startDate": "2022-10-04T18:02:26.000Z",
                "endDate": "2022-10-18T18:02:26.000Z",
                "location": "delhi",
                "plaform": "Facebook",
                "product": "Blueberry cake",
                "active": 1,
                "created_at": "2022-10-09T09:16:38.000Z"
            },
            {
                "id": 7,
                "campaign_name": "testCampaign - 9",
                "budget": 1000,
                "status": "live",
                "startDate": "2022-10-04T18:02:26.000Z",
                "endDate": "2022-10-18T18:02:26.000Z",
                "location": "delhi",
                "plaform": "Facebook",
                "product": "Blueberry cake",
                "active": 0,
                "created_at": "2022-10-09T15:52:16.000Z"
            }
        ]
    }
}
```
`PUT`

### URL

`/campaigns`

### Headers

`x-auth`

### Query

`campaignId=7`

### Body

`{
    "active":0
}`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "updatedCampaign": [
            {
                "id": 7,
                "campaign_name": "testCampaign - 9",
                "budget": 1000,
                "status": "live",
                "startDate": "2022-10-04T18:02:26.000Z",
                "endDate": "2022-10-18T18:02:26.000Z",
                "location": "delhi",
                "plaform": "Facebook",
                "product": "Blueberry cake",
                "active": 0,
                "created_at": "2022-10-09T15:52:16.000Z"
            }
        ]
    }
}
```
# 'USE POSTMAN TO HIT API'


[DeveloperTask.pdf](https://github.com/parmeet10/zocket/files/9967762/DeveloperTask.pdf)



