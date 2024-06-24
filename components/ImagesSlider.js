'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import baklawa from '@/assetes/images/baklawa.webp'
import cheessCake from '@/assetes/images/cheess-cake.webp'
import chocolateCake from '@/assetes/images/chocolate-cake.webp'
import cocktail from '@/assetes/images/cocktail.webp'
import emmAli from '@/assetes/images/emm-ali.webp'
import frenchFries from '@/assetes/images/french-fries.webp'
import freshJuice from '@/assetes/images/fresh-juice.webp'
import grilledChicken from '@/assetes/images/grilled-chicken.webp'
import kofta from '@/assetes/images/kofta.webp'
import classes from './ImagesSlider.module.css'

const images = [
    { image: baklawa, alt: 'baklawa' },
    { image: cheessCake, alt: 'cheessCake' },
    { image: chocolateCake, alt: 'chocolateCake' },
    { image: cocktail, alt: 'cocktail' },
    { image: emmAli, alt: 'emmAli' },
    { image: frenchFries, alt: 'frenchFries' },
    { image: freshJuice, alt: 'freshJuice' },
    { image: grilledChicken, alt: 'grilledChicken' },
    { image: kofta, alt: 'kofta' },
];

function ImagesSlider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.slideshow}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.image}
                    className={`${classes.image} ${index === currentImageIndex ? classes.active : ''}`}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                />
            ))}
        </div>
    );
}

export default ImagesSlider;