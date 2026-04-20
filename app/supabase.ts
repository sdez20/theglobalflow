import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvyxptkuhnvabsxqsktk.supabase.co'
const supabaseKey = 'sb_publishable_Q0MU1xBQNIHIG-YbjR_uMA_SUaeALSl'

export const supabase = createClient(supabaseUrl, supabaseKey)
