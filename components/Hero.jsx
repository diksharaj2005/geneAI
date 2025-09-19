"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
      const imageRef = useRef();
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
return ()=> window.removeEventListener("scroll",handleScroll)
  }, []);

    
  return (
    <section className='w-full pt-30 md:pt-40 pb-10'>
        <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
            <h1 className='bg-gradient-to-tr from-stone-100 via-purple-400 to-gray-400 bg-clip-text text-transparent pb-2 pr-2 font-extrabold text-4xl  md:text-5xl lg:text-7xl xl:text-8xl '>Your AI Career Coach
                <br />
                Professional Success
            </h1>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                Advane your career with personalised guidance,interview prep,and AI-powered tools for job success.
            </p>
        </div>

        <div className='flex justify-center space-x-4'>
            <Link href='/dashboard'>
            <Button size='lg' className='px-8'>
                 Get Started
            </Button>
            </Link>
            <Link href='https://youtu.be/UbXpRv5ApKA?si=YiwlLitncN-lF4sK'>
            <Button variant='outline' size='lg' className='px-8' >
               Watch Demo
            </Button>
            </Link>
</div>


<div className='hero-image-wrapper mt-5 md:mt-0'>
    <div ref={imageRef} className='hero-image'>
        <Image src={'/banner.jpeg'}
        width={1100} height={720} alt='Banner geneai' className='rounded-lg shadow-2xl border mx-auto' priority/>
    </div>
</div>
        </div>
    </section>
  )
}

export default HeroSection