import { projectInterface, developerInterface } from "./Interfaces";

type developers = developerInterface[];
const developersList: developerInterface[] = [];

function isDeveloperExists(developer: developerInterface): boolean {
  return developersList.some(({ email }) => email === developer.email);
}
function indexOfDeveloperInDeveloperList(
  developer: developerInterface
): number {
  const index = developersList.findIndex(
    ({ email }) => email === developer.email
  );
  return index;
}
function validateDeveloper(developer: developerInterface): boolean {
  if (developer.name.trim().length === 0) {
    throw new Error("Developer name is required and cannot be empty.");
  }

  if (typeof developer.age !== "number" || developer.age <= 0) {
    throw new Error("Developer age must be a positive value");
  }

  if (typeof developer.isEmployed !== "boolean") {
    throw new Error("Developer employment status must be a boolean value");
  }

  if (developer.skills.length === 0) {
    throw new Error("Developer must have at least one skill.");
  }

  if (typeof developer.experience !== "number" || developer.experience < 0) {
    throw new Error("Developer experience must be a non-negative number.");
  }
  if (developer.experience > developer.age) {
    throw new Error("Developer cannot have experience greater than age");
  }
  if (developer.projects.length === 0) {
    throw new Error("Developer must have at least one project");
  }
  if (isDeveloperExists(developer)) {
    throw new Error("Developer with this email already exists");
  }

  return true;
}

function addDeveloper(developer: developerInterface): void {
  if (validateDeveloper(developer)) developersList.push(developer);
}


function cloneDeveloper(developer: developerInterface): developerInterface {
  return JSON.parse(JSON.stringify(developer));
}

function addSkill(developer: developerInterface, skill: string): void {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  const isExistsSkill = developer.skills.some(
    (currentSkill) => currentSkill === skill
  );
  if (isExistsSkill) {
    throw new Error("Skill already exists");
  }

  const clonedDeveloper = cloneDeveloper(developer);

  clonedDeveloper.skills.push(skill);
  const index = indexOfDeveloperInDeveloperList(developer);
  if (index) developersList[index] = clonedDeveloper;
}

function updateSkill(
  developer: developerInterface,
  oldSkill: string,
  newSkill: string
): void {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  const indexOfOldSkill = developer.skills.findIndex(
    (currentSkill) => currentSkill === oldSkill
  );
  if (indexOfOldSkill === -1) throw new Error("Skill do not exist");

  const clonedDeveloper = cloneDeveloper(developer);

  clonedDeveloper.skills[indexOfOldSkill] = newSkill;
  const index = indexOfDeveloperInDeveloperList(developer);
  if (index) developersList[index] = clonedDeveloper;
}

function validateProject(project: projectInterface): boolean {
  return (
    project.techStack.length > 1 &&
    project.techStack.some((currentTechStack) => currentTechStack === "JS")
  );
}

function addProject( developer: developerInterface, project: projectInterface)
: void {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  if (validateProject(project)) {
    throw new Error("Invalid project details");
  }
  const clonedDeveloper = cloneDeveloper(developer);

  clonedDeveloper.projects.push(project);
  const index = indexOfDeveloperInDeveloperList(developer);
  developersList[index] = clonedDeveloper;
}

function listProjects(developer: developerInterface): string {
    if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

    const { projects } = developer;
    return projects
        .map((currentProject) => currentProject.projectName)
        .join(", ");
}

function listSkills(developer: developerInterface): string {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  const { skills } = developer;
  return skills.join(", ");
}

function countCompletedProjects(developer: developerInterface): number {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  const { projects } = developer;
  return projects.reduce(
    (accum, { isCompleted }) => (isCompleted ? accum + 1 : accum),
    0
  );
}

function findDevelopersBySkill(
  developersList: developers,
  skill: string
): developerInterface[] {
  return developersList.filter(({ skills }) =>
    skills.some((currentSkill) => currentSkill === skill)
  );
}

function updateDeveloper(
  developer: developerInterface,
  updatesObject: Partial<developerInterface>
): developerInterface {
  if (!isDeveloperExists(developer)) throw new Error("Developer do not Exists");

  return { ...developer, ...updatesObject };
}

function sortDevelopersByEmploymentAndAge(
  developersList: developers,
  employedFirst: boolean,
  ageAscending: boolean
): developerInterface[] {
  return developersList.sort((a, b) => {
    if (a.isEmployed !== b.isEmployed) {
      if (employedFirst) {
        return a.isEmployed ? -1 : 1;
      } else {
        return a.isEmployed ? 1 : -1;
      }
    }

    if (ageAscending) {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });
}

function addProperty<T, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): void {

  object[key] = value;
}

function removeDeveloperByCondition(
  developersList: developers,
  condition: (developer: developerInterface) => boolean
): developerInterface[] {
  return developersList.filter((dev) => !condition(dev));
}
const employedDevelopers = removeDeveloperByCondition(
  developersList,
  (developer) => developer.isEmployed
);
