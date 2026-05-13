#  Backend Data Contract

## Supabase Connection
- **Project URL**: `https://bvtixyqmospkbmjpwguh.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dGl4eXFtb3Nwa2JtanB3Z3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NjQxODMsImV4cCI6MjA5NDI0MDE4M30.D0iWInTfv-PIszmiTZgYwHdEzH-M_iYR2L-WcT7BmLk`
- **Dashboard**: https://supabase.com/dashboard/project/bvtixyqmospkbmjpwguh

## Tables
| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `profiles` | `id`, `name`, `created_at` | User profile linked to Auth |
| `study_resources` | `id`, `user_id`, `title`, `content` | User-saved notes |
| `chat_history` | `id`, `user_id`, `role`, `message` | AI conversation memory |

## Security
Row Level Security (RLS) enabled on all tables  
Policy: `auth.uid() = user_id` ensures users only see their own data

## AI Integration
- AI reads `study_resources` + last 10 `chat_history` rows for context
- AI saves responses with `role = 'assistant'`
- All access respects RLS

## Handoff Notes
- Frontend: Import `{ supabase }` from `@/lib/supabase`
- Types: See `@/types/database.ts`
- Env vars: Add to `.env.local` (see README)