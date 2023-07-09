import Image from 'next/image'
import Link from 'next/link'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blk expenses app | Home",
  description: "Free & open-source expense tracking app.",
}

export default function Home() {
  return (
      <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
        <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
          <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
            <LargeHeading
                size='lg'
                className='three-d text-black dark:text-light-gold'>
              Track monthly<br />expenses <br />with ease.
            </LargeHeading>

            <Paragraph className='max-w-xl lg:text-left'>
              Black Lion Expense Tracking App: Simplify Your Finances, Leave Spreadsheets Behind!{" "}
              <Link
                  href='/login'
                  className='underline underline-offset-2 text-black dark:text-light-gold'>
                Get started
              </Link>
              .
            </Paragraph>

            <div className='relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
              <Image
                  priority
                  className='img-shadow '
                  quality={100}
                  style={{ objectFit: 'contain' }}
                  fill
                  src='/blacklion.png'
                  alt='typewriter'
              />
            </div>
          </div>
        </div>
      </div>
  )
}