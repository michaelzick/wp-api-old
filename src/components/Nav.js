import React    from 'react';
import { Link } from 'react-router';
import _        from 'lodash';

import DataStore from './../stores/DataStores.js';

class Nav extends React.Component {
  render() {
    let allPages = DataStore.getAllPages();
    let works = DataStore.getAllWorks();
    let contact = DataStore.getAllWorks();
    allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]);
    console.log(works);

    return (
      <header>
        {works.items[0].children.map((work) => {
          return <Link key={work.id} to={`/${work.url}`} style={{marginRight: '10px'}}>
                   {work.object_slug}
                 </Link>
        })}
        <Link key={works.items[1].id} to={`/${works.items[1].url}`} style={{marginRight: '10px'}}>
          {works.items[1].object_slug}
        </Link>
      </header>
    );
  }
}

export default Nav;
