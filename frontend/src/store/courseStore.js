import { create } from 'zustand';

const STORAGE_KEY = 'lms-course-store';
const TOTAL_SECTIONS = 6;

const INITIAL_COURSES = [
  { id: 1, progress: 75, visitedSections: ['overview', 'architecture', 'frontend', 'backend'] },
  { id: 2, progress: 40, visitedSections: [] },
  { id: 3, progress: 90, visitedSections: [] },
  { id: 4, progress: 20, visitedSections: [] },
  { id: 5, progress: 10, visitedSections: [] },
  { id: 6, progress: 55, visitedSections: [] },
  { id: 7, progress: 0,  visitedSections: [] },
];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_COURSES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_COURSES;
  } catch {
    return INITIAL_COURSES;
  }
}

function saveToStorage(courses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch {
  }
}

export const useCourseStore = create((set, get) => ({
  courses: loadFromStorage(),

  visitSection: (courseId, sectionId) => {
    const updated = get().courses.map(c => {
      if (c.id !== courseId) return c;
      if (c.visitedSections.includes(sectionId)) return c;
      const visited = [...c.visitedSections, sectionId];
      const calculated = Math.round((visited.length / TOTAL_SECTIONS) * 100);
      return { ...c, visitedSections: visited, progress: Math.max(c.progress, calculated) };
    });
    saveToStorage(updated);
    set({ courses: updated });
  },

  setProgress: (courseId, progress) => {
    const updated = get().courses.map(c =>
      c.id === courseId
        ? { ...c, progress: Math.min(100, Math.max(c.progress, progress)) }
        : c
    );
    saveToStorage(updated);
    set({ courses: updated });
  },
}));
