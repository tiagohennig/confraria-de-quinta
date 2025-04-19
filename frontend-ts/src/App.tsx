import GlobalState from './Global/GlobalState';
import GlobalStyle from './GlobalStyle/GlobalStyle';
import Router from './routes/Router';

function App() {
	return (
		<>
			<GlobalState>
				<Router>
				</Router>
			</GlobalState>
		</>
	);
}

export default App;
