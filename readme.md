

### TubiTV interview demo

#### Install + Run

```bash
npm i
npm run tsc
node .

```

<details>
<summary>Start MongoDB</summary>
./start-mongo.sh
</details>


To read the contentqueue for a user, read from the contentqueue collection by user.
In the long run, we'd want to shard the db tables/collections by user.

## Create user

```bash
HTTP POST  /rest/user
{
  "username": string
}
```


## Create content/watchable

```
HTTP POST  /rest/watchable
{
  "title": string
  "type": "tv" | "movie"
}
```

## Add to content queue for user 

```bash
HTTP POST  /rest/contentqueue
{
  "username": string
  "watchableId": string
}

```

