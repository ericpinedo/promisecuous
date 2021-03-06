import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from './login/login.component';
import { AppState, INITIAL_APP_STATE } from './store/state';
import { StoreModule, combineReducers, ActionReducer } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserReducer } from './store/reducers/userReducer';
import { ViewReducer } from './store/reducers/viewReducer';
import { DataReducer } from './store/reducers/dataReducer';
import { AppEffects } from './store/effects/appEffects';
import { AccessControlGuard } from './shared/guards/accesscontrol.service';
import { environment } from '../environments/environment';

const reducers = {
  user: UserReducer,
  view: ViewReducer,
  data: DataReducer
};

const effects = [
  EffectsModule.run(AppEffects)
];

const combinedReducers: ActionReducer<AppState> = combineReducers(reducers);

export function appReducers(state: AppState = INITIAL_APP_STATE, action: any) {
  return combinedReducers(state, action);
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING,
        SharedModule,
        StoreModule.provideStore(appReducers),
        effects,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        StoreDevtoolsModule.instrumentOnlyWithExtension({
          maxAge: 3
        }),
    ],
    providers: [AccessControlGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
