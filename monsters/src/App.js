import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.components';
import SearchBox from './components/search-box/search-box.component';
class App extends Component {
	constructor() {
		super();
		this.state = {
			monsters: [],
			searchField: '',
		};
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((users) => this.setState({ monsters: users }));
	}

	onSeachChange = (e) => {
		const searchField = e.target.value.toLowerCase();
		this.setState({ searchField: searchField });
	};

	render() {
		const { monsters, searchField } = this.state;
		const { onSeachChange } = this;
		const filteredMonsters = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchField.toLowerCase());
		});

		return (
			<div className='App'>
				<h1 className='app-title'>Monsters Rolodex</h1>
				<SearchBox onChangeHandler={onSeachChange} placeholder='search' className='search-box' />
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
