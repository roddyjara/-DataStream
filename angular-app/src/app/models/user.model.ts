export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  employeeId?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: Date;
  salary: number;
  status: 'active' | 'inactive';
  history: EmployeeHistory[];
}

export interface EmployeeHistory {
  id: string;
  date: Date;
  action: string;
  description: string;
}

export interface Company {
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  foundedYear: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
}
