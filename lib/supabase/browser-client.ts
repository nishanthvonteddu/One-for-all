import { Database } from "@/supabase/types"
import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://local.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_anon_key"
)
