import React, { useId } from 'react';
import { Key, Value, Wrapper, Container } from './styles';

interface JsonView {
    data: any;
    maxHeight?: string;
    maxWidth?: string;
}

const JsonViewer = ({ data, maxHeight, maxWidth }: JsonView) => {
    const id = useId();

    const renderJson = (data: any, indent: number = 1): React.ReactNode => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            const padding = { paddingLeft: `${indent * 20}px` };

            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <div style={padding}>
                            <Key>"{key}"</Key>: {'{'}
                        </div>
                        <div style={{ paddingLeft: `${indent * 20}px` }}>{renderJson(value, indent)}</div>
                        <div style={padding}>{'}'}</div>
                    </div>
                );
            }

            return (
                <div key={key} style={padding}>
                    <Key>"{key}"</Key>: <Value>{JSON.stringify(value)}</Value>
                </div>
            );
        });
    };

    return (
        <Wrapper style={{ maxHeight: maxHeight || '400px', maxWidth: maxWidth || '750px', width: '100%' }}>
            <Container>
                <div key={`${id}_start`}>{'{'}</div>
                <>{renderJson(data)}</>
                <div key={`${id}_end`}>{'}'}</div>
            </Container>
        </Wrapper>
    );
};

export default JsonViewer;
