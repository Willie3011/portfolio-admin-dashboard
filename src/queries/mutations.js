import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProject, addSkill, addSocial, deleteProject, deleteSkill, deleteSocial, toggleFeatureProject, updateProject, updateSkill, updateSocial } from "../api/portfolio.api";
import { toast } from "react-toastify";

//Create Project
export const useAddProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (project) => {
            const response = await addProject(project);
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    })
}

//Update Project
export const useUpdateProjectMutation = (onClose) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, updates}) => {
            await updateProject(id, updates)
        },
        onSuccess: () => {
            toast.success("Project updated successfully!")
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            onClose(false)
        }
    })
}

//Delete Project
export const useDeleteProjectMutation = (onClose) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
           await deleteProject(id)
        },
        onSuccess: () => {
            toast.success("Project deleted successfully!")
            queryClient.invalidateQueries({queryKey: ["projects"]})
            onClose(false)
        }
    })
}

// Skills
// Create Skill
export const useAddSkillMutation = (onClose) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (skill) =>
        {
            await addSkill(skill)
        },
        onSuccess: () => {
            toast.success("skill added successfully!")
            queryClient.invalidateQueries({ queryKey: ["skills"] })
            onClose(false)
        },
       
    })
}

// Update Skill
export const useUpdateSkillMutation = (onClose, setError) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates}) => {
            await updateSkill(id, updates)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] })
            toast.success("skill updated successfully!")
            onClose(false);
        },
        onError: (error) => {
            setError(error);
        }
    })
}

//Delete Skill
export const useDeleteSkillMutation = (onClose) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await deleteSkill(id)
        },
        onSuccess: () => {
            toast.success("Skill deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["skills"] })
            onClose(false);
        }
    })
}

// Socials
// Create Social
export const useAddSocialMutation = (onClose) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (social) =>
        {
            await addSocial(social)
        },
        onSuccess: () => {
            toast.success("social added successfully!")
            queryClient.invalidateQueries({ queryKey: ["socials"] })
            onClose(false)
        },
       
    })
}

// Update Skill
export const useUpdateSocialMutation = (onClose) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates}) => {
            await updateSocial(id, updates)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socials"] })
            toast.success("social updated successfully!")
            onClose(false);
        }
    })
}

//Delete Skill
export const useDeleteSocialMutation = (onClose) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await deleteSocial(id)
        },
        onSuccess: () => {
            toast.success("Social deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["socials"] })
            onClose(false);
        }
    })
}

// Update Featured Project
export const useUpdateFeatureMutaion = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id) => {
            await toggleFeatureProject(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"]})
        }
    })
} 