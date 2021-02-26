import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreasAdminService } from '../../../services/areas-admin.service';

@Component({
  selector: 'app-area-new',
  templateUrl: './area-new.component.html',
  styleUrls: ['./area-new.component.scss']
})
export class AreaNewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private areasService: AreasAdminService,private fb: FormBuilder) { }
  
  @Output() insertOk: EventEmitter<any> = new EventEmitter();
  areaForm: FormGroup;
  submitted = false;
  
  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
        return;
    } else {
      let area = this.areaForm.value;
      this.areasService.newArea(area).subscribe(
          (response: any) => {
              this.insertOk.emit(true);
              this.activeModal.close();
          },
          (error) => {
              console.log(error);
              this.insertOk.emit(false);
              this.activeModal.close();
          }
      );
      this.activeModal.close();
    }
  }

  close() {
    this.activeModal.close();
  }

  initForm() {
    this.areaForm = this.fb.group({
      name: ['', [Validators.required]],      
    });    
  }
}
