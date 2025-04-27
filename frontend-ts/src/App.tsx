import GlobalState from './Global/GlobalState';
import GlobalStyle from './GlobalStyle/GlobalStyle';
import Router from './routes/Router';

function App() {
    return (
        <div>
            <GlobalState>
                <Router />
            </GlobalState>
        </div>
    );
}

export default App;