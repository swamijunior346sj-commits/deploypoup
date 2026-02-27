import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cskyvewabqwsaesftdjl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNza3l2ZXdhYnF3c2Flc2Z0ZGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzgyOTQsImV4cCI6MjA4NzcxNDI5NH0.5nC9auSikPtBWC3xAc5jEKgAaZ_aKfnODocux6JaO1U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
