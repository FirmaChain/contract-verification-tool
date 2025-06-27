import { Fragment, useEffect, useState } from 'react';
import { ICON_DONE } from 'constants/images';
import { useNavigate } from 'react-router';
import { convertFileSize } from 'utils/common';
import { DoneIcon, Filename, Filesize, LoadingTitle, Percentage, ProgressBox } from './styles';
import Progress from 'components/progress/progress';
import { isDesktop } from 'react-device-detect';
import useFile from 'store/useFile';
import { Texts } from 'constants/fixedString';

export default function LoadingBox() {
    const { file, fileHash } = useFile();

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
            }, 100);
        }

        return () => {
            clearInterval(timer);
            setProgress(0);
        };
    }, [file, fileHash]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let count = 0;
        if (loading === false) {
            timer = setInterval(() => {
                count += 500;
                if (count >= 1000) {
                    navigate(`/verification/${fileHash}`);
                    clearInterval(timer);
                }
            }, 500);
        }
    }, [loading]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if ((file !== null || fileHash !== '') && progress >= 100) {
            timer = setInterval(() => {
                setLoading(false);
                clearInterval(timer);
            }, 500);
        }
    }, [progress]);

    return (
        <Fragment>
            <LoadingTitle isDesktop={isDesktop}>{Texts.LOADING_TITLE}</LoadingTitle>
            <ProgressBox>
                <Progress value={progress} />
                {progress >= 100 && loading === false ? (
                    <DoneIcon src={ICON_DONE} alt="Upload Complete" />
                ) : (
                    <Percentage>{progress}%</Percentage>
                )}
            </ProgressBox>
            {file !== null && (
                <Fragment>
                    <Filename isDesktop={isDesktop}>{file.name}</Filename>
                    <Filesize isDesktop={isDesktop}>{convertFileSize(file.size)}KB</Filesize>
                </Fragment>
            )}
        </Fragment>
    );
}
