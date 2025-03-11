// src/components/ui/TestimonialCarousel.jsx
'use client'

import { useState, useEffect } from 'react';

export function TestimonialCarousel({ testimonials, interval = 6000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(carouselInterval);
  }, [testimonials.length, interval]);

  return (
    <>
      <div className="relative h-64 overflow-hidden">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-full flex flex-col justify-center">
              <p className="text-xl italic text-gray-600 text-center">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-6 text-center">
                <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 mx-1 rounded-full ${
              currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}