import { CircularProgress } from "@mui/material";
import { DimProgressContainer, LoadingMessage } from "components/styles";
import { useSelector } from "react-redux";

const DimProgress = () => {
    const { loadingProgress } = useSelector(state => state.modal);

    return (
        <DimProgressContainer onClick={null}>
            <CircularProgress thickness={5} sx={{color: '#3252d3'}}/>
            <LoadingMessage>{loadingProgress.message}</LoadingMessage>
        </DimProgressContainer>
    )
}

export default DimProgress;