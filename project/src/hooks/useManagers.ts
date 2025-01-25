import { createClient } from '@supabase/supabase-js';
import { useToast } from './useToast';
import type { Profile, Course, Event, News, Announcement, Admission } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function useManagers() {
  const { showToast } = useToast();

  const userManager = {
    async getUsers() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) throw error;
        return data as Profile[];
      } catch (error) {
        showToast('Error fetching users', 'error');
        throw error;
      }
    },

    async createUser(data: any) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: data.first_name,
              last_name: data.last_name,
              role: data.role
            }
          }
        });

        if (authError) throw authError;
        showToast('User created successfully', 'success');
        return authData;
      } catch (error) {
        showToast('Error creating user', 'error');
        throw error;
      }
    },

    async updateUser(userId: string, updates: Partial<Profile>) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId);

        if (error) throw error;
        showToast('User updated successfully', 'success');
      } catch (error) {
        showToast('Error updating user', 'error');
        throw error;
      }
    },

    async deleteUser(userId: string) {
      try {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;
        showToast('User deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting user', 'error');
        throw error;
      }
    }
  };

  const facultyManager = {
    async getFaculty() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'teacher');
        
        if (error) throw error;
        return data as Profile[];
      } catch (error) {
        showToast('Error fetching faculty members', 'error');
        throw error;
      }
    },

    async createFaculty(data: any) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: data.first_name,
              last_name: data.last_name,
              role: 'teacher',
              department: data.department
            }
          }
        });

        if (authError) throw authError;
        showToast('Faculty member created successfully', 'success');
        return authData;
      } catch (error) {
        showToast('Error creating faculty member', 'error');
        throw error;
      }
    },

    async updateFaculty(teacherId: string, updates: any) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', teacherId)
          .eq('role', 'teacher');

        if (error) throw error;
        showToast('Faculty member updated successfully', 'success');
      } catch (error) {
        showToast('Error updating faculty member', 'error');
        throw error;
      }
    },

    async deleteFaculty(teacherId: string) {
      try {
        const { error } = await supabase.auth.admin.deleteUser(teacherId);
        if (error) throw error;
        showToast('Faculty member deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting faculty member', 'error');
        throw error;
      }
    }
  };

  const courseManager = {
    async getCourses() {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            teacher:profiles(*)
          `);
        
        if (error) throw error;
        return data as Course[];
      } catch (error) {
        showToast('Error fetching courses', 'error');
        throw error;
      }
    },

    async createCourse(courseData: Partial<Course>) {
      try {
        const { data, error } = await supabase
          .from('courses')
          .insert(courseData)
          .select()
          .single();

        if (error) throw error;
        showToast('Course created successfully', 'success');
        return data;
      } catch (error) {
        showToast('Error creating course', 'error');
        throw error;
      }
    },

    async updateCourse(courseId: string, updates: Partial<Course>) {
      try {
        const { error } = await supabase
          .from('courses')
          .update(updates)
          .eq('id', courseId);

        if (error) throw error;
        showToast('Course updated successfully', 'success');
      } catch (error) {
        showToast('Error updating course', 'error');
        throw error;
      }
    },

    async deleteCourse(courseId: string) {
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', courseId);

        if (error) throw error;
        showToast('Course deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting course', 'error');
        throw error;
      }
    }
  };

  const academicManager = {
    async getGrades(studentId: string) {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select(`
            *,
            assignment:assignments(*),
            course:courses(*)
          `)
          .eq('student_id', studentId);
        
        if (error) throw error;
        return data;
      } catch (error) {
        showToast('Error fetching grades', 'error');
        throw error;
      }
    },

    async getAttendance(studentId: string) {
      try {
        const { data, error } = await supabase
          .from('attendance')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('student_id', studentId);
        
        if (error) throw error;
        return data;
      } catch (error) {
        showToast('Error fetching attendance', 'error');
        throw error;
      }
    },

    async updateAttendance(attendanceId: string, status: string) {
      try {
        const { error } = await supabase
          .from('attendance')
          .update({ status })
          .eq('id', attendanceId);

        if (error) throw error;
        showToast('Attendance updated successfully', 'success');
      } catch (error) {
        showToast('Error updating attendance', 'error');
        throw error;
      }
    }
  };

  const admissionManager = {
    async getAdmissions() {
      try {
        const { data, error } = await supabase
          .from('admissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Admission[];
      } catch (error) {
        showToast('Error fetching admissions', 'error');
        throw error;
      }
    },

    async updateAdmissionStatus(admissionId: string, status: string) {
      try {
        const { error } = await supabase
          .from('admissions')
          .update({ status })
          .eq('id', admissionId);

        if (error) throw error;
        showToast('Admission status updated successfully', 'success');
      } catch (error) {
        showToast('Error updating admission status', 'error');
        throw error;
      }
    }
  };

  const announcementManager = {
    async getAnnouncements() {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select(`
            *,
            author:profiles(*)
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Announcement[];
      } catch (error) {
        showToast('Error fetching announcements', 'error');
        throw error;
      }
    },

    async createAnnouncement(announcement: Partial<Announcement>) {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .insert(announcement)
          .select()
          .single();

        if (error) throw error;
        showToast('Announcement created successfully', 'success');
        return data;
      } catch (error) {
        showToast('Error creating announcement', 'error');
        throw error;
      }
    },

    async updateAnnouncement(id: string, updates: Partial<Announcement>) {
      try {
        const { error } = await supabase
          .from('announcements')
          .update(updates)
          .eq('id', id);

        if (error) throw error;
        showToast('Announcement updated successfully', 'success');
      } catch (error) {
        showToast('Error updating announcement', 'error');
        throw error;
      }
    },

    async deleteAnnouncement(id: string) {
      try {
        const { error } = await supabase
          .from('announcements')
          .delete()
          .eq('id', id);

        if (error) throw error;
        showToast('Announcement deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting announcement', 'error');
        throw error;
      }
    }
  };

  const eventManager = {
    async getEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true });

        if (error) throw error;
        return data as Event[];
      } catch (error) {
        showToast('Error fetching events', 'error');
        throw error;
      }
    },

    async createEvent(eventData: Partial<Event>) {
      try {
        const { data, error } = await supabase
          .from('events')
          .insert(eventData)
          .select()
          .single();

        if (error) throw error;
        showToast('Event created successfully', 'success');
        return data;
      } catch (error) {
        showToast('Error creating event', 'error');
        throw error;
      }
    },

    async updateEvent(eventId: string, updates: Partial<Event>) {
      try {
        const { error } = await supabase
          .from('events')
          .update(updates)
          .eq('id', eventId);

        if (error) throw error;
        showToast('Event updated successfully', 'success');
      } catch (error) {
        showToast('Error updating event', 'error');
        throw error;
      }
    },

    async deleteEvent(eventId: string) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', eventId);

        if (error) throw error;
        showToast('Event deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting event', 'error');
        throw error;
      }
    }
  };

  const newsManager = {
    async getNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as News[];
      } catch (error) {
        showToast('Error fetching news', 'error');
        throw error;
      }
    },

    async createNews(newsData: Partial<News>) {
      try {
        const { data, error } = await supabase
          .from('news')
          .insert(newsData)
          .select()
          .single();

        if (error) throw error;
        showToast('News created successfully', 'success');
        return data;
      } catch (error) {
        showToast('Error creating news', 'error');
        throw error;
      }
    },

    async updateNews(newsId: string, updates: Partial<News>) {
      try {
        const { error } = await supabase
          .from('news')
          .update(updates)
          .eq('id', newsId);

        if (error) throw error;
        showToast('News updated successfully', 'success');
      } catch (error) {
        showToast('Error updating news', 'error');
        throw error;
      }
    },

    async deleteNews(newsId: string) {
      try {
        const { error } = await supabase
          .from('news')
          .delete()
          .eq('id', newsId);

        if (error) throw error;
        showToast('News deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting news', 'error');
        throw error;
      }
    }
  };

  return {
    userManager,
    facultyManager,
    courseManager,
    academicManager,
    admissionManager,
    announcementManager,
    eventManager,
    newsManager
  };
}