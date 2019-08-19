const Project = require('./models/Project')
const Tab = require('./models/Tab')
const Section = require('./models/Section')

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

const tabsHashTable = {
	ОБИН:[
		'Реквизиты',
		'Общие исходные данные',
		'Результаты инженерных изысканий',
		'Принципиальные решения',
		'Реестр договоров',
		'Информация о закупках',
	],
	Проектирование:[
		'Реквизиты',
		'Исходные данные',
		'Результаты инженерных изысканий',
		'Проектные решения',
		'Реестр договоров',
		'Информация о закупках',
	],
	Строительство:[
		'Реквизиты',
		'Исходные данные',
		'Проектные решения',
		'Исполнительная документация',
		'Акты приёмки',
		'Реестр договоров',
		'Информация о закупках',
	],
	Эксплуатация:[
		'Реквизиты',
		'Реестр договоров',
		'Информация о закупках',
	],
}


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

function clearAll(){
	Project.deleteMany({},()=>{console.log('deleted all Projects')})
	Tab.deleteMany({},()=>{console.log('deleted all tabs')})
	Section.deleteMany({},()=>{console.log('deleted all sections')})
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
				generateTabs(project)
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
							generateTabs(project)
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
										generateTabs(project)
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
													console.log('done generating projects on all stages, they look like this:\n',project)
													generateTabs(project)
												})
										}
									})
							}
						})
				}
			})
	}
}

function generateTabs(project){
				tabsHashTable[project.stage].map(tab=>{
					const newTab = {
						name:tab,
						projectId:project._id
					}
					new Tab(newTab)
						.save()
						.then(tab=>{
							generateSections(tab)
						})
				})
}

function generateSections(tab){
				for(let i=0;i<generateRandom(1,16);i++){
					const newSection = {
						name : 'Section '+ i +' for tab ' + tab.name,
						tabId:tab._id
					}
					new Section(newSection)
						.save()
				}
}

const topFunc = ()=>{
	clearAll()
	setTimeout(()=>{generateProjects(objects,stages,streets, cities)},5000)
	// setTimeout(()=>{generateTabs()},13000)
	// setTimeout(()=>{generateSections()},18000)
}

module.exports = topFunc
