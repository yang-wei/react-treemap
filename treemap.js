'use strict';
var React = require('react');
var d3 = require('d3');

var Cell = React.createClass({
    render: function() {
      var cellStyle = {
          left: this.props.left,
          top: this.props.top,
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.cellColor,
          overflow: 'hidden',
          position: 'absolute'
        };

    return (
      <div style={cellStyle} >
        {this.props.children}
      </div>
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      data: [],
      width: '', 
      height: '',
      value: ''
    };
  },
  render: function() {
        var value = this.props.value;
        var data = this.props.data;
        var color = d3.scale.category20b();
        var treemap = d3.layout.treemap()
                        .children(function(d) { return d })
                        .size([this.props.width, this.props.height])
                        .sticky(true)
                        .value(function(d) { return d[value] }); 

        var maps = treemap(data).map(function(tree, i) {
           return (
                  <Cell
                    left={tree.x} top={tree.y}    
                    width={tree.dx} height={tree.dy}
                    key={i} cellColor={color(i)}> 
                    {tree.name}
                  </Cell>
                  )
        });
        
        return (
          <div className='dataseries'>{maps}</div>
      )
  }
});

var Treemap = React.createClass({
  getDefaultProps: function() {
    return {
      data: [], 
      width: '600',
      height: '300',
      value: ''
    }
  },
  render: function() {
    var style = {
      position: 'relative'
    };
    return (
      <div style={style}>
        <DataSeries 
            data={this.props.data} 
            value={this.props.value} 
            width={this.props.width} 
            height={this.props.height}/>
      </div>
    )
  }
});

module.exports = Treemap;
