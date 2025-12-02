import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

type CreateProjectPayload = {
  name: string;
  description?: string;
};

export const projectService = {
  async createProject(payload: CreateProjectPayload) {
    try {
      const response = await axiosInstance.post<{
        id: string;
        name: string;
        description: string;
        images: unknown[];
        userId: string;
      }>("/projects", payload);

      return { success: true, data: response.data, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          data: null,
          message: error.response?.data?.message || "Erro ao criar projeto",
        };
      }
      return { success: false, data: null, message: "Erro ao criar projeto" };
    }
  },

  async getProjects() {
    try {
      const response = await axiosInstance.get<
        {
          id: string;
          name: string;
          description: string;
          images: unknown[];
          userId: string;
        }[]
      >("/projects");

      return { success: true, data: response.data, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          data: null,
          message: error.response?.data?.message || "Erro ao buscar projetos",
        };
      }
      return { success: false, data: null, message: "Erro ao buscar projetos" };
    }
  },

  async getProjectById(id: string) {
    try {
      const response = await axiosInstance.get<ProjectDetail>(
        `/projects/${id}`
      );

      return { success: true, data: response.data, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          data: null,
          message: error.response?.data?.message || "Erro ao buscar projeto",
        };
      }
      return { success: false, data: null, message: "Erro ao buscar projeto" };
    }
  },
};
