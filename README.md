# essence-ionic

This is ionic custom components.

## Introduce

1. essence-ion-amap（高德地图）

2. essence-ion-videoplayer（视频播放器）

## Usage

1. Install

	```shell
	npm install --save essence-ionic@latest
	```

2. Add the EssenceIonicModule

	```typescript
	import {EssenceIonicModule} from "essence-ionic";
	@NgModule({
	    imports: [
	        EssenceIonicModule
	    ]
	})
	```

## Use components

### essence-ion-amap

1. Use in Template

	```html
	<essence-ion-amap [options]="amapOpts" (ready)="amapReady($event)" (destroy)="amapDestroy($event)"></essence-ion-amap>
	```

2. Use in component

	```typescript
    amapOpts: any; // 初始化地图参数

    constructor() {}

    amapReady ($event: EssenceIonAMapComponent) {
        console.log($event);
    }

    amapDestroy ($event) {
        console.log($event);
    }
	```

### essence-ion-videoplayer

1. Use in Template

	```html
    <div #videoDiv>
        <essence-ion-videoplayer (ready)="videoViewerReady($event)" [source]="url" [width]="videoDiv.offsetWidth"></essence-ion-videoplayer>
    </div>
	```

2. Use in component

	```typescript
	url: string = 'http://www.laixiangran.cn/CDN/custom/video/test.mp4';

    constructor() {}

    videoViewerReady($event: any) {
        console.log($event);
    }
	```

## API

### essence-ion-amap

#### Inputs

- `options`（`Object`） - 地图初始化参数对象，[参数详情](http://lbs.amap.com/api/javascript-api/reference/map)

- `showCurrentLocation`（`?boolean=false`） - 是否显示定位按钮，true为显示

- `showLocationMarker`（`?boolean=true`） - 是否显示定位之后的图标，true为显示

- `showTraffic`（`?boolean=false`） - 是否加载实时交通图层，true为加载

#### Outputs (event)

- `ready($event)` - 地图初始化完成事件，参数$event为当前EssenceIonAMapComponent实例对象

- `destroy($event)` - 地图销毁事件

- `location($event)` - 地图定位成功事件，参数$event为{code，info, result}

### essence-ion-videoplayer

#### Inputs

- `width`（`?number=0`） - 视频播放器的宽度

- `height`（`?number=0`） - 视频播放器的高度

- `poster` (`?string`) - 视频海报路径

- `source`（`string`） - 视频路径

#### Outputs (event)

- `ready($event)` - 视频播放器初始化完成事件，参数$event为当前EssenceIonVideoplayerComponent实例对象

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)





