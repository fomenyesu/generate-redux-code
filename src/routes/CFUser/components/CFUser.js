import React from 'react'
import {CFUser_URL} from '../common/apis'

const CFUser = React.createClass({
  /** initial list data set hook to clear redux cache **/
  componentWillMount() {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  },
  /**  clear redux cache  **/
  routerWillLeave(route) {
    if (!_.startsWith(route.pathname.toUpperCase(),"/cfuser".toUpperCase())) {
      this.props.actions.revertConditions("CFUser",{})
    }
  },
  /** read router **/
  contextTypes : {
    router: React.PropTypes.object.isRequired,
  },
  /** fetch list data from romete serve **/
  fetchUserList(params) {
    let _this = this
    const param = Object.assign({}, this.props.condition, params || {})
    param.actype = this.constructor.displayName
    const resultDataParam = Object.keys(this.props.tableData.Data[0]);
    this.props.actions.fetchData(CFUser_URL.userList, param,function(){},this.failFun,resultDataParam)
  },
  /** while fetch list data fail **/
  failFun(msg){
    if (msg.status!=200) {
      console.log("获取数据失败") 
    }else{
      console.log(msg.message || '获取数据失败') 
    } 
  },
  /** change the page condition **/
  onChangePage(page) {
    this.fetchUserList({pageNumber:page })
  },
  /** submit form **/
  onFormSearch(e) {
    const params = { pageNumber : 1 }
    this.fetchUserList(params)
  },
  objectRow(i){
    let tdcomps = []
    for(const [k,v] of Object.entries(this.props.tableData.Data[i])){
      tdcomps.push(<td key={k}>{v}</td>)
    }
    return <tr key={i}>{tdcomps}</tr>
  },
  render(){
    return (
    <div style={{ margin: '0 auto' }} >
      <h2>redux config: </h2>
      <h3>
        {
          Object.keys(this.props).map((item,index) => {
          return (
            <button type="button" className="btn btn-default" key={index}>{item}</button>
          )})
        }
      </h3>
      <button className='btn btn-primary' onClick={this.onFormSearch}>
        reload cfuser list!
      </button>
      <br/>
      <br/>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {
              Object.keys(this.props.tableData.Data[0]).map((datakey,index) => {return (<th key={index}>{datakey}</th>)})
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.tableData.Data.map((item,index)=>{return this.objectRow(index) })
            }
          </tbody>
        </table>
      </div>
    </div>
  )}
})

export default CFUser
