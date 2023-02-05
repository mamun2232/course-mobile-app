
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import StackNavigation from './screen/Navigation/StackNavigation';

export default function App() {
  return (
    
    <NativeBaseProvider>
    <NavigationContainer>
     <StackNavigation/>
    </NavigationContainer>
   </NativeBaseProvider>
  
  );
}
