import * as React from "react";
import {useEffect} from "react";
import type {Gallery, GalleryStyle} from "../interfaces/Gallery.ts";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import PhotoSwipe from 'photoswipe';
import type { DataSourceArray } from 'photoswipe';
import "photoswipe/style.css";

gsap.registerPlugin(ScrollTrigger)


const GalleryMasonry = ({gallery, style}: { gallery: Gallery, style: GalleryStyle }) => {
    useEffect(() => {
        // add cool effect when images are loaded
        gsap.fromTo(
            ".gallery img",
            {opacity: 0, scale: 0.9},
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".gallery",
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                    once: true
                }
            }
        );

        // Initialize PhotoSwipe for all gallery images
        const images = document.querySelectorAll('.gallery-item');
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
    let className;
    const showTitles = style.ShowTitles;
    const showNextGallery = style.ShowNextGallery;

    if (style.NrColumns == 0) {
        className = "columns-sm gap-3";
    } else {
        className = `columns-1 md:columns-${style.NrColumns} lg:columns-${style.NrColumns} gap-3`;
    }

    return (
        <>
            <div className={className}>
                {gallery.Pictures.map((image, index) => (
                    <div key={index} className="break-inside-avoid w-full inline-block mb-6">
                        <a 
                            href={image.url}
                            className="gallery-item cursor-pointer block"
                            data-pswp-width={image.width}
                            data-pswp-height={image.height}
                        >
                            <img
                                src={image.url}
                                alt={image.alternativeText || ""}
                                className="w-full h-auto object-contain mt-2"
                                loading="lazy"
                            />
                        </a>
                        {showTitles && (image.caption || image.alternativeText) && (
                            <div className="text-md font-bold py-1">{image.caption || image.alternativeText}</div>
                        )}
                    </div>
                ))}
                {showNextGallery && gallery.see_also[0] && (
                    <div className="column-span-all text-md font-bold py-1 text-center" style={{columnSpan: 'all'}}>
                        <a href={`/portfolio/${gallery.see_also[0].Slug}`} className="link">
                            See next gallery: {gallery.see_also[0].Title}
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default GalleryMasonry;