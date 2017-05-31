import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
// page
import { HomePage } from "./pages/home/home";
import { EssenceIonicModule } from "../../dist/essence-ionic.module";
import { AmapPage } from "./pages/amap/amap";
import { VideoplayerPage } from "./pages/videoplayer/videoplayer";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(AppComponent, {
            mode: 'ios',
            iconMode: 'ios',
            backButtonText: '返回',
            tabsHideOnSubPages: 'true',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios'
        }),
        EssenceIonicModule
    ],
    declarations: [
        AppComponent,
        HomePage,
        AmapPage,
        VideoplayerPage
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        AmapPage,
        VideoplayerPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {
}
