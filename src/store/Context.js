import PropTypes from 'prop-types';
import React, { useState, createContext } from 'react';
// mock
import USERLIST from '../_mock/user';

Context.propTypes = {
  children: PropTypes.node,
};

export const store = createContext({ users: [], setUsers: () => { } })
function Context({ children }) {
  const [users, setUsers] = useState(USERLIST);
  return (
    <store.Provider value={{ users, setUsers }}>
      {children}
    </store.Provider>
  );
}

export default Context;