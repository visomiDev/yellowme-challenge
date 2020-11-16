# Introduction: Install and configure

Hello!!

This is a fast developed service for short your URL, for run this project you only need 2 things:

Nodejs >= 6
MongoDB (from Atlas service or in your local), you can create one from this [link](https://cloud.mongodb.com/)

Next you need to clone the repo:

```bash
git clone https://github.com/visomiDev/yellowme-challenge.git && cd yellowme-challenge
```

And install it with:

```bash
npm i
```

You can copy or create a new one .env file, and change the URL of database for your recent created DB.

# Testing

For a better test you can set a global variable in your bash session:

```bash
export YELLOWME_VISOMI_CHALLENGE="http://localhost:8000"
```

if you wan to test in the deployed env you need to set this var:

```bash
export YELLOWME_VISOMI_CHALLENGE="https://yellowme-challenge.visomi.dev"
```

For test the create redirect endpoint you can run this command:

```bash
curl --location --request POST "$YELLOWME_VISOMI_CHALLENGE" \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://facebook.com"
  }'
```

For test your new redirect, copy and paste the result of the previous command in you web browser

For test the bulk create redirect endpoint you can run this command:

```bash
curl --location --request POST "$YELLOWME_VISOMI_CHALLENGE" \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "urls": ["https://google.com", "https://youtube.com"]
  }'
```

And you can test each URL
