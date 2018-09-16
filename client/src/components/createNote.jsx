import React from "react";
import PropTypes from "prop-types";
import { FENCE } from 'fencery';


class CreateNote extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.getLocation = this.getLocation.bind(this);

        this.setGeoFence = this.setGeoFence.bind(this);
    }

    getLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const success = position => {
            console.log(position);
            this.setGeoFence(position);
        };
        const failure = err => {
            console.log("Failed to get location");
            console.error(err);
        };
        navigator.geolocation.getCurrentPosition(success, failure);
    }

    setGeoFence(coords) {
        const geoFence = new FENCE([{
            name: "HARI_FENCE",
            center: {
                latitude: coords.latitude,
                longitude: coords.longitude
            },
            radius: 5
        }]);


    }



    render() {
        return (
            <div>
                <button onClick={this.getLocation}>Add Note</button>
            </div>
        );
    }
}

CreateNote.propTypes = {};

CreateNote.defaultProps = {};

export default CreateNote;
