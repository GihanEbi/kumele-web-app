"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogCardProps } from "@/types/blog";
import { ConfettiIcon } from "../../../public/svg-icons/icons";

export default function BlogCard(props: BlogCardProps) {
  return (
    <Link href={`/user/blog/${props.id}`} className="block">
      <div className="bg-app-blog-card-background rounded-xl p-3 shadow-sm flex flex-col relative hover:shadow-md transition-shadow duration-200 min-h-full">
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
            <h3 className="text-text-body  text-app-blog-card-heading leading-tight mb-3 group-hover:text-yellow-600 transition-colors">
              {props.title}
            </h3>

            <div className="inline-flex items-center gap-3 bg-app-blog-card-category-background text-app-blog-card-category-text text-text-caption text-[11.52px] rounded-full px-3 py-1 w-fit">
              <ConfettiIcon />
              <span>{props.categoryName}</span>
            </div>
            <p className="text-app-blog-card-author-text text-text-caption pt-3 mt-[-5px]">
              {props.author} • {props.date}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
