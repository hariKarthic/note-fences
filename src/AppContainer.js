import React, { PureComponent, Fragment } from "react";
import { Header, ActionButton } from "./components";

class AppContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <main className="main">
          <div className="card cardTemplate" />
        </main>
        <ActionButton />
      </Fragment>
    );
  }
}

export default AppContainer;
