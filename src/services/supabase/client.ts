import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/libs/constants/environmentState'

import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
