import { CircularProgress } from '@mui/material';
import { DimProgressContainer, LoadingMessage } from 'components/styles';
import useModal from 'store/useModal';

const DimProgress = () => {
    const { loadingProgress } = useModal();

    return (
        <DimProgressContainer onClick={() => {}}>
            <CircularProgress thickness={5} sx={{ color: '#3252d3' }} />
            <LoadingMessage>{loadingProgress.message}</LoadingMessage>
        </DimProgressContainer>
    );
};

export default DimProgress;
