const fs = require('fs')
const parseString = require('xml2js').parseString
const csvWriter = require('csv-write-stream')

const writer = csvWriter({ separator: ';' })
const storeNr = '1213'
const butiksartikelnFile = 'butiksartikeln.xml'
const sortimentFile = 'sortimentsfilen.xml'
const exportFile = 'vastrahamnen.csv'

fs.readFile(butiksartikelnFile, 'utf8', (err, data) => {
  if (err) { return console.error(err) }
  parseString(data, (err, res) => {
    if (err) { return console.error(err) }

    const stores = res.ButikArtikel.Butik
    const store = stores.find(x => x['$'].ButikNr === storeNr)

    fs.readFile(sortimentFile, 'utf8', (err, data) => {
      parseString(data, (err, res) => {
        if (err) { return console.error(err) }

        writer.pipe(fs.createWriteStream(exportFile))
        let allKeys = [];

        let sortiment = res.artiklar.artikel.filter(x => store.ArtikelNr.indexOf(x.nr[0]) > -1)
        sortiment = sortiment.map(x => {
          const keys = Object.keys(x)
          keys.map(y => {
            if (allKeys.indexOf(y) === -1) {
              allKeys.push(y)
            }
          })
          item = {
            nr: x.nr ? x.nr[0] : undefined,
            articleid: x.Artikelid ? x.Artikelid[0] : undefined,
            varnummer: x.Varnummer ? x.Varnummer[0] : undefined,
            name: x.Namn ? x.Namn[0] : undefined,
            name2: x.Namn2 ? x.Namn2[0] : undefined,
            price: x.Prisinklmoms ? x.Prisinklmoms[0] : undefined,
            priceperliter: x.PrisPerLiter ? x.PrisPerLiter[0] : undefined,
            volume: x.Volymiml ? x.Volymiml[0] : undefined,
            salestart: x.Saljstart ? x.Saljstart[0] : undefined,
            outofstock: x.Utgått ? x.Utgått[0] : undefined,
            group: x.Varugrupp ? x.Varugrupp[0] : undefined,
            type: x.Typ ? x.Typ[0] : undefined,
            style: x.Stil ? x.Stil[0] : undefined,
            packaging: x.Forpackning ? x.Forpackning[0] : undefined,
            cap: x.Forslutning ? x.Forslutning[0] : undefined,
            origin: x.Ursprung ? x.Ursprung[0] : undefined,
            countryoforigin: x.Ursprunglandnamn ? x.Ursprunglandnamn[0] : undefined,
            producer: x.Producent ? x.Producent[0] : undefined,
            supplier: x.Leverantor ? x.Leverantor[0] : undefined,
            year: x.Argang ? x.Argang[0] : undefined,
            testyear: x.Provadargang ? x.Provadargang[0] : undefined,
            alcohol: x.Alkoholhalt ? x.Alkoholhalt[0] : undefined,
            sortiment: x.Sortiment ? x.Sortiment[0] : undefined,
            sortimenttext: x.SortimentText ? x.SortimentText[0] : undefined,
            organic: x.Ekologisk ? x.Ekologisk[0] : undefined,
            ethical: x.Etiskt ? x.Etiskt[0] : undefined,
            kosher: x.Koscher ? x.Koscher[0] : undefined,
            description: x.RavarorBeskrivning ? x.RavarorBeskrivning[0] : undefined,
            deposit: x.Pant ? x.Pant[0] : undefined,
            ethicallabel: x.EtisktEtikett ? x.EtisktEtikett[0] : undefined
          }

          if (item.alcohol && item.volume && item.price) {
            const alc = parseInt(item.alcohol.slice(0, -1))
            const volume = parseInt(item.volume)
            const price = parseInt(item.price)

            item.apk = volume * alc / 100 / price
          }
          writer.write(item)
          return item
        })
        writer.end()
        //console.log(allKeys)
        console.log('Found', sortiment.length, 'of', store.ArtikelNr.length, 'products at Systembolaget', storeNr)
        console.log('Dumped to', exportFile)
      })
    })
  })
})
