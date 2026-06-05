import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Your custom Supabase project configuration
const SUPABASE_URL = "https://cevgqeqijfdfvuxsaudy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldmdxZXFpamZkZnZ1eHNhdWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDk1MzMsImV4cCI6MjA5NjIyNTUzM30.IeZWS3MFHuXTeeTNj7qhGrAlta2TffzlEANJMCZGs90";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);