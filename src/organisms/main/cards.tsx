import { useState } from 'react';
import { IMG_SCAN, IMG_UPLOAD, IMG_VERIFYING } from '@/constants/images';
import { CardBox, CardContainer, CardDesc, CardImg } from './styles';
import { isDesktop } from 'react-device-detect';

export default function Cards() {
    const [focused, setFocused] = useState(-1);

    const cards = [
        { title: '1. Upload file OR\nEnter HASH', img: IMG_UPLOAD },
        { title: '2. CHECKING', img: IMG_SCAN },
        { title: '3. VERIFYING', img: IMG_VERIFYING }
    ];

    const handleFocused = (index: number) => {
        setFocused(index);
    };

    return (
        <CardContainer isDesktop={isDesktop}>
            {cards.map((item, index) => {
                return (
                    <CardBox
                        key={index}
                        focused={isDesktop && focused === index}
                        onMouseEnter={() => handleFocused(index)}
                        onMouseLeave={() => setFocused(-1)}
                    >
                        <CardImg src={item.img} alt={item.title} />
                        <CardDesc>{item.title}</CardDesc>
                    </CardBox>
                );
            })}
        </CardContainer>
    );
}
