Simple express app based on documentation from https://expressjs.com/
Typescript used.

Any request body parsers (including express library parser) eliminated and created simple (buggy) extension implementation. 
As express documentation says nothing about extensions creation I chose middleware way to parse.
Active for specific routes.

Install and run:
```
npm i
npm run dev
```

Some test added:
```
npm test
```

Curl example:
```
curl --location --request POST 'localhost:3000/parse' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "menu": {
        "id": 1.0,
        "value": "File Name",
        "popup": {
            "menuitem": [
                {"value": "New", "onclick": "CreateNewDoc()"},
                {"value": "Open", "onclick": "OpenDoc()"},
                {"value": "Close", "onclick": "CloseDoc()"}
            ]
        }
    }
}'
```
