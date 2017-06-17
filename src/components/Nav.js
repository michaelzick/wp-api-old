import React    from 'react';
import { Link } from 'react-router';
import _        from 'lodash';

import DataStore from './../stores/DataStores.js';

class Nav extends React.Component {
  render() {
    let allPages = DataStore.getAllPages();
    let allMenus = DataStore.getAllMenus();
    allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]);

    return (
      <header>
        {allPages.map((page) => {
          // return <Link key={page.id} to={`/${page.slug}`} style={{marginRight: '10px'}}>{page.title.rendered}</Link>
        })}
        {allPages.map((menu) => {
          return <Link key={menu.id} to={`/${menu.meta.links.self}`} style={{marginRight: '10px'}}>{menu.slug}</Link>
        })}
      </header>
    );
  }
}

export default Nav;
