const fs = require("fs");

class Procurement {

  constructor(path = "procurement.json") {
    this.path = path;
    this.procurements = [];

    fs.readFile(this.path)
      .then((data, err) => {
        if(err) {
          console.log(err);
        } else {
          this.procurements = JSON.parse(data);
        }
      })
  }

  // method to get all the procurement data
  getAllProcurement() {
    return this.procurements
  }

  // add a new credit sale
  async add(procurement) {
    this.procurements.push(procurement);
    return await this.save();
  }

  // save the sales to the file
  async save() {
    let isSavedSuccessful
    await fs.writeFile(this.path, JSON.stringify(this.procurements))
      .then(err => {
        if(err) {
          isSavedSuccessful = false;
        } else { 
          isSavedSuccessful = true;
        }
      })

    return isSavedSuccessful;
  }
}

module.exports = {Procurement}