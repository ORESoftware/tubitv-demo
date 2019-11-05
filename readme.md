

### TubiTV interview demo


## Create user

HTTP POST  /rest/user
{
  "username": string
}

## Create content/watchable

HTTP POST  /rest/watchable
{
  "title": string
  "type": "tv" | "movie"
}


## Add to content queue for user 

HTTP POST  /rest/contentqueue
{
  "username": "string"
  "watchableId": "string"
}
