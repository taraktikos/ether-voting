import React, { Component } from 'react'
import Voting from '../build/contracts/Voting.json'
import getWeb3 from './utils/getWeb3'
import { Container, Row, Col, Button } from 'reactstrap'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      candidates: [],
      web3: null,
      address: null
    }
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({ web3: results.web3 })
      this.instantiateContract()
    }).catch(() => console.log('Error finding web3.'))
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const voting = contract(Voting)
    voting.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      voting.deployed().then((instance) => {
        this.setState({ votingInstance: instance })
        return instance.getCandidateList.call()
      }).then(candidateList => candidateList.map(name => this.state.votingInstance.totalVotesFor.call(name).then(value => { 
            const candidates = this.state.candidates
            candidates.push({ name: name, votes: value.c[0] })
            this.setState({ candidates: candidates })
          })
        )
      )
    })
  }

  vote(e, name) {
      e.preventDefault()
      const votingInstance = this.state.votingInstance
      votingInstance.voteForCandidate(name, {gas: 140000, from: this.state.web3.eth.accounts[0]}).then((tx) => {
        return votingInstance.totalVotesFor.call(name).then(value => {
          const candidates = this.state.candidates.filter(c => c.name !== name)
          candidates.push({ name: name, votes: value.c[0] })
          this.setState({ candidates: candidates })
        })
      })
  }

  render() {
    const items = this.state.candidates.map(c => 
      <Row key={c.name}>
        <Col>{this.state.web3.toAscii(c.name)}</Col>
        <Col>Votes: {c.votes}</Col>
        <Col><Button color="primary" onClick={e => this.vote(e, c.name)}>Vote</Button></Col>
      </Row>
    )
    return (
      <div className="App">
        <Header></Header>
        <Container>
              {items}
        </Container>
      </div>
    );
  }
}

export default App
