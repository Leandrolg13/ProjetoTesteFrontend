import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'

import Clientes from './clientes'
import Vendedores from './vendedores'

export default props => (
    <nav className="principal">
    <Router history={hashHistory}>
        <Route path='/clientes' component={Clientes} />
        <Route path='/vendedores' component={Vendedores} />
        <Redirect from='*' to='/clientes' />
    </Router>
    </nav>
)