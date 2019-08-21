const Project = require('./models/Project')
const Tab = require('./models/Tab')
const Section = require('./models/Section')
const Group = require('./models/Group')
const Field = require('./models/Field')

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

const types=[
	'input',
	'select',
	'file'
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

const generateRandomBoolean=()=>{
	const decider = Math.floor(Math.random() * (1 - 2));
	return decider>0
}

const generateRandomItem=(arrayOfItems)=>{
	return arrayOfItems[Math.floor(Math.random()*arrayOfItems.length)];
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
	Group.deleteMany({},()=>{console.log('deleted all groups')})
	Field.deleteMany({},()=>{console.log('deleted all fields')})
}

const objectAddresses = generateAddresses(objects,streets,cities)
console.log(objects.length)

function generateProjects(objects,stages){
	for (let object in objects){
		const progressAll = generateRandom(6,9)
		const progressCurrent = generateRandom(0,progressAll)
		let newProject = {
			stage:stages[0],
			dateCreated:new Date(),
			dateChange:new Date(),
			dateClosingStage:null,
			objectName:objects[object],
			objectNum:generateRandom(12,1488).toString()+'/'+generateRandom(1,69).toString(),
			type:'BIM-проект',
			progress:progressCurrent+'/'+progressAll,
			addressGenerated:objectAddresses[object],
		}
		new Project(newProject)
			.save()
			.then(project=>{
				generateTabs(project)
				if(object%2===0){
					const progressAll = generateRandom(6,9)
					const progressCurrent = generateRandom(0,progressAll)
					const newProject = {
						stage:stages[1],
						dateCreated:new Date(),
						dateChange:new Date(),
						dateClosingStage:null,
						objectName:objects[object],
						objectNum:generateRandom(12,1488).toString()+'/'+generateRandom(1,69).toString(),
						type:'BIM-проект',
						progress:progressCurrent+'/'+progressAll,
						addressGenerated:objectAddresses[object],
					}
					new Project(newProject)
						.save()
						.then(project=>{
							generateTabs(project)
							if(object%6===0){
								const progressAll = generateRandom(6,9)
								const progressCurrent = generateRandom(0,progressAll)
								const newProject = {
									stage:stages[2],
									dateCreated:new Date(),
									dateChange:new Date(),
									dateClosingStage:null,
									objectName:objects[object],
									objectNum:generateRandom(12,1488).toString()+'/'+generateRandom(1,69).toString(),
									type:'BIM-проект',
									progress:progressCurrent+'/'+progressAll,
									addressGenerated:objectAddresses[object],
								}
								new Project(newProject)
									.save()
									.then(project=>{
										generateTabs(project)
										if(object%12===0){

											const progressAll = generateRandom(6,9)
											const progressCurrent = generateRandom(0,progressAll)
											const newProject = {
												stage:stages[3],
												dateCreated:new Date(),
												dateChange:new Date(),
												dateClosingStage:null,
												objectName:objects[object],
												objectNum:generateRandom(12,1488).toString()+'/'+generateRandom(1,69).toString(),
												type:'BIM-проект',
												progress:progressCurrent+'/'+progressAll,
												addressGenerated:objectAddresses[object],
											}
											new Project(newProject)
												.save()
												.then(project=>{
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

const generateSections = (tab)=>{
				for(let i=0;i<generateRandom(1,16);i++){
					const newSection = {
						name : 'Section '+ i +' for tab ' + tab.name,
						tabId:tab._id
					}
					new Section(newSection)
						.save()
						.then(section=>{
							generateGroups(section)
						})
				}
}

function generateGroups(section){
	for(let i=0;i<generateRandom(1,7);i++){
		const newGroup = {
			name : 'Group '+ i +' for section ' + section.name,
			sectionId:section._id,
			sort:i,
			userElement:generateRandomBoolean()
		}
		new Group(newGroup)
			.save()
			.then(group=>{
				generateFields(group)
			})
	}
}

function generateFields(group){
	for(let i=0;i<generateRandom(1,7);i++){
		const newField = {
			name : 'Field '+ i +' for group ' + group.name,
			value : 'Field value'+ i +' for group ' + group.name,
			groupId:group._id,
			sort:i,
			userElement:generateRandomBoolean(),
			type:generateRandomItem(types),
		}
		new Field(newField)
			.save()
	}
}


const topFunc = ()=>{
	clearAll()
	setTimeout(()=>{generateProjects(objects,stages,streets, cities)},7000)

}

module.exports = {topFunc,stages,objects}
