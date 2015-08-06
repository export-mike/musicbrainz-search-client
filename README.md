# musicbrainz-search-client
Music brainz client for node.js, uses json api and xml. 

Designed to be a simple wrapper of the json api. 

```
  var mb = require('musicbrainz-search-client');
  
  var release = mb.Release(options);
  
  release.search({artist:'Jack Johnson', release:'Banana Pancakes'}, function(err, result){
    
  })
```

TODO:
Add XML API support complete parsing response.
Move Search to static propert on each model. To allow for easier search, lower the boilerplate code.
