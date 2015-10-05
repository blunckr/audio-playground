var React = require('react');

var AddTodo = require('./AddTodo.jsx');
var Footer = require('./Footer.jsx');
var MainSection = require('./MainSection.jsx');
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

export default class TodoApp extends React.Component {

  constructor(){
    super();
    this.state = getTodoState()
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <AddTodo />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }

  _onChange() {
    this.setState(getTodoState());
  }

}
