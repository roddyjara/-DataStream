import { Component, signal } from '@angular/core';
import { Contact } from '../../models/user.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  searchTerm = signal('');

  constructor(public employeeService: EmployeeService) {}

  get filteredContacts() {
    const term = this.searchTerm().toLowerCase();
    return this.employeeService.employees()
      .filter(e => e.status === 'active')
      .filter(e => 
        e.firstName.toLowerCase().includes(term) ||
        e.lastName.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term) ||
        e.position.toLowerCase().includes(term)
      );
  }
}

