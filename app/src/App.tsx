import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

const queryClient = new QueryClient();

export default function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				{/* <NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Wallet" component={WalletScreen} />
				</Stack.Navigator>
				</NavigationContainer> */}
			</QueryClientProvider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
