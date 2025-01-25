import { createClient } from '@supabase/supabase-js';
import { useAuth } from './useAuth';
import type { 
  Profile, Course, Student, Teacher, 
  Assignment, Submission, Announcement,
  Event, News, Admission
} from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function useDatabase() {
  const { profile } = useAuth();

  // Profile Operations
  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    if (error) throw error;
    return data as Profile[];
  };

  const updateProfile = async (userId: string, updates: Partial<Profile>) => {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (error) throw error;
  };

  const deleteProfile = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (error) throw error;
  };

  // Course Operations
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        teacher:profiles(*)
      `);
    if (error) throw error;
    return data;
  };

  const createCourse = async (courseData: Partial<Course>) => {
    const { data, error } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    const { error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', courseId);
    if (error) throw error;
  };

  const deleteCourse = async (courseId: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);
    if (error) throw error;
  };

  // Teacher Operations
  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher');
    if (error) throw error;
    return data;
  };

  const assignTeacherToCourse = async (teacherId: string, courseId: string) => {
    const { error } = await supabase
      .from('courses')
      .update({ teacher_id: teacherId })
      .eq('id', courseId);
    if (error) throw error;
  };

  // News Operations
  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as News[];
  };

  const createNews = async (newsData: Partial<News>) => {
    const { error } = await supabase
      .from('news')
      .insert({ ...newsData, author_id: profile?.id });
    if (error) throw error;
  };

  const updateNews = async (newsId: string, updates: Partial<News>) => {
    const { error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', newsId);
    if (error) throw error;
  };

  const deleteNews = async (newsId: string) => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', newsId);
    if (error) throw error;
  };

  // Announcement Operations
  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:profiles(*)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Announcement[];
  };

  const createAnnouncement = async (announcement: Partial<Announcement>) => {
    const { data, error } = await supabase
      .from('announcements')
      .insert({
        ...announcement,
        author_id: profile?.id
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    const { error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
  };

  const deleteAnnouncement = async (id: string) => {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    if (error) throw error;
  };

  // Event Operations
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    if (error) throw error;
    return data as Event[];
  };

  const createEvent = async (eventData: Partial<Event>) => {
    const { error } = await supabase
      .from('events')
      .insert({ ...eventData, created_by: profile?.id });
    if (error) throw error;
  };

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    const { error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId);
    if (error) throw error;
  };

  const deleteEvent = async (eventId: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    if (error) throw error;
  };

  // Admission Operations
  const fetchAdmissions = async () => {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Admission[];
  };

  const updateAdmissionStatus = async (admissionId: string, status: string) => {
    const { error } = await supabase
      .from('admissions')
      .update({ status, reviewed_by: profile?.id })
      .eq('id', admissionId);
    if (error) throw error;
  };

  // Academic Operations
  const fetchStudentGrades = async (studentId: string) => {
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
  };

  const updateSubmissionGrade = async (submissionId: string, grade: number) => {
    const { error } = await supabase
      .from('submissions')
      .update({ grade })
      .eq('id', submissionId);
    if (error) throw error;
  };

  const fetchStudentAttendance = async (studentId: string) => {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('student_id', studentId);
    if (error) throw error;
    return data;
  };

  const updateAttendanceStatus = async (attendanceId: string, status: string) => {
    const { error } = await supabase
      .from('attendance')
      .update({ status })
      .eq('id', attendanceId);
    if (error) throw error;
  };

  return {
    // Profile Operations
    fetchProfiles,
    updateProfile,
    deleteProfile,

    // Course Operations
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,

    // Teacher Operations
    fetchTeachers,
    assignTeacherToCourse,

    // News Operations
    fetchNews,
    createNews,
    updateNews,
    deleteNews,

    // Announcement Operations
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,

    // Event Operations
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,

    // Admission Operations
    fetchAdmissions,
    updateAdmissionStatus,

    // Academic Operations
    fetchStudentGrades,
    updateSubmissionGrade,
    fetchStudentAttendance,
    updateAttendanceStatus
  };
}