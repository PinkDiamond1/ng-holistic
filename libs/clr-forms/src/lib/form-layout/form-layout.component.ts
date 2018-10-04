import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { buildForm, flatForm, FormLayout } from '@ng-holistic/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    private _tempVal: any;
    @Input() form: FormLayout.Form | undefined;
    @Input() dicts: FormLayout.Dicts | undefined;
    @Input()
    set value(val: any) {
        if (this.formGroup) {
            this.formGroup.patchValue(val);
        } else {
            this._tempVal = val;
        }
    }

    formGroup: FormGroup;

    constructor(private readonly fb: FormBuilder, private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.form) {
            return;
        }
        this.formGroup = buildForm(this.fb, flatForm(this.form));

        if (this._tempVal) {
            this.formGroup.patchValue(this._tempVal);
            this._tempVal = undefined;
        }

        this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.detectChanges());
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
