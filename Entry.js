import { KeepAwake, registerRootComponent } from 'expo';
import App from './src/App';

if (__DEV__) {
  KeepAwake.activate();
}

// console.warnを非表示
console.disableYellowBox = true;

registerRootComponent(App);