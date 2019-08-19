const Project = require('./models/Project')

const streets = [
	'Ленина',
	'Энгельса',
	'Маркса',
	'Билана',
	'Вована',
	'Луначарского',
	'Строителей',
	'Невская',
	'Рязанская',
	'Тенистая',
	'Виноградная',
]

const cities = [
	'121000 Москва',
	'188057 Санкт-Петербург',
	'390015 Рязань',
	'664013 Иркутск',
	'690013 Владивосток',
	'620025 Екатеринбург',
	'603018 Нижний Новгород',
]

const objects = [
	'ДОУ на 225 мест',
	'ООУ на 450 мест',
	'Котельная',
	'Торговый центр',
	'Производственное помещение',
	'Складское помещение',
	'Автостоянка',
	'Жилой дом на 16 этажей',
	'Жилой дом на 20 этажей',
	'Жилой дом на 12 этажей',
	'Жилой дом на 5 этажей',
	'Жилой дом на 7 этажей',
	'Жилой дом на 9 этажей',
	'Жилой дом на 15 этажей',
	'Жилой дом на 17 этажей',
]

const stages=[
	'ОБИН',
	'Проектирование',
	'Строительство',
	'Эксплуатация',
	'Снос',
]


const generateRandom=(min,max)=>{
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateAdress(streets,cities) {
	return (cities[generateRandom(0,cities.length)] + ', ' + streets[generateRandom(0,streets.length)] + ', ' + generateRandom(1,81))
}

function generateAddresses(objects,streets,cities){
	let result = [];
	objects.map(object=>{
		result.push(generateAdress(streets,cities))
	})
	return result
}

function clearAllProjects(){
	Project.deleteMany({},()=>{console.log('deleted all Projects')})
}

const objectAddresses = generateAddresses(objects,streets,cities)
console.log(objects.length)

function generateProjects(objects,stages){
	for (let object in objects){
		let newProject = {
			stage:stages[0],
			dateCreated:new Date(),
			dateChange:new Date(),
			dateClosingStage:null,
			objectName:objects[object],
			addressGenerated:objectAddresses[object],
		}
		new Project(newProject)
			.save()
			.then(project=>{
				console.log(project.objectName)
			})
	}
}

function generateDesignProjects(objects,stages){
	for (let object in objects){
		if(object%2===0){
			const newProject = {
				stage:stages[1],
				dateCreated:new Date(),
				dateChange:new Date(),
				dateClosingStage:null,
				objectName:objects[object],
				addressGenerated:objectAddresses[object],
			}
			new Project(newProject)
				.save()
				.then(project=>{
					console.log(project.addressGenerated)
				})
		}
	}
}

function generateConstructionProjects(objects,stages){
	for (let object in objects){
		if(object%6===0){
			const newProject = {
				stage:stages[2],
				dateCreated:new Date(),
				dateChange:new Date(),
				dateClosingStage:null,
				objectName:objects[object],
				addressGenerated:objectAddresses[object],
			}
			new Project(newProject)
				.save()
				.then(project=>{
					console.log(project.addressGenerated)
				})
		}
	}
}

function generateExpluatationProjects(objects,stages){
	for (let object in objects){
		if(object%12===0){
			const newProject = {
				stage:stages[3],
				dateCreated:new Date(),
				dateChange:new Date(),
				dateClosingStage:null,
				objectName:objects[object],
				addressGenerated:objectAddresses[object],
			}
			new Project(newProject)
				.save()
				.then(project=>{
					console.log(project.addressGenerated)
				})
		}
	}
}

const topFunc = ()=>{
	 clearAllProjects()
	 generateProjects(objects,stages,streets, cities)
	 generateDesignProjects(objects,stages)
	 generateConstructionProjects(objects,stages)
	 generateExpluatationProjects(objects,stages)
}

module.exports = topFunc
