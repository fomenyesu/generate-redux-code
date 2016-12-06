import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import * as Actions from '../action/mainAction'


import CFUser from '../components/CFUser'

const mapStateToProps = (state) => ({
  tableData: state.cfuser.CFUser_Reducer,
  condition: state.cfuser.CFUser_conditionReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CFUser)
