export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  joinDate: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Demo User",
    email: "user@shibaam.com",
    phone: "+91 9876543210",
    password: "shibaam123",
    joinDate: "2024-06-15"
  }
];

export const validateCredentials = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};
