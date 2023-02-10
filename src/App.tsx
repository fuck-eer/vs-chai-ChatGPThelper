import * as React from "react";
import "./App.css";
import Body from "./components/molecule/Body/Body";
import Footer from "./components/molecule/Footer/Footer";
import { Header } from "./components/molecule/Header/Header";
class App extends React.Component {
	public render() {
		return (
			<div className='App'>
				<Header />
				<Body />
				<Footer />
			</div>
		);
	}
}

export default App;
