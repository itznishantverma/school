/*
  # Row Level Security Policies

  1. Security Policies
    - Profile access policies
    - Course access policies
    - Assignment and submission policies
    - Attendance policies
    - Announcement and news policies
    - Admission policies

  2. Role-based Access
    - Admin: Full access to all tables
    - Teacher: Access to own courses and related data
    - Student: Access to own data and enrolled courses
    - Parent: Access to children's data
*/

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Courses Policies
CREATE POLICY "Courses are viewable by everyone"
ON courses FOR SELECT
USING (true);

CREATE POLICY "Teachers can insert courses"
ON courses FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'teacher'
  )
);

CREATE POLICY "Teachers can update own courses"
ON courses FOR UPDATE
USING (
  teacher_id = auth.uid()
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Enrollments Policies
CREATE POLICY "Users can view own enrollments"
ON enrollments FOR SELECT
USING (
  student_id = auth.uid()
  OR
  EXISTS (
    SELECT 1 FROM courses
    WHERE courses.id = enrollments.course_id
    AND courses.teacher_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'parent')
  )
);

-- Assignments Policies
CREATE POLICY "Assignments are viewable by enrolled students and teachers"
ON assignments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.course_id = assignments.course_id
    AND enrollments.student_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM courses
    WHERE courses.id = assignments.course_id
    AND courses.teacher_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Submissions Policies
CREATE POLICY "Users can view own submissions"
ON submissions FOR SELECT
USING (
  student_id = auth.uid()
  OR
  EXISTS (
    SELECT 1 FROM assignments
    JOIN courses ON assignments.course_id = courses.id
    WHERE assignments.id = submissions.assignment_id
    AND courses.teacher_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'parent')
  )
);

-- Attendance Policies
CREATE POLICY "Users can view own attendance"
ON attendance FOR SELECT
USING (
  student_id = auth.uid()
  OR
  EXISTS (
    SELECT 1 FROM courses
    WHERE courses.id = attendance.course_id
    AND courses.teacher_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'parent')
  )
);

-- Announcements Policies
CREATE POLICY "Announcements are viewable by everyone"
ON announcements FOR SELECT
USING (true);

CREATE POLICY "Only admins and teachers can create announcements"
ON announcements FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'teacher')
  )
);

-- Events Policies
CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage events"
ON events FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- News Policies
CREATE POLICY "Published news is viewable by everyone"
ON news FOR SELECT
USING (published = true OR author_id = auth.uid());

CREATE POLICY "Only admins can manage news"
ON news FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Admissions Policies
CREATE POLICY "Admissions are viewable by admins"
ON admissions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Anyone can submit admission applications"
ON admissions FOR INSERT
WITH CHECK (true);