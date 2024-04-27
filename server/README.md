# Server

This is the server which has 2 responsibilites :-

    * Store and Respond with Rebalancing Triggers

    * Run the Cron Jobs

## API

These are the following API functionalities exposed by the server :-

1. Store Data

```json
{
  "_id": "0cce309a-69b6-4c2a-91a7-247020937d5a",
  "colId": "09a25029-6ffc-4192-9e5e-ab8a0fb7619c",
  "containerId": "",
  "name": "Store Rebalancing Data",
  "url": "http://localhost:3000/data",
  "method": "POST",
  "sortNum": 10000,
  "created": "2024-04-27T10:13:30.991Z",
  "modified": "2024-04-27T10:34:00.695Z",
  "headers": [],
  "body": {
    "type": "json",
    "raw": "{\n  \"address\": \"0xe98cEf1748d2874F09dfFbeC69Dd571A0c02C050\",\n  \"tokenA\": \"0xe98cEf1748d2874F09dfFbeC69Dd571A0c02C050\",\n  \"tokenB\": \"0xe98cEf1748d2874F09dfFbeC69Dd571A0c02C050\",\n  \"type\": \"lower\",\n  \"amount\": \"10000\"\n}",
    "form": []
  }
}
```

2. Get Data

```json
{
  "_id": "c39b1cb3-a619-491e-ac0b-f73cedabeea2",
  "colId": "09a25029-6ffc-4192-9e5e-ab8a0fb7619c",
  "containerId": "",
  "name": "Get Rebalancing Data",
  "url": "http://localhost:3000/data/0xe98cEf1748d2874F09dfFbeC69Dd571A0c02C050",
  "method": "GET",
  "sortNum": 20000,
  "created": "2024-04-27T10:38:53.504Z",
  "modified": "2024-04-27T10:43:09.265Z",
  "headers": []
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`
