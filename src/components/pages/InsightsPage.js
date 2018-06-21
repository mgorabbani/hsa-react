import React from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { csv } from "d3-fetch"
import { Tooltip } from 'redux-tooltip';
import 'antd/dist/antd.css';

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

const colorScale = scaleLinear()
    .domain([0, 10])
    .range(["#0F3367", "#F7FBFF"])

class InsightsPage extends React.Component {
    constructor() {
        super()
        this.state = {
            population: [],
        }
    }
    componentDidMount() {

        csv(require('../../assets/static/population.csv'))
            .then(population => {
                this.setState({ population })
            })
    }


    render() {
        const { population } = this.state
        return (
            <React.Fragment>
                <div style={{ textAlign: 'center', padding: '50px', background: '#F1F6F4' }}>
                    <h1 style={{}} >ACCOUNT SETTINGS</h1>
                    <h6>Manage your account. You call the shots.</h6>
                </div>

                <div className="container">
                    <div className="col-md-12">
                        <div style={wrapperStyles}>
                            <ComposableMap
                                projection="albersUsa"
                                projectionConfig={{
                                    scale: 1000,
                                }}
                                width={980}
                                height={551}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            >
                                <ZoomableGroup disablePanning>
                                    <Geographies geography={require('../../assets/static/states.json')} disableOptimization>
                                        {(geographies, projection) =>
                                            geographies.map((geography, i) => {
                                                const statePopulation = population.find(s =>
                                                    s.name === geography.properties.NAME_1
                                                ) || {}
                                                return (
                                                    <Geography
                                                        onClick={() => {
                                                            console.log('sd')
                                                        }}
                                                        key={`state-${geography.properties.ID_1}`}
                                                        cacheId={`state-${geography.properties.ID_1}`}
                                                        round
                                                        geography={geography}
                                                        projection={projection}
                                                        style={{
                                                            default: {
                                                                fill: colorScale(+statePopulation.pop),
                                                                stroke: "#ECEFF1",
                                                                strokeWidth: 0.75,
                                                                outline: "none",
                                                            },
                                                            hover: {
                                                                fill: "#607D8B",
                                                                stroke: "#607D8B",
                                                                strokeWidth: 0.75,
                                                                outline: "none",
                                                            },
                                                            pressed: {
                                                                fill: "#FF5722",
                                                                stroke: "#607D8B",
                                                                strokeWidth: 0.75,
                                                                outline: "none",
                                                            },
                                                        }}
                                                    />
                                                )
                                            }
                                            )}
                                    </Geographies>
                                </ZoomableGroup>
                            </ComposableMap>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default InsightsPage;
