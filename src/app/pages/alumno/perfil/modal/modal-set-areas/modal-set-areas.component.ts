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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.areasGet);
    console.log(this.areasSaved);
  }

  updateArea(eve: any,id) {
    console.log("Ha cambiado area: "+ id)    
    if(eve) {
      this.areasSaved.push(id);
      console.log(this.areasSaved) 
    } else {
      var index;
      for(var i=0; i<this.areasSaved.length;i++) {
        if(this.areasSaved[i] == id) {
          index = i;
        }
      }
      this.areasSaved.splice(index);
      console.log(this.areasSaved)
    }
  }

  onSubmit() {
    this.valueChange.emit(this.areasSaved);
    this.activeModal.close();
  }
  
}
