'use client';
import { Album } from '@/schema/type';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import Page from '../../Page/Page';

interface ChartListProps {
  albums: Album[];
  title: string;
}

function AlbumsLayout({ albums, title }: ChartListProps) {
  return (
    <>
      <div className="mt-4 relative max-w-full">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {albums.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={5.5}
            loop={false}
            className="overflow-hidden"
          >
            <ul className="flex gap-x-4 overflow-hidden scrollbar-hide max-w-full">
              {albums.map((album) => (
                <SwiperSlide key={album.id}>
                  <Link href={`/albums/${album.id}`}>
                    {album.images.length === 0 ? (
                      <div className="w-full aspect-square bg-slate-600 mb-1"></div>
                    ) : (
                      <div className="w-full aspect-square bg-slate-600 mb-1">
                        <img
                          className="w-full h-full object-cover"
                          src={album.images[0].url}
                          alt="이미지"
                        />
                      </div>
                    )}
                    <p className="text-xl font-semibold line-clamp-1">
                      {album.name}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
        ) : (
          <Page>검색 결과가 존재하지 않습니다</Page>
        )}
      </div>
    </>
  );
}

export default AlbumsLayout;
