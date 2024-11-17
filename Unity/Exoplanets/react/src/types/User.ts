export default interface UserAPI {
  avatar: string | null
  created_at: string
  email: string
  first_name: string | null
  id: string
  last_name: string | null
  username: string | null
}

export interface UserBoxOptions {
  content: string;
  action: () => void;
}
