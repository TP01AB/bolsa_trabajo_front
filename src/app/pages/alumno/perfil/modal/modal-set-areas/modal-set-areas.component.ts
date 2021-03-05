import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-set-areas',
  templateUrl: './modal-set-areas.component.html',
  styleUrls: ['./modal-set-areas.component.scss']
})
export class ModalSetAreasComponent implements OnInit {

  @Input() public areasGet;
  @Input() public areasSaved;
  @Output() valueChange = new EventEmitter();
  counter = 0;

  areas = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.areasGet);
    console.log(this.areasSaved);
  }

  updateArea(eve: any,id) {
    console.log("Ha cambiado area: "+ id)    
    if(eve) {
      this.areas.push(id);
      console.log(this.areas) 
    } else {
      var index;
      for(var i=0; i<this.areas.length;i++) {
        if(this.areas[i] == id) {
          index = i;
        }
      }
      this.areas.splice(index);
      console.log(this.areas)
    }
  }

  onSubmit() {
    this.valueChange.emit(this.areas);
    this.activeModal.close();
  }

  public validateId(id) {
    var saved = false;
    console.log(this.areasSaved.length);
    for(var i=0; i<this.areasSaved.length;i++) {
      if(this.areasSaved[i]===id) {
        console.log(this.areasSaved[i]);
        saved = true;
      }
    }
    return saved;
  }
}
