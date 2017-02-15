# systemet
Find all products available at a Systembolaget near you.

## Usage
Download the ```butiksartikeln``` and ```sortimentsfilen``` XML files from [Systembolaget](https://www.systembolaget.se/api/) and make sure that ```index.js``` points to the correct paths. Change the ```storeNr``` to the Systembolaget store you want to query and ```exportCSV``` and ```exportJSON``` to the file paths where you want to receive the output.

    // make sure all dependencies are installed
    npm install

    // start script
    npm start

Outputs a CSV file containing all product informations available of all products that are available at the chosen Systembolaget store and calculates their APK (alcohol in ml per SEK).

## TODO

- [ ] Search for Systembolaget store by location or name instead of asking for storeNr
- [ ] Instead of CSV/JSON, create pretty web platform

Happy hacking (and drinking)!
