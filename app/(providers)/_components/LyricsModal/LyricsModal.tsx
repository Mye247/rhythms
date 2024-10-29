'use client';

import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';

function LyricsModal() {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const closeModal = useModalStore((state) => state.closeModal);

  const { data: lyric } = useQuery({
    queryKey: ['trackId'],
    queryFn: async () => {
      if (!currentTrack) return;
      const response = await fetch(
        window.location.origin + `/api/tracks/${currentTrack.id}/lyric`,
      );
      return response.json();
    },
  });

  if (!currentTrack) return null;

  return (
    <div
      className="fixed top-[50%] left-[50%] w-[500px] h-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-8 z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="text-white text-4xl absolute top-4 right-4"
        onClick={closeModal}
      >
        <IoCloseOutline />
      </button>{' '}
      <div className="flex flex-col gap-y-6 w-full h-full">
        <div className="flex gap-x-8 items-center">
          <div className="h-24 aspect-square bg-slate-600">
            <img src={currentTrack.album.images[0].url} alt="image" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">{currentTrack.name}</span>
            <span className="text-base text-gray-300">
              {currentTrack.artists[0].name}
            </span>
          </div>
        </div>
        <div className="max-h-full overflow-y-auto">
          {!lyric ? (
            <motion.div>
              <p>가사 불러오는 중...</p>
            </motion.div>
          ) : (
            <p className="w-1/2 text-lg text-white/50 leading-6">{lyric}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LyricsModal;
