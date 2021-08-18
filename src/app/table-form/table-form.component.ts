import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ServerStatus } from '../services/models/ServerStatus';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  export = faFileExport;
  import = faFileImport;

  @Input() serverStatus: ServerStatus = ServerStatus.NONE;
  @Input() filter = '';

  @Output() onFilter = new EventEmitter<string>()
  @Output() onDownload = new EventEmitter()
  @Output() onUpload = new EventEmitter<string>()
  
  playerNameControl = new FormControl(this.filter);
  playerNameForm = new FormGroup({
    playerName: this.playerNameControl
  });
  
  ngOnInit(): void {
    this.playerNameControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((filter: string) => this.onFilter.emit(filter))
    ).subscribe()
  }

  onDownloadClick() {
    this.onDownload.emit();
  }

  onJSONUpload(event: any) {
    var selectedFile: File = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = _ => {
      var result = fileReader.result?.toString() || '[]'
      this.onUpload.emit(result);
    }
  }
}
