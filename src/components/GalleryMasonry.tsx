import * as React from "react";
import {Masonry} from "masonic";
import type {Image} from "../interfaces/Gallery.ts";

const MasonryCard = ({data}: { data: Image }) => {
    return (
        <div style={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <img
                src={data.url}
                alt={data.alternativeText || ''}
                loading="lazy"
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                }}
            />
        </div>
    );
}
const GalleryMasonry = ({items}: { items: Image[] }) => {
    return (
        <div style={{width: '100%'}}>
            <Masonry
                items={items}
                columnGutter={16}
                maxColumnCount={2}
                overscanBy={2}
                render={MasonryCard}
            />
        </div>
    );
};

export default GalleryMasonry;