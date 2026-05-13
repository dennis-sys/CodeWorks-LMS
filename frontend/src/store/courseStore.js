import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: INITIAL_COURSES,

      getCourse: (id) => get().courses.find(c => c.id === id) ?? null,

      visitSection: (courseId, sectionId) => {
        set(state => ({
          courses: state.courses.map(c => {
            if (c.id !== courseId) return c;
            if (c.visitedSections.includes(sectionId)) return c;
            const visited = [...c.visitedSections, sectionId];
            const calculated = Math.round((visited.length / TOTAL_SECTIONS) * 100);
            return {
              ...c,
              visitedSections: visited,
              progress: Math.max(c.progress, calculated),
            };
          }),
        }));
      },

      setProgress: (courseId, progress) => {
        set(state => ({
          courses: state.courses.map(c =>
            c.id === courseId
              ? { ...c, progress: Math.min(100, Math.max(c.progress, progress)) }
              : c
          ),
        }));
      },
    }),
    { name: 'lms-course-store' }
  )
);
