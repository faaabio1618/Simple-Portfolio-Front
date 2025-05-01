import * as React from "react";
import { useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import type {Gallery} from "../interfaces/Gallery.ts";
import PhotoSwipe from 'photoswipe';
import type { DataSourceArray } from 'photoswipe';
import "photoswipe/style.css";

const leftNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
): React.ReactElement | undefined => {
    return (
        <button
            type="button"
            className="image-gallery-icon image-gallery-left-nav"
            disabled={disabled}
            style={{height: '100%'}}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="none">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>);
};

const rightNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
): React.ReactElement | undefined => {
    return (
        <button
            type="button"
            className="image-gallery-icon image-gallery-right-nav"
            disabled={disabled}
            style={{height: '100%'}}
            onClick={onClick}
            aria-label="Next Slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="none">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>);
}

const GallerySlider = ({gallery}: { gallery: Gallery }) => {
    useEffect(() => {
        // Initialize PhotoSwipe for all gallery images
        const images = document.querySelectorAll('.image-gallery-image');
        images.forEach((image, index) => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                
                const options = {
                    dataSource: gallery.Pictures.map((pic) => ({
                        src: pic.url,
                        w: pic.width,
                        h: pic.height,
                        alt: pic.alternativeText || '',
                        title: pic.caption || pic.alternativeText || ''
                    })) as DataSourceArray,
                    index: index,
                    showHideAnimationType: 'fade' as const,
                    bgOpacity: 0.9,
                    padding: { top: 20, bottom: 20, left: 20, right: 20 },
                    closeOnVerticalDrag: true,
                    history: false
                };

                const pswp = new PhotoSwipe(options);
                pswp.init();
            });
        });
    }, []);

    const images = gallery.Pictures.map((item) => ({
        original: item.url,
        thumbnail: item.url,
        description: item.caption || item.alternativeText,
        originalAlt: item.alternativeText,
        thumbnailAlt: item.alternativeText,
    }));

    return (
        <div className={"relative"}>
            <div style={{width: '100%', height: '100%'}}>
                <ImageGallery
                    items={images}
                    renderLeftNav={leftNav}
                    renderRightNav={rightNav}
                    showThumbnails={true}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    thumbnailPosition={"bottom"}
                    showBullets={false}
                    autoPlay={false}
                />
            </div>
        </div>
    );
};

export default GallerySlider;