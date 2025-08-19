import { CircularProgress, circularProgressClasses, styled } from '@mui/material';

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    position: 'absolute',
    [`& .${circularProgressClasses.circle}`]: {
        stroke: 'url(#Pattern)'
    }
}));

export default function Progress(props: React.ComponentProps<typeof CircularProgress>) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
                <defs>
                    <linearGradient id="Gradient1">
                        <stop offset="26%" stopColor="#414bbc" />
                        <stop offset="35%" stopColor="#009dff" />
                        <stop offset="50%" stopColor="#00f5ff" />
                    </linearGradient>
                    <linearGradient id="Gradient2">
                        <stop offset="35%" stopColor="#414bbc" />
                        <stop offset="50%" stopColor="#6042de" />
                    </linearGradient>
                    <pattern id="Pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                        <g transform="rotate(0, 300, 300)">
                            <rect shapeRendering="crispEdges" x="0" y="0" width="100" height="200" fill="url(#Gradient1)" />
                            <rect shapeRendering="crispEdges" x="0" y="44" width="100" height="200" fill="url(#Gradient2)" />
                        </g>
                    </pattern>
                </defs>
            </svg>
            <StyledCircularProgress size={160} thickness={5} variant="determinate" {...props} />
        </>
    );
}
