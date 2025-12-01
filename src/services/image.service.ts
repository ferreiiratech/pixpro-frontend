import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";

export const imageService = {
  async uploadImage(file: File, projectId: string) {
    try {
      const requestUploadUrlDto: RequestUploadUrlDto = {
        projectId,
        contentType: file.type,
      };

      const response = await axiosInstance.post<UploadUrlDto>("/images/request-upload-url", requestUploadUrlDto);
      
      const { uploadUrl, fileKey } = response.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      const confirmDto: ConfirmUploadDto = {
        fileKey,
        projectId,
        contentType: file.type,
      };

      const confirmResponse = await axiosInstance.post<ImageDto>("/images/confirm-upload", confirmDto);

      return { success: true, data: confirmResponse.data, message: null };
    } catch (error) {    
      if (error instanceof AxiosError) {
        return { 
          success: false, 
          message: error.response?.data?.message || "Erro no upload da imagem." 
        };
      }

      return { success: false, message: "Erro no upload da imagem." };
    }
  },

  async uploadBatch(files: File[], projectId: string) {
    try {
      const batchRequestDto: BatchRequestUploadUrlDto = {
        projectId,
        files: files.map((f) => ({ contentType: f.type })),
      };

      const response = await axiosInstance.post<UploadUrlDto[]>('/images/batch-request-upload-url', batchRequestDto);  

      const uploadUrls = response.data;

      if (uploadUrls.length !== files.length) {
        throw new Error("Mismatch between number of files and upload URLs received.");
      }

      const uploadPromises = files.map((file, index) => {
        const { uploadUrl } = uploadUrls[index];
        return axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
        });
      });

      await Promise.all(uploadPromises);

      const batchConfirmDto: BatchConfirmUploadDto = {
        projectId,
        uploads: uploadUrls.map((urlInfo, index) => ({
          fileKey: urlInfo.fileKey,
          contentType: files[index].type,
        })),
      };

      const confirmResponse = await axiosInstance.post<ImageDto[]>("/images/batch-confirm-upload", batchConfirmDto);

      return { success: true, data: confirmResponse.data, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { 
          success: false, 
          message: error.response?.data?.message || "Erro no upload em lote." 
        };
      }

      return { success: false, message: "Erro no upload em lote." };
    }
  },
};