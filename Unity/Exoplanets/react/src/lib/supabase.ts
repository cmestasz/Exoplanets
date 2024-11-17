import { createClient, SupportedStorage } from '@supabase/supabase-js';
import { DATABASE_KEY, DATABASE_URL } from 'src/config';
import { Database } from './database.types';

const customStorage: SupportedStorage = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
};

export const supabase = createClient<Database>(DATABASE_URL, DATABASE_KEY, { global: { fetch }, auth: { flowType: 'pkce', storage: customStorage } });
