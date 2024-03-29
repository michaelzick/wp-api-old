import React        from 'react';
import {render}     from 'react-dom';
import App          from './components/App.js';
import Home         from './components/Home.js';
import views        from './components/views.js';

import {
  browserHistory,
  IndexRoute,
  Redirect,
  Route,
  Router
} from 'react-router';

import DataActions  from './actions/DataActions.js';

class AppInitializer {

  buildRoutes(data) {
    return data.works.items[0].children.map((work, i) => {
      const component = views[work.object_slug];
      return (
        <Route
          getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require(component).default);
            });
          }}
          key={ work.id }
          path={`/${work.object_slug}`}
        />
      );
    });
  }

  run() {
    DataActions.getWorks((response)=>{
      render(
        <Router history={browserHistory}>
          <Route path="/" component={ App } >
            <IndexRoute component={ Home } />

            {this.buildRoutes(response)}
          </Route>
          <Redirect from="*" to="/" />
        </Router>

        , document.getElementById('app')
      );
    });
  }
}

new AppInitializer().run();
