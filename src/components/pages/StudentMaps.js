import React from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import ReactTooltip from "react-tooltip"
import 'antd/dist/antd.css';
import API from '../../api'
const wrapperStyles = {
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
}

const colorScale = scaleLinear()
    .domain([0, 20, 50, 70, 120])
    .range(["#fff", '#2569D7', '#2048EE', '#222F76', '#1536CE']);

class StudentMaps extends React.Component {
    constructor() {
        super()
        this.state = {
            population: [],
        }
    }
    componentDidMount() {

        API.user.fetchmapinsights().then((e) => {

            this.setState({ population: e })
        }).catch(e => {

        })
        setTimeout(() => {
            ReactTooltip.rebuild()
        }, 100)
    }

    render() {
        const { population } = this.state


        return (
            <React.Fragment>
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
                                    <Geographies geography={require('../../assets//static/states.json')} disableOptimization>
                                        {(geographies, projection) =>
                                            geographies.map((geography, i) => {
                                                const statePopulation = population.find(s =>
                                                    s._id === geography.properties.abbreviation
                                                ) || {}
                                                let mapcolor = statePopulation.count || 0
                                                return (
                                                    <Geography
                                                        data-tip={geography.properties.NAME_1 + ' ' + mapcolor}
                                                        key={`state-${geography.properties.ID_1}`}
                                                        cacheId={`state-${geography.properties.ID_1}`}
                                                        round
                                                        geography={geography}
                                                        projection={projection}
                                                        style={{
                                                            default: {
                                                                fill: colorScale(+mapcolor),
                                                                stroke: "#607D8B",
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
                            <ReactTooltip type="light" />
                            <div className="mapGradient"></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default StudentMaps;
