export interface ProjectTheme {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  theme: string;
  imageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  theme: string;
}
