import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormLayoutConfig, HLC_FORM_EXTRACT_FIELDS } from '@ng-holistic/forms';
import { FormGroup } from '../models';
import { flatGroup } from './form-utils';

@Component({
    selector: 'hlc-clr-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_EXTRACT_FIELDS,
            useValue: (group: FormGroup.FormGroup) => flatGroup(group)
        }
    ]
})
export class ClrFormComponent {
    @Input() group: FormLayoutConfig | undefined;
    @Input() value: any;
}