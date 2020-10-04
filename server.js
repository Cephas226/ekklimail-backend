let express = require('express');
let server = express();
let cors = require('cors')
let upload = require('express-fileupload');
let importExcel = require('convert-excel-to-json');
let del = require('del');
var XLSX = require('xlsx')
const Template = require('./models/templateMail');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
server.use(bodyParser.json());
var replaceall = require("replaceall");
const mongoose = require("mongoose");

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
var post_data;
mongoose.connect('mongodb+srv://cooly:Isge2016*@cluster0-njlkx.mongodb.net/express_db?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
server.use(upload());

server.get('/headers',(req,res)=>{
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

server.get('/excelData',(req,res)=>{
  res.send(this.xlData)
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
server.get('/api/template', (req, res, next) => {
  Template.find()
    .then(template => res.status(200).json(template))
    .catch(error => res.status(400).json({ error }));
});

server.post('/api/template', (req, res, next) => {

  const template = new Template({
    ...req.body
  });
  template.save()
    .then((template) =>
      res.status(201).json(template))
    .catch(error => res.status(400).json({ error }));
    this.post_data=template
});
server.post('/sendmail', (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});
async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'cephaszoubga@gmail.com',
      pass: 'Isge2016*'
    }
  });
  var maillist=[]
  var person=[]
  user.person.map(u=>{
    person=u
  })
  user.content.replace("/\n|\r/g","")

  console.log(user.content.replace("Hello","Couly",))
  // let mailOptions = {
  //   from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
  //   to: person.email, // list of receivers
  //   subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
  //   html: user.content
  // };

  // // send mail with defined transport object
  // let info = await transporter.sendMail(mailOptions);

  // callback(info);
}
server.listen(3000,()=>{
  console.log('CORS-enabled web server listening on port 3000')
})
