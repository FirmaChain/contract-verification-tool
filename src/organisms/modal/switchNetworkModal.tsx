import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import { ModalTitle, ModalContents, DisableButton, GeneralButton } from './styles';
import styled from 'styled-components';
import useFirmaUtil from 'hook/useFirmaUtils';
import useModal from 'store/useModal';

const SubTitle = styled.div`
    margin: 2px 0 10px;

    font-family: Lato;
    font-size: 1rem;
    // line-height: 18px;
    text-align: center;
    white-space: pre-line;
    color: #ffffff;
`;

const NetworkTypo = styled.div`
    font-size: 0.9rem;
    text-align: center;
    opacity: 0.6;
    font-family: Lato;
    margin: 2px 0 10px;
`;

const SwitchNetworkModal = () => {
    const { setChainConfig } = useFirmaUtil();
    const { switchNetwork, handleModalSwitchNetwork } = useModal();

    const WalletModalWidth = isDesktop ? '500px' : '100%';
    const WalletModalPadding = isDesktop ? '20px 40px' : '15px 20px';

    const closeWalletModal = () => {
        handleModalSwitchNetwork(false);
    };

    const changeNetwork = () => {
        setChainConfig('TESTNET');
        closeWalletModal();
    };

    return (
        <Modal
            visible={switchNetwork}
            closable={true}
            onClose={closeWalletModal}
            width={WalletModalWidth}
            padding={WalletModalPadding}
            maskClosable={true}
        >
            <ModalTitle>NOTICE</ModalTitle>
            <ModalContents>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SubTitle>Switch the network for API use.</SubTitle>

                    <NetworkTypo>Colosseum(MainNet) ➟ Imperium(TestNet)</NetworkTypo>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', margin: '20px 0 10px' }}>
                        <GeneralButton onClick={changeNetwork}>YES</GeneralButton>
                        <DisableButton onClick={closeWalletModal}>NO</DisableButton>
                    </div>
                </div>
            </ModalContents>
        </Modal>
    );
};

export default SwitchNetworkModal;
