import { useMutation } from "@tanstack/react-query";
import axios from "axios";



export const useUpdateSkills = ({userId,token}: {userId: string, token: string}) => {
  
  return useMutation({
    mutationFn: async ({ skills }: { skills: string[] }) => {
      const res = await axios.patch("http://localhost:5000/api/update/skills", {
        userId,
        skills,
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};
