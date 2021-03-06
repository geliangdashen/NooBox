import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import Module from './Module.jsx';
import styled from 'styled-components';

const OverviewDiv = styled.div`
	.module{
		clear:both;
	}
	#icons{
		img{
			width: 40px;
			margin-right:4px;
		}
	}
	#imageUpload,#uploadedImage{
		display:none;
	}
	#info{
		#imageUploadLabel{
			color: white;
			display: block;
		}
	}
`;

module.exports = React.createClass({
  displayName: 'Overview',
  getInitialState: function(){
    return {modules:[]};
  },
  componentDidMount: function(){
    shared.goTo = this.props.router.push;
    if(window.location.pathname.indexOf('popup')!=-1){
      const page = getParameterByName('page');
      if(page){
        this.props.router.push(page);
        if(page == 'overview'){
          this.getInitialData();
        }
      }
      else{
        get('defaultPage', (url) => {
          this.props.router.push( ( url || 'overview' ) );
          if( !url || url == 'overview' ){
            this.getInitialData();
          }
        });
      }
    }
    else{
      this.getInitialData();
    }
  },
  getInitialData: function(){
    get('displayList', (modules) => {
      this.setState({modules:modules});
    });
  },
  render: function(){
    const modules = this.state.modules.map((elem, index) => {
      return <Module key={index} name={elem} />
    });
    return (
			<OverviewDiv colorOn={shared.styled.colorOn}>
				{modules}
			</OverviewDiv>
		);
  }
});
