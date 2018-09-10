import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { FormLayout } from '@ng-holistic/forms';

const config: FormLayout.Form = {
    content: {
        kind: 'FormTabsCollection',
        items: [
            {
                title: 'Fields',
                content: {
                    kind: 'FormFieldsCollection',
                    items: [
                        {
                            kind: 'TextField',
                            id: 'title',
                            label: 'Title'
                        },
                        {
                            kind: 'DateField',
                            id: 'date',
                            label: 'Date'
                        },
                        {
                            kind: 'SelectField',
                            id: 'items',
                            label: 'Items',
                            items: [
                                {
                                    key: 'one',
                                    label: 'one'
                                },
                                {
                                    key: 'two',
                                    label: 'two'
                                }
                            ]
                        },
                        {
                            kind: 'TextareaField',
                            id: 'textarea',
                            label: 'Textarea'
                        },
                        {
                            kind: 'MaskField',
                            id: 'mask',
                            label: 'Number',
                            mask: TextMask.int(3),
                            unmask: TextMask.unmaskNumber
                        }
                    ]
                }
            },
            {
                title: 'Groups',
                content: {
                    kind: 'FormGroupsCollection',
                    items: [
                        {
                            title: 'Group A',
                            content: {
                                kind: 'FormFieldsCollection',
                                items: []
                            }
                        }
                    ]
                }
            }
        ]
    }
};

@Component({
    selector: 'hlc-base-form-page',
    templateUrl: './base-form-page.component.html',
    styleUrls: ['./base-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormPageComponent implements OnInit {
    config = config;

    constructor() {}

    ngOnInit() {}
}