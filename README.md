# Mydeez

[![made-with-Nodejs](https://img.shields.io/badge/Made%20with-Nodejs-1f425f.svg)](https://nodejs.org/en/)
[![Minimum node.js version](https://badgen.net/npm/node/express)](https://npmjs.com/package/express)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Api to manage users with playlists and songs from albums.

(It's a boilerplate project) to have basics for node JS).

## Start the project

```
docker-compose up -d
npm start
# you can now call http://localhost:3000/
```


## Create the fixtures

```
npm run fixtures
```

## Login

```
curl --location --request POST 'http://localhost:3000/login' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "{username}",
    "password": "{password}"
}'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

