export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string
}


export interface ContentProps {
  courseParts: CoursePart[];
}

export interface CourseWithDesription extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseWithDesription {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseWithDesription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseWithDesription {
  type: "special";
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
