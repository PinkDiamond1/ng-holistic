import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroupsPageComponent } from './form-groups-page/form-groups-page.component';
import { FormGroupsPageModule } from './form-groups-page/form-groups-page.module';
import { FormPageComponent } from './form-page/form-page.component';
import { FormPageModule } from './form-page/form-page.module';
import { FormRecalcPageComponent } from './form-recalc-page/form-recalc-page.component';
import { FormReclcPageModule } from './form-recalc-page/form-recalc-page.module';
import { FormCustomFieldsPageComponent } from './form-custom-fields-page/form-custom-fields-page.component';
import { FormCustomFieldsPageModule } from './form-custom-fields-page/form-custom-fields-page.module';
import { FormFullPageModule } from './form-full-page/form-full-page.module';
import { FormFullPageComponent } from './form-full-page/form-full-page.component';
import { FormDynaPageComponent } from './form-dyna-page/form-dyna-page.component';
import { FormDynaPageModule } from './form-dyna-page/form-dyna-page.module';
import { FormInModalPageComponent } from './form-in-modal-page/form-in-modal-page.component';
import { FormInModalPageModule } from './form-in-modal-page/form-in-modal-page.module';

export const routes: Routes = [
    {
        path: 'form',
        component: FormPageComponent
    },
    {
        path: 'form-groups',
        component: FormGroupsPageComponent
    },
    {
        path: 'form-recalc',
        component: FormRecalcPageComponent
    },
    {
        path: 'form-custom-fields',
        component: FormCustomFieldsPageComponent
    },
    {
        path: 'form-full',
        component: FormFullPageComponent
    },
    {
        path: 'form-dyna',
        component: FormDynaPageComponent
    },
    {
        path: 'form-in-modal',
        component: FormInModalPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormPageModule,
        FormGroupsPageModule,
        FormReclcPageModule,
        FormCustomFieldsPageModule,
        FormFullPageModule,
        FormDynaPageModule,
        FormInModalPageModule
    ],
    exports: [RouterModule],
    providers: []
})
export class ClrFormsRoutingModule {}