const bodyParser = require('body-parser')
var express=require('express')
var app=express()
var mongojs = require('mongojs')
let alert = require('alert');

var cString='mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/VishnuBot?retryWrites=true&w=majority'

var db = mongojs(cString, ['calendar'])

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/index.html')
})

app.use(express.static('public'))

app.get('/add',function(req,res){
    res.sendFile(__dirname+'/public/add.html');
})


app.get('/firstvalid',function(req,res){

	var a={
		Date:req.query.uname,
		Event:req.query.pass
	}

	db.calendar.insert(a,function(err,docs){
		if(err){
            res.send("something went wrong")
        }
        else{
            res.send("added")
        }
	})
})

app.get('/del',function(req,res){
    res.sendFile(__dirname+'/public/del.html');
})

app.get('/lastvalid',function(req,res){

	var a={
		Date:req.query.uname,
		Event:req.query.pass
	}

	db.calendar.remove(a,function(err,result){
		if(err){
            res.send("something went wrong")
        }
        else{
            res.send("deleted")
        }
	})
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});
