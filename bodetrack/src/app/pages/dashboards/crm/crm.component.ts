import { Component, QueryList, ViewChildren } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { getChartColorsArray, shuffleArray } from 'src/app/shared/commonFunction';
import { Store } from '@ngrx/store';
import { fetchdealData, fetchleadData, fetchtableData, fetchtaksData } from 'src/app/store/CRM/crm.actions';
import { selectabledata, selectdealData, selectleadData, selecttaskdata } from 'src/app/store/CRM/crm-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
  providers: []
})
export class CrmComponent {}