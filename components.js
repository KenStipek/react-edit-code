var EditContainer = React.createClass({
  getInitialState: function() {
      return ({
          copy: 'var data = "some data";',
          lang: 'javascript'
      });
  },

  render: function() {
    return (
      <div>
        <Edit copy={this.state.copy} ref='editor' onChange={this.handleChange} />
        <Preview copy={this.state.copy} lang={this.state.lang} ref='preview' />
      </div>
    );
  },

  handleChange: function(val) {
    this.setState({ copy : val.copy, lang : val.lang })
  }
});

var Edit = React.createClass({
  getInitialState: function() {
      return ({
        options:  [
                    { value: 'javascript',  label: 'JavaScript' },
                    { value: 'ruby',        label: 'Ruby' },
                    { value: 'c',           label: 'C' },
                    { value: 'c++',         label: 'C++' },
                    { value: 'python',      label: 'Python' }
                  ]
      });
  },
  render: function() {
    return (
      <div className="edit">
        <textarea ref='codeInput' value={this.props.copy} onChange={this.handleChange}></textarea>
        <select ref='select' onChange={this.handleChange}>
          {this.html_options()}
        </select>
      </div>
    );
  },

  html_options: function() {
    var all_options = new Array();
    for (var i = 0; i < this.state.options.length; i++) {
      var option = this.state.options[i];
      all_options.push(
        <option key={i} value={option.value}>{option.label}</option>
      );
    }
    return all_options;
  },

  handleChange: function() {
    var copy = this.refs.codeInput.getDOMNode().value;
    var lang = this.refs.select.getDOMNode().value;
    this.props.onChange({copy : copy, lang : lang});
  }
});

var Preview = React.createClass({
  render: function() {
    return (
      <pre>
        <code ref='code' className={this.props.lang} dangerouslySetInnerHTML={{__html: this.props.copy}} />
      </pre>
    );
  },

  componentDidUpdate: function() {
    hljs.highlightBlock(this.refs.code.getDOMNode());
  },

  componentDidMount: function () {
    hljs.highlightBlock(this.refs.code.getDOMNode());
  }
});

React.render(
  <EditContainer />,
  document.getElementById('content')
);
