import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Inventario', active: true },
      { label: 'Salidas', active: true }
    ];
  }
}
