/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import { getGoogleMercatorScales } from '../../../utils/MapUtils';

class ScaleBox extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        style: PropTypes.object,
        scales: PropTypes.array,
        currentZoomLvl: PropTypes.number,
        minZoom: PropTypes.number,
        onChange: PropTypes.func,
        readOnly: PropTypes.bool,
        label: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        template: PropTypes.func,
        useRawInput: PropTypes.bool
    };

    static defaultProps = {
        id: 'mapstore-scalebox',
        scales: getGoogleMercatorScales(0, 28),
        currentZoomLvl: 0,
        minZoom: 0,
        onChange() {},
        readOnly: false,
        template: scale => scale < 1
            ? Math.round(1 / scale) + " : 1"
            : "1 : " + Math.round(scale),
        useRawInput: false
    };

    shouldComponentUpdate(nextProps) {
        return !isEqual(nextProps, this.props);
    }

    onComboChange = (event) => {
        let selectedZoomLvl = parseInt(event.nativeEvent.target.value, 10);
        this.props.onChange(selectedZoomLvl, this.props.scales[selectedZoomLvl]);
    };

    getOptions = () => {
        return this.props.scales.map((item, index) => {
            return (
                <option value={index} key={index}>{this.props.template(item, index)}</option>
            );
        }).filter((element, index) => index >= this.props.minZoom);
    };

    render() {
        let control = null;
        const currentZoomLvl = Math.round(this.props.currentZoomLvl);
        if (this.props.readOnly) {
            control =
                <label>{this.props.template(this.props.scales[currentZoomLvl], currentZoomLvl)}</label>
            ;
        } else if (this.props.useRawInput) {
            control =
                (<select label={this.props.label} onChange={this.onComboChange} bsSize="small" value={currentZoomLvl || ""}>
                    {this.getOptions()}
                </select>)
            ;
        } else {
            control =
                (<Form inline><FormGroup bsSize="small">
                    <ControlLabel htmlFor="scaleBox">{this.props.label}</ControlLabel>
                    <FormControl id="scaleBox" componentClass="select" onChange={this.onComboChange} value={currentZoomLvl || ""}>
                        {this.getOptions()}
                    </FormControl>
                </FormGroup></Form>)
            ;
        }
        return (

            <div id={this.props.id} style={this.props.style}>
                {control}
            </div>
        );
    }
}

export default ScaleBox;
