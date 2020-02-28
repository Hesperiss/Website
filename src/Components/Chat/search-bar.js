import React, { Component } from 'react'
import KwiliApi from '../Shared/Api/api';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import './Chat.scss';
import './SearchBar.css';

function getSuggestionValue(suggestion) {
	console.log("get suggestion value");
	return `${suggestion.name} ${suggestion.last_name}`;
}

function renderSuggestion(suggestion, { query }) {
	const suggestionText = `${suggestion.name} ${suggestion.last_name}`;
	const matches = match(suggestionText, query);
	const parts = parse(suggestionText, matches);

	return (
		<span className='suggestionContent'>
			<span className='name'>
				{
					parts.map((part, index) => {
						const className = part.highlight ? 'highlight' : null;

						return (
							<span className={className} key={index}>{part.text}</span>
						);
					})
				}
			</span>
		</span>
	);
}

export default class Search extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			suggestions: [],
			loading: false,
		};
	}

	onRequest = (data) => {
		if (data == null) {
			data = {
				data: [],
			};
		} else {
			this.setState({
				loading: false,
			})
		}
		this.setState({
			suggestions: data.data,
		});
	}

	getSuggestions = (value) => {
		KwiliApi.searchUser(value).then(this.onRequest);
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
		if (this.state.value.length === 0) {
			this.setState({
				loading: false,
			});
		}
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			loading: true,
		});
		this.getSuggestions(value);
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	spinner = () => {
		if (this.state.loading === false)
			return (<div />);
		return (
			<div className="spinner-grow text-info" role="status">
				<span className="sr-only">Loading...</span>
			</div>);
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Search ...",
			value,
			onChange: this.onChange
		};
		return (
			<div className='sbcontainer'>
				<Autosuggest id={this.props.id}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps} />
				<this.spinner />
			</div>
		);
	}
}
