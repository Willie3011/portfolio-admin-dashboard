import { api } from "./client";

//Get All Projects
export const fetchProjects = async ({ page, limit}) => {
  const res = await api.get(`/projects?page=${page}&limit=${limit}`);
  return res.data.projects;
}

// Create project
export const addProject = async (project) => {
    const { data } = await api.post('/projects', project);
    return data.project;
}

//Update project
export const updateProject = async (id, updates) => {
    const response = await api.patch(`/projects/${id}`, updates  );
    return response.data.data.project
}

//Delete project
export const deleteProject = async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data.data
}


// SKILLS
// Get all skills
export const fetchSkills = async () => {
    const response = await api.get('/skills');
    return response.data.data
}

// Create skill
export const addSkill = async (skill) => {
    const { data } = await api.post('/skills', skill);
    return data.skill
}

export const updateSkill = async (id, updates) => {
    const response = await api.patch(`/skills/${id}`, updates);
    
    return response.data.data
}

export const deleteSkill = async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data.data
}


// SOCIALS
// Get all socials
export const fetchSocials = async () => {
    const response = await api.get('/socials');
    return response.data.data
}

// Create skill
export const addSocial = async (social) => {
    const { data } = await api.post('/socials', social);
    return data.skill
}

export const updateSocial = async (id, updates) => {
    const response = await api.patch(`/socials/${id}`, updates);
    
    return response.data.data
}

export const deleteSocial = async (id) => {
    const response = await api.delete(`/socials/${id}`);
    return response.data.data
}

export const toggleFeatureProject = async (projectId) => {
    const { data } = await api.patch(`/projects/${projectId}/feature`)
    return data
}
