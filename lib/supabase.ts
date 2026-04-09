import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://japupmtlcxrcihtpuhun.supabase.co';
const supabaseAnonKey = 'sb_publishable_1WYSGScooEI7uhkPEZ5ELA_b5GQMMsQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
