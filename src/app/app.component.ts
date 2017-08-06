import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { HomePage } from './pages/home/home';
import { AmapPage } from './pages/amap/amap';
import { VideoplayerPage } from './pages/videoplayer/videoplayer';
import { CalendarPage } from './pages/calendar/calendar';

@Component({
	templateUrl: 'app.html'
})
export class AppComponent {
	@ViewChild(Nav) nav: Nav;

	rootPage = HomePage;

	pages: any[];

	constructor(public platform: Platform) {
		this.initializeApp();

		this.pages = [
			{ name: 'essence-ion-amap', component: AmapPage },
			{ name: 'essence-ion-videoplayer', component: VideoplayerPage },
			{ name: 'essence-ion-calendar', component: CalendarPage }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// platform is ready
		});
	}

	openPage(page) {
		this.nav.push(page.component);
	}
}
