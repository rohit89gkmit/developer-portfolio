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
const developers: developerInterface[] = [
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

function addDeveloper(newDeveloper:developerInterface):void{
    const isExists = developers.some(({email})=>email===newDeveloper.email);
    if(isExists){
        alert('Developer already exists');
    }
    else{
        developers.push(newDeveloper);
    }
}
addDeveloper(newDeveloper);
// console.log(developers);

function addSkill(developer:developerInterface, skill:string):void{
    const isExists = developer.skills.some((currentSkill)=>currentSkill===skill);
    if(isExists){
        alert('Skill already exists');
    }
    else{
        developer.skills.push(skill);
    }
}

addSkill(newDeveloper,'Node');
console.log(developers[0]);
