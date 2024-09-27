interface project{
    projectName: string;
    isCompleted: boolean;
    techStack: string[];
}
interface developer{
    email: string;
    name: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: project[];
    experience: number;
}
const developers: developer[] = [
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

const newDeveloper: developer = {
        email: 'xyz@.com',
        name: 'Rudra',
        age: 22,
        isEmployed: true,
        skills: ['React','JS'],
        experience: 2,
        projects: [{projectName: 'xz',isCompleted:false,techStack:['JS','React']}]
}

function addDeveloper(newDeveloper:developer){
    const isExists = developers.some(({email})=>email===newDeveloper.email);
    if(isExists){
        alert('Developer already exists');
    }
    else{
        developers.push(newDeveloper);
    }
}
addDeveloper(newDeveloper);
console.log(developers);

