import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild
} from '@angular/core';
import { CustomFieldDirective, FormLayoutConfig, HlcFormComponent, HLC_FORM_EXTRACT_FIELDS } from '@ng-holistic/forms';
import { flatGroup } from './form-utils';

@Component({
    selector: 'hlc-clr-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_EXTRACT_FIELDS,
            useValue: flatGroup
        }
    ]
})
export class HlcClrFormComponent {
    @Input() id: any | undefined;
    @Input() group: FormLayoutConfig | undefined;
    @Input() value: any | undefined;

    @Output() formValueChanged = new EventEmitter<any>();

    @ViewChild(HlcFormComponent) form: HlcFormComponent;

    @ContentChildren(CustomFieldDirective)
    contentCustomFields: QueryList<CustomFieldDirective>;

    // tslint:disable-next-line:no-input-rename
    @Input('customFields') inputCustomFields: CustomFieldDirective[];

    get customFields() {
        return [...this.contentCustomFields.toArray(), ...(this.inputCustomFields || [])];
    }
}
