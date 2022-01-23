import React from 'react';
import './Form.css';

const Form = ( {onButtonSubmit, onKeyDown} ) => {
  return (
    <div>
		<div id="form">
			<div>
				Please enter the URL to an image containing at least one face:
			</div>
			<div>
				<input onKeyDown={onKeyDown} id="url" type="text" name="url"/>
			</div>
			<div>
				<button onClick={onButtonSubmit} id="submit" value="Submit">DETECT FACES</button>
			</div>
		</div>
    </div>
  );
}

export default Form;