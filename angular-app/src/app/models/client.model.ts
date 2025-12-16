export interface Client {
  id: string;
  name: string; // Nombre / Razón social
  city: string;
  address: string;
  phone: string;
  email: string;
  serviceDate: Date; // Fecha del servicio
  scheduledTime: string; // Horario programado (ej: "09:00-12:00")
  actualTime?: string; // Horario real de trabajo
  assignedEmployeeId: string; // ID del empleado asignado
  observations?: string; // Observaciones del servicio
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdBy: string; // ID del usuario que creó el cliente
  createdAt: Date;
  updatedAt: Date;
}