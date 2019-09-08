import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionsCreators from '../actions/index';
import BotsList from '../components/nav-bot';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionsCreators, dispatch),
})

const mapStateToProps = (state) => ({
    bots: state.bots,
    addingBot: state.addingBot,
    addingField: state.addingField,
})

const bots = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BotsList)

export default bots