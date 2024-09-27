interface projectInterface{
    projectName: string;
    isCompleted: boolean;
    techStack: string[];
}
interface developerInterface{
    email: string;
    name: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: projectInterface[];
    experience: number;
}
const developersList: developerInterface[] = [
    {
        email: 'rohitsharmaa.com',
        name: 'Rohit',
        age: 20,
        isEmployed: true,
        skills: ['React','JS'],
        experience: 0,
        projects: [{projectName: 'xyz',isCompleted:false,techStack:['JS','React']}]
    }
];

const newDeveloper: developerInterface = {
        email: 'xyz@.com',
        name: 'Rudra',
        age: 22,
        isEmployed: true,
        skills: ['React','JS'],
        experience: 2,
        projects: [{projectName: 'xz',isCompleted:false,techStack:['JS','React']}]
}

function isDeveloperExists(developer:developerInterface):boolean{
    return developersList.some(({email})=>email===developer.email);
}
function indexOfDeveloperInDeveloperList(developer:developerInterface):number{
    const index = developersList.findIndex(({email})=>email===developer.email);
    return index;
}

function addDeveloper(developer:developerInterface):void{
    if (developer.name.trim().length === 0) {
        throw new Error('Developer name is required and cannot be empty.');
    }

    if (typeof developer.age !== 'number' || developer.age <= 0) {
        throw new Error('Developer age must be a positive value');
    }

    if (typeof developer.isEmployed !== 'boolean') {
        throw new Error('Developer employment status must be a boolean value');
    }

    if (developer.skills.length === 0) {
        throw new Error('Developer must have at least one skill.');
    }

    if (typeof developer.experience !== 'number' || developer.experience < 0) {
        throw new Error('Developer experience must be a non-negative number.');
    }
    if (developer.experience>developer.age) {
        throw new Error('Developer cannot have experience greater than age');
    }
    if (developer.projects.length===0) {
        throw new Error('Developer must have at least one project');
    }
    if(isDeveloperExists(developer)){
        throw new Error('Developer with this email already exists');
    }
    else{
        developersList.push(developer);
    }
}
addDeveloper(newDeveloper);

function cloneDeveloper(developer:developerInterface):developerInterface{
    return JSON.parse(JSON.stringify(developer))
}

function addSkill(developer:developerInterface, skill:string):void{
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');
    
    const isExistsSkill = developer.skills.some((currentSkill)=>currentSkill===skill);
    if(isExistsSkill){
        throw new Error('Skill already exists');
    }
    else{
        const clonedDeveloper = cloneDeveloper(developer);
        clonedDeveloper.skills.push(skill);
        const index = indexOfDeveloperInDeveloperList(developer);
        if(index) developersList[index] = clonedDeveloper;
    }
}

addSkill(newDeveloper,'Node');

function updateSkill(developer:developerInterface,oldSkill:string,newSkill:string):void{
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');

    const indexOfOldSkill = developer.skills.findIndex((currentSkill)=>currentSkill===oldSkill);
    if(indexOfOldSkill===-1) throw new Error('Skill do not exist');
    else{
        const clonedDeveloper = cloneDeveloper(developer);
        clonedDeveloper.skills[indexOfOldSkill] = newSkill;
        const index = indexOfDeveloperInDeveloperList(developer);
        if(index) developersList[index] = clonedDeveloper;
    }
}

function validateProject(project: projectInterface): boolean {
    return project.techStack.length > 1 && project.techStack.some((currentTechStack)=>currentTechStack==='JS');
}

function addProject(developer: developerInterface, project: projectInterface): void {
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');

    if (validateProject(project)) {
        throw new Error('Invalid project details');
    }
    const clonedDeveloper = cloneDeveloper(developer);
    clonedDeveloper.projects.push(project);
    const index = indexOfDeveloperInDeveloperList(developer)
    developersList[index] = clonedDeveloper;
}

function listProjects(developer:developerInterface):string {
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');

    return developer.projects.map((currentProject)=>currentProject.projectName).join(', ');
}

function listSkills(developer:developerInterface):string{
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');

    return developer.skills.map((currentSkill)=>currentSkill).join(', ');
}

function countCompletedProjects(developer:developerInterface):number{
    if(!isDeveloperExists(developer)) throw new Error('Developer do not Exists');

    return developer.projects.reduce((accum,currentProject)=>currentProject.isCompleted ? (accum+1) :accum, 0)
}


