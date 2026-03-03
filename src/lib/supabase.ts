import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmkwscizysosgtlzzwxs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZta3dzY2l6eXNvc2d0bHp6d3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTIyNjQsImV4cCI6MjA4NzY4ODI2NH0.MT1skqrAPifqg9QA8664jbjxOS5-ihEVB7PNF-IsWXI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
