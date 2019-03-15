import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import './pagina.css'


import Topo from './topo';  
import Menu from './menu';
import Routes from './routes';

export default () =>(
    <div>
        <Topo/>
        <Menu/>
        <Routes/>
    </div>
)    