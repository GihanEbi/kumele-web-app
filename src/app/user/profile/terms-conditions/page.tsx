"use client";

import React from "react";
import Head from "next/head";
import { BackArrow } from "../../../../../public/svg-icons/icons";

const loremIpsumParagraph1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu fermentum augue, sit amet convallis augue. Integer eu iaculis sem, sed euismod eros. Nulla facilisi. Proin luctus odio nunc, sed laoreet est bibendum vitae. Sed a eleifend ex. Integer varius rhoncus euismod. Aliquam ac ultricies turpis, vitae eleifend ligula. Aliquam faucibus erat ut tincidunt cursus. Cras et ullamcorper velit. In hac habitasse platea dictumst. Nunc vitae dui quis risus elementum auctor.";
const loremIpsumParagraph2 =
  "Maecenas quam nunc, sagittis non condimentum at, rutrum sit amet eros. Fusce rutrum, lectus in blandit sagittis, mi tortor ullamcorper mi, vitae vestibulum libero quam a nisi. In eu mauris et neque sodales porta eu eget dui. Nunc eu quam sit amet justo elementum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere. Cras non leo at ipsum fringilla ullamcorper. Etiam velit est, tempor id lobortis eu, lacinia id sem. Nam ornare mattis dui a porta. Aliquam a ullamcorper velit, et hendrerit eros. Etiam accumsan porta neque in viverra. Proin eleifend, eros in tristique hendrerit, nisi purus cursus sapien, id ultrices nunc tellus a ipsum. Donec et fringilla neque. Aenean consequat purus quis lectus maximus fermentum.";
const loremIpsumParagraph3 = // This seems to be a repeat of the second long paragraph in the image
  "Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere. Cras non leo at ipsum fringilla ullamcorper. Etiam velit est, tempor id lobortis eu, lacinia id sem. Nam ornare mattis dui a porta. Aliquam a ullamcorper velit, et hendrerit eros. Etiam accumsan porta neque in viverra. Proin eleifend, eros in tristique hendrerit, nisi purus cursus sapien, id ultrices nunc tellus a ipsum. Donec et fringilla neque. Aenean consequat purus quis lectus maximus fermentum.";

const TermsAndConditions = () => {
  return (
    <div>
      <Head>
        <title>Terms & Conditions - Kumele</title>
        <meta name="description" content="Kumele Terms of Use" />
      </Head>

      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 shadow-sm">
          {/* Back Button - for actual navigation, you'd use <Link> or router.back() */}
          <button
            onClick={() =>
              typeof window !== "undefined" && window.history.back()
            }
            className="p-2 -ml-2 text-gray-700 hover:text-gray-900"
            aria-label="Go back"
          >
            <BackArrow />
          </button>

          <h1 className="text-2xl font-bold text-gray-900 flex-grow text-center">
            Terms & Conditions
          </h1>

          {/* Invisible spacer to help center title when back button is present */}
          <div className="w-6 h-6 p-2" aria-hidden="true"></div>
        </header>
        {/* Main Content */}
        <main className="flex-grow p-5 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Kumele Terms of use
          </h2>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>{loremIpsumParagraph1}</p>
            <p>{loremIpsumParagraph2}</p>
            <p>{loremIpsumParagraph3}</p>
            {/* Add more paragraphs as needed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
