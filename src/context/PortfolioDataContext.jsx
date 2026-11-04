import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects, filterCategories as defaultFilterCategories } from '../data/projects';
import { CONTACT_CONFIG } from '../data/config';

const STORAGE_KEY_PROJECTS = 'samium_portfolio_projects_v2';
const STORAGE_KEY_PROFILE = 'samium_portfolio_profile_v2';

const DEFAULT_PROFILE = {
  name: 'Samium Bashir Badhan',
  title: 'Full-Stack Software Engineer',
  tagline: 'CSIT Student & Full-Stack System Architect',
  summary:
    'Full-Stack Developer and CSIT student specializing in architecting resilient backend systems, secure authentication pipelines, and high-precision React 19 web applications.',
  bio1:
    'Based in Dhaka, Bangladesh, I engineer end-to-end full-stack software applications through disciplined system architecture, type-safe API design, distributed database schemas, REST API integration, and performance optimization. My experience spans full-stack e-commerce ecosystems, institutional management platforms, clinical diagnostic applications, and asynchronous task processing pipelines.',
  bio2:
    'I maintain a strong focus on full-stack architecture: bulletproof authentication (Better-Auth, Jose JWT, HttpOnly sessions), backend data integrity (MongoDB Atlas, Redis caching, Zod validation, Docker containerization), and an uncompromising client standard leveraging React 19, TypeScript, and modern Tailwind CSS.',
  institution: 'Royal University of Dhaka',
  degree: "Bachelor's Degree in Computer Science & Information Technology (CSIT)",
  location: 'Dhaka, Bangladesh',
  whatsappNumber: CONTACT_CONFIG.whatsappNumber,
  email: CONTACT_CONFIG.email,
  cvUrl: './Samium_Bashir_Badhan_CV.pdf',
  githubUrl: 'https://github.com/SamiumBashir',
  linkedinUrl: 'https://www.linkedin.com/in/samium-bashir',
  yearsExperience: '2+',
  completedSystems: '15+',
  architectureDomains: '8',
};

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  // Load projects from localStorage or default
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse stored projects, using defaults');
    }
    return defaultProjects;
  });

  // Load profile from localStorage or default
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (stored) {
        const parsed = { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
        if (!parsed.whatsappNumber || parsed.whatsappNumber === '8801700000000') {
          parsed.whatsappNumber = CONTACT_CONFIG.whatsappNumber;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse stored profile, using defaults');
    }
    return DEFAULT_PROFILE;
  });

  // Save projects to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage', e);
    }
  }, [projects]);

  // Save profile to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }, [profile]);

  // Add a new project
  const addProject = (newProject) => {
    const nextNumber = String(projects.length + 1).padStart(3, '0');
    const projectWithId = {
      id: newProject.id || 'project_' + Date.now(),
      number: newProject.number || nextNumber,
      title: newProject.title || 'Untitled Project',
      subtitle: newProject.subtitle || 'Full-Stack Architecture',
      category: newProject.category || 'Full-Stack Application',
      filterCategory: newProject.filterCategory || 'ecommerce',
      image: newProject.image || './Image/noir.jpg',
      description: newProject.description || '',
      stack: Array.isArray(newProject.stack)
        ? newProject.stack
        : typeof newProject.stack === 'string'
        ? newProject.stack.split(',').map((s) => s.trim()).filter(Boolean)
        : ['React 19', 'Node.js', 'MongoDB'],
      role: newProject.role || 'Full-Stack Software Architecture',
      year: newProject.year || '2026',
      status: newProject.status || 'DEPLOYED // PRODUCTION',
      live: newProject.live || '',
      repo: newProject.repo || '',
      highlight: newProject.highlight || '',
      caseStudy: newProject.caseStudy || {
        overview: newProject.description || '',
        problem: '',
        solution: '',
        keyFeatures: [],
        authArchitecture: 'Authentication and authorization security guards.',
        backendArchitecture: 'REST API, database models, and service controllers.',
        frontendArchitecture: 'React 19, responsive components, and state management.',
      },
    };

    setProjects((prev) => [projectWithId, ...prev]);
    return projectWithId;
  };

  // Update an existing project
  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const formattedStack = Array.isArray(updatedFields.stack)
            ? updatedFields.stack
            : typeof updatedFields.stack === 'string'
            ? updatedFields.stack.split(',').map((s) => s.trim()).filter(Boolean)
            : p.stack;

          return {
            ...p,
            ...updatedFields,
            stack: formattedStack,
            caseStudy: {
              ...(p.caseStudy || {}),
              ...(updatedFields.caseStudy || {}),
            },
          };
        }
        return p;
      })
    );
  };

  // Delete a project
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Update profile
  const updateProfile = (newFields) => {
    setProfile((prev) => ({
      ...prev,
      ...newFields,
    }));
  };

  // Reset all data to factory defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY_PROJECTS);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    setProjects(defaultProjects);
    setProfile(DEFAULT_PROFILE);
  };

  // Generate JavaScript code string for projects.js
  const generateProjectsCode = () => {
    return `/* ==========================================================================
   TECHNICAL DOSSIER // VERIFIED FULL-STACK PROJECTS
   AUTHOR: ${profile.name.toUpperCase()}
   EXPORTED: ${new Date().toISOString()}
   ========================================================================== */

export const projects = ${JSON.stringify(projects, null, 2)};

export const filterCategories = ${JSON.stringify(defaultFilterCategories, null, 2)};
`;
  };

  // Trigger download of projects.js file
  const downloadProjectsFile = () => {
    const code = generateProjectsCode();
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export full JSON backup
  const exportFullJSON = () => {
    const payload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      projects,
      profile,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samium_portfolio_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importFullJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
      if (data.profile && typeof data.profile === 'object') {
        setProfile((prev) => ({ ...prev, ...data.profile }));
      }
      return { success: true, count: data.projects?.length || 0 };
    } catch (err) {
      console.error('Import failed', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        projects,
        filterCategories: defaultFilterCategories,
        profile,
        addProject,
        updateProject,
        deleteProject,
        updateProfile,
        resetToDefaults,
        generateProjectsCode,
        downloadProjectsFile,
        exportFullJSON,
        importFullJSON,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}

