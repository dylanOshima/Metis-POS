var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

const sampleData = {
  invoiceNumber: '000001',
  date: '2019-10-2',
  items: [{
    itemName: "Chicken Pasta",
    itemQuantity: 1,
    itemPrice: 20,
    itemCharge: 20
  },{
    itemName: "Beer",
    itemQuantity: 4,
    itemPrice: 10,
    itemCharge: 40
  },{
    itemName: "Cheese Cake",
    itemQuantity: 2,
    itemPrice: 20,
    itemCharge: 40
  }],
  subTotal: 100,
  discountType: "Senior Citizens Discount",
  discountPercentage: 12,
  discount: 12,
  taxPercentage: 20,
  tax: 20,
  total: 132,
}

async function generateReceiptDocx(data, fileName) {
  //Load the docx file as a binary
  var content = fs.readFileSync(path.resolve(__dirname, 'InvoiceTemplate.docx'), 'binary');

  var zip = new PizZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  //set the templateVariables
  doc.setData(data);

  try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
  }

  var buf = doc.getZip().generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  await fs.writeFileSync(path.resolve(__dirname, fileName), buf);
}

generateReceiptDocx(sampleData, 'out.docx');