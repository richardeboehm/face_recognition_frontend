import React from 'react';
import Form from '../Form/Form'
import ImageBox from '../ImageBox/ImageBox'

class App extends React.Component {

	constructor() {
		super();
		this.state = {
		  url: '',
		  boxes: []
		};
		Object.defineProperty(this, 'backendUrl', {
			value: 'https://face-recognition-backend-rb.herokuapp.com/image?input=',
			writable: false
		});
	}

	calculateFaceLocation = (data) => {
		const {width, height} = document.getElementById('image');
		const faces = data.outputs[0].data.regions;
		const boxes = faces ?
		faces.map(face => {
		  face = face.region_info.bounding_box;
		  return {
			leftCol: face.left_col * width,
			topRow: face.top_row * height,
			rightCol: width - (face.right_col * width),
			bottomRow: height - (face.bottom_row * height)
		  };
		}) : [];
		this.setState({boxes});
	}

	onKeyDown = event => {
		if (event.key === 'Enter') this.onButtonSubmit();
	}

	onButtonSubmit = async () => {
		try {
			const url = document.getElementById('url').value;
			if (!url) return;
			await this.setState({url: url, boxes: []});
			document.getElementById('url').value = '';
			const response = await fetch(this.backendUrl + this.state.url,
				{
				method: 'get',
				headers: {'Content-Type': 'application/json'}
				});

			const jsonResponse = await response.json();
			this.calculateFaceLocation(jsonResponse);
		} catch(e) {
			console.error(e, "Unable to find image. Please try again.");
		}
	}

	render() {
	  return (
		<div id="App">
		  <Form onButtonSubmit={this.onButtonSubmit} onKeyDown={this.onKeyDown}></Form>
		  <ImageBox imageUrl={this.state.url} boxes={this.state.boxes}></ImageBox>
		</div>
	  );
	}
  }

export default App;