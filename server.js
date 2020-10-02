let express = require('express');
let server = express();
let cors = require('cors')
let upload = require('express-fileupload');
//require("./config/db");
let importExcel = require('convert-excel-to-json');
let del = require('del');
var XLSX = require('xlsx')
const bodyParser = require("body-parser");
//const templateController = require("./controllers/template-controller");
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
var uploadVar;
var xlData
var workbook
var sheet_name_list
server.use(upload());

server.get('/',(req,res)=>{
    var headers = []
    var range = XLSX.utils.decode_range(this.workbook.Sheets[this.sheet_name_list[0]]['!ref']);
    var C, R = range.s.r; 
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = this.workbook.Sheets[this.sheet_name_list[0]][XLSX.utils.encode_cell({c:C, r:R})]
        var hdr = "UNKNOWN " + C;
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

       headers.push(hdr);
    }
    res.send(headers)
})

server.post('/upload',(req,res)=>{
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  req.files.file0.mv('./excel/'+req.files.file0.name,(err)=>{
    if (err)
    return res.status(500).send(err);
  res.send('File uploaded!');
  this.workbook = XLSX.readFile('./excel/'+req.files.file0.name);
  this.sheet_name_list = this.workbook.SheetNames;
  this.xlData = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.sheet_name_list[0]]);
  });
});
// server
//   .route("/template")
//   .get(templateController.listAllTemplate)
//   .post(templateController.createNewTemplate);
  
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(3000,()=>{
  console.log('CORS-enabled web server listening on port 3000')
})