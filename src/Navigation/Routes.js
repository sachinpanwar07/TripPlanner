import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { Login } from '../Screen';
import UserContext from '../UserProvider';
const Stack = createNativeStackNavigator();
export default function Routes() {
   const { userData } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userData? MainStack(Stack) : AuthStack(Stack)}
       {/* {MainStack(Stack)} */}
        {/* {AuthStack(Stack)} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function Routes({ userData }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {userData ? MainStack(Stack) : AuthStack(Stack)}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
