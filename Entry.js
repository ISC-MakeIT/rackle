import { KeepAwake, registerRootComponent } from 'expo';
import App from './src/App';
import Test from './src/components/Test';

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(Test);
