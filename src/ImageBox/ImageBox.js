import React from 'react';
import './ImageBox.css';

const ImageBox = ( {imageUrl, boxes} ) => {
	return imageUrl ?
	 (
		<div id="outerContainer">
			<div id="imageAndBoxes">
				<img
				src={ imageUrl }
				id="image"
				alt="not found"
				width="500"
				height="auto"></img>
				{
				boxes.map(box =>
				<div className='bounding-box' key={box.leftCol} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				)
				}
			</div>
		</div>
	) : null;
}

export default ImageBox;