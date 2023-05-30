import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.components';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setfilteredMonsters] = useState(monsters);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((users) => setMonsters(users));
	}, []);
	useEffect(() => {
		const newfilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchField.toLowerCase());
		});
		setfilteredMonsters(newfilteredMonsters);
	}, [monsters, searchField]);

	const onSeachChange = (e) => {
		const searchFieldString = e.target.value.toLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className='App'>
			<h1 className='app-title'>Monsters Rolodex</h1>
			<SearchBox onChangeHandler={onSeachChange} placeholder='search' className='search-box' />
			<CardList monsters={filteredMonsters} />
		</div>
	);
};
/*
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
*/
export default App;
