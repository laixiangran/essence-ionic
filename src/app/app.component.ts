import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { HomePage } from './pages/home/home';
import { AmapPage } from './pages/amap/amap';
import { VideoplayerPage } from './pages/videoplayer/videoplayer';

@Component({
	templateUrl: 'app.html'
})
export class AppComponent {
	@ViewChild(Nav) nav: Nav;

	rootPage = HomePage;
	// rootPage = AmapPage;

	pages: any[];

	constructor(public platform: Platform) {
		this.initializeApp();

		this.pages = [
			{ name: 'essence-ion-amap', component: AmapPage },
			{ name: 'essence-ion-videoplayer', component: VideoplayerPage }
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
