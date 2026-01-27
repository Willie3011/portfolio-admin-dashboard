import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchSkills, fetchSocials } from "../api/portfolio.api";

export const useFetchProjects = ({ page, limit }) => {
    return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects({ page, limit }),
  });
}

export const useFecthSkills = () => {
    return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills
  });
}

export const useFetchSocials = () => {
  return useQuery({
    queryKey: ["socials"],
    queryFn: fetchSocials
  });
}