import { Component, Input } from '@angular/core';
import { faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ServerStatus } from '../services/models/ServerStatus';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  spinner = faSpinner;
  exclamationTriangle = faExclamationTriangle;
  ServerStatus = ServerStatus;

  @Input() serverStatus: ServerStatus = ServerStatus.NONE;
}
