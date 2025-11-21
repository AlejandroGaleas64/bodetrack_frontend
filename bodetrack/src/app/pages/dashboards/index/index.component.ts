import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe]
})
export class IndexComponent {
  breadCrumbItems!: Array<{}>;
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboards', active: true },
      { label: 'Stater page', active: true }
    ];
  }
}