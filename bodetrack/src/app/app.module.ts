import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';

// Laguage
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// component
import { AppComponent } from './app.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { environment } from 'src/environments/environment';
import { rootReducer } from './store';
import { fakebackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AuthenticationEffects } from './store/Authentication/authentication.effects';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({ declarations: [
        AppComponent,
        AuthlayoutComponent
    ],
    bootstrap: [AppComponent], imports: [TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot(rootReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        EffectsModule.forRoot([
            AuthenticationEffects,
        ]),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutsModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: fakebackendInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
