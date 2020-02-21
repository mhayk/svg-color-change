var fs = require("fs");
const path = require("path");
const tools = require("simple-svg-tools");

const { parse, stringify } = require("svgson");

const directoryPath = path.join(__dirname, "./images");


/*
tools
  .ImportDir(`${__dirname}/images/dark/`)
  .then(collection => {
    collection.forEach((svg, name) => {
      console.log(`${name} >-> ${svg}`);

      parse(svg.toString()).then(json => {
        console.log(json.children[0].children[0].children[0].value);
        json.children[0].children[0].children[0].value =
          ".fa-secondary{opacity:.4;fill:#FFFFFF;}.fa-primary{fill:#ffffff;}";

        const mysvg = stringify(json);
        console.log(mysvg);

        fs.writeFile(`${__dirname}/output/${name}.svg`, mysvg, err => {
          if (err) throw err;

          console.log(`${name} saved!`);
        });
      });
    });
  })
  .catch(err => console.log(err));
*/
  async function main() {
    try {
      const collection = await tools.ImportDir(`${__dirname}/images/dark/`)

      collection.forEach(async (svg, name) => {
        const parsed = await parse(svg.toString())

        parsed.children[0].children[0].children[0].value =
          ".fa-secondary{opacity:.4;fill:#FFFFFF;}.fa-primary{fill:#ffffff;}";

        const mysvg = stringify(parsed);

        await fs.writeFileSync(`${__dirname}/output/${name}.svg`, mysvg)
        console.log(`${name} saved!`);
      })
    } catch (error) {
      console.log(error)
    }
  }

main()