import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Profiles extends Component{
  constructor(){
    super()
    this.state = {
      profiles: []
    }
  }

  componentDidMount(){
    APIManager.get('/api/profile', null, (err, response) => {
      console.log(JSON.stringify(response))
      const results = response.results

      this.props.profilesRecieved(results)
    })
  }

  selectedProfile(profile, event){
    //console.log('Select Profile: ' + JSON.stringify(profile))
    this.props.profileSelected(profile)
  }

  render(){
    const list = this.props.profiles.map((profile, i) => {
      let name = null
      if(this.props.selected == null)
        name = <a onClick={this.selectedProfile.bind(this, profile)} href="#">{profile.firstName}</a>
      else if(this.props.selected.id == profile.id)
        name = <a onClick={this.selectedProfile.bind(this, profile)} style={{color:'red'}} href="#"><strong>{profile.firstName}</strong></a>
      else
        name = <a onClick={this.selectedProfile.bind(this, profile)} href="#">{profile.firstName}</a>

      return(
        <li key={profile.id}>{ name }</li>
      )
    })

    return(
      <div>
        <h2>Profile:</h2>
        <ol>{list}</ol>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    profiles: state.profile.list,
    selected: state.profile.selected
  }
}

const dispatchToProps = (dispatch) =>{
  return {
    profilesRecieved: (profiles) => dispatch(actions.profilesRecieved(profiles)),
    profileSelected: (profile) => dispatch(actions.profileSelected(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profiles)
