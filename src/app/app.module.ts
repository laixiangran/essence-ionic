import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
// page
import { HomePage } from './pages/home/home';
import { AmapPage } from './pages/amap/amap';
import { VideoplayerPage } from './pages/videoplayer/videoplayer';
import { EssenceIonicModule } from './components/essence-ionic.module';
import { CalendarPage } from './pages/calendar/calendar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
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
		VideoplayerPage,
		CalendarPage
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AppComponent,
		HomePage,
		AmapPage,
		VideoplayerPage,
		CalendarPage
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
}
