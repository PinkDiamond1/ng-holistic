import { A, BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, NINE, TAB, UP_ARROW, Z, ZERO } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, flatMap, map, mapTo, merge as mergeOper, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import { OverlayHelperService } from './overlay-helper.service';
import { ResultFormatter, ResultKeyFun, SkipPredicate } from './results-container/results-container.component';

export interface SearchArgInit {
    kind: 'SearchArgInit';
}

export interface SearchArgFocus {
    kind: 'SearchArgFocus';
}

export interface SearchArgTyping {
    kind: 'SearchArgTyping';
    term: string;
}

export type SearchArg = SearchArgInit | SearchArgFocus | SearchArgTyping;

export type SearchFun = (text: Observable<SearchArg>) => Observable<any[]>;

const isOpenKey = (keyCode: number) =>
    (keyCode >= ZERO && keyCode <= NINE) ||
    (keyCode >= A && keyCode <= Z) ||
    keyCode === ENTER ||
    keyCode === DOWN_ARROW ||
    keyCode === UP_ARROW ||
    keyCode === BACKSPACE;

@Directive({
    selector: 'input[hlcTypeahead]',
    providers: [OverlayHelperService]
})
export class HlcTypeaheadDirective implements OnInit, OnDestroy {
    private readonly _click$: Observable<MouseEvent>;
    private readonly _keyDown$: Observable<KeyboardEvent>;
    private readonly _focus$: Observable<void>;
    private readonly _valueChanges$: Observable<string>;
    private readonly _destroy$ = new Subject();

    @Input() value: any | null | undefined;
    // tslint:disable-next-line:no-input-rename
    @Input('hlcTypeahead') search: SearchFun | undefined;
    @Input() resultFormatter: ResultFormatter | undefined;
    @Input() resultTemplate: TemplateRef<any> | undefined;
    @Input() skipPredicate: SkipPredicate | undefined;
    @Input() resultKey: ResultKeyFun | undefined;

    @Output() valueChange = new EventEmitter<any | undefined>();

    constructor(private _elementRef: ElementRef<HTMLInputElement>, private overlayHelper: OverlayHelperService) {
        this._valueChanges$ = fromEvent<Event>(_elementRef.nativeElement, 'input').pipe(
            map($event => ($event.target as HTMLInputElement).value)
        );

        this._focus$ = fromEvent<void>(_elementRef.nativeElement, 'focus');

        this._keyDown$ = fromEvent<KeyboardEvent>(_elementRef.nativeElement, 'keydown');

        this._click$ = fromEvent<MouseEvent>(_elementRef.nativeElement, 'click');
    }

    ngOnInit() {
        if (this.search) {
            const focusSearch$ = this._focus$.pipe(
                // real focus, ignore reurn from dropdown
                filter(() => !this.overlayHelper.isOpen),
                map(() => ({
                    kind: 'SearchArgFocus'
                }))
            );

            const results$ = this._valueChanges$.pipe(
                // search by user typing
                map(term => ({ kind: 'SearchArgTyping', term })),
                // search when control got focus
                mergeOper(focusSearch$),
                // search when control initialized
                startWith({ kind: 'SearchArgInit' }),
                this.search,
                // make it shared
                shareReplay(1)
            );

            // subscribe immediately to emit SearchArgInit
            results$.pipe(takeUntil(this._destroy$)).subscribe(x => x);

            // open
            const openKeys$ = this._keyDown$.pipe(filter(evt => isOpenKey(evt.keyCode)));

            const open$ = merge(this._focus$, this._click$, openKeys$).pipe(
                // check here focus returns from dropdown
                filter(() => !this.overlayHelper.isOpen)
            );

            // select
            const select$ = open$.pipe(
                filter(() => !this.overlayHelper.isOpen),
                flatMap(() =>
                    this.overlayHelper.show(
                        {
                            resultTemplate: this.resultTemplate,
                            value: this.value,
                            skipPredicate: this.skipPredicate,
                            resultFormatter: this.resultFormatter,
                            resultKey: this.resultKey
                        },
                        results$,
                        this._keyDown$
                    )
                )
            );

            // close
            const closeKeys$ = this._keyDown$.pipe(
                filter(evt => evt.keyCode === ESCAPE),
                mapTo(null)
            );

            const close$ = merge(select$, closeKeys$);

            close$
                .pipe(
                    takeUntil(this._destroy$),
                    filter(() => this.overlayHelper.isOpen)
                )
                .subscribe(item => {
                    // important : focus should be set before hide since ovewise open$ will emit event
                    this._elementRef.nativeElement.focus();
                    this.overlayHelper.hide();
                    if (item) {
                        this.value = item;
                        this._elementRef.nativeElement.value = this.resultFormatter ? this.resultFormatter(item) : item;
                        this.valueChange.emit(this.value);
                    }
                });

            // special case close, no need to set focus on input
            this._keyDown$
                .pipe(
                    takeUntil(this._destroy$),
                    filter(evt => evt.keyCode === TAB)
                )
                .subscribe(() => {
                    this.overlayHelper.hide();
                });
        }
    }

    ngOnDestroy() {
        this._destroy$.next();
        this.overlayHelper.destroy();
    }
}
