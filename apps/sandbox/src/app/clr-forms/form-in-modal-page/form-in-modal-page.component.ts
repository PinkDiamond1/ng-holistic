import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { InputErrorDisplayStartegy, ClrFormComponent } from '@ng-holistic/clr-forms';
import { ModalService } from '@ng-holistic/clr-common';
import { timer } from 'rxjs';
import { recalcFormGroup } from '../form-recalc-page/form-recalc-page.component';
import { HLC_FIELDS_LAYOUT_CONFIG } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-form-in-modal',
    template: '<hlc-clr-form [group]="group"></hlc-clr-form>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InputErrorDisplayStartegy,
        { provide: HLC_FIELDS_LAYOUT_CONFIG, useValue: { formClass: 'clr-form clr-form-compact' } }
    ]
})
export class FormInModalComponent {
    group = recalcFormGroup;

    @ViewChild(ClrFormComponent) clrForm: ClrFormComponent;

    get form$() {
        return this.clrForm.form.formCreated;
    }
}

@Component({
    selector: 'hlc-form-in-modal-page',
    templateUrl: './form-in-modal-page.component.html',
    styleUrls: ['./form-in-modal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputErrorDisplayStartegy]
})
export class FormInModalPageComponent {
    constructor(private readonly modalService: ModalService) {}

    onShowModal() {
        this.modalService.showForm({
            title: 'Form in modal',
            componentFormField: 'form$',
            contentComponentType: FormInModalComponent,
            allowOkWhenFormPristine: false,
            dataAccess: {
                update(_) {
                    return timer(1000);
                }
            }
        });
    }
}
