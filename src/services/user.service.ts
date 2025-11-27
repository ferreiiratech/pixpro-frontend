import { axiosInstance } from "@/lib/axios";
import { User, useUserProfileStore } from "@/store/user-profile.store";

export const userService = {
  async fetchProfile() {
    const response = await axiosInstance.get<User>("/users/profile");
    const user = response.data;

    useUserProfileStore.getState().setUser(user);

    return user;
  },

  clearProfile() {
    useUserProfileStore.getState().clearUser();
  }
};

