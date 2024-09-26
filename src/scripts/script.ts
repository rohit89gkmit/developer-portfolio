interface project{
    projectName: string;
    isCompleted: boolean;
    techStack: string[];
}
interface developer{
    name: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: project[];
    experience: number;
}

const developers: developer[] = [];
