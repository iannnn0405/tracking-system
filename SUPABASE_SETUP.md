# Supabase Student Table Setup

This guide will help you create the students table in your Supabase database.

## Prerequisites

- Supabase account
- Access to your Supabase project dashboard

## Setup Steps

### Option 1: Using the SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section
3. Click **New Query**
4. Copy and paste the SQL from `supabase/migrations/001_create_students_table.sql`
5. Click **Run** to execute the query

### Option 2: Manual Table Creation

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. Click **New Table** and set:
   - **Name**: `students`
   - **Enable Row Level Security (RLS)**: Yes

4. Add the following columns:

| Column Name | Type | Settings |
|------------|------|----------|
| id | uuid | Primary Key, Foreign Key (auth.users.id) |
| email | varchar(255) | Unique, Not Null |
| full_name | varchar(255) | |
| student_id | varchar(255) | Unique, Not Null |
| created_at | timestamptz | Default: now() |
| updated_at | timestamptz | Default: now() |
| last_login | timestamptz | |
| is_active | boolean | Default: true |

5. Create indexes:
   - On `student_id`
   - On `email`

6. Set up Row Level Security policies:
   - **SELECT**: `auth.uid() = id`
   - **UPDATE**: `auth.uid() = id`
   - **INSERT**: `auth.uid() = id`

## Database Structure

The `students` table stores the following information:

- **id**: UUID linked to Supabase Auth user
- **email**: Student's institutional email
- **full_name**: Student's full name
- **student_id**: Unique student identification number
- **created_at**: Account creation timestamp
- **updated_at**: Last profile update timestamp
- **last_login**: Last login timestamp
- **is_active**: Account status flag

## How the App Uses This Table

The application saves student information in three stages:

1. **Registration** (`/register`):
   - Creates Supabase Auth user
   - Creates initial student record with email and full name
   - Student ID is empty at this stage

2. **Verification** (`/auth/verify-student-id`):
   - User enters their student ID
   - Student ID is saved to the students table

3. **Settings** (`/settings`):
   - User can view and update their profile
   - Changes are saved to the students table

## Testing the Setup

After creating the table, test it by:

1. Registering a new account in the app
2. Entering a student ID during verification
3. Viewing your profile in settings
4. Checking the Supabase Table Editor to verify the data was saved

## Troubleshooting

### Permissions Error
If you get a permissions error, check:
- Row Level Security policies are correctly configured
- You're logged in with the correct user
- The user ID in the auth table matches the ID being used

### Foreign Key Error
If the students table won't accept inserts:
- Ensure the user exists in `auth.users` first
- The ID must reference an existing auth user

### Duplicate Key Error
- Check that email and student_id are unique
- Ensure you're not trying to create duplicate records

## Next Steps

Once the table is created:
1. The app will automatically save student information
2. Navigate to `/settings` to manage your profile
3. The student ID is displayed in your QR code

