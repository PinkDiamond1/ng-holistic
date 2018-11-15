import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule, InputContainerModule } from '@ng-holistic/clr-forms';
import { FormCustomFieldsPageComponent } from './form-custom-fields-page.component';
import { TextModule } from '@ng-holistic/clr-controls';

///
@NgModule({
    declarations: [FormCustomFieldsPageComponent],
    imports: [CommonModule, ClrFormModule, InputContainerModule, TextModule],
    exports: []
})
export class FormCustomFieldsPageModule {}