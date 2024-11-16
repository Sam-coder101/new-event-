export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  isAdmin: boolean;
  joinCode?: string;
}

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface JoinFormData {
  name: string;
  joinCode: string;
}