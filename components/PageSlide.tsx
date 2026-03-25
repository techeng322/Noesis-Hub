'use client';
import { useState, useEffect } from 'react';

const PageSlide = () => {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

            setIsAtBottom(bottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollAction = () => {
        if (isAtBottom) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <button
                className="fixed bottom-8 right-8 bg-lab-accent text-white p-2 rounded-full shadow-lg"
                onClick={handleScrollAction}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20px" 
                    height="20px" 
                    viewBox="0 0 20 20" 
                    className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : 'rotate-0'}`}
                >
                    <rect x="0" fill="none" width="20" height="20" />
                    <g>
                        <path d="M9 2h2v12l4-4 2 1-7 7-7-7 2-1 4 4V2z" fill="#FFFFFF" />
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default PageSlide;