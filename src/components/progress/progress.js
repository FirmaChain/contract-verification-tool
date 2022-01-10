import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, circularProgressClasses, styled} from '@mui/material';

Progress.propTypes = {
    value: PropTypes.number.isRequired,
}

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    position: "absolute",
    [`& .${circularProgressClasses.circle}`]: {
        stroke: "url(#Pattern)",
    },
}));


export default function Progress(props) {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0" >
            <defs>
                <linearGradient id="Gradient1">
                    <stop offset="0%" stopColor="#009dff"/>
                    <stop offset="25%" stopColor="#554ed6"/>
                    <stop offset="50%" stopColor="#00f5ff"/>
                </linearGradient>
                <linearGradient id="Gradient2">
                    <stop offset="0%" stopColor="#009dff"/>
                    <stop offset="25%" stopColor="#554ed6"/>
                    <stop offset="50%" stopColor="#a642de"/>
                </linearGradient>
                <pattern id="Pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                    <g transform="rotate(0, 300, 300)">
                        <rect shapeRendering="crispEdges" x="0" y="0" width="100" height="200" fill="url(#Gradient1)"/>
                        <rect shapeRendering="crispEdges"  x="0" y="44" width="100" height="200" fill="url(#Gradient2)"/>
                    </g>
                </pattern>
            </defs>
        </svg>
        <StyledCircularProgress size={160} thickness={5} variant="determinate" {...props} />
        </>
    )
}
