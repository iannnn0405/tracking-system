-- Create students table to store student profile information
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  student_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Audit fields
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Create an index on student_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only read their own student record
CREATE POLICY "Users can view their own student record"
  ON students FOR SELECT
  USING (auth.uid() = id);

-- Create policy so users can update their own student record
CREATE POLICY "Users can update their own student record"
  ON students FOR UPDATE
  USING (auth.uid() = id);

-- Create policy so authenticated users can insert their own record
CREATE POLICY "Users can insert their own student record"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = id);
