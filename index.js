const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	methodOverride = require('method-override'),
	port = process.env.PORT || 5010,
	keys = require('./config/keys'),
	seeds = require('./seeds'),
	testControllers = require('./testControllers'),
	Project = require('./models/Project')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const mongoDB = keys.MONGODB_URI

mongoose.Promise = global.Promise
//connect to mongoose
mongoose
	.connect(mongoDB, {useNewUrlParser: true})
	.then(() => console.log('MongoDB connected!'))
	.catch(err => console.log('error connecting to MongoDB\n', err))

seeds()
testControllers()

app.get('/related',(req,res)=>{
	Project.find({})
		.then(projects=>{
			let result = projects.filter(project=>{
				return project.addressGenerated === projects[12].addressGenerated
			})
			let related=result.map(project=>{
				return {
					id:project._id,
					stage:project.stage
				}
			})
			res.send(related)
		})

})

app.listen(port, function() {
	console.log('server up and running on port', port)
})
