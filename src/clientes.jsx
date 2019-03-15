import React, { Component } from 'react'
import axios from 'axios'

const URL = 'http://localhost:8080/clientes'
const initialState = {
    nome: '', cpf: '', sexo: ''
}

export default class Pagina extends Component{
    constructor(props) {
        super(props)
        this.state = { nome: '', cpf: '', sexo: '' , list: []}
        this.carregarLista()
    }

    carregarLista(){
        axios.get(URL).then(resp => this.setState({...this.state, list: resp.data}))
    }

    save() {
        const user = this.state
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${URL}/${user.id}` : URL
        console.log(method, url, user)
        axios[method](url, user)
            .then(resp => {
                this.setState( user , list)
            })
            .catch(e => console.log())    
        this.carregarLista()
    }

    updateField(event) {
        const dados = { ...this.state }
        dados[event.target.name] = event.target.value
        this.setState(dados)
        
    }

    load(user) {
        console.log(user)
        this.setState( user )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.cpf}
                                maxLength={11}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o cpf..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Sexo</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" 
                                    name="sexo" id="feminino" 
                                    value={this.state.sexo} defaultChecked/>
                                <label className="form-check-label" >
                                    Feminino
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" 
                                    name="sexo" id="masculino" 
                                    value={this.state.sexo} />
                                <label className="form-check-label" >
                                    Masculino
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">        
                        <div >
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Sexo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.cpf}</td>
                    <td>{user.sexo}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTable()}
            </div>
        )
    }
}