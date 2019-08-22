const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	methodOverride = require('method-override'),
	port = process.env.PORT || 5010,
	keys = require('./config/keys'),
	seeds = require('./seeds'),
	Project = require('./models/Project'),
	Tab = require('./models/Tab'),
	Section = require('./models/Section'),
	Group = require('./models/Group'),
	Field = require('./models/Field')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const mongoDB = keys.MONGODB_URI

mongoose.Promise = global.Promise
//connect to mongoose
mongoose
	.connect(mongoDB, {useNewUrlParser: true})
	.then(() => console.log('MongoDB connected!'))
	.catch(err => console.log('error connecting to MongoDB\n', err))

// seeds.topFunc()


/** An emulation for '/ws-pm/v1/projects/search' endpoint, that returns all projects*/
app.post('/projects/search',(req,res)=>{
	Project.find({})
		.then(projects=>{
			let intermediate = []
			seeds.objects.map(object=>{
				console.log(object)
				let insideIntermediate=[]
				//make an array of all projects according to it's objectName
				projects.map(project=>{
					if(project.objectName === object){
						insideIntermediate.push(project)
					}
				})
				//make and array, where only latest stage of a project will go
				intermediate.push(insideIntermediate[insideIntermediate.length-1])
			})
			//send this array
			res.send(intermediate)
		})
})

app.get('/projects/',(req,res)=>{
	Project.find({})
		.then(projects=>{
			//send this array
			res.send(projects.slice(0,5))
		})
})

app.get('/related/:id',(req,res)=>{
	const objectId = req.params.id
	Project.findOne({_id:objectId})
		.then(project=>{
			const nameToRelate = project.objectName;
			Project.find({objectName:nameToRelate})
				.then(projects=>{
					let related=projects.map(project=>{
						return {
							id:project._id,
							value:project.stage
						}
					})
					res.send(related)
				})
		})
})

app.get('/projects/:id',(req,res)=>{
	const projectid = req.params.id
	Project.find({_id:projectid})
		.then(project=>{
			res.send(project)
		})
})

app.get('/tabs/:id',(req,res)=>{
	const projectId = req.params.id
	Tab.find({projectId:projectId})
		.then(tabs=>{
			res.send(tabs)
		})
})

app.get('/section/:id',(req,res)=>{
	const tabId = req.params.id
	Section.find({tabId:tabId})
		.then(sections=>{
			res.send(sections.sort())
		})
})
app.get('/group/:id',async (req,res)=>{
	const sectionId = req.params.id
	const groups = await Group.find({sectionId:sectionId}).exec()
	groups.sort((a,b)=>{
		return a.sort-b.sort
	})
	const getResult = async groups =>{
		const promises = groups.map(group=>{
			return Field.find({groupId:group._id}).exec()
		})
		const result = await Promise.all(promises)
		return result
	}
	const groupFields = await getResult(groups)
	const result = groups.map((group,index)=>{
		let interim = {}
		interim.name=group.name
		interim.fields = groupFields[index]
		return interim
	})
	console.log(result)
	res.send(result)
})


app.listen(port, function() {
	console.log('server up and running on port', port)
})
