import * as React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import type {Gallery} from "../interfaces/Gallery.ts";

const leftNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
): React.ReactElement | undefined => {
    return (
        <button
            type="button"
            className="image-gallery-icon image-gallery-left-nav"
            disabled={disabled}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>);
};
const GallerySlider = ({gallery}: { gallery: Gallery }) => {
    const images = gallery.Pictures.map((item) => ({
        original: item.url,
        thumbnail: item.url,
        description: item.alternativeText,
        originalAlt: item.alternativeText,
        thumbnailAlt: item.alternativeText,
    }));

    return (
        <div style={{width: '100%'}}>
            <ImageGallery
                items={images}
                showThumbnails={true}
                showPlayButton={false}
                showFullscreenButton={true}
                thumbnailPosition={"bottom"}
                showBullets={false}
                autoPlay={false}
            />
        </div>
    );
};

export default GallerySlider;