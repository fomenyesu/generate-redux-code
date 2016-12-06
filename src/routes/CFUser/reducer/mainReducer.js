/**
 * @name mainReducer  Generate Reducer according to the reduxConfig
 * @author winson 654874992@qq.com
 */

import {CF_ACTIONTYPES} from "../action/actionType";
import _ from 'lodash';
import {ReduxConfig} from "../common/reduxConfig.js";
import { combineReducers } from 'redux';

const ReduxConfig1 = _.cloneDeep(ReduxConfig);
/** Generate Reducer according to the reduxConfig **/
const getREDUCER = () => {
  let result = {};
    _.mapKeys(ReduxConfig,(value,key)=>{
    let dataObj = {}, dataNamearr = [],initialData = value.initialState?value.initialState:"";
    dataNamearr = Object.keys(initialData);
    dataNamearr.forEach((item) => {
      if (item=='data') {
        dataObj['Data'] = initialData[item]; //initial state
        dataObj['Loading'] = false;
        dataNamearr[0] = '';//nokey for data
      }else{
        dataObj[`${item}Data`] = initialData[item]; //initial state
        dataObj[`${item}Loading`] = false;
      }
    });
    result[`${key}_Reducer`] = (state=dataObj,action)=>{
      let tempobj = {}, dataName = "",loadingName = "";
      dataNamearr.forEach((item) => {
        dataName = `${item}Data`,loadingName = `${item}Loading`;
        if (action.type === CF_ACTIONTYPES[key][`${item}LOAD_DATA`]) {
          tempobj[loadingName] = true;
        }
        if (action.type === CF_ACTIONTYPES[key][`${item}RECEIVE_DATA`]) {
          tempobj[loadingName] = false;
          tempobj[dataName] = action.data;
        }
        if (action.type === CF_ACTIONTYPES[key][`${item}LOAD_FAIL`]) {
          tempobj[loadingName] = false;
          // tempobj[dataName] = action.data; //no changing data
        }
      });
      return Object.assign({}, state, tempobj);
    }
    if(value.condition){
      result[`${key}_conditionReducer`]=(state=value.condition,action)=>{
        let tableName = action.conditions&&action.conditions.tableName?action.conditions.tableName:"";
        if (action.type === CF_ACTIONTYPES[key][`${tableName}CONDITIONS`]) {
          state = Object.assign(state, action.conditions || {});
        }else if (action.type === CF_ACTIONTYPES[key]["REVERTCONDITIONS"]) {
          value["condition"] = Object.assign(value["condition"],ReduxConfig1[key]["condition"],{});
          state = Object.assign(state, value.condition, action.conditions || {});
        }
        return state;
      }
    }
  });
  return result;
};



const DCReducer = combineReducers({...getREDUCER()});
const CF_Reducer = (state, action) => {
  return DCReducer(state, action);
};

export default CF_Reducer;