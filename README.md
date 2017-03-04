# systemet
A better Systembolaget API. Not as good as [bolaget.io](https://github.com/larsha/bolaget.io) though. Kids, look for other people's projects before you invest too much time into coding your own crappy solutions.

## Usage
    // make sure all dependencies are installed
    npm install

    // run script to fetch data
    npm run fetch

    // start server to query for product ids
    npm start

```fetch``` fetches the relevant data from [Systembolaget](https://systembolaget.se/api) and outputs a CSV and a JSON file containing all product informations available of all products that are available at the chosen Systembolaget store (or generally all products if no store was specified) and calculates their APK (alcohol in ml per SEK). In case you want to specify a certain Systembolaget store, open ```fetch.js``` and change the ```storeNr``` to the Systembolaget store you want to query and ```exportCSV``` and ```exportJSON``` to the file paths where you want to receive the output.

```start``` starts an https server on port 8081 which returns the corresponding product information if you query for ```/:productId```. Make sure you have a TLS cert and private key at ```cert.pem``` and ```key.pem```.

## TODO

- [ ] Search for Systembolaget store by location or name instead of asking for storeNr
- [ ] Instead of CSV/JSON, create pretty web platform

Happy hacking (and drinking)!
