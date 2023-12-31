import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { scheme } from '../odata-schema';
import { QbTableComponent } from '../qb-table/qb-table.component';
import { ALanguage } from 'src/app/services/language';
import { LanguageFactory } from 'src/app/services/language-factory.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {

  @Input() url: string = "";
  @Output() urlChange = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter();
  selectedEntity: string | null = null;

  @ViewChild(QbTableComponent) tableComponent!: QbTableComponent;
  lg: ALanguage;

  constructor(lFactory: LanguageFactory) {
    this.lg = lFactory.getLanguageService();
  }
  onUrlChange() {
    this.urlChange.emit(this.url);
  }

  ngOnInit(): void {
  }

  getEntities() {
    return Object.keys(scheme).sort();
  }
  onEntitySelected(event: any) {
    this.selectedEntity = event.target.value;
    this.onUrlChange()
  }

  // maybe  make this component ask for it rather than when ochange is triggered
  update() {
    this.url = this.tableComponent?.getTable().generateUrl();
    this.onUrlChange()
    this.onUpdate.emit();
  }

}

