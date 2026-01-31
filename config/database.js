import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl=process.env.SUPABASE_URL;
const supabaseKey= process.env.SUPABASE_ANON_KEY;