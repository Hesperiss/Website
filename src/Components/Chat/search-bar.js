import React, { Component } from 'react'
import KwiliApi from '../Shared/Api/api';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import styles from '../Chat/Chat.css';

function getSuggestionValue(suggestion) {
	return `${suggestion.name} ${suggestion.last_name}`;
}

function renderSuggestion(suggestion, { query }) {
	const suggestionText = `${suggestion.name} ${suggestion.last_name}`;
	const matches = match(suggestionText, query);
	const parts = parse(suggestionText, matches);

	return (
		<span className={styles.suggestionContent}>
			<span className={styles.name}>
				{
					parts.map((part, index) => {
						const className = part.highlight ? styles.highlight : null;

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
			suggestions: []
		};
	}

	onRequest = (data) => {
		if (data == null) {
			data = {
				data: [
					{
						name: "Leandre",
						last_name: "Blanchard",
						email: "placeholder@no",
					},
				],
			}
		}
		this.setState({ suggestions: data.data })
	}

	getSuggestions = (value) => {
		KwiliApi.searchUser(value).then(this.onRequest);
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.getSuggestions(value);
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Search ...",
			value,
			onChange: this.onChange
		};
		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				theme={styles}
				inputProps={inputProps} />
		);
	}
}
