import React from 'react';
import Select from 'react-select';

const InputSelect = (props) => {

    const handleChange = (data) => {
        // let values = data.map(a => a.value);

        props.getValue({
            name: props.id,
            value: data,
        });		
	}

    return (
        <div>
			<Select
                defaultValue={props.value}
                isMulti
                name="colors"
                options={props.options}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
		</div>
    )
  
};

export default InputSelect