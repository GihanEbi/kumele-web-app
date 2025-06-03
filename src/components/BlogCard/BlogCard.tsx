'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BlogCardProps } from '@/types/blog';

export default function BlogCard(props: BlogCardProps) {
  return (
    <Link href={`/user/blog/${props.id}`} className="block">
      <div className="bg-gray-100 rounded-xl p-3 shadow-sm flex flex-col relative hover:shadow-md transition-shadow duration-200 min-h-full">
        {props.showIndicator && (
          <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-500 rounded-full z-10"></div>
        )}
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={props.imageUrl}
              alt={props.title}
              width={100}
              height={100}
              className="rounded-lg object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
            />
          </div>
          <div className="flex flex-col flex-grow justify-start py-1">
            <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1.5 group-hover:text-yellow-600 transition-colors">
              {props.title}
            </h3>

            <div className="inline-flex items-center gap-1 bg-gray-800 text-white text-xs rounded-full px-2 py-0.5 w-fit">
              <Image
                src="/images/blog-category.png"
                alt="Category"
                width={14}
                height={14}
                className="w-3.5 h-3.5"
              />
              <span>{props.categoryName}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-auto pt-3">
          {props.author} • {props.date}
        </p>
      </div>
    </Link>
  );
}
