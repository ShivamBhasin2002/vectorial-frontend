import { AUTH_API_ENDPOINT } from "@constants/restConstants";
import axios from "axios";
import { create } from "zustand";
import nookies from "nookies";

interface UserState {
  email: string | null;
  username: string | null;
  authUser: ({ onAuthFail }: { onAuthFail: () => void }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: null,
  username: null,
  authUser: async ({ onAuthFail }) => {
    const cookies = nookies.get();
    const authToken = cookies["authToken"];
    try {
      const res = await axios.get(`${AUTH_API_ENDPOINT}/api/auth/authorize`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { name, email } = res.data;
      set({ email, username: name });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      if (err.status === 403) onAuthFail();
    }
  },
}));
