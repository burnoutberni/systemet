# systemet
Find all products available at a Systembolaget near you.

## Usage
Download the ```butiksartikeln``` and ```sortimentsfilen``` XML files from [Systembolaget](https://www.systembolaget.se/api/) and make sure that ```index.js``` points to the correct paths. Change the ```storeNr``` to the Systembolaget store you want to query.

    // make sure all dependencies are installed
    npm install

    // start script
    npm start

Outputs a CSV file containing all product informations available of all products that are available at the chosen Systembolaget store and calculates their APK (alcohol in ml per SEK).

Happy hacking (and drinking)!
