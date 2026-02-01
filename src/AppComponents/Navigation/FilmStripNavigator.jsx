import React, { useRef, useEffect } from "react";
import "./FilmStripNavigator.css";

const FilmStripNavigator = ({
    movieNights,
    currentIndex,
    onSelectMovieNight,
}) => {
    const scrollContainerRef = useRef(null);

    // Auto-scroll to keep the active item in view
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeItem = scrollContainerRef.current.children[currentIndex];
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center", // Keep selected frame in center
                });
            }
        }
    }, [currentIndex, movieNights]);

    return (
        <div className="film-strip-container animate__animated animate__fadeInUp">
            <div className="film-strip-track" ref={scrollContainerRef}>
                {movieNights.map((night, index) => {
                    const isSelected = index === currentIndex;

                    // Determine what image to show: Winner cover or placeholder based on category
                    // Assuming 'winnerMovie' object specifically has 'cover' or 'coverBig'
                    // Using a fallback if specific props differ, checking structure from WinnerMoviePreview
                    const posterUrl = night.winnerMovie?.coverBig || night.winnerMovie?.cover;
                    const showPoster = !!posterUrl;

                    return (
                        <div
                            key={night.pk || index}
                            className={`film-frame ${isSelected ? "active" : ""}`}
                            onClick={() => onSelectMovieNight(index)}
                        >
                            <div className="perforation top"></div>

                            <div className="frame-content">
                                {showPoster ? (
                                    <img
                                        src={posterUrl}
                                        alt={night.winnerMovie?.title || "Winner"}
                                        className="frame-poster"
                                    />
                                ) : (
                                    <div className="frame-category">
                                        <span className="category-text">{night.categoryName || "Głosowanie"}</span>
                                    </div>
                                )}
                                {isSelected && <div className="frame-glow"></div>}
                            </div>

                            <div className="perforation bottom"></div>

                            <div className="frame-date">{night.date}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FilmStripNavigator;
