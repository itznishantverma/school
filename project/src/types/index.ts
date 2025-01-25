export interface Profile {
  id: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  department: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  profile_id: string;
  grade: string;
  enrollment_date: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Teacher {
  id: string;
  profile_id: string;
  department: string;
  hire_date: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string;
  grade: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  type: 'academic' | 'sports' | 'cultural' | 'other';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Admission {
  id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  grade_applying_for: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  documents: any;
  notes: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
}