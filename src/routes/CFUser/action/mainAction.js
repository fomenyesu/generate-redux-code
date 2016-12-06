
/**
 * @name mainAction deal with data
 * @author winson 654874992@qq.com
 */

import { CF_ACTIONTYPES } from "./actionType";
import ajax from "../common/ajax";

/** load data status **/
const loadData = (actype,tableName='') => {
  return {type: CF_ACTIONTYPES[actype][tableName+"LOAD_DATA"]}
};

/** fetch data func **/
export const fetchData = (url, params,success,failFun,resultDataParam) => {
  return (dispatch) => {
    /** dispatch change the condition **/
    dispatch(changeConditions(params.actype,params));
    /** dispatch load data status **/
    dispatch(loadData(params.actype,params.tableName));
    /** ajax fetch data **/
    var tableName = params.actype + (params.tableName || "");
    ajax({
      url,
      method : /(txt|json)/.test(url)?"get":"post",
      data: params
    }).done((data) => {
      if (data.code!=200) {
        /** load failed **/
        dispatch(fail(data,params.actype,params.tableName));
        failFun(data);
      }else{
        /** load successed, change data **/
        dispatch(receiveData(data,resultDataParam,params.actype,params.tableName));
        success(data,resultDataParam);
      }
    }).fail((msg) => {
        /** load failed **/
        if(typeof msg == "object" && msg.statusText == "abort"){
          return;
        }
        dispatch(fail(msg,params.actype,params.tableName));
        failFun(msg);
    })
  }
};

/** change condition data **/
export const changeConditions = (actype,conditions) => {
    let tableName=conditions.tableName?conditions.tableName:"";
  return {
    type: CF_ACTIONTYPES[actype][tableName+"CONDITIONS"],
    conditions
  }
};

/** clear condition data cache **/
export const revertConditions = (actype,conditions) => {
  return {
    type: CF_ACTIONTYPES[actype]["REVERTCONDITIONS"],
    conditions
  }
};

/** receive data **/
const receiveData = (tableInfo,resultDataParam,actype,tableName='') => {
  var dataObj;
  dataObj = tableInfo.body;
  const timeforkey = Date.parse(new Date());
  if (dataObj.list) {
    const dataList = dataObj.list.map((item, index)=>{
      var tempObj = {"key":index + timeforkey};
      for(var i = 0; i < resultDataParam.length; i++){
        tempObj[resultDataParam[i]] = item[resultDataParam[i]];
      }
      return tempObj;
    });
    dataObj.list = dataList;
  };
  return {
    type: CF_ACTIONTYPES[actype][tableName+"RECEIVE_DATA"],
    data: dataObj,
  }
};

/** failed to load data **/
const fail = (msg,actype,tableName='') => {
  return {
    type: CF_ACTIONTYPES[actype][tableName+"LOAD_FAIL"],
    data: {}
  }
};
