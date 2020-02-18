// import dialogflow
// import os
// from google.api_core.exceptions import InvalidArgument

const DIALOGFLOW_PROJECT_ID = 'kwili-chatbot-hlonvo'
const DIALOGFLOW_LANGUAGE_CODE = 'fr-FR'
const SESSION_ID = 'current-user-id'

// os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'key.json'

// session_client = dialogflow.SessionsClient()
// session = session_client.session_path(DIALOGFLOW_PROJECT_ID, SESSION_ID)

// def send_query(user_text):
// 	text_input = dialogflow.types.TextInput(text=user_text, language_code=DIALOGFLOW_LANGUAGE_CODE)
// 	query_input = dialogflow.types.QueryInput(text=text_input)
// 	try:
// 		response = session_client.detect_intent(session=session, query_input=query_input)
// 		return response.query_result.fulfillment_messages
// 	except InvalidArgument:
// 		raise

export default class DialogFlow extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		};
	}
	render() {

	}
}