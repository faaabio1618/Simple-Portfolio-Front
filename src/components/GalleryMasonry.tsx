import * as React from "react";
import type {GalleryStyle, Image} from "../interfaces/Gallery.ts";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
import {useEffect} from "react";


const GalleryMasonry = ({items: items_, style}: { items: Image[], style: GalleryStyle }) => {
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
    }, []);
    let className;
    if (style.NrColumns == 0) {
        className = "columns-sm gap-3";
    } else {
        className = `columns-1 md-columns-${style.NrColumns} lg-columns-${style.NrColumns} gap-3`;
    }

    return (
        <div className={className}>
            {items_.map((image, index) => (
                <div key={index} className="break-inside-avoid w-full inline-block">
                    <img
                        src={image.url}
                        alt={image.alternativeText || ""}
                        className="w-full h-auto object-contain mt-2"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default GalleryMasonry;