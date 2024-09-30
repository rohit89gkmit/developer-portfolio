export interface projectInterface {
    projectName: string;
    isCompleted: boolean;
    techStack: string[];
  }

export interface developerInterface {
    email: string;
    name: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: projectInterface[];
    experience: number;
  }