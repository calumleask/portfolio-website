// import React from "react";

// const defaultContext = {
//     data: {
//         activeNavLink: null
//     },
//     set: () => {}
// }

// const { Provider, Consumer } = React.createContext(defaultContext);

// class ContextProviderComponent extends React.Component {

//     constructor() {
//         super()

//         this.setData = this.setData.bind(this);
//         this.state = {
//             ...defaultContext,
//             set: this.setData,
//         }
//     }

//     setData(newData) {
//         this.setState(state => ({
//             data: {
//             ...state.data,
//             ...newData,
//             },
//         }))
//     }

//     render() {
//         return <Provider value={this.state}>{this.props.children}</Provider>
//     }
// }

// export { Consumer as default, ContextProviderComponent };