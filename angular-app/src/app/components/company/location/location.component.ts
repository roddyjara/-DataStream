import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  constructor(public companyService: CompanyService) {}
}

