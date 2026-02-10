import axios from 'axios';

const API_BASE = '';
const API_V1 = `/api/v1`;

const api = axios.create({
    baseURL: API_V1,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('crm_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('crm_token');
            localStorage.removeItem('crm_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth
export const authAPI = {
    login: (username, password) =>
        api.post('/auth', { type: 'normal', username, password }),
    register: (data) => api.post('/auth/register', data), // Checking backend endpoint
    getMe: () => api.get('/users/me'),
};

// Projects
export const projectsAPI = {
    list: () => api.get('/projects'),
    get: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.patch(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    getStats: (id) => api.get(`/projects/${id}/stats`),
    like: (id) => api.post(`/projects/${id}/fan`),
    unlike: (id) => api.post(`/projects/${id}/unfan`),
};

// Milestones (Sprints)
export const milestonesAPI = {
    list: (projectId) => api.get(`/milestones?project=${projectId}`),
    get: (id) => api.get(`/milestones/${id}`),
    create: (data) => api.post('/milestones', data),
    getStats: (id) => api.get(`/milestones/${id}/stats`),
};

// User Stories
export const userStoriesAPI = {
    list: (projectId) => api.get(`/userstories?project=${projectId}`),
    get: (id) => api.get(`/userstories/${id}`),
    create: (data) => api.post('/userstories', data),
    update: (id, data) => api.patch(`/userstories/${id}`, data),
    delete: (id) => api.delete(`/userstories/${id}`),
};

// Tasks
export const tasksAPI = {
    list: (projectId) => api.get(`/tasks?project=${projectId}`),
    get: (id) => api.get(`/tasks/${id}`),
    create: (data) => api.post('/tasks', data),
    update: (id, data) => api.patch(`/tasks/${id}`, data),
    delete: (id) => api.delete(`/tasks/${id}`),
};

// Issues
export const issuesAPI = {
    list: (projectId) => api.get(`/issues?project=${projectId}`),
    get: (id) => api.get(`/issues/${id}`),
    create: (data) => api.post('/issues', data),
    update: (id, data) => api.patch(`/issues/${id}`, data),
    delete: (id) => api.delete(`/issues/${id}`),
};

// Epics
export const epicsAPI = {
    list: (projectId) => api.get(`/epics?project=${projectId}`),
    get: (id) => api.get(`/epics/${id}`),
    create: (data) => api.post('/epics', data),
};

// Users
export const usersAPI = {
    list: () => api.get('/users'),
    get: (id) => api.get(`/users/${id}`),
    getContacts: (id) => api.get(`/users/${id}/contacts`),
};

// Wiki
export const wikiAPI = {
    list: (projectId) => api.get(`/wiki?project=${projectId}`),
    get: (id) => api.get(`/wiki/${id}`),
    create: (data) => api.post('/wiki', data),
};

// Timeline
export const timelineAPI = {
    getUserTimeline: (userId) => api.get(`/timeline/user/${userId}?page_size=15`),
    getProjectTimeline: (projectId) => api.get(`/timeline/project/${projectId}?page_size=15`),
};

// Search
export const searchAPI = {
    search: (projectId, query) => api.get(`/search?project=${projectId}&text=${query}`),
};

// Memberships
export const membershipsAPI = {
    list: (projectId) => api.get(`/memberships?project=${projectId}`),
};

// Statuses
export const statusesAPI = {
    taskStatuses: (projectId) => api.get(`/task-statuses?project=${projectId}`),
    issueStatuses: (projectId) => api.get(`/issue-statuses?project=${projectId}`),
    userstoryStatuses: (projectId) => api.get(`/userstory-statuses?project=${projectId}`),
    issueTypes: (projectId) => api.get(`/issue-types?project=${projectId}`),
    priorities: (projectId) => api.get(`/priorities?project=${projectId}`),
    severities: (projectId) => api.get(`/severities?project=${projectId}`),
};

export default api;
