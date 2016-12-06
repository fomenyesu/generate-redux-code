import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'cfuser',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CFUser = require('./containers/CFUserContainer').default
      const reducer = require('./reducer/mainReducer').default
        console.log(reducer);

      /*  Add the reducer to the store on key 'cfuser'  */
      injectReducer(store, { key: 'cfuser', reducer })

      /*  Return getComponent   */
      cb(null, CFUser)

    /* Webpack named bundle   */
    }, 'cfuser')
  }
})
