import React from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        item:"",
        
      status: false
      }, 
      users : [],
      pos:-1,
    };
    
  }
  
  handleChange =(e)=>{
    console.log(e.target.name)
    const {name, value} = e.target;
    let user = {...this.state.user};
    user[name] = value;

    this.setState({
      user,
    },()=> console.log(user));

  }

  clearForm = () => {
    this.setState({
      user: {
        item:"",
        status: false
      },
    });
  }

  handleSave = (index, remove) =>{
    let users = [...this.state.users];
    console.log(users)
    this.clearForm();

    if(index>-1 && remove)
      users[index].status=!users[index].status
    else if(index>-1 && !remove)
      users.splice(index,1)
    else if(index==-1)
      users.push(this.state.user);
    else if(index>-1)
      users[index] = this.state.user;

    console.log("users", users);
    this.setState({
      users,
      pos : -1,
    });
  }

  handleQuickEdit = (index) => {
    let users = [...this.state.users];
    this.setState({
      user : users[index],
      pos : index
    });
  }


  render(){
    return(
      <div className='App'>
          <form>
            <h1>To Do List</h1>
            <label htmlFor="name"> Item  : </label>
            <input type="text" name="item" value={this.state.user.item} onChange={(e)=>{this.handleChange(e)}}/><br/><br/>
            <input type="button" value="Submit" onClick={()=>{this.handleSave(this.state.pos)}}/>   <br/><br/> 
          </form>

          <table>
            <thead>
              <tr>
                <td>List</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
            {this.state.users.length 
              ?
                this.state.users.map((ele, index)=>{
                  return (
                      <tr key={index}>
                        <td><span style={{textDecoration:(ele.status?'line-through':'')}}>{ele.item}</span></td>
                        <td>
                          <div>
                            {ele.status?
                              null:<button onClick={()=>{this.handleQuickEdit(index)}}>Edit</button>}

                              <button onClick={()=>{this.handleSave(index, true)}}>{ele.status?'Complete':'Pending'}</button>
                              <button onClick={()=>{this.handleSave(index, false)}}>Delete</button>
                          </div>
                        </td>
                      </tr>
                  )
                })
              :
                <tr>No data exists</tr>
            }
            </tbody>
          </table>
      </div>
    )
  }
}

export default App
